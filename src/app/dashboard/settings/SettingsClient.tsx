'use client'

import { useState, useTransition } from 'react'
import { saveUserSettings } from '@/app/actions/settings'
import { useToast } from '@/components/Toast'

const AGENTS = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

interface Props {
  user: { displayName: string; email: string; imageUrl: string }
  settings: { workspace_name: string; default_agent: string }
}

export default function SettingsClient({ user, settings }: Props) {
  const [workspaceName, setWorkspaceName] = useState(settings.workspace_name)
  const [defaultAgent, setDefaultAgent] = useState(settings.default_agent)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const initials = user.displayName?.[0] ?? user.email?.[0]?.toUpperCase() ?? '?'

  const handleSave = () => {
    startTransition(async () => {
      await saveUserSettings(workspaceName, defaultAgent)
      toast('Settings saved')
    })
  }

  return (
    <div className="px-8 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-bold mb-1.5" style={{ fontSize: 26, letterSpacing: '-0.5px', color: 'var(--foreground)' }}>Settings</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Manage your workspace and account preferences.</p>
      </div>

      {/* Profile */}
      <section className="mb-8">
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Profile</h2>
        <div className="rounded-2xl border p-6 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-4 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--accent)', color: '#1a1910' }}>
                {initials}
              </div>
            )}
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{user.displayName || 'No name set'}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{user.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</label>
            <input value={user.email} disabled className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none opacity-50 cursor-not-allowed" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Managed by your sign-in provider.</p>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section className="mb-8">
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Workspace</h2>
        <div className="rounded-2xl border p-6 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Workspace Name</label>
            <input
              value={workspaceName}
              onChange={e => setWorkspaceName(e.target.value)}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Default Agent</label>
            <select
              value={defaultAgent}
              onChange={e => setDefaultAgent(e.target.value)}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              {AGENTS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ background: 'var(--accent)', color: '#1a1910' }}
            >
              {isPending ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#ef4444' }}>Danger Zone</h2>
        <div className="rounded-2xl border p-6" style={{ background: 'var(--surface)', borderColor: '#ef444430' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Delete Account</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Permanently delete all sessions, agents, keys, and data.</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-red-500 hover:text-white hover:border-red-500" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
