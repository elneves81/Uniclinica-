"use client";

import { useState } from "react";
import { 
  Heart, 
  Calendar, 
  Baby,
  Stethoscope,
  AlertTriangle,
  Plus,
  Search,
  Eye,
  FileText,
  Clock,
  Activity,
  Shield,
  Clipboard
} from "lucide-react";

interface GynecologyRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  consultDate: string;
  consultType: "routine" | "prenatal" | "emergency" | "follow_up";
  
  // História ginecológica
  gynecologicalHistory: {
    menarche: number; // idade da menarca
    menstrualCycle: {
      regular: boolean;
      interval: number; // dias
      duration: number; // dias
      flow: "light" | "normal" | "heavy";
      lastPeriod: string;
      pain: boolean;
      pms: boolean;
    };
    contraception: {
      current: string;
      previous: string[];
      duration: string;
    };
    pregnancies: {
      gravida: number;
      para: number;
      abortions: number;
      cesarean: number;
      vaginal: number;
    };
    sexualActivity: {
      active: boolean;
      ageFirstIntercourse: number;
      partners: number;
      currentPartner: boolean;
    };
  };

  // História obstétrica (se aplicável)
  obstetricalHistory?: {
    currentPregnancy?: {
      gestationalAge: number; // semanas
      dueDate: string;
      prenatalCare: boolean;
      complications: string[];
      ultrasounds: Array<{
        date: string;
        gestationalAge: number;
        findings: string;
        fetalWeight: number;
      }>;
    };
    previousPregnancies: Array<{
      outcome: "term" | "preterm" | "abortion" | "stillbirth";
      gestationalAge: number;
      complications: string[];
      birthWeight?: number;
      deliveryType: "vaginal" | "cesarean";
    }>;
  };

  // Exame físico ginecológico
  physicalExam: {
    vitalSigns: {
      bloodPressure: string;
      weight: number;
      height: number;
      bmi: number;
    };
    breast: {
      inspection: string;
      palpation: string;
      nipples: string;
      lymphNodes: string;
    };
    abdomen: {
      inspection: string;
      palpation: string;
      masses: boolean;
      tenderness: boolean;
    };
    pelvic: {
      external: string;
      speculum: {
        cervix: string;
        vagina: string;
        discharge: string;
      };
      bimanual: {
        uterus: string;
        adnexa: string;
        pain: boolean;
      };
    };
  };

  // Exames complementares
  exams: {
    papSmear: {
      performed: boolean;
      date?: string;
      result?: string;
      nextDue?: string;
    };
    colposcopy: {
      performed: boolean;
      date?: string;
      findings?: string;
      biopsy?: boolean;
    };
    ultrasound: {
      performed: boolean;
      date?: string;
      type: "pelvic" | "transvaginal" | "obstetric";
      findings?: string;
    };
    mammography: {
      performed: boolean;
      date?: string;
      result?: string;
      birads?: number;
    };
    laboratory: Array<{
      test: string;
      date: string;
      result: string;
      reference: string;
    }>;
  };

  // Diagnóstico ginecológico
  diagnosis: {
    primary: string;
    secondary?: string[];
    icd10: string;
    severity?: "mild" | "moderate" | "severe";
  };

  // Tratamento específico
  treatment: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      indication: string;
    }>;
    procedures: Array<{
      procedure: string;
      date: string;
      indication: string;
      result?: string;
    }>;
    lifestyle: string[];
    contraceptiveAdvice?: string;
  };

  // Acompanhamento
  followUp: {
    nextVisit: string;
    examScheduled: string[];
    monitoring: string[];
    emergencyReturn: string[];
  };

  // Screening e prevenção
  screening: {
    papSmearStatus: "up_to_date" | "due" | "overdue";
    mammographyStatus: "up_to_date" | "due" | "overdue" | "not_applicable";
    vaccinations: {
      hpv: boolean;
      influenza: boolean;
      covid19: boolean;
    };
  };

  status: "active" | "completed" | "follow_up";
  createdAt: string;
}

