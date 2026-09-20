import React from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, ExternalLink, ArrowRight } from 'lucide-react';

const mediaArticles = [
  {
    title: 'Precision in Robotics: Srikara Featured on Suman TV',
    subtitle: 'Robotic Precision in Orthopaedics',
    image: '/srikara_suman_tv_news_thumbnail_1775826668492.png',
    description: 'Dr. Akhil Dadi explains how Srikara Hospitals is pioneering robotic-assisted joint replacements in India, bringing surgical precision to the global platinum standard.',
    source: 'Suman TV',
    date: 'Oct 2023'
  },
  {
    title: 'Institutional Milestone: Times Now Exclusive Interview',
    subtitle: 'Redefining Joint Care with Precision',
    image: '/srikara_times_now_interview_thumbnail_1775826694810.png',
    description: 'A deep dive into Srikara Hospitals clinical ecosystem, exploring how institutional trust and medical innovation have served over 27,000 successful surgeries.',
    source: 'Times Now',
    date: 'Nov 2023'
  },
  {
    title: 'Clinical Breakthrough: TV 5 Medical News Segment',
    subtitle: 'Advanced Joint Replacement Solutions',
    image: '/srikara_tv5_news_thumbnail_1775826725056.png',
    description: 'Highlighting the latest robotic protocols and rehabilitation excellence that define the Srikara experience for patients across our hospital chain.',
    source: 'TV 5',
    date: 'Dec 2023'
  }
];

export const PremiumMediaSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#8B1A4A]/5 px-4 py-2 rounded-full mb-6 border border-[#8B1A4A]/10"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B1A4A] animate-pulse" />
            <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.4em]">Media & Press</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1A202C] tracking-tight mb-6"
          >
            Srikara in <span className="text-[#8B1A4A]">The Spotlight</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#718096] text-lg max-w-2xl mx-auto font-medium"
          >
            Stay updated with our latest media appearances, clinical breakthroughs, and institutional milestones shared across national platforms.
          </motion.p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mediaArticles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#EDF2F7] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              {/* Thumbnail Container */}
              <div className="relative h-[240px] overflow-hidden bg-[#1A202C]">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#8B1A4A] text-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>

                {/* Source Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                  {article.source}
                </div>
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col flex-1 text-center">
                <div className="flex items-center justify-center gap-4 text-[#A0AEC0] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E0]" />
                  <span>Interview</span>
                </div>

                <h3 className="text-[#1A202C] text-xl font-black mb-4 leading-tight group-hover:text-[#8B1A4A] transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-[#718096] text-sm leading-relaxed mb-8 flex-1 font-medium">
                  {article.description}
                </p>

                <div className="pt-8 border-t border-[#F1F5F9]">
                  <button className="inline-flex items-center gap-2 text-[#8B1A4A] font-black text-[11px] uppercase tracking-[0.2em] hover:gap-4 transition-all group/btn">
                    Watch Full Interview <ExternalLink size={14} className="opacity-60" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <button className="bg-[#1A202C] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-[#8B1A4A] transition-all flex items-center gap-3 mx-auto">
            View All Media Reports <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
