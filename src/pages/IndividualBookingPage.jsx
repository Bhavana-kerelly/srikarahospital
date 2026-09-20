import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin, ShieldCheck, Calendar, ArrowLeft } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ALL_DOCTORS } from '@/data/doctors'
import { openWhatsAppBooking } from '@/lib/whatsapp'

export function IndividualBookingPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const doctor = ALL_DOCTORS.find(d => d.slug === slug)
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [preferredDate, setPreferredDate] = useState('')

  const getTodayStr = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleMobileChange = (e) => {
    const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
    setMobile(numericOnly)
  }

  const handleMobileKeyDown = (e) => {
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      return
    }
    if (e.ctrlKey || e.metaKey) {
      return
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  }

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-[#94A3B8] text-xl mb-4">Doctor not found</p>
          <button onClick={() => navigate('/doctors')} className="text-[#8B1A4A] font-bold hover:underline">← Back to Doctors</button>
        </div>
      </div>
    )
  }

  const handleBooking = (e) => {
    e.preventDefault()
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.')
      return
    }
    openWhatsAppBooking({
      doctor,
      patientPhone: mobile,
      message: `Hello Srikara Hospitals, I would like to book an appointment with Dr. ${doctor.name} (${doctor.specialty}) at ${doctor.branch} branch.${fullName ? ` Patient Name: ${fullName}.` : ''}${mobile ? ` Contact: ${mobile}.` : ''}${preferredDate ? ` Preferred Date: ${preferredDate}.` : ''}`
    })
  }

  return (
    <>
      <Helmet><title>Book Appointment with {doctor.name} | Srikara Hospitals</title></Helmet>
      <div className="min-h-screen bg-[#F8FAFC] font-body text-[#1A202C] antialiased flex flex-col">
        <StickyNavbar />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-24">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#64748B] hover:text-[#8B1A4A] transition-colors mb-8 text-sm font-bold">
            <ArrowLeft size={16} /> Back
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 min-h-[560px]">
              <div className="md:col-span-2 bg-[#0D1B2A] p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#8B1A4A]" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1A4A]/70 mb-8 block">Booking Summary</span>
                  <h2 className="font-bold text-3xl text-white leading-tight mb-8">Confirm Your <span className="text-[#8B1A4A]">Appointment.</span></h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center text-[#8B1A4A] shadow-md border border-white/10">
                         <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" onError={e => { if (doctor.fallback) e.target.src = doctor.fallback }} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Consultant</p>
                        <p className="font-semibold text-white">{doctor.name}</p>
                        <p className="text-xs text-white/50">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#8B1A4A] border border-white/10"><MapPin size={20} /></div>
                      <div>
                        <p className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Branch</p>
                        <p className="font-semibold text-white">{doctor.branch}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <ShieldCheck size={14} className="text-[#8B1A4A]" />
                  <span className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Secure & Confidential</span>
                </div>
              </div>

              <div className="md:col-span-3 p-10 flex flex-col justify-center">
                <form className="space-y-6" onSubmit={handleBooking}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#8B1A4A]">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name" 
                        required 
                        className="w-full h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 outline-none focus:border-[#8B1A4A] text-[#1A202C] text-sm transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#8B1A4A]">Mobile Number</label>
                      <input 
                        type="tel" 
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={mobile}
                        onChange={handleMobileChange}
                        onKeyDown={handleMobileKeyDown}
                        placeholder="10-digit mobile number" 
                        required 
                        className="w-full h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 outline-none focus:border-[#8B1A4A] text-[#1A202C] text-sm transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8B1A4A]">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={15} />
                      <input 
                        type="date" 
                        min={getTodayStr()} 
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        required 
                        className="w-full h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 outline-none focus:border-[#8B1A4A] text-[#1A202C] text-sm transition-all" 
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-sm uppercase tracking-widest transition-all focus:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer">
                      <span>Book on WhatsApp</span>
                      <span>→</span>
                    </button>
                    <p className="text-center text-[#94A3B8] text-xs mt-4">Opens WhatsApp with prefilled doctor & booking details</p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </main>
        
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
