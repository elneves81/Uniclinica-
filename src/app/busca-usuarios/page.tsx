"use client"

import { useState } from "react"
import { 
  Search, 
  User,
  FileText,
  Plus,
  Edit,
  Users,
  X,
  Eye
} from "lucide-react"

interface UserData {
  id: string
  nomeUsuario: string
  nomeMae: string
  dataNascimento: string
  cpf: string
  situacao: "COMPLETO" | "INCOMPLETO" | "PENDENTE"
  sexo: "M" | "F"
  idade: number
  logradouro: string
  estabelecimentoSaude: string
  segmento: string
  microArea: string
  equipe: string
  numero: string
  prontuario: string
}

export default function BuscaUsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [filterSituacao, setFilterSituacao] = useState<string>("TODOS")
  const [filterSexo, setFilterSexo] = useState<string>("TODOS")

  const mockUsers: UserData[] = [
    {
      id: "1",
      nomeUsuario: "Maria Silva Santos",
      nomeMae: "Ana Silva",
      dataNascimento: "15/03/1985",
      cpf: "123.456.789-01",
      situacao: "COMPLETO",
      sexo: "F",
      idade: 39,
      logradouro: "Rua das Flores, 123",
      estabelecimentoSaude: "UBS Centro",
      segmento: "URBANO",
      microArea: "01",
      equipe: "ESF Verde",
      numero: "123",
      prontuario: "2024001"
    },
    {
      id: "2",
      nomeUsuario: "João Carlos Oliveira",
      nomeMae: "Maria Oliveira",
      dataNascimento: "22/07/1978",
      cpf: "987.654.321-02",
      situacao: "INCOMPLETO",
      sexo: "M",
      idade: 46,
      logradouro: "Av. Principal, 456",
      estabelecimentoSaude: "UBS Norte",
      segmento: "URBANO",
      microArea: "02",
      equipe: "ESF Azul",
      numero: "456",
      prontuario: "2024002"
    },
    {
      id: "3",
      nomeUsuario: "Ana Beatriz Costa",
      nomeMae: "Beatriz Costa",
      dataNascimento: "08/12/1992",
      cpf: "456.789.123-03",
      situacao: "PENDENTE",
      sexo: "F",
      idade: 32,
      logradouro: "Rua Nova, 789",
      estabelecimentoSaude: "UBS Sul",
      segmento: "RURAL",
      microArea: "03",
      equipe: "ESF Amarela",
      numero: "789",
      prontuario: "2024003"
    }
  ]

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.cpf.includes(searchTerm) ||
                         user.prontuario.includes(searchTerm)
    
    const matchesSituacao = filterSituacao === "TODOS" || user.situacao === filterSituacao
    const matchesSexo = filterSexo === "TODOS" || user.sexo === filterSexo
    
    return matchesSearch && matchesSituacao && matchesSexo
  })

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "COMPLETO":
        return "bg-green-100 text-green-800"
      case "INCOMPLETO":
        return "bg-yellow-100 text-yellow-800"
      case "PENDENTE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Busca de Usuários
                </h1>
                <p className="text-sm text-gray-600">
                  Gerencie e pesquise usuários do sistema
                </p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesquisar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome, CPF ou Prontuário"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Situação
              </label>
              <select
                value={filterSituacao}
                onChange={(e) => setFilterSituacao(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="TODOS">Todos</option>
                <option value="COMPLETO">Completo</option>
                <option value="INCOMPLETO">Incompleto</option>
                <option value="PENDENTE">Pendente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sexo
              </label>
              <select
                value={filterSexo}
                onChange={(e) => setFilterSexo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="TODOS">Todos</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Resultados da Pesquisa ({filteredUsers.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prontuário
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.nomeUsuario}
                          </div>
                          <div className="text-sm text-gray-500">
                            Mãe: {user.nomeMae}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.cpf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.idade} anos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSituacaoColor(user.situacao)}`}>
                        {user.situacao}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.prontuario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-50" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50" title="Prontuário">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhum usuário encontrado
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros de pesquisa.
              </p>
            </div>
          )}
        </div>
      </div>

      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Detalhes do Usuário
              </h3>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.nomeUsuario}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Mãe
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.nomeMae}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.dataNascimento}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.cpf}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexo
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.sexo === 'M' ? 'Masculino' : 'Feminino'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.idade} anos
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.logradouro}, {selectedUser.numero}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estabelecimento de Saúde
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.estabelecimentoSaude}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Situação
                </label>
                <div className={`inline-flex px-3 py-2 rounded-lg text-sm font-medium ${getSituacaoColor(selectedUser.situacao)}`}>
                  {selectedUser.situacao}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prontuário
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">
                  {selectedUser.prontuario}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUserDetails(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Editar Usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
