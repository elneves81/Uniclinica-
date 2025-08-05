"use client";

import { useState } from "react";
import { 
  Baby, 
  Search,
  Stethoscope,
  ArrowLeft,
  Heart,
  Scale,
  FileText,
  Save,
  Printer,
  Calendar,
  ChevronRight,
  Clipboard,
  TrendingUp,
  Shield,
  Edit,
  Activity,
  Ruler,
  Thermometer,
  Plus,
  Eye,
  User,
  Clock,
  Phone,
  Check,
  X,
  History,
  Settings,
  Bell,
  Star
} from "lucide-react";

// Interface para paciente pediátrico
interface PacientePediatrico {
  id: string;
  nome: string;
  dataNascimento: string;
  idade: {
    anos: number;
    meses: number;
    dias: number;
  };
  sexo: "M" | "F";
  nomeMae: string;
  nomePai: string;
  cpf: string;
  cartaoSus: string;
  endereco: string;
  telefone: string;
  convenio: string;
  numeroConvenio?: string;
}

export default function AtendimentoPediatrico() {
  const [step, setStep] = useState<'busca' | 'consulta'>('busca');
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacientePediatrico | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pacientes: PacientePediatrico[] = [
    {
      id: "1",
      nome: "Ana Carolina Silva",
      dataNascimento: "2020-03-15",
      idade: { anos: 4, meses: 8, dias: 20 },
      sexo: "F",
      nomeMae: "Maria Silva Santos",
      nomePai: "João Carlos Silva",
      cpf: "123.456.789-00",
      cartaoSus: "123456789012345",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 99999-9999",
      convenio: "Unimed",
      numeroConvenio: "123456789"
    },
    {
      id: "2",
      nome: "Pedro Henrique Costa",
      dataNascimento: "2018-07-22",
      idade: { anos: 6, meses: 5, dias: 14 },
      sexo: "M",
      nomeMae: "Ana Paula Costa",
      nomePai: "Ricardo Costa",
      cpf: "987.654.321-00",
      cartaoSus: "987654321098765",
      endereco: "Av. Principal, 456 - Jardim",
      telefone: "(11) 88888-8888",
      convenio: "SUS",
    },
    {
      id: "3",
      nome: "Sofia Martins",
      dataNascimento: "2021-11-10",
      idade: { anos: 2, meses: 9, dias: 25 },
      sexo: "F",
      nomeMae: "Carla Martins",
      nomePai: "Felipe Martins",
      cpf: "456.789.123-00",
      cartaoSus: "456789123456789",
      endereco: "Rua da Esperança, 789 - Vila Nova",
      telefone: "(11) 77777-7777",
      convenio: "Bradesco Saúde",
      numeroConvenio: "987654321"
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.nomeMae.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cpf.includes(searchTerm)
  );

  if (step === 'busca') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Baby className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Atendimento Pediátrico</h1>
                <p className="text-gray-600">Sistema de Prontuário Eletrônico - Conforme CFM</p>
              </div>
            </div>
          </div>

          {/* Busca de Pacientes */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Paciente
            </h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por nome do paciente, responsável ou CPF..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid gap-4">
              {filteredPacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setPacienteSelecionado(paciente);
                    setStep('consulta');
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Baby className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{paciente.nome}</h3>
                        <p className="text-sm text-gray-600">
                          {paciente.idade.anos} anos, {paciente.idade.meses} meses
                        </p>
                        <p className="text-sm text-gray-500">
                          Responsável: {paciente.nomeMae}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{paciente.convenio}</p>
                      <p className="text-sm text-gray-500">{paciente.telefone}</p>
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Baby className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">247</p>
                  <p className="text-sm text-gray-600">Pacientes Ativos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">15</p>
                  <p className="text-sm text-gray-600">Consultas Hoje</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">23</p>
                  <p className="text-sm text-gray-600">Vacinas Pendentes</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">98%</p>
                  <p className="text-sm text-gray-600">Taxa de Crescimento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header com informações do paciente */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setStep('busca')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar à busca
            </button>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Salvar
              </button>
              <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
            </div>
          </div>

          {pacienteSelecionado && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Paciente</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionado.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Idade</p>
                <p className="font-semibold text-gray-800">
                  {pacienteSelecionado.idade.anos}a {pacienteSelecionado.idade.meses}m
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Responsável</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionado.nomeMae}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Convênio</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionado.convenio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Atendimento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Anamnese e Exame */}
          <div className="lg:col-span-2 space-y-6">
            {/* Anamnese */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                Anamnese
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Queixa Principal
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva a queixa principal..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    História da Doença Atual
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Descreva a história da doença atual..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antecedentes Patológicos
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Antecedentes patológicos..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antecedentes Familiares
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Antecedentes familiares..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Exame Físico */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Exame Físico
              </h3>

              {/* Sinais Vitais */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sinais Vitais</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Temperatura (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="36.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">FC (bpm)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">FR (ipm)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">PA (mmHg)</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="110x70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">SatO2 (%)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="98"
                    />
                  </div>
                </div>
              </div>

              {/* Antropometria */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Antropometria
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Altura (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">PC (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="48.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">IMC</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15.4"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Exame Segmentar */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Exame Segmentar</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Cabeça e Pescoço</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Normocefálico, ausculta normal..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Cardiovascular</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Ritmo cardíaco regular..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Respiratório</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Murmúrio vesicular presente..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Abdome</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Plano, flácido, indolor..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnóstico e Conduta */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Diagnóstico e Conduta
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnóstico Principal
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o diagnóstico principal..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CID-10
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Z00.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retorno
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="15">15 dias</option>
                      <option value="30">30 dias</option>
                      <option value="60">60 dias</option>
                      <option value="90">90 dias</option>
                      <option value="sn">Se necessário</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescrição Médica
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="1. Medicamento - dose - via - frequência - duração&#10;2. Orientações gerais..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orientações aos Pais/Responsáveis
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Orientações específicas para os responsáveis..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Informações Complementares */}
          <div className="space-y-6">
            {/* Curvas de Crescimento */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Crescimento
              </h3>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Peso</p>
                  <p className="text-lg font-bold text-green-800">P50 - Normal</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">Altura</p>
                  <p className="text-lg font-bold text-blue-800">P75 - Acima da média</p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">Perímetro Cefálico</p>
                  <p className="text-lg font-bold text-purple-800">P50 - Normal</p>
                </div>
              </div>
            </div>

            {/* Calendário Vacinal */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Situação Vacinal
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">BCG</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">Hepatite B</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="text-sm text-yellow-700">Tríplice Viral</span>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm text-red-700">DTP</span>
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                Registrar Vacina
              </button>
            </div>

            {/* Histórico de Consultas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <History className="h-5 w-5" />
                Últimas Consultas
              </h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">15/07/2024</p>
                  <p className="text-xs text-gray-600">Consulta de rotina</p>
                  <p className="text-xs text-gray-500">Dr. Silva - CRM 12345</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">20/05/2024</p>
                  <p className="text-xs text-gray-600">Vacinação</p>
                  <p className="text-xs text-gray-500">Enf. Maria - COREN 67890</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">10/03/2024</p>
                  <p className="text-xs text-gray-600">Resfriado comum</p>
                  <p className="text-xs text-gray-500">Dr. Santos - CRM 54321</p>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2">
                <Eye className="h-4 w-4" />
                Ver Histórico Completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
