'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, Bot, Terminal, Copy, Check, Loader2, Send, Sparkles, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="rounded-xl overflow-hidden my-3" style={{ border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
          </div>
          <span className="text-xs font-mono ml-2" style={{ color: 'var(--muted)' }}>{lang || 'code'}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all hover:bg-white/5"
          style={{ color: copied ? '#22c55e' : 'var(--muted)' }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed" style={{ background: '#0a0905', color: '#D9D7B6' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ProseText({ text }: { text: string }) {
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />
        if (line.startsWith('### ')) return <h3 key={i} className="font-bold text-sm mt-4 mb-1" style={{ color: 'var(--foreground)' }}>{line.slice(4)}</h3>
        if (line.startsWith('## ')) return <h2 key={i} className="font-bold text-base mt-5 mb-2" style={{ color: 'var(--foreground)' }}>{line.slice(3)}</h2>
        if (line.startsWith('# ')) return <h1 key={i} className="font-bold text-lg mt-6 mb-2" style={{ color: 'var(--foreground)' }}>{line.slice(2)}</h1>
        if (line.startsWith('- ') || line.startsWith('* ')) return (
          <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#D9D7B6' }}>
            <ChevronRight size={12} className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }} />
            <span>{line.slice(2)}</span>
          </div>
        )
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\. /)?.[1]
          return (
            <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#D9D7B6' }}>
              <span className="flex-shrink-0 font-mono text-xs mt-0.5 w-4" style={{ color: 'var(--muted)' }}>{num}.</span>
              <span>{line.replace(/^\d+\. /, '')}</span>
            </div>
          )
        }
        // inline code
        const parts = line.split(/(`[^`]+`)/g)
        if (parts.length > 1) {
          return (
            <p key={i} className="text-sm leading-relaxed" style={{ color: '#D9D7B6' }}>
              {parts.map((part, j) =>
                part.startsWith('`') && part.endsWith('`')
                  ? <code key={j} className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: '#2e2d1a', color: '#D9D7B6', border: '1px solid var(--border)' }}>{part.slice(1, -1)}</code>
                  : part
              )}
            </p>
          )
        }
        return <p key={i} className="text-sm leading-relaxed" style={{ color: '#D9D7B6' }}>{line}</p>
      })}
    </div>
  )
}

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = []
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g
  let last = 0, match, key = 0
  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > last) parts.push(<ProseText key={key++} text={text.slice(last, match.index)} />)
    parts.push(<CodeBlock key={key++} lang={match[1]} code={match[2].trim()} />)
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(<ProseText key={key++} text={text.slice(last)} />)
  return parts
}

interface Message { id?: string; role: 'user' | 'agent'; content: string }

export default function SessionView({ sessionId }: { sessionId: string }) {
  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [status, setStatus] = useState<'loading' | 'streaming' | 'done' | 'error'>('loading')
  const [newPrompt, setNewPrompt] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => {
    async function load() {
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (!sessionData) { setStatus('error'); return }
      setSession(sessionData)

      const { data: existingMessages } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (existingMessages && existingMessages.length > 0) {
        setMessages(existingMessages.map((m: any) => ({ id: m.id, role: m.role, content: m.content })))
        setStatus('done')
      } else {
        const userPrompt = sessionData.repo || sessionData.name
        const userMsg: Message = { role: 'user', content: userPrompt }
        setMessages([userMsg])
        await saveMessage(sessionId, 'user', userPrompt)
        await runAgent(userPrompt, sessionData.agent, sessionId)
      }
    }
    load()
  }, [sessionId])

  async function saveMessage(sid: string, role: string, content: string) {
    await supabase.from('messages').insert({ session_id: sid, role, content })
  }

  async function runAgent(userPrompt: string, agent: string, sid: string) {
    setStatus('streaming')
    setStreamingText('')
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
        full += decoder.decode(value)
        setStreamingText(full)
      }
      await saveMessage(sid, 'agent', full)
      setMessages(prev => [...prev, { role: 'agent', content: full }])
      setStreamingText('')
      setStatus('done')
      await supabase.from('sessions').update({ status: 'completed' }).eq('id', sid)
    } catch {
      setStatus('error')
    }
  }

  const handleFollowUp = async () => {
    if (!newPrompt.trim() || sending) return
    const p = newPrompt.trim()
    setNewPrompt('')
    setSending(true)
    const userMsg: Message = { role: 'user', content: p }
    setMessages(prev => [...prev, userMsg])
    await saveMessage(sessionId, 'user', p)
    await runAgent(p, session?.agent, sessionId)
    setSending(false)
  }

  const statusConfig = {
    loading:   { color: '#878672', label: 'Loading…',   dot: false },
    streaming: { color: '#D9D7B6', label: 'Running',    dot: true  },
    done:      { color: '#22c55e', label: 'Completed',  dot: false },
    error:     { color: '#ef4444', label: 'Error',      dot: false },
  }[status]

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--background)' }}>

      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border)', background: 'rgba(35,34,21,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <Link
          href="/dashboard/sessions"
          className="flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity px-2.5 py-1.5 rounded-lg hover:bg-white/5"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft size={13} /> Sessions
        </Link>

        <div className="w-px h-4" style={{ background: 'var(--border)' }} />

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Terminal size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span className="font-mono text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
            {session?.name ?? '…'}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          {statusConfig.dot ? (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: statusConfig.color }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: statusConfig.color }} />
            </span>
          ) : (
            status === 'streaming'
              ? <Loader2 size={11} className="animate-spin" style={{ color: statusConfig.color }} />
              : <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: statusConfig.color }} />
          )}
          <span className="text-xs font-medium" style={{ color: statusConfig.color }}>{statusConfig.label}</span>
        </div>

        {/* Agent badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          <Bot size={11} style={{ color: 'var(--accent)' }} />
          {session?.agent ?? 'Claude Code'}
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 max-w-4xl mx-auto w-full">
        {messages.map((m, i) => (
          <div key={i} className="flex gap-4 animate-fade-in">
            {m.role === 'user' ? (
              <>
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--accent)', color: '#1a1910', boxShadow: '0 0 12px rgba(217,215,182,0.25)' }}
                >
                  U
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{m.content}</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#D9D7B612', border: '1px solid rgba(217,215,182,0.2)' }}
                >
                  <Sparkles size={13} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 min-w-0">{renderMarkdown(m.content)}</div>
              </>
            )}
          </div>
        ))}

        {/* Streaming bubble */}
        {status === 'streaming' && (
          <div className="flex gap-4 animate-fade-in">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: '#D9D7B612', border: '1px solid rgba(217,215,182,0.2)' }}
            >
              <Sparkles size={13} style={{ color: 'var(--accent)' }} className="animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              {streamingText
                ? <>
                    {renderMarkdown(streamingText)}
                    <span
                      className="inline-block w-0.5 h-4 ml-0.5 animate-pulse rounded-sm"
                      style={{ background: 'var(--accent)', verticalAlign: 'text-bottom' }}
                    />
                  </>
                : <div
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map(n => (
                        <span
                          key={n}
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: 'var(--accent)', animationDelay: `${n * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm" style={{ color: 'var(--muted)' }}>Agent is thinking…</span>
                  </div>
              }
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#D9D7B612', border: '1px solid rgba(217,215,182,0.2)' }}>
              <Loader2 size={13} className="animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>Loading session…</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ef444415', border: '1px solid #ef444430' }}>
              <span style={{ color: '#ef4444', fontSize: 12 }}>!</span>
            </div>
            <div className="px-4 py-3 rounded-2xl" style={{ background: '#ef444410', border: '1px solid #ef444430' }}>
              <p className="text-sm" style={{ color: '#ef4444' }}>Something went wrong. Please try again.</p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div
        className="px-6 py-4 border-t flex-shrink-0"
        style={{ borderColor: 'var(--border)', background: 'rgba(35,34,21,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <div
          className="flex gap-3 max-w-4xl mx-auto rounded-2xl border overflow-hidden"
          style={{
            background: 'var(--surface)',
            borderColor: newPrompt ? 'rgba(217,215,182,0.3)' : 'var(--border)',
            boxShadow: newPrompt ? '0 0 20px rgba(217,215,182,0.06)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <textarea
            ref={inputRef}
            value={newPrompt}
            onChange={e => {
              setNewPrompt(e.target.value)
              if (inputRef.current) {
                inputRef.current.style.height = 'auto'
                inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px'
              }
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFollowUp() }
            }}
            placeholder={status === 'streaming' ? 'Agent is running…' : 'Ask a follow-up or request changes…'}
            disabled={status === 'streaming' || status === 'loading'}
            rows={1}
            className="flex-1 px-4 py-3 text-sm outline-none disabled:opacity-40 resize-none leading-relaxed"
            style={{ background: 'transparent', color: 'var(--foreground)', minHeight: 44, maxHeight: 120 }}
          />
          <div className="flex items-end p-2 gap-2">
            <span className="text-[10px] pb-2.5 hidden sm:block" style={{ color: 'var(--muted)' }}>⇧↵ newline</span>
            <button
              onClick={handleFollowUp}
              disabled={!newPrompt.trim() || sending || status === 'streaming' || status === 'loading'}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:opacity-90 disabled:opacity-30 disabled:scale-100 flex-shrink-0"
              style={{
                background: 'var(--accent)',
                boxShadow: newPrompt.trim() ? '0 0 14px rgba(217,215,182,0.3)' : 'none',
              }}
            >
              {sending
                ? <Loader2 size={13} color="#1a1910" className="animate-spin" />
                : <Send size={13} color="#1a1910" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
