# **SIPCP – Sistema Inteligente de Planejamento de Compras Públicas (DFD, ETP, TR)**

## **1. Visão Geral do Produto**

A plataforma tem como objetivo **automatizar, padronizar e acelerar** o processo de elaboração dos documentos obrigatórios do planejamento de compras públicas conforme a Lei 14.133/2021: **Documento de Formalização da Demanda (DFD)**, **Estudo Técnico Preliminar (ETP)** e **Termo de Referência (TR)**.

O sistema deve integrar **inteligência artificial**, **busca em bases públicas**, **indexação de documentos internos** e **automação de geração documental**, reduzindo retrabalho, garantindo conformidade legal e aumentando a eficiência operacional do setor de planejamento.

---

## **2. Objetivos do Produto**

### **2.1 Objetivos Principais**

- Reduzir drasticamente o tempo de elaboração de DFD, ETP e TR.
- Padronizar documentos conforme a Lei 14.133/2021.
- Criar uma base interna pesquisável contendo todos os documentos anteriores.
- Automatizar pesquisa de preços e coleta de referências técnicas.
- Centralizar o fluxo colaborativo entre secretarias, setor de compras, jurídico e controle interno.

### **2.2 Objetivos Secundários**

- Evitar divergências e erros comuns na elaboração de documentos.
- Permitir reaproveitamento de documentos recorrentes de anos anteriores.
- Gerar históricos e relatórios gerenciais para decisões estratégicas.

---

## **3. Stakeholders**

- **Setor de Planejamento de Compras** (usuários principais)
- **Secretarias Requisitantes**
- **Departamento Jurídico**
- **Controle Interno**
- **Equipe de TI / Desenvolvimento**
- **Administração Superior / Prefeito / Gestores**

---

## **4. Escopo do Produto**

## **4.1 Funcionalidades Principais**

### **4.1.1 Módulo de Indexação e Busca Interna**

- Importação de arquivos PDF e DOCX (editáveis ou escaneados).
- OCR automático para digitalizados (Tesseract, Textract ou similar).
- Indexação de todo o conteúdo textual dos documentos históricos.
- Busca inteligente por:
  - Objeto
  - Item
  - Descrição técnica
  - Quantidade
  - Secretaria
  - Ano
- Exibir trechos do documento original com _highlight_.
- Exibir documentos similares automaticamente.

### **4.1.2 Módulo de Busca em Bases Públicas**

Integração via APIs ou scraping controlado com:

- **PNCP** – Buscar contratos, atas, editais e itens semelhantes.
- **Painel de Preços do Governo Federal**.
- **Bases estaduais (ex: Banco de Preços da Saúde)**.
- **Portais de Compras Públicas (BLL, Compras.gov.br, etc.)** quando possível.
- Busca online inteligente (Google Custom Search) para encontrar TR/ETP semelhantes de outros municípios.

**Resultados exibidos:**

- Descrição do objeto
- Unidades, quantidades
- Justificativas usadas
- Preços estimados / valores homologados
- Links dos documentos fontes

### **4.1.3 Módulo de Pesquisa de Preços Integrado**

- Coleta automática das referências externas.
- Cálculo automático de:
  - Média
  - Mediana
  - Média saneada
- Registro de pesquisas internas (valores históricos pagos pelo município).
- Exportação pronta para anexar ao ETP/TR.
- Se possível: integração com APIs pagas (ex: Banco de Preços / Fonte de Preços).

### **4.1.4 Geração Automática de Documentos (DFD, ETP, TR)**

- Baseado em templates padronizados pela Lei 14.133.
- Assistente com IA generativa para:
  - Criar justificativas
  - Descrever itens
  - Sugerir soluções possíveis
- Preenchimento automático com base em:
  - Documentos anteriores semelhantes
  - Pesquisa de preços
  - Dados fornecidos pela secretaria requisitante

Documentos gerados devem conter:

- Identificação do objeto
- Motivação da demanda
- Especificações técnicas detalhadas
- Estimativa de custos
- Análise de alternativas
- Riscos
- Critérios de medição/execução

### **4.1.5 Gestão de Documentos Recorrentes**

- Clonagem de documentos anteriores.
- Atualização automática de preços.
- Histórico de revisões.

### **4.1.6 Workflow Colaborativo**

- Envio de demanda pela secretaria.
- Análise técnica pelo setor de planejamento.
- Revisão jurídica.
- Parecer do controle interno.
- Aprovação final.
- Registro de todas as ações (log completo).

