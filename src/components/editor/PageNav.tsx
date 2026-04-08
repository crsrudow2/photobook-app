'use client'

interface Page {
  id: string
  label: string
}

interface PageNavProps {
  pages: Page[]
  currentPageId: string
  onSelectPage: (id: string) => void
  onAddPage: () => void
  onRemovePage: (id: string) => void
}

export default function PageNav({
  pages,
  currentPageId,
  onSelectPage,
  onAddPage,
  onRemovePage,
}: PageNavProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto bg-gray-100 px-4 py-2 border-t border-gray-200">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-500 mr-1">
        Pages
      </span>

      {pages.map((page) => {
        const isCurrent = page.id === currentPageId
        return (
          <div key={page.id} className="relative shrink-0 group">
            <button
              className={`w-16 h-12 rounded border text-xs font-medium transition-all ${
                isCurrent
                  ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-400'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
              }`}
              onClick={() => onSelectPage(page.id)}
              title={`Go to ${page.label}`}
            >
              {page.label}
            </button>
            {pages.length > 1 && (
              <button
                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); onRemovePage(page.id) }}
                title={`Remove ${page.label}`}
                aria-label={`Remove ${page.label}`}
              >
                ×
              </button>
            )}
          </div>
        )
      })}

      <button
        className="shrink-0 flex items-center gap-1 rounded border border-dashed border-gray-400 px-2 py-1 text-xs text-gray-500 hover:border-gray-600 hover:text-gray-700 transition-colors"
        onClick={onAddPage}
        title="Add page"
      >
        <span className="text-base leading-none">+</span> Page
      </button>
    </div>
  )
}
