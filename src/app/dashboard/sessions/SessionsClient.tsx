'use client'

import { useState, useTransition } from 'react'
import { Plus, Search, Clock, GitBranch, Terminal, Trash2, X } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { createSession, deleteSession } from '@/app/actions/sessions'

const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
  active:    { color: '#22c55e', bg: '#22c55e18', label: 'Active' },
  idle:      { color: '#D9D7B6', bg: '#D9D7B620', label: 'Idle' },
  completed: { color: '#878672', bg: '#87867218', label: 'Completed' },
  error:     { color: '#ef4444', bg: '#ef444418', label: 'Error' },
}

const AGENTS = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

export default function SessionsClient({ initialSessions }: { initialSessions: any[] }) {
  const [sessions, setSessions] = useState(initialSessions)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [agent, setAgent] = useState(AGENTS[0])
  const [repo, setRepo] = useState('')
  const [isPending, startTransition] = useTransition()

  const filtered = sessions.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  const handleCreate = () => {
    if (!name.trim()) return
    startTransition(async () => {
      await createSession(name.trim(), agent, repo.trim())
      setSessions(prev => [{ id: Date.now(), name: name.trim(), agent, repo: repo.trim(), status: 'idle', created_at: new Date().toISOString() }, ...prev])
      setName(''); setRepo(''); setShowModal(false)
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteSession(id)
      setSessions(prev => prev.filter(s => s.id !== id))
    })
  }

  return (
    <div className="px-8 py-8">
      <PageHeader
        title="Sessions"
        description="Cloud workspaces where your agents run code."
        action={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#1a1910' }}
          >
            <Plus size={15} /> New Session
          </button>
        }
      />

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search sessions…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Terminal size={32} className="mx-auto mb-4 opacity-30" style={{ color: 'var(--muted)' }} />
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>No sessions yet</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Create your first session to get started.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Session', 'Status', 'Agent', 'Repository', 'Created', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const st = statusStyles[s.status] ?? statusStyles.idle
                return (
                  <tr key={s.id} className="hover:bg-white/3 transition-colors" style={i < filtered.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <Terminal size={14} style={{ color: 'var(--muted)' }} />
                        <span className="font-mono text-sm font-medium" style={{ color: 'var(--foreground)' }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: st.color, background: st.bg }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted)' }}>{s.agent}</td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--muted)' }}>
                        <GitBranch size={13} />{s.repo || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted)' }}>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />{new Date(s.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors group">
                        <Trash2 size={14} className="group-hover:text-red-400" style={{ color: 'var(--muted)' }} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: '#00000080' }}>
          <div className="w-full max-w-md rounded-2xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>New Session</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <X size={16} style={{ color: 'var(--muted)' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Session name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. fix-auth-bug"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none font-mono"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Agent</label>
                <select
                  value={agent}
                  onChange={e => setAgent(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  {AGENTS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Repository <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                <input
                  value={repo}
                  onChange={e => setRepo(e.target.value)}
                  placeholder="e.g. username/repo"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none font-mono"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim() || isPending}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
                style={{ background: 'var(--accent)', color: '#1a1910' }}
              >
                {isPending ? 'Creating…' : 'Create Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
