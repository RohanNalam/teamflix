import { SignIn } from '@clerk/nextjs'
import { Tv2 } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
              <Tv2 size={14} className="text-black" />
            </div>
            <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>teamflix</span>
          </Link>
        </div>
        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#f97316',
              colorBackground: '#141414',
              colorText: '#f5f5f5',
              colorTextSecondary: '#6b6b6b',
              colorInputBackground: '#1c1c1c',
              colorInputText: '#f5f5f5',
              borderRadius: '0.75rem',
              fontFamily: 'inherit',
            },
            elements: {
              card: 'shadow-none border',
              cardBox: 'shadow-none',
              headerTitle: 'text-base font-semibold',
              headerSubtitle: 'text-xs',
              socialButtonsBlockButton: 'border text-sm font-medium',
              formButtonPrimary: 'font-medium text-black text-sm',
              footerActionLink: 'font-medium',
              formFieldInput: 'text-sm',
              dividerLine: 'bg-[#2a2a2a]',
              dividerText: 'text-xs text-[#6b6b6b]',
            },
          }}
        />
      </div>
    </div>
  )
}
