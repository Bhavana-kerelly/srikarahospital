import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const SlotGridSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading available dialysis slots"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center min-h-[76px] w-full rounded-xl border border-[#E2E8F0] p-2.5 gap-2"
        >
          <Skeleton width="70%" height={18} className="rounded" />
          <Skeleton width="50%" height={12} className="rounded" />
          <Skeleton width="60%" height={14} className="rounded" />
        </div>
      ))}
    </div>
  );
};
