import { BlogCard } from './BlogCard'
import { SearchX, RotateCcw } from 'lucide-react'

export function BlogGrid({ blogs = [], onReset }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-20 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
          <SearchX size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Found</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
          We couldn't find any health articles matching your current search or category filters. Try adjusting your query or resetting filters.
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8B1A4A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#72153c] transition-colors shadow-md cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
export default BlogGrid
