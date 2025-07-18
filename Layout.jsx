import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { FileText, Users, Calendar, Settings } from "lucide-react";
import logoTioPaulo from "../assets/LOGOTIOPAULO.png";
import '../App.css';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Header */}
      <header className="glass-card rounded-none border-x-0 border-t-0 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center glass-card">
                <img 
                  src={logoTioPaulo} 
                  alt="Tio Paulo Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Tio Paulo</h1>
                <p className="text-emerald-100 text-sm">Ficha de Anamnese</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-2">
              <Link 
                to={createPageUrl("Dashboard")} 
                className={`glass-button px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 ${
                  location.pathname === createPageUrl("Dashboard") ? 'bg-white/30' : ''
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Pacientes</span>
              </Link>
              <Link 
                to={createPageUrl("NovaFicha")} 
                className={`glass-button px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 ${
                  location.pathname === createPageUrl("NovaFicha") ? 'bg-white/30' : ''
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Nova Ficha</span>
              </Link>
              <Link 
                to={createPageUrl("Consultas")} 
                className={`glass-button px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 ${
                  location.pathname === createPageUrl("Consultas") ? 'bg-white/30' : ''
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Consultas</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}

