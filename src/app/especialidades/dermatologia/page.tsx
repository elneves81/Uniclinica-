"use client";

import { useState } from "react";
import { 
  Scan, 
  Camera, 
  Eye, 
  Sun,
  Shield,
  AlertTriangle,
  Plus,
  Search,
  MapPin,
  Ruler,
  Palette,
  Calendar,
  Download,
  Edit,
  Clipboard
} from "lucide-react";

interface DermatologyRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  consultDate: string;
  
  // Tipo de pele (classificação Fitzpatrick)
  skinType: {
    fitzpatrick: 1 | 2 | 3 | 4 | 5 | 6;
    description: string;
    sunReaction: string;
  };

  // Queixa principal dermatológica
  chiefComplaint: string;
  
  // Mapeamento corporal
  bodyMapping: {
    regions: Array<{
      region: string;
      lesions: Array<{
        id: string;
        type: string;
        size: string;
        color: string;
        texture: string;
        evolution: string;
        symptoms: string[];
        photography: string[];
        dermoscopy?: {
          pattern: string;
          colors: string[];
          structures: string[];
          diagnosis: string;
          followUp: boolean;
        };
      }>;
    }>;
  };

  // Dermatoscopia
  dermoscopy: {
    performed: boolean;
    equipment: string;
    findings: Array<{
      lesionId: string;
      abcdeScore: {
        asymmetry: number;
        border: number;
        color: number;
        diameter: number;
        evolution: number;
        total: number;
      };
      pattern: string;
      vascularPattern: string;
      pigmentNetwork: string;
      globules: string;
      streaks: string;
      blueWhiteVeil: boolean;
      regressionStructures: boolean;
      conclusion: string;
    }>;
  };

  // Histórico familiar de câncer de pele
  familyHistory: {
    melanoma: boolean;
    basalCellCarcinoma: boolean;
    squamousCellCarcinoma: boolean;
    relatives: string[];
  };

  // Exposição solar
  sunExposure: {
    occupational: boolean;
    recreational: boolean;
    sunburnHistory: number;
    sunscreenUse: "never" | "rarely" | "sometimes" | "always";
    protectiveClothing: boolean;
  };

  // Diagnóstico dermatológico
  diagnosis: {
    primary: string;
    differential: string[];
    icd10: string;
    severity: "mild" | "moderate" | "severe";
    malignancyRisk: "low" | "medium" | "high";
  };

  // Tratamento específico
  treatment: {
    topical: Array<{
      medication: string;
      concentration: string;
      application: string;
      duration: string;
    }>;
    systemic: Array<{
      medication: string;
      dosage: string;
      duration: string;
    }>;
    procedures: Array<{
      procedure: string;
      date: string;
      location: string;
      result?: string;
    }>;
    photoprotection: string[];
  };

  // Acompanhamento
  followUp: {
    nextVisit: string;
    monitoring: string[];
    biopsy?: {
      required: boolean;
      location: string;
      urgency: "routine" | "urgent";
    };
    photography: {
      required: boolean;
      frequency: string;
    };
  };

  // Conduta médica específica
  medicalConduct: {
    clinicalConduct: string;
    prescription: string;
    followUpInstructions: string;
    returnDate?: string;
    emergencyInstructions: string;
    sunProtectionGuidance: string;
    selfExaminationInstructions: string;
    referrals: Array<{
      specialty: string;
      reason: string;
      urgency: "routine" | "urgent" | "emergency";
    }>;
  };

  attachments: Array<{
    id: string;
    type: "photo" | "dermoscopy" | "biopsy" | "other";
    filename: string;
    date: string;
    lesionId?: string;
  }>;

  status: "active" | "completed" | "follow_up";
  createdAt: string;
}

