import { mockBranches } from '../data/mockBranches';
import { useState } from 'react';

export function NetworkAvailability() {
  const [dateFilter, setDateFilter] = useState('Today');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Network Availability</h1>
          <p className="text-gray-500 mt-1">Real-time availability monitoring across all branches</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-lg border border-gray-300 p-1 flex text-sm font-medium shadow-sm">
            <button 
              className={`px-4 py-1.5 rounded-md transition-colors ${dateFilter === 'Today' ? 'bg-[#1a2c47] text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setDateFilter('Today')}
            >
              Today
            </button>
            <button 
              className={`px-4 py-1.5 rounded-md transition-colors ${dateFilter === 'Tomorrow' ? 'bg-[#1a2c47] text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setDateFilter('Tomorrow')}
            >
              Tomorrow
            </button>
            <button 
              className={`px-4 py-1.5 rounded-md transition-colors ${dateFilter === 'Next 7 Days' ? 'bg-[#1a2c47] text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setDateFilter('Next 7 Days')}
            >
              Next 7 Days
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockBranches.map((branch, idx) => {
          // Generate mock availability data for each branch based on its capacity
          const totalSlots = branch.capacity * 2; // Assuming 2 shifts
          const booked = Math.floor(totalSlots * (Math.random() * 0.6 + 0.3));
          const available = totalSlots - booked;
          const occupancy = Math.round((booked / totalSlots) * 100);
          
          let statusBadge;
          if (branch.status === 'Offline') {
            statusBadge = <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold border border-gray-200">⚪ Offline</span>;
          } else if (occupancy >= 95) {
            statusBadge = <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold border border-red-200">🔴 Full</span>;
          } else if (occupancy >= 80) {
            statusBadge = <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold border border-amber-200">🟡 Limited</span>;
          } else {
            statusBadge = <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold border border-emerald-200">🟢 Available</span>;
          }

          return (
            <div key={branch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-6">
              
              <div className="md:w-1/4 flex flex-col">
                <div className="font-bold text-gray-900 text-lg">{branch.name}</div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span>{branch.units} Unit{branch.units > 1 ? 's' : ''}</span>
                  <span className="text-gray-300">•</span>
                  <span>Cap: {branch.capacity}</span>
                </div>
              </div>

              <div className="md:w-2/4 grid grid-cols-3 gap-4 w-full">
                <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Slots</div>
                  <div className="text-xl font-bold text-gray-800">{totalSlots}</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Booked</div>
                  <div className="text-xl font-bold text-[#1a2c47]">{booked}</div>
                </div>
                <div className={`text-center p-3 rounded-lg border ${branch.status === 'Offline' ? 'bg-gray-50 border-gray-200' : available > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${branch.status === 'Offline' ? 'text-gray-500' : available > 0 ? 'text-emerald-700' : 'text-red-700'}`}>Available</div>
                  <div className={`text-xl font-bold ${branch.status === 'Offline' ? 'text-gray-600' : available > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {branch.status === 'Offline' ? '-' : available}
                  </div>
                </div>
              </div>

              <div className="md:w-1/4 flex flex-col items-end gap-3 w-full">
                <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
                    <div className="mt-1">{statusBadge}</div>
                  </div>
                </div>
                <button className="text-[#cca830] font-semibold text-sm hover:text-[#b08e23] transition-colors">
                  View Details →
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
