import { Terminal, GitCommit, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

const events = [
  { type: 'commit', message: 'feat: add JWT refresh token logic', session: 'fix-auth-middleware', agent: 'Claude Code', time: '2m ago' },
  { type: 'run', message: 'Session started: refactor-api-routes', session: 'refactor-api-routes', agent: 'Cursor', time: '20m ago' },
  { type: 'success', message: 'All tests passed (47 passing)', session: 'update-dashboard-ui', agent: 'Claude Code', time: '1h ago' },
  { type: 'error', message: 'Migration failed: column "user_id" already exists', session: 'db-migration-v2', agent: 'OpenAI Codex', time: '3h ago' },
  { type: 'commit', message: 'refactor: extract service layer from controllers', session: 'refactor-api-routes', agent: 'Cursor', time: '3h ago' },
  { type: 'success', message: 'Build succeeded in 18.4s', session: 'update-dashboard-ui', agent: 'Claude Code', time: '4h ago' },
  { type: 'run', message: 'Session started: fix-auth-middleware', session: 'fix-auth-middleware', agent: 'Claude Code', time: '5h ago' },
  { type: 'error', message: 'Rate limit exceeded for OpenAI API', session: 'db-migration-v2', agent: 'OpenAI Codex', time: '6h ago' },
]

const icon: Record<string, React.ReactNode> = {
  commit: <GitCommit size={13} style={{ color: '#a855f7' }} />,
  run: <Terminal size={13} style={{ color: 'var(--orange)' }} />,
  success: <CheckCircle2 size={13} style={{ color: '#22c55e' }} />,
  error: <AlertTriangle size={13} style={{ color: '#ef4444' }} />,
}

export default function ActivityPage() {
  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Activity</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Real-time feed of what your agents are doing.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Sessions', value: '2' },
          { label: 'Commits Today', value: '8' },
          { label: 'Errors Today', value: '2' },
          { label: 'Agent Hours', value: '6.4h' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>LIVE FEED</p>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {events.map((e, i) => (
            <div key={i} className="px-5 py-3 flex items-start gap-3 hover:bg-white/3 transition-colors">
              <div className="mt-0.5 w-5 flex-shrink-0 flex items-center justify-center">{icon[e.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: 'var(--foreground)' }}>{e.message}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  <span className="font-mono">{e.session}</span> · {e.agent}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>
                <Clock size={11} />{e.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
