import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { ProductSelector } from './ProductSelector'

const products: Record<
  string,
  {
    slug: string
    name: string
    category: string
    categorySlug: string
    description: string
    features: string[]
    basePrice: number
    badge?: string
    badgeVariant?: 'brand' | 'success' | 'warning' | 'neutral'
    rating: number
    reviewCount: number
    imageBg: string
    sizes: { label: string; value: string; price?: number }[]
    coverTypes: { label: string; value: string }[]
    reviews: { author: string; rating: number; date: string; body: string }[]
  }
> = {
  'classic-photo-book-8x8': {
    slug: 'classic-photo-book-8x8',
    name: 'Classic Photo Book 8×8',
    category: 'Photo Books',
    categorySlug: 'photo-books',
    description:
      'Our most popular photo book — a square 8×8 inch hardcover with premium lay-flat pages. Perfect for travel memories, wedding albums, and family milestones. Printed on thick, archival-quality paper with vibrant color reproduction.',
    features: ['Premium 100 lb coated paper', 'Flush-mount lay-flat pages', 'Durable hardcover binding', 'Up to 100 pages', 'UV-resistant inks'],
    basePrice: 2999,
    badge: 'Best Seller',
    badgeVariant: 'brand',
    rating: 4.9,
    reviewCount: 2847,
    imageBg: 'from-violet-100 to-purple-50',
    sizes: [
      { label: '8×8 in', value: '8x8', price: 0 },
      { label: '10×10 in', value: '10x10', price: 1000 },
      { label: '12×12 in', value: '12x12', price: 2000 },
    ],
    coverTypes: [
      { label: 'Hardcover', value: 'hardcover' },
      { label: 'Softcover', value: 'softcover' },
    ],
    reviews: [
      { author: 'Sarah M.', rating: 5, date: 'March 2026', body: 'The quality exceeded my expectations. The colors are vivid and the binding feels incredibly premium. Perfect for our wedding album!' },
      { author: 'James T.', rating: 5, date: 'February 2026', body: 'Ordered this for my parents\' anniversary. They cried when they opened it. Fast shipping and the packaging was beautiful.' },
      { author: 'Priya K.', rating: 4, date: 'January 2026', body: 'Great quality overall. The lay-flat pages are amazing for double-page spreads. Took off one star because I wished there were more page count options.' },
    ],
  },
  'layflat-photo-book-10x10': {
    slug: 'layflat-photo-book-10x10',
    name: 'Layflat Photo Book 10×10',
    category: 'Photo Books',
    categorySlug: 'photo-books',
    description:
      'Showcase your memories in grand style with our premium 10×10 layflat photo book. True lay-flat binding means no gutter shadow — perfect for panoramic shots and double-page spreads.',
    features: ['True lay-flat binding', 'Thick 130 lb pages', 'Smyth sewn for durability', 'Up to 80 pages', 'Linen or leather cover options'],
    basePrice: 4999,
    badge: 'Premium',
    badgeVariant: 'success',
    rating: 4.8,
    reviewCount: 1203,
    imageBg: 'from-fuchsia-100 to-pink-50',
    sizes: [
      { label: '10×10 in', value: '10x10', price: 0 },
      { label: '12×12 in', value: '12x12', price: 1500 },
    ],
    coverTypes: [
      { label: 'Hardcover', value: 'hardcover' },
      { label: 'Layflat', value: 'layflat' },
    ],
    reviews: [
      { author: 'Carlos R.', rating: 5, date: 'March 2026', body: 'Absolutely stunning. The layflat binding is genuinely flat — no curves at all. The perfect gift.' },
      { author: 'Emma L.', rating: 5, date: 'February 2026', body: 'Worth every penny. I\'ve ordered 3 of these now for different occasions. The quality is always consistent.' },
    ],
  },
  'canvas-print-16x20': {
    slug: 'canvas-print-16x20',
    name: 'Gallery Canvas 16×20',
    category: 'Canvas Prints',
    categorySlug: 'canvas-prints',
    description:
      'Transform your favorite photo into a stunning gallery-quality canvas print. Printed on premium artist canvas with archival inks, hand-stretched over solid pine wood frames.',
    features: ['Artist-grade cotton canvas', 'Archival inks, UV resistant', 'Hand-stretched on solid pine', '1.5" gallery-depth frame', 'Ready to hang'],
    basePrice: 5999,
    badge: 'New',
    badgeVariant: 'warning',
    rating: 4.7,
    reviewCount: 412,
    imageBg: 'from-sky-100 to-blue-50',
    sizes: [
      { label: '11×14 in', value: '11x14', price: 0 },
      { label: '16×20 in', value: '16x20', price: 2000 },
      { label: '20×30 in', value: '20x30', price: 4000 },
    ],
    coverTypes: [],
    reviews: [
      { author: 'Michael B.', rating: 5, date: 'March 2026', body: 'Hung this in our living room and everyone asks where we bought it. Looks completely professional.' },
      { author: 'Tanya W.', rating: 4, date: 'January 2026', body: 'Good quality canvas and vibrant colors. Shipping took a bit longer than expected but worth the wait.' },
    ],
  },
  'mini-photo-book-5x5': {
    slug: 'mini-photo-book-5x5',
    name: 'Mini Photo Book 5×5',
    category: 'Photo Books',
    categorySlug: 'photo-books',
    description:
      'Adorably compact, surprisingly impressive. Our 5×5 mini photo book is perfect for gifting, keepsakes, and telling smaller stories. Packs up to 40 pages in a pocket-friendly format.',
    features: ['Compact 5×5 inch format', 'Softcover or hardcover', 'Up to 40 pages', 'Great for gifting', 'Affordable price'],
    basePrice: 1499,
    badge: 'Popular',
    badgeVariant: 'neutral',
    rating: 4.6,
    reviewCount: 3901,
    imageBg: 'from-emerald-100 to-teal-50',
    sizes: [
      { label: '5×5 in', value: '5x5', price: 0 },
    ],
    coverTypes: [
      { label: 'Softcover', value: 'softcover' },
      { label: 'Hardcover', value: 'hardcover' },
    ],
    reviews: [
      { author: 'Nicole H.', rating: 5, date: 'February 2026', body: 'Made 10 of these as party favors. Everyone loved them! Easy to put together and the quality was great for the price.' },
      { author: 'David K.', rating: 4, date: 'January 2026', body: 'Cute little book. Colors are accurate and the binding is sturdy. Good value.' },
      { author: 'Aisha P.', rating: 5, date: 'December 2025', body: 'Ordered as a Christmas gift. Came beautifully packaged and ahead of schedule. 10/10 would order again.' },
    ],
  },
}

