import { useState } from 'react'
import { Card } from '../components/Card'

export default function SecretariasPage() {
  const [secretarias, setSecretarias] = useState([
    { id: '1', nome: 'Administração', sigla: 'SEMAD', dotacao: '4.4.90.52' },
  ])
  const [form, setForm] = useState({ nome: '', sigla: '', dotacao: '', endereco: '', contato: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSecretarias((list) => [...list, { ...form, id: crypto.randomUUID() }])
    setForm({ nome: '', sigla: '', dotacao: '', endereco: '', contato: '' })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Secretarias e dotações</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Cadastro de secretaria">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Nome</label>
                <input className="w-full border rounded px-3 py-2" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Sigla</label>
                <input className="w-full border rounded px-3 py-2" value={form.sigla} onChange={(e) => setForm({ ...form, sigla: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Dotação orçamentária</label>
              <input className="w-full border rounded px-3 py-2" value={form.dotacao} onChange={(e) => setForm({ ...form, dotacao: e.target.value })} placeholder="Ex: 4.4.90.52" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Endereço</label>
              <input className="w-full border rounded px-3 py-2" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} placeholder="Integrar com ViaCEP" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Contato</label>
              <input className="w-full border rounded px-3 py-2" value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })} placeholder="Telefone/E-mail" />
            </div>
            <button className="px-4 py-2 bg-primary-700 text-white rounded-lg" type="submit">Salvar secretaria</button>
          </form>
        </Card>

        <Card title="Secretarias cadastradas">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2">Sigla</th>
                <th>Nome</th>
                <th>Dotação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {secretarias.map((s) => (
                <tr key={s.id}>
                  <td className="py-2 font-semibold">{s.sigla}</td>
                  <td>{s.nome}</td>
                  <td className="text-slate-600">{s.dotacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
