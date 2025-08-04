"use client";

import { useState } from "react";
import { 
  Baby, 
  TrendingUp, 
  Calendar,
  Stethoscope,
  Heart,
  Activity,
  Scale,
  Ruler,
  Thermometer,
  Shield,
  AlertTriangle,
  Plus,
  Eye,
  Search,
  Clipboard
} from "lucide-react";

interface PediatricRecord {
  id: string;
  patientId: string;
  patientName: string;
  birthDate: string;
  age: {
    years: number;
    months: number;
    days: number;
  };
  gender: "M" | "F";
  motherName: string;
  fatherName: string;
  consultDate: string;
  
  // Dados antropométricos
  anthropometrics: {
    weight: number; // kg
    height: number; // cm
    headCircumference: number; // cm
    bmi: number;
    weightPercentile: number;
    heightPercentile: number;
    bmíPercentile: number;
  };

  // Desenvolvimento neuropsicomotor
  development: {
    motorSkills: string;
    languageSkills: string;
    socialSkills: string;
    cognitiveSkills: string;
    milestones: Array<{
      milestone: string;
      expectedAge: string;
      achievedAge?: string;
      status: "achieved" | "delayed" | "not_yet";
    }>;
  };

  // Vacinação
  vaccination: {
    vaccines: Array<{
      name: string;
      date: string;
      dose: string;
      lot: string;
      nextDue?: string;
    }>;
    upToDate: boolean;
  };

  // Alimentação
  feeding: {
    breastfeeding: {
      exclusive: boolean;
      duration: string;
    };
    formula: {
      type?: string;
      amount?: string;
    };
    solids: {
      started: boolean;
    };
    currentDiet: string;
  };

  // Exame físico específico pediátrico
  physicalExam: {
    vitalSigns: {
      temperature: number;
      heartRate: number;
      respiratoryRate: number;
      bloodPressure?: string;
      oxygenSaturation: number;
    };
    generalAppearance: string;
    fontanelles?: string;
    reflexes: string;
    tonusAndPosture: string;
  };

  // Diagnósticos
  diagnosis: {
    primary: string;
    secondary?: string[];
    growthDisorders?: string;
    developmentalConcerns?: string[];
  };

  // Orientações específicas
  guidance: {
    feeding: string[];
    safety: string[];
    development: string[];
    nextVisit: string;
  };

  // Conduta médica específica
  medicalConduct: {
    clinicalConduct: string;
    prescription: string;
    followUpInstructions: string;
    returnDate?: string;
    emergencyInstructions: string;
    parentGuidance: string;
    vaccineSchedule?: string;
    referrals: Array<{
      specialty: string;
      reason: string;
      urgency: "routine" | "urgent" | "emergency";
    }>;
  };

  status: "active" | "completed";
  createdAt: string;
}

