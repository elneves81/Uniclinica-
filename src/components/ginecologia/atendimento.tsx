"use client";

import { useState } from "react";
import { 
  Heart, 
  Search,
  Stethoscope,
  ArrowLeft,
  Baby,
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
  AlertTriangle
} from "lucide-react";

// Interface para paciente ginecológica
interface PacienteGinecologica {
  id: string;
  nome: string;
  dataNascimento: string;
  idade: number;
  sexo: "F";
  cpf: string;
  cartaoSus: string;
  endereco: string;
  telefone: string;
  convenio: string;
  numeroConvenio?: string;
  estadoCivil: string;
  profissao: string;
  escolaridade: string;
}

export default function AtendimentoGinecologia() {
  const [step, setStep] = useState<'busca' | 'consulta'>('busca');
  const [pacienteSelecionada, setPacienteSelecionada] = useState<PacienteGinecologica | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pacientes: PacienteGinecologica[] = [
    {
      id: "1",
      nome: "Maria Silva Santos",
      dataNascimento: "1990-05-15",
      idade: 34,
      sexo: "F",
      cpf: "123.456.789-00",
      cartaoSus: "123456789012345",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 99999-9999",
      convenio: "Unimed",
      numeroConvenio: "123456789",
      estadoCivil: "Casada",
      profissao: "Professora",
      escolaridade: "Superior Completo"
    },
    {
      id: "2",
      nome: "Ana Paula Costa",
      dataNascimento: "1988-08-22",
      idade: 36,
      sexo: "F",
      cpf: "987.654.321-00",
      cartaoSus: "987654321098765",
      endereco: "Av. Paulista, 1000 - Bela Vista",
      telefone: "(11) 88888-8888",
      convenio: "Bradesco Saúde",
      numeroConvenio: "987654321",
      estadoCivil: "Solteira",
      profissao: "Enfermeira",
      escolaridade: "Superior Completo"
    },
    {
      id: "3",
      nome: "Carla Fernandes",
      dataNascimento: "1995-12-10",
      idade: 29,
      sexo: "F",
      cpf: "456.789.123-00",
      cartaoSus: "456789123456789",
      endereco: "Rua Augusta, 500 - Consolação",
      telefone: "(11) 77777-7777",
      convenio: "SUS",
      estadoCivil: "Casada",
      profissao: "Advogada",
      escolaridade: "Superior Completo"
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cpf.includes(searchTerm) ||
    paciente.profissao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (step === 'busca') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-pink-100 p-3 rounded-lg">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Ginecologia e Obstetrícia</h1>
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
                placeholder="Buscar por nome da paciente, CPF ou profissão..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                    setPacienteSelecionada(paciente);
                    setStep('consulta');
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-pink-100 p-2 rounded-lg">
                        <Heart className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{paciente.nome}</h3>
                        <p className="text-sm text-gray-600">
                          {paciente.idade} anos - {paciente.profissao}
                        </p>
                        <p className="text-sm text-gray-500">
                          {paciente.estadoCivil} - {paciente.escolaridade}
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
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">342</p>
                  <p className="text-sm text-gray-600">Pacientes Ativas</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">28</p>
                  <p className="text-sm text-gray-600">Consultas Hoje</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Baby className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">15</p>
                  <p className="text-sm text-gray-600">Pré-natais</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">89%</p>
                  <p className="text-sm text-gray-600">Papanicolau em Dia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header com informações da paciente */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setStep('busca')}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar à busca
            </button>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                <Save className="h-4 w-4" />
                Salvar
              </button>
              <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
            </div>
          </div>

          {pacienteSelecionada && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Paciente</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionada.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Idade</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionada.idade} anos</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado Civil</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionada.estadoCivil}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Convênio</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionada.convenio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Atendimento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Anamnese e Exame */}
          <div className="lg:col-span-2 space-y-6">
            {/* Anamnese Ginecológica */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                Anamnese Ginecológica
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Queixa Principal
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva a queixa principal..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    História da Doença Atual
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={4}
                    placeholder="Tempo de evolução, características dos sintomas..."
                  />
                </div>

                {/* História Menstrual */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">História Menstrual</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Menarca (anos)</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Ciclo (dias)</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="28"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Duração (dias)</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">DUM</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Fluxo</label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="escasso">Escasso</option>
                        <option value="normal">Normal</option>
                        <option value="intenso">Intenso</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="dismenorreia" className="rounded" />
                      <label htmlFor="dismenorreia" className="text-sm text-gray-700">Dismenorreia</label>
                    </div>
                  </div>
                </div>

                {/* História Obstétrica */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">História Obstétrica</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Gesta</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Para</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Abortos</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cesárias</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Métodos Contraceptivos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método Contraceptivo Atual
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="">Selecione...</option>
                    <option value="nenhum">Nenhum</option>
                    <option value="preservativo">Preservativo</option>
                    <option value="anticoncepcional">Anticoncepcional Oral</option>
                    <option value="diu_cobre">DIU de Cobre</option>
                    <option value="diu_mirena">DIU Mirena</option>
                    <option value="implante">Implante</option>
                    <option value="injecao">Injeção</option>
                    <option value="laqueadura">Laqueadura</option>
                    <option value="vasectomia">Vasectomia (parceiro)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antecedentes Ginecológicos
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={3}
                      placeholder="Cirurgias, infecções, DSTs..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      História Familiar
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={3}
                      placeholder="Câncer ginecológico, mama, ovário..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Exame Físico Ginecológico */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Exame Físico
              </h3>

              {/* Sinais Vitais e Antropometria */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sinais Vitais e Antropometria</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">PA (mmHg)</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="120x80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="65.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Altura (cm)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="165"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">IMC</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="23.9"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Circunf. Abdom. (cm)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="80"
                    />
                  </div>
                </div>
              </div>

              {/* Exame das Mamas */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Exame das Mamas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Inspeção</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={2}
                      placeholder="Simétricas, sem retrações..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Palpação</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={2}
                      placeholder="Sem nódulos ou massas..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Mamilos</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Normais, sem secreção"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Linfonodos</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Não palpáveis"
                    />
                  </div>
                </div>
              </div>

              {/* Exame Pélvico */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Exame Pélvico</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Genitália Externa</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows={2}
                      placeholder="Normal, sem lesões..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Colo Uterino</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={2}
                        placeholder="Rosado, sem lesões..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Vagina</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={2}
                        placeholder="Rosada, sem lesões..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Corrimento</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={2}
                        placeholder="Fisiológico..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Útero (Toque Bimanual)</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={2}
                        placeholder="Anteversoflexão, tamanho normal..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Anexos</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={2}
                        placeholder="Não palpáveis..."
                      />
                    </div>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Z01.4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retorno
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="30">30 dias</option>
                      <option value="60">60 dias</option>
                      <option value="90">3 meses</option>
                      <option value="180">6 meses</option>
                      <option value="365">1 ano</option>
                      <option value="sn">Se necessário</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exames Solicitados
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={3}
                    placeholder="Papanicolau, ultrassom pélvico, exames laboratoriais..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescrição Médica
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={4}
                    placeholder="1. Medicamento - dose - via - frequência - duração&#10;2. Orientações específicas..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orientações Contraceptivas e Preventivas
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={3}
                    placeholder="Orientações sobre métodos contraceptivos, prevenção de DSTs, autoexame das mamas..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Informações Complementares */}
          <div className="space-y-6">
            {/* Screening e Prevenção */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Screening
              </h3>
              
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-700">Papanicolau</span>
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-xs text-green-600">Último: 15/01/2024</p>
                  <p className="text-xs text-green-600">Próximo: 15/01/2025</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-700">Mamografia</span>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-600">Idade: 34 anos</p>
                  <p className="text-xs text-blue-600">Indicada aos 40 anos</p>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-yellow-700">Ultrassom Pélvico</span>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <p className="text-xs text-yellow-600">Último: 20/06/2023</p>
                  <p className="text-xs text-yellow-600">Vencendo</p>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                Agendar Exame
              </button>
            </div>

            {/* Vacinas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Vacinação
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">HPV</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">Hepatite B</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="text-sm text-yellow-700">Influenza (anual)</span>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">COVID-19</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>

            {/* Ciclo Menstrual */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Ciclo Menstrual
              </h3>
              
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">28</p>
                  <p className="text-sm text-gray-600">Ciclo (dias)</p>
                </div>
                
                <div className="bg-pink-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-pink-700">DUM: 01/01/2024</p>
                  <p className="text-xs text-pink-600">Próxima menstruação prevista: 29/01/2024</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="font-medium text-blue-700">Duração</p>
                    <p className="text-blue-600">5 dias</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <p className="font-medium text-purple-700">Fluxo</p>
                    <p className="text-purple-600">Normal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico de Consultas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico
              </h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-pink-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">15/01/2024</p>
                  <p className="text-xs text-gray-600">Consulta de rotina</p>
                  <p className="text-xs text-gray-500">Dra. Silva - CRM 12345</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">20/06/2023</p>
                  <p className="text-xs text-gray-600">Papanicolau</p>
                  <p className="text-xs text-gray-500">Dra. Santos - CRM 54321</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">10/01/2023</p>
                  <p className="text-xs text-gray-600">Ultrassom pélvico</p>
                  <p className="text-xs text-gray-500">Dr. Costa - CRM 67890</p>
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
