import React, { useState } from 'react';
import { Save, AlertTriangle, ShieldAlert, Clock, Calendar, CheckCircle2, X } from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';
import { getBranchData } from '../../data/mockHospitalData';

export const HospitalAvailability: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  
  // Seed configurations based on branch
  const seed = currentBranch?.slug ? currentBranch.slug.length : 4;
  const initialConfigured = 20 + (seed % 15);
  const initialOperational = initialConfigured - (seed % 3);
  
  const [isSaved, setIsSaved] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const BlockSlotModal = () => {
    if (!showBlockModal) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-md flex flex-col shadow-xl">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              Block Slot
            </h2>
            <button 
              onClick={() => setShowBlockModal(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
              <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-primary-hover focus:border-primary-hover outline-none">
                <option>Machine maintenance</option>
                <option>Staff unavailable</option>
                <option>Hospital operational issue</option>
                <option>Reserved internally</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="date" className="w-full border border-slate-300 rounded-lg pl-9 p-2.5 text-sm bg-white focus:ring-2 focus:ring-primary-hover focus:border-primary-hover outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="time" className="w-full border border-slate-300 rounded-lg pl-9 p-2.5 text-sm bg-white focus:ring-2 focus:ring-primary-hover focus:border-primary-hover outline-none" />
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-amber-800 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Blocking a slot will prevent new bookings and notify staff of unavailability.
              </p>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
            <button 
              onClick={() => setShowBlockModal(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowBlockModal(false)}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Block Slot
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Availability Management</h2>
          <p className="text-sm text-slate-500">Configure units, slots, and block schedules for {currentBranch?.name || currentBranch?.title}.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowBlockModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-lg transition-colors shadow-sm"
          >
            <ShieldAlert className="h-4 w-4 text-red-500" />
            Block Slot
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-accent font-medium text-sm rounded-lg transition-colors shadow-sm"
          >
            {isSaved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {isSaved ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-900">Unit Configuration</h3>
        </div>
        
        <div className="p-6">
          <div className="max-w-3xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Unit Name</label>
                  <input 
                    type="text" 
                    defaultValue="Dialysis Unit 1"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-slate-50 text-slate-700 outline-none"
                    readOnly
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Operating Hours</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Opening</label>
                      <input 
                        type="time" 
                        defaultValue="06:00"
                        className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-hover focus:border-primary-hover outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Closing</label>
                      <input 
                        type="time" 
                        defaultValue="22:00"
                        className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-hover focus:border-primary-hover outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Capacity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Configured Capacity</label>
                      <input 
                        type="number" 
                        defaultValue={initialConfigured}
                        className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 text-slate-700 outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Operational Capacity</label>
                      <input 
                        type="number" 
                        defaultValue={initialOperational}
                        className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-hover focus:border-primary-hover outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-3">Slot Interval</h4>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="interval" className="text-primary focus:ring-primary-hover h-4 w-4" />
                      <span className="text-sm text-slate-700">30 min</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="interval" defaultChecked className="text-primary focus:ring-primary-hover h-4 w-4" />
                      <span className="text-sm text-slate-700">60 min</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="interval" className="text-primary focus:ring-primary-hover h-4 w-4" />
                      <span className="text-sm text-slate-700">Custom</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BlockSlotModal />
    </div>
  );
};
