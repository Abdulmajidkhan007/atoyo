import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity, clearCart } from '@/features/cart/cartSlice'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const user = useAppSelector(s=>s.auth.user)
  const formatPrice=(p:number)=>new Intl.NumberFormat('uz-UZ').format(p)+" so'm"

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-8">
        <h1 className="text-3xl font-black text-[var(--text-primary)] mb-8">Savatcha</h1>
        {items.length===0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="text-7xl">🛒</div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Savatcha bo'sh</h2>
            <p className="text-[var(--text-muted)]">Mahsulotlarni ko'rish va xarid qilishni boshlang</p>
            <Link to="/shop"><Button size="lg">Do'konga o'tish</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item=>(
                <div key={item.product.id} className="flex gap-4 p-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                  <img src={item.product.images[0]} alt={item.product.nameUz} className="w-24 h-24 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="font-bold text-[var(--text-primary)] hover:text-primary-600 line-clamp-2">{item.product.nameUz}</Link>
                    <p className="text-primary-600 font-bold mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={()=>dispatch(updateQuantity({productId:item.product.id,quantity:item.quantity-1}))} className="h-8 w-8 rounded-lg border border-[var(--border-color)] flex items-center justify-center hover:border-primary-500 transition-colors">−</button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button onClick={()=>dispatch(updateQuantity({productId:item.product.id,quantity:item.quantity+1}))} disabled={item.quantity>=item.product.stock} className="h-8 w-8 rounded-lg border border-[var(--border-color)] flex items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-40">+</button>
                      <button onClick={()=>{dispatch(removeFromCart(item.product.id));toast.success('O\'chirildi')}} className="ml-auto text-red-400 hover:text-red-600 transition-colors text-sm">O'chirish</button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-lg text-primary-600">{formatPrice(item.product.price*item.quantity)}</p>
                  </div>
                </div>
              ))}
              <button onClick={()=>{dispatch(clearCart());toast.success('Savatcha tozalandi')}} className="text-sm text-red-500 hover:underline">Savatchani tozalash</button>
            </div>
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 h-fit sticky top-24 space-y-4">
              <h2 className="font-bold text-lg text-[var(--text-primary)]">Xulosa</h2>
              <div className="flex justify-between text-sm"><span className="text-[var(--text-muted)]">Mahsulotlar</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[var(--text-muted)]">Yetkazib berish</span><span className="text-green-500">Bepul</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-[var(--border-color)] pt-3"><span>Jami</span><span className="text-primary-600">{formatPrice(total)}</span></div>
              {user ? (
                <Link to="/checkout"><Button fullWidth size="lg">Buyurtma berish</Button></Link>
              ) : (
                <Link to="/login" state={{from:{pathname:'/checkout'}}}><Button fullWidth size="lg">Kirish va buyurtma berish</Button></Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
