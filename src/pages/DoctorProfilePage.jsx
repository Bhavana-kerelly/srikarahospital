import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Star, Clock, Award, Calendar, ArrowLeft, CheckCircle, Phone, MessageCircle } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ALL_DOCTORS, ACCENT_MAP } from '@/data/doctors'
import { DOCTOR_BLOGS } from '@/data/doctor-blogs'
import { openWhatsAppBooking } from '@/lib/whatsapp'
import { Link } from 'react-router-dom'

export function DoctorProfilePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const doctor = ALL_DOCTORS.find(d => d.slug === slug)
  
  const doctorBlogs = DOCTOR_BLOGS.filter(blog => blog.doctorSlug === slug)

  React.useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-[#94A3B8] text-xl mb-4">Doctor not found</p>
          <button onClick={() => navigate('/doctors')} className="text-[#8B1A4A] font-bold hover:underline">← Back to Doctors</button>
        </div>
      </div>
    )
  }

  const { accent, accentLight } = ACCENT_MAP[doctor.specialtyId] || { accent: '#8B1A4A', accentLight: '#fdf2f8' }

  return (
    <>
      <Helmet><title>{doctor.name} | Srikara Hospitals</title></Helmet>
      <div className="min-h-screen bg-[#F8FAFC] font-body text-[#1A202C] antialiased">
        <StickyNavbar />

        {/* Hero banner */}
        <div className="relative h-52 overflow-hidden" style={{ background: `linear-gradient(135deg, #0D1B2A 0%, ${accent}cc 100%)` }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
          <div className="max-w-5xl mx-auto px-8 pt-20 relative z-10">
            <button onClick={() => navigate('/doctors')} className="flex items-center gap-2 text-white/60 text-sm font-semibold hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back to Doctors
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 -mt-16 pb-24 relative z-10">

          {/* Profile card */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-[#E2E8F0] overflow-hidden mb-8">
            <div className="p-8 flex flex-col sm:flex-row gap-8 items-start">
              <div className="relative flex-shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                  style={{ boxShadow: `0 8px 32px ${accent}40` }}>
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-[center_15%]"
                    onError={e => { if (doctor.fallback) e.target.src = doctor.fallback }} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: accentLight, color: accent }}>{doctor.specialty}</span>
                  <span className="text-[#94A3B8] text-xs flex items-center gap-1"><Clock size={11} /> {doctor.exp}</span>
                  <span className="text-xs font-medium" style={{ color: accent }}>📍 {doctor.branch}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] leading-tight mb-1">{doctor.name}</h1>
                <p className="font-semibold mb-1" style={{ color: accent }}>{doctor.label}</p>
                <p className="text-[#94A3B8] text-sm mb-4">{doctor.sub}</p>
                {doctor.tagline && (
                  <p className="text-[#475569] text-sm italic mb-6 border-l-4 pl-4" style={{ borderColor: accent }}>
                    "{doctor.tagline}"
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => openWhatsAppBooking({ doctor })}
                    className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg hover:opacity-90 transition-all cursor-pointer"
                    style={{ background: accent }}>
                    <Calendar size={15} /> Book Appointment
                  </button>
                  <a href="tel:+919247958308"
                    className="flex items-center gap-2 bg-[#F1F5F9] text-[#1A202C] px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#E2E8F0] transition-all border border-[#E2E8F0]">
                    <Phone size={15} className="text-[#8B1A4A]" /> Call 92479 58308
                  </a>
                  <a href={`https://wa.me/919247958308?text=Hello%20${encodeURIComponent(doctor.name)}%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#20bd5a] transition-all shadow-sm">
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">

              {doctor.about && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                    <h2 className="font-bold text-[#1A202C] text-lg">About</h2>
                  </div>
                  <p className="text-[#475569] text-sm leading-relaxed">{doctor.about}</p>
                </motion.div>
              )}

              {doctor.expertise?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                    <h2 className="font-bold text-[#1A202C] text-lg">Areas of Expertise</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doctor.expertise.map(e => (
                      <span key={e} className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border"
                        style={{ background: accentLight, color: accent, borderColor: accent + '30' }}>
                        <CheckCircle size={11} /> {e}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                  <h2 className="font-bold text-[#1A202C] text-lg">Quick Info</h2>
                </div>
                <div className="space-y-5">
                  {[
                    { icon: Clock, label: 'Availability', value: doctor.availability },
                    { icon: Award, label: 'Experience', value: doctor.exp },
                  ].map(({ icon: Icon, label, value }) => value && (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: accentLight }}>
                        <Icon size={15} style={{ color: accent }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-[#1A202C]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl p-7 text-center overflow-hidden relative"
                style={{ background: `linear-gradient(135deg, #0D1B2A, ${accent})` }}>
                <Calendar size={32} className="text-white/80 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Book an Appointment</h3>
                <p className="text-white/50 text-xs mb-6">{doctor.branch} Branch</p>
                <button onClick={() => openWhatsAppBooking({ doctor })}
                  className="w-full bg-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all mb-3 cursor-pointer"
                  style={{ color: accent }}>
                  Book Now
                </button>
                <div className="flex gap-2">
                  <a href="tel:+919247958308"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
                    <Phone size={13} /> Call
                  </a>
                  <a href="https://wa.me/919247958308" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#20bd5a] transition-all">
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── BLOG SECTION ── */}
        <div className="max-w-5xl mx-auto px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between p-7 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                <h2 className="font-bold text-[#1A202C] text-lg">Articles &amp; Insights by {doctor.name}</h2>
              </div>
              {doctorBlogs.length === 0 && (
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: accentLight, color: accent }}>
                  Coming Soon
                </span>
              )}
            </div>
            
            {doctorBlogs.length > 0 ? (
              /* Blogs Grid */
              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctorBlogs.map(blog => (
                  <Link 
                    key={blog.id} 
                    to={`/doctors/${doctor.slug}/blog/${blog.slug}`}
                    className="group border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden relative bg-[#F8FAFC] flex items-center justify-center">
                      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: accent }}>
                        {blog.category}
                      </div>
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs font-semibold text-[#94A3B8] mb-3 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                      </div>
                      <h3 className="font-bold text-lg text-[#1A202C] mb-2 group-hover:text-[#8B1A4A] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-[#475569] text-sm line-clamp-2 mb-4 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="text-sm font-bold flex items-center gap-2 mt-auto" style={{ color: accent }}>
                        Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: accentLight }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                    <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A202C] text-xl mb-2">No Articles Yet</h3>
                <p className="text-[#94A3B8] text-sm max-w-md leading-relaxed">
                  {doctor.name} will soon be sharing medical insights, health tips, and clinical updates here.
                  Check back soon or subscribe for notifications.
                </p>
                <div className="flex items-center gap-3 mt-8">
                  <div className="h-px w-12" style={{ background: accent + '30' }} />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>Stay Tuned</span>
                  <div className="h-px w-12" style={{ background: accent + '30' }} />
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
