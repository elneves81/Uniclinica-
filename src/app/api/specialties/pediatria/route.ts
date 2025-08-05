import { NextRequest, NextResponse } from 'next/server';

// Interface específica para atendimento pediátrico
interface PediatricConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Dados da consulta
  chiefComplaint: string;
  currentIllness: string;
  
  // História gestacional e perinatal
  birthHistory: {
    gestationalAge: number;
    birthWeight: number;
    birthLength: number;
    apgar1: number;
    apgar5: number;
    deliveryType: 'normal' | 'cesarean' | 'forceps';
    complications: string;
  };
  
  // Desenvolvimento neuropsicomotor
  development: {
    headControl: string;
    sitting: string;
    crawling: string;
    walking: string;
    firstWords: string;
    sphincterControl: string;
    milestones: Array<{
      milestone: string;
      expectedAge: string;
      achievedAge: string;
      status: 'normal' | 'delayed' | 'advanced';
    }>;
  };
  
  // Alimentação
  feeding: {
    breastfeeding: {
      exclusive: boolean;
      duration: string;
      difficulties: string;
    };
    complementaryFeeding: {
      startAge: string;
      foods: string[];
      difficulties: string;
    };
    currentDiet: {
      type: string;
      adequacy: 'adequate' | 'inadequate';
      observations: string;
    };
    allergies: Array<{
      food: string;
      reaction: string;
      severity: 'mild' | 'moderate' | 'severe';
    }>;
  };
  
  // Vacinação
  vaccination: {
    upToDate: boolean;
    cardPresented: boolean;
    vaccines: Array<{
      vaccine: string;
      doses: number;
      lastDate: string;
      nextDue: string;
      status: 'complete' | 'incomplete' | 'delayed';
    }>;
    contraindications: string[];
    adverseReactions: string[];
  };
  
  // Antropometria e crescimento
  anthropometry: {
    weight: number;
    height: number;
    headCircumference: number;
    weightPercentile: number;
    heightPercentile: number;
    hcPercentile: number;
    bmi: number;
    bmiPercentile: number;
    nutritionalStatus: 'underweight' | 'normal' | 'overweight' | 'obese';
    growthVelocity: {
      adequate: boolean;
      observations: string;
    };
  };
  
  // Exame físico específico pediátrico
  physicalExam: {
    generalAppearance: {
      state: 'good' | 'regular' | 'poor';
      activity: string;
      crying: string;
      interaction: string;
    };
    vitalSigns: {
      temperature: number;
      heartRate: number;
      respiratoryRate: number;
      bloodPressure: string;
      oxygenSaturation: number;
    };
    systemicExam: {
      head: string;
      neck: string;
      chest: string;
      cardiovascular: string;
      respiratory: string;
      abdomen: string;
      genitourinary: string;
      neurological: string;
      musculoskeletal: string;
      skin: string;
    };
    developmentalAssessment: {
      motor: string;
      language: string;
      cognitive: string;
      social: string;
    };
  };
  
  // Diagnóstico e plano
  assessment: {
    diagnoses: Array<{
      primary: boolean;
      diagnosis: string;
      icd10: string;
      confidence: 'high' | 'medium' | 'low';
    }>;
    differentialDiagnoses: string[];
    plan: {
      treatment: string;
      medications: Array<{
        medication: string;
        dosage: string;
        frequency: string;
        duration: string;
        instructions: string;
      }>;
      nonPharmacological: string[];
      followUp: {
        when: string;
        conditions: string;
        instructions: string[];
      };
      referrals: Array<{
        specialty: string;
        urgency: 'routine' | 'urgent' | 'emergency';
        reason: string;
      }>;
      preventiveCare: {
        nextVaccines: string[];
        screenings: string[];
        guidance: string[];
      };
    };
  };
  
  // Orientações para pais/cuidadores
  parentGuidance: {
    feeding: string[];
    care: string[];
    development: string[];
    safety: string[];
    whenToReturn: string[];
  };
  
  // Anexos e documentos
  attachments: Array<{
    type: 'growth_chart' | 'vaccine_card' | 'exam_result' | 'image' | 'other';
    filename: string;
    description: string;
    uploadDate: string;
  }>;
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
}

