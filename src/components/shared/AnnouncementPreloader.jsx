import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { assetUrl } from '@/lib/assetUrl'

const POSTERS = [
  {
    id: 'nellore',
    title: 'New Nellore Branch Grand Opening',
    image: assetUrl('announcements/poster_1.png'),
    defaultDuration: 1500, // 1.5s fast auto-advance
    hoverDuration: 4000    // 4.0s pause when hovered
  },
  {
    id: 'hrudaya',
    title: 'Srikara Hrudaya Special Heart Care',
    image: assetUrl('announcements/poster_2.png'),
    defaultDuration: 1500,
    hoverDuration: 4000
  },
  {
    id: 'op200',
    title: 'Miyapur OP Consultation ₹1200',
    image: assetUrl('announcements/poster_3.png'),
    defaultDuration: 1500,
    hoverDuration: 4000
  }
]

export function AnnouncementPreloader({ force = false, onComplete }) {
  const [visible, setVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('srikara_preloader_shown')
    if (force || !hasSeen) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      if (onComplete) onComplete()
    }

    const handleReTrigger = () => {
      setCurrentIndex(0)
      setIsExiting(false)
      setIsHovered(false)
      setVisible(true)
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('srikara_show_preloader', handleReTrigger)

    return () => {
      window.removeEventListener('srikara_show_preloader', handleReTrigger)
    }
  }, [force, onComplete])

  useEffect(() => {
    if (!visible || isExiting) return

    const currentPoster = POSTERS[currentIndex]
    const duration = isHovered ? currentPoster.hoverDuration : currentPoster.defaultDuration

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      if (currentIndex < POSTERS.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else {
        handleExit()
      }
    }, duration)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, visible, isExiting, isHovered])

  const handleExit = () => {
    if (isExiting) return
    setIsExiting(true)
    if (timerRef.current) clearTimeout(timerRef.current)

    sessionStorage.setItem('srikara_preloader_shown', 'true')

    setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
      if (onComplete) onComplete()
    }, 600)
  }

  if (!visible) return null

  const currentPoster = POSTERS[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        key="poster-preloader-overlay"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.02 : 1
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-[999999] w-screen h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between overflow-hidden select-none p-4 sm:p-8"
      >
        {/* ── TOP HEADER BAR: SRIKARA LOGO & SKIP BUTTON ── */}
        <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
          <img 
            src={assetUrl('Srikara Hospitals, LB Nagar.png')} 
            alt="Srikara Hospitals Logo" 
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm" 
          />

          <button
            onClick={handleExit}
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#8B1A4A] border border-slate-200 hover:border-[#8B1A4A] text-slate-700 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            <span>Skip</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </header>

        {/* ── CENTER STAGE: HOVER-PAUSABLE PROMINENT POSTER IMAGE ── */}
        <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto flex items-center justify-center p-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPoster.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative max-h-[82vh] w-auto max-w-full flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-slate-200 bg-white p-2 sm:p-3 cursor-pointer group"
            >
              <img
                src={currentPoster.image}
                alt={currentPoster.title}
                className="max-h-[76vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Hover Badge Indicator */}
              {isHovered && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Paused on Hover (4s)</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── BOTTOM DOT INDICATORS ── */}
        <footer className="relative z-10 w-full max-w-6xl mx-auto h-6 flex items-center justify-center">
          <div className="flex items-center gap-2">
            {POSTERS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to poster ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer border-none outline-none ${
                  currentIndex === idx ? 'w-6 h-2 bg-[#8B1A4A]' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}
