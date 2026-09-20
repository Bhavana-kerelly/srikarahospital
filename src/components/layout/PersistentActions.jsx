import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PersistentActions() {
  const navigate = useNavigate();

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[300] hidden lg:flex flex-col gap-0.5">
      {/* Book Doctor */}
      <button 
        onClick={() => navigate('/doctors')}
        className="group bg-[#8B1A4A] text-white py-4 px-2.5 flex flex-col items-center gap-2 hover:bg-[#6c1439] transition-all border-b border-white/10"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <span className="text-[10px] font-black uppercase tracking-widest">Book Doctor</span>
        <Calendar size={18} className="rotate-180" />
      </button>

      {/* Quick Phone */}
      <a 
        href="tel:+919247958308"
        title="Call 92479 58308"
        className="bg-[#526071] text-white p-3 flex items-center justify-center hover:bg-[#404c5a] transition-all border-b border-white/10"
      >
        <Phone size={20} />
      </a>

      {/* Quick WhatsApp */}
      <a 
        href="https://wa.me/919247958308" 
        target="_blank" 
        rel="noopener noreferrer"
        title="WhatsApp 92479 58308"
        className="bg-[#25D366] text-white p-3 flex items-center justify-center hover:bg-[#20bd5a] transition-all rounded-bl-xl"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
