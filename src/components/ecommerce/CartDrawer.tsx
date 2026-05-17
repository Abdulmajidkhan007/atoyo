import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  selectCartItems,
  selectCartTotal,
  selectCartOpen,
  closeCart,
  removeFromCart,
  updateQuantity,
} from '@/features/cart/cartSlice'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const isOpen = useAppSelector(selectCartOpen)

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('uz-UZ').format(p) + " so'm"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => dispatch(closeCart())}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--bg-card)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Savatcha ({items.length})
              </h2>
              <button
                onClick={() => dispatch(closeCart())}
                className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors text-[var(--text-muted)]"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="text-6xl">🛒</div>
                  <p className="text-[var(--text-muted)]">Savatcha bo'sh</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(closeCart())}
                  >
                    Xarid qilishni boshlash
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 border border-[var(--border-color)] rounded-xl p-3"
                  >
                    <img
                      src={item.product.images[0] || 'https://placehold.co/80x80?text=+'}
                      alt={item.product.nameUz}
                      className="w-18 h-18 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[var(--text-primary)] line-clamp-2">
                        {item.product.nameUz}
                      </p>
                      <p className="text-primary-600 font-bold text-sm mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.product.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          className="h-7 w-7 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-sm hover:border-primary-500 hover:text-primary-600 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.product.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="h-7 w-7 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-sm hover:border-primary-500 hover:text-primary-600 transition-colors disabled:opacity-40"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="ml-auto text-red-400 hover:text-red-600 transition-colors text-sm"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between font-bold text-lg">
                  <span className="text-[var(--text-primary)]">Jami:</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>
                <Link to="/checkout" onClick={() => dispatch(closeCart())}>
                  <Button fullWidth size="lg">
                    Buyurtma berish
                  </Button>
                </Link>
                <Link to="/cart" onClick={() => dispatch(closeCart())}>
                  <Button fullWidth variant="outline" size="md">
                    Savatchani ko'rish
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
