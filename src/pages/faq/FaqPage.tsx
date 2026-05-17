import { motion } from 'framer-motion'
import { Accordion } from '@/components/ui/Accordion'

const faqs = [
  { question: 'Mahsulotlar qayerdan yetkazib beriladi?', answer: 'Barcha mahsulotlarimiz Toshkentdagi omborimizdan yetkazib beriladi. Toshkent bo\'ylab 1 ish kunida, viloyatlarga 2-3 ish kunida yetkazamiz.' },
  { question: 'Qaytarish imkoniyati bormi?', answer: 'Ha, 14 kun ichida ishlatilmagan holda qaytarish mumkin. Pul 3-5 ish kuni ichida qaytariladi.' },
  { question: 'Kafolat muddati qancha?', answer: 'Barcha mahsulotlarimizga 2 yillik rasmiy kafolat. Zavoddan nosozlik bo\'lsa bepul ta\'mir yoki almashtirish.' },
  { question: 'Qaysi to\'lov usullari qabul qilinadi?', answer: 'Naqd pul, Click, Payme, Visa/Mastercard va bank o\'tkazmasi qabul qilinadi.' },
  { question: 'O\'rnatish xizmati bormi?', answer: 'Ha, professional o\'rnatish xizmatimiz mavjud. Murojaat qilib narx olishingiz mumkin.' },
  { question: 'Buyurtma qancha vaqtda yetib keladi?', answer: 'Toshkent bo\'ylab 24 soat, viloyatlarga 2-3 ish kuni. Zudlik tartibida (express) ham mavjud.' },
  { question: 'Optom xarid imkoniyati bormi?', answer: 'Ha, qurilish kompaniyalari va ulgurji xaridorlar uchun alohida narxlar va shartlar mavjud. Bog\'laning.' },
  { question: 'Mahsulot sifati haqida qanday kafolat berasiz?', answer: 'Barcha mahsulotlar xalqaro sertifikatga ega. Qabul qilishda tekshirishingiz mumkin.' },
]

export default function FaqPage() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-3">Ko'p so'raladigan savollar</h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Eng ko'p beriladigan savollarga javoblarni toping
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </div>
    </div>
  )
}
