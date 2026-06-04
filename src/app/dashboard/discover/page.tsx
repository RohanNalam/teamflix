import { Search, Bookmark } from 'lucide-react'

const templates = [
  { title: 'Support Triage Bot', category: 'Support', description: 'Auto-categorize and route incoming support tickets using AI.', stars: 142 },
  { title: 'PR Review Agent', category: 'Engineering', description: 'Automatically reviews pull requests for bugs, style, and test coverage.', stars: 98 },
  { title: 'Sales Prospecting', category: 'Sales', description: 'Research leads and draft personalized outreach emails at scale.', stars: 74 },
  { title: 'Incident Responder', category: 'DevOps', description: 'Monitors alerts and drafts runbooks when incidents occur.', stars: 61 },
  { title: 'Doc Generator', category: 'Engineering', description: 'Reads source code and writes developer documentation automatically.', stars: 55 },
  { title: 'Data Pipeline Builder', category: 'Data', description: 'Generates ETL pipelines from natural language descriptions.', stars: 49 },
  { title: 'HR Onboarding', category: 'HR', description: 'Walks new hires through onboarding tasks and answers questions.', stars: 38 },
  { title: 'Finance Reconciler', category: 'Finance', description: 'Reconciles transactions and flags anomalies in spreadsheets.', stars: 31 },
]

const categories = ['All', 'Engineering', 'Support', 'Sales', 'DevOps', 'Data', 'Finance', 'HR']

export default function DiscoverPage() {
  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Discover</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Browse agent templates built by the community.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
        <input
          placeholder="Search templates…"
          className="w-full max-w-md pl-8 pr-4 py-2 rounded-lg text-sm border outline-none"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((c, i) => (
          <button key={c} className="px-3 py-1 rounded-full text-xs font-medium border transition-colors"
            style={i === 0
              ? { background: 'var(--orange)', color: '#000', borderColor: 'var(--orange)' }
              : { background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }
            }>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map(t => (
          <div key={t.title} className="rounded-xl border p-5 hover:border-orange-500/30 transition-colors group" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#f9731618', color: 'var(--orange)' }}>{t.category}</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Bookmark size={13} style={{ color: 'var(--muted)' }} />
              </button>
            </div>
            <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--foreground)' }}>{t.title}</h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{t.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--muted)' }}>★ {t.stars}</span>
              <button className="text-xs px-3 py-1 rounded font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>Use</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
