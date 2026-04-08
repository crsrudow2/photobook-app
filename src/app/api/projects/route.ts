import { writeFile, readFile, mkdir, readdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

const PROJECTS_DIR = join(process.cwd(), 'public', 'projects')

async function ensureProjectsDir() {
  await mkdir(PROJECTS_DIR, { recursive: true })
}

export async function GET() {
  await ensureProjectsDir()
  try {
    const files = await readdir(PROJECTS_DIR)
    const projects = await Promise.all(
      files
        .filter((f) => f.endsWith('.json'))
        .map(async (f) => {
          const raw = await readFile(join(PROJECTS_DIR, f), 'utf-8')
          return JSON.parse(raw) as { id: string; title: string; updatedAt: string }
        })
    )
    // Return sorted newest first
    projects.sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''))
    return Response.json(projects)
  } catch {
    return Response.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  let body: { title?: string; fabricJson?: object; id?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.fabricJson) {
    return Response.json({ error: 'fabricJson is required' }, { status: 400 })
  }

  await ensureProjectsDir()

  const id = body.id ?? randomUUID()
  const project = {
    id,
    title: body.title ?? 'Untitled Project',
    fabricJson: body.fabricJson,
    updatedAt: new Date().toISOString(),
  }

  await writeFile(join(PROJECTS_DIR, `${id}.json`), JSON.stringify(project, null, 2))

  return Response.json(project, { status: 201 })
}
