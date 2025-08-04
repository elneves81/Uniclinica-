"use client";

import { useState } from "react";
import { 
  Search, 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
  FileText,
  Plus,
  Edit,
  Eye,
  Download,
  Printer,
  Settings,
  Stethoscope,
  Users,
  Building
} from "lucide-react";

interface UserData {
  id: string;
  nomeUsuario: string;
  nomeMae: string;
  dataNascimento: string;
  cpf: string;
  situacao: "COMPLETO" | "INCOMPLETO" | "PENDENTE";
  sexo: "M" | "F";
  idade: number;
  logradouro: string;
  estabelecimentoSaude: string;
  segmento: string;
  microArea: string;
  equipe: string;
  numero: string;
  prontuario: string;
}

// Dados mock baseados na tela mostrada
const mockUsers: UserData[] = [
  {
    id: "1",
    nomeUsuario: "ELBER LUIZ NEVES",
    nomeMae: "OZIMA MARIA DE LIMA NEVES",
    dataNascimento: "10/12/1981",
    cpf: "00858785960",
    situacao: "COMPLETO",
    sexo: "M",
    idade: 42,
    logradouro: "RUA DOS CAQUIZEIROS",
    estabelecimentoSaude: "ESF SÃO CRISTOVÃO",
    segmento: "DISTRITO PSF SÃO CRISTOVÃO",
    microArea: "MICROAREA 06 EQ 0302",
    equipe: "ESF SÃO CRISTOVÃO",
    numero: "156",
    prontuario: "Nº Prontuário em Papel"
  },
  {
    id: "2",
    nomeUsuario: "MARIA SILVA SANTOS",
    nomeMae: "ANA SILVA COSTA",
    dataNascimento: "15/03/1990",
    cpf: "12345678901",
    situacao: "COMPLETO",
    sexo: "F",
    idade: 34,
    logradouro: "RUA DAS FLORES",
    estabelecimentoSaude: "UBS CENTRO",
    segmento: "DISTRITO CENTRAL",
    microArea: "MICROAREA 01 EQ 0101",
    equipe: "ESF CENTRO",
    numero: "89",
    prontuario: "Nº Prontuário em Papel"
  },
  {
    id: "3",
    nomeUsuario: "JOÃO OLIVEIRA COSTA",
    nomeMae: "MARIA OLIVEIRA SILVA",
    dataNascimento: "22/07/1975",
    cpf: "98765432109",
    situacao: "INCOMPLETO",
    sexo: "M",
    idade: 49,
    logradouro: "AVENIDA PRINCIPAL",
    estabelecimentoSaude: "ESF VILA NOVA",
    segmento: "DISTRITO NORTE",
    microArea: "MICROAREA 03 EQ 0205",
    equipe: "ESF VILA NOVA",
    numero: "234",
    prontuario: "Nº Prontuário em Papel"
  }
];

