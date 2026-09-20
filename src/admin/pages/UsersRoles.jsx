import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

const generateMockUsers = () => {
  const roles = ['Super Admin', 'Central Operations', 'Branch Admin', 'Dialysis Staff', 'Read-only'];
  const users = [];
  
  for (let i = 1; i <= 15; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    users.push({
      id: `USR-${8000 + i}`,
      name: `Employee ${String.fromCharCode(64 + i)}`,
      empId: `EMP-${1000 + i}`,
      email: `emp${i}@srikarahospitals.com`,
      mobile: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      branch: ['Super Admin', 'Central Operations'].includes(role) ? 'All Branches (Network)' : branch.name,
      role: role,
      status: Math.random() > 0.1 ? 'Active' : 'Disabled'
    });
  }
  return users;
};

const mockUsers = generateMockUsers();

export function UsersRoles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Roles</h1>
          <p className="text-gray-500 mt-1">Manage network access and permissions</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#1a2c47] text-white rounded-lg text-sm font-semibold hover:bg-[#122036] transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input 
              type="text"
              placeholder="Search Name or Employee ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2c47] focus:border-transparent outline-none shadow-sm text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredUsers.length} users
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">User</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Branch Assignment</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2c47]/10 text-[#1a2c47] flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.empId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700">{user.email}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{user.mobile}</div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${user.branch.includes('All Branches') ? 'text-[#cca830]' : 'text-gray-700'}`}>
                      {user.branch}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-semibold text-gray-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-[#1a2c47] hover:bg-gray-100 rounded transition-colors" title="Edit">✏️</button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded transition-colors" title="Disable">🚫</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Add New User</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#1a2c47]" placeholder="e.g. Dr. Jane Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Employee ID</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#1a2c47]" placeholder="e.g. EMP-1045" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#1a2c47]" placeholder="jane.doe@srikarahospitals.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#1a2c47]" placeholder="+91" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#1a2c47]">
                  <option>Select Role</option>
                  <option>Super Admin</option>
                  <option>Central Operations</option>
                  <option>Branch Admin</option>
                  <option>Dialysis Staff</option>
                  <option>Read-only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Branch Assignment</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#1a2c47]">
                  <option>All Branches (Network Level)</option>
                  {mockBranches.map(b => <option key={b.id}>{b.name}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Super Admins and Central Operations should have network-level access.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100">Cancel</button>
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-[#1a2c47] text-white rounded-lg text-sm font-semibold hover:bg-[#122036]">Save User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
