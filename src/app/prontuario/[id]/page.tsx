"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  User,
  FileText,
  Printer,
  Save,
  Plus,
  Calendar,
  Phone,
  MapPin,
  Heart,
  Activity,
  Pill,
  ClipboardList,
  History,
  Award,
  ArrowLeft
} from "lucide-react";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

interface PatientData {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  phone: string;
  address: string;
  email: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
}

interface MedicalRecord {
  id: string;
  date: string;
  doctor: string;
  specialty: string;
  complaint: string;
  conduct: string;
  prescription: string;
  certificate: string;
  observations: string;
}

export default function ProntuarioPage() {
  const params = useParams();
  const patientId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("consulta");
  const [conduct, setConduct] = useState("");
  const [prescription, setPrescription] = useState("");
  const [certificate, setCertificate] = useState("");
  const [observations, setObservations] = useState("");
  const [complaint, setComplaint] = useState("");

  // Dados mock do paciente
  const patientData: PatientData = {
    id: patientId,
    name: "ELBER LUIZ NEVES",
    birthDate: "10/12/1981",
    cpf: "008.587.859-60",
    phone: "(42) 99999-9999",
    address: "Rua dos Caquizeiros, 156 - São Cristóvão",
    email: "elber@email.com",
    emergencyContact: "(42) 98888-8888",
    bloodType: "O+",
    allergies: ["Penicilina", "Dipirona"],
    chronicConditions: ["Hipertensão", "Diabetes Tipo 2"]
  };

  // Histórico médico mock
  const medicalHistory: MedicalRecord[] = [
    {
      id: "1",
      date: "10/01/2025",
      doctor: "Dr. João Santos",
      specialty: "Clínica Geral",
      complaint: "Dor de cabeça e febre",
      conduct: "Prescrito analgésico e antitérmico. Repouso por 3 dias. Retorno se sintomas persistirem.",
      prescription: "Paracetamol 750mg - 1 comprimido de 8/8h por 5 dias\nIbuprofeno 400mg - 1 comprimido de 12/12h por 3 dias",
      certificate: "Atestado médico por 3 dias para repouso",
      observations: "Paciente apresentou melhora dos sintomas durante a consulta"
    },
    {
      id: "2",
      date: "05/01/2025",
      doctor: "Dra. Ana Costa",
      specialty: "Cardiologia",
      complaint: "Dor no peito e falta de ar",
      conduct: "Realizado ECG - resultado normal. Prescrito medicação para ansiedade. Acompanhamento em 30 dias.",
      prescription: "Clonazepam 0,5mg - 1/2 comprimido à noite por 15 dias",
      certificate: "",
      observations: "Exames cardiológicos dentro da normalidade. Quadro sugestivo de ansiedade."
    }
  ];

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate.split('/').reverse().join('-'));
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSave = () => {
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      doctor: "Dr. João Santos", // Vem da sessão
      specialty: "Clínica Geral",
      complaint: complaint,
      conduct: conduct,
      prescription: prescription,
      certificate: certificate,
      observations: observations
    };
    
    alert("Consulta salva com sucesso!");
    // Aqui salvaria no banco de dados
  };

  const handlePrint = (type: "prescription" | "certificate" | "conduct") => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let content = "";
    const date = new Date().toLocaleDateString('pt-BR');
    
    if (type === "prescription") {
      content = `
        <html>
          <head>
            <title>Receita Médica</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .patient-info { margin: 20px 0; }
              .prescription { margin: 20px 0; line-height: 1.8; }
              .footer { margin-top: 50px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>UNICLÍNICA</h2>
              <p>Receita Médica</p>
            </div>
            <div class="patient-info">
              <p><strong>Paciente:</strong> ${patientData.name}</p>
              <p><strong>Data:</strong> ${date}</p>
            </div>
            <div class="prescription">
              <pre>${prescription}</pre>
            </div>
            <div class="footer">
              <p>Dr. João Santos</p>
              <p>CRM: 12345-PR</p>
              <p>Clínica Geral</p>
            </div>
          </body>
        </html>
      `;
    } else if (type === "certificate") {
      content = `
        <html>
          <head>
            <title>Atestado Médico</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .content { margin: 40px 0; line-height: 2; }
              .footer { margin-top: 100px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>UNICLÍNICA</h2>
              <p>Atestado Médico</p>
            </div>
            <div class="content">
              <p>Atesto para os devidos fins que o(a) paciente <strong>${patientData.name}</strong>, portador(a) do CPF ${patientData.cpf}, esteve sob meus cuidados médicos e necessita de afastamento de suas atividades.</p>
              <br>
              <p>${certificate}</p>
              <br>
              <p>Data: ${date}</p>
            </div>
            <div class="footer">
              <p>_________________________</p>
              <p>Dr. João Santos</p>
              <p>CRM: 12345-PR</p>
              <p>Clínica Geral</p>
            </div>
          </body>
        </html>
      `;
    } else if (type === "conduct") {
      content = `
        <html>
          <head>
            <title>Conduta Médica</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .content { margin: 20px 0; line-height: 1.8; }
              .footer { margin-top: 50px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>UNICLÍNICA</h2>
              <p>Conduta Médica</p>
            </div>
            <div class="content">
              <p><strong>Paciente:</strong> ${patientData.name}</p>
              <p><strong>Data:</strong> ${date}</p>
              <br>
              <p><strong>Queixa Principal:</strong></p>
              <p>${complaint}</p>
              <br>
              <p><strong>Conduta:</strong></p>
              <pre>${conduct}</pre>
              <br>
              <p><strong>Observações:</strong></p>
              <p>${observations}</p>
            </div>
            <div class="footer">
              <p>Dr. João Santos</p>
              <p>CRM: 12345-PR</p>
              <p>Clínica Geral</p>
            </div>
          </body>
        </html>
      `;
    }

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Prontuário Médico</h1>
                  <p className="text-gray-600">{patientData.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Salvar Consulta</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Informações do Paciente */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{patientData.name}</h3>
                <p className="text-gray-600">{calculateAge(patientData.birthDate)} anos</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Nascimento</p>
                    <p className="font-medium">{patientData.birthDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Telefone</p>
                    <p className="font-medium">{patientData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Endereço</p>
                    <p className="font-medium">{patientData.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Tipo Sanguíneo</p>
                    <p className="font-medium">{patientData.bloodType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Alergias</h4>
                <div className="space-y-1">
                  {patientData.allergies.map((allergy, index) => (
                    <span key={index} className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-1">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Condições Crônicas</h4>
                <div className="space-y-1">
                  {patientData.chronicConditions.map((condition, index) => (
                    <span key={index} className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-1">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Área Principal */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab("consulta")}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === "consulta"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Activity className="h-4 w-4 inline mr-2" />
                    Nova Consulta
                  </button>
                  <button
                    onClick={() => setActiveTab("historico")}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === "historico"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <History className="h-4 w-4 inline mr-2" />
                    Histórico
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "consulta" && (
                  <div className="space-y-6">
                    {/* Queixa Principal */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Queixa Principal
                      </label>
                      <textarea
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Descreva a queixa principal do paciente..."
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Conduta Médica */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Conduta Médica
                          </label>
                          <button
                            onClick={() => handlePrint("conduct")}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Imprimir
                          </button>
                        </div>
                        <textarea
                          value={conduct}
                          onChange={(e) => setConduct(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={8}
                          placeholder="Escreva a conduta médica, diagnóstico, orientações..."
                        />
                      </div>

                      {/* Receita/Posologia */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            <Pill className="h-4 w-4 inline mr-1" />
                            Receita e Posologia
                          </label>
                          <button
                            onClick={() => handlePrint("prescription")}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Imprimir
                          </button>
                        </div>
                        <textarea
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={8}
                          placeholder="Ex: Paracetamol 750mg - 1 comprimido de 8/8h por 5 dias&#10;Dipirona 500mg - 20 gotas de 6/6h se dor"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Atestado */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            <Award className="h-4 w-4 inline mr-1" />
                            Atestado Médico
                          </label>
                          <button
                            onClick={() => handlePrint("certificate")}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Imprimir
                          </button>
                        </div>
                        <textarea
                          value={certificate}
                          onChange={(e) => setCertificate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder="Ex: Repouso médico por 3 dias a partir de hoje..."
                        />
                      </div>

                      {/* Observações */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <ClipboardList className="h-4 w-4 inline mr-1" />
                          Observações
                        </label>
                        <textarea
                          value={observations}
                          onChange={(e) => setObservations(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder="Observações adicionais sobre a consulta..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "historico" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Histórico de Consultas</h3>
                      <span className="text-sm text-gray-500">{medicalHistory.length} consultas</span>
                    </div>

                    <div className="space-y-4">
                      {medicalHistory.map((record) => (
                        <div key={record.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="font-semibold text-gray-900">{record.date}</p>
                              <p className="text-sm text-gray-600">{record.doctor} - {record.specialty}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Queixa</h4>
                              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{record.complaint}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Conduta</h4>
                              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{record.conduct}</p>
                            </div>
                            {record.prescription && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Receita</h4>
                                <pre className="text-sm text-gray-700 bg-blue-50 p-3 rounded whitespace-pre-wrap">{record.prescription}</pre>
                              </div>
                            )}
                            {record.certificate && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Atestado</h4>
                                <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded">{record.certificate}</p>
                              </div>
                            )}
                          </div>

                          {record.observations && (
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-900 mb-2">Observações</h4>
                              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{record.observations}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProntuarioContent() {
  // Mover todo o conteúdo da função ProntuarioPage aqui
  const params = useParams();
  // ... resto do código
  return null; // Temporário
}

export default function ProntuarioPage() {
  return (
    <LayoutIntegrado>
      <ProntuarioContent />
    </LayoutIntegrado>
  );
}
