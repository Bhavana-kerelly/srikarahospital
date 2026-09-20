import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "We couldn't load this information right now.",
  message = "Please check your network connection and try again, or contact our patient helpline for urgent dialysis assistance.",
  onRetry,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl bg-white border border-[#FECACA] shadow-subtle ${className}`}
    >
      <div className="w-14 h-14 mb-4 rounded-full bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#DC2626]">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h4 className="text-lg font-bold text-[#0F2444] mb-2">{title}</h4>
      <p className="text-sm text-[#475569] max-w-md mb-6 leading-relaxed">{message}</p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
