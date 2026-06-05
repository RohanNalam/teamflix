'use client'

import { useState, useTransition } from 'react'
import { FileText, Save } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { saveContextInstructions } from '@/app/actions/context'
import { useToast } from '@/components/Toast'

export default function ContextClient({ savedInstructions }: { savedInstructions: string }) {
  const [instructions, setInstructions] = useState(savedInstructions || 'You are a coding agent working on the teamflix platform. Always follow TypeScript standards, write tests for new features, and prefer functional patterns.')
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleSave = () => {
    startTransition(async () => {
      await saveContextInstructions(instructions)
      toast('Global instructions saved')
    })
  }

  const charCount = instructions.length

  return (
    <div className="px-8 py-8">
      <PageHeader
        title="Context"
        description="Instructions and files injected into every agent session."
      />

      {/* Info banner */}
      <div className="rounded-2xl border p-4 mb-8 flex items-start gap-3" style={{ borderColor: '#D9D7B630', background: '#D9D7B608' }}>
        <FileText size={15} style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0 }} />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          Context is automatically prepended to every agent session. Use it to share coding standards, architecture decisions, and project-specific instructions so every agent starts with the right knowledge.
        </p>
      </div>

      {/* Instructions editor */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <FileText size={14} style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Global Instructions</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{charCount} chars</span>
        </div>
        <textarea
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          rows={12}
          placeholder="Write instructions for your agents here…"
          className="w-full p-5 text-sm outline-none resize-none font-mono leading-relaxed"
          style={{ background: 'transparent', color: 'var(--foreground)' }}
        />
        <div className="px-5 py-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Supports plain text and markdown.</p>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ background: 'var(--accent)', color: '#1a1910' }}
          >
            <Save size={14} />
            {isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
