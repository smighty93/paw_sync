import { useEffect, useState } from "react";
import {
  FileText,
  CalendarCheck,
  Syringe,
  PawPrint,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

function Activity({ icon, title, time }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-4">
      <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-slate-900">
          {title}
        </h4>

        <p className="text-sm text-slate-500">
          {time}
        </p>
      </div>
    </div>
  );
}

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRecentActivity();
  }, []);

  async function loadRecentActivity() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setActivities([]);
        return;
      }

      // -----------------------------------------
      // Get owner's pets
      // -----------------------------------------

      const { data: pets, error: petsError } = await supabase
        .from("pets")
        .select("id, name, created_at")
        .eq("owner_id", user.id);

      if (petsError) {
        throw petsError;
      }

      const petList = pets || [];
      const petIds = petList.map((pet) => pet.id);

      const allActivities = [];

      // -----------------------------------------
      // Pet activities
      // -----------------------------------------

      petList.forEach((pet) => {
        if (pet.created_at) {
          allActivities.push({
            id: `pet-${pet.id}`,
            type: "pet",
            title: `${pet.name} added to your pets`,
            date: pet.created_at,
            icon: <PawPrint size={20} />,
          });
        }
      });

      // -----------------------------------------
      // Activities related to pets
      // -----------------------------------------

      if (petIds.length > 0) {
        // -----------------------------------------
        // Vaccination activities
        // -----------------------------------------

        const {
          data: vaccinations,
          error: vaccinationsError,
        } = await supabase
          .from("vaccinations")
          .select(`
            id,
            pet_id,
            vaccine_name,
            vaccination_date,
            created_at
          `)
          .in("pet_id", petIds)
          .order("created_at", {
            ascending: false,
          })
          .limit(10);

        if (vaccinationsError) {
          throw vaccinationsError;
        }

        (vaccinations || []).forEach((vaccination) => {
          const pet = petList.find(
            (item) => item.id === vaccination.pet_id
          );

          allActivities.push({
            id: `vaccination-${vaccination.id}`,
            type: "vaccination",
            title: `${vaccination.vaccine_name} recorded for ${
              pet?.name || "your pet"
            }`,
            date:
              vaccination.created_at ||
              vaccination.vaccination_date,
            icon: <Syringe size={20} />,
          });
        });

        // -----------------------------------------
        // Appointment activities
        // -----------------------------------------

        const {
          data: appointments,
          error: appointmentsError,
        } = await supabase
          .from("appointments")
          .select(`
            id,
            pet_id,
            appointment_date,
            reason,
            status
          `)
          .in("pet_id", petIds)
          .order("appointment_date", {
            ascending: false,
          })
          .limit(10);

        if (appointmentsError) {
          throw appointmentsError;
        }

        (appointments || []).forEach((appointment) => {
          const pet = petList.find(
            (item) => item.id === appointment.pet_id
          );

          const status =
            appointment.status?.toLowerCase();

          let appointmentText = "booked";

          if (status === "completed") {
            appointmentText = "completed";
          } else if (status === "cancelled") {
            appointmentText = "cancelled";
          } else if (status === "confirmed") {
            appointmentText = "confirmed";
          } else if (status === "pending") {
            appointmentText = "booked";
          }

          allActivities.push({
            id: `appointment-${appointment.id}`,
            type: "appointment",
            title: `Appointment ${appointmentText} for ${
              pet?.name || "your pet"
            }`,
            date: appointment.appointment_date,
            icon: <CalendarCheck size={20} />,
          });
        });

        // -----------------------------------------
        // Medical record activities
        // -----------------------------------------

        const {
          data: medicalRecords,
          error: medicalRecordsError,
        } = await supabase
          .from("medical_records")
          .select(`
            id,
            pet_id,
            diagnosis,
            treatment,
            notes,
            record_date,
            created_at
          `)
          .in("pet_id", petIds)
          .order("created_at", {
            ascending: false,
          })
          .limit(10);

        if (medicalRecordsError) {
          throw medicalRecordsError;
        }

        (medicalRecords || []).forEach((record) => {
          const pet = petList.find(
            (item) => item.id === record.pet_id
          );

          let recordTitle = "Medical record";

          if (record.diagnosis) {
            recordTitle = `Medical record: ${record.diagnosis}`;
          } else if (record.treatment) {
            recordTitle = `Treatment recorded`;
          }

          allActivities.push({
            id: `medical-${record.id}`,
            type: "medical",
            title: `${recordTitle} for ${
              pet?.name || "your pet"
            }`,
            date:
              record.created_at ||
              record.record_date,
            icon: <FileText size={20} />,
          });
        });
      }

      // -----------------------------------------
      // Sort newest first
      // -----------------------------------------

      allActivities.sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();

        return dateB - dateA;
      });

      // -----------------------------------------
      // Keep only the 5 newest activities
      // -----------------------------------------

      setActivities(allActivities.slice(0, 5));
    } catch (err) {
      console.error("Recent activity error:", err);

      setError(
        err.message ||
          "Failed to load recent activity."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatRelativeTime(date) {
    if (!date) {
      return "Recently";
    }

    const activityDate = new Date(date);

    if (Number.isNaN(activityDate.getTime())) {
      return "Recently";
    }

    const now = new Date();

    const difference =
      now.getTime() - activityDate.getTime();

    // Future activity
    if (difference < 0) {
      const futureDifference = Math.abs(difference);

      const futureMinutes = Math.floor(
        futureDifference / (1000 * 60)
      );

      const futureHours = Math.floor(
        futureMinutes / 60
      );

      const futureDays = Math.floor(
        futureHours / 24
      );

      if (futureDays > 0) {
        return `In ${futureDays} ${
          futureDays === 1 ? "day" : "days"
        }`;
      }

      if (futureHours > 0) {
        return `In ${futureHours} ${
          futureHours === 1 ? "hour" : "hours"
        }`;
      }

      if (futureMinutes > 0) {
        return `In ${futureMinutes} ${
          futureMinutes === 1
            ? "minute"
            : "minutes"
        }`;
      }

      return "Upcoming";
    }

    const seconds = Math.floor(
      difference / 1000
    );

    const minutes = Math.floor(
      seconds / 60
    );

    const hours = Math.floor(
      minutes / 60
    );

    const days = Math.floor(
      hours / 24
    );

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    if (hours < 24) {
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ago`;
    }

    if (days < 7) {
      return `${days} ${
        days === 1 ? "day" : "days"
      } ago`;
    }

    return activityDate.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5 text-slate-900">
        Recent Activity
      </h2>

      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500">
            Loading recent activity...
          </p>
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={loadRecentActivity}
            className="mt-3 text-sm font-semibold text-red-700 hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No activity */}

      {!loading &&
        !error &&
        activities.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-600">
              No recent activity yet.
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Your pet, appointment,
              vaccination, and medical
              record activity will appear
              here.
            </p>
          </div>
        )}

      {/* Activities */}

      {!loading &&
        !error &&
        activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((activity) => (
              <Activity
                key={activity.id}
                icon={activity.icon}
                title={activity.title}
                time={formatRelativeTime(
                  activity.date
                )}
              />
            ))}
          </div>
        )}
    </div>
  );
}

export default RecentActivity;