// Dados mock
const mockDermatologyRecords: DermatologyRecord[] = [
  {
    id: "derm_001",
    patientId: "pat_derm_001",
    patientName: "Ana Costa Oliveira",
    patientAge: 45,
    consultDate: "2024-01-15",
    
    skinType: {
      fitzpatrick: 2,
      description: "Pele clara, cabelos loiros/castanhos claros",
      sunReaction: "Queima facilmente, bronzeia pouco"
    },

    chiefComplaint: "Pinta escura nas costas que mudou de cor e tamanho",

    bodyMapping: {
      regions: [
        {
          region: "Dorso",
          lesions: [
            {
              id: "lesion_001",
              type: "Nevo melanocítico",
              size: "8mm x 6mm",
              color: "Marrom escuro com áreas pretas",
              texture: "Levemente elevada",
              evolution: "Crescimento nos últimos 6 meses",
              symptoms: ["Coceira ocasional"],
              photography: ["dorso_001.jpg", "dorso_002.jpg"],
              dermoscopy: {
                pattern: "Atípico",
                colors: ["Marrom", "Preto", "Azul"],
                structures: ["Rede pigmentar irregular", "Pontos azul-brancos"],
                diagnosis: "Nevo displásico - suspeita de transformação",
                followUp: true
              }
            }
          ]
        },
        {
          region: "Face",
          lesions: [
            {
              id: "lesion_002",
              type: "Queratose actínica",
              size: "4mm",
              color: "Eritematosa",
              texture: "Rugosa, escamosa",
              evolution: "Estável há 2 anos",
              symptoms: ["Descamação"],
              photography: ["face_001.jpg"]
            }
          ]
        }
      ]
    },

    dermoscopy: {
      performed: true,
      equipment: "Dermatoscópio digital Heine",
      findings: [
        {
          lesionId: "lesion_001",
          abcdeScore: {
            asymmetry: 2,
            border: 2,
            color: 2,
            diameter: 1,
            evolution: 2,
            total: 9
          },
          pattern: "Multicomponente",
          vascularPattern: "Vasos puntiformes",
          pigmentNetwork: "Irregular e assimétrica",
          globules: "Presentes na periferia",
          streaks: "Ausentes",
          blueWhiteVeil: true,
          regressionStructures: false,
          conclusion: "Padrão suspeito - biópsia recomendada"
        }
      ]
    },

    familyHistory: {
      melanoma: true,
      basalCellCarcinoma: false,
      squamousCellCarcinoma: false,
      relatives: ["Mãe - melanoma aos 52 anos"]
    },

    sunExposure: {
      occupational: false,
      recreational: true,
      sunburnHistory: 5,
      sunscreenUse: "sometimes",
      protectiveClothing: false
    },

    diagnosis: {
      primary: "Nevo displásico com atipia severa",
      differential: ["Melanoma in situ", "Nevo de Spitz"],
      icd10: "D22.5",
      severity: "moderate",
      malignancyRisk: "high"
    },

    treatment: {
      topical: [],
      systemic: [],
      procedures: [
        {
          procedure: "Biópsia excisional com margem de 2mm",
          date: "2024-01-20",
          location: "Dorso - região escapular direita"
        }
      ],
      photoprotection: [
        "Protetor solar FPS 60+ diariamente",
        "Roupas com proteção UV",
        "Chapéus de aba larga",
        "Evitar exposição solar entre 10h-16h"
      ]
    },

    followUp: {
      nextVisit: "2024-02-15",
      monitoring: ["Resultado da biópsia", "Mapeamento corporal completo"],
      biopsy: {
        required: true,
        location: "Dorso - lesão suspeita",
        urgency: "urgent"
      },
      photography: {
        required: true,
        frequency: "A cada 6 meses"
      }
    },

    attachments: [
      {
        id: "att_001",
        type: "photo",
        filename: "mapeamento_corporal_15012024.jpg",
        date: "2024-01-15",
      },
      {
        id: "att_002", 
        type: "dermoscopy",
        filename: "dermoscopia_lesao001_15012024.jpg",
        date: "2024-01-15",
        lesionId: "lesion_001"
      }
    ],

    medicalConduct: {
      clinicalConduct: "Paciente com múltiplas lesões pigmentadas, necessário acompanhamento rigoroso. Lesão em dorso com características suspeitas para melanoma (ABCDE score 8/10). Biópsia urgente indicada.",
      prescription: "Protetor solar FPS 60+ - aplicar 30min antes da exposição solar, reaplicar a cada 2 horas\nHidratante corporal - aplicar 2x ao dia após o banho",
      followUpInstructions: "Retorno em 1 mês com resultado da biópsia. Mapeamento corporal semestral. Autoexame mensal das lesões.",
      returnDate: "2024-02-15",
      emergencyInstructions: "Procurar atendimento imediato se observar: mudança rápida na cor, tamanho ou formato de qualquer lesão, sangramento, coceira persistente ou ferida que não cicatriza.",
      sunProtectionGuidance: "Uso obrigatório de protetor solar FPS 60+, roupas com proteção UV, chapéus de aba larga. Evitar exposição solar entre 10h-16h. Procurar sombra sempre que possível.",
      selfExaminationInstructions: "Examinar toda a pele mensalmente, incluindo couro cabeludo, plantas dos pés e entre os dedos. Observar regra ABCDE: Assimetria, Bordas irregulares, Cores variadas, Diâmetro >6mm, Evolução. Fotografar lesões suspeitas para comparação.",
      referrals: [
        {
          specialty: "Cirurgia Plástica",
          reason: "Avaliação para ressecção de lesão suspeita se biópsia confirmar malignidade",
          urgency: "urgent"
        }
      ]
    },

    status: "follow_up",
    createdAt: "2024-01-15T14:30:00Z"
  }
];

