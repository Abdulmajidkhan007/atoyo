import { Link } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { selectWishlistItems } from '@/features/wishlist/wishlistSlice'
import { selectCartCount } from '@/features/cart/cartSlice'

export default function UserDashboard() {
  const user = useAppSelector(s=>s.auth.user)
  const wishlist = useAppSelector(selectWishlistItems)
  const cartCount = useAppSelector(selectCartCount)

  return (
    <div className="space-y-6">
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-black text-2xl">
            {user?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-black text-[var(--text-primary)]">Xush kelibsiz, {user?.displayName?.split(' ')[0]}!</h2>
            <p className="text-[var(--text-muted)] text-sm">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {icon:'🛒',label:'Savatchadagi',value:cartCount,link:'/cart',color:'from-primary-500 to-primary-700'},
          {icon:'♥',label:'Sevimlilardagi',value:wishlist.length,link:'/wishlist',color:'from-red-400 to-red-600'},
          {icon:'📦',label:'Buyurtmalarim',value:'Ko\'rish',link:'/dashboard/orders',color:'from-accent-500 to-accent-700'},
        ].map(s=>(
          <Link key={s.label} to={s.link} className={`p-6 rounded-2xl bg-gradient-to-br ${s.color} text-white hover:shadow-lg hover:-translate-y-1 transition-all`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-black">{s.value}</div>
            <div className="text-sm opacity-80 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {to:'/shop',icon:'🛍️',title:'Xarid qilish',desc:'Yangi mahsulotlarni ko\'ring'},
          {to:'/dashboard/profile',icon:'👤',title:'Profilni tahrirlash',desc:'Ma\'lumotlaringizni yangilang'},
          {to:'/dashboard/orders',icon:'📋',title:'Buyurtmalarim',desc:'Buyurtma holatini kuzating'},
          {to:'/wishlist',icon:'♥',title:'Sevimlilarim',desc:`${wishlist.length} ta mahsulot`},
        ].map(a=>(
          <Link key={a.to} to={a.to} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-primary-300 hover:shadow-md transition-all">
            <div className="text-2xl">{a.icon}</div>
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)]">{a.title}</p>
              <p className="text-xs text-[var(--text-muted)]">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
