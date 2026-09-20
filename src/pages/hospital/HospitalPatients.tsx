import React, { useState } from 'react';
import { Search, Filter, Eye, Download, CalendarClock, Phone, MoreHorizontal, CheckSquare } from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';
import { generateBookingsForBranch } from '../../data/mockHospitalData';

export const HospitalPatients: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  
  // Reuse bookings for patient schedule, grouped/filtered appropriately
  const [patients] = useState(() => {
    if (!currentBranch) return [];
    const b = generateBookingsForBranch(currentBranch.slug || currentBranch.id);
    return b.filter(booking => booking.status !== 'Cancelled' && booking.status !== 'No-show');
  });

  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(p => 
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Patient Schedule</h2>
          <p className="text-sm text-slate-500">Upcoming dialysis sessions for patients at {currentBranch?.name || currentBranch?.title}.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary-hover focus:border-primary-hover bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white transition-colors">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 py-2">
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-hover outline-none">
          <option>Date: Today</option>
          <option>Date: Tomorrow</option>
          <option>Date: Next 7 Days</option>
        </select>
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-hover outline-none">
          <option>All Units</option>
          <option>Dialysis Unit 1</option>
        </select>
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-hover outline-none">
          <option>All Statuses</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-hover outline-none">
          <option>All Booking Types</option>
          <option>Recurring</option>
          <option>One-time</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-6 py-3 font-semibold">Session Date</th>
                <th className="px-6 py-3 font-semibold">Unit & Time</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Booking Type</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {patient.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{patient.patientName}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          {patient.patientId} • <Phone className="h-3 w-3 ml-1" /> {patient.contact}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{patient.date}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{patient.shift}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{patient.unit}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{patient.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border
                      ${patient.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        patient.status === 'Completed' ? 'bg-primary/5 text-accent border-primary/20' :
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-slate-600 text-xs font-medium px-2.5 py-1 bg-slate-100 rounded-md">
                      {patient.bookingType === 'Recurring' ? <CheckSquare className="h-3 w-3" /> : <CalendarClock className="h-3 w-3" />}
                      {patient.bookingType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg font-medium text-xs border border-transparent hover:border-primary/20 transition-colors">
                        View Patient
                      </button>
                      <button className="text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg font-medium text-xs border border-transparent hover:border-slate-200 transition-colors">
                        View Booking
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPatients.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500">No patients found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
