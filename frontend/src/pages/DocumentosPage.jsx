import { useState } from 'react'
import { Card } from '../components/Card'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const tipos = [
  { value: 'TR', label: 'Termo de Referência' },
  { value: 'ETP', label: 'Estudo Técnico Preliminar' },
]

export default function DocumentosPage() {
  const [form, setForm] = useState({
    dfdId: '',
    tipo: 'TR',
    titulo: '',
    escopo: '',
    justificativa: '',
    requisitos: '',
    riscos: '',
    entregaveis: '',
  })
  const [documentos, setDocumentos] = useState([])
  const [mensagem, setMensagem] = useState('')

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const salvar = async (e) => {
    e.preventDefault()
    const payload = {
      dfd_id: form.dfdId,
      tipo: form.tipo,
      titulo: form.titulo,
      escopo: form.escopo,
      justificativa: form.justificativa,
      requisitos: form.requisitos,
      riscos: form.riscos,
      entregaveis: form.entregaveis,
      fontes_pesquisa: [
        'ComprasNet - processos similares',
        'PNCP - contratos equivalentes',
        'Base interna SIPCP',
      ],
      estimativa_custos: 'Consolide pesquisas internas e externas com memória de cálculo.',
    }

    try {
      const response = await fetch(`${API_BASE}/documentos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Erro ao salvar')
      setDocumentos((current) => [...current, data])
      setMensagem(`Documento ${data.numero} salvo e associado ao DFD.`)
    } catch (error) {
      setMensagem(error.message)
    }
  }

  const gerarPorDfd = async (tipo) => {
    try {
      const response = await fetch(`${API_BASE}/documentos/generate-from-dfd/${form.dfdId}?tipo=${tipo}` , {
        method: 'POST',
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Erro ao gerar automaticamente')
      setDocumentos((current) => [...current, data])
      setMensagem(`Documento ${data.numero} gerado automaticamente a partir do DFD.`)
    } catch (error) {
      setMensagem(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Documentos derivados</p>
        <h1 className="text-2xl font-semibold text-slate-800">Termo de Referência e ETP</h1>
      </div>

      <Card title="Associar e gerar documentos">
        <form onSubmit={salvar} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">DFD (ID)</label>
              <input className="w-full border rounded px-3 py-2" value={form.dfdId} onChange={(e) => handleChange('dfdId', e.target.value)} placeholder="ID do DFD" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tipo</label>
              <select className="w-full border rounded px-3 py-2" value={form.tipo} onChange={(e) => handleChange('tipo', e.target.value)}>
                {tipos.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Título</label>
              <input className="w-full border rounded px-3 py-2" value={form.titulo} onChange={(e) => handleChange('titulo', e.target.value)} placeholder="Ex: TR - Aquisição de mobiliário" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Escopo</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} value={form.escopo} onChange={(e) => handleChange('escopo', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Justificativa</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} value={form.justificativa} onChange={(e) => handleChange('justificativa', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Requisitos</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} value={form.requisitos} onChange={(e) => handleChange('requisitos', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Riscos</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} value={form.riscos} onChange={(e) => handleChange('riscos', e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium">Entregáveis</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} value={form.entregaveis} onChange={(e) => handleChange('entregaveis', e.target.value)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="px-4 py-2 rounded bg-primary-700 text-white text-sm">
              Salvar documento
            </button>
            <button type="button" onClick={() => gerarPorDfd('TR')} className="px-4 py-2 rounded border border-slate-300 text-sm">
              Gerar TR automaticamente
            </button>
            <button type="button" onClick={() => gerarPorDfd('ETP')} className="px-4 py-2 rounded border border-slate-300 text-sm">
              Gerar ETP automaticamente
            </button>
          </div>

          {mensagem && <p className="text-sm text-primary-700">{mensagem}</p>}
        </form>
      </Card>

      <Card title="Histórico de TR/ETP gerados">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2">Número</th>
                <th className="py-2">Tipo</th>
                <th className="py-2">Título</th>
                <th className="py-2">DFD</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => (
                <tr key={doc.id} className="border-t">
                  <td className="py-2 font-semibold text-slate-800">{doc.numero}</td>
                  <td className="py-2">{doc.tipo}</td>
                  <td className="py-2">{doc.titulo}</td>
                  <td className="py-2">{doc.dfd_id}</td>
                  <td className="py-2">{doc.status}</td>
                </tr>
              ))}
              {documentos.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-slate-500 text-center">
                    Nenhum documento gerado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
