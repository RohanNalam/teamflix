import { currentUser } from '@clerk/nextjs/server'
import { Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default async function QuickstartPage() {
  const user = await currentUser()
  const firstName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'there'

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-20">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
          <Zap size={16} className="text-black" />
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Quickstart</span>
      </div>

      <h1 className="text-4xl font-bold mb-3 text-center" style={{ color: 'var(--foreground)' }}>
        Welcome, {firstName}
      </h1>
      <p className="text-sm mb-12 text-center max-w-sm" style={{ color: 'var(--muted)' }}>
        Deploy AI coding agents across your team. How will you use teamflix?
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        <Link href="/dashboard/sessions" className="group rounded-xl p-6 border transition-all hover:border-orange-500/50 hover:bg-orange-500/5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="w-9 h-9 rounded-lg mb-4 flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
            <Users size={18} style={{ color: 'var(--orange)' }} />
          </div>
          <h2 className="font-semibold mb-1 text-sm" style={{ color: 'var(--foreground)' }}>Team</h2>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Collaborate on sessions, share templates, and manage repos together.
          </p>
          <span className="text-xs font-medium" style={{ color: 'var(--orange)' }}>Get started →</span>
        </Link>

        <Link href="/dashboard/agents" className="group rounded-xl p-6 border transition-all hover:border-orange-500/50 hover:bg-orange-500/5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="w-9 h-9 rounded-lg mb-4 flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
            <Zap size={18} style={{ color: 'var(--orange)' }} />
          </div>
          <h2 className="font-semibold mb-1 text-sm" style={{ color: 'var(--foreground)' }}>Personal</h2>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Launch cloud sessions, connect GitHub, and start building solo.
          </p>
          <span className="text-xs font-medium" style={{ color: 'var(--orange)' }}>Get started →</span>
        </Link>
      </div>
    </div>
  )
}
