import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { BranchSideNav } from '@/components/layout/BranchSideNav'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { AppointmentWidget } from '@/components/sections/AppointmentWidget'
import { VideoHero } from '@/components/sections/VideoHero'
import { PremiumDiseasesSearch } from '@/components/sections/PremiumDiseasesSearch'
import { LuxuryCentersOfExcellence } from '@/components/sections/LuxuryCentersOfExcellence'
import { PremiumDoctorFinder } from '@/components/sections/PremiumDoctorFinder'
import { PremiumCaseStudies } from '@/components/sections/PremiumCaseStudies'
import { PremiumLocation } from '@/components/sections/PremiumLocation'
import { PremiumLocationsSection } from '@/components/sections/PremiumLocationsSection'
import { DepartmentSearch } from '@/components/sections/DepartmentSearch'
import { ecil as branch } from '@/data/branches/ecil'
import { openWhatsAppBooking } from '@/lib/whatsapp'

export function EcilPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Srikara Hospitals {branch.title} | {branch.subtitle}</title>
        <meta name="description" content={branch.description} />
      </Helmet>

      <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
        <StickyNavbar currentBranch={branch} />
        <BranchSideNav currentSlug={branch.slug} />

        {/* 1. HERO - Moved outside the padded div to be full horizontal screen */}
        <VideoHero branch={branch}>
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-[1px] bg-[#8B1A4A]" />
              <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-sm">
                Srikara Hospitals — {branch.title} Branch
              </span>
            </motion.div>
            <h1 className="font-headline font-extrabold tracking-tighter mb-5 md:mb-6">
              <span className="hero-line-1 block text-[28px] md:text-5xl lg:text-7xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                {branch.heroHeadline}
              </span>
              <span className="hero-line-2 block text-[26px] md:text-5xl lg:text-7xl hero-gradient-text">
                {branch.heroHighlight}
              </span>
            </h1>
            <p className="hero-desc text-sm md:text-lg text-white/70 max-w-xl mb-6 md:mb-8 leading-relaxed">
              {branch.description}
            </p>
            <div className="hero-btn-wrap flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <button
                onClick={() => openWhatsAppBooking({ branch })}
                className="w-full sm:w-auto min-h-[48px] bg-[#8B1A4A] text-white px-8 py-3 md:py-4 rounded-full font-label font-bold uppercase tracking-widest shadow-lg hover:bg-[#2D3A4A] transition-all duration-300 text-sm md:text-base"
              >
                Book an Appointment
              </button>
              <button
                onClick={() => navigate('/specialties')}
                className="w-full sm:w-auto min-h-[48px] bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 md:py-4 rounded-full font-label font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-sm md:text-base"
              >
                Explore Specialties
              </button>
            </div>
          </div>

          {/* Quick Stats Grid - Premium Unified Design */}
          <div className="absolute bottom-12 right-8 lg:right-20 hidden md:flex gap-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl min-w-[180px]">
              <div className="text-3xl font-black text-white">27K+</div>
              <div className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase">Successful Surgeries</div>
            </div>
            <div className="bg-[#C41E3A]/40 backdrop-blur-xl border border-white/20 p-6 rounded-2xl min-w-[180px]">
              <div className="text-3xl font-black text-white">99%</div>
              <div className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase text-pink-200">Success Rate</div>
            </div>
          </div>
        </VideoHero>

        <div className="xl:pl-16">

          {/* 1.5 DEPARTMENT SEARCH */}
          <DepartmentSearch />

          {/* 2. CENTERS OF EXCELLENCE */}
          <LuxuryCentersOfExcellence />

          {/* 2.5 NETWORK LOCATIONS */}
          <PremiumLocationsSection />

          {/* 3. CLINICAL ENCYCLOPEDIA */}
          <section className="pt-12 pb-0 px-8">
            <div className="max-w-7xl mx-auto">
              <PremiumDiseasesSearch />
            </div>
          </section>


          {/* 5. PREMIUM DOCTOR FINDER */}
          <PremiumDoctorFinder branchTitle={branch.title} branchId={branch.title} />

          {/* 6. INFRASTRUCTURE */}
          {branch.infrastructure && (
            <section className="pt-12 pb-20 bg-surface-container-low px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                  <h2 className="font-headline text-4xl font-extrabold text-[#8B1A4A] tracking-tight uppercase mb-3">
                    Precision Ecosystem
                  </h2>
                  <p className="text-[#4A4A4A] max-w-2xl mx-auto">
                    We invest in the future of healthcare so you can invest in your health.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {branch.infrastructure.map((item, i) => (
                    <div key={i} className="group relative rounded-3xl overflow-hidden h-80">
                      <img
                        src={item.image || (i === 0
                          ? `${import.meta.env.BASE_URL}indian_robotic_surgery.png`
                          : `${import.meta.env.BASE_URL}indian_general_surgery.png`
                        )}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent flex flex-col justify-end p-8`}>
                        <h4 className="text-white font-headline text-2xl font-bold mb-2">{item.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 6.5 CASE STUDIES */}
          <PremiumCaseStudies />

          {/* 7. PREMIUM LOCATION & REVIEWS */}
          <PremiumLocation branch={branch} />



        </div>

        <AppointmentWidget currentBranch={branch} />
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
