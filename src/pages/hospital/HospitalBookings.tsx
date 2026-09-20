import React, { useState, useMemo } from 'react';
import { Search, Eye, CheckCircle2, XCircle, CalendarClock, Phone, Clock, FileText, User, MapPin } from 'lucide-react';
import { generateBookingsForBranch } from '../../data/mockHospitalData';
import { useHospitalAuth } from '../../contexts/HospitalAuthContext';

export const HospitalBookings: React.FC = () => {
  const { currentBranch } = useHospitalAuth();
  
  const initialBookings = useMemo(() => {
    if (!currentBranch) return [];
    return generateBookingsForBranch(currentBranch.slug || currentBranch.id);
  }, [currentBranch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Pending');
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const tabs = ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'No-show'];

  const filteredBookings = bookings.filter(b => 
    b.status === activeTab && 
    (b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     b.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const AuditTrail = () => (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Activity / Audit</h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="mt-0.5"><div className="h-2 w-2 rounded-full bg-primary-hover"></div></div>
          <div>
            <p className="text-sm font-medium text-slate-900">Booking viewed by Staff</p>
            <p className="text-xs text-slate-500">Just now</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mt-0.5"><div className="h-2 w-2 rounded-full bg-slate-300"></div></div>
          <div>
            <p className="text-sm font-medium text-slate-900">Booking created</p>
            <p className="text-xs text-slate-500">{selectedBooking?.created}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Booking Requests</h2>
          <p className="text-sm text-slate-500">Manage dialysis bookings for {currentBranch?.name || currentBranch?.title}.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary-hover focus:border-primary-hover bg-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab 
                  ? 'border-primary-hover text-primary' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              {tab}
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs
                ${activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                {bookings.filter(b => b.status === tab).length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {booking.patientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{booking.patientName}</h4>
                    <p className="text-xs text-slate-500 mb-1">{booking.id}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3" /> {booking.date} • {booking.time}</span>
                      <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {booking.bookingType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button 
                    onClick={() => setSelectedBooking(booking)}
                    className="p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-slate-200"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {booking.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                        className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium text-sm rounded-lg transition-colors border border-emerald-200 flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Accept
                      </button>
                      <button 
                        onClick={() => handleStatusChange(booking.id, 'Rejected')}
                        className="px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-medium text-sm rounded-lg transition-colors border border-red-200 flex items-center gap-1"
                      >
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <CalendarClock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No bookings found</h3>
            <p className="text-slate-500">There are no {activeTab.toLowerCase()} bookings matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal (H04) */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Booking Details</h2>
                <p className="text-sm text-slate-500">ID: {selectedBooking.id}</p>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Patient</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{selectedBooking.patientName}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">UHID</p>
                    <p className="font-medium text-slate-900">{selectedBooking.patientId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mobile</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{selectedBooking.contact}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Created At</p>
                    <p className="font-medium text-slate-900">{selectedBooking.created}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Hospital & Unit</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{currentBranch?.name || currentBranch?.title} - {selectedBooking.unit}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date & Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{selectedBooking.date} • {selectedBooking.time}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Booking Type</p>
                    <p className="font-medium text-slate-900">{selectedBooking.bookingType}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                    <span className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 text-sm font-medium text-accent border border-primary/20">
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              <AuditTrail />
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl">
              <button className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                Contact Patient
              </button>
              <button 
                onClick={() => { handleStatusChange(selectedBooking.id, 'Cancelled'); setSelectedBooking(null); }}
                className="px-4 py-2 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 border border-primary/20 text-accent bg-primary/5 hover:bg-primary/10 rounded-lg text-sm font-medium transition-colors">
                Reschedule
              </button>
              <button 
                onClick={() => { handleStatusChange(selectedBooking.id, 'Confirmed'); setSelectedBooking(null); }}
                className="px-4 py-2 bg-primary text-white hover:bg-accent rounded-lg text-sm font-medium transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
