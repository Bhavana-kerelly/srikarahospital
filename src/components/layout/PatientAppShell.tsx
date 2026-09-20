import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PatientAppShell: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const hideNavbar = pathname === '/find-dialysis' || pathname.startsWith('/find-dialysis');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#DBEAFE] selection:text-[#1E40AF]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#2563EB] text-white font-semibold rounded-btn shadow-lg outline-none ring-2 ring-white"
      >
        Skip to main content
      </a>

      {/* Primary Patient Navbar */}
      {!hideNavbar && <Navbar />}

      {/* Main Page Region */}
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        <Outlet />
      </main>

      {/* Master Patient Footer */}
      <Footer />
    </div>
  );
};
