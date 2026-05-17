interface RatingStarsProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  count?: number
}

export function RatingStars({
  rating,
  max = 5,
  size = 'md',
  showCount,
  count,
}: RatingStarsProps) {
  const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }

  return (
    <div className={`flex items-center gap-1 ${sizes[size]}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
      {showCount && (
        <span className="text-[var(--text-muted)] ml-1">
          {rating.toFixed(1)} ({count ?? 0})
        </span>
      )}
    </div>
  )
}
