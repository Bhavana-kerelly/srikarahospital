import React, { useState } from 'react';
import { CalendarRange, Search, PauseCircle, PlayCircle, Edit3, XCircle } from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';

export const HospitalRecurring: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  
  const [schedules, setSchedules] = useState([
    {
      id: "REC-001",
      patient: "Rajesh Kumar",
      schedule: "Mon/Wed/Fri — 10:00 AM",
      nextSession: "Friday, 19 Sep",
      status: "Active"
    },
    {
      id: "REC-002",
      patient: "Sunita Sharma",
      schedule: "Tue/Thu/Sat — 02:00 PM",
      nextSession: "Thursday, 18 Sep",
      status: "Active"
    },
    {
      id: "REC-003",
      patient: "Mohammad Ali",
      schedule: "Mon/Thu — 06:00 AM",
      nextSession: "Monday, 22 Sep",
      status: "Paused"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusToggle = (id: string) => {
    setSchedules(schedules.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' };
      }
      return s;
    }));
  };

  const filteredSchedules = schedules.filter(s => 
    s.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Recurring Schedules</h2>
          <p className="text-sm text-slate-500">Manage ongoing patient dialysis patterns for {currentBranch?.name || currentBranch?.title}.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary-hover focus:border-primary-hover bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-6 py-3 font-semibold">Schedule Pattern</th>
                <th className="px-6 py-3 font-semibold">Next Session</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchedules.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.patient}</td>
                  <td className="px-6 py-4 text-slate-700">
                    <span className="flex items-center gap-2">
                      <CalendarRange className="h-4 w-4 text-slate-400" />
                      {item.schedule}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{item.nextSession}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border
                      ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20" title="View Schedule">
                        <CalendarRange className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20" title="Modify">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleStatusToggle(item.id)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-transparent hover:border-amber-200" 
                        title={item.status === 'Active' ? 'Pause' : 'Resume'}
                      >
                        {item.status === 'Active' ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200" title="Cancel">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
