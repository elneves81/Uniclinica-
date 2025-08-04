"use client";

import { Users, Calendar, DollarSign, FileText, TrendingUp, TrendingDown } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function DashboardCard({ title, value, change, icon: Icon, color }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              {change.trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {change.value}% em relação ao mês anterior
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DashboardCards() {
  const cards = [
    {
      title: "Pacientes Ativos",
      value: "1,234",
      change: { value: 8, trend: "up" as const },
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Consultas Hoje",
      value: "24",
      change: { value: 12, trend: "up" as const },
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.280",
      change: { value: 15, trend: "up" as const },
      icon: DollarSign,
      color: "bg-yellow-500"
    },
    {
      title: "Prontuários",
      value: "856",
      change: { value: 3, trend: "down" as const },
      icon: FileText,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <DashboardCard key={index} {...card} />
      ))}
    </div>
  );
}
