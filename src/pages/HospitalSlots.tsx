import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import {
  SlotButton,
  SlotCountdown,
  SlotGridSkeleton,
  BookingProgress,
} from '../components/slots';
import { useHospitalSlots } from '../hooks/useHospitalSlots';
import { useHospitals } from '../hooks/useHospitals';
import { useSlotLock, useSlotRelease } from '../hooks/useSlotLock';
import { DialysisSlot, SlotLockResponse } from '../types/dialysis.types';

export const HospitalSlots: React.FC = () => {
  const { hospitalId = '' } = useParams<{ hospitalId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const date = searchParams.get('date') || '';
  const shift = searchParams.get('shift') || '';
  const location = searchParams.get('location') || '';

  // 1. Fetch Hospital details for accurate name, address and branch
  const { data: hospitals } = useHospitals();
  const selectedHospital = (hospitals || []).find((h) => h.id === hospitalId);

  // 2. Fetch API-driven slots for this hospital, date, and shift
  const {
    data: slots,
    isLoading: isLoadingSlots,
    isError: isSlotsError,
    refetch: refetchSlots,
  } = useHospitalSlots(hospitalId, date, shift || undefined, {
    enabled: Boolean(hospitalId && date),
  });

  // State
  const [selectedSlot, setSelectedSlot] = useState<DialysisSlot | null>(null);
  const [activeLock, setActiveLock] = useState<SlotLockResponse | null>(null);
  const [lockError, setLockError] = useState<string | null>(null);
  const [isLockExpired, setIsLockExpired] = useState<boolean>(false);

  // Lock mutations
  const lockMutation = useSlotLock(hospitalId, date);
  const releaseMutation = useSlotRelease(hospitalId, date);

  // Sync selectedSlot with fresh backend slot data if slots update
  useEffect(() => {
    if (selectedSlot && slots) {
      const refreshed = slots.find((s) => s.id === selectedSlot.id);
      if (refreshed && refreshed.status !== 'AVAILABLE' && refreshed.status !== 'LIMITED') {
        // If slot became unavailable while locked by someone else
        if (!activeLock || activeLock.slotId !== refreshed.id) {
          setSelectedSlot(null);
          setActiveLock(null);
          setLockError('The slot you selected is no longer available. Please choose another slot.');
        }
      }
    }
  }, [slots, selectedSlot, activeLock]);

  // Handle slot selection
  const handleSlotClick = async (slot: DialysisSlot) => {
    // Cannot click unavailable or waitlist slots
    if (slot.status === 'UNAVAILABLE' || slot.status === 'WAITLIST') return;

    // If clicking already selected slot with active valid lock, do nothing
    if (selectedSlot?.id === slot.id && activeLock && !isLockExpired) return;

    setLockError(null);
    setIsLockExpired(false);

    // If there is an existing lock on a different slot, release it first
    if (activeLock && activeLock.slotId !== slot.id) {
      try {
        await releaseMutation.mutateAsync({
          slotId: activeLock.slotId,
          lockId: activeLock.lockId,
        });
      } catch {
        // Silent catch for release on re-select
      }
    }

    setSelectedSlot(slot);

    // Request temporary hold from backend (backend is single source of truth)
    try {
      const response = await lockMutation.mutateAsync({
        slotId: slot.id,
        payload: {
          slotId: slot.id,
          hospitalId,
          date,
        },
      });
      setActiveLock(response.data);
    } catch (err: any) {
      // 409 Conflict or locking error
      const message =
        err?.response?.status === 409 || err?.status === 409 || err?.code === 'SLOT_ALREADY_LOCKED'
          ? 'This slot was just selected by another patient. Please choose a different slot.'
          : err?.message || 'Unable to hold this slot right now. Please try another slot.';
      setLockError(message);
      setSelectedSlot(null);
      setActiveLock(null);
      refetchSlots();
    }
  };

  // Handle countdown expiry
  const handleLockExpired = () => {
    setIsLockExpired(true);
    setActiveLock(null);
    setSelectedSlot(null);
    refetchSlots();
  };

  // Reset / choose another slot after expiry
  const handleResetExpired = () => {
    setIsLockExpired(false);
    setSelectedSlot(null);
    setActiveLock(null);
    setLockError(null);
    refetchSlots();
  };

  // Continue to Phase 4 (Next step: OTP / Patient Details)
  const handleContinue = () => {
    if (!selectedSlot || !activeLock || isLockExpired) return;
    // Phase 4 navigation placeholder
    navigate(
      `/book/verify?slotId=${selectedSlot.id}&lockId=${activeLock.lockId}&hospitalId=${hospitalId}&date=${date}`
    );
  };

  const hospitalDisplayName =
    selectedHospital?.name ||
    (hospitalId ? `Srikara Hospital (${hospitalId})` : 'Selected Hospital');

  const hospitalDisplayAddress =
    selectedHospital?.address?.line1 ||
    selectedHospital?.branch ||
    selectedHospital?.address?.city ||
    '';

  const formatReadableDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Group slots by shift
  const morningSlots = (slots || []).filter((s) => s.shift === 'MORNING');
  const afternoonSlots = (slots || []).filter((s) => s.shift === 'AFTERNOON');
  const eveningSlots = (slots || []).filter((s) => s.shift === 'EVENING');

  // Total available count strictly from backend response
  const totalAvailableCount = (slots || []).filter(
    (s) => s.status === 'AVAILABLE' || s.status === 'LIMITED'
  ).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-28 sm:pb-16 pt-6">
      <Container size="lg">
        {/* Booking Stepper - Step 2 is active */}
        <div className="mb-6">
          <BookingProgress currentStep={2} hasHold={Boolean(activeLock && !isLockExpired)} />
        </div>

        {/* Back navigation */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006699] rounded px-1.5 py-1"
            aria-label="Go back to hospital selection"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Hospital Availability</span>
          </button>
        </div>

        {/* Page Header */}
        <PageHeader
          title="Select Dialysis Slot"
          description={`Review verified machine availability and reserve your slot for ${date ? formatReadableDate(date) : 'your selected date'}.`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Find Dialysis', href: '/find-dialysis' },
            { label: 'Availability', href: `/find-dialysis?location=${location}&date=${date}` },
            { label: 'Select Slot' },
          ]}
        />

        {/* Hospital & Date Context Card */}
        <Card variant="default" padding="md" className="mb-6 border-[#E2E8F0] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-badge text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                  <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{selectedHospital?.branch || 'Srikara Hospital'}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00A86B]" aria-hidden="true" />
                  <span>NABH Certified Center</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">{hospitalDisplayName}</h2>
              {hospitalDisplayAddress && (
                <p className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#94A3B8]" aria-hidden="true" />
                  <span>{hospitalDisplayAddress}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#F1F5F9]">
              <div className="flex items-center gap-2 bg-[#F1F5F9] px-3 py-2 rounded-card text-xs font-medium text-[#334155]">
                <Calendar className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                <span>{date ? formatReadableDate(date) : 'No date specified'}</span>
              </div>
              {shift && shift !== 'ANY' && (
                <div className="flex items-center gap-2 bg-[#F1F5F9] px-3 py-2 rounded-card text-xs font-medium text-[#334155]">
                  <Clock className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                  <span className="capitalize">{shift.toLowerCase()} Shift Preferred</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Active Lock Countdown Alert */}
        {activeLock && !isLockExpired && (
          <div className="mb-6">
            <SlotCountdown
              lock={activeLock}
              onExpired={handleLockExpired}
            />
          </div>
        )}

        {/* Lock Expired Alert */}
        {isLockExpired && (
          <div
            role="alert"
            className="mb-6 bg-[#FEF2F2] border border-[#FCA5A5] rounded-card p-4 text-[#991B1B] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold">Slot Hold Expired</p>
                <p className="text-xs text-[#7F1D1D] mt-0.5">
                  Your 5-minute reservation expired to ensure fair access. The slot has been released back to other patients.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetExpired}
              className="border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] flex-shrink-0 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Select Another Slot
            </Button>
          </div>
        )}

        {/* Slot Conflict Error Alert */}
        {lockError && (
          <div
            role="alert"
            className="mb-6 bg-[#FEF2F2] border border-[#F87171] rounded-card p-4 text-[#991B1B] shadow-sm flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Slot Selection Notice</p>
                <p className="text-xs text-[#7F1D1D] mt-0.5">{lockError}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLockError(null)}
              className="text-[#991B1B] hover:text-[#7F1D1D] text-xs font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Content Area */}
        {isLoadingSlots ? (
          <div className="space-y-6">
            <div className="h-6 w-48 bg-[#E2E8F0] animate-pulse rounded"></div>
            <SlotGridSkeleton />
          </div>
        ) : isSlotsError ? (
          <Card variant="default" padding="lg">
            <ErrorState
              title="Unable to Load Slots"
              message="We couldn't retrieve available dialysis slots from the hospital system. Please check your connection and try again."
              onRetry={() => refetchSlots()}
            />
          </Card>
        ) : !slots || slots.length === 0 ? (
          <Card variant="default" padding="lg">
            <EmptyState
              title="No Slots Scheduled"
              description={`There are no dialysis slots scheduled for ${hospitalDisplayName} on ${date ? formatReadableDate(date) : 'this date'}. Try selecting a different date or branch.`}
              actionLabel="Search Other Dates"
              onAction={() => navigate(`/find-dialysis?location=${location}`)}
            />
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Legend & Verified availability info */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-card border border-[#E2E8F0] text-xs">
              <div className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
                <Sparkles className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                <span>
                  {totalAvailableCount} {totalAvailableCount === 1 ? 'Slot' : 'Slots'} Open for Reservation
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ECFDF5] border border-[#00A86B]"></span>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#006699] border border-[#004C73]"></span>
                  <span>Your Selection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#F1F5F9] border border-[#CBD5E1]"></span>
                  <span>Booked / Unavailable</span>
                </div>
              </div>
            </div>

            {/* Morning Shift */}
            {morningSlots.length > 0 && (
              <section aria-labelledby="shift-morning-heading" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                  <h3 id="shift-morning-heading" className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                    <span>Morning Shift</span>
                    <span className="text-xs font-normal text-[#64748B] normal-case">(06:00 AM – 10:00 AM)</span>
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    {morningSlots.filter((s) => s.status === 'AVAILABLE' || s.status === 'LIMITED').length} open
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {morningSlots.map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlot?.id === slot.id}
                      isHeld={Boolean(activeLock && activeLock.slotId === slot.id && !isLockExpired)}
                      onClick={() => handleSlotClick(slot)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Afternoon Shift */}
            {afternoonSlots.length > 0 && (
              <section aria-labelledby="shift-afternoon-heading" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                  <h3 id="shift-afternoon-heading" className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                    <span>Afternoon Shift</span>
                    <span className="text-xs font-normal text-[#64748B] normal-case">(11:00 AM – 03:00 PM)</span>
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    {afternoonSlots.filter((s) => s.status === 'AVAILABLE' || s.status === 'LIMITED').length} open
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {afternoonSlots.map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlot?.id === slot.id}
                      isHeld={Boolean(activeLock && activeLock.slotId === slot.id && !isLockExpired)}
                      onClick={() => handleSlotClick(slot)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Evening Shift */}
            {eveningSlots.length > 0 && (
              <section aria-labelledby="shift-evening-heading" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                  <h3 id="shift-evening-heading" className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                    <span>Evening Shift</span>
                    <span className="text-xs font-normal text-[#64748B] normal-case">(04:00 PM – 08:00 PM)</span>
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    {eveningSlots.filter((s) => s.status === 'AVAILABLE' || s.status === 'LIMITED').length} open
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {eveningSlots.map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlot?.id === slot.id}
                      isHeld={Boolean(activeLock && activeLock.slotId === slot.id && !isLockExpired)}
                      onClick={() => handleSlotClick(slot)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Selected Slot Summary (Desktop) */}
        {selectedSlot && activeLock && !isLockExpired && (
          <div className="hidden sm:block mt-8">
            <Card variant="default" padding="md" className="bg-[#F0FDF4] border-[#86EFAC]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#166534]">
                      Reserved Slot Details
                    </p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      {selectedSlot.startTime} – {selectedSlot.endTime}
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {selectedSlot.shift} Shift • Regular Hemodialysis
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleContinue}
                  className="bg-[#006699] hover:bg-[#004C73] text-white shadow font-semibold px-6"
                >
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Container>

      {/* Sticky Bottom Bar for Mobile & Desktop Confirmation */}
      <aside
        aria-label="Booking Confirmation Bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-modal p-4 sm:hidden"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            {selectedSlot && activeLock && !isLockExpired ? (
              <div>
                <p className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Held for you</span>
                </p>
                <p className="text-sm font-bold text-[#0F172A] truncate">
                  {selectedSlot.startTime} – {selectedSlot.endTime}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#64748B]">No slot selected</p>
                <p className="text-xs font-medium text-[#0F172A]">Choose an available slot</p>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={!selectedSlot || !activeLock || isLockExpired || lockMutation.isPending}
            onClick={handleContinue}
            className="flex-shrink-0 bg-[#006699] hover:bg-[#004C73] text-white font-semibold"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Button>
        </div>
      </aside>
    </div>
  );
};
