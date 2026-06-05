'use client'

import { useEffect, useState } from 'react'
import { FileText, Save } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'
import { useToast } from '@/components/Toast'

export default function ContextPage() {
  const [instructions, setInstructions] = useState('')
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('context_instructions').select('content').eq('user_id', getDeviceId()).single()
      if (data?.content) setInstructions(data.content)
      else setInstructions('You are a coding agent. Always follow TypeScript standards, write tests for new features, and prefer functional patterns.')
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    await supabase.from('context_instructions').upsert({ user_id: getDeviceId(), content: instructions, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    setSaving(false)
    toast('Instructions saved')
  }

  return (
    <div className="px-8 py-8">
      <PageHeader title="Context" description="Instructions injected into every agent session." />
      <div className="rounded-2xl border p-4 mb-8 flex items-start gap-3" style={{ borderColor: '#D9D7B630', background: '#D9D7B608' }}>
        <FileText size={15} style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0 }} />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>Context is automatically prepended to every agent session. Use it to share coding standards, architecture decisions, and project-specific instructions.</p>
      </div>
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <FileText size={14} style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Global Instructions</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{instructions.length} chars</span>
        </div>
        <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={12} className="w-full p-5 text-sm outline-none resize-none font-mono leading-relaxed" style={{ background: 'transparent', color: 'var(--foreground)' }} />
        <div className="px-5 py-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Supports plain text and markdown.</p>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40" style={{ background: 'var(--accent)', color: '#1a1910' }}>
            <Save size={14} />{saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
