# Tio Paulo - Sistema de Ficha de Anamnese

Sistema web desenvolvido em React para gerenciamento de fichas de anamnese odontológica infantil. O sistema permite criar, visualizar e exportar fichas completas de pacientes, incluindo dados pessoais, histórico médico, higiene bucal, mapa dental e histórico de consultas.

## 🚀 Funcionalidades

- ✅ **Dashboard**: Visualização geral dos pacientes cadastrados
- ✅ **Nova Ficha**: Formulário completo para cadastro de novos pacientes
- ✅ **Visualizar Ficha**: Exibição detalhada dos dados do paciente
- ✅ **Exportação PDF**: Geração de PDF com identidade visual profissional
- ✅ **Mapa Dental**: Interface interativa para seleção de dentes
- ✅ **Histórico de Consultas**: Registro de atendimentos
- ✅ **Busca e Filtros**: Sistema de busca por pacientes
- ✅ **Design Responsivo**: Interface adaptável para desktop e mobile
- ✅ **Integração Supabase**: Banco de dados em nuvem

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0** - Framework principal
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **jsPDF** - Geração de PDF
- **html2canvas** - Captura de tela para PDF
- **date-fns** - Manipulação de datas
- **Supabase** - Banco de dados e autenticação
- **Vite** - Build tool

## 📁 Estrutura do Projeto

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
│   │   ├── utils.js
│   │   └── supabase.js
│   ├── pages/
│   │   ├── Consultas.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NovaFicha.jsx
│   │   └── VisualizarFicha.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── migrations/
│       └── create_tables.sql
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Conta no Supabase

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd tio-paulo-app
   ```

2. **Instalar dependências**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configurar Supabase**
   - Crie uma conta em [supabase.com](https://supabase.com)
   - Crie um novo projeto
   - Copie `.env.example` para `.env`
   - Configure as variáveis de ambiente:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Executar migrações do banco**
   - No painel do Supabase, vá para SQL Editor
   - Execute o conteúdo do arquivo `supabase/migrations/create_tables.sql`

5. **Executar em desenvolvimento**
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

6. **Acessar o sistema**
   - Abra o navegador em: `http://localhost:5173`

## 🗄️ Banco de Dados

### Estrutura de Dados

#### Tabela Pacientes
- Dados pessoais (nome, idade, endereço, etc.)
- Dados dos pais
- Histórico médico completo
- Necessidades especiais
- Higiene bucal
- Mapa dental
- Hábitos alimentares

#### Tabela Consultas
- Data do atendimento
- Peso do paciente
- Observações
- Procedimentos realizados

### Chaves de Armazenamento Local (Fallback)

- `tio_paulo_pacientes` - Array de pacientes
- `tio_paulo_consultas` - Array de consultas

## 🚀 Deploy

### Opção 1: Netlify (Recomendado)

1. **Build do projeto**
   ```bash
   npm run build
   ```

2. **Deploy no Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `dist/` ou conecte repositório Git
   - Configure as variáveis de ambiente no painel do Netlify

### Opção 2: Vercel

1. **Deploy via CLI**
   ```bash
   npx vercel
   ```

2. **Configure as variáveis de ambiente no painel do Vercel**

### Opção 3: Servidor Próprio

1. **Build do projeto**
   ```bash
   npm run build
   ```

2. **Configurar servidor web (Nginx)**
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

## 📄 Funcionalidades Detalhadas

### Exportação de PDF

- **Tecnologia**: jsPDF
- **Recursos**: Formatação profissional, múltiplas páginas
- **Qualidade**: Otimizado para impressão
- **Formato**: A4 com quebras de página automáticas

### Mapa Dental

- **Dentes de leite**: 55-51, 61-65, 85-81, 71-75
- **Dentes permanentes**: 18-11, 21-28, 48-41, 31-38
- **Interação**: Click para selecionar/deselecionar
- **Visual**: Feedback visual com cores

### Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Tailwind CSS padrão
- **Touch**: Suporte completo a touch events

## 🔧 Manutenção e Suporte

### Backup de Dados

```javascript
// Exportar dados do localStorage (fallback)
const pacientes = localStorage.getItem('tio_paulo_pacientes');
const consultas = localStorage.getItem('tio_paulo_consultas');

// Importar dados
localStorage.setItem('tio_paulo_pacientes', dadosBackup.pacientes);
localStorage.setItem('tio_paulo_consultas', dadosBackup.consultas);
```

### Logs e Debug

- Console do navegador para debug
- React DevTools para desenvolvimento
- Network tab para análise de performance
- Supabase Dashboard para monitoramento do banco

## 🔒 Segurança

### Dados em Nuvem

- Dados armazenados no Supabase (PostgreSQL)
- Row Level Security (RLS) habilitado
- Autenticação via Supabase Auth
- HTTPS obrigatório em produção

### Validação

- Validação client-side nos formulários
- Campos obrigatórios marcados
- Sanitização básica de inputs
- Políticas de segurança no banco

## ⚡ Performance

### Otimizações Implementadas

- **Lazy Loading**: Componentes carregados sob demanda
- **Code Splitting**: Vite otimização automática
- **CSS Purging**: Tailwind CSS tree-shaking
- **Bundle Optimization**: Chunks separados por funcionalidade

### Métricas Esperadas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~600KB gzipped

## 🐛 Troubleshooting

### Problemas Comuns

1. **PDF não gera**
   - Verificar se jsPDF carregou
   - Checar console para erros
   - Testar em navegador diferente

2. **Dados não salvam**
   - Verificar conexão com Supabase
   - Checar variáveis de ambiente
   - Verificar políticas RLS

3. **Layout quebrado**
   - Verificar se Tailwind CSS carregou
   - Checar console para erros CSS
   - Testar em modo incógnito

### Logs Úteis

```javascript
// Verificar conexão Supabase
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

// Verificar dados locais (fallback)
console.log('Pacientes:', localStorage.getItem('tio_paulo_pacientes'));
console.log('Consultas:', localStorage.getItem('tio_paulo_consultas'));
```

## 📞 Contato e Suporte

Para dúvidas técnicas ou suporte:

- Documentação: Este arquivo
- Issues: Reportar problemas via GitHub
- Email: suporte@tiopaulo.com

---

**Versão**: 2.0.0  
**Última atualização**: Janeiro 2025  
**Desenvolvido por**: Manus AI