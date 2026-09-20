import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  XCircle,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BookingStatusBadge } from './BookingStatusBadge';
import { Booking } from '../../types/booking.types';

export interface BookingCardProps {
  booking: Booking;
  onCancel?: (booking: Booking) => void;
  className?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancel,
  className = '',
}) => {
  const navigate = useNavigate();

  const formatReadableDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Cancellation is only permitted when pending/requested or confirmed
  const canCancel =
    booking.status === 'PENDING' ||
    booking.status === 'REQUESTED' ||
    booking.status === 'CONFIRMED';

  return (
    <Card
      variant="default"
      padding="md"
      className={`border-[#E2E8F0] hover:border-[#CBD5E1] transition-all shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B]">Booking ID:</span>
          <span className="text-xs font-bold text-[#0F172A] font-mono">
            {booking.bookingReference || booking.id}
          </span>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="py-3 space-y-2">
        <div className="flex items-start gap-2">
          <Building2 className="w-4 h-4 text-[#006699] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="text-sm font-bold text-[#0F172A]">{booking.hospitalName}</h4>
            <p className="text-xs text-[#64748B]">Hemodialysis Therapy</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#475569]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" aria-hidden="true" />
            <span>{formatReadableDate(booking.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#64748B]" aria-hidden="true" />
            <span>
              {booking.startTime} – {booking.endTime}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F1F5F9]">
        {canCancel && onCancel ? (
          <button
            type="button"
            onClick={() => onCancel(booking)}
            className="text-xs font-bold text-[#DC2626] hover:text-[#B91C1C] transition-colors focus:outline-none focus:underline"
          >
            Cancel Booking
          </button>
        ) : (
          <div />
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/booking/${booking.id}`)}
          className="text-xs font-semibold text-[#006699] border-[#006699] hover:bg-[#F0F9FF]"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
};
