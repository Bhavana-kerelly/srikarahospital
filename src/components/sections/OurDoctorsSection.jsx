import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from 'lucide-react';
import { ALL_DOCTORS } from '@/data/doctors';
import { assetUrl } from '@/lib/assetUrl';

export function OurDoctorsSection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  // Extract all unique doctors from ALL_DOCTORS
  const doctorsList = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const doc of ALL_DOCTORS) {
      const key = doc.slug || doc.name.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        list.push({
          id: doc.id,
          name: doc.name,
          specialty: doc.specialty || doc.label || 'Specialist',
          qualification: doc.sub || (Array.isArray(doc.education) ? doc.education.join(', ') : '') || doc.label || '',
          image: doc.image,
          fallbackImage: doc.fallback || assetUrl('placeholder-doctor.png'),
          slug: doc.slug,
          branch: doc.branch || 'Srikara Hospitals',
          rating: doc.rating || '4.9',
          exp: doc.exp || '10+ Years'
        });
      }
    }
    return list;
  }, []);

  // Duplicate the list for a seamless, infinite loop
  const displayDoctors = useMemo(() => {
    if (doctorsList.length === 0) return [];
    return [...doctorsList, ...doctorsList];
  }, [doctorsList]);

  // Check scroll bounds for manual controls
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Continuous auto-scroll animation loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || displayDoctors.length === 0) return;

    let animationFrameId;
    const speed = 0.75; // pixels per frame

    const step = () => {
      if (!isPaused && !isInteractingRef.current && container) {
        const halfScrollWidth = container.scrollWidth / 2;
        if (halfScrollWidth > 0 && container.scrollLeft >= halfScrollWidth) {
          // Seamless reset to beginning half
          container.scrollLeft -= halfScrollWidth;
        } else {
          container.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, displayDoctors]);

  const pauseTemporarily = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2500);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      pauseTemporarily();
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCardClick = (doc) => {
    if (doc.slug) {
      navigate(`/doctors/${doc.slug}`);
    } else {
      navigate('/doctors');
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FCF8FA] font-sans border-t border-rose-100/70 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* ── Section Header with Srikara Logo Styling ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2.5px] bg-[#8B1A4A] rounded-full" />
              <span className="text-[#8B1A4A] text-[11px] sm:text-xs font-black uppercase tracking-[0.3em]">
                CLINICAL EXCELLENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#1A1A2E] tracking-tight">
              Our <span className="text-[#8B1A4A]">Doctors</span>
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base mt-2 max-w-xl font-normal">
              Meet our leading team of {doctorsList.length}+ world-renowned surgeons, physicians, and super-specialists.
            </p>
          </div>

          {/* Controls: Auto-scroll Pause Toggle & Manual Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="px-3.5 py-2 rounded-full flex items-center gap-2 border border-rose-200 bg-white text-[#8B1A4A] hover:bg-rose-50 text-xs font-bold transition-all shadow-sm"
              title={isPaused ? "Resume Auto Scroll" : "Pause Auto Scroll"}
              aria-label={isPaused ? "Resume Auto Scroll" : "Pause Auto Scroll"}
            >
              {isPaused ? (
                <>
                  <Play size={14} className="fill-current" />
                  <span className="hidden sm:inline">Auto Scroll</span>
                </>
              ) : (
                <>
                  <Pause size={14} className="fill-current" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              )}
            </button>

            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-rose-200 bg-white text-[#8B1A4A] hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] shadow-sm transition-all cursor-pointer"
              aria-label="Previous doctors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-rose-200 bg-white text-[#8B1A4A] hover:bg-[#8B1A4A] hover:text-white hover:border-[#8B1A4A] shadow-sm transition-all cursor-pointer"
              aria-label="Next doctors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── Auto-Scrolling Doctors Cards Track ── */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          onMouseEnter={() => { isInteractingRef.current = true; }}
          onMouseLeave={() => { isInteractingRef.current = false; }}
          onTouchStart={() => { isInteractingRef.current = true; }}
          onTouchEnd={() => { pauseTemporarily(); }}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-6 select-none"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {displayDoctors.map((doc, idx) => (
            <motion.div
              key={`${doc.slug || doc.name}-${idx}`}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCardClick(doc)}
              className="min-w-[260px] sm:min-w-[280px] lg:min-w-[290px] max-w-[300px] flex-shrink-0 bg-white border border-rose-100/80 shadow-[0_4px_20px_rgba(139,26,74,0.04)] hover:shadow-[0_16px_35px_rgba(139,26,74,0.15)] hover:border-[#8B1A4A]/40 flex flex-col justify-between overflow-hidden cursor-pointer group transition-all duration-300 rounded-sm"
            >
              {/* Doctor Studio Portrait Container */}
              <div className="bg-[#CED3D7] aspect-[4/3.8] relative overflow-hidden flex items-end justify-center">
                <img
                  src={doc.image}
                  alt={doc.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = doc.fallbackImage || assetUrl('placeholder-doctor.png');
                  }}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                />
                
                {/* Branch Badge */}
                {doc.branch && (
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm border border-slate-200/80 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#1A1A2E] shadow-sm">
                    {doc.branch}
                  </div>
                )}
              </div>

              {/* Doctor Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  {/* Doctor Name */}
                  <h3 className="text-[#1A1A2E] text-[17px] sm:text-lg font-bold leading-snug tracking-tight mb-1 group-hover:text-[#8B1A4A] transition-colors line-clamp-1">
                    {doc.name}
                  </h3>

                  {/* Specialty / Department */}
                  <p className="text-[#8B1A4A] text-xs sm:text-[13px] font-semibold mb-2 line-clamp-1">
                    {doc.specialty}
                  </p>

                  {/* Qualifications */}
                  <p className="text-[#64748B] text-[11px] sm:text-xs leading-relaxed line-clamp-2 min-h-[32px]">
                    {doc.qualification || 'Senior Consultant'}
                  </p>
                </div>
              </div>

              {/* Bottom Action Bar matching Srikara Brand Logo Palette */}
              <div className="bg-[#8B1A4A] group-hover:bg-[#73123B] px-5 py-3.5 flex items-center justify-between transition-colors duration-300">
                <span className="text-white text-xs font-bold uppercase tracking-[0.15em]">
                  VIEW PROFILE
                </span>
                <ArrowRight size={15} className="text-white group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

        {/* ── Bottom Link to All Doctors in Srikara Logo Color ── */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/doctors')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8B1A4A] hover:text-[#73123B] transition-colors border-b-2 border-rose-200 hover:border-[#8B1A4A] pb-1 cursor-pointer"
          >
            Explore All Specialists across Srikara ({doctorsList.length}+ Doctors) <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}

