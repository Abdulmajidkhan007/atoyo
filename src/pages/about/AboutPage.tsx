import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

const team = [
  { name: 'Asilbek Toshmatov', role: 'Asoschisi va Bosh direktor', icon: '👨‍💼' },
  { name: 'Nodira Yusupova', role: 'Marketing bo\'limi rahbari', icon: '👩‍💼' },
  { name: 'Jasur Karimov', role: 'Texnik mutaxassis', icon: '👨‍🔧' },
  { name: 'Malika Rahimova', role: 'Mijozlar xizmati', icon: '👩‍💻' },
]

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="gradient-dark py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary-300 text-sm font-semibold uppercase tracking-widest mb-4">Biz haqimizda</p>
            <h1 className="text-5xl font-black text-white mb-6">ATOYO tarixi</h1>
            <p className="text-dark-200 max-w-2xl mx-auto text-lg leading-relaxed">
              2019-yildan buyon O'zbekistonda premium santexnika mahsulotlarini yetkazib beramiz.
              Bizning maqsadimiz — har bir uy egasiga sifatli va chiroyli vannaxona yaratishga yordam berish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">Missiyamiz</p>
              <h2 className="text-4xl font-black text-[var(--text-primary)] mb-6">
                Har bir uy egasiga premium sifat
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>ATOYO 2019-yilda tashkil etilgan va bugungi kunda O'zbekistondagi eng ishonchli santexnika mahsulotlari ta'minotchisiga aylangan.</p>
                <p>Biz Skandinaviya, Yevropa va Osiyoning yetakchi brendlaridan mahsulotlarni to'g'ridan-to'g'ri import qilib, mijozlarimizga eng qulay narxlarda taklif etamiz.</p>
                <p>Bizning jamoamiz 50 dan ortiq xodimdan iborat bo'lib, har biri o'z sohasining mutaxassisi hisoblanadi.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[
                { value: '5+', label: 'Yil tajriba', icon: '⏳' },
                { value: '500+', label: 'Mahsulot', icon: '📦' },
                { value: '5000+', label: 'Mijoz', icon: '😊' },
                { value: '50+', label: 'Brend', icon: '🤝' },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-center">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-3xl font-black text-primary-600">{s.value}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[var(--text-primary)] mb-3">Bizning jamoa</h2>
            <p className="text-[var(--text-secondary)]">Professional va fidokor jamoamiz bilan tanishing</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl mx-auto mb-4">{member.icon}</div>
                <h3 className="font-bold text-[var(--text-primary)]">{member.name}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary">
        <div className="container text-center">
          <h2 className="text-4xl font-black text-white mb-4">Biz bilan hamkorlik qiling</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">Do'stlaringizga bizni tavsiya qiling yoki hamkorlik bo'yicha murojaat qiling</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact"><Button size="lg" variant="secondary">Bog'lanish</Button></Link>
            <Link to="/shop"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Do'konga o'tish</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
