import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Clock, Calendar, ArrowRight } from 'lucide-react'

export function BlogCard({ blog }) {
  const navigate = useNavigate()

  if (!blog) return null

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.12)] hover:border-[#8B1A4A]/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* ── Image Container: Perfect 16:9 Aspect Ratio (No Cropping) ── */}
      <div className="relative overflow-hidden bg-slate-100 w-full aspect-video shrink-0">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge overlay */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#8B1A4A] text-[11px] font-bold uppercase tracking-wider shadow-sm">
          {blog.category}
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-slate-400 text-xs font-medium mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {blog.readingTime}
            </span>
          </div>

          {/* Title - uniform 2-line clamp */}
          <h3 className="font-headline font-bold text-slate-900 text-base sm:text-lg leading-snug tracking-tight mb-2.5 group-hover:text-[#8B1A4A] transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt - uniform 3-line clamp */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-normal">
            {blog.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[65%]">
            {blog.author}
          </span>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1A4A] group-hover:translate-x-1 transition-transform duration-300">
            <span>Read</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
export default BlogCard
