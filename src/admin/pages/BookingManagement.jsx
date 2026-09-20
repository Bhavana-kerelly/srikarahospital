import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

// Generate some mock bookings
const generateMockBookings = () => {
  const statuses = ['Pending', 'Confirmed', 'Confirmed', 'Completed', 'Cancelled', 'No-show'];
  const bookings = [];
  
  for (let i = 1; i <= 20; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date(2026, 8, 17 + Math.floor(Math.random() * 5)); // Sep 17-21, 2026
    
    bookings.push({
      id: `BK-${2000 + i}`,
      patient: `Patient ${String.fromCharCode(64 + i)}`,
      mobile: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      uhid: `UHID-${10000 + i}`,
      branch: branch.name,
      date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: `${Math.floor(Math.random() * 8) + 8}:00 AM`,
      type: Math.random() > 0.3 ? 'Recurring' : 'One-time',
      status: status
    });
  }
  return bookings;
};

const mockBookings = generateMockBookings();

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All Branches');

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.patient.toLowerCase().includes(searchTerm.toLowerCase()) || booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    const matchesBranch = branchFilter === 'All Branches' || booking.branch === branchFilter;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 mt-1">Network-wide booking management</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
          <span>⬇️</span> Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 flex-1">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
              <input 
                type="text"
                placeholder="Search ID, Patient, Mobile..."
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

            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#1a2c47] outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>No-show</option>
            </select>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredBookings.length} results
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-200">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Patient Info</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Schedule</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length > 0 ? filteredBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-medium text-gray-900">{booking.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-[#1a2c47]">{booking.patient}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{booking.uhid} • {booking.mobile}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-700 text-sm">{booking.branch}</td>
                  <td className="p-4">
                    <div className="text-sm text-gray-800 font-medium">{booking.date}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{booking.time} • {booking.type}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      booking.status === 'No-show' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {booking.status === 'Pending' && (
                        <>
                          <button className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700">Confirm</button>
                          <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold border border-red-200 hover:bg-red-100">Reject</button>
                        </>
                      )}
                      <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50">View</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No bookings found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white text-sm">
           <div className="text-gray-500">Showing 1 to {filteredBookings.length} of {filteredBookings.length} entries</div>
           <div className="flex gap-1">
             <button className="px-3 py-1 border border-gray-300 rounded text-gray-500 bg-gray-50" disabled>Previous</button>
             <button className="px-3 py-1 border border-[#1a2c47] rounded bg-[#1a2c47] text-white">1</button>
             <button className="px-3 py-1 border border-gray-300 rounded text-gray-500 bg-gray-50" disabled>Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
