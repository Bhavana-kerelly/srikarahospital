import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { group: 'NETWORK', items: [
    { label: 'Dashboard', path: '/admin-portal/dashboard', icon: '📊' },
    { label: 'Network Availability', path: '/admin-portal/network-availability', icon: '🌍' },
  ]},
  { group: 'OPERATIONS', items: [
    { label: 'Bookings', path: '/admin-portal/bookings', icon: '📅' },
    { label: 'Patients', path: '/admin-portal/patients', icon: '👥' },
    { label: 'Recurring Schedules', path: '/admin-portal/recurring-schedules', icon: '🔄' },
    { label: 'Waitlist', path: '/admin-portal/waitlist', icon: '⏳' },
  ]},
  { group: 'INFRASTRUCTURE', items: [
    { label: 'Branches', path: '/admin-portal/branches', icon: '🏥' },
    { label: 'Dialysis Units', path: '/admin-portal/dialysis-units', icon: '🛏️' },
  ]},
  { group: 'ADMINISTRATION', items: [
    { label: 'Users & Roles', path: '/admin-portal/users', icon: '🧑‍💻' },
    { label: 'Notifications', path: '/admin-portal/notifications', icon: '🔔' },
    { label: 'Configuration', path: '/admin-portal/configuration', icon: '⚙️' },
    { label: 'Audit Logs', path: '/admin-portal/audit-logs', icon: '📜' },
  ]},
  { group: 'ANALYTICS', items: [
    { label: 'Reports & Analytics', path: '/admin-portal/reports', icon: '📈' },
  ]},
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a1628] text-white overflow-y-auto border-r border-[#1a2c47] flex flex-col z-20">
      <div className="p-6 border-b border-[#1a2c47] flex justify-center">
        <img src="/Srikara Hospitals, LB Nagar.png" alt="Srikara Logo" className="h-10 w-auto object-contain bg-white/90 p-1 rounded-lg" />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-8">
        {navItems.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {group.group}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={itemIdx}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors duration-200 text-sm ${
                        isActive 
                          ? 'bg-[#1e3455] text-white font-medium shadow-sm border border-[#2a4569]' 
                          : 'text-gray-400 hover:text-white hover:bg-[#14233a]'
                      }`}
                    >
                      <span className="text-lg opacity-80">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1a2c47] space-y-2">
        <Link to="/admin-portal/settings" className="flex items-center gap-3 px-2 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-[#14233a]">
          <span>⚙️</span> Settings
        </Link>
        <Link to="/admin-portal" className="flex items-center gap-3 px-2 py-2 text-sm text-gray-400 hover:text-[#ff4d4d] rounded-lg hover:bg-[#14233a]">
          <span>🚪</span> Logout
        </Link>
      </div>
    </aside>
  );
}
