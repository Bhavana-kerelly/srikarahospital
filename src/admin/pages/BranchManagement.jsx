import { mockBranches } from '../data/mockBranches';
import { useState } from 'react';

export function BranchManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = mockBranches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
          <p className="text-gray-500 mt-1">Manage network branches</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">Export List</button>
          <button className="px-4 py-2 bg-[#1a2c47] text-white rounded-lg text-sm font-semibold hover:bg-[#122036] transition-colors shadow-sm flex items-center gap-2">
            <span>+</span> Add Branch
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input 
              type="text"
              placeholder="Search branches..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2c47] focus:border-transparent outline-none shadow-sm text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Showing {filteredBranches.length} branches
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">Branch Details</th>
                <th className="p-4">Contact</th>
                <th className="p-4 text-center">Units</th>
                <th className="p-4 text-center">Capacity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBranches.map(branch => (
                <tr key={branch.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-[#1a2c47] transition-colors">{branch.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{branch.id} • {branch.city}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700">{branch.phone}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{branch.email}</div>
                  </td>
                  <td className="p-4 text-center font-medium text-gray-700">{branch.units}</td>
                  <td className="p-4 text-center font-medium text-gray-700">{branch.capacity}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                         branch.status === 'Connected' ? 'bg-green-100 text-green-800 border border-green-200' :
                         'bg-gray-100 text-gray-800 border border-gray-200'
                       }`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${branch.status === 'Connected' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                         {branch.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-[#1a2c47] hover:bg-gray-100 rounded transition-colors" title="Edit Branch">✏️</button>
                      <button className="p-1.5 text-gray-400 hover:text-[#cca830] hover:bg-gray-100 rounded transition-colors" title="Manage Units">🛏️</button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors" title="View Availability">📊</button>
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
}
