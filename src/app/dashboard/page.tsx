import { currentUser } from '@clerk/nextjs/server'
import { getSessions } from '@/app/actions/sessions'
import { getAgents } from '@/app/actions/agents'
import { Users, Zap, ArrowRight, Layers, Bot } from 'lucide-react'
import Link from 'next/link'

export default async function QuickstartPage() {
  const [user, sessions, agents] = await Promise.all([
    currentUser(),
    getSessions(),
    getAgents(),
  ])

  const firstName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'there'
  const activeSessions = sessions.filter(s => s.status === 'active').length
  const connectedAgents = agents.filter(a => a.status === 'connected').length
  const isNewUser = sessions.length === 0 && agents.length === 0

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-8 py-20">
      <div className="text-center mb-12 w-full max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
          {isNewUser ? 'Quickstart' : 'Dashboard'}
        </p>
        <h1 className="font-bold mb-3" style={{ fontSize: 40, letterSpacing: '-1px', color: 'var(--foreground)' }}>
          Welcome back, {firstName}
        </h1>
        <p className="text-base" style={{ color: 'var(--muted)' }}>
          {isNewUser ? 'Get started by creating a session or connecting an agent.' : 'Here\'s what\'s happening with your workspace.'}
        </p>
      </div>

      {/* Live stats — shown once user has data */}
      {!isNewUser && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mb-8">
          <div className="rounded-2xl border p-5 flex items-center gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-dim)' }}>
              <Layers size={18} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{sessions.length}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{activeSessions} active · {sessions.length} total sessions</p>
            </div>
          </div>
          <div className="rounded-2xl border p-5 flex items-center gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-dim)' }}>
              <Bot size={18} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{connectedAgents}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>agents connected</p>
            </div>
          </div>
        </div>
      )}

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        <Link href="/dashboard/sessions" className="group rounded-2xl p-8 border transition-all hover:border-[#878672]" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
            <Users size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            {isNewUser ? 'Team workspace' : 'View Sessions'}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            {isNewUser
              ? 'Collaborate on sessions, share agent templates, and manage repos with your team.'
              : `You have ${sessions.length} session${sessions.length !== 1 ? 's' : ''}. ${activeSessions > 0 ? `${activeSessions} currently active.` : ''}`
            }
          </p>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {isNewUser ? 'Get started' : 'Open sessions'} <ArrowRight size={14} />
          </span>
        </Link>

        <Link href="/dashboard/agents" className="group rounded-2xl p-8 border transition-all hover:border-[#878672]" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
            <Zap size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            {isNewUser ? 'Connect an agent' : 'Manage Agents'}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            {isNewUser
              ? 'Connect Claude Code, Cursor, or any major coding agent to start building.'
              : `${connectedAgents} agent${connectedAgents !== 1 ? 's' : ''} connected and ready to run.`
            }
          </p>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {isNewUser ? 'Connect agent' : 'View agents'} <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  )
}
