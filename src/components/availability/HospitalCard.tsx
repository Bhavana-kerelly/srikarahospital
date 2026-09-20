import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  Navigation,
  SunMedium,
  Sunset,
  Moon,
  Sparkles,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AvailabilityBadge } from './AvailabilityBadge';
import { AvailabilitySummary } from '../../types/dialysis.types';

export interface HospitalCardProps {
  data: AvailabilitySummary;
  selectedDate: string;
  selectedShift?: string;
  className?: string;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  data,
  selectedDate,
  selectedShift,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleViewSlots = () => {
    const params = new URLSearchParams();
    if (selectedDate) params.set('date', selectedDate);
    if (selectedShift && selectedShift !== 'ANY') params.set('shift', selectedShift);
    if (data.city) params.set('location', data.city);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    navigate(`/hospital/${data.hospitalId}/slots${queryString}`);
  };

  const isFull =
    data.status === 'FULL' ||
    (data.totalAvailableSlots !== undefined && data.totalAvailableSlots === 0);

  return (
    <Card
      variant="default"
      padding="lg"
      className={`transition-all duration-200 hover:shadow-card-hover hover:border-[#CBD5E1] ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Hospital & Branch Information */}
        <div className="space-y-3 flex-1">
          {/* Header Badges: Location & Status */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-badge text-[11px] font-semibold uppercase tracking-wider bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
              <Building2 className="w-3 h-3 text-[#2563EB]" aria-hidden="true" />
              <span>{data.branch || data.city || 'Srikara Hospital'}</span>
            </span>

            {/* Availability Status Badge (text + icon, accessible) */}
            <AvailabilityBadge
              status={data.status}
              totalAvailableSlots={data.totalAvailableSlots}
            />

            {/* Distance ONLY if returned by API */}
            {data.distance && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-badge text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                <Navigation className="w-2.5 h-2.5 text-[#64748B]" aria-hidden="true" />
                <span>{data.distance} away</span>
              </span>
            )}
          </div>

          {/* Hospital Name & Address */}
          <div>
            <h3 className="text-lg font-bold text-[#0F2444] tracking-tight hover:text-[#2563EB] transition-colors">
              {data.hospitalName}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {data.address || `${data.branch ? `${data.branch}, ` : ''}${data.city}`}
              </span>
            </p>
          </div>

          {/* Additional details ONLY if returned by API */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-[#64748B]">
            {data.earliestSlot && (
              <span className="inline-flex items-center gap-1.5 text-[#0F766E] font-medium bg-[#F0FDFA] px-2 py-0.5 rounded border border-[#CCFBF1]">
                <Sparkles className="w-3 h-3 text-[#0D9488]" aria-hidden="true" />
                <span>Earliest Slot: {data.earliestSlot}</span>
              </span>
            )}

            {data.totalAvailableSlots !== undefined && (
              <span className="inline-flex items-center gap-1 font-medium text-[#0F2444]">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                <span>
                  {data.totalAvailableSlots} {data.totalAvailableSlots === 1 ? 'slot' : 'slots'} available for booking
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Shift Indicators & CTA Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#F1F5F9] lg:min-w-[200px]">
          {/* Shift status pills ONLY if shifts are returned by API */}
          {data.shifts && (
            <div
              className="flex items-center gap-1.5"
              aria-label="Available shifts for this hospital"
            >
              <span
                title={data.shifts.morningAvailable ? 'Morning Shift Available' : 'Morning Shift Full'}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  data.shifts.morningAvailable
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                    : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] line-through'
                }`}
              >
                <SunMedium className="w-3 h-3" aria-hidden="true" />
                <span>Morning</span>
              </span>

              <span
                title={data.shifts.afternoonAvailable ? 'Afternoon Shift Available' : 'Afternoon Shift Full'}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  data.shifts.afternoonAvailable
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                    : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] line-through'
                }`}
              >
                <Sunset className="w-3 h-3" aria-hidden="true" />
                <span>Afternoon</span>
              </span>

              <span
                title={data.shifts.eveningAvailable ? 'Evening Shift Available' : 'Evening Shift Full'}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  data.shifts.eveningAvailable
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                    : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] line-through'
                }`}
              >
                <Moon className="w-3 h-3" aria-hidden="true" />
                <span>Evening</span>
              </span>
            </div>
          )}

          {/* Primary CTA */}
          <Button
            type="button"
            variant={isFull ? 'outline' : 'primary'}
            size="md"
            onClick={handleViewSlots}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto min-w-[140px]"
            aria-label={`View available dialysis slots for ${data.hospitalName}`}
          >
            View Slots
          </Button>
        </div>
      </div>
    </Card>
  );
};
