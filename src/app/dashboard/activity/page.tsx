import { getActivity, getActivityStats } from '@/app/actions/activity'
import { Terminal, GitCommit, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const eventConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  commit:  { icon: <GitCommit size={14} />,     color: '#a855f7', bg: '#a855f718' },
  run:     { icon: <Terminal size={14} />,       color: '#D9D7B6', bg: '#D9D7B620' },
  success: { icon: <CheckCircle2 size={14} />,  color: '#22c55e', bg: '#22c55e18' },
  error:   { icon: <AlertTriangle size={14} />, color: '#ef4444', bg: '#ef444418' },
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default async function ActivityPage() {
  const [events, stats] = await Promise.all([getActivity(), getActivityStats()])

  const statCards = [
    { label: 'Active Sessions', value: String(stats.activeSessions) },
    { label: 'Commits Today',   value: String(stats.commitsToday) },
    { label: 'Errors Today',    value: String(stats.errorsToday) },
    { label: 'Agent Hours',     value: `${stats.agentHours}h` },
  ]

  return (
    <div className="px-8 py-8">
      <PageHeader title="Activity" description="Real-time feed of everything your agents are doing." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => (
          <div key={s.label} className="rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>{s.label}</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Live feed</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>No activity yet</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Activity will appear here as your agents run.</p>
          </div>
        ) : (
          <div>
            {events.map((e: any, i: number) => {
              const cfg = eventConfig[e.type] ?? eventConfig.run
              return (
                <div key={e.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/3 transition-colors" style={i < events.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: cfg.bg, color: cfg.color }}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--foreground)' }}>{e.message}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      <span className="font-mono">{e.session}</span>{e.agent ? ` · ${e.agent}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs flex-shrink-0 mt-1" style={{ color: 'var(--muted)' }}>
                    <Clock size={12} />{timeAgo(e.created_at)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
