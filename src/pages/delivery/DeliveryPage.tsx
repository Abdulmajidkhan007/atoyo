import { motion } from 'framer-motion'

export default function DeliveryPage() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-8">Yetkazib berish va to'lov</h1>
          <div className="space-y-6">
            {[
              {
                icon: '🚚', title: 'Yetkazib berish shartlari',
                items: ['Toshkent shahri bo\'ylab: 1 ish kuni (bepul)', 'Toshkent viloyati: 2 ish kuni (bepul)', 'Barcha viloyatlar: 2-3 ish kuni', 'Express yetkazib berish: 4-6 soat (qo\'shimcha haq)']
              },
              {
                icon: '💳', title: 'To\'lov usullari',
                items: ['Naqd pul (yetkazilganda)', 'Click orqali to\'lov', 'Payme orqali to\'lov', 'Visa/Mastercard karta', 'Bank o\'tkazmasi']
              },
              {
                icon: '📦', title: 'Qadoqlash',
                items: ['Barcha mahsulotlar original qadoqda yetkaziladi', 'Katta mahsulotlar qo\'shimcha himoyalanadi', 'Qabul qilishda tekshirib oling']
              },
            ].map((section) => (
              <div key={section.title} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