export default function DermatologiaPage() {
  const [records, setRecords] = useState<DermatologyRecord[]>(mockDermatologyRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<DermatologyRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getFitzpatrickDescription = (type: number) => {
    const types = {
      1: "Muito clara - sempre queima, nunca bronzeia",
      2: "Clara - queima facilmente, bronzeia pouco",
      3: "Moderada - queima moderadamente, bronzeia gradualmente",
      4: "Oliveira - queima pouco, bronzeia bem",
      5: "Escura - raramente queima, bronzeia intensamente",
      6: "Muito escura - nunca queima, bronzeia intensamente"
    };
    return types[type as keyof typeof types];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "high": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
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

  const handleViewRecord = (record: DermatologyRecord) => {
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
              <Scan className="mr-3 h-8 w-8 text-orange-600" />
              Dermatologia - Mapeamento Corporal
            </h1>
            <p className="mt-2 text-gray-600">
              Diagnóstico e acompanhamento de lesões cutâneas com dermatoscopia
            </p>
          </div>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nova Consulta
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Scan className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mapeamentos</p>
              <p className="text-2xl font-bold text-gray-900">{records.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alto Risco</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.diagnosis.malignancyRisk === "high").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Dermatoscopias</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.dermoscopy.performed).length}
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
              <p className="text-sm font-medium text-gray-600">Em Acompanhamento</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.status === "follow_up").length}
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
            placeholder="Buscar pacientes dermatológicos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pacientes Dermatológicos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Pele
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Queixa Principal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnóstico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risco
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
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Scan className="h-6 w-6 text-orange-600" />
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
                      Fitzpatrick {record.skinType.fitzpatrick}
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.skinType.description.split(" - ")[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {record.chiefComplaint}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {record.diagnosis.primary}
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.diagnosis.icd10}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(record.diagnosis.malignancyRisk)}`}>
                      {record.diagnosis.malignancyRisk === "high" ? "Alto" :
                       record.diagnosis.malignancyRisk === "medium" ? "Médio" : "Baixo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewRecord(record)}
                        className="text-orange-600 hover:text-orange-900"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Dermatoscopia"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Mapeamento"
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                    </div>
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
              <h2 className="text-2xl font-semibold">Consulta Dermatológica - {selectedRecord.patientName}</h2>
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
                  { id: "overview", label: "Geral", icon: Scan },
                  { id: "mapping", label: "Mapeamento", icon: MapPin },
                  { id: "dermoscopy", label: "Dermatoscopia", icon: Camera },
                  { id: "treatment", label: "Tratamento", icon: Shield },
                  { id: "conduct", label: "Conduta Médica", icon: Clipboard }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? "border-orange-500 text-orange-600"
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
                    <h3 className="font-semibold text-gray-900 mb-3">Dados do Paciente</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nome:</strong> {selectedRecord.patientName}</p>
                      <p><strong>Idade:</strong> {selectedRecord.patientAge} anos</p>
                      <p><strong>Data da Consulta:</strong> {new Date(selectedRecord.consultDate).toLocaleDateString("pt-BR")}</p>
                      <p><strong>Tipo de Pele:</strong> Fitzpatrick {selectedRecord.skinType.fitzpatrick}</p>
                      <p className="text-xs text-gray-600">{getFitzpatrickDescription(selectedRecord.skinType.fitzpatrick)}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Exposição Solar</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Queimaduras solares:</strong> {selectedRecord.sunExposure.sunburnHistory} episódios</p>
                      <p><strong>Uso de protetor:</strong> {
                        selectedRecord.sunExposure.sunscreenUse === "always" ? "Sempre" :
                        selectedRecord.sunExposure.sunscreenUse === "sometimes" ? "Às vezes" :
                        selectedRecord.sunExposure.sunscreenUse === "rarely" ? "Raramente" : "Nunca"
                      }</p>
                      <p><strong>Exposição ocupacional:</strong> {selectedRecord.sunExposure.occupational ? "Sim" : "Não"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Diagnóstico</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Principal:</strong> {selectedRecord.diagnosis.primary}</p>
                      <p><strong>CID-10:</strong> {selectedRecord.diagnosis.icd10}</p>
                      <p><strong>Severidade:</strong> {selectedRecord.diagnosis.severity}</p>
                      <div className="flex items-center">
                        <strong>Risco de Malignidade:</strong>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getRiskColor(selectedRecord.diagnosis.malignancyRisk)}`}>
                          {selectedRecord.diagnosis.malignancyRisk === "high" ? "Alto" :
                           selectedRecord.diagnosis.malignancyRisk === "medium" ? "Médio" : "Baixo"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">História Familiar</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Melanoma:</strong> {selectedRecord.familyHistory.melanoma ? "Sim" : "Não"}</p>
                      <p><strong>Carcinoma basocelular:</strong> {selectedRecord.familyHistory.basalCellCarcinoma ? "Sim" : "Não"}</p>
                      <p><strong>Carcinoma espinocelular:</strong> {selectedRecord.familyHistory.squamousCellCarcinoma ? "Sim" : "Não"}</p>
                      {selectedRecord.familyHistory.relatives.length > 0 && (
                        <div>
                          <strong>Parentes afetados:</strong>
                          <ul className="list-disc list-inside ml-4">
                            {selectedRecord.familyHistory.relatives.map((relative, index) => (
                              <li key={index}>{relative}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mapping" && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Mapeamento Corporal</h3>
                {selectedRecord.bodyMapping.regions.map((region, regionIndex) => (
                  <div key={regionIndex} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{region.region}</h4>
                    <div className="space-y-4">
                      {region.lesions.map((lesion, lesionIndex) => (
                        <div key={lesionIndex} className="bg-white p-4 rounded border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p><strong>Tipo:</strong> {lesion.type}</p>
                              <p><strong>Tamanho:</strong> {lesion.size}</p>
                              <p><strong>Cor:</strong> {lesion.color}</p>
                              <p><strong>Textura:</strong> {lesion.texture}</p>
                            </div>
                            <div>
                              <p><strong>Evolução:</strong> {lesion.evolution}</p>
                              <p><strong>Sintomas:</strong> {lesion.symptoms.join(", ")}</p>
                              {lesion.dermoscopy && (
                                <p><strong>Dermatoscopia:</strong> {lesion.dermoscopy.diagnosis}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "dermoscopy" && selectedRecord.dermoscopy.performed && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Dermatoscopia Digital</h3>
                  <p className="text-sm text-gray-600 mb-4">Equipamento: {selectedRecord.dermoscopy.equipment}</p>
                  
                  {selectedRecord.dermoscopy.findings.map((finding, index) => (
                    <div key={index} className="bg-white p-4 rounded border mb-4">
                      <h4 className="font-medium text-gray-900 mb-3">Lesão {finding.lesionId}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Escore ABCDE</h5>
                          <div className="space-y-1 text-sm">
                            <p>Assimetria: {finding.abcdeScore.asymmetry}</p>
                            <p>Bordas: {finding.abcdeScore.border}</p>
                            <p>Cor: {finding.abcdeScore.color}</p>
                            <p>Diâmetro: {finding.abcdeScore.diameter}</p>
                            <p>Evolução: {finding.abcdeScore.evolution}</p>
                            <p className="font-medium">Total: {finding.abcdeScore.total}/10</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Padrões Dermatoscópicos</h5>
                          <div className="space-y-1 text-sm">
                            <p><strong>Padrão geral:</strong> {finding.pattern}</p>
                            <p><strong>Rede pigmentar:</strong> {finding.pigmentNetwork}</p>
                            <p><strong>Glóbulos:</strong> {finding.globules}</p>
                            <p><strong>Véu azul-branco:</strong> {finding.blueWhiteVeil ? "Presente" : "Ausente"}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm"><strong>Conclusão:</strong> {finding.conclusion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "treatment" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Fotoproteção</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedRecord.treatment.photoprotection.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>

                {selectedRecord.treatment.procedures.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Procedimentos</h3>
                    <div className="space-y-3">
                      {selectedRecord.treatment.procedures.map((procedure, index) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <p><strong>{procedure.procedure}</strong></p>
                          <p className="text-sm text-gray-600">Local: {procedure.location}</p>
                          <p className="text-sm text-gray-600">Data: {new Date(procedure.date).toLocaleDateString("pt-BR")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Acompanhamento</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Próxima consulta:</strong> {new Date(selectedRecord.followUp.nextVisit).toLocaleDateString("pt-BR")}</p>
                    <p><strong>Monitoramento:</strong> {selectedRecord.followUp.monitoring.join(", ")}</p>
                    {selectedRecord.followUp.biopsy?.required && (
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <p className="font-medium text-yellow-800">Biópsia Requerida</p>
                        <p className="text-sm text-yellow-700">Local: {selectedRecord.followUp.biopsy.location}</p>
                        <p className="text-sm text-yellow-700">Urgência: {selectedRecord.followUp.biopsy.urgency === "urgent" ? "Urgente" : "Rotina"}</p>
                      </div>
                    )}
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
                    <h3 className="font-semibold text-gray-900 mb-3">Prescrição Dermatológica</h3>
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

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-3">Fotoproteção e Cuidados com a Pele</h3>
                  <div className="text-sm text-orange-700 bg-white p-4 rounded border">
                    {selectedRecord.medicalConduct.sunProtectionGuidance}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Instruções para Autoexame</h3>
                  <div className="text-sm text-blue-700 bg-white p-4 rounded border">
                    {selectedRecord.medicalConduct.selfExaminationInstructions}
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-3">Sinais de Alerta</h3>
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
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Relatório
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso Dermatologia */}
      <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start">
          <Sun className="h-5 w-5 text-orange-600 mt-0.5 mr-2" />
          <div className="text-sm text-orange-800">
            <strong>Dermatologia Preventiva:</strong> Este sistema segue os protocolos da Sociedade Brasileira de Dermatologia 
            para rastreamento de câncer de pele, incluindo escore ABCDE para lesões melanocíticas e classificação de risco 
            baseada nos critérios internacionais de dermatoscopia.
          </div>
        </div>
      </div>
    </div>
  );
}
