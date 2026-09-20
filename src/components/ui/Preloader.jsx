import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetUrl } from '@/lib/assetUrl';

export function Preloader({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === totalSlides - 1) {
          clearInterval(timer);
          onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f8f9fa] flex flex-col items-center justify-center font-sans antialiased">
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 md:px-10 md:py-6">
        <img 
          src={assetUrl('Srikara Hospitals, LB Nagar.png')} 
          alt="Srikara Hospitals" 
          className="h-10 md:h-12 object-contain"
        />
        <button 
          onClick={onComplete}
          className="px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-gray-300 bg-white text-[#0F2942] font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
        >
          SKIP <span className="text-lg leading-none">&rarr;</span>
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full max-w-5xl px-4 md:px-8 flex items-center justify-center mt-16 md:mt-10 h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <img 
              src={assetUrl(`images/preloader/preloader-${currentSlide + 1}.png`)} 
              alt={`Srikara Highlights ${currentSlide + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl md:rounded-[32px] shadow-2xl"
              onError={(e) => {
                // Fallback style if image doesn't exist yet
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-gray-100', 'border-4', 'border-white');
                e.target.parentElement.innerHTML = `<p class="text-gray-400 font-medium">Please add preloader-${currentSlide + 1}.png to public/images/preloader/</p>`;
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 flex gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div 
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#8B1A4A] w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
