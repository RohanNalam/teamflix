'use client'

import { useState, useTransition } from 'react'
import { Bot, CheckCircle2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { connectAgent, disconnectAgent } from '@/app/actions/agents'
import { useToast } from '@/components/Toast'

const AGENT_CATALOG = [
  { name: 'Claude Code', provider: 'Anthropic', description: 'Advanced coding agent with deep reasoning and multi-file editing.' },
  { name: 'Cursor', provider: 'Anysphere', description: 'AI-first code editor with in-context completions and composer.' },
  { name: 'OpenAI Codex', provider: 'OpenAI', description: 'Cloud-based coding agent for automated pull requests.' },
  { name: 'GitHub Copilot', provider: 'GitHub', description: 'Inline AI suggestions and workspace-level agent actions.' },
  { name: 'Gemini CLI', provider: 'Google', description: 'Terminal-based coding agent powered by Gemini models.' },
  { name: 'Devin', provider: 'Cognition', description: 'Fully autonomous software engineer that plans and executes tasks.' },
]

export default function AgentsClient({ initialAgents }: { initialAgents: any[] }) {
  const [agents, setAgents] = useState(initialAgents)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const isConnected = (name: string) => agents.some(a => a.name === name && a.status === 'connected')
  const getAgent = (name: string) => agents.find(a => a.name === name)
  const sessionCount = (name: string) => getAgent(name)?.sessions ?? 0

  const handleConnect = (name: string, provider: string) => {
    startTransition(async () => {
      await connectAgent(name, provider)
      setAgents(prev => {
        const existing = prev.find(a => a.name === name)
        if (existing) return prev.map(a => a.name === name ? { ...a, status: 'connected' } : a)
        return [...prev, { id: Date.now(), name, provider, status: 'connected', sessions: 0, created_at: new Date().toISOString() }]
      })
      toast(`${name} connected successfully`)
    })
  }

  const handleDisconnect = (name: string) => {
    const agent = getAgent(name)
    if (!agent) return
    startTransition(async () => {
      await disconnectAgent(agent.id, name)
      setAgents(prev => prev.map(a => a.name === name ? { ...a, status: 'disconnected' } : a))
      toast(`${name} disconnected`, 'error')
    })
  }

  return (
    <div className="px-8 py-8">
      <PageHeader
        title="Agents"
        description="Connect and configure AI coding agents for your team."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AGENT_CATALOG.map(agent => {
          const connected = isConnected(agent.name)
          return (
            <div key={agent.name} className="rounded-2xl border p-6 transition-all hover:border-[#878672]/30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <Bot size={18} style={{ color: connected ? 'var(--accent)' : 'var(--muted)' }} />
                </div>
                {connected && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: '#22c55e18', color: '#22c55e' }}>
                    <CheckCircle2 size={12} /> Connected
                  </div>
                )}
              </div>
              <h3 className="font-bold text-base mb-0.5" style={{ color: 'var(--foreground)' }}>{agent.name}</h3>
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted)' }}>{agent.provider}</p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{agent.description}</p>
              <div className="flex items-center justify-between">
                {connected ? (
                  <>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{sessionCount(agent.name)} sessions run</span>
                    <button
                      onClick={() => handleDisconnect(agent.name)}
                      disabled={isPending}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 disabled:opacity-40"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(agent.name, agent.provider)}
                    disabled={isPending}
                    className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
                    style={{ background: 'var(--accent)', color: '#1a1910' }}
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
