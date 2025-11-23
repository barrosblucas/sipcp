import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/dfd', label: 'DFD' },
  { to: '/usuarios', label: 'Usuários' },
  { to: '/secretarias', label: 'Secretarias' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/documentos', label: 'TR & ETP' },
  { to: '/logs', label: 'Auditoria' },
]

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-primary-700">SIPCP</Link>
          <nav className="flex gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1 rounded ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-primary-700'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">{children}</main>
    </div>
  )
}
