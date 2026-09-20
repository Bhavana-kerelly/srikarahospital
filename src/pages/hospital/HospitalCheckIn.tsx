import React, { useState, useMemo } from 'react';
import { Search, UserCheck, Activity, CheckCircle2, Clock, MapPin, XCircle, ChevronRight } from 'lucide-react';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';
import { generateCheckinsForBranch } from '../../data/mockHospitalData';

export const HospitalCheckIn: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  
  const initialCheckins = useMemo(() => {
    if (!currentBranch) return [];
    return generateCheckinsForBranch(currentBranch.slug || currentBranch.id);
  }, [currentBranch]);

  const [checkins, setCheckins] = useState(initialCheckins);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusProgress = (id: string, currentStatus: string) => {
    setCheckins(checkins.map(c => {
      if (c.id === id) {
        let next = currentStatus;
        let arrival = c.arrival;
        if (currentStatus === 'Scheduled') {
          next = 'Checked In';
          arrival = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        else if (currentStatus === 'Checked In') next = 'Treatment Started';
        else if (currentStatus === 'Treatment Started') next = 'Completed';
        
        return { ...c, status: next, arrival };
      }
      return c;
    }));
  };

  const handleNoShow = (id: string) => {
    setCheckins(checkins.map(c => c.id === id ? { ...c, status: 'No-show' } : c));
  };

  const filteredCheckins = checkins.filter(c => 
    c.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Today's Check-in</h2>
          <p className="text-sm text-slate-500">Track and manage patient arrivals for {currentBranch?.name || currentBranch?.title}.</p>
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-6 py-3 font-semibold">Booking ID</th>
                <th className="px-6 py-3 font-semibold">Session</th>
                <th className="px-6 py-3 font-semibold">Arrival Time</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCheckins.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {item.patientName.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">{item.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{item.bookingId}</td>
                  <td className="px-6 py-4 text-slate-700">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="h-3 w-3 text-slate-400" /> {item.shift}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3 w-3 text-slate-400" /> {item.station}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{item.arrival}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border
                      ${item.status === 'Scheduled' ? 'bg-slate-50 text-slate-700 border-slate-200' : 
                        item.status === 'Checked In' ? 'bg-primary/5 text-accent border-primary/20' :
                        item.status === 'Treatment Started' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-red-50 text-red-700 border-red-200'}`}>
                      {item.status === 'Scheduled' && <Clock className="h-3 w-3" />}
                      {item.status === 'Checked In' && <UserCheck className="h-3 w-3" />}
                      {item.status === 'Treatment Started' && <Activity className="h-3 w-3" />}
                      {item.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                      {item.status === 'No-show' && <XCircle className="h-3 w-3" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status === 'Scheduled' && (
                        <>
                          <button 
                            onClick={() => handleStatusProgress(item.id, item.status)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white hover:bg-accent rounded-lg text-xs font-medium transition-colors shadow-sm"
                          >
                            Check In
                          </button>
                          <button 
                            onClick={() => handleNoShow(item.id)}
                            className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
                          >
                            No-show
                          </button>
                        </>
                      )}
                      
                      {item.status === 'Checked In' && (
                        <button 
                          onClick={() => handleStatusProgress(item.id, item.status)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 rounded-lg text-xs font-medium transition-colors shadow-sm"
                        >
                          Start Treatment <ChevronRight className="h-3 w-3" />
                        </button>
                      )}
                      
                      {item.status === 'Treatment Started' && (
                        <button 
                          onClick={() => handleStatusProgress(item.id, item.status)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-medium transition-colors shadow-sm"
                        >
                          Mark Completed <CheckCircle2 className="h-3 w-3" />
                        </button>
                      )}
                      
                      {(item.status === 'Completed' || item.status === 'No-show') && (
                        <span className="text-slate-400 text-sm font-medium">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
