import { SignUp } from '@clerk/nextjs'
import { Tv2 } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#1a1910' }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#D9D7B6' }}>
              <Tv2 size={15} color="#1a1910" />
            </div>
            <span className="font-bold text-base" style={{ color: '#FDFBD4' }}>teamflix</span>
          </Link>
        </div>
        <SignUp
          appearance={{
            variables: {
              colorPrimary: '#D9D7B6',
              colorBackground: '#232215',
              colorText: '#FDFBD4',
              colorTextSecondary: '#878672',
              colorTextOnPrimaryBackground: '#1a1910',
              colorInputBackground: '#2e2d1a',
              colorInputText: '#FDFBD4',
              colorNeutral: '#FDFBD4',
              borderRadius: '0.75rem',
              fontFamily: 'inherit',
              fontSize: '14px',
            },
            elements: {
              card: 'shadow-none',
              cardBox: 'shadow-none border border-[#545333]',
              headerTitle: '!text-[#FDFBD4] font-bold text-xl',
              headerSubtitle: '!text-[#878672] text-sm',
              socialButtonsBlockButton: '!border-[#545333] !text-[#FDFBD4] !bg-[#2e2d1a] hover:!bg-[#3a3920] font-medium',
              socialButtonsBlockButtonText: '!text-[#FDFBD4] font-medium',
              formFieldLabel: '!text-[#D9D7B6] font-medium text-sm',
              formFieldInput: '!bg-[#2e2d1a] !border-[#545333] !text-[#FDFBD4] focus:!border-[#D9D7B6]',
              formButtonPrimary: '!bg-[#D9D7B6] !text-[#1a1910] font-semibold hover:!opacity-80',
              footerActionText: '!text-[#878672]',
              footerActionLink: '!text-[#D9D7B6] font-semibold hover:!text-[#FDFBD4]',
              identityPreviewText: '!text-[#FDFBD4]',
              identityPreviewEditButton: '!text-[#D9D7B6]',
              formFieldErrorText: '!text-red-400',
              dividerLine: '!bg-[#545333]',
              dividerText: '!text-[#878672] text-xs',
              alternativeMethodsBlockButton: '!border-[#545333] !text-[#FDFBD4] !bg-[#2e2d1a] hover:!bg-[#3a3920]',
              alternativeMethodsBlockButtonText: '!text-[#FDFBD4]',
            },
          }}
        />
      </div>
    </div>
  )
}