### **4.1.7 Painel Administrativo / Dashboard**

- Quantidade de processos em andamento.
- Etapas pendentes por setor.
- SLA por tipo de documento.
- Comparativos de preços (interno vs. externo).
- Economia gerada.

---

## **5. Requisitos Funcionais (RF)**

### **RF1 – Importação e Indexação**

O sistema deve importar documentos PDF/DOCX e extrair texto, incluindo OCR quando necessário.

### **RF2 – Busca Inteligente**

O sistema deve permitir busca por palavra-chave e por filtros, devolvendo trechos relevantes.

### **RF3 – Integração com Bases Públicas**

O sistema deve consultar automaticamente APIs e portais externos.

### **RF4 – Sugestão Automática de Conteúdo**

IA deve sugerir trechos de DFD/ETP/TR conforme padrões da Lei 14.133.

### **RF5 – Geração Automatizada de Documentos**

Sistema deve montar documentos finalizados com base em templates internos.

### **RF6 – Workflow Colaborativo**

Cada setor deve ter permissões e etapas específicas.

### **RF7 – Segurança e Auditoria**

Todas ações precisam de registro e rastreabilidade.

---

## **6. Requisitos Não Funcionais (RNF)**

### **RNF1 – Performance**

- Indexação deve processar documentos rapidamente.
- Busca deve retornar resultados em até 2 segundos.

### **RNF2 – Segurança**

- Acesso por autenticação corporativa (AD/LDAP ou OAuth).
- Logs auditáveis.
- Backup automático.

### **RNF3 – Escalabilidade**

- Suporte a milhares de documentos.
- Infraestrutura horizontalmente escalável.

### **RNF4 – Usabilidade**

- Interface simples para servidores sem conhecimento técnico.
- Campos explicativos baseados na Lei 14.133.

---

## **7. Arquitetura Proposta**

- Backend: Python 3.12+ (FastAPI).
- Banco de dados: MongoDB 8.0+
- IA: Modelos via Openrouter.
- **Processamento de Arquivos (OCR/Ingestão):**

  - _Nativo Digital:_ `PyMuPDF` ou `pypdf`.
  - _Digitalizados (Scan):_ `Tesseract OCR` (Open Source).

- Frontend: React 19+ ou Vue.js **3.5.24+ **, + (tailwind css) foco em formulários dinâmicos "Wizard")
- Hospedagem: Local.

┌─────────────────────────────────────────────────────────────┐
│ PLATAFORMA INTEGRADA DE COMPRAS PÚBLICAS │
├─────────────────────────────────────────────────────────────┤
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Módulo │ │ Módulo │ │ Módulo │ │
│ │ DFD │ │ ETP │ │ TR │ │
│ │ (Validação) │ │ (Geração IA) │ │ (Inteligente)│ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ │ │ │ │
│ └─────────────────┼───────────────────┘ │
│ │ │
│ ┌─────────────────────────────────────┐ │
│ │ BASE DE DADOS JSON (MongoDB) │ │
│ │ - Histórico DFD/ETP/TR │ │
│ │ - Modelos padronizados │ │
│ │ - Cache de preços │ │
│ │ - Auditoria/compliance │ │
│ └─────────────────────────────────────┘ │
│ │ │
│ ┌────────────────────────┼────────────────────────┐ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐ │
│ │ APIs Preços │ │ APIs PNCP │ │ APIs Gov (Dados │ │
│ │ - Banco BR │ │ - Contratos │ │ Abertos) │ │
│ │ - Compras BR│ │ - Atas RP │ │ │ │
│ │ - ComprasNet│ │ - Editais │ │ │ │
│ └──────────────┘ └──────────────┘ └────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

**Categorização de CATMAT e CATSER**
Utilizar as mesmas categorias da API do governo federal
https://dadosabertos.compras.gov.br/swagger-ui/index.html#/
https://www.gov.br/compras/pt-br/acesso-a-informacao/manuais/manual-dados-abertos/manual-api-compras.pdf

Banco de dados:

## Modelo de Dados (para o Codex gerar schemas)

Aqui vai um **modelo inicial** , que o time pode adaptar. Isso é ótimo pra Codex já desenhar migrations/ORM.

### Entidades principais

**Usuário**

- `id`
- `nome`
- `email`
- `senha_hash` (ou integração SSO)
- `cargo`
- `perfil` (enum: `SECRETARIA`, `PLANEJAMENTO`, `JURIDICO`, `CONTROLE_INTERNO`, `ADMIN`)
- `secretaria_id` (nullable)
- `ativo` (bool)
- `criado_em`, `atualizado_em`

