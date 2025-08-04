"use client";

import { useState } from "react";
import { 
  FileText, 
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  FileBarChart,
  Printer,
  Mail,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string;
  category: "medical" | "financial" | "administrative" | "operational";
  type: "table" | "chart" | "dashboard" | "document";
  lastGenerated?: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "on_demand";
  status: "active" | "scheduled" | "completed" | "error";
  format: "pdf" | "excel" | "csv" | "html";
}

interface ReportData {
  totalPatients: number;
  newPatientsThisMonth: number;
  totalConsultations: number;
  consultationsThisMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  averageConsultationValue: number;
  pendingPayments: number;
  specialtyBreakdown: Array<{
    specialty: string;
    count: number;
    percentage: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    consultations: number;
  }>;
  ageDistribution: Array<{
    ageGroup: string;
    count: number;
    percentage: number;
  }>;
  paymentMethods: Array<{
    method: string;
    amount: number;
    percentage: number;
  }>;
}

// Dados mock para relatórios
const mockReports: Report[] = [
  {
    id: "rep_001",
    name: "Relatório de Atendimentos",
    description: "Relatório completo de consultas e atendimentos realizados",
    category: "medical",
    type: "table",
    lastGenerated: "2024-01-15T10:30:00Z",
    frequency: "monthly",
    status: "completed",
    format: "pdf"
  },
  {
    id: "rep_002",
    name: "Demonstrativo Financeiro",
    description: "Análise financeira detalhada com receitas e despesas",
    category: "financial",
    type: "dashboard",
    lastGenerated: "2024-01-14T16:20:00Z",
    frequency: "weekly",
    status: "completed",
    format: "excel"
  },
  {
    id: "rep_003",
    name: "Relatório de Prontuários",
    description: "Estatísticas de prontuários eletrônicos e registros médicos",
    category: "medical",
    type: "chart",
    frequency: "monthly",
    status: "scheduled",
    format: "pdf"
  },
  {
    id: "rep_004",
    name: "Análise de Especialidades",
    description: "Distribuição de consultas por especialidade médica",
    category: "operational",
    type: "chart",
    lastGenerated: "2024-01-13T09:15:00Z",
    frequency: "quarterly",
    status: "completed",
    format: "html"
  },
  {
    id: "rep_005",
    name: "Agenda e Agendamentos",
    description: "Relatório de ocupação da agenda e eficiência dos agendamentos",
    category: "administrative",
    type: "table",
    frequency: "weekly",
    status: "active",
    format: "csv"
  }
];

const mockReportData: ReportData = {
  totalPatients: 1847,
  newPatientsThisMonth: 123,
  totalConsultations: 5642,
  consultationsThisMonth: 387,
  totalRevenue: 892450.00,
  revenueThisMonth: 68750.00,
  averageConsultationValue: 175.50,
  pendingPayments: 12500.00,
  specialtyBreakdown: [
    { specialty: "Clínica Geral", count: 180, percentage: 46.5 },
    { specialty: "Pediatria", count: 95, percentage: 24.5 },
    { specialty: "Ginecologia", count: 72, percentage: 18.6 },
    { specialty: "Dermatologia", count: 40, percentage: 10.3 }
  ],
  monthlyRevenue: [
    { month: "Jul", revenue: 65000, consultations: 350 },
    { month: "Ago", revenue: 72000, consultations: 380 },
    { month: "Set", revenue: 68000, consultations: 365 },
    { month: "Out", revenue: 75000, consultations: 395 },
    { month: "Nov", revenue: 70000, consultations: 372 },
    { month: "Dez", revenue: 82000, consultations: 410 },
    { month: "Jan", revenue: 68750, consultations: 387 }
  ],
  ageDistribution: [
    { ageGroup: "0-18", count: 290, percentage: 15.7 },
    { ageGroup: "19-35", count: 485, percentage: 26.3 },
    { ageGroup: "36-50", count: 612, percentage: 33.1 },
    { ageGroup: "51-65", count: 352, percentage: 19.1 },
    { ageGroup: "65+", count: 108, percentage: 5.8 }
  ],
  paymentMethods: [
    { method: "Cartão de Crédito", amount: 35250, percentage: 51.3 },
    { method: "PIX", amount: 18750, percentage: 27.3 },
    { method: "Dinheiro", amount: 10125, percentage: 14.7 },
    { method: "Cartão de Débito", amount: 4625, percentage: 6.7 }
  ]
};

