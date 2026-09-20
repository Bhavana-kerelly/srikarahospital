import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { BookingProgress } from '../components/slots/BookingProgress';
import { BookingSummaryCard } from '../components/booking/BookingSummaryCard';
import {
  patientDetailsSchema,
  PatientDetailsFormValues,
} from '../schemas/patientDetails.schema';
import { useHospitals } from '../hooks/useHospitals';
import { useHospitalSlots } from '../hooks/useHospitalSlots';

export const PatientDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const slotId = searchParams.get('slotId') || '';
  const lockId = searchParams.get('lockId') || '';
  const hospitalId = searchParams.get('hospitalId') || '';
  const date = searchParams.get('date') || '';
  const phoneParam = searchParams.get('phone') || '';

  // Retrieve hospital & slot info for context
  const { data: hospitals } = useHospitals();
  const selectedHospital = (hospitals || []).find((h) => h.id === hospitalId);

  const { data: slots } = useHospitalSlots(hospitalId, date, undefined, {
    enabled: Boolean(hospitalId && date),
  });
  const selectedSlot = (slots || []).find((s) => s.id === slotId);

  // Read any pre-filled or cached patient details
  const cachedDetails = (() => {
    try {
      const stored = sessionStorage.getItem('srikara_patient_details');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientDetailsFormValues>({
    resolver: zodResolver(patientDetailsSchema),
    defaultValues: {
      fullName: cachedDetails?.fullName || '',
      mobile: phoneParam || cachedDetails?.mobile || '',
      email: cachedDetails?.email || '',
      age: cachedDetails?.age || undefined,
      gender: cachedDetails?.gender || undefined,
      emergencyContact: cachedDetails?.emergencyContact || '',
      medicalRecordNumber: cachedDetails?.medicalRecordNumber || '',
      notes: cachedDetails?.notes || '',
    },
  });

  const onSubmit = (data: PatientDetailsFormValues) => {
    // Save to session storage for booking review pre-submission
    sessionStorage.setItem('srikara_patient_details', JSON.stringify(data));

    const params = new URLSearchParams({
      slotId,
      lockId,
      hospitalId,
      date,
      phone: data.mobile,
    });
    navigate(`/book/review?${params.toString()}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-28 sm:pb-16 pt-6">
      <Container size="md">
        {/* Progress Stepper - Step 4 is active */}
        <div className="mb-6">
          <BookingProgress currentStep={4} hasHold={true} />
        </div>

        {/* Back navigation */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006699] rounded px-1.5 py-1"
            aria-label="Go back to mobile verification"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Verification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Form */}
          <div className="lg:col-span-7 space-y-6">
            <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] mb-2">
                  <User className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span>Patient Information</span>
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  Enter Patient Details
                </h1>
                <p className="text-sm text-[#475569] mt-1">
                  Provide patient details for the hospital appointment roster and clinical records.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Section 1: Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] border-b border-[#F1F5F9] pb-2">
                    Personal Information
                  </h2>

                  <Input
                    label="Full Name"
                    placeholder="Enter patient full legal name"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                    startIcon={<User className="w-4 h-4 text-[#94A3B8]" />}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Age (Years)"
                      type="number"
                      placeholder="e.g. 54"
                      {...register('age', { valueAsNumber: true })}
                      error={errors.age?.message}
                    />

                    <Select
                      label="Gender"
                      {...register('gender')}
                      error={errors.gender?.message}
                      options={[
                        { value: '', label: 'Select Gender' },
                        { value: 'MALE', label: 'Male' },
                        { value: 'FEMALE', label: 'Female' },
                        { value: 'OTHER', label: 'Other' },
                      ]}
                    />
                  </div>
                </div>

                {/* Section 2: Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] border-b border-[#F1F5F9] pb-2">
                    Contact Information
                  </h2>

                  <Input
                    label="Primary Mobile Number"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    {...register('mobile')}
                    error={errors.mobile?.message}
                    startIcon={<Phone className="w-4 h-4 text-[#94A3B8]" />}
                    required
                  />

                  <Input
                    label="Email Address (Optional)"
                    type="email"
                    placeholder="name@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                    startIcon={<Mail className="w-4 h-4 text-[#94A3B8]" />}
                    helperText="Appointment confirmation and dialysis guidelines will be emailed if provided."
                  />

                  <Input
                    label="Emergency Contact Number (Optional)"
                    type="tel"
                    placeholder="Family member or attendant mobile"
                    maxLength={10}
                    {...register('emergencyContact')}
                    error={errors.emergencyContact?.message}
                    startIcon={<Phone className="w-4 h-4 text-[#94A3B8]" />}
                  />
                </div>

                {/* Section 3: Hospital & Clinical ID (Optional) */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] border-b border-[#F1F5F9] pb-2">
                    Hospital Record ID (Optional)
                  </h2>

                  <Input
                    label="Existing Srikara MRN / Patient ID"
                    placeholder="e.g. SRK-104928 (if existing patient)"
                    {...register('medicalRecordNumber')}
                    error={errors.medicalRecordNumber?.message}
                    helperText="Leave blank if this is the patient's first session at Srikara Hospitals."
                  />
                </div>

                {/* Desktop Action */}
                <div className="pt-4 border-t border-[#F1F5F9] hidden sm:block">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    className="bg-[#006699] hover:bg-[#004C73] text-white font-semibold"
                  >
                    <span>Proceed to Booking Review</span>
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Appointment Context Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <BookingSummaryCard
              hospitalName={selectedHospital?.name || 'Srikara Hospital'}
              branch={selectedHospital?.branch || selectedHospital?.address?.city}
              address={selectedHospital?.address?.line1 || selectedHospital?.address?.city}
              date={date}
              startTime={selectedSlot?.startTime}
              endTime={selectedSlot?.endTime}
              shift={selectedSlot?.shift}
            />

            <div className="bg-white border border-[#E2E8F0] rounded-card p-4 text-xs text-[#475569] space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
                <ShieldCheck className="w-4 h-4 text-[#00A86B]" aria-hidden="true" />
                <span>Patient Privacy & Clinical Care</span>
              </div>
              <p className="leading-relaxed">
                Your medical and personal information is stored securely in compliance with healthcare data protection standards.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Sticky Bottom Bar on Mobile */}
      <aside
        aria-label="Patient details submit bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-modal p-4 sm:hidden"
      >
        <Button
          type="button"
          variant="primary"
          size="md"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          className="bg-[#006699] hover:bg-[#004C73] text-white font-semibold"
        >
          <span>Review Booking</span>
          <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
        </Button>
      </aside>
    </div>
  );
};
