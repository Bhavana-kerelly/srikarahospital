import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Clock, Calendar, ArrowLeft, UserCheck, ShieldCheck, CheckCircle2, Bookmark } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { lbNagar as branch } from '@/data/branches/lb-nagar'
import { getBlogBySlug, getRelatedBlogs, getAdjacentBlogs } from '@/data/blogs'
import { ReadingProgress } from '@/components/blogs/ReadingProgress'
import { TableOfContents } from '@/components/blogs/TableOfContents'
import { ShareBar } from '@/components/blogs/ShareBar'
import { BlogNavigation } from '@/components/blogs/BlogNavigation'
import { RelatedBlogs } from '@/components/blogs/RelatedBlogs'
import { BlogCta } from '@/components/blogs/BlogCta'

export function BlogDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const blog = getBlogBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-body text-slate-900 flex flex-col">
        <StickyNavbar currentBranch={branch} />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Article Not Found</h1>
          <p className="text-slate-500 mb-8 max-w-md">
            The healthcare article you are looking for might have moved or is no longer available.
          </p>
          <Link
            to="/blogs"
            className="px-6 py-3 rounded-full bg-[#8B1A4A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#72153c] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>Return to All Blogs</span>
          </Link>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  const related = getRelatedBlogs(blog, 3)
  const { prev, next } = getAdjacentBlogs(blog)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Structured Data (Schema.org Article)
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    datePublished: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author,
      jobTitle: blog.authorRole
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Srikara Hospitals',
      logo: {
        '@type': 'ImageObject',
        url: 'https://srikarahospitals.com/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    }
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Srikara Hospitals</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={blog.image} />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
      </Helmet>

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <div className="min-h-screen bg-[#F8FAFC] font-body text-slate-900 flex flex-col antialiased">
        <StickyNavbar currentBranch={branch} />

        <main className="flex-1 pt-24 sm:pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* ── BACK BUTTON & BREADCRUMB ── */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/blogs')}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#8B1A4A] transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Articles</span>
              </button>
            </div>

            {/* ── EDITORIAL ARTICLE HEADER ── */}
            <header className="max-w-4xl mb-10">
              {/* Category & Verified Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3.5 py-1 rounded-full bg-[#8B1A4A]/10 text-[#8B1A4A] text-xs font-black uppercase tracking-wider">
                  {blog.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/50">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Medically Reviewed</span>
                </span>
              </div>

              {/* H1 Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
                {blog.title}
              </h1>

              {/* Excerpt / Lead paragraph */}
              <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed mb-8">
                {blog.excerpt}
              </p>

              {/* Author & Publication Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-200/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#8B1A4A]/10 text-[#8B1A4A] flex items-center justify-center font-bold text-base shadow-sm">
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{blog.author}</p>
                    <p className="text-xs text-slate-500 font-medium">{blog.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#8B1A4A]" />
                    <span>Published on {blog.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#8B1A4A]" />
                    <span>{blog.readingTime}</span>
                  </span>
                </div>
              </div>
            </header>

            {/* ── PROMINENT FEATURED HERO IMAGE (16:9 Perfect Fit) ── */}
            <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 w-full aspect-video">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>

            {/* ── ARTICLE BODY + TABLE OF CONTENTS SIDEBAR ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* LEFT SIDEBAR: Table of Contents */}
              <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
                <TableOfContents sections={blog.sections} />
              </div>

              {/* CENTER: Full Editorial Article Content */}
              <article className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 max-w-3xl">
                
                {/* Embedded Medical Callout if present */}
                {blog.callout && (
                  <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#8B1A4A]/5 border-l-4 border-[#8B1A4A] shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#8B1A4A] mb-2">
                      <Bookmark size={14} />
                      <span>{blog.callout.type}</span>
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base font-medium italic leading-relaxed">
                      "{blog.callout.text}"
                    </p>
                  </div>
                )}

                {/* Render Each Section */}
                <div className="space-y-12 text-slate-800">
                  {blog.sections.map((section, sIdx) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28">
                      
                      {/* Section Heading (Skip 'Overview' as header if it's the very first) */}
                      {section.heading !== 'Overview' && (
                        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900 tracking-tight leading-snug mb-5 pb-2 border-b border-slate-200/60">
                          {section.heading}
                        </h2>
                      )}

                      {/* Paragraphs */}
                      <div className="space-y-5 text-base sm:text-lg leading-[1.8] text-slate-700 font-normal">
                        {section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* Bullets if any */}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="my-6 space-y-3 bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm">
                          {section.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                              <CheckCircle2 size={18} className="text-[#8B1A4A] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                {/* Article Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                      Filed under:
                    </span>
                    {blog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Share Bar */}
                <ShareBar title={blog.title} url={pageUrl} />

                {/* Previous & Next Article Navigation */}
                <BlogNavigation prev={prev} next={next} />

                {/* Medical Consultation CTA */}
                <BlogCta />

              </article>
            </div>

            {/* ── RECOMMENDED / RELATED ARTICLES ── */}
            <RelatedBlogs relatedBlogs={related} category={blog.category} />

          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
export default BlogDetailPage
