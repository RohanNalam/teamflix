'use client'

import { useState, useTransition } from 'react'
import { Plus, Copy, Eye, EyeOff, Trash2, X, Check } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { createApiKey, deleteApiKey } from '@/app/actions/api-keys'

export default function ApiKeysClient({ initialKeys }: { initialKeys: any[] }) {
  const [keys, setKeys] = useState(initialKeys)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [keyType, setKeyType] = useState<'live' | 'test'>('test')
  const [isPending, startTransition] = useTransition()

  const toggleReveal = (id: string) => setRevealed(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next
  })

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const mask = (key: string) => key.slice(0, 12) + '••••••••••••••••'

  const handleCreate = () => {
    if (!keyName.trim()) return
    startTransition(async () => {
      await createApiKey(keyName.trim(), keyType)
      setKeyName(''); setShowModal(false)
      // Re-fetch by reloading — server action revalidates
      window.location.reload()
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteApiKey(id)
      setKeys(prev => prev.filter(k => k.id !== id))
    })
  }

  return (
    <div className="px-8 py-8">
      <PageHeader
        title="API Keys"
        description="Use these keys to authenticate with the Teamflix API."
        action={
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80" style={{ background: 'var(--accent)', color: '#1a1910' }}>
            <Plus size={15} /> New Key
          </button>
        }
      />

      <div className="rounded-2xl border overflow-hidden mb-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        {keys.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>No API keys yet</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Create a key to start using the Teamflix API.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Name', 'Type', 'Key', 'Created', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.map((k, i) => (
                <tr key={k.id} className="hover:bg-white/3 transition-colors" style={i < keys.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}>
                  <td className="px-5 py-4 font-medium text-sm" style={{ color: 'var(--foreground)' }}>{k.name}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={k.type === 'live' ? { background: '#22c55e18', color: '#22c55e' } : { background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                      {k.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                      {revealed.has(k.id) ? k.key : mask(k.key)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--muted)' }}>
                    {new Date(k.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleReveal(k.id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        {revealed.has(k.id) ? <EyeOff size={13} style={{ color: 'var(--muted)' }} /> : <Eye size={13} style={{ color: 'var(--muted)' }} />}
                      </button>
                      <button onClick={() => copyKey(k.key, k.id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        {copied === k.id ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} style={{ color: 'var(--muted)' }} />}
                      </button>
                      <button onClick={() => handleDelete(k.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors group">
                        <Trash2 size={13} className="group-hover:text-red-400" style={{ color: 'var(--muted)' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* API docs box */}
      <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--foreground)' }}>Using the API</h3>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>Pass your key as a Bearer token in the Authorization header:</p>
        <pre className="text-xs rounded-xl p-4 overflow-x-auto font-mono" style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>
{`curl https://api.teamflix.dev/v1/sessions \\
  -H "Authorization: Bearer tf_live_..."`}
        </pre>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: '#00000080' }}>
          <div className="w-full max-w-sm rounded-2xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>New API Key</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <X size={16} style={{ color: 'var(--muted)' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Name</label>
                <input value={keyName} onChange={e => setKeyName(e.target.value)} placeholder="e.g. Production" className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['test', 'live'] as const).map(t => (
                    <button key={t} onClick={() => setKeyType(t)} className="py-2 rounded-xl text-sm font-semibold border transition-all capitalize" style={keyType === t ? { background: 'var(--accent)', color: '#1a1910', borderColor: 'var(--accent)' } : { background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>Cancel</button>
              <button onClick={handleCreate} disabled={!keyName.trim() || isPending} className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40" style={{ background: 'var(--accent)', color: '#1a1910' }}>
                {isPending ? 'Creating…' : 'Create Key'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
