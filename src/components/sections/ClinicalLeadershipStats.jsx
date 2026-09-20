import React from 'react'
import { assetUrl } from '@/lib/assetUrl'

export function ClinicalLeadershipStats() {
  return (
    <section className="relative bg-white pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 font-body">
      {/* 2-Column Grid Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* ── Left Column: Image ── */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square xl:aspect-[4/3] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />
            <img 
              src={assetUrl('images/home/clinical-leadership.jpg')} 
              alt="Clinical Leadership and Excellence" 
              className="w-full h-full object-cover object-center"
            />
            {/* Optional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B1A4A]/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* ── Right Column: Statistics Card ── */}
          <div className="bg-[#FAF4F7] rounded-[24px] sm:rounded-[28px] border border-[#8B1A4A]/15 p-6 sm:p-8 lg:p-10 shadow-[0_4px_25px_rgba(139,26,74,0.03)]">
            
            {/* Eyebrow */}
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#2D3A4A] mb-4 sm:mb-5 font-sans">
              CLINICAL LEADERSHIP & SCALE
            </p>

            {/* Primary Achievement Area */}
            <div className="flex items-start gap-4 sm:gap-5">
              
              {/* Medical Knee Joint Outline Icon inside circle */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.8px] sm:border-2 border-[#8B1A4A] flex items-center justify-center flex-shrink-0 text-[#8B1A4A]">
                <svg
                  viewBox="0 0 44 44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                >
                  <path d="M17 7v10c0 2.5-1.5 4.5-3 6-1.8 1.8-1.8 4.2 0 6 1.8 1.8 4.5 1.5 6-0.5 1-1.5 1-2.5 1-2.5" />
                  <path d="M27 7v10c0 2.5 1.5 4.5 3 6 1.8 1.8 1.8 4.2 0 6-1.8 1.8-4.5 1.5-6-0.5-1-1.5-1-2.5-1-2.5" />
                  <path d="M17 37v-4c0-2-1.5-3.5-3-4.5-1.8-1.2-1.8-3.2 0-4.5 1.8-1.2 4.2-.8 5.5.8 1 1.2 1.5 2.2 1.5 2.2" />
                  <path d="M27 37v-4c0-2 1.5-3.5 3-4.5 1.8-1.2 1.8-3.2 0-4.5-1.8-1.2-4.2-.8-5.5.8-1 1.2-1.5 2.2-1.5 2.2" />
                </svg>
              </div>

              {/* Achievement Numbers & Description */}
              <div className="flex-1">
                <div className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-[#8B1A4A] leading-none tracking-tight font-sans">
                  30,000+
                </div>
                <h3 className="text-base sm:text-lg lg:text-[18px] xl:text-[19px] font-bold text-[#0F2942] tracking-tight mt-1 leading-snug font-sans">
                  Joint Replacement Surgeries
                </h3>
                <p className="text-xs sm:text-[13px] text-[#2D3A4A] leading-snug mt-1.5 max-w-sm font-sans">
                  First in AP & Telangana to introduce<br className="hidden sm:inline" /> robotic joint replacement
                </p>
              </div>

            </div>

            {/* Thin Horizontal Divider */}
            <div className="my-5 sm:my-6 border-t border-[#8B1A4A]/15" />

            {/* Bottom Statistics: Three Equal Columns with Vertical Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#8B1A4A]/15 text-center">
              
              {/* Column 1: Surgery / Calendar */}
              <div className="py-3.5 sm:py-0 sm:px-3 flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center text-[#8B1A4A] mb-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#8B1A4A]"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                    <path d="M7 14h.01M11 14h.01" />
                    <circle cx="16" cy="16" r="3.5" fill="#FAF4F7" />
                    <path d="M16 14.5v1.5l1 1" />
                  </svg>
                </div>
                <div className="text-2xl sm:text-[27px] font-black text-[#8B1A4A] tracking-tight leading-none font-sans mb-1">
                  2,350
                </div>
                <p className="text-xs sm:text-[12.5px] text-[#0F2942] font-semibold leading-tight font-sans">
                  surgeries in
                </p>
                <p className="text-xs sm:text-[12.5px] text-[#0F2942] font-semibold leading-tight font-sans">
                  180 days
                </p>
              </div>

              {/* Column 2: Robotic Procedures */}
              <div className="py-3.5 sm:py-0 sm:px-3 flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center text-[#8B1A4A] mb-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#8B1A4A]"
                  >
                    <path d="M12 2v3M10 2h4" />
                    <rect x="5" y="5" width="14" height="11" rx="2.5" />
                    <circle cx="8.5" cy="10.5" r="1.2" fill="currentColor" />
                    <circle cx="15.5" cy="10.5" r="1.2" fill="currentColor" />
                    <path d="M10 13.5h4" />
                    <path d="M2 9.5h3M19 9.5h3" />
                    <path d="M9 16v3M15 16v3M7 21h10" />
                  </svg>
                </div>
                <div className="text-2xl sm:text-[27px] font-black text-[#8B1A4A] tracking-tight leading-none font-sans mb-1">
                  1,250
                </div>
                <p className="text-xs sm:text-[12.5px] text-[#0F2942] font-semibold leading-tight font-sans">
                  robotic procedures
                </p>
                <p className="text-xs sm:text-[12.5px] text-[#0F2942] font-semibold leading-tight font-sans">
                  in 180 days
                </p>
              </div>

              {/* Column 3: Single Day Achievement */}
              <div className="py-3.5 sm:py-0 sm:px-3 flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center text-[#8B1A4A] mb-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#8B1A4A]"
                  >
                    <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
                    <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
                    <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
                    <path d="M12 16v4M8 20h8" />
                  </svg>
                </div>
                <div className="text-2xl sm:text-[27px] font-black text-[#8B1A4A] tracking-tight leading-none font-sans mb-1">
                  38
                </div>
                <p className="text-xs sm:text-[12.5px] text-[#0F2942] font-semibold leading-tight font-sans">
                  surgeries in
                </p>
                <p className="text-xs sm:text-[12.5px] text-[#0F2942] font-semibold leading-tight font-sans">
                  a single day
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

