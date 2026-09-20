import { mockNetworkStats } from '../data/mockStats';
import { mockBranches } from '../data/mockBranches';
import { Link } from 'react-router-dom';

export function CentralDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Srikara Dialysis Network</h1>
          <p className="text-gray-500 mt-1">Network Overview</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin-portal/network-availability" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">View Availability</Link>
          <Link to="/admin-portal/bookings" className="px-4 py-2 bg-[#1a2c47] text-white rounded-lg text-sm font-semibold hover:bg-[#122036] transition-colors shadow-sm">Manage Bookings</Link>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Capacity', value: mockNetworkStats.totalCapacity, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Confirmed Bookings', value: mockNetworkStats.confirmedBookings, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Available Slots', value: mockNetworkStats.availableSlots, color: 'text-[#cca830]', bg: 'bg-amber-50' },
          { label: 'Pending Requests', value: mockNetworkStats.pendingRequests, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Cancelled', value: mockNetworkStats.cancelled, color: 'text-gray-600', bg: 'bg-gray-100' },
          { label: 'No-Shows', value: mockNetworkStats.noShows, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</span>
             <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Overview & Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Operational Overview</h3>
            <span className="text-xs bg-[#1a2c47] text-white px-2 py-1 rounded">Today</span>
          </div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
               <div className="text-2xl font-bold text-gray-800">{mockNetworkStats.totalBranches}</div>
               <div className="text-xs text-gray-500 mt-1 uppercase font-semibold">Total Branches</div>
             </div>
             <div className="text-center p-3 rounded-lg bg-emerald-50 border border-emerald-100">
               <div className="text-2xl font-bold text-emerald-700">{mockNetworkStats.branchesWithAvailability}</div>
               <div className="text-xs text-emerald-600 mt-1 uppercase font-semibold">With Availability</div>
             </div>
             <div className="text-center p-3 rounded-lg bg-amber-50 border border-amber-100">
               <div className="text-2xl font-bold text-amber-700">{mockNetworkStats.branchesNearCapacity}</div>
               <div className="text-xs text-amber-600 mt-1 uppercase font-semibold">Near Capacity</div>
             </div>
             <div className="text-center p-3 rounded-lg bg-red-50 border border-red-100">
               <div className="text-2xl font-bold text-red-700">{mockNetworkStats.branchesFull}</div>
               <div className="text-xs text-red-600 mt-1 uppercase font-semibold">Branches Full</div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-red-500">⚠️</span> Network Alerts
            </h3>
          </div>
          <div className="p-0 flex-1 overflow-y-auto">
             <div className="p-4 border-b border-gray-100 flex items-start gap-3 bg-red-50">
               <span className="text-red-500 mt-0.5">🚨</span>
               <div>
                 <p className="text-sm font-semibold text-red-800">Integration Issue</p>
                 <p className="text-xs text-red-600 mt-0.5">Branch {mockBranches[4]?.name} integration offline.</p>
               </div>
             </div>
             <div className="p-4 border-b border-gray-100 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
               <span className="text-amber-500 mt-0.5">⚡</span>
               <div>
                 <p className="text-sm font-semibold text-gray-800">Capacity Warning</p>
                 <p className="text-xs text-gray-500 mt-0.5">Branch {mockBranches[3]?.name} nearing full capacity.</p>
               </div>
             </div>
             <div className="p-4 border-b border-gray-100 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
               <span className="text-blue-500 mt-0.5">📋</span>
               <div>
                 <p className="text-sm font-semibold text-gray-800">Pending Requests</p>
                 <p className="text-xs text-gray-500 mt-0.5">12 new booking requests require approval.</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Branch Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Branch Comparison</h3>
          <div className="flex gap-2">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-700 shadow-sm focus:ring-1 focus:ring-[#1a2c47]">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 border-b border-gray-200">Branch</th>
                <th className="p-4 border-b border-gray-200 text-right">Capacity</th>
                <th className="p-4 border-b border-gray-200 text-right">Booked</th>
                <th className="p-4 border-b border-gray-200 text-right">Available</th>
                <th className="p-4 border-b border-gray-200 text-center">Occupancy</th>
                <th className="p-4 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockBranches.map((branch, idx) => {
                const booked = Math.floor(branch.capacity * (Math.random() * 0.5 + 0.4));
                const available = branch.capacity - booked;
                const occupancy = Math.round((booked / branch.capacity) * 100);
                
                return (
                  <tr key={branch.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <td className="p-4">
                      <div className="font-semibold text-gray-800 group-hover:text-[#1a2c47] transition-colors">{branch.name}</div>
                      <div className="text-xs text-gray-500">{branch.id}</div>
                    </td>
                    <td className="p-4 text-right font-medium text-gray-700">{branch.capacity}</td>
                    <td className="p-4 text-right font-medium text-gray-700">{booked}</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${
                        available === 0 ? 'bg-red-100 text-red-700' :
                        available <= 3 ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {available}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="text-xs font-medium w-8 text-right">{occupancy}%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              occupancy >= 90 ? 'bg-red-500' :
                              occupancy >= 75 ? 'bg-amber-500' :
                              'bg-emerald-500'
                            }`}
                            style={{ width: `${occupancy}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                         branch.status === 'Connected' ? 'bg-green-100 text-green-800 border border-green-200' :
                         'bg-gray-100 text-gray-800 border border-gray-200'
                       }`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${branch.status === 'Connected' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                         {branch.status}
                       </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
