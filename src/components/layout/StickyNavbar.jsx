import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, MapPin, Phone, Menu, X, Calendar, Search } from 'lucide-react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { branches } from '@/data/branches'
import { openWhatsAppBooking } from '@/lib/whatsapp'
import { assetUrl } from '@/lib/assetUrl'

const ACCENT = '#8B1A4A'
const LOGO_SRC = assetUrl('Srikara Hospitals, LB Nagar.png')

export function StickyNavbar({ currentBranch }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hospitalsOpen, setHospitalsOpen] = useState(false)
  const [specOpen, setSpecOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const hospitalsRef = useRef(null)
  const specRef = useRef(null)
  const { scrollY } = useScroll()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsub = scrollY.onChange(y => {
      setScrolled(y > 20)
    })
    return () => unsub()
  }, [scrollY])

  useEffect(() => {
    const fn = e => {
      if (hospitalsRef.current && !hospitalsRef.current.contains(e.target)) setHospitalsOpen(false)
      if (specRef.current && !specRef.current.contains(e.target)) setSpecOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  useEffect(() => {
    setHospitalsOpen(false)
    setSpecOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  // Force white navbar on non-branch pages (no dark hero background)
  const hasHero = location.pathname.startsWith('/branches/')
  const isWhite = scrolled || mobileOpen || !hasHero
  const isActive = path => location.pathname.startsWith(path)
  const phone = '92479 58308'
  // Always use the local Srikara Hospitals logo (fixed to avoid broken ImgBB links)
  const logoSrc = LOGO_SRC

  return (
    <>
      {/* ══════════════ NAV BAR ══════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-[200] font-sans antialiased"
        style={{
          backgroundColor: isWhite
            ? 'rgba(255,255,255,0.97)'
            : 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: isWhite
            ? '0 2px 30px rgba(0,0,0,0.10)'
            : '0 1px 0 rgba(255,255,255,0.12)',
          borderBottom: isWhite
            ? '1px solid rgba(0,0,0,0.07)'
            : '1px solid rgba(255,255,255,0.18)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* ── Single centered row (desktop) ── */}
        <div
          className="hidden lg:flex items-center justify-center gap-0"
          style={{ height: scrolled ? '64px' : '76px', transition: 'height 0.35s ease' }}
        >


          {/* Home */}
          <NavLink to="/" active={location.pathname === '/' || location.pathname === '/landing'} isWhite={isWhite}>
            Home
          </NavLink>



          {/* Specialties dropdown — hover triggered */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setSpecOpen(true)}
            onMouseLeave={() => setSpecOpen(false)}
          >
            <DropButton
              label="Specialties"
              isOpen={specOpen}
              active={isActive('/specialties')}
              isWhite={isWhite}
              onClick={() => navigate('/specialties')}
            />
            <AnimatePresence>
              {specOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-[calc(100%+0px)] left-1/2 -translate-x-1/2 w-[680px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden z-50"
                >
                  {/* Gradient header — matches Find Hospitals style */}
                  <div className="px-6 py-4 flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg, #8B1A4A, #5E0F30)' }}>
                    <div>
                      <p className="text-white font-bold text-sm uppercase tracking-widest">Centres of Excellence</p>
                      <p className="text-white/55 text-[10px] mt-0.5">40+ Departments · 500+ Specialists · NABH Accredited</p>
                    </div>
                    <Link to="/specialties" onClick={() => setSpecOpen(false)}
                      className="text-[10px] font-bold text-white/80 hover:text-white uppercase tracking-wider border border-white/30 px-3 py-1.5 rounded-full hover:border-white transition-colors">
                      View All →
                    </Link>
                  </div>

                  <div className="p-4 grid grid-cols-3 gap-1">
                    {[
                      { to: '/specialties/orthopaedics', label: 'Orthopaedics & Robotic', icon: '🦴', sub: 'Joint replacement · Spine', f: 'SURGICAL' },
                      { to: '/specialties/cardiology', label: 'Cardiology', icon: '❤️', sub: 'Cath lab · Cardiac surgery', f: 'MEDICAL' },
                      { to: '/specialties/neurology', label: 'Neurology & Neurosurgery', icon: '🧠', sub: 'Brain · Spine · Stroke', f: 'MEDICAL' },
                      { to: '/specialties/oncology', label: 'Oncology', icon: '🎗️', sub: 'Medical · Surgical · Radiation', f: 'MEDICAL' },
                      { to: '/specialties/nephrology', label: 'Nephrology & Dialysis', icon: '💧', sub: 'Kidney transplant · CKD', f: 'MEDICAL' },
                      { to: '/specialties/gynaecology', label: 'Obstetrics & Gynaecology', icon: '🤰', sub: 'High-risk OB · Laparoscopy', f: 'WOMEN_CHILD' },
                      { to: '/specialties/fertility', label: 'Fertility & IVF', icon: '✨', sub: 'IVF · IUI · Genetic screening', f: 'WOMEN_CHILD' },
                      { to: '/specialties/paediatrics', label: 'Paediatrics & Neonatology', icon: '👶', sub: 'Level III NICU · Child care', f: 'WOMEN_CHILD' },
                      { to: '/specialties/emergency', label: 'Emergency & Critical Care', icon: '⚡', sub: '24/7 Trauma · ICU', f: 'EMERGENCY' },
                      { to: '/specialties/pulmonology', label: 'Pulmonology', icon: '🫁', sub: 'Bronchoscopy · COPD · ILD', f: 'MEDICAL' },
                      { to: '/specialties/gastroenterology', label: 'Gastroenterology', icon: '🔬', sub: 'Endoscopy · Hepatology', f: 'MEDICAL' },
                      { to: '/specialties/urology', label: 'Urology & Andrology', icon: '🏥', sub: 'Robotic · Kidney transplant', f: 'SURGICAL' },
                      { to: '/specialties/radiology', label: 'Radiology & Diagnostics', icon: '📡', sub: '3T MRI · PET-CT · NABL', f: 'DIAGNOSTICS' },
                      { to: '/specialties/physiotherapy', label: 'Physiotherapy & Rehab', icon: '🏃', sub: 'Neuro rehab · Sports injury', f: 'DIAGNOSTICS' },
                    ].map(item => (
                      <Link key={item.label} to={item.to} onClick={() => setSpecOpen(false)}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#8B1A4A]/5 transition-all">
                        <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div className="min-w-0">
                          <p className="text-[12px] font-bold text-[#1A202C] group-hover:text-[#8B1A4A] transition-colors leading-tight">{item.label}</p>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5 leading-tight">{item.sub}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Footer strip */}
                  <div className="px-6 py-3 bg-[#F8FAFC] border-t border-black/5 flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">🚨 Emergency: <a href="tel:+919247958308" className="font-bold text-[#8B1A4A] hover:underline">+91 92479 58308</a></p>
                    <button onClick={() => { openWhatsAppBooking(); setSpecOpen(false) }}
                      className="text-[10px] font-bold text-white bg-[#8B1A4A] px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
                      Book Appointment
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Find Hospitals dropdown — hover triggered */}
          <div
            ref={hospitalsRef}
            className="relative h-full flex items-center"
            onMouseEnter={() => setHospitalsOpen(true)}
            onMouseLeave={() => setHospitalsOpen(false)}
          >
            <DropButton
              label="Find Hospitals"
              isOpen={hospitalsOpen}
              active={isActive('/branches')}
              isWhite={isWhite}
              onClick={() => navigate('/branches')}
            />
            <AnimatePresence>
              {hospitalsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[460px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden z-50"
                >
                  <div className="px-5 py-4 flex items-center justify-between"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #5E0F30)` }}>
                    <div>
                      <p className="text-white font-bold text-sm uppercase tracking-widest">Our Hospitals</p>
                      <p className="text-white/55 text-[10px] mt-0.5">{branches.length} Locations · AP & Telangana</p>
                    </div>
                    <Link to="/branches" onClick={() => setHospitalsOpen(false)}
                      className="text-[10px] font-bold text-white/80 hover:text-white uppercase tracking-wider border border-white/30 px-3 py-1.5 rounded-full hover:border-white transition-colors">
                      View All →
                    </Link>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-1 max-h-[320px] overflow-y-auto">
                    {branches.map(b => (
                      <Link key={b.slug} to={`/branches/${b.slug}`} onClick={() => setHospitalsOpen(false)}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#8B1A4A]/5 transition-all">
                        <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#8B1A4A]/10 flex items-center justify-center mt-0.5 group-hover:bg-[#8B1A4A]/20 transition-colors">
                          <MapPin className="w-4 h-4 text-[#8B1A4A]" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-[#8B1A4A] truncate">{b.title}</p>
                          <p className="text-[11px] text-gray-500 truncate">{b.subtitle}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-5 py-3 bg-gray-50 border-t border-black/5 flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">🚨 <a href="tel:+919247958308" className="font-bold text-[#8B1A4A] hover:underline">+91 92479 58308</a></p>
                    <button onClick={() => { openWhatsAppBooking({ branch: currentBranch }); setHospitalsOpen(false) }}
                      className="text-[10px] font-bold text-white bg-[#8B1A4A] px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── CENTER LOGO ── */}
          <Link to="/" className="mx-6 flex-shrink-0">
            <img
              src={logoSrc}
              alt="Srikara Hospitals"
              style={{
                height: scrolled ? '44px' : '56px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.35s ease',
                // Logo has white bg — always show as-is since navbar itself is frosted/white
                filter: 'none',
                borderRadius: '6px',
              }}
            />
          </Link>

          {/* 6. Doctors */}
          <NavLink to="/doctors" active={isActive('/doctors')} isWhite={isWhite}>
            Doctors
          </NavLink>

          {/* 7. Discover Srikara */}
          <NavLink to="/about" active={isActive('/about')} isWhite={isWhite}>
            Discover Srikara
          </NavLink>

          {/* 8. Blogs */}
          <NavLink to="/blogs" active={isActive('/blogs')} isWhite={isWhite}>
            Blogs
          </NavLink>


          {/* 7. Search Toggle - removed */}

          {/* Book Appointment button */}
          <button
            onClick={() => openWhatsAppBooking({ branch: currentBranch })}
            className="flex items-center gap-2 rounded-full px-5 py-2 font-bold text-[13px] ml-1 transition-all hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: '#2D3A4A', color: 'white', flexShrink: 0 }}
          >
            <Calendar size={13} />
            Book Appointment
          </button>

        </div>

        {/* ── Search Overlay ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 z-[210] flex items-center px-10 gap-10"
              style={{
                backgroundColor: isWhite ? 'white' : 'rgba(10, 22, 40, 0.98)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className="flex-1 max-w-4xl mx-auto flex flex-col gap-3">
                <p
                  className="font-bold text-lg"
                  style={{ color: isWhite ? '#1A202C' : 'white' }}
                >
                  What are you looking for?
                </p>
                <div className="relative flex items-center h-14 bg-white rounded-xl shadow-lg border border-black/5 overflow-hidden">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Enter a keyword"
                    className="flex-1 h-full px-6 text-[#1A202C] outline-none text-lg font-medium placeholder:text-gray-400"
                    onKeyDown={(e) => e.key === 'Enter' && setSearchOpen(false)}
                  />
                  <button
                    className="h-full px-8 flex items-center justify-center transition-all bg-[#0a3560] text-white hover:bg-[#002B5C]"
                    onClick={() => setSearchOpen(false)}
                  >
                    <Search size={22} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/10 transition-all"
                style={{ color: isWhite ? '#1A202C' : 'white' }}
              >
                <X size={28} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile row ── */}
        <div
          className="lg:hidden flex items-center justify-between px-5"
          style={{ height: '64px' }}
        >
          <Link to="/">
            <img src={logoSrc} alt="Srikara Hospitals"
              style={{ height: '40px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }} />
          </Link>
          <button
            className="p-2.5 rounded-xl transition-all"
            style={{ backgroundColor: 'rgba(139,26,74,0.1)' }}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={21} style={{ color: ACCENT }} /> : <Menu size={21} style={{ color: ACCENT }} />}
          </button>
        </div>
      </header>

      {/* ══════════════ MOBILE DRAWER ══════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[190] pt-[64px] pb-8 px-5 bg-white shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 mt-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Find Hospitals', to: '/branches' },
                { label: 'Doctors', to: '/doctors' },
                { label: 'Specialties', to: '/specialties' },
                { label: 'Discover Srikara', to: '/about' },
                { label: 'Blogs', to: '/blogs' },
              ].map(lnk => {
                const active = lnk.to === '/' ? (location.pathname === '/' || location.pathname === '/landing') : isActive(lnk.to);
                return (
                  <Link key={lnk.label} to={lnk.to} onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 px-5 rounded-2xl font-bold text-base uppercase tracking-wide transition-all"
                    style={{
                      color: active ? 'white' : '#222',
                      backgroundColor: active ? ACCENT : 'transparent',
                    }}>
                    {lnk.label}
                    <ChevronDown size={17} className="-rotate-90 opacity-40" />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-5 flex gap-3">
              <a href="tel:+919247958308"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-[14px]"
                style={{ backgroundColor: ACCENT }}>
                <Phone size={16} fill="white" /> +91 {phone}
              </a>
              <button onClick={() => { openWhatsAppBooking({ branch: currentBranch }); setMobileOpen(false) }}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-[14px] cursor-pointer"
                style={{ backgroundColor: '#2D3A4A' }}>
                <Calendar size={16} /> Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Regular nav link ──────────────────────────── */
function NavLink({ to, active, isWhite, children }) {
  const textCol = isWhite ? '#222' : '#fff'
  return (
    <Link to={to}
      className="group relative h-full flex items-center px-4 text-[13.5px] font-semibold uppercase tracking-wide transition-colors duration-200"
      style={{ color: active ? ACCENT : textCol }}
    >
      {children}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300"
        style={{ backgroundColor: ACCENT, width: active ? '65%' : '0%' }} />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full w-0 group-hover:w-[65%] transition-all duration-300"
        style={{ backgroundColor: ACCENT, opacity: 0.55 }} />
    </Link>
  )
}

/* ── Dropdown trigger button ───────────────────── */
function DropButton({ label, isOpen, active, isWhite, onClick }) {
  const textCol = isWhite ? '#222' : '#fff'
  return (
    <button onClick={onClick}
      className="group relative h-full flex items-center gap-1 px-4 text-[13.5px] font-semibold uppercase tracking-wide outline-none transition-colors duration-200"
      style={{ color: isOpen || active ? ACCENT : textCol }}
    >
      {label}
      <ChevronDown size={13}
        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        style={{ color: isWhite ? '#888' : 'rgba(255,255,255,0.6)' }} />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300"
        style={{ backgroundColor: ACCENT, width: (isOpen || active) ? '65%' : '0%' }} />
    </button>
  )
}
