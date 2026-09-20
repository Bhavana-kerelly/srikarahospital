import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ShieldCheck, ArrowRight, Activity, Lock } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !/^[6-9]\d{9}$/.test(phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMessage(null);
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpValue || otpValue.length !== 6) {
      setErrorMessage('Please enter a 6-digit verification code');
      return;
    }
    // Phase 1 foundation: show professional patient-facing message
    setErrorMessage(
      'Verification is not yet active. Full OTP authentication will be enabled with the live backend in the next release.'
    );
  };

  return (
    <div className="flex-1 py-12 sm:py-16 bg-[#F8FAFC]">
      <Container size="sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F2444] text-white mb-3">
            <Activity className="w-6 h-6 text-[#0D9488]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2444]">
            Patient Portal Login
          </h1>
          <p className="text-sm text-[#475569] mt-2">
            Access your verified dialysis bookings and appointment schedules.
          </p>
        </div>

        <Card variant="default" padding="lg" className="max-w-md mx-auto shadow-md">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#F1F5F9]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              {otpSent ? 'Enter Verification Code' : 'Mobile Verification'}
            </span>
            <Badge variant="teal" size="sm">
              Secure OTP
            </Badge>
          </div>

          {errorMessage && (
            <div className="mb-4">
              <Alert type="error" onDismiss={() => setErrorMessage(null)}>
                {errorMessage}
              </Alert>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Input
                label="Mobile Number"
                type="tel"
                placeholder="10-digit mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                startIcon={<Phone className="w-4 h-4" />}
                helperText="A 6-digit one-time password will be sent via SMS"
                maxLength={10}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Verification Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-xs text-[#475569] bg-[#EFF6FF] p-3 rounded-md border border-[#BFDBFE]">
                Code sent to: <strong>+91 {phoneNumber}</strong>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setErrorMessage(null);
                  }}
                  className="block text-[#2563EB] hover:underline mt-1 font-semibold"
                >
                  Change number
                </button>
              </div>

              <Input
                label="6-Digit OTP"
                type="text"
                placeholder="Enter 6-digit code"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                startIcon={<Lock className="w-4 h-4" />}
                maxLength={6}
                required
              />

              <Button
                type="submit"
                variant="secondary"
                size="md"
                fullWidth
              >
                Verify & Continue
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-center text-xs text-[#64748B] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Protected by Srikara Clinical Security Policies</span>
          </div>
        </Card>
      </Container>
    </div>
  );
};
