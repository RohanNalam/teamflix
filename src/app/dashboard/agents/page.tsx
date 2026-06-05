'use client'

import { useEffect, useState } from 'react'
import { Bot, CheckCircle2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'
import { useToast } from '@/components/Toast'

const CATALOG = [
  { name: 'Claude Code', provider: 'Anthropic', description: 'Advanced coding agent with deep reasoning and multi-file editing.' },
  { name: 'Cursor', provider: 'Anysphere', description: 'AI-first code editor with in-context completions and composer.' },
  { name: 'OpenAI Codex', provider: 'OpenAI', description: 'Cloud-based coding agent for automated pull requests.' },
  { name: 'GitHub Copilot', provider: 'GitHub', description: 'Inline AI suggestions and workspace-level agent actions.' },
  { name: 'Gemini CLI', provider: 'Google', description: 'Terminal-based coding agent powered by Gemini models.' },
  { name: 'Devin', provider: 'Cognition', description: 'Fully autonomous software engineer that plans and executes tasks.' },
]

export default function AgentsPage() {
  const [connected, setConnected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('agents').select('name, status').eq('user_id', getDeviceId())
      const c = new Set(data?.filter((a: any) => a.status === 'connected').map((a: any) => a.name) ?? [])
      setConnected(c as Set<string>)
    }
    load()
  }, [])

  const toggle = async (name: string, provider: string) => {
    setLoading(true)
    const isConnected = connected.has(name)
    await supabase.from('agents').upsert(
      { user_id: getDeviceId(), name, provider, status: isConnected ? 'disconnected' : 'connected', sessions: 0 },
      { onConflict: 'user_id,name' }
    )
    setConnected(prev => {
      const next = new Set(prev)
      isConnected ? next.delete(name) : next.add(name)
      return next
    })
    toast(isConnected ? `${name} disconnected` : `${name} connected`, isConnected ? 'error' : 'success')
    setLoading(false)
  }

  return (
    <div className="px-8 py-8">
      <PageHeader title="Agents" description="Connect and configure AI coding agents for your team." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATALOG.map(agent => {
          const isConnected = connected.has(agent.name)
          return (
            <div key={agent.name} className="rounded-2xl border p-6 transition-all hover:border-[#878672]/30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <Bot size={18} style={{ color: isConnected ? 'var(--accent)' : 'var(--muted)' }} />
                </div>
                {isConnected && <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: '#22c55e18', color: '#22c55e' }}><CheckCircle2 size={12} /> Connected</div>}
              </div>
              <h3 className="font-bold text-base mb-0.5" style={{ color: 'var(--foreground)' }}>{agent.name}</h3>
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted)' }}>{agent.provider}</p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{agent.description}</p>
              <button onClick={() => toggle(agent.name, agent.provider)} disabled={loading}
                className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
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
