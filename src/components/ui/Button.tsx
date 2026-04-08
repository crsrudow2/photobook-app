import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand active:scale-[0.98]',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400 active:scale-[0.98]',
  outline:
    'border border-brand text-brand bg-transparent hover:bg-brand/10 focus-visible:ring-brand active:scale-[0.98]',
  ghost:
    'bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-400 active:scale-[0.98]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
