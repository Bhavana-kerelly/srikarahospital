import React, { useState, useMemo } from 'react';
import { Activity, Search, Bell, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';
import { generateWaitlistForBranch } from '../../data/mockHospitalData';

export const HospitalWaitlist: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  
  const initialWaitlist = useMemo(() => {
    if (!currentBranch) return [];
    return generateWaitlistForBranch(currentBranch.slug || currentBranch.id);
  }, [currentBranch]);

  const [waitlist, setWaitlist] = useState(initialWaitlist);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifiedId, setNotifiedId] = useState<string | null>(null);

  const handleNotify = (id: string) => {
    setNotifiedId(id);
    setTimeout(() => {
      setNotifiedId(null);
      setWaitlist(waitlist.filter(w => w.id !== id));
    }, 2000);
  };

  const filteredWaitlist = waitlist.filter(w => 
    w.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Waitlist</h2>
          <p className="text-sm text-slate-500">Manage queued patients for {currentBranch?.name || currentBranch?.title}.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary-hover focus:border-primary-hover bg-white"
          />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-amber-800">Slot Available</h4>
          <p className="text-sm text-amber-700 mt-1">A slot has just become available at 10:00 AM due to a cancellation. Notify a patient from the waitlist to fill this slot.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-semibold">Queue Position</th>
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-6 py-3 font-semibold">Date & Time</th>
                <th className="px-6 py-3 font-semibold">Priority</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWaitlist.length > 0 ? (
                filteredWaitlist.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                        {item.queuePosition}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.patientName}</td>
                    <td className="px-6 py-4 text-slate-700">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-slate-400" /> {item.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-slate-400" /> {item.preferredTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border
                        ${item.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleNotify(item.id)}
                        disabled={notifiedId !== null}
                        className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border
                          ${notifiedId === item.id 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-primary text-white border-primary hover:bg-accent shadow-sm'}`}
                      >
                        {notifiedId === item.id ? (
                          <>Notified <CheckSquare className="h-4 w-4" /></>
                        ) : (
                          <>Notify Patient <Bell className="h-4 w-4" /></>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-1">Waitlist is empty</h3>
                    <p className="text-slate-500">There are no patients currently waiting for {currentBranch?.name || currentBranch?.title}.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Needed missing icon for UI state
function CheckSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
