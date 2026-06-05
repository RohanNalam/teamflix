'use client'

import { useEffect, useState } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { supabase } from '@/lib/supabase'
import { getDeviceId } from '@/lib/device-id'
import { useToast } from '@/components/Toast'

const RULES = [
  { id: 'block-prod-deploy', label: 'Block production deploys', description: 'Agents cannot run deploy commands targeting production.', defaultEnabled: true, severity: 'high' },
  { id: 'require-test-coverage', label: 'Require test coverage', description: 'Sessions must maintain ≥80% test coverage before merging.', defaultEnabled: true, severity: 'medium' },
  { id: 'no-credential-commits', label: 'No credential commits', description: 'Block any commit that contains API keys or secrets.', defaultEnabled: true, severity: 'high' },
  { id: 'spend-limit', label: 'Spend limit per session', description: 'Cap each session at $5 of API spend automatically.', defaultEnabled: false, severity: 'low' },
  { id: 'human-approval-prs', label: 'Human approval for PRs', description: 'Require a human to approve before any PR is opened.', defaultEnabled: false, severity: 'medium' },
]

const severityColor: Record<string, string> = { high: '#ef4444', medium: '#D9D7B6', low: '#878672' }

export default function GuardrailsPage() {
  const [states, setStates] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('guardrails').select('rule_id, enabled').eq('user_id', getDeviceId())
      const map: Record<string, boolean> = {}
      RULES.forEach(r => { map[r.id] = r.defaultEnabled })
      data?.forEach((r: any) => { map[r.rule_id] = r.enabled })
      setStates(map)
    }
    load()
  }, [])

  const toggle = async (id: string) => {
    const next = !states[id]
    setStates(prev => ({ ...prev, [id]: next }))
    await supabase.from('guardrails').upsert({ user_id: getDeviceId(), rule_id: id, enabled: next }, { onConflict: 'user_id,rule_id' })
    toast(`${RULES.find(r => r.id === id)?.label} ${next ? 'enabled' : 'disabled'}`, next ? 'success' : 'error')
  }

  return (
    <div className="px-8 py-8">
      <PageHeader title="Guardrails" description="Safety rules that apply to all agent sessions. Changes save automatically." />
      <div className="space-y-3">
        {RULES.map(rule => (
          <div key={rule.id} className="rounded-2xl border p-5 flex items-center gap-4 transition-colors hover:border-[#878672]/20" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: severityColor[rule.severity] + '18' }}>
              {rule.severity === 'high' ? <AlertTriangle size={16} style={{ color: severityColor[rule.severity] }} /> : <Shield size={16} style={{ color: severityColor[rule.severity] }} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{rule.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide" style={{ color: severityColor[rule.severity], background: severityColor[rule.severity] + '18' }}>{rule.severity}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{rule.description}</p>
            </div>
            <button onClick={() => toggle(rule.id)} className="relative flex-shrink-0 rounded-full transition-colors" style={{ width: 40, height: 22, background: states[rule.id] ? 'var(--accent)' : 'var(--border)' }}>
              <span className="absolute top-1 rounded-full transition-all" style={{ width: 14, height: 14, background: '#1a1910', left: states[rule.id] ? 22 : 4 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
