import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ShieldCheck, Users, Sparkles } from 'lucide-react'
import { assetUrl } from '@/lib/assetUrl'

const PURPOSE_VALUES = [
  {
    id: 'compassion',
    title: 'Compassion',
    tagline: 'We care, deeply.',
    icon: Heart,
    color: 'rose',
  },
  {
    id: 'excellence',
    title: 'Excellence',
    tagline: 'We aim higher.',
    icon: ShieldCheck,
    color: 'blue',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    tagline: 'We embrace change.',
    icon: Sparkles,
    color: 'pink',
  },
  {
    id: 'community',
    title: 'Community',
    tagline: 'We grow together.',
    icon: Users,
    color: 'cyan',
  },
]

export function ValuesSection() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-28 bg-white overflow-hidden border-t border-slate-100">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] rounded-full bg-pink-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-sky-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ──────────────── LEFT SIDE: Eyebrow, Heading, and 4 Values ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-[2px] bg-[#8B1A4A] rounded-full" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.24em] text-[#8B1A4A] uppercase font-sans">
                OUR PURPOSE
              </span>
              <span className="w-5 h-[2px] bg-[#8B1A4A] rounded-full" />
            </div>

            {/* Large Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.1] text-[#0A1628] font-bold tracking-tight mb-4">
              More Than <br />
              <span
                className="text-[#8B1A4A] italic font-serif"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Healthcare
              </span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-lg">
              We believe in holistic care — not just for today, but for a healthier tomorrow. Our purpose is to support, empower and uplift every individual and family we serve.
            </p>

            {/* Four Value Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {PURPOSE_VALUES.map((val, idx) => {
                const IconComponent = val.icon
                const isRose = val.color === 'rose'
                const isBlue = val.color === 'blue'
                const isPink = val.color === 'pink'

                return (
                  <motion.div
                    key={val.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-2xl bg-[#FBFBFC] border border-slate-100 hover:border-rose-200 hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Icon container */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                        isRose
                          ? 'bg-rose-50 text-[#E11D48]'
                          : isBlue
                          ? 'bg-sky-50 text-[#0284C7]'
                          : isPink
                          ? 'bg-pink-50 text-[#C7256B]'
                          : 'bg-teal-50 text-[#0D9488]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 stroke-[2]" />
                    </div>

                    {/* Label & Tagline */}
                    <p className="font-serif font-bold text-sm text-[#0A1628] leading-tight mb-1">
                      {val.title}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {val.tagline}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* ──────────────── RIGHT SIDE: Circular Team Photo with Orbital Rings ──────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85 }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Outer Decorative Concentric Rings */}
              <div className="absolute inset-0 rounded-full border border-pink-200/60 pointer-events-none animate-[spin_60s_linear_infinite]" />
              <div className="absolute -inset-3 rounded-full border border-dashed border-sky-200/60 pointer-events-none" />

              {/* Main Circular Masked Team Hands Image */}
              <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                <img
                  src={assetUrl('images/leadership/team-hands.jpg')}
                  alt="Medical team hands together"
                  className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten Floating Note at Bottom Right */}
              <div
                className="absolute -bottom-2 -right-2 sm:bottom-2 sm:right-0 z-20 select-none -rotate-6 transform"
                style={{
                  fontFamily: "'Playfair Display', 'Caveat', Georgia, cursive, serif",
                  fontStyle: 'italic',
                }}
              >
                <span className="text-xl sm:text-2xl font-bold text-[#0A1628] drop-shadow-sm">
                  Health for <br />
                  <span className="text-[#8B1A4A]">Every Family</span>
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default ValuesSection
