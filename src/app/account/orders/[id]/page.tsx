import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params

  let order: {
    id: string
    status: string
    total: number
    shippingAddress: unknown
    createdAt: Date
    userId: string
    orderItems: Array<{
      id: string
      quantity: number
      price: number
      options: unknown
      project: { title: string } | null
    }>
  } | null = null

  try {
    order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: { project: { select: { title: true } } },
        },
      },
    })
  } catch {
    // DB unavailable
  }

  if (!order) notFound()
  if (order.userId !== session.user.id) notFound()

  const shipping = order.shippingAddress as Record<string, string>

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Link href="/account/orders" className="text-indigo-600 text-sm hover:underline">
          ← Back to orders
        </Link>
      </div>

      <div className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500 mb-1">Order number</p>
            <p className="font-mono text-sm">{order.id}</p>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              order.status === 'confirmed'
                ? 'bg-green-100 text-green-700'
                : order.status === 'shipped'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {order.status}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Placed on{' '}
          {new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Items */}
        <div>
          <h2 className="font-semibold mb-3">Items</h2>
          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.project?.title ?? 'Photo Book'} × {item.quantity}
                </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        {shipping && (
          <div>
            <h2 className="font-semibold mb-2">Shipping Address</h2>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p>{shipping.name}</p>
              <p>{shipping.address1}</p>
              {shipping.address2 && <p>{shipping.address2}</p>}
              <p>
                {shipping.city}, {shipping.state} {shipping.zip}
              </p>
              <p>{shipping.country}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
