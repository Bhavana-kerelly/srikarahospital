import React from 'react';
import { Download, Calendar, BarChart3, TrendingUp, Users, Activity } from 'lucide-react';

export const HospitalReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Operational Reports</h2>
          <p className="text-sm text-slate-500">View dialysis capacity and booking analytics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Calendar className="h-4 w-4 text-slate-500" />
            <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Sessions</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">452</p>
            <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Station Utilization</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">78%</p>
            <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5%
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Cancellation Rate</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">4.2%</p>
            <div className="flex items-center text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.8%
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">New Patients</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">28</p>
            <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3
            </div>
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Booking Volume</h3>
            <BarChart3 className="h-5 w-5 text-slate-400" />
          </div>
          {/* Mock Bar Chart using HTML/CSS */}
          <div className="flex items-end justify-between h-48 gap-2">
            {[40, 55, 30, 60, 45, 70, 65].map((val, i) => (
              <div key={i} className="w-full bg-primary/10 rounded-t-md relative group">
                <div 
                  className="absolute bottom-0 w-full bg-primary-hover rounded-t-md transition-all group-hover:bg-primary" 
                  style={{ height: `${val}%` }}
                ></div>
                <div className="absolute -bottom-6 w-full text-center text-xs text-slate-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Shift Utilization</h3>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
          {/* Mock Progress Bars */}
          <div className="space-y-6 mt-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Morning Shift (06:00 - 10:00)</span>
                <span className="text-slate-500">85% full</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary-hover" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Afternoon Shift (11:00 - 15:00)</span>
                <span className="text-slate-500">62% full</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary-hover" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Evening Shift (16:00 - 20:00)</span>
                <span className="text-slate-500">40% full</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary-hover" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
