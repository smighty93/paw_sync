import React from "react";
import AnalyticsCard from "../../components/admin/AnalyticsCard";

export default function AnalyticsMobile() {
  const appointmentMetrics = [
    {
      label: "Completed Consultations",
      value: "1,420",
      subtext: "94% success rate",
    },
    {
      label: "Cancelled Appointments",
      value: "62",
      subtext: "4% of total",
    },
    {
      label: "No-Shows",
      value: "28",
      subtext: "2% of total",
    },
  ];

  const userGrowthMetrics = [
    {
      label: "New Registrations (This Month)",
      value: "+310",
      subtext: "15% increase",
    },
    {
      label: "Active Monthly Pet Owners",
      value: "1,150",
      subtext: "88% active rate",
    },
    {
      label: "Active Veterinarians",
      value: "84",
      subtext: "100% verified",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            System Analytics
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Key metrics and platform usage performance.
          </p>
        </div>

        {/* Appointment Metrics */}
        <AnalyticsCard
          title="Appointment Metrics"
          metrics={appointmentMetrics}
        />

        {/* User Growth */}
        <AnalyticsCard
          title="User Growth & Engagement"
          metrics={userGrowthMetrics}
        />

      </div>
    </div>
  );
}