import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, ChevronRight, MapPin, Stethoscope, Calendar, 
  User, Mail, Phone, X, Star, Award, 
  Activity, Heart, Brain, Bone, Baby, Zap, ShieldCheck 
} from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { branches } from '@/data/branches'
import { ALL_DOCTORS, ACCENT_MAP } from '@/data/doctors'
import { openWhatsAppBooking } from '@/lib/whatsapp'

// Maps branch.title → the exact branch string used in ALL_DOCTORS
const BRANCH_TITLE_TO_DOCTOR_BRANCH = {
  'LB Nagar':     'L.B. Nagar',
  'RTC X Roads':  'RTC X Roads',
  'Peerzadiguda': 'Peerzadiguda',
  'ECIL':         'ECIL',
  'Kompally':     'Kompally',
  'Lakdikapul':   'Lakdikapul',
  'Miyapur':      'Miyapur',
  'Vijayawada':   'Vijayawada',
  'Rajahmundry':  'Rajahmundry',
}

const SPECIALTY_ICONS = {
  ortho:      Bone,
  cardio:     Heart,
  neuro:      Brain,
  neurosurg:  Brain,
  gyn:        Baby,
  general:    Stethoscope,
  urology:    ShieldCheck,
  physician:  Stethoscope,
  nephro:     Activity,
  onco:       Zap,
  spine:      Brain,
  peds:       Baby,
  pulmo:      Activity,
  ent:        Stethoscope,
  physio:     Activity,
  anesthesia: Zap,
  plastic:    Star,
  critical:   Heart,
  dermo:      ShieldCheck,
  dental:     ShieldCheck,
  psych:      Brain,
  radio:      Activity,
  path:       Activity,
}

