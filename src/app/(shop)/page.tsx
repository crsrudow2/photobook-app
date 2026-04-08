import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card, CardBody } from '@/components/ui/Card'

const categories = [
  {
    slug: 'photo-books',
    label: 'Photo Books',
    description: 'Hardcover & softcover books in every size',
    emoji: '📖',
    color: 'bg-violet-50',
    textColor: 'text-violet-700',
  },
  {
    slug: 'canvas-prints',
    label: 'Canvas Prints',
    description: 'Gallery-quality art for any wall',
    emoji: '🖼️',
    color: 'bg-sky-50',
    textColor: 'text-sky-700',
  },
  {
    slug: 'cards',
    label: 'Greeting Cards',
    description: 'Personalized cards for every occasion',
    emoji: '💌',
    color: 'bg-rose-50',
    textColor: 'text-rose-700',
  },
  {
    slug: 'calendars',
    label: 'Calendars',
    description: 'Custom 12-month photo calendars',
    emoji: '📅',
    color: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
]

const featuredProducts = [
  {
    slug: 'classic-photo-book-8x8',
    name: 'Classic Photo Book 8×8',
    category: 'Photo Books',
    price: 2999,
    badge: 'Best Seller',
    badgeVariant: 'brand' as const,
    rating: 4.9,
    reviewCount: 2847,
    imageBg: 'from-violet-100 to-purple-50',
  },
  {
    slug: 'layflat-photo-book-10x10',
    name: 'Layflat Photo Book 10×10',
    category: 'Photo Books',
    price: 4999,
    badge: 'Premium',
    badgeVariant: 'success' as const,
    rating: 4.8,
    reviewCount: 1203,
    imageBg: 'from-fuchsia-100 to-pink-50',
  },
  {
    slug: 'canvas-print-16x20',
    name: 'Gallery Canvas 16×20',
    category: 'Canvas Prints',
    price: 5999,
    badge: 'New',
    badgeVariant: 'warning' as const,
    rating: 4.7,
    reviewCount: 412,
    imageBg: 'from-sky-100 to-blue-50',
  },
  {
    slug: 'mini-photo-book-5x5',
    name: 'Mini Photo Book 5×5',
    category: 'Photo Books',
    price: 1499,
    badge: 'Popular',
    badgeVariant: 'neutral' as const,
    rating: 4.6,
    reviewCount: 3901,
    imageBg: 'from-emerald-100 to-teal-50',
  },
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
      <span className="text-xs text-zinc-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <Badge variant="brand" className="bg-white/20 text-white mb-4">
              ✨ Free shipping on orders over $50
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Memories worth
              <br />
              <span className="text-brand-light">keeping forever.</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Transform your photos into stunning photo books, canvas prints, and greeting cards. Premium quality, delivered in days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
                <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all h-12 px-6 text-base bg-white text-brand hover:bg-zinc-100 active:scale-[0.98]"
              >
                Shop All Products
              </Link>
              <Link
                href="/products?category=photo-books"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all h-12 px-6 text-base border-2 border-white/40 text-white hover:bg-white/10 active:scale-[0.98]"
              >
                Start a Photo Book
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { icon: '🚚', text: 'Free shipping over $50' },
              { icon: '⭐', text: '4.8/5 from 50k+ reviews' },
              { icon: '🔒', text: '100% satisfaction guarantee' },
              { icon: '🎨', text: 'Premium print quality' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-zinc-600">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-zinc-900">Shop by Category</h2>
          <p className="mt-2 text-zinc-500">Find the perfect way to preserve your memories</p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`group flex flex-col items-center gap-3 rounded-2xl ${cat.color} p-6 text-center transition-all hover:scale-[1.02] hover:shadow-md`}
            >
              <span className="text-4xl">{cat.emoji}</span>
              <div>
                <p className={`font-semibold ${cat.textColor}`}>{cat.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900">Featured Products</h2>
              <p className="mt-1 text-zinc-500">Our most-loved photo products</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-brand hover:text-brand-dark transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                <Card hover>
                  <div
                    className={`h-48 bg-gradient-to-br ${product.imageBg} rounded-t-2xl flex items-center justify-center`}
                  >
                    <div className="h-28 w-28 rounded-xl bg-white/60 shadow-sm flex items-center justify-center text-zinc-300">
                      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <CardBody>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-zinc-400">{product.category}</p>
                        <p className="mt-0.5 font-semibold text-zinc-900 group-hover:text-brand transition-colors truncate">
                          {product.name}
                        </p>
                      </div>
                      <Badge variant={product.badgeVariant} className="shrink-0">
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-zinc-400">({product.reviewCount.toLocaleString()})</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-zinc-900">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-brand to-brand-dark px-8 py-12 text-center text-white md:py-16">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to make something beautiful?</h2>
          <p className="mt-3 text-white/80">
            Start with your photos — we handle the rest. Free shipping, premium quality.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products?category=photo-books"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all h-12 px-6 text-base bg-white text-brand hover:bg-zinc-100 active:scale-[0.98]"
            >
              Create a Photo Book
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all h-12 px-6 text-base border-2 border-white/40 text-white hover:bg-white/10 active:scale-[0.98]"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
