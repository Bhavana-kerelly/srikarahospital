import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

// Custom precision SVG icons matching luxury medical design
const CardiacIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    <path d="M3.5 12h3.5l2 -3.5l3 7l2 -3.5h4.5" />
  </svg>
);

const OrthoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9 4.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.5a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V4.5z" />
    <circle cx="10" cy="4" r="1.5" />
    <circle cx="14" cy="4" r="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M9 19.5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V17a3 3 0 0 0-3-3h0a3 3 0 0 0-3 3v2.5z" />
    <circle cx="10" cy="20" r="1.5" />
    <circle cx="14" cy="20" r="1.5" />
  </svg>
);

const NeuroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9.5 3a4 4 0 0 0-4 4c0 .7.18 1.35.5 1.92A4 4 0 0 0 4 12.5a4 4 0 0 0 2 3.47A4 4 0 0 0 11 20V4a4 4 0 0 0-1.5-1z" />
    <path d="M14.5 3a4 4 0 0 1 4 4c0 .7-.18 1.35-.5 1.92A4 4 0 0 1 20 12.5a4 4 0 0 1-2 3.47A4 4 0 0 1 13 20V4a4 4 0 0 1 1.5-1z" />
    <path d="M8 8a2 2 0 0 1 3 0M8 13.5a2 2 0 0 1 3 0M16 8a2 2 0 0 0-3 0M16 13.5a2 2 0 0 0-3 0" />
  </svg>
);

const NephroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 8.5C4 5.5 6 3 8.5 3c2 0 3 1.5 3 3.5 0 2.5-1.5 3.5-1.5 5.5 0 2 1.5 3 1.5 5.5 0 2-1 3.5-3 3.5C6 21 4 18.5 4 15.5V8.5z" />
    <path d="M20 8.5C20 5.5 18 3 15.5 3c-2 0-3 1.5-3 3.5 0 2.5 1.5 3.5 1.5 5.5 0 2-1.5 3-1.5 5.5 0 2 1 3.5 3 3.5 2.5 0 4.5-2.5 4.5-5.5V8.5z" />
  </svg>
);

const GastroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6 3v6a6 6 0 0 0 12 0V3" />
    <line x1="4" y1="3" x2="8" y2="3" />
    <line x1="16" y1="3" x2="20" y2="3" />
    <path d="M12 15v6" />
    <path d="M9 21h6" />
  </svg>
);

const OncoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 9 9" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const PulmoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 4v16" />
    <path d="M7 6c-2.5 0-4 2-4 5.5 0 4.5 3 6.5 4 7.5" />
    <path d="M17 6c2.5 0 4 2 4 5.5 0 4.5-3 6.5-4 7.5" />
    <path d="M12 9c-2 0-3 1-3 2.5" />
    <path d="M12 9c2 0 3 1 3 2.5" />
  </svg>
);



// ── Ultra-Luxury High-Precision Anatomical Holograms ──

