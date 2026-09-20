import { useState } from 'react';
import { mockBranches } from '../data/mockBranches';

const generateMockNotifications = () => {
  const types = [
    { type: 'Booking request', channel: 'In-app / Web' },
    { type: 'Booking confirmed', channel: 'SMS' },
    { type: 'Booking cancelled', channel: 'WhatsApp' },
    { type: 'Waitlist available', channel: 'Email' },
    { type: 'Reminder', channel: 'SMS' },
    { type: 'Hospital action required', channel: 'In-app / Web' }
  ];
  const notifications = [];
  
  for (let i = 1; i <= 20; i++) {
    const branch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
    const t = types[Math.floor(Math.random() * types.length)];
    
    notifications.push({
      id: `NOT-${1000 + i}`,
      message: `${t.type} for ${branch.name}. ${Math.random() > 0.5 ? 'Patient action needed.' : 'System updated.'}`,
      branch: branch.name,
      type: t.type,
      channel: t.channel,
      status: Math.random() > 0.3 ? 'Read' : 'Unread',
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000) * i).toLocaleString('en-GB')
    });
  }
  return notifications;
};

const mockNotifications = generateMockNotifications();

export function NotificationCenter() {
  const [filter, setFilter] = useState('All');

  const filteredNotifications = mockNotifications.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return n.status === 'Unread';
    return n.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-500 mt-1">Network alerts and communications</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 border-r border-gray-100 bg-gray-50 p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Filters</h3>
          <ul className="space-y-1">
            {['All', 'Unread', 'Booking request', 'Hospital action required', 'Waitlist available', 'Reminder'].map(f => (
              <li key={f}>
                <button 
                  onClick={() => setFilter(f)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-[#1a2c47] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  {f} {f === 'Unread' && <span className="float-right bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{mockNotifications.filter(n => n.status === 'Unread').length}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map(notif => (
              <div key={notif.id} className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${notif.status === 'Unread' ? 'bg-blue-50/30' : ''}`}>
                <div className="mt-1">
                  {notif.type.includes('Booking') ? <span className="text-xl">📅</span> :
                   notif.type.includes('action') ? <span className="text-xl">⚠️</span> :
                   notif.type.includes('Waitlist') ? <span className="text-xl">⏳</span> :
                   <span className="text-xl">ℹ️</span>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm ${notif.status === 'Unread' ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                      {notif.type} • <span className="text-gray-500 font-normal">{notif.branch}</span>
                    </h4>
                    <span className="text-xs text-gray-500">{notif.timestamp}</span>
                  </div>
                  <p className={`text-sm ${notif.status === 'Unread' ? 'text-gray-800' : 'text-gray-600'}`}>
                    {notif.message}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200">
                      Via: {notif.channel}
                    </span>
                  </div>
                </div>
                {notif.status === 'Unread' && (
                  <div className="flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
            {filteredNotifications.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No notifications found for this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
