## 1. Stack Tecnológica Definida

Conforme PRD, a stack mandatória é:

- **Backend:** Python 3.12+ (FastAPI)
- **Banco de Dados:** MongoDB 8.0+
- **Frontend:** React 19+ ou Vue.js 3.5+ (com Tailwind CSS)
- **IA/LLM:** Integração via OpenRouter
- **OCR/PDF:** PyMuPDF (nativo), Tesseract (scan)
- **Infra:** Execução Local (Sem Docker no momento)

## 2. Roteiro de Desenvolvimento (Roadmap)

O desenvolvimento será dividido em fases incrementais para garantir entregas contínuas e testáveis.

### Fase 0: Configuração e Infraestrutura

**Objetivo:** Ter o ambiente rodando (Hello World no Back e Front) com Banco de Dados conectado.

1. **Repositório:** Inicializar Git com estrutura monorepo ou `backend/` e `frontend/`.
2. **Banco de Dados:**
   - Instalar MongoDB Community Server localmente.
   - Instalar MongoDB Compass (opcional, para visualização).
3. **Backend Setup:**
   - Poetry ou `requirements.txt`.
   - Estrutura básica FastAPI (`app/main.py`, `app/core`, `app/api`).
   - Conexão com MongoDB (Motor ou Beanie).
4. **Frontend Setup:**
   - Vite + React (ou Vue) + Tailwind CSS.
   - Configuração de ESLint/Prettier.

### Fase 1: MVP - Core Backend & Autenticação

**Objetivo:** Usuários podem se cadastrar, logar e o sistema tem as entidades base.

1. **Modelagem de Dados (ODM):**
   - Implementar Schemas do PRD: `Usuario`, `Secretaria`, `ProcessoCompra`.
2. **Autenticação:**
   - JWT (OAuth2 com Password Flow).
   - Endpoints: `/auth/login`, `/auth/me`.
   - Middleware de proteção de rotas.
3. **CRUDs Básicos:**
   - Secretarias (Admin).
   - Usuários (Admin).

### Fase 2: MVP - Ingestão e Indexação

**Objetivo:** Upload de arquivos e busca textual simples.

1. **Upload API:** Endpoint para receber PDF/DOCX.
2. **Processamento (Worker/Background):**
   - Extração de texto com `PyMuPDF`.
   - Fallback para `Tesseract` se não houver texto extraível.
3. **Armazenamento:**
   - Salvar metadados no MongoDB (`DocumentoArquivo`).
   - Salvar arquivos em disco (pasta `uploads/` local).
4. **Busca (MongoDB Atlas Search ou Text Index):**
   - Criar índices de texto no MongoDB.
   - Endpoint `/search` com filtros básicos.

### Fase 3: MVP - Geração de Documentos

**Objetivo:** Gerar um DFD/ETP simples a partir de um formulário.

1. **Templates:** Criar sistema de templates (Jinja2 ou docxtpl).
2. **API de Geração:**
   - Endpoint que recebe JSON com dados do formulário.
   - Preenche o template e retorna PDF/DOCX.
3. **Frontend:**
   - Formulário "Wizard" para preenchimento guiado.
   - Visualização do documento gerado.

### Fase 4: V2 - Integrações Externas

**Objetivo:** Enriquecer o sistema com dados do PNCP e Preços.

1. **Clientes HTTP:** Criar wrappers para API do PNCP e API de Dados Abertos.
2. **Módulo de Pesquisa de Preços:**
   - Endpoint que busca termo no PNCP e retorna média/mediana.
   - Persistência dos resultados na entidade `PesquisaPreco`.

### Fase 5: V3 - IA e Workflow

**Objetivo:** Assistente inteligente e fluxo de aprovação.

1. **Integração LLM:** Cliente OpenRouter para chamadas de IA.
2. **Features de IA:**
   - "Melhorar Justificativa".
   - "Sugerir Itens".
3. **Workflow:** Implementar máquina de estados para aprovação (`Rascunho` -> `Analise` -> `Aprovado`).

---

## 3. Instruções Detalhadas para Início Imediato (Fase 0 e 1)

**Passo 1: Estrutura de Pastas**

/sipcp
/backend (FastAPI)
/frontend (Reack/Vite)
README.md

\*\*Passo 2: Configuração de Variáveis de Ambiente (`backend/.env`)

- Mongodb_url: mongodb://localhost:27017/sicp_db

**Passo 3: Dependências Backend (`backend/pyproject.toml`)**

- `fastapi`
- `uvicorn`
- `motor` (MongoDB Async)
- `pydantic`
- `pydantic-settings`
- `python-multipart` (Uploads)
- `pymupdf` (PDF)
- `passlib[bcrypt]` (Auth)
- `python-jose[cryptography]` (JWT)

**Passo 4: Dependências Frontend (`frontend/package.json`)**

- `react`, `react-dom`
- `react-router-dom`
- `axios` ou `tanstack-query`
- `tailwindcss`, `postcss`, `autoprefixer`
- `lucide-react` (Ícones)
- `shadcn/ui` (Recomendado para UI rápida)
