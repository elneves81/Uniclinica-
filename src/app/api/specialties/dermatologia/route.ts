import { NextRequest, NextResponse } from 'next/server';

// Interface específica para consulta dermatológica
interface DermatologyConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Dados da consulta
  chiefComplaint: string;
  currentIllness: string;
  
  // História dermatológica
  dermatologicalHistory: {
    skinType: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
    previousSkinCancer: boolean;
    familyHistorySkinCancer: boolean;
    sunExposure: {
      occupational: boolean;
      recreational: boolean;
      sunburnHistory: number;
      protectionHabits: string;
    };
    previousTreatments: Array<{
      condition: string;
      treatment: string;
      response: 'good' | 'partial' | 'poor';
      date: string;
    }>;
  };
  
  // Exame dermatológico
  dermatologicalExam: {
    generalSkinCondition: string;
    lesions: Array<{
      id: string;
      location: string;
      type: string;
      size: string;
      color: string;
      border: string;
      surface: string;
      characteristics: string;
      evolution: string;
      suspicious: boolean;
      dermatoscopyPerformed: boolean;
      dermatoscopyFindings?: string;
      biopsy: {
        indicated: boolean;
        type?: 'punch' | 'shave' | 'excisional' | 'incisional';
        urgency?: 'routine' | 'urgent';
        reason?: string;
      };
    }>;
    nailExam: {
      performed: boolean;
      findings: string;
      abnormalities: string[];
    };
    hairScalpExam: {
      performed: boolean;
      hairDensity: string;
      scalpCondition: string;
      abnormalities: string[];
    };
    mucousMembranes: {
      examined: boolean;
      findings: string;
    };
  };
  
  // Dermatoscopia
  dermatoscopy: {
    performed: boolean;
    equipment: string;
    lesionsExamined: number;
    findings: Array<{
      lesionId: string;
      pattern: string;
      colors: string[];
      structures: string[];
      vessels: string;
      suspiciousFeatures: string[];
      recommendation: 'follow-up' | 'biopsy' | 'excision' | 'routine-monitoring';
    }>;
    images: Array<{
      lesionId: string;
      filename: string;
      description: string;
      timestamp: string;
    }>;
  };
  
  // Mapeamento corporal
  bodyMapping: {
    performed: boolean;
    totalLesions: number;
    nevusCounted: number;
    suspiciousLesions: number;
    newLesions: number;
    changedLesions: number;
    asymmetricNevi: number;
    largeNevi: number;
    irregularNevi: number;
    followUpRecommended: boolean;
    nextMappingDate?: string;
  };
  
  // Diagnóstico e tratamento
  assessment: {
    diagnoses: Array<{
      primary: boolean;
      diagnosis: string;
      icd10: string;
      confidence: 'high' | 'medium' | 'low';
      location?: string;
    }>;
    differentialDiagnoses: string[];
    riskAssessment: {
      malignancyRisk: 'low' | 'moderate' | 'high';
      factors: string[];
    };
    plan: {
      treatment: string;
      topicalMedications: Array<{
        medication: string;
        concentration: string;
        application: string;
        frequency: string;
        duration: string;
        area: string;
        instructions: string;
      }>;
      systemicMedications: Array<{
        medication: string;
        dosage: string;
        frequency: string;
        duration: string;
        instructions: string;
        monitoring?: string;
      }>;
      procedures: Array<{
        procedure: string;
        indication: string;
        scheduling: 'immediate' | 'routine' | 'urgent';
        expectedDate?: string;
      }>;
      followUp: {
        interval: string;
        reason: string;
        instructions: string[];
      };
    };
  };
  
  // Orientações ao paciente
  patientGuidance: {
    skinCare: {
      cleansing: string[];
      moisturizing: string[];
      products: string[];
      avoidProducts: string[];
    };
    sunProtection: {
      spf: number;
      reapplication: string;
      clothing: string[];
      avoidanceHours: string;
      seekingShade: boolean;
    };
    selfExamination: {
      frequency: string;
      technique: string[];
      redFlags: string[];
    };
    lifestyle: {
      diet: string[];
      hydration: string;
      exercise: string[];
      stress: string;
    };
  };
  
  // Procedimentos realizados
  procedures: Array<{
    id: string;
    type: 'biopsy' | 'excision' | 'curettage' | 'cryotherapy' | 'laser' | 'other';
    location: string;
    technique: string;
    anesthesia: string;
    complications: string;
    specimens: Array<{
      id: string;
      description: string;
      pathologyLab: string;
      expectedResult: string;
    }>;
    postOpInstructions: string[];
    followUpDate: string;
  }>;
  
  // Fotografias clínicas
  photography: {
    consent: boolean;
    totalImages: number;
    images: Array<{
      id: string;
      lesionId?: string;
      bodyPart: string;
      view: 'overview' | 'close-up' | 'dermatoscopy';
      filename: string;
      timestamp: string;
      description: string;
    }>;
  };
  
  // Anexos e resultados
  attachments: Array<{
    type: 'pathology_report' | 'lab_result' | 'imaging' | 'photo' | 'other';
    filename: string;
    description: string;
    date: string;
    result?: string;
  }>;
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
}

