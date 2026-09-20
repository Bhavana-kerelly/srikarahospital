import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Search, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { useState, useRef } from 'react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { BranchSideNav } from '@/components/layout/BranchSideNav'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ALL_DOCTORS, ACCENT_MAP } from '@/data/doctors'
import { branches } from '@/data/branches'
import { openWhatsAppBooking } from '@/lib/whatsapp'

// Branch display order & metadata
const BRANCH_ORDER = [
  'RTC X Roads', 'Lakdikapul', 'Peerzadiguda', 'Miyapur', 'Madeenaguda',
  'Vijayawada', 'Rajahmundry', 'LB Nagar', 'Kompally', 'ECIL',
]

const BRANCH_META = {
  'RTC X Roads':  { icon: '🤖', color: '#d97706', slug: 'rtc-x-roads', title: 'RTC X Roads' },
  'Lakdikapul':   { icon: '🦴', color: '#0891b2', slug: 'lakdikapul', title: 'Lakdikapul' },
  'Peerzadiguda': { icon: '🔬', color: '#1a56db', slug: 'peerzadiguda', title: 'Peerzadiguda' },
  'Miyapur':      { icon: '🩺', color: '#16a34a', slug: 'miyapur', title: 'Miyapur' },
  'Madeenaguda':  { icon: '🏥', color: '#0284c7', slug: 'miyapur', title: 'Madeenaguda' },
  'Vijayawada':   { icon: '⚕️', color: '#9333ea', slug: 'vijayawada', title: 'Vijayawada' },
  'Rajahmundry':  { icon: '🏨', color: '#0d9488', slug: 'rajahmundry', title: 'Rajahmundry' },
  'L.B. Nagar':   { icon: '🏥', color: '#8B1A4A', slug: 'lb-nagar', title: 'LB Nagar' },
  'Kompally':     { icon: '❤️', color: '#dc2626', slug: 'kompally', title: 'Kompally' },
  'ECIL':         { icon: '🧠', color: '#7c3aed', slug: 'ecil', title: 'ECIL' },
}

// 20 Exact Department / Specialty Classifications as shown in reference images
const ORDERED_SPECIALTIES = [
  { id: 'all', name: 'All' },
  { id: 'ortho', name: 'Orthopedics' },
  { id: 'physio', name: 'Physiotherapy' },
  { id: 'neuro-physician', name: 'Neuro Physician' },
  { id: 'gen-laparoscopic', name: 'General & Laparoscopic Surgery' },
  { id: 'anesthesia', name: 'Anesthesia' },
  { id: 'cardio', name: 'Cardiology' },
  { id: 'nephro', name: 'Nephrology' },
  { id: 'plastic', name: 'Plastic Surgery' },
  { id: 'pulmo', name: 'Pulmonology' },
  { id: 'urology', name: 'Urology' },
  { id: 'radio', name: 'Radiology' },
  { id: 'physician', name: 'General Medicine' },
  { id: 'neuro-surgeon', name: 'Neuro Surgeon' },
  { id: 'onco', name: 'Oncology' },
  { id: 'gyn', name: 'Gynecology' },
  { id: 'ct-surgery', name: 'CT Surgery' },
  { id: 'ent', name: 'ENT' },
  { id: 'peds', name: 'Pediatrics' },
  { id: 'gastro', name: 'Gastroenterology' },
  { id: 'vascular', name: 'Vascular' },
]

function DoctorCard({ doctor, onView, onBook }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8EDF2] hover:shadow-xl hover:border-[#8B1A4A]/20 transition-all duration-300 flex flex-col items-center text-center group w-full max-w-sm sm:max-w-none mx-auto">
      {/* Image container: decreased to a refined, balanced portrait size */}
      <div className="relative mb-4 w-full flex justify-center">
        <div className="w-full max-w-[200px] sm:max-w-[220px] aspect-[4/4.7] rounded-xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 border border-[#E2E8F0] shadow-sm">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={e => { if (doctor.fallback) e.target.src = doctor.fallback }}
          />
        </div>
      </div>

      {/* Doctor Name */}
      <h3 className="font-bold text-[#1A202C] text-xs sm:text-sm leading-snug mb-1 font-sans">
        {doctor.name}
      </h3>

      {/* Specialty / Department: Grey color and bold */}
      <p className="text-[11px] sm:text-xs font-bold text-[#64748B] mb-4">
        {doctor.specialty}
      </p>

      {/* CTA Buttons */}
      <div className="w-full max-w-[240px] flex flex-col gap-1.5 mt-auto">
        <button
          onClick={() => onView(doctor)}
          className="w-full py-2 bg-white text-[#2D3A4A] border border-[#2D3A4A] text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#2D3A4A] hover:text-white transition-all duration-300"
        >
          Profile
        </button>
        <button
          onClick={() => onBook(doctor)}
          className="w-full py-2 bg-[#8B1A4A] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#6c1439] transition-all duration-300"
        >
          Book
        </button>
      </div>
    </div>
  )
}

