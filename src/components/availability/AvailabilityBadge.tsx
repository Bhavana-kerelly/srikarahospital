import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';
import { SlotAvailabilityStatus } from '../../types/dialysis.types';

export interface AvailabilityBadgeProps {
  status?: SlotAvailabilityStatus | string;
  totalAvailableSlots?: number;
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  status,
  totalAvailableSlots,
  className = '',
}) => {
  // If backend does not provide status or slot counts, do not invent
  if (!status && totalAvailableSlots === undefined) {
    return null;
  }

  // Normalize status string
  const normalized = (status || '').toUpperCase();

  if (normalized === 'AVAILABLE' || (totalAvailableSlots !== undefined && totalAvailableSlots > 5)) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" aria-hidden="true" />
        <span>Available {totalAvailableSlots !== undefined ? `(${totalAvailableSlots} slots)` : ''}</span>
      </span>
    );
  }

  if (
    normalized === 'LIMITED' ||
    normalized === 'FEW_LEFT' ||
    (totalAvailableSlots !== undefined && totalAvailableSlots > 0 && totalAvailableSlots <= 5)
  ) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] ${className}`}
      >
        <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" aria-hidden="true" />
        <span>Limited {totalAvailableSlots !== undefined ? `(${totalAvailableSlots} left)` : ''}</span>
      </span>
    );
  }

  if (normalized === 'WAITLIST') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] ${className}`}
      >
        <Clock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" aria-hidden="true" />
        <span>Waitlist Open</span>
      </span>
    );
  }

  if (normalized === 'FULL' || (totalAvailableSlots !== undefined && totalAvailableSlots === 0)) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] ${className}`}
      >
        <XCircle className="w-3.5 h-3.5 text-[#DC2626] shrink-0" aria-hidden="true" />
        <span>Slots Full</span>
      </span>
    );
  }

  if (normalized === 'UNAVAILABLE') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] ${className}`}
      >
        <XCircle className="w-3.5 h-3.5 text-[#64748B] shrink-0" aria-hidden="true" />
        <span>Unavailable</span>
      </span>
    );
  }

  // Fallback for custom backend-provided status text
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] ${className}`}
    >
      <Clock className="w-3.5 h-3.5 text-[#64748B] shrink-0" aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};
