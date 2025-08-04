"use client";

import { useSession } from "next-auth/react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentAppointments } from "@/components/dashboard/recent-appointments";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";

export function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Bem-vindo ao Uniclínica, {session?.user?.name || "Usuário"}!
              </h1>
              <p className="text-gray-600">
                Aqui está um resumo das atividades da sua clínica hoje.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cards de estatísticas */}
              <div className="lg:col-span-2">
                <DashboardCards />
              </div>

              {/* Widget do calendário */}
              <div className="lg:col-span-1">
                <CalendarWidget />
              </div>

              {/* Consultas recentes */}
              <div className="lg:col-span-3">
                <RecentAppointments />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
