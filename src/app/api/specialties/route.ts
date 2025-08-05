import { NextRequest, NextResponse } from 'next/server';

// Interface para consulta médica por especialidade
interface SpecialtyConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  specialty: 'pediatria' | 'dermatologia' | 'ginecologia' | 'ortopedia' | 'clinica-geral';
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Dados básicos da consulta
  chiefComplaint: string;
  currentIllness: string;
  physicalExam: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  followUp: string;
  
  // Dados específicos por especialidade
  specialtyData?: PediatriaData | DermatologiaData | GinecologiaData | OrtopediaData | ClinicaGeralData;
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  digitalSignature?: {
    doctor: string;
    crm: string;
    timestamp: string;
    hash: string;
  };
}

// Dados específicos da Pediatria
interface PediatriaData {
  birthHistory: {
    gestationalAge: number;
    birthWeight: number;
    birthLength: number;
    apgar1: number;
    apgar5: number;
    deliveryType: 'normal' | 'cesarean' | 'forceps';
  };
  development: {
    headControl: string;
    sitting: string;
    walking: string;
    firstWords: string;
    sphincterControl: string;
  };
  vaccination: {
    upToDate: boolean;
    missing: string[];
    next: string[];
  };
  anthropometry: {
    weight: number;
    height: number;
    headCircumference: number;
    weightPercentile: number;
    heightPercentile: number;
    hcPercentile: number;
  };
  feeding: {
    breastfeeding: string;
    complementaryFeeding: string;
    currentDiet: string;
    allergies: string[];
  };
}

// Dados específicos da Dermatologia
interface DermatologiaData {
  skinType: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  lesions: Array<{
    id: string;
    location: string;
    type: string;
    size: string;
    characteristics: string;
    evolution: string;
    suspicious: boolean;
  }>;
  dermatoscopy: {
    performed: boolean;
    findings: string;
    images?: string[];
  };
  bodyMapping: {
    performed: boolean;
    totalLesions: number;
    suspiciousLesions: number;
    followUpRecommended: boolean;
  };
  skinCare: {
    products: string[];
    sunProtection: string;
    recommendations: string[];
  };
  allergies: {
    contact: string[];
    food: string[];
    medications: string[];
  };
}

// Dados específicos da Ginecologia
interface GinecologiaData {
  menstrualHistory: {
    menarche: number;
    cycleLength: number;
    flowDuration: number;
    lastPeriod: string;
    regularity: 'regular' | 'irregular';
  };
  obstetricHistory: {
    pregnancies: number;
    births: number;
    abortions: number;
    liveBirths: number;
  };
  contraception: {
    current: string;
    previous: string[];
    effectiveness: string;
  };
  screenings: {
    papSmear: {
      lastDate: string;
      result: string;
      nextDue: string;
    };
    mammography: {
      lastDate: string;
      result: string;
      nextDue: string;
    };
    ultrasound: {
      lastDate: string;
      findings: string;
    };
  };
  symptoms: {
    pelvicPain: boolean;
    abnormalBleeding: boolean;
    discharge: boolean;
    hotFlashes: boolean;
    other: string[];
  };
}

// Dados específicos da Ortopedia
interface OrtopediaData {
  injury: {
    mechanism: string;
    location: string;
    severity: 'mild' | 'moderate' | 'severe';
    onset: string;
  };
  examination: {
    inspection: string;
    palpation: string;
    rangeOfMotion: string;
    specialTests: string[];
    neurovascular: string;
  };
  imaging: {
    xray: {
      performed: boolean;
      findings: string;
      images?: string[];
    };
    mri: {
      performed: boolean;
      findings: string;
    };
    ct: {
      performed: boolean;
      findings: string;
    };
  };
  functionalAssessment: {
    painScale: number;
    mobility: string;
    activities: string;
    limitations: string[];
  };
  treatment: {
    conservative: string[];
    medications: string[];
    physiotherapy: boolean;
    surgery: {
      indicated: boolean;
      procedure: string;
      urgency: string;
    };
  };
}

// Dados específicos da Clínica Geral
interface ClinicaGeralData {
  vitalSigns: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
    bmi: number;
  };
  chronicConditions: {
    diabetes: {
      present: boolean;
      type: string;
      controlled: boolean;
      lastHbA1c: number;
    };
    hypertension: {
      present: boolean;
      controlled: boolean;
      medications: string[];
    };
    dyslipidemia: {
      present: boolean;
      lastLipidProfile: string;
    };
  };
  preventiveCare: {
    vaccinations: {
      upToDate: boolean;
      needed: string[];
    };
    screenings: {
      colonoscopy: string;
      mammography: string;
      papSmear: string;
      prostate: string;
    };
  };
  lifestyle: {
    smoking: boolean;
    alcohol: string;
    exercise: string;
    diet: string;
  };
  familyHistory: {
    cardiovascular: boolean;
    diabetes: boolean;
    cancer: string[];
    other: string[];
  };
}

