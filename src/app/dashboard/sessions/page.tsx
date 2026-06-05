'use client'
import { useState } from 'react'
import { Plus, Search, Clock, GitBranch, Terminal, MoreHorizontal } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const mockSessions = [
  { id: '1', name: 'fix-auth-middleware', status: 'active', agent: 'Claude Code', repo: 'teamflix/backend', duration: '14m', updated: '2m ago' },
  { id: '2', name: 'refactor-api-routes', status: 'idle', agent: 'Cursor', repo: 'teamflix/api', duration: '1h 2m', updated: '18m ago' },
  { id: '3', name: 'update-dashboard-ui', status: 'completed', agent: 'Claude Code', repo: 'teamflix/frontend', duration: '32m', updated: '1h ago' },
  { id: '4', name: 'db-migration-v2', status: 'error', agent: 'OpenAI Codex', repo: 'teamflix/infra', duration: '7m', updated: '3h ago' },
]

const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
  active:    { color: '#22c55e', bg: '#22c55e18', label: 'Active' },
  idle:      { color: 'var(--accent)', bg: 'var(--accent)18', label: 'Idle' },
  completed: { color: '#888',    bg: '#88888818', label: 'Completed' },
  error:     { color: '#ef4444', bg: '#ef444418', label: 'Error' },
}

export default function SessionsPage() {
  const [search, setSearch] = useState('')
  const filtered = mockSessions.filter(s => s.name.includes(search.toLowerCase()))

  return (
    <div className="px-8 py-8">
      <PageHeader
        title="Sessions"
        description="Cloud workspaces where your agents run code."
        action={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--accent)' }}>
            <Plus size={15} /> New Session
          </button>
        }
      />

      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search sessions…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#878672]/50"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#fff' }}
        />
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Session', 'Status', 'Agent', 'Repository', 'Duration', 'Last updated', ''].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => {
              const st = statusStyles[s.status]
              return (
                <tr
                  key={s.id}
                  className="hover:bg-white/3 transition-colors cursor-pointer"
                  style={i < filtered.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Terminal size={14} style={{ color: 'var(--muted)' }} />
                      <span className="font-mono text-sm font-medium" style={{ color: '#fff' }}>{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: st.color, background: st.bg }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#ccc' }}>{s.agent}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm" style={{ color: '#ccc' }}>
                      <GitBranch size={13} style={{ color: 'var(--muted)' }} />{s.repo}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm" style={{ color: '#ccc' }}>
                      <Clock size={13} style={{ color: 'var(--muted)' }} />{s.duration}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted)' }}>{s.updated}</td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      <MoreHorizontal size={15} style={{ color: 'var(--muted)' }} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-sm" style={{ color: 'var(--muted)' }}>No sessions found.</div>
        )}
      </div>
    </div>
  )
}
