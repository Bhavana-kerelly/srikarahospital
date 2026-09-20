import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, X, AlertCircle, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { ALL_DISEASES, getDiseaseDetail } from '@/data/diseases';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const DiseaseDetail = ({ name, detail, onBack }) => {
  if (!detail) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="mt-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#EDF2F7]"
    >
      <div className="flex justify-between items-start mb-10">
        <div>
          <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Clinical Insight</span>
          <h4 className="text-4xl md:text-5xl font-black text-[#1A202C]">{name}</h4>
        </div>
        <button onClick={onBack} className="p-3 rounded-full bg-[#F7FAFC] hover:bg-[#EDF2F7] transition-all">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div>
          <h5 className="text-[#8B1A4A] font-bold text-xs uppercase tracking-widest mb-4">Overview</h5>
          <p className="text-[#4A5568] leading-relaxed text-base">{detail.description}</p>
        </div>
        <div>
          <h5 className="text-[#8B1A4A] font-bold text-xs uppercase tracking-widest mb-4">Symptoms</h5>
          <ul className="space-y-3">
            {detail.symptoms.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#2D3748] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A4A] mt-2 flex-shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-[#8B1A4A] font-bold text-xs uppercase tracking-widest mb-4">Treatment</h5>
          <ul className="space-y-3">
            {detail.treatment.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#2D3748] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#EDF2F7] flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#8B1A4A]/5 flex items-center justify-center text-[#8B1A4A]">
             <Stethoscope size={20} />
          </div>
          <p className="text-sm font-bold text-[#1A202C]">Specialized care under {detail.specialist}</p>
        </div>
        <button className="bg-[#8B1A4A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#5E0F30] transition-all text-sm flex items-center gap-2">
          Consult Specialist <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export const MinimalDiseasesSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const resultsRef = useRef(null);

  const filteredDiseases = ALL_DISEASES.filter(name => {
    if (searchTerm) return name.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedLetter) return name.toUpperCase().startsWith(selectedLetter);
    return false;
  });

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    setSearchTerm('');
    setSelectedDisease(null);
  };

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header and Search Container */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <div className="flex-1">
            <span className="text-[#8B1A4A] text-[11px] font-black uppercase tracking-[0.2em] mb-5 block">
              MEDICAL RESOURCE CENTER
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-[#1A202C] tracking-tight flex flex-wrap gap-x-4">
              <span>Diseases</span> <span className="text-[#8B1A4A] font-black">& Conditions</span>
            </h2>
            <p className="text-[#718096] text-lg mt-6 max-w-xl font-medium leading-relaxed">
              Search any condition to access clinical insights, symptoms, and treatment options.
            </p>
          </div>

          <div className="relative w-full lg:w-[420px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={20} />
            <input 
              type="text"
              placeholder="Search conditions, symptoms..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setSelectedDisease(null); }}
              className="w-full pl-14 pr-12 py-5 rounded-full border border-[#E2E8F0] focus:border-[#8B1A4A] focus:outline-none text-[#1A202C] placeholder-[#A0AEC0] transition-all text-base shadow-sm"
            />
          </div>
        </div>

        {/* Alphabet Bar */}
        <div className="flex flex-wrap gap-2 mb-12">
          {ALPHABET.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterSelect(letter)}
              className={`w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-xs font-bold transition-all ${
                selectedLetter === letter && !searchTerm
                  ? 'bg-[#1A202C] text-white border-[#1A202C] shadow-lg'
                  : 'text-[#718096] hover:border-[#8B1A4A] hover:text-[#8B1A4A]'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Results / Detail Area */}
        <div ref={resultsRef} className="scroll-mt-10">
          <AnimatePresence mode="wait">
            {selectedDisease ? (
              <DiseaseDetail 
                name={selectedDisease} 
                detail={getDiseaseDetail(selectedDisease)} 
                onBack={() => setSelectedDisease(null)} 
              />
            ) : filteredDiseases.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {filteredDiseases.map(name => (
                  <button
                    key={name}
                    onClick={() => setSelectedDisease(name)}
                    className="p-5 text-left border border-[#E2E8F0] rounded-2xl hover:border-[#8B1A4A] hover:bg-[#8B1A4A]/[0.02] transition-all group"
                  >
                    <h4 className="text-[#1A202C] font-bold group-hover:text-[#8B1A4A] transition-colors">{name}</h4>
                    <span className="text-[10px] text-[#A0AEC0] font-bold uppercase mt-2 block tracking-widest group-hover:text-[#8B1A4A]/60">View Details</span>
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