// Mock data para demonstração
const mockConsultations: SpecialtyConsultation[] = [
  {
    id: "SPEC001",
    patientId: "PAT001",
    doctorId: "DOC001",
    specialty: "pediatria",
    date: "2024-01-15",
    time: "09:00",
    status: "completed",
    chiefComplaint: "Febre há 2 dias",
    currentIllness: "Criança apresenta febre de 38.5°C há 2 dias, associada a irritabilidade e redução do apetite.",
    physicalExam: "BEG, ativa, reativa, hidratada, corada. Orofaringe hiperemiada. Demais aparelhos sem alterações.",
    diagnosis: "Faringite viral",
    treatment: "Sintomático com analgésico/antitérmico",
    prescription: "Dipirona 15mg/kg/dose de 6/6h se febre",
    followUp: "Retorno se piora ou persistência dos sintomas",
    specialtyData: {
      birthHistory: {
        gestationalAge: 39,
        birthWeight: 3200,
        birthLength: 49,
        apgar1: 9,
        apgar5: 10,
        deliveryType: "normal"
      },
      development: {
        headControl: "2 meses",
        sitting: "6 meses",
        walking: "12 meses",
        firstWords: "10 meses",
        sphincterControl: "Em andamento"
      },
      vaccination: {
        upToDate: true,
        missing: [],
        next: ["Tríplice viral (12 meses)"]
      },
      anthropometry: {
        weight: 10.5,
        height: 76,
        headCircumference: 46,
        weightPercentile: 50,
        heightPercentile: 75,
        hcPercentile: 50
      },
      feeding: {
        breastfeeding: "Exclusivo até 6 meses",
        complementaryFeeding: "Iniciada aos 6 meses",
        currentDiet: "Variada, adequada para idade",
        allergies: []
      }
    } as PediatriaData,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:45:00Z"
  },
  {
    id: "SPEC002",
    patientId: "PAT002",
    doctorId: "DOC002",
    specialty: "dermatologia",
    date: "2024-01-16",
    time: "14:30",
    status: "completed",
    chiefComplaint: "Mancha escura nas costas",
    currentIllness: "Paciente relata aparecimento de mancha escura no dorso há 3 meses, com crescimento progressivo.",
    physicalExam: "Lesão pigmentada de 8mm no dorso, bordas irregulares, coloração heterogênea.",
    diagnosis: "Nevo displásico - investigação",
    treatment: "Biópsia excisional programada",
    prescription: "Protetor solar FPS 60+ - uso diário",
    followUp: "Retorno em 15 dias para resultado da biópsia",
    specialtyData: {
      skinType: "III",
      lesions: [
        {
          id: "L001",
          location: "Dorso - região escapular direita",
          type: "Nevo pigmentado",
          size: "8mm x 6mm",
          characteristics: "Bordas irregulares, coloração heterogênea",
          evolution: "Crescimento nos últimos 3 meses",
          suspicious: true
        }
      ],
      dermatoscopy: {
        performed: true,
        findings: "Padrão atípico com rede pigmentar irregular e pontos azul-acinzentados",
        images: ["dermatoscopia_001.jpg"]
      },
      bodyMapping: {
        performed: true,
        totalLesions: 12,
        suspiciousLesions: 1,
        followUpRecommended: true
      },
      skinCare: {
        products: ["Protetor solar FPS 60+", "Hidratante corporal"],
        sunProtection: "Uso diário de protetor solar, evitar exposição entre 10h-16h",
        recommendations: ["Autoexame mensal", "Consultas semestrais"]
      },
      allergies: {
        contact: [],
        food: [],
        medications: []
      }
    } as DermatologiaData,
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T15:15:00Z"
  },
  {
    id: "SPEC003",
    patientId: "PAT003",
    doctorId: "DOC003",
    specialty: "ginecologia",
    date: "2024-01-17",
    time: "10:00",
    status: "completed",
    chiefComplaint: "Consulta de rotina e renovação de anticoncepcional",
    currentIllness: "Paciente para consulta de rotina, sem queixas. Uso de anticoncepcional oral há 2 anos.",
    physicalExam: "Exame ginecológico: colo uterino normal, útero de tamanho normal, anexos não palpáveis.",
    diagnosis: "Consulta de rotina - sem alterações",
    treatment: "Manutenção do anticoncepcional atual",
    prescription: "Drospirenona 3mg + Etinilestradiol 0,03mg - 1 cp/dia",
    followUp: "Retorno em 6 meses ou se intercorrências",
    specialtyData: {
      menstrualHistory: {
        menarche: 13,
        cycleLength: 28,
        flowDuration: 5,
        lastPeriod: "2024-01-10",
        regularity: "regular"
      },
      obstetricHistory: {
        pregnancies: 0,
        births: 0,
        abortions: 0,
        liveBirths: 0
      },
      contraception: {
        current: "Anticoncepcional oral combinado",
        previous: ["Preservativo"],
        effectiveness: "Excelente com uso correto"
      },
      screenings: {
        papSmear: {
          lastDate: "2023-06-15",
          result: "Normal",
          nextDue: "2024-06-15"
        },
        mammography: {
          lastDate: "N/A",
          result: "N/A - não indicado pela idade",
          nextDue: "Aos 40 anos"
        },
        ultrasound: {
          lastDate: "2023-08-20",
          findings: "Útero e anexos normais"
        }
      },
      symptoms: {
        pelvicPain: false,
        abnormalBleeding: false,
        discharge: false,
        hotFlashes: false,
        other: []
      }
    } as GinecologiaData,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:30:00Z"
  },
  {
    id: "SPEC004",
    patientId: "PAT004",
    doctorId: "DOC004",
    specialty: "ortopedia",
    date: "2024-01-18",
    time: "16:00",
    status: "completed",
    chiefComplaint: "Dor no joelho esquerdo após atividade física",
    currentIllness: "Paciente refere dor no joelho esquerdo há 1 semana, iniciada após corrida. Dor piora com movimento.",
    physicalExam: "Joelho com edema discreto, dor à palpação do côndilo femoral lateral. McMurray negativo.",
    diagnosis: "Síndrome da banda iliotibial",
    treatment: "Repouso relativo, fisioterapia, anti-inflamatório",
    prescription: "Ibuprofeno 600mg de 8/8h por 7 dias + fisioterapia",
    followUp: "Retorno em 15 dias para reavaliação",
    specialtyData: {
      injury: {
        mechanism: "Sobrecarga por atividade física repetitiva",
        location: "Joelho esquerdo - região lateral",
        severity: "mild",
        onset: "Há 1 semana"
      },
      examination: {
        inspection: "Edema discreto, sem deformidade",
        palpation: "Dor no côndilo femoral lateral",
        rangeOfMotion: "Flexão limitada por dor (0-120°)",
        specialTests: ["McMurray: negativo", "Teste de Ober: positivo"],
        neurovascular: "Preservado"
      },
      imaging: {
        xray: {
          performed: true,
          findings: "Estruturas ósseas preservadas",
          images: ["xray_joelho_001.jpg"]
        },
        mri: {
          performed: false,
          findings: ""
        },
        ct: {
          performed: false,
          findings: ""
        }
      },
      functionalAssessment: {
        painScale: 6,
        mobility: "Marcha claudicante",
        activities: "Limitado para corrida e saltos",
        limitations: ["Corrida", "Subir escadas", "Agachamento"]
      },
      treatment: {
        conservative: ["Repouso relativo", "Gelo local", "Alongamento"],
        medications: ["Ibuprofeno 600mg 8/8h"],
        physiotherapy: true,
        surgery: {
          indicated: false,
          procedure: "",
          urgency: ""
        }
      }
    } as OrtopediaData,
    createdAt: "2024-01-18T16:00:00Z",
    updatedAt: "2024-01-18T16:45:00Z"
  },
  {
    id: "SPEC005",
    patientId: "PAT005",
    doctorId: "DOC005",
    specialty: "clinica-geral",
    date: "2024-01-19",
    time: "08:30",
    status: "completed",
    chiefComplaint: "Checkup anual",
    currentIllness: "Paciente para consulta de rotina anual. Refere-se bem, sem queixas específicas.",
    physicalExam: "BEG, PA: 130/85 mmHg, FC: 72 bpm, Peso: 78kg, Altura: 1,70m. Exame cardiovascular e pulmonar normais.",
    diagnosis: "Hipertensão arterial leve, sobrepeso",
    treatment: "Medidas dietéticas, atividade física, controle pressórico",
    prescription: "Losartana 50mg 1x/dia, retorno com exames laboratoriais",
    followUp: "Retorno em 30 dias com exames laboratoriais",
    specialtyData: {
      vitalSigns: {
        bloodPressure: "130/85",
        heartRate: 72,
        temperature: 36.5,
        weight: 78,
        height: 170,
        bmi: 27.0
      },
      chronicConditions: {
        diabetes: {
          present: false,
          type: "",
          controlled: false,
          lastHbA1c: 0
        },
        hypertension: {
          present: true,
          controlled: false,
          medications: ["Losartana 50mg"]
        },
        dyslipidemia: {
          present: false,
          lastLipidProfile: "2023-12-15"
        }
      },
      preventiveCare: {
        vaccinations: {
          upToDate: true,
          needed: []
        },
        screenings: {
          colonoscopy: "Indicada - agendar",
          mammography: "N/A",
          papSmear: "N/A",
          prostate: "Normal - 2023"
        }
      },
      lifestyle: {
        smoking: false,
        alcohol: "Social (fins de semana)",
        exercise: "Sedentário",
        diet: "Hipercalórica"
      },
      familyHistory: {
        cardiovascular: true,
        diabetes: true,
        cancer: ["Próstata (pai)"],
        other: []
      }
    } as ClinicaGeralData,
    createdAt: "2024-01-19T08:30:00Z",
    updatedAt: "2024-01-19T09:15:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredConsultations = [...mockConsultations];

    // Aplicar filtros
    if (specialty) {
      filteredConsultations = filteredConsultations.filter(
        consultation => consultation.specialty === specialty
      );
    }

    if (patientId) {
      filteredConsultations = filteredConsultations.filter(
        consultation => consultation.patientId === patientId
      );
    }

    if (doctorId) {
      filteredConsultations = filteredConsultations.filter(
        consultation => consultation.doctorId === doctorId
      );
    }

    if (status) {
      filteredConsultations = filteredConsultations.filter(
        consultation => consultation.status === status
      );
    }

    if (dateFrom) {
      filteredConsultations = filteredConsultations.filter(
        consultation => consultation.date >= dateFrom
      );
    }

    if (dateTo) {
      filteredConsultations = filteredConsultations.filter(
        consultation => consultation.date <= dateTo
      );
    }

    // Paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedConsultations = filteredConsultations.slice(startIndex, endIndex);

    // Estatísticas por especialidade
    const specialtyStats = {
      pediatria: filteredConsultations.filter(c => c.specialty === 'pediatria').length,
      dermatologia: filteredConsultations.filter(c => c.specialty === 'dermatologia').length,
      ginecologia: filteredConsultations.filter(c => c.specialty === 'ginecologia').length,
      ortopedia: filteredConsultations.filter(c => c.specialty === 'ortopedia').length,
      clinicaGeral: filteredConsultations.filter(c => c.specialty === 'clinica-geral').length,
    };

    return NextResponse.json({
      success: true,
      data: paginatedConsultations,
      pagination: {
        page,
        limit,
        total: filteredConsultations.length,
        totalPages: Math.ceil(filteredConsultations.length / limit),
        hasNext: endIndex < filteredConsultations.length,
        hasPrev: page > 1
      },
      stats: specialtyStats,
      message: 'Consultas por especialidade listadas com sucesso'
    });

  } catch (error) {
    console.error('Erro ao buscar consultas por especialidade:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validações básicas
    const requiredFields = ['patientId', 'doctorId', 'specialty', 'date', 'time', 'chiefComplaint'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          message: `Campo obrigatório ausente: ${field}`,
          data: null
        }, { status: 400 });
      }
    }

    // Validar especialidade
    const validSpecialties = ['pediatria', 'dermatologia', 'ginecologia', 'ortopedia', 'clinica-geral'];
    if (!validSpecialties.includes(body.specialty)) {
      return NextResponse.json({
        success: false,
        message: 'Especialidade inválida',
        data: null
      }, { status: 400 });
    }

    const newConsultation: SpecialtyConsultation = {
      id: `SPEC${Date.now()}`,
      patientId: body.patientId,
      doctorId: body.doctorId,
      specialty: body.specialty,
      date: body.date,
      time: body.time,
      status: body.status || 'scheduled',
      chiefComplaint: body.chiefComplaint,
      currentIllness: body.currentIllness || '',
      physicalExam: body.physicalExam || '',
      diagnosis: body.diagnosis || '',
      treatment: body.treatment || '',
      prescription: body.prescription || '',
      followUp: body.followUp || '',
      specialtyData: body.specialtyData || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      digitalSignature: body.digitalSignature || null
    };

    // Simular salvamento no banco
    mockConsultations.push(newConsultation);

    return NextResponse.json({
      success: true,
      data: newConsultation,
      message: 'Consulta criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID da consulta é obrigatório',
        data: null
      }, { status: 400 });
    }

    const body = await request.json();
    const consultationIndex = mockConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Atualizar consulta
    const updatedConsultation = {
      ...mockConsultations[consultationIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    mockConsultations[consultationIndex] = updatedConsultation;

    return NextResponse.json({
      success: true,
      data: updatedConsultation,
      message: 'Consulta atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
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
        message: 'ID da consulta é obrigatório',
        data: null
      }, { status: 400 });
    }

    const consultationIndex = mockConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Remover consulta
    const deletedConsultation = mockConsultations.splice(consultationIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedConsultation,
      message: 'Consulta removida com sucesso'
    });

  } catch (error) {
    console.error('Erro ao remover consulta:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}
