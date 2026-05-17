import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  { icon: '🚰', name: 'Kranlar', slug: 'kranlar', count: 120, color: 'from-blue-500 to-primary-600' },
  { icon: '🪣', name: 'Lavabolar', slug: 'lavabolar', count: 85, color: 'from-teal-500 to-primary-700' },
  { icon: '🚿', name: 'Dush tizimlari', slug: 'dush', count: 64, color: 'from-primary-500 to-dark-700' },
  { icon: '🚽', name: 'Unitazlar', slug: 'unitazlar', count: 43, color: 'from-accent-500 to-accent-700' },
  { icon: '🛁', name: 'Vanna', slug: 'vanna', count: 38, color: 'from-purple-500 to-purple-700' },
  { icon: '🔧', name: 'Aksessuarlar', slug: 'aksessuarlar', count: 210, color: 'from-emerald-500 to-teal-700' },
  { icon: '💧', name: 'Suv tizimlari', slug: 'suv-tizimlari', count: 55, color: 'from-cyan-500 to-primary-800' },
  { icon: '🧹', name: 'Sanitariya', slug: 'sanitariya', count: 92, color: 'from-orange-400 to-accent-600' },
]

export function FeaturedCategories() {
  return (
    <section className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Kategoriyalar
          </p>
          <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4">
            Barcha mahsulot turlari
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Zamonaviy vannaxona va santexnikaga oid barcha mahsulotlarni bir joyda toping
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:shadow-xl hover:border-primary-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {cat.icon}
                </div>
                <p className="font-semibold text-sm text-[var(--text-primary)] text-center">
                  {cat.name}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {cat.count} mahsulot
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
