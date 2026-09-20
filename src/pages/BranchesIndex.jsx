import { Link } from 'react-router-dom'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { MapPin, Phone, HeartPulse, ArrowRight } from 'lucide-react'
import { branches } from '@/data/branches'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export function BranchesIndex() {
  return (
    <>
      <Helmet>
        <title>Our Centers | Srikara Hospitals</title>
        <meta name="description" content="Find a Srikara Hospital near you. 9 centers across Telangana and Andhra Pradesh." />
      </Helmet>

      {/* Very light warm white background with subtle overflow hidden for decorative elements */}
      <div className="min-h-screen bg-[#FDFDFE] relative overflow-hidden font-sans">
        
        {/* Subtle Decorative Background Elements */}
        {/* Right side blur */}
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#0F2444]/[0.02] blur-3xl rounded-full pointer-events-none z-0 animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-full h-[600px] bg-gradient-to-tl from-[#8B1A4A]/[0.02] to-transparent rounded-tl-[100%] pointer-events-none z-0" />
        
        <div className="relative z-20">
          <StickyNavbar />
        </div>
        <div className="pt-[76px]" />
        
        <section className="py-16 md:py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-[1280px]">
            
            {/* 5. TOP SECTION / PAGE HEADER */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 md:mb-20 relative z-10"
            >
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#8B1A4A]/30" />
                <span className="uppercase tracking-widest text-[13px] font-bold text-[#0F2444]">OUR CENTERS</span>
                <div className="h-[1px] w-12 bg-[#8B1A4A]/30" />
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-[44px] leading-tight font-bold text-[#0F2444] mb-4 max-w-4xl mx-auto">
                Care, Closer to You
              </h1>

              {/* Subheading */}
              <p className="text-[17px] md:text-[19px] text-[#475569] font-medium max-w-2xl mx-auto">
                Explore Srikara Hospitals across Telangana and Andhra Pradesh.
              </p>
            </motion.div>

            {/* HOSPITAL GRID (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-8 relative z-10">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                  className="group relative bg-white rounded-[16px] border border-gray-100/80 shadow-[0_4px_20px_-4px_rgba(15,36,68,0.04)] hover:shadow-[0_12px_30px_-6px_rgba(15,36,68,0.08)] hover:-translate-y-1 hover:border-gray-200/80 transition-all duration-300 flex overflow-hidden min-h-[220px]"
                >
                  {/* Left Side: Image (approx 40%) */}
                  <div className="w-[38%] md:w-[40%] relative overflow-hidden bg-gray-50 flex-shrink-0">
                    <img 
                      src={branch.heroImage || '/placeholder-hospital.jpg'} 
                      alt={branch.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Right Side: Information */}
                  <div className="w-[62%] md:w-[60%] p-4 md:p-5 flex flex-col relative bg-white">
                    
                    {/* Open Status Pill - Made it Magenta to match the image precisely */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-pink-50 px-2 py-0.5 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A4A]" />
                      <span className="text-[10px] font-bold text-[#8B1A4A] tracking-wide">Open</span>
                    </div>

                    {/* Hospital Name & Specialty */}
                    <div className="mb-3 pr-12">
                      <h3 className="font-bold text-[18px] md:text-[20px] text-[#0F2444] leading-tight mb-1">
                        {branch.title}
                      </h3>
                      <p className="text-[12px] md:text-[13px] text-[#64748B] font-medium leading-snug line-clamp-2">
                        {branch.subtitle}
                      </p>
                    </div>

                    {/* Address & Phone */}
                    <div className="space-y-2 mb-4 flex-grow">
                      <div className="flex items-start gap-2 text-[12px] md:text-[13px] text-[#475569] leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 mt-[2px] text-[#8B1A4A] flex-shrink-0" strokeWidth={2.5} />
                        <span className="line-clamp-2">{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#475569] font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#8B1A4A] flex-shrink-0" strokeWidth={2.5} />
                        <span>{branch.phone}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-auto">
                      <Link to={`/branches/${branch.slug}`} className="block w-full">
                        <button className="flex items-center justify-center gap-2 w-[140px] py-[6px] rounded-full border border-[#8B1A4A] text-[#8B1A4A] text-[12px] font-bold group/btn hover:bg-[#8B1A4A] hover:text-white transition-colors duration-300">
                          View Details 
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* FINAL ROW / SUPPORTING SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-1 md:col-span-2 rounded-[16px] p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-transparent"
              >
                <div className="relative z-10 w-full max-w-[500px] mx-auto flex flex-col items-center">
                  <div className="mb-4 text-[#8B1A4A]">
                    <HeartPulse className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[24px] md:text-[28px] font-bold mb-3 leading-tight tracking-tight">
                    <span className="text-[#0F2444]">Better Healthcare</span> <br/>
                    <span className="text-[#8B1A4A]">Across Every Region</span>
                  </h2>
                  <p className="text-[#475569] text-[14px] md:text-[15px] leading-relaxed font-medium">
                    From Hyderabad to Vijayawada, our hospitals are here for you.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
        <MobileBottomNav />

        {/* Global Keyframes for subtle animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}} />
      </div>
    </>
  )
}