function BranchSection({ branchName, doctors, onView, onBook, navigate }) {
  const meta = BRANCH_META[branchName] || { icon: '🏥', color: '#8B1A4A', slug: '' }
  // branches data uses 'LB Nagar' while doctors use 'L.B. Nagar' — normalize for lookup
  const normalizedTitle = branchName === 'L.B. Nagar' ? 'LB Nagar' : branchName
  const branchData = branches.find(b => b.title === normalizedTitle)
  const address = branchData?.address || ''

  // Deduplicate by slug
  const unique = doctors.filter((d, i, arr) => i === arr.findIndex(x => x.slug === d.slug))

  if (unique.length === 0) return null

  return (
    <section className="mb-14">
      {/* Branch header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2"
        style={{ borderColor: meta.color + '30' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0"
            style={{ background: meta.color + '15' }}>
            {meta.icon}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1A202C]">{branchName}</h2>
            {address && (
              <p className="text-[#94A3B8] text-xs flex items-center gap-1 mt-0.5 line-clamp-1">
                <MapPin size={10} /> {address}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: meta.color + '15', color: meta.color }}>
            {unique.length} Doctor{unique.length !== 1 ? 's' : ''}
          </span>
          {meta.slug && (
            <button
              onClick={() => navigate(`/branches/${meta.slug}`)}
              className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all hover:text-white"
              style={{ borderColor: meta.color, color: meta.color }}
              onMouseEnter={e => { e.currentTarget.style.background = meta.color }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              Visit Branch →
            </button>
          )}
        </div>
      </div>

      {/* Doctors grid: 1 in mobile, 3 in desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {unique.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} onView={onView} onBook={onBook} />
        ))}
      </div>
    </section>
  )
}

export function DoctorsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeBranch, setActiveBranch] = useState('all')
  const tabsRef = useRef(null)

  // All 10 requested branches: rtc x roads, lakdikapul, peerzadiguda, miyapur, madeenaguda, vijayawada, rajahmundry, lb nagar, kompally, ecil
  const branchList = ['all', ...BRANCH_ORDER]

  // Filter doctors by search, specialty, and branch
  const filtered = ALL_DOCTORS.filter(doc => {
    const matchSearch = search === '' ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.label.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())

    let matchFilter = true
    if (activeFilter !== 'all') {
      if (activeFilter === 'ortho') {
        matchFilter = doc.specialty === 'Orthopedics' || doc.specialtyId === 'ortho'
      } else if (activeFilter === 'physio') {
        matchFilter = doc.specialty === 'Physiotherapy' || doc.specialtyId === 'physio'
      } else if (activeFilter === 'neuro-physician') {
        matchFilter = doc.specialty === 'Neurology' || doc.specialty === 'Neuro Physician' || doc.specialtyId === 'neuro'
      } else if (activeFilter === 'gen-laparoscopic') {
        matchFilter = doc.specialty === 'General Surgery' || doc.specialtyId === 'general' || /laparoscopic/i.test(doc.label)
      } else if (activeFilter === 'anesthesia') {
        matchFilter = doc.specialty === 'Anesthesia' || doc.specialtyId === 'anesthesia'
      } else if (activeFilter === 'cardio') {
        matchFilter = doc.specialty === 'Cardiology' || doc.specialtyId === 'cardio'
      } else if (activeFilter === 'nephro') {
        matchFilter = doc.specialty === 'Nephrology' || doc.specialtyId === 'nephro'
      } else if (activeFilter === 'plastic') {
        matchFilter = doc.specialty === 'Plastic Surgery' || doc.specialtyId === 'plastic'
      } else if (activeFilter === 'pulmo') {
        matchFilter = doc.specialty === 'Pulmonology' || doc.specialtyId === 'pulmo'
      } else if (activeFilter === 'urology') {
        matchFilter = doc.specialty === 'Urology' || doc.specialtyId === 'urology'
      } else if (activeFilter === 'radio') {
        matchFilter = doc.specialty === 'Radiology' || doc.specialtyId === 'radio'
      } else if (activeFilter === 'physician') {
        matchFilter = doc.specialty === 'General Medicine' || doc.specialty === 'General Physician' || doc.specialtyId === 'physician'
      } else if (activeFilter === 'neuro-surgeon') {
        matchFilter = doc.specialty === 'Neurosurgery' || doc.specialty === 'Neuro Surgeon' || doc.specialtyId === 'neurosurg'
      } else if (activeFilter === 'onco') {
        matchFilter = doc.specialty === 'Oncology' || doc.specialtyId === 'onco'
      } else if (activeFilter === 'gyn') {
        matchFilter = doc.specialty === 'Gynecology' || doc.specialtyId === 'gyn'
      } else if (activeFilter === 'ct-surgery') {
        matchFilter = /CT Surgery|Cardiothoracic/i.test(doc.specialty) || /CT Surgery|Cardiothoracic/i.test(doc.label)
      } else if (activeFilter === 'ent') {
        matchFilter = doc.specialty === 'ENT' || doc.specialtyId === 'ent'
      } else if (activeFilter === 'peds') {
        matchFilter = doc.specialty === 'Pediatrics' || doc.specialtyId === 'peds'
      } else if (activeFilter === 'gastro') {
        matchFilter = /Gastro/i.test(doc.specialty) || /Gastro/i.test(doc.label)
      } else if (activeFilter === 'vascular') {
        matchFilter = /Vascular/i.test(doc.specialty) || /Vascular/i.test(doc.label)
      } else {
        matchFilter = doc.specialtyId === activeFilter
      }
    }

    let matchBranch = true
    if (activeBranch !== 'all') {
      matchBranch = doc.branch === activeBranch
    }

    return matchSearch && matchFilter && matchBranch
  })

  // Group by branch in defined order
  const grouped = BRANCH_ORDER.reduce((acc, b) => {
    const docs = filtered.filter(d => d.branch === b)
    if (docs.length > 0) acc[b] = docs
    return acc
  }, {})

  const totalUnique = filtered.filter((d, i, arr) => i === arr.findIndex(x => x.slug === d.slug)).length

  const scrollTabs = (dir) => {
    if (tabsRef.current) tabsRef.current.scrollLeft += dir * 160
  }

  return (
    <>
      <Helmet><title>Our Doctors | Srikara Hospitals</title></Helmet>
      <div className="min-h-screen bg-[#F0F4F8] font-body text-[#1A202C] antialiased">
        <StickyNavbar currentBranch={{ branchLogo: 'https://i.ibb.co/CK9bqmXK/sri-logo.jpg' }} />
        <BranchSideNav currentSlug={null} />

        <div className="xl:pl-16">
          {/* Redesigned Hero Section - Exact Match */}
          <section className="pt-24 pb-24 px-4 sm:px-8 bg-[#F0F4F8]">
            <div className="max-w-7xl mx-auto relative">
              <div className="bg-white overflow-hidden shadow-sm relative flex flex-col md:flex-row items-stretch min-h-[420px]">
                
                {/* Doctor Image covering the right side (masked by SVG on desktop) */}
                <div className="absolute right-0 top-0 w-full md:w-[65%] h-full z-0 hidden md:block bg-[#E8EDF2]">
                  <img 
                    src="/images/doctors-hero.png" 
                    alt="Expert Doctors" 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { 
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex'; 
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center text-[#94A3B8] text-sm font-semibold p-6 text-center pl-24">
                    Place your raw doctor image at: <br/> public/images/doctors-hero.png
                  </div>
                </div>

                {/* SVG Curves Overlay */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none hidden md:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* White fill to cover image on the left of the curve */}
                  <path d="M-10,0 L66,0 C43,35 43,65 62,100 L-10,100 Z" fill="#ffffff" />
                  
                  {/* Thick red curve */}
                  <path d="M66,0 C43,35 43,65 62,100" stroke="#8B1A4A" strokeWidth="12" fill="none" vectorEffect="non-scaling-stroke" />
                  
                  {/* Thin outer red line */}
                  <path d="M63,0 C40,35 40,65 59,100" stroke="#8B1A4A" strokeWidth="1.5" strokeOpacity="0.7" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>

                {/* Left Content (sits on top of the SVG white fill on desktop) */}
                <div className="w-full md:w-[55%] p-8 sm:p-12 md:pl-16 md:pr-4 z-20 flex flex-col justify-center bg-white md:bg-transparent relative">
                  
                  {/* Top Eyebrow */}
                  <div className="flex items-center gap-4 mb-6 ml-4">
                    <span className="text-[#8B1A4A] text-[11px] font-bold uppercase tracking-[0.2em]">Our Medical Team</span>
                    <div className="h-px w-24 bg-[#8B1A4A]/30"></div>
                  </div>
                  
                  {/* Main text area with vertical line */}
                  <div className="relative pl-5">
                    {/* Vertical Maroon Line */}
                    <div className="absolute left-0 top-1.5 bottom-2 w-[2.5px] bg-[#8B1A4A]"></div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-[56px] text-[#1A202C] font-light leading-[1.1] mb-5 tracking-tight">
                      Meet Our<br/>
                      <span className="font-bold text-[#8B1A4A]">Expert</span> <span className="font-bold text-[#1A202C]">Doctors</span>
                    </h1>
                    
                    <p className="text-[#64748B] text-[15px] leading-[1.7] max-w-[380px]">
                      Board-certified specialists across all branches,
                      dedicated to your care. Find the right expert for your
                      health journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Search Bar */}
              <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-full max-w-[700px] md:w-[65%] px-4 z-30">
                <div className="bg-white rounded-full shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-[#E8EDF2]/50 p-2 flex items-center relative h-[64px]">
                  <Search className="text-[#8B1A4A] ml-5 flex-shrink-0" size={22} />
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, specialty, or department..."
                    className="w-full pl-4 pr-4 py-3 bg-transparent text-[15px] text-[#1A202C] placeholder-[#94A3B8] focus:outline-none" />
                  <button className="bg-[#8B1A4A] hover:bg-[#6c1439] transition-colors text-white w-[52px] h-[52px] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm mr-0.5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Branch filter spacing adjustment */}
            <div className="pt-20 pb-4">
              <div className="flex flex-wrap justify-center gap-2 px-2">
                {branchList.map(b => (
                  <button key={b} onClick={() => { setActiveBranch(b); setActiveFilter('all') }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeBranch === b ? 'bg-[#0D1B2A] text-white shadow-sm' : 'bg-white border border-[#E2E8F0] text-[#4A4A4A] hover:border-[#8B1A4A]/30'
                    }`}>
                    {b === 'all' ? 'All' : b === 'L.B. Nagar' ? 'LB Nagar' : b}
                  </button>
                ))}
              </div>
            </div>


            {/* Specialty filter */}
            <div className="flex items-center gap-2 max-w-5xl mx-auto px-2">
              <button onClick={() => scrollTabs(-1)} aria-label="Scroll Left" className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] transition-all shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <div ref={tabsRef} className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1 py-1">
                {ORDERED_SPECIALTIES.map(s => (
                  <button key={s.id} onClick={() => setActiveFilter(s.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeFilter === s.id ? 'bg-[#2D3A4A] text-white shadow-md' : 'bg-white text-[#4A4A4A] border border-[#E2E8F0] hover:border-[#8B1A4A]/30'
                    }`}>
                    {s.name}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTabs(1)} aria-label="Scroll Right" className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </section>

          {/* Doctors Listing */}
          <section className="pb-20 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
              {filtered.length > 0 && (
                <p className="text-xs text-[#94A3B8] mb-8">
                  {totalUnique} specialist{totalUnique !== 1 ? 's' : ''} available
                </p>
              )}

              {/* When All is selected in both, show flat doctor grid starting from RTC X Roads without branch headers */}
              {activeBranch === 'all' && activeFilter === 'all' && !search ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filtered.map(doc => (
                    <DoctorCard key={`${doc.branch}-${doc.id}`} doctor={doc} onView={d => navigate(`/doctors/${d.slug}`)} onBook={d => openWhatsAppBooking({ doctor: d })} />
                  ))}
                </div>
              ) : Object.keys(grouped).length > 0 ? (
                Object.entries(grouped).map(([branchName, docs]) => (
                  <BranchSection
                    key={branchName}
                    branchName={branchName}
                    doctors={docs}
                    onView={d => navigate(`/doctors/${d.slug}`)}
                    onBook={d => openWhatsAppBooking({ doctor: d })}
                    navigate={navigate}
                  />
                ))
              ) : (
                <div className="text-center py-24">
                  <p className="text-[#94A3B8] text-lg">No doctors found for "{search}"</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}
