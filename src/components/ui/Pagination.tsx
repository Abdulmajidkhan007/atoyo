interface PaginationProps {
  page: number
  total: number
  perPage: number
  onChange: (page: number) => void
}

export function Pagination({ page, total, perPage, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="h-10 w-10 rounded-xl border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-10 w-10 rounded-xl font-medium text-sm transition-all ${
            p === page
              ? 'bg-primary-600 text-white shadow-md'
              : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-primary-500 hover:text-primary-600'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="h-10 w-10 rounded-xl border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ›
      </button>
    </div>
  )
}
