"use client";

import React, { useState } from "react";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Download,
  Filter,
  Eye,
  Activity,
  Clock,
  Star,
  Heart,
  Stethoscope,
  PieChart,
  LineChart
} from "lucide-react";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

interface ReportData {
  id: string;
  title: string;
  type: 'financial' | 'clinical' | 'operational';
  period: string;
  value: number;
  change: number;
  status: 'up' | 'down' | 'stable';
}

interface SpecialtyStats {
  specialty: string;
  consultations: number;
  revenue: number;
  patients: number;
  satisfaction: number;
}

function RelatoriosContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const dashboardData: ReportData[] = [
    {
      id: "1",
      title: "Consultas Realizadas",
      type: "operational",
      period: "Este mês",
      value: 245,
      change: 12.5,
      status: "up"
    },
    {
      id: "2",
      title: "Receita Total",
      type: "financial",
      period: "Este mês",
      value: 87500,
      change: 8.3,
      status: "up"
    },
    {
      id: "3",
      title: "Pacientes Ativos",
      type: "clinical",
      period: "Este mês",
      value: 189,
      change: -2.1,
      status: "down"
    },
    {
      id: "4",
      title: "Taxa de Ocupação",
      type: "operational",
      period: "Este mês",
      value: 85,
      change: 5.2,
      status: "up"
    }
  ];

  const specialtyStats: SpecialtyStats[] = [
    {
      specialty: "Clínica Geral",
      consultations: 85,
      revenue: 25500,
      patients: 68,
      satisfaction: 4.8
    },
    {
      specialty: "Cardiologia",
      consultations: 42,
      revenue: 21000,
      patients: 35,
      satisfaction: 4.9
    },
    {
      specialty: "Dermatologia",
      consultations: 38,
      revenue: 19000,
      patients: 32,
      satisfaction: 4.7
    },
    {
      specialty: "Pediatria",
      consultations: 55,
      revenue: 16500,
      patients: 45,
      satisfaction: 4.9
    },
    {
      specialty: "Ginecologia",
      consultations: 25,
      revenue: 12500,
      patients: 22,
      satisfaction: 4.8
    }
  ];

  const reports = [
    {
      id: "1",
      title: "Relatório Mensal de Atendimentos",
      type: "Operacional",
      date: "Janeiro 2024",
      status: "Concluído",
      description: "Análise completa dos atendimentos realizados no mês"
    },
    {
      id: "2",
      title: "Análise Financeira Trimestral",
      type: "Financeiro",
      date: "Q4 2023",
      status: "Concluído",
      description: "Relatório detalhado de receitas e despesas do trimestre"
    },
    {
      id: "3",
      title: "Indicadores de Qualidade",
      type: "Clínico",
      date: "Janeiro 2024",
      status: "Em andamento",
      description: "Métricas de satisfação e qualidade do atendimento"
    },
    {
      id: "4",
      title: "Relatório de Especialidades",
      type: "Operacional",
      date: "Janeiro 2024",
      status: "Pendente",
      description: "Performance detalhada por especialidade médica"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "financial":
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case "clinical":
        return <Heart className="h-5 w-5 text-red-600" />;
      case "operational":
        return <Activity className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Relatórios e Analytics</h1>
              <p className="text-gray-600">Análise completa dos dados da clínica</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("specialties")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "specialties"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Por Especialidade
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reports"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Relatórios
            </button>
          </nav>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getTypeIcon(item.type)}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">{item.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.type === "financial" ? formatCurrency(item.value) : item.value}
                        {item.type === "operational" && item.title.includes("Taxa") && "%"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(item.status)}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      item.status === "up" ? "text-green-600" : 
                      item.status === "down" ? "text-red-600" : "text-yellow-600"
                    }`}>
                      {item.status === "up" ? "+" : ""}{item.change}%
                    </span>
                    <span className="text-sm text-gray-600 ml-2">{item.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Receita Mensal</h3>
                <LineChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico de linha - Receita por mês</p>
              </div>
            </div>

            {/* Consultations by Specialty */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Consultas por Especialidade</h3>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico de pizza - Distribuição por especialidade</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
                <div className="text-sm text-gray-600">Satisfação do Paciente</div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15min</div>
                <div className="text-sm text-gray-600">Tempo Médio de Espera</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
                <div className="text-sm text-gray-600">Taxa de Comparecimento</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specialties Tab */}
      {activeTab === "specialties" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Performance por Especialidade</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Especialidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Consultas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receita
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pacientes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satisfação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {specialtyStats.map((stat) => (
                    <tr key={stat.specialty} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Stethoscope className="h-5 w-5 text-blue-600 mr-3" />
                          <div className="text-sm font-medium text-gray-900">{stat.specialty}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.consultations}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(stat.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.patients}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                          <span className="text-sm text-gray-900">{stat.satisfaction}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Relatórios Disponíveis</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Novo Relatório
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                            <p className="text-sm text-gray-600">{report.description}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Tipo: {report.type}</span>
                          <span className="text-sm text-gray-500">Data: {report.date}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === "Concluído" ? "bg-green-100 text-green-800" :
                            report.status === "Em andamento" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RelatoriosPage() {
  return (
    <LayoutIntegrado>
      <RelatoriosContent />
    </LayoutIntegrado>
  );
}
