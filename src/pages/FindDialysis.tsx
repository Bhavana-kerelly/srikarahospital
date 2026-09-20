import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Building2,
  SlidersHorizontal,
  RotateCcw,
  AlertCircle,
  Loader2,
  Filter,
  ShieldCheck,
  Droplets,
  HeartPulse,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  SunMedium,
  Sunset,
  Moon,
  ChevronDown,
  HelpCircle,
  Activity,
  Check,
  Stethoscope,
  Info,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Alert } from '../components/ui/Alert';
import {
  HospitalCard,
  HospitalCardSkeleton,
  SearchSummaryBar,
} from '../components/availability';
import { useHospitals } from '../hooks/useHospitals';
import { useAvailability } from '../hooks/useAvailability';
import { dialysisSearchSchema, DialysisSearchFormData } from '../schemas/search.schema';
import { SlotShift } from '../types/dialysis.types';

// Preset branches for quick 1-click selection across all Srikara hospital locations
const QUICK_BRANCHES = [
  { name: 'All Branches', tag: 'All 10 Centers', city: 'Network-wide' },
  { name: 'LB Nagar', tag: 'Super Speciality', city: 'Hyderabad' },
  { name: 'ECIL', tag: 'High-Flux Center', city: 'Hyderabad' },
  { name: 'Kompally', tag: 'Advanced Unit', city: 'Secunderabad' },
  { name: 'Miyapur', tag: '24/7 Emergency', city: 'Hyderabad' },
  { name: 'Peerzadiguda', tag: 'Speciality Care', city: 'Hyderabad' },
  { name: 'Lakdikapul', tag: 'Central Unit', city: 'Hyderabad' },
  { name: 'Secunderabad', tag: 'Nephro Center', city: 'Secunderabad' },
  { name: 'RTC X Roads', tag: 'Care Center', city: 'Hyderabad' },
  { name: 'Vijayawada', tag: 'Regional Care', city: 'Andhra Pradesh' },
  { name: 'Rajahmundry', tag: 'Regional Care', city: 'Andhra Pradesh' },
];

const SHIFT_OPTIONS: { id: SlotShift; label: string; time: string; icon: typeof SunMedium }[] = [
  { id: 'ANY', label: 'Any Shift', time: 'All Day', icon: Clock },
  { id: 'MORNING', label: 'Morning', time: '06:00 – 10:00', icon: SunMedium },
  { id: 'AFTERNOON', label: 'Afternoon', time: '11:00 – 15:00', icon: Sunset },
  { id: 'EVENING', label: 'Evening', time: '16:00 – 20:00', icon: Moon },
];

