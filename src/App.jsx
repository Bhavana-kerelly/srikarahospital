import { lazy, Suspense, useMemo, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ── Existing hospital pages (eagerly loaded — critical path) ──
import ScrollToTop from './components/utils/ScrollToTop'
import { BranchLandingPage } from './pages/BranchLandingPage'
import { PeerzadigudaPage } from './pages/PeerzadigudaPage'
import { EcilPage } from './pages/EcilPage'
import { MiyapurPage } from './pages/MiyapurPage'
import { LandingPage } from './pages/LandingPage'

// ── Existing hospital pages (lazy loaded) ──
const BranchesIndex       = lazy(() => import('./pages/BranchesIndex').then(m => ({ default: m.BranchesIndex })))
const DoctorsPage         = lazy(() => import('./pages/DoctorsPage').then(m => ({ default: m.DoctorsPage })))
const DoctorProfilePage   = lazy(() => import('./pages/DoctorProfilePage').then(m => ({ default: m.DoctorProfilePage })))
const DoctorBlogDetailPage = lazy(() => import('./pages/DoctorBlogDetailPage').then(m => ({ default: m.DoctorBlogDetailPage })))
const BlogsPage           = lazy(() => import('./pages/BlogsPage').then(m => ({ default: m.BlogsPage })))
const BlogDetailPage      = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })))
const BookAppointmentPage = lazy(() => import('./pages/BookAppointmentPage').then(m => ({ default: m.BookAppointmentPage })))
const IndividualBookingPage = lazy(() => import('./pages/IndividualBookingPage').then(m => ({ default: m.IndividualBookingPage })))
const SpecialtiesPage     = lazy(() => import('./pages/SpecialtiesPage').then(m => ({ default: m.SpecialtiesPage })))
const DepartmentPage      = lazy(() => import('./pages/DepartmentPage').then(m => ({ default: m.DepartmentPage })))
const ServicesPage        = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })))
const AboutPage           = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const LeadershipTeamPage  = lazy(() => import('./pages/LeadershipTeamPage').then(m => ({ default: m.LeadershipTeamPage })))
const AwardsPage          = lazy(() => import('./pages/AwardsPage').then(m => ({ default: m.AwardsPage })))
const AchievementsPage    = lazy(() => import('./pages/AchievementsPage').then(m => ({ default: m.AchievementsPage })))
const PlaceholderPage     = lazy(() => import('./pages/PlaceholderPage').then(m => ({ default: m.PlaceholderPage })))

// ── Dialysis Booking System — Phase 1–5 (lazy loaded) ──
const DialysisHome     = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const FindDialysis     = lazy(() => import('./pages/FindDialysis').then(m => ({ default: m.FindDialysis })))
const Availability     = lazy(() => import('./pages/Availability').then(m => ({ default: m.Availability })))
const HospitalSlots    = lazy(() => import('./pages/HospitalSlots').then(m => ({ default: m.HospitalSlots })))
const OtpVerification  = lazy(() => import('./pages/OtpVerification').then(m => ({ default: m.OtpVerification })))
const PatientDetails   = lazy(() => import('./pages/PatientDetails').then(m => ({ default: m.PatientDetails })))
const BookingReview    = lazy(() => import('./pages/BookingReview').then(m => ({ default: m.BookingReview })))
const BookingSubmitted = lazy(() => import('./pages/BookingSubmitted').then(m => ({ default: m.BookingSubmitted })))
const BookingDetails   = lazy(() => import('./pages/BookingDetails').then(m => ({ default: m.BookingDetails })))
const MyBookings       = lazy(() => import('./pages/MyBookings').then(m => ({ default: m.MyBookings })))
const Login            = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })))
const NotFound         = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))
const HospitalRoutes   = lazy(() => import('./routes/HospitalRoutes').then(m => ({ default: m.HospitalRoutes })))

import { PatientAppShell } from './components/layout/PatientAppShell'
import { LoadingOverlay } from './components/ui/LoadingOverlay'

