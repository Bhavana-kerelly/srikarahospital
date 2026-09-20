import { mockBranches } from '../data/mockBranches';
import { useState } from 'react';

// Generate mock units
const generateMockUnits = () => {
  const units = [];
  mockBranches.forEach(branch => {
    for (let i = 0; i < branch.units; i++) {
      const unitChar = String.fromCharCode(65 + i);
      units.push({
        id: `unit-${branch.id}-${unitChar}`,
        branchId: branch.id,
        branchName: branch.name,
        name: `Dialysis Unit ${unitChar}`,
        machines: Math.floor(branch.capacity / branch.units),
        operational: Math.floor(branch.capacity / branch.units) - (Math.random() > 0.8 ? 1 : 0),
        hours: '06:00 AM – 10:00 PM',
        status: branch.status === 'Offline' ? 'Offline' : (Math.random() > 0.9 ? 'Maintenance' : 'Active')
      });
    }
  });
  return units;
};

const mockUnits = generateMockUnits();

export function DialysisUnits() {
  const [branchFilter, setBranchFilter] = useState('All Branches');

  const filteredUnits = mockUnits.filter(unit => 
    branchFilter === 'All Branches' || unit.branchName === branchFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dialysis Units</h1>
          <p className="text-gray-500 mt-1">Manage physical units and machines</p>
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
            {filteredUnits.length} units total
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50/50">
          {filteredUnits.map(unit => (
            <div key={unit.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[#1a2c47] text-lg">{unit.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{unit.branchName}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  unit.status === 'Active' ? 'bg-green-100 text-green-700' :
                  unit.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {unit.status}
                </span>
              </div>
              <div className="p-5 flex-1 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500 font-medium">Total Machines</span>
                  <span className="font-bold text-gray-800">{unit.machines}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500 font-medium">Operational</span>
                  <span className={`font-bold ${unit.operational < unit.machines ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {unit.operational}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Operating Hours</span>
                  <span className="font-semibold text-gray-700 text-sm">{unit.hours}</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">Edit Capacity</button>
                <button className="px-3 py-2 bg-[#1a2c47] text-white rounded-lg text-xs font-semibold hover:bg-[#122036] transition-colors">Manage Slots</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
