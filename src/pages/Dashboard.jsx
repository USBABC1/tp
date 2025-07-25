import React, { useState, useEffect } from "react";
import { Paciente } from "../entities/Paciente.js";
import { Link } from "react-router-dom";
import { createPageUrl } from "../lib/utils.js";
import { Plus, Search, FileText, Calendar, User, Phone } from "lucide-react";

export default function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      const data = await Paciente.list();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome_crianca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Carregando pacientes...</p>
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
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-emerald-100">Gerencie seus pacientes</p>
          </div>
          <Link
            to={createPageUrl("NovaFicha")}
            className="glass-button px-6 py-3 rounded-lg text-white font-medium hover:bg-emerald-500/30 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nova Ficha</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Total de Pacientes</p>
                <p className="text-2xl font-bold text-white">{pacientes.length}</p>
              </div>
              <User className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Fichas Completas</p>
                <p className="text-2xl font-bold text-white">
                  {pacientes.filter(p => p.responsavel_nome && p.motivo_consulta).length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Este Mês</p>
                <p className="text-2xl font-bold text-white">
                  {pacientes.filter(p => {
                    const created = new Date(p.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && 
                           created.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-input rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Pacientes List */}
        <div className="space-y-4">
          {filteredPacientes.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <User className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
              </h3>
              <p className="text-white/70 mb-6">
                {searchTerm 
                  ? "Tente buscar com outros termos" 
                  : "Comece criando uma nova ficha de paciente"
                }
              </p>
              {!searchTerm && (
                <Link
                  to={createPageUrl("NovaFicha")}
                  className="glass-button px-6 py-3 rounded-lg text-white font-medium hover:bg-emerald-500/30 transition-all inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Criar Nova Ficha</span>
                </Link>
              )}
            </div>
          ) : (
            filteredPacientes.map((paciente) => (
              <div key={paciente.id} className="glass-card rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {paciente.nome_crianca}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {paciente.idade && (
                        <div className="flex items-center space-x-2 text-emerald-100">
                          <User className="w-4 h-4" />
                          <span>{paciente.idade} anos</span>
                        </div>
                      )}
                      
                      {paciente.cel && (
                        <div className="flex items-center space-x-2 text-emerald-100">
                          <Phone className="w-4 h-4" />
                          <span>{paciente.cel}</span>
                        </div>
                      )}
                      
                      {paciente.responsavel_nome && (
                        <div className="flex items-center space-x-2 text-emerald-100">
                          <User className="w-4 h-4" />
                          <span>Resp: {paciente.responsavel_nome}</span>
                        </div>
                      )}
                    </div>
                    
                    {paciente.motivo_consulta && (
                      <div className="mt-3">
                        <p className="text-emerald-200 text-sm font-medium">Motivo da consulta:</p>
                        <p className="text-white/80 text-sm">{paciente.motivo_consulta}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Link
                      to={createPageUrl(`VisualizarFicha?id=${paciente.id}`)}
                      className="glass-button px-4 py-2 rounded-lg text-white font-medium hover:bg-emerald-500/30 transition-all text-center"
                    >
                      Ver Ficha
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