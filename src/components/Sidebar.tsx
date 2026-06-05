'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Layers, Bot, Compass, Activity, Shield,
  AlignJustify, Key, Plug, Settings, Plus,
  Tv2, LogOut, ChevronDown,
} from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'

const nav = [
  { label: 'Build', items: [
    { href: '/dashboard/sessions', icon: Layers, label: 'Sessions' },
    { href: '/dashboard/agents', icon: Bot, label: 'Agents' },
  ]},
  { label: 'Observe', items: [
    { href: '/dashboard/discover', icon: Compass, label: 'Discover' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  ]},
  { label: 'Govern', items: [
    { href: '/dashboard/context', icon: AlignJustify, label: 'Context' },
    { href: '/dashboard/guardrails', icon: Shield, label: 'Guardrails' },
  ]},
  { label: 'Manage', items: [
    { href: '/dashboard/api-keys', icon: Key, label: 'API Keys' },
    { href: '/dashboard/integrations', icon: Plug, label: 'Integrations' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ]},
]

export default function Sidebar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <aside className="flex flex-col h-screen border-r" style={{ width: 220, background: 'var(--surface)', borderColor: 'var(--border)', flexShrink: 0 }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Tv2 size={15} color="#1a1910" />
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: 'var(--foreground)' }}>teamflix</span>
        </Link>
      </div>

      {/* New Session */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
          style={{ background: 'var(--accent)', color: '#1a1910' }}
        >
          <Plus size={15} />
          New Session
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {nav.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              {group.label}
            </p>
            {group.items.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5', !active && 'hover:bg-white/5')}
                  style={active
                    ? { background: 'var(--accent-dim)', color: 'var(--accent)', borderLeft: '2px solid var(--accent)', paddingLeft: 10 }
                    : { color: 'var(--muted)' }
                  }
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t relative" style={{ borderColor: 'var(--border)' }}>
        {menuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-1 rounded-xl border overflow-hidden shadow-2xl z-50" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <Link href="/dashboard/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors" style={{ color: 'var(--foreground)' }}>
              <Settings size={14} style={{ color: 'var(--muted)' }} />
              Settings
            </Link>
            <div style={{ borderTop: '1px solid var(--border)' }} />
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-red-900/20 transition-colors" style={{ color: '#ef4444' }}>
              <LogOut size={14} />
              Sign out
            </Link>
          </div>
        )}
        <button onClick={() => setMenuOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'var(--accent)', color: '#1a1910' }}>
            R
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>Rohan Nalam</p>
            <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>rohannalam1@gmail.com</p>
          </div>
          <ChevronDown size={13} style={{ color: 'var(--muted)' }} />
        </button>
      </div>
    </aside>
  )
}
