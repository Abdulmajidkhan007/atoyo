import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'

const faqs = [
  {
    question: 'Mahsulotlar qayerdan yetkazib beriladi?',
    answer: 'Barcha mahsulotlarimiz Toshkentdagi omborimizdan yetkazib beriladi. Toshkent shahri bo\'ylab 1 ish kunida, viloyatlarga 2-3 ish kunida yetkazib beramiz.',
  },
  {
    question: 'Qaytarish imkoniyati bormi?',
    answer: 'Ha, mahsulot qabul qilinganidan keyin 14 kun ichida, ishlatilmagan va original qadoqda qaytarish mumkin. Pul 3-5 ish kuni ichida qaytariladi.',
  },
  {
    question: 'Kafolat muddati qancha?',
    answer: 'Barcha mahsulotlarimizga 2 yillik rasmiy kafolat beramiz. Zavoddan chiqib keladigan nosozliklar bepul tuzatiladi.',
  },
  {
    question: 'To\'lov qanday amalga oshiriladi?',
    answer: 'Naqd pul (yetkazilganda), Click, Payme, Visa/Mastercard va bank o\'tkazmasi orqali to\'lov qabul qilamiz.',
  },
  {
    question: 'O\'rnatish xizmati bormi?',
    answer: 'Ha, professional o\'rnatish xizmatimiz mavjud. Narxi mahsulot va o\'rnatish murakkabligiga qarab belgilanadi. Murojaat qiling.',
  },
]

export function FaqSection() {
  return (
    <section className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4">
              Ko'p so'raladigan savollar
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              Eng ko'p beriladigan savollarga javob topmasangiz,
              biz bilan bog'laning
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Savolingizni yuboring
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion items={faqs} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
