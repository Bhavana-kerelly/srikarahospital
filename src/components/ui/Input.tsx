import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      fullWidth = true,
      id,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const helperId = inputId ? `${inputId}-helper` : undefined;
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5"
          >
            {label}
            {props.required && <span className="text-[#DC2626] ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute left-3.5 pointer-events-none text-[#94A3B8]">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-btn bg-white border transition-colors
              text-[#0F172A] placeholder-[#94A3B8]
              focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
              disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] disabled:cursor-not-allowed
              ${startIcon ? 'pl-10' : ''}
              ${endIcon ? 'pr-10' : ''}
              ${error ? 'border-[#DC2626] focus:ring-[#DC2626]' : 'border-[#CBD5E1] hover:border-[#94A3B8]'}
              ${className}
            `}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3.5 pointer-events-none text-[#94A3B8]">
              {endIcon}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} className="mt-1.5 text-xs text-[#DC2626] font-medium" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1.5 text-xs text-[#64748B]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
