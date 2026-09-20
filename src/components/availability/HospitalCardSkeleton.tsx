import React from 'react';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

export const HospitalCardSkeleton: React.FC = () => {
  return (
    <Card variant="default" padding="lg" className="border border-[#E2E8F0] shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Hospital info left column */}
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton width={80} height={20} className="rounded-badge" />
            <Skeleton width={110} height={20} className="rounded-badge" />
          </div>

          <div className="space-y-1.5">
            <Skeleton width="65%" height={24} className="rounded-md" />
            <Skeleton width="45%" height={16} className="rounded-md" />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Skeleton width={140} height={16} className="rounded-md" />
            <Skeleton width={120} height={16} className="rounded-md" />
          </div>
        </div>

        {/* Shift pills & Action right column */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#F1F5F9] lg:min-w-[200px]">
          <div className="flex items-center gap-1.5">
            <Skeleton width={60} height={22} className="rounded-full" />
            <Skeleton width={60} height={22} className="rounded-full" />
            <Skeleton width={60} height={22} className="rounded-full" />
          </div>

          <Skeleton width={130} height={42} className="rounded-btn" />
        </div>
      </div>
    </Card>
  );
};
