import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import OwnerMobileDashboard from "../pages/owner/OwnerMobileDashboard";
import OwnerDashboard from "../pages/owner/Dashboard";

import Pets from "../pages/owner/Pets";
import Appointments from "../pages/owner/Appointments";
import MedicalRecords from "../pages/owner/MedicalRecords";
import Profile from "../pages/owner/Profile";

import VaccinationsMobile from "../pages/veterinarian/VaccinationsMobile";
import TodaysAppointmentsMobile from "../pages/veterinarian/TodaysAppointmentsMobile";
import VeterinarianProfileMobile from "../pages/veterinarian/VeterinarianProfileMobile";
import PrescriptionsMobile from "../pages/veterinarian/PrescriptionsMobile";
import PatientRecordsMobile from "../pages/veterinarian/PatientRecordsMobile";
import MedicalReportsMobile from "../pages/veterinarian/MedicalReportsMobile";
import AppointmentsMobile from "../pages/veterinarian/AppointmentsMobile";
import VetMobileDashboard from "../pages/veterinarian/VetMobileDashboard";

import VeterinarianDashboard from "../pages/veterinarian/Dashboard";
import VeterinarianAppointments from "../pages/veterinarian/Appointments";
import VeterinarianMedicalReports from "../pages/veterinarian/MedicalReports";
import VeterinarianPatientRecords from "../pages/veterinarian/PatientRecords";
import VeterinarianPrescriptions from "../pages/veterinarian/Prescriptions";
import VeterinarianTodaysAppointments from "../pages/veterinarian/TodaysAppointments";
import VeterinarianVaccinations from "../pages/veterinarian/Vaccinations";
import VeterinarianProfile from "../pages/veterinarian/VeterinarianProfile";

import SettingsMobile from "../pages/admin/SettingsMobile";
import ReportsMobile from "../pages/admin/ReportsMobile";
import ProfileMobile from "../pages/admin/ProfileMobile";
import NotificationsMobile from "../pages/admin/NotificationsMobile";
import ManageVeterinariansMobile from "../pages/admin/ManageVeterinariansMobile";
import ManageUsersMobile from "../pages/admin/ManageUsersMobile";
import ManagePetsMobile from "../pages/admin/ManagePetsMobile";
import AnalyticsMobile from "../pages/admin/AnalyticsMobile";
import AdminMobileDashboard from "../pages/admin/AdminMobileDashboard";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManagePets from "../pages/admin/ManagePets";
import ManageVeterinarians from "../pages/admin/ManageVeterinarians";
import Reports from "../pages/admin/Reports";
import Analytics from "../pages/admin/Analytics";
import Notifications from "../pages/admin/Notifications";
import Settings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/Profile";

import { useAuth } from "../context/AuthContext";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

        <p className="mt-4 text-sm text-slate-500">
          Loading PawSync...
        </p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function ResponsivePage({ desktop, mobile }) {
  return (
    <>
      <div className="hidden lg:block">
        {desktop}
      </div>

      <div className="block lg:hidden">
        {mobile}
      </div>
    </>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* OWNER DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<OwnerDashboard />}
                mobile={<OwnerMobileDashboard />}
              />
            </ProtectedRoute>
          }
        />
        <Route
  path="/pets"
  element={
    <ProtectedRoute>
      <Pets />
    </ProtectedRoute>
  }
/>

<Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <Appointments />
    </ProtectedRoute>
  }
/>

<Route
  path="/medical-records"
  element={
    <ProtectedRoute>
      <MedicalRecords />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        {/* VETERINARIAN */}

        <Route
          path="/veterinarian"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianDashboard />}
                mobile={<VetMobileDashboard />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/appointments"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianAppointments />}
                mobile={<AppointmentsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/medical-reports"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianMedicalReports />}
                mobile={<MedicalReportsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/patient-records"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianPatientRecords />}
                mobile={<PatientRecordsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/prescriptions"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianPrescriptions />}
                mobile={<PrescriptionsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/todays-appointments"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianTodaysAppointments />}
                mobile={<TodaysAppointmentsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/vaccinations"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianVaccinations />}
                mobile={<VaccinationsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veterinarian/profile"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<VeterinarianProfile />}
                mobile={<VeterinarianProfileMobile />}
              />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<AdminDashboard />}
                mobile={<AdminMobileDashboard />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<ManageUsers />}
                mobile={<ManageUsersMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pets"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<ManagePets />}
                mobile={<ManagePetsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/veterinarians"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<ManageVeterinarians />}
                mobile={<ManageVeterinariansMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<Reports />}
                mobile={<ReportsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<Analytics />}
                mobile={<AnalyticsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<Notifications />}
                mobile={<NotificationsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<Settings />}
                mobile={<SettingsMobile />}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <ResponsivePage
                desktop={<AdminProfile />}
                mobile={<ProfileMobile />}
              />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;