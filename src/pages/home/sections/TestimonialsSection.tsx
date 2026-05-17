import { motion } from 'framer-motion'
import { RatingStars } from '@/components/ui/RatingStars'

const testimonials = [
  {
    name: 'Bobur Toshmatov',
    role: 'Qurilish kompaniyasi rahbari',
    text: 'ATOYO dan 3 ta loyihamiz uchun santexnika mahsulotlari oldik. Sifat va narx nisbati juda yaxshi. Tavsiya etamiz!',
    rating: 5,
    city: 'Toshkent',
  },
  {
    name: 'Malika Yusupova',
    role: 'Uy xo\'jayini',
    text: 'Vannaxonamni yangiladim, barcha mahsulotlarni ATOYO dan oldim. Yetkazib berish va o\'rnatish xizmati ajoyib edi.',
    rating: 5,
    city: 'Samarqand',
  },
  {
    name: 'Jasur Nazarov',
    role: 'Santexnik usta',
    text: 'Professional sifatidagi mahsulotlar, o\'rnatish oson. Mijozlarimga doimo ATOYO ni maslahat beraman.',
    rating: 5,
    city: 'Farg\'ona',
  },
  {
    name: 'Dilnoza Rahimova',
    role: 'Dizayner',
    text: 'Skandinaviya uslubidagi kranlar va aksessuarlar ajoyib ko\'rinadi. Mijozlarim dizayndan hayron qoladi.',
    rating: 4,
    city: 'Toshkent',
  },
]

export function TestimonialsSection() {
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
            Mijozlar fikri
          </p>
          <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4">
            Ular nima deydi?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Minglab mamnun mijozlarimizning haqiqiy sharhlari
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:shadow-lg transition-shadow"
            >
              <RatingStars rating={t.rating} size="sm" />
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-[var(--border-color)] pt-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {t.role} · {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
