import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  ShieldCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ErrorState } from '../components/ui/ErrorState';
import { Skeleton } from '../components/ui/Skeleton';
import { BookingStatusBadge } from '../components/booking/BookingStatusBadge';
import { BookingTimeline } from '../components/booking/BookingTimeline';
import { CancelBookingModal } from '../components/booking/CancelBookingModal';
import { useBooking, useCancelBooking } from '../hooks/useBookings';
import { useHospitals } from '../hooks/useHospitals';
import { Booking } from '../types/booking.types';

export const BookingDetails: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading, isError, refetch } = useBooking(id);
  const { data: hospitals } = useHospitals();
  const hospital = (hospitals || []).find((h) => h.id === booking?.hospitalId);

  // Cancellation state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelErrorMessage, setCancelErrorMessage] = useState<string | null>(null);
  const cancelMutation = useCancelBooking();

  const formatReadableDate = (dateStr?: string) => {
    if (!dateStr) return '';
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

  const canCancel =
    booking?.status === 'PENDING' ||
    booking?.status === 'REQUESTED' ||
    booking?.status === 'CONFIRMED';

  const handleConfirmCancel = async () => {
    if (!booking) return;
    setCancelErrorMessage(null);

    try {
      await cancelMutation.mutateAsync({ id: booking.id });
      setIsCancelModalOpen(false);
      refetch();
    } catch (err: any) {
      setCancelErrorMessage(
        err?.message || "We couldn't cancel this booking right now. Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-16 pt-8">
        <Container size="md">
          <div className="space-y-6">
            <Skeleton width="40%" height={28} className="rounded" />
            <Skeleton width="100%" height={160} className="rounded-card" />
            <Skeleton width="100%" height={220} className="rounded-card" />
          </div>
        </Container>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-16 pt-12">
        <Container size="sm">
          <Card variant="default" padding="lg">
            <ErrorState
              title="We couldn't find this booking."
              message="The booking record might have been removed or you do not have authorization to view it."
              onRetry={() => refetch()}
            />
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/my-bookings')}
              >
                Go to My Bookings
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-20 pt-6">
      <Container size="md">
        {/* Back navigation */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate('/my-bookings')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006699] rounded px-1.5 py-1"
            aria-label="Back to all bookings"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to My Bookings</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#64748B]">Booking Reference:</span>
                  <span className="text-xs font-bold text-[#0F172A] font-mono">
                    {booking.bookingReference || booking.id}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
                  Dialysis Session Details
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <BookingStatusBadge status={booking.status} />
                {canCancel && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCancelModalOpen(true)}
                    className="border-[#DC2626] text-[#DC2626] hover:bg-[#FEF2F2] text-xs font-semibold"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#64748B] block">Hospital Center:</span>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-[#006699] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm">{booking.hospitalName}</p>
                    {hospital?.branch && (
                      <p className="text-[#006699] font-medium">{hospital.branch} Branch</p>
                    )}
                    {hospital?.address?.line1 && (
                      <p className="text-[#64748B] mt-0.5">{hospital.address.line1}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[#64748B] block">Date & Time:</span>
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A] mt-0.5">
                    <Calendar className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                    <span>{formatReadableDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A] mt-1">
                    <Clock className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                    <span>
                      {booking.startTime} – {booking.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Details & Live Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Status Timeline */}
            <div className="lg:col-span-7">
              <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] border-b border-[#F1F5F9] pb-3 mb-4">
                  Session Progression
                </h2>
                <BookingTimeline
                  currentStatus={booking.status}
                  createdAt={booking.createdAt}
                />
              </Card>
            </div>

            {/* Patient Information */}
            <div className="lg:col-span-5 space-y-4">
              <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] border-b border-[#F1F5F9] pb-3 mb-4">
                  Patient Information
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#64748B] block mb-0.5">Patient Name:</span>
                    <p className="font-bold text-sm text-[#0F172A]">{booking.patient.fullName}</p>
                  </div>

                  <div className="pt-2 border-t border-[#F8FAFC]">
                    <span className="text-[#64748B] block mb-0.5">Contact Number:</span>
                    <p className="font-semibold text-[#0F172A]">+91 {booking.patient.phone}</p>
                  </div>

                  {(booking.patient.age || booking.patient.gender) && (
                    <div className="pt-2 border-t border-[#F8FAFC] flex items-center gap-6">
                      {booking.patient.age && (
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Age:</span>
                          <p className="font-semibold text-[#0F172A]">{booking.patient.age} Yrs</p>
                        </div>
                      )}
                      {booking.patient.gender && (
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Gender:</span>
                          <p className="font-semibold text-[#0F172A] capitalize">
                            {booking.patient.gender.toLowerCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {booking.patient.medicalRecordNumber && (
                    <div className="pt-2 border-t border-[#F8FAFC]">
                      <span className="text-[#64748B] block mb-0.5">Srikara MRN:</span>
                      <p className="font-semibold text-[#0F172A]">
                        {booking.patient.medicalRecordNumber}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Support Notice */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-card p-4 text-xs text-[#1E40AF] space-y-1">
                <p className="font-bold">Need Help with your Appointment?</p>
                <p className="leading-relaxed">
                  For immediate coordination or transport support, contact the hospital dialysis center reception.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Modal */}
        <CancelBookingModal
          isOpen={isCancelModalOpen}
          booking={booking}
          isLoading={cancelMutation.isPending}
          errorMessage={cancelErrorMessage}
          onConfirm={handleConfirmCancel}
          onClose={() => {
            setIsCancelModalOpen(false);
            setCancelErrorMessage(null);
          }}
        />
      </Container>
    </div>
  );
};
