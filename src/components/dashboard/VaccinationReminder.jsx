import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Syringe } from "lucide-react";
import { supabase } from "../../lib/supabase";

function ReminderCard({
  pet,
  vaccine,
  dueDate,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
          <Syringe size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {pet}
          </h3>

          <p className="text-sm text-slate-500">
            {vaccine}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-sm text-red-500 font-medium">
          Due: {dueDate}
        </span>
      </div>
    </div>
  );
}

function VaccinationReminder() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadVaccinationReminders();
  }, []);

  async function loadVaccinationReminders() {
    setLoading(true);
    setError("");

    try {
      // -----------------------------------------
      // Get logged-in user
      // -----------------------------------------

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setReminders([]);
        return;
      }

      // -----------------------------------------
      // Get owner's pets
      // -----------------------------------------

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

      const petList = pets || [];

      const petIds = petList.map(
        (pet) => pet.id
      );

      if (petIds.length === 0) {
        setReminders([]);
        return;
      }

      // -----------------------------------------
      // Get upcoming vaccinations
      // -----------------------------------------

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const {
        data: vaccinations,
        error: vaccinationsError,
      } = await supabase
        .from("vaccinations")
        .select(
          `
            id,
            pet_id,
            vaccine_name,
            vaccination_date,
            next_due_date,
            notes
          `
        )
        .in("pet_id", petIds)
        .not("next_due_date", "is", null)
        .gte("next_due_date", today)
        .order("next_due_date", {
          ascending: true,
        })
        .limit(5);

      if (vaccinationsError) {
        throw vaccinationsError;
      }

      // -----------------------------------------
      // Connect vaccinations to pets
      // -----------------------------------------

      const formattedReminders = (
        vaccinations || []
      ).map((vaccination) => {
        const pet = petList.find(
          (item) =>
            item.id ===
            vaccination.pet_id
        );

        return {
          id: vaccination.id,
          pet:
            pet?.name || "Your Pet",
          vaccine:
            vaccination.vaccine_name ||
            "Vaccination",
          dueDate:
            vaccination.next_due_date,
          notes: vaccination.notes,
        };
      });

      setReminders(
        formattedReminders
      );
    } catch (err) {
      console.error(
        "Vaccination reminder error:",
        err
      );

      setError(
        err.message ||
          "Failed to load vaccination reminders."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDueDate(date) {
    if (!date) {
      return "Not scheduled";
    }

    const parsedDate = new Date(
      `${date}T00:00:00`
    );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
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

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Vaccination Reminders
        </h2>

        <Link
          to="/medical-records"
          className="text-blue-600 font-semibold hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500">
            Loading vaccination reminders...
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
            onClick={
              loadVaccinationReminders
            }
            className="mt-3 text-sm font-semibold text-red-700 hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No reminders */}

      {!loading &&
        !error &&
        reminders.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
                <Syringe size={22} />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  No vaccination reminders
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Upcoming vaccination
                  dates will appear
                  here.
                </p>
              </div>
            </div>

            <Link
              to="/medical-records"
              className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700"
            >
              View medical records →
            </Link>
          </div>
        )}

      {/* Reminders */}

      {!loading &&
        !error &&
        reminders.length > 0 && (
          <div className="space-y-4">
            {reminders.map(
              (reminder) => (
                <ReminderCard
                  key={reminder.id}
                  pet={reminder.pet}
                  vaccine={
                    reminder.vaccine
                  }
                  dueDate={formatDueDate(
                    reminder.dueDate
                  )}
                />
              )
            )}

            <Link
              to="/medical-records"
              className="inline-block pt-1 text-blue-600 font-semibold hover:text-blue-700"
            >
              View all vaccinations →
            </Link>
          </div>
        )}
    </div>
  );
}

export default VaccinationReminder;