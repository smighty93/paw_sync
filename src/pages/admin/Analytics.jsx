import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import { supabase } from "../../lib/supabase";

export default function Analytics() {
  const [appointmentMetrics, setAppointmentMetrics] = useState([
    {
      label: "Completed Consultations",
      value: "0",
      subtext: "0% of total",
    },
    {
      label: "Cancelled Appointments",
      value: "0",
      subtext: "0% of total",
    },
    {
      label: "No-Shows",
      value: "0",
      subtext: "0% of total",
    },
  ]);

  const [userGrowthMetrics, setUserGrowthMetrics] = useState([
    {
      label: "New Registrations (This Month)",
      value: "0",
      subtext: "0% increase",
    },
    {
      label: "Active Monthly Pet Owners",
      value: "0",
      subtext: "0 active",
    },
    {
      label: "Active Veterinarians",
      value: "0",
      subtext: "0 total",
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      // --------------------------------------------------
      // DATE RANGE
      // --------------------------------------------------

      const now = new Date();

      const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

      const startOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      );

      // --------------------------------------------------
      // APPOINTMENTS
      // --------------------------------------------------

      const { data: appointments, error: appointmentsError } =
        await supabase
          .from("appointments")
          .select("id, status, appointment_date, created_at, pet_id")
          .gte("appointment_date", startOfMonth.toISOString())
          .lt(
            "appointment_date",
            startOfNextMonth.toISOString()
          );

      if (appointmentsError) {
        throw appointmentsError;
      }

      const totalAppointments = appointments?.length ?? 0;

      const completed =
        appointments?.filter(
          (appointment) =>
            appointment.status?.toLowerCase() === "completed"
        ).length ?? 0;

      const cancelled =
        appointments?.filter(
          (appointment) =>
            appointment.status?.toLowerCase() === "cancelled"
        ).length ?? 0;

      const noShows =
        appointments?.filter(
          (appointment) =>
            appointment.status?.toLowerCase() === "no-show" ||
            appointment.status?.toLowerCase() === "no_show" ||
            appointment.status?.toLowerCase() === "noshow"
        ).length ?? 0;

      const percentage = (value) => {
        if (!totalAppointments) return 0;

        return Math.round(
          (value / totalAppointments) * 100
        );
      };

      setAppointmentMetrics([
        {
          label: "Completed Consultations",
          value: completed.toLocaleString(),
          subtext: `${percentage(completed)}% of total`,
        },
        {
          label: "Cancelled Appointments",
          value: cancelled.toLocaleString(),
          subtext: `${percentage(cancelled)}% of total`,
        },
        {
          label: "No-Shows",
          value: noShows.toLocaleString(),
          subtext: `${percentage(noShows)}% of total`,
        },
      ]);

      // --------------------------------------------------
      // NEW REGISTRATIONS
      // --------------------------------------------------

      const { count: newRegistrations, error: registrationsError } =
        await supabase
          .from("profiles")
          .select("id", {
            count: "exact",
            head: true,
          })
          .gte("created_at", startOfMonth.toISOString())
          .lt(
            "created_at",
            startOfNextMonth.toISOString()
          );

      if (registrationsError) {
        throw registrationsError;
      }

      // --------------------------------------------------
      // ACTIVE VETERINARIANS
      // --------------------------------------------------

      const { count: veterinarians, error: veterinariansError } =
        await supabase
          .from("profiles")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("role", "veterinarian");

      if (veterinariansError) {
        throw veterinariansError;
      }

      // --------------------------------------------------
      // ACTIVE MONTHLY PET OWNERS
      //
      // A pet owner is considered active if one of their
      // pets has an appointment during the current month.
      // --------------------------------------------------

      const petIds = [
        ...new Set(
          (appointments ?? [])
            .map((appointment) => appointment.pet_id)
            .filter(Boolean)
        ),
      ];

      let activePetOwners = 0;

      if (petIds.length > 0) {
        const { data: pets, error: petsError } =
          await supabase
            .from("pets")
            .select("id, owner_id")
            .in("id", petIds);

        if (petsError) {
          throw petsError;
        }

        activePetOwners = new Set(
          (pets ?? [])
            .map((pet) => pet.owner_id)
            .filter(Boolean)
        ).size;
      }

      // --------------------------------------------------
      // USER GROWTH METRICS
      // --------------------------------------------------

      setUserGrowthMetrics([
        {
          label: "New Registrations (This Month)",
          value: `+${(
            newRegistrations ?? 0
          ).toLocaleString()}`,
          subtext: "New accounts",
        },
        {
          label: "Active Monthly Pet Owners",
          value: activePetOwners.toLocaleString(),
          subtext: "Based on appointments",
        },
        {
          label: "Active Veterinarians",
          value: (veterinarians ?? 0).toLocaleString(),
          subtext: "Registered veterinarians",
        },
      ]);
    } catch (error) {
      console.error(
        "Error loading analytics:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            System Analytics
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Key metrics and platform usage performance.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
            <p className="text-slate-500">
              Loading analytics...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <AnalyticsCard
              title="Appointment Metrics"
              metrics={appointmentMetrics}
            />

            <AnalyticsCard
              title="User Growth & Engagement"
              metrics={userGrowthMetrics}
            />

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}