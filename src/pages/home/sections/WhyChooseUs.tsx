import { motion } from 'framer-motion'

const features = [
  {
    icon: '🏆',
    title: 'Premium sifat',
    desc: 'Barcha mahsulotlarimiz xalqaro sifat standartlariga mos keladi va maxsus tekshiruvdan o\'tgan.',
  },
  {
    icon: '🚚',
    title: 'Tez yetkazib berish',
    desc: 'Toshkent bo\'ylab 24 soat, viloyatlarga 2-3 ish kunida yetkazib beramiz.',
  },
  {
    icon: '🛡️',
    title: '2 yil kafolat',
    desc: 'Barcha mahsulotlarimizga 2 yillik rasmiy kafolat beramiz. Muammo bo\'lsa qaytaramiz.',
  },
  {
    icon: '💬',
    title: '24/7 qo\'llab-quvvatlash',
    desc: 'Mutaxassis jamoamiz har doim yordam berishga tayyor. Telefon va Telegram orqali murojaat qiling.',
  },
  {
    icon: '💳',
    title: 'Qulay to\'lov',
    desc: 'Naqd pul yoki online to\'lov. Bank kartasi, Click, Payme va boshqa usullar qabul qilinadi.',
  },
  {
    icon: '🔧',
    title: 'O\'rnatish xizmati',
    desc: 'Professional ustalardan iborat jamoamiz mahsulotlarni sifatli o\'rnatib beradi.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Nima uchun biz?
          </p>
          <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4">
            ATOYO'ni tanlashning asosiy sabablari
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            5 yillik tajriba va 5000+ mamnun mijozimiz bilan biz O'zbekistondagi
            ishonchli santexnika do'koniga aylandik
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
