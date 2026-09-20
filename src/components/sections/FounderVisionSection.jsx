import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Globe, ArrowRight } from 'lucide-react'
import { assetUrl } from '@/lib/assetUrl'

export function FounderVisionSection() {
  const navigate = useNavigate()

  return (
    <section className="relative bg-[#FAFBFD] overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-16 border-b border-slate-100 font-body">
      
      {/* ── Background Srikara Hospitals Building (Lower-Right) ── */}
      <div className="absolute bottom-0 right-0 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px] pointer-events-none select-none z-0 opacity-15 sm:opacity-20 mix-blend-multiply transition-opacity">
        <img
          src={assetUrl('Srikara Hospitals, LB Nagar.png')}
          alt="Srikara Hospitals Facade"
          className="w-full h-auto object-contain object-bottom"
          style={{
            maskImage: 'linear-gradient(to top, black 50%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Background Curved Wave (Bottom-Left & Center in Srikara Brand Palette) ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-20 md:h-24 lg:h-28 preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Subtle rose/burgundy tint secondary wave */}
          <path
            d="M0 130C220 80 440 180 720 150C1000 120 1240 180 1440 140V220H0V130Z"
            fill="#F5D6E3"
            fillOpacity="0.45"
          />
          {/* Deep wine burgundy primary wave */}
          <path
            d="M0 90C180 40 380 130 580 160C780 190 980 160 1180 170C1320 178 1400 185 1440 190V220H0V90Z"
            fill="#5E0F30"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDE: DR. AKHIL DADI PORTRAIT & EDITORIAL ACCENTS
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-start">
            
            {/* Upper-Left Vertical Decorative Text (Srikara Brand Burgundy) */}
            <div className="w-full flex items-start justify-start mb-2 lg:mb-0 lg:absolute lg:top-1 lg:left-0 z-20 pointer-events-none">
              <div className="flex flex-col">
                <div className="w-7 h-[2px] bg-[#CCA830] mb-2 rounded-full" />
                <p className="text-[#8B1A4A] text-[10px] sm:text-[11px] font-black tracking-[0.2em] leading-tight font-sans">
                  BETTER<br />
                  MOVEMENT.<br />
                  BRIGHTER<br />
                  TOMORROWS.
                </p>
              </div>
            </div>

            {/* Dr. Akhil Dadi Portrait Card */}
            <div className="relative w-full max-w-[480px] lg:max-w-[540px] pt-2 lg:pt-4 flex justify-center">
              <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[520px] flex items-end justify-center">
                <img
                  src={assetUrl('doctors/akhil-dadi.png')}
                  alt="Dr. Akhil Dadi - Founder, Chairman & Managing Director"
                  className="w-full h-full object-contain object-bottom scale-105 sm:scale-110 lg:scale-110 origin-bottom drop-shadow-2xl z-10 transition-transform duration-700 hover:scale-[1.12]"
                  onError={(e) => {
                    e.target.src = assetUrl('doctors/akhil-dadi copy.png')
                  }}
                />

                {/* Soft glow behind the portrait */}
                <div className="absolute inset-x-4 bottom-8 h-60 bg-gradient-to-t from-[#8B1A4A]/15 via-[#F5D6E3]/25 to-transparent rounded-full blur-xl -z-0 pointer-events-none" />
              </div>

              {/* Signature-Style Name & Designation in Srikara Logo Colors */}
              <div className="absolute bottom-2 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-rose-100 shadow-[0_4px_20px_rgba(139,26,74,0.08)]">
                <p className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl lg:text-[40px] text-[#8B1A4A] font-normal leading-none mb-1">
                  Dr. Akhil Dadi
                </p>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] text-[#2D3A4A] leading-tight">
                  FOUNDER, CHAIRMAN & MANAGING DIRECTOR
                </p>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] text-[#8B1A4A] leading-tight mt-0.5">
                  SRIKARA HOSPITALS
                </p>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDE: THE VISION BEHIND SRIKARA (SRIKARA LOGO PALETTE)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Header with Gold Line */}
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#2D3A4A]">
                THE VISION THAT BUILT <span className="text-[#8B1A4A]">SRIKARA</span>
              </span>
              <span className="w-8 h-[2px] bg-[#CCA830] inline-block rounded-full" />
            </div>

            {/* Main Heading in Srikara Deep Wine/Burgundy */}
            <h2 className="font-['Playfair_Display',serif] font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#8B1A4A] tracking-tight leading-[1.05] mb-1">
              Dr. Akhil Dadi
            </h2>

            {/* Subtitle Designation in Srikara Slate Charcoal */}
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#2D3A4A] mb-3">
              FOUNDER, CHAIRMAN & MANAGING DIRECTOR
            </p>

            {/* Vision Statement with Srikara Highlight */}
            <h3 className="font-['Playfair_Display',serif] text-base sm:text-lg md:text-[19px] text-[#2D3A4A] font-semibold leading-snug mb-2.5 max-w-xl">
              From humble beginnings to building a vision for{' '}
              <span className="text-[#8B1A4A]">world-class orthopaedic care.</span>
            </h3>

            {/* Body Description */}
            <p className="text-[#4A5568] text-xs sm:text-[13.5px] leading-relaxed mb-5 max-w-xl font-normal">
              Dr. Akhil Dadi’s journey is one of determination, continuous learning and a deep commitment to patient care. With a strong foundation in orthopaedics, advanced training, and a belief in innovation, he has dedicated his life to helping people move better and live better.
            </p>

            {/* ── Three Credential Columns with Srikara Highlights ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 sm:divide-x divide-rose-100/90 mb-5 max-w-xl bg-white/70 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-rose-100 sm:border-none">
              
              {/* Column 1: NIMS Gold Medalist */}
              <div className="group flex flex-col sm:pr-3">
                <div className="w-9 h-9 rounded-full bg-[#FDF2F7] border border-[#8B1A4A]/20 flex items-center justify-center text-[#8B1A4A] group-hover:bg-[#8B1A4A] group-hover:text-white transition-colors duration-200 mb-2 shadow-xs">
                  <GraduationCap size={18} strokeWidth={1.8} />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2D3A4A] group-hover:text-[#8B1A4A] transition-colors duration-200 leading-snug mb-1">
                  NIMS<br />GOLD MEDALIST
                </h4>
                <p className="text-[10px] text-slate-500 leading-snug">
                  First rank in MS Orthopaedics and Gold Medalist.
                </p>
              </div>

              {/* Column 2: Joint Replacement Specialist */}
              <div className="group flex flex-col sm:px-3">
                <div className="w-9 h-9 rounded-full bg-[#FDF2F7] border border-[#8B1A4A]/20 flex items-center justify-center text-[#8B1A4A] group-hover:bg-[#8B1A4A] group-hover:text-white transition-colors duration-200 mb-2 shadow-xs">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M9 10c0-1.5 1.3-2 3-2s3 .5 3 2c0 2-2 3-2 5" />
                    <circle cx="12" cy="19" r="2" />
                    <path d="M12 17v5" />
                    <path d="M7 12h10" />
                  </svg>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2D3A4A] group-hover:text-[#8B1A4A] transition-colors duration-200 leading-snug mb-1">
                  JOINT REPLACEMENT<br />SPECIALIST
                </h4>
                <p className="text-[10px] text-slate-500 leading-snug">
                  Dedicated to advancing joint replacement and restoring mobility.
                </p>
              </div>

              {/* Column 3: Global Exposure & Innovation */}
              <div className="group flex flex-col sm:pl-3">
                <div className="w-9 h-9 rounded-full bg-[#FDF2F7] border border-[#8B1A4A]/20 flex items-center justify-center text-[#8B1A4A] group-hover:bg-[#8B1A4A] group-hover:text-white transition-colors duration-200 mb-2 shadow-xs">
                  <Globe size={18} strokeWidth={1.8} />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2D3A4A] group-hover:text-[#8B1A4A] transition-colors duration-200 leading-snug mb-1">
                  GLOBAL EXPOSURE<br />& INNOVATION
                </h4>
                <p className="text-[10px] text-slate-500 leading-snug">
                  Advanced fellowship training in Germany and early adopter of Computer Navigation Technology for knee replacement.
                </p>
              </div>

            </div>

            {/* ── Soft Curved Quote Area in Srikara Colors ── */}
            <div className="relative bg-gradient-to-r from-[#FDF2F7] via-[#FDF5F8] to-[#FFF9FB] rounded-xl sm:rounded-r-2xl sm:rounded-l-lg p-3.5 sm:p-4 border-l-4 border-[#8B1A4A] max-w-xl mb-5 shadow-[0_2px_15px_rgba(139,26,74,0.04)]">
              <div className="text-[#8B1A4A] font-['Playfair_Display',serif] text-2xl sm:text-3xl leading-none absolute top-3 left-3 select-none opacity-80">
                “
              </div>
              <div className="pl-6">
                <blockquote className="font-['Playfair_Display',serif] italic text-[#2D3A4A] text-xs sm:text-[13.5px] leading-relaxed mb-1">
                  Success is seeing a patient walk again, smile again, and return to a normal life without pain.
                </blockquote>
                <cite className="not-italic text-[10.5px] font-black text-[#8B1A4A] tracking-wider uppercase">
                  — Dr. Akhil Dadi
                </cite>
              </div>
            </div>

            {/* ── Rounded CTA Button in Srikara Burgundy ── */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/about/leadership')}
                className="group inline-flex items-center gap-2.5 bg-[#8B1A4A] hover:bg-[#70133a] text-white px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold tracking-wider uppercase shadow-[0_8px_25px_rgba(139,26,74,0.25)] hover:shadow-[0_12px_30px_rgba(139,26,74,0.35)] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Discover His Journey</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-[#CCA830]" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}