const KneeHologram = () => (
  <div className="absolute right-[-15px] bottom-[-20px] top-[-10px] w-[62%] pointer-events-none opacity-90 select-none overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 220 300" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="luxKneeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#8B1A4A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B071E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="luxBoneLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FDA4AF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E11D48" stopOpacity="0.2" />
        </linearGradient>
        <filter id="luxSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <circle cx="110" cy="150" r="115" fill="url(#luxKneeGlow)" />

      <g stroke="rgba(255, 228, 230, 0.3)" strokeWidth="0.8" strokeDasharray="3 3">
        <ellipse cx="110" cy="145" rx="72" ry="18" />
        <ellipse cx="110" cy="115" rx="55" ry="14" />
        <ellipse cx="110" cy="175" rx="60" ry="15" />
        <path d="M50,145 Q110,60 170,145" />
        <path d="M50,145 Q110,230 170,145" />
      </g>

      <g filter="url(#luxSoftGlow)">
        <path
          d="M75,20 C85,60 70,105 65,125 C62,137 75,145 92,143 C105,141 115,135 115,130 C115,135 125,141 138,143 C155,145 168,137 165,125 C160,105 145,60 155,20"
          stroke="url(#luxBoneLight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="rgba(244, 114, 182, 0.12)"
        />
        <path d="M85,90 C85,120 75,135 90,138 C102,139 108,130 108,120 C108,95 105,60 105,30" stroke="rgba(255, 228, 230, 0.6)" strokeWidth="1.2" />
        <path d="M145,90 C145,120 155,135 140,138 C128,139 122,130 122,120 C122,95 125,60 125,30" stroke="rgba(255, 228, 230, 0.6)" strokeWidth="1.2" />
      </g>

      <g filter="url(#luxSoftGlow)">
        <ellipse cx="115" cy="138" rx="18" ry="14" stroke="#FDA4AF" strokeWidth="2" fill="rgba(244, 114, 182, 0.35)" />
        <ellipse cx="115" cy="138" rx="10" ry="7" stroke="#FFF1F2" strokeWidth="1.2" />
        <path d="M68,148 C90,147 115,149 162,148" stroke="#FB7185" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      <g filter="url(#luxSoftGlow)">
        <path
          d="M62,154 C75,152 95,153 115,155 C135,153 155,152 168,154 C172,165 160,175 150,185 C142,198 140,240 145,280 L85,280 C90,240 88,198 80,185 C70,175 58,165 62,154 Z"
          stroke="url(#luxBoneLight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="rgba(244, 114, 182, 0.12)"
        />
        <path d="M165,170 C175,185 178,220 175,280" stroke="rgba(255, 228, 230, 0.5)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M98,165 C102,185 105,225 102,280" stroke="rgba(255, 228, 230, 0.4)" strokeWidth="1" />
        <path d="M132,165 C128,185 125,225 128,280" stroke="rgba(255, 228, 230, 0.4)" strokeWidth="1" />
      </g>

      <circle cx="115" cy="138" r="3" fill="#FFFFFF" className="animate-pulse" />
      <circle cx="85" cy="142" r="1.8" fill="#FDA4AF" />
      <circle cx="145" cy="142" r="1.8" fill="#FDA4AF" />
      <circle cx="100" cy="90" r="1.5" fill="#FFF1F2" />
      <circle cx="130" cy="90" r="1.5" fill="#FFF1F2" />
      <circle cx="115" cy="200" r="1.8" fill="#FDA4AF" />
    </svg>
  </div>
);

const CardiacHologram = () => (
  <div className="absolute right-[-10px] bottom-[-15px] top-[-10px] w-[60%] pointer-events-none opacity-90 select-none overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 220 280" className="w-full h-full object-contain" fill="none">
      <defs>
        <radialGradient id="luxCardiacGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#8B1A4A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B071E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="140" r="105" fill="url(#luxCardiacGlow)" />
      <path
        d="M110,65 C130,25 190,35 190,95 C190,150 110,210 110,230 C110,210 30,150 30,95 C30,35 90,25 110,65 Z"
        stroke="#FDA4AF"
        strokeWidth="2.2"
        fill="rgba(244, 63, 94, 0.15)"
      />
      <path d="M40,130 H80 L95,95 L115,165 L130,115 L145,130 H180" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx="110" cy="130" rx="68" ry="30" stroke="rgba(253, 164, 175, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="95" cy="95" r="3" fill="#FFFFFF" className="animate-pulse" />
      <circle cx="115" cy="165" r="3" fill="#FFFFFF" className="animate-pulse" />
    </svg>
  </div>
);

const NeuroHologram = () => (
  <div className="absolute right-[-10px] bottom-[-15px] top-[-10px] w-[60%] pointer-events-none opacity-90 select-none overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 220 280" className="w-full h-full object-contain" fill="none">
      <defs>
        <radialGradient id="luxNeuroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E879F9" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#8B1A4A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B071E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="140" r="105" fill="url(#luxNeuroGlow)" />
      <path
        d="M105,60 C75,55 45,85 45,125 C45,160 70,185 90,205 C100,215 105,225 105,225 V60 Z"
        stroke="#F472B6"
        strokeWidth="2.2"
        fill="rgba(232, 121, 249, 0.15)"
      />
      <path
        d="M115,60 C145,55 175,85 175,125 C175,160 150,185 130,205 C120,215 115,225 115,225 V60 Z"
        stroke="#F472B6"
        strokeWidth="2.2"
        fill="rgba(232, 121, 249, 0.15)"
      />
      <g stroke="#FFF1F2" strokeWidth="1.4" opacity="0.85">
        <line x1="75" y1="100" x2="105" y2="120" />
        <line x1="145" y1="100" x2="115" y2="120" />
        <line x1="70" y1="145" x2="105" y2="155" />
        <line x1="150" y1="145" x2="115" y2="155" />
      </g>
      <circle cx="75" cy="100" r="3" fill="#FFFFFF" className="animate-pulse" />
      <circle cx="145" cy="100" r="3" fill="#FFFFFF" className="animate-pulse" />
      <circle cx="110" cy="120" r="3.5" fill="#FFF1F2" />
    </svg>
  </div>
);

const NephroHologram = () => (
  <div className="absolute right-[-10px] bottom-[-15px] top-[-10px] w-[60%] pointer-events-none opacity-90 select-none overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 220 280" className="w-full h-full object-contain" fill="none">
      <defs>
        <radialGradient id="luxNephroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#8B1A4A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B071E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="140" r="105" fill="url(#luxNephroGlow)" />
      <path
        d="M50,90 C45,55 80,45 100,75 C105,85 105,105 90,115 C75,125 70,145 80,165 C90,185 65,210 50,180 C40,155 42,120 50,90 Z"
        stroke="#FDA4AF"
        strokeWidth="2.2"
        fill="rgba(253, 164, 175, 0.15)"
      />
      <path
        d="M170,90 C175,55 140,45 120,75 C115,85 115,105 130,115 C145,125 150,145 140,165 C130,185 155,210 170,180 C180,155 178,120 170,90 Z"
        stroke="#FDA4AF"
        strokeWidth="2.2"
        fill="rgba(253, 164, 175, 0.15)"
      />
      <circle cx="75" cy="115" r="3" fill="#FFFFFF" className="animate-pulse" />
      <circle cx="145" cy="115" r="3" fill="#FFFFFF" className="animate-pulse" />
      <ellipse cx="110" cy="135" rx="65" ry="25" stroke="rgba(253, 164, 175, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  </div>
);

export function InstitutionalTrust() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const topSpecialties = [
    {
      id: 'cardiac',
      title: 'Cardiac Sciences',
      desc: 'Advanced heart care for a healthier tomorrow.',
      icon: CardiacIcon,
      path: '/specialties/cardiology',
      hologram: CardiacHologram
    },
    {
      id: 'orthopedics',
      title: 'Robotic Orthopedics',
      desc: 'Precision. Better outcomes. Faster recovery.',
      icon: OrthoIcon,
      path: '/specialties/orthopaedics',
      hologram: KneeHologram
    },
    {
      id: 'neuro',
      title: 'Neuro & Spine Care',
      desc: 'Expert care for a stronger tomorrow.',
      icon: NeuroIcon,
      path: '/specialties/neurology',
      hologram: NeuroHologram
    },
    {
      id: 'nephro',
      title: 'Nephrology & Urology',
      desc: 'Complete kidney and urological care.',
      icon: NephroIcon,
      path: '/specialties/nephrology',
      hologram: NephroHologram
    },
    {
      id: 'gastro',
      title: 'Gastroenterology & GI',
      desc: 'Advanced endoscopic interventions & surgical excellence.',
      icon: GastroIcon,
      path: '/specialties/gastroenterology',
      hologram: NephroHologram
    },
    {
      id: 'onco',
      title: 'Comprehensive Oncology',
      desc: 'Precision surgical, medical, and targeted oncology care.',
      icon: OncoIcon,
      path: '/specialties/oncology',
      hologram: CardiacHologram
    },
    {
      id: 'pulmo',
      title: 'Pulmonology & Chest',
      desc: 'Specialized interventional pulmonology and sleep medicine.',
      icon: PulmoIcon,
      path: '/specialties/pulmonology',
      hologram: NeuroHologram
    }
  ];

  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const totalScrollable = scrollWidth - clientWidth;
      setScrollProgress(totalScrollable > 0 ? (scrollLeft / totalScrollable) * 100 : 0);
    }
  };

  const scrollTrack = (direction) => {
    if (scrollRef.current) {
      const scrollDistance = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollState();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F9] relative overflow-hidden font-sans select-none">
      
      {/* ── Apple-Style Luminescent Ambient Depth ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-rose-200/30 via-[#8B1A4A]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#8B1A4A]/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ── Architectural Grid Overlay ── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#8B1A4A 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* ── Luxury Organic Translucent Petals (Bottom Right) ── */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0">
        <svg width="460" height="360" viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[300px] sm:w-[420px] lg:w-[480px] opacity-75">
          <path
            d="M460 60C360 75 300 160 320 255C338 325 398 360 460 360V60Z"
            fill="#FCE7F0"
            fillOpacity="0.75"
          />
          <path
            d="M460 150C390 165 345 225 362 290C375 335 415 360 460 360V150Z"
            fill="#F8D0E2"
            fillOpacity="0.85"
          />
          <path
            d="M460 220C420 230 395 270 405 310C412 338 438 360 460 360V220Z"
            fill="#F3AECB"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── LUXURY EDITORIAL HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-14 mb-14 lg:mb-16">
          
          {/* Left Title Group */}
          <div className="max-w-2xl">
            {/* Pill Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/80 shadow-[0_2px_10px_rgba(139,26,74,0.04)] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#8B1A4A] animate-pulse" />
              <span className="text-[#8B1A4A] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em]">
                OUR SPECIALITIES & ACCREDITATIONS
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-[40px] sm:text-[52px] lg:text-[62px] font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] mb-5">
              Building a Legacy of{' '}
              <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#8B1A4A] via-[#B82264] to-[#8B1A4A]">
                Trust.
              </span>
            </h2>

            {/* Editorial Subtitle */}
            <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
              Advanced clinical mastery combined with compassionate surgical excellence — setting new benchmarks for a healthier tomorrow.
            </p>
          </div>

          {/* Right Controls & Frosted Glass Quote Card */}
          <div className="flex flex-col gap-5 lg:max-w-[440px] w-full">
            
            {/* Apple-Style Navigation Slider Arrows */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-rose-100 shadow-sm">
              <span className="text-xs font-bold text-[#8B1A4A] uppercase tracking-wider">
                Scroll Specialities
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollTrack('left')}
                  disabled={!canScrollLeft}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    canScrollLeft
                      ? 'bg-white border-rose-200 text-[#8B1A4A] hover:bg-[#8B1A4A] hover:text-white shadow-sm'
                      : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollTrack('right')}
                  disabled={!canScrollRight}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    canScrollRight
                      ? 'bg-white border-rose-200 text-[#8B1A4A] hover:bg-[#8B1A4A] hover:text-white shadow-sm'
                      : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Frosted Glass Quote Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[26px] p-6 border border-white/90 shadow-[0_15px_35px_-10px_rgba(139,26,74,0.08)] relative overflow-hidden group">
              <p className="text-[#334155] text-sm font-medium italic leading-relaxed mb-3">
                <span className="text-[#8B1A4A] text-xl font-serif font-black not-italic mr-1.5 leading-none">“</span>
                Honored by the highest offices of national leadership for our uncompromised commitment to ethical healthcare.”
              </p>
              <div className="flex items-center justify-between pt-2.5 border-t border-rose-100/70">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-[#8B1A4A] rounded-full" />
                  <span className="text-[#8B1A4A] text-[11px] font-black uppercase tracking-[0.2em]">
                    SRIKARA HOSPITAL
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Verified Trust
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ── TOP HORIZONTAL SCROLLING SPECIALTIES TRACK (APPLE GLASSMORPHISM) ── */}
        <div className="relative mb-6">
          <div 
            ref={scrollRef}
            onScroll={checkScrollState}
            onMouseLeave={() => setHoveredCard(null)}
            className="flex gap-6 overflow-x-auto scrollbar-none py-4 px-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {topSpecialties.map((item) => {
              const isFeatured = hoveredCard === item.id;
              const HologramComponent = item.hologram;

              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onClick={() => {
                    if (item.path) navigate(item.path);
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`min-w-[285px] sm:min-w-[310px] max-w-[325px] flex-shrink-0 snap-start rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px] cursor-pointer group transition-all duration-500 ${
                    isFeatured
                      ? 'bg-gradient-to-br from-[#8B1A4A] via-[#6D1239] to-[#3B071E] text-white shadow-[0_25px_50px_-10px_rgba(139,26,74,0.45)] border border-[#B82264]/40 ring-1 ring-white/20'
                      : 'bg-white/85 backdrop-blur-xl text-[#0F172A] shadow-[0_12px_35px_-10px_rgba(139,26,74,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-white/90 hover:border-rose-300 hover:shadow-[0_20px_45px_-10px_rgba(139,26,74,0.18)] hover:bg-white/95'
                  }`}
                >
                  {/* Specular Top Edge Light on Active Card */}
                  {isFeatured && (
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  )}

                  {/* Ambient Holographic Medical Visualization */}
                  {isFeatured && HologramComponent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <HologramComponent />
                    </motion.div>
                  )}

                  {/* Top Icon Badge — Dual-Layer Glass Orb */}
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isFeatured
                          ? 'bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.2)] scale-105'
                          : 'bg-[#FDF2F7] text-[#8B1A4A] border border-rose-200/70 shadow-sm group-hover:bg-[#8B1A4A] group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(139,26,74,0.3)]'
                      }`}
                    >
                      <item.icon />
                    </div>

                    {/* Specialty Pill on Active State */}
                    {isFeatured && (
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-sm">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 max-w-[85%] mb-6">
                    <h3
                      className={`text-[21px] font-bold tracking-tight leading-snug mb-2 transition-colors duration-300 ${
                        isFeatured ? 'text-white' : 'text-[#0F172A] group-hover:text-[#8B1A4A]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-[13px] font-normal leading-relaxed transition-colors duration-300 ${
                        isFeatured ? 'text-white/85' : 'text-[#64748B]'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Action Pill */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        isFeatured
                          ? 'bg-white text-[#8B1A4A] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]'
                          : 'bg-[#FDF2F7] text-[#8B1A4A] group-hover:bg-[#8B1A4A] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(139,26,74,0.35)]'
                      }`}
                    >
                      <ArrowRight size={17} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <span
                      className={`text-[11px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 ${
                        isFeatured ? 'text-white' : 'text-[#8B1A4A]'
                      }`}
                    >
                      Explore Care →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Scroll Progress Bar ── */}
          <div className="w-48 h-1 bg-rose-200/50 rounded-full mx-auto mt-2 overflow-hidden">
            <div 
              className="h-full bg-[#8B1A4A] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
