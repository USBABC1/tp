import React, { useState, useEffect } from "react";
import { Paciente } from "../entities/Paciente";
import { Consulta } from "../entities/Consulta";
import { Link } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { Plus, Search, Calendar, User, Eye, Edit } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [consultasData, pacientesData] = await Promise.all([
        Consulta.list("-data_atendimento"),
        Paciente.list()
      ]);
      setConsultas(consultasData);
      setPacientes(pacientesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPacienteNome = (pacienteId) => {
    const paciente = pacientes.find(p => p.id === pacienteId);
    return paciente ? paciente.nome_crianca : "Paciente não encontrado";
  };

  const filteredConsultas = consultas.filter(consulta => {
    const pacienteNome = getPacienteNome(consulta.paciente_id).toLowerCase();
    return pacienteNome.includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Carregando consultas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Consultas</h1>
            <p className="text-emerald-100">Histórico de atendimentos</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Total de Consultas</p>
                <p className="text-2xl font-bold text-white">{consultas.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Este Mês</p>
                <p className="text-2xl font-bold text-white">
                  {consultas.filter(c => {
                    const consulta = new Date(c.data_atendimento);
                    const now = new Date();
                    return consulta.getMonth() === now.getMonth() && 
                           consulta.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Pacientes Únicos</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(consultas.map(c => c.paciente_id)).size}
                </p>
              </div>
              <User className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-input rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Consultas List */}
        <div className="space-y-4">
          {filteredConsultas.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? "Nenhuma consulta encontrada" : "Nenhuma consulta registrada"}
              </h3>
              <p className="text-white/70 mb-6">
                {searchTerm 
                  ? "Tente buscar com outros termos" 
                  : "As consultas aparecerão aqui quando forem registradas"
                }
              </p>
            </div>
          ) : (
            filteredConsultas.map((consulta) => (
              <div key={consulta.id} className="glass-card rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {getPacienteNome(consulta.paciente_id)}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-emerald-100">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(consulta.data_atendimento), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      
                      {consulta.peso && (
                        <div className="flex items-center space-x-2 text-emerald-100">
                          <span className="w-4 h-4 text-center">⚖️</span>
                          <span>{consulta.peso} kg</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-white/60">
                        <span className="w-4 h-4 text-center">🕒</span>
                        <span>
                          Registrado em {format(new Date(consulta.created_date), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                    
                    {consulta.observacoes && (
                      <div className="mt-3">
                        <p className="text-emerald-200 text-sm font-medium">Observações:</p>
                        <p className="text-white/80 text-sm">{consulta.observacoes}</p>
                      </div>
                    )}
                    
                    {consulta.procedimentos && (
                      <div className="mt-2">
                        <p className="text-emerald-200 text-sm font-medium">Procedimentos:</p>
                        <p className="text-white/80 text-sm">{consulta.procedimentos}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Link
                      to={createPageUrl(`VisualizarFicha?id=${consulta.paciente_id}`)}
                      className="glass-button px-4 py-2 rounded-lg text-white font-medium hover:bg-emerald-500/30 transition-all text-center flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver Ficha</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}