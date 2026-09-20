import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Clock, User, X, BookOpen, Share2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { openWhatsAppBooking } from '@/lib/whatsapp';

const BASE = import.meta.env.BASE_URL;

const blogs = [
  {
    id: 'robotic-surgery',
    category: 'Technology',
    title: 'The Future of Joint Surgery: Why Robotic Precision Matters',
    excerpt: 'Explore how clinical robotics are transforming the success rates of knee and hip replacements through sub-millimeter accuracy.',
    fullContent: 'Robotic-assisted surgery at Srikara Hospitals represents the pinnacle of orthopedic evolution. By using the NAVIO surgical system, our surgeons can create a 3D digital map of the patient\'s unique anatomy without the need for a CT scan. This level of precision allows for sub-millimeter accuracy in implant placement, resulting in natural joint movement, reduced recovery time, and significantly longer implant lifespan. Our data shows a 98% satisfaction rate in patients undergoing robotic procedures compared to traditional methods.',
    author: 'Dr. Akhil Dadi',
    date: 'April 12, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=1200',
    featured: true
  },
  {
    id: 'rehab-protocol',
    category: 'Patient Care',
    title: 'Precision Recovery: The Srikara Rehabilitation Protocol',
    excerpt: 'Detailed insights into our specialized post-operative care that ensures faster mobility and long-term joint health.',
    fullContent: 'Recovery is just as critical as the surgery itself. The Srikara Rehabilitation Protocol (SRP) is a data-driven approach to post-operative care. Within 4 hours of surgery, our patients begin assisted movement. Using advanced physiotherapy equipment and personalized exercise regimens, we focus on restoring range of motion quickly while managing pain through non-opioid methods. This protocol has reduced the average hospital stay by 40% and allows most patients to return to their daily activities within 2 weeks.',
    author: 'Rehab Division',
    date: 'April 10, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: 'spine-health',
    category: 'Clinical Health',
    title: 'Understanding Spine Health: When to Consult a Specialist',
    excerpt: 'A comprehensive guide to identifying early symptoms of spinal disorders and the non-surgical interventions available at Srikara.',
    fullContent: 'Spinal health is often overlooked until pain becomes debilitating. At our Spine Center, we advocate for early intervention. Symptoms like radiating leg pain, numbness, or persistent lower back stiffness should not be ignored. Srikara’s approach starts with conservative management—including targeted epidural injections and core-stabilization therapy. If surgery is required, our surgeons utilize minimally invasive keyhole techniques that preserve muscle tissue and ensure a faster return to a pain-free life.',
    author: 'Spine Center',
    date: 'April 08, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    featured: false
  }
];

function BlogModal({ blog, onClose }) {
  const navigate = useNavigate();
  if (!blog) return null;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="overflow-y-auto">
            <div className="relative h-[300px] md:h-[400px]">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-6 left-10">
                <span className="px-4 py-1.5 rounded-full bg-[#8B1A4A] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="px-10 py-12">
              <div className="flex items-center gap-6 mb-8 text-[#A0AEC0] text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><Clock size={14} /> {blog.readTime}</div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                <div>{blog.date}</div>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-[#1A202C] mb-8 leading-tight tracking-tight">
                {blog.title}
              </h2>

              <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[#1A202C] font-bold">{blog.author}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Srikara Clinical Board</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-[#4A5568] leading-[1.8] font-medium mb-12">
                <p>{blog.fullContent}</p>
                <p className="mt-6">At Srikara Hospitals, we believe that education is the first step toward better health outcomes. Our multi-specialty teams work around the clock to bring you these insights directly from the surgical theater and the research lab.</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    openWhatsAppBooking({
                      message: `Hello Srikara Hospitals, I was reading "${blog.title}" and would like to book a consultation.`
                    });
                    onClose();
                  }}
                  className="flex items-center gap-2 bg-[#8B1A4A] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#6c1439] transition-all cursor-pointer"
                >
                  <BookOpen size={16} /> Book Consultation
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 border border-gray-200 text-gray-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  <Share2 size={16} /> Share Article
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

export const LuxuryBlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-[#8B1A4A]/5 px-4 py-2 rounded-full mb-6 border border-[#8B1A4A]/10"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B1A4A] animate-pulse" />
              <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.4em]">The Clinical Journal</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-[#1A202C] tracking-tighter leading-none"
            >
              Medical <span className="text-[#8B1A4A]">Insights</span> <br /> & Breakthroughs
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-[#8B1A4A] font-black text-xs uppercase tracking-[0.3em] border-b-2 border-[#8B1A4A] pb-2 hover:gap-6 transition-all duration-300"
          >
            Explore Library <ArrowUpRight size={18} />
          </motion.button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedBlog(blogs[0])}
            className="lg:col-span-12 xl:col-span-8 group cursor-pointer"
          >
            <div className="relative h-[400px] md:h-[540px] rounded-[3rem] overflow-hidden mb-8 shadow-2xl border border-[#EDF2F7]">
              <img 
                src={blogs[0].image} 
                alt={blogs[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div className="flex items-center gap-4 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    {blogs[0].category}
                  </span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {blogs[0].readTime}</span>
                </div>
                <h3 className="text-white text-3xl md:text-5xl font-black mb-6 max-w-3xl leading-tight">
                  {blogs[0].title}
                </h3>
                <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8 font-medium">
                  {blogs[0].excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{blogs[0].author}</p>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{blogs[0].date}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar / Supporting Posts */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-10">
            {blogs.slice(1).map((blog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                onClick={() => setSelectedBlog(blog)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative h-60 rounded-[2.5rem] overflow-hidden mb-6 border border-[#EDF2F7] shadow-lg">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#8B1A4A] text-[9px] font-black uppercase tracking-widest shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[#A0AEC0] text-[9px] font-bold uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E2E8F0]" />
                    <span>{blog.date}</span>
                  </div>
                  <h4 className="text-[#1A202C] text-xl font-black mb-3 group-hover:text-[#8B1A4A] transition-colors line-clamp-2 leading-tight">
                    {blog.title}
                  </h4>
                  <p className="text-[#718096] text-sm leading-relaxed line-clamp-2 font-medium">
                    {blog.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Modal */}
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />

      </div>
    </section>
  );
};
