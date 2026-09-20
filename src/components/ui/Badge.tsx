import React from 'react';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'teal';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-badge gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-badge gap-1.5 font-semibold',
  }[size];

  const variantStyles = {
    neutral: 'bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0]',
    primary: 'bg-[#EFF6FF] text-[#0F2444] border border-[#BFDBFE]',
    teal: 'bg-[#F0FDFA] text-[#0D9488] border border-[#CCFBF1]',
    info: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
    success: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
    warning: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
    error: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center tracking-wide uppercase transition-colors ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
