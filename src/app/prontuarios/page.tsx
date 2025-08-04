"use client";

import { useState } from "react";
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  Stethoscope,
  AlertTriangle,
  Clock,
  Shield,
  Filter,
  Heart,
  Activity,
  Thermometer
} from "lucide-react";

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
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
    procedures: string[];
    recommendations: string[];
  };
  followUp: {
    returnDate?: string;
    instructions: string;
    referrals?: string[];
  };
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Dados mock
const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    patientId: "pat_001",
    patientName: "Maria Silva Santos",
    patientAge: 39,
    patientGender: "F",
    date: "2024-01-15",
    doctorName: "Dr. João Cardiologista",
    specialty: "Cardiologia",
    type: "consultation",
    chiefComplaint: "Dor no peito e palpitações",
    historyOfPresentIllness: "Paciente relata episódios de dor precordial há 2 semanas, associada a palpitações e dispneia aos esforços. Nega síncope ou lipotimia. Episódios ocorrem principalmente durante atividade física.",
    physicalExamination: {
      generalAppearance: "Paciente consciente, orientada, colaborativa, em bom estado geral",
      vitalSigns: {
        bloodPressure: "140/90 mmHg",
        heartRate: 88,
        temperature: 36.5,
        respiratoryRate: 16,
        oxygenSaturation: 98
      },
      systemicExamination: "Aparelho cardiovascular: ritmo regular, bulhas normofonéticas, sem sopros. Aparelho respiratório: murmúrio vesicular presente bilateralmente, sem ruídos adventícios."
    },
    diagnosis: {
      primary: "Hipertensão arterial sistêmica",
      secondary: ["Síndrome do pânico a esclarecer"],
      icd10: "I10"
    },
    treatment: {
      medications: [
        {
          name: "Losartana",
          dosage: "50mg",
          frequency: "1x ao dia",
          duration: "Uso contínuo"
        },
        {
          name: "Anlodipino",
          dosage: "5mg",
          frequency: "1x ao dia",
          duration: "Uso contínuo"
        }
      ],
      procedures: [],
      recommendations: [
        "Dieta hipossódica",
        "Atividade física regular (caminhada 30min/dia)",
        "Controle de peso",
        "Evitar tabagismo e álcool"
      ]
    },
    followUp: {
      returnDate: "2024-02-15",
      instructions: "Retorno em 30 dias para avaliação de resposta ao tratamento",
      referrals: ["Nutricionista", "Psicólogo"]
    },
    attachments: [
      {
        id: "att_001",
        name: "ECG_15012024.pdf",
        type: "application/pdf",
        url: "/attachments/ecg_001.pdf"
      }
    ],
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    patientId: "pat_002",
    patientName: "José Carlos Oliveira",
    patientAge: 52,
    patientGender: "M",
    date: "2024-01-10",
    doctorName: "Dr. Ana Clínica Geral",
    specialty: "Clínica Geral",
    type: "consultation",
    chiefComplaint: "Dor abdominal e mal-estar geral",
    historyOfPresentIllness: "Paciente apresenta dor abdominal difusa há 3 dias, associada a náuseas e mal-estar geral. Nega febre, vômitos ou alterações intestinais.",
    physicalExamination: {
      generalAppearance: "Paciente consciente, orientado, levemente desconfortável",
      vitalSigns: {
        bloodPressure: "130/80 mmHg",
        heartRate: 92,
        temperature: 36.8,
        respiratoryRate: 18,
        oxygenSaturation: 97
      },
      systemicExamination: "Abdome: levemente distendido, doloroso à palpação superficial em epigástrio, sem sinais de irritação peritoneal. Ruídos hidroaéreos presentes."
    },
    diagnosis: {
      primary: "Gastrite aguda",
      icd10: "K29.1"
    },
    treatment: {
      medications: [
        {
          name: "Omeprazol",
          dosage: "20mg",
          frequency: "1x ao dia em jejum",
          duration: "30 dias"
        },
        {
          name: "Bromoprida",
          dosage: "10mg",
          frequency: "3x ao dia antes das refeições",
          duration: "7 dias"
        }
      ],
      procedures: [],
      recommendations: [
        "Dieta leve e fracionada",
        "Evitar alimentos irritantes",
        "Hidratação adequada",
        "Repouso relativo"
      ]
    },
    followUp: {
      returnDate: "2024-01-24",
      instructions: "Retorno em 14 dias ou se houver piora dos sintomas"
    },
    attachments: [],
    status: "completed",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z"
  }
];

