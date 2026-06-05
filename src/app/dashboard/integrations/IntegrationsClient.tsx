'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { toggleIntegration } from '@/app/actions/integrations'
import { useToast } from '@/components/Toast'

const CATALOG = [
  { name: 'GitHub', description: 'Connect repos, open PRs, and track commits automatically.', icon: '🐙' },
  { name: 'Slack', description: 'Get agent notifications and trigger sessions from Slack.', icon: '💬' },
  { name: 'Linear', description: 'Link issues to sessions and auto-close on completion.', icon: '◆' },
  { name: 'Jira', description: 'Sync tickets and update statuses as agents make progress.', icon: '🔵' },
  { name: 'Datadog', description: 'Monitor agent costs and session performance metrics.', icon: '🐶' },
  { name: 'Stripe', description: 'Track billing and set spend limits per team.', icon: '💳' },
  { name: 'Vercel', description: 'Auto-deploy preview branches after agent sessions.', icon: '▲' },
  { name: 'Supabase', description: 'Connect your database for agents to query and migrate.', icon: '⚡' },
]

export default function IntegrationsClient({ savedIntegrations }: { savedIntegrations: Record<string, boolean> }) {
  const [states, setStates] = useState(savedIntegrations)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const toggle = (name: string) => {
    const next = !states[name]
    setStates(prev => ({ ...prev, [name]: next }))
    startTransition(async () => {
      await toggleIntegration(name, next)
      toast(next ? `${name} connected` : `${name} disconnected`, next ? 'success' : 'error')
    })
  }

  return (
    <div className="px-8 py-8">
      <PageHeader
        title="Integrations"
        description="Connect your tools to give agents the right context and access."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATALOG.map(int => {
          const connected = !!states[int.name]
          return (
            <div key={int.name} className="rounded-2xl border p-5 transition-all hover:border-[#878672]/30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{int.icon}</span>
                {connected && <CheckCircle2 size={15} style={{ color: '#22c55e' }} />}
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{int.name}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{int.description}</p>
              <button
                onClick={() => toggle(int.name)}
                disabled={isPending}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:opacity-80 disabled:opacity-40"
                style={connected
                  ? { background: 'transparent', color: '#ef4444', border: '1px solid #ef444430' }
                  : { background: 'var(--accent)', color: '#1a1910' }
                }
              >
                {connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
