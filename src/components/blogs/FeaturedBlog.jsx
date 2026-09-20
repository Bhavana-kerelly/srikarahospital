import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Sparkles, UserCheck } from 'lucide-react'

export function FeaturedBlog({ blog }) {
  const navigate = useNavigate()

  if (!blog) return null

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 z-20 mb-16">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => navigate(`/blogs/${blog.slug}`)}
        className="group relative bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(10,22,40,0.15)] border border-slate-200/80 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 transition-all duration-500 hover:shadow-[0_25px_60px_-12px_rgba(139,26,74,0.2)] hover:border-[#8B1A4A]/40"
      >
        {/* ── LEFT: Large Editorial Cover Image ── */}
        <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-full min-h-[380px] overflow-hidden bg-slate-900">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          {/* Cover Story Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-1.5 rounded-full bg-[#0a1628]/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-lg">
            <Sparkles size={13} className="text-[#cca830]" />
            <span>Featured Cover Story</span>
          </div>
        </div>

        {/* ── RIGHT: Editorial Article Card Content ── */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Category and Read time */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[#8B1A4A]/10 text-[#8B1A4A] text-xs font-bold uppercase tracking-wider">
                {blog.category}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                <Clock size={13} />
                {blog.readingTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-headline font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-4 group-hover:text-[#8B1A4A] transition-colors duration-300">
              {blog.title}
            </h2>

            {/* Excerpt */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-normal">
              {blog.excerpt}
            </p>
          </div>

          {/* Author info & CTA */}
          <div className="border-t border-slate-100 pt-6 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B1A4A]/10 text-[#8B1A4A] flex items-center justify-center font-bold text-sm">
                <UserCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{blog.author}</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Calendar size={11} />
                  {blog.date}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1A4A] group-hover:translate-x-1.5 transition-transform duration-300">
              <span>Read Article</span>
              <ArrowRight size={15} />
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  )
}
export default FeaturedBlog
