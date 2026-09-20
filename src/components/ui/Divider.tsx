import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  label,
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block w-px self-stretch bg-[#E2E8F0] ${className}`}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={`relative flex items-center my-6 ${className}`}>
        <div className="flex-grow border-t border-[#E2E8F0]" />
        <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          {label}
        </span>
        <div className="flex-grow border-t border-[#E2E8F0]" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={`border-0 border-t border-[#E2E8F0] my-4 w-full ${className}`}
    />
  );
};
