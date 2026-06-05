interface PageHeaderProps {
  title: string
  description: string
  action?: React.ReactNode
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="font-bold mb-1.5" style={{ fontSize: 26, letterSpacing: '-0.5px', color: 'var(--foreground)' }}>
          {title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
