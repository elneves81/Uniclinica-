"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  FileText,
  Shield,
  Filter
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  age: number;
  gender: "M" | "F" | "O";
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance?: {
    provider: string;
    number: string;
    validity: string;
  };
  lastVisit?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Dados mock para demonstração
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Silva Santos",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    birthDate: "1985-03-15",
    age: 39,
    gender: "F",
    phone: "(11) 99999-9999",
    email: "maria.silva@email.com",
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    },
    emergencyContact: {
      name: "João Silva Santos",
      relationship: "Cônjuge",
      phone: "(11) 88888-8888"
    },
    insurance: {
      provider: "Unimed",
      number: "123456789",
      validity: "2024-12-31"
    },
    lastVisit: "2024-01-15",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: "2", 
    name: "José Carlos Oliveira",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    birthDate: "1972-08-22",
    age: 52,
    gender: "M",
    phone: "(11) 77777-7777",
    email: "jose.carlos@email.com",
    address: {
      street: "Av. Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    emergencyContact: {
      name: "Ana Oliveira",
      relationship: "Filha",
      phone: "(11) 66666-6666"
    },
    lastVisit: "2024-01-10",
    status: "active",
    createdAt: "2023-05-20",
    updatedAt: "2024-01-10"
  }
];

export default function PacientesPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setModalMode("create");
    setShowModal(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode("edit");
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Ativo
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Inativo
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-blue-600" />
              Gerenciamento de Pacientes
            </h1>
            <p className="mt-2 text-gray-600">
              Cadastro e acompanhamento completo de pacientes
            </p>
          </div>
          <button
            onClick={handleNewPatient}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            Total: {filteredPatients.length} paciente(s)
          </div>
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.age} anos • {patient.gender === "M" ? "Masculino" : patient.gender === "F" ? "Feminino" : "Outro"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.cpf}</div>
                    <div className="text-sm text-gray-500">{patient.rg}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {patient.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {patient.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.lastVisit ? formatDate(patient.lastVisit) : "Nunca"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(patient.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-green-600 hover:text-green-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - simplificado para este exemplo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {modalMode === "create" ? "Novo Paciente" : 
                 modalMode === "edit" ? "Editar Paciente" : "Detalhes do Paciente"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {selectedPatient && modalMode === "view" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <p className="text-sm text-gray-900">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                    <p className="text-sm text-gray-900">{selectedPatient.cpf}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedPatient.birthDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <p className="text-sm text-gray-900">{selectedPatient.phone}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                  <p className="text-sm text-gray-900">
                    {selectedPatient.address.street}, {selectedPatient.address.number}
                    {selectedPatient.address.complement && `, ${selectedPatient.address.complement}`}
                    <br />
                    {selectedPatient.address.neighborhood} - {selectedPatient.address.city}/{selectedPatient.address.state}
                    <br />
                    CEP: {selectedPatient.address.zipCode}
                  </p>
                </div>

                {selectedPatient.insurance && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Convênio</label>
                    <p className="text-sm text-gray-900">
                      {selectedPatient.insurance.provider} - {selectedPatient.insurance.number}
                      <br />
                      Validade: {formatDate(selectedPatient.insurance.validity)}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Fechar
              </button>
              {modalMode !== "view" && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Salvar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Aviso LGPD */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div className="text-sm text-blue-800">
            <strong>Proteção de Dados (LGPD):</strong> Todos os dados pessoais são tratados com segurança máxima, 
            criptografados e acessíveis apenas por profissionais autorizados. O paciente tem direito ao acesso, 
            correção e exclusão de seus dados conforme a Lei Geral de Proteção de Dados.
          </div>
        </div>
      </div>
    </div>
  );
}
