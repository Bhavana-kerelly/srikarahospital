import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

const generateMockLogs = () => {
  const roles = ['Branch Admin', 'Dialysis Staff', 'Super Admin', 'Central Operations', 'System'];
  const actions = ['Booking created', 'Booking confirmed', 'Booking rejected', 'Booking cancelled', 'Slot blocked', 'Patient information updated', 'User permissions changed'];
  const logs = [];
  
  for (let i = 1; i <= 25; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const date = new Date(Date.now() - Math.floor(Math.random() * 86400000) * i);
    
    logs.push({
      id: `LOG-${9000 + i}`,
      date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      user: role === 'System' ? 'System' : `User ${String.fromCharCode(64 + (i%26 + 1))}`,
      role: role,
      action: action,
      branch: role === 'System' || role === 'Super Admin' ? 'Network' : branch.name,
      resource: action.includes('Booking') ? `BK-20${i}5` : (action.includes('Slot') ? 'Slot 2:00 PM' : 'User Settings'),
      details: 'Action performed successfully via web portal.'
    });
  }
  return logs;
};

const mockLogs = generateMockLogs();

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = mockLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-500 mt-1">Network-wide security and action history</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
          <span>⬇️</span> Download CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input 
              type="text"
              placeholder="Search Action, User, Branch..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2c47] focus:border-transparent outline-none shadow-sm text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredLogs.length} events found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">Timestamp</th>
                <th className="p-4">User & Role</th>
                <th className="p-4">Action</th>
                <th className="p-4">Location</th>
                <th className="p-4">Resource</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors font-mono">
                  <td className="p-4">
                    <div className="text-gray-800">{log.date}</div>
                    <div className="text-gray-500 text-xs">{log.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-[#1a2c47]">{log.user}</div>
                    <div className="text-xs text-gray-500 font-sans mt-0.5">{log.role}</div>
                  </td>
                  <td className="p-4 font-semibold text-gray-700">{log.action}</td>
                  <td className="p-4 text-gray-600">{log.branch}</td>
                  <td className="p-4 text-gray-600">{log.resource}</td>
                  <td className="p-4 text-gray-500 text-xs truncate max-w-[200px]" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
