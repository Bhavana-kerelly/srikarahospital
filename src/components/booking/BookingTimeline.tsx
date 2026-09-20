import React from 'react';
import {
  CheckCircle2,
  Clock,
  Activity,
  Check,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { BookingStatus } from '../../types/booking.types';

export interface BookingTimelineProps {
  currentStatus: BookingStatus;
  createdAt?: string;
  className?: string;
}

interface StepConfig {
  status: BookingStatus;
  title: string;
  description: string;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({
  currentStatus,
  createdAt,
  className = '',
}) => {
  // If rejected or cancelled, show truncated terminal flow
  const isRejected = currentStatus === 'REJECTED';
  const isCancelled = currentStatus === 'CANCELLED';

  const formatTimestamp = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return null;
    }
  };

  const steps: StepConfig[] = isRejected
    ? [
        {
          status: 'REQUESTED',
          title: 'Booking Requested',
          description: 'Your booking request was submitted to the hospital roster.',
        },
        {
          status: 'REJECTED',
          title: 'Request Not Accepted',
          description: 'The hospital could not accommodate this session. Please select another slot.',
        },
      ]
    : isCancelled
    ? [
        {
          status: 'REQUESTED',
          title: 'Booking Requested',
          description: 'Your booking request was submitted to the hospital roster.',
        },
        {
          status: 'CANCELLED',
          title: 'Booking Cancelled',
          description: 'This booking has been cancelled and the dialysis slot was released.',
        },
      ]
    : [
        {
          status: 'REQUESTED',
          title: 'Booking Requested',
          description: 'Your booking request is being reviewed by the dialysis coordinator.',
        },
        {
          status: 'CONFIRMED',
          title: 'Hospital Confirmed',
          description: 'Your booking has been confirmed by Srikara clinical staff.',
        },
        {
          status: 'CHECKED_IN',
          title: 'Checked-In',
          description: 'You have been checked in at the hospital reception.',
        },
        {
          status: 'IN_TREATMENT',
          title: 'In Treatment',
          description: 'Your hemodialysis session is currently in progress.',
        },
        {
          status: 'COMPLETED',
          title: 'Completed',
          description: 'Your treatment session has concluded successfully.',
        },
      ];

  const getStepStatusOrder = (s: BookingStatus): number => {
    switch (s) {
      case 'PENDING':
      case 'REQUESTED':
        return 1;
      case 'CONFIRMED':
        return 2;
      case 'CHECKED_IN':
        return 3;
      case 'IN_TREATMENT':
      case 'IN_PROGRESS':
        return 4;
      case 'COMPLETED':
        return 5;
      case 'REJECTED':
      case 'CANCELLED':
        return 2;
      default:
        return 1;
    }
  };

  const currentOrder = getStepStatusOrder(currentStatus);

  return (
    <div className={`space-y-6 ${className}`} aria-label="Appointment Status Timeline">
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
        {steps.map((step, index) => {
          const stepOrder = index + 1;
          const isDone = stepOrder < currentOrder || (stepOrder === currentOrder && step.status === currentStatus);
          const isCurrent = stepOrder === currentOrder;
          const isTerminalNegative = isRejected || isCancelled;

          return (
            <div key={step.title} className="relative group">
              {/* Timeline marker icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white transition-colors ${
                  isCurrent && isTerminalNegative
                    ? 'border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]'
                    : isDone
                    ? 'border-[#006699] bg-[#006699] text-white'
                    : 'border-[#CBD5E1] bg-white text-[#94A3B8]'
                }`}
              >
                {isCurrent && isTerminalNegative ? (
                  <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                ) : isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
                )}
              </div>

              {/* Text content */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isCurrent && isTerminalNegative
                        ? 'text-[#DC2626]'
                        : isDone
                        ? 'text-[#0F172A]'
                        : 'text-[#94A3B8]'
                    }`}
                  >
                    {step.title}
                  </h4>
                  {index === 0 && createdAt && (
                    <span className="text-[11px] text-[#64748B] font-medium">
                      {formatTimestamp(createdAt)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
