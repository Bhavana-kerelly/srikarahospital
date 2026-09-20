import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';

export const HospitalSchedule: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  const [view, setView] = useState('Day');

  // Generate slots based on a deterministic seed for the branch
  const seed = currentBranch?.slug ? currentBranch.slug.length : 4;
  const numSlots = 3 + (seed % 3); // 3 to 5 slots
  const times = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  
  const generateGrid = () => {
    const grid: any = {};
    times.forEach((t, i) => {
      grid[t] = [];
      for(let s=0; s<numSlots; s++) {
        let status = 'AVAILABLE';
        let patient = '—';
        
        const r = (i + s + seed) % 10;
        if (r < 5) {
          status = 'BOOKED';
          patient = `Patient ${String.fromCharCode(65 + r + s)}`;
        } else if (r === 9) {
          status = 'BLOCKED';
        }
        
        grid[t].push({ status, patient });
      }
    });
    return grid;
  };

  const scheduleGrid = generateGrid();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Daily Calendar</h2>
          <p className="text-sm text-slate-500">Manage operational scheduling for {currentBranch?.name || currentBranch?.title}.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50">
            {['Day', 'Week', 'Month'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  view === v 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-primary/10 border border-primary/20"></div> Booked
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center justify-center text-[8px]">A</div> Available
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-200 text-slate-500 font-bold flex items-center justify-center text-[8px]">B</div> Blocked
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200 w-24 sticky left-0 bg-slate-50">TIME</th>
                {Array.from({ length: numSlots }).map((_, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-slate-700 text-center min-w-[150px]">
                    SLOT {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {times.map((time) => (
                <tr key={time} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-4 font-medium text-slate-900 border-r border-slate-200 sticky left-0 bg-white group-hover:bg-slate-50/50">
                    {time}
                  </td>
                  {scheduleGrid[time].map((slot: any, idx: number) => (
                    <td key={idx} className="p-2 text-center border-l border-slate-100 border-dashed">
                      {slot.status === 'AVAILABLE' ? (
                        <div className="mx-auto w-full max-w-[140px] rounded-lg border border-emerald-200 bg-emerald-50/50 py-2 px-3 text-emerald-700 text-xs font-medium cursor-pointer hover:bg-emerald-100 transition-colors">
                          AVAILABLE
                        </div>
                      ) : slot.status === 'BLOCKED' ? (
                        <div className="mx-auto w-full max-w-[140px] rounded-lg border border-slate-200 bg-slate-100 py-2 px-3 text-slate-500 text-xs font-medium">
                          BLOCKED
                        </div>
                      ) : (
                        <div className="mx-auto w-full max-w-[140px] rounded-lg border border-primary/20 bg-primary/5 py-2 px-3 text-blue-800 text-xs font-medium cursor-pointer hover:bg-primary/10 transition-colors shadow-sm">
                          {slot.patient}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