export default function RelatoriosPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [reportData] = useState<ReportData>(mockReportData);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getCategoryLabel = (category: string) => {
    const categories = {
      medical: "Médico",
      financial: "Financeiro",
      administrative: "Administrativo",
      operational: "Operacional",
      all: "Todos"
    };
    return categories[category as keyof typeof categories];
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: "bg-green-100 text-green-800", label: "Ativo", icon: Activity },
      scheduled: { color: "bg-yellow-100 text-yellow-800", label: "Agendado", icon: Clock },
      completed: { color: "bg-blue-100 text-blue-800", label: "Concluído", icon: CheckCircle },
      error: { color: "bg-red-100 text-red-800", label: "Erro", icon: AlertCircle }
    };
    const { color, label, icon: Icon } = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      table: FileText,
      chart: BarChart3,
      dashboard: PieChart,
      document: FileBarChart
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleGenerateReport = (report: Report) => {
    setSelectedReport(report);
    setShowPreview(true);
  };

  const handleDownloadReport = (format: string) => {
    // Simulação de download
    alert(`Baixando relatório em formato ${format.toUpperCase()}`);
  };

  const handleEmailReport = () => {
    alert("Relatório enviado por email");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileBarChart className="mr-3 h-8 w-8 text-blue-600" />
              Relatórios e Análises
            </h1>
            <p className="mt-2 text-gray-600">
              Geração e análise de relatórios médicos e administrativos
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Novo Relatório
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.totalPatients.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{reportData.newPatientsThisMonth} este mês</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Consultas Realizadas</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.totalConsultations.toLocaleString()}</p>
              <p className="text-sm text-green-600">{reportData.consultationsThisMonth} este mês</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {reportData.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              <p className="text-sm text-green-600">R$ {reportData.revenueThisMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} este mês</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valor Médio</p>
              <p className="text-2xl font-bold text-gray-900">R$ {reportData.averageConsultationValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              <p className="text-sm text-red-600">R$ {reportData.pendingPayments.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} pendente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as Categorias</option>
              <option value="medical">Médico</option>
              <option value="financial">Financeiro</option>
              <option value="administrative">Administrativo</option>
              <option value="operational">Operacional</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredReports.length} relatório(s) encontrado(s)
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Relatórios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Relatórios Disponíveis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Relatório
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Geração
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => {
                const TypeIcon = getTypeIcon(report.type);
                return (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <TypeIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {report.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getCategoryLabel(report.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {report.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.lastGenerated ? new Date(report.lastGenerated).toLocaleDateString("pt-BR") : "Nunca"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleGenerateReport(report)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Visualizar"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadReport(report.format)}
                        className="text-green-600 hover:text-green-900"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEmailReport()}
                        className="text-purple-600 hover:text-purple-900"
                        title="Enviar por Email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dashboard de Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Especialidade</h3>
          <div className="space-y-3">
            {reportData.specialtyBreakdown.map((specialty, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3" style={{
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                  }}></div>
                  <span className="text-sm font-medium text-gray-700">{specialty.specialty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">{specialty.count}</span>
                  <span className="text-sm text-gray-500">({specialty.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Idade</h3>
          <div className="space-y-3">
            {reportData.ageDistribution.map((age, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3" style={{
                    backgroundColor: `hsl(${120 + index * 30}, 70%, 50%)`
                  }}></div>
                  <span className="text-sm font-medium text-gray-700">{age.ageGroup} anos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">{age.count}</span>
                  <span className="text-sm text-gray-500">({age.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Preview do Relatório */}
      {showPreview && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Preview: {selectedReport.name}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Visão Geral", icon: BarChart3 },
                  { id: "details", label: "Detalhes", icon: FileText },
                  { id: "charts", label: "Gráficos", icon: PieChart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Conteúdo das Tabs */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{reportData.totalPatients}</p>
                    <p className="text-sm text-gray-600">Total de Pacientes</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{reportData.consultationsThisMonth}</p>
                    <p className="text-sm text-gray-600">Consultas este Mês</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">R$ {reportData.revenueThisMonth.toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-gray-600">Receita este Mês</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">R$ {reportData.averageConsultationValue}</p>
                    <p className="text-sm text-gray-600">Valor Médio</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Métodos de Pagamento</h4>
                  <div className="space-y-2">
                    {reportData.paymentMethods.map((method, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{method.method}</span>
                        <div className="text-right">
                          <span className="text-sm text-gray-900">R$ {method.amount.toLocaleString("pt-BR")}</span>
                          <span className="text-xs text-gray-500 ml-2">({method.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "charts" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Receita Mensal (Últimos 7 meses)</h4>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {reportData.monthlyRevenue.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-blue-500 w-8 rounded-t"
                          style={{ height: `${(month.revenue / 82000) * 200}px` }}
                          title={`${month.month}: R$ ${month.revenue.toLocaleString("pt-BR")}`}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => handleDownloadReport("pdf")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              <button 
                onClick={() => handleDownloadReport("excel")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Excel
              </button>
              <button 
                onClick={() => alert("Imprimindo relatório...")}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso sobre Relatórios */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileBarChart className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div className="text-sm text-blue-800">
            <strong>Sistema de Relatórios:</strong> Os relatórios seguem as diretrizes do CFM para documentação 
            médica e estão em conformidade com a LGPD para proteção de dados. Todos os relatórios podem ser 
            exportados em múltiplos formatos e incluem assinatura digital quando necessário.
          </div>
        </div>
      </div>
    </div>
  );
}
