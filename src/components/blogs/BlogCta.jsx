import { useNavigate } from 'react-router-dom'
import { Calendar, Phone, MapPin, ArrowRight } from 'lucide-react'
import { openWhatsAppBooking } from '@/lib/whatsapp'

export function BlogCta() {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1628] via-[#162744] to-[#0a1628] text-white p-8 sm:p-12 my-14 shadow-2xl border border-white/10">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#8B1A4A]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#cca830]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#8B1A4A] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          Expert Clinical Care
        </span>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline font-black tracking-tight leading-tight mb-4 text-white">
          Have Questions About Your Health? <br className="hidden sm:inline" />
          <span className="text-[#cca830] italic font-serif font-light">Talk to Our Specialists Today.</span>
        </h3>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-light">
          Whether you need a second opinion on robotic joint surgery, cardiac evaluation, spine assessment, or comprehensive preventive screening, Srikara Hospitals' senior consultants are here to guide your recovery.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => openWhatsAppBooking({ message: "Hello Srikara Hospitals, I would like to book a consultation with a specialist." })}
            className="flex items-center justify-center gap-2 bg-[#8B1A4A] hover:bg-[#a31f57] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(139,26,74,0.4)] transition-all hover:scale-105 cursor-pointer text-center"
          >
            <Calendar size={15} />
            <span>Book Consultation</span>
          </button>

          <button
            onClick={() => navigate('/branches')}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer text-center"
          >
            <MapPin size={15} />
            <span>Locate Nearest Branch</span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default BlogCta
