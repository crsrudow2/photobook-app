import Link from 'next/link'
import { Suspense } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardBody } from '@/components/ui/Card'
import { ProductFilters } from './ProductFilters'

const allProducts = [
  { slug: 'classic-photo-book-8x8', name: 'Classic Photo Book 8×8', category: 'photo-books', price: 2999, badge: 'Best Seller', badgeVariant: 'brand' as const, rating: 4.9, reviewCount: 2847, imageBg: 'from-violet-100 to-purple-50', size: '8x8', cover: 'hardcover' },
  { slug: 'layflat-photo-book-10x10', name: 'Layflat Photo Book 10×10', category: 'photo-books', price: 4999, badge: 'Premium', badgeVariant: 'success' as const, rating: 4.8, reviewCount: 1203, imageBg: 'from-fuchsia-100 to-pink-50', size: '10x10', cover: 'layflat' },
  { slug: 'canvas-print-16x20', name: 'Gallery Canvas 16×20', category: 'canvas-prints', price: 5999, badge: 'New', badgeVariant: 'warning' as const, rating: 4.7, reviewCount: 412, imageBg: 'from-sky-100 to-blue-50', size: '10x13', cover: '' },
  { slug: 'mini-photo-book-5x5', name: 'Mini Photo Book 5×5', category: 'photo-books', price: 1499, badge: 'Popular', badgeVariant: 'neutral' as const, rating: 4.6, reviewCount: 3901, imageBg: 'from-emerald-100 to-teal-50', size: '5x5', cover: 'softcover' },
  { slug: 'softcover-photo-book-10x13', name: 'Softcover Photo Book 10×13', category: 'photo-books', price: 3499, badge: '', badgeVariant: 'neutral' as const, rating: 4.5, reviewCount: 889, imageBg: 'from-orange-100 to-amber-50', size: '10x13', cover: 'softcover' },
  { slug: 'square-canvas-12x12', name: 'Square Canvas Print 12×12', category: 'canvas-prints', price: 4499, badge: '', badgeVariant: 'neutral' as const, rating: 4.6, reviewCount: 231, imageBg: 'from-cyan-100 to-sky-50', size: '12x12', cover: '' },
  { slug: 'holiday-greeting-card', name: 'Holiday Greeting Card Pack', category: 'cards', price: 1999, badge: 'Seasonal', badgeVariant: 'warning' as const, rating: 4.8, reviewCount: 756, imageBg: 'from-rose-100 to-pink-50', size: '', cover: '' },
  { slug: 'photo-calendar-2025', name: 'Photo Wall Calendar 2025', category: 'calendars', price: 2499, badge: '', badgeVariant: 'neutral' as const, rating: 4.4, reviewCount: 344, imageBg: 'from-lime-100 to-green-50', size: '', cover: '' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-zinc-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = typeof params.category === 'string' ? params.category : ''
  const size = typeof params.size === 'string' ? params.size : ''
  const cover = typeof params.cover === 'string' ? params.cover : ''
  const price = typeof params.price === 'string' ? params.price : ''

  let filtered = allProducts
  if (category) filtered = filtered.filter((p) => p.category === category)
  if (size) filtered = filtered.filter((p) => p.size === size)
  if (cover) filtered = filtered.filter((p) => p.cover === cover)
  if (price) {
    if (price === '0-20') filtered = filtered.filter((p) => p.price < 2000)
    else if (price === '20-50') filtered = filtered.filter((p) => p.price >= 2000 && p.price < 5000)
    else if (price === '50-100') filtered = filtered.filter((p) => p.price >= 5000 && p.price < 10000)
    else if (price === '100+') filtered = filtered.filter((p) => p.price >= 10000)
  }

  const categoryLabel = category
    ? { 'photo-books': 'Photo Books', 'canvas-prints': 'Canvas Prints', cards: 'Greeting Cards', calendars: 'Calendars' }[category] ?? category
    : 'All Products'

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-700 font-medium">{categoryLabel}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters — wrapped in Suspense because it reads searchParams via hook */}
        <Suspense fallback={<div className="w-56 h-96 rounded-2xl bg-zinc-100 animate-pulse" />}>
          <ProductFilters />
        </Suspense>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">{categoryLabel}</h1>
            <p className="text-sm text-zinc-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 py-24 text-center">
              <p className="text-zinc-400 text-lg">No products match your filters.</p>
              <Link href="/products" className="mt-4 text-sm text-brand hover:text-brand-dark font-medium">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                  <Card hover>
                    <div className={`h-44 bg-gradient-to-br ${product.imageBg} rounded-t-2xl flex items-center justify-center`}>
                      <div className="h-24 w-24 rounded-xl bg-white/60 shadow-sm flex items-center justify-center text-zinc-300">
                        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                      </div>
                    </div>
                    <CardBody>
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-zinc-900 group-hover:text-brand transition-colors">{product.name}</p>
                        {product.badge && (
                          <Badge variant={product.badgeVariant} className="shrink-0">{product.badge}</Badge>
                        )}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-zinc-400">{product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-lg font-bold text-zinc-900">${(product.price / 100).toFixed(2)}</p>
                        <span className="text-xs text-brand font-medium group-hover:underline">View →</span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
