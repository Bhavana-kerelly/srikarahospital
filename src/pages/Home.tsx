import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ChevronDown,
  ArrowRight,
  Activity,
  HeartHandshake,
  FileCheck2,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Search preview state (Architected for Phase 2 API integration)
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShift, setSelectedShift] = useState('ANY');

  // FAQ Accordion open index state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocation) params.set('location', selectedLocation);
    if (selectedDate) params.set('date', selectedDate);
    if (selectedShift && selectedShift !== 'ANY') params.set('shift', selectedShift);
    navigate(`/find-dialysis?${params.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];

  const faqs = [
    {
      question: 'How do I find a dialysis slot?',
      answer:
        'Navigate to Find Dialysis, select your preferred Srikara hospital location, choose your appointment date, and pick your preferred time shift (Morning, Afternoon, or Evening). Real-time availability will then be retrieved from the central network.',
    },
    {
      question: 'How do I select a hospital location?',
      answer:
        'You can choose from available Srikara hospital branches offering dedicated dialysis care across Hyderabad and regional centers. The system connects directly to the hospital availability registry.',
    },
    {
      question: 'How can I track my booking?',
      answer:
        'Once a booking is created, you can track its status under "My Bookings" by verifying your registered patient mobile number. You will see confirmation details, session timing, and preparation instructions.',
    },
    {
      question: 'Can I cancel or reschedule a booking?',
      answer:
        'Yes. You can cancel or request a change for your scheduled slot through the "My Bookings" portal prior to the start of the scheduled session, subject to clinical guidelines.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ── 1. HERO SECTION (Split Layout) ─────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-[#E2E8F0] pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-[#EFF6FF]/60 to-transparent pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Eyebrow, Heading, Copy, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1]">
                <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488]">
                  SRIKARA DIALYSIS CARE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2444] tracking-tight leading-[1.15]">
                Find Your Dialysis Slot <br />
                <span className="text-[#2563EB]">With Confidence.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed font-normal">
                Search dialysis availability across Srikara locations and find a convenient slot in
                a few simple steps.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Search className="w-5 h-5 text-[#38BDF8]" />}
                  onClick={() => navigate('/find-dialysis')}
                >
                  Find a Dialysis Slot
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/my-bookings')}
                >
                  View My Bookings
                </Button>
              </div>

              {/* Trust badges row */}
              <div className="pt-6 border-t border-[#F1F5F9] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-sm font-bold text-[#0F2444]">Single Network</div>
                  <div className="text-xs text-[#64748B]">Centralized availability</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F2444]">High-Flux Care</div>
                  <div className="text-xs text-[#64748B]">Modern hemodialysis units</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F2444]">Verified Slots</div>
                  <div className="text-xs text-[#64748B]">Zero double booking</div>
                </div>
              </div>
            </div>

            {/* Right Column: Sophisticated Healthcare Visual Area */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Visual Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="/premium_nephrology_dialysis_center_1775828508740.png"
                    alt="Srikara Advanced Nephrology and Hemodialysis Center"
                    className="w-full h-full object-cover object-center opacity-90 transition-transform duration-500 hover:scale-105"
                  />
                  {/* Visual gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                        Renal Care Wing
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-100">
                      Standardized Bicarbonate & High-Flux Hemodialysis Stations
                    </p>
                  </div>
                </div>

                {/* Floating Metric Card 1: Clinical Standard */}
                <div className="hidden sm:flex absolute -top-4 -left-6 bg-white p-3.5 rounded-xl shadow-lg border border-[#E2E8F0] items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F2444]">Clinical Protocols</div>
                    <div className="text-[11px] text-[#64748B]">Nephrologist Supervised</div>
                  </div>
                </div>

                {/* Floating Metric Card 2: Central Network */}
                <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-white p-3.5 rounded-xl shadow-lg border border-[#E2E8F0] items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F2444]">Real-Time Sync</div>
                    <div className="text-[11px] text-[#64748B]">Direct Hospital Registry</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. HERO BOOKING PREVIEW CARD ───────────────────────── */}
      <section className="relative z-10 -mt-8 sm:-mt-10 mb-8">
        <Container>
          <div className="bg-white rounded-2xl shadow-elevated border border-[#E2E8F0] p-5 sm:p-7">
            <div className="mb-4 pb-3 border-b border-[#F1F5F9]">
              <h3 className="text-base sm:text-lg font-bold text-[#0F2444] flex items-center gap-2">
                <Search className="w-4 h-4 text-[#2563EB]" />
                Find Dialysis Availability
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Select your criteria to check live slot capacity across Srikara branches
              </p>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Selector */}
              <div>
                <label htmlFor="hero-location" className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    id="hero-location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full min-h-[44px] pl-10 pr-8 py-2.5 text-sm rounded-btn bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="">Select location</option>
                    <option value="LB Nagar">LB Nagar, Hyderabad</option>
                    <option value="ECIL">ECIL, Hyderabad</option>
                    <option value="Kompally">Kompally, Secunderabad</option>
                    <option value="Miyapur">Miyapur, Hyderabad</option>
                    <option value="Peerzadiguda">Peerzadiguda, Hyderabad</option>
                    <option value="Lakdikapul">Lakdikapul, Hyderabad</option>
                    <option value="Secunderabad">Secunderabad</option>
                    <option value="Vijayawada">Vijayawada</option>
                  </select>
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <label htmlFor="hero-date" className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    id="hero-date"
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 text-sm rounded-btn bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              {/* Preferred Shift Selector */}
              <div>
                <label htmlFor="hero-shift" className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Preferred Time
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <select
                    id="hero-shift"
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    className="w-full min-h-[44px] pl-10 pr-8 py-2.5 text-sm rounded-btn bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="ANY">Any time</option>
                    <option value="MORNING">Morning (06:00 – 10:00)</option>
                    <option value="AFTERNOON">Afternoon (11:00 – 15:00)</option>
                    <option value="EVENING">Evening (16:00 – 20:00)</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-end">
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Search Availability
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* ── 3. TRUST & VALUE SECTION ───────────────────────────── */}
      <Section spacing="lg" background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488]">
              Dignified Renal Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2444] mt-2">
              Designed For Patient Peace of Mind
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 leading-relaxed">
              Every feature of the Srikara Dialysis Network is engineered to make regular therapy
              predictable, accessible, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="lg" className="hover:border-[#CBD5E1] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2444] mb-2">Find Available Care</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Check machine and bed availability across Srikara regional centers without phone
                delays or unconfirmed queues.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="hover:border-[#CBD5E1] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2444] mb-2">Choose a Convenient Slot</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Select suitable shift windows matching your personal routine, including morning,
                afternoon, and evening sessions.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="hover:border-[#CBD5E1] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0F2444] flex items-center justify-center mb-5">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2444] mb-2">Track Your Booking</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Verify booking confirmations and access therapy guidelines directly on your phone
                with simple OTP authentication.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ── 4. HOW IT WORKS SECTION ────────────────────────────── */}
      <Section spacing="lg" background="muted" id="how-it-works">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488]">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2444] mt-2">
              How Dialysis Booking Works
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 leading-relaxed">
              A transparent, hospital-verified reservation process in four straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Search',
                desc: 'Find dialysis availability across Srikara locations.',
              },
              {
                step: '02',
                title: 'Choose a Slot',
                desc: 'Select an available date and time matching your dialysis regimen.',
              },
              {
                step: '03',
                title: 'Verify & Submit',
                desc: 'Verify your mobile number and submit your booking request.',
              },
              {
                step: '04',
                title: 'Track',
                desc: 'Track the booking status and preparation details from your account.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm relative flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#EFF6FF] mb-4">
                  <span className="text-base font-black text-[#2563EB] font-display">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F2444] mb-2">{item.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. LOCATION PREVIEW SECTION (No Fake Availability) ─── */}
      <Section spacing="lg" background="white" id="locations">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#F1F5F9]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488]">
                Hospital Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2444] mt-1">
                Srikara Locations
              </h2>
              <p className="text-sm text-[#475569] mt-1">
                Serving patients across Hyderabad and Andhra Pradesh with dedicated nephrology wings.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/find-dialysis')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Search All Locations
            </Button>
          </div>

          {/* Central Network Availability Notice Banner */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#1E40AF]">
                  Central Availability Engine Integration
                </h4>
                <p className="text-xs text-[#1E3A8A] mt-0.5 max-w-xl">
                  Availability will be loaded dynamically from the central network in Phase 2.
                  Zero estimated or fabricated numbers are displayed.
                </p>
              </div>
            </div>
            <Badge variant="primary" size="sm">
              Single Source of Truth
            </Badge>
          </div>

          {/* Location Center Cards (Neutral UI state without fake counts) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Srikara Hospital, LB Nagar', city: 'Hyderabad', key: 'LB Nagar' },
              { name: 'Srikara Hospital, ECIL', city: 'Hyderabad', key: 'ECIL' },
              { name: 'Srikara Hospital, Kompally', city: 'Secunderabad', key: 'Kompally' },
              { name: 'Srikara Hospital, Miyapur', city: 'Hyderabad', key: 'Miyapur' },
              { name: 'Srikara Hospital, Peerzadiguda', city: 'Hyderabad', key: 'Peerzadiguda' },
              { name: 'Srikara Hospital, Vijayawada', city: 'Vijayawada', key: 'Vijayawada' },
            ].map((loc) => (
              <button
                key={loc.key}
                type="button"
                onClick={() => navigate(`/find-dialysis?location=${encodeURIComponent(loc.key)}`)}
                className="text-left p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#2563EB] hover:shadow-card transition-all w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F2444] group-hover:text-[#2563EB] transition-colors">{loc.name}</h3>
                    <p className="text-xs text-[#64748B] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                      {loc.city}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569]">
                    Dialysis Unit
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Check availability</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 6. PATIENT SUPPORT SECTION ─────────────────────────── */}
      <Section spacing="lg" background="muted">
        <Container>
          <div className="bg-[#0F2444] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                Patient Assistance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Need help with your booking?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Whether you need to review an existing dialysis appointment or have general
                questions about our booking system, our patient assistance team and portal are here.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/my-bookings')}
                >
                  View My Bookings
                </Button>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center font-medium px-4 py-2.5 min-h-[44px] rounded-btn gap-2 text-sm bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                >
                  Help & Support FAQ
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 7. FAQ ACCORDION ───────────────────────────────────── */}
      <Section spacing="lg" background="white" id="faq">
        <Container size="md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488]">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2444] mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#475569] mt-2">
              Answers regarding our online booking system and dialysis appointment scheduling.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0F2444] hover:bg-[#F8FAFC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
};
