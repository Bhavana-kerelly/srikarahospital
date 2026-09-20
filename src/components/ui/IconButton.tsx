import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      variant = 'ghost',
      size = 'md',
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'w-8 h-8 p-1.5 rounded-md',
      md: 'w-10 h-10 p-2 rounded-btn',
      lg: 'w-12 h-12 p-3 rounded-btn',
    }[size];

    const variantStyles = {
      primary: 'bg-[#0F2444] text-white hover:bg-[#16325B] focus-visible:ring-[#2563EB]',
      secondary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]',
      outline: 'bg-white text-[#0F2444] border border-[#CBD5E1] hover:bg-[#F8FAFC] focus-visible:ring-[#2563EB]',
      ghost: 'bg-transparent text-[#475569] hover:text-[#0F2444] hover:bg-[#F1F5F9] focus-visible:ring-[#2563EB]',
      danger: 'bg-transparent text-[#DC2626] hover:bg-[#FEF2F2] focus-visible:ring-[#DC2626]',
    }[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
