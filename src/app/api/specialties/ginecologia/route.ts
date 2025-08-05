import { NextRequest, NextResponse } from 'next/server';

// Interface específica para consulta ginecológica
interface GynecologyConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Dados da consulta
  chiefComplaint: string;
  currentIllness: string;
  
  // História ginecológica
  gynecologicalHistory: {
    menarche: {
      age: number;
      characteristics: string;
    };
    menstrualCycle: {
      duration: number;
      interval: number;
      flow: 'light' | 'normal' | 'heavy';
      regularity: 'regular' | 'irregular';
      lastMenstrualPeriod: string;
      dysmenorrhea: boolean;
      dysmenorrheaSeverity?: 'mild' | 'moderate' | 'severe';
    };
    obstetricHistory: {
      pregnancies: number;
      births: number;
      cesareans: number;
      vaginalDeliveries: number;
      abortions: number;
      ectopicPregnancies: number;
      pregnancyDetails: Array<{
        year: string;
        outcome: 'term_delivery' | 'preterm_delivery' | 'abortion' | 'ectopic';
        deliveryType?: 'vaginal' | 'cesarean';
        complications?: string;
        birthWeight?: number;
        notes?: string;
      }>;
    };
    contraception: {
      current: string;
      duration: string;
      previous: Array<{
        method: string;
        duration: string;
        discontinuationReason: string;
      }>;
      satisfaction: 'satisfied' | 'partially_satisfied' | 'dissatisfied';
    };
    sexualHistory: {
      sexuallyActive: boolean;
      ageFirstIntercourse?: number;
      numberOfPartners: 'one' | 'few' | 'many' | 'prefer_not_to_say';
      currentPartner: boolean;
      libido: 'normal' | 'decreased' | 'increased';
      orgasmicFunction: 'normal' | 'dysfunction';
      dyspareunia: boolean;
      vaginismus: boolean;
    };
    screeningHistory: {
      lastPapSmear: string;
      papSmearResults: Array<{
        date: string;
        result: string;
        followUp: string;
      }>;
      lastMammography: string;
      mammographyResults: Array<{
        date: string;
        result: string;
        birads?: number;
      }>;
      hpvTesting: {
        lastTest: string;
        results: Array<{
          date: string;
          result: 'negative' | 'positive';
          subtypes?: string[];
        }>;
      };
    };
  };
  
  // Sintomas ginecológicos
  gynecologicalSymptoms: {
    vaginalDischarge: {
      present: boolean;
      characteristics?: {
        amount: 'scanty' | 'normal' | 'heavy';
        color: string;
        odor: 'none' | 'mild' | 'strong';
        consistency: string;
        itching: boolean;
        burning: boolean;
      };
    };
    pelvicPain: {
      present: boolean;
      location?: string;
      intensity?: number; // 0-10
      character?: string;
      timing?: string;
      aggravatingFactors?: string[];
      relievingFactors?: string[];
    };
    menstrualDisorders: {
      amenorrhea: boolean;
      oligomenorrhea: boolean;
      polymenorrhea: boolean;
      menorrhagia: boolean;
      metrorrhagia: boolean;
      intermenstrualBleeding: boolean;
      postcoitalBleeding: boolean;
    };
    urinarySymptoms: {
      dysuria: boolean;
      frequency: boolean;
      urgency: boolean;
      incontinence: boolean;
      nocturia: boolean;
      recurrentUTI: boolean;
    };
    climactericSymptoms: {
      hotFlashes: boolean;
      nightSweats: boolean;
      moodChanges: boolean;
      sleepDisturbances: boolean;
      vaginalDryness: boolean;
      decreasedLibido: boolean;
    };
  };
  
  // Exame físico ginecológico
  gynecologicalExam: {
    generalExam: {
      vitalSigns: {
        bloodPressure: string;
        heartRate: number;
        temperature: number;
        weight: number;
        height: number;
        bmi: number;
      };
      thyroid: string;
      lymphNodes: string;
      cardiovascular: string;
      respiratory: string;
      abdomen: string;
    };
    breastExam: {
      performed: boolean;
      inspection: {
        symmetry: boolean;
        skinChanges: boolean;
        nippleRetraction: boolean;
        nippleDischarge: boolean;
        findings: string;
      };
      palpation: {
        masses: boolean;
        tenderness: boolean;
        lymphNodes: boolean;
        findings: string;
      };
      teachingSelfExam: boolean;
    };
    abdominalExam: {
      inspection: string;
      auscultation: string;
      palpation: string;
      percussion: string;
      organomegaly: boolean;
      masses: boolean;
      tenderness: boolean;
      findings: string;
    };
    pelvicExam: {
      performed: boolean;
      externalGenitalia: {
        appearance: string;
        lesions: boolean;
        erythema: boolean;
        edema: boolean;
        discharge: boolean;
        findings: string;
      };
      speculum: {
        cervixAppearance: string;
        cervicalDischarge: boolean;
        ectropion: boolean;
        polyps: boolean;
        lesions: boolean;
        inflammation: boolean;
        findings: string;
      };
      bimanualExam: {
        uterusSize: string;
        uterusPosition: string;
        uterusMobility: string;
        uterusTenderness: boolean;
        ovariesPalpable: boolean;
        ovariesTenderness: boolean;
        adnexalMasses: boolean;
        douglasPouch: string;
        findings: string;
      };
      rectovaginalExam: {
        performed: boolean;
        findings?: string;
      };
    };
  };
  
  // Exames complementares
  diagnosticTests: {
    labTests: {
      pregnancyTest: {
        requested: boolean;
        result?: 'positive' | 'negative';
      };
      hormones: Array<{
        hormone: string;
        value: number;
        unit: string;
        reference: string;
        phase?: string;
      }>;
      cultures: Array<{
        type: 'vaginal' | 'cervical' | 'urine';
        organism?: string;
        sensitivity?: string[];
        result: string;
      }>;
      papSmear: {
        performed: boolean;
        technique: string;
        adequacy: string;
        result: string;
        recommendations: string;
      };
      stdPanel: {
        requested: boolean;
        tests: string[];
        results: Array<{
          test: string;
          result: string;
        }>;
      };
    };
    imaging: {
      transvaginalUltrasound: {
        performed: boolean;
        uterus: {
          size: string;
          position: string;
          contour: string;
          endometrialThickness: number;
          masses: boolean;
          findings: string;
        };
        ovaries: {
          right: {
            size: string;
            follicles: number;
            masses: boolean;
            findings: string;
          };
          left: {
            size: string;
            follicles: number;
            masses: boolean;
            findings: string;
          };
        };
        recommendations: string;
      };
      mammography: {
        performed: boolean;
        birads?: number;
        findings?: string;
        recommendations?: string;
      };
      otherImaging: Array<{
        type: string;
        indication: string;
        findings: string;
        date: string;
      }>;
    };
  };
  
  // Diagnóstico e tratamento
  assessment: {
    diagnoses: Array<{
      primary: boolean;
      diagnosis: string;
      icd10: string;
      confidence: 'high' | 'medium' | 'low';
    }>;
    differentialDiagnoses: string[];
    riskFactors: string[];
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
      hormoneTherapy: Array<{
        type: string;
        preparation: string;
        dosage: string;
        route: string;
        duration: string;
        monitoring: string[];
        contraindications: string[];
      }>;
      procedures: Array<{
        procedure: string;
        indication: string;
        scheduling: 'immediate' | 'routine' | 'urgent';
        preparation?: string[];
        expectedDate?: string;
      }>;
      contraceptiveManagement: {
        counseling: boolean;
        recommendation: string;
        alternatives: string[];
        followUp: string;
      };
      lifestyle: {
        diet: string[];
        exercise: string[];
        weightManagement: string;
        smoking: string;
        alcohol: string;
      };
      followUp: {
        interval: string;
        reason: string;
        instructions: string[];
        nextScreening: string;
      };
    };
  };
  
  // Orientações específicas
  patientEducation: {
    contraception: {
      efficacy: string;
      sideEffects: string[];
      warningsSigns: string[];
      instructions: string[];
    };
    reproductiveHealth: {
      fertilityAwareness: string[];
      preconceptionCounseling: string[];
      menstrualHealth: string[];
    };
    screening: {
      papSmear: {
        frequency: string;
        importance: string;
        preparation: string[];
      };
      breastSelfExam: {
        technique: string[];
        frequency: string;
        reportingChanges: string[];
      };
      mammography: {
        ageToStart: number;
        frequency: string;
        preparation: string[];
      };
    };
    sexualHealth: {
      safePractices: string[];
      stdPrevention: string[];
      communicationWithPartner: string[];
    };
    menopause: {
      symptoms: string[];
      managementOptions: string[];
      lifestyleModifications: string[];
      whenToSeekHelp: string[];
    };
  };
  
  // Procedimentos realizados
  procedures: Array<{
    id: string;
    type: 'iud_insertion' | 'iud_removal' | 'endometrial_biopsy' | 'colposcopy' | 'cervical_biopsy' | 'other';
    indication: string;
    technique: string;
    anesthesia?: string;
    complications?: string;
    specimens?: Array<{
      id: string;
      description: string;
      pathologyLab: string;
      expectedResult: string;
    }>;
    postProcedureInstructions: string[];
    followUpDate: string;
    contraindications: string[];
    consent: boolean;
  }>;
  
  // Anexos e resultados
  attachments: Array<{
    type: 'lab_result' | 'imaging' | 'pathology_report' | 'other';
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
const mockGynecologyConsultations: GynecologyConsultation[] = [
  {
    id: "GYN001",
    patientId: "PAT003",
    doctorId: "DOC003",
    date: "2024-01-16",
    time: "10:00",
    status: "completed",
    chiefComplaint: "Irregularidade menstrual e dor pélvica",
    currentIllness: "Paciente refere ciclos menstruais irregulares há 6 meses, com fluxo intenso e dor pélvica que piora durante a menstruação. Nega corrimento vaginal anormal.",
    
    gynecologicalHistory: {
      menarche: {
        age: 13,
        characteristics: "Normal, sem complicações"
      },
      menstrualCycle: {
        duration: 7,
        interval: 35,
        flow: "heavy",
        regularity: "irregular",
        lastMenstrualPeriod: "2024-01-05",
        dysmenorrhea: true,
        dysmenorrheaSeverity: "severe"
      },
      obstetricHistory: {
        pregnancies: 2,
        births: 1,
        cesareans: 0,
        vaginalDeliveries: 1,
        abortions: 1,
        ectopicPregnancies: 0,
        pregnancyDetails: [
          {
            year: "2020",
            outcome: "term_delivery",
            deliveryType: "vaginal",
            birthWeight: 3200,
            notes: "Parto normal sem complicações"
          },
          {
            year: "2022",
            outcome: "abortion",
            notes: "Aborto espontâneo com 8 semanas"
          }
        ]
      },
      contraception: {
        current: "Anticoncepcional oral combinado",
        duration: "2 anos",
        previous: [
          {
            method: "Preservativo",
            duration: "5 anos",
            discontinuationReason: "Desejo de método hormonal"
          }
        ],
        satisfaction: "partially_satisfied"
      },
      sexualHistory: {
        sexuallyActive: true,
        ageFirstIntercourse: 18,
        numberOfPartners: "one",
        currentPartner: true,
        libido: "normal",
        orgasmicFunction: "normal",
        dyspareunia: true,
        vaginismus: false
      },
      screeningHistory: {
        lastPapSmear: "2023-01-15",
        papSmearResults: [
          {
            date: "2023-01-15",
            result: "Normal",
            followUp: "Rotina em 3 anos"
          }
        ],
        lastMammography: "2023-06-20",
        mammographyResults: [
          {
            date: "2023-06-20",
            result: "Normal",
            birads: 1
          }
        ],
        hpvTesting: {
          lastTest: "2023-01-15",
          results: [
            {
              date: "2023-01-15",
              result: "negative"
            }
          ]
        }
      }
    },
    
    gynecologicalSymptoms: {
      vaginalDischarge: {
        present: false
      },
      pelvicPain: {
        present: true,
        location: "Região pélvica central e bilateral",
        intensity: 7,
        character: "Cólica intensa",
        timing: "Principalmente durante menstruação",
        aggravatingFactors: ["Atividade física", "Relação sexual"],
        relievingFactors: ["Repouso", "Calor local", "Analgésicos"]
      },
      menstrualDisorders: {
        amenorrhea: false,
        oligomenorrhea: true,
        polymenorrhea: false,
        menorrhagia: true,
        metrorrhagia: false,
        intermenstrualBleeding: false,
        postcoitalBleeding: false
      },
      urinarySymptoms: {
        dysuria: false,
        frequency: false,
        urgency: false,
        incontinence: false,
        nocturia: false,
        recurrentUTI: false
      },
      climactericSymptoms: {
        hotFlashes: false,
        nightSweats: false,
        moodChanges: false,
        sleepDisturbances: false,
        vaginalDryness: false,
        decreasedLibido: false
      }
    },
    
    gynecologicalExam: {
      generalExam: {
        vitalSigns: {
          bloodPressure: "120/80",
          heartRate: 75,
          temperature: 36.5,
          weight: 65,
          height: 165,
          bmi: 23.9
        },
        thyroid: "Normal à palpação",
        lymphNodes: "Não palpáveis",
        cardiovascular: "RCR 2T BNF, sem sopros",
        respiratory: "MV+ bilateralmente, sem RA",
        abdomen: "Plano, RHA+, sem massas ou organomegalias"
      },
      breastExam: {
        performed: true,
        inspection: {
          symmetry: true,
          skinChanges: false,
          nippleRetraction: false,
          nippleDischarge: false,
          findings: "Mamas simétricas, sem alterações na inspeção"
        },
        palpation: {
          masses: false,
          tenderness: false,
          lymphNodes: false,
          findings: "Sem nódulos ou massas palpáveis"
        },
        teachingSelfExam: true
      },
      abdominalExam: {
        inspection: "Abdome plano, sem cicatrizes ou alterações",
        auscultation: "RHA presentes",
        palpation: "Indolor, sem massas ou organomegalias",
        percussion: "Timpânico",
        organomegaly: false,
        masses: false,
        tenderness: false,
        findings: "Exame abdominal normal"
      },
      pelvicExam: {
        performed: true,
        externalGenitalia: {
          appearance: "Normal",
          lesions: false,
          erythema: false,
          edema: false,
          discharge: false,
          findings: "Genitália externa sem alterações"
        },
        speculum: {
          cervixAppearance: "Róseo, sem lesões",
          cervicalDischarge: false,
          ectropion: false,
          polyps: false,
          lesions: false,
          inflammation: false,
          findings: "Colo uterino normal"
        },
        bimanualExam: {
          uterusSize: "Aumentado (equivalente a 8-10 semanas)",
          uterusPosition: "Anteversoflexão",
          uterusMobility: "Móvel",
          uterusTenderness: true,
          ovariesPalpable: false,
          ovariesTenderness: false,
          adnexalMasses: false,
          douglasPouch: "Livre",
          findings: "Útero aumentado de volume e doloroso à mobilização"
        },
        rectovaginalExam: {
          performed: false
        }
      }
    },
    
    diagnosticTests: {
      labTests: {
        pregnancyTest: {
          requested: true,
          result: "negative"
        },
        hormones: [
          {
            hormone: "FSH",
            value: 5.2,
            unit: "mUI/mL",
            reference: "3.5-12.5",
            phase: "Folicular"
          },
          {
            hormone: "LH",
            value: 4.8,
            unit: "mUI/mL",
            reference: "2.4-12.6",
            phase: "Folicular"
          },
          {
            hormone: "Estradiol",
            value: 45,
            unit: "pg/mL",
            reference: "12.5-166",
            phase: "Folicular"
          }
        ],
        cultures: [],
        papSmear: {
          performed: false,
          technique: "",
          adequacy: "",
          result: "",
          recommendations: ""
        },
        stdPanel: {
          requested: false,
          tests: [],
          results: []
        }
      },
      imaging: {
        transvaginalUltrasound: {
          performed: true,
          uterus: {
            size: "9.2 x 5.8 x 6.1 cm",
            position: "Anteversoflexão",
            contour: "Irregular",
            endometrialThickness: 8,
            masses: true,
            findings: "Útero aumentado com múltiplos nódulos intramurais, o maior medindo 4.2 cm"
          },
          ovaries: {
            right: {
              size: "3.2 x 2.1 cm",
              follicles: 6,
              masses: false,
              findings: "Ovário direito normal"
            },
            left: {
              size: "2.8 x 2.3 cm",
              follicles: 4,
              masses: false,
              findings: "Ovário esquerdo normal"
            }
          },
          recommendations: "Miomas uterinos múltiplos"
        },
        mammography: {
          performed: false
        },
        otherImaging: []
      }
    },
    
    assessment: {
      diagnoses: [
        {
          primary: true,
          diagnosis: "Leiomioma uterino múltiplo",
          icd10: "D25.9",
          confidence: "high"
        },
        {
          primary: false,
          diagnosis: "Menorragia secundária",
          icd10: "N92.0",
          confidence: "high"
        },
        {
          primary: false,
          diagnosis: "Dismenorreia secundária",
          icd10: "N94.5",
          confidence: "high"
        }
      ],
      differentialDiagnoses: ["Adenomiose", "Pólipos endometriais", "Hiperplasia endometrial"],
      riskFactors: ["Idade reprodutiva", "História familiar", "Nuliparidade"],
      plan: {
        medications: [
          {
            medication: "Ácido tranexâmico",
            dosage: "500mg",
            frequency: "3x/dia",
            duration: "Durante menstruação",
            indication: "Redução do fluxo menstrual",
            instructions: "Tomar apenas durante os dias de fluxo intenso"
          },
          {
            medication: "Ibuprofeno",
            dosage: "400mg",
            frequency: "3x/dia",
            duration: "Conforme necessário",
            indication: "Controle da dor",
            instructions: "Tomar com alimentos, não exceder 1200mg/dia"
          }
        ],
        hormoneTherapy: [
          {
            type: "Progestina intrauterina",
            preparation: "DIU Mirena",
            dosage: "20mcg/dia",
            route: "Intrauterino",
            duration: "5 anos",
            monitoring: ["Sangramento irregular inicial", "Amenorreia progressiva"],
            contraindications: ["Gravidez", "Infecção pélvica ativa"]
          }
        ],
        procedures: [
          {
            procedure: "Inserção de DIU Mirena",
            indication: "Controle da menorragia e dismenorreia",
            scheduling: "routine",
            preparation: ["Analgésico pré-procedimento", "Jejum não necessário"],
            expectedDate: "2024-01-30"
          }
        ],
        contraceptiveManagement: {
          counseling: true,
          recommendation: "DIU Mirena para controle sintomático",
          alternatives: ["Anticoncepcional contínuo", "Injetável trimestral"],
          followUp: "30 dias após inserção"
        },
        lifestyle: {
          diet: ["Dieta rica em ferro", "Redução de cafeína"],
          exercise: ["Exercícios regulares", "Evitar exercícios intensos durante menstruação"],
          weightManagement: "Manter peso atual",
          smoking: "Não aplicável",
          alcohol: "Consumo moderado"
        },
        followUp: {
          interval: "3 meses",
          reason: "Avaliação da resposta ao tratamento",
          instructions: [
            "Retornar se sangramento excessivo",
            "Anotar padrão menstrual",
            "Observar sinais de infecção pós-DIU"
          ],
          nextScreening: "Papanicolaou em 2024"
        }
      }
    },
    
    patientEducation: {
      contraception: {
        efficacy: "DIU Mirena > 99% eficácia contraceptiva",
        sideEffects: ["Sangramento irregular inicial", "Amenorreia", "Dor pélvica temporária"],
        warningsSigns: ["Febre", "Dor pélvica intensa", "Sangramento excessivo"],
        instructions: ["Verificar fios mensalmente", "Retorno em 30 dias"]
      },
      reproductiveHealth: {
        fertilityAwareness: ["Fertilidade retorna rapidamente após remoção"],
        preconceptionCounseling: ["Planejamento familiar futuro"],
        menstrualHealth: ["Monitorar padrão menstrual", "Anotar sintomas"]
      },
      screening: {
        papSmear: {
          frequency: "3 anos",
          importance: "Prevenção de câncer cervical",
          preparation: ["Não fazer durante menstruação", "Evitar duchas 24h antes"]
        },
        breastSelfExam: {
          technique: ["Inspeção em pé", "Palpação deitada", "Movimentos circulares"],
          frequency: "Mensal",
          reportingChanges: ["Nódulos", "Alterações na pele", "Secreção"]
        },
        mammography: {
          ageToStart: 40,
          frequency: "Anual após 40 anos",
          preparation: ["Evitar desodorante", "Agendar após menstruação"]
        }
      },
      sexualHealth: {
        safePractices: ["Uso de preservativo", "Parceiro fixo"],
        stdPrevention: ["Testagem regular", "Vacinação HPV"],
        communicationWithPartner: ["Discutir métodos contraceptivos", "Sintomas"]
      },
      menopause: {
        symptoms: ["Ondas de calor", "Irregularidade menstrual"],
        managementOptions: ["Terapia hormonal", "Tratamentos não hormonais"],
        lifestyleModifications: ["Exercícios", "Dieta equilibrada"],
        whenToSeekHelp: ["Sangramento pós-menopausa", "Sintomas severos"]
      }
    },
    
    procedures: [
      {
        id: "PROC001",
        type: "iud_insertion",
        indication: "Controle de menorragia e contracepção",
        technique: "Inserção guiada por ultrassom",
        anesthesia: "Anestesia local",
        postProcedureInstructions: [
          "Repouso relativo por 24h",
          "Evitar relações sexuais por 48h",
          "Observar sinais de infecção",
          "Retorno em 30 dias"
        ],
        followUpDate: "2024-02-15",
        contraindications: [],
        consent: true
      }
    ],
    
    attachments: [
      {
        type: "imaging",
        filename: "ultrassom_transvaginal_16012024.pdf",
        description: "Ultrassom transvaginal",
        date: "2024-01-16",
        result: "Miomas uterinos múltiplos"
      }
    ],
    
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T11:30:00Z",
    createdBy: "Dra. Ana Ginecologista",
    lastModifiedBy: "Dra. Ana Ginecologista"
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

    let filteredConsultations = [...mockGynecologyConsultations];

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

    // Estatísticas específicas da ginecologia
    const stats = {
      totalConsultations: filteredConsultations.length,
      contraception: {
        hormonal: filteredConsultations.filter(c => c.gynecologicalHistory.contraception.current.includes('hormonal')).length,
        iud: filteredConsultations.filter(c => c.gynecologicalHistory.contraception.current.includes('DIU')).length,
        barrier: filteredConsultations.filter(c => c.gynecologicalHistory.contraception.current.includes('preservativo')).length
      },
      procedures: {
        iudInsertions: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'iud_insertion').length, 0),
        biopsies: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'endometrial_biopsy').length, 0),
        colposcopies: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'colposcopy').length, 0)
      },
      screening: {
        papSmearUpToDate: filteredConsultations.filter(c => {
          const lastPap = new Date(c.gynecologicalHistory.screeningHistory.lastPapSmear);
          const threeYearsAgo = new Date();
          threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
          return lastPap >= threeYearsAgo;
        }).length,
        mammographyUpToDate: filteredConsultations.filter(c => {
          const lastMammo = new Date(c.gynecologicalHistory.screeningHistory.lastMammography);
          const twoYearsAgo = new Date();
          twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
          return lastMammo >= twoYearsAgo;
        }).length
      },
      symptoms: {
        pelvicPain: filteredConsultations.filter(c => c.gynecologicalSymptoms.pelvicPain.present).length,
        menstrualDisorders: filteredConsultations.filter(c => 
          c.gynecologicalSymptoms.menstrualDisorders.menorrhagia || 
          c.gynecologicalSymptoms.menstrualDisorders.oligomenorrhea
        ).length,
        climactericSymptoms: filteredConsultations.filter(c => 
          c.gynecologicalSymptoms.climactericSymptoms.hotFlashes ||
          c.gynecologicalSymptoms.climactericSymptoms.vaginalDryness
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
      message: 'Consultas ginecológicas listadas com sucesso'
    });

  } catch (error) {
    console.error('Erro ao buscar consultas ginecológicas:', error);
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
    
    // Validações específicas para ginecologia
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

    const newConsultation: GynecologyConsultation = {
      id: `GYN${Date.now()}`,
      ...body,
      status: body.status || 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simular salvamento no banco
    mockGynecologyConsultations.push(newConsultation);

    return NextResponse.json({
      success: true,
      data: newConsultation,
      message: 'Consulta ginecológica criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta ginecológica:', error);
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
    const consultationIndex = mockGynecologyConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Atualizar consulta
    const updatedConsultation = {
      ...mockGynecologyConsultations[consultationIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    mockGynecologyConsultations[consultationIndex] = updatedConsultation;

    return NextResponse.json({
      success: true,
      data: updatedConsultation,
      message: 'Consulta ginecológica atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar consulta ginecológica:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}
