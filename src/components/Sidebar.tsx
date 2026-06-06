'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Layers, Bot, Compass, Activity, Shield,
  AlignJustify, Key, Plug, Settings, Plus,
  Tv2, ChevronDown, Terminal,
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
    <aside
      className="flex flex-col h-screen border-r"
      style={{
        width: 224,
        background: 'rgba(26, 25, 16, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderColor: 'rgba(84, 83, 51, 0.5)',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(84,83,51,0.4)' }}>
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
            style={{ background: 'var(--accent)', boxShadow: '0 0 14px rgba(217,215,182,0.3)' }}
          >
            <Tv2 size={15} color="#1a1910" />
          </div>
          <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--foreground)' }}>teamflix</span>
        </Link>
      </div>

      {/* New Session */}
      <div className="px-3 py-3 border-b" style={{ borderColor: 'rgba(84,83,51,0.4)' }}>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-xs transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: 'var(--accent)',
            color: '#1a1910',
            boxShadow: '0 0 16px rgba(217,215,182,0.15)',
          }}
        >
          <Plus size={13} strokeWidth={2.5} />
          New Session
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5">
        {nav.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#545333' }}>
              {group.label}
            </p>
            {group.items.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all mb-0.5',
                    !active && 'hover:bg-white/5'
                  )}
                  style={active
                    ? {
                        background: 'rgba(217,215,182,0.1)',
                        color: 'var(--accent)',
                        borderLeft: '2px solid var(--accent)',
                        paddingLeft: 10,
                      }
                    : { color: 'var(--muted)' }
                  }
                >
                  <item.icon size={14} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Status bar */}
      <div className="px-3 py-2 mx-2.5 mb-2 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#22c55e' }} />
          </span>
          <span className="text-[10px] font-medium" style={{ color: 'var(--muted)' }}>Claude API connected</span>
          <Terminal size={10} className="ml-auto" style={{ color: 'var(--muted)' }} />
        </div>
      </div>

      {/* User */}
      <div className="border-t relative" style={{ borderColor: 'rgba(84,83,51,0.4)' }}>
        {menuOpen && (
          <div
            className="absolute bottom-full left-2 right-2 mb-1 rounded-xl border overflow-hidden shadow-2xl z-50"
            style={{ background: 'rgba(26,25,16,0.95)', borderColor: 'rgba(84,83,51,0.6)', backdropFilter: 'blur(20px)' }}
          >
            <Link
              href="/dashboard/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors"
              style={{ color: 'var(--foreground)' }}
            >
              <Settings size={13} style={{ color: 'var(--muted)' }} />
              Settings
            </Link>
          </div>
        )}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--accent)' }}
          >
            <Tv2 size={12} />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: 'var(--foreground)' }}>My Workspace</p>
            <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--muted)' }}>Personal</p>
          </div>
          <ChevronDown size={12} style={{ color: 'var(--muted)', transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>
    </aside>
  )
}
