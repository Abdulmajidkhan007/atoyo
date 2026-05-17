import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectWishlistItems, removeFromWishlist, clearWishlist } from '@/features/wishlist/wishlistSlice'
import { addToCart, openCart } from '@/features/cart/cartSlice'
import { Button } from '@/components/ui/Button'
import { RatingStars } from '@/components/ui/RatingStars'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectWishlistItems)
  const user = useAppSelector(s=>s.auth.user)
  const formatPrice=(p:number)=>new Intl.NumberFormat('uz-UZ').format(p)+" so'm"

  const handleAddToCart = (product: (typeof items)[0]['product']) => {
    if(!user){toast.error('Savatchaga qo\'shish uchun tizimga kiring');return}
    dispatch(addToCart({product}));dispatch(openCart());toast.success('Savatchaga qo\'shildi')
  }

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-[var(--text-primary)]">Sevimlilar ({items.length})</h1>
          {items.length>0 && <button onClick={()=>{dispatch(clearWishlist());toast.success('Tozalandi')}} className="text-sm text-red-500 hover:underline">Barchasini o'chirish</button>}
        </div>
        {items.length===0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="text-7xl">♥</div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Sevimlilar bo'sh</h2>
            <p className="text-[var(--text-muted)]">Mahsulotlarni sevimlilarga qo'shing</p>
            <Link to="/shop"><Button size="lg">Do'konga o'tish</Button></Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(({product})=>(
              <div key={product.id} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.nameUz} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-4 space-y-3">
                  <Link to={`/product/${product.id}`} className="font-semibold text-sm text-[var(--text-primary)] hover:text-primary-600 line-clamp-2">{product.nameUz}</Link>
                  <RatingStars rating={product.rating} size="sm" showCount count={product.reviewCount} />
                  <p className="font-black text-primary-600">{formatPrice(product.price)}</p>
                  <div className="flex gap-2">
                    <Button fullWidth size="sm" onClick={()=>handleAddToCart(product)} disabled={product.stock===0}>Savatchaga qo'sh</Button>
                    <button onClick={()=>{dispatch(removeFromWishlist(product.id));toast.success('O\'chirildi')}} className="h-8 w-8 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-red-400 hover:border-red-400 transition-colors">×</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
