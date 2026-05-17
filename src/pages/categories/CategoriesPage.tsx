import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  { icon: '🚰', name: 'Kranlar', slug: 'faucets', desc: 'Zamonaviy va klassik kranlar', count: 120, color: 'from-blue-500 to-primary-600' },
  { icon: '🪣', name: 'Lavabolar', slug: 'sinks', desc: 'Keramik va granit lavabolar', count: 85, color: 'from-teal-500 to-primary-700' },
  { icon: '🚿', name: 'Dush tizimlari', slug: 'showers', desc: 'Premium dush panellari', count: 64, color: 'from-primary-500 to-dark-700' },
  { icon: '🚽', name: 'Unitazlar', slug: 'toilets', desc: 'Zamonaviy unitaz modellari', count: 43, color: 'from-accent-500 to-accent-700' },
  { icon: '🛁', name: 'Vannalar', slug: 'baths', desc: 'Akril va quyma vannalar', count: 38, color: 'from-purple-500 to-purple-700' },
  { icon: '🔧', name: 'Aksessuarlar', slug: 'accessories', desc: 'Ushlagichlar, qo\'yindilar', count: 210, color: 'from-emerald-500 to-teal-700' },
  { icon: '💧', name: 'Suv tizimlari', slug: 'water-systems', desc: 'Tozalash va filtrlash', count: 55, color: 'from-cyan-500 to-primary-800' },
  { icon: '🧹', name: 'Sanitariya', slug: 'sanitary', desc: 'Tozalik mahsulotlari', count: 92, color: 'from-orange-400 to-accent-600' },
]

export default function CategoriesPage() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-3">Barcha kategoriyalar</h1>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Santexnika va vannaxona mahsulotlarining to'liq assortimenti
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group block rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-40 bg-gradient-to-br ${cat.color} flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg text-[var(--text-primary)]">{cat.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{cat.desc}</p>
                  <p className="text-xs text-primary-500 font-semibold mt-2">{cat.count} mahsulot →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
