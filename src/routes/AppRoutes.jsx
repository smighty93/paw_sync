import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Owner
import OwnerDashboard from "../pages/owner/Dashboard";

// Veterinarian
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
        <Route path="/dashboard" element={<OwnerDashboard />} />

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
          element={<Appointments />}
        />

        <Route
          path="/veterinarian/medical-reports"
          element={<MedicalReports />}
        />

        <Route
          path="/veterinarian/patient-records"
          element={<PatientRecords />}
        />

        <Route
          path="/veterinarian/prescriptions"
          element={<Prescriptions />}
        />

        <Route
          path="/veterinarian/todays-appointments"
          element={<TodaysAppointments />}
        />

        <Route
          path="/veterinarian/vaccinations"
          element={<Vaccinations />}
        />

        <Route
          path="/veterinarian/profile"
          element={<VeterinarianProfile />}
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
          element={<ManageUsers />}
        />

        <Route
          path="/admin/pets"
          element={<ManagePets />}
        />

        <Route
          path="/admin/veterinarians"
          element={<ManageVeterinarians />}
        />

        <Route
          path="/admin/reports"
          element={<Reports />}
        />

        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />

        <Route
          path="/admin/notifications"
          element={<Notifications />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

        <Route
          path="/admin/profile"
          element={<AdminProfile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;