import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { LeadershipCard } from './LeadershipCard'
import { assetUrl } from '@/lib/assetUrl'

const LEADERS_DATA = [
  {
    id: 'akhil-dadi',
    name: 'Dr. Akhil Dadi',
    role: 'FOUNDER, CHAIRMAN AND MANAGING DIRECTOR',
    department: 'Joint Replacement & Robotic Surgery',
    description:
      'Visionary orthopedic surgeon and the driving force behind Srikara Hospitals. A pioneer of robotic joint replacement in South India with over 30,000 successful procedures.',
    image: assetUrl('doctors/akhil-dadi.png'),
    theme: 'maroon',
    link: '/doctors/dr-akhil-dadi',
    fullBio:
      'Visionary orthopedic surgeon and the driving force behind Srikara Hospitals. A pioneer of robotic joint replacement in South India with over 30,000 successful procedures, bringing world-class surgical precision and affordable healthcare.',
  },
  {
    id: 'rama-saraswathi',
    name: 'Dr. Rama Saraswathi',
    role: 'PROMOTER & DIRECTOR',
    department: 'Business Strategy & Development',
    description: 'Brings decades of leadership experience in business strategy and institutional development.',
    image: assetUrl('images/leadership/rama-saraswathi.png'),
    initials: 'RS',
    initialsSub: 'EXECUTIVE SUITE',
    theme: 'blue',
    link: null,
    fullBio: 'A distinguished corporate leader bringing decades of strategic foresight, governance integrity, and institutional growth leadership to Srikara Hospitals.',
  },
  {
    id: 'sireesha',
    name: 'M.V. Sireesha',
    role: 'CEO',
    department: 'Executive Leadership',
    description:
      'Drives overall strategic vision, administrative leadership, and healthcare expansion for the Srikara Hospitals network.',
    image: assetUrl('images/leadership/sireesha.png'),
    initials: 'MS',
    initialsSub: 'EXECUTIVE SUITE',
    theme: 'magenta',
    link: null,
    fullBio:
      'Drives overall strategic vision, administrative leadership, operational scalability, and hospital expansion across Telangana and Andhra Pradesh.',
  },
]

export function LeadershipSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLeader, setSelectedLeader] = useState(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : LEADERS_DATA.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < LEADERS_DATA.length - 1 ? prev + 1 : 0))
  }

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-28 bg-[#FAF9F7] overflow-hidden border-b border-slate-100">
      
      {/* Soft background aura */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-rose-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-sky-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ──────────────── LEFT COLUMN: Editorial & Handwritten Accent ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px] bg-[#8B1A4A] rounded-full" />
                <span className="text-[11px] sm:text-xs font-black tracking-[0.24em] text-[#8B1A4A] uppercase font-sans">
                  OUR LEADERSHIP
                </span>
                <span className="w-5 h-[2px] bg-[#8B1A4A] rounded-full" />
              </div>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] text-[#0A1628] font-bold tracking-tight mb-4">
                The Minds <br />
                Behind Our <br />
                <span
                  className="text-[#8B1A4A] italic font-serif"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Mission
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-sm">
                Our leadership team brings together years of experience, deep domain knowledge and a genuine commitment to people’s health and well-being.
              </p>
            </div>

            {/* Handwritten-Style Quote / Badge */}
            <div className="pt-2 mb-6 sm:mb-8">
              <div
                className="text-2xl sm:text-3xl text-[#0A1628] leading-tight select-none -rotate-2 transform"
                style={{
                  fontFamily: "'Playfair Display', 'Caveat', Georgia, cursive, serif",
                  fontStyle: 'italic',
                  fontWeight: 600,
                }}
              >
                Better Health <br />
                <span className="text-[#8B1A4A]">Brighter Future</span>
              </div>
            </div>

            {/* Navigation Arrows for Carousel */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Leader"
                className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] transition-all duration-300 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Leader"
                className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] transition-all duration-300 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </motion.div>

          {/* ──────────────── RIGHT COLUMN: Leadership Cards ──────────────── */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
              {LEADERS_DATA.map((leader, idx) => (
                <LeadershipCard
                  key={leader.id}
                  leader={leader}
                  onSelect={(item) => setSelectedLeader(item)}
                />
              ))}
            </div>

            {/* Pagination Dots below cards */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {LEADERS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-[#8B1A4A]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Modal for Selected Leader / Director Bio ── */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100"
            >
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-[#8B1A4A] font-serif font-bold text-xl">
                  {selectedLeader.initials || 'MS'}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#8B1A4A] text-white">
                    {selectedLeader.role}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#0A1628] mt-1">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedLeader.degree}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-[#8B1A4A] mb-2">
                  {selectedLeader.department}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedLeader.fullBio || selectedLeader.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default LeadershipSection
