export function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Network-wide operational insights</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#1a2c47] text-white rounded-lg text-sm font-semibold hover:bg-[#122036] transition-colors shadow-sm">
            Generate PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[200px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Overall Network Occupancy</h3>
          <div className="text-4xl font-bold text-[#1a2c47] mb-2">76%</div>
          <p className="text-xs text-emerald-600 font-semibold">↑ 4% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[200px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Bookings</h3>
          <div className="text-4xl font-bold text-[#1a2c47] mb-2">1,248</div>
          <p className="text-xs text-emerald-600 font-semibold">↑ 12% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[200px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Cancellation Rate</h3>
          <div className="text-4xl font-bold text-[#1a2c47] mb-2">3.2%</div>
          <p className="text-xs text-amber-600 font-semibold">↑ 0.5% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Booking Volume Trend</h3>
          </div>
          <div className="p-6 h-[300px] flex items-end gap-2 justify-between">
            {/* Mock Chart Bars */}
            {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
              <div key={i} className="w-full bg-blue-50 rounded-t relative group">
                <div className="absolute bottom-0 w-full bg-[#1a2c47] rounded-t transition-all group-hover:bg-[#cca830]" style={{height: `${h}%`}}></div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4 flex justify-between text-xs text-gray-500 font-semibold">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Highest Demand Branches</h3>
          </div>
          <div className="p-6 space-y-4">
            {/* Mock Chart Rows */}
            {[{n: 'Kompally', v: 92}, {n: 'LB Nagar', v: 88}, {n: 'Lakdikapul', v: 85}, {n: 'Miyapur', v: 76}].map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1 font-semibold text-gray-700">
                  <span>{b.n}</span>
                  <span>{b.v}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${b.v}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
