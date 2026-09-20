import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, ListFilter, BookmarkCheck } from 'lucide-react'

export function TableOfContents({ sections = [] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const headings = sections.map(s => document.getElementById(s.id)).filter(Boolean)
      const scrollPos = window.scrollY + 180

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i]
        if (el.offsetTop <= scrollPos) {
          setActiveId(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToHeading = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveId(id)
      setMobileOpen(false)
    }
  }

  if (!sections || sections.length < 2) return null

  return (
    <>
      {/* ── MOBILE COLLAPSIBLE TOC ── */}
      <div className="lg:hidden mb-8 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-slate-800 bg-slate-100/70"
        >
          <span className="flex items-center gap-2">
            <ListFilter size={15} className="text-[#8B1A4A]" />
            <span>Table of Contents ({sections.length} Sections)</span>
          </span>
          {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {mobileOpen && (
          <nav className="p-4 space-y-1.5 max-h-80 overflow-y-auto">
            {sections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => scrollToHeading(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                  activeId === sec.id
                    ? 'bg-[#8B1A4A]/10 text-[#8B1A4A] font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-mono w-4">{idx + 1}.</span>
                <span className="truncate">{sec.heading}</span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* ── DESKTOP STICKY TOC ── */}
      <aside className="hidden lg:block sticky top-28 w-64 xl:w-72 self-start bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-900">
          <ListFilter size={14} className="text-[#8B1A4A]" />
          <span>In this article</span>
        </div>

        <nav className="space-y-1">
          {sections.map((sec, idx) => {
            const isActive = activeId === sec.id
            return (
              <button
                key={sec.id}
                onClick={() => scrollToHeading(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all duration-200 flex items-start gap-2.5 cursor-pointer leading-snug ${
                  isActive
                    ? 'bg-[#8B1A4A] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span className={`text-[10px] font-mono mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {idx + 1}.
                </span>
                <span className="line-clamp-2">{sec.heading}</span>
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
export default TableOfContents
