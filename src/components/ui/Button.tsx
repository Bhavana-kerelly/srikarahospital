import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base styles: accessible focus, smooth transitions, font weight, minimum mobile touch target
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none';

    // Size variants
    const sizeStyles = {
      sm: 'text-xs px-3 py-2 min-h-[36px] rounded-md gap-1.5',
      md: 'text-sm px-4 py-2.5 min-h-[44px] rounded-btn gap-2',
      lg: 'text-base px-6 py-3 min-h-[48px] rounded-btn gap-2.5',
    }[size];

    // Visual variants
    const variantStyles = {
      primary:
        'bg-[#0F2444] text-white hover:bg-[#16325B] active:bg-[#0A192F] focus-visible:ring-[#2563EB] shadow-sm',
      secondary:
        'bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF] focus-visible:ring-[#2563EB] shadow-sm',
      outline:
        'bg-white text-[#0F2444] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8] active:bg-[#F1F5F9] focus-visible:ring-[#2563EB]',
      ghost:
        'bg-transparent text-[#0F2444] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] focus-visible:ring-[#2563EB]',
      danger:
        'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] focus-visible:ring-[#DC2626] shadow-sm',
    }[variant];

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner
              size={size === 'sm' ? 'sm' : 'md'}
              className={variant === 'outline' || variant === 'ghost' ? 'text-[#0F2444]' : 'text-white'}
            />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
