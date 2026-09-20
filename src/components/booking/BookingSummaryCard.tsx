import React from 'react';
import { Building2, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface BookingSummaryCardProps {
  hospitalName: string;
  branch?: string;
  address?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  shift?: string;
  className?: string;
}

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  hospitalName,
  branch,
  address,
  date,
  startTime,
  endTime,
  shift,
  className = '',
}) => {
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

  return (
    <Card variant="default" padding="md" className={`border-[#E2E8F0] shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Selected Appointment Context
        </span>
        <Badge variant="teal" size="sm">
          Held Slot
        </Badge>
      </div>

      <div className="space-y-3">
        {/* Hospital & Branch */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#006699] mb-0.5">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{branch || 'Srikara Hospital'}</span>
          </div>
          <p className="text-sm font-bold text-[#0F172A]">{hospitalName}</p>
          {address && (
            <p className="flex items-center gap-1 text-xs text-[#64748B] mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0 text-[#94A3B8]" aria-hidden="true" />
              <span className="truncate">{address}</span>
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F8FAFC]">
          <div className="bg-[#F8FAFC] p-2.5 rounded-card border border-[#E2E8F0]/60">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748B]">
              <Calendar className="w-3.5 h-3.5 text-[#006699]" aria-hidden="true" />
              <span>Date</span>
            </div>
            <p className="text-xs font-bold text-[#0F172A] mt-1 truncate">
              {formatReadableDate(date)}
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-2.5 rounded-card border border-[#E2E8F0]/60">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748B]">
              <Clock className="w-3.5 h-3.5 text-[#006699]" aria-hidden="true" />
              <span>Time Slot</span>
            </div>
            <p className="text-xs font-bold text-[#0F172A] mt-1 truncate">
              {startTime && endTime ? `${startTime} – ${endTime}` : shift || 'Standard Slot'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
