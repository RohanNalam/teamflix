import { Plus, Bot, CheckCircle2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const agents = [
  { name: 'Claude Code', provider: 'Anthropic', status: 'connected', sessions: 12, description: 'Advanced coding agent with deep reasoning and multi-file editing.' },
  { name: 'Cursor', provider: 'Anysphere', status: 'connected', sessions: 4, description: 'AI-first code editor with in-context completions and composer.' },
  { name: 'OpenAI Codex', provider: 'OpenAI', status: 'disconnected', sessions: 0, description: 'Cloud-based coding agent for automated pull requests.' },
  { name: 'GitHub Copilot', provider: 'GitHub', status: 'disconnected', sessions: 0, description: 'Inline AI suggestions and workspace-level agent actions.' },
  { name: 'Gemini CLI', provider: 'Google', status: 'disconnected', sessions: 0, description: 'Terminal-based coding agent powered by Gemini models.' },
  { name: 'Devin', provider: 'Cognition', status: 'disconnected', sessions: 0, description: 'Fully autonomous software engineer that can plan and execute tasks.' },
]

export default function AgentsPage() {
  return (
    <div className="px-8 py-8">
      <PageHeader
        title="Agents"
        description="Connect and configure AI coding agents for your team."
        action={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--accent)' }}>
            <Plus size={15} /> Add Agent
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div
            key={agent.name}
            className="rounded-2xl border p-6 transition-all hover:border-[#878672]/30"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <Bot size={18} style={{ color: agent.status === 'connected' ? 'var(--accent)' : 'var(--muted)' }} />
              </div>
              {agent.status === 'connected' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: '#22c55e18', color: '#22c55e' }}>
                  <CheckCircle2 size={12} /> Connected
                </div>
              )}
            </div>
            <h3 className="font-bold text-base mb-0.5" style={{ color: '#fff' }}>{agent.name}</h3>
            <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted)' }}>{agent.provider}</p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#aaa' }}>{agent.description}</p>
            <div className="flex items-center justify-between">
              {agent.status === 'connected' ? (
                <>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{agent.sessions} sessions run</span>
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border)', color: '#ccc' }}>Configure</button>
                </>
              ) : (
                <button className="text-xs font-semibold px-4 py-1.5 rounded-lg text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--accent)' }}>Connect</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
