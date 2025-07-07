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

export default handleExportPDF