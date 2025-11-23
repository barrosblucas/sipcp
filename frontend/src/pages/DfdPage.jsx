import { useState } from 'react'
import { Card } from '../components/Card'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const emptyItem = { descricao: '', quantidade: 1, catCodigo: '', memoriaCalculo: '' }

export default function DfdPage() {
  const [form, setForm] = useState({
    secretaria: '',
    titulo: '',
    necessidade: '',
    gestor: '',
    fiscal: '',
    localEntrega: '',
    substituicao: false,
    vencimento: '',
    processoAnterior: '',
    aceite: false,
  })
  const [itens, setItens] = useState([{ ...emptyItem }])
  const [iaTexto, setIaTexto] = useState('')
  const [iaModo, setIaModo] = useState('formalizar_texto')
  const [iaDestino, setIaDestino] = useState('necessidade')
  const [iaResposta, setIaResposta] = useState('')

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateItem = (index, patch) => {
    setItens((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }

  const addItem = () => setItens((current) => [...current, { ...emptyItem }])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: integrate with backend and PDF generation
    alert('DFD salvo como rascunho para demonstração')
  }

  const consultarIA = async () => {
    setIaResposta('Pensando...')
    try {
      const response = await fetch(`${API_BASE}/ai/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: iaTexto, modo: iaModo, contexto: form.necessidade }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Falha ao consultar IA')
      setIaResposta(data.sugestao)
    } catch (error) {
      setIaResposta(error.message)
    }
  }

  const aplicarSugestao = () => {
    if (!iaResposta) return
    if (iaDestino === 'necessidade') {
      setForm((current) => ({ ...current, necessidade: iaResposta }))
    }
    if (iaDestino === 'memoria') {
      setItens((current) => current.map((item, index) => (index === 0 ? { ...item, memoriaCalculo: iaResposta } : item)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Formalização da Demanda</p>
          <h1 className="text-2xl font-semibold text-slate-800">Novo DFD</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-slate-300 text-sm">Salvar rascunho</button>
          <button className="px-4 py-2 rounded-lg bg-primary-700 text-white text-sm" onClick={handleSubmit}>Gerar DFD</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informações Gerais">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Secretaria requisitante</label>
              <input className="w-full border rounded-lg px-3 py-2" value={form.secretaria} onChange={(e) => handleChange('secretaria', e.target.value)} placeholder="Ex: SEMAD" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Título do DFD</label>
              <input className="w-full border rounded-lg px-3 py-2" value={form.titulo} onChange={(e) => handleChange('titulo', e.target.value)} placeholder="Aquisição de mobiliário" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Necessidade da unidade</label>
              <textarea className="w-full border rounded-lg px-3 py-2" rows={4} value={form.necessidade} onChange={(e) => handleChange('necessidade', e.target.value)} placeholder="Descreva a motivação da demanda..." />
            </div>
          </div>
        </Card>

        <Card title="Gestão e Fiscalização">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Responsável pela gestão</label>
              <input className="w-full border rounded-lg px-3 py-2" value={form.gestor} onChange={(e) => handleChange('gestor', e.target.value)} placeholder="Nome, matrícula, secretaria" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Fiscal do contrato</label>
              <input className="w-full border rounded-lg px-3 py-2" value={form.fiscal} onChange={(e) => handleChange('fiscal', e.target.value)} placeholder="Nome, matrícula, secretaria" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Local de entrega/execução</label>
              <input className="w-full border rounded-lg px-3 py-2" value={form.localEntrega} onChange={(e) => handleChange('localEntrega', e.target.value)} placeholder="Endereço completo ou unidade" />
            </div>
          </div>
        </Card>

        <Card title="Itens e quantidades">
          <div className="space-y-4">
            {itens.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 border border-slate-200 rounded-lg p-3">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Descrição</label>
                  <input className="w-full border rounded px-3 py-2" value={item.descricao} onChange={(e) => updateItem(index, { descricao: e.target.value })} placeholder="Item ou serviço" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Quantidade</label>
                  <input type="number" className="w-full border rounded px-3 py-2" value={item.quantidade} onChange={(e) => updateItem(index, { quantidade: Number(e.target.value) })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">CATMAT/CATSER</label>
                  <input className="w-full border rounded px-3 py-2" value={item.catCodigo} onChange={(e) => updateItem(index, { catCodigo: e.target.value })} placeholder="Código" />
                </div>
                <div className="md:col-span-4 space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Memória de cálculo</label>
                  <textarea className="w-full border rounded px-3 py-2" rows={2} value={item.memoriaCalculo} onChange={(e) => updateItem(index, { memoriaCalculo: e.target.value })} placeholder="Detalhe o racional da quantidade" />
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem} className="text-sm text-primary-700 font-semibold">+ Adicionar item</button>
          </div>
        </Card>

        <Card title="Substituição de contrato">
          <div className="space-y-3">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.substituicao} onChange={(e) => handleChange('substituicao', e.target.checked)} />
              Demanda para substituição de contrato vigente
            </label>
            {form.substituicao && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Data de vencimento</label>
                  <input type="date" className="w-full border rounded px-3 py-2" value={form.vencimento} onChange={(e) => handleChange('vencimento', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Número do processo</label>
                  <input className="w-full border rounded px-3 py-2" value={form.processoAnterior} onChange={(e) => handleChange('processoAnterior', e.target.value)} />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Aceite do gestor e fiscal">
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              Declaro que exerço a função de responsável pelo acompanhamento do contrato e seus aditivos, conforme Decreto Municipal nº 133/2022.
            </p>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={form.aceite} onChange={(e) => handleChange('aceite', e.target.checked)} />
              Aceito as responsabilidades como gestor/fiscal do contrato
            </label>
          </div>
        </Card>

        <Card title="Assistente IA para textos e memória de cálculo">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Objetivo</label>
                <select className="w-full border rounded px-3 py-2" value={iaModo} onChange={(e) => setIaModo(e.target.value)}>
                  <option value="formalizar_texto">Deixar mais formal</option>
                  <option value="memoria_calculo">Melhorar memória de cálculo</option>
                  <option value="ortografia">Verificar ortografia e concordância</option>
                  <option value="descritivo_item">Criar descritivo do item</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Aplicar em</label>
                <select className="w-full border rounded px-3 py-2" value={iaDestino} onChange={(e) => setIaDestino(e.target.value)}>
                  <option value="necessidade">Necessidade do DFD</option>
                  <option value="memoria">Memória de cálculo (1º item)</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Texto para revisar ou gerar</label>
              <textarea className="w-full border rounded px-3 py-2" rows={4} value={iaTexto} onChange={(e) => setIaTexto(e.target.value)} placeholder="Cole aqui a justificativa, memória de cálculo ou descritivo" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <button type="button" onClick={consultarIA} className="px-4 py-2 rounded bg-primary-700 text-white text-sm">
                Pedir sugestão de IA
              </button>
              <button type="button" onClick={aplicarSugestao} className="px-4 py-2 rounded border border-slate-300 text-sm">
                Aplicar sugestão ao formulário
              </button>
            </div>
            {iaResposta && (
              <div className="bg-slate-50 border rounded p-3 text-sm whitespace-pre-wrap">{iaResposta}</div>
            )}
          </div>
        </Card>
      </form>
    </div>
  )
}
