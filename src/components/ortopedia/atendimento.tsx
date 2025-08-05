"use client";

import { useState } from "react";
import { 
  Bone, 
  Search,
  Stethoscope,
  ArrowLeft,
  Activity,
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
  Ruler,
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
  Star,
  AlertTriangle,
  Zap,
  Target,
  RotateCcw,
  Navigation
} from "lucide-react";

// Interface para paciente ortopédico
interface PacienteOrtopedico {
  id: string;
  nome: string;
  dataNascimento: string;
  idade: number;
  sexo: "M" | "F";
  cpf: string;
  cartaoSus: string;
  endereco: string;
  telefone: string;
  convenio: string;
  numeroConvenio?: string;
  profissao: string;
  atividade: string;
  dominancia: "Destro" | "Canhoto" | "Ambidestro";
}

export default function AtendimentoOrtopedia() {
  const [step, setStep] = useState<'busca' | 'consulta'>('busca');
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteOrtopedico | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pacientes: PacienteOrtopedico[] = [
    {
      id: "1",
      nome: "João Santos Silva",
      dataNascimento: "1980-03-25",
      idade: 44,
      sexo: "M",
      cpf: "123.456.789-00",
      cartaoSus: "123456789012345",
      endereco: "Rua dos Esportes, 456 - Centro",
      telefone: "(11) 99999-9999",
      convenio: "Unimed",
      numeroConvenio: "123456789",
      profissao: "Pedreiro",
      atividade: "Trabalho pesado com cargas",
      dominancia: "Destro"
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      dataNascimento: "1975-07-12",
      idade: 49,
      sexo: "F",
      cpf: "987.654.321-00",
      cartaoSus: "987654321098765",
      endereco: "Av. das Palmeiras, 789 - Jardim",
      telefone: "(11) 88888-8888",
      convenio: "Bradesco Saúde",
      numeroConvenio: "987654321",
      profissao: "Doméstica",
      atividade: "Serviços domésticos",
      dominancia: "Destro"
    },
    {
      id: "3",
      nome: "Carlos Eduardo Costa",
      dataNascimento: "1992-11-08",
      idade: 32,
      sexo: "M",
      cpf: "456.789.123-00",
      cartaoSus: "456789123456789",
      endereco: "Rua do Futebol, 321 - Vila Nova",
      telefone: "(11) 77777-7777",
      convenio: "SUS",
      profissao: "Jogador de Futebol",
      atividade: "Esporte profissional",
      dominancia: "Destro"
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cpf.includes(searchTerm) ||
    paciente.profissao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.atividade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (step === 'busca') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Bone className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Ortopedia e Traumatologia</h1>
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
                placeholder="Buscar por nome do paciente, CPF, profissão ou atividade..."
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
                        <Bone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{paciente.nome}</h3>
                        <p className="text-sm text-gray-600">
                          {paciente.idade} anos - {paciente.profissao}
                        </p>
                        <p className="text-sm text-gray-500">
                          {paciente.atividade} - {paciente.dominancia}
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
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Bone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">284</p>
                  <p className="text-sm text-gray-600">Pacientes Ativos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">32</p>
                  <p className="text-sm text-gray-600">Consultas Hoje</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">8</p>
                  <p className="text-sm text-gray-600">Emergências</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">23</p>
                  <p className="text-sm text-gray-600">Cirurgias Agendadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
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
                <p className="text-sm text-gray-600">Idade/Sexo</p>
                <p className="font-semibold text-gray-800">
                  {pacienteSelecionado.idade} anos - {pacienteSelecionado.sexo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Profissão</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionado.profissao}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dominância</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionado.dominancia}</p>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Atendimento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Anamnese e Exame */}
          <div className="lg:col-span-2 space-y-6">
            {/* Anamnese Ortopédica */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                Anamnese Ortopédica
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
                    placeholder="Tempo de evolução, mecanismo de trauma, características da dor..."
                  />
                </div>

                {/* Mecanismo de Trauma */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">Mecanismo de Trauma</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tipo de Trauma</label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="nao_traumatico">Não traumático</option>
                        <option value="trauma_direto">Trauma direto</option>
                        <option value="trauma_indireto">Trauma indireto</option>
                        <option value="trauma_torcional">Trauma torcional</option>
                        <option value="sobrecarga">Sobrecarga/Overuse</option>
                        <option value="acidente_trabalho">Acidente de trabalho</option>
                        <option value="acidente_transito">Acidente de trânsito</option>
                        <option value="atividade_esportiva">Atividade esportiva</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Data do Trauma</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Energia do Trauma</label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="baixa">Baixa energia</option>
                        <option value="alta">Alta energia</option>
                        <option value="muito_alta">Muito alta energia</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="primeiro_episodio" className="rounded" />
                      <label htmlFor="primeiro_episodio" className="text-sm text-gray-700">Primeiro episódio</label>
                    </div>
                  </div>
                </div>

                {/* Características da Dor */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">Características da Dor</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Intensidade (EVA 0-10)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tipo de Dor</label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="aguda">Aguda</option>
                        <option value="cronica">Crônica</option>
                        <option value="latenate">Latejante</option>
                        <option value="queimacao">Queimação</option>
                        <option value="choque">Choque</option>
                        <option value="pontada">Pontada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Irradiação</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Local de irradiação..."
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm text-gray-600 mb-1">Fatores de Melhora/Piora</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="O que melhora e o que piora a dor..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antecedentes Ortopédicos
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Cirurgias, fraturas, lesões prévias..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicamentos em Uso
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Anti-inflamatórios, analgésicos, outros..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Exame Físico Ortopédico */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Exame Físico Ortopédico
              </h3>

              {/* Inspeção */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Inspeção</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Postura/Marcha</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Alterações posturais, claudicação..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Deformidades</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Angulação, rotação, encurtamento..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Edema/Tumefação</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Localização e intensidade..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Sinais Flogísticos</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Rubor, calor, dor..."
                    />
                  </div>
                </div>
              </div>

              {/* Palpação */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Palpação</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pontos Dolorosos</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Localização específica..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Crepitação</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="ausente">Ausente</option>
                      <option value="presente">Presente</option>
                      <option value="grosseira">Grosseira</option>
                      <option value="fina">Fina</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Temperatura Local</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="normal">Normal</option>
                      <option value="aumentada">Aumentada</option>
                      <option value="diminuida">Diminuída</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobilidade */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Avaliação da Mobilidade</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Amplitude de Movimento Ativa</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Flexão: ° | Extensão: ° | Abdução: ° | Adução: °..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Amplitude de Movimento Passiva</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Flexão: ° | Extensão: ° | Abdução: ° | Adução: °..."
                    />
                  </div>
                </div>
              </div>

              {/* Força Muscular */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Força Muscular (Escala de Lovett 0-5)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Flexores</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">0-5</option>
                      <option value="0">0 - Paralisia</option>
                      <option value="1">1 - Contração palpável</option>
                      <option value="2">2 - Move sem gravidade</option>
                      <option value="3">3 - Move contra gravidade</option>
                      <option value="4">4 - Move contra resistência</option>
                      <option value="5">5 - Força normal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Extensores</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">0-5</option>
                      <option value="0">0 - Paralisia</option>
                      <option value="1">1 - Contração palpável</option>
                      <option value="2">2 - Move sem gravidade</option>
                      <option value="3">3 - Move contra gravidade</option>
                      <option value="4">4 - Move contra resistência</option>
                      <option value="5">5 - Força normal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Abdutores</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">0-5</option>
                      <option value="0">0 - Paralisia</option>
                      <option value="1">1 - Contração palpável</option>
                      <option value="2">2 - Move sem gravidade</option>
                      <option value="3">3 - Move contra gravidade</option>
                      <option value="4">4 - Move contra resistência</option>
                      <option value="5">5 - Força normal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Adutores</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">0-5</option>
                      <option value="0">0 - Paralisia</option>
                      <option value="1">1 - Contração palpável</option>
                      <option value="2">2 - Move sem gravidade</option>
                      <option value="3">3 - Move contra gravidade</option>
                      <option value="4">4 - Move contra resistência</option>
                      <option value="5">5 - Força normal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Testes Especiais */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Testes Especiais</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Testes Realizados</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Ex: McMurray, Lachman, Phalen, Tinel, etc..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Resultados dos Testes</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Positivo/Negativo para cada teste realizado..."
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
                    Hipótese Diagnóstica Principal
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
                      placeholder="M00.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Classificação (se aplicável)
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: AO, Neer, Garden..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exames Complementares Solicitados
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Radiografias, Ressonância Magnética, Tomografia, Ultrassom, exames laboratoriais..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tratamento Proposto
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="conservador" className="rounded" />
                      <label htmlFor="conservador" className="text-sm text-gray-700">Tratamento Conservador</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="cirurgico" className="rounded" />
                      <label htmlFor="cirurgico" className="text-sm text-gray-700">Tratamento Cirúrgico</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="fisioterapia" className="rounded" />
                      <label htmlFor="fisioterapia" className="text-sm text-gray-700">Fisioterapia</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="afastamento" className="rounded" />
                      <label htmlFor="afastamento" className="text-sm text-gray-700">Afastamento do Trabalho</label>
                    </div>
                  </div>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Descrição detalhada do tratamento proposto..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescrição Médica
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="1. Anti-inflamatório - dose - via - frequência - duração&#10;2. Analgésico - dose - via - frequência - duração&#10;3. Imobilização/órtese..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prognóstico
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="excelente">Excelente</option>
                      <option value="bom">Bom</option>
                      <option value="regular">Regular</option>
                      <option value="reservado">Reservado</option>
                      <option value="ruim">Ruim</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retorno
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="7">7 dias</option>
                      <option value="15">15 dias</option>
                      <option value="30">30 dias</option>
                      <option value="45">45 dias</option>
                      <option value="60">60 dias</option>
                      <option value="90">3 meses</option>
                      <option value="sn">Se necessário</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Informações Complementares */}
          <div className="space-y-6">
            {/* Escala de Dor */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Escala de Dor
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">7</p>
                  <p className="text-sm text-gray-600">EVA (0-10)</p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-600 h-3 rounded-full" style={{width: '70%'}}></div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="font-medium text-green-700">0-3</p>
                    <p className="text-green-600">Leve</p>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <p className="font-medium text-yellow-700">4-6</p>
                    <p className="text-yellow-600">Moderada</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <p className="font-medium text-red-700">7-10</p>
                    <p className="text-red-600">Intensa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacidade Funcional */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Capacidade Funcional
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">Atividades Básicas</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="text-sm text-yellow-700">Trabalho</span>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm text-red-700">Esportes</span>
                  <X className="h-4 w-4 text-red-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-sm text-blue-700">Lazer</span>
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Classificações */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Classificações
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-700">AO/OTA</p>
                  <p className="text-xs text-blue-600">Classificação de fraturas</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-700">Gustilo-Anderson</p>
                  <p className="text-xs text-green-600">Fraturas expostas</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-700">Neer</p>
                  <p className="text-xs text-purple-600">Fraturas do úmero proximal</p>
                </div>
              </div>
            </div>

            {/* Próximos Exames */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Seguimento
              </h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">Raio-X Controle</p>
                  <p className="text-xs text-gray-600">30 dias</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">Fisioterapia</p>
                  <p className="text-xs text-gray-600">Pós-agudo</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">Ressonância</p>
                  <p className="text-xs text-gray-600">Se não melhorar</p>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                Agendar Retorno
              </button>
            </div>

            {/* Histórico de Consultas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico
              </h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">15/07/2024</p>
                  <p className="text-xs text-gray-600">Entorse de tornozelo</p>
                  <p className="text-xs text-gray-500">Dr. Oliveira - CRM 12345</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">20/03/2024</p>
                  <p className="text-xs text-gray-600">Fratura de punho</p>
                  <p className="text-xs text-gray-500">Dr. Santos - CRM 54321</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">10/01/2024</p>
                  <p className="text-xs text-gray-600">Consulta preventiva</p>
                  <p className="text-xs text-gray-500">Dr. Silva - CRM 67890</p>
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
