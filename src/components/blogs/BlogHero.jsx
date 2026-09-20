import { motion } from 'framer-motion'
import { Sparkles, Search, BookOpen, ShieldCheck, HeartPulse } from 'lucide-react'

export function BlogHero({ searchTerm, onSearchChange, totalCount = 20 }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0f213a] to-[#0a1628] text-white pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
      {/* ── Background Subtle Glow & Abstract Healthcare Shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8B1A4A]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#004b87]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#8B1A4A]/10 via-transparent to-[#cca830]/10 rounded-full blur-2xl" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#cca830] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-sm"
        >
          <Sparkles size={13} className="animate-pulse" />
          <span>INSIGHTS & WELLNESS</span>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-black tracking-tight leading-[1.08] mb-6 text-white"
        >
          Knowledge That Helps <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">You </span>
          <span className="text-[#cca830] italic font-serif font-light">Live Better.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10"
        >
          Explore trusted healthcare information, specialist-led wellness guidance, advanced surgical breakthroughs, and practical medical knowledge from Srikara Hospitals' clinical faculty.
        </motion.p>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-2xl focus-within:border-[#cca830] focus-within:ring-2 focus-within:ring-[#cca830]/30 transition-all">
            <div className="pl-4 pr-2 text-white/60">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search health insights, specialties, robotic surgery, cardiology..."
              className="w-full bg-transparent text-white placeholder:text-slate-400 text-sm sm:text-base outline-none py-2.5 px-2"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Quick Highlights / Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300/80 font-medium"
        >
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <BookOpen size={15} className="text-[#cca830]" />
            <span>{totalCount} Clinical Guides</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <ShieldCheck size={15} className="text-[#8B1A4A]" />
            <span>Doctor Reviewed</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <HeartPulse size={15} className="text-emerald-400" />
            <span>NABH Accredited Insights</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
export default BlogHero
