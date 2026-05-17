import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store'
import { OrdersService } from '@/services/orders.service'
import { Badge } from '@/components/ui/Badge'
import type { Order } from '@/types'
import { ORDER_STATUSES } from '@/constants'

const STATUS_VARIANTS: Record<string,'primary'|'warning'|'info'|'success'|'gray'|'error'> = {
  active:'primary',accepted:'warning',sent:'info',delivered:'success',archived:'gray',cancelled:'error'
}

export default function UserOrders() {
  const user = useAppSelector(s=>s.auth.user)
  const [orders,setOrders]=useState<Order[]>([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    if(!user)return
    OrdersService.getByUser(user.uid).then(setOrders).catch(()=>{}).finally(()=>setLoading(false))
  },[user])

  const formatPrice=(p:number)=>new Intl.NumberFormat('uz-UZ').format(p)+" so'm"

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[var(--text-primary)]">Buyurtmalarim</h2>
      {loading ? <div className="text-center py-8"><div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"/></div>
      : orders.length===0 ? (
        <div className="text-center py-12 space-y-3">
          <div className="text-5xl">📦</div>
          <p className="font-bold text-[var(--text-primary)]">Buyurtmalar yo'q</p>
          <p className="text-[var(--text-muted)] text-sm">Birinchi buyurtmangizni bering</p>
        </div>
      ) : orders.map(order=>(
        <div key={order.id} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-bold text-[var(--text-primary)]">#{order.id.slice(-6).toUpperCase()}</p>
              <p className="text-xs text-[var(--text-muted)]">{new Date(order.createdAt).toLocaleString('uz-UZ')}</p>
            </div>
            <Badge variant={STATUS_VARIANTS[order.status]}>{ORDER_STATUSES[order.status]?.label}</Badge>
          </div>
          <div className="space-y-2 mb-4">
            {order.items.map(item=>(
              <div key={item.productId} className="flex items-center gap-3">
                <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{item.productName}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.quantity} × {formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-3">
            <div>
              <p className="text-xs text-[var(--text-muted)]">Manzil: {order.deliveryAddress}</p>
              <p className="text-xs text-[var(--text-muted)]">To'lov: {order.paymentMethod==='cash'?"Naqd pul":"Online"}</p>
            </div>
            <p className="font-black text-lg text-primary-600">{formatPrice(order.totalPrice)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
