'use client'

import { useEffect, useRef, useState } from 'react'

/** Fades + slides children in when they scroll into view. */
export function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

/** Card with a mouse-follow spotlight glow. */
export function SpotlightCard({ children, className = '', style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`} style={style}>
      {children}
    </div>
  )
}

/** Types out a list of lines character by character, looping. */
export function TypeWriter({ lines, speed = 35, pause = 1800 }: {
  lines: string[]
  speed?: number
  pause?: number
}) {
  const [text, setText] = useState('')
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const line = lines[lineIdx % lines.length]

    const tick = () => {
      if (i <= line.length) {
        setText(line.slice(0, i))
        i++
        timer = setTimeout(tick, speed)
      } else {
        timer = setTimeout(() => setLineIdx(n => n + 1), pause)
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [lineIdx, lines, speed, pause])

  return <>{text}<span className="animate-blink" style={{ color: 'var(--accent)' }}>▍</span></>
}

/** Animated counter that counts up when scrolled into view. */
export function CountUp({ end, suffix = '', duration = 1600 }: {
  end: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        // ease-out cubic
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref}>{val}{suffix}</span>
}
