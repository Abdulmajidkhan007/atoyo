import { motion } from 'framer-motion'

export default function WarrantyPage() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-4">Kafolat va ta'mirlash</h1>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">ATOYO da sotib olingan barcha mahsulotlar rasmiy kafolatga ega</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🛡️', title: '2 yil kafolat', desc: 'Barcha mahsulotlarga zavoddan chiqib keladigan nuqsonlar bo\'yicha 2 yillik kafolat beramiz.' },
              { icon: '🔧', title: 'Bepul ta\'mir', desc: 'Kafolat muddatida nosozlik bo\'lsa, mahsulotni bepul ta\'mirlaymiz yoki almashtiramiz.' },
              { icon: '📞', title: 'Tez murojaat', desc: 'Kafolat muddatida muammo bo\'lsa, 24 soat ichida mutaxassisimiz siz bilan bog\'lanadi.' },
              { icon: '📋', title: 'Hujjatlar', desc: 'Kafolat talonini mahsulot bilan birga oling. Sotib olish sanasi va chekning nusxasini saqlang.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-primary-50 border border-primary-200">
            <h3 className="font-bold text-primary-800 mb-2">Kafolat bo'yicha murojaat qilish uchun:</h3>
            <ul className="space-y-2 text-sm text-primary-700">
              <li>📱 Telefon: <a href="tel:+998901234567" className="font-semibold">+998 90 123 45 67</a></li>
              <li>📧 Email: <a href="mailto:warranty@atoyo.uz" className="font-semibold">warranty@atoyo.uz</a></li>
              <li>📍 Manzil: Toshkent, Chilonzor tumani (Du-Shan: 9:00-18:00)</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
