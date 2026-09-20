import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Skeleton } from '../components/ui/Skeleton';
import { useHospitalSlots } from '../hooks/useHospitalSlots';
import { useHospitals } from '../hooks/useHospitals';
import { DialysisSlot } from '../types/dialysis.types';

export const Availability: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hospitalId = searchParams.get('hospitalId') || '';
  const date = searchParams.get('date') || '';
  const shift = searchParams.get('shift') || '';
  const location = searchParams.get('location') || '';

  // 1. Fetch hospital details to show accurate name and address
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

  const handleBackToSearch = () => {
    const backParams = new URLSearchParams();
    if (location) backParams.set('location', location);
    else if (selectedHospital?.branch) backParams.set('location', selectedHospital.branch);
    else if (selectedHospital?.address?.city) backParams.set('location', selectedHospital.address.city);
    if (date) backParams.set('date', date);
    if (shift && shift !== 'ANY') backParams.set('shift', shift);
    navigate(`/find-dialysis?${backParams.toString()}`);
  };

  // If no hospital or date was selected, guide patient to search
  if (!hospitalId || !date) {
    return (
      <div className="flex-1 pb-16">
        <PageHeader
          breadcrumbs={[
            { label: 'Find a Dialysis Slot', href: '/find-dialysis' },
            { label: 'Slot Selection' },
          ]}
          eyebrow="Clinical Slot Registry"
          title="Dialysis Slot Selection"
          description="View station availability for your chosen Srikara Hospital branch."
        />
        <Container className="mt-8 max-w-2xl">
          <EmptyState
            title="No hospital branch selected"
            description="Please search for availability first and select a hospital branch to view open dialysis slots."
            actionLabel="Search Availability"
            onAction={() => navigate('/find-dialysis')}
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-16">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={[
          { label: 'Find a Dialysis Slot', href: '/find-dialysis' },
          { label: 'Available Options', href: `/find-dialysis?date=${date}&location=${location || ''}` },
          { label: 'Slot Selection' },
        ]}
        eyebrow="Real-Time Station Registry"
        title="Select Dialysis Slot"
        description="Choose a confirmed dialysis slot. Real-time station capacity directly verified by Srikara clinical operations."
      />

      <Container className="mt-8 max-w-4xl">
        {/* Hospital & Date Overview Banner */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F2444]">
                    {hospitalDisplayName}
                  </h2>
                  {hospitalDisplayAddress && (
                    <p className="text-xs sm:text-sm text-[#475569] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" aria-hidden="true" />
                      <span>{hospitalDisplayAddress}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBackToSearch}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="self-start sm:self-center shrink-0"
            >
              Back to Results
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs sm:text-sm text-[#475569]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              <span className="font-semibold text-[#0F172A]">{formatReadableDate(date)}</span>
            </div>

            {shift && shift !== 'ANY' && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
                <span>Preferred: {shift}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[#0F766E] ml-auto">
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
              <span className="font-medium text-xs">Standard 4-Hour Hemodialysis Session</span>
            </div>
          </div>
        </div>

        {/* SLOTS LIST SECTION */}
        <div className="space-y-4" aria-live="polite">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0F2444] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              <span>Available Dialysis Stations</span>
            </h3>

            {slots && (
              <span className="text-xs text-[#64748B]">
                {slots.length} {slots.length === 1 ? 'slot session' : 'slot sessions'} found
              </span>
            )}
          </div>

          {/* Loading Skeletons */}
          {isLoadingSlots && (
            <div className="space-y-3" role="status" aria-label="Loading dialysis slots">
              {[1, 2, 3].map((i) => (
                <Card key={i} variant="default" padding="md" className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <Skeleton width={180} height={20} className="rounded-md" />
                      <Skeleton width={130} height={14} className="rounded-md" />
                    </div>
                    <Skeleton width={120} height={38} className="rounded-btn" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoadingSlots && isSlotsError && (
            <ErrorState
              title="We couldn't load slots right now."
              message="Failed to retrieve slot allocations from the Srikara central registry. Please check your connection and try again."
              onRetry={() => refetchSlots()}
            />
          )}

          {/* Empty State */}
          {!isLoadingSlots && !isSlotsError && (!slots || slots.length === 0) && (
            <EmptyState
              title="No slots open for this date"
              description="All dialysis stations for this branch on the selected date are fully booked or undergoing clinical servicing. Please select another date."
              actionLabel="Change Date or Branch"
              onAction={handleBackToSearch}
            />
          )}

          {/* Success: Real Slot Cards from Central Backend */}
          {!isLoadingSlots && !isSlotsError && slots && slots.length > 0 && (
            <div className="space-y-3">
              {slots.map((slot: DialysisSlot) => {
                const isFull = slot.status === 'UNAVAILABLE' || slot.availableCount === 0;

                return (
                  <Card
                    key={slot.id}
                    variant="default"
                    padding="md"
                    className="p-5 hover:border-[#CBD5E1] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Slot Details */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base sm:text-lg font-bold text-[#0F2444]">
                            {slot.startTime} – {slot.endTime}
                          </span>

                          <Badge variant="primary" size="sm">
                            {slot.shift}
                          </Badge>

                          {slot.status === 'AVAILABLE' && (
                            <Badge variant="success" size="sm">
                              Available
                            </Badge>
                          )}
                          {(slot.status === 'LIMITED' || slot.status === 'FEW_LEFT') && (
                            <Badge variant="warning" size="sm">
                              Limited Seats
                            </Badge>
                          )}
                          {slot.status === 'WAITLIST' && (
                            <Badge variant="info" size="sm">
                              Waitlist
                            </Badge>
                          )}
                          {isFull && (
                            <Badge variant="error" size="sm">
                              Full
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-[#64748B] flex items-center gap-1.5">
                          <span>
                            {slot.availableCount} of {slot.totalCount} dialysis stations open
                          </span>
                        </p>
                      </div>

                      {/* CTA — navigates to HospitalSlots (Phase 3: lock → OTP → booking) */}
                      <div>
                        <Button
                          type="button"
                          variant={isFull ? 'outline' : 'primary'}
                          size="sm"
                          disabled={isFull}
                          className="w-full sm:w-auto min-w-[140px]"
                          onClick={() => {
                            const params = new URLSearchParams();
                            if (date) params.set('date', date);
                            if (shift && shift !== 'ANY') params.set('shift', shift);
                            if (location) params.set('location', location);
                            navigate(`/hospital/${hospitalId}/slots?${params.toString()}`);
                          }}
                        >
                          {isFull ? 'Fully Booked' : 'Book Slot'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Info banner */}
          <div className="mt-8 p-4 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-start gap-3 text-xs text-[#0F766E]">
            <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#0F2444]">
                Secure Real-Time Slot Booking
              </p>
              <p className="mt-0.5 text-[#0F766E]">
                All station counts are retrieved live from Srikara Clinical API. Clicking "Book Slot" places a temporary hold and guides you through OTP verification and patient details before confirming your appointment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
