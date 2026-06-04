import { Plus, FileText, Trash2 } from 'lucide-react'

const contextFiles = [
  { name: 'CLAUDE.md', type: 'Markdown', size: '2.1 KB', scope: 'Global', updated: '2d ago' },
  { name: 'engineering-standards.md', type: 'Markdown', size: '5.4 KB', scope: 'Engineering', updated: '1w ago' },
  { name: '.env.example', type: 'ENV', size: '0.8 KB', scope: 'Global', updated: '3d ago' },
  { name: 'api-guidelines.txt', type: 'Text', size: '3.2 KB', scope: 'Backend', updated: '2w ago' },
]

export default function ContextPage() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Context</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Files and instructions injected into every agent session.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
          <Plus size={14} />
          Add File
        </button>
      </div>

      {/* Info banner */}
      <div className="rounded-xl border p-4 mb-6 flex items-start gap-3" style={{ borderColor: '#f9731630', background: '#f9731608' }}>
        <FileText size={15} style={{ color: 'var(--orange)', marginTop: 1 }} />
        <p className="text-sm leading-relaxed" style={{ color: '#ccc' }}>
          Context files are automatically prepended to every agent session. Use them to share coding standards, architecture decisions, and project-specific instructions.
        </p>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['File', 'Type', 'Size', 'Scope', 'Updated', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contextFiles.map((f, i) => (
              <tr key={f.name} className="hover:bg-white/3 transition-colors" style={i < contextFiles.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                <td className="px-4 py-3 font-mono text-xs font-medium flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <FileText size={13} style={{ color: 'var(--orange)' }} />{f.name}
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{f.type}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{f.size}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>{f.scope}</span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{f.updated}</td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-red-500/10 transition-colors group">
                    <Trash2 size={13} className="group-hover:text-red-400" style={{ color: 'var(--muted)' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom instructions textarea */}
      <div className="mt-6">
        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>GLOBAL INSTRUCTIONS</label>
        <textarea
          defaultValue="You are a coding agent working on the teamflix platform. Always follow our TypeScript standards, write tests for new features, and prefer functional patterns."
          rows={5}
          className="w-full rounded-xl border p-4 text-sm outline-none resize-none font-mono"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>Save</button>
        </div>
      </div>
    </div>
  )
}
