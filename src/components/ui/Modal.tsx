import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  showCloseButton = true,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div
        className={`relative w-full ${maxWidthStyles} bg-white rounded-xl shadow-2xl border border-[#E2E8F0] p-6 sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-[#E2E8F0]">
            <div>
              {title && (
                <h3 id="modal-title" className="text-lg font-bold text-[#0F2444]">
                  {title}
                </h3>
              )}
              {description && (
                <p id="modal-description" className="text-sm text-[#475569] mt-1">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <IconButton
                aria-label="Close dialog"
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-[#64748B] hover:text-[#0F2444]"
              >
                <X className="w-5 h-5" />
              </IconButton>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
