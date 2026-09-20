export function Configuration() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration</h1>
          <p className="text-gray-500 mt-1">Network-level operational settings</p>
        </div>
        <button className="px-4 py-2 bg-[#1a2c47] text-white rounded-lg text-sm font-semibold hover:bg-[#122036] transition-colors shadow-sm">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-[#1a2c47] text-[#1a2c47] font-semibold cursor-pointer">Booking Rules</div>
          <div className="p-4 bg-transparent hover:bg-gray-50 rounded-xl text-gray-600 font-medium cursor-pointer transition-colors">Cancellation Rules</div>
          <div className="p-4 bg-transparent hover:bg-gray-50 rounded-xl text-gray-600 font-medium cursor-pointer transition-colors">Notification Preferences</div>
          <div className="p-4 bg-transparent hover:bg-gray-50 rounded-xl text-gray-600 font-medium cursor-pointer transition-colors">Operational Settings</div>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Booking Rules</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Max Advance Booking (Days)</label>
              <input type="number" defaultValue={30} className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1a2c47] focus:border-[#1a2c47]" />
              <p className="text-xs text-gray-500 mt-1">How far in advance a patient can book a slot.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Buffer Time Between Slots (Minutes)</label>
              <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1a2c47] focus:border-[#1a2c47]">
                <option>15</option>
                <option selected>30</option>
                <option>45</option>
                <option>60</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="auto-confirm" defaultChecked className="w-4 h-4 text-[#1a2c47] border-gray-300 rounded focus:ring-[#1a2c47]" />
              <label htmlFor="auto-confirm" className="text-sm font-medium text-gray-700">Auto-confirm bookings when slots are available</label>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="waitlist-auto" defaultChecked className="w-4 h-4 text-[#1a2c47] border-gray-300 rounded focus:ring-[#1a2c47]" />
              <label htmlFor="waitlist-auto" className="text-sm font-medium text-gray-700">Automatically notify waitlist when slots open</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
