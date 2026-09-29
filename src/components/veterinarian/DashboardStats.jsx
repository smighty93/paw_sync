import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  PawPrint,
  Syringe,
  FileText,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

function DashboardStats() {
  const [stats, setStats] = useState({
    appointments: 0,
    patients: 0,
    vaccinations: 0,
    reports: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        throw new Error("You are not logged in.");
      }

      const now = new Date();

      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );

      const {
        data: appointments,
        error: appointmentsError,
      } = await supabase
        .from("appointments")
        .select("id")
        .eq("veterinarian_id", user.id)
        .gte(
          "appointment_date",
          startOfDay.toISOString()
        )
        .lte(
          "appointment_date",
          endOfDay.toISOString()
        );

      if (appointmentsError) {
        throw appointmentsError;
      }

      const {
        data: medicalRecords,
        error: medicalRecordsError,
      } = await supabase
        .from("medical_records")
        .select("id, pet_id")
        .eq("veterinarian_id", user.id);

      if (medicalRecordsError) {
        throw medicalRecordsError;
      }

      const records = medicalRecords || [];

      const uniquePatients = new Set(
        records
          .map((record) => record.pet_id)
          .filter(Boolean)
      );

      const reportsCount = records.length;

      let dueVaccinationCount = 0;

      const patientIds = [...uniquePatients];

      if (patientIds.length > 0) {
        const todayString =
          now.getFullYear() +
          "-" +
          String(now.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(now.getDate()).padStart(2, "0");

        const {
          data: vaccinations,
          error: vaccinationsError,
        } = await supabase
          .from("vaccinations")
          .select(
            "id, pet_id, vaccination_date, next_due_date"
          )
          .in("pet_id", patientIds)
          .lte("next_due_date", todayString);

        if (vaccinationsError) {
          throw vaccinationsError;
        }

        dueVaccinationCount =
          vaccinations?.length || 0;
      }

      setStats({
        appointments: appointments?.length || 0,
        patients: uniquePatients.size,
        vaccinations: dueVaccinationCount,
        reports: reportsCount,
      });
    } catch (error) {
      console.error(
        "Error loading dashboard statistics:",
        error
      );

      setStats({
        appointments: 0,
        patients: 0,
        vaccinations: 0,
        reports: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  const statsData = [
    {
      title: "Today's Appointments",
      value: stats.appointments,
      icon: CalendarCheck,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Patients Treated",
      value: stats.patients,
      icon: PawPrint,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Vaccinations Due",
      value: stats.vaccinations,
      icon: Syringe,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Medical Reports",
      value: stats.reports,
      icon: FileText,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.07,
              duration: 0.25,
            }}
            className="bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex items-center justify-between gap-4">

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-slate-500 leading-5">
                    {stat.title}
                  </p>

                  <h2 className="text-[26px] leading-none font-bold text-slate-800 mt-2">
                    {loading ? "—" : stat.value}
                  </h2>
                </div>

                {/* Icon */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}
                >
                  <Icon
                    className={`w-[19px] h-[19px] ${stat.iconColor}`}
                    strokeWidth={2}
                  />
                </div>

              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default DashboardStats;