import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function LeadershipCard({ leader, onSelect }) {
  const [imgError, setImgError] = useState(false)

  const isMaroon = leader.theme === 'maroon'
  const isBlue = leader.theme === 'blue'
  const isMagenta = leader.theme === 'magenta'

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[30px] border bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full ${
        isMaroon
          ? 'border-rose-200/80 shadow-[0_10px_30px_rgba(139,26,74,0.06)]'
          : isBlue
          ? 'border-sky-100/90 shadow-[0_10px_30px_rgba(2,132,199,0.06)]'
          : 'border-pink-200/80 shadow-[0_10px_30px_rgba(199,37,107,0.06)]'
      }`}
    >
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        
        {/* ── Portrait Frame with Pill Badge at Bottom ── */}
        <div className="relative mb-6">
          {/* Portrait Container with Pastel Tint */}
          <div
            className={`relative mx-auto overflow-hidden w-full h-64 sm:h-72 rounded-[24px] flex items-end justify-center ${
              isMaroon
                ? 'bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#FFD8E4]'
                : isBlue
                ? 'bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE] to-[#D0EBFF]'
                : 'bg-gradient-to-b from-[#FFF5F8] via-[#FFE9F1] to-[#FFDEEC]'
            }`}
          >
            {leader.image && !imgError ? (
              <img
                src={leader.image}
                alt={leader.name}
                onError={() => setImgError(true)}
                className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                  leader.id === 'rama-saraswathi' 
                    ? 'object-cover object-top' 
                    : 'object-contain object-bottom'
                }`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
                <span
                  className="font-serif text-6xl sm:text-7xl font-normal text-[#8B1A4A] tracking-wider transition-transform duration-500 group-hover:scale-110"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {leader.initials || 'MS'}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#8B1A4A]/70 mt-3">
                  {leader.initialsSub || 'EXECUTIVE SUITE'}
                </span>
              </div>
            )}
          </div>

          {/* Solid Pill Badge overlapping bottom of portrait */}
          <div className="flex justify-center -mt-4 relative z-20">
            <span
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md ${
                isMaroon
                  ? 'bg-[#C7256B] text-white shadow-[#C7256B]/30'
                  : isBlue
                  ? 'bg-[#0284C7] text-white shadow-[#0284C7]/25'
                  : 'bg-[#C7256B] text-white shadow-[#C7256B]/30'
              }`}
            >
              {leader.role}
            </span>
          </div>
        </div>

        {/* ── Name & Department ── */}
        <div className="flex-1 flex flex-col pt-1">
          <h3
            className={`font-serif font-bold text-2xl leading-tight mb-2 transition-colors ${
              isMaroon
                ? 'text-[#8B1A4A]'
                : 'text-[#0A1628] group-hover:text-[#8B1A4A]'
            }`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {leader.name}
          </h3>

          {/* Department / Subtitle */}
          <p
            className={`text-xs sm:text-[13px] font-bold mb-4 ${
              isMaroon
                ? 'text-[#8B1A4A]'
                : isBlue
                ? 'text-[#0284C7]'
                : 'text-[#8B1A4A]'
            }`}
          >
            {leader.department}
          </p>

          {/* Description */}
          <p className="text-slate-600 font-sans text-xs sm:text-[13px] leading-relaxed mb-6 font-normal">
            "{leader.description}"
          </p>
        </div>

        {/* ── CTA KNOW MORE Action Link ── */}
        <div className="pt-3 border-t border-slate-100 flex items-center">
          {leader.link ? (
            <Link
              to={leader.link}
              className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-all duration-300 group-hover:gap-3 ${
                isMaroon
                  ? 'text-[#8B1A4A] hover:text-[#70133A]'
                  : 'text-[#0A1628] hover:text-[#8B1A4A]'
              }`}
            >
              <span>KNOW MORE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              onClick={() => onSelect?.(leader)}
              className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-all duration-300 group-hover:gap-3 ${
                isMaroon
                  ? 'text-[#8B1A4A] hover:text-[#70133A]'
                  : 'text-[#0A1628] hover:text-[#8B1A4A]'
              }`}
            >
              <span>KNOW MORE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </motion.div>
  )
}

export default LeadershipCard
