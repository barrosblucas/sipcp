import { Card } from '../components/Card'

const mockLogs = [
  { id: 1, acao: 'DFD gerado', usuario: 'Admin', data: '2024-11-12 10:31' },
  { id: 2, acao: 'Categoria CATMAT atualizada', usuario: 'Admin', data: '2024-11-11 18:02' },
  { id: 3, acao: 'Secretaria SEMAD editada', usuario: 'Maria', data: '2024-11-10 09:44' },
]

export default function LogsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Auditoria e logs</h1>
      <Card title="Histórico de atividades">
        <ul className="divide-y divide-slate-200 text-sm">
          {mockLogs.map((log) => (
            <li key={log.id} className="py-2 flex items-center justify-between">
              <div>
                <p className="font-semibold">{log.acao}</p>
                <p className="text-slate-500">Por {log.usuario}</p>
              </div>
              <span className="text-xs text-slate-500">{log.data}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
