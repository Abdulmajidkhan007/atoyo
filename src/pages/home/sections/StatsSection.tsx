import { motion } from 'framer-motion'

const stats = [
  { value: '500+', label: 'Premium mahsulot', icon: '📦' },
  { value: '5000+', label: 'Mamnun mijoz', icon: '😊' },
  { value: '50+', label: 'Hamkor brend', icon: '🤝' },
  { value: '5 yil', label: 'Bozordagi tajriba', icon: '⏳' },
  { value: '24/7', label: 'Qo\'llab-quvvatlash', icon: '💬' },
  { value: '99%', label: 'Mamnunlik darajasi', icon: '⭐' },
]

export function StatsSection() {
  return (
    <section className="section-padding gradient-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-4">
            Raqamlarda ATOYO
          </h2>
          <p className="text-primary-100 max-w-xl mx-auto">
            Har bir raqam ortida mijozlarimizning ishonchi va bizning mehnimiz yotadi
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center glass rounded-2xl p-5"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <p className="text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-xs text-primary-100 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
