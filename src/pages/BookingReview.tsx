import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  AlertCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Send,
  Edit2,
  Activity,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { BookingProgress } from '../components/slots/BookingProgress';
import { useHospitals } from '../hooks/useHospitals';
import { useHospitalSlots } from '../hooks/useHospitalSlots';
import { useCreateBooking } from '../hooks/useBooking';
import { PatientDetailsFormValues } from '../schemas/patientDetails.schema';

export const BookingReview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const slotId = searchParams.get('slotId') || '';
  const lockId = searchParams.get('lockId') || '';
  const hospitalId = searchParams.get('hospitalId') || '';
  const date = searchParams.get('date') || '';
  const phone = searchParams.get('phone') || '';

  // Retrieve hospital & slot data from API (backend single source of truth)
  const { data: hospitals } = useHospitals();
  const selectedHospital = (hospitals || []).find((h) => h.id === hospitalId);

  const { data: slots } = useHospitalSlots(hospitalId, date, undefined, {
    enabled: Boolean(hospitalId && date),
  });
  const selectedSlot = (slots || []).find((s) => s.id === slotId);

  // Retrieve patient details from session cache
  const patientDetails: PatientDetailsFormValues | null = (() => {
    try {
      const stored = sessionStorage.getItem('srikara_patient_details');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  // Booking mutation
  const bookingMutation = useCreateBooking();

  // Submission / error state
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSlotExpiredOrConflict, setIsSlotExpiredOrConflict] = useState(false);

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

  const handleSubmitBooking = async () => {
    if (!patientDetails || !slotId || !hospitalId || !date) return;
    if (bookingMutation.isPending) return; // Prevent double submission

    setSubmissionError(null);
    setIsSlotExpiredOrConflict(false);

    try {
      const res = await bookingMutation.mutateAsync({
        slotId,
        hospitalId,
        date,
        patient: {
          fullName: patientDetails.fullName,
          phone: patientDetails.mobile,
          age: patientDetails.age,
          gender: patientDetails.gender,
          medicalRecordNumber: patientDetails.medicalRecordNumber,
        },
        notes: patientDetails.notes,
      });

      // Clear cached details on success and navigate to confirmation screen
      sessionStorage.removeItem('srikara_patient_details');
      navigate('/booking/submitted', { state: { booking: res.data } });
    } catch (err: any) {
      const status = err?.statusCode || err?.status;
      const code = err?.code;

      if (status === 409 || status === 410 || code === 'SLOT_EXPIRED' || code === 'SLOT_UNAVAILABLE') {
        setIsSlotExpiredOrConflict(true);
        setSubmissionError('Your selected slot is no longer available.');
      } else {
        setSubmissionError(
          err?.message || 'We could not submit your booking request. Please check your connection and try again.'
        );
      }
    }
  };



  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-28 sm:pb-16 pt-6">
      <Container size="md">
        {/* Progress Stepper - Step 5 is active */}
        <div className="mb-6">
          <BookingProgress currentStep={5} hasHold={!isSlotExpiredOrConflict} />
        </div>

        {/* Back navigation */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006699] rounded px-1.5 py-1"
            aria-label="Go back to patient details"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Patient Details</span>
          </button>
        </div>

        {/* Main Review Card */}
        <div className="space-y-6">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] mb-2">
              <Activity className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Final Verification</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              Review Your Booking
            </h1>
            <p className="text-sm text-[#475569] mt-1">
              Please inspect your appointment schedule and patient details before transmitting the reservation request.
            </p>
          </div>

          {/* Expired Slot / Conflict Recovery Alert */}
          {isSlotExpiredOrConflict && (
            <div
              role="alert"
              className="bg-[#FEF2F2] border border-[#F87171] rounded-card p-4 text-[#991B1B] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">Your selected slot is no longer available.</p>
                  <p className="text-xs text-[#7F1D1D] mt-0.5">
                    The slot hold has expired or was secured by another patient. Please choose another slot.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/hospital/${hospitalId}/slots?date=${date}`)}
                className="border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] flex-shrink-0 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                Choose Another Slot
              </Button>
            </div>
          )}

          {/* General Submission Error Alert */}
          {submissionError && !isSlotExpiredOrConflict && (
            <Alert type="error" onDismiss={() => setSubmissionError(null)}>
              {submissionError}
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Section 1: Appointment Details */}
            <div className="lg:col-span-6 space-y-6">
              <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 mb-4">
                  <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                    <span>Appointment Details</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate(`/hospital/${hospitalId}/slots?date=${date}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#006699] hover:underline"
                  >
                    <Edit2 className="w-3 h-3" aria-hidden="true" />
                    <span>Change Slot</span>
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[#64748B] block mb-0.5">Hospital Center:</span>
                    <p className="font-bold text-sm text-[#0F172A]">
                      {selectedHospital?.name || 'Srikara Hospital'}
                    </p>
                    {selectedHospital?.branch && (
                      <p className="text-[#006699] font-medium">{selectedHospital.branch} Branch</p>
                    )}
                    {selectedHospital?.address?.line1 && (
                      <p className="text-[#64748B] mt-0.5">{selectedHospital.address.line1}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#F8FAFC]">
                    <span className="text-[#64748B] block mb-0.5">Date:</span>
                    <p className="font-semibold text-[#0F172A]">{formatReadableDate(date)}</p>
                  </div>

                  <div className="pt-2 border-t border-[#F8FAFC]">
                    <span className="text-[#64748B] block mb-0.5">Dialysis Time:</span>
                    <p className="font-semibold text-[#0F172A]">
                      {selectedSlot?.startTime && selectedSlot?.endTime
                        ? `${selectedSlot.startTime} – ${selectedSlot.endTime}`
                        : 'Scheduled Shift'}
                      {selectedSlot?.shift ? ` (${selectedSlot.shift} Shift)` : ''}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F8FAFC]">
                    <span className="text-[#64748B] block mb-0.5">Care Type:</span>
                    <p className="font-semibold text-[#0F172A]">Hemodialysis Therapy</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Section 2: Patient Details */}
            <div className="lg:col-span-6 space-y-6">
              <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 mb-4">
                  <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#006699]" aria-hidden="true" />
                    <span>Patient Information</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams({
                        slotId,
                        lockId,
                        hospitalId,
                        date,
                        phone,
                      });
                      navigate(`/book/patient-details?${params.toString()}`);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#006699] hover:underline"
                  >
                    <Edit2 className="w-3 h-3" aria-hidden="true" />
                    <span>Edit Details</span>
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[#64748B] block mb-0.5">Full Name:</span>
                    <p className="font-bold text-sm text-[#0F172A]">
                      {patientDetails?.fullName || 'Not specified'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F8FAFC]">
                    <span className="text-[#64748B] block mb-0.5">Mobile Number:</span>
                    <p className="font-semibold text-[#0F172A]">
                      +91 {patientDetails?.mobile || phone || 'Not specified'}
                    </p>
                  </div>

                  {patientDetails?.email && (
                    <div className="pt-2 border-t border-[#F8FAFC]">
                      <span className="text-[#64748B] block mb-0.5">Email Address:</span>
                      <p className="font-semibold text-[#0F172A]">{patientDetails.email}</p>
                    </div>
                  )}

                  {(patientDetails?.age || patientDetails?.gender) && (
                    <div className="pt-2 border-t border-[#F8FAFC] flex items-center gap-6">
                      {patientDetails.age && (
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Age:</span>
                          <p className="font-semibold text-[#0F172A]">{patientDetails.age} Years</p>
                        </div>
                      )}
                      {patientDetails.gender && (
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Gender:</span>
                          <p className="font-semibold text-[#0F172A] capitalize">
                            {patientDetails.gender.toLowerCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {patientDetails?.medicalRecordNumber && (
                    <div className="pt-2 border-t border-[#F8FAFC]">
                      <span className="text-[#64748B] block mb-0.5">Srikara MRN:</span>
                      <p className="font-semibold text-[#0F172A]">
                        {patientDetails.medicalRecordNumber}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Pre-submission Notice */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-card p-4 text-xs text-[#1E40AF] space-y-1.5">
                <p className="font-bold">Important Notice</p>
                <p className="leading-relaxed">
                  Your booking request will be sent to the hospital for confirmation.
                </p>
              </div>

              {/* Desktop CTA */}
              <div className="hidden sm:block">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={bookingMutation.isPending || isSlotExpiredOrConflict}
                  onClick={handleSubmitBooking}
                  className="bg-[#006699] hover:bg-[#004C73] text-white font-bold py-3.5 shadow-md"
                >
                  {bookingMutation.isPending ? 'Submitting...' : 'Submit Booking Request'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Sticky Bottom Bar on Mobile */}
      <aside
        aria-label="Submit booking bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-modal p-4 sm:hidden"
      >
        <Button
          type="button"
          variant="primary"
          size="md"
          fullWidth
          disabled={bookingMutation.isPending || isSlotExpiredOrConflict}
          onClick={handleSubmitBooking}
          className="bg-[#006699] hover:bg-[#004C73] text-white font-bold"
        >
          {bookingMutation.isPending ? 'Submitting...' : 'Submit Booking Request'}
        </Button>
      </aside>
    </div>
  );
};