// Dados mock
const mockGynecologyRecords: GynecologyRecord[] = [
  {
    id: "gyn_001",
    patientId: "pat_gyn_001",
    patientName: "Maria Santos Silva",
    patientAge: 32,
    consultDate: "2024-01-15",
    consultType: "routine",
    
    gynecologicalHistory: {
      menarche: 12,
      menstrualCycle: {
        regular: true,
        interval: 28,
        duration: 5,
        flow: "normal",
        lastPeriod: "2024-01-01",
        pain: false,
        pms: true
      },
      contraception: {
        current: "Anticoncepcional oral combinado",
        previous: ["DIU Mirena"],
        duration: "2 anos"
      },
      pregnancies: {
        gravida: 2,
        para: 1,
        abortions: 1,
        cesarean: 0,
        vaginal: 1
      },
      sexualActivity: {
        active: true,
        ageFirstIntercourse: 18,
        partners: 3,
        currentPartner: true
      }
    },

    physicalExam: {
      vitalSigns: {
        bloodPressure: "120/80 mmHg",
        weight: 65,
        height: 165,
        bmi: 23.9
      },
      breast: {
        inspection: "Simétricas, sem retrações ou abaulamentos",
        palpation: "Sem nódulos ou massas palpáveis",
        nipples: "Normais, sem secreção",
        lymphNodes: "Não palpáveis"
      },
      abdomen: {
        inspection: "Plano, sem cicatrizes",
        palpation: "Indolor, sem massas",
        masses: false,
        tenderness: false
      },
      pelvic: {
        external: "Normal, sem lesões",
        speculum: {
          cervix: "Rosado, sem lesões, orifício externo puntiforme",
          vagina: "Rosada, sem lesões",
          discharge: "Fisiológico"
        },
        bimanual: {
          uterus: "Anteversoflexão, tamanho normal, móvel",
          adnexa: "Não palpáveis",
          pain: false
        }
      }
    },

    exams: {
      papSmear: {
        performed: true,
        date: "2024-01-15",
        result: "Negativo para malignidade",
        nextDue: "2025-01-15"
      },
      colposcopy: {
        performed: false
      },
      ultrasound: {
        performed: true,
        date: "2024-01-15",
        type: "transvaginal",
        findings: "Útero normal, ovários com folículos fisiológicos"
      },
      mammography: {
        performed: false
      },
      laboratory: [
        {
          test: "Beta-hCG",
          date: "2024-01-15",
          result: "Negativo",
          reference: "< 5 mUI/mL"
        }
      ]
    },

    diagnosis: {
      primary: "Consulta ginecológica de rotina",
      icd10: "Z01.4"
    },

    treatment: {
      medications: [],
      procedures: [],
      lifestyle: [
        "Manter atividade física regular",
        "Dieta balanceada",
        "Autoexame das mamas mensalmente"
      ],
      contraceptiveAdvice: "Manter método atual, reavaliar em 6 meses"
    },

    followUp: {
      nextVisit: "2025-01-15",
      examScheduled: ["Papanicolau"],
      monitoring: ["Ciclo menstrual", "Efeitos colaterais do anticoncepcional"],
      emergencyReturn: ["Sangramento anormal", "Dor pélvica intensa"]
    },

    screening: {
      papSmearStatus: "up_to_date",
      mammographyStatus: "not_applicable",
      vaccinations: {
        hpv: true,
        influenza: true,
        covid19: true
      }
    },

    status: "completed",
    createdAt: "2024-01-15T09:30:00Z"
  }
];

