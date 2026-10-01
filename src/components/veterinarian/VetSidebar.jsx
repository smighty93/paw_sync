import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  FileText,
  Pill,
  Syringe,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/veterinarian",
  },
  {
    icon: CalendarDays,
    label: "Appointments",
    path: "/veterinarian/appointments",
  },
  {
    icon: ClipboardList,
    label: "Patient Records",
    path: "/veterinarian/patient-records",
  },
  
  {
    icon: FileText,
    label: "Medical Reports",
    path: "/veterinarian/medical-reports",
  },
  {
    icon: Syringe,
    label: "Vaccinations",
    path: "/veterinarian/vaccinations",
  },
];

function VetSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-100 px-4 py-5 flex flex-col">

      {/* Logo */}
      <div className="px-3 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">
          🐾 PawSync
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.8}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

    </aside>
  );
}

export default VetSidebar;