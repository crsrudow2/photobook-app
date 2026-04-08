'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface Photo {
  url: string
  name: string
}

interface PhotoUploadProps {
  onAddToCanvas: (url: string) => void
}

export default function PhotoUpload({ onAddToCanvas }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [draggingOver, setDraggingOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are supported.')
      return
    }
    setUploading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()
      setPhotos((prev) => [...prev, { url, name: file.name }])
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }, [])

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return
      Array.from(files).forEach(uploadFile)
    },
    [uploadFile]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDraggingOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Photos</p>

      {/* Drop zone */}
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center text-sm transition-colors cursor-pointer ${
          draggingOver
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-300 text-gray-500 hover:border-gray-400'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true) }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="Upload photos"
      >
        <svg className="mb-1 h-6 w-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16l4-4 4 4 4-6 4 6M3 20h18" />
        </svg>
        {uploading ? 'Uploading…' : 'Drop photos here or click to browse'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo, i) => (
            <button
              key={i}
              className="group relative aspect-square overflow-hidden rounded border border-gray-200 bg-gray-100 hover:ring-2 hover:ring-blue-400"
              title={`Add "${photo.name}" to canvas`}
              onClick={() => onAddToCanvas(photo.url)}
            >
              <Image
                src={photo.url}
                alt={photo.name}
                fill
                className="object-cover transition-opacity group-hover:opacity-80"
                sizes="80px"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="rounded bg-blue-600 px-1.5 py-0.5 text-xs text-white">Add</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
