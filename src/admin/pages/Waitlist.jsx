import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

const generateMockWaitlist = () => {
  const waitlist = [];
  
  for (let i = 1; i <= 12; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    
    waitlist.push({
      id: `WL-${5000 + i}`,
      patient: `Patient ${String.fromCharCode(74 + i)}`,
      mobile: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      preferredBranch: branch.name,
      preferredDate: new Date(2026, 8, 17 + Math.floor(Math.random() * 3)).toLocaleDateString('en-GB'),
      preferredTime: `${Math.floor(Math.random() * 8) + 8}:00 AM`,
      priority: Math.random() > 0.7 ? 'High' : 'Normal',
      queuePosition: Math.floor(Math.random() * 5) + 1,
      status: 'Waiting'
    });
  }
  return waitlist;
};

const mockWaitlist = generateMockWaitlist();

export function Waitlist() {
  const [branchFilter, setBranchFilter] = useState('All Branches');

  const filteredWaitlist = mockWaitlist.filter(wl => 
    branchFilter === 'All Branches' || wl.preferredBranch === branchFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Network Waitlist</h1>
          <p className="text-gray-500 mt-1">Manage unfulfilled demand across branches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Waitlist', value: mockWaitlist.length, color: 'text-gray-800', bg: 'bg-white' },
          { label: 'High Priority', value: mockWaitlist.filter(w => w.priority === 'High').length, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Waiting Today', value: mockWaitlist.filter(w => w.preferredDate === new Date(2026, 8, 17).toLocaleDateString('en-GB')).length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Available Matches', value: 3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => (
          <div key={idx} className={`rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col ${stat.bg}`}>
             <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{stat.label}</span>
             <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">Queue</th>
                <th className="p-4">Patient</th>
                <th className="p-4">Preferred Branch</th>
                <th className="p-4">Preferred Slot</th>
                <th className="p-4">Priority</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWaitlist.map(wl => (
                <tr key={wl.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold text-xs border border-gray-200">
                      #{wl.queuePosition}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-[#1a2c47]">{wl.patient}</div>
                    <div className="text-xs text-gray-500">{wl.mobile}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-700 text-sm">{wl.preferredBranch}</td>
                  <td className="p-4">
                    <div className="text-sm text-gray-800 font-medium">{wl.preferredDate}</div>
                    <div className="text-xs text-gray-500">{wl.preferredTime}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase ${
                      wl.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {wl.priority}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold hover:bg-emerald-100">Notify Match</button>
                      <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50">View</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredWaitlist.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No patients on the waitlist for this branch.
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
