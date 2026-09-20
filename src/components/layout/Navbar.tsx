import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, User, PhoneCall, Activity } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection for subtle shadow elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Find Dialysis', href: '/find-dialysis' },
    { label: 'My Bookings', href: '/my-bookings' },
    { label: 'Help & FAQ', href: '/#faq' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/#')) return false;
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 backdrop-blur-md ${
        scrolled ? 'border-b border-[#E2E8F0] shadow-sm' : 'border-b border-[#F1F5F9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / Wordmark */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-md p-1"
              aria-label="Srikara Dialysis Care Home"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0F2444] text-white flex items-center justify-center font-black shadow-sm group-hover:bg-[#16325B] transition-colors">
                <Activity className="w-6 h-6 text-[#0D9488]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#0F2444] leading-none font-display">
                  SRIKARA
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#0D9488] uppercase mt-0.5">
                  Dialysis Care
                </span>
              </div>
            </Link>

            {/* Dialysis Network Tag */}
            <span className="hidden xl:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
              Patient Care Network
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold'
                      : 'text-[#334155] hover:text-[#0F2444] hover:bg-[#F8FAFC]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side CTA & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#334155] hover:text-[#0F2444] hover:bg-[#F8FAFC] rounded-md transition-colors"
            >
              <User className="w-4 h-4 text-[#64748B]" />
              <span>Login / Profile</span>
            </Link>

            <Button
              variant="primary"
              size="md"
              leftIcon={<Calendar className="w-4 h-4 text-[#38BDF8]" />}
              onClick={() => navigate('/find-dialysis')}
            >
              Find a Dialysis Slot
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-btn text-[#334155] hover:text-[#0F2444] hover:bg-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-3 duration-200"
          role="navigation"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 text-base font-medium rounded-btn transition-colors ${
                    active
                      ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold'
                      : 'text-[#334155] hover:bg-[#F8FAFC]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2.5">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[#0F2444] border border-[#CBD5E1] rounded-btn hover:bg-[#F8FAFC]"
            >
              <User className="w-4 h-4 text-[#64748B]" />
              <span>Login / Patient Profile</span>
            </Link>

            <Button
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Calendar className="w-4 h-4 text-[#38BDF8]" />}
              onClick={() => navigate('/find-dialysis')}
            >
              Find a Dialysis Slot
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