// Dados mock
const mockPediatricRecords: PediatricRecord[] = [
  {
    id: "ped_001",
    patientId: "pat_ped_001",
    patientName: "João Pedro Silva",
    birthDate: "2022-03-15",
    age: { years: 1, months: 10, days: 0 },
    gender: "M",
    motherName: "Ana Silva",
    fatherName: "Carlos Silva",
    consultDate: "2024-01-15",
    
    anthropometrics: {
      weight: 11.2,
      height: 82,
      headCircumference: 47.5,
      bmi: 16.7,
      weightPercentile: 75,
      heightPercentile: 60,
      bmíPercentile: 85
    },

    development: {
      motorSkills: "Anda sem apoio, sobe escadas com ajuda",
      languageSkills: "Fala 15-20 palavras, compreende ordens simples",
      socialSkills: "Brinca com outras crianças, imita comportamentos",
      cognitiveSkills: "Resolve problemas simples, reconhece objetos",
      milestones: [
        {
          milestone: "Sentar sem apoio",
          expectedAge: "6-8 meses",
          achievedAge: "7 meses",
          status: "achieved"
        },
        {
          milestone: "Primeiros passos",
          expectedAge: "12-15 meses",
          achievedAge: "13 meses",
          status: "achieved"
        },
        {
          milestone: "Primeiras palavras",
          expectedAge: "12 meses",
          achievedAge: "11 meses",
          status: "achieved"
        }
      ]
    },

    vaccination: {
      vaccines: [
        {
          name: "Tríplice Viral (SCR)",
          date: "2023-03-15",
          dose: "1ª dose",
          lot: "ABC123"
        },
        {
          name: "DTP + Hib + Polio",
          date: "2022-11-15",
          dose: "3ª dose",
          lot: "XYZ789"
        }
      ],
      upToDate: true
    },

    feeding: {
      breastfeeding: {
        exclusive: false,
        duration: "6 meses"
      },
      formula: {
        type: "Fórmula infantil",
        amount: "180ml 4x/dia"
      },
      solids: {
        started: true
      },
      currentDiet: "Alimentação complementar variada, 3 refeições principais + 2 lanches"
    },

    physicalExam: {
      vitalSigns: {
        temperature: 36.8,
        heartRate: 110,
        respiratoryRate: 24,
        oxygenSaturation: 99
      },
      generalAppearance: "Criança ativa, alerta, bem desenvolvida",
      fontanelles: "Fontanela anterior fechada",
      reflexes: "Reflexos adequados para a idade",
      tonusAndPosture: "Tônus muscular normal, postura adequada"
    },

    diagnosis: {
      primary: "Consulta de puericultura - desenvolvimento normal",
      secondary: ["Rinite alérgica leve"]
    },

    guidance: {
      feeding: [
        "Continuar alimentação variada",
        "Evitar açúcar e mel",
        "Estimular mastigação"
      ],
      safety: [
        "Proteção de tomadas",
        "Portões de segurança em escadas",
        "Supervisão constante em banheiras"
      ],
      development: [
        "Leitura diária",
        "Brincadeiras interativas",
        "Estímulo à linguagem"
      ],
      nextVisit: "Retorno em 3 meses para acompanhamento do crescimento"
    },

    medicalConduct: {
      clinicalConduct: "Paciente em desenvolvimento adequado para a idade. Crescimento dentro dos percentis normais. Continuar acompanhamento regular de puericultura.",
      prescription: "Polivitamínico infantil - 5ml via oral, 1x ao dia por 30 dias\nÓleo de fígado de bacalhau - 2,5ml via oral, 1x ao dia",
      followUpInstructions: "Retornar em 3 meses para acompanhamento do crescimento e desenvolvimento. Monitorar desenvolvimento da linguagem.",
      returnDate: "2024-04-15",
      emergencyInstructions: "Procurar atendimento imediato em caso de: febre alta (>38.5°C), dificuldade respiratória, vômitos persistentes, letargia ou irritabilidade excessiva.",
      parentGuidance: "Manter estímulos ao desenvolvimento motor e de linguagem. Continuar alimentação variada. Atenção especial à segurança doméstica nesta faixa etária.",
      vaccineSchedule: "Próximas vacinas: Hepatite A (2ª dose) aos 2 anos",
      referrals: []
    },

    status: "completed",
    createdAt: "2024-01-15T10:00:00Z"
  }
];

