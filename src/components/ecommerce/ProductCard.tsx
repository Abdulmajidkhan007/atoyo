import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/store'
import { addToCart, openCart } from '@/features/cart/cartSlice'
import { toggleWishlist, selectIsInWishlist } from '@/features/wishlist/wishlistSlice'
import { RatingStars } from '@/components/ui/RatingStars'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id))
  const user = useAppSelector((s) => s.auth.user)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error('Savatchaga qo\'shish uchun tizimga kiring')
      return
    }
    dispatch(addToCart({ product }))
    dispatch(openCart())
    toast.success(`${product.nameUz} savatchaga qo'shildi`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(toggleWishlist(product))
    toast.success(
      isInWishlist ? 'Sevimlilardan olib tashlandi' : 'Sevimlilarga qo\'shildi'
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-50 h-56">
          <img
            src={product.images[0] || 'https://placehold.co/400x300?text=ATOYO'}
            alt={product.nameUz}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && <Badge variant="success">Yangi</Badge>}
            {product.isBestSeller && <Badge variant="accent">Top</Badge>}
            {product.isFeatured && <Badge variant="primary">Tanlangan</Badge>}
            {product.originalPrice && product.originalPrice > product.price && (
              <Badge variant="error">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 h-9 w-9 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            ♥
          </button>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white rounded-lg px-3 py-1 text-sm font-semibold text-gray-800">
                Tugagan
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-1">{product.category}</p>
          <Link
            to={`/product/${product.id}`}
            className="font-semibold text-[var(--text-primary)] hover:text-primary-600 line-clamp-2 text-sm leading-snug"
          >
            {product.nameUz}
          </Link>
        </div>

        <RatingStars
          rating={product.rating}
          size="sm"
          showCount
          count={product.reviewCount}
        />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-primary-600">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-[var(--text-muted)] line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Qoldi: {product.stock}
          </p>
        </div>

        <Button
          fullWidth
          size="sm"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          variant="primary"
        >
          {product.stock === 0 ? 'Tugagan' : 'Savatchaga qo\'sh'}
        </Button>
      </div>
    </motion.div>
  )
}
