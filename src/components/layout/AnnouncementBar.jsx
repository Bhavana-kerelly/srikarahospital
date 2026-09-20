import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const DEFAULT_ANNOUNCEMENTS = [
  'Bringing Trusted Healthcare Closer to Nellore — Srikara Hospitals proudly announces its new branch in Nellore.',
  'A New Era of Robotic Surgery Begins — Advanced Robotic Care for Urology, General Surgery & Oncology at Lakdikapul & Miyapur, Hyderabad',
  'Srikara Hrudaya — Advanced 24/7 Emergency Cardiac Science Center with Ultra-Modern Cath Lab.',
  'Miyapur Super-Specialty Unit — Comprehensive OP Consultations & Robotic Knee Surgeries available.'
]

export function AnnouncementBar({ items = DEFAULT_ANNOUNCEMENTS, link = '/blogs' }) {
  const [isPaused, setIsPaused] = useState(false)
  const navigate = useNavigate()

  const displayItems = items && items.length > 0 ? items : DEFAULT_ANNOUNCEMENTS

  const handleNavigate = (e) => {
    e.stopPropagation()
    if (link) {
      navigate(link)
    }
  }

  return (
    <div
      onClick={handleNavigate}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full bg-[#8B1A4A] border-b border-white/20 py-2.5 sm:py-3.5 px-3 sm:px-6 md:px-8 cursor-pointer group shadow-lg transition-all duration-300 flex items-center justify-between gap-3 overflow-hidden relative z-30 min-h-[44px] select-none"
    >
      {/* ── Dark Badge: LATEST UPDATE with pulsing dot ── */}
      <div className="flex items-center gap-2 bg-[#0a1628] text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex-shrink-0 shadow-md z-10">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>LATEST UPDATE</span>
      </div>

      <span className="text-white/40 text-xs font-light flex-shrink-0 z-10 hidden sm:inline">|</span>

      {/* ── Continuous Smooth Scrolling Marquee Area Across Full Width ── */}
      <div className="overflow-hidden relative flex-1 flex items-center">
        <motion.div
          animate={isPaused ? false : { x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear'
          }}
          className="whitespace-nowrap font-medium text-xs sm:text-sm md:text-base text-white group-hover:text-white/95 transition-colors flex items-center shrink-0"
        >
          {/* Set 1 */}
          <div className="flex items-center">
            {displayItems.map((item, idx) => (
              <span key={`a-${idx}`} className="inline-flex items-center gap-4 sm:gap-6 px-4 sm:px-8">
                <span>{item}</span>
                <span className="text-white/50 text-xs select-none">✦</span>
              </span>
            ))}
          </div>
          {/* Set 2 (Duplicate for seamless loop) */}
          <div className="flex items-center">
            {displayItems.map((item, idx) => (
              <span key={`b-${idx}`} className="inline-flex items-center gap-4 sm:gap-6 px-4 sm:px-8">
                <span>{item}</span>
                <span className="text-white/50 text-xs select-none">✦</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right Call to Action: VIEW → button ── */}
      <div
        onClick={handleNavigate}
        className="flex items-center gap-1.5 text-white/90 group-hover:text-white text-xs md:text-sm font-bold uppercase tracking-wider ml-2 flex-shrink-0 transition-transform z-10 bg-[#8B1A4A] pl-2 sm:pl-3"
      >
        <span className="hidden sm:inline">VIEW</span>
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  )
}
export default AnnouncementBar