export default function PediatriaPage() {
  const [records, setRecords] = useState<PediatricRecord[]>(mockPediatricRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<PediatricRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return { years, months: remainingMonths };
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile < 3) return "text-red-600";
    if (percentile < 10) return "text-orange-600";
    if (percentile > 97) return "text-blue-600";
    return "text-green-600";
  };

  const handleViewRecord = (record: PediatricRecord) => {
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
              <Baby className="mr-3 h-8 w-8 text-pink-600" />
              Pediatria - Puericultura
            </h1>
            <p className="mt-2 text-gray-600">
              Acompanhamento do crescimento e desenvolvimento infantil
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
              <Baby className="h-6 w-6 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pacientes Pediátricos</p>
              <p className="text-2xl font-bold text-gray-900">{records.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Em Crescimento Normal</p>
              <p className="text-2xl font-bold text-gray-900">95%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vacinação em Dia</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Consultas Este Mês</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
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
            placeholder="Buscar pacientes pediátricos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pacientes Pediátricos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criança
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Idade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsáveis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crescimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vacinação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Consulta
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
                          <Baby className="h-6 w-6 text-pink-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.gender === "M" ? "Masculino" : "Feminino"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {record.age.years}a {record.age.months}m
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(record.birthDate).toLocaleDateString("pt-BR")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Mãe: {record.motherName}</div>
                    <div className="text-sm text-gray-500">Pai: {record.fatherName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className={`font-medium ${getPercentileColor(record.anthropometrics.weightPercentile)}`}>
                        Peso: P{record.anthropometrics.weightPercentile}
                      </div>
                      <div className={`${getPercentileColor(record.anthropometrics.heightPercentile)}`}>
                        Altura: P{record.anthropometrics.heightPercentile}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.vaccination.upToDate 
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {record.vaccination.upToDate ? "Em dia" : "Atrasada"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.consultDate).toLocaleDateString("pt-BR")}
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
              <h2 className="text-2xl font-semibold">Ficha Pediátrica - {selectedRecord.patientName}</h2>
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
                  { id: "overview", label: "Visão Geral", icon: Baby },
                  { id: "growth", label: "Crescimento", icon: TrendingUp },
                  { id: "development", label: "Desenvolvimento", icon: Activity },
                  { id: "vaccination", label: "Vacinação", icon: Shield },
                  { id: "conduct", label: "Conduta Médica", icon: Clipboard }
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
                    <h3 className="font-semibold text-gray-900 mb-3">Dados Gerais</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nome:</strong> {selectedRecord.patientName}</p>
                      <p><strong>Idade:</strong> {selectedRecord.age.years} anos e {selectedRecord.age.months} meses</p>
                      <p><strong>Sexo:</strong> {selectedRecord.gender === "M" ? "Masculino" : "Feminino"}</p>
                      <p><strong>Data de Nascimento:</strong> {new Date(selectedRecord.birthDate).toLocaleDateString("pt-BR")}</p>
                      <p><strong>Mãe:</strong> {selectedRecord.motherName}</p>
                      <p><strong>Pai:</strong> {selectedRecord.fatherName}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Sinais Vitais</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Temperatura:</strong> {selectedRecord.physicalExam.vitalSigns.temperature}°C</p>
                      <p><strong>FC:</strong> {selectedRecord.physicalExam.vitalSigns.heartRate} bpm</p>
                      <p><strong>FR:</strong> {selectedRecord.physicalExam.vitalSigns.respiratoryRate} irpm</p>
                      <p><strong>Sat O2:</strong> {selectedRecord.physicalExam.vitalSigns.oxygenSaturation}%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Antropometria Atual</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Peso:</strong> {selectedRecord.anthropometrics.weight} kg 
                        <span className={`ml-2 font-medium ${getPercentileColor(selectedRecord.anthropometrics.weightPercentile)}`}>
                          (P{selectedRecord.anthropometrics.weightPercentile})
                        </span>
                      </p>
                      <p><strong>Altura:</strong> {selectedRecord.anthropometrics.height} cm 
                        <span className={`ml-2 font-medium ${getPercentileColor(selectedRecord.anthropometrics.heightPercentile)}`}>
                          (P{selectedRecord.anthropometrics.heightPercentile})
                        </span>
                      </p>
                      <p><strong>PC:</strong> {selectedRecord.anthropometrics.headCircumference} cm</p>
                      <p><strong>IMC:</strong> {selectedRecord.anthropometrics.bmi} 
                        <span className={`ml-2 font-medium ${getPercentileColor(selectedRecord.anthropometrics.bmíPercentile)}`}>
                          (P{selectedRecord.anthropometrics.bmíPercentile})
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Alimentação Atual</h3>
                    <p className="text-sm text-gray-700">{selectedRecord.feeding.currentDiet}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "development" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Desenvolvimento Neuropsicomotor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Motor:</strong> {selectedRecord.development.motorSkills}</p>
                    </div>
                    <div>
                      <p><strong>Linguagem:</strong> {selectedRecord.development.languageSkills}</p>
                    </div>
                    <div>
                      <p><strong>Social:</strong> {selectedRecord.development.socialSkills}</p>
                    </div>
                    <div>
                      <p><strong>Cognitivo:</strong> {selectedRecord.development.cognitiveSkills}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Marcos do Desenvolvimento</h3>
                  <div className="space-y-3">
                    {selectedRecord.development.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <p className="font-medium text-gray-900">{milestone.milestone}</p>
                          <p className="text-sm text-gray-600">Esperado: {milestone.expectedAge}</p>
                        </div>
                        <div className="text-right">
                          {milestone.achievedAge && (
                            <p className="text-sm text-gray-600">Atingido: {milestone.achievedAge}</p>
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            milestone.status === "achieved" 
                              ? "bg-green-100 text-green-800"
                              : milestone.status === "delayed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {milestone.status === "achieved" ? "Atingido" : 
                             milestone.status === "delayed" ? "Atrasado" : "Aguardando"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vaccination" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Histórico de Vacinação</h3>
                  <div className="space-y-3">
                    {selectedRecord.vaccination.vaccines.map((vaccine, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <p className="font-medium text-gray-900">{vaccine.name}</p>
                          <p className="text-sm text-gray-600">Lote: {vaccine.lot}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{vaccine.dose}</p>
                          <p className="text-sm text-gray-600">{new Date(vaccine.date).toLocaleDateString("pt-BR")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "conduct" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Conduta Clínica</h3>
                  <div className="text-sm text-gray-700 bg-white p-4 rounded border">
                    {selectedRecord.medicalConduct.clinicalConduct}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Prescrição Médica</h3>
                    <div className="text-sm text-gray-700 bg-white p-4 rounded border whitespace-pre-line">
                      {selectedRecord.medicalConduct.prescription}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Orientações de Seguimento</h3>
                    <div className="text-sm text-gray-700 bg-white p-4 rounded border">
                      {selectedRecord.medicalConduct.followUpInstructions}
                    </div>
                    {selectedRecord.medicalConduct.returnDate && (
                      <div className="mt-3 p-2 bg-blue-100 rounded">
                        <p className="text-sm font-medium text-blue-800">
                          Retorno agendado: {new Date(selectedRecord.medicalConduct.returnDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Orientações aos Pais/Responsáveis</h3>
                  <div className="text-sm text-gray-700 bg-white p-4 rounded border">
                    {selectedRecord.medicalConduct.parentGuidance}
                  </div>
                </div>

                {selectedRecord.medicalConduct.vaccineSchedule && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-3">Calendário Vacinal</h3>
                    <div className="text-sm text-green-700 bg-white p-4 rounded border">
                      {selectedRecord.medicalConduct.vaccineSchedule}
                    </div>
                  </div>
                )}

                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-3">Instruções de Emergência</h3>
                  <div className="text-sm text-red-700 bg-white p-4 rounded border">
                    {selectedRecord.medicalConduct.emergencyInstructions}
                  </div>
                </div>

                {selectedRecord.medicalConduct.referrals.length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-3">Encaminhamentos</h3>
                    <div className="space-y-2">
                      {selectedRecord.medicalConduct.referrals.map((referral, index) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-yellow-900">{referral.specialty}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              referral.urgency === "emergency" ? "bg-red-100 text-red-800" :
                              referral.urgency === "urgent" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {referral.urgency === "emergency" ? "Emergência" :
                               referral.urgency === "urgent" ? "Urgente" : "Rotina"}
                            </span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1">{referral.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Imprimir Cartão
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700">
                Nova Consulta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso Pediatria */}
      <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
        <div className="flex items-start">
          <Baby className="h-5 w-5 text-pink-600 mt-0.5 mr-2" />
          <div className="text-sm text-pink-800">
            <strong>Acompanhamento Pediátrico:</strong> Este sistema segue as diretrizes da Sociedade Brasileira de Pediatria 
            para acompanhamento do crescimento e desenvolvimento infantil, incluindo curvas de crescimento da OMS e 
            calendário vacinal do Ministério da Saúde.
          </div>
        </div>
      </div>
    </div>
  );
}
