'use client'
import { useState } from 'react'
import { Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react'

const keys = [
  { id: '1', name: 'Production', key: 'tf_live_xK9mP2qR4nV8wL3jY7dC', created: 'Jun 1, 2026', lastUsed: '2m ago' },
  { id: '2', name: 'Development', key: 'tf_test_aB5cD8eF1gH4iJ7kL0mN', created: 'May 28, 2026', lastUsed: '1d ago' },
]

export default function ApiKeysPage() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const toggle = (id: string) => setRevealed(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const mask = (key: string) => key.slice(0, 10) + '••••••••••••••••'

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>API Keys</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Use these keys to authenticate with the Teamflix API.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
          <Plus size={14} />
          New Key
        </button>
      </div>

      <div className="rounded-xl border overflow-hidden mb-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Key', 'Created', 'Last Used', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((k, i) => (
              <tr key={k.id} className="hover:bg-white/3 transition-colors" style={i < keys.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>{k.name}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    {revealed.has(k.id) ? k.key : mask(k.key)}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{k.created}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{k.lastUsed}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggle(k.id)} className="p-1.5 rounded hover:bg-white/10 transition-colors">
                      {revealed.has(k.id) ? <EyeOff size={13} style={{ color: 'var(--muted)' }} /> : <Eye size={13} style={{ color: 'var(--muted)' }} />}
                    </button>
                    <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
                      <Copy size={13} style={{ color: 'var(--muted)' }} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-red-500/10 transition-colors group">
                      <Trash2 size={13} className="group-hover:text-red-400" style={{ color: 'var(--muted)' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border p-5" style={{ borderColor: '#f9731630', background: '#f9731608' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Using the API</h3>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>Include your API key as a Bearer token in the Authorization header:</p>
        <pre className="text-xs rounded-lg p-3 overflow-x-auto font-mono" style={{ background: 'var(--surface-2)', color: '#ccc' }}>
{`curl https://api.teamflix.dev/v1/sessions \\
  -H "Authorization: Bearer tf_live_xK9m..."`}
        </pre>
      </div>
    </div>
  )
}
