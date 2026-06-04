import { CheckCircle2, Plus } from 'lucide-react'

const integrations = [
  { name: 'GitHub', description: 'Connect repos, open PRs, and track commits automatically.', connected: true, icon: '🐙' },
  { name: 'Slack', description: 'Get agent notifications and trigger sessions from Slack.', connected: true, icon: '💬' },
  { name: 'Linear', description: 'Link issues to sessions and auto-close on completion.', connected: false, icon: '◆' },
  { name: 'Jira', description: 'Sync tickets and update statuses as agents make progress.', connected: false, icon: '🔵' },
  { name: 'Datadog', description: 'Monitor agent costs and session performance metrics.', connected: false, icon: '🐶' },
  { name: 'Stripe', description: 'Track billing and set spend limits per team.', connected: false, icon: '💳' },
  { name: 'Vercel', description: 'Auto-deploy preview branches after agent sessions.', connected: false, icon: '▲' },
  { name: 'Supabase', description: 'Connect your database for agents to query and migrate.', connected: false, icon: '⚡' },
]

export default function IntegrationsPage() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Integrations</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Connect your tools to give agents the right context.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
          <Plus size={14} />
          Request Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {integrations.map(int => (
          <div key={int.name} className="rounded-xl border p-5 hover:border-orange-500/20 transition-colors" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{int.icon}</span>
              {int.connected && <CheckCircle2 size={15} style={{ color: '#22c55e' }} />}
            </div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{int.name}</h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{int.description}</p>
            <button className={`text-xs px-3 py-1.5 rounded font-medium transition-opacity hover:opacity-90 w-full ${int.connected ? 'border' : 'text-black'}`}
              style={int.connected
                ? { borderColor: 'var(--border)', color: 'var(--muted)', background: 'transparent' }
                : { background: 'var(--orange)' }
              }>
              {int.connected ? 'Manage' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
