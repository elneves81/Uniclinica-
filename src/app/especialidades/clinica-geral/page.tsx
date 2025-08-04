"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Stethoscope, Heart, Activity, Thermometer, Weight, Ruler } from "lucide-react";

interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
}

interface GeneralRecord {
  vitalSigns: VitalSigns;
  chiefComplaint: string;
  currentIllness: string;
  physicalExam: string;
  chronicDiseases: string[];
  familyHistory: string;
  socialHistory: string;
  diagnosis: string;
  treatment: string;
  followUp: string;
}

export default function ClinicaGeral() {
  const [activeTab, setActiveTab] = useState("consulta");
  const [record, setRecord] = useState<GeneralRecord>({
    vitalSigns: {
      bloodPressure: "",
      heartRate: 0,
      temperature: 0,
      weight: 0,
      height: 0
    },
    chiefComplaint: "",
    currentIllness: "",
    physicalExam: "",
    chronicDiseases: [],
    familyHistory: "",
    socialHistory: "",
    diagnosis: "",
    treatment: "",
    followUp: ""
  });

  const tabs = [
    { id: "consulta", label: "Nova Consulta", icon: Stethoscope },
    { id: "historico", label: "Histórico", icon: Activity },
    { id: "pacientes", label: "Pacientes", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            {/* Cabeçalho */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Stethoscope className="w-6 h-6 mr-2" />
                Clínica Médica Geral
              </h1>
              <p className="text-gray-600">Atendimento clínico geral e medicina preventiva</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Conteúdo das Tabs */}
            {activeTab === "consulta" && (
              <div className="space-y-6">
                {/* Sinais Vitais */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Sinais Vitais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pressão Arterial
                      </label>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-500 mr-2" />
                        <input
                          type="text"
                          placeholder="120/80"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={record.vitalSigns.bloodPressure}
                          onChange={(e) => setRecord({
                            ...record,
                            vitalSigns: { ...record.vitalSigns, bloodPressure: e.target.value }
                          })}
                        />
                        <span className="ml-2 text-sm text-gray-500">mmHg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Freq. Cardíaca
                      </label>
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 text-red-500 mr-2" />
                        <input
                          type="number"
                          placeholder="72"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={record.vitalSigns.heartRate || ""}
                          onChange={(e) => setRecord({
                            ...record,
                            vitalSigns: { ...record.vitalSigns, heartRate: Number(e.target.value) }
                          })}
                        />
                        <span className="ml-2 text-sm text-gray-500">bpm</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Temperatura
                      </label>
                      <div className="flex items-center">
                        <Thermometer className="w-4 h-4 text-orange-500 mr-2" />
                        <input
                          type="number"
                          step="0.1"
                          placeholder="36.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={record.vitalSigns.temperature || ""}
                          onChange={(e) => setRecord({
                            ...record,
                            vitalSigns: { ...record.vitalSigns, temperature: Number(e.target.value) }
                          })}
                        />
                        <span className="ml-2 text-sm text-gray-500">°C</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Peso
                      </label>
                      <div className="flex items-center">
                        <Weight className="w-4 h-4 text-blue-500 mr-2" />
                        <input
                          type="number"
                          step="0.1"
                          placeholder="70.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={record.vitalSigns.weight || ""}
                          onChange={(e) => setRecord({
                            ...record,
                            vitalSigns: { ...record.vitalSigns, weight: Number(e.target.value) }
                          })}
                        />
                        <span className="ml-2 text-sm text-gray-500">kg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Altura
                      </label>
                      <div className="flex items-center">
                        <Ruler className="w-4 h-4 text-green-500 mr-2" />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="1.75"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={record.vitalSigns.height || ""}
                          onChange={(e) => setRecord({
                            ...record,
                            vitalSigns: { ...record.vitalSigns, height: Number(e.target.value) }
                          })}
                        />
                        <span className="ml-2 text-sm text-gray-500">m</span>
                      </div>
                    </div>
                  </div>

                  {/* IMC calculado automaticamente */}
                  {record.vitalSigns.weight > 0 && record.vitalSigns.height > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-sm font-medium text-blue-800">
                        IMC: {(record.vitalSigns.weight / (record.vitalSigns.height * record.vitalSigns.height)).toFixed(1)} kg/m²
                        <span className="ml-2 text-blue-600">
                          {(() => {
                            const imc = record.vitalSigns.weight / (record.vitalSigns.height * record.vitalSigns.height);
                            if (imc < 18.5) return "(Abaixo do peso)";
                            if (imc < 25) return "(Peso normal)";
                            if (imc < 30) return "(Sobrepeso)";
                            return "(Obesidade)";
                          })()}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Anamnese */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Anamnese</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Queixa Principal
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Descreva a queixa principal do paciente..."
                        value={record.chiefComplaint}
                        onChange={(e) => setRecord({ ...record, chiefComplaint: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        História da Doença Atual
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Descreva a evolução dos sintomas..."
                        value={record.currentIllness}
                        onChange={(e) => setRecord({ ...record, currentIllness: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          História Familiar
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Doenças familiares relevantes..."
                          value={record.familyHistory}
                          onChange={(e) => setRecord({ ...record, familyHistory: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          História Social
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Hábitos, profissão, estilo de vida..."
                          value={record.socialHistory}
                          onChange={(e) => setRecord({ ...record, socialHistory: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exame Físico */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exame Físico</h3>
                  
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descrição detalhada do exame físico por sistemas..."
                    value={record.physicalExam}
                    onChange={(e) => setRecord({ ...record, physicalExam: e.target.value })}
                  />
                </div>

                {/* Diagnóstico e Conduta */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnóstico e Conduta</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diagnóstico
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Diagnóstico clínico..."
                        value={record.diagnosis}
                        onChange={(e) => setRecord({ ...record, diagnosis: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tratamento
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Prescrição e orientações terapêuticas..."
                        value={record.treatment}
                        onChange={(e) => setRecord({ ...record, treatment: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Orientações de Retorno
                      </label>
                      <textarea
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Quando retornar, sintomas de alerta..."
                        value={record.followUp}
                        onChange={(e) => setRecord({ ...record, followUp: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Salvar Prontuário
                  </button>
                </div>
              </div>
            )}

            {activeTab === "historico" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Consultas</h3>
                <p className="text-gray-500">Funcionalidade em desenvolvimento...</p>
              </div>
            )}

            {activeTab === "pacientes" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pacientes da Clínica Geral</h3>
                <p className="text-gray-500">Funcionalidade em desenvolvimento...</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
