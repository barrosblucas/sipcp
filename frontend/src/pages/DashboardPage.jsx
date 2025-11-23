import { Card } from '../components/Card'
import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'DFDs em andamento',
    value: '04',
    description: 'Fluxos em análise ou aguardando revisão',
  },
  {
    title: 'Itens catalogados',
    value: '128',
    description: 'Catmat/Catser sincronizados do histórico',
  },
  {
    title: 'Pendências do gestor',
    value: '02',
    description: 'Documentos aguardando assinatura de aceite',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Bem-vindo</p>
          <h1 className="text-2xl font-semibold text-slate-800">Painel de Controle</h1>
        </div>
        <Link to="/dfd" className="bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-500">
          Novo DFD
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((item) => (
          <Card key={item.title} title={item.title}>
            <div className="text-3xl font-bold text-primary-700">{item.value}</div>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>

      <Card title="Atalhos rápidos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link className="p-4 border border-dashed rounded-lg hover:border-primary-500" to="/dfd">
            Criar DFD e anexar documentos
          </Link>
          <Link className="p-4 border border-dashed rounded-lg hover:border-primary-500" to="/categorias">
            Cadastrar Catmat/Catser
          </Link>
          <Link className="p-4 border border-dashed rounded-lg hover:border-primary-500" to="/secretarias">
            Gerenciar secretarias e dotações
          </Link>
        </div>
      </Card>
    </div>
  )
}
