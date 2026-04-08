import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  let orders: Array<{
    id: string
    status: string
    total: number
    createdAt: Date
    orderItems: Array<{ id: string }>
  }> = []

  try {
    orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: { orderItems: true },
    })
  } catch {
    // DB may not be available; render empty state
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-4">You have no orders yet.</p>
          <Link href="/" className="text-indigo-600 underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-gray-500">{order.id}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
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
              <div className="flex justify-between text-sm text-gray-700">
                <span>{order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
