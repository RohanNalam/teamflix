'use client'
import { useState } from 'react'
import { Plus, Search, Clock, GitBranch, Terminal, MoreHorizontal } from 'lucide-react'

const mockSessions = [
  { id: '1', name: 'fix-auth-middleware', status: 'active', agent: 'Claude Code', repo: 'teamflix/backend', duration: '14m', updated: '2m ago' },
  { id: '2', name: 'refactor-api-routes', status: 'idle', agent: 'Cursor', repo: 'teamflix/api', duration: '1h 2m', updated: '18m ago' },
  { id: '3', name: 'update-dashboard-ui', status: 'completed', agent: 'Claude Code', repo: 'teamflix/frontend', duration: '32m', updated: '1h ago' },
  { id: '4', name: 'db-migration-v2', status: 'error', agent: 'OpenAI Codex', repo: 'teamflix/infra', duration: '7m', updated: '3h ago' },
]

const statusColor: Record<string, string> = {
  active: '#22c55e',
  idle: '#f97316',
  completed: '#6b7280',
  error: '#ef4444',
}

export default function SessionsPage() {
  const [search, setSearch] = useState('')
  const filtered = mockSessions.filter(s => s.name.includes(search.toLowerCase()))

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Sessions</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Cloud workspaces where your agents run.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black transition-opacity hover:opacity-90" style={{ background: 'var(--orange)' }}>
          <Plus size={14} />
          New Session
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search sessions…"
          className="w-full max-w-xs pl-8 pr-4 py-2 rounded-lg text-sm border outline-none transition-colors focus:border-orange-500/50"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Session', 'Status', 'Agent', 'Repo', 'Duration', 'Updated', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} className="hover:bg-white/3 transition-colors" style={i < filtered.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                <td className="px-4 py-3 font-mono text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                  <div className="flex items-center gap-2">
                    <Terminal size={12} style={{ color: 'var(--muted)' }} />
                    {s.name}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[s.status] }} />
                    <span style={{ color: statusColor[s.status] }}>{s.status}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{s.agent}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                    <GitBranch size={11} />
                    {s.repo}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                  <span className="flex items-center gap-1"><Clock size={11} />{s.duration}</span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{s.updated}</td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-white/10 transition-colors">
                    <MoreHorizontal size={14} style={{ color: 'var(--muted)' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm" style={{ color: 'var(--muted)' }}>No sessions found.</div>
        )}
      </div>
    </div>
  )
}
