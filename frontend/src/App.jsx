import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import UsuariosPage from './pages/UsuariosPage'
import SecretariasPage from './pages/SecretariasPage'
import CategoriasPage from './pages/CategoriasPage'
import DfdPage from './pages/DfdPage'
import LogsPage from './pages/LogsPage'
import DocumentosPage from './pages/DocumentosPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dfd" element={<DfdPage />} />
              <Route path="/documentos" element={<DocumentosPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/secretarias" element={<SecretariasPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/logs" element={<LogsPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}
