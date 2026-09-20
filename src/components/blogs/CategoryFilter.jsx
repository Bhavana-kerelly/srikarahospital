import { motion } from 'framer-motion'

export function CategoryFilter({
  categories = [],
  activeCategory = 'All',
  onSelectCategory,
  counts = {}
}) {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max px-2">
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
          const count = counts[cat] || 0

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? 'text-white border-[#8B1A4A] shadow-md shadow-[#8B1A4A]/25'
                  : 'text-slate-600 bg-white/80 hover:bg-slate-100 hover:text-slate-900 border-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-[#8B1A4A] rounded-full z-0"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
              {count > 0 && (
                <span
                  className={`relative z-10 text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default CategoryFilter
