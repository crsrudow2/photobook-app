'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart, cartSubtotal } from '@/lib/cart'

interface ShippingAddress {
  name: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

interface CardDetails {
  number: string
  exp: string
  cvv: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clear } = useCart()
  const subtotal = cartSubtotal(items)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [shipping, setShipping] = useState<ShippingAddress>({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  const [card, setCard] = useState<CardDetails>({
    number: '',
    exp: '',
    cvv: '',
  })

  function updateShipping(field: keyof ShippingAddress, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  function updateCard(field: keyof CardDetails, value: string) {
    setCard((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingAddress: shipping }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Checkout failed. Please try again.')
        return
      }

      clear()
      router.push(`/checkout/success?orderId=${data.orderId}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <a href="/cart" className="text-indigo-600 underline">
          Back to cart
        </a>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipping Address */}
        <section className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={shipping.name}
                onChange={(e) => updateShipping('name', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
              <input
                type="text"
                required
                value={shipping.address1}
                onChange={(e) => updateShipping('address1', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={shipping.address2}
                onChange={(e) => updateShipping('address2', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={shipping.city}
                  onChange={(e) => updateShipping('city', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={shipping.state}
                  onChange={(e) => updateShipping('state', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={shipping.zip}
                  onChange={(e) => updateShipping('zip', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={shipping.country}
                  onChange={(e) => updateShipping('country', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-4">
            Demo mode — no real payment is processed.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                value={card.number}
                onChange={(e) => updateCard('number', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  placeholder="12/27"
                  maxLength={5}
                  value={card.exp}
                  onChange={(e) => updateCard('exp', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength={4}
                  value={card.cvv}
                  onChange={(e) => updateCard('cvv', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-gray-50 border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </section>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Placing order...' : `Place Order — $${subtotal.toFixed(2)}`}
        </button>
      </form>
    </main>
  )
}
