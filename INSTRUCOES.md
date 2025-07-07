# Tio Paulo - Sistema de Ficha de Anamnese

## Descrição do Projeto

Sistema web desenvolvido em React para gerenciamento de fichas de anamnese odontológica infantil. O sistema permite criar, visualizar e exportar fichas completas de pacientes, incluindo dados pessoais, histórico médico, higiene bucal, mapa dental e histórico de consultas.

## Funcionalidades

- ✅ **Dashboard**: Visualização geral dos pacientes cadastrados
- ✅ **Nova Ficha**: Formulário completo para cadastro de novos pacientes
- ✅ **Visualizar Ficha**: Exibição detalhada dos dados do paciente
- ✅ **Exportação PDF**: Geração de PDF com identidade visual profissional
- ✅ **Mapa Dental**: Interface interativa para seleção de dentes
- ✅ **Histórico de Consultas**: Registro de atendimentos
- ✅ **Busca e Filtros**: Sistema de busca por pacientes
- ✅ **Design Responsivo**: Interface adaptável para desktop e mobile

## Tecnologias Utilizadas

- **React 19.1.0** - Framework principal
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **jsPDF** - Geração de PDF
- **html2canvas** - Captura de tela para PDF
- **date-fns** - Manipulação de datas
- **Vite** - Build tool

## Estrutura do Projeto

```
tio-paulo-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── LOGOTIOPAULO.png
│   ├── components/
│   │   ├── CampoSimNao.jsx
│   │   ├── HistoricoConsultas.jsx
│   │   ├── Layout.jsx
│   │   └── MapaDental.jsx
│   ├── entities/
│   │   ├── Consulta.js
│   │   └── Paciente.js
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── Consultas.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NovaFicha.jsx
│   │   └── VisualizarFicha.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos para Instalação

1. **Extrair o projeto**
   ```bash
   unzip tio-paulo-app.zip
   cd tio-paulo-app
   ```

2. **Instalar dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Executar em desenvolvimento**
   ```bash
   pnpm run dev
   # ou
   npm run dev
   ```

4. **Acessar o sistema**
   - Abra o navegador em: `http://localhost:5173`

## Banco de Dados

### Armazenamento Local

O sistema utiliza **localStorage** do navegador para persistência de dados. Não requer configuração de banco de dados externo.

### Estrutura de Dados

#### Entidade Paciente
```javascript
{
  id: string,
  nome_crianca: string,
  data_nascimento: string,
  idade: number,
  endereco: string,
  bairro: string,
  cep: string,
  cidade: string,
  cel: string,
  nome_mae: string,
  idade_mae: number,
  profissao_mae: string,
  nome_pai: string,
  idade_pai: number,
  profissao_pai: string,
  motivo_consulta: string,
  alteracao_gestacao: string,
  // ... outros campos da anamnese
  mapa_dental: number[],
  responsavel_nome: string,
  informacoes_verdadeiras: boolean,
  created_date: string,
  updated_date: string
}
```

#### Entidade Consulta
```javascript
{
  id: string,
  paciente_id: string,
  data_atendimento: string,
  peso: number,
  observacoes: string,
  procedimentos: string,
  created_date: string,
  updated_date: string
}
```

### Chaves do localStorage

- `tio_paulo_pacientes` - Array de pacientes
- `tio_paulo_consultas` - Array de consultas

## Deploy em Produção

### Opção 1: Build Local + Hospedagem Estática

1. **Gerar build de produção**
   ```bash
   pnpm run build
   # ou
   npm run build
   ```

2. **Deploy da pasta `dist/`**
   - Hospedar a pasta `dist/` em qualquer servidor web estático
   - Exemplos: Netlify, Vercel, GitHub Pages, Apache, Nginx

### Opção 2: Netlify (Recomendado)

1. **Fazer upload do projeto**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta do projeto ou conecte repositório Git

2. **Configurações de build**
   ```
   Build command: pnpm run build
   Publish directory: dist
   ```

### Opção 3: Vercel

1. **Deploy via CLI**
   ```bash
   npx vercel
   ```

2. **Ou via interface web**
   - Acesse [vercel.com](https://vercel.com)
   - Importe o projeto

### Opção 4: Servidor Próprio

1. **Configurar servidor web**
   ```nginx
   server {
       listen 80;
       server_name seu-dominio.com;
       root /caminho/para/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Configurações Importantes

### Variáveis de Ambiente

Não são necessárias variáveis de ambiente para funcionamento básico.

### Configuração de Rota

Para SPAs (Single Page Applications), configure o servidor para redirecionar todas as rotas para `index.html`.

### HTTPS

Recomendado para produção, especialmente para funcionalidades de localStorage.

## Funcionalidades Detalhadas

### Exportação de PDF

- **Tecnologia**: jsPDF + html2canvas
- **Recursos**: Logo automático, formatação profissional, múltiplas páginas
- **Qualidade**: Alta resolução (scale: 2)
- **Formato**: A4 otimizado

### Mapa Dental

- **Dentes de leite**: 55-51, 61-65, 85-81, 71-75
- **Dentes permanentes**: 18-11, 21-28, 48-41, 31-38
- **Interação**: Click para selecionar/deselecionar
- **Visual**: Feedback visual com cores

### Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Tailwind CSS padrão
- **Touch**: Suporte completo a touch events

## Manutenção e Suporte

### Backup de Dados

```javascript
// Exportar dados
const pacientes = localStorage.getItem('tio_paulo_pacientes');
const consultas = localStorage.getItem('tio_paulo_consultas');

// Importar dados
localStorage.setItem('tio_paulo_pacientes', dadosBackup.pacientes);
localStorage.setItem('tio_paulo_consultas', dadosBackup.consultas);
```

### Limpeza de Dados

```javascript
// Limpar todos os dados
localStorage.removeItem('tio_paulo_pacientes');
localStorage.removeItem('tio_paulo_consultas');
```

### Logs e Debug

- Console do navegador para debug
- React DevTools para desenvolvimento
- Network tab para análise de performance

## Segurança

### Dados Locais

- Dados armazenados apenas no navegador do usuário
- Não há transmissão de dados sensíveis
- Recomendado backup regular dos dados

### Validação

- Validação client-side nos formulários
- Campos obrigatórios marcados
- Sanitização básica de inputs

## Performance

### Otimizações Implementadas

- **Lazy Loading**: Componentes carregados sob demanda
- **Memoização**: React.memo em componentes pesados
- **Bundle Splitting**: Vite otimização automática
- **CSS Purging**: Tailwind CSS tree-shaking

### Métricas Esperadas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~500KB gzipped

## Troubleshooting

### Problemas Comuns

1. **PDF não gera**
   - Verificar se html2canvas carregou
   - Checar console para erros
   - Testar em navegador diferente

2. **Dados não salvam**
   - Verificar se localStorage está habilitado
   - Checar quota de armazenamento
   - Limpar cache do navegador

3. **Layout quebrado**
   - Verificar se Tailwind CSS carregou
   - Checar console para erros CSS
   - Testar em modo incógnito

### Logs Úteis

```javascript
// Verificar dados salvos
console.log('Pacientes:', localStorage.getItem('tio_paulo_pacientes'));
console.log('Consultas:', localStorage.getItem('tio_paulo_consultas'));

// Verificar quota localStorage
console.log('Quota:', navigator.storage?.estimate());
```

## Contato e Suporte

Para dúvidas técnicas ou suporte:

- Documentação: Este arquivo
- Issues: Reportar problemas via GitHub (se aplicável)
- Email: [seu-email@dominio.com]

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2025  
**Desenvolvido por**: Manus AI

