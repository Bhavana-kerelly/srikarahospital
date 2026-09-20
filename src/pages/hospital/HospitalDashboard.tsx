import React, { useMemo } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Bed,
  Calendar,
  ChevronRight,
  Eye,
  Settings,
  Plus,
  ShieldAlert
} from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';
import { getBranchData } from '../../data/mockHospitalData';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  </div>
);

export const HospitalDashboard: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  const navigate = useNavigate();

  // Use today's date for realistic feel
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });
  
  const branchData = useMemo(() => {
    if (!currentBranch) return null;
    return getBranchData(currentBranch.slug || currentBranch.id);
  }, [currentBranch]);

  if (!branchData) return null;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, {currentBranch.name || currentBranch.title}</h1>
          <p className="text-slate-600 mt-1">Here's today's dialysis operations overview for {currentBranch.name || currentBranch.title}.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <Calendar className="h-5 w-5 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">{today}</span>
        </div>
      </div>

      {/* KPI Cards (H02) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Capacity" 
          value={branchData.kpi.totalCapacity} 
          icon={Bed} 
          colorClass="bg-primary/5 text-primary" 
        />
        <StatCard 
          title="Booked" 
          value={branchData.kpi.booked} 
          icon={CheckCircle2} 
          colorClass="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Available" 
          value={branchData.kpi.available} 
          icon={Activity} 
          colorClass="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          title="Pending" 
          value={branchData.kpi.pending} 
          icon={Clock} 
          colorClass="bg-purple-50 text-purple-600" 
        />
      </div>

      {/* Quick Actions (H02) */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/hospital-portal/availability')}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Settings className="h-4 w-4 text-primary" />
            Manage Slots
          </button>
          
          <button 
            onClick={() => navigate('/hospital-portal/bookings')}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Eye className="h-4 w-4 text-emerald-600" />
            View Bookings
          </button>

          <button 
            onClick={() => navigate('/hospital-portal/availability')}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <ShieldAlert className="h-4 w-4 text-red-500" />
            Block Slot
          </button>

          <button 
            onClick={() => navigate('/hospital-portal/availability')}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Plus className="h-4 w-4 text-purple-600" />
            Add Capacity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (H02) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Today's Schedule</h2>
            <button onClick={() => navigate('/hospital-portal/schedule')} className="text-sm font-medium text-primary hover:text-accent flex items-center">
              View Calendar <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {branchData.schedule.map((session, idx) => (
              <div key={idx} className="flex items-center p-4 hover:bg-slate-50 transition-colors">
                <div className="w-24 font-medium text-slate-900">{session.time}</div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{session.patient}</div>
                </div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${session.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 
                      session.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                      session.status === 'Blocked' ? 'bg-red-100 text-red-800' :
                      'bg-slate-100 text-slate-800'}`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
