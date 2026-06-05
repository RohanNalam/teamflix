'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, GitBranch, Layers, Globe, Code2, Zap, Database, LayoutDashboard, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'

const QUICK_PROMPTS = [
  { icon: Globe, label: 'Build a landing page' },
  { icon: LayoutDashboard, label: 'Create a dashboard app' },
  { icon: Code2, label: 'Build a REST API' },
  { icon: Database, label: 'Set up a database schema' },
]

const AGENTS = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot']

export default function DashboardClient({ firstName, sessionCount, agentCount }: {
  firstName: string
  sessionCount: number
  agentCount: number
}) {
  const [prompt, setPrompt] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
          user_id: DEMO_USER_ID,
          name: sessionName,
          agent: selectedAgent,
          repo: prompt.trim(), // store full prompt in repo field temporarily
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
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-16">
      {/* Icons */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#D9D7B620', border: '1px solid var(--border)' }}>
          <Layers size={18} style={{ color: '#D9D7B6' }} />
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#87867220', border: '1px solid var(--border)' }}>
          <Zap size={18} style={{ color: '#878672' }} />
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#54533320', border: '1px solid var(--border)' }}>
          <Code2 size={18} style={{ color: '#878672' }} />
        </div>
      </div>

      <h1 className="font-bold text-3xl mb-8 text-center" style={{ color: 'var(--foreground)', letterSpacing: '-0.5px' }}>
        What are you building, {firstName}?
      </h1>

      {/* Quick prompts */}
      <div className="flex gap-2 flex-wrap justify-center mb-6 max-w-2xl">
        {QUICK_PROMPTS.map(q => (
          <button
            key={q.label}
            onClick={() => setPrompt(q.label)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all hover:border-[#878672]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            <q.icon size={13} />
            {q.label}
          </button>
        ))}
      </div>

      {/* Main prompt box */}
      <div className="w-full max-w-2xl rounded-2xl border overflow-hidden mb-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Describe a project, feature, or task…"
          rows={3}
          className="w-full px-5 pt-4 pb-2 text-sm outline-none resize-none leading-relaxed"
          style={{ background: 'transparent', color: 'var(--foreground)', minHeight: 100 }}
        />
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>Agent:</span>
            <select
              value={selectedAgent}
              onChange={e => setSelectedAgent(e.target.value)}
              className="text-xs rounded-lg px-2 py-1 border outline-none"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              {AGENTS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>↵ to send · ⇧↵ new line</span>
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || loading}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-30"
              style={{ background: 'var(--accent)' }}
            >
              {loading
                ? <Loader2 size={13} color="#1a1910" className="animate-spin" />
                : <ArrowUp size={14} color="#1a1910" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 w-full max-w-2xl mb-4">
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <span className="text-xs" style={{ color: 'var(--muted)' }}>or start from a repo</span>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>

      {/* GitHub import */}
      <button
        className="w-full max-w-2xl flex items-center gap-4 px-5 py-4 rounded-2xl border text-sm font-medium transition-all hover:border-[#878672]"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        onClick={() => alert('GitHub import coming soon')}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-2)' }}>
          <GitBranch size={18} style={{ color: 'var(--muted)' }} />
        </div>
        <div className="text-left">
          <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Import from GitHub</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Clone a repo and work on it with coding agents</p>
        </div>
        <div className="ml-auto" style={{ color: 'var(--muted)' }}>→</div>
      </button>

      {/* Stats if they have data */}
      {(sessionCount > 0 || agentCount > 0) && (
        <div className="flex items-center gap-6 mt-8">
          {sessionCount > 0 && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{sessionCount}</span> session{sessionCount !== 1 ? 's' : ''}
            </span>
          )}
          {agentCount > 0 && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{agentCount}</span> agent{agentCount !== 1 ? 's' : ''} connected
            </span>
          )}
        </div>
      )}
    </div>
  )
}
