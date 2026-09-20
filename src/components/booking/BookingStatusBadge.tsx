import React from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Activity,
  Check,
} from 'lucide-react';
import { BookingStatus } from '../../types/booking.types';

export interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const config = (() => {
    switch (status) {
      case 'CONFIRMED':
        return {
          label: 'Confirmed',
          icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />,
          classes: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
        };
      case 'CHECKED_IN':
        return {
          label: 'Checked-In',
          icon: <Check className="w-3.5 h-3.5" aria-hidden="true" />,
          classes: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
        };
      case 'IN_TREATMENT':
      case 'IN_PROGRESS':
        return {
          label: 'In Treatment',
          icon: <Activity className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />,
          classes: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
        };
      case 'COMPLETED':
        return {
          label: 'Completed',
          icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />,
          classes: 'bg-[#F8FAFC] text-[#334155] border-[#CBD5E1]',
        };
      case 'REJECTED':
        return {
          label: 'Rejected',
          icon: <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />,
          classes: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
        };
      case 'CANCELLED':
        return {
          label: 'Cancelled',
          icon: <XCircle className="w-3.5 h-3.5" aria-hidden="true" />,
          classes: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
        };
      case 'PENDING':
      case 'REQUESTED':
      default:
        return {
          label: 'Pending Review',
          icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
          classes: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
        };
    }
  })();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.classes} ${className}`}
      aria-label={`Booking Status: ${config.label}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
