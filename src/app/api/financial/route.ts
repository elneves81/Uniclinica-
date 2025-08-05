import { NextRequest, NextResponse } from 'next/server';

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
  createdAt: string;
  updatedAt: string;
}

interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingReceivables: number;
  overdueReceivables: number;
  monthlyGrowth: number;
  transactionCount: number;
}

// Mock data para transações financeiras
const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    type: "income",
    category: "Consulta Clínica Geral",
    description: "Consulta - Maria Silva Santos",
    amount: 120.00,
    patientName: "Maria Silva Santos",
    paymentMethod: "card",
    status: "paid",
    invoiceNumber: "INV-2024-001",
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T09:30:00Z"
  },
  {
    id: "TXN-002",
    date: "2024-01-15",
    type: "expense",
    category: "Material Médico",
    description: "Compra de seringas e luvas",
    amount: 285.50,
    paymentMethod: "card",
    status: "paid",
    invoiceNumber: "EXP-2024-001",
    createdAt: "2024-01-15T10:15:00Z",
    updatedAt: "2024-01-15T10:15:00Z"
  },
  {
    id: "TXN-003",
    date: "2024-01-14",
    type: "income",
    category: "Consulta Cardiologia",
    description: "Consulta - Carlos Roberto Lima",
    amount: 180.00,
    patientName: "Carlos Roberto Lima",
    paymentMethod: "pix",
    status: "paid",
    invoiceNumber: "INV-2024-002",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "TXN-004",
    date: "2024-01-13",
    type: "income",
    category: "Exame Dermatológico",
    description: "Dermatoscopia - Ana Paula Costa",
    amount: 85.00,
    patientName: "Ana Paula Costa",
    paymentMethod: "insurance",
    status: "pending",
    dueDate: "2024-01-28",
    invoiceNumber: "INV-2024-003",
    createdAt: "2024-01-13T11:45:00Z",
    updatedAt: "2024-01-13T11:45:00Z"
  },
  {
    id: "TXN-005",
    date: "2024-01-12",
    type: "expense",
    category: "Manutenção",
    description: "Manutenção equipamento ultrassom",
    amount: 350.00,
    paymentMethod: "installment",
    status: "paid",
    invoiceNumber: "EXP-2024-002",
    createdAt: "2024-01-12T16:30:00Z",
    updatedAt: "2024-01-12T16:30:00Z"
  }
];

function calculateSummary(transactions: Transaction[]): FinancialSummary {
  const income = transactions
    .filter(t => t.type === 'income' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pending = transactions
    .filter(t => t.type === 'income' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const overdue = transactions
    .filter(t => t.type === 'income' && t.status === 'overdue')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    netProfit: income - expenses,
    pendingReceivables: pending,
    overdueReceivables: overdue,
    monthlyGrowth: 12.5, // Mock value
    transactionCount: transactions.length
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // income, expense
    const status = searchParams.get('status'); // paid, pending, overdue, cancelled
    const category = searchParams.get('category');
    const patientName = searchParams.get('patientName');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const summary = searchParams.get('summary') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredTransactions = [...mockTransactions];

    // Aplicar filtros
    if (type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === type);
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter(t => t.status === status);
    }

    if (category) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (patientName) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.patientName?.toLowerCase().includes(patientName.toLowerCase())
      );
    }

    if (startDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.date) <= new Date(endDate)
      );
    }

    // Se solicitado apenas o resumo
    if (summary) {
      const summaryData = calculateSummary(filteredTransactions);
      return NextResponse.json({
        success: true,
        data: summaryData
      });
    }

    // Ordenar por data (mais recente primeiro)
    filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Paginação
    const total = filteredTransactions.length;
    const paginatedTransactions = filteredTransactions.slice(offset, offset + limit);

    const summaryData = calculateSummary(filteredTransactions);

    return NextResponse.json({
      success: true,
      data: {
        transactions: paginatedTransactions,
        summary: summaryData
      },
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Erro ao buscar transações financeiras:', error);
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
    if (!data.type || !data.category || !data.description || !data.amount) {
      return NextResponse.json({
        success: false,
        error: 'Campos obrigatórios: type, category, description, amount'
      }, { status: 400 });
    }

    if (typeof data.amount !== 'number' || data.amount <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Valor deve ser um número positivo'
      }, { status: 400 });
    }

    // Gerar número da fatura
    const prefix = data.type === 'income' ? 'INV' : 'EXP';
    const invoiceNumber = `${prefix}-${new Date().getFullYear()}-${String(mockTransactions.length + 1).padStart(3, '0')}`;

    // Criar nova transação
    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      date: data.date || new Date().toISOString().split('T')[0],
      type: data.type,
      category: data.category,
      description: data.description,
      amount: data.amount,
      patientName: data.patientName,
      paymentMethod: data.paymentMethod || 'cash',
      status: data.status || 'paid',
      dueDate: data.dueDate,
      invoiceNumber: data.invoiceNumber || invoiceNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simular salvamento no banco de dados
    mockTransactions.push(newTransaction);

    return NextResponse.json({
      success: true,
      data: newTransaction,
      message: 'Transação criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar transação:', error);
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
        error: 'ID da transação é obrigatório'
      }, { status: 400 });
    }

    // Encontrar transação
    const transactionIndex = mockTransactions.findIndex(t => t.id === id);
    
    if (transactionIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Transação não encontrada'
      }, { status: 404 });
    }

    // Validar se valor foi alterado
    if (data.amount && (typeof data.amount !== 'number' || data.amount <= 0)) {
      return NextResponse.json({
        success: false,
        error: 'Valor deve ser um número positivo'
      }, { status: 400 });
    }

    // Atualizar transação
    const updatedTransaction = {
      ...mockTransactions[transactionIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };

    mockTransactions[transactionIndex] = updatedTransaction;

    return NextResponse.json({
      success: true,
      data: updatedTransaction,
      message: 'Transação atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
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
        error: 'ID da transação é obrigatório'
      }, { status: 400 });
    }

    // Encontrar e remover transação
    const transactionIndex = mockTransactions.findIndex(t => t.id === id);
    
    if (transactionIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Transação não encontrada'
      }, { status: 404 });
    }

    // Marcar como cancelada ao invés de deletar
    const cancelledTransaction = {
      ...mockTransactions[transactionIndex],
      status: 'cancelled' as const,
      updatedAt: new Date().toISOString()
    };

    mockTransactions[transactionIndex] = cancelledTransaction;

    return NextResponse.json({
      success: true,
      data: cancelledTransaction,
      message: 'Transação cancelada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao cancelar transação:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
