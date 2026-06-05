import { currentUser } from '@clerk/nextjs/server'
import { Users, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function QuickstartPage() {
  const user = await currentUser()
  const firstName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'there'

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-8 py-20">
      <div className="text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Quickstart</p>
        <h1 className="font-bold mb-3" style={{ fontSize: 40, letterSpacing: '-1px', color: 'var(--foreground)' }}>
          Welcome back, {firstName}
        </h1>
        <p className="text-base" style={{ color: 'var(--muted)' }}>What do you want to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        <Link href="/dashboard/sessions" className="group rounded-2xl p-8 border transition-all hover:border-[#878672]" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
            <Users size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>Team workspace</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            Collaborate on sessions, share agent templates, and manage repos with your team.
          </p>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            Get started <ArrowRight size={14} />
          </span>
        </Link>

        <Link href="/dashboard/agents" className="group rounded-2xl p-8 border transition-all hover:border-[#878672]" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
            <Zap size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>Personal session</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            Launch a cloud session solo, connect your GitHub, and start building right now.
          </p>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            Get started <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  )
}
