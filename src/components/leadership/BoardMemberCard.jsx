import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BoardMemberCard({ member, index, onSelect }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white text-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 h-full p-6 sm:p-7"
    >
      <div className="flex flex-col flex-1">
        {/* Top Header Row with Number & Pill Badge */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-black tracking-widest text-[#F43F5E] uppercase font-sans">
            {member.number}
          </span>
          {member.badge && (
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-[#8B1A4A] border border-rose-100 shadow-sm">
              {member.badge}
            </span>
          )}
        </div>

        {/* Member Avatar / Initials Card */}
        <div className="relative mx-auto overflow-hidden w-full h-48 sm:h-52 rounded-[20px] bg-gradient-to-b from-rose-50 via-pink-50/50 to-slate-50 flex items-center justify-center mb-5 border border-slate-100">
          {member.image && !imgError ? (
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 select-none">
              <span
                className="font-serif text-5xl sm:text-6xl font-normal text-[#8B1A4A] tracking-wider transition-transform duration-500 group-hover:scale-110"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {member.initials || 'SD'}
              </span>
            </div>
          )}
        </div>

        {/* Name & Designation */}
        <h3
          className="font-serif font-bold text-2xl text-[#0A1628] group-hover:text-[#8B1A4A] transition-colors leading-tight mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {member.name}
        </h3>

        <p className="text-xs font-bold text-[#8B1A4A] uppercase tracking-wider mb-3">
          {member.designation}
        </p>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-6 font-normal">
          "{member.description}"
        </p>
      </div>

    </motion.div>
  )
}

export default BoardMemberCard
