import { defineConfig } from 'prisma/config'

<<<<<<< HEAD
export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
=======
const connectionString =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/photobook'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: connectionString,
>>>>>>> ed97eac (feat: add cart, checkout, auth, and order management)
  },
})
