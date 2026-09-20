import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'rounded-md h-4 my-1',
    circular: 'rounded-full',
    rectangular: 'rounded-btn',
  }[variant];

  return (
    <div
      role="status"
      aria-label="Loading placeholder"
      className={`bg-slate-200/80 animate-pulse ${variantStyles} ${className}`}
      style={{
        width: width !== undefined ? width : undefined,
        height: height !== undefined ? height : undefined,
        ...style,
      }}
      {...props}
    />
  );
};
