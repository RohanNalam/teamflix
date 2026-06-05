'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'
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

export default function IntegrationsPage() {
  const [states, setStates] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('integrations').select('name, connected').eq('user_id', getDeviceId())
      const map: Record<string, boolean> = {}
      data?.forEach((i: any) => { map[i.name] = i.connected })
      setStates(map)
    }
    load()
  }, [])

  const toggle = async (name: string) => {
    const next = !states[name]
    setStates(prev => ({ ...prev, [name]: next }))
    await supabase.from('integrations').upsert({ user_id: getDeviceId(), name, connected: next, updated_at: new Date().toISOString() }, { onConflict: 'user_id,name' })
    toast(next ? `${name} connected` : `${name} disconnected`, next ? 'success' : 'error')
  }

  return (
    <div className="px-8 py-8">
      <PageHeader title="Integrations" description="Connect your tools to give agents the right context and access." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATALOG.map(int => {
          const isConnected = !!states[int.name]
          return (
            <div key={int.name} className="rounded-2xl border p-5 transition-all hover:border-[#878672]/30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{int.icon}</span>
                {isConnected && <CheckCircle2 size={15} style={{ color: '#22c55e' }} />}
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{int.name}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{int.description}</p>
              <button onClick={() => toggle(int.name)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:opacity-80"
                style={isConnected ? { background: 'transparent', color: '#ef4444', border: '1px solid #ef444430' } : { background: 'var(--accent)', color: '#1a1910' }}>
                {isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
