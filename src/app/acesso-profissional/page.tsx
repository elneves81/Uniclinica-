"use client";

import { useState } from "react";
import { 
  Search, 
  Filter,
  Stethoscope,
  User,
  Building,
  Users,
  Settings,
  Shield,
  Key
} from "lucide-react";

interface Professional {
  id: string;
  login: string;
  name: string;
  establishment: string;
  role: string;
  department: string;
  status: "ATIVO" | "INATIVO" | "BLOQUEADO";
  lastAccess: string;
  permissions: string[];
}

export default function AcessoProfissionalPage() {
  const [selectedEstablishment, setSelectedEstablishment] = useState("SECRETARIA MUNICIPAL DE SAUDE");
  const [professionalLogin, setProfessionalLogin] = useState("");
  const [professionalName, setProfessionalName] = useState("");
  const [professionals] = useState<Professional[]>([
    {
      id: "1",
      login: "dr.joao.santos",
      name: "DR. JOÃO SANTOS",
      establishment: "SECRETARIA MUNICIPAL DE SAUDE",
      role: "MÉDICO CLÍNICO GERAL",
      department: "CLÍNICA MÉDICA",
      status: "ATIVO",
      lastAccess: "15/01/2025 14:30",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "AGENDA"]
    },
    {
      id: "2", 
      login: "dra.ana.costa",
      name: "DRA. ANA COSTA",
      establishment: "SECRETARIA MUNICIPAL DE SAUDE",
      role: "MÉDICA PEDIATRA",
      department: "PEDIATRIA",
      status: "ATIVO",
      lastAccess: "15/01/2025 13:45",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "AGENDA", "VACINAS"]
    },
    {
      id: "3",
      login: "enf.maria.silva",
      name: "MARIA SILVA",
      establishment: "SECRETARIA MUNICIPAL DE SAUDE", 
      role: "ENFERMEIRA",
      department: "ENFERMAGEM",
      status: "ATIVO",
      lastAccess: "15/01/2025 15:20",
      permissions: ["CURATIVOS", "MEDICAÇÃO", "TRIAGEM", "PRONTUÁRIOS"]
    },
    {
      id: "4",
      login: "rec.carlos.lima",
      name: "CARLOS LIMA",
      establishment: "SECRETARIA MUNICIPAL DE SAUDE",
      role: "RECEPCIONISTA",
      department: "RECEPÇÃO",
      status: "ATIVO",
      lastAccess: "15/01/2025 08:00",
      permissions: ["AGENDA", "CADASTROS", "RELATÓRIOS"]
    },
    {
      id: "5",
      login: "dr.pedro.oliveira",
      name: "DR. PEDRO OLIVEIRA",
      establishment: "SECRETARIA MUNICIPAL DE SAUDE",
      role: "MÉDICO DERMATOLOGISTA",
      department: "DERMATOLOGIA",
      status: "INATIVO",
      lastAccess: "10/01/2025 17:30",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS"]
    }
  ]);

  const establishments = [
    "SECRETARIA MUNICIPAL DE SAUDE",
    "UBS CENTRO",
    "UBS VILA NOVA", 
    "ESF SÃO CRISTOVÃO",
    "HOSPITAL MUNICIPAL",
    "LABORATÓRIO CENTRAL"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ATIVO": return "bg-green-100 text-green-800 border-green-300";
      case "INATIVO": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "BLOQUEADO": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredProfessionals = professionals.filter(prof => {
    const matchesEstablishment = prof.establishment === selectedEstablishment;
    const matchesLogin = !professionalLogin || prof.login.toLowerCase().includes(professionalLogin.toLowerCase());
    const matchesName = !professionalName || prof.name.toLowerCase().includes(professionalName.toLowerCase());
    
    return matchesEstablishment && matchesLogin && matchesName;
  });

  const handleSearch = () => {
    // Lógica de busca implementada via filteredProfessionals
    console.log("Pesquisando profissionais...");
  };

  const handleClearSearch = () => {
    setProfessionalLogin("");
    setProfessionalName("");
  };

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
              <span>Bem vindo ELBER LUIZ NEVES - ADMINISTRADOR DO SISTEMA</span>
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
              <a href="#" className="py-3 px-2 hover:text-blue-200">Atendimento</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Agenda</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Usuário</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Programas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ferramentas</a>
              <a href="#" className="py-3 px-2 border-b-2 border-blue-400 text-blue-200">Segurança</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ajuda</a>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Título da página */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold">ACESSO PROFISSIONAL FCES</h2>
        </div>

        {/* Filtros de pesquisa */}
        <div className="bg-white border border-gray-300 rounded-b-lg p-6">
          <div className="bg-blue-100 p-4 rounded mb-6">
            <h3 className="font-bold text-blue-800 mb-3">Filtros de Pesquisa</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estabelecimento de Saúde
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedEstablishment}
                    onChange={(e) => setSelectedEstablishment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {establishments.map(establishment => (
                      <option key={establishment} value={establishment}>
                        {establishment}
                      </option>
                    ))}
                  </select>
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Profissional
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={professionalName}
                    onChange={(e) => setProfessionalName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite o nome do profissional"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login Profissional
              </label>
              <div className="relative max-w-md">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={professionalLogin}
                  onChange={(e) => setProfessionalLogin(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o login do profissional"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={handleSearch}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                <Search className="h-4 w-4" />
                <span>Pesquisar</span>
              </button>
              <button
                onClick={handleClearSearch}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
              >
                <Filter className="h-4 w-4" />
                <span>Limpar Filtros</span>
              </button>
            </div>
          </div>

          {/* Tabela de resultados */}
          <div className="border border-gray-300 rounded">
            <div className="bg-blue-100 px-4 py-2 border-b border-gray-300">
              <div className="grid grid-cols-2 gap-4 text-sm font-bold text-blue-800">
                <div>Ação</div>
                <div>Grupo de Tela</div>
              </div>
            </div>

            <div className="bg-white">
              {filteredProfessionals.length > 0 ? (
                filteredProfessionals.map((professional, index) => (
                  <div
                    key={professional.id}
                    className={`px-4 py-4 border-b border-gray-200 hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium text-gray-900">{professional.name}</div>
                              <div className="text-sm text-gray-500">Login: {professional.login}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Shield className="h-5 w-5 text-green-600" />
                            <div>
                              <div className="text-sm text-gray-700">{professional.role}</div>
                              <div className="text-xs text-gray-500">{professional.department}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Building className="h-5 w-5 text-orange-600" />
                            <div className="text-sm text-gray-700">{professional.establishment}</div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(professional.status)}`}>
                              {professional.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              Último acesso: {professional.lastAccess}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Permissões de Acesso:</h4>
                            <div className="flex flex-wrap gap-2">
                              {professional.permissions.map((permission, permIndex) => (
                                <span
                                  key={permIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border"
                                >
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                              <Settings className="h-3 w-3" />
                              <span>Configurar</span>
                            </button>
                            <button className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                              <Key className="h-3 w-3" />
                              <span>Resetar Senha</span>
                            </button>
                            <button className="flex items-center space-x-1 bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700">
                              <Shield className="h-3 w-3" />
                              <span>Permissões</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum profissional encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </div>

          {/* Resumo */}
          {filteredProfessionals.length > 0 && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-blue-100 p-3 rounded">
                <div className="text-2xl font-bold text-blue-800">{filteredProfessionals.length}</div>
                <div className="text-sm text-blue-600">Total de Profissionais</div>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <div className="text-2xl font-bold text-green-800">
                  {filteredProfessionals.filter(p => p.status === "ATIVO").length}
                </div>
                <div className="text-sm text-green-600">Ativos</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-800">
                  {filteredProfessionals.filter(p => p.status === "INATIVO").length}
                </div>
                <div className="text-sm text-yellow-600">Inativos</div>
              </div>
              <div className="bg-red-100 p-3 rounded">
                <div className="text-2xl font-bold text-red-800">
                  {filteredProfessionals.filter(p => p.status === "BLOQUEADO").length}
                </div>
                <div className="text-sm text-red-600">Bloqueados</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 py-2 px-4 text-xs text-gray-600 text-center">
        FastMedic Sistemas | © FastMedic | Versão 5.126.6.24402
      </div>
    </div>
  );
}
