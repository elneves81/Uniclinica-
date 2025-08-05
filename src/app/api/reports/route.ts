import { NextRequest, NextResponse } from 'next/server';

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
  data?: any;
  createdAt: string;
  updatedAt: string;
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
  patientsByAge: Array<{
    ageGroup: string;
    count: number;
    percentage: number;
  }>;
  appointmentsByDay: Array<{
    day: string;
    count: number;
  }>;
}

// Mock data para relatórios
const mockReports: Report[] = [
  {
    id: "RPT-001",
    name: "Relatório de Atendimentos",
    description: "Relatório detalhado de todas as consultas realizadas",
    category: "medical",
    type: "table",
    lastGenerated: "2024-01-15T10:30:00Z",
    frequency: "monthly",
    status: "completed",
    format: "pdf",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "RPT-002",
    name: "Análise Financeira",
    description: "Demonstrativo de receitas, despesas e lucratividade",
    category: "financial",
    type: "dashboard",
    lastGenerated: "2024-01-14T16:45:00Z",
    frequency: "weekly",
    status: "completed",
    format: "excel",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-14T16:45:00Z"
  },
  {
    id: "RPT-003",
    name: "Dashboard Operacional",
    description: "Métricas em tempo real do desempenho da clínica",
    category: "operational",
    type: "dashboard",
    frequency: "daily",
    status: "active",
    format: "html",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z"
  },
  {
    id: "RPT-004",
    name: "Relatório de Pacientes",
    description: "Cadastro e histórico de pacientes atendidos",
    category: "administrative",
    type: "table",
    lastGenerated: "2024-01-13T09:15:00Z",
    frequency: "monthly",
    status: "completed",
    format: "csv",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  }
];

const mockReportData: ReportData = {
  totalPatients: 1247,
  newPatientsThisMonth: 89,
  totalConsultations: 3456,
  consultationsThisMonth: 234,
  totalRevenue: 487650.00,
  revenueThisMonth: 28450.00,
  averageConsultationValue: 125.50,
  pendingPayments: 12350.00,
  specialtyBreakdown: [
    { specialty: "Clínica Geral", count: 145, percentage: 42.3 },
    { specialty: "Cardiologia", count: 87, percentage: 25.4 },
    { specialty: "Dermatologia", count: 56, percentage: 16.3 },
    { specialty: "Pediatria", count: 34, percentage: 9.9 },
    { specialty: "Ginecologia", count: 21, percentage: 6.1 }
  ],
  monthlyRevenue: [
    { month: "Jul", revenue: 45200, consultations: 289 },
    { month: "Ago", revenue: 52100, consultations: 324 },
    { month: "Set", revenue: 48900, consultations: 301 },
    { month: "Out", revenue: 56700, consultations: 367 },
    { month: "Nov", revenue: 51200, consultations: 318 },
    { month: "Dez", revenue: 62400, consultations: 398 }
  ],
  patientsByAge: [
    { ageGroup: "0-18", count: 156, percentage: 12.5 },
    { ageGroup: "19-35", count: 324, percentage: 26.0 },
    { ageGroup: "36-50", count: 398, percentage: 31.9 },
    { ageGroup: "51-65", count: 245, percentage: 19.6 },
    { ageGroup: "65+", count: 124, percentage: 10.0 }
  ],
  appointmentsByDay: [
    { day: "Segunda", count: 45 },
    { day: "Terça", count: 52 },
    { day: "Quarta", count: 48 },
    { day: "Quinta", count: 51 },
    { day: "Sexta", count: 38 },
    { day: "Sábado", count: 15 }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const reportId = searchParams.get('id');
    const generate = searchParams.get('generate') === 'true';
    const analytics = searchParams.get('analytics') === 'true';

    // Se solicitar analytics/dashboard data
    if (analytics) {
      return NextResponse.json({
        success: true,
        data: mockReportData
      });
    }

    // Se solicitar um relatório específico
    if (reportId) {
      const report = mockReports.find(r => r.id === reportId);
      
      if (!report) {
        return NextResponse.json({
          success: false,
          error: 'Relatório não encontrado'
        }, { status: 404 });
      }

      // Se solicitar geração do relatório
      if (generate) {
        const updatedReport = {
          ...report,
          lastGenerated: new Date().toISOString(),
          status: 'completed' as const,
          data: mockReportData,
          updatedAt: new Date().toISOString()
        };

        // Atualizar no mock
        const index = mockReports.findIndex(r => r.id === reportId);
        if (index !== -1) {
          mockReports[index] = updatedReport;
        }

        return NextResponse.json({
          success: true,
          data: updatedReport,
          message: 'Relatório gerado com sucesso'
        });
      }

      return NextResponse.json({
        success: true,
        data: report
      });
    }

    // Filtrar relatórios
    let filteredReports = [...mockReports];

    if (category) {
      filteredReports = filteredReports.filter(r => r.category === category);
    }

    if (status) {
      filteredReports = filteredReports.filter(r => r.status === status);
    }

    if (type) {
      filteredReports = filteredReports.filter(r => r.type === type);
    }

    // Ordenar por data de atualização (mais recente primeiro)
    filteredReports.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: filteredReports,
      total: filteredReports.length
    });

  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validação básica
    if (!data.name || !data.category || !data.type) {
      return NextResponse.json({
        success: false,
        error: 'Campos obrigatórios: name, category, type'
      }, { status: 400 });
    }

    // Criar novo relatório
    const newReport: Report = {
      id: `RPT-${Date.now()}`,
      name: data.name,
      description: data.description || '',
      category: data.category,
      type: data.type,
      frequency: data.frequency || 'on_demand',
      status: 'active',
      format: data.format || 'pdf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simular salvamento no banco de dados
    mockReports.push(newReport);

    return NextResponse.json({
      success: true,
      data: newReport,
      message: 'Relatório criado com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar relatório:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID do relatório é obrigatório'
      }, { status: 400 });
    }

    // Encontrar relatório
    const reportIndex = mockReports.findIndex(r => r.id === id);
    
    if (reportIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Relatório não encontrado'
      }, { status: 404 });
    }

    // Atualizar relatório
    const updatedReport = {
      ...mockReports[reportIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };

    mockReports[reportIndex] = updatedReport;

    return NextResponse.json({
      success: true,
      data: updatedReport,
      message: 'Relatório atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID do relatório é obrigatório'
      }, { status: 400 });
    }

    // Encontrar e remover relatório
    const reportIndex = mockReports.findIndex(r => r.id === id);
    
    if (reportIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Relatório não encontrado'
      }, { status: 404 });
    }

    const deletedReport = mockReports.splice(reportIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedReport,
      message: 'Relatório removido com sucesso'
    });

  } catch (error) {
    console.error('Erro ao remover relatório:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
