import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { DOCTOR_BLOGS } from '@/data/doctor-blogs'
import { ALL_DOCTORS, ACCENT_MAP } from '@/data/doctors'

export function DoctorBlogDetailPage() {
  const { slug, blogSlug } = useParams()
  const navigate = useNavigate()
  
  const doctor = ALL_DOCTORS.find(d => d.slug === slug)
  const blog = DOCTOR_BLOGS.find(b => b.doctorSlug === slug && b.slug === blogSlug)

  React.useEffect(() => { window.scrollTo(0, 0) }, [slug, blogSlug])

  if (!doctor || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <p className="text-[#94A3B8] text-xl mb-4">Article not found</p>
        <button onClick={() => navigate(doctor ? `/doctors/${slug}` : '/doctors')} className="text-[#8B1A4A] font-bold hover:underline">
          ← Back to {doctor ? doctor.name : 'Doctors'}
        </button>
      </div>
    )
  }

  const { accent, accentLight } = ACCENT_MAP[doctor.specialtyId] || { accent: '#8B1A4A', accentLight: '#fdf2f8' }

  return (
    <>
      <Helmet><title>{blog.title} | {doctor.name} | Srikara Hospitals</title></Helmet>
      <div className="min-h-screen bg-[#F8FAFC] font-body text-[#1A202C] antialiased">
        <StickyNavbar />

        {/* Header Breadcrumbs */}
        <div className="bg-white border-b border-[#E2E8F0] py-4">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 flex items-center text-sm">
            <button onClick={() => navigate('/doctors')} className="text-[#94A3B8] hover:text-[#1A202C] transition-colors">Doctors</button>
            <ChevronRight size={14} className="mx-2 text-[#CBD5E1]" />
            <button onClick={() => navigate(`/doctors/${slug}`)} className="text-[#94A3B8] hover:text-[#1A202C] transition-colors truncate max-w-[150px] sm:max-w-none">{doctor.name}</button>
            <ChevronRight size={14} className="mx-2 text-[#CBD5E1]" />
            <span className="font-semibold truncate max-w-[150px] sm:max-w-none" style={{ color: accent }}>{blog.title}</span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                  style={{ background: accentLight, color: accent }}>
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A202C] leading-tight mb-6">
              {blog.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center justify-between border-y border-[#E2E8F0] py-6 mb-8">
              <div className="flex items-center gap-4">
                <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-200" />
                <div>
                  <div className="font-bold text-[#1A202C]">{doctor.name}</div>
                  <div className="text-xs text-[#64748B]">{doctor.label}</div>
                </div>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider text-right">
                <div className="hidden sm:block"><span className="flex items-center justify-end gap-1.5"><Calendar size={14} /> {blog.date}</span></div>
                <div><span className="flex items-center justify-end gap-1.5"><Clock size={14} /> {blog.readTime}</span></div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-md">
               <img 
                 src={blog.image} 
                 alt={blog.title} 
                 className="w-full h-full object-cover" 
                 onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=Article+Image' }}
               />
            </div>

            {/* Prose Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-[#1A202C] prose-a:text-[#8B1A4A] prose-p:text-[#475569] prose-li:text-[#475569]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
          
          <div className="border-t border-[#E2E8F0] pt-8 flex justify-between items-center">
             <button onClick={() => navigate(`/doctors/${slug}`)} className="flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#1A202C] transition-colors">
               <ArrowLeft size={16} /> Back to Doctor Profile
             </button>
             <button onClick={() => navigate('/book')} className="px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all shadow-md" style={{ background: accent }}>
               Book Appointment
             </button>
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
