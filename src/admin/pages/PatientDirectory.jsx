import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

// Generate some mock patients
const generateMockPatients = () => {
  const statuses = ['Active', 'Active', 'Active', 'Inactive'];
  const patients = [];
  
  for (let i = 1; i <= 15; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    patients.push({
      id: `PT-${3000 + i}`,
      name: `Patient ${String.fromCharCode(64 + i)}`,
      mobile: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      uhid: `UHID-${10000 + i}`,
      branch: branch.name,
      lastBooking: new Date(2026, 8, 10 + Math.floor(Math.random() * 5)).toLocaleDateString('en-GB'),
      upcomingBooking: Math.random() > 0.3 ? new Date(2026, 8, 18 + Math.floor(Math.random() * 5)).toLocaleDateString('en-GB') : 'None',
      status: status
    });
  }
  return patients;
};

const mockPatients = generateMockPatients();

export function PatientDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('All Branches');

  const filteredPatients = mockPatients.filter(pt => {
    const matchesSearch = pt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pt.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pt.mobile.includes(searchTerm);
    const matchesBranch = branchFilter === 'All Branches' || pt.branch === branchFilter;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Directory</h1>
          <p className="text-gray-500 mt-1">Network-level patient overview</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
              <input 
                type="text"
                placeholder="Search Name, ID, UHID, Mobile..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2c47] focus:border-transparent outline-none shadow-sm text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#1a2c47] outline-none"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option>All Branches</option>
              {mockBranches.map(b => <option key={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredPatients.length} patients
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">Patient Info</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Primary Branch</th>
                <th className="p-4">Last Booking</th>
                <th className="p-4">Upcoming Booking</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map(pt => (
                <tr key={pt.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="font-semibold text-[#1a2c47]">{pt.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{pt.id} • {pt.uhid}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-700 text-sm">{pt.mobile}</td>
                  <td className="p-4 font-medium text-gray-700 text-sm">{pt.branch}</td>
                  <td className="p-4 text-sm text-gray-600">{pt.lastBooking}</td>
                  <td className="p-4 text-sm font-medium">
                    {pt.upcomingBooking === 'None' 
                      ? <span className="text-gray-400">None</span> 
                      : <span className="text-emerald-600">{pt.upcomingBooking}</span>}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      pt.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pt.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {pt.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No patients found.
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
