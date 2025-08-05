import { NextRequest, NextResponse } from "next/server";

// Simulação de dados para desenvolvimento
const mockPatients = [
  {
    id: "1",
    name: "MARIA SILVA SANTOS",
    cpf: "123.456.789-01",
    phone: "(11) 99999-9999",
    email: "maria.silva@email.com",
    birthDate: "1985-03-15",
    gender: "F",
    address: {
      street: "Rua das Flores",
      number: "123",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01000-000"
    },
    emergencyContact: {
      name: "João Silva",
      phone: "(11) 88888-8888"
    },
    notes: "Paciente com histórico de hipertensão"
  },
  {
    id: "2", 
    name: "JOÃO OLIVEIRA COSTA",
    cpf: "987.654.321-02",
    phone: "(11) 77777-7777",
    email: "joao.oliveira@email.com",
    birthDate: "1990-07-22",
    gender: "M",
    address: {
      street: "Av. Paulista",
      number: "456",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-000"
    },
    emergencyContact: {
      name: "Ana Costa",
      phone: "(11) 66666-6666"
    },
    notes: "Diabético tipo 2"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredPatients = mockPatients;
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredPatients = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.cpf.includes(searchTerm) ||
        patient.phone.includes(searchTerm)
      );
    }
    
    return NextResponse.json({
      patients: filteredPatients.slice(0, limit),
      total: filteredPatients.length,
      success: true
    });
    
  } catch (error) {
    console.error('Erro na API de pacientes:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json();
    
    // Validação básica
    if (!patientData.name || !patientData.phone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios', success: false },
        { status: 400 }
      );
    }
    
    // Simular criação do paciente
    const newPatient = {
      id: `patient_${Date.now()}`,
      ...patientData,
      name: patientData.name.toUpperCase()
    };
    
    return NextResponse.json({
      patient: newPatient,
      message: 'Paciente criado com sucesso',
      success: true
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
