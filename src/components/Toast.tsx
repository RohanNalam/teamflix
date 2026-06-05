'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CheckCircle2, AlertTriangle, X } from 'lucide-react'

type ToastType = 'success' | 'error'
interface Toast { id: string; message: string; type: ToastType }

const ToastContext = createContext<{ toast: (msg: string, type?: ToastType) => void }>({ toast: () => {} })

export function useToast() { return useContext(ToastContext) }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl pointer-events-auto"
            style={{
              background: 'var(--surface-2)',
              border: `1px solid ${t.type === 'success' ? '#22c55e40' : '#ef444440'}`,
              minWidth: 260,
              animation: 'slideIn 0.2s ease',
            }}
          >
            {t.type === 'success'
              ? <CheckCircle2 size={15} style={{ color: '#22c55e', flexShrink: 0 }} />
              : <AlertTriangle size={15} style={{ color: '#ef4444', flexShrink: 0 }} />
            }
            <p className="text-sm font-medium flex-1" style={{ color: 'var(--foreground)' }}>{t.message}</p>
            <button onClick={() => remove(t.id)} className="p-0.5 rounded hover:bg-white/10 transition-colors">
              <X size={13} style={{ color: 'var(--muted)' }} />
            </button>
          </div>
        ))}
      </div>
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </ToastContext.Provider>
  )
}
