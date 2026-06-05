import Link from 'next/link'
import { Tv2, Zap, Shield, Eye, Users, ArrowRight, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Instant Sessions', description: 'Spin up a sandboxed AI coding environment in seconds — no setup, no config.' },
  { icon: Eye, title: 'Live Observability', description: 'See every commit, file change, and cost across all your agents in real time.' },
  { icon: Shield, title: 'Team Guardrails', description: 'Block risky actions, require test coverage, and cap spend per session automatically.' },
  { icon: Users, title: 'Built for Teams', description: 'Engineering, support, sales — every team gets their own agents and workflows.' },
]

const agents = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

const perks = ['No infrastructure to manage', 'Works with your existing repos', 'No credit card required', 'Up and running in minutes']

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid var(--border)', background: '#1a1910ee' }} className="sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Tv2 size={15} color="#1a1910" />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--foreground)' }}>teamflix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            <Link href="#features" className="hover:text-[#FDFBD4] transition-colors">Features</Link>
            <Link href="#agents" className="hover:text-[#FDFBD4] transition-colors">Integrations</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm font-medium px-4 py-2 rounded-lg border hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              Sign in
            </Link>
            <Link href="/sign-up" className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80" style={{ background: 'var(--accent)', color: '#1a1910' }}>
              Get started free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <h1 className="font-bold leading-none mb-6" style={{ fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '-2px', color: 'var(--foreground)' }}>
          Ship faster with<br />
          <span style={{ color: 'var(--accent)' }}>AI on your team</span>
        </h1>
        <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'var(--muted)' }}>
          Teamflix gives every department their own AI coding agents — with the guardrails, context, and visibility your team actually needs.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
          <Link href="/sign-up" className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-opacity hover:opacity-80" style={{ background: 'var(--accent)', color: '#1a1910' }}>
            Get started <ArrowRight size={16} />
          </Link>
          <Link href="/sign-in" className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-base border hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            Sign in
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {perks.map(p => (
            <div key={p} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--accent)' }} />
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Agents bar */}
      <section id="agents" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: 'var(--muted)' }}>Works with every major coding agent</p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {agents.map(a => (
              <span key={a} className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ letterSpacing: '-1px', color: 'var(--foreground)' }}>Everything in one place</h2>
          <p className="text-base" style={{ color: 'var(--muted)' }}>No stitching together a dozen tools. Teamflix handles it all.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div key={f.title} className="rounded-2xl p-7 border transition-all hover:border-[#878672]" style={{ background: i === 0 ? 'var(--surface-2)' : 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
                <f.icon size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 pb-28">
        <div className="rounded-3xl p-14 text-center border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-4xl font-bold mb-4" style={{ letterSpacing: '-1px', color: 'var(--foreground)' }}>
            Your team deserves<br />better tools
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
            Create an account and start running AI agents across your team today. No credit card required.
          </p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-80" style={{ background: 'var(--accent)', color: '#1a1910' }}>
            Create your free account <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Tv2 size={11} color="#1a1910" />
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>teamflix</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} Teamflix.</p>
        </div>
      </footer>
    </div>
  )
}
