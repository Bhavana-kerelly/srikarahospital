import React from 'react';
import { Check, Clock, Lock, AlertCircle, Ban } from 'lucide-react';
import { DialysisSlot } from '../../types/dialysis.types';

export type SlotUiState = 'AVAILABLE' | 'SELECTED' | 'HELD' | 'UNAVAILABLE' | 'EXPIRED';

export interface SlotButtonProps {
  slot: DialysisSlot;
  isSelected: boolean;
  isHeld: boolean;  // held by the current patient
  onClick: (slot: DialysisSlot) => void;
}

/**
 * SlotButton — renders a single dialysis time slot with all states.
 * States are derived from the backend-provided slot.status.
 * Does NOT independently decide availability.
 */
export const SlotButton: React.FC<SlotButtonProps> = ({
  slot,
  isSelected,
  isHeld,
  onClick,
}) => {
  const status = slot.status;

  // Map backend status → UI state
  const isUnavailable =
    status === 'UNAVAILABLE' ||
    status === 'FULL' ||
    status === 'EXPIRED' ||
    slot.availableCount === 0;

  const isHeldByAnother = status === 'HELD' && !isSelected;

  const disabled = isUnavailable || isHeldByAnother;

  // Current patient holds this slot
  const isMyHold = isHeld && isSelected;

  // Build descriptive aria-label — never color-only state communication
  const ariaLabel = (() => {
    if (isMyHold) return `${slot.startTime} to ${slot.endTime}, slot temporarily held`;
    if (isSelected) return `${slot.startTime} to ${slot.endTime}, selected`;
    if (isHeldByAnother) return `${slot.startTime} to ${slot.endTime}, held by another patient`;
    if (status === 'EXPIRED') return `${slot.startTime} to ${slot.endTime}, expired`;
    if (isUnavailable) return `${slot.startTime} to ${slot.endTime}, unavailable`;
    if (status === 'LIMITED' || status === 'FEW_LEFT')
      return `${slot.startTime} to ${slot.endTime}, limited slots`;
    if (status === 'WAITLIST') return `${slot.startTime} to ${slot.endTime}, waitlist available`;
    return `${slot.startTime} to ${slot.endTime}, available`;
  })();

  // Style derivation
  const containerStyles = (() => {
    if (isMyHold)
      return 'bg-[#F0FDFA] border-2 border-[#0D9488] text-[#0F766E] shadow-md ring-2 ring-[#0D9488]/20';
    if (isSelected)
      return 'bg-[#0F2444] border-2 border-[#0F2444] text-white shadow-md ring-2 ring-[#0F2444]/20';
    if (isHeldByAnother)
      return 'bg-[#F1F5F9] border border-[#CBD5E1] text-[#94A3B8] cursor-not-allowed opacity-70';
    if (status === 'EXPIRED')
      return 'bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-[#94A3B8] cursor-not-allowed opacity-60';
    if (isUnavailable)
      return 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#94A3B8] cursor-not-allowed opacity-60';
    if (status === 'LIMITED' || status === 'FEW_LEFT')
      return 'bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] hover:bg-[#FEF3C7] hover:border-[#F59E0B] hover:shadow-sm transition-all';
    if (status === 'WAITLIST')
      return 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] hover:bg-[#DBEAFE] hover:border-[#93C5FD] hover:shadow-sm transition-all';
    // AVAILABLE
    return 'bg-white border border-[#CBD5E1] text-[#0F2444] hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:shadow-sm transition-all';
  })();

  // Status icon
  const StatusIcon = (() => {
    if (isMyHold) return <Lock className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />;
    if (isSelected) return <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />;
    if (isHeldByAnother) return <Lock className="w-3.5 h-3.5 text-[#94A3B8]" aria-hidden="true" />;
    if (status === 'EXPIRED') return <Ban className="w-3.5 h-3.5 text-[#94A3B8]" aria-hidden="true" />;
    if (isUnavailable) return <AlertCircle className="w-3.5 h-3.5 text-[#94A3B8]" aria-hidden="true" />;
    return <Clock className="w-3.5 h-3.5 text-current opacity-60" aria-hidden="true" />;
  })();

  // Status label text (supplemental to time, avoids color-only state communication)
  const statusLabel = (() => {
    if (isMyHold) return 'Held';
    if (isSelected) return 'Selected';
    if (isHeldByAnother) return 'Held';
    if (status === 'EXPIRED') return 'Expired';
    if (isUnavailable) return 'Full';
    if (status === 'WAITLIST') return 'Waitlist';
    if (status === 'LIMITED' || status === 'FEW_LEFT') return 'Limited';
    return 'Available';
  })();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick(slot)}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      aria-disabled={disabled}
      className={`
        relative flex flex-col items-center justify-center
        min-h-[76px] w-full rounded-xl p-2.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]
        ${containerStyles}
      `}
    >
      {/* Status icon top-right indicator */}
      <span className="absolute top-2 right-2">{StatusIcon}</span>

      {/* Time range */}
      <span className="text-sm sm:text-base font-bold tracking-tight leading-none">
        {slot.startTime}
      </span>
      <span className="text-[11px] opacity-75 mt-0.5">–{slot.endTime}</span>

      {/* Status label */}
      <span
        className={`text-[10px] mt-1.5 font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
          isSelected && !isMyHold
            ? 'bg-white/20 text-white'
            : isMyHold
            ? 'bg-[#0D9488]/20 text-[#0F766E]'
            : 'bg-black/5'
        }`}
      >
        {statusLabel}
      </span>

      {/* Available count — only show if backend provides it */}
      {!disabled && !isSelected && slot.availableCount > 0 && slot.totalCount > 0 && (
        <span className="text-[10px] opacity-50 mt-0.5">
          {slot.availableCount}/{slot.totalCount}
        </span>
      )}
    </button>
  );
};
