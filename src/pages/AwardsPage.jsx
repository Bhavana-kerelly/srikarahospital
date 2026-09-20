import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Award, ChevronRight, Trophy, Star } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export function AwardsPage() {
  return (
    <>
      <Helmet>
        <title>Awards & Recognition | Discover Srikara Hospitals</title>
        <meta name="description" content="Explore the national and international honors, accreditations, and awards bestowed upon Srikara Hospitals." />
      </Helmet>

      <div className="min-h-screen bg-[#FFF9FA] text-[#1A202C] selection:bg-[#8B1A4A] selection:text-white">
        <StickyNavbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-[#8B1A4A]/5 blur-[150px] rounded-full opacity-60" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')] opacity-10" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
              <Link to="/about" className="hover:text-[#8B1A4A] transition-colors flex items-center gap-1">
                <ArrowLeft size={14} /> Discover Srikara
              </Link>
              <ChevronRight size={12} className="opacity-40" />
              <span className="text-[#8B1A4A]">Awards & Recognition</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B1A4A]/25 text-[#8B1A4A] text-[11px] font-black uppercase tracking-[0.35em] mb-6 bg-[#8B1A4A]/5">
                <Award size={13} />
                Honors & Accreditations
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Awards & <span className="italic text-[#8B1A4A]">Recognition</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4A4A4A] font-light leading-relaxed">
                Celebrating a proud heritage of medical accolades, NABH & NABL accreditations, and healthcare excellence awards earned through decades of dedicated patient care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Container (Placeholder for incoming user code) */}
        <section className="pb-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="rounded-3xl border border-dashed border-[#8B1A4A]/25 bg-white/70 backdrop-blur-md p-12 md:p-20 text-center shadow-[0_10px_30px_rgba(139,26,74,0.03)]">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#8B1A4A]/10 flex items-center justify-center text-[#8B1A4A]">
                <Trophy size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Awards & Industry Accolades
              </h2>
              <p className="text-[#718096] text-sm md:text-base max-w-xl mx-auto mb-8">
                Detailed lists, gallery of certificates, trophies, and healthcare industry awards will appear here.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8B1A4A] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#72153c] transition-colors shadow-lg shadow-[#8B1A4A]/20"
              >
                <ArrowLeft size={14} /> Back to Discover Srikara
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
