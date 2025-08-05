"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Phone, 
  Mail, 
  Calendar,
  User,
  Filter,
  MoreVertical,
  Eye
} from "lucide-react";
import { useClinic, useClinicActions } from "@/contexts/ClinicContext";
import { useRouter } from "next/navigation";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

function PacientesContent() {
  const router = useRouter();
  const { state } = useClinic();
  const actions = useClinicActions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'M' | 'F'>('all');

  // Filtrar pacientes
  const filteredPatients = state.patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.cpf.includes(searchTerm);
    
    const matchesGender = filterGender === 'all' || patient.gender === filterGender;
    
    return matchesSearch && matchesGender;
  });

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatPhone = (phone: string) => {
    return phone || 'Não informado';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 mr-3 text-blue-600" />
                Gerenciar Pacientes
              </h1>
              <p className="mt-1 text-gray-600">
                {state.patients.length} paciente{state.patients.length !== 1 ? 's' : ''} cadastrado{state.patients.length !== 1 ? 's' : ''}
              </p>
            </div>

            <button
              onClick={() => router.push('/pacientes/novo')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Novo Paciente
            </button>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            
            {/* Busca */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, telefone ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value as 'all' | 'M' | 'F')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os gêneros</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Pacientes */}
        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? 'Tente ajustar os filtros de busca.'
                : 'Comece cadastrando o primeiro paciente da clínica.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => router.push('/pacientes/novo')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Primeiro Paciente
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            
            {/* Cabeçalho da tabela */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                <div className="md:col-span-2">Paciente</div>
                <div>Contato</div>
                <div>Idade</div>
                <div>Gênero</div>
                <div>Ações</div>
              </div>
            </div>

            {/* Lista de pacientes */}
            <div className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    
                    {/* Informações do Paciente */}
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.cpf || 'CPF não informado'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contato */}
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {formatPhone(patient.phone)}
                      </div>
                      {patient.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {patient.email}
                        </div>
                      )}
                    </div>

                    {/* Idade */}
                    <div>
                      <span className="text-sm text-gray-900">
                        {calculateAge(patient.birthDate)} anos
                      </span>
                    </div>

                    {/* Gênero */}
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        patient.gender === 'M' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {patient.gender === 'M' ? 'Masculino' : 'Feminino'}
                      </span>
                    </div>

                    {/* Ações */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/prontuario/${patient.id}`)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver prontuário"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => router.push(`/pacientes/editar/${patient.id}`)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Editar paciente"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Mais opções"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PacientesPage() {
  return (
    <LayoutIntegrado>
      <PacientesContent />
    </LayoutIntegrado>
  );
}
