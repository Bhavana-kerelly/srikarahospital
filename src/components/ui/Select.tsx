import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      children,
      fullWidth = true,
      id,
      className = '',
      disabled,
      startIcon,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const helperId = selectId ? `${selectId}-helper` : undefined;
    const errorId = selectId ? `${selectId}-error` : undefined;

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
        {label && (
          <label
            htmlFor={selectId}
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

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              w-full min-h-[44px] px-3.5 py-2.5 pr-10 text-sm rounded-btn bg-white border transition-colors
              text-[#0F172A] appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
              disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] disabled:cursor-not-allowed
              ${startIcon ? 'pl-10' : ''}
              ${error ? 'border-[#DC2626] focus:ring-[#DC2626]' : 'border-[#CBD5E1] hover:border-[#94A3B8]'}
              ${className}
            `}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-[#64748B]">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = 'Select';
