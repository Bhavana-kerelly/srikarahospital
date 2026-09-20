import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function BlogNavigation({ prev, next }) {
  if (!prev && !next) return null

  return (
    <nav className="border-t border-b border-slate-200 py-8 my-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {prev ? (
        <Link
          to={`/blogs/${prev.slug}`}
          className="group flex flex-col p-4 rounded-2xl border border-slate-200/80 hover:border-[#8B1A4A]/40 hover:bg-[#8B1A4A]/5 transition-all text-left"
        >
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#8B1A4A] transition-colors mb-1">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>Previous Article</span>
          </span>
          <span className="text-sm font-bold text-slate-800 group-hover:text-[#8B1A4A] line-clamp-2 transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          to={`/blogs/${next.slug}`}
          className="group flex flex-col p-4 rounded-2xl border border-slate-200/80 hover:border-[#8B1A4A]/40 hover:bg-[#8B1A4A]/5 transition-all text-right sm:ml-auto w-full"
        >
          <span className="flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#8B1A4A] transition-colors mb-1">
            <span>Next Article</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-sm font-bold text-slate-800 group-hover:text-[#8B1A4A] line-clamp-2 transition-colors">
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </nav>
  )
}
export default BlogNavigation