**Secretaria**

- `id`
- `nome`
- `sigla`
- `descricao`
- `criado_em`, `atualizado_em`

**ProcessoCompra**

- `id`
- `numero_processo` (texto, ex: “001/2025”)
- `ano`
- `secretaria_id`
- `objeto_resumido`
- `status` (enum: `RASCUNHO`, `EM_ANALISE`, `AGUARDANDO_JURIDICO`, `AGUARDANDO_CONTROLE_INTERNO`, `APROVADO`, `CANCELADO`)
- `criador_id`
- `criado_em`, `atualizado_em`

**DocumentoPlanejamento**

- `id`
- `tipo` (enum: `DFD`, `ETP`, `TR`)
- `processo_id`
- `versao`
- `status` (enum: `RASCUNHO`, `EM_REVISAO`, `FINAL`)
- `conteudo_json` (jsonb – representação estruturada)
- `conteudo_html` (opcional, renderizado)
- `arquivo_original_id` (se tiver upload)
- `criador_id`
- `criado_em`, `atualizado_em`

**DocumentoArquivo**

- `id`
- `processo_id` (nullable – pode ser apenas “referência histórica”)
- `tipo` (enum: `HISTORICO`, `ANEXO`, `OUTRO`)
- `nome_arquivo`
- `caminho_armazenamento`
- `mime_type`
- `tem_ocr` (bool)
- `texto_extraido` (text / ou índice externo)
- `criado_em`, `atualizado_em`

**ItemCompra**

- `id`
- `processo_id`
- `documento_id` (DFD/ETP/TR ao qual pertence)
- `descricao`
- `codigo_catmat` (opcional)
- `unidade_medida`
- `quantidade_prevista`
- `quantidade_historica_media` (campo calculado opcional)
- `observacoes`
- `criado_em`, `atualizado_em`

**PesquisaPreco**

- `id`
- `item_id`
- `fonte` (enum: `INTERNO`, `PNCP`, `PAINEL_PRECOS`, `BANCO_PRECOS`, `FONTE_PRECOS`, `OUTRO`)
- `descricao_fonte` (texto livre – ex: “Processo 123/2023 – Pregão X”)
- `cnpj_fornecedor` (nullable)
- `nome_fornecedor` (nullable)
- `preco_unitario`
- `data_coleta`
- `link_referencia` (nullable)
- `criado_em`, `atualizado_em`

**WorkflowEtapa**

- `id`
- `processo_id`
- `tipo_etapa` (enum: `SOLICITACAO`, `ANALISE_PLANEJAMENTO`, `REVISAO_JURIDICA`, `REVISAO_CONTROLE_INTERNO`, `APROVACAO_FINAL`)
- `responsavel_id` (usuário atual responsável)
- `status` (enum: `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`, `DEVOLVIDA`)
- `observacoes`
- `criado_em`, `atualizado_em`

**LogAcao**

- `id`
- `processo_id`
- `usuario_id`
- `acao` (texto curto / enum)
- `detalhes` (jsonb)
- `data_hora`

---

## **8. Entregáveis (MVP e Versões)**

### **MVP **

- Importação e indexação de PDFs/DOCX.
- Busca interna inteligente.
- Geração simples de DFD/ETP/TR via templates.

### **Versão 2**

- Integração com bases públicas.
- Módulo de pesquisa de preços automatizado.
- Clonagem de documentos recorrentes.

### **Versão 3 **

- Assistente IA com sugestões inteligentes.
- Workflow completo com controle interno e jurídico.
- Dashboards gerenciais.

---

## **9. Critérios de Sucesso**

- Redução de 60% no tempo médio de elaboração de ETP/TR.
- Erros ou retrabalhos reduzidos em pelo menos 50%.
- 80% de satisfação dos usuários internos.
- Aumento de reutilização de documentos anteriores.

---

## **10. Riscos e Mitigações**

| Risco                                  | Impacto | Mitigação                                           |
| -------------------------------------- | ------- | --------------------------------------------------- |
| OCR falhar em PDFs escaneados ruins    | Alto    | Treinar modelos OCR / permitir upload de PDFs novos |
| Mudanças na legislação                 | Médio   | Templates atualizáveis via painel admin             |
| Dependência de APIs públicas instáveis | Médio   | Cache local / fallback manual                       |
| Resistência dos usuários               | Alto    | Treinamento, interface intuitiva                    |

---
