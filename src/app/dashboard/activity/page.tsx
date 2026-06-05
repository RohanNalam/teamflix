import { Terminal, GitCommit, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const events = [
  { type: 'commit', message: 'feat: add JWT refresh token logic', session: 'fix-auth-middleware', agent: 'Claude Code', time: '2m ago' },
  { type: 'run', message: 'Session started: refactor-api-routes', session: 'refactor-api-routes', agent: 'Cursor', time: '20m ago' },
  { type: 'success', message: 'All tests passed (47 passing)', session: 'update-dashboard-ui', agent: 'Claude Code', time: '1h ago' },
  { type: 'error', message: 'Migration failed: column "user_id" already exists', session: 'db-migration-v2', agent: 'OpenAI Codex', time: '3h ago' },
  { type: 'commit', message: 'refactor: extract service layer from controllers', session: 'refactor-api-routes', agent: 'Cursor', time: '3h ago' },
  { type: 'success', message: 'Build succeeded in 18.4s', session: 'update-dashboard-ui', agent: 'Claude Code', time: '4h ago' },
  { type: 'run', message: 'Session started: fix-auth-middleware', session: 'fix-auth-middleware', agent: 'Claude Code', time: '5h ago' },
]

const eventConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  commit:  { icon: <GitCommit size={14} />,      color: '#a855f7', bg: '#a855f718' },
  run:     { icon: <Terminal size={14} />,        color: 'var(--accent)', bg: 'var(--accent)18' },
  success: { icon: <CheckCircle2 size={14} />,   color: '#22c55e', bg: '#22c55e18' },
  error:   { icon: <AlertTriangle size={14} />,  color: '#ef4444', bg: '#ef444418' },
}

const stats = [
  { label: 'Active Sessions', value: '2' },
  { label: 'Commits Today', value: '8' },
  { label: 'Errors Today', value: '2' },
  { label: 'Agent Hours', value: '6.4h' },
]

export default function ActivityPage() {
  return (
    <div className="px-8 py-8">
      <PageHeader title="Activity" description="Real-time feed of everything your agents are doing." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>{s.label}</p>
            <p className="text-3xl font-bold" style={{ color: '#fff' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
          <p className="text-sm font-semibold" style={{ color: '#fff' }}>Live feed</p>
        </div>
        <div>
          {events.map((e, i) => {
            const cfg = eventConfig[e.type]
            return (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4 hover:bg-white/3 transition-colors"
                style={i < events.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-0.5" style={{ color: '#fff' }}>{e.message}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="font-mono">{e.session}</span> · {e.agent}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs flex-shrink-0 mt-1" style={{ color: 'var(--muted)' }}>
                  <Clock size={12} />{e.time}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
