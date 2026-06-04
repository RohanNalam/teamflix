'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import {
  Layers,
  Bot,
  Compass,
  Activity,
  Shield,
  AlignJustify,
  Key,
  Plug,
  Settings,
  Plus,
  ChevronDown,
  Tv2,
  LogOut,
} from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'

const nav = [
  { label: 'BUILD', items: [
    { href: '/dashboard/sessions', icon: Layers, label: 'Sessions' },
    { href: '/dashboard/agents', icon: Bot, label: 'Agents' },
  ]},
  { label: 'OBSERVE', items: [
    { href: '/dashboard/discover', icon: Compass, label: 'Discover' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  ]},
  { label: 'GOVERN', items: [
    { href: '/dashboard/context', icon: AlignJustify, label: 'Context' },
    { href: '/dashboard/guardrails', icon: Shield, label: 'Guardrails' },
  ]},
  { label: 'MANAGE', items: [
    { href: '/dashboard/api-keys', icon: Key, label: 'API Keys' },
    { href: '/dashboard/integrations', icon: Plug, label: 'Integrations' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ]},
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const initials = user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? '?'
  const displayName = user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? 'User'
  const email = user?.emailAddresses?.[0]?.emailAddress ?? ''

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col h-screen border-r relative" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      {/* Logo */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
            <Tv2 size={14} className="text-black" />
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: 'var(--foreground)' }}>teamflix</span>
        </Link>
      </div>

      {/* Workspace */}
      <div className="px-3 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <button className="w-full flex items-center justify-between px-2 py-1.5 rounded text-sm hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded text-xs font-bold flex items-center justify-center" style={{ background: '#f97316', color: '#000' }}>
              {initials}
            </div>
            <span className="text-sm truncate max-w-24" style={{ color: 'var(--foreground)' }}>Personal</span>
          </div>
          <ChevronDown size={13} style={{ color: 'var(--muted)' }} />
        </button>

        <Link
          href="/dashboard/sessions"
          className="w-full mt-1 flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium transition-colors hover:opacity-90"
          style={{ color: 'var(--orange)', background: '#f9731612' }}
        >
          <Plus size={13} />
          Create Session
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {nav.map(group => (
          <div key={group.label}>
            <p className="px-2 mb-1 text-[10px] font-semibold tracking-widest" style={{ color: 'var(--muted)' }}>{group.label}</p>
            {group.items.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2.5 px-2 py-1.5 rounded text-sm transition-colors mb-0.5',
                    active ? 'font-medium' : 'hover:bg-white/5'
                  )}
                  style={active ? { background: '#f9731618', color: 'var(--orange)' } : { color: '#b0b0b0' }}
                >
                  <item.icon size={14} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t relative" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setUserMenuOpen(o => !o)}
          className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-white/5 transition-colors"
        >
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--orange)', color: '#000' }}>
              {initials}
            </div>
          )}
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>{displayName}</p>
            <p className="text-[10px] truncate" style={{ color: 'var(--muted)' }}>{email}</p>
          </div>
          <ChevronDown size={12} style={{ color: 'var(--muted)' }} />
        </button>

        {/* User popup menu */}
        {userMenuOpen && (
          <div className="absolute bottom-14 left-3 right-3 rounded-xl border overflow-hidden shadow-xl z-50" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-white/5 transition-colors" style={{ color: 'var(--foreground)' }}>
              <Settings size={13} style={{ color: 'var(--muted)' }} />
              Settings
            </Link>
            <div style={{ borderTop: '1px solid var(--border)' }} />
            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-red-500/10 transition-colors"
              style={{ color: '#ef4444' }}
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
