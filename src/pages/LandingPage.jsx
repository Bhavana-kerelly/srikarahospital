import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { VideoHero } from '@/components/sections/VideoHero'
import { LandingSpecialtiesGrid } from '@/components/sections/LandingSpecialtiesGrid'
import { PremiumLocationsSection } from '@/components/sections/PremiumLocationsSection'
import { InstitutionalTrust } from '@/components/sections/InstitutionalTrust'
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection'
import { lbNagar as branch } from '@/data/branches/lb-nagar'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { FounderVisionSection } from '@/components/sections/FounderVisionSection'
import { ClinicalLeadershipStats } from '@/components/sections/ClinicalLeadershipStats'
import { MedicalResourceCenter } from '@/components/sections/MedicalResourceCenter'
import { OurDoctorsSection } from '@/components/sections/OurDoctorsSection'
import { openWhatsAppBooking } from '@/lib/whatsapp'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Multispeciality Hospital | Srikara Hospitals</title>
        <meta name="description" content="Srikara Hospitals is a trusted multispeciality hospital offering advanced healthcare, experienced doctors, modern facilities, diagnostics, surgeries, and patient-focused care." />
      </Helmet>

      <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
        <StickyNavbar currentBranch={branch} />

        {/* Announcements Marquee Bar (Placed directly beneath fixed navbar) */}
        <div className="pt-[76px]">
          <AnnouncementBar />
        </div>

        <VideoHero branch={branch}>
          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-24">
            
            {/* Architectural Identity Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-12"
            >
               <span className="h-0.5 w-16 bg-[#8B1A4A]" />
               <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-lg">
                 SOUTH INDIA'S LEADING MULTISPECIALTY PROVIDER
               </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h1 className="text-white text-[clamp(2.4rem,5.85vw,5.1rem)] font-black leading-[0.96] tracking-[-0.03em] mb-8 sm:mb-10">
                Advanced Care. <br />
                <span className="text-[#8B1A4A]">Surgical <br /> Excellence.</span> <br />
                Patient <span className="italic font-serif font-light text-white/90">First.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row gap-12 items-start md:items-center border-t border-white/10 pt-12">
                <p className="text-white/70 text-lg font-medium max-w-xl leading-relaxed border-l-2 border-[#8B1A4A] pl-10">
                  Srikara Hospitals delivers advanced, patient-centric care across multiple specialties — combining clinical expertise, surgical excellence and modern technology to serve patients across Telangana and Andhra Pradesh.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => openWhatsAppBooking({ branch })}
                    className="bg-[#8B1A4A] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_40px_rgba(139,26,74,0.3)] hover:scale-105 transition-all text-center cursor-pointer"
                  >
                    BOOK AN APPOINTMENT
                  </button>
                  <button
                    onClick={() => navigate('/specialties')}
                    className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all text-center"
                  >
                    EXPLORE OUR SPECIALITIES
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </VideoHero>

        {/* Visionary Founder Section — Dr. Akhil Dadi */}
        <FounderVisionSection />

        {/* Clinical Leadership & Scale Statistics Section */}
        <ClinicalLeadershipStats />

        {/* Global Accreditations & Our Specialities */}
        <section id="specialties">
          <InstitutionalTrust />
        </section>

        {/* Medical Resource Center — Diseases & Conditions Clinical Search */}
        <MedicalResourceCenter />

        {/* Clinical Verticals Section */}
        <LandingSpecialtiesGrid />

        <section id="locations" className="bg-white">
          <PremiumLocationsSection />
        </section>

        {/* Our Doctors Showcase Section */}
        <OurDoctorsSection />

        {/* Patient Voices / Google Reviews Section */}
        <GoogleReviewsSection />

        <div className="xl:pl-0">

          <Footer />
          <MobileBottomNav />
        </div>
      </div>
    </>
  )
}

