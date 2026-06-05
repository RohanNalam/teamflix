'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'
import { useToast } from '@/components/Toast'

const AGENTS = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState('Personal')
  const [defaultAgent, setDefaultAgent] = useState('Claude Code')
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('user_settings').select('workspace_name, default_agent').eq('user_id', getDeviceId()).single()
      if (data) { setWorkspaceName(data.workspace_name); setDefaultAgent(data.default_agent) }
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    await supabase.from('user_settings').upsert({ user_id: getDeviceId(), workspace_name: workspaceName, default_agent: defaultAgent, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    setSaving(false)
    toast('Settings saved')
  }

  return (
    <div className="px-8 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-bold mb-1.5" style={{ fontSize: 26, letterSpacing: '-0.5px', color: 'var(--foreground)' }}>Settings</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Manage your workspace preferences.</p>
      </div>
      <section className="mb-8">
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Workspace</h2>
        <div className="rounded-2xl border p-6 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Workspace Name</label>
            <input value={workspaceName} onChange={e => setWorkspaceName(e.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Default Agent</label>
            <select value={defaultAgent} onChange={e => setDefaultAgent(e.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              {AGENTS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40" style={{ background: 'var(--accent)', color: '#1a1910' }}>{saving ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#ef4444' }}>Danger Zone</h2>
        <div className="rounded-2xl border p-6" style={{ background: 'var(--surface)', borderColor: '#ef444430' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Clear all data</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Delete all your sessions, agents, and settings from this device.</p>
            </div>
            <button onClick={() => { localStorage.removeItem('teamflix_device_id'); window.location.href = '/' }} className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-red-500 hover:text-white hover:border-red-500" style={{ borderColor: '#ef4444', color: '#ef4444' }}>Clear</button>
          </div>
        </div>
      </section>
    </div>
  )
}
