import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Paciente } from "../entities/Paciente.js";
import { Consulta } from "../entities/Consulta.js";
import { createPageUrl } from "../lib/utils.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Heart,
  Stethoscope,
  Smile,
  FileText,
  Plus
} from "lucide-react";
import jsPDF from "jspdf";

export default function VisualizarFicha() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pacienteId = searchParams.get("id");
  
  const [paciente, setPaciente] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (pacienteId) {
      loadData();
    }
  }, [pacienteId]);

  const loadData = async () => {
    try {
      const [pacienteData, consultasData] = await Promise.all([
        Paciente.getById(pacienteId),
        Consulta.getByPacienteId(pacienteId)
      ]);
      
      setPaciente(pacienteData);
      setConsultas(consultasData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatarSimNao = (valor) => {
    if (valor === true) return "Sim";
    if (valor === false) return "Não";
    return "Não informado";
  };

const handleExportPDF = async () => {
     setIsExporting(true);
     try {
      // Criar PDF diretamente sem captura de tela
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Dimensões da página A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;
      
      // Função para adicionar nova página se necessário
      const checkPageBreak = (requiredHeight) => {
        if (yPosition + requiredHeight > pdfHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
      };
      
      // Função para adicionar texto com quebra de linha
      const addText = (text, x, y, maxWidth = pdfWidth - 20) => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return lines.length * 5; // Altura aproximada por linha
      };
      
      // Cabeçalho
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Tio Paulo - Ficha de Anamnese', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(14);
      pdf.text(`Paciente: ${paciente.nome_crianca}`, 20, yPosition);
      yPosition += 15;
      
      // Dados Pessoais
      checkPageBreak(30);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('DADOS PESSOAIS', 20, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      const dadosPessoais = [
        `Nome: ${paciente.nome_crianca}`,
        `Data de Nascimento: ${paciente.data_nascimento ? format(new Date(paciente.data_nascimento), "dd/MM/yyyy", { locale: ptBR }) : "Não informado"}`,
        `Idade: ${paciente.idade || "Não informado"} anos`,
        `Celular: ${paciente.cel || "Não informado"}`,
        `Endereço: ${paciente.endereco || "Não informado"}`,
        `Bairro: ${paciente.bairro || "Não informado"}`,
        `Cidade: ${paciente.cidade || "Não informado"}`,
        `CEP: ${paciente.cep || "Não informado"}`
      ];
      
      dadosPessoais.forEach(item => {
        checkPageBreak(6);
        pdf.text(item, 20, yPosition);
        yPosition += 5;
      });
      
      yPosition += 5;
      
      // Dados dos Pais
      checkPageBreak(25);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(12);
      pdf.text('DADOS DOS PAIS', 20, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      const dadosPais = [
        `Mãe: ${paciente.nome_mae || "Não informado"}`,
        `Idade da Mãe: ${paciente.idade_mae || "Não informado"}`,
        `Profissão da Mãe: ${paciente.profissao_mae || "Não informado"}`,
        `Pai: ${paciente.nome_pai || "Não informado"}`,
        `Idade do Pai: ${paciente.idade_pai || "Não informado"}`,
        `Profissão do Pai: ${paciente.profissao_pai || "Não informado"}`
      ];
      
      dadosPais.forEach(item => {
        checkPageBreak(6);
        pdf.text(item, 20, yPosition);
        yPosition += 5;
      });
      
      yPosition += 5;
      
      // Motivo da Consulta
      checkPageBreak(20);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(12);
      pdf.text('MOTIVO DA CONSULTA', 20, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      if (paciente.motivo_consulta) {
        const motivoHeight = addText(`Motivo: ${paciente.motivo_consulta}`, 20, yPosition);
        yPosition += motivoHeight + 3;
      }
      
      if (paciente.alteracao_gestacao) {
        checkPageBreak(10);
        const alteracaoHeight = addText(`Alterações na gestação: ${paciente.alteracao_gestacao}`, 20, yPosition);
        yPosition += alteracaoHeight + 3;
      }
      
      yPosition += 5;
      
      // Histórico Médico
      checkPageBreak(30);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(12);
      pdf.text('HISTÓRICO MÉDICO', 20, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      const historicoMedico = [
        `Sofreu cirurgia: ${formatarSimNao(paciente.sofreu_cirurgia)}${paciente.qual_cirurgia ? ` - ${paciente.qual_cirurgia}` : ''}`,
        `Alterações sanguíneas: ${formatarSimNao(paciente.alteracoes_sanguineas)}`,
        `Problemas respiratórios: ${formatarSimNao(paciente.problemas_respiratorios)}`,
        `Problemas hepáticos: ${formatarSimNao(paciente.problemas_hepaticos)}`,
        `Cardiopatias: ${formatarSimNao(paciente.cardiopatias)}`,
        `Problemas gástricos: ${formatarSimNao(paciente.problemas_gastricos)}`,
        `Alergias medicamentos: ${paciente.alergias_medicamento || "Não informado"}`,
        `Alergias alimentares: ${paciente.alergias_alimentar || "Não informado"}`,
        `Alergias respiratórias: ${paciente.alergias_respiratoria || "Não informado"}`
      ];
      
      historicoMedico.forEach(item => {
        checkPageBreak(6);
        pdf.text(item, 20, yPosition);
        yPosition += 5;
      });
      
      if (paciente.tratamentos_atuais) {
        checkPageBreak(10);
        const tratamentosHeight = addText(`Tratamentos atuais: ${paciente.tratamentos_atuais}`, 20, yPosition);
        yPosition += tratamentosHeight + 3;
      }
      
      yPosition += 5;
      
      // Higiene Bucal
      checkPageBreak(25);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(12);
      pdf.text('HIGIENE BUCAL', 20, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      const higieneBucal = [
        `Escova utilizada: ${paciente.escova_usa || "Não informado"}`,
        `Creme dental: ${paciente.creme_dental || "Não informado"}`,
        `Quem faz higiene: ${paciente.higiene_bucal || "Não informado"}`,
        `Vezes por dia: ${paciente.vezes_dia_higiene || "Não informado"}`,
        `Tomou anestesia: ${formatarSimNao(paciente.tomou_anestesia)}`,
        `Gengiva sangra: ${formatarSimNao(paciente.gengiva_sangra)}`,
        `Extrações dentárias: ${formatarSimNao(paciente.extracoes_dentarias)}`,
        `Escova a língua: ${formatarSimNao(paciente.escova_lingua)}`,
        `Usa fio dental: ${formatarSimNao(paciente.usa_fio_dental)}`
      ];
      
      higieneBucal.forEach(item => {
        checkPageBreak(6);
        pdf.text(item, 20, yPosition);
        yPosition += 5;
      });
      
      yPosition += 5;
      
      // Mapa Dental
      if (paciente.mapa_dental && paciente.mapa_dental.length > 0) {
        checkPageBreak(15);
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(12);
        pdf.text('MAPA DENTAL', 20, yPosition);
        yPosition += 8;
        
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(10);
        pdf.text(`Dentes com problemas: ${paciente.mapa_dental.join(', ')}`, 20, yPosition);
        yPosition += 10;
      }
      
      // Consultas
      if (consultas.length > 0) {
        checkPageBreak(20);
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(12);
        pdf.text('HISTÓRICO DE CONSULTAS', 20, yPosition);
        yPosition += 8;
        
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(10);
        
        consultas.forEach((consulta, index) => {
          checkPageBreak(8);
          const dataConsulta = format(new Date(consulta.data_atendimento), "dd/MM/yyyy", { locale: ptBR });
          pdf.text(`${index + 1}. Data: ${dataConsulta} - Peso: ${consulta.peso}kg`, 20, yPosition);
          yPosition += 5;
          
          if (consulta.observacoes) {
            checkPageBreak(6);
            const obsHeight = addText(`   Observações: ${consulta.observacoes}`, 20, yPosition);
            yPosition += obsHeight + 2;
          }
        });
        
        yPosition += 5;
      }
      
      // Responsável
      checkPageBreak(15);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(12);
      pdf.text('RESPONSÁVEL', 20, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      pdf.text(`Nome: ${paciente.responsavel_nome || "Não informado"}`, 20, yPosition);
      yPosition += 5;
      
      const declaracao = paciente.informacoes_verdadeiras ? "✓" : "✗";
      pdf.text(`${declaracao} Declaro que todas as informações prestadas são verdadeiras`, 20, yPosition);
      
      // Rodapé
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Tio Paulo - Ficha de Anamnese - Página ${i} de ${pageCount}`, 20, pdfHeight - 10);
        pdf.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR })}`, pdfWidth - 60, pdfHeight - 10);
      }
      
      // Salvar PDF
      pdf.save(`ficha_${paciente.nome_crianca.replace(/\s+/g, '_')}.pdf`);
      
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Carregando ficha...</p>
        </div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-12 text-center">
          <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Paciente não encontrado</h3>
          <p className="text-white/70 mb-6">O paciente solicitado não foi encontrado.</p>
          <Link
            to={createPageUrl("Dashboard")}
            className="glass-button px-6 py-3 rounded-lg text-white font-medium hover:bg-emerald-500/30 transition-all inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Link
              to={createPageUrl("Dashboard")}
              className="glass-button p-2 rounded-lg text-white hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">{paciente.nome_crianca}</h1>
              <p className="text-emerald-100">Ficha de Anamnese</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="glass-button px-4 py-2 rounded-lg text-white font-medium hover:bg-emerald-500/30 transition-all flex items-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exportando...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Exportar PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-6 h-6 text-emerald-300" />
            <h2 className="text-xl font-semibold text-white">Dados Pessoais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-emerald-200 text-sm font-medium">Nome</p>
                <p className="text-white">{paciente.nome_crianca}</p>
              </div>
              
              {paciente.data_nascimento && (
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Data de Nascimento</p>
                  <p className="text-white">
                    {format(new Date(paciente.data_nascimento), "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              )}
              
              {paciente.idade && (
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Idade</p>
                  <p className="text-white">{paciente.idade} anos</p>
                </div>
              )}
              
              {paciente.cel && (
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Celular</p>
                  <p className="text-white flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{paciente.cel}</span>
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {paciente.endereco && (
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Endereço</p>
                  <p className="text-white flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>
                      {paciente.endereco}
                      {paciente.bairro && `, ${paciente.bairro}`}
                      {paciente.cidade && `, ${paciente.cidade}`}
                      {paciente.cep && ` - ${paciente.cep}`}
                    </span>
                  </p>
                </div>
              )}
              
              {paciente.responsavel_nome && (
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Responsável</p>
                  <p className="text-white">{paciente.responsavel_nome}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dados dos Pais */}
        {(paciente.nome_mae || paciente.nome_pai) && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="w-6 h-6 text-emerald-300" />
              <h2 className="text-xl font-semibold text-white">Dados dos Pais</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paciente.nome_mae && (
                <div className="space-y-3">
                  <h3 className="text-emerald-200 font-medium">Mãe</h3>
                  <div className="space-y-2">
                    <p className="text-white">{paciente.nome_mae}</p>
                    {paciente.idade_mae && (
                      <p className="text-white/80 text-sm">{paciente.idade_mae} anos</p>
                    )}
                    {paciente.profissao_mae && (
                      <p className="text-white/80 text-sm">{paciente.profissao_mae}</p>
                    )}
                  </div>
                </div>
              )}
              
              {paciente.nome_pai && (
                <div className="space-y-3">
                  <h3 className="text-emerald-200 font-medium">Pai</h3>
                  <div className="space-y-2">
                    <p className="text-white">{paciente.nome_pai}</p>
                    {paciente.idade_pai && (
                      <p className="text-white/80 text-sm">{paciente.idade_pai} anos</p>
                    )}
                    {paciente.profissao_pai && (
                      <p className="text-white/80 text-sm">{paciente.profissao_pai}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Motivo da Consulta */}
        {paciente.motivo_consulta && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Stethoscope className="w-6 h-6 text-emerald-300" />
              <h2 className="text-xl font-semibold text-white">Motivo da Consulta</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-emerald-200 text-sm font-medium mb-2">Motivo</p>
                <p className="text-white">{paciente.motivo_consulta}</p>
              </div>
              
              {paciente.alteracao_gestacao && (
                <div>
                  <p className="text-emerald-200 text-sm font-medium mb-2">Alterações na Gestação</p>
                  <p className="text-white">{paciente.alteracao_gestacao}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mapa Dental */}
        {paciente.mapa_dental && paciente.mapa_dental.length > 0 && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Smile className="w-6 h-6 text-emerald-300" />
              <h2 className="text-xl font-semibold text-white">Mapa Dental</h2>
            </div>
            
            <div>
              <p className="text-emerald-200 text-sm font-medium mb-2">Dentes com Problemas</p>
              <p className="text-white">{paciente.mapa_dental.join(", ")}</p>
            </div>
          </div>
        )}

        {/* Histórico de Consultas */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-emerald-300" />
              <h2 className="text-xl font-semibold text-white">Histórico de Consultas</h2>
            </div>
          </div>
          
          {consultas.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/70">Nenhuma consulta registrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultas.map((consulta) => (
                <div key={consulta.id} className="glass-card rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-emerald-300" />
                      <span className="text-white font-medium">
                        {format(new Date(consulta.data_atendimento), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    {consulta.peso && (
                      <span className="text-emerald-200 text-sm">Peso: {consulta.peso}kg</span>
                    )}
                  </div>
                  
                  {consulta.observacoes && (
                    <div className="mb-3">
                      <p className="text-emerald-200 text-sm font-medium mb-1">Observações</p>
                      <p className="text-white/80 text-sm">{consulta.observacoes}</p>
                    </div>
                  )}
                  
                  {consulta.procedimentos && (
                    <div>
                      <p className="text-emerald-200 text-sm font-medium mb-1">Procedimentos</p>
                      <p className="text-white/80 text-sm">{consulta.procedimentos}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}