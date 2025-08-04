"use client";

import { useState } from "react";
import { 
  Users, 
  Clock, 
  Search, 
  Filter,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Play,
  Pause,
  SkipForward,
  AlertCircle,
  CheckCircle,
  UserX
} from "lucide-react";

interface Patient {
  id: string;
  position: number;
  name: string;
  age: number;
  gender: "M" | "F";
  action: string;
  waitTime: string;
  priority: "NORMAL" | "URGENTE" | "PREFERENCIAL";
  status: "AGUARDANDO" | "CHAMADO" | "EM_ATENDIMENTO" | "FINALIZADO";
}

interface QueueGroup {
  id: string;
  name: string;
  count: number;
  patients: Patient[];
  expanded: boolean;
}

export default function FilaAtendimentoPage() {
  const [selectedFilter, setSelectedFilter] = useState("POR FILA");
  const [searchTerm, setSearchTerm] = useState("");
  const [queueGroups, setQueueGroups] = useState<QueueGroup[]>([
    {
      id: "agendamento_coleta_exame",
      name: "AGENDAMENTO COLETA EXAME",
      count: 2,
      expanded: true,
      patients: [
        {
          id: "1",
          position: 1,
          name: "HELENA MARQUIONI ARRUDA",
          age: 76,
          gender: "F",
          action: "COLETA DE SANGUE",
          waitTime: "15 min",
          priority: "PREFERENCIAL",
          status: "AGUARDANDO"
        },
        {
          id: "2", 
          position: 2,
          name: "DAIANE NEVES",
          age: 25,
          gender: "F",
          action: "COLETA DE URINA",
          waitTime: "8 min",
          priority: "NORMAL",
          status: "AGUARDANDO"
        }
      ]
    },
    {
      id: "leito_observacao",
      name: "LEITO OBSERVAÇÃO",
      count: 3,
      expanded: false,
      patients: [
        {
          id: "3",
          position: 1,
          name: "JOÃO SILVA SANTOS",
          age: 45,
          gender: "M",
          action: "OBSERVAÇÃO CLÍNICA",
          waitTime: "45 min",
          priority: "URGENTE",
          status: "EM_ATENDIMENTO"
        },
        {
          id: "4",
          position: 2,
          name: "MARIA OLIVEIRA COSTA",
          age: 32,
          gender: "F",
          action: "OBSERVAÇÃO PÓS-PROCEDIMENTO",
          waitTime: "22 min",
          priority: "NORMAL",
          status: "AGUARDANDO"
        },
        {
          id: "5",
          position: 3,
          name: "PEDRO ALVES LIMA",
          age: 58,
          gender: "M",
          action: "MONITORAMENTO CARDÍACO",
          waitTime: "12 min",
          priority: "URGENTE",
          status: "AGUARDANDO"
        }
      ]
    },
    {
      id: "consulta_medica",
      name: "CONSULTA MÉDICA",
      count: 4,
      expanded: false,
      patients: [
        {
          id: "6",
          position: 1,
          name: "ANA PAULA FERREIRA",
          age: 28,
          gender: "F",
          action: "CONSULTA CLÍNICA GERAL",
          waitTime: "5 min",
          priority: "NORMAL",
          status: "CHAMADO"
        },
        {
          id: "7",
          position: 2,
          name: "CARLOS EDUARDO SILVA",
          age: 41,
          gender: "M",
          action: "CONSULTA CARDIOLOGIA",
          waitTime: "18 min",
          priority: "NORMAL",
          status: "AGUARDANDO"
        },
        {
          id: "8",
          position: 3,
          name: "LUCIA SANTOS NEVES",
          age: 67,
          gender: "F",
          action: "CONSULTA GERIATRIA",
          waitTime: "25 min",
          priority: "PREFERENCIAL",
          status: "AGUARDANDO"
        },
        {
          id: "9",
          position: 4,
          name: "ROBERTO COSTA LIMA",
          age: 35,
          gender: "M",
          action: "CONSULTA DERMATOLOGIA",
          waitTime: "32 min",
          priority: "NORMAL",
          status: "AGUARDANDO"
        }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENTE": return "bg-red-100 text-red-800 border-red-300";
      case "PREFERENCIAL": return "bg-orange-100 text-orange-800 border-orange-300";
      case "NORMAL": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AGUARDANDO": return "bg-yellow-100 text-yellow-800";
      case "CHAMADO": return "bg-blue-100 text-blue-800";
      case "EM_ATENDIMENTO": return "bg-green-100 text-green-800";
      case "FINALIZADO": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === "F" ? "♀" : "♂";
  };

  const toggleGroupExpansion = (groupId: string) => {
    setQueueGroups(groups => 
      groups.map(group => 
        group.id === groupId 
          ? { ...group, expanded: !group.expanded }
          : group
      )
    );
  };

  const callNextPatient = (groupId: string) => {
    // Lógica para chamar próximo paciente
    console.log(`Chamando próximo paciente da fila: ${groupId}`);
  };

  const filterOptions = ["POR FILA", "POR USUÁRIO", "POR PRIORIDADE", "POR STATUS"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header estilo FastMedic */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8" />
                <div>
                  <h1 className="text-xl font-bold">UNICLÍNICA</h1>
                  <p className="text-xs opacity-90">PREFEITURA MUNICIPAL DE GUARAPUAVA</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span>Bem vindo ELBER LUIZ NEVES - RECEPCIONISTA DE CONSULTÓRIO MÉDICO OU DENTÁRIO</span>
              <button className="bg-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-800">
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Menu de navegação */}
        <div className="bg-blue-700">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8 text-sm">
              <a href="#" className="py-3 px-2 border-b-2 border-blue-400 text-blue-200">Atendimento</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Agenda</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Usuário</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Programas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ferramentas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Segurança</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ajuda</a>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Controles */}
        <div className="flex items-center space-x-4 mb-6">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
            <Users className="h-4 w-4" />
            <span>Selecionar</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
            <Clock className="h-4 w-4" />
            <span>Atualizar</span>
          </button>
        </div>

        {/* Fila de Atendimento */}
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-bold">FILA DE ATENDIMENTO</h2>
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Agrupamento da fila:</span>
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  {filterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm">Filtro:</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
                  placeholder="Digite para filtrar..."
                />
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  FILTRAR
                </button>
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  LIMPAR
                </button>
              </div>
            </div>

            {/* Cabeçalho da tabela */}
            <div className="border border-gray-300 rounded">
              <div className="bg-blue-100 px-4 py-2 border-b border-gray-300">
                <div className="grid grid-cols-7 gap-4 text-sm font-bold text-blue-800">
                  <div>Ação</div>
                  <div>Qtd</div>
                  <div>Posição</div>
                  <div>Sexo</div>
                  <div>Nome</div>
                  <div>Ações</div>
                  <div>Status</div>
                </div>
              </div>

              {/* Filas */}
              <div className="bg-white">
                {queueGroups.map((group, groupIndex) => (
                  <div key={group.id}>
                    {/* Cabeçalho do grupo */}
                    <div 
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-200 ${
                        groupIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                      onClick={() => toggleGroupExpansion(group.id)}
                    >
                      <div className="grid grid-cols-7 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          {group.expanded ? (
                            <ChevronDown className="h-4 w-4 text-blue-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="font-medium text-blue-700">{group.name}</span>
                        </div>
                        <div className="font-medium">{group.count}</div>
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              callNextPatient(group.id);
                            }}
                            className="text-green-600 hover:text-green-800"
                            title="Chamar próximo"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-800" title="Pausar fila">
                            <Pause className="h-4 w-4" />
                          </button>
                        </div>
                        <div>-</div>
                      </div>
                    </div>

                    {/* Pacientes do grupo */}
                    {group.expanded && group.patients.map((patient, patientIndex) => (
                      <div 
                        key={patient.id}
                        className={`px-4 py-3 border-b border-gray-200 hover:bg-blue-50 ${
                          patientIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <div className="grid grid-cols-7 gap-4 text-sm">
                          <div className="pl-6 text-gray-700">{patient.action}</div>
                          <div>-</div>
                          <div className="font-medium text-blue-700">{patient.position}</div>
                          <div className="text-lg">
                            <span className={patient.gender === 'F' ? 'text-pink-600' : 'text-blue-600'}>
                              {getGenderIcon(patient.gender)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{patient.name} - {patient.age} ANO(S)</div>
                            <div className="text-xs text-gray-500">Aguardando: {patient.waitTime}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800" title="Visualizar">
                              👁️
                            </button>
                            <button className="text-green-600 hover:text-green-800" title="Chamar">
                              📢
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-800" title="Agendar">
                              📅
                            </button>
                            <button className="text-red-600 hover:text-red-800" title="Remover">
                              ❌
                            </button>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                            {patient.priority !== "NORMAL" && (
                              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(patient.priority)}`}>
                                {patient.priority}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resumo da fila */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">
                  {queueGroups.reduce((total, group) => total + group.count, 0)}
                </div>
                <div className="text-sm text-blue-600">Total na Fila</div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-100 p-4 rounded">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-800">
                  {queueGroups.reduce((total, group) => 
                    total + group.patients.filter(p => p.status === "AGUARDANDO").length, 0
                  )}
                </div>
                <div className="text-sm text-yellow-600">Aguardando</div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">
                  {queueGroups.reduce((total, group) => 
                    total + group.patients.filter(p => p.status === "EM_ATENDIMENTO").length, 0
                  )}
                </div>
                <div className="text-sm text-green-600">Em Atendimento</div>
              </div>
            </div>
          </div>

          <div className="bg-red-100 p-4 rounded">
            <div className="flex items-center space-x-2">
              <UserX className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-800">
                  {queueGroups.reduce((total, group) => 
                    total + group.patients.filter(p => p.priority === "URGENTE").length, 0
                  )}
                </div>
                <div className="text-sm text-red-600">Urgentes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 py-2 px-4 text-xs text-gray-600 text-center">
        FastMedic Sistemas | © FastMedic | Versão 5.126.6.24402
      </div>
    </div>
  );
}
