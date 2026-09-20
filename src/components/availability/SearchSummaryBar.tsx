import React from 'react';
import { MapPin, Calendar, Clock, Edit3 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface SearchSummaryBarProps {
  location: string;
  date: string;
  shift?: string;
  totalResults?: number;
  onModifySearch?: () => void;
}

export const SearchSummaryBar: React.FC<SearchSummaryBarProps> = ({
  location,
  date,
  shift,
  totalResults,
  onModifySearch,
}) => {
  // Format readable date
  const formatReadableDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getShiftLabel = (s?: string) => {
    if (!s || s === 'ANY') return 'Any Shift';
    if (s === 'MORNING') return 'Morning (06:00 – 10:00)';
    if (s === 'AFTERNOON') return 'Afternoon (11:00 – 15:00)';
    if (s === 'EVENING') return 'Evening (16:00 – 20:00)';
    return s;
  };

  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-[#0F2444]">
            Available Dialysis Options
          </h2>
          {totalResults !== undefined && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              {totalResults} {totalResults === 1 ? 'branch' : 'branches'} found
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#475569]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#0F172A]">
            <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0" aria-hidden="true" />
            <span>{location}</span>
          </span>

          <span className="text-[#CBD5E1]" aria-hidden="true">
            •
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#64748B] shrink-0" aria-hidden="true" />
            <span>{formatReadableDate(date)}</span>
          </span>

          {shift && shift !== 'ANY' && (
            <>
              <span className="text-[#CBD5E1]" aria-hidden="true">
                •
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#64748B] shrink-0" aria-hidden="true" />
                <span>{getShiftLabel(shift)}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {onModifySearch && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onModifySearch}
          leftIcon={<Edit3 className="w-3.5 h-3.5" />}
          className="self-start md:self-center shrink-0"
        >
          Modify Search
        </Button>
      )}
    </div>
  );
};