export default function PesquisaUsuarioPage() {
  const [users] = useState<UserData[]>(mockUsers);
  const [searchFilters, setSearchFilters] = useState({
    nomeUsuario: "",
    nomeMae: "",
    dataNascimento: "",
    sexo: "",
    idade: ""
  });
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const filteredUsers = users.filter(user => {
    return (
      (!searchFilters.nomeUsuario || user.nomeUsuario.toLowerCase().includes(searchFilters.nomeUsuario.toLowerCase())) &&
      (!searchFilters.nomeMae || user.nomeMae.toLowerCase().includes(searchFilters.nomeMae.toLowerCase())) &&
      (!searchFilters.dataNascimento || user.dataNascimento.includes(searchFilters.dataNascimento)) &&
      (!searchFilters.sexo || user.sexo === searchFilters.sexo) &&
      (!searchFilters.idade || user.idade.toString().includes(searchFilters.idade))
    );
  });

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "COMPLETO": return "bg-green-100 text-green-800";
      case "INCOMPLETO": return "bg-yellow-100 text-yellow-800";
      case "PENDENTE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user);
    setShowUserDetails(true);
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
              <a href="#" className="py-3 px-2 hover:text-blue-200">Atendimento</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Agenda</a>
              <a href="#" className="py-3 px-2 border-b-2 border-blue-400 text-blue-200">Usuário</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Programas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ferramentas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Segurança</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ajuda</a>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Título da página */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold">Pesquisa de Usuário</h2>
        </div>

        {/* Área de filtros */}
        <div className="bg-white border border-gray-300 rounded-b-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
              <User className="h-4 w-4" />
              <span>Selecionar</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
              <Search className="h-4 w-4" />
              <span>Pesquisar</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
              <FileText className="h-4 w-4" />
              <span>CNS / Nº Prontuário / CPF</span>
            </button>
            <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700">
              <Plus className="h-4 w-4" />
              <span>Cadastrar</span>
            </button>
            <div className="ml-auto">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <span className="text-sm">Sair</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded mb-4">
            <h3 className="font-bold text-blue-800 mb-3">Filtros de Pesquisa</h3>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
                <input
                  type="text"
                  value={searchFilters.nomeUsuario}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, nomeUsuario: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do usuário"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Mãe</label>
                <input
                  type="text"
                  value={searchFilters.nomeMae}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, nomeMae: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da mãe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dt. Nasc.</label>
                <input
                  type="text"
                  value={searchFilters.dataNascimento}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, dataNascimento: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="dd/mm/aaaa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sexo"
                      value="M"
                      checked={searchFilters.sexo === "M"}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, sexo: e.target.value }))}
                      className="mr-1"
                    />
                    <span className="text-sm">M</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sexo"
                      value="F"
                      checked={searchFilters.sexo === "F"}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, sexo: e.target.value }))}
                      className="mr-1"
                    />
                    <span className="text-sm">F</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={searchFilters.idade}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, idade: e.target.value }))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm">até</span>
                  <input
                    type="text"
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de resultados */}
          <div className="border border-gray-300 rounded">
            <div className="bg-blue-100 px-4 py-2 border-b border-gray-300">
              <div className="grid grid-cols-6 gap-4 text-sm font-bold text-blue-800">
                <div>Nome do Usuário</div>
                <div>Nome da Mãe</div>
                <div>Dt. Nasc.</div>
                <div>Nº CPF</div>
                <div>Situação</div>
                <div>Sexo</div>
              </div>
            </div>

            <div className="bg-white">
              {filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`grid grid-cols-6 gap-4 px-4 py-3 text-sm border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  onClick={() => handleViewUser(user)}
                >
                  <div className="font-medium text-blue-700">{user.nomeUsuario}</div>
                  <div className="text-gray-700">{user.nomeMae}</div>
                  <div className="text-gray-700">{user.dataNascimento}</div>
                  <div className="text-gray-700">{user.cpf}</div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSituacaoColor(user.situacao)}`}>
                      {user.situacao}
                    </span>
                  </div>
                  <div className="text-gray-700">{user.sexo}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Informações adicionais do usuário selecionado */}
          {selectedUser && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
              <h3 className="font-bold text-blue-800 mb-3">Dados do Usuário</h3>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Logradouro:</span>
                      <div className="bg-white border border-gray-300 px-3 py-2 rounded">
                        {selectedUser.logradouro}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Estabelecimento de Saúde:</span>
                      <div className="bg-white border border-gray-300 px-3 py-2 rounded">
                        {selectedUser.estabelecimentoSaude}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Segmento:</span>
                      <div className="bg-white border border-gray-300 px-3 py-2 rounded">
                        {selectedUser.segmento}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Micro Área:</span>
                      <div className="bg-white border border-gray-300 px-3 py-2 rounded">
                        {selectedUser.microArea}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Equipe:</span>
                      <div className="bg-white border border-gray-300 px-3 py-2 rounded">
                        {selectedUser.equipe}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Número:</span>
                      <div className="bg-white border border-gray-300 px-3 py-2 rounded">
                        {selectedUser.numero}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <span className="font-medium">{selectedUser.prontuario}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalhes do usuário */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Detalhes do Usuário</h2>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.nomeUsuario}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Mãe</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.nomeMae}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.dataNascimento}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.cpf}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.idade} anos</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.logradouro}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estabelecimento de Saúde</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.estabelecimentoSaude}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Situação</label>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getSituacaoColor(selectedUser.situacao)}`}>
                    {selectedUser.situacao}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUserDetails(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Editar Usuário
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Prontuário
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 py-2 px-4 text-xs text-gray-600 text-center">
        FastMedic Sistemas | © FastMedic | Versão 5.126.6.24402
      </div>
    </div>
  );
}
