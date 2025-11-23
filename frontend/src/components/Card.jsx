export function Card({ title, children, actions }) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <header className="px-5 py-3 flex items-center justify-between bg-slate-50 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
        {actions}
      </header>
      <div className="p-5 space-y-3 text-sm text-slate-700">{children}</div>
    </section>
  )
}
