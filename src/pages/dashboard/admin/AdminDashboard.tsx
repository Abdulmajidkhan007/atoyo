import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { OrdersService } from '@/services/orders.service'
import { ProductsService } from '@/services/products.service'
import { ContactService } from '@/services/contact.service'
import type { Order } from '@/types'
import { ORDER_STATUSES } from '@/constants'

interface Stats {
  orders: number
  products: number
  messages: number
  revenue: number
  activeOrders: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ orders: 0, products: 0, messages: 0, revenue: 0, activeOrders: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [orders, products, messages] = await Promise.all([
          OrdersService.getAll(),
          ProductsService.getAll(),
          ContactService.getAll(),
        ])
        setRecentOrders(orders.slice(0, 5))
        setStats({
          orders: orders.length,
          products: products.length,
          messages: messages.filter((m) => !m.read).length,
          revenue: orders.reduce((s, o) => s + o.totalPrice, 0),
          activeOrders: orders.filter((o) => o.status === 'active' || o.status === 'accepted').length,
        })
      } catch {
        // Demo rejimida bo'sh ma'lumot
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const formatPrice = (p: number) => new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m'

  const statCards = [
    { label: 'Jami buyurtmalar', value: stats.orders, icon: '🛒', color: 'from-blue-500 to-primary-600', link: '/admin/orders' },
    { label: 'Faol buyurtmalar', value: stats.activeOrders, icon: '⚡', color: 'from-amber-500 to-orange-600', link: '/admin/orders' },
    { label: 'Mahsulotlar', value: stats.products, icon: '📦', color: 'from-green-500 to-teal-600', link: '/admin/products' },
    { label: 'O\'qilmagan xabarlar', value: stats.messages, icon: '💬', color: 'from-purple-500 to-pink-600', link: '/admin/messages' },
    { label: 'Umumiy daromad', value: formatPrice(stats.revenue), icon: '💰', color: 'from-primary-600 to-dark-700', link: '/admin/orders' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[var(--text-primary)]">Boshqaruv paneli</h2>
        <p className="text-[var(--text-muted)] text-sm mt-1">ATOYO do'konining umumiy holati</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={s.link}
              className={`block p-5 rounded-2xl bg-gradient-to-br ${s.color} text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black">{loading ? '—' : s.value}</div>
              <div className="text-xs opacity-80 mt-1">{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { to: '/admin/products', icon: '➕', label: 'Yangi mahsulot qo\'sh', desc: 'Katalogga yangi mahsulot qo\'shing' },
          { to: '/admin/blog', icon: '📝', label: 'Post yozing', desc: 'Blog yoki Telegram kanalga post yuboring' },
          { to: '/admin/orders', icon: '🚚', label: 'Buyurtmalarni ko\'ring', desc: 'Yangi buyurtmalarni qayta ishlang' },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex items-center gap-4 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl">{a.icon}</div>
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)]">{a.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <h3 className="font-bold text-[var(--text-primary)]">So'nggi buyurtmalar</h3>
          <Link to="/admin/orders" className="text-sm text-primary-600 hover:underline">
            Barchasini ko'rish →
          </Link>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 flex gap-4">
                <div className="animate-pulse bg-gray-200 h-4 flex-1 rounded" />
              </div>
            ))
          ) : recentOrders.length === 0 ? (
            <div className="p-8 text-center text-[var(--text-muted)]">
              Buyurtmalar yo'q
            </div>
          ) : (
            recentOrders.map((order) => {
              const statusInfo = ORDER_STATUSES[order.status]
              return (
                <div key={order.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[var(--text-primary)]">
                      #{order.id.slice(-6).toUpperCase()} — {order.customerName}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      {order.deliveryAddress}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-primary-600">
                      {formatPrice(order.totalPrice)}
                    </p>
                    <span className={`text-xs text-white ${statusInfo.color} px-2 py-0.5 rounded-full`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
