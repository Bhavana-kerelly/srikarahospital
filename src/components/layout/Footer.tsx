import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartHandshake, PhoneCall, ExternalLink } from 'lucide-react';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F2444] border border-slate-700 text-white flex items-center justify-center font-black">
                <Activity className="w-6 h-6 text-[#0D9488]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none font-display">
                  SRIKARA
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#0D9488] uppercase mt-0.5">
                  Dialysis Care Network
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Real-time dialysis availability and patient booking network across Srikara Hospitals.
              Empowering patients with reliable, predictable, and dignified renal care access.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>Directly integrated with Srikara Central Clinical Operations.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Patient Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/find-dialysis" className="hover:text-white transition-colors">
                  Find Dialysis Slots
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-white transition-colors">
                  Manage My Bookings
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Patient Portal Login
                </Link>
              </li>
              <li>
                <Link to="/#locations" className="hover:text-white transition-colors">
                  Dialysis Center Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Dialysis Care Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Dialysis Care
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>High-Flux Hemodialysis</li>
              <li>Sustained Low-Efficiency Dialysis</li>
              <li>ICU / Inpatient Dialysis Support</li>
              <li>Bicarbonate Dialysis Units</li>
              <li>Dedicated Seronegative & Isolated Stations</li>
            </ul>
          </div>

          {/* Patient Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Patient Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  Booking Process Guide
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-400 block mt-2">
                  Emergency Medical Notice:
                </span>
                <span className="text-xs text-slate-400 leading-snug block">
                  This online system handles scheduled maintenance dialysis. For urgent nephrology emergencies, please proceed immediately to the nearest hospital casualty.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Srikara Hospitals Group. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Patient Bill of Rights</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
