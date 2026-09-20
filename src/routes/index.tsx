import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PatientAppShell } from '../components/layout/PatientAppShell';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';

// Eager load primary landing page for optimal First Contentful Paint
import { Home } from '../pages/Home';

// Lazy load secondary pages for performance optimization
const FindDialysis = lazy(() =>
  import('../pages/FindDialysis').then((module) => ({ default: module.FindDialysis }))
);
const Availability = lazy(() =>
  import('../pages/Availability').then((module) => ({ default: module.Availability }))
);
const HospitalSlots = lazy(() =>
  import('../pages/HospitalSlots').then((module) => ({ default: module.HospitalSlots }))
);
const OtpVerification = lazy(() =>
  import('../pages/OtpVerification').then((module) => ({ default: module.OtpVerification }))
);
const PatientDetails = lazy(() =>
  import('../pages/PatientDetails').then((module) => ({ default: module.PatientDetails }))
);
const BookingReview = lazy(() =>
  import('../pages/BookingReview').then((module) => ({ default: module.BookingReview }))
);
const BookingSubmitted = lazy(() =>
  import('../pages/BookingSubmitted').then((module) => ({ default: module.BookingSubmitted }))
);
const BookingDetails = lazy(() =>
  import('../pages/BookingDetails').then((module) => ({ default: module.BookingDetails }))
);
const MyBookings = lazy(() =>
  import('../pages/MyBookings').then((module) => ({ default: module.MyBookings }))
);
const Login = lazy(() =>
  import('../pages/Login').then((module) => ({ default: module.Login }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((module) => ({ default: module.NotFound }))
);
const HospitalRoutes = lazy(() =>
  import('./HospitalRoutes').then((module) => ({ default: module.HospitalRoutes }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingOverlay isLoading={true} fullScreen={true} />}>
      <Routes>
        <Route path="/hospital-portal/*" element={<HospitalRoutes />} />
        
        <Route element={<PatientAppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-dialysis" element={<FindDialysis />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/hospital/:hospitalId/slots" element={<HospitalSlots />} />
          <Route path="/book/verify" element={<OtpVerification />} />
          <Route path="/book/patient-details" element={<PatientDetails />} />
          <Route path="/book/review" element={<BookingReview />} />
          <Route path="/booking/submitted" element={<BookingSubmitted />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          {/* Catch-all redirects to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
