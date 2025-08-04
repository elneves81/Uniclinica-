"use client";

import { useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  CreditCard,
  Receipt,
  PieChart,
  BarChart3,
  AlertCircle
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  patientName?: string;
  paymentMethod: "cash" | "card" | "pix" | "insurance" | "installment";
  status: "paid" | "pending" | "overdue" | "cancelled";
  dueDate?: string;
  invoiceNumber?: string;
}

interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingReceivables: number;
  overdueReceivables: number;
  monthlyGrowth: number;
}

// Dados mock
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "income",
    category: "Consulta Clínica Geral",
    description: "Consulta - Maria Silva Santos",
    amount: 250.00,
    patientName: "Maria Silva Santos",
    paymentMethod: "card",
    status: "paid",
    invoiceNumber: "INV-2024-001"
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "income",
    category: "Consulta Pediatria",
    description: "Consulta Pediatria - João Pedro",
    amount: 300.00,
    patientName: "João Pedro Silva",
    paymentMethod: "insurance",
    status: "paid",
    invoiceNumber: "INV-2024-002"
  },
  {
    id: "3",
    date: "2024-01-13",
    type: "expense",
    category: "Material Médico",
    description: "Compra de materiais descartáveis",
    amount: 180.00,
    paymentMethod: "card",
    status: "paid"
  },
  {
    id: "4",
    date: "2024-01-12",
    type: "income",
    category: "Exame Dermatoscopia",
    description: "Dermatoscopia - Ana Costa",
    amount: 400.00,
    patientName: "Ana Costa",
    paymentMethod: "pix",
    status: "pending",
    dueDate: "2024-01-20"
  }
];

const mockSummary: FinancialSummary = {
  totalIncome: 15420.00,
  totalExpenses: 4250.00,
  netProfit: 11170.00,
  pendingReceivables: 1200.00,
  overdueReceivables: 450.00,
  monthlyGrowth: 12.5
};

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [summary, setSummary] = useState<FinancialSummary>(mockSummary);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.invoiceNumber?.includes(searchTerm);
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      paid: { color: "bg-green-100 text-green-800", label: "Pago" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pendente" },
      overdue: { color: "bg-red-100 text-red-800", label: "Vencido" },
      cancelled: { color: "bg-gray-100 text-gray-800", label: "Cancelado" }
    };
    const { color, label } = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cash": return "💵";
      case "card": return "💳";
      case "pix": return "📱";
      case "insurance": return "🏥";
      case "installment": return "📝";
      default: return "💰";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <DollarSign className="mr-3 h-8 w-8 text-green-600" />
              Gestão Financeira
            </h1>
            <p className="mt-2 text-gray-600">
              Controle financeiro completo da clínica
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalIncome)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Despesas</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalExpenses)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.netProfit)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">A Receber</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.pendingReceivables)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Receitas vs Despesas (Últimos 6 meses)
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            [Gráfico de Barras - Chart.js ou similar]
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="mr-2 h-5 w-5" />
            Receitas por Especialidade
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            [Gráfico de Pizza - Chart.js ou similar]
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os tipos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "paid" | "pending" | "overdue")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os status</option>
            <option value="paid">Pagos</option>
            <option value="pending">Pendentes</option>
            <option value="overdue">Vencidos</option>
          </select>

          <input
            type="month"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transações Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </div>
                    {transaction.patientName && (
                      <div className="text-sm text-gray-500">
                        Paciente: {transaction.patientName}
                      </div>
                    )}
                    {transaction.invoiceNumber && (
                      <div className="text-sm text-gray-500">
                        NF: {transaction.invoiceNumber}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="flex items-center">
                      <span className="mr-2">{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                      {transaction.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Receipt className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertas Financeiros */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {summary.overdueReceivables > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
              <div className="text-sm text-red-800">
                <strong>Atenção:</strong> Há {formatCurrency(summary.overdueReceivables)} em valores vencidos. 
                Recomenda-se entrar em contato com os pacientes.
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
            <div className="text-sm text-blue-800">
              <strong>Performance:</strong> Crescimento de {summary.monthlyGrowth}% em relação ao mês anterior. 
              Continue com o excelente trabalho!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
