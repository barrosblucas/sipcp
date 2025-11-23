import { useState } from 'react'
import { Card } from '../components/Card'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    { id: '1', nome: 'Administrador', email: 'admin@sipcp.local', perfil: 'Administrador' },
  ])
  const [form, setForm] = useState({ nome: '', email: '', perfil: 'Gestor' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsuarios((list) => [...list, { ...form, id: crypto.randomUUID() }])
    setForm({ nome: '', email: '', perfil: 'Gestor' })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Usuários</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Cadastro de usuário">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome</label>
              <input className="w-full border rounded px-3 py-2" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">E-mail</label>
              <input className="w-full border rounded px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Perfil</label>
              <select className="w-full border rounded px-3 py-2" value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value })}>
                <option>Gestor</option>
                <option>Fiscal</option>
                <option>Administrador</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-primary-700 text-white rounded-lg" type="submit">Adicionar</button>
          </form>
        </Card>

        <Card title="Usuários cadastrados">
          <ul className="divide-y divide-slate-200">
            {usuarios.map((user) => (
              <li key={user.id} className="py-2">
                <p className="font-semibold text-slate-800">{user.nome}</p>
                <p className="text-sm text-slate-600">{user.email} · {user.perfil}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
