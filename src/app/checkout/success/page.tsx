import Link from 'next/link'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const { orderId } = await searchParams

  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
      <p className="text-gray-500 mb-6">
        Thank you for your purchase. Your photo books are being prepared.
      </p>

      {orderId && (
        <div className="bg-gray-50 border rounded-lg px-6 py-4 mb-8 inline-block">
          <p className="text-sm text-gray-500 mb-1">Order number</p>
          <p className="font-mono font-semibold text-gray-900">{orderId}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {orderId && (
          <Link
            href={`/account/orders/${orderId}`}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            View Order
          </Link>
        )}
        <Link
          href="/account/orders"
          className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
        >
          Order History
        </Link>
        <Link
          href="/"
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
