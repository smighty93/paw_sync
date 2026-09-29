import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  CalendarCheck,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
  }, []);

  async function loadRecentActivity() {
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

      const [
        { data: appointments, error: appointmentsError },
        { data: records, error: recordsError },
      ] = await Promise.all([
        supabase
          .from("appointments")
          .select(`
            id,
            appointment_date,
            appointment_time,
            status,
            pet_id,
            pets (
              name
            )
          `)
          .eq("veterinarian_id", user.id)
          .order("appointment_date", {
            ascending: false,
          })
          .order("appointment_time", {
            ascending: false,
          })
          .limit(5),

        supabase
          .from("medical_records")
          .select(`
            id,
            pet_id,
            diagnosis,
            treatment,
            record_date,
            created_at,
            pets (
              name
            )
          `)
          .eq("veterinarian_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(5),
      ]);

      if (appointmentsError) {
        throw appointmentsError;
      }

      if (recordsError) {
        throw recordsError;
      }

      const appointmentActivities = (appointments || []).map(
        (appointment) => {
          const petName =
            appointment.pets?.name || "Unknown Pet";

          const isCompleted =
            appointment.status === "completed";

          return {
            id: `appointment-${appointment.id}`,
            icon: isCompleted
              ? CheckCircle
              : CalendarCheck,
            title: isCompleted
              ? "Consultation Completed"
              : "Appointment Scheduled",
            description: isCompleted
              ? `${petName}'s consultation was completed successfully.`
              : `${petName} has an upcoming appointment.`,
            color: isCompleted
              ? "text-green-600"
              : "text-blue-600",
            date: appointment.appointment_date,
            timestamp: new Date(
              `${appointment.appointment_date}T${
                appointment.appointment_time || "00:00:00"
              }`
            ).getTime(),
          };
        }
      );

      const recordActivities = (records || []).map(
        (record) => {
          const petName =
            record.pets?.name || "Unknown Pet";

          return {
            id: `record-${record.id}`,
            icon: FileText,
            title: "Medical Report Updated",
            description: `${petName}'s medical record was updated.`,
            color: "text-purple-600",
            date: record.record_date,
            timestamp: new Date(
              record.created_at || record.record_date
            ).getTime(),
          };
        }
      );

      const combinedActivities = [
        ...appointmentActivities,
        ...recordActivities,
      ]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

      setActivities(combinedActivities);
    } catch (error) {
      console.error(
        "Error loading recent activity:",
        error
      );

      setActivities([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Recent Activity
      </h2>

      {loading ? (
        <div className="py-6 text-center text-gray-500">
          Loading recent activity...
        </div>
      ) : activities.length === 0 ? (
        <div className="rounded-xl bg-slate-50 px-5 py-8 text-center">
          <h3 className="font-semibold text-gray-800">
            No recent activity
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Your recent appointments and medical records will
            appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4"
              >
                <div className={activity.color}>
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default RecentActivity;