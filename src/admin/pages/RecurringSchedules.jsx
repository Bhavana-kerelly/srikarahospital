import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

const generateMockSchedules = () => {
  const schedules = [];
  const patterns = ['Mon/Wed/Fri — 10 AM', 'Tue/Thu/Sat — 02 PM', 'Mon/Wed/Fri — 06 AM', 'Tue/Thu — 09 AM'];
  
  for (let i = 1; i <= 10; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    schedules.push({
      id: `RS-${1000 + i}`,
      patient: `Patient ${String.fromCharCode(74 + i)}`,
      branch: branch.name,
      schedule: pattern,
      nextSession: new Date(2026, 8, 18 + Math.floor(Math.random() * 3)).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }),
      status: Math.random() > 0.1 ? 'Active' : 'Paused'
    });
  }
  return schedules;
};

const mockSchedules = generateMockSchedules();

export function RecurringSchedules() {
  const [branchFilter, setBranchFilter] = useState('All Branches');

  const filteredSchedules = mockSchedules.filter(sch => 
    branchFilter === 'All Branches' || sch.branch === branchFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recurring Schedules</h1>
          <p className="text-gray-500 mt-1">Manage ongoing dialysis schedules</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#1a2c47] outline-none min-w-[250px]"
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            <option>All Branches</option>
            {mockBranches.map(b => <option key={b.id}>{b.name}</option>)}
          </select>
          <div className="text-sm text-gray-500 font-medium">
            {filteredSchedules.length} active schedules
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">Patient</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Schedule Pattern</th>
                <th className="p-4">Next Session</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSchedules.map(sch => (
                <tr key={sch.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="font-semibold text-[#1a2c47]">{sch.patient}</div>
                    <div className="text-xs text-gray-500">{sch.id}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-700 text-sm">{sch.branch}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 text-xs font-semibold font-mono border border-gray-200">
                      {sch.schedule}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-gray-700 text-sm">{sch.nextSession}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      sch.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sch.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      {sch.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50">View</button>
                      <button className="px-3 py-1 bg-white border border-gray-300 text-[#1a2c47] rounded text-xs font-semibold hover:bg-gray-50">Modify</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No recurring schedules found for this branch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