export function BookAppointmentPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedSpec, setSelectedSpec] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
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

  const handleConfirmAppointment = (e) => {
    e.preventDefault()
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.')
      return
    }
    openWhatsAppBooking({
      doctor: selectedDoc,
      branch: selectedBranch?.title,
      specialty: selectedSpec?.name,
      patientPhone: mobile,
      message: `Hello Srikara Hospitals, I would like to book an appointment with Dr. ${selectedDoc?.name || 'a specialist'} (${selectedSpec?.name || selectedDoc?.specialty || 'Consultation'}) at ${selectedBranch?.title || 'Srikara Hospitals'}.${fullName ? ` Patient Name: ${fullName}.` : ''}${mobile ? ` Contact: ${mobile}.` : ''}${preferredDate ? ` Preferred Date: ${preferredDate}.` : ''}`
    })
    setIsBookingOpen(false)
    setMobile('')
    setFullName('')
    setPreferredDate('')
  }

  // Specialties available for the selected branch
  const availableSpecialties = useMemo(() => {
    if (!selectedBranch) return []
    const doctorBranch = BRANCH_TITLE_TO_DOCTOR_BRANCH[selectedBranch.title] || selectedBranch.title
    const branchDocs = ALL_DOCTORS.filter(d => d.branch === doctorBranch)
    const seen = new Set()
    return branchDocs
      .filter(d => { if (seen.has(d.specialtyId)) return false; seen.add(d.specialtyId); return true })
      .map(d => ({
        id: d.specialtyId,
        name: d.specialty,
        icon: SPECIALTY_ICONS[d.specialtyId] || Stethoscope,
        count: branchDocs.filter(x => x.specialtyId === d.specialtyId).length,
      }))
  }, [selectedBranch])

  // Doctors filtered by branch + specialty, deduplicated by slug
  const filteredDoctors = useMemo(() => {
    if (!selectedBranch || !selectedSpec) return []
    const doctorBranch = BRANCH_TITLE_TO_DOCTOR_BRANCH[selectedBranch.title] || selectedBranch.title
    const seen = new Set()
    return ALL_DOCTORS.filter(d => {
      if (d.branch !== doctorBranch) return false
      if (d.specialtyId !== selectedSpec.id) return false
      if (seen.has(d.slug)) return false
      seen.add(d.slug)
      return true
    })
  }, [selectedBranch, selectedSpec])

  const steps = [
    { id: 1, label: 'Choose Location' },
    { id: 2, label: 'Select Specialty' },
    { id: 3, label: 'Choose Consultant' },
    { id: 4, label: 'Reserve Slot' },
  ]

  const handleBooking = (doc) => {
    setSelectedDoc(doc)
    setIsBookingOpen(true)
  }

  return (
    <>
      <Helmet>
        <title>Reserve a Consultation | Srikara Hospitals Luxury</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC] font-body text-[#1A202C] antialiased">
        <StickyNavbar />

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-24 relative z-10">
          
          {/* Step Tracker */}
          <div className="text-center mb-16 pt-0">

            {/* Progress Bar Container */}
            <div className="max-w-xl mx-auto relative mt-6 px-6">
               <div className="absolute top-[22px] left-0 w-full h-[1px] bg-[#E2E8F0]" />
               <motion.div 
                 className="absolute top-[22px] left-0 h-[1px] bg-gradient-to-r from-[#8B1A4A] to-[#2D3A4A]"
                 initial={{ width: 0 }}
                 animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
               />
               <div className="flex justify-between relative">
                  {steps.map((s) => (
                    <div key={s.id} className="group flex flex-col items-center">
                       <button
                         onClick={() => s.id < step && setStep(s.id)}
                         className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-black transition-all duration-700 z-10 border ${
                           step >= s.id 
                           ? 'bg-[#8B1A4A] border-[#8B1A4A] text-white shadow-lg scale-110' 
                           : 'bg-white border-[#E2E8F0] text-[#94A3B8]'
                         }`}
                       >
                         {step > s.id ? '✓' : s.id}
                       </button>
                       <span className={`mt-2 sm:mt-4 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-center ${step >= s.id ? 'text-[#8B1A4A]' : 'text-[#94A3B8]'}`}>{s.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Journey Steps Section */}
          <main className="min-h-[500px]">
             <AnimatePresence mode="wait">
               {step === 1 && (
                 <motion.div 
                   key="locations"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -30 }}
                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                 >
                   {branches.map((b) => (
                     <div 
                       key={b.slug}
                       onClick={() => { setSelectedBranch(b); setStep(2); }}
                       className="group relative h-[200px] sm:h-[320px] rounded-3xl overflow-hidden cursor-pointer border border-[#E2E8F0] hover:border-[#8B1A4A]/40 hover:shadow-[0_20px_60px_rgba(139,26,74,0.12)] transition-all duration-500"
                     >
                       <img src={b.heroImage} alt={b.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                       <div className="absolute inset-0 p-8 flex flex-col justify-end">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#8B1A4A] mb-2 opacity-0 group-hover:opacity-100 transition-all">Select →</span>
                          <h3 className="font-headline text-2xl font-bold text-white">{b.title}</h3>
                          <p className="text-white/60 text-xs mt-2 flex items-center gap-1.5">
                            <MapPin size={12} /> {b.address}
                          </p>
                       </div>
                     </div>
                   ))}
                 </motion.div>
               )}

               {step === 2 && (
                 <motion.div 
                   key="specialty"
                   initial={{ opacity: 0, x: 40 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -40 }}
                   className="max-w-4xl mx-auto"
                 >
                   {availableSpecialties.length === 0 ? (
                     <p className="text-center text-[#94A3B8] py-16">No specialties found for this branch.</p>
                   ) : (
                   <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                       {availableSpecialties.map((s) => (
                         <button
                           key={s.id}
                           onClick={() => { setSelectedSpec(s); setStep(3); }}
                           className={`group w-full sm:min-w-[180px] sm:w-auto p-5 sm:p-8 rounded-3xl border transition-all duration-300 ${
                             selectedSpec?.id === s.id 
                             ? 'bg-[#8B1A4A] border-[#8B1A4A] shadow-lg' 
                             : 'bg-white border-[#E2E8F0] hover:border-[#8B1A4A]/40 hover:shadow-md'
                           }`}
                         >
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                             selectedSpec?.id === s.id ? 'bg-white/20 text-white' : 'bg-[#8B1A4A]/5 text-[#8B1A4A]'
                           }`}>
                             <s.icon size={28} />
                           </div>
                           <h4 className={`font-bold text-xl mb-1 ${selectedSpec?.id === s.id ? 'text-white' : 'text-[#1A202C]'}`}>{s.name}</h4>
                           <p className={`text-xs font-semibold ${selectedSpec?.id === s.id ? 'text-white/70' : 'text-[#94A3B8]'}`}>{s.count} Doctor{s.count !== 1 ? 's' : ''}</p>
                         </button>
                       ))}
                     </div>
                   )}
                   <div className="text-center mt-12">
                      <button onClick={() => setStep(1)} className="text-[#8B1A4A] text-xs font-bold uppercase tracking-widest hover:underline">← Back to Locations</button>
                   </div>
                 </motion.div>
               )}

               {step === 3 && (
                 <motion.div 
                   key="doctors"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto"
                 >
                   {filteredDoctors.length === 0 ? (
                     <div className="lg:col-span-2 text-center py-16">
                       <p className="text-[#94A3B8] text-lg">No doctors found for this specialty at this branch.</p>
                     </div>
                   ) : filteredDoctors.map((doc, i) => (
                     <motion.div 
                       key={doc.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.08 }}
                       className="group bg-white border border-[#E2E8F0] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 hover:border-[#8B1A4A]/30 hover:shadow-lg transition-all duration-300"
                     >
                        <div className="w-28 h-28 shrink-0">
                           <img src={doc.image} alt={doc.name}
                             className="w-full h-full rounded-full object-cover object-[center_15%] border-4 border-[#F8FAFC]"
                             onError={e => { if (doc.fallback) e.target.src = doc.fallback }} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1A4A] block mb-1">{doc.label}</span>
                           <h3 className="font-bold text-2xl text-[#1A202C] mb-1">{doc.name}</h3>
                           <p className="text-[#64748B] text-xs mb-2">{doc.sub}</p>
                           <div className="flex items-center justify-center md:justify-start gap-3 mb-6 text-[#64748B] text-xs font-semibold">
                              <span><Star size={12} className="inline text-[#8B1A4A] -mt-0.5 mr-1" />{doc.rating}</span>
                              <span>{doc.exp}</span>
                           </div>
                           <div className="flex flex-col sm:flex-row gap-2.5">
                              <button 
                                onClick={() => openWhatsAppBooking({ 
                                  doctor: doc, 
                                  branch: selectedBranch?.title, 
                                  specialty: selectedSpec?.name 
                                })}
                                className="flex-1 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                              >
                                <span>Book on WhatsApp</span>
                              </button>
                              <button 
                                onClick={() => handleBooking(doc)}
                                className="px-5 h-12 bg-[#8B1A4A] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#7a1640] transition-all cursor-pointer"
                              >
                                Details
                              </button>
                            </div>
                        </div>
                     </motion.div>
                   ))}
                   <div className="lg:col-span-2 text-center mt-8">
                      <button onClick={() => setStep(2)} className="text-[#8B1A4A] text-xs font-bold uppercase tracking-widest hover:underline">← Back to Specialties</button>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </main>
        </div>

        {/* Booking Overlay (Deep Luxury) */}
        <AnimatePresence>
          {isBookingOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsBookingOpen(false)}
                 className="absolute inset-0 bg-black/40 backdrop-blur-sm"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 30 }}
                 className="relative w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-2xl"
               >
                 <button onClick={() => setIsBookingOpen(false)} className="absolute top-6 right-6 text-[#94A3B8] hover:text-[#1A202C] transition-colors z-20">
                    <X size={24} />
                 </button>

                 <div className="grid grid-cols-1 md:grid-cols-5 min-h-[560px]">
                    <div className="md:col-span-2 bg-[#0D1B2A] p-10 flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-1 bg-[#8B1A4A]" />
                       <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1A4A]/70 mb-8 block">Booking Summary</span>
                          <h2 className="font-bold text-3xl text-white leading-tight mb-8">Confirm Your <span className="text-[#8B1A4A]">Appointment.</span></h2>
                          <div className="space-y-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8B1A4A]"><User size={18} /></div>
                                <div>
                                   <p className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Consultant</p>
                                   <p className="font-semibold text-white">{selectedDoc?.name}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8B1A4A]"><MapPin size={18} /></div>
                                <div>
                                   <p className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Branch</p>
                                   <p className="font-semibold text-white">{selectedBranch?.title}</p>
                                </div>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 pt-8">
                          <ShieldCheck size={14} className="text-[#8B1A4A]" />
                          <span className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Secure & Confidential</span>
                       </div>
                    </div>

                    <div className="md:col-span-3 p-10">
                       <form className="space-y-6" onSubmit={handleConfirmAppointment}>
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
                             <button className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                                <span>Book on WhatsApp</span>
                                <span>→</span>
                             </button>
                             <p className="text-center text-[#94A3B8] text-xs mt-4">Opens WhatsApp with prefilled appointment details</p>
                          </div>
                       </form>
                    </div>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>{/* end light bg wrapper */}

      <Footer />
      <MobileBottomNav />
    </>
  )
}
