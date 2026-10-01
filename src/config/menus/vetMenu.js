import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  Syringe,
  Pill,
  User,
} from "lucide-react";

const vetMenu = [
  {
    title: "Dashboard",
    path: "/veterinarian",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    path: "/veterinarian/appointments",
    icon: CalendarDays,
  },
  {
    title: "Today's Appointments",
    path: "/veterinarian/todays-appointments",
    icon: CalendarDays,
  },
  {
    title: "Patient Records",
    path: "/veterinarian/patient-records",
    icon: Users,
  },
  {
    title: "Medical Reports",
    path: "/veterinarian/medical-reports",
    icon: FileText,
  },
  
  {
    title: "Vaccinations",
    path: "/veterinarian/vaccinations",
    icon: Syringe,
  },
  {
    title: "Profile",
    path: "/veterinarian/profile",
    icon: User,
  },
];

export default vetMenu;