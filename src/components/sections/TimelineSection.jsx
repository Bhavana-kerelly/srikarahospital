import { motion } from 'framer-motion';
import { Timeline } from '@/components/ui/timeline-section';

export function TimelineSection() {
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Subtle glow accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B1A4A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a56db]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center relative z-10">

        {/* Left — timeline card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-10">
            <Timeline />
          </div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#8B1A4A]" />
            <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.45em]">The Srikara Experience</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-[#1A202C] tracking-tighter leading-[1.0] mb-6">
            How We Deliver<br />
            <span className="text-[#8B1A4A]">Absolute Care.</span>
          </h2>

          <p className="text-[#64748B] text-lg font-medium leading-relaxed max-w-lg mb-10">
            Our patient journey is designed to be as seamless as our surgical procedures. From first contact to full recovery, every step is verified and personalised.
          </p>

          {/* Quote card */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8">
            <p className="text-[#4A5568] text-sm leading-relaxed italic">
              "The integration of digital clinical protocols at Srikara ensures that we maintain 100% precision throughout the patient lifecycle."
            </p>
            <p className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-widest mt-5">
              — Clinical Excellence Board
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
