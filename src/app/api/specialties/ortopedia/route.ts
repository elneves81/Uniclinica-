import { NextRequest, NextResponse } from 'next/server';

// Interface específica para consulta ortopédica
interface OrthopedicConsultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Dados da consulta
  chiefComplaint: string;
  currentIllness: string;
  
  // História ortopédica
  orthopedicHistory: {
    previousInjuries: Array<{
      injury: string;
      location: string;
      date: string;
      treatment: string;
      outcome: 'complete_recovery' | 'partial_recovery' | 'no_improvement' | 'worsened';
      residualSymptoms: string;
    }>;
    surgicalHistory: Array<{
      procedure: string;
      surgeon: string;
      date: string;
      indication: string;
      complications: string;
      outcome: string;
      implants?: {
        type: string;
        material: string;
        size: string;
      };
    }>;
    fractures: Array<{
      bone: string;
      type: string;
      date: string;
      treatment: 'conservative' | 'surgical';
      healing: 'complete' | 'delayed' | 'non-union' | 'malunion';
      complications: string;
    }>;
    chronicConditions: Array<{
      condition: string;
      diagnosis: string;
      startDate: string;
      severity: 'mild' | 'moderate' | 'severe';
      treatment: string;
      progression: 'stable' | 'improving' | 'worsening';
    }>;
    sports: {
      participation: boolean;
      type?: string[];
      level?: 'recreational' | 'competitive' | 'professional';
      injuries?: string[];
      currentActivity: boolean;
    };
    occupation: {
      description: string;
      physicalDemands: 'light' | 'moderate' | 'heavy';
      ergonomicRisks: string[];
      workRelatedInjuries: string[];
    };
  };
  
  // Sintomas musculoesqueléticos
  musculoskeletalSymptoms: {
    pain: {
      location: string[];
      intensity: number; // 0-10
      character: 'sharp' | 'dull' | 'throbbing' | 'burning' | 'aching' | 'cramping';
      onset: 'sudden' | 'gradual';
      duration: string;
      frequency: 'constant' | 'intermittent' | 'episodic';
      timing: string;
      aggravatingFactors: string[];
      relievingFactors: string[];
      radiation: boolean;
      radiationPattern?: string;
    };
    stiffness: {
      present: boolean;
      location?: string[];
      timing?: 'morning' | 'evening' | 'after_activity' | 'constant';
      duration?: string;
      severity?: 'mild' | 'moderate' | 'severe';
    };
    swelling: {
      present: boolean;
      location?: string[];
      onset?: string;
      associated?: string[];
    };
    weakness: {
      present: boolean;
      location?: string[];
      progression?: 'stable' | 'improving' | 'worsening';
      functional?: string[];
    };
    instability: {
      present: boolean;
      location?: string[];
      circumstances?: string[];
      frequency?: string;
    };
    numbness: {
      present: boolean;
      location?: string[];
      pattern?: string;
      associated?: string[];
    };
    functionalLimitations: {
      present: boolean;
      activities?: string[];
      severity?: 'mild' | 'moderate' | 'severe';
      progression?: 'stable' | 'improving' | 'worsening';
    };
  };
  
  // Exame físico ortopédico
  orthopedicExam: {
    generalExam: {
      posture: {
        standing: string;
        sitting: string;
        walking: string;
        abnormalities: string[];
      };
      gait: {
        pattern: string;
        speed: 'normal' | 'slow' | 'fast';
        symmetry: boolean;
        assistiveDevices: string[];
        abnormalities: string[];
      };
      spinalAlignment: {
        cervical: string;
        thoracic: string;
        lumbar: string;
        scoliosis: boolean;
        kyphosis: boolean;
        lordosis: boolean;
      };
    };
    regionalExam: {
      cervicalSpine: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          lateralFlexion: number;
          rotation: number;
        };
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        neurology: {
          reflexes: string;
          sensation: string;
          strength: string;
        };
      };
      thoracicSpine: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          lateralFlexion: number;
          rotation: number;
        };
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
      };
      lumbarSpine: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          lateralFlexion: number;
        };
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        neurology: {
          reflexes: string;
          sensation: string;
          strength: string;
          straightLegRaise: {
            right: number;
            left: number;
          };
        };
      };
      shoulder: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          abduction: number;
          internalRotation: number;
          externalRotation: number;
        };
        strength: {
          flexion: string;
          extension: string;
          abduction: string;
          internalRotation: string;
          externalRotation: string;
        };
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        stability: string;
      };
      elbow: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          pronation: number;
          supination: number;
        };
        strength: string;
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        stability: string;
      };
      wrist: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          radialDeviation: number;
          ulnarDeviation: number;
        };
        strength: string;
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
      };
      hip: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
          abduction: number;
          adduction: number;
          internalRotation: number;
          externalRotation: number;
        };
        strength: string;
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        stability: string;
      };
      knee: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          flexion: number;
          extension: number;
        };
        strength: string;
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        stability: {
          anterior: string;
          posterior: string;
          medial: string;
          lateral: string;
        };
        meniscalTests: Array<{
          test: string;
          result: 'positive' | 'negative';
        }>;
      };
      ankle: {
        examined: boolean;
        inspection: string;
        palpation: string;
        rangeOfMotion: {
          dorsiflexion: number;
          plantarFlexion: number;
          inversion: number;
          eversion: number;
        };
        strength: string;
        specialTests: Array<{
          test: string;
          result: 'positive' | 'negative';
          interpretation: string;
        }>;
        stability: string;
      };
    };
  };
  
  // Exames de imagem
  imaging: {
    xRays: Array<{
      region: string;
      views: string[];
      date: string;
      findings: string;
      impression: string;
      recommendations: string;
    }>;
    mri: Array<{
      region: string;
      sequences: string[];
      contrast: boolean;
      date: string;
      findings: string;
      impression: string;
      recommendations: string;
    }>;
    ct: Array<{
      region: string;
      contrast: boolean;
      date: string;
      findings: string;
      impression: string;
      recommendations: string;
    }>;
    ultrasound: Array<{
      region: string;
      indication: string;
      date: string;
      findings: string;
      impression: string;
    }>;
    boneScan: Array<{
      indication: string;
      date: string;
      findings: string;
      impression: string;
    }>;
    other: Array<{
      type: string;
      region: string;
      date: string;
      findings: string;
      impression: string;
    }>;
  };
  
  // Testes funcionais
  functionalAssessment: {
    balanceTests: Array<{
      test: string;
      result: string;
      normative: string;
    }>;
    strengthTests: Array<{
      muscle: string;
      grade: string; // 0-5 scale
      method: string;
    }>;
    enduranceTests: Array<{
      test: string;
      result: string;
      normative: string;
    }>;
    functionalScales: Array<{
      scale: string;
      score: number;
      maxScore: number;
      interpretation: string;
    }>;
    returnToSport: {
      applicable: boolean;
      tests?: Array<{
        test: string;
        result: string;
        criteria: string;
        passed: boolean;
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
      anatomicalLocation: string;
    }>;
    differentialDiagnoses: string[];
    stage: string;
    severity: 'mild' | 'moderate' | 'severe';
    prognosis: 'excellent' | 'good' | 'fair' | 'poor';
    plan: {
      conservative: {
        rest: {
          type: string;
          duration: string;
          restrictions: string[];
        };
        physiotherapy: {
          indicated: boolean;
          goals?: string[];
          duration?: string;
          frequency?: string;
          modalities?: string[];
        };
        medications: Array<{
          medication: string;
          dosage: string;
          frequency: string;
          duration: string;
          indication: string;
          precautions: string[];
        }>;
        injections: Array<{
          type: 'corticosteroid' | 'hyaluronic_acid' | 'platelet_rich_plasma' | 'other';
          location: string;
          indication: string;
          technique: string;
          expectedOutcome: string;
          risks: string[];
        }>;
        orthotics: {
          indicated: boolean;
          type?: string;
          purpose?: string;
          duration?: string;
        };
        bracing: {
          indicated: boolean;
          type?: string;
          purpose?: string;
          duration?: string;
          wearingSchedule?: string;
        };
      };
      surgical: {
        indicated: boolean;
        procedure?: string;
        indication?: string;
        urgency?: 'emergent' | 'urgent' | 'elective';
        approach?: string;
        expectedOutcome?: string;
        risks?: string[];
        alternatives?: string[];
        postOpProtocol?: string;
      };
      followUp: {
        interval: string;
        reason: string;
        instructions: string[];
        imaging?: string;
        nextVisit: string;
      };
    };
  };
  
  // Orientações ao paciente
  patientEducation: {
    anatomy: {
      explanation: string;
      diagrams: boolean;
    };
    condition: {
      pathophysiology: string;
      naturalHistory: string;
      prognosis: string;
    };
    treatment: {
      rationale: string;
      expectations: string;
      timeline: string;
      compliance: string[];
    };
    activity: {
      restrictions: string[];
      modifications: string[];
      progressionCriteria: string[];
    };
    prevention: {
      primaryPrevention: string[];
      secondaryPrevention: string[];
      riskFactorModification: string[];
    };
    redFlags: {
      symptoms: string[];
      instructions: string;
    };
    homeExercises: Array<{
      exercise: string;
      sets: number;
      repetitions: number;
      frequency: string;
      duration: string;
      progression: string;
      precautions: string[];
    }>;
    ergonomics: {
      workplace: string[];
      home: string[];
      sports: string[];
    };
  };
  
  // Procedimentos realizados
  procedures: Array<{
    id: string;
    type: 'injection' | 'aspiration' | 'arthroscopy' | 'reduction' | 'immobilization' | 'other';
    anatomicalLocation: string;
    indication: string;
    technique: string;
    anesthesia?: string;
    materials?: string[];
    findings?: string;
    complications?: string;
    specimens?: Array<{
      id: string;
      description: string;
      analysis: string;
    }>;
    postProcedureInstructions: string[];
    followUpDate: string;
    outcome?: string;
  }>;
  
  // Anexos e resultados
  attachments: Array<{
    type: 'imaging' | 'lab_result' | 'pt_notes' | 'surgical_report' | 'other';
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
const mockOrthopedicConsultations: OrthopedicConsultation[] = [
  {
    id: "ORTHO001",
    patientId: "PAT004",
    doctorId: "DOC004",
    date: "2024-01-16",
    time: "08:30",
    status: "completed",
    chiefComplaint: "Dor no joelho direito após trauma esportivo",
    currentIllness: "Paciente refere dor aguda no joelho direito iniciada há 3 dias após entorse durante partida de futebol. Relata edema, dificuldade para apoiar o peso e sensação de instabilidade.",
    
    orthopedicHistory: {
      previousInjuries: [
        {
          injury: "Entorse tornozelo esquerdo",
          location: "Tornozelo esquerdo",
          date: "2022-03-15",
          treatment: "Conservador - imobilização e fisioterapia",
          outcome: "complete_recovery",
          residualSymptoms: "Nenhum"
        }
      ],
      surgicalHistory: [],
      fractures: [],
      chronicConditions: [],
      sports: {
        participation: true,
        type: ["Futebol", "Corrida"],
        level: "recreational",
        injuries: ["Entorse tornozelo"],
        currentActivity: true
      },
      occupation: {
        description: "Engenheiro - trabalho de escritório",
        physicalDemands: "light",
        ergonomicRisks: ["Postura sentada prolongada"],
        workRelatedInjuries: []
      }
    },
    
    musculoskeletalSymptoms: {
      pain: {
        location: ["Joelho direito - face medial"],
        intensity: 7,
        character: "sharp",
        onset: "sudden",
        duration: "3 dias",
        frequency: "constant",
        timing: "Pior com movimentação",
        aggravatingFactors: ["Apoio do peso", "Flexão do joelho", "Rotação"],
        relievingFactors: ["Repouso", "Gelo", "Elevação"],
        radiation: false
      },
      stiffness: {
        present: true,
        location: ["Joelho direito"],
        timing: "morning",
        duration: "30 minutos",
        severity: "moderate"
      },
      swelling: {
        present: true,
        location: ["Joelho direito - compartimento medial"],
        onset: "Imediato após trauma",
        associated: ["Dor", "Limitação de movimento"]
      },
      weakness: {
        present: true,
        location: ["Quadríceps direito"],
        progression: "stable",
        functional: ["Dificuldade para subir escadas", "Apoio unipodal instável"]
      },
      instability: {
        present: true,
        location: ["Joelho direito"],
        circumstances: ["Movimentos de rotação", "Mudança de direção"],
        frequency: "Episódica"
      },
      numbness: {
        present: false
      },
      functionalLimitations: {
        present: true,
        activities: ["Caminhada", "Subir/descer escadas", "Agachamento", "Esportes"],
        severity: "moderate",
        progression: "stable"
      }
    },
    
    orthopedicExam: {
      generalExam: {
        posture: {
          standing: "Descarga de peso preferencial em membro inferior esquerdo",
          sitting: "Normal",
          walking: "Claudicação antálgica",
          abnormalities: ["Evita apoio completo em MID"]
        },
        gait: {
          pattern: "Antálgica",
          speed: "slow",
          symmetry: false,
          assistiveDevices: [],
          abnormalities: ["Fase de apoio reduzida em MID", "Diminuição do comprimento do passo"]
        },
        spinalAlignment: {
          cervical: "Normal",
          thoracic: "Normal",
          lumbar: "Normal",
          scoliosis: false,
          kyphosis: false,
          lordosis: false
        }
      },
      regionalExam: {
        cervicalSpine: {
          examined: false,
          inspection: "",
          palpation: "",
          rangeOfMotion: {
            flexion: 0,
            extension: 0,
            lateralFlexion: 0,
            rotation: 0
          },
          specialTests: [],
          neurology: {
            reflexes: "",
            sensation: "",
            strength: ""
          }
        },
        thoracicSpine: {
          examined: false,
          inspection: "",
          palpation: "",
          rangeOfMotion: {
            flexion: 0,
            extension: 0,
            lateralFlexion: 0,
            rotation: 0
          },
          specialTests: []
        },
        lumbarSpine: {
          examined: false,
          inspection: "",
          palpation: "",
          rangeOfMotion: {
            flexion: 0,
            extension: 0,
            lateralFlexion: 0
          },
          specialTests: [],
          neurology: {
            reflexes: "",
            sensation: "",
            strength: "",
            straightLegRaise: {
              right: 0,
              left: 0
            }
          }
        },
        shoulder: {
          examined: false,
          inspection: "",
          palpation: "",
          rangeOfMotion: {
            flexion: 0,
            extension: 0,
            abduction: 0,
            internalRotation: 0,
            externalRotation: 0
          },
          strength: {
            flexion: "",
            extension: "",
            abduction: "",
            internalRotation: "",
            externalRotation: ""
          },
          specialTests: [],
          stability: ""
        },
        elbow: {
          examined: false,
          inspection: "",
          palpation: "",
          rangeOfMotion: {
            flexion: 0,
            extension: 0,
            pronation: 0,
            supination: 0
          },
          strength: "",
          specialTests: [],
          stability: ""
        },
        wrist: {
          examined: false,
          inspection: "",
          palpation: "",
          rangeOfMotion: {
            flexion: 0,
            extension: 0,
            radialDeviation: 0,
            ulnarDeviation: 0
          },
          strength: "",
          specialTests: []
        },
        hip: {
          examined: true,
          inspection: "Sem deformidades ou assimetrias",
          palpation: "Indolor",
          rangeOfMotion: {
            flexion: 120,
            extension: 10,
            abduction: 45,
            adduction: 20,
            internalRotation: 35,
            externalRotation: 40
          },
          strength: "5/5 em todos os grupos musculares",
          specialTests: [
            {
              test: "Teste de impacto femoroacetabular",
              result: "negative",
              interpretation: "Ausência de conflito femoroacetabular"
            }
          ],
          stability: "Estável"
        },
        knee: {
          examined: true,
          inspection: "Edema moderado em compartimento medial, sem deformidades aparentes",
          palpation: "Dor à palpação de ligamento colateral medial, derrame articular presente",
          rangeOfMotion: {
            flexion: 90,
            extension: -5
          },
          strength: "Quadríceps 4/5, isquiotibiais 5/5",
          specialTests: [
            {
              test: "Teste de estresse em valgo",
              result: "positive",
              interpretation: "Lesão do ligamento colateral medial"
            },
            {
              test: "Gaveta anterior",
              result: "negative",
              interpretation: "LCA íntegro"
            },
            {
              test: "Gaveta posterior",
              result: "negative", 
              interpretation: "LCP íntegro"
            },
            {
              test: "Teste de estresse em varo",
              result: "negative",
              interpretation: "LCL íntegro"
            }
          ],
          stability: {
            anterior: "Estável",
            posterior: "Estável", 
            medial: "Instabilidade grau II",
            lateral: "Estável"
          },
          meniscalTests: [
            {
              test: "McMurray medial",
              result: "negative"
            },
            {
              test: "McMurray lateral",
              result: "negative"
            }
          ]
        },
        ankle: {
          examined: true,
          inspection: "Normal bilateralmente",
          palpation: "Indolor",
          rangeOfMotion: {
            dorsiflexion: 20,
            plantarFlexion: 45,
            inversion: 30,
            eversion: 15
          },
          strength: "5/5 em todos os grupos musculares",
          specialTests: [],
          stability: "Estável bilateralmente"
        }
      }
    },
    
    imaging: {
      xRays: [
        {
          region: "Joelho direito",
          views: ["AP", "Lateral", "Axial de patela"],
          date: "2024-01-16",
          findings: "Sem evidências de fraturas ou luxações. Espaço articular preservado. Sem sinais de artrose.",
          impression: "Radiografia normal",
          recommendations: "RM para avaliação de partes moles"
        }
      ],
      mri: [
        {
          region: "Joelho direito",
          sequences: ["T1", "T2", "STIR", "DP"],
          contrast: false,
          date: "2024-01-17",
          findings: "Edema difuso no ligamento colateral medial com descontinuidade de fibras na porção proximal. Derrame articular moderado. Meniscos íntegros. LCA, LCP e LCL normais.",
          impression: "Lesão grau II do ligamento colateral medial",
          recommendations: "Tratamento conservador"
        }
      ],
      ct: [],
      ultrasound: [],
      boneScan: [],
      other: []
    },
    
    functionalAssessment: {
      balanceTests: [
        {
          test: "Apoio unipodal (MID)",
          result: "5 segundos",
          normative: ">30 segundos"
        }
      ],
      strengthTests: [
        {
          muscle: "Quadríceps direito",
          grade: "4/5",
          method: "Teste manual"
        },
        {
          muscle: "Isquiotibiais direito",
          grade: "5/5",
          method: "Teste manual"
        }
      ],
      enduranceTests: [],
      functionalScales: [
        {
          scale: "IKDC Subjective Knee Form",
          score: 45,
          maxScore: 100,
          interpretation: "Função severamente limitada"
        }
      ],
      returnToSport: {
        applicable: true,
        tests: [
          {
            test: "Hop test unipodal",
            result: "Não realizado - dor",
            criteria: ">90% do lado contralateral",
            passed: false
          }
        ]
      }
    },
    
    assessment: {
      diagnoses: [
        {
          primary: true,
          diagnosis: "Lesão do ligamento colateral medial grau II",
          icd10: "S83.401A",
          confidence: "high",
          anatomicalLocation: "Joelho direito"
        }
      ],
      differentialDiagnoses: ["Lesão meniscal", "Lesão condral", "Fratura oculta"],
      stage: "Agudo",
      severity: "moderate",
      prognosis: "good",
      plan: {
        conservative: {
          rest: {
            type: "Repouso relativo",
            duration: "2-3 semanas",
            restrictions: ["Evitar esportes", "Evitar rotação forçada", "Apoio conforme tolerado"]
          },
          physiotherapy: {
            indicated: true,
            goals: ["Redução do edema", "Recuperação da ADM", "Fortalecimento do quadríceps", "Propriocepção"],
            duration: "6-8 semanas",
            frequency: "3x/semana",
            modalities: ["Crioterapia", "Ultrassom", "Exercícios isométricos"]
          },
          medications: [
            {
              medication: "Naproxeno",
              dosage: "500mg",
              frequency: "2x/dia",
              duration: "10 dias",
              indication: "Anti-inflamatório e analgésico",
              precautions: ["Tomar com alimentos", "Observar sinais de irritação gástrica"]
            },
            {
              medication: "Dipirona",
              dosage: "500mg",
              frequency: "4x/dia",
              duration: "Conforme necessário",
              indication: "Analgesia adicional",
              precautions: ["Não exceder dose máxima diária"]
            }
          ],
          injections: [],
          orthotics: {
            indicated: false
          },
          bracing: {
            indicated: true,
            type: "Joelheira com dobradiças laterais",
            purpose: "Proteção do LCM e estabilização",
            duration: "4-6 semanas",
            wearingSchedule: "Durante atividades e exercícios"
          }
        },
        surgical: {
          indicated: false
        },
        followUp: {
          interval: "2 semanas",
          reason: "Avaliação da evolução clínica",
          instructions: [
            "Aplicar gelo 20min 4x/dia",
            "Manter elevação quando possível",
            "Iniciar exercícios isométricos suaves",
            "Usar joelheira conforme orientado"
          ],
          imaging: "RM controle em 6 semanas se não houver melhora",
          nextVisit: "2024-01-30"
        }
      }
    },
    
    patientEducation: {
      anatomy: {
        explanation: "O ligamento colateral medial estabiliza a parte interna do joelho, evitando abertura excessiva da articulação",
        diagrams: true
      },
      condition: {
        pathophysiology: "Lesão grau II indica ruptura parcial das fibras do ligamento com manutenção da continuidade",
        naturalHistory: "Tempo de cicatrização de 6-8 semanas com tratamento adequado",
        prognosis: "Excelente com aderência ao tratamento conservador"
      },
      treatment: {
        rationale: "Tratamento conservador permite cicatrização natural do ligamento",
        expectations: "Melhora progressiva da dor e função ao longo de 6-8 semanas",
        timeline: "Fase 1 (0-2 sem): proteção; Fase 2 (2-6 sem): mobilização; Fase 3 (6-12 sem): fortalecimento",
        compliance: ["Uso da joelheira", "Adesão à fisioterapia", "Progressão gradual das atividades"]
      },
      activity: {
        restrictions: ["Evitar esportes por 8-12 semanas", "Evitar pivoteamento e rotação", "Não correr por 6 semanas"],
        modifications: ["Caminhada em terreno plano", "Natação após 4 semanas", "Bicicleta estacionária após 3 semanas"],
        progressionCriteria: ["Ausência de dor", "ADM completa", "Força normal", "Estabilidade adequada"]
      },
      prevention: {
        primaryPrevention: ["Aquecimento adequado", "Fortalecimento dos músculos da coxa"],
        secondaryPrevention: ["Propriocepção", "Técnica esportiva adequada", "Equipamentos de proteção"],
        riskFactorModification: ["Correção de desequilíbrios musculares", "Melhora da flexibilidade"]
      },
      redFlags: {
        symptoms: ["Dor intensa e súbita", "Incapacidade de apoiar peso", "Deformidade visível", "Dormência persistente"],
        instructions: "Procurar atendimento imediato se apresentar estes sintomas"
      },
      homeExercises: [
        {
          exercise: "Isometria de quadríceps",
          sets: 3,
          repetitions: 10,
          frequency: "3x/dia",
          duration: "5 segundos cada contração",
          progression: "Aumentar tempo de contração gradualmente",
          precautions: ["Evitar dor durante o exercício"]
        },
        {
          exercise: "Elevação da perna estendida",
          sets: 3,
          repetitions: 10,
          frequency: "2x/dia",
          duration: "2 segundos no topo",
          progression: "Adicionar peso após 2 semanas",
          precautions: ["Manter lombar apoiada"]
        }
      ],
      ergonomics: {
        workplace: ["Pausas regulares", "Ajuste da altura da cadeira"],
        home: ["Evitar agachamentos profundos", "Usar corrimão nas escadas"],
        sports: ["Retorno gradual", "Aquecimento prolongado", "Uso de proteção"]
      }
    },
    
    procedures: [],
    
    attachments: [
      {
        type: "imaging",
        filename: "rx_joelho_direito_16012024.pdf",
        description: "Radiografia do joelho direito",
        date: "2024-01-16",
        result: "Normal"
      },
      {
        type: "imaging",
        filename: "rm_joelho_direito_17012024.pdf",
        description: "Ressonância magnética do joelho direito",
        date: "2024-01-17",
        result: "Lesão LCM grau II"
      }
    ],
    
    createdAt: "2024-01-16T08:30:00Z",
    updatedAt: "2024-01-16T10:15:00Z",
    createdBy: "Dr. Carlos Ortopedista",
    lastModifiedBy: "Dr. Carlos Ortopedista"
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

    let filteredConsultations = [...mockOrthopedicConsultations];

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

    // Estatísticas específicas da ortopedia
    const stats = {
      totalConsultations: filteredConsultations.length,
      conditions: {
        spinal: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.anatomicalLocation.includes('spine') || d.anatomicalLocation.includes('vertebra'))
        ).length,
        knee: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.anatomicalLocation.includes('joelho') || d.anatomicalLocation.includes('knee'))
        ).length,
        shoulder: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.anatomicalLocation.includes('ombro') || d.anatomicalLocation.includes('shoulder'))
        ).length,
        hip: filteredConsultations.filter(c => 
          c.assessment.diagnoses.some(d => d.anatomicalLocation.includes('quadril') || d.anatomicalLocation.includes('hip'))
        ).length
      },
      treatmentTypes: {
        conservative: filteredConsultations.filter(c => !c.assessment.plan.surgical?.indicated).length,
        surgical: filteredConsultations.filter(c => c.assessment.plan.surgical?.indicated).length,
        physiotherapy: filteredConsultations.filter(c => c.assessment.plan.conservative.physiotherapy.indicated).length,
        injections: filteredConsultations.filter(c => c.assessment.plan.conservative.injections.length > 0).length
      },
      imaging: {
        xrays: filteredConsultations.reduce((acc, c) => acc + c.imaging.xRays.length, 0),
        mri: filteredConsultations.reduce((acc, c) => acc + c.imaging.mri.length, 0),
        ct: filteredConsultations.reduce((acc, c) => acc + c.imaging.ct.length, 0)
      },
      procedures: {
        total: filteredConsultations.reduce((acc, c) => acc + c.procedures.length, 0),
        injections: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'injection').length, 0),
        arthroscopies: filteredConsultations.reduce((acc, c) => acc + c.procedures.filter(p => p.type === 'arthroscopy').length, 0)
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
      message: 'Consultas ortopédicas listadas com sucesso'
    });

  } catch (error) {
    console.error('Erro ao buscar consultas ortopédicas:', error);
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
    
    // Validações específicas para ortopedia
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

    const newConsultation: OrthopedicConsultation = {
      id: `ORTHO${Date.now()}`,
      ...body,
      status: body.status || 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simular salvamento no banco
    mockOrthopedicConsultations.push(newConsultation);

    return NextResponse.json({
      success: true,
      data: newConsultation,
      message: 'Consulta ortopédica criada com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta ortopédica:', error);
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
    const consultationIndex = mockOrthopedicConsultations.findIndex(c => c.id === id);
    
    if (consultationIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Consulta não encontrada',
        data: null
      }, { status: 404 });
    }

    // Atualizar consulta
    const updatedConsultation = {
      ...mockOrthopedicConsultations[consultationIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    mockOrthopedicConsultations[consultationIndex] = updatedConsultation;

    return NextResponse.json({
      success: true,
      data: updatedConsultation,
      message: 'Consulta ortopédica atualizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar consulta ortopédica:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      data: null
    }, { status: 500 });
  }
}
