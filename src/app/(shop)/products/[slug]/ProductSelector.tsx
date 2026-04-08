'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface Variant {
  label: string
  value: string
  price?: number
}

interface ProductSelectorProps {
  sizes: Variant[]
  coverTypes: Variant[]
  basePrice: number
}

export function ProductSelector({ sizes, coverTypes, basePrice }: ProductSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.value ?? '')
  const [selectedCover, setSelectedCover] = useState(coverTypes[0]?.value ?? '')
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const sizeUpcharge = sizes.find((s) => s.value === selectedSize)?.price ?? 0
  const total = (basePrice + sizeUpcharge) * quantity

  const handleAddToCart = async () => {
    setAdding(true)
    await new Promise((r) => setTimeout(r, 600))
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-zinc-700 mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s.value}
                onClick={() => setSelectedSize(s.value)}
                className={[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                  selectedSize === s.value
                    ? 'border-brand bg-brand text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-brand hover:text-brand',
                ].join(' ')}
              >
                {s.label}
                {s.price ? <span className="ml-1 text-xs opacity-75">+${(s.price / 100).toFixed(0)}</span> : null}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cover type selector */}
      {coverTypes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-zinc-700 mb-2">Cover Type</p>
          <div className="flex flex-wrap gap-2">
            {coverTypes.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCover(c.value)}
                className={[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                  selectedCover === c.value
                    ? 'border-brand bg-brand text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-brand hover:text-brand',
                ].join(' ')}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-sm font-semibold text-zinc-700 mb-2">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:border-brand hover:text-brand transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold text-zinc-900">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:border-brand hover:text-brand transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-zinc-900">${(total / 100).toFixed(2)}</span>
        {quantity > 1 && (
          <span className="text-sm text-zinc-400">(${((basePrice + sizeUpcharge) / 100).toFixed(2)} each)</span>
        )}
      </div>

      {/* Add to cart */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        disabled={adding}
      >
        {adding ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
            </svg>
            Adding…
          </>
        ) : added ? (
          <>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            Added to Cart!
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </>
        )}
      </Button>

      <p className="text-xs text-zinc-400 text-center">Free shipping on orders over $50 · Ships in 5–7 business days</p>
    </div>
  )
}
