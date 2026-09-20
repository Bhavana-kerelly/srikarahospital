import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Phone,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { OtpInput } from '../components/auth/OtpInput';
import { BookingProgress } from '../components/slots/BookingProgress';
import { BookingSummaryCard } from '../components/booking/BookingSummaryCard';
import { authApi } from '../api/auth.api';
import { useHospitals } from '../hooks/useHospitals';
import { useHospitalSlots } from '../hooks/useHospitalSlots';

export const OtpVerification: React.FC = () => {
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

  // States
  const [mobileNumber, setMobileNumber] = useState(phoneParam || '');
  const [otpValue, setOtpValue] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(Boolean(phoneParam));
  const [cooldown, setCooldown] = useState<number>(0);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExpiredError, setIsExpiredError] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setErrorMessage(null);
    setIsExpiredError(false);
    setIsSending(true);

    try {
      const res = await authApi.sendOtp({ phone: mobileNumber });
      setIsOtpSent(true);
      setOtpValue('');
      // Use backend cooldown if provided, fallback to standard 30s
      setCooldown(res.data?.cooldownSeconds || 30);
    } catch (err: any) {
      setErrorMessage(
        err?.message || "We couldn't send the verification code right now. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otpValue || otpValue.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setErrorMessage(null);
    setIsExpiredError(false);
    setIsVerifying(true);

    try {
      const res = await authApi.verifyOtp({ phone: mobileNumber, otp: otpValue });
      if (res.data?.token) {
        localStorage.setItem('srikara_patient_token', res.data.token);
      }

      // Next step: patient details
      const params = new URLSearchParams({
        slotId,
        lockId,
        hospitalId,
        date,
        phone: mobileNumber,
      });
      navigate(`/book/patient-details?${params.toString()}`);
    } catch (err: any) {
      const status = err?.statusCode || err?.status;
      const code = err?.code;
      if (status === 410 || code === 'OTP_EXPIRED') {
        setIsExpiredError(true);
        setErrorMessage('This verification code has expired. Please request a new code.');
      } else if (status === 400 || code === 'INVALID_OTP') {
        setErrorMessage('The code you entered is incorrect. Please check and try again.');
      } else {
        setErrorMessage(
          err?.message || "We couldn't verify your number right now. Please try again."
        );
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-24 sm:pb-16 pt-6">
      <Container size="md">
        {/* Progress Stepper - Step 3 is active */}
        <div className="mb-6">
          <BookingProgress currentStep={3} hasHold={true} />
        </div>

        {/* Back navigation */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006699] rounded px-1.5 py-1"
            aria-label="Go back to slot selection"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Slot Selection</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Verification Card */}
          <div className="lg:col-span-7 space-y-4">
            <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-sm">
              <div className="mb-6 text-center sm:text-left">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span>Verified Patient Access</span>
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  Verify your mobile number
                </h1>
                <p className="text-sm text-[#475569] mt-1.5">
                  {isOtpSent
                    ? `Enter the 6-digit verification code sent to +91 ${mobileNumber}.`
                    : 'We will send a secure verification code to confirm your appointment reservation.'}
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6">
                  <Alert type="error" onDismiss={() => setErrorMessage(null)}>
                    {errorMessage}
                  </Alert>
                </div>
              )}

              {!isOtpSent ? (
                /* Phase A: Mobile Input */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <Input
                    label="Mobile Number"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    startIcon={<Phone className="w-4 h-4 text-[#94A3B8]" />}
                    helperText="We will send an SMS with a one-time verification code."
                    required
                    autoFocus
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSending || mobileNumber.length !== 10}
                    className="bg-[#006699] hover:bg-[#004C73] text-white font-semibold"
                  >
                    {isSending ? 'Sending Code...' : 'Send Verification Code'}
                  </Button>
                </form>
              ) : (
                /* Phase B: 6-Digit OTP Input */
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-[#475569]">Enter 6-digit Code</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOtpSent(false);
                          setOtpValue('');
                          setErrorMessage(null);
                        }}
                        className="text-[#006699] hover:underline font-semibold"
                      >
                        Change Number
                      </button>
                    </div>

                    <OtpInput
                      value={otpValue}
                      onChange={setOtpValue}
                      length={6}
                      disabled={isVerifying}
                      hasError={Boolean(errorMessage)}
                      autoFocus
                    />
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isVerifying || otpValue.length !== 6}
                    onClick={() => handleVerifyOtp()}
                    className="bg-[#006699] hover:bg-[#004C73] text-white font-semibold"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                  </Button>

                  {/* Resend OTP Section */}
                  <div className="pt-2 text-center border-t border-[#F1F5F9]">
                    <p className="text-xs text-[#64748B] mb-2">Didn't receive the code?</p>
                    {cooldown > 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] font-medium">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Resend code in {cooldown}s</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        disabled={isSending}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#006699] hover:text-[#004C73] transition-colors focus:outline-none focus:underline"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Resend OTP</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
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

            <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-card p-3.5 text-xs text-[#166534]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-bold">Slot is currently held</p>
                  <p className="text-[#15803D] mt-0.5 leading-relaxed">
                    Your dialysis machine reservation is active while you complete this step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
