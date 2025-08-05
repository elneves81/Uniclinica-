import { NextRequest, NextResponse } from 'next/server';

// Interface específica para consulta de clínica geral
interface GeneralMedicineConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Dados da consulta
  chiefComplaint: string;
  currentIllness: string;
  
  // História médica geral
  medicalHistory: {
    previousDiseases: Array<{
      disease: string;
      diagnosisDate: string;
      treatment: string;
      outcome: 'cured' | 'controlled' | 'ongoing' | 'worsened';
      notes: string;
    }>;
    surgicalHistory: Array<{
      procedure: string;
      date: string;
      surgeon: string;
      indication: string;
      complications: string;
      outcome: string;
    }>;
    allergies: {
      medications: Array<{
        medication: string;
        reaction: string;
        severity: 'mild' | 'moderate' | 'severe';
        confirmedBy: string;
      }>;
      foods: Array<{
        food: string;
        reaction: string;
        severity: 'mild' | 'moderate' | 'severe';
      }>;
      environmental: Array<{
        allergen: string;
        reaction: string;
        severity: 'mild' | 'moderate' | 'severe';
      }>;
    };
    medications: {
      current: Array<{
        medication: string;
        dosage: string;
        frequency: string;
        indication: string;
        startDate: string;
        prescriber: string;
        adherence: 'good' | 'partial' | 'poor';
      }>;
      previous: Array<{
        medication: string;
        indication: string;
        duration: string;
        discontinuationReason: string;
      }>;
    };
    immunizations: Array<{
      vaccine: string;
      date: string;
      lot: string;
      site: string;
      adverseReactions: string;
      nextDue?: string;
    }>;
    familyHistory: {
      maternal: Array<{
        condition: string;
        relative: string;
        ageOfOnset?: number;
        notes?: string;
      }>;
      paternal: Array<{
        condition: string;
        relative: string;
        ageOfOnset?: number;
        notes?: string;
      }>;
      siblings: Array<{
        condition: string;
        ageOfOnset?: number;
        notes?: string;
      }>;
    };
    socialHistory: {
      smoking: {
        status: 'never' | 'former' | 'current';
        packsPerDay?: number;
        yearsSmoked?: number;
        quitDate?: string;
        attempts?: number;
      };
      alcohol: {
        status: 'never' | 'occasional' | 'regular' | 'excessive';
        type?: string;
        frequency?: string;
        quantity?: string;
      };
      drugs: {
        status: 'never' | 'former' | 'current';
        substances?: string[];
        lastUse?: string;
      };
      occupation: {
        current: string;
        previousJobs: string[];
        exposures: string[];
        riskFactors: string[];
      };
      lifestyle: {
        diet: string;
        exercise: string;
        sleep: string;
        stress: string;
      };
    };
  };
  
  // Sintomas gerais
  symptoms: {
    constitutional: {
      fever: boolean;
      chills: boolean;
      nightSweats: boolean;
      weightLoss: boolean;
      weightGain: boolean;
      fatigue: boolean;
      malaise: boolean;
      appetiteChange: boolean;
    };
    cardiovascular: {
      chestPain: boolean;
      shortness: boolean;
      palpitations: boolean;
      edema: boolean;
      syncope: boolean;
      claudication: boolean;
    };
    respiratory: {
      cough: boolean;
      sputum: boolean;
      hemoptysis: boolean;
      dyspnea: boolean;
      wheezing: boolean;
      chestPain: boolean;
    };
    gastrointestinal: {
      nausea: boolean;
      vomiting: boolean;
      diarrhea: boolean;
      constipation: boolean;
      abdominalPain: boolean;
      heartburn: boolean;
      dysphagia: boolean;
      bloodInStool: boolean;
    };
    genitourinary: {
      dysuria: boolean;
      frequency: boolean;
      urgency: boolean;
      hematuria: boolean;
      incontinence: boolean;
      nocturia: boolean;
      discharge: boolean;
    };
    neurological: {
      headache: boolean;
      dizziness: boolean;
      seizures: boolean;
      weakness: boolean;
      numbness: boolean;
      memoryIssues: boolean;
      confusion: boolean;
    };
    musculoskeletal: {
      jointPain: boolean;
      muscleWeakness: boolean;
      backPain: boolean;
      stiffness: boolean;
      swelling: boolean;
    };
    skin: {
      rash: boolean;
      lesions: boolean;
      itching: boolean;
      dryness: boolean;
      changes: boolean;
    };
    psychiatric: {
      depression: boolean;
      anxiety: boolean;
      moodChanges: boolean;
      sleepIssues: boolean;
      suicidalThoughts: boolean;
    };
  };
  
  // Exame físico geral
  physicalExam: {
    vitalSigns: {
      temperature: number;
      bloodPressure: {
        systolic: number;
        diastolic: number;
        position: 'sitting' | 'standing' | 'supine';
      };
      heartRate: number;
      respiratoryRate: number;
      oxygenSaturation: number;
      weight: number;
      height: number;
      bmi: number;
      painScale: number; // 0-10
    };
    general: {
      appearance: string;
      distress: boolean;
      consciousness: string;
      cooperation: string;
      hygiene: string;
    };
    heent: {
      head: string;
      eyes: string;
      ears: string;
      nose: string;
      throat: string;
      neck: string;
      lymphNodes: string;
    };
    cardiovascular: {
      inspection: string;
      palpation: string;
      auscultation: string;
      peripheralPulses: string;
      edema: boolean;
      jvd: boolean;
    };
    respiratory: {
      inspection: string;
      palpation: string;
      percussion: string;
      auscultation: string;
      accessoryMuscles: boolean;
    };
    abdominal: {
      inspection: string;
      auscultation: string;
      palpation: string;
      percussion: string;
      organomegaly: boolean;
      masses: boolean;
      tenderness: boolean;
    };
    neurological: {
      mentalStatus: string;
      cranialNerves: string;
      motor: string;
      sensory: string;
      reflexes: string;
      coordination: string;
      gait: string;
    };
    musculoskeletal: {
      inspection: string;
      palpation: string;
      rangeOfMotion: string;
      strength: string;
      deformities: boolean;
    };
    skin: {
      color: string;
      temperature: string;
      moisture: string;
      turgor: string;
      lesions: boolean;
      rashes: boolean;
    };
  };
  
  // Exames complementares
  diagnosticTests: {
    laboratory: Array<{
      test: string;
      result: string;
      referenceRange: string;
      flag: 'normal' | 'high' | 'low' | 'critical';
      date: string;
    }>;
    imaging: Array<{
      type: string;
      region: string;
      findings: string;
      impression: string;
      date: string;
    }>;
    ekg: {
      performed: boolean;
      rhythm?: string;
      rate?: number;
      intervals?: string;
      abnormalities?: string;
      interpretation?: string;
    };
    other: Array<{
      test: string;
      result: string;
      interpretation: string;
      date: string;
    }>;
  };
  
  // Avaliação e plano
  assessment: {
    diagnoses: Array<{
      primary: boolean;
      diagnosis: string;
      icd10: string;
      confidence: 'high' | 'medium' | 'low';
      status: 'active' | 'resolved' | 'chronic';
    }>;
    differentialDiagnoses: string[];
    problems: Array<{
      problem: string;
      status: 'active' | 'resolved' | 'improving' | 'worsening';
      goal: string;
    }>;
    plan: {
      medications: Array<{
        medication: string;
        dosage: string;
        frequency: string;
        duration: string;
        indication: string;
        instructions: string;
        monitoring?: string;
      }>;
      nonPharmacological: Array<{
        intervention: string;
        instructions: string;
        duration: string;
        goals: string[];
      }>;
      referrals: Array<{
        specialty: string;
        urgency: 'routine' | 'urgent' | 'stat';
        reason: string;
        instructions: string;
      }>;
      followUp: {
        interval: string;
        reason: string;
        instructions: string[];
        labsNeeded: string[];
        nextVisit: string;
      };
      preventiveCare: {
        screenings: Array<{
          screening: string;
          dueDate: string;
          reason: string;
        }>;
        vaccinations: Array<{
          vaccine: string;
          dueDate: string;
          reason: string;
        }>;
        counseling: string[];
      };
    };
  };
  
  // Educação do paciente
  patientEducation: {
    diagnosis: {
      explanation: string;
      prognosis: string;
      expectations: string;
    };
    medications: Array<{
      medication: string;
      purpose: string;
      sideEffects: string[];
      instructions: string[];
      monitoring: string[];
    }>;
    lifestyle: {
      diet: string[];
      exercise: string[];
      smoking: string[];
      alcohol: string[];
      stress: string[];
    };
    redFlags: {
      symptoms: string[];
      instructions: string;
      emergencyContacts: string[];
    };
    resources: Array<{
      type: string;
      description: string;
      contact: string;
    }>;
  };
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
}

