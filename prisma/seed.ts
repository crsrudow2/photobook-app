import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const softcover = await prisma.product.upsert({
    where: { slug: 'classic-photo-book-softcover' },
    update: {},
    create: {
      name: 'Classic Photo Book — Softcover',
      description:
        'Create a beautiful softcover photo book to preserve your favorite memories. Lay-flat pages ensure photos look stunning from edge to edge.',
      category: 'photo-book',
      basePrice: 19.99,
      sizes: ['5x5', '8x8', '8x11', '11x8'],
      coverTypes: ['softcover'],
      pageOptions: [
        { pages: 20, priceAdder: 0 },
        { pages: 40, priceAdder: 5 },
        { pages: 60, priceAdder: 10 },
        { pages: 80, priceAdder: 15 },
      ],
      images: [
        '/images/products/softcover-front.jpg',
        '/images/products/softcover-open.jpg',
      ],
      slug: 'classic-photo-book-softcover',
      active: true,
    },
  })

  const hardcover = await prisma.product.upsert({
    where: { slug: 'premium-photo-book-hardcover' },
    update: {},
    create: {
      name: 'Premium Photo Book — Hardcover',
      description:
        'A premium hardcover photo book that will stand the test of time. Thick cover, vibrant printing, and luxurious lay-flat binding.',
      category: 'photo-book',
      basePrice: 34.99,
      sizes: ['8x8', '8x11', '11x8', '12x12'],
      coverTypes: ['hardcover-glossy', 'hardcover-matte', 'linen'],
      pageOptions: [
        { pages: 20, priceAdder: 0 },
        { pages: 40, priceAdder: 8 },
        { pages: 60, priceAdder: 16 },
        { pages: 80, priceAdder: 24 },
        { pages: 100, priceAdder: 32 },
      ],
      images: [
        '/images/products/hardcover-front.jpg',
        '/images/products/hardcover-open.jpg',
        '/images/products/hardcover-detail.jpg',
      ],
      slug: 'premium-photo-book-hardcover',
      active: true,
    },
  })

  const layflat = await prisma.product.upsert({
    where: { slug: 'layflat-photo-book' },
    update: {},
    create: {
      name: 'Lay-Flat Photo Book',
      description:
        'Showcase panoramic photos in their full glory with our lay-flat binding. Perfect for weddings, travel, and family portraits.',
      category: 'photo-book',
      basePrice: 49.99,
      sizes: ['8x11', '11x8', '12x12', '14x11'],
      coverTypes: ['hardcover-glossy', 'hardcover-matte', 'leather'],
      pageOptions: [
        { pages: 20, priceAdder: 0 },
        { pages: 40, priceAdder: 12 },
        { pages: 60, priceAdder: 24 },
        { pages: 80, priceAdder: 36 },
      ],
      images: [
        '/images/products/layflat-front.jpg',
        '/images/products/layflat-open.jpg',
      ],
      slug: 'layflat-photo-book',
      active: true,
    },
  })

  console.log('Seeded products:', { softcover, hardcover, layflat })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
