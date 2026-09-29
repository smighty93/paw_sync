import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock } from "lucide-react";
import { supabase } from "../../lib/supabase";

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
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
        setAppointments([]);
        return;
      }

      // Get pets belonging to the logged-in owner
      const {
        data: pets,
        error: petsError,
      } = await supabase
        .from("pets")
        .select("id, name")
        .eq("owner_id", user.id);

      if (petsError) {
        throw petsError;
      }

      const petIds = (pets || []).map(
        (pet) => pet.id
      );

      if (petIds.length === 0) {
        setAppointments([]);
        return;
      }

      // Get future appointments for owner's pets
      const {
        data,
        error: appointmentsError,
      } = await supabase
        .from("appointments")
        .select(`
          id,
          pet_id,
          veterinarian_id,
          appointment_date,
          reason,
          status
        `)
        .in("pet_id", petIds)
        .gte(
          "appointment_date",
          new Date().toISOString()
        )
        .order("appointment_date", {
          ascending: true,
        })
        .limit(3);

      if (appointmentsError) {
        throw appointmentsError;
      }

      const appointmentsWithPets = (
        data || []
      ).map((appointment) => {
        const pet = pets.find(
          (item) =>
            item.id === appointment.pet_id
        );

        return {
          ...appointment,
          petName:
            pet?.name || "Your Pet",
        };
      });

      setAppointments(
        appointmentsWithPets
      );
    } catch (err) {
      console.error(
        "Appointments error:",
        err
      );

      setError(
        err.message ||
          "Failed to load appointments."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString(
      [],
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  function formatTime(date) {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid time";
    }

    return parsedDate.toLocaleTimeString(
      [],
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  function getStatusClass(status) {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  function formatStatus(status) {
    if (!status) {
      return "Pending";
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  }

  return (
    <div className="mt-10">
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Upcoming Appointments
        </h2>

        <Link
          to="/appointments"
          className="text-blue-600 font-semibold hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500">
            Loading appointments...
          </p>
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="font-medium text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={loadAppointments}
            className="mt-4 text-sm font-semibold text-red-700 hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}

      {!loading &&
        !error &&
        appointments.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  No upcoming appointments
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Your future appointments will
                  appear here.
                </p>
              </div>
            </div>

            <Link
              to="/appointments"
              className="inline-block mt-5 text-blue-600 font-semibold hover:text-blue-700"
            >
              Book an appointment →
            </Link>
          </div>
        )}

      {/* Appointment List */}

      {!loading &&
        !error &&
        appointments.length > 0 && (
          <div className="space-y-4">
            {appointments.map(
              (appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {appointment.petName}
                      </h3>

                      <p className="text-slate-500 mt-1">
                        {appointment.reason ||
                          "Veterinary appointment"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {formatStatus(
                        appointment.status
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-5 mt-5 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} />

                      <span>
                        {formatDate(
                          appointment.appointment_date
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={17} />

                      <span>
                        {formatTime(
                          appointment.appointment_date
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* View all */}

            <div className="pt-1">
              <Link
                to="/appointments"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700"
              >
                View all appointments →
              </Link>
            </div>
          </div>
        )}
    </div>
  );
}

export default UpcomingAppointments;