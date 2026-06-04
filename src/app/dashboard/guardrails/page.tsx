'use client'
import { useState } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'

const defaultRules = [
  { id: '1', label: 'Block production deploys', description: 'Agents cannot run deploy commands targeting production.', enabled: true, severity: 'high' },
  { id: '2', label: 'Require test coverage', description: 'Sessions must maintain ≥80% test coverage before merging.', enabled: true, severity: 'medium' },
  { id: '3', label: 'No credential commits', description: 'Block any commit that contains API keys or secrets.', enabled: true, severity: 'high' },
  { id: '4', label: 'Spend limit per session', description: 'Cap each session at $5 of API spend automatically.', enabled: false, severity: 'low' },
  { id: '5', label: 'Human approval for PRs', description: 'Require a human to approve before any PR is opened.', enabled: false, severity: 'medium' },
]

const severityColor: Record<string, string> = {
  high: '#ef4444',
  medium: '#f97316',
  low: '#6b7280',
}

export default function GuardrailsPage() {
  const [rules, setRules] = useState(defaultRules)

  const toggle = (id: string) => setRules(r => r.map(rule => rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Guardrails</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Safety rules that apply to all agent sessions.</p>
      </div>

      <div className="space-y-3">
        {rules.map(rule => (
          <div key={rule.id} className="rounded-xl border p-5 flex items-center gap-4 transition-colors hover:border-orange-500/20" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-2)' }}>
              {rule.severity === 'high'
                ? <AlertTriangle size={15} style={{ color: severityColor[rule.severity] }} />
                : <Shield size={15} style={{ color: severityColor[rule.severity] }} />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{rule.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase" style={{ color: severityColor[rule.severity], background: severityColor[rule.severity] + '18' }}>{rule.severity}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{rule.description}</p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => toggle(rule.id)}
              className="relative w-9 h-5 rounded-full transition-colors flex-shrink-0"
              style={{ background: rule.enabled ? 'var(--orange)' : 'var(--border)' }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 rounded-full transition-transform"
                style={{ background: '#fff', left: rule.enabled ? '18px' : '2px' }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
