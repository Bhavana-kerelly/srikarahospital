import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
  const otherBlogs = DOCTOR_BLOGS.filter(b => b.doctorSlug === slug && b.slug !== blogSlug).slice(0, 3)

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
            <div className="w-full rounded-3xl overflow-hidden mb-12 shadow-md bg-slate-100 flex justify-center">
               <img 
                 src={blog.image} 
                 alt={blog.title} 
                 className="w-full h-auto max-h-[600px] object-contain" 
                 onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=Article+Image' }}
               />
            </div>

            {/* Prose Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-[#1A202C] prose-a:text-[#8B1A4A] prose-p:text-[#475569] prose-li:text-[#475569]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
          
          {/* Related Blogs */}
          {otherBlogs.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#1A202C] mb-6 flex items-center gap-3">
                <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                More Articles by {doctor.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherBlogs.map(otherBlog => (
                  <Link 
                    key={otherBlog.id} 
                    to={`/doctors/${doctor.slug}/blog/${otherBlog.slug}`}
                    className="group border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col bg-white"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden relative bg-[#F8FAFC] flex items-center justify-center">
                      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm" style={{ color: accent }}>
                        {otherBlog.category}
                      </div>
                      <img 
                        src={otherBlog.image} 
                        alt={otherBlog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-[10px] font-semibold text-[#94A3B8] mb-2 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {otherBlog.date}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {otherBlog.readTime}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1A202C] mb-2 group-hover:text-[#8B1A4A] transition-colors line-clamp-2">
                        {otherBlog.title}
                      </h4>
                      <p className="text-[#475569] text-xs line-clamp-2 mb-3 flex-1">
                        {otherBlog.excerpt}
                      </p>
                      <div className="text-xs font-bold flex items-center gap-1.5 mt-auto" style={{ color: accent }}>
                        Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