export const FindDialysis: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // Read URL search params
  const initialLocation = searchParams.get('location') || '';
  const initialDate = searchParams.get('date') || '';
  const initialShift = (searchParams.get('shift') as SlotShift) || 'ANY';

  // State determining if an active search has been triggered
  const [hasSearched, setHasSearched] = useState<boolean>(
    Boolean(initialLocation && initialDate)
  );

  // Active submitted search criteria for querying
  const [activeParams, setActiveParams] = useState<{
    location: string;
    date: string;
    shift: SlotShift;
  }>({
    location: initialLocation,
    date: initialDate,
    shift: initialShift,
  });

  // Optional client filter: All vs Only Available
  const [availabilityFilter, setAvailabilityFilter] = useState<'ALL' | 'AVAILABLE_ONLY'>('ALL');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // 1. Fetch API-driven hospital locations
  const {
    data: hospitals,
    isLoading: isLoadingHospitals,
    isError: isHospitalsError,
    refetch: refetchHospitals,
  } = useHospitals();

  // 2. React Hook Form setup with Zod schema
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<DialysisSearchFormData>({
    resolver: zodResolver(dialysisSearchSchema),
    defaultValues: {
      location: initialLocation,
      date: initialDate || today,
      shift: initialShift,
    },
  });

  const selectedLocation = watch('location');
  const selectedDate = watch('date');
  const selectedShift = watch('shift') as SlotShift;

  // Sync form values if URL parameters change externally
  useEffect(() => {
    if (initialLocation) setValue('location', initialLocation);
    if (initialDate) setValue('date', initialDate);
    if (initialShift) setValue('shift', initialShift);
    if (initialLocation && initialDate) {
      setActiveParams({
        location: initialLocation,
        date: initialDate,
        shift: initialShift,
      });
      setHasSearched(true);
    }
  }, [initialLocation, initialDate, initialShift, setValue]);

  // 3. TanStack Query for Availability: only runs when hasSearched is true
  const {
    data: availabilityData,
    isLoading: isLoadingAvailability,
    isFetching: isFetchingAvailability,
    isError: isAvailabilityError,
    refetch: refetchAvailability,
  } = useAvailability(
    {
      location: activeParams.location,
      date: activeParams.date,
      shift: activeParams.shift,
    },
    { enabled: hasSearched && Boolean(activeParams.location && activeParams.date) }
  );

  // Form submission handler
  const onSubmit = (formData: DialysisSearchFormData) => {
    setActiveParams({
      location: formData.location,
      date: formData.date,
      shift: formData.shift as SlotShift,
    });
    setHasSearched(true);

    // Update URL query parameters for shareability & history
    const nextParams = new URLSearchParams();
    nextParams.set('location', formData.location);
    nextParams.set('date', formData.date);
    if (formData.shift && formData.shift !== 'ANY') {
      nextParams.set('shift', formData.shift);
    }
    setSearchParams(nextParams);
  };

  // Quick select branch
  const handleQuickBranchSelect = (branchName: string) => {
    setValue('location', branchName, { shouldValidate: true });
    // If date is set, automatically trigger search
    if (selectedDate) {
      onSubmit({
        location: branchName,
        date: selectedDate,
        shift: selectedShift || 'ANY',
      });
    }
  };

  // Reset search filters
  const handleReset = () => {
    reset({
      location: '',
      date: today,
      shift: 'ANY',
    });
    setActiveParams({
      location: '',
      date: '',
      shift: 'ANY',
    });
    setHasSearched(false);
    setSearchParams(new URLSearchParams());
  };

  // Modify Search CTA handler
  const handleModifySearch = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const locationSelect = document.getElementById('search-location');
      if (locationSelect) {
        locationSelect.focus();
      }
    }
  };

  // Filtered results
  const displayedResults = (availabilityData || []).filter((item) => {
    if (availabilityFilter === 'AVAILABLE_ONLY') {
      return (
        item.status === 'AVAILABLE' ||
        item.status === 'FEW_LEFT' ||
        item.status === 'LIMITED' ||
        (item.totalAvailableSlots !== undefined && item.totalAvailableSlots > 0)
      );
    }
    return true;
  });

  const isQueryInProgress = isLoadingAvailability || isFetchingAvailability;

  const faqs = [
    {
      q: 'What documents are required for my first dialysis session at Srikara?',
      a: 'Please bring your Nephrologist prescription/case summary, recent viral markers report (HBsAg, Anti-HCV, HIV within 30 days), blood group report, latest serum creatinine/electrolyte labs, and a valid Government Photo ID.',
    },
    {
      q: 'Can I choose high-flux or biocompatible dialyzers?',
      a: 'Yes, all Srikara dialysis units operate on premium high-flux biocompatible dialyzers with ultra-pure triple-pass RO water systems, adhering to strict AAMI/ISO water purity standards.',
    },
    {
      q: 'Are isolated dialysis bays available for seropositive patients?',
      a: 'Yes, Srikara hospitals feature strictly segregated, dedicated negative-pressure isolation bays with dedicated machines for Hepatitis B, Hepatitis C, and retroviral positive patients to ensure 100% zero cross-infection.',
    },
    {
      q: 'What is the procedure in case of emergency dialysis requirements?',
      a: 'For acute or emergency dialysis, please contact our 24/7 Srikara Dialysis Emergency Hotline immediately at 1800-425-4646 or visit our nearest 24/7 Emergency casualty unit.',
    },
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC] text-[#0F172A] selection:bg-[#DBEAFE] selection:text-[#1E40AF]">
      {/* ───────────────────────────────────────────────────────────
          MAIN SEARCH & RESULTS WORKSPACE
      ──────────────────────────────────────────────────────────── */}
      <main className="py-6 sm:py-8 lg:py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ═══════════════════════════════════════════════════════════
                LEFT COLUMN: SEARCH FILTERS CARD
            ═══════════════════════════════════════════════════════════ */}
            <div ref={formRef} className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xl overflow-hidden sticky top-24">
                {/* Search Card Header */}
                <div className="bg-gradient-to-r from-[#0F2444] to-[#1E3A8A] px-5 py-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white leading-none">Find a Dialysis Slot</h2>
                      <p className="text-[11px] text-slate-300 mt-1">Select location, date & shift</p>
                    </div>
                  </div>

                  {hasSearched && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                      aria-label="Reset all search filters"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Form Area */}
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Location loading error banner if hospital API fails */}
                  {isHospitalsError && (
                    <Alert type="warning">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span>Unable to reach hospital registry.</span>
                        <button
                          type="button"
                          onClick={() => refetchHospitals()}
                          className="underline font-bold text-[#92400E] hover:text-[#78350F] shrink-0"
                        >
                          Retry
                        </button>
                      </div>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    {/* 1. Location Selector (API-driven) */}
                    <div>
                      <label
                        htmlFor="search-location"
                        className="block text-xs font-bold uppercase tracking-wider text-[#334155] mb-1.5"
                      >
                        Hospital Location <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#0D9488]">
                          {isLoadingHospitals ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                        </div>

                        <select
                          id="search-location"
                          {...register('location')}
                          aria-required="true"
                          aria-invalid={Boolean(errors.location)}
                          aria-describedby={errors.location ? 'location-error' : undefined}
                          disabled={isLoadingHospitals}
                          className={`
                            w-full min-h-[46px] pl-10 pr-9 py-2.5 text-sm font-semibold rounded-xl bg-[#F8FAFC] border transition-all
                            text-[#0F172A] cursor-pointer
                            focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
                            disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] disabled:cursor-not-allowed
                            ${errors.location ? 'border-[#DC2626] ring-1 ring-[#DC2626]' : 'border-[#CBD5E1] hover:border-[#94A3B8]'}
                          `}
                        >
                          <option value="">
                            {isLoadingHospitals ? 'Loading hospital locations...' : 'Select Srikara Hospital Branch'}
                          </option>
                          <option value="All Branches" className="font-bold text-[#2563EB]">
                            🌟 All Branches (Show All Srikara Hospitals)
                          </option>

                          {/* API-driven Hospital Options */}
                          {hospitals && hospitals.length > 0 ? (
                            hospitals.map((h) => {
                              const value = h.branch || h.address?.city || h.name;
                              const label = `${h.name}${h.branch ? ` — ${h.branch}` : h.address?.city ? ` (${h.address.city})` : ''}`;
                              return (
                                <option key={h.id} value={value}>
                                  {label}
                                </option>
                              );
                            })
                          ) : (
                            /* Complete 10-Branch list across Telangana & Andhra Pradesh */
                            <>
                              <option value="LB Nagar">Srikara Hospital, LB Nagar (Super Speciality) — Hyderabad</option>
                              <option value="ECIL">Srikara Hospital, ECIL (High-Flux Unit) — Hyderabad</option>
                              <option value="Kompally">Srikara Hospital, Kompally (Advanced Dialysis) — Secunderabad</option>
                              <option value="Miyapur">Srikara Hospital, Miyapur (24/7 Center) — Hyderabad</option>
                              <option value="Peerzadiguda">Srikara Hospital, Peerzadiguda — Hyderabad</option>
                              <option value="Lakdikapul">Srikara Hospital, Lakdikapul (Central Unit) — Hyderabad</option>
                              <option value="Secunderabad">Srikara Hospital, Secunderabad (Nephro Center) — Secunderabad</option>
                              <option value="RTC X Roads">Srikara Hospital, RTC X Roads (Care Center) — Hyderabad</option>
                              <option value="Vijayawada">Srikara Hospital, Vijayawada (Regional Care) — Andhra Pradesh</option>
                              <option value="Rajahmundry">Srikara Hospital, Rajahmundry (Regional Care) — Andhra Pradesh</option>
                            </>
                          )}
                        </select>
                      </div>

                      {errors.location && (
                        <p id="location-error" className="mt-1.5 text-xs text-[#DC2626] font-semibold flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.location.message}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Date Selector with Quick Buttons (Today, Tomorrow) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="search-date"
                          className="block text-xs font-bold uppercase tracking-wider text-[#334155]"
                        >
                          Appointment Date <span className="text-[#DC2626]">*</span>
                        </label>
                        <div className="flex items-center gap-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => setValue('date', today, { shouldValidate: true })}
                            className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                              selectedDate === today
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                            }`}
                          >
                            Today
                          </button>
                          <button
                            type="button"
                            onClick={() => setValue('date', tomorrow, { shouldValidate: true })}
                            className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                              selectedDate === tomorrow
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                            }`}
                          >
                            Tomorrow
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#2563EB]">
                          <Calendar className="w-4 h-4" />
                        </div>

                        <input
                          id="search-date"
                          type="date"
                          min={today}
                          {...register('date')}
                          aria-required="true"
                          aria-invalid={Boolean(errors.date)}
                          aria-describedby={errors.date ? 'date-error' : undefined}
                          className={`
                            w-full min-h-[46px] pl-10 pr-3.5 py-2.5 text-sm font-semibold rounded-xl bg-[#F8FAFC] border transition-all
                            text-[#0F172A] cursor-pointer
                            focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
                            ${errors.date ? 'border-[#DC2626] ring-1 ring-[#DC2626]' : 'border-[#CBD5E1] hover:border-[#94A3B8]'}
                          `}
                        />
                      </div>

                      {errors.date && (
                        <p id="date-error" className="mt-1.5 text-xs text-[#DC2626] font-semibold flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.date.message}</span>
                        </p>
                      )}
                    </div>

                    {/* 3. Preferred Shift Selector (Visual Interactive Cards) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#334155] mb-2">
                        Preferred Shift Time
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {SHIFT_OPTIONS.map((shift) => {
                          const isCurrent = selectedShift === shift.id;
                          const ShiftIcon = shift.icon;
                          return (
                            <button
                              key={shift.id}
                              type="button"
                              onClick={() => setValue('shift', shift.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                isCurrent
                                  ? 'bg-[#EFF6FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <ShiftIcon
                                  className={`w-4 h-4 ${
                                    isCurrent ? 'text-[#2563EB]' : 'text-[#64748B]'
                                  }`}
                                />
                                {isCurrent && (
                                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                                )}
                              </div>
                              <div className="mt-2">
                                <p
                                  className={`text-xs font-bold leading-tight ${
                                    isCurrent ? 'text-[#1E40AF]' : 'text-[#0F172A]'
                                  }`}
                                >
                                  {shift.label}
                                </p>
                                <p className="text-[10px] text-[#64748B] mt-0.5">{shift.time}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {/* Hidden input to keep react-hook-form value registered */}
                      <input type="hidden" {...register('shift')} />
                    </div>

                    {/* Primary Search CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isQueryInProgress}
                        className={`
                          w-full min-h-[50px] px-6 py-3 rounded-xl font-bold text-sm tracking-wide text-white
                          bg-gradient-to-r from-[#0F2444] via-[#2563EB] to-[#0D9488]
                          hover:from-[#16325B] hover:via-[#1D4ED8] hover:to-[#0F766E]
                          shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30
                          flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.99]
                          disabled:opacity-75 disabled:cursor-wait
                        `}
                      >
                        {isQueryInProgress ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-[#5EEAD4]" />
                            <span>Checking Live Availability...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-5 h-5 text-[#5EEAD4]" />
                            <span>Search Available Slots</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Immediate Emergency Notice */}
                  <div className="bg-[#F0FDFA] rounded-xl p-3.5 border border-[#CCFBF1] flex items-start gap-2.5">
                    <HeartPulse className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <div className="text-[11px] text-[#134E4A] leading-relaxed">
                      <strong>Need Urgent / ICU Dialysis?</strong> No wait times for critical acute patients. Call our emergency triage directly at <a href="tel:18004254646" className="underline font-bold text-[#0D9488]">1800-425-4646</a>.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                RIGHT COLUMN: RESULTS PANEL / CLINICAL DISCOVERY STATE
            ═══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-8 space-y-6">
              {/* Network Live Connection Bar */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#475569]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F2444] text-xs">
                      Srikara Central Clinical Registry Network
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      Synchronized with all 8 hospital dialysis units in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    All Stations Online
                  </span>
                </div>
              </div>

              {/* ───────────────────────────────────────────────────────
                  STATE 1: PRE-SEARCH / CLINICAL DISCOVERY EXPERIENCE
              ──────────────────────────────────────────────────────── */}
              {!hasSearched && (
                <div className="space-y-6">
                  {/* Visual 3-Step Booking Guide */}
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                    <h3 className="text-base font-bold text-[#0F2444] mb-1">
                      How Dialysis Slot Booking Works
                    </h3>
                    <p className="text-xs text-[#64748B] mb-5">
                      Fast, transparent, and verified clinical reservation in 3 simple steps
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] relative">
                        <div className="w-7 h-7 rounded-full bg-[#0F2444] text-white flex items-center justify-center text-xs font-bold mb-3">
                          1
                        </div>
                        <h4 className="text-xs font-bold text-[#0F2444]">Select Center & Date</h4>
                        <p className="text-[11px] text-[#64748B] mt-1">
                          Pick your nearest Srikara Hospital and preferred appointment day.
                        </p>
                      </div>

                      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] relative">
                        <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold mb-3">
                          2
                        </div>
                        <h4 className="text-xs font-bold text-[#0F2444]">Choose Shift & Station</h4>
                        <p className="text-[11px] text-[#64748B] mt-1">
                          Inspect live morning, afternoon, or evening clinical capacity.
                        </p>
                      </div>

                      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] relative">
                        <div className="w-7 h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center text-xs font-bold mb-3">
                          3
                        </div>
                        <h4 className="text-xs font-bold text-[#0F2444]">Instant Confirmation</h4>
                        <p className="text-[11px] text-[#64748B] mt-1">
                          Get verified SMS/WhatsApp confirmation with clinical instructions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Featured Dialysis Centers Grid */}
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-[#0F2444]">
                          Featured Srikara Dialysis Centers
                        </h3>
                        <p className="text-xs text-[#64748B]">
                          Click any center below to check live availability
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[480px] overflow-y-auto pr-1">
                      {QUICK_BRANCHES.filter((b) => b.name !== 'All Branches').map((b) => (
                        <div
                          key={b.name}
                          className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-3.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-sm"
                          onClick={() => handleQuickBranchSelect(b.name)}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-[#0F2444] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                                Srikara Hospital, {b.name}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] shrink-0">
                                {b.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#64748B] mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#94A3B8]" />
                              <span>{b.city}</span>
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                            <span className="text-[11px] text-[#0D9488] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Active Units
                            </span>
                            <span className="font-bold text-[#2563EB] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform text-[11px]">
                              Check Slots <ChevronDown className="w-3 h-3 -rotate-90" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Infrastructure & Safety Highlights */}
                  <div className="bg-gradient-to-r from-[#0F2444] to-[#1E3A8A] rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0D9488]/20 flex items-center justify-center text-[#2DD4BF]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          Clinical Safety & Infection Control Standards
                        </h3>
                        <p className="text-xs text-slate-300">
                          Gold-standard nephrology infrastructure engineered for patient longevity
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 pt-2">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>Dedicated isolated bay machines for Seropositive patients</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>Continuous online clearance monitoring (Kt/V tracking)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>Electric motorized ICU patient recliners with TV & Nurse call</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>In-house renal clinical dietitians & vascular access care</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────
                  STATE 2: ACTIVE SEARCH INITIATED
              ──────────────────────────────────────────────────────── */}
              {hasSearched && (
                <div className="space-y-5" aria-live="polite">
                  {/* Search Summary Bar */}
                  <SearchSummaryBar
                    location={activeParams.location}
                    date={activeParams.date}
                    shift={activeParams.shift}
                    totalResults={availabilityData ? displayedResults.length : undefined}
                    onModifySearch={handleModifySearch}
                  />

                  {/* Optional Filter Bar when results exist */}
                  {!isQueryInProgress && !isAvailabilityError && availabilityData && availabilityData.length > 0 && (
                    <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] flex items-center justify-between gap-4 text-xs shadow-sm">
                      <div className="flex items-center gap-1.5 text-[#64748B]">
                        <Filter className="w-4 h-4 text-[#2563EB]" />
                        <span className="font-semibold text-[#0F2444]">Filter Results:</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAvailabilityFilter('ALL')}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                            availabilityFilter === 'ALL'
                              ? 'bg-[#0F2444] text-white shadow-sm'
                              : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                          }`}
                        >
                          All Hospitals ({availabilityData.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setAvailabilityFilter('AVAILABLE_ONLY')}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                            availabilityFilter === 'AVAILABLE_ONLY'
                              ? 'bg-[#0D9488] text-white shadow-sm'
                              : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                          }`}
                        >
                          Available Only
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Substate 2A: Query in progress (loading skeleton) */}
                  {isQueryInProgress && (
                    <div className="space-y-4" role="status" aria-label="Loading available dialysis slots">
                      <HospitalCardSkeleton />
                      <HospitalCardSkeleton />
                      <HospitalCardSkeleton />
                    </div>
                  )}

                  {/* Substate 2B: API Error state */}
                  {!isQueryInProgress && isAvailabilityError && (
                    <ErrorState
                      title="We couldn't load availability right now."
                      message="The hospital network is temporarily undergoing routine clinical synchronization. Please check your connection or try again."
                      onRetry={() => refetchAvailability()}
                    />
                  )}

                  {/* Substate 2C: Empty state (no slots found) */}
                  {!isQueryInProgress &&
                    !isAvailabilityError &&
                    (!availabilityData || displayedResults.length === 0) && (
                      <EmptyState
                        title="No dialysis slots found for your criteria"
                        description="No clinical stations matched your criteria for this date and location. Please choose another date, hospital branch, or shift time."
                        actionLabel="Modify Search Criteria"
                        onAction={handleModifySearch}
                      />
                    )}

                  {/* Substate 2D: Success state (Hospital cards list) */}
                  {!isQueryInProgress &&
                    !isAvailabilityError &&
                    displayedResults.length > 0 && (
                      <div className="space-y-4">
                        {displayedResults.map((item) => (
                          <HospitalCard
                            key={item.hospitalId}
                            data={item}
                            selectedDate={activeParams.date}
                            selectedShift={activeParams.shift}
                          />
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────
              4. DIALYSIS PATIENT GUIDE & FAQ ACCORDION
          ──────────────────────────────────────────────────────────── */}
          <section className="mt-16 pt-12 border-t border-[#E2E8F0]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488] block mb-1">
                  Frequently Asked Questions
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F2444] font-display">
                  Dialysis Patient Care & Booking Guide
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
                  Everything you need to know about hemodialysis sessions at Srikara Hospitals
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left font-bold text-sm text-[#0F2444] flex items-center justify-between gap-4 hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#2563EB] shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-[#2563EB]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] bg-[#F8FAFC]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Patient Support Helpline Banner */}
              <div className="mt-10 bg-gradient-to-r from-[#EFF6FF] via-[#F0FDFA] to-[#EFF6FF] rounded-2xl p-6 border border-[#BFDBFE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h4 className="text-sm font-bold text-[#0F2444]">
                    Have questions or require special clinical arrangements?
                  </h4>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Our Dialysis Patient Coordinators are available 24 hours a day to assist you.
                  </p>
                </div>

                <a
                  href="tel:18004254646"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2444] text-white hover:bg-[#16325B] text-xs font-bold shadow-md transition-colors shrink-0"
                >
                  <PhoneCall className="w-4 h-4 text-[#38BDF8]" />
                  <span>Call 1800-425-4646</span>
                </a>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
};
