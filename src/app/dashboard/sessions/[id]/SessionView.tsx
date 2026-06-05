'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, Bot, Terminal, Copy, Check, Loader2, Circle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="rounded-xl overflow-hidden my-3" style={{ border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
        <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{lang || 'code'}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: copied ? '#22c55e' : 'var(--muted)' }}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed" style={{ background: '#0f0e07', color: '#D9D7B6' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = []
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g
  let last = 0
  let match
  let key = 0

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > last) {
      const prose = text.slice(last, match.index)
      parts.push(<ProseText key={key++} text={prose} />)
    }
    parts.push(<CodeBlock key={key++} lang={match[1]} code={match[2].trim()} />)
    last = match.index + match[0].length
  }

  if (last < text.length) {
    parts.push(<ProseText key={key++} text={text.slice(last)} />)
  }

  return parts
}

function ProseText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />
        if (line.startsWith('### ')) return <h3 key={i} className="font-bold text-base mt-4 mb-1" style={{ color: 'var(--foreground)' }}>{line.slice(4)}</h3>
        if (line.startsWith('## ')) return <h2 key={i} className="font-bold text-lg mt-5 mb-2" style={{ color: 'var(--foreground)' }}>{line.slice(3)}</h2>
        if (line.startsWith('# ')) return <h1 key={i} className="font-bold text-xl mt-6 mb-2" style={{ color: 'var(--foreground)' }}>{line.slice(2)}</h1>
        if (line.startsWith('- ') || line.startsWith('* ')) return (
          <div key={i} className="flex items-start gap-2 text-sm" style={{ color: '#D9D7B6' }}>
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
            <span>{line.slice(2)}</span>
          </div>
        )
        if (/^\d+\./.test(line)) return <p key={i} className="text-sm" style={{ color: '#D9D7B6' }}>{line}</p>
        return <p key={i} className="text-sm leading-relaxed" style={{ color: '#D9D7B6' }}>{line}</p>
      })}
    </div>
  )
}

export default function SessionView({ sessionId }: { sessionId: string }) {
  const [session, setSession] = useState<any>(null)
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState<'loading' | 'streaming' | 'done' | 'error'>('loading')
  const [prompt, setPrompt] = useState('')
  const [newPrompt, setNewPrompt] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([])

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('sessions').select('*').eq('id', sessionId).single()
      if (data) {
        setSession(data)
        const userPrompt = data.prompt || data.name
        setPrompt(userPrompt)
        await runAgent(userPrompt, data.agent, true)
      } else {
        console.error('Could not load session:', error)
        setStatus('error')
      }
    }
    load()
  }, [sessionId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [response, messages])

  async function runAgent(userPrompt: string, agent: string, initial = false) {
    if (!initial) {
      setMessages(prev => [...prev, { role: 'user', content: userPrompt }])
    }
    setStatus('streaming')
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, agent: agent || 'Claude Code' }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        full += chunk
        setResponse(full)
      }

      setMessages(prev => [...prev, { role: 'agent', content: full }])
      setResponse('')
      setStatus('done')

      // Update session status
      await supabase.from('sessions').update({ status: 'completed' }).eq('id', sessionId)
      await supabase.from('activity').insert({
        user_id: DEMO_USER_ID, type: 'success',
        message: `Agent completed: ${userPrompt.slice(0, 60)}`, session: session?.name, agent: session?.agent
      })
    } catch {
      setStatus('error')
    }
  }

  const handleFollowUp = async () => {
    if (!newPrompt.trim() || sending) return
    const p = newPrompt.trim()
    setNewPrompt('')
    setSending(true)
    await runAgent(p, session?.agent)
    setSending(false)
  }

  const statusColor = { loading: '#878672', streaming: '#D9D7B6', done: '#22c55e', error: '#ef4444' }[status]
  const statusLabel = { loading: 'Loading…', streaming: 'Running', done: 'Completed', error: 'Error' }[status]

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <Link href="/dashboard/sessions" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>
          <ArrowLeft size={15} /> Sessions
        </Link>
        <div className="w-px h-4" style={{ background: 'var(--border)' }} />
        <Terminal size={15} style={{ color: 'var(--accent)' }} />
        <span className="font-mono text-sm font-medium" style={{ color: 'var(--foreground)' }}>{session?.name ?? '…'}</span>
        <div className="flex items-center gap-1.5 ml-auto">
          {status === 'streaming' && <Loader2 size={13} className="animate-spin" style={{ color: statusColor }} />}
          {status !== 'streaming' && <Circle size={8} fill={statusColor} style={{ color: statusColor }} />}
          <span className="text-xs font-medium" style={{ color: statusColor }}>{statusLabel}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
          <Bot size={12} />
          {session?.agent ?? 'Claude Code'}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Initial prompt */}
        {prompt && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: 'var(--accent)', color: '#1a1910' }}>R</div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--foreground)' }}>{prompt}</p>
            </div>
          </div>
        )}

        {/* Conversation */}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? '' : 'flex-row'}`}>
            {m.role === 'user' ? (
              <>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: 'var(--accent)', color: '#1a1910' }}>R</div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>{m.content}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#D9D7B620', border: '1px solid var(--border)' }}>
                  <Bot size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 max-w-3xl">
                  {renderMarkdown(m.content)}
                </div>
              </>
            )}
          </div>
        ))}

        {/* Streaming response */}
        {status === 'streaming' && response && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#D9D7B620', border: '1px solid var(--border)' }}>
              <Bot size={14} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex-1 max-w-3xl">
              {renderMarkdown(response)}
              <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse rounded-sm" style={{ background: 'var(--accent)', verticalAlign: 'text-bottom' }} />
            </div>
          </div>
        )}

        {/* Loading state */}
        {status === 'loading' && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#D9D7B620', border: '1px solid var(--border)' }}>
              <Bot size={14} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <Loader2 size={14} className="animate-spin" style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>Agent is thinking…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Follow-up input */}
      {status === 'done' && (
        <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input
              value={newPrompt}
              onChange={e => setNewPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleFollowUp()}
              placeholder="Follow up or ask for changes…"
              className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
            <button
              onClick={handleFollowUp}
              disabled={!newPrompt.trim() || sending}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ background: 'var(--accent)', color: '#1a1910' }}
            >
              {sending ? 'Running…' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
