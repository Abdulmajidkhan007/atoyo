import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OrdersService } from '@/services/orders.service'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { Order } from '@/types'
import { ORDER_STATUSES } from '@/constants'
import toast from 'react-hot-toast'

const STATUS_VARIANTS: Record<string, 'primary' | 'warning' | 'info' | 'success' | 'gray' | 'error'> = {
  active: 'primary', accepted: 'warning', sent: 'info',
  delivered: 'success', archived: 'gray', cancelled: 'error',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState('')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await OrdersService.getAll()
      setOrders(data)
    } catch {
      toast.error('Buyurtmalarni yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    try {
      await OrdersService.updateStatus(orderId, status)
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      )
      if (selected?.id === orderId) setSelected((s) => s ? { ...s, status } : null)
      toast.success('Status yangilandi')
    } catch {
      toast.error('Statusni yangilashda xatolik')
    }
  }

  const formatPrice = (p: number) => new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m'

  const filtered = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[var(--text-primary)]">Buyurtmalar</h2>
        <button
          onClick={loadOrders}
          className="text-sm text-primary-600 hover:underline"
        >
          Yangilash
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !filterStatus ? 'bg-primary-600 text-white' : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-primary-500'
          }`}
        >
          Barchasi ({orders.length})
        </button>
        {Object.entries(ORDER_STATUSES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterStatus === key ? 'bg-primary-600 text-white' : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-primary-500'
            }`}
          >
            {val.label} ({orders.filter((o) => o.status === key).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
              <tr>
                {['#', 'Mijoz', 'Telefon', 'Mahsulotlar', 'Summa', 'To\'lov', 'Status', 'Sana', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 9 }).map((__, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="animate-pulse bg-gray-200 h-4 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {order.customerPhone}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {order.items.length} ta
                  </td>
                  <td className="px-4 py-3 font-bold text-primary-600">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={order.paymentMethod === 'cash' ? 'gray' : 'info'}>
                      {order.paymentMethod === 'cash' ? 'Naqd' : 'Online'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANTS[order.status]}>
                      {ORDER_STATUSES[order.status]?.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--text-muted)]">
                    {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(order)}
                      className="text-primary-600 hover:underline text-xs font-semibold"
                    >
                      Ko'rish
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && (
            <div className="p-8 text-center text-[var(--text-muted)]">Buyurtmalar yo'q</div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Buyurtma #${selected?.id.slice(-6).toUpperCase()}`} size="lg">
        {selected && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Mijoz</p>
                  <p className="font-semibold text-[var(--text-primary)]">{selected.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Telefon</p>
                  <a href={`tel:${selected.customerPhone}`} className="font-semibold text-primary-600">
                    {selected.customerPhone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Email</p>
                  <p className="font-semibold text-[var(--text-primary)]">{selected.customerEmail || '—'}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Manzil</p>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">{selected.deliveryAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">To'lov usuli</p>
                  <p className="font-semibold">{selected.paymentMethod === 'cash' ? 'Naqd pul' : 'Online to\'lov'}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Sana</p>
                  <p className="font-semibold">{new Date(selected.createdAt).toLocaleString('uz-UZ')}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)] mb-3">Mahsulotlar</p>
              <div className="space-y-2">
                {selected.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[var(--text-primary)]">{item.productName}</p>
                      <p className="text-xs text-[var(--text-muted)]">{item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                    <p className="font-bold text-sm text-primary-600">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mt-3 pt-3 border-t border-[var(--border-color)]">
                <span>Jami:</span>
                <span className="text-primary-600">{formatPrice(selected.totalPrice)}</span>
              </div>
            </div>

            {selected.notes && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-700 font-semibold mb-1">Izoh:</p>
                <p className="text-sm text-amber-800">{selected.notes}</p>
              </div>
            )}

            {/* Status change */}
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)] mb-3">Status o'zgartirish</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(ORDER_STATUSES).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => handleStatusChange(selected.id, key as Order['status'])}
                    disabled={selected.status === key}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selected.status === key
                        ? `${val.color} text-white`
                        : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-primary-500'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
