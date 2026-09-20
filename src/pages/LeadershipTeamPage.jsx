import React from 'react'
import { Helmet } from 'react-helmet-async'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { LeadershipHero } from '@/components/leadership/LeadershipHero'
import { LeadershipSection } from '@/components/leadership/LeadershipSection'
import { BoardSection } from '@/components/leadership/BoardSection'
import { ValuesSection } from '@/components/leadership/ValuesSection'

export function LeadershipTeamPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#0A1628] overflow-x-hidden selection:bg-[#8B1A4A] selection:text-white font-sans antialiased flex flex-col justify-between">
      {/* ── Page SEO Metadata ── */}
      <Helmet>
        <title>Leadership & Board of Directors | Srikara Hospitals</title>
        <meta
          name="description"
          content="Meet the dedicated leaders and Board of Directors behind Srikara Hospitals, guiding healthcare with vision, precision, and compassion."
        />
        <meta property="og:title" content="Leadership & Governance | Srikara Hospitals" />
        <meta
          property="og:description"
          content="Guided by Vision. Driven by Care. Meet the minds steering excellence at Srikara Hospitals."
        />
      </Helmet>

      {/* ── Header Navigation ── */}
      <StickyNavbar />

      {/* ── Main Page Content ── */}
      <main className="flex-1 w-full">
        {/* ── SECTION 1: LEADERSHIP HERO ── */}
        <LeadershipHero />

        {/* ── SECTION 2: OUR LEADERSHIP / THE MINDS BEHIND OUR MISSION ── */}
        <LeadershipSection />

        {/* ── SECTION 3: BOARD OF DIRECTORS (DARK NAVY THEME) ── */}
        <BoardSection />

        {/* ── SECTION 4: OUR VALUES ── */}
        <ValuesSection />
      </main>

      {/* ── Footer Navigation ── */}
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default LeadershipTeamPage