// ── Central Admin Portal (lazy loaded) ──
const AdminAppShell       = lazy(() => import('./admin/layout/AdminAppShell').then(m => ({ default: m.AdminAppShell })))
const AdminLogin          = lazy(() => import('./admin/pages/AdminLogin').then(m => ({ default: m.AdminLogin })))
const CentralDashboard    = lazy(() => import('./admin/pages/CentralDashboard').then(m => ({ default: m.CentralDashboard })))
const NetworkAvailability = lazy(() => import('./admin/pages/NetworkAvailability').then(m => ({ default: m.NetworkAvailability })))
const BranchManagement    = lazy(() => import('./admin/pages/BranchManagement').then(m => ({ default: m.BranchManagement })))
const DialysisUnits       = lazy(() => import('./admin/pages/DialysisUnits').then(m => ({ default: m.DialysisUnits })))
const BookingManagement   = lazy(() => import('./admin/pages/BookingManagement').then(m => ({ default: m.BookingManagement })))
const PatientDirectory    = lazy(() => import('./admin/pages/PatientDirectory').then(m => ({ default: m.PatientDirectory })))
const RecurringSchedules  = lazy(() => import('./admin/pages/RecurringSchedules').then(m => ({ default: m.RecurringSchedules })))
const Waitlist            = lazy(() => import('./admin/pages/Waitlist').then(m => ({ default: m.Waitlist })))
const UsersRoles          = lazy(() => import('./admin/pages/UsersRoles').then(m => ({ default: m.UsersRoles })))
const NotificationCenter  = lazy(() => import('./admin/pages/NotificationCenter').then(m => ({ default: m.NotificationCenter })))
const ReportsAnalytics    = lazy(() => import('./admin/pages/ReportsAnalytics').then(m => ({ default: m.ReportsAnalytics })))
const Configuration       = lazy(() => import('./admin/pages/Configuration').then(m => ({ default: m.Configuration })))
const AuditLogs           = lazy(() => import('./admin/pages/AuditLogs').then(m => ({ default: m.AuditLogs })))
const Settings            = lazy(() => import('./admin/pages/Settings').then(m => ({ default: m.Settings })))

import { lbNagar, kompally, lakdikapul, ecil, miyapur, vijayawada, rajahmundry, rtcXRoads, madeenaguda } from './data/branches'

// Minimal spinner for existing hospital pages
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#cca830] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

import { Preloader } from './components/ui/Preloader'

