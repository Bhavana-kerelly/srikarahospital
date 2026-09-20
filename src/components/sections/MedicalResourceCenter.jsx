import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Stethoscope, ArrowRight, AlertCircle, HeartPulse, ChevronRight, Calendar } from 'lucide-react';
import { ALL_DISEASES, getDiseaseDetail } from '@/data/diseases';
import { useNavigate } from 'react-router-dom';

const ALPHABET_ROWS = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

export function MedicalResourceCenter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const resultsRef = useRef(null);

  const filteredDiseases = ALL_DISEASES.filter((name) => {
    if (searchTerm) return name.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedLetter) return name.toUpperCase().startsWith(selectedLetter);
    return false;
  });

  const handleLetterClick = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
      setSearchTerm('');
    }
    setSelectedDisease(null);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const diseaseDetail = selectedDisease ? getDiseaseDetail(selectedDisease) : null;

  return (
    <section className="py-12 sm:py-16 bg-white font-sans overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* ── Main Rounded Pink/Rose Banner Container ── */}
        <div className="bg-gradient-to-br from-[#FDF0F5] via-[#FDF2F7] to-[#FCE8F1] rounded-[36px] sm:rounded-[44px] lg:rounded-[52px] p-8 sm:p-12 lg:p-16 border border-rose-100/60 shadow-[0_20px_50px_rgba(139,26,74,0.06)] relative overflow-hidden">
          
          {/* Subtle Ambient Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* ── Left Content Column ── */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Eyebrow Label */}
              <span className="text-[#8B1A4A]/80 text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4 sm:mb-6 block">
                MEDICAL RESOURCE CENTER
              </span>

              {/* Main Headline */}
              <h2 className="text-[44px] sm:text-[56px] lg:text-[68px] font-serif font-black tracking-[-0.03em] leading-[1.04] mb-6">
                <span className="text-[#1E293B] block">Diseases</span>
                <span className="text-[#8B1A4A] block">& Conditions</span>
              </h2>

              {/* Pink Divider Bar */}
              <div className="w-16 h-[2.5px] bg-[#E8A5BF] rounded-full mb-6" />

              {/* Description */}
              <p className="text-[#556972] text-base sm:text-lg font-normal leading-relaxed max-w-md">
                Access globally-verified clinical insights into conditions, treatments, and patient care.
              </p>
            </div>

            {/* ── Right Column: Clinical Search Card ── */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="bg-white rounded-[32px] sm:rounded-[38px] p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(139,26,74,0.12)] border border-white max-w-[460px] w-full">
                
                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] text-center tracking-tight">
                  Clinical Search
                </h3>
                <div className="w-8 h-[2px] bg-slate-200 mx-auto mt-2 mb-6 rounded-full" />

                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedLetter(null);
                      setSelectedDisease(null);
                    }}
                    placeholder="Symptoms, Conditions..."
                    className="w-full bg-[#FAF3F6] pl-11 pr-10 py-3.5 rounded-2xl text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#8B1A4A]/30 border border-rose-100/50 transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#8B1A4A] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Browse by Alphabet Label */}
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#94A3B8] text-center mb-4">
                  BROWSE BY ALPHABET
                </p>

                {/* Alphabet Pills Grid */}
                <div className="flex flex-col gap-2.5">
                  {ALPHABET_ROWS.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex justify-center items-center gap-1.5 sm:gap-2">
                      {row.map((letter) => {
                        const isSelected = selectedLetter === letter && !searchTerm;
                        return (
                          <button
                            key={letter}
                            onClick={() => handleLetterClick(letter)}
                            className={`w-8 h-8 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#8B1A4A] text-white shadow-md shadow-[#8B1A4A]/35 scale-110 font-bold'
                                : 'bg-[#FAF3F6] text-[#64748B] hover:bg-[#8B1A4A] hover:text-white hover:scale-105'
                            }`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* ── Expandable Results & Details Panel ── */}
          <div ref={resultsRef}>
            <AnimatePresence mode="wait">
              {/* Disease Detail Card */}
              {selectedDisease && diseaseDetail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-10 bg-white rounded-[28px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(139,26,74,0.1)] border border-rose-100"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                    <div>
                      <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.22em] mb-1.5 block">
                        Verified Clinical Insight
                      </span>
                      <h4 className="text-3xl sm:text-4xl font-black text-[#1E293B]">
                        {selectedDisease}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedDisease(null)}
                      className="p-2.5 rounded-full bg-[#FAF3F6] text-[#64748B] hover:bg-[#8B1A4A] hover:text-white transition-all self-end sm:self-start"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h5 className="text-[#8B1A4A] font-bold text-xs uppercase tracking-widest mb-3">Overview</h5>
                      <p className="text-[#556972] text-sm sm:text-[15px] leading-relaxed">
                        {diseaseDetail.description}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-[#8B1A4A] font-bold text-xs uppercase tracking-widest mb-3">Symptoms</h5>
                      <ul className="space-y-2">
                        {diseaseDetail.symptoms?.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-[#334155]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A4A] mt-1.5 flex-shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-[#8B1A4A] font-bold text-xs uppercase tracking-widest mb-3">Treatment</h5>
                      <ul className="space-y-2">
                        {diseaseDetail.treatment?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-[#334155]">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-rose-100/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FDF2F7] flex items-center justify-center text-[#8B1A4A]">
                        <Stethoscope size={18} />
                      </div>
                      <p className="text-sm font-bold text-[#1E293B]">
                        Specialized care under {diseaseDetail.specialist}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                      {selectedDisease?.toLowerCase().includes('dialysis') && (
                        <button
                          onClick={() => navigate('/find-dialysis')}
                          className="bg-[#006699] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#004C73] transition-all flex items-center gap-2 shadow-md"
                        >
                          <Calendar size={14} /> Book Dialysis Slot
                        </button>
                      )}
                      <button
                        onClick={() => navigate('/specialties')}
                        className="bg-[#8B1A4A] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#73123B] transition-all flex items-center gap-2 shadow-md"
                      >
                        Consult Specialist <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Filtered Diseases List */}
              {!selectedDisease && (searchTerm || selectedLetter) && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-8 bg-white/90 backdrop-blur-md rounded-[28px] p-6 sm:p-8 border border-rose-100"
                >
                  <div className="flex justify-between items-center mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8B1A4A]">
                      {filteredDiseases.length} condition{filteredDiseases.length === 1 ? '' : 's'} found
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedLetter(null);
                      }}
                      className="text-xs font-bold text-[#64748B] hover:text-[#8B1A4A]"
                    >
                      Clear Filter
                    </button>
                  </div>

                  {filteredDiseases.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-2">
                      {filteredDiseases.map((name) => (
                        <button
                          key={name}
                          onClick={() => setSelectedDisease(name)}
                          className="p-3.5 text-left rounded-xl bg-[#FAF3F6]/70 hover:bg-[#8B1A4A] hover:text-white text-[#1E293B] text-xs font-bold transition-all flex items-center justify-between group"
                        >
                          <span className="truncate">{name}</span>
                          <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-[#64748B] py-6">
                      No matching condition found. Try another search or letter.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
