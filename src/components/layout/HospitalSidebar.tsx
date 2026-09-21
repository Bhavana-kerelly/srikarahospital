import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarClock, 
  CheckSquare, 
  Users, 
  Repeat, 
  BarChart3, 
  LogOut, 
  Settings, 
  HelpCircle,
  CalendarRange,
  ClipboardList,
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';

export const HospitalSidebar: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  const navItems = [
    { name: 'Dashboard', path: '/hospital-portal/dashboard', icon: LayoutDashboard, section: 'main' },
    
    { name: 'Booking Requests', path: '/hospital-portal/bookings', icon: ClipboardList, section: 'operations' },
    { name: 'Availability', path: '/hospital-portal/availability', icon: Clock, section: 'operations' },
    { name: 'Daily Calendar', path: '/hospital-portal/schedule', icon: Calendar, section: 'operations' },
    { name: 'Patient Schedule', path: '/hospital-portal/patients', icon: Users, section: 'operations' },
    { name: 'Recurring Schedules', path: '/hospital-portal/recurring', icon: CalendarRange, section: 'operations' },
    { name: 'Waitlist', path: '/hospital-portal/waitlist', icon: Activity, section: 'operations' },
    { name: 'Check-in', path: '/hospital-portal/check-in', icon: CheckCircle2, section: 'operations' },
    
    { name: 'Patients', path: '/hospital-portal/patients', icon: Users, section: 'patients' },
    
    { name: 'Reports', path: '/hospital-portal/reports', icon: BarChart3, section: 'reports' },
  ];

  const renderNavGroup = (section: string) => {
    return navItems
      .filter((item) => item.section === section)
      .map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent/10 text-accent font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </NavLink>
      ));
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-200 bg-white">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <img src="/Srikara Hospitals, LB Nagar.png" alt="Srikara Logo" className="h-8 w-auto object-contain" />
        </div>
      </div>
      
      {/* Branch Display */}
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Branch</div>
        <div className="font-medium text-slate-900 text-sm">{currentBranch?.name || currentBranch?.title || 'Srikara Branch'}</div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {renderNavGroup('main')}
        </div>

        <div className="mt-8">
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Operations
          </h4>
          <div className="space-y-1">
            {renderNavGroup('operations')}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Patients
          </h4>
          <div className="space-y-1">
            {renderNavGroup('patients')}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Reports
          </h4>
          <div className="space-y-1">
            {renderNavGroup('reports')}
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-200 p-3">
        <div className="space-y-1">
          <NavLink
            to="/hospital-portal/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>
          <NavLink
            to="/hospital-portal/help"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <HelpCircle className="h-5 w-5" />
            Help
          </NavLink>
          <button
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            onClick={() => window.location.href = '/hospital-portal'}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