// Mock data para demonstração
const mockGeneralMedicineConsultations: GeneralMedicineConsultation[] = [
  {
    id: "GM001",
    patientId: "PAT005",
    doctorId: "DOC005",
    date: "2024-01-16",
    time: "14:00",
    status: "completed",
    chiefComplaint: "Hipertensão arterial não controlada",
    currentIllness: "Paciente com diagnóstico de hipertensão há 2 anos, em uso irregular de medicação anti-hipertensiva. Refere episódios de cefaleia e tontura nas últimas semanas.",
    
    medicalHistory: {
      previousDiseases: [
        {
          disease: "Hipertensão arterial",
          diagnosisDate: "2022-01-15",
          treatment: "Losartana 50mg",
          outcome: "controlled",
          notes: "Uso irregular da medicação"
        },
        {
          disease: "Diabetes mellitus tipo 2",
          diagnosisDate: "2023-03-10",
          treatment: "Metformina 500mg",
          outcome: "controlled",
          notes: "Controlado com dieta e medicação"
        }
      ],
      surgicalHistory: [],
      allergies: {
        medications: [
          {
            medication: "Penicilina",
            reaction: "Urticária",
            severity: "moderate",
            confirmedBy: "Médico"
          }
        ],
        foods: [],
        environmental: []
      },
      medications: {
        current: [
          {
            medication: "Losartana",
            dosage: "50mg",
            frequency: "1x/dia",
            indication: "Hipertensão",
            startDate: "2022-01-15",
            prescriber: "Dr. Silva",
            adherence: "partial"
          },
          {
            medication: "Metformina",
            dosage: "500mg",
            frequency: "2x/dia",
            indication: "Diabetes",
            startDate: "2023-03-10",
            prescriber: "Dr. Silva",
            adherence: "good"
          }
        ],
        previous: []
      },
      immunizations: [
        {
          vaccine: "Influenza",
          date: "2023-04-15",
          lot: "ABC123",
          site: "Braço esquerdo",
          adverseReactions: "Nenhuma"
        },
        {
          vaccine: "COVID-19",
          date: "2023-01-20",
          lot: "XYZ789",
          site: "Braço direito",
          adverseReactions: "Dor local leve"
        }
      ],
      familyHistory: {
        maternal: [
          {
            condition: "Hipertensão",
            relative: "Mãe",
            ageOfOnset: 50
          },
          {
            condition: "Diabetes",
            relative: "Avó materna",
            ageOfOnset: 60
          }
        ],
        paternal: [
          {
            condition: "Infarto do miocárdio",
            relative: "Pai",
            ageOfOnset: 65
          }
        ],
        siblings: []
      },
      socialHistory: {
        smoking: {
          status: "former",
          packsPerDay: 1,
          yearsSmoked: 20,
          quitDate: "2020-01-01",
          attempts: 3
        },
        alcohol: {
          status: "occasional",
          type: "Cerveja",
          frequency: "Fins de semana",
          quantity: "2-3 latas"
        },
        drugs: {
          status: "never"
        },
        occupation: {
          current: "Contador",
          previousJobs: ["Auxiliar administrativo"],
          exposures: [],
          riskFactors: ["Sedentarismo", "Estresse"]
        },
        lifestyle: {
          diet: "Rica em sódio, pobre em vegetais",
          exercise: "Sedentário",
          sleep: "6-7 horas por noite",
          stress: "Alto estresse no trabalho"
        }
      }
    },
    
    symptoms: {
      constitutional: {
        fever: false,
        chills: false,
        nightSweats: false,
        weightLoss: false,
        weightGain: true,
        fatigue: true,
        malaise: false,
        appetiteChange: false
      },
      cardiovascular: {
        chestPain: false,
        shortness: true,
        palpitations: true,
        edema: false,
        syncope: false,
        claudication: false
      },
      respiratory: {
        cough: false,
        sputum: false,
        hemoptysis: false,
        dyspnea: true,
        wheezing: false,
        chestPain: false
      },
      gastrointestinal: {
        nausea: false,
        vomiting: false,
        diarrhea: false,
        constipation: false,
        abdominalPain: false,
        heartburn: false,
        dysphagia: false,
        bloodInStool: false
      },
      genitourinary: {
        dysuria: false,
        frequency: false,
        urgency: false,
        hematuria: false,
        incontinence: false,
        nocturia: true,
        discharge: false
      },
      neurological: {
        headache: true,
        dizziness: true,
        seizures: false,
        weakness: false,
        numbness: false,
        memoryIssues: false,
        confusion: false
      },
      musculoskeletal: {
        jointPain: false,
        muscleWeakness: false,
        backPain: false,
        stiffness: false,
        swelling: false
      },
      skin: {
        rash: false,
        lesions: false,
        itching: false,
        dryness: false,
        changes: false
      },
      psychiatric: {
        depression: false,
        anxiety: true,
        moodChanges: false,
        sleepIssues: true,
        suicidalThoughts: false
      }
    },
    
    physicalExam: {
      vitalSigns: {
        temperature: 36.7,
        bloodPressure: {
          systolic: 160,
          diastolic: 95,
          position: "sitting"
        },
        heartRate: 88,
        respiratoryRate: 18,
        oxygenSaturation: 98,
        weight: 85,
        height: 170,
        bmi: 29.4,
        painScale: 2
      },
      general: {
        appearance: "Bem-nutrido, ligeiramente ansioso",
        distress: false,
        consciousness: "Alerta e orientado",
        cooperation: "Cooperativo",
        hygiene: "Adequada"
      },
      heent: {
        head: "Normocefálico",
        eyes: "Pupilas isocóricas e fotorreagentes",
        ears: "Timpanos íntegros",
        nose: "Sem alterações",
        throat: "Orofaringe sem alterações",
        neck: "Sem massas ou linfonodomegalias",
        lymphNodes: "Não palpáveis"
      },
      cardiovascular: {
        inspection: "Ictus não visível",
        palpation: "Ictus palpável no 5º EIC LHE",
        auscultation: "RCR 2T BNF, sem sopros",
        peripheralPulses: "Simétricos e presentes",
        edema: false,
        jvd: false
      },
      respiratory: {
        inspection: "Tórax simétrico, sem retrações",
        palpation: "Expansibilidade preservada",
        percussion: "Som claro pulmonar",
        auscultation: "MV+ bilateralmente, sem RA",
        accessoryMuscles: false
      },
      abdominal: {
        inspection: "Globoso, sem cicatrizes",
        auscultation: "RHA presentes",
        palpation: "Indolor, sem massas",
        percussion: "Timpânico",
        organomegaly: false,
        masses: false,
        tenderness: false
      },
      neurological: {
        mentalStatus: "Orientado no tempo e espaço",
        cranialNerves: "Normais",
        motor: "Força preservada",
        sensory: "Sensibilidade preservada",
        reflexes: "Reflexos simétricos",
        coordination: "Normal",
        gait: "Normal"
      },
      musculoskeletal: {
        inspection: "Sem deformidades",
        palpation: "Sem dor à palpação",
        rangeOfMotion: "Preservada",
        strength: "5/5 em MMSS e MMII",
        deformities: false
      },
      skin: {
        color: "Corada",
        temperature: "Normotérmica",
        moisture: "Normal",
        turgor: "Preservado",
        lesions: false,
        rashes: false
      }
    },
    
    diagnosticTests: {
      laboratory: [
        {
          test: "Glicemia de jejum",
          result: "120 mg/dL",
          referenceRange: "70-99 mg/dL",
          flag: "high",
          date: "2024-01-15"
        },
        {
          test: "HbA1c",
          result: "7.2%",
          referenceRange: "<7%",
          flag: "high",
          date: "2024-01-15"
        },
        {
          test: "Creatinina",
          result: "1.0 mg/dL",
          referenceRange: "0.7-1.3 mg/dL",
          flag: "normal",
          date: "2024-01-15"
        },
        {
          test: "Colesterol total",
          result: "220 mg/dL",
          referenceRange: "<200 mg/dL",
          flag: "high",
          date: "2024-01-15"
        }
      ],
      imaging: [],
      ekg: {
        performed: true,
        rhythm: "Ritmo sinusal",
        rate: 88,
        intervals: "Normais",
        abnormalities: "Sobrecarga atrial esquerda",
        interpretation: "ECG com sinais de sobrecarga atrial esquerda"
      },
      other: []
    },
    
    assessment: {
      diagnoses: [
        {
          primary: true,
          diagnosis: "Hipertensão arterial não controlada",
          icd10: "I10",
          confidence: "high",
          status: "active"
        },
        {
          primary: false,
          diagnosis: "Diabetes mellitus tipo 2",
          icd10: "E11.9",
          confidence: "high",
          status: "chronic"
        },
        {
          primary: false,
          diagnosis: "Sobrepeso",
          icd10: "E66.0",
          confidence: "high",
          status: "active"
        }
      ],
      differentialDiagnoses: ["Hipertensão secundária", "Diabetes descompensado"],
      problems: [
        {
          problem: "Adesão inadequada à medicação",
          status: "active",
          goal: "Melhorar adesão ao tratamento"
        },
        {
          problem: "Estilo de vida sedentário",
          status: "active",
          goal: "Implementar atividade física regular"
        }
      ],
      plan: {
        medications: [
          {
            medication: "Losartana",
            dosage: "100mg",
            frequency: "1x/dia pela manhã",
            duration: "Contínuo",
            indication: "Hipertensão arterial",
            instructions: "Tomar sempre no mesmo horário",
            monitoring: "Pressão arterial semanal"
          },
          {
            medication: "Hidroclorotiazida",
            dosage: "25mg",
            frequency: "1x/dia pela manhã",
            duration: "Contínuo",
            indication: "Hipertensão arterial",
            instructions: "Associado à Losartana",
            monitoring: "Eletrólitos em 30 dias"
          }
        ],
        nonPharmacological: [
          {
            intervention: "Dieta hipossódica",
            instructions: "Reduzir sal para <2g/dia, aumentar frutas e vegetais",
            duration: "Permanente",
            goals: ["Redução da PA", "Perda de peso"]
          },
          {
            intervention: "Atividade física",
            instructions: "Caminhada 30min, 5x/semana",
            duration: "Permanente",
            goals: ["Controle da PA", "Perda de peso", "Melhora do condicionamento"]
          }
        ],
        referrals: [
          {
            specialty: "Nutricionista",
            urgency: "routine",
            reason: "Orientação nutricional para hipertensão e diabetes",
            instructions: "Agendar consulta em 2 semanas"
          }
        ],
        followUp: {
          interval: "4 semanas",
          reason: "Avaliação da resposta ao tratamento",
          instructions: [
            "Manter medicação conforme prescrito",
            "Monitorar PA em casa 3x/semana",
            "Iniciar atividade física gradualmente"
          ],
          labsNeeded: ["Eletrólitos", "Função renal"],
          nextVisit: "2024-02-13"
        },
        preventiveCare: {
          screenings: [
            {
              screening: "Colonoscopia",
              dueDate: "2024-06-01",
              reason: "Rastreamento de câncer colorretal"
            }
          ],
          vaccinations: [
            {
              vaccine: "Influenza",
              dueDate: "2024-04-01",
              reason: "Vacinação anual"
            }
          ],
          counseling: ["Cessação do tabagismo", "Redução do estresse"]
        }
      }
    },
    
    patientEducation: {
      diagnosis: {
        explanation: "Hipertensão é o aumento persistente da pressão arterial acima de 140/90 mmHg",
        prognosis: "Com tratamento adequado, pode ser controlada e prevenir complicações",
        expectations: "Melhora esperada em 4-6 semanas com medicação e mudanças de estilo de vida"
      },
      medications: [
        {
          medication: "Losartana",
          purpose: "Reduzir a pressão arterial relaxando os vasos sanguíneos",
          sideEffects: ["Tontura", "Tosse seca", "Elevação do potássio"],
          instructions: ["Tomar sempre no mesmo horário", "Não interromper sem orientação médica"],
          monitoring: ["Verificar PA regularmente", "Observar sinais de hipotensão"]
        }
      ],
      lifestyle: {
        diet: ["Reduzir sal", "Aumentar frutas e vegetais", "Controlar peso"],
        exercise: ["Caminhada regular", "Atividade aeróbica 150min/semana"],
        smoking: ["Parabéns por ter parado", "Evitar fumo passivo"],
        alcohol: ["Consumo moderado", "Máximo 2 doses/dia"],
        stress: ["Técnicas de relaxamento", "Meditação", "Hobby"]
      },
      redFlags: {
        symptoms: ["Dor no peito", "Falta de ar intensa", "Cefaleia severa", "Alterações visuais"],
        instructions: "Procurar atendimento médico imediato se apresentar estes sintomas",
        emergencyContacts: ["192 - SAMU", "Hospital mais próximo"]
      },
      resources: [
        {
          type: "Aplicativo",
          description: "App para monitoramento da pressão arterial",
          contact: "Disponível na loja de aplicativos"
        },
        {
          type: "Grupo de apoio",
          description: "Grupo de hipertensos da UBS",
          contact: "Quintas-feiras às 14h"
        }
      ]
    },
    
    createdAt: "2024-01-16T14:00:00Z",
    updatedAt: "2024-01-16T15:30:00Z",
    createdBy: "Dr. João Clínico Geral",
    lastModifiedBy: "Dr. João Clínico Geral"
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

    let filteredConsultations = [...mockGeneralMedicineConsultations];

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

    // Estatísticas específicas da clínica geral
    const stats = {
      totalConsultations: filteredConsultations.length,
      chronicDiseases: {
        hypertension: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.diagnosis.toLowerCase().includes('hipertens'))
        ).length,
        diabetes: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.diagnosis.toLowerCase().includes('diabetes'))
        ).length,
        cardiovascular: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.diagnosis.toLowerCase().includes('cardio'))
        ).length
      },
      riskFactors: {
        smoking: filteredConsultations.filter(c => c.medicalHistory.socialHistory.smoking.status === 'current').length,
        alcohol: filteredConsultations.filter(c => 
          c.medicalHistory.socialHistory.alcohol.status === 'regular' || 
          c.medicalHistory.socialHistory.alcohol.status === 'excessive'
        ).length,
        sedentary: filteredConsultations.filter(c => 
          c.medicalHistory.socialHistory.lifestyle.exercise.toLowerCase().includes('sedentário')
        ).length
      },
      preventiveCare: {
        upToDateVaccinations: filteredConsultations.filter(c => c.medicalHistory.immunizations.length > 0).length,
        screeningsDue: filteredConsultations.reduce((acc, c) => 
          acc + c.assessment.plan.preventiveCare.screenings.length, 0
        )
      },
      medications: {
        totalPrescribed: filteredConsultations.reduce((acc, c) => 
          acc + c.assessment.plan.medications.length, 0
        ),
        poorAdherence: filteredConsultations.filter(c => 
          c.medicalHistory.medications.current.some(m => m.adherence === 'poor')
        ).length
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
      message: 'Consultas de clínica geral listadas com sucesso'
    });

  } catch (error) {
    console.error('Erro ao buscar consultas de clínica geral:', error);
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
    
    // Validações específicas para clínica geral
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

    const newConsultation: GeneralMedicineConsultation = {
      id: `GM${Date.now()}`,
      ...body,
      status: body.status || 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simular salvamento no banco
    mockGeneralMedicineConsultations.push(newConsultation);

    return NextResponse.json({
      success: true,
      data: newConsultation,
      message: 'Consulta de clínica geral criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta de clínica geral:', error);
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
    const consultationIndex = mockGeneralMedicineConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Atualizar consulta
    const updatedConsultation = {
      ...mockGeneralMedicineConsultations[consultationIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    mockGeneralMedicineConsultations[consultationIndex] = updatedConsultation;

    return NextResponse.json({
      success: true,
      data: updatedConsultation,
      message: 'Consulta de clínica geral atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar consulta de clínica geral:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}
