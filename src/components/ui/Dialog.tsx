import React from 'react';
import { Modal, ModalProps } from './Modal';
import { Button } from './Button';

export interface DialogProps extends ModalProps {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  confirmVariant?: 'primary' | 'secondary' | 'danger';
}

export const Dialog: React.FC<DialogProps> = ({
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  isLoading = false,
  confirmVariant = 'primary',
  children,
  ...props
}) => {
  return (
    <Modal onClose={onClose} {...props}>
      <div className="py-2">{children}</div>

      <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </Button>
        {onConfirm && (
          <Button
            variant={confirmVariant}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        )}
      </div>
    </Modal>
  );
};
