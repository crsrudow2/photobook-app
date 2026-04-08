'use client'

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import type { Canvas as FabricCanvas, FabricObject } from 'fabric'

export interface CanvasHandle {
  addPhoto: (url: string) => Promise<void>
  addText: (text: string, options?: { fontFamily?: string; fontSize?: number; fill?: string }) => void
  deleteSelected: () => void
  undo: () => void
  redo: () => void
  toJSON: () => object
  loadFromJSON: (json: object) => Promise<void>
}

interface CanvasProps {
  className?: string
  onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const Canvas = forwardRef<CanvasHandle, CanvasProps>(function Canvas(
  { className, onHistoryChange },
  ref
) {
  const canvasElRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<FabricCanvas | null>(null)
  const historyRef = useRef<string[]>([])
  const historyIndexRef = useRef<number>(-1)
  const isUndoRedoRef = useRef(false)

  const notifyHistory = useCallback(() => {
    const canUndo = historyIndexRef.current > 0
    const canRedo = historyIndexRef.current < historyRef.current.length - 1
    onHistoryChange?.(canUndo, canRedo)
  }, [onHistoryChange])

  const saveSnapshot = useCallback(() => {
    if (!fabricRef.current || isUndoRedoRef.current) return
    const json = JSON.stringify(fabricRef.current.toJSON())
    // Truncate redo history when a new action is performed
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1)
    historyRef.current.push(json)
    historyIndexRef.current = historyRef.current.length - 1
    notifyHistory()
  }, [notifyHistory])

  useEffect(() => {
    if (!canvasElRef.current) return

    let canvas: FabricCanvas

    import('fabric').then(({ Canvas: FabricCanvasClass }) => {
      canvas = new FabricCanvasClass(canvasElRef.current!, {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#ffffff',
        selection: true,
      })
      fabricRef.current = canvas

      // Save initial blank snapshot
      const initial = JSON.stringify(canvas.toJSON())
      historyRef.current = [initial]
      historyIndexRef.current = 0
      notifyHistory()

      // Snapshot after any object modification
      const snap = () => saveSnapshot()
      canvas.on('object:added', snap)
      canvas.on('object:modified', snap)
      canvas.on('object:removed', snap)
    })

    return () => {
      fabricRef.current?.dispose()
      fabricRef.current = null
    }
  }, [saveSnapshot, notifyHistory])

  const addPhoto = useCallback(async (url: string) => {
    const canvas = fabricRef.current
    if (!canvas) return
    const { FabricImage } = await import('fabric')
    const img = await FabricImage.fromURL(url, { crossOrigin: 'anonymous' })
    // Scale down if larger than canvas
    const scale = Math.min(
      (CANVAS_WIDTH * 0.6) / (img.width ?? 1),
      (CANVAS_HEIGHT * 0.6) / (img.height ?? 1),
      1
    )
    img.set({ left: 60, top: 60, scaleX: scale, scaleY: scale })
    canvas.add(img)
    canvas.setActiveObject(img)
    canvas.renderAll()
  }, [])

  const addText = useCallback(
    (
      text: string,
      options: { fontFamily?: string; fontSize?: number; fill?: string } = {}
    ) => {
      const canvas = fabricRef.current
      if (!canvas) return
      import('fabric').then(({ IText }) => {
        const textObj = new IText(text, {
          left: 100,
          top: 100,
          fontFamily: options.fontFamily ?? 'Arial',
          fontSize: options.fontSize ?? 24,
          fill: options.fill ?? '#000000',
          editable: true,
        })
        canvas.add(textObj)
        canvas.setActiveObject(textObj)
        canvas.renderAll()
      })
    },
    []
  )

  const deleteSelected = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const active = canvas.getActiveObjects()
    active.forEach((obj: FabricObject) => canvas.remove(obj))
    canvas.discardActiveObject()
    canvas.renderAll()
  }, [])

  const undo = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas || historyIndexRef.current <= 0) return
    historyIndexRef.current -= 1
    const snapshot = historyRef.current[historyIndexRef.current]
    isUndoRedoRef.current = true
    canvas.loadFromJSON(JSON.parse(snapshot)).then(() => {
      canvas.renderAll()
      isUndoRedoRef.current = false
      notifyHistory()
    })
  }, [notifyHistory])

  const redo = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas || historyIndexRef.current >= historyRef.current.length - 1) return
    historyIndexRef.current += 1
    const snapshot = historyRef.current[historyIndexRef.current]
    isUndoRedoRef.current = true
    canvas.loadFromJSON(JSON.parse(snapshot)).then(() => {
      canvas.renderAll()
      isUndoRedoRef.current = false
      notifyHistory()
    })
  }, [notifyHistory])

  const toJSON = useCallback(() => {
    return fabricRef.current?.toJSON() ?? {}
  }, [])

  const loadFromJSON = useCallback(async (json: object) => {
    const canvas = fabricRef.current
    if (!canvas) return
    await canvas.loadFromJSON(json)
    canvas.renderAll()
    // Reset history to the loaded state
    const snapshot = JSON.stringify(canvas.toJSON())
    historyRef.current = [snapshot]
    historyIndexRef.current = 0
    notifyHistory()
  }, [notifyHistory])

  useImperativeHandle(ref, () => ({
    addPhoto,
    addText,
    deleteSelected,
    undo,
    redo,
    toJSON,
    loadFromJSON,
  }))

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [deleteSelected, undo, redo])

  return (
    <div className={className}>
      <canvas ref={canvasElRef} />
    </div>
  )
})

export default Canvas
