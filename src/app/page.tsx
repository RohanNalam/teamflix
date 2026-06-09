'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Tv2, Zap, Shield, Eye, Users, ArrowRight, CheckCircle2, Bot,
  Terminal, Activity, Layers, GitBranch, Sparkles, Lock, Gauge,
} from 'lucide-react'
import { Reveal, SpotlightCard, TypeWriter, CountUp } from '@/components/effects'

const agents = ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot', 'Gemini CLI', 'Devin']

const perks = ['No infrastructure to manage', 'Works with your existing repos', 'No credit card required']

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="noise" style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Floating Nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ padding: scrolled ? '10px 16px' : '0' }}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass-strong rounded-2xl max-w-4xl px-5 py-2.5' : 'max-w-6xl px-6 py-4'}`}
          style={scrolled ? { boxShadow: '0 8px 40px rgba(0,0,0,0.4)' } : { borderBottom: '1px solid rgba(84,83,51,0.3)' }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6 group-hover:scale-110" style={{ background: 'var(--accent)', boxShadow: '0 0 16px rgba(217,215,182,0.25)' }}>
              <Tv2 size={15} color="#15140d" />
            </div>
            <span className="font-bold text-base tracking-tight">teamflix</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            <Link href="#features" className="hover:text-[#FDFBD4] transition-colors">Features</Link>
            <Link href="#workflow" className="hover:text-[#FDFBD4] transition-colors">How it works</Link>
            <Link href="#agents" className="hover:text-[#FDFBD4] transition-colors">Integrations</Link>
          </div>
          <Link href="/dashboard" className="btn-primary flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl">
            Open App <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-44 pb-28 px-6 overflow-hidden">
        {/* layered background */}
        <div className="absolute inset-0 grid-bg" />
        <div className="glow-orb animate-glow-pulse" style={{ width: 700, height: 700, background: 'radial-gradient(circle, #D9D7B61c 0%, transparent 65%)', top: -280, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="glow-orb animate-glow-pulse delay-400" style={{ width: 340, height: 340, background: 'radial-gradient(circle, #a78bfa12 0%, transparent 70%)', top: 120, left: '8%' }} />
        <div className="glow-orb animate-glow-pulse delay-600" style={{ width: 300, height: 300, background: 'radial-gradient(circle, #fb923c10 0%, transparent 70%)', top: 60, right: '6%' }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-in flex justify-center mb-8">
            <Link href="/dashboard" className="group flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full glass text-xs font-semibold transition-all hover:border-[#D9D7B640]" style={{ color: 'var(--accent)' }}>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#22c55e' }} />
                </span>
                LIVE
              </span>
              AI agent management for every team
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in delay-100 font-bold leading-[0.95] mb-7" style={{ fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: '-3.5px' }}>
            Ship faster with<br />
            <span className="shimmer-text">AI on your team</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in delay-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--muted)' }}>
            Teamflix gives every department their own AI coding agents — with the guardrails, context, and visibility your team actually needs.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in delay-300 flex items-center justify-center gap-4 flex-wrap mb-10">
            <Link href="/dashboard" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base">
              Start building free <ArrowRight size={16} />
            </Link>
            <Link href="#workflow" className="btn-ghost flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base glass" style={{ color: 'var(--foreground)' }}>
              See how it works
            </Link>
          </div>

          {/* Perks */}
          <div className="animate-fade-in delay-400 flex items-center justify-center gap-6 flex-wrap mb-20">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent)' }} />
                {p}
              </div>
            ))}
          </div>

          {/* Hero terminal with live typing */}
          <div className="animate-fade-in-up delay-500 relative mx-auto max-w-3xl">
            {/* glow under terminal */}
            <div className="glow-orb" style={{ width: '80%', height: 120, background: 'radial-gradient(ellipse, #D9D7B622 0%, transparent 70%)', bottom: -40, left: '10%' }} />
            <div className="gradient-border">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 32px 100px rgba(0,0,0,0.6)' }}>
                {/* Terminal chrome */}
                <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: 'rgba(42,41,23,0.9)', borderBottom: '1px solid var(--border)' }}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full transition-transform hover:scale-125" style={{ background: '#ef4444' }} />
                    <div className="w-3 h-3 rounded-full transition-transform hover:scale-125" style={{ background: '#f59e0b' }} />
                    <div className="w-3 h-3 rounded-full transition-transform hover:scale-125" style={{ background: '#22c55e' }} />
                  </div>
                  <div className="flex items-center gap-2 mx-auto">
                    <Terminal size={12} style={{ color: 'var(--accent)' }} />
                    <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>teamflix — claude-code session</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>
                    ● ACTIVE
                  </div>
                </div>
                {/* Terminal body */}
                <div className="px-6 py-6 text-left font-mono text-sm space-y-3" style={{ background: '#0d0c07', minHeight: 190 }}>
                  <div className="flex gap-2 items-start">
                    <span style={{ color: '#22c55e' }}>➜</span>
                    <span style={{ color: '#FDFBD4' }}>
                      <TypeWriter lines={[
                        'build a REST API with auth and rate limiting',
                        'add dark mode to the settings page',
                        'fix the failing tests in checkout flow',
                        'migrate the database to PostgreSQL',
                      ]} />
                    </span>
                  </div>
                  <div className="flex gap-2 items-start" style={{ color: 'var(--muted)' }}>
                    <Sparkles size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    <span className="text-xs leading-relaxed">
                      Agent spinning up sandboxed environment<span className="typing-dot inline-block">.</span><span className="typing-dot inline-block" style={{ animationDelay: '0.2s' }}>.</span><span className="typing-dot inline-block" style={{ animationDelay: '0.4s' }}>.</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['✓ Repo cloned', '✓ Dependencies installed', '✓ Guardrails active', '⚡ Writing code'].map((s, i) => (
                      <span key={s} className="px-2.5 py-1 rounded-md text-[11px] animate-fade-in" style={{ background: 'rgba(217,215,182,0.07)', border: '1px solid rgba(84,83,51,0.6)', color: i === 3 ? 'var(--accent)' : 'var(--muted)', animationDelay: `${0.8 + i * 0.25}s` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 relative" style={{ borderTop: '1px solid rgba(84,83,51,0.4)', borderBottom: '1px solid rgba(84,83,51,0.4)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { end: 10, suffix: '×', label: 'Faster shipping' },
            { end: 6, suffix: '+', label: 'AI agents supported' },
            { end: 100, suffix: '%', label: 'Observable, always' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <p className="font-bold gradient-text" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2.5px' }}>
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-sm font-medium mt-1" style={{ color: 'var(--muted)' }}>{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Agent marquee ── */}
      <section id="agents" className="py-14 overflow-hidden" style={{ borderBottom: '1px solid rgba(84,83,51,0.4)' }}>
        <Reveal>
          <p className="text-center text-xs font-bold tracking-[0.25em] mb-9 uppercase" style={{ color: 'var(--muted)' }}>Works with every major coding agent</p>
        </Reveal>
        <div
          className="flex overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="animate-marquee flex gap-6 whitespace-nowrap pr-6">
            {[...agents, ...agents].map((a, i) => (
              <div key={i} className="hover-lift flex items-center gap-3 px-5 py-3 rounded-2xl glass cursor-default">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(217,215,182,0.08)', border: '1px solid rgba(84,83,51,0.6)' }}>
                  <Bot size={13} style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-32 relative">
        <div className="dot-bg absolute inset-0 pointer-events-none" />
        <Reveal className="text-center mb-16 relative z-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--muted)' }}>Platform</p>
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(34px, 4.5vw, 54px)', letterSpacing: '-2px' }}>Everything in one place</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>No stitching together a dozen tools. Teamflix handles the entire AI agent lifecycle.</p>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">

          {/* Large card — Sessions */}
          <Reveal className="md:col-span-2">
            <SpotlightCard className="glass-card rounded-3xl p-8 h-full">
              <div className="flex flex-col h-full relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(217,215,182,0.1)', border: '1px solid rgba(217,215,182,0.25)' }}>
                  <Zap size={22} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Sessions</h3>
                <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: 'var(--muted)' }}>
                  Spin up a sandboxed AI coding environment in seconds. No setup, no config — describe the task and your agent starts immediately.
                </p>
                {/* mini session rows */}
                <div className="mt-auto space-y-2">
                  {[
                    { name: 'build-rest-api', agent: 'Claude Code', status: 'Running', color: '#D9D7B6' },
                    { name: 'fix-checkout-tests', agent: 'Cursor', status: 'Completed', color: '#22c55e' },
                  ].map(s => (
                    <div key={s.name} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/5" style={{ background: 'rgba(13,12,7,0.5)', border: '1px solid rgba(84,83,51,0.5)' }}>
                      <Terminal size={13} style={{ color: 'var(--accent)' }} />
                      <span className="font-mono text-xs flex-1" style={{ color: 'var(--foreground)' }}>{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(217,215,182,0.07)', color: 'var(--muted)' }}>{s.agent}</span>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: s.color }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: s.color }} />
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Tall card — Guardrails */}
          <Reveal delay={120}>
            <SpotlightCard className="glass-card rounded-3xl p-8 h-full">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>
                  <Shield size={22} style={{ color: '#34d399' }} />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Guardrails</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  Block risky actions, require tests, cap spend — automatically.
                </p>
                <div className="mt-auto space-y-2.5">
                  {[
                    { icon: Lock, label: 'Block force-push', on: true },
                    { icon: Gauge, label: 'Cap spend at $50', on: true },
                    { icon: CheckCircle2, label: 'Require tests', on: true },
                  ].map(g => (
                    <div key={g.label} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl" style={{ background: 'rgba(13,12,7,0.5)', border: '1px solid rgba(84,83,51,0.5)' }}>
                      <g.icon size={13} style={{ color: '#34d399' }} />
                      <span className="text-xs font-medium flex-1" style={{ color: 'var(--foreground)' }}>{g.label}</span>
                      <div className="w-7 h-4 rounded-full relative transition-colors" style={{ background: '#34d39940' }}>
                        <div className="w-3 h-3 rounded-full absolute top-0.5 right-0.5" style={{ background: '#34d399' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card — Observability */}
          <Reveal delay={80}>
            <SpotlightCard className="glass-card rounded-3xl p-8 h-full">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)' }}>
                  <Eye size={22} style={{ color: '#a78bfa' }} />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Observability</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  Every commit, file change, and dollar spent — visible in real time.
                </p>
                {/* mini activity bars */}
                <div className="flex items-end gap-1.5 h-16">
                  {[35, 55, 40, 70, 50, 85, 60, 95, 75, 65, 88, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all hover:opacity-100" style={{ height: `${h}%`, background: 'linear-gradient(to top, #a78bfa30, #a78bfa70)', opacity: 0.75 }} />
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Wide card — Teams */}
          <Reveal className="md:col-span-2" delay={160}>
            <SpotlightCard className="glass-card rounded-3xl p-8 h-full">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.25)' }}>
                    <Users size={22} style={{ color: '#fb923c' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Built for Teams</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Engineering, support, sales — every team gets their own agents, context, and workflows. Shared visibility across the whole org.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 max-w-[240px]">
                  {['Engineering', 'Support', 'Sales', 'Design', 'Ops', 'Data'].map((t, i) => (
                    <span key={t} className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 cursor-default" style={{ background: `hsla(${25 + i * 10}, 30%, 60%, 0.08)`, border: '1px solid rgba(84,83,51,0.6)', color: 'var(--foreground)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section id="workflow" className="max-w-6xl mx-auto px-6 pb-32">
        <Reveal>
          <div className="glass-card rounded-[28px] p-10 md:p-16 relative overflow-hidden" style={{ transform: 'none' }}>
            <div className="glow-orb animate-glow-pulse" style={{ width: 450, height: 450, background: 'radial-gradient(circle, #D9D7B612 0%, transparent 70%)', top: -120, right: -120 }} />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--muted)' }}>Workflow</p>
                <h2 className="font-bold mb-5" style={{ fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-1.5px', lineHeight: 1.05 }}>
                  From prompt to<br />production in minutes
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                  Describe what you want to build. Teamflix spins up an agent session, runs the code, and gives you full visibility into every step.
                </p>
                <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-base">
                  Launch teamflix <ArrowRight size={16} />
                </Link>
              </div>
              <div className="space-y-3 relative">
                {/* connecting line */}
                <div className="absolute left-[26px] top-8 bottom-8 w-px" style={{ background: 'linear-gradient(to bottom, var(--border), rgba(217,215,182,0.4), var(--border))' }} />
                {[
                  { icon: Layers, label: 'Start a session', desc: 'Pick an agent, describe the task' },
                  { icon: Activity, label: 'Watch it run', desc: 'Real-time logs and file changes' },
                  { icon: GitBranch, label: 'Ship the result', desc: 'Review, approve, and deploy' },
                ].map((step, i) => (
                  <Reveal key={step.label} delay={i * 150}>
                    <div className="hover-lift flex items-center gap-4 px-5 py-4.5 rounded-2xl relative" style={{ background: 'rgba(13,12,7,0.6)', border: '1px solid rgba(84,83,51,0.6)', padding: '18px 20px' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10" style={{ background: 'var(--surface-2)', border: '1px solid rgba(217,215,182,0.2)' }}>
                        <step.icon size={16} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                          <span className="font-mono text-xs mr-2" style={{ color: 'var(--muted)' }}>0{i + 1}</span>
                          {step.label}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{step.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] text-center py-24 px-8" style={{ background: 'linear-gradient(180deg, var(--surface) 0%, rgba(13,12,7,0.9) 100%)', border: '1px solid rgba(84,83,51,0.6)' }}>
            <div className="absolute inset-0 dot-bg" />
            <div className="glow-orb animate-glow-pulse" style={{ width: 600, height: 350, background: 'radial-gradient(circle, #D9D7B618 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="animate-float w-16 h-16 rounded-3xl flex items-center justify-center" style={{ background: 'var(--accent)', boxShadow: '0 0 60px rgba(217,215,182,0.35)' }}>
                  <Tv2 size={28} color="#15140d" />
                </div>
              </div>
              <h2 className="font-bold mb-5" style={{ fontSize: 'clamp(34px, 5vw, 60px)', letterSpacing: '-2.5px', lineHeight: 1 }}>
                Your team deserves<br /><span className="shimmer-text">better tools</span>
              </h2>
              <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
                Start running AI agents across your team today. No credit card, no infrastructure, no headaches.
              </p>
              <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 px-10 py-4.5 rounded-2xl font-bold text-base" style={{ padding: '18px 40px' }}>
                Launch teamflix free <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(84,83,51,0.4)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Tv2 size={13} color="#15140d" />
            </div>
            <span className="font-bold text-sm">teamflix</span>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--muted)' }}>
            <Link href="#features" className="hover:text-[#FDFBD4] transition-colors">Features</Link>
            <Link href="#workflow" className="hover:text-[#FDFBD4] transition-colors">Workflow</Link>
            <Link href="/dashboard" className="hover:text-[#FDFBD4] transition-colors">App</Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} Teamflix. Built for teams that ship.</p>
        </div>
      </footer>
    </div>
  )
}
