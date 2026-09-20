import React from 'react';
import { Outlet } from 'react-router-dom';
import { HospitalSidebar } from './HospitalSidebar';
import { HospitalHeader } from './HospitalHeader';

export const HospitalLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans">
      <HospitalSidebar />
      <div className="flex flex-1 flex-col pl-64 transition-all duration-300">
        <HospitalHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
