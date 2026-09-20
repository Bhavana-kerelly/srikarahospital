import { BlogCard } from './BlogCard'
import { Sparkles } from 'lucide-react'

export function RelatedBlogs({ relatedBlogs = [], category = '' }) {
  if (!relatedBlogs || relatedBlogs.length === 0) return null

  return (
    <section className="my-16 pt-12 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1A4A] mb-2">
            <Sparkles size={13} />
            <span>Recommended Reading</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-headline font-extrabold text-slate-900 tracking-tight">
            {category ? `More in ${category}` : 'Related Clinical Insights'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Curated clinical perspectives from our specialists
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {relatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} variant="standard" />
        ))}
      </div>
    </section>
  )
}
export default RelatedBlogs
