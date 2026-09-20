import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Heart } from 'lucide-react'
import { assetUrl } from '@/lib/assetUrl'

export function LeadershipHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FBFBFC] via-[#F8F9FB] to-white pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 border-b border-slate-100">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-100/50 to-rose-50/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-sky-100/40 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Typography & Highlights ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 lg:col-span-12 flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <span className="w-5 h-[2px] bg-[#8B1A4A] rounded-full" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.24em] text-[#8B1A4A] uppercase font-sans">
                OUR VISION
              </span>
              <span className="w-5 h-[2px] bg-[#8B1A4A] rounded-full" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] text-[#0A1628] font-bold tracking-tight mb-5 text-center">
              Guided by{' '}
              <span
                className="text-[#8B1A4A] italic font-serif"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Vision.
              </span>
              <br />
              Driven by Care.
            </h1>

            {/* Description */}
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-lg text-center mx-auto">
              Meet the dedicated leaders behind Srikara Hospital, who bring expertise, compassion and a shared vision to build a healthier tomorrow.
            </p>

            {/* Value Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-800 hover:border-[#8B1A4A]/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#8B1A4A]/10 flex items-center justify-center text-[#8B1A4A]">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span>World-Class Medical Expertise</span>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-800 hover:border-[#8B1A4A]/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-[#E11D48]">
                  <Heart className="w-3.5 h-3.5 fill-[#E11D48]" />
                </div>
                <span>Patient First. Always.</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default LeadershipHero
