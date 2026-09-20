import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookingStatusBadge } from '../components/booking/BookingStatusBadge';
import { Booking } from '../types/booking.types';

export const BookingSubmitted: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve actual booking data returned from the backend
  const booking: Booking | null = location.state?.booking || null;

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

  // If page was directly accessed without state
  if (!booking) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-16 pt-12">
        <Container size="sm">
          <Card variant="default" padding="lg" className="text-center shadow-sm">
            <h1 className="text-xl font-bold text-[#0F172A]">No Booking Information Found</h1>
            <p className="text-xs text-[#64748B] mt-2 mb-6">
              You can review your existing appointments in the patient bookings portal.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/my-bookings')}
              className="bg-[#006699] hover:bg-[#004C73] text-white"
            >
              Go to My Bookings
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  const isConfirmed = booking.status === 'CONFIRMED';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-20 pt-10">
      <Container size="sm">
        <Card variant="default" padding="lg" className="border-[#E2E8F0] shadow-md text-center">
          {/* Calm, trustworthy healthcare icon */}
          <div className="w-14 h-14 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#006699] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Request Received</span>
          </span>

          <h1 className="text-2xl font-extrabold text-[#0F172A]">
            Booking Request Submitted
          </h1>

          <p className="text-sm text-[#475569] mt-2 max-w-md mx-auto leading-relaxed">
            {isConfirmed
              ? 'Your dialysis appointment has been confirmed by the hospital staff.'
              : 'Your appointment request has been transmitted to the hospital. A dialysis coordinator will review and confirm your session.'}
          </p>

          {/* Appointment Summary Box */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-card p-4 mt-6 text-left space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
              <span className="text-[#64748B]">Booking ID:</span>
              <span className="font-bold text-[#0F172A] font-mono text-sm">
                {booking.bookingReference || booking.id}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
              <span className="text-[#64748B]">Hospital Center:</span>
              <span className="font-semibold text-[#0F172A] text-right">
                {booking.hospitalName}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
              <span className="text-[#64748B]">Date & Time:</span>
              <span className="font-semibold text-[#0F172A] text-right">
                {formatReadableDate(booking.date)} • {booking.startTime} – {booking.endTime}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
              <span className="text-[#64748B]">Patient Name:</span>
              <span className="font-semibold text-[#0F172A]">{booking.patient.fullName}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[#64748B]">Current Status:</span>
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>

          {/* Next Steps Information */}
          <div className="mt-6 p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-card text-left text-xs text-[#166534] space-y-1">
            <p className="font-bold">Next Steps</p>
            <p className="leading-relaxed text-[#15803D]">
              Please arrive 15 minutes before your scheduled session. If any pre-dialysis lab reports are required, the hospital care team will contact you.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/booking/${booking.id}`)}
              className="bg-[#006699] hover:bg-[#004C73] text-white font-semibold w-full sm:w-auto"
            >
              <span>View Booking</span>
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/my-bookings')}
              className="w-full sm:w-auto font-semibold"
            >
              Go to My Bookings
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};
