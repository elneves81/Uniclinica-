import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentAppointments } from "@/components/dashboard/recent-appointments";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);

    // Se não há sessão, redirecionar para login
    if (!session) {
      redirect("/auth/signin");
    }

    // Se há sessão, mostrar o dashboard
    return (
      <LayoutIntegrado>
        <div className="p-6">
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
        </div>
      </LayoutIntegrado>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    // Em caso de erro, redirecionar para login
    redirect("/auth/signin");
  }
}