export default function GinecologiaPage() {
  const [records, setRecords] = useState<GynecologyRecord[]>(mockGynecologyRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<GynecologyRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getConsultTypeLabel = (type: string) => {
    const types = {
      routine: "Rotina",
      prenatal: "Pré-natal",
      emergency: "Emergência",
      follow_up: "Acompanhamento"
    };
    return types[type as keyof typeof types];
  };

  const getScreeningStatus = (status: string) => {
    switch (status) {
      case "up_to_date": return { color: "bg-green-100 text-green-800", label: "Em dia" };
      case "due": return { color: "bg-yellow-100 text-yellow-800", label: "Vencendo" };
      case "overdue": return { color: "bg-red-100 text-red-800", label: "Vencido" };
      case "not_applicable": return { color: "bg-gray-100 text-gray-800", label: "N/A" };
      default: return { color: "bg-gray-100 text-gray-800", label: "N/A" };
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: "bg-green-100 text-green-800", label: "Ativo" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Concluído" },
      follow_up: { color: "bg-yellow-100 text-yellow-800", label: "Acompanhamento" }
    };
    const { color, label } = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const handleViewRecord = (record: GynecologyRecord) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="mr-3 h-8 w-8 text-pink-600" />
              Ginecologia e Obstetrícia
            </h1>
            <p className="mt-2 text-gray-600">
              Cuidado integral da saúde da mulher
            </p>
          </div>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nova Consulta
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{records.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Papanicolau em Dia</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.screening.papSmearStatus === "up_to_date").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Baby className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pré-natais</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.consultType === "prenatal").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Este Mês</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => new Date(r.consultDate).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar pacientes ginecológicas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Consultas Ginecológicas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Consulta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  História Reprodutiva
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papanicolau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Consulta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <Heart className="h-6 w-6 text-pink-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.patientAge} anos
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getConsultTypeLabel(record.consultType)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(record.consultDate).toLocaleDateString("pt-BR")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      G{record.gynecologicalHistory.pregnancies.gravida} 
                      P{record.gynecologicalHistory.pregnancies.para} 
                      A{record.gynecologicalHistory.pregnancies.abortions}
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.gynecologicalHistory.contraception.current}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getScreeningStatus(record.screening.papSmearStatus).color
                    }`}>
                      {getScreeningStatus(record.screening.papSmearStatus).label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.consultDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewRecord(record)}
                      className="text-pink-600 hover:text-pink-900"
                      title="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Visualização */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Consulta Ginecológica - {selectedRecord.patientName}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Geral", icon: Heart },
                  { id: "history", label: "História", icon: Clock },
                  { id: "exam", label: "Exame Físico", icon: Stethoscope },
                  { id: "exams", label: "Exames", icon: FileText }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Conteúdo das Tabs */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Dados da Consulta</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Paciente:</strong> {selectedRecord.patientName}</p>
                      <p><strong>Idade:</strong> {selectedRecord.patientAge} anos</p>
                      <p><strong>Data:</strong> {new Date(selectedRecord.consultDate).toLocaleDateString("pt-BR")}</p>
                      <p><strong>Tipo:</strong> {getConsultTypeLabel(selectedRecord.consultType)}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Diagnóstico</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Principal:</strong> {selectedRecord.diagnosis.primary}</p>
                      <p><strong>CID-10:</strong> {selectedRecord.diagnosis.icd10}</p>
                      {selectedRecord.diagnosis.secondary && selectedRecord.diagnosis.secondary.length > 0 && (
                        <p><strong>Secundários:</strong> {selectedRecord.diagnosis.secondary.join(", ")}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">História Reprodutiva</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Menarca:</strong> {selectedRecord.gynecologicalHistory.menarche} anos</p>
                      <p><strong>Ciclo:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.interval} dias, 
                        {selectedRecord.gynecologicalHistory.menstrualCycle.regular ? " regular" : " irregular"}</p>
                      <p><strong>Gestações:</strong> G{selectedRecord.gynecologicalHistory.pregnancies.gravida} 
                        P{selectedRecord.gynecologicalHistory.pregnancies.para} 
                        A{selectedRecord.gynecologicalHistory.pregnancies.abortions}</p>
                      <p><strong>Contraceptivo:</strong> {selectedRecord.gynecologicalHistory.contraception.current}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Screening</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Papanicolau:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          getScreeningStatus(selectedRecord.screening.papSmearStatus).color
                        }`}>
                          {getScreeningStatus(selectedRecord.screening.papSmearStatus).label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mamografia:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          getScreeningStatus(selectedRecord.screening.mammographyStatus).color
                        }`}>
                          {getScreeningStatus(selectedRecord.screening.mammographyStatus).label}
                        </span>
                      </div>
                      <p><strong>Vacina HPV:</strong> {selectedRecord.screening.vaccinations.hpv ? "Sim" : "Não"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">História Menstrual</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Menarca:</strong> {selectedRecord.gynecologicalHistory.menarche} anos</p>
                      <p><strong>Ciclo:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.interval} dias</p>
                      <p><strong>Duração:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.duration} dias</p>
                      <p><strong>Fluxo:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.flow}</p>
                    </div>
                    <div>
                      <p><strong>Regular:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.regular ? "Sim" : "Não"}</p>
                      <p><strong>DUM:</strong> {new Date(selectedRecord.gynecologicalHistory.menstrualCycle.lastPeriod).toLocaleDateString("pt-BR")}</p>
                      <p><strong>Dismenorreia:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.pain ? "Sim" : "Não"}</p>
                      <p><strong>TPM:</strong> {selectedRecord.gynecologicalHistory.menstrualCycle.pms ? "Sim" : "Não"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">História Obstétrica</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium">Gestações</p>
                      <p className="text-2xl font-bold text-pink-600">{selectedRecord.gynecologicalHistory.pregnancies.gravida}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Partos</p>
                      <p className="text-2xl font-bold text-green-600">{selectedRecord.gynecologicalHistory.pregnancies.para}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Abortos</p>
                      <p className="text-2xl font-bold text-red-600">{selectedRecord.gynecologicalHistory.pregnancies.abortions}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Cesárias</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedRecord.gynecologicalHistory.pregnancies.cesarean}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Atividade Sexual</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Sexualmente ativa:</strong> {selectedRecord.gynecologicalHistory.sexualActivity.active ? "Sim" : "Não"}</p>
                      <p><strong>Primeira relação:</strong> {selectedRecord.gynecologicalHistory.sexualActivity.ageFirstIntercourse} anos</p>
                    </div>
                    <div>
                      <p><strong>Número de parceiros:</strong> {selectedRecord.gynecologicalHistory.sexualActivity.partners}</p>
                      <p><strong>Parceiro atual:</strong> {selectedRecord.gynecologicalHistory.sexualActivity.currentPartner ? "Sim" : "Não"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "exam" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Sinais Vitais e Antropometria</h3>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p><strong>PA:</strong> {selectedRecord.physicalExam.vitalSigns.bloodPressure}</p>
                    </div>
                    <div>
                      <p><strong>Peso:</strong> {selectedRecord.physicalExam.vitalSigns.weight} kg</p>
                    </div>
                    <div>
                      <p><strong>Altura:</strong> {selectedRecord.physicalExam.vitalSigns.height} cm</p>
                    </div>
                    <div>
                      <p><strong>IMC:</strong> {selectedRecord.physicalExam.vitalSigns.bmi}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Exame das Mamas</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Inspeção:</strong> {selectedRecord.physicalExam.breast.inspection}</p>
                      <p><strong>Palpação:</strong> {selectedRecord.physicalExam.breast.palpation}</p>
                      <p><strong>Mamilos:</strong> {selectedRecord.physicalExam.breast.nipples}</p>
                      <p><strong>Linfonodos:</strong> {selectedRecord.physicalExam.breast.lymphNodes}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Exame Abdominal</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Inspeção:</strong> {selectedRecord.physicalExam.abdomen.inspection}</p>
                      <p><strong>Palpação:</strong> {selectedRecord.physicalExam.abdomen.palpation}</p>
                      <p><strong>Massas:</strong> {selectedRecord.physicalExam.abdomen.masses ? "Presentes" : "Ausentes"}</p>
                      <p><strong>Dor:</strong> {selectedRecord.physicalExam.abdomen.tenderness ? "Presente" : "Ausente"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Exame Pélvico</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Genitália Externa</h4>
                      <p>{selectedRecord.physicalExam.pelvic.external}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Exame Especular</h4>
                      <p><strong>Colo:</strong> {selectedRecord.physicalExam.pelvic.speculum.cervix}</p>
                      <p><strong>Vagina:</strong> {selectedRecord.physicalExam.pelvic.speculum.vagina}</p>
                      <p><strong>Corrimento:</strong> {selectedRecord.physicalExam.pelvic.speculum.discharge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Toque Bimanual</h4>
                      <p><strong>Útero:</strong> {selectedRecord.physicalExam.pelvic.bimanual.uterus}</p>
                      <p><strong>Anexos:</strong> {selectedRecord.physicalExam.pelvic.bimanual.adnexa}</p>
                      <p><strong>Dor:</strong> {selectedRecord.physicalExam.pelvic.bimanual.pain ? "Presente" : "Ausente"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Papanicolau</h3>
                    {selectedRecord.exams.papSmear.performed ? (
                      <div className="space-y-2 text-sm">
                        <p><strong>Data:</strong> {selectedRecord.exams.papSmear.date && new Date(selectedRecord.exams.papSmear.date).toLocaleDateString("pt-BR")}</p>
                        <p><strong>Resultado:</strong> {selectedRecord.exams.papSmear.result}</p>
                        <p><strong>Próximo:</strong> {selectedRecord.exams.papSmear.nextDue && new Date(selectedRecord.exams.papSmear.nextDue).toLocaleDateString("pt-BR")}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Não realizado</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Ultrassom</h3>
                    {selectedRecord.exams.ultrasound.performed ? (
                      <div className="space-y-2 text-sm">
                        <p><strong>Data:</strong> {selectedRecord.exams.ultrasound.date && new Date(selectedRecord.exams.ultrasound.date).toLocaleDateString("pt-BR")}</p>
                        <p><strong>Tipo:</strong> {selectedRecord.exams.ultrasound.type}</p>
                        <p><strong>Achados:</strong> {selectedRecord.exams.ultrasound.findings}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Não realizado</p>
                    )}
                  </div>
                </div>

                {selectedRecord.exams.laboratory.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Exames Laboratoriais</h3>
                    <div className="space-y-3">
                      {selectedRecord.exams.laboratory.map((lab, index) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <div className="grid grid-cols-4 gap-2 text-sm">
                            <p><strong>{lab.test}</strong></p>
                            <p>{new Date(lab.date).toLocaleDateString("pt-BR")}</p>
                            <p>{lab.result}</p>
                            <p className="text-gray-600">{lab.reference}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Imprimir
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700">
                Nova Consulta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso Ginecologia */}
      <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-pink-600 mt-0.5 mr-2" />
          <div className="text-sm text-pink-800">
            <strong>Cuidado Integral:</strong> Este sistema segue as diretrizes da FEBRASGO para o acompanhamento 
            ginecológico e obstétrico, incluindo protocolos de rastreamento de câncer ginecológico e 
            acompanhamento pré-natal conforme as normas do Ministério da Saúde.
          </div>
        </div>
      </div>
    </div>
  );
}
