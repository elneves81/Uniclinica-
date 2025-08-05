import { NextRequest, NextResponse } from 'next/server';

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: "M" | "F" | "O";
  date: string;
  doctorName: string;
  specialty: string;
  type: "consultation" | "exam" | "procedure" | "emergency";
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamination: {
    generalAppearance: string;
    vitalSigns: {
      bloodPressure: string;
      heartRate: number;
      temperature: number;
      respiratoryRate: number;
      oxygenSaturation: number;
    };
    systemicExamination: string;
  };
  diagnosis: {
    primary: string;
    secondary?: string[];
    icd10: string;
  };
  treatment: {
    medications: string[];
    procedures: string[];
    instructions: string;
  };
  attachments: {
    type: "exam" | "image" | "document";
    name: string;
    url: string;
  }[];
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Mock data para prontuários
const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    patientId: "P001",
    patientName: "Maria Silva Santos",
    patientAge: 45,
    patientGender: "F",
    date: "2024-01-15",
    doctorName: "Dr. João Carlos",
    specialty: "Clínica Geral",
    type: "consultation",
    chiefComplaint: "Dor de cabeça há 3 dias",
    historyOfPresentIllness: "Paciente relata cefaleia frontal pulsátil há 3 dias, sem fatores desencadeantes identificados. Associada a fotofobia leve. Sem náuseas ou vômitos.",
    physicalExamination: {
      generalAppearance: "Paciente em bom estado geral, corada, hidratada, anictérica",
      vitalSigns: {
        bloodPressure: "130/80",
        heartRate: 72,
        temperature: 36.5,
        respiratoryRate: 16,
        oxygenSaturation: 98
      },
      systemicExamination: "Exame neurológico sem alterações. Fundo de olho normal."
    },
    diagnosis: {
      primary: "Cefaleia tensional",
      secondary: ["Estresse ocupacional"],
      icd10: "G44.2"
    },
    treatment: {
      medications: ["Dipirona 500mg - 1 cp de 6/6h por 3 dias"],
      procedures: [],
      instructions: "Repouso, evitar estresse, retorno se persistir"
    },
    attachments: [],
    status: "completed",
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T09:30:00Z"
  },
  {
    id: "2",
    patientId: "P002",
    patientName: "Carlos Roberto Lima",
    patientAge: 38,
    patientGender: "M",
    date: "2024-01-14",
    doctorName: "Dra. Ana Paula",
    specialty: "Cardiologia",
    type: "consultation",
    chiefComplaint: "Dor no peito durante exercícios",
    historyOfPresentIllness: "Paciente refere dor precordial durante atividade física há 2 semanas. Dor em aperto, irradiando para braço esquerdo.",
    physicalExamination: {
      generalAppearance: "Paciente ansioso, corado, hidratado",
      vitalSigns: {
        bloodPressure: "150/95",
        heartRate: 88,
        temperature: 36.7,
        respiratoryRate: 18,
        oxygenSaturation: 97
      },
      systemicExamination: "Ausculta cardíaca: ritmo regular, sem sopros. Pulmões livres."
    },
    diagnosis: {
      primary: "Angina de esforço",
      secondary: ["Hipertensão arterial"],
      icd10: "I20.8"
    },
    treatment: {
      medications: ["Losartana 50mg - 1 cp/dia", "AAS 100mg - 1 cp/dia"],
      procedures: ["ECG", "Ecocardiograma"],
      instructions: "Retorno em 14 dias com exames. Evitar esforços intensos."
    },
    attachments: [
      {
        type: "exam",
        name: "ECG_20240114.pdf",
        url: "/files/ecg_carlos.pdf"
      }
    ],
    status: "active",
    createdAt: "2024-01-14T14:15:00Z",
    updatedAt: "2024-01-14T14:15:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');
    const specialty = searchParams.get('specialty');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredRecords = [...mockRecords];

    // Filtrar por paciente
    if (patientId) {
      filteredRecords = filteredRecords.filter(record => record.patientId === patientId);
    }

    // Filtrar por especialidade
    if (specialty) {
      filteredRecords = filteredRecords.filter(record => 
        record.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Filtrar por status
    if (status) {
      filteredRecords = filteredRecords.filter(record => record.status === status);
    }

    // Paginação
    const total = filteredRecords.length;
    const paginatedRecords = filteredRecords.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedRecords,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Erro ao buscar prontuários:', error);
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
    if (!data.patientId || !data.doctorName || !data.chiefComplaint) {
      return NextResponse.json({
        success: false,
        error: 'Campos obrigatórios: patientId, doctorName, chiefComplaint'
      }, { status: 400 });
    }

    // Criar novo prontuário
    const newRecord: MedicalRecord = {
      id: `REC-${Date.now()}`,
      patientId: data.patientId,
      patientName: data.patientName || 'Nome não informado',
      patientAge: data.patientAge || 0,
      patientGender: data.patientGender || 'O',
      date: data.date || new Date().toISOString().split('T')[0],
      doctorName: data.doctorName,
      specialty: data.specialty || 'Clínica Geral',
      type: data.type || 'consultation',
      chiefComplaint: data.chiefComplaint,
      historyOfPresentIllness: data.historyOfPresentIllness || '',
      physicalExamination: {
        generalAppearance: data.physicalExamination?.generalAppearance || '',
        vitalSigns: {
          bloodPressure: data.physicalExamination?.vitalSigns?.bloodPressure || '120/80',
          heartRate: data.physicalExamination?.vitalSigns?.heartRate || 70,
          temperature: data.physicalExamination?.vitalSigns?.temperature || 36.5,
          respiratoryRate: data.physicalExamination?.vitalSigns?.respiratoryRate || 16,
          oxygenSaturation: data.physicalExamination?.vitalSigns?.oxygenSaturation || 98
        },
        systemicExamination: data.physicalExamination?.systemicExamination || ''
      },
      diagnosis: {
        primary: data.diagnosis?.primary || '',
        secondary: data.diagnosis?.secondary || [],
        icd10: data.diagnosis?.icd10 || ''
      },
      treatment: {
        medications: data.treatment?.medications || [],
        procedures: data.treatment?.procedures || [],
        instructions: data.treatment?.instructions || ''
      },
      attachments: data.attachments || [],
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simular salvamento no banco de dados
    mockRecords.push(newRecord);

    return NextResponse.json({
      success: true,
      data: newRecord,
      message: 'Prontuário criado com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
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
        error: 'ID do prontuário é obrigatório'
      }, { status: 400 });
    }

    // Encontrar prontuário
    const recordIndex = mockRecords.findIndex(record => record.id === id);
    
    if (recordIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Prontuário não encontrado'
      }, { status: 404 });
    }

    // Atualizar prontuário
    const updatedRecord = {
      ...mockRecords[recordIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };

    mockRecords[recordIndex] = updatedRecord;

    return NextResponse.json({
      success: true,
      data: updatedRecord,
      message: 'Prontuário atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar prontuário:', error);
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
        error: 'ID do prontuário é obrigatório'
      }, { status: 400 });
    }

    // Encontrar e remover prontuário
    const recordIndex = mockRecords.findIndex(record => record.id === id);
    
    if (recordIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Prontuário não encontrado'
      }, { status: 404 });
    }

    const deletedRecord = mockRecords.splice(recordIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedRecord,
      message: 'Prontuário removido com sucesso'
    });

  } catch (error) {
    console.error('Erro ao remover prontuário:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
