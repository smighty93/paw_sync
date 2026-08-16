import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Owner
import OwnerMobileDashboard from "../pages/owner/OwnerMobileDashboard";
import OwnerDashboard from "../pages/owner/Dashboard";

// Veterinarian
import VaccinationsMobile from "../pages/veterinarian/VaccinationsMobile";
import TodaysAppointmentsMobile from "../pages/veterinarian/TodaysAppointmentsMobile";
import VeterinarianProfileMobile from "../pages/veterinarian/VeterinarianProfileMobile";
import PrescriptionsMobile from "../pages/veterinarian/PrescriptionsMobile";
import PatientRecordsMobile from "../pages/veterinarian/PatientRecordsMobile";
import MedicalReportsMobile from "../pages/veterinarian/MedicalReportsMobile";
import AppointmentsMobile from "../pages/veterinarian/AppointmentsMobile";
import VetMobileDashboard from "../pages/veterinarian/VetMobileDashboard";
import VeterinarianDashboard from "../pages/veterinarian/Dashboard";
import Appointments from "../pages/veterinarian/Appointments";
import MedicalReports from "../pages/veterinarian/MedicalReports";
import PatientRecords from "../pages/veterinarian/PatientRecords";
import Prescriptions from "../pages/veterinarian/Prescriptions";
import TodaysAppointments from "../pages/veterinarian/TodaysAppointments";
import Vaccinations from "../pages/veterinarian/Vaccinations";
import VeterinarianProfile from "../pages/veterinarian/VeterinarianProfile";

// Admin
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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PET OWNER ================= */}
        <Route
  path="/dashboard"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <OwnerDashboard />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <OwnerMobileDashboard />
      </div>
    </>
  } />

        {/* ================= VETERINARIAN ================= */}
        <Route
  path="/veterinarian"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <VeterinarianDashboard  />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <VetMobileDashboard />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/appointments"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Appointments />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <AppointmentsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/medical-reports"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <MedicalReports />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <MedicalReportsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/patient-records"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <PatientRecords />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <PatientRecordsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/prescriptions"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Prescriptions />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <PrescriptionsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/todays-appointments"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <TodaysAppointments />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <TodaysAppointmentsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/vaccinations"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Vaccinations />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <VaccinationsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/veterinarian/profile"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <VeterinarianProfile />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <VeterinarianProfileMobile />
      </div>
    </>
  }
/>

        {/* ================= ADMIN ================= */}
        <Route
  path="/admin"
  element={
    <>
      <div className="hidden lg:block">
        <AdminDashboard />
      </div>

      <div className="block lg:hidden">
        <AdminMobileDashboard />
      </div>
    </>
  }
/>

        <Route
  path="/admin/users"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <ManageUsers />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <ManageUsersMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/pets"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <ManagePets />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <ManagePetsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/veterinarians"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <ManageVeterinarians />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <ManageVeterinariansMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/reports"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Reports />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <ReportsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/analytics"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Analytics />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <AnalyticsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/notifications"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Notifications />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <NotificationsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/settings"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Settings />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <SettingsMobile />
      </div>
    </>
  }
/>

        <Route
  path="/admin/profile"
  element={
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <AdminProfile />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <ProfileMobile />
      </div>
    </>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;