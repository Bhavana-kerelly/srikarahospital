import React, { useEffect, useRef, useState } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';
import { SlotLockResponse } from '../../types/dialysis.types';

export interface SlotCountdownProps {
  lock: SlotLockResponse;
  onExpired: () => void;
}

/**
 * SlotCountdown — displays the backend-provided expiration time as a live countdown.
 * The expiresAt comes STRICTLY from the backend; we never fabricate a duration.
 */
export const SlotCountdown: React.FC<SlotCountdownProps> = ({ lock, onExpired }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const ms = new Date(lock.expiresAt).getTime() - Date.now();
    return Math.max(0, Math.floor(ms / 1000));
  });

  const expiredCalled = useRef(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!expiredCalled.current) {
        expiredCalled.current = true;
        onExpired();
      }
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          if (!expiredCalled.current) {
            expiredCalled.current = true;
            onExpired();
          }
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isUrgent = secondsLeft <= 60;
  const isExpired = secondsLeft <= 0;

  if (isExpired) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-sm font-semibold"
      >
        <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Hold expired</span>
      </div>
    );
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Slot hold expires in ${formatted}`}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors duration-300 ${
        isUrgent
          ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E] animate-pulse'
          : 'bg-[#F0FDFA] border-[#CCFBF1] text-[#0F766E]'
      }`}
    >
      <Timer
        className={`w-4 h-4 shrink-0 ${isUrgent ? 'text-[#D97706]' : 'text-[#0D9488]'}`}
        aria-hidden="true"
      />
      <span>
        Hold expires in{' '}
        <span className="tabular-nums font-bold">{formatted}</span>
      </span>
    </div>
  );
};
