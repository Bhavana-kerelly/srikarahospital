import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { HospitalLayout } from '../components/layout/HospitalLayout';
import { HospitalLogin } from '../pages/hospital/HospitalLogin';
import { HospitalAuthProvider, useHospitalAuth } from '../contexts/HospitalAuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useHospitalAuth();
  if (!isAuthenticated) return <Navigate to="/hospital-portal/login" replace />;
  return <Outlet />;
};

// Lazy load portal pages for performance
const HospitalDashboard = lazy(() =>
  import('../pages/hospital/HospitalDashboard').then((module) => ({ default: module.HospitalDashboard }))
);
const HospitalBookings = lazy(() =>
  import('../pages/hospital/HospitalBookings').then((module) => ({ default: module.HospitalBookings }))
);
const HospitalAvailability = lazy(() =>
  import('../pages/hospital/HospitalAvailability').then((module) => ({ default: module.HospitalAvailability }))
);
const HospitalSchedule = lazy(() =>
  import('../pages/hospital/HospitalSchedule').then((module) => ({ default: module.HospitalSchedule }))
);
const HospitalPatients = lazy(() =>
  import('../pages/hospital/HospitalPatients').then((module) => ({ default: module.HospitalPatients }))
);
const HospitalCheckIn = lazy(() =>
  import('../pages/hospital/HospitalCheckIn').then((module) => ({ default: module.HospitalCheckIn }))
);
const HospitalRecurring = lazy(() =>
  import('../pages/hospital/HospitalRecurring').then((module) => ({ default: module.HospitalRecurring }))
);
const HospitalWaitlist = lazy(() =>
  import('../pages/hospital/HospitalWaitlist').then((module) => ({ default: module.HospitalWaitlist }))
);
const HospitalReports = lazy(() =>
  import('../pages/hospital/HospitalReports').then((module) => ({ default: module.HospitalReports }))
);

export const HospitalRoutes: React.FC = () => {
  return (
    <HospitalAuthProvider>
      <Suspense fallback={<LoadingOverlay isLoading={true} fullScreen={true} />}>
        <Routes>
        <Route path="login" element={<HospitalLogin />} />
        
        {/* Layout wraps all protected portal routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<HospitalLayout />}>
            <Route path="" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HospitalDashboard />} />
            <Route path="bookings" element={<HospitalBookings />} />
            <Route path="availability" element={<HospitalAvailability />} />
            <Route path="schedule" element={<HospitalSchedule />} />
            <Route path="patients" element={<HospitalPatients />} />
            <Route path="check-in" element={<HospitalCheckIn />} />
            <Route path="recurring" element={<HospitalRecurring />} />
            <Route path="waitlist" element={<HospitalWaitlist />} />
            <Route path="reports" element={<HospitalReports />} />
            
            {/* Catch-all for portal */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>
        </Routes>
      </Suspense>
    </HospitalAuthProvider>
  );
};
