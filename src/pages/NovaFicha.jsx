import React, { useState } from "react";
import { Paciente } from "../entities/Paciente";
import { Consulta } from "../entities/Consulta";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { Save, FileText, User, Heart, Stethoscope, Smile, Activity, Baby, SmilePlus, Apple, Edit3 } from "lucide-react";

import CampoSimNao from "../components/CampoSimNao.jsx";
import MapaDental from "../components/MapaDental.jsx";
import HistoricoConsultas from "../components/HistoricoConsultas.jsx";

export default function NovaFicha() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome_crianca: "",
    data_nascimento: "",
    idade: "",
    endereco: "",
    bairro: "",
    cep: "",
    cidade: "",
    cel: "",
    
    // Dados dos pais
    nome_mae: "",
    idade_mae: "",
    profissao_mae: "",
    nome_pai: "",
    idade_pai: "",
    profissao_pai: "",
    
    // Motivo da consulta
    motivo_consulta: "",
    alteracao_gestacao: "",
    
    // Necessidades especiais
    necessidade_especial: null,
    qual_necessidade: "",
    comprometimento_coordenacao: null,
    qual_coordenacao: "",
    comprometimento_visual: null,
    qual_visual: "",
    comprometimento_comunicacao: null,
    qual_comunicacao: "",
    
    // Comportamento
    reacao_contrariado: "",
    reacao_profissionais: "",
    
    // Histórico médico
    sofreu_cirurgia: null,
    qual_cirurgia: "",
    alteracoes_sanguineas: null,
    problemas_respiratorios: null,
    problemas_hepaticos: null,
    cardiopatias: null,
    problemas_gastricos: null,
    alergias_medicamento: "",
    alergias_alimentar: "",
    alergias_respiratoria: "",
    tratamentos_atuais: "",
    
    // Higiene bucal
    escova_usa: "",
    creme_dental: "",
    anos_primeira_consulta: "",
    tratamento_anterior: "",
    tomou_anestesia: null,
    higiene_bucal: "",
    vezes_dia_higiene: "",
    gengiva_sangra: null,
    extracoes_dentarias: null,
    escova_lingua: null,
    usa_fio_dental: null,
    
    // Alimentação
    alimentacao_notas: "",
    
    // Tratamentos
    fonoaudiologia: null,
    fisioterapia: null,
    psicologia: null,
    psiquiatrico: null,
    psiquiatrico_to: null,
    outro_tratamento: "",
    
    // Outros
    portador_ist: "",
    mama_peito: null,
    mamou_peito: null,
    ate_quando_mamou: "",
    toma_mamadeira: null,
    tomou_mamadeira: null,
    ate_quando_mamadeira: "",
    engasga_vomita: "",
    chupa_dedo: "",
    chupa_chupeta: "",
    outros_habitos: "",
    range_dentes: "",
    foi_dentista: null,
    qual_dentista: "",
    
    // Mapa dental
    mapa_dental: [],
    
    // Responsável
    responsavel_nome: "",
    informacoes_verdadeiras: false,
    informacoes_adicionais: ""
  });

  const [consulta, setConsulta] = useState({
    data_atendimento: new Date().toISOString().split('T')[0],
    peso: "",
    observacoes: "",
    procedimentos: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConsultaChange = (field, value) => {
    setConsulta(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMapaDentalChange = (dentes) => {
    setFormData(prev => ({
      ...prev,
      mapa_dental: dentes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Criar paciente
      const paciente = await Paciente.create(formData);
      
      // Criar consulta se houver dados
      if (consulta.peso || consulta.observacoes || consulta.procedimentos) {
        await Consulta.create({
          ...consulta,
          paciente_id: paciente.id
        });
      }

      navigate(createPageUrl(`VisualizarFicha?id=${paciente.id}`));
    } catch (error) {
      console.error("Erro ao salvar ficha:", error);
      alert("Erro ao salvar ficha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <FileText className="w-8 h-8 text-emerald-300" />
            <h1 className="text-3xl font-bold text-white">Nova Ficha de Anamnese</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados Pessoais */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-6 h-6 text-emerald-300" />
                <h2 className="text-xl font-semibold text-white">Dados Pessoais</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Nome da Criança *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome_crianca}
                    onChange={(e) => handleInputChange('nome_crianca', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Nome completo da criança"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={formData.data_nascimento}
                    onChange={(e) => handleInputChange('data_nascimento', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={formData.idade}
                    onChange={(e) => handleInputChange('idade', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Idade em anos"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Celular
                  </label>
                  <input
                    type="tel"
                    value={formData.cel}
                    onChange={(e) => handleInputChange('cel', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Rua, número, complemento"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={formData.bairro}
                    onChange={(e) => handleInputChange('bairro', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Bairro"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Cidade"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>

            {/* Mapa Dental */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Smile className="w-6 h-6 text-emerald-300" />
                <h2 className="text-xl font-semibold text-white">Mapa Dental</h2>
              </div>
              <MapaDental 
                selectedTeeth={formData.mapa_dental}
                onSelectionChange={handleMapaDentalChange}
              />
            </div>

            {/* Primeira Consulta */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Stethoscope className="w-6 h-6 text-emerald-300" />
                <h2 className="text-xl font-semibold text-white">Primeira Consulta</h2>
              </div>
              
              <HistoricoConsultas 
                consulta={consulta}
                onChange={handleConsultaChange}
                isFirstConsulta={true}
              />
            </div>

            {/* Responsável */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Edit3 className="w-6 h-6 text-emerald-300" />
                <h2 className="text-xl font-semibold text-white">Responsável</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Nome do Responsável *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.responsavel_nome}
                    onChange={(e) => handleInputChange('responsavel_nome', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Nome completo do responsável"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-100 text-sm font-medium mb-2">
                    Informações Adicionais
                  </label>
                  <textarea
                    value={formData.informacoes_adicionais}
                    onChange={(e) => handleInputChange('informacoes_adicionais', e.target.value)}
                    rows={3}
                    className="w-full glass-input rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Informações adicionais relevantes..."
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="informacoes_verdadeiras"
                    checked={formData.informacoes_verdadeiras}
                    onChange={(e) => handleInputChange('informacoes_verdadeiras', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 bg-white/10 border-white/20 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="informacoes_verdadeiras" className="text-emerald-100 text-sm">
                    Declaro que todas as informações prestadas são verdadeiras
                  </label>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(createPageUrl("Dashboard"))}
                className="px-6 py-3 glass-button rounded-lg text-white font-medium hover:bg-white/20 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar Ficha</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}