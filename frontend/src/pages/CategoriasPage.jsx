import { useState } from 'react'
import { Card } from '../components/Card'

export default function CategoriasPage() {
  const [materiais, setMateriais] = useState([
    { codigo: '30103690', descricao: 'Cadeiras giratórias', tipo: 'CATMAT' },
  ])
  const [servicos, setServicos] = useState([
    { codigo: '76111500', descricao: 'Serviços de vigilância', tipo: 'CATSER' },
  ])
  const [form, setForm] = useState({ codigo: '', descricao: '', tipo: 'CATMAT' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.tipo === 'CATMAT') {
      setMateriais((list) => [...list, { codigo: form.codigo, descricao: form.descricao, tipo: 'CATMAT' }])
    } else {
      setServicos((list) => [...list, { codigo: form.codigo, descricao: form.descricao, tipo: 'CATSER' }])
    }
    setForm({ codigo: '', descricao: '', tipo: form.tipo })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Categorias de materiais e serviços</h1>
      <Card title="Cadastro de categoria do Comprasnet">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={handleSubmit}>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Descrição</label>
            <input className="w-full border rounded px-3 py-2" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Busque na API do Comprasnet" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Código CATMAT/CATSER</label>
            <input className="w-full border rounded px-3 py-2" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="Ex: 30103690" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Tipo</label>
            <select className="w-full border rounded px-3 py-2" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="CATMAT">Material</option>
              <option value="CATSER">Serviço</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-primary-700 text-white rounded-lg">Adicionar</button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Materiais">
          <ul className="divide-y divide-slate-200 text-sm">
            {materiais.map((cat) => (
              <li key={cat.codigo} className="py-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{cat.descricao}</p>
                  <p className="text-slate-500">{cat.codigo}</p>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{cat.tipo}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Serviços">
          <ul className="divide-y divide-slate-200 text-sm">
            {servicos.map((cat) => (
              <li key={cat.codigo} className="py-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{cat.descricao}</p>
                  <p className="text-slate-500">{cat.codigo}</p>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{cat.tipo}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
