import React, { useState } from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';

export const HospitalHeader: React.FC = () => {
  const { currentBranch, user } = useHospitalAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  // Simple breadcrumb logic based on pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || 'dashboard';
  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ');

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left side: Breadcrumb & Title */}
      <div className="flex flex-col">
        <div className="flex items-center text-xs text-slate-500">
          <span>Hospital Portal</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-900">{pageTitle}</span>
        </div>
        <h1 className="text-lg font-semibold text-slate-900 leading-tight">{pageTitle}</h1>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Branch Info */}
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm font-semibold text-slate-900 leading-tight">{currentBranch?.name || currentBranch?.title || 'Srikara Branch'}</span>
          <span className="text-xs text-slate-500">Srikara Hospitals</span>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                <button className="text-xs text-primary hover:text-accent">Mark all as read</button>
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {/* Mock notification item */}
                <div className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <p className="text-sm text-slate-800">New dialysis booking received for Sita Devi.</p>
                  <p className="text-xs text-slate-500 mt-1">10 mins ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <p className="text-sm text-slate-800">Booking #BKG-1006 has been cancelled.</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button 
            className="flex items-center gap-3 rounded-full hover:bg-slate-50 p-1 pr-2 transition-colors"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-accent">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left mr-2">
              <span className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'Hospital Staff'}</span>
              <span className="text-xs text-slate-500 mt-1">{user?.role || 'Staff'}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-medium text-slate-900">Dr. Anil Kumar</p>
                <p className="text-xs text-slate-500 truncate">anil.kumar@srikara.com</p>
              </div>
              <div className="py-1">
                <a href="#profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Your Profile</a>
                <a href="#settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Settings</a>
              </div>
              <div className="border-t border-slate-100 py-1">
                <a href="/hospital-portal" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
