import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Calendar } from 'lucide-react';

export interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      id,
      className = '',
      disabled,
      min,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const helperId = inputId ? `${inputId}-helper` : undefined;
    const errorId = inputId ? `${inputId}-error` : undefined;

    // Default min date to today if not provided
    const today = new Date().toISOString().split('T')[0];
    const minDate = min || today;

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
          <div className="absolute left-3.5 pointer-events-none text-[#94A3B8]">
            <Calendar className="w-4 h-4" />
          </div>

          <input
            ref={ref}
            type="date"
            id={inputId}
            min={minDate}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              w-full min-h-[44px] pl-10 pr-3.5 py-2.5 text-sm rounded-btn bg-white border transition-colors
              text-[#0F172A] cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
              disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] disabled:cursor-not-allowed
              ${error ? 'border-[#DC2626] focus:ring-[#DC2626]' : 'border-[#CBD5E1] hover:border-[#94A3B8]'}
              ${className}
            `}
            {...props}
          />
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

DateInput.displayName = 'DateInput';
