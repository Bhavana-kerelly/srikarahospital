import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { openWhatsAppBooking } from '@/lib/whatsapp'

const BRAND_CRIMSON = '#8B1A4A'
const TEXT_MUTED = '#94A3B8'

const FOOTER_DATA = [
  {
    title: 'Center of Excellence',
    links: [
      { name: 'Cardiology', path: '/specialties' },
      { name: 'Orthopaedics', path: '/specialties' },
      { name: 'Neurology', path: '/specialties' },
      { name: 'Gastroenterology', path: '/specialties' },
      { name: 'Nephrology', path: '/specialties' }
    ]
  },
  {
    title: 'Patient Care',
    links: [
      { name: 'Find a Doctor', path: '/doctors' },
      { name: 'Book Appointment', path: '/book' },
      { name: 'Health Checkups', path: '/services' },
      { name: 'Patient Testimonials', path: '#' },
      { name: 'Emergency Services', path: '/services' }
    ]
  },
  {
    title: 'Institutional',
    links: [
      { name: 'About Srikara', path: '/about' },
      { name: 'Our Branches', path: '/branches' },
      { name: 'Achievements', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'International Care', path: '#' }
    ]
  }
]

const SOCIAL_LINKS = [
  { icon: Facebook, url: 'https://www.facebook.com/srikarahospitals/' },
  { icon: Twitter, url: 'https://twitter.com/srikarahospital' },
  { icon: Instagram, url: 'https://www.instagram.com/srikarahospitals/' },
  { icon: Linkedin, url: 'https://www.linkedin.com/company/srikara-hospitals/' }
]

export function Footer() {
  return (
    <footer className="relative bg-[#0F172A] pt-16 pb-8 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B1A4A]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        
        {/* Top Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12 pb-12 border-b border-white/5">
          <div className="lg:col-span-4 max-w-sm">
            <Link to="/" className="inline-block mb-10 group">
               <div className="bg-white px-5 py-3 rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105">
                 <img 
                   src="https://i.ibb.co/CK9bqmXK/sri-logo.jpg" 
                   alt="Srikara Logo" 
                   className="h-8 object-contain" 
                 />
               </div>
            </Link>
            <p className="text-slate-400 text-[13px] leading-[1.8] mb-12 font-medium tracking-wide">
              Srikara Hospitals is a global leader in <span className="text-white font-bold">Robotic Healthcare</span>, 
              redefining the standards of orthopedic and multi-specialty clinical excellence through 
              innovation and compassionate service.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, backgroundColor: BRAND_CRIMSON, borderColor: BRAND_CRIMSON }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 pointer-events-auto"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {FOOTER_DATA.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-6" style={{ color: BRAND_CRIMSON }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.path === '/book' || link.name === 'Book Appointment' ? (
                        <button
                          onClick={() => openWhatsAppBooking()}
                          className="text-[13px] text-slate-400 hover:text-white transition-colors duration-300 flex items-center group cursor-pointer text-left"
                        >
                          <span className="w-0 group-hover:w-4 h-px bg-[#8B1A4A] transition-all duration-300 mr-0 group-hover:mr-3" />
                          {link.name}
                        </button>
                      ) : (
                        <Link 
                          to={link.path} 
                          className="text-[13px] text-slate-400 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <span className="w-0 group-hover:w-4 h-px bg-[#8B1A4A] transition-all duration-300 mr-0 group-hover:mr-3" />
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm mb-12">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#8B1A4A]/10 flex items-center justify-center text-[#8B1A4A]">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">24/7 Emergency & Appointments</p>
              <a href="tel:+919247958308" className="text-white font-black text-xl hover:text-[#cca830] transition-colors">
                +91 92479 58308
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#8B1A4A]/10 flex items-center justify-center text-[#8B1A4A]">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">General Inquiry</p>
              <p className="text-white font-black text-xl">info@srikarahospitals.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Srikara Hospitals Group. Architectural excellence in medicine.
          </p>
          <div className="flex gap-10">
             {['Privacy Policy', 'Terms of Service'].map(item => (
               <Link key={item} to="#" className="text-[10px] text-slate-500 hover:text-white font-black uppercase tracking-[0.2em] transition-colors">
                 {item}
               </Link>
             ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
