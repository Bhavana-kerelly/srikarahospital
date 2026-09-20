import { motion } from 'framer-motion';
import { Award, Star, ShieldCheck, Cpu, Activity, Accessibility, FlaskConical, Microscope, Heart, Brain, Bone, Zap, UserCheck, Stethoscope, Hand, Syringe, Ruler, Pill, Thermometer, Crosshair } from 'lucide-react';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';

const specialties = [
  // Row 1 items
  { icon: Microscope, label: 'Arthroscopy' },
  { icon: Cpu, label: 'Robotic Surgery' },
  { icon: Activity, label: 'ACL & PCL Reconstruction' },
  { icon: Accessibility, label: 'Prosthetic Care' },
  { icon: FlaskConical, label: 'BMAC Therapy' },
  { icon: ShieldCheck, label: 'Bone Tumor Removal' },
  { icon: Bone, label: 'Total Hip Replacement' },
  { icon: Zap, label: 'Trauma & Emergency' },
  { icon: UserCheck, label: 'Rheumatology' },
  // Row 2 items
  { icon: Hand, label: 'Hand and Upper Limb' },
  { icon: Syringe, label: 'Hyaluronic Acid Injections' },
  { icon: Ruler, label: 'Limb Lengthening' },
  { icon: Thermometer, label: 'Low Level Laser Therapy' },
  { icon: Crosshair, label: 'Meniscus Repair' },
  { icon: Pill, label: 'OATS' },
  { icon: Brain, label: 'Spine Surgery' },
  { icon: Stethoscope, label: 'Sports Medicine' },
  { icon: Heart, label: 'Cardio-Orthopaedics' },
];

const awards = [
  { 
    text: 'Honored by 14th President of India Shri Ram Nath Kovind',
    icon: Award 
  },
  { 
    text: 'Times Iconic Joint Replacement Award',
    icon: Star
  },
  { 
    text: 'Felicitated by Governors of Telangana State',
    icon: ShieldCheck
  },
  {
    text: 'Ranked No. 1 Orthopaedic Hospital in South India',
    icon: Star
  },
  {
    text: 'Limca Book of Records: Maximum Joint Replacements',
    icon: Award
  },
  {
    text: 'National Excellence Award for Robotic Surgery',
    icon: ShieldCheck
  }
];

export function OrthopedicExpertise() {
  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-10 pointer-events-none select-none opacity-[0.03]">
        <h3 className="text-[120px] font-black text-[#8B1A4A] leading-none uppercase tracking-tighter">
          Registry
        </h3>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#8B1A4A]/5 px-4 py-2 rounded-full mb-6 border border-[#8B1A4A]/10"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B1A4A] animate-pulse" />
            <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.4em]">Global Clinical Registry</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A202C] tracking-tight leading-[1.1]"
          >
            India's Leading <span className="text-[#8B1A4A]">Multi-Speciality</span> Experts
          </motion.h2>
        </div>

        {/* Speciality Auto Slider - Single Row */}
        <div className="relative z-10 mb-20">
          <ImageAutoSlider
            items={specialties}
            speed={60}
            renderItem={(item, idx) => (
              <motion.div
                key={item.label + idx}
                whileHover={{ y: -8 }}
                className="group flex flex-col items-center bg-white p-8 w-[240px] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EDF2F7] transition-all mx-3"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/5 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <item.icon className="w-10 h-10 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <p className="text-[#4A4A4A] font-bold text-xs text-center uppercase tracking-wider leading-relaxed">
                  {item.label}
                </p>
              </motion.div>
            )}
          />
        </div>

        {/* Awards Auto Slider - Scroll Right */}


      </div>
    </section>
  );
}