// Mock data para demonstração
const mockDermatologyConsultations: DermatologyConsultation[] = [
  {
    id: "DERM001",
    patientId: "PAT002",
    doctorId: "DOC002",
    date: "2024-01-16",
    time: "14:30",
    status: "completed",
    chiefComplaint: "Mancha escura nas costas que mudou de tamanho",
    currentIllness: "Paciente refere aparecimento de mancha escura no dorso há aproximadamente 6 meses, com crescimento progressivo nas últimas 8 semanas. Nega dor ou prurido. Histórico de queimaduras solares na infância.",
    
    dermatologicalHistory: {
      skinType: "III",
      previousSkinCancer: false,
      familyHistorySkinCancer: true,
      sunExposure: {
        occupational: false,
        recreational: true,
        sunburnHistory: 3,
        protectionHabits: "Usa protetor solar esporadicamente"
      },
      previousTreatments: [
        {
          condition: "Dermatite seborreica",
          treatment: "Cetoconazol tópico",
          response: "good",
          date: "2023-05-15"
        }
      ]
    },
    
    dermatologicalExam: {
      generalSkinCondition: "Pele mista, com sinais de fotoenvelhecimento leve",
      lesions: [
        {
          id: "L001",
          location: "Dorso - região escapular direita",
          type: "Nevo pigmentado",
          size: "8mm x 6mm",
          color: "Marrom heterogêneo com áreas mais escuras",
          border: "Bordas irregulares, ligeiramente serrilhadas",
          surface: "Superfície ligeiramente elevada",
          characteristics: "Assimetria presente, coloração heterogênea",
          evolution: "Crescimento progressivo nos últimos 2 meses",
          suspicious: true,
          dermatoscopyPerformed: true,
          dermatoscopyFindings: "Padrão atípico com rede pigmentar irregular, pontos azul-acinzentados, áreas sem estrutura",
          biopsy: {
            indicated: true,
            type: "excisional",
            urgency: "routine",
            reason: "Características dermatoscópicas atípicas e mudança recente"
          }
        },
        {
          id: "L002", 
          location: "Braço esquerdo",
          type: "Nevo comum",
          size: "4mm",
          color: "Marrom homogêneo",
          border: "Bordas regulares",
          surface: "Superfície lisa",
          characteristics: "Lesão estável, sem atipias",
          evolution: "Sem mudanças relatadas",
          suspicious: false,
          dermatoscopyPerformed: true,
          dermatoscopyFindings: "Padrão reticular típico",
          biopsy: {
            indicated: false
          }
        }
      ],
      nailExam: {
        performed: true,
        findings: "Unhas sem alterações significativas",
        abnormalities: []
      },
      hairScalpExam: {
        performed: false,
        hairDensity: "",
        scalpCondition: "",
        abnormalities: []
      },
      mucousMembranes: {
        examined: false,
        findings: ""
      }
    },
    
    dermatoscopy: {
      performed: true,
      equipment: "Dermoscópio digital FotoFinder",
      lesionsExamined: 2,
      findings: [
        {
          lesionId: "L001",
          pattern: "Atípico",
          colors: ["marrom", "preto", "azul-acinzentado"],
          structures: ["rede pigmentar irregular", "pontos", "áreas sem estrutura"],
          vessels: "Não visíveis",
          suspiciousFeatures: ["assimetria de estruturas", "cores múltiplas", "padrão irregular"],
          recommendation: "excision"
        },
        {
          lesionId: "L002",
          pattern: "Reticular típico",
          colors: ["marrom"],
          structures: ["rede pigmentar regular"],
          vessels: "Não visíveis",
          suspiciousFeatures: [],
          recommendation: "routine-monitoring"
        }
      ],
      images: [
        {
          lesionId: "L001",
          filename: "derm_001_overview.jpg",
          description: "Visão geral da lesão suspeita",
          timestamp: "2024-01-16T14:45:00Z"
        },
        {
          lesionId: "L001",
          filename: "derm_001_dermoscopy.jpg",
          description: "Dermatoscopia da lesão suspeita",
          timestamp: "2024-01-16T14:46:00Z"
        }
      ]
    },
    
    bodyMapping: {
      performed: true,
      totalLesions: 28,
      nevusCounted: 26,
      suspiciousLesions: 1,
      newLesions: 0,
      changedLesions: 1,
      asymmetricNevi: 1,
      largeNevi: 0,
      irregularNevi: 1,
      followUpRecommended: true,
      nextMappingDate: "2024-07-16"
    },
    
    assessment: {
      diagnoses: [
        {
          primary: true,
          diagnosis: "Nevo displásico suspeito",
          icd10: "D22.5",
          confidence: "high",
          location: "Dorso"
        }
      ],
      differentialDiagnoses: ["Melanoma inicial", "Nevo de Spitz", "Nevo comum atípico"],
      riskAssessment: {
        malignancyRisk: "moderate",
        factors: ["mudança recente", "características atípicas à dermatoscopia", "história familiar"]
      },
      plan: {
        treatment: "Excisão cirúrgica com margem de segurança para análise histopatológica",
        topicalMedications: [],
        systemicMedications: [],
        procedures: [
          {
            procedure: "Excisão com margem de 3mm",
            indication: "Lesão suspeita para melanoma",
            scheduling: "routine",
            expectedDate: "2024-01-25"
          }
        ],
        followUp: {
          interval: "15 dias",
          reason: "Resultado do exame histopatológico",
          instructions: [
            "Manter curativo seco",
            "Retornar se sinais de infecção",
            "Evitar exercícios intensos por 1 semana"
          ]
        }
      }
    },
    
    patientGuidance: {
      skinCare: {
        cleansing: ["Sabonete neutro", "Água morna"],
        moisturizing: ["Hidratante corporal diário", "Especial atenção após banho"],
        products: ["Produtos hipoalergênicos", "Livres de fragrância"],
        avoidProducts: ["Produtos com álcool", "Esfoliantes agressivos"]
      },
      sunProtection: {
        spf: 60,
        reapplication: "A cada 2 horas",
        clothing: ["Roupas com proteção UV", "Chapéu de abas largas", "Óculos de sol"],
        avoidanceHours: "10h às 16h",
        seekingShade: true
      },
      selfExamination: {
        frequency: "Mensal",
        technique: [
          "Examinar todo o corpo incluindo couro cabeludo",
          "Usar espelhos para áreas de difícil visualização",
          "Observar mudanças em lesões existentes",
          "Procurar novas lesões"
        ],
        redFlags: [
          "Assimetria",
          "Bordas irregulares", 
          "Coloração heterogênea",
          "Diâmetro > 6mm",
          "Evolução/mudanças"
        ]
      },
      lifestyle: {
        diet: ["Rica em antioxidantes", "Frutas vermelhas", "Vegetais folhosos"],
        hydration: "Mínimo 2 litros de água por dia",
        exercise: ["Regular, preferencialmente indoor ou com proteção"],
        stress: "Técnicas de relaxamento, sono adequado"
      }
    },
    
    procedures: [
      {
        id: "PROC001",
        type: "excision",
        location: "Dorso - região escapular direita",
        technique: "Excisão fusiforme com margem de 3mm",
        anesthesia: "Lidocaína 2% com epinefrina",
        complications: "Nenhuma",
        specimens: [
          {
            id: "SPEC001",
            description: "Lesão pigmentada com margem",
            pathologyLab: "Laboratório Anatomia Patológica Central",
            expectedResult: "7-10 dias úteis"
          }
        ],
        postOpInstructions: [
          "Manter curativo seco por 24h",
          "Aplicar pomada antibiótica 2x/dia",
          "Evitar esforços intensos por 1 semana",
          "Retornar se sangramento ou sinais de infecção"
        ],
        followUpDate: "2024-01-30"
      }
    ],
    
    photography: {
      consent: true,
      totalImages: 4,
      images: [
        {
          id: "IMG001",
          lesionId: "L001",
          bodyPart: "Dorso",
          view: "overview",
          filename: "patient_dorso_001.jpg",
          timestamp: "2024-01-16T14:40:00Z",
          description: "Visão geral do dorso"
        },
        {
          id: "IMG002",
          lesionId: "L001", 
          bodyPart: "Dorso",
          view: "close-up",
          filename: "lesion_001_closeup.jpg",
          timestamp: "2024-01-16T14:42:00Z",
          description: "Close da lesão suspeita"
        }
      ]
    },
    
    attachments: [],
    
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T15:15:00Z",
    createdBy: "Dr. Roberto Dermatologista",
    lastModifiedBy: "Dr. Roberto Dermatologista"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredConsultations = [...mockDermatologyConsultations];

    // Aplicar filtros
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

    // Estatísticas específicas da dermatologia
    const stats = {
      totalConsultations: filteredConsultations.length,
      lesions: {
        total: filteredConsultations.reduce((acc, c) => acc + c.dermatologicalExam.lesions.length, 0),
        suspicious: filteredConsultations.reduce((acc, c) => acc + c.dermatologicalExam.lesions.filter(l => l.suspicious).length, 0),
        biopsyIndicated: filteredConsultations.reduce((acc, c) => acc + c.dermatologicalExam.lesions.filter(l => l.biopsy.indicated).length, 0)
      },
      procedures: {
        biopsies: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'biopsy').length, 0),
        excisions: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'excision').length, 0)
      },
      dermatoscopy: {
        performed: filteredConsultations.filter(c => c.dermatoscopy.performed).length,
        total: filteredConsultations.length
      },
      bodyMapping: {
        performed: filteredConsultations.filter(c => c.bodyMapping.performed).length,
        followUpRecommended: filteredConsultations.filter(c => c.bodyMapping.followUpRecommended).length
      }
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
      stats,
      message: 'Consultas dermatológicas listadas com sucesso'
    });

  } catch (error) {
    console.error('Erro ao buscar consultas dermatológicas:', error);
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
    
    // Validações específicas para dermatologia
    const requiredFields = ['patientId', 'doctorId', 'date', 'time', 'chiefComplaint'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          message: `Campo obrigatório ausente: ${field}`,
          data: null
        }, { status: 400 });
      }
    }

    const newConsultation: DermatologyConsultation = {
      id: `DERM${Date.now()}`,
      ...body,
      status: body.status || 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simular salvamento no banco
    mockDermatologyConsultations.push(newConsultation);

    return NextResponse.json({
      success: true,
      data: newConsultation,
      message: 'Consulta dermatológica criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta dermatológica:', error);
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
    const consultationIndex = mockDermatologyConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Atualizar consulta
    const updatedConsultation = {
      ...mockDermatologyConsultations[consultationIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    mockDermatologyConsultations[consultationIndex] = updatedConsultation;

    return NextResponse.json({
      success: true,
      data: updatedConsultation,
      message: 'Consulta dermatológica atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar consulta dermatológica:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}