// Mock data para demonstração
const mockPediatricConsultations: PediatricConsultation[] = [
  {
    id: "PED001",
    patientId: "PAT001",
    doctorId: "DOC001",
    date: "2024-01-15",
    time: "09:00",
    status: "completed",
    chiefComplaint: "Febre há 2 dias",
    currentIllness: "Criança apresenta febre de 38.5°C há 2 dias, associada a irritabilidade e redução do apetite. Mãe refere que a criança está mais chorosa e recusando alimentação.",
    birthHistory: {
      gestationalAge: 39,
      birthWeight: 3200,
      birthLength: 49,
      apgar1: 9,
      apgar5: 10,
      deliveryType: "normal",
      complications: "Nenhuma"
    },
    development: {
      headControl: "2 meses",
      sitting: "6 meses",
      crawling: "8 meses",
      walking: "12 meses",
      firstWords: "10 meses",
      sphincterControl: "Em andamento (18 meses)",
      milestones: [
        {
          milestone: "Sorriso social",
          expectedAge: "2 meses",
          achievedAge: "6 semanas",
          status: "normal"
        },
        {
          milestone: "Sustenta cabeça",
          expectedAge: "3 meses",
          achievedAge: "2 meses",
          status: "advanced"
        }
      ]
    },
    feeding: {
      breastfeeding: {
        exclusive: true,
        duration: "6 meses",
        difficulties: "Nenhuma"
      },
      complementaryFeeding: {
        startAge: "6 meses",
        foods: ["Frutas", "Legumes", "Cereais"],
        difficulties: "Recusa inicial de vegetais"
      },
      currentDiet: {
        type: "Variada apropriada para idade",
        adequacy: "adequate",
        observations: "Boa aceitação geral"
      },
      allergies: []
    },
    vaccination: {
      upToDate: true,
      cardPresented: true,
      vaccines: [
        {
          vaccine: "BCG",
          doses: 1,
          lastDate: "2023-01-16",
          nextDue: "N/A",
          status: "complete"
        },
        {
          vaccine: "Hepatite B",
          doses: 3,
          lastDate: "2023-07-15",
          nextDue: "N/A",
          status: "complete"
        },
        {
          vaccine: "Pentavalente",
          doses: 3,
          lastDate: "2023-07-15",
          nextDue: "N/A",
          status: "complete"
        }
      ],
      contraindications: [],
      adverseReactions: []
    },
    anthropometry: {
      weight: 10.5,
      height: 76,
      headCircumference: 46,
      weightPercentile: 50,
      heightPercentile: 75,
      hcPercentile: 50,
      bmi: 18.2,
      bmiPercentile: 60,
      nutritionalStatus: "normal",
      growthVelocity: {
        adequate: true,
        observations: "Crescimento adequado para idade"
      }
    },
    physicalExam: {
      generalAppearance: {
        state: "regular",
        activity: "Irritável, menos ativa que habitual",
        crying: "Chorosa, consolável",
        interaction: "Responsiva aos estímulos"
      },
      vitalSigns: {
        temperature: 38.5,
        heartRate: 120,
        respiratoryRate: 28,
        bloodPressure: "N/A",
        oxygenSaturation: 98
      },
      systemicExam: {
        head: "Fontanela anterior normotensa, sem abaulamento",
        neck: "Linfonodos cervicais palpáveis, móveis, indolores",
        chest: "Simétrico, sem retrações",
        cardiovascular: "RCR 2T BNF, sem sopros",
        respiratory: "MV universalmente audível, sem ruídos adventícios",
        abdomen: "Plano, flácido, sem visceromegalias",
        genitourinary: "Normal para sexo e idade",
        neurological: "Alerta, responsiva, reflexos presentes",
        musculoskeletal: "Sem alterações",
        skin: "Corada, hidratada, sem exantemas"
      },
      developmentalAssessment: {
        motor: "Adequado para idade - anda sozinha",
        language: "Fala algumas palavras, compreende comandos simples",
        cognitive: "Curiosa, explora ambiente",
        social: "Interage adequadamente, estranha pessoas desconhecidas"
      }
    },
    assessment: {
      diagnoses: [
        {
          primary: true,
          diagnosis: "Faringite viral",
          icd10: "J02.9",
          confidence: "high"
        }
      ],
      differentialDiagnoses: ["Otite média", "Infecção urinária", "Roséola"],
      plan: {
        treatment: "Sintomático com controle da febre e hidratação adequada",
        medications: [
          {
            medication: "Dipirona",
            dosage: "15mg/kg/dose",
            frequency: "De 6 em 6 horas",
            duration: "Enquanto persistir febre",
            instructions: "Administrar se temperatura ≥ 37,8°C"
          }
        ],
        nonPharmacological: [
          "Oferecer líquidos frequentemente",
          "Ambiente arejado",
          "Roupas leves",
          "Compressas mornas se necessário"
        ],
        followUp: {
          when: "48-72 horas",
          conditions: "Se persistência ou piora dos sintomas",
          instructions: [
            "Observar sinais de desidratação",
            "Retornar se febre persistir > 3 dias",
            "Procurar atendimento se sonolência excessiva"
          ]
        },
        referrals: [],
        preventiveCare: {
          nextVaccines: ["Tríplice viral aos 12 meses"],
          screenings: ["Triagem auditiva", "Triagem visual"],
          guidance: ["Prevenção de acidentes", "Estímulo ao desenvolvimento"]
        }
      }
    },
    parentGuidance: {
      feeding: [
        "Manter amamentação se ainda amamenta",
        "Oferecer alimentos em pequenas quantidades",
        "Aumentar oferta de líquidos"
      ],
      care: [
        "Verificar temperatura regularmente",
        "Manter ambiente ventilado",
        "Roupas leves e confortáveis"
      ],
      development: [
        "Continuar estímulos apropriados para idade",
        "Leitura diária",
        "Brincadeiras interativas"
      ],
      safety: [
        "Supervisão constante durante brincadeiras",
        "Proteção de tomadas e quinas",
        "Não deixar objetos pequenos ao alcance"
      ],
      whenToReturn: [
        "Febre persistente por mais de 3 dias",
        "Recusa alimentar completa",
        "Sonolência excessiva ou irritabilidade intensa",
        "Sinais de desidratação",
        "Dificuldade respiratória"
      ]
    },
    attachments: [
      {
        type: "growth_chart",
        filename: "curva_crescimento_2024.pdf",
        description: "Gráfico de crescimento atualizado",
        uploadDate: "2024-01-15T09:30:00Z"
      }
    ],
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:45:00Z",
    createdBy: "Dr. João Pediatra",
    lastModifiedBy: "Dr. João Pediatra"
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

    let filteredConsultations = [...mockPediatricConsultations];

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

    // Estatísticas específicas da pediatria
    const stats = {
      totalConsultations: filteredConsultations.length,
      byAgeGroup: {
        neonates: filteredConsultations.filter(c => {
          // Calcular idade baseada na data de nascimento do paciente
          return true; // Simplificado para demo
        }).length,
        infants: 0,
        toddlers: 0,
        preschool: 0,
        schoolAge: 0,
        adolescents: 0
      },
      vaccinations: {
        upToDate: filteredConsultations.filter(c => c.vaccination.upToDate).length,
        delayed: filteredConsultations.filter(c => !c.vaccination.upToDate).length
      },
      nutrition: {
        normal: filteredConsultations.filter(c => c.anthropometry.nutritionalStatus === 'normal').length,
        underweight: filteredConsultations.filter(c => c.anthropometry.nutritionalStatus === 'underweight').length,
        overweight: filteredConsultations.filter(c => c.anthropometry.nutritionalStatus === 'overweight').length,
        obese: filteredConsultations.filter(c => c.anthropometry.nutritionalStatus === 'obese').length
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
      message: 'Consultas pediátricas listadas com sucesso'
    });

  } catch (error) {
    console.error('Erro ao buscar consultas pediátricas:', error);
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
    
    // Validações específicas para pediatria
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

    const newConsultation: PediatricConsultation = {
      id: `PED${Date.now()}`,
      ...body,
      status: body.status || 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simular salvamento no banco
    mockPediatricConsultations.push(newConsultation);

    return NextResponse.json({
      success: true,
      data: newConsultation,
      message: 'Consulta pediátrica criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta pediátrica:', error);
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
    const consultationIndex = mockPediatricConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Atualizar consulta
    const updatedConsultation = {
      ...mockPediatricConsultations[consultationIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    mockPediatricConsultations[consultationIndex] = updatedConsultation;

    return NextResponse.json({
      success: true,
      data: updatedConsultation,
      message: 'Consulta pediátrica atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar consulta pediátrica:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}
