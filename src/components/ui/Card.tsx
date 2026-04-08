import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = false, className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl bg-white shadow-sm border border-zinc-100',
        hover && 'transition-shadow hover:shadow-md cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={['overflow-hidden rounded-t-2xl bg-zinc-50', className].join(' ')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export function CardBody({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={['p-4', className].join(' ')}>{children}</div>
}