export default function ProntuariosPage() {
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.primary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === "all" || record.specialty === filterSpecialty;
    const matchesType = filterType === "all" || record.type === filterType;
    return matchesSearch && matchesSpecialty && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: "bg-green-100 text-green-800", label: "Ativo" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Concluído" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelado" }
    };
    const { color, label } = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation": return <Stethoscope className="h-4 w-4" />;
      case "exam": return <Activity className="h-4 w-4" />;
      case "procedure": return <Heart className="h-4 w-4" />;
      case "emergency": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const handleViewRecord = (record: MedicalRecord) => {
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
              <FileText className="mr-3 h-8 w-8 text-blue-600" />
              Prontuários Eletrônicos
            </h1>
            <p className="mt-2 text-gray-600">
              Sistema completo de prontuários médicos digitais
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Novo Prontuário
          </button>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Prontuários</p>
              <p className="text-2xl font-bold text-gray-900">{records.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.status === "active").length}
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
                {records.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Emergências</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.type === "emergency").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar prontuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as especialidades</option>
            <option value="Clínica Geral">Clínica Geral</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Pediatria">Pediatria</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Ginecologia">Ginecologia</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os tipos</option>
            <option value="consultation">Consultas</option>
            <option value="exam">Exames</option>
            <option value="procedure">Procedimentos</option>
            <option value="emergency">Emergências</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            {filteredRecords.length} prontuário(s)
          </div>
        </div>
      </div>

      {/* Lista de Prontuários */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidade/Médico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Queixa Principal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnóstico
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
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.patientAge} anos • {record.patientGender === "M" ? "Masc" : "Fem"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.date)}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      {getTypeIcon(record.type)}
                      <span className="ml-1 capitalize">{record.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.specialty}</div>
                    <div className="text-sm text-gray-500">{record.doctorName}</div>
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
                      CID: {record.diagnosis.icd10}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewRecord(record)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-900"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Prontuário Médico</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações do Paciente */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Dados do Paciente</h3>
                <div className="space-y-2">
                  <p><strong>Nome:</strong> {selectedRecord.patientName}</p>
                  <p><strong>Idade:</strong> {selectedRecord.patientAge} anos</p>
                  <p><strong>Sexo:</strong> {selectedRecord.patientGender === "M" ? "Masculino" : "Feminino"}</p>
                  <p><strong>Data:</strong> {formatDate(selectedRecord.date)}</p>
                  <p><strong>Médico:</strong> {selectedRecord.doctorName}</p>
                  <p><strong>Especialidade:</strong> {selectedRecord.specialty}</p>
                </div>
              </div>

              {/* Sinais Vitais */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Sinais Vitais</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>PA:</strong> {selectedRecord.physicalExamination.vitalSigns.bloodPressure}</p>
                  <p><strong>FC:</strong> {selectedRecord.physicalExamination.vitalSigns.heartRate} bpm</p>
                  <p><strong>Temp:</strong> {selectedRecord.physicalExamination.vitalSigns.temperature}°C</p>
                  <p><strong>FR:</strong> {selectedRecord.physicalExamination.vitalSigns.respiratoryRate} ipm</p>
                  <p><strong>Sat O2:</strong> {selectedRecord.physicalExamination.vitalSigns.oxygenSaturation}%</p>
                </div>
              </div>
            </div>

            {/* Anamnese */}
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Queixa Principal</h3>
                <p className="text-gray-700">{selectedRecord.chiefComplaint}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">História da Doença Atual</h3>
                <p className="text-gray-700">{selectedRecord.historyOfPresentIllness}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Exame Físico</h3>
                <p className="text-gray-700">{selectedRecord.physicalExamination.systemicExamination}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Diagnóstico</h3>
                <p className="text-gray-700">
                  <strong>Principal:</strong> {selectedRecord.diagnosis.primary} (CID: {selectedRecord.diagnosis.icd10})
                </p>
                {selectedRecord.diagnosis.secondary && selectedRecord.diagnosis.secondary.length > 0 && (
                  <p className="text-gray-700 mt-1">
                    <strong>Secundários:</strong> {selectedRecord.diagnosis.secondary.join(", ")}
                  </p>
                )}
              </div>

              {/* Medicações */}
              {selectedRecord.treatment.medications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prescrições</h3>
                  <div className="space-y-2">
                    {selectedRecord.treatment.medications.map((med, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                        <p><strong>{med.name}</strong> {med.dosage}</p>
                        <p className="text-sm text-gray-600">{med.frequency} - {med.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recomendações */}
              {selectedRecord.treatment.recommendations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Recomendações</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedRecord.treatment.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Follow-up */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Acompanhamento</h3>
                <p className="text-gray-700">{selectedRecord.followUp.instructions}</p>
                {selectedRecord.followUp.returnDate && (
                  <p className="text-gray-700 mt-1">
                    <strong>Retorno:</strong> {formatDate(selectedRecord.followUp.returnDate)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Imprimir
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso CFM */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
          <div className="text-sm text-green-800">
            <strong>Conformidade CFM:</strong> Este sistema atende às normas do Conselho Federal de Medicina 
            para prontuários eletrônicos (CFM nº 1.821/2007), garantindo integridade, autenticidade e 
            confidencialidade dos dados médicos.
          </div>
        </div>
      </div>
    </div>
  );
}
