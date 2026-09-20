import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
  onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onDismiss,
  className = '',
  ...props
}) => {
  const config = {
    info: {
      container: 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]',
      icon: <Info className="w-5 h-5 text-[#2563EB] shrink-0" />,
      titleColor: 'text-[#1E3A8A]',
    },
    success: {
      container: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />,
      titleColor: 'text-[#064E3B]',
    },
    warning: {
      container: 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]',
      icon: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />,
      titleColor: 'text-[#78350F]',
    },
    error: {
      container: 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]',
      icon: <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0" />,
      titleColor: 'text-[#7F1D1D]',
    },
  }[type];

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 p-4 rounded-btn border ${config.container} ${className}`}
      {...props}
    >
      {config.icon}
      <div className="flex-1 text-sm leading-relaxed">
        {title && <h5 className={`font-semibold mb-1 ${config.titleColor}`}>{title}</h5>}
        <div>{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
