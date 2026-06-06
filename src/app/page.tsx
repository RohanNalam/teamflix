'use client'

import Link from 'next/link'
import { Tv2, Zap, Shield, Eye, Users, ArrowRight, CheckCircle2, Bot, Terminal, Activity, Layers } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Sessions',
    description: 'Spin up a sandboxed AI coding environment in seconds — no setup, no config.',
    color: '#D9D7B6',
  },
  {
    icon: Eye,
    title: 'Live Observability',
    description: 'See every commit, file change, and cost across all your agents in real time.',
    color: '#a78bfa',
  },
  {
    icon: Shield,
    title: 'Team Guardrails',
    description: 'Block risky actions, require test coverage, and cap spend per session automatically.',
    color: '#34d399',
  },
  {
    icon: Users,
    title: 'Built for Teams',
    description: 'Engineering, support, sales — every team gets their own agents and workflows.',
    color: '#fb923c',
  },
]

const agents = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin', 'Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

const perks = ['No infrastructure to manage', 'Works with your existing repos', 'No credit card required', 'Up and running in minutes']

const stats = [
  { value: '10×', label: 'Faster shipping' },
  { value: '6+', label: 'AI agents supported' },
  { value: '100%', label: 'Observable' },
]

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Sticky Nav ── */}
      <header className="sticky top-0 z-50 glass-strong" style={{ borderBottom: '1px solid rgba(84,83,51,0.4)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Tv2 size={15} color="#1a1910" />
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: 'var(--foreground)' }}>teamflix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            <Link href="#features" className="hover:text-[#FDFBD4] transition-colors">Features</Link>
            <Link href="#agents" className="hover:text-[#FDFBD4] transition-colors">Integrations</Link>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: 'var(--accent)', color: '#1a1910' }}
          >
            Open App <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 text-center overflow-hidden">

        {/* Glow orbs */}
        <div className="glow-orb animate-glow-pulse" style={{ width: 600, height: 600, background: 'radial-gradient(circle, #D9D7B618 0%, transparent 70%)', top: -200, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="glow-orb animate-glow-pulse delay-300" style={{ width: 300, height: 300, background: 'radial-gradient(circle, #87867218 0%, transparent 70%)', top: 100, left: '15%' }} />
        <div className="glow-orb animate-glow-pulse delay-500" style={{ width: 250, height: 250, background: 'radial-gradient(circle, #D9D7B610 0%, transparent 70%)', top: 50, right: '10%' }} />

        {/* Badge */}
        <div className="animate-fade-in flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold" style={{ color: 'var(--accent)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
            </span>
            Now live — AI agent management for every team
          </div>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in delay-100 font-bold leading-none mb-6 relative z-10" style={{ fontSize: 'clamp(48px, 7vw, 84px)', letterSpacing: '-2.5px' }}>
          Ship faster with<br />
          <span className="shimmer-text">AI on your team</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in delay-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed relative z-10" style={{ color: 'var(--muted)' }}>
          Teamflix gives every department their own AI coding agents — with the guardrails, context, and visibility your team actually needs.
        </p>

        {/* CTA */}
        <div className="animate-fade-in delay-300 flex items-center justify-center gap-4 flex-wrap mb-12 relative z-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:scale-105 hover:shadow-xl"
            style={{ background: 'var(--accent)', color: '#1a1910', boxShadow: '0 0 30px rgba(217,215,182,0.2)' }}
          >
            Open app <ArrowRight size={16} />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base glass transition-all hover:border-[#878672]"
            style={{ color: 'var(--muted)' }}
          >
            See how it works
          </Link>
        </div>

        {/* Perks */}
        <div className="animate-fade-in delay-400 flex items-center justify-center gap-6 flex-wrap relative z-10">
          {perks.map(p => (
            <div key={p} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--accent)' }} />
              {p}
            </div>
          ))}
        </div>

        {/* Floating UI preview card */}
        <div className="animate-fade-in delay-500 animate-float mt-20 relative z-10 mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl overflow-hidden" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(217,215,182,0.1)' }}>
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
              </div>
              <div className="flex items-center gap-2 mx-auto">
                <Terminal size={13} style={{ color: 'var(--accent)' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>teamflix · claude-code · active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#22c55e' }} />
                </span>
              </div>
            </div>
            {/* Fake chat */}
            <div className="px-5 py-5 space-y-4 text-left">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: 'var(--accent)', color: '#1a1910' }}>U</div>
                <div className="px-3 py-2 rounded-xl rounded-tl-sm text-sm" style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                  Build a REST API with authentication and rate limiting
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#D9D7B615', border: '1px solid var(--border)' }}>
                  <Bot size={12} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 text-sm space-y-1" style={{ color: '#D9D7B6' }}>
                  <p>I'll scaffold a production-ready REST API for you. Starting with:</p>
                  <div className="mt-2 px-3 py-2.5 rounded-lg font-mono text-xs leading-relaxed" style={{ background: '#0f0e07', color: '#D9D7B6', border: '1px solid var(--border)' }}>
                    <span style={{ color: '#a78bfa' }}>const</span> <span style={{ color: '#FDFBD4' }}>app</span> = <span style={{ color: '#34d399' }}>express</span>();{'\n'}
                    app.<span style={{ color: '#fb923c' }}>use</span>(<span style={{ color: '#34d399' }}>rateLimiter</span>({'{ max: 100 })'}));
                  </div>
                  <span className="inline-block w-1.5 h-3.5 ml-0.5 animate-pulse rounded-sm" style={{ background: 'var(--accent)', verticalAlign: 'text-bottom' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="font-bold mb-1" style={{ fontSize: 42, letterSpacing: '-2px', color: 'var(--foreground)' }}>{s.value}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent marquee ── */}
      <section id="agents" className="py-12 overflow-hidden" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="text-center text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: 'var(--muted)' }}>Works with every major coding agent</p>
        <div
          className="flex overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="animate-marquee flex gap-16 whitespace-nowrap">
            {agents.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <Bot size={12} style={{ color: 'var(--muted)' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Platform</p>
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1.5px', color: 'var(--foreground)' }}>Everything in one place</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>No stitching together a dozen tools. Teamflix handles the entire AI agent lifecycle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-7 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
          {/* Glow inside CTA */}
          <div className="glow-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, #D9D7B610 0%, transparent 70%)', top: -100, right: -100 }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Workflow</p>
              <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-1px', color: 'var(--foreground)' }}>
                From prompt to<br />production in minutes
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                Describe what you want to build. Teamflix spins up an agent session, runs the code, and gives you full visibility into every step.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'var(--accent)', color: '#1a1910' }}
              >
                Launch teamflix <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-1 gap-3 w-full max-w-xs">
              {[
                { icon: Layers, label: 'Start a session', desc: 'Pick an agent, describe the task' },
                { icon: Activity, label: 'Watch it run', desc: 'Real-time logs and file changes' },
                { icon: Terminal, label: 'Ship the result', desc: 'Review, approve, and deploy' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 px-4 py-4 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
                    <step.icon size={15} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{i + 1}. {step.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl text-center py-20 px-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="glow-orb animate-glow-pulse" style={{ width: 500, height: 300, background: 'radial-gradient(circle, #D9D7B614 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="relative z-10">
            <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px', color: 'var(--foreground)' }}>
              Your team deserves<br />better tools
            </h2>
            <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Start running AI agents across your team today. No credit card, no infrastructure, no headaches.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'var(--accent)', color: '#1a1910', boxShadow: '0 0 40px rgba(217,215,182,0.2)' }}
            >
              Launch teamflix free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Tv2 size={11} color="#1a1910" />
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>teamflix</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} Teamflix. Built for teams that ship.</p>
        </div>
      </footer>
    </div>
  )
}
