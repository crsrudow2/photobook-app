'use client'

import { useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import PhotoUpload from '@/components/editor/PhotoUpload'
import PageNav from '@/components/editor/PageNav'
import TextTool from '@/components/editor/TextTool'
import type { CanvasHandle } from '@/components/editor/Canvas'

// Load Canvas only on the client — Fabric.js requires browser APIs
const Canvas = dynamic(() => import('@/components/editor/Canvas'), { ssr: false })

interface Page {
  id: string
  label: string
  fabricJson: object | null
}

function createPage(index: number): Page {
  return { id: crypto.randomUUID(), label: `Page ${index}`, fabricJson: null }
}

export default function EditorPage() {
  const canvasRef = useRef<CanvasHandle>(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [projectTitle, setProjectTitle] = useState('Untitled Project')
  const [projectId, setProjectId] = useState<string | undefined>()

  const [pages, setPages] = useState<Page[]>([createPage(1)])
  const [currentPageId, setCurrentPageId] = useState(pages[0].id)

  // When switching pages: snapshot current canvas, then load target
  const switchPage = useCallback(
    async (targetId: string) => {
      if (targetId === currentPageId) return
      const canvas = canvasRef.current
      if (canvas) {
        const json = canvas.toJSON()
        setPages((prev) =>
          prev.map((p) => (p.id === currentPageId ? { ...p, fabricJson: json } : p))
        )
        const targetPage = pages.find((p) => p.id === targetId)
        if (targetPage?.fabricJson) {
          await canvas.loadFromJSON(targetPage.fabricJson)
        } else {
          // Blank canvas — load empty JSON
          await canvas.loadFromJSON({ objects: [], background: '#ffffff' })
        }
      }
      setCurrentPageId(targetId)
    },
    [currentPageId, pages]
  )

  const addPage = useCallback(() => {
    const newPage = createPage(pages.length + 1)
    setPages((prev) => [...prev, newPage])
  }, [pages.length])

  const removePage = useCallback(
    async (id: string) => {
      const remaining = pages.filter((p) => p.id !== id)
      setPages(remaining)
      if (id === currentPageId && remaining.length > 0) {
        await switchPage(remaining[0].id)
      }
    },
    [pages, currentPageId, switchPage]
  )

  const handleSave = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setSaving(true)
    setSaveStatus('idle')
    try {
      // Snapshot current page
      const currentJson = canvas.toJSON()
      const allPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, fabricJson: currentJson } : p
      )

      const body = {
        id: projectId,
        title: projectTitle,
        fabricJson: allPages,
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Save failed')
      const saved = await res.json()
      setProjectId(saved.id)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }, [canvasRef, currentPageId, pages, projectId, projectTitle])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      {/* Top toolbar */}
      <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-gray-800">Photo Book Editor</h1>
          <input
            type="text"
            className="rounded border border-transparent px-2 py-0.5 text-sm text-gray-700 hover:border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            aria-label="Project title"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <button
            className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => canvasRef.current?.undo()}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            ↩ Undo
          </button>
          <button
            className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => canvasRef.current?.redo()}
            disabled={!canRedo}
            title="Redo (Ctrl+Shift+Z)"
          >
            Redo ↪
          </button>
          <button
            className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            onClick={() => canvasRef.current?.deleteSelected()}
            title="Delete selected (Delete key)"
          >
            🗑 Delete
          </button>

          <div className="mx-2 h-5 w-px bg-gray-200" />

          {/* Save */}
          <button
            className={`rounded px-4 py-1.5 text-sm font-semibold transition-colors ${
              saving
                ? 'bg-gray-400 text-white cursor-wait'
                : saveStatus === 'saved'
                ? 'bg-green-600 text-white'
                : saveStatus === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : saveStatus === 'saved' ? 'Saved!' : saveStatus === 'error' ? 'Error — Retry' : 'Save'}
          </button>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="flex w-56 shrink-0 flex-col gap-4 overflow-y-auto border-r border-gray-200 bg-white p-4">
          <PhotoUpload onAddToCanvas={(url) => canvasRef.current?.addPhoto(url)} />
        </aside>

        {/* Center — canvas + page nav */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 items-center justify-center overflow-auto bg-gray-200 p-6">
            <div className="shadow-xl">
              <Canvas
                ref={canvasRef}
                onHistoryChange={(canUndo, canRedo) => {
                  setCanUndo(canUndo)
                  setCanRedo(canRedo)
                }}
              />
            </div>
          </div>

          <PageNav
            pages={pages}
            currentPageId={currentPageId}
            onSelectPage={switchPage}
            onAddPage={addPage}
            onRemovePage={removePage}
          />
        </main>

        {/* Right panel */}
        <aside className="flex w-56 shrink-0 flex-col gap-4 overflow-y-auto border-l border-gray-200 bg-white p-4">
          <TextTool
            onAddText={(text, opts) => canvasRef.current?.addText(text, opts)}
          />
        </aside>
      </div>
    </div>
  )
}
