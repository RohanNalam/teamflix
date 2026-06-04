import Link from 'next/link'
import { Tv2, Zap, Shield, Eye, Users, ArrowRight, Terminal } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Agent Sessions', description: 'Spin up sandboxed cloud workspaces for any AI coding agent in seconds.' },
  { icon: Eye, title: 'Full Observability', description: 'Watch every action, commit, and cost in real time across your whole team.' },
  { icon: Shield, title: 'Guardrails', description: 'Set rules that agents must follow — block deploys, require tests, cap spend.' },
  { icon: Users, title: 'Team Workflows', description: 'Share templates, split work by department, and collaborate with non-engineers.' },
]

const agents = ['Claude Code', 'Cursor', 'Codex', 'Copilot', 'Gemini CLI', 'Devin']

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Nav */}
      <header className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm" style={{ borderColor: 'var(--border)', background: '#0a0a0aee' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
            <Tv2 size={14} className="text-black" />
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: 'var(--foreground)' }}>teamflix</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--muted)' }}>
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#agents" className="hover:text-white transition-colors">Agents</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Docs</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            Sign in
          </Link>
          <Link href="/dashboard" className="text-sm px-3 py-1.5 rounded-lg font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-32 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs mb-8" style={{ borderColor: '#f9731640', color: 'var(--orange)', background: '#f9731610' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
          Now supporting 6 coding agents
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--foreground)' }}>
          AI agents for<br />
          <span style={{ color: 'var(--orange)' }}>every team</span>
        </h1>
        <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
          Deploy sandboxed coding agents with your company&apos;s context, integrations, and guardrails — without months of infrastructure work.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
            Start for free <ArrowRight size={15} />
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-xl border text-sm hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            <Terminal size={14} />
            View docs
          </Link>
        </div>
      </section>

      {/* Agents strip */}
      <section id="agents" className="border-y py-8" style={{ borderColor: 'var(--border)' }}>
        <p className="text-center text-xs font-semibold tracking-widest mb-6" style={{ color: 'var(--muted)' }}>WORKS WITH EVERY MAJOR CODING AGENT</p>
        <div className="flex items-center justify-center gap-8 flex-wrap px-6">
          {agents.map(a => (
            <span key={a} className="text-sm font-medium" style={{ color: '#555' }}>{a}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>Everything your team needs</h2>
        <p className="text-center mb-16 text-sm" style={{ color: 'var(--muted)' }}>Built for engineering leaders, product teams, and every department in between.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(f => (
            <div key={f.title} className="rounded-xl border p-6 hover:border-orange-500/30 transition-colors" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: '#f9731618' }}>
                <f.icon size={18} style={{ color: 'var(--orange)' }} />
              </div>
              <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--foreground)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-lg mx-auto rounded-2xl border p-10" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Ready to ship faster?</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>Get your team running AI agents today. No infrastructure required.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>
            Launch teamflix <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
            <Tv2 size={10} className="text-black" />
          </div>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>teamflix</span>
        </div>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>© 2026 Teamflix. All rights reserved.</p>
      </footer>
    </div>
  )
}
