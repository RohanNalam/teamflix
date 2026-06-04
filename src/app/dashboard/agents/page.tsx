import { Plus, Bot, CheckCircle2 } from 'lucide-react'

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Agents</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Connect and configure AI coding agents for your team.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
          <Plus size={14} />
          Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div key={agent.name} className="rounded-xl border p-5 transition-colors hover:border-orange-500/30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                <Bot size={16} style={{ color: agent.status === 'connected' ? 'var(--orange)' : 'var(--muted)' }} />
              </div>
              {agent.status === 'connected' && (
                <CheckCircle2 size={15} style={{ color: '#22c55e' }} />
              )}
            </div>
            <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>{agent.name}</h3>
            <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{agent.provider}</p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#888' }}>{agent.description}</p>
            <div className="flex items-center justify-between">
              {agent.status === 'connected' ? (
                <>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{agent.sessions} sessions</span>
                  <button className="text-xs px-3 py-1 rounded border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>Configure</button>
                </>
              ) : (
                <button className="text-xs px-3 py-1 rounded font-medium text-black transition-opacity hover:opacity-90" style={{ background: 'var(--orange)' }}>Connect</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
