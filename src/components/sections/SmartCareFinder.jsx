import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, User, MousePointer2, Sparkles, ChevronDown } from 'lucide-react';

export function SmartCareFinder() {
  const [activeTab, setActiveTab] = useState('find');
  const navigate = useNavigate();
  
  return (
    <div className="relative z-50 -mt-12 max-w-[1200px] mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-[#EDF2F7] overflow-hidden"
      >
        {/* Upper Tabs */}
        <div className="flex border-b border-[#EDF2F7]">
          <button 
            onClick={() => setActiveTab('find')}
            className={`flex-1 py-6 px-8 text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${
              activeTab === 'find' ? 'text-[#8B1A4A]' : 'text-[#A0AEC0] hover:text-[#4A4A4A]'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Search size={16} />
              Find Department & Doctors
            </div>
            {activeTab === 'find' && (
              <motion.div 
                layoutId="finderTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B1A4A]" 
              />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('assist')}
            className={`flex-1 py-6 px-8 text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${
              activeTab === 'assist' ? 'text-[#8B1A4A]' : 'text-[#A0AEC0] hover:text-[#4A4A4A]'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Sparkles size={16} />
              Booking Assistance
            </div>
            {activeTab === 'assist' && (
              <motion.div 
                layoutId="finderTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B1A4A]" 
              />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'find' ? (
              <motion.div 
                key="find"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex flex-wrap lg:flex-nowrap items-end gap-8"
              >
                {/* Treatment Field */}
                <div className="flex-1 min-w-[280px]">
                  <label className="block text-[10px] font-black text-[#A0AEC0] uppercase tracking-[0.3em] mb-4">
                    Search by Treatment
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-6 py-4 text-[#1A202C] font-bold text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#8B1A4A] transition-all">
                      <option>Select Procedure / Ailment</option>
                      <option>Robotic Knee Replacement</option>
                      <option>ACL Reconstruction</option>
                      <option>Spine Decompression</option>
                      <option>Kidney Stone Removal</option>
                      <option>Cardiac Bypass (CABG)</option>
                      <option>Hernia Surgery</option>
                      <option>Diabetes Management</option>
                      <option>Stroke Protocol</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none group-hover:text-[#8B1A4A] transition-colors" size={18} />
                  </div>
                </div>

                {/* Department Field */}
                <div className="flex-1 min-w-[280px]">
                  <label className="block text-[10px] font-black text-[#A0AEC0] uppercase tracking-[0.3em] mb-4">
                    Center of Excellence
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-6 py-4 text-[#1A202C] font-bold text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#8B1A4A] transition-all">
                      <option>Select Departments</option>
                      <option>Orthopaedics & Joint Replacement</option>
                      <option>Robotic Surgery Center</option>
                      <option>Neurosciences</option>
                      <option>Cardiology</option>
                      <option>Urology & Nephrology</option>
                      <option>Gastroenterology</option>
                      <option>Emergency & Critical Care</option>
                      <option>Physiotherapy & Rehab</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none group-hover:text-[#8B1A4A] transition-colors" size={18} />
                  </div>
                </div>

                {/* Action Area */}
                <div className="flex items-center gap-6 pb-1">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/doctors')}
                    className="bg-[#8B1A4A] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-[#8B1A4A]/20 flex items-center gap-3 hover:bg-[#6c1439] transition-all"
                  >
                    <Search size={18} />
                    Find Doctors
                  </motion.button>

                  <button 
                    onClick={() => navigate('/specialties')}
                    className="flex items-center gap-2 group whitespace-nowrap"
                  >
                    <span className="text-xs font-bold text-[#4A4A4A] group-hover:text-[#8B1A4A] transition-colors uppercase tracking-wider">
                      All Specialties
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1A202C] text-white flex items-center justify-center group-hover:bg-[#8B1A4A] transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="assist"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-wrap lg:flex-nowrap items-end gap-8"
              >
                {/* Name Field */}
                <div className="flex-1 min-w-[280px]">
                  <label className="block text-[10px] font-black text-[#A0AEC0] uppercase tracking-[0.3em] mb-4">
                    First Name / Full Name
                  </label>
                  <div className="relative group">
                    <input 
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-6 py-4 text-[#1A202C] font-bold text-sm focus:outline-none focus:border-[#8B1A4A] transition-all placeholder:text-[#CBD5E0]"
                    />
                    <User className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none group-hover:text-[#8B1A4A] transition-colors" size={18} />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="flex-1 min-w-[280px]">
                  <label className="block text-[10px] font-black text-[#A0AEC0] uppercase tracking-[0.3em] mb-4">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <input 
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10) }}
                      onKeyDown={(e) => {
                        if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) || e.ctrlKey || e.metaKey) return
                        if (!/^[0-9]$/.test(e.key)) e.preventDefault()
                      }}
                      placeholder="10-digit phone number"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-6 py-4 text-[#1A202C] font-bold text-sm focus:outline-none focus:border-[#8B1A4A] transition-all placeholder:text-[#CBD5E0]"
                    />
                    <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none group-hover:text-[#8B1A4A] transition-colors" size={18} />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="flex-1 min-w-[280px]">
                  <label className="block text-[10px] font-black text-[#A0AEC0] uppercase tracking-[0.3em] mb-4">
                    How can we help?
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-6 py-4 text-[#1A202C] font-bold text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#8B1A4A] transition-all">
                      <option>Quick Call Back</option>
                      <option>Appointment Inquiry</option>
                      <option>Surgery Estimate</option>
                      <option>Insurance Verification</option>
                      <option>Health Checkup Booking</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none group-hover:text-[#8B1A4A] transition-colors" size={18} />
                  </div>
                </div>

                {/* Action Area */}
                <div className="pb-1">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1A202C] text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-[#1A202C]/20 flex items-center gap-3 hover:bg-[#8B1A4A] transition-all whitespace-nowrap"
                  >
                    Request Call
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <div className="mt-6 flex justify-center gap-12 text-[#A0AEC0]">
        <div className="flex items-center gap-3 group cursor-pointer hover:text-[#4A4A4A] transition-colors">
          <div className="w-5 h-5 rounded-full bg-[#EDF2F7] flex items-center justify-center group-hover:bg-[#8B1A4A]/10">
            <User size={10} className="group-hover:text-[#8B1A4A]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Connect with our Patient Liaison</span>
        </div>
        <div className="flex items-center gap-3 group cursor-pointer hover:text-[#4A4A4A] transition-colors">
          <div className="w-5 h-5 rounded-full bg-[#EDF2F7] flex items-center justify-center group-hover:bg-[#8B1A4A]/10">
            <MousePointer2 size={10} className="group-hover:text-[#8B1A4A]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Digital Prescription Services</span>
        </div>
      </div>
    </div>
  );
}
