'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'photo-books', label: 'Photo Books' },
  { value: 'canvas-prints', label: 'Canvas Prints' },
  { value: 'cards', label: 'Greeting Cards' },
  { value: 'calendars', label: 'Calendars' },
]

const sizes = [
  { value: '', label: 'All Sizes' },
  { value: '5x5', label: '5×5 in' },
  { value: '8x8', label: '8×8 in' },
  { value: '10x10', label: '10×10 in' },
  { value: '10x13', label: '10×13 in' },
  { value: '12x12', label: '12×12 in' },
]

const coverTypes = [
  { value: '', label: 'All Covers' },
  { value: 'hardcover', label: 'Hardcover' },
  { value: 'softcover', label: 'Softcover' },
  { value: 'layflat', label: 'Layflat' },
]

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: '0-20', label: 'Under $20' },
  { value: '20-50', label: '$20 – $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: '100+', label: '$100+' },
]

export function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
      return params.toString()
    },
    [searchParams]
  )

  const setFilter = (key: string, value: string) => {
    router.push(pathname + '?' + createQueryString({ [key]: value }))
  }

  const activeCategory = searchParams.get('category') ?? ''
  const activeSize = searchParams.get('size') ?? ''
  const activeCover = searchParams.get('cover') ?? ''
  const activePrice = searchParams.get('price') ?? ''
  const hasFilters = activeCategory || activeSize || activeCover || activePrice

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-zinc-900">Filters</h2>
        {hasFilters && (
          <button
            onClick={() => router.push(pathname)}
            className="text-xs text-brand hover:text-brand-dark font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category */}
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Category</legend>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter('category', cat.value)}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  activeCategory === cat.value
                    ? 'bg-brand text-white font-medium'
                    : 'text-zinc-600 hover:bg-zinc-100',
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Size */}
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Size</legend>
          <div className="space-y-1">
            {sizes.map((s) => (
              <button
                key={s.value}
                onClick={() => setFilter('size', s.value)}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  activeSize === s.value
                    ? 'bg-brand text-white font-medium'
                    : 'text-zinc-600 hover:bg-zinc-100',
                ].join(' ')}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Cover type */}
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Cover Type</legend>
          <div className="space-y-1">
            {coverTypes.map((c) => (
              <button
                key={c.value}
                onClick={() => setFilter('cover', c.value)}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  activeCover === c.value
                    ? 'bg-brand text-white font-medium'
                    : 'text-zinc-600 hover:bg-zinc-100',
                ].join(' ')}
              >
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Price */}
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Price</legend>
          <div className="space-y-1">
            {priceRanges.map((p) => (
              <button
                key={p.value}
                onClick={() => setFilter('price', p.value)}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  activePrice === p.value
                    ? 'bg-brand text-white font-medium'
                    : 'text-zinc-600 hover:bg-zinc-100',
                ].join(' ')}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </aside>
  )
}
