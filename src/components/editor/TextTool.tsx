'use client'

import { useState } from 'react'

const FONTS = ['Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Trebuchet MS']
const FONT_SIZES = [12, 14, 16, 18, 24, 32, 48, 64]

interface TextToolProps {
  onAddText: (text: string, options: { fontFamily: string; fontSize: number; fill: string }) => void
}

export default function TextTool({ onAddText }: TextToolProps) {
  const [text, setText] = useState('Your text here')
  const [fontFamily, setFontFamily] = useState('Arial')
  const [fontSize, setFontSize] = useState(24)
  const [fill, setFill] = useState('#000000')

  const handleAdd = () => {
    if (!text.trim()) return
    onAddText(text, { fontFamily, fontSize, fill })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Text</p>

      <textarea
        className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text…"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500">Font</label>
        <select
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500">Size</label>
          <select
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Color</label>
          <input
            type="color"
            className="h-8 w-10 rounded border border-gray-300 cursor-pointer"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
          />
        </div>
      </div>

      <button
        className="w-full rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50"
        onClick={handleAdd}
        disabled={!text.trim()}
      >
        Add Text to Canvas
      </button>

      <div
        className="rounded border border-gray-200 bg-gray-50 p-2 text-center"
        style={{ fontFamily, fontSize: Math.min(fontSize, 32), color: fill }}
      >
        {text || 'Preview'}
      </div>
    </div>
  )
}
