import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@sipcp.local')
  const [password, setPassword] = useState('admin123')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: integrate with backend
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-slate-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4 border border-slate-200">
        <h1 className="text-xl font-semibold text-slate-800">Acessar SIPCP</h1>
        <p className="text-sm text-slate-600">Use o login institucional. Demo preenchido automaticamente.</p>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">E-mail</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary-500 focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary-500 focus:outline-none" />
        </div>
        <button type="submit" className="w-full bg-primary-700 text-white py-2 rounded-lg font-semibold hover:bg-primary-500">Entrar</button>
      </form>
    </div>
  )
}
