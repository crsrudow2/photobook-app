import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  options: z.record(z.string(), z.string()).optional(),
})

const shippingAddressSchema = z.object({
  name: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
})

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  shippingAddress: shippingAddressSchema,
  userId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { items, shippingAddress, userId } = parsed.data
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Resolve or create user
  let resolvedUserId = userId
  if (!resolvedUserId) {
    // For unauthenticated checkout create a guest user
    const guest = await prisma.user.create({
      data: {
        email: `guest_${Date.now()}@guest.local`,
        name: shippingAddress.name,
      },
    })
    resolvedUserId = guest.id
  }

  const order = await prisma.order.create({
    data: {
      userId: resolvedUserId,
      status: 'confirmed',
      total,
      shippingAddress,
      orderItems: {
        create: items.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          options: (item.options ?? {}) as Record<string, string>,
        })),
      },
    },
    include: { orderItems: true },
  })

  return Response.json({ success: true, orderId: order.id }, { status: 201 })
}
