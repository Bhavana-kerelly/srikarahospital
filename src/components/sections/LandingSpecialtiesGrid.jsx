import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Activity, Zap, Bone, Droplets, Heart, Brain, Microscope } from 'lucide-react';

const specialties = [
  {
    title: 'CARDIOLOGY',
    subtitle: 'Precision Heart Care',
    id: '01',
    dept: 'cardiology',
    image: 'premium_cardiac_science_hero_1775828456653.png',
    desc: 'Advanced cardiovascular interventions using precision robotic mapping.',
    icon: <Activity className="text-[#8B1A4A]" size={24} />,
    color: 'from-[#8B1A4A]/20 to-transparent'
  },
  {
    title: 'ORTHOPAEDICS',
    subtitle: 'Robotic Joint Mastery',
    id: '02',
    dept: 'orthopaedics',
    image: 'premium_orthopedic_robotic_surgery_1775828483747.png',
    desc: 'The gold standard in robotic knee and hip replacements.',
    icon: <Bone className="text-[#8B1A4A]" size={24} />,
    color: 'from-[#1a365d]/20 to-transparent'
  },
  {
    title: 'NEPHROLOGY',
    subtitle: 'Renal Excellence',
    id: '03',
    dept: 'nephrology',
    image: 'premium_nephrology_dialysis_center_1775828508740.png',
    desc: 'State-of-the-art renal care and dialysis suites.',
    icon: <Droplets className="text-[#8B1A4A]" size={24} />,
    color: 'from-[#1a365d]/20 to-transparent'
  },
  {
    title: 'NEUROSCIENCES',
    subtitle: 'Brain & Spine Care',
    id: '04',
    dept: 'neurology',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80',
    desc: 'Comprehensive neurological services powered by AI-assisted diagnostics.',
    icon: <Brain className="text-[#8B1A4A]" size={24} />,
    color: 'from-[#1a365d]/20 to-transparent'
  }
];

export const LandingSpecialtiesGrid = () => {
  const navigate = useNavigate();
  return (
    <section className="py-40 bg-slate-50 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">
        
        {/* Architectural Header */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 mb-10"
          >
            <span className="w-20 h-[3px] bg-[#8B1A4A]" />
            <span className="text-[#8B1A4A] text-xs font-black uppercase tracking-[0.6em]">Clinical Verticals</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl lg:text-[10rem] font-black text-[#1A202C] leading-[0.85] tracking-tighter"
            >
              Expertise <br />
              <span className="text-[#8B1A4A]">Unlimited.</span>
            </motion.h2>
            <div className="max-w-md pt-8">
              <p className="text-[#4A5568] text-xl font-medium leading-relaxed mb-10">
                From precision neuro-diagnostics to robotic joint restoration, we house the world's most 
                advanced clinical disciplines under one institutional roof.
              </p>
              <div className="h-0.5 w-full bg-[#8B1A4A]/10 relative group">
                <div className="absolute inset-0 w-0 group-hover:w-full bg-[#8B1A4A] transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* High-Fidelity Multi-Specialty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -16 }}
              onClick={() => navigate(`/specialties/${item.dept}`)}
              className="group relative overflow-hidden rounded-[3.5rem] bg-[#0F172A] cursor-pointer shadow-2xl transition-all duration-500 aspect-[3/4] min-h-[320px]"
            >
              {/* Image with Parallax-like Zoom */}
              <img 
                src={item.image.includes('http') ? item.image : `${import.meta.env.BASE_URL}${item.image}`}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-110"
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/20 to-[#0F172A] opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Iconic Badge */}
              <div className="absolute top-12 left-12 z-20">
                <div className="w-14 h-14 rounded-2xl bg-[#8B1A4A] flex items-center justify-center text-white shadow-lg transition-transform duration-700 group-hover:rotate-[360deg]">
                  {React.cloneElement(item.icon, { size: 28, className: "text-white" })}
                </div>
              </div>

              {/* Functional ID */}
              <div className="absolute top-12 right-12 z-20 text-white/5 text-8xl font-black tracking-tighter select-none">
                {item.id}
              </div>

              {/* Artistic Content Layer */}
              <div className="absolute inset-x-0 bottom-0 p-14 z-30">
                <div className="mb-6">
                  <span className="block text-[#8B1A4A] text-xs font-black uppercase tracking-[0.4em] mb-4">
                    {item.subtitle}
                  </span>
                  <h3 className="text-white text-4xl font-black tracking-tight leading-none mb-6">
                    {item.title}
                  </h3>
                  <div className="w-10 h-1 bg-[#8B1A4A] group-hover:w-full transition-all duration-700" />
                </div>

                <div className="max-h-0 group-hover:max-h-60 overflow-hidden transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                  <p className="text-white/60 text-base font-medium leading-relaxed mb-10 italic">
                    {item.desc}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/specialties/${item.dept}`);
                    }}
                    className="group/btn flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-[#8B1A4A] hover:border-[#8B1A4A] text-white px-8 py-4 rounded-xl transition-all duration-300"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vertical Specs</span>
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