// Add remaining products with minimal data
const fallback = (slug: string) => ({
  slug,
  name: slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  category: 'Products',
  categorySlug: 'products',
  description: 'A premium photo product crafted for lasting memories.',
  features: ['Premium quality', 'Archival inks', 'Fast shipping'],
  basePrice: 2999,
  rating: 4.5,
  reviewCount: 100,
  imageBg: 'from-zinc-100 to-slate-50',
  sizes: [{ label: 'Standard', value: 'standard', price: 0 }],
  coverTypes: [{ label: 'Standard', value: 'standard' }],
  reviews: [],
})

function getProduct(slug: string) {
  return products[slug] ?? (Object.keys(products).length ? null : fallback(slug))
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${cls} ${star <= Math.round(rating) ? 'text-amber-400' : 'text-zinc-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand transition-colors">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-brand transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-zinc-700 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div
            className={`aspect-square rounded-2xl bg-gradient-to-br ${product.imageBg} flex items-center justify-center`}
          >
            <div className="h-48 w-48 rounded-2xl bg-white/60 shadow-md flex items-center justify-center text-zinc-300">
              <svg className="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.8}
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${product.imageBg} opacity-${i === 0 ? '100' : '50'} cursor-pointer border-2 ${i === 0 ? 'border-brand' : 'border-transparent'} hover:opacity-100 transition-opacity`}
              />
            ))}
          </div>
        </div>

        {/* Product info + selector */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                href={`/products?category=${product.categorySlug}`}
                className="text-sm text-brand font-medium hover:text-brand-dark"
              >
                {product.category}
              </Link>
              {product.badge && (
                <Badge variant={product.badgeVariant ?? 'neutral'}>{product.badge}</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-zinc-900">{product.name}</h1>

            {/* Rating summary */}
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm font-semibold text-zinc-700">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-zinc-400">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <p className="text-zinc-600 leading-relaxed">{product.description}</p>

          {/* Features */}
          <ul className="space-y-1.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                <svg className="h-4 w-4 text-brand shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <hr className="border-zinc-100" />

          {/* Variant selector + add to cart */}
          <ProductSelector
            sizes={product.sizes}
            coverTypes={product.coverTypes}
            basePrice={product.basePrice}
          />
        </div>
      </div>

      {/* Reviews section */}
      <section className="mt-16">
        <hr className="border-zinc-100 mb-10" />
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="font-semibold text-zinc-700">{product.rating.toFixed(1)} / 5</span>
            <span className="text-sm text-zinc-400">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </div>

        {product.reviews.length === 0 ? (
          <p className="text-zinc-400 text-center py-12">No reviews yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-xs">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-zinc-900">{review.author}</p>
                    <p className="text-xs text-zinc-400">{review.date}</p>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
