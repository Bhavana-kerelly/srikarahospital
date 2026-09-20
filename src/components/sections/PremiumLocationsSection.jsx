import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { lbNagar, kompally, lakdikapul, ecil, miyapur, vijayawada, rajahmundry, rtcXRoads, peerzadiguda } from '@/data/branches';

const allBranches = [
  rtcXRoads, miyapur, lbNagar, vijayawada, kompally, ecil, peerzadiguda, lakdikapul, rajahmundry
];

export const PremiumLocationsSection = () => {
  const [activeBranch, setActiveBranch] = useState(allBranches[0]);
  const navigate = useNavigate();

  const handleGetDirections = (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + " Srikara Hospital")}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#F8FAFC] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#8B1A4A]/5 px-4 py-2 rounded-full mb-6 border border-[#8B1A4A]/10"
          >
            <MapPin size={14} className="text-[#8B1A4A]" />
            <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.4em]">Our Network</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#1A202C] tracking-tight mb-6"
          >
            Our <span className="text-[#8B1A4A]">Locations</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-[#4A5568] text-lg max-w-4xl mx-auto font-medium leading-relaxed"
          >
            Srikara Hospitals are <span className="text-[#1A202C] font-bold underline decoration-[#8B1A4A]/30 underline-offset-4">widespread across both Telangana and Andhra Pradesh</span> with {allBranches.length} branches, delivering advanced healthcare services and compassionate care.
          </motion.p>
        </div>

        {/* Tab Bar - Unified Capsule Style */}
        <div className="flex justify-center mb-20 px-2 lg:px-0">
          <div className="bg-gradient-to-r from-[#8B1A4A] via-[#7B1F48] to-[#5B1032] p-1.5 rounded-full shadow-2xl flex flex-wrap justify-center lg:flex-nowrap gap-1 overflow-x-auto no-scrollbar max-w-full">
            {allBranches.map((branch) => (
              <button
                key={branch.slug}
                onClick={() => setActiveBranch(branch)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  activeBranch.slug === branch.slug
                    ? 'bg-white text-[#8B1A4A] shadow-xl scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {branch.title.replace('Srikara ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Branch Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBranch.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-[#EDF2F7] flex flex-col lg:flex-row gap-16 items-center"
          >
            {/* Left Content */}
            <div className="flex-1 w-full">
              <div className="mb-10">
                <h3 className="text-[#1A202C] text-3xl md:text-5xl font-black mb-4 tracking-tight">
                  Srikara Hospitals – <span className="text-[#8B1A4A]">{activeBranch.title.replace('Srikara ', '')}</span>
                </h3>
                <p className="text-[#718096] text-lg font-medium">Delivering Excellence in Healthcare with Advanced Technology & Compassionate Care</p>
              </div>

              <div>
                <h4 className="text-[#1A202C] text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#8B1A4A]" /> Our Specialties
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                  {/* Extract specialties from branch data or use placeholders if data is missing */}
                  {(activeBranch.departments || [
                    { name: 'Robotic-Assisted Knee Replacement Surgery', desc: 'Precision-driven joint replacement for faster recovery.' },
                    { name: 'Microscope for Neuro & Spine Surgery', desc: 'Advanced technology for intricate brain and spine procedures.' },
                    { name: '24/7 Neuro Care', desc: 'Comprehensive neurological services, available anytime.' },
                    { name: 'Cath Lab for Cardiac Interventions', desc: 'State-of-the-art facilities for advanced cardiac care.' },
                    { name: 'Laser Urology Centre', desc: 'Cutting-edge treatments for urological conditions.' },
                    { name: 'General, Laser & Laparoscopy Centre', desc: 'Minimally invasive procedures for faster healing.' },
                    { name: 'Rheumatology & Clinical Immunology', desc: 'Expert care for autoimmune and musculoskeletal disorders.' },
                    { name: '24/7 Emergency & Critical Care', desc: 'Immediate response to medical emergencies with a dedicated team.' }
                  ]).map((dept, i) => (
                    <div key={i} className="flex gap-3 group">
                      <CheckCircle2 size={18} className="text-[#8B1A4A] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-[#1A202C] font-bold text-sm block md:inline">{dept.name} – </span>
                        <span className="text-[#718096] text-sm font-medium">{dept.desc || 'World-class care for complex conditions.'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate(`/branches/${activeBranch.slug}`)}
                  className="bg-[#1A202C] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#8B1A4A] transition-all flex items-center gap-2 group shadow-xl"
                >
                  View Branch Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => handleGetDirections(activeBranch.address)}
                  className="bg-white border-2 border-[#1A202C] text-[#1A202C] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1A202C] hover:text-white transition-all shadow-sm"
                >
                  Get Directions
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[540px] h-[360px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-8 border-white group">
              <img 
                src={activeBranch.heroImage || 'https://img.freepik.com/free-photo/modern-hospital-building-exterior_1127-3141.jpg'} 
                alt={activeBranch.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
