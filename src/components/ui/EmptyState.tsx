import React from 'react';
import { CalendarX2 } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl bg-white border border-[#E2E8F0] shadow-subtle ${className}`}
    >
      <div className="w-14 h-14 mb-4 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB]">
        {icon || <CalendarX2 className="w-7 h-7" />}
      </div>

      <h4 className="text-lg font-bold text-[#0F2444] mb-2">{title}</h4>
      <p className="text-sm text-[#475569] max-w-md mb-6 leading-relaxed">{description}</p>

      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
