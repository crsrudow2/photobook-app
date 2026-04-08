import Link from 'next/link'

const footerLinks = {
  Products: [
    { label: 'Photo Books', href: '/products?category=photo-books' },
    { label: 'Canvas Prints', href: '/products?category=canvas-prints' },
    { label: 'Greeting Cards', href: '/products?category=cards' },
    { label: 'All Products', href: '/products' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Track Order', href: '/account/orders' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-zinc-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
                P
              </span>
              <span>Pictura</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 max-w-xs">
              Turn your favorite memories into premium photo products. Crafted with love, delivered to your door.
            </p>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{heading}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-600 hover:text-brand transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Pictura. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-zinc-400 hover:text-zinc-600">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-zinc-400 hover:text-zinc-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
