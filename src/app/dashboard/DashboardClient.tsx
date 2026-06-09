'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, GitBranch, Layers, Globe, Code2, Zap, Database, LayoutDashboard, Loader2, Sparkles, Terminal, Activity } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'

const QUICK_PROMPTS = [
  { icon: Globe, label: 'Build a landing page', color: '#a78bfa' },
  { icon: LayoutDashboard, label: 'Create a dashboard app', color: '#34d399' },
  { icon: Code2, label: 'Build a REST API', color: '#fb923c' },
  { icon: Database, label: 'Set up a database schema', color: '#60a5fa' },
]

const AGENTS = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

export default function DashboardClient({ firstName: _firstName, sessionCount: _sc, agentCount: _ac }: {
  firstName: string
  sessionCount: number
  agentCount: number
}) {
  const [prompt, setPrompt] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0])
  const [loading, setLoading] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    async function loadStats() {
      const { count } = await supabase.from('sessions').select('id', { count: 'exact' }).eq('user_id', getDeviceId())
      setSessionCount(count ?? 0)
    }
    loadStats()
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [prompt])

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    try {
      const sessionName = prompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40).replace(/-$/, '')
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          user_id: getDeviceId(),
          name: sessionName,
          agent: selectedAgent,
          repo: prompt.trim(),
          status: 'active',
        })
        .select()
        .single()

      if (data?.id) {
        router.push(`/dashboard/sessions/${data.id}`)
      } else {
        console.error('Session creation failed:', error)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-16 relative">

      {/* Background glow orbs */}
      <div className="glow-orb animate-glow-pulse pointer-events-none" style={{ width: 500, height: 400, background: 'radial-gradient(circle, #D9D7B60a 0%, transparent 70%)', top: '10%', left: '50%', transform: 'translateX(-50%)', position: 'absolute' }} />

      {/* Icon cluster */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        {[
          { Icon: Layers, color: '#D9D7B6', bg: '#D9D7B610' },
          { Icon: Zap, color: '#a78bfa', bg: '#a78bfa10' },
          { Icon: Terminal, color: '#34d399', bg: '#34d39910' },
          { Icon: Activity, color: '#fb923c', bg: '#fb923c10' },
        ].map(({ Icon, color, bg }, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-xl flex items-center justify-center animate-fade-in"
            style={{ background: bg, border: `1px solid ${color}25`, animationDelay: `${i * 0.08}s` }}
          >
            <Icon size={17} style={{ color }} />
          </div>
        ))}
      </div>

      {/* Heading */}
      <div className="text-center mb-10 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={14} style={{ color: 'var(--muted)' }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>AI Agent Platform</span>
        </div>
        <h1
          className="animate-fade-in font-bold mb-3"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-1.5px', color: 'var(--foreground)' }}
        >
          What are you building today?
        </h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
          Describe a task and your AI agent will write code, run commands, and deliver results.
        </p>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 flex-wrap justify-center mb-5 max-w-2xl relative z-10">
        {QUICK_PROMPTS.map(q => (
          <button
            key={q.label}
            onClick={() => setPrompt(q.label)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all hover:scale-105"
            style={{
              background: `${q.color}08`,
              borderColor: `${q.color}25`,
              color: 'var(--muted)',
            }}
          >
            <q.icon size={12} style={{ color: q.color }} />
            {q.label}
          </button>
        ))}
      </div>

      {/* Main prompt box */}
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden mb-4 relative z-10 gradient-border"
        style={{
          boxShadow: prompt ? '0 0 40px rgba(217,215,182,0.07), 0 8px 40px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Describe a project, feature, or task…"
          rows={3}
          className="w-full px-5 pt-5 pb-3 text-sm outline-none resize-none leading-relaxed"
          style={{ background: 'transparent', color: 'var(--foreground)', minHeight: 110 }}
        />
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>Agent:</span>
            <select
              value={selectedAgent}
              onChange={e => setSelectedAgent(e.target.value)}
              className="text-xs rounded-lg px-2.5 py-1.5 border outline-none font-medium"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              {AGENTS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>↵ send · ⇧↵ newline</span>
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || loading}
              className="btn-primary w-8 h-8 rounded-xl flex items-center justify-center disabled:opacity-30"
              style={{ boxShadow: prompt ? '0 0 16px rgba(217,215,182,0.3)' : 'none' }}
            >
              {loading
                ? <Loader2 size={14} color="#1a1910" className="animate-spin" />
                : <ArrowUp size={14} color="#1a1910" strokeWidth={2.5} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 w-full max-w-2xl mb-4 relative z-10">
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <span className="text-xs" style={{ color: 'var(--muted)' }}>or start from a repo</span>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>

      {/* GitHub import */}
      <button
        className="w-full max-w-2xl flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-medium transition-all group relative z-10"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
        onClick={() => alert('GitHub import coming soon')}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <GitBranch size={17} style={{ color: 'var(--muted)' }} />
        </div>
        <div className="text-left">
          <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Import from GitHub</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Clone a repo and work on it with coding agents</p>
        </div>
        <div className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: 'var(--muted)' }}>→</div>
      </button>

      {/* Stats */}
      {sessionCount > 0 && (
        <div className="flex items-center gap-6 mt-8 relative z-10">
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{sessionCount}</span> session{sessionCount !== 1 ? 's' : ''} in your workspace
          </span>
        </div>
      )}
    </div>
  )
}