function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem('preloader_shown');
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader_shown', 'true');
    setShowPreloader(false);
  };

  useEffect(() => {
    const handleShowPreloader = () => setShowPreloader(true);
    window.addEventListener('show-preloader', handleShowPreloader);
    return () => window.removeEventListener('show-preloader', handleShowPreloader);
  }, []);
  // TanStack Query — required for all Phases 1–5 API hooks
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: { retry: 0 },
        },
      }),
    []
  )

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/hospital-portal/*" element={
              <Suspense fallback={<LoadingOverlay isLoading={true} fullScreen={true} />}>
                <HospitalRoutes />
              </Suspense>
            } />

            {/* ═══════════════════════════════════════════════════════════
                DIALYSIS BOOKING SYSTEM  (PatientAppShell layout)
                Phase 1 → Phase 5 patient journey
                URLs: /#/find-dialysis  /#/availability  /#/hospital/:id/slots
                      /#/book/verify  /#/book/patient-details  /#/book/review
                      /#/booking/submitted  /#/booking/:id  /#/my-bookings
              ═══════════════════════════════════════════════════════════ */}
            <Route
              element={
                <Suspense fallback={<LoadingOverlay isLoading={true} fullScreen={true} />}>
                  <PatientAppShell />
                </Suspense>
              }
            >
              <Route path="/dialysis"                   element={<DialysisHome />} />
              <Route path="/find-dialysis"              element={<FindDialysis />} />
              <Route path="/availability"               element={<Availability />} />
              <Route path="/hospital/:hospitalId/slots" element={<HospitalSlots />} />
              <Route path="/book/verify"                element={<OtpVerification />} />
              <Route path="/book/patient-details"       element={<PatientDetails />} />
              <Route path="/book/review"                element={<BookingReview />} />
              <Route path="/booking/submitted"          element={<BookingSubmitted />} />
              <Route path="/booking/:id"                element={<BookingDetails />} />
              <Route path="/my-bookings"                element={<MyBookings />} />
              <Route path="/dialysis-login"             element={<Login />} />
              <Route path="/dialysis-404"               element={<NotFound />} />
            </Route>

            {/* ═══════════════════════════════════════════════════════════
                CENTRAL ADMIN PORTAL
              ═══════════════════════════════════════════════════════════ */}
            <Route path="/admin-portal" element={
              <Suspense fallback={<LoadingOverlay isLoading={true} fullScreen={true} />}>
                <AdminLogin />
              </Suspense>
            } />
            
            <Route path="/admin-portal/*" element={
              <Suspense fallback={<LoadingOverlay isLoading={true} fullScreen={true} />}>
                <AdminAppShell />
              </Suspense>
            }>
              <Route path="dashboard" element={<CentralDashboard />} />
              <Route path="network-availability" element={<NetworkAvailability />} />
              <Route path="branches" element={<BranchManagement />} />
              <Route path="dialysis-units" element={<DialysisUnits />} />
              <Route path="bookings" element={<BookingManagement />} />
              <Route path="patients" element={<PatientDirectory />} />
              <Route path="recurring-schedules" element={<RecurringSchedules />} />
              <Route path="waitlist" element={<Waitlist />} />
              <Route path="users" element={<UsersRoles />} />
              <Route path="notifications" element={<NotificationCenter />} />
              <Route path="reports" element={<ReportsAnalytics />} />
              <Route path="configuration" element={<Configuration />} />
              <Route path="audit-logs" element={<AuditLogs />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* ═══════════════════════════════════════════════════════════
                EXISTING SRIKARA HOSPITAL PAGES
              ═══════════════════════════════════════════════════════════ */}
            <Route
              path="/*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/branches/peerzadiguda" element={<PeerzadigudaPage />} />
                    <Route path="/branches/lb-nagar"     element={<BranchLandingPage branch={lbNagar} />} />
                    <Route path="/branches/kompally"     element={<BranchLandingPage branch={kompally} />} />
                    <Route path="/branches/lakdikapul"   element={<BranchLandingPage branch={lakdikapul} />} />
                    <Route path="/branches/ecil"         element={<EcilPage />} />
                    <Route path="/branches/miyapur"      element={<MiyapurPage />} />
                    <Route path="/landing"               element={<LandingPage />} />
                    <Route path="/branches/vijayawada"   element={<BranchLandingPage branch={vijayawada} />} />
                    <Route path="/branches/rajahmundry"  element={<BranchLandingPage branch={rajahmundry} />} />
                    <Route path="/branches/rtc-x-roads"  element={<BranchLandingPage branch={rtcXRoads} />} />
                    <Route path="/branches/madeenaguda"  element={<BranchLandingPage branch={madeenaguda} />} />
                    <Route path="/branches"              element={<BranchesIndex />} />
                    <Route path="/doctors"               element={<DoctorsPage />} />
                    <Route path="/doctors/:slug"         element={<DoctorProfilePage />} />
                    <Route path="/doctors/:slug/blog/:blogSlug" element={<DoctorBlogDetailPage />} />
                    <Route path="/specialties"           element={<SpecialtiesPage />} />
                    <Route path="/specialties/:dept"     element={<DepartmentPage />} />
                    <Route path="/services"              element={<ServicesPage />} />
                    <Route path="/about"                 element={<AboutPage />} />
                    <Route path="/about/leadership"      element={<LeadershipTeamPage />} />
                    <Route path="/leadership"            element={<Navigate to="/about/leadership" replace />} />
                    <Route path="/about/awards"          element={<AwardsPage />} />
                    <Route path="/awards"                element={<Navigate to="/about/awards" replace />} />
                    <Route path="/about/achievements"    element={<AchievementsPage />} />
                    <Route path="/achievements"          element={<Navigate to="/about/achievements" replace />} />
                    <Route path="/book"                  element={<BookAppointmentPage />} />
                    <Route path="/book/:slug"            element={<IndividualBookingPage />} />
                    <Route path="/blogs"                 element={<BlogsPage />} />
                    <Route path="/blogs/:slug"           element={<BlogDetailPage />} />
                    <Route path="/news"                  element={<Navigate to="/blogs" replace />} />
                    <Route path="/news/medical-updates"  element={<Navigate to="/blogs" replace />} />
                    
                    {/* Legacy SEO Redirects */}
                    <Route path="/srikara-hospitals-kompally" element={<Navigate to="/branches/kompally" replace />} />
                    <Route path="/srikara-hospitals-peerzadiguda" element={<Navigate to="/branches/peerzadiguda" replace />} />
                    <Route path="/srikara-hospitals-lb-nagar" element={<Navigate to="/branches/lb-nagar" replace />} />
                    <Route path="/srikara-hospitals-lakdikapul" element={<Navigate to="/branches/lakdikapul" replace />} />
                    <Route path="/srikara-hospitals-ecil" element={<Navigate to="/branches/ecil" replace />} />
                    <Route path="/srikara-hospitals-miyapur" element={<Navigate to="/branches/miyapur" replace />} />
                    <Route path="/srikara-hospitals-vijayawada" element={<Navigate to="/branches/vijayawada" replace />} />
                    <Route path="/srikara-hospitals-rajahmundry" element={<Navigate to="/branches/rajahmundry" replace />} />
                    <Route path="/srikara-hospitals-rtc-x-roads" element={<Navigate to="/branches/rtc-x-roads" replace />} />
                    <Route path="/srikara-hospitals-madeenaguda" element={<Navigate to="/branches/madeenaguda" replace />} />
                    <Route path="/our-branches"          element={<Navigate to="/branches" replace />} />

                    <Route path="*"                      element={<PlaceholderPage title="Page Not Found" />} />
                  </Routes>
                </Suspense>
              }
            />
          </Routes>
          
          {/* Global Announcements Floating Button */}
          <button
            onClick={() => window.dispatchEvent(new Event('show-preloader'))}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] bg-[#8B1A4A] text-white px-6 py-3 rounded-full font-bold text-[14px] shadow-[0_10px_30px_rgba(139,26,74,0.4)] hover:bg-[#a81f59] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            Announcements
          </button>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
