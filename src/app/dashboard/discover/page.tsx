'use client'

import { useState } from 'react'
import { Search, Bookmark } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const templates = [
  { title: 'PR Review Agent', category: 'Engineering', description: 'Reviews pull requests for bugs, style issues, and missing test coverage automatically.' },
  { title: 'Support Triage', category: 'Support', description: 'Categorizes and routes incoming support tickets to the right team based on content.' },
  { title: 'Outreach Writer', category: 'Sales', description: 'Researches leads and drafts personalized outreach messages at scale.' },
  { title: 'Incident Responder', category: 'DevOps', description: 'Monitors alerts, drafts runbooks, and notifies the right people when things break.' },
  { title: 'Doc Generator', category: 'Engineering', description: 'Reads your source code and writes accurate developer documentation automatically.' },
  { title: 'ETL Builder', category: 'Data', description: 'Generates data pipelines from plain English descriptions of what you need.' },
  { title: 'Onboarding Guide', category: 'HR', description: 'Walks new team members through setup tasks and answers common questions.' },
  { title: 'Expense Reviewer', category: 'Finance', description: 'Scans transactions, flags anomalies, and summarizes spend by category.' },
]

const categories = ['All', 'Engineering', 'Support', 'Sales', 'DevOps', 'Data', 'Finance', 'HR']

export default function DiscoverPage() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const filtered = templates.filter(t =>
    (active === 'All' || t.category === active) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleSave = (title: string) => setSaved(prev => {
    const next = new Set(prev)
    next.has(title) ? next.delete(title) : next.add(title)
    return next
  })

  return (
    <div className="px-8 py-8">
      <PageHeader title="Discover" description="Ready-made agent templates to get your team running fast." />

      <div className="relative mb-5 max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search templates…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={active === c
              ? { background: 'var(--accent)', color: '#1a1910', borderColor: 'var(--accent)' }
              : { background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--muted)' }}>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>No templates found</p>
          <p className="text-xs">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(t => (
            <div key={t.title} className="rounded-2xl border p-5 hover:border-[#878672]/40 transition-colors group" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                  {t.category}
                </span>
                <button
                  onClick={() => toggleSave(t.title)}
                  className="transition-opacity"
                  style={{ opacity: saved.has(t.title) ? 1 : 0, color: 'var(--accent)' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = saved.has(t.title) ? '1' : '0')}
                >
                  <Bookmark size={13} fill={saved.has(t.title) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--foreground)' }}>{t.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{t.description}</p>
              <button className="w-full text-xs font-semibold py-2 rounded-xl transition-opacity hover:opacity-80" style={{ background: 'var(--accent)', color: '#1a1910' }}>
                Use template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
