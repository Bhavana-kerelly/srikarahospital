import React from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Booking } from '../../types/booking.types';

export interface CancelBookingModalProps {
  isOpen: boolean;
  booking: Booking | null;
  isLoading: boolean;
  errorMessage?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  isOpen,
  booking,
  isLoading,
  errorMessage,
  onConfirm,
  onClose,
}) => {
  if (!booking) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => {} : onClose}
      title="Cancel this booking?"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-card text-xs text-[#991B1B]">
          <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-bold">Are you sure you want to cancel this booking?</p>
            <p className="mt-0.5 text-[#7F1D1D] leading-relaxed">
              Your reserved dialysis machine slot for{' '}
              <span className="font-semibold">{booking.hospitalName}</span> on{' '}
              <span className="font-semibold">{booking.date}</span> will be released back to the hospital roster.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs text-[#991B1B]">
            {errorMessage}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={onClose}
            className="text-xs font-semibold"
          >
            Keep Booking
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={isLoading}
            onClick={onConfirm}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold"
          >
            {isLoading ? 'Cancelling...' : 'Cancel Booking'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
