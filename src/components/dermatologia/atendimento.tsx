"use client";

import { useState } from "react";
import { 
  Scan, 
  Search,
  Stethoscope,
  ArrowLeft,
  Camera,
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
  Sun,
  Palette,
  Microscope,
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

// Interface para paciente dermatológico
interface PacienteDermatologico {
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
  ocupacao: string;
  fototipos: "I" | "II" | "III" | "IV" | "V" | "VI";
}

export default function AtendimentoDermatologia() {
  const [step, setStep] = useState<'busca' | 'consulta'>('busca');
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteDermatologico | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pacientes: PacienteDermatologico[] = [
    {
      id: "1",
      nome: "Carlos Eduardo Santos",
      dataNascimento: "1985-06-20",
      idade: 39,
      sexo: "M",
      cpf: "123.456.789-00",
      cartaoSus: "123456789012345",
      endereco: "Rua das Acácias, 456 - Centro",
      telefone: "(11) 99999-9999",
      convenio: "Unimed",
      numeroConvenio: "123456789",
      ocupacao: "Engenheiro Civil",
      fototipos: "III"
    },
    {
      id: "2",
      nome: "Maria Clara Oliveira",
      dataNascimento: "1992-03-15",
      idade: 32,
      sexo: "F",
      cpf: "987.654.321-00",
      cartaoSus: "987654321098765",
      endereco: "Av. Paulista, 1000 - Bela Vista",
      telefone: "(11) 88888-8888",
      convenio: "Bradesco Saúde",
      numeroConvenio: "987654321",
      ocupacao: "Professora",
      fototipos: "II"
    },
    {
      id: "3",
      nome: "João Silva Costa",
      dataNascimento: "1978-11-30",
      idade: 45,
      sexo: "M",
      cpf: "456.789.123-00",
      cartaoSus: "456789123456789",
      endereco: "Rua Augusta, 500 - Consolação",
      telefone: "(11) 77777-7777",
      convenio: "SUS",
      ocupacao: "Agricultor",
      fototipos: "IV"
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cpf.includes(searchTerm) ||
    paciente.ocupacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFototipoLabel = (fototipo: string) => {
    const tipos = {
      "I": "Tipo I - Sempre queima, nunca bronzeia",
      "II": "Tipo II - Sempre queima, bronzeia pouco",
      "III": "Tipo III - Queima moderadamente, bronzeia gradualmente",
      "IV": "Tipo IV - Queima pouco, sempre bronzeia",
      "V": "Tipo V - Raramente queima, bronzeia intensamente",
      "VI": "Tipo VI - Nunca queima, sempre bronzeia"
    };
    return tipos[fototipo as keyof typeof tipos];
  };

  if (step === 'busca') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Scan className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Atendimento Dermatológico</h1>
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
                placeholder="Buscar por nome do paciente, CPF ou ocupação..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Scan className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{paciente.nome}</h3>
                        <p className="text-sm text-gray-600">
                          {paciente.idade} anos - {paciente.ocupacao}
                        </p>
                        <p className="text-sm text-gray-500">
                          Fototipo: {getFototipoLabel(paciente.fototipos)}
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
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Scan className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">156</p>
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
                  <p className="text-2xl font-bold text-gray-800">23</p>
                  <p className="text-sm text-gray-600">Consultas Hoje</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Sun className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                  <p className="text-sm text-gray-600">Câncer de Pele</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Microscope className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">8</p>
                  <p className="text-sm text-gray-600">Biópsias Pendentes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header com informações do paciente */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setStep('busca')}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar à busca
            </button>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
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
                <p className="text-sm text-gray-600">Ocupação</p>
                <p className="font-semibold text-gray-800">{pacienteSelecionado.ocupacao}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fototipo</p>
                <p className="font-semibold text-gray-800">Tipo {pacienteSelecionado.fototipos}</p>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Atendimento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Anamnese e Exame */}
          <div className="lg:col-span-2 space-y-6">
            {/* Anamnese Dermatológica */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                Anamnese Dermatológica
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Queixa Principal
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva a queixa principal..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    História da Doença Atual
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={4}
                    placeholder="Tempo de evolução, características da lesão, fatores desencadeantes..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antecedentes Dermatológicos
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                      placeholder="Dermatites, alergias, câncer de pele..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      História Familiar
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                      placeholder="Câncer de pele, dermatoses hereditárias..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exposição Solar
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={2}
                      placeholder="Hábitos de exposição solar, proteção..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicamentos em Uso
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={2}
                      placeholder="Medicações tópicas e sistêmicas..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Exame Dermatológico */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Exame Dermatológico
              </h3>

              {/* Exame Geral da Pele */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Exame Geral da Pele</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Tipo de Pele</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="seca">Seca</option>
                      <option value="normal">Normal</option>
                      <option value="oleosa">Oleosa</option>
                      <option value="mista">Mista</option>
                      <option value="sensivel">Sensível</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Coloração</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Normal, ictérica, cianótica..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Textura</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Lisa, áspera, descamativa..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Turgor e Elasticidade</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="normal">Normal</option>
                      <option value="diminuido">Diminuído</option>
                      <option value="aumentado">Aumentado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lesões Específicas */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Lesões Específicas</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Localização</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Cabeça, tronco, membros superiores, membros inferiores..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tipo de Lesão</label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="macula">Mácula</option>
                        <option value="papula">Pápula</option>
                        <option value="nodulo">Nódulo</option>
                        <option value="vesicula">Vesícula</option>
                        <option value="bolha">Bolha</option>
                        <option value="pustula">Pústula</option>
                        <option value="placa">Placa</option>
                        <option value="tumor">Tumor</option>
                        <option value="ulcera">Úlcera</option>
                        <option value="cicatriz">Cicatriz</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tamanho (cm)</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Ex: 2x3 cm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cor</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Eritematosa, pigmentada..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Características da Lesão</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                      placeholder="Bordas, superfície, consistência, mobilidade, sensibilidade..."
                    />
                  </div>
                </div>
              </div>

              {/* Dermatoscopia */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Microscope className="h-4 w-4" />
                  Dermatoscopia
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="dermatoscopia" className="rounded" />
                    <label htmlFor="dermatoscopia" className="text-sm text-gray-700">Exame dermatoscópico realizado</label>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Achados Dermatoscópicos</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                      placeholder="Padrão reticular, globular, vascular, estruturas específicas..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Score de Risco (ABCDE, 7-point checklist)</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Pontuação e interpretação..."
                    />
                  </div>
                </div>
              </div>

              {/* Anexos e Mapeamento */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Documentação Fotográfica
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="fotos" className="rounded" />
                    <label htmlFor="fotos" className="text-sm text-gray-700">Fotografias clínicas realizadas</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="mapeamento" className="rounded" />
                    <label htmlFor="mapeamento" className="text-sm text-gray-700">Mapeamento corporal total</label>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Observações sobre Documentação</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={2}
                      placeholder="Número de lesões mapeadas, áreas de atenção especial..."
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="L00.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retorno
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="7">7 dias</option>
                      <option value="15">15 dias</option>
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
                    Exames Complementares
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Biópsia, exames laboratoriais, cultura, etc..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescrição Médica
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={4}
                    placeholder="1. Medicamento tópico - aplicação - frequência - duração&#10;2. Medicamento sistêmico - dose - via - frequência - duração&#10;3. Orientações gerais..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orientações e Cuidados
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Fotoproteção, cuidados com a pele, higiene, etc..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Informações Complementares */}
          <div className="space-y-6">
            {/* Classificação de Fitzpatrick */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Fototipo
              </h3>
              
              <div className="space-y-3">
                {["I", "II", "III", "IV", "V", "VI"].map((tipo) => (
                  <div key={tipo} className={`p-3 rounded-lg border-2 ${
                    pacienteSelecionado?.fototipos === tipo 
                      ? "border-orange-500 bg-orange-50" 
                      : "border-gray-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tipo {tipo}</span>
                      {pacienteSelecionado?.fototipos === tipo && (
                        <Check className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {getFototipoLabel(tipo).split(" - ")[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fatores de Risco */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Fatores de Risco
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm text-red-700">Exposição Solar Excessiva</span>
                  <X className="h-4 w-4 text-red-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="text-sm text-yellow-700">História Familiar</span>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-green-700">Fotoproteção Adequada</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
              
              <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                Avaliar Fatores
              </button>
            </div>

            {/* Próximos Exames */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Acompanhamento
              </h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-orange-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">Próxima Consulta</p>
                  <p className="text-xs text-gray-600">3 meses</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">Mapeamento Corporal</p>
                  <p className="text-xs text-gray-600">Anual</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">Dermatoscopia Digital</p>
                  <p className="text-xs text-gray-600">6 meses</p>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2">
                <Eye className="h-4 w-4" />
                Ver Histórico
              </button>
            </div>

            {/* Histórico de Consultas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico
              </h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-orange-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">20/06/2024</p>
                  <p className="text-xs text-gray-600">Dermatite seborreica</p>
                  <p className="text-xs text-gray-500">Dr. Silva - CRM 12345</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">15/03/2024</p>
                  <p className="text-xs text-gray-600">Mapeamento corporal</p>
                  <p className="text-xs text-gray-500">Dr. Santos - CRM 54321</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm font-medium text-gray-800">10/12/2023</p>
                  <p className="text-xs text-gray-600">Consulta preventiva</p>
                  <p className="text-xs text-gray-500">Dr. Silva - CRM 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
