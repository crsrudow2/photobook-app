import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads')

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof Blob)) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  const originalName = (file as File).name ?? 'upload'
  const ext = extname(originalName).toLowerCase() || '.jpg'
  const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']
  if (!allowedExts.includes(ext)) {
    return Response.json({ error: 'Unsupported file type' }, { status: 400 })
  }

  const filename = `${randomUUID()}${ext}`
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await mkdir(UPLOADS_DIR, { recursive: true })
  await writeFile(join(UPLOADS_DIR, filename), buffer)

  return Response.json({ url: `/uploads/${filename}` }, { status: 201 })
}
