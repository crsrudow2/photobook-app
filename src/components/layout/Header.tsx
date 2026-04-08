'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Photo Books', href: '/products?category=photo-books' },
  { label: 'Canvas Prints', href: '/products?category=canvas-prints' },
  { label: 'Greeting Cards', href: '/products?category=cards' },
  { label: 'All Products', href: '/products' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-zinc-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
              P
            </span>
            <span>Pictura</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:text-brand hover:bg-brand/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:text-brand hover:bg-brand/5 transition-colors"
              aria-label="Shopping cart"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:text-brand hover:bg-brand/5 transition-colors"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-xl border border-zinc-100 bg-white py-1 shadow-lg">
                  <Link
                    href="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    Orders
                  </Link>
                  <hr className="my-1 border-zinc-100" />
                  <Link
                    href="/auth/login"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-brand font-medium hover:bg-zinc-50"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white px-4 pb-4 md:hidden">
          <nav className="mt-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-zinc-700 hover:text-brand hover:bg-brand/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
