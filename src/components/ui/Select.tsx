'use client'

import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', id, ...rest }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={[
            'w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 pr-8',
            'text-sm text-zinc-900 shadow-xs',
            'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20',
            'disabled:opacity-50',
            className,
          ].join(' ')}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="h-4 w-4 text-zinc-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.47 6.47a.75.75 0 0 1 1.06 0L8 8.94l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
