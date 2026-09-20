import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  Phone,
  Search,
  Plus,
  RotateCcw,
  Calendar,
  Clock,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Skeleton } from '../components/ui/Skeleton';
import { BookingCard } from '../components/booking/BookingCard';
import { CancelBookingModal } from '../components/booking/CancelBookingModal';
import { useBookings, useCancelBooking } from '../hooks/useBookings';
import { Booking } from '../types/booking.types';

export const MyBookings: React.FC = () => {
  const navigate = useNavigate();

  // Read registered patient phone from session if logged in
  const cachedPhone = (() => {
    try {
      const details = sessionStorage.getItem('srikara_patient_details');
      return details ? JSON.parse(details)?.mobile : '';
    } catch {
      return '';
    }
  })();

  const [searchPhone, setSearchPhone] = useState(cachedPhone);
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST' | 'CANCELLED'>('UPCOMING');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);
  const [cancelErrorMessage, setCancelErrorMessage] = useState<string | null>(null);

  // Fetch bookings strictly via TanStack Query from backend
  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
  } = useBookings(searchPhone || undefined, {
    enabled: Boolean(searchPhone),
  });

  const cancelMutation = useCancelBooking();

  const handleCancelConfirm = async () => {
    if (!selectedBookingForCancel) return;
    setCancelErrorMessage(null);

    try {
      await cancelMutation.mutateAsync({ id: selectedBookingForCancel.id });
      setSelectedBookingForCancel(null);
      refetch();
    } catch (err: any) {
      setCancelErrorMessage(
        err?.message || "We couldn't cancel this booking right now. Please try again."
      );
    }
  };

  // Group bookings strictly using backend status
  const upcomingBookings = (bookings || []).filter(
    (b) =>
      b.status === 'PENDING' ||
      b.status === 'REQUESTED' ||
      b.status === 'CONFIRMED' ||
      b.status === 'CHECKED_IN' ||
      b.status === 'IN_TREATMENT' ||
      b.status === 'IN_PROGRESS'
  );

  const pastBookings = (bookings || []).filter((b) => b.status === 'COMPLETED');
  const cancelledBookings = (bookings || []).filter(
    (b) => b.status === 'CANCELLED' || b.status === 'REJECTED'
  );

  const displayedBookings =
    activeTab === 'UPCOMING'
      ? upcomingBookings
      : activeTab === 'PAST'
      ? pastBookings
      : cancelledBookings;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] pb-20 pt-6">
      <Container size="md">
        <PageHeader
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'My Bookings' }]}
          eyebrow="Patient Portal"
          title="My Dialysis Bookings"
          description="View verified appointments, real-time hospital statuses, and manage scheduled dialysis sessions."
        />

        {/* Mobile Lookup Card */}
        <Card variant="default" padding="md" className="mb-6 border-[#E2E8F0] shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchPhone) refetch();
            }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="flex-1 w-full">
              <Input
                label="Registered Mobile Number"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value.replace(/\D/g, ''))}
                startIcon={<Phone className="w-4 h-4 text-[#94A3B8]" />}
                helperText="Enter your mobile number to retrieve verified appointment history."
              />
            </div>
            <div className="sm:self-end w-full sm:w-auto">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={searchPhone.length !== 10 || isLoading}
                className="bg-[#006699] hover:bg-[#004C73] text-white font-semibold w-full sm:w-auto"
              >
                <span>Find Bookings</span>
                <Search className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Content Section */}
        {!searchPhone ? (
          <EmptyState
            icon={<Phone className="w-8 h-8 text-[#006699]" />}
            title="Enter your registered mobile number"
            description="Your dialysis appointment history and live schedule will be loaded securely from Srikara Hospitals."
          />
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton width="100%" height={100} className="rounded-card" />
            <Skeleton width="100%" height={100} className="rounded-card" />
          </div>
        ) : isError ? (
          <Card variant="default" padding="lg">
            <ErrorState
              title="We couldn't load your bookings."
              message="Please check your network connection and try again."
              onRetry={() => refetch()}
            />
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('UPCOMING')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeTab === 'UPCOMING'
                    ? 'bg-[#006699] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Upcoming ({upcomingBookings.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('PAST')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeTab === 'PAST'
                    ? 'bg-[#006699] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Past Sessions ({pastBookings.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('CANCELLED')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeTab === 'CANCELLED'
                    ? 'bg-[#006699] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Cancelled ({cancelledBookings.length})
              </button>
            </div>

            {/* List or Empty State */}
            {displayedBookings.length === 0 ? (
              <EmptyState
                icon={<CalendarClock className="w-8 h-8 text-[#94A3B8]" />}
                title="Your bookings will appear here."
                description={
                  activeTab === 'UPCOMING'
                    ? 'You have no upcoming dialysis sessions scheduled. You can find available machine slots across any Srikara branch.'
                    : activeTab === 'PAST'
                    ? 'No past treatment sessions found in the record registry.'
                    : 'No cancelled appointments on record.'
                }
                actionLabel="Find a Dialysis Slot"
                onAction={() => navigate('/find-dialysis')}
              />
            ) : (
              <div className="space-y-4">
                {displayedBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={(b) => setSelectedBookingForCancel(b)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cancellation Modal */}
        <CancelBookingModal
          isOpen={Boolean(selectedBookingForCancel)}
          booking={selectedBookingForCancel}
          isLoading={cancelMutation.isPending}
          errorMessage={cancelErrorMessage}
          onConfirm={handleCancelConfirm}
          onClose={() => {
            setSelectedBookingForCancel(null);
            setCancelErrorMessage(null);
          }}
        />
      </Container>
    </div>
  );
};
