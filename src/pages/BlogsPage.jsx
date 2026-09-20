import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { lbNagar as branch } from '@/data/branches/lb-nagar'
import { BLOGS, BLOG_CATEGORIES } from '@/data/blogs'
import { BlogHero } from '@/components/blogs/BlogHero'
import { CategoryFilter } from '@/components/blogs/CategoryFilter'
import { BlogGrid } from '@/components/blogs/BlogGrid'
import { BlogCta } from '@/components/blogs/BlogCta'

export function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Calculate article counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: BLOGS.length }
    BLOGS.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1
    })
    return counts
  }, [])

  // Filter blogs based on category + search
  const filteredBlogs = useMemo(() => {
    let result = BLOGS

    if (activeCategory !== 'All') {
      result = result.filter(b => b.category.toLowerCase() === activeCategory.toLowerCase())
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim()
      result = result.filter(b => {
        const inTitle = b.title.toLowerCase().includes(q)
        const inExcerpt = b.excerpt.toLowerCase().includes(q)
        const inCategory = b.category.toLowerCase().includes(q)
        const inTags = b.tags && b.tags.some(t => t.toLowerCase().includes(q))
        const inAuthor = b.author && b.author.toLowerCase().includes(q)
        const inContent = b.sections && b.sections.some(s => 
          s.heading.toLowerCase().includes(q) || 
          s.paragraphs.some(p => p.toLowerCase().includes(q))
        )
        return inTitle || inExcerpt || inCategory || inTags || inAuthor || inContent
      })
    }

    return result
  }, [searchTerm, activeCategory])

  const handleResetFilters = () => {
    setSearchTerm('')
    setActiveCategory('All')
  }

  return (
    <>
      <Helmet>
        <title>Healthcare Insights & Medical Articles | Srikara Hospitals</title>
        <meta
          name="description"
          content="Explore clinical insights, robotic surgery breakthroughs, cardiology guidance, orthopaedic care, and health advice from Srikara Hospitals' specialists."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC] font-body text-slate-900 flex flex-col antialiased">
        <StickyNavbar currentBranch={branch} />

        <main className="flex-1">
          {/* ── 1. EDITORIAL HERO SECTION ── */}
          <BlogHero
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalCount={BLOGS.length}
          />

          {/* ── 2. CATEGORY NAVIGATION + UNIFORM BLOG LISTING ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            
            {/* Section Header with Active Filter Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-extrabold text-slate-900 tracking-tight">
                  {activeCategory === 'All' ? 'All Clinical Publications' : `${activeCategory} Articles`}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Showing {filteredBlogs.length} of {BLOGS.length} articles
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>

              {/* Active Filter Clear Button */}
              {(searchTerm || activeCategory !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="self-start md:self-auto text-xs font-bold text-[#8B1A4A] hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Category Navigation Pills */}
            <div className="mb-10">
              <CategoryFilter
                categories={BLOG_CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                counts={categoryCounts}
              />
            </div>

            {/* ── 3. UNIFORM IDENTICAL-SIZE BLOG GRID ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchTerm}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <BlogGrid
                  blogs={filteredBlogs}
                  onReset={handleResetFilters}
                />
              </motion.div>
            </AnimatePresence>

            {/* ── 4. CONSULTATION CALL TO ACTION ── */}
            <BlogCta />

          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
export default BlogsPage
