type BadgeVariant = 'brand' | 'success' | 'warning' | 'neutral' | 'error'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: 'bg-brand/10 text-brand-dark',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  neutral: 'bg-zinc-100 text-zinc-600',
  error: 'bg-red-50 text-red-700',
}

export function Badge({ variant = 'neutral', className = '', children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
