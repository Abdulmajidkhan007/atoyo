import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-dark">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-900/20 blur-[160px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#1a7a8a 1px, transparent 1px), linear-gradient(90deg, #1a7a8a 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-primary-500/30 bg-primary-500/10 text-primary-300 mb-6">
                <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                Premium Santexnika Mahsulotlari
              </span>

              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Zamonaviy{' '}
                <span className="text-gradient block">Vannaxona</span>
                Yechimlari
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-dark-200 leading-relaxed max-w-lg"
            >
              Skandinaviya dizayni va zamonaviy texnologiyalar uyg'unligida
              yaratilgan premium santexnika mahsulotlari. Sifat va estetika
              birligida uyingizni yangi darajaga olib chiqing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/shop">
                <Button size="xl" variant="primary">
                  Mahsulotlarni ko'rish
                </Button>
              </Link>
              <Link to="/about">
                <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Biz haqimizda
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10"
            >
              {[
                { value: '500+', label: 'Mahsulot' },
                { value: '5000+', label: 'Mijoz' },
                { value: '5 yil', label: 'Tajriba' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-white">{s.value}</p>
                  <p className="text-sm text-dark-300 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="glass rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-3xl">
                    🚿
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Premium Dush</p>
                    <p className="text-dark-300 text-sm">Skandinaviya dizayni</p>
                  </div>
                </div>
                <div className="h-48 rounded-2xl bg-gradient-to-br from-primary-900/50 to-dark-800 flex items-center justify-center text-7xl">
                  🛁
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-300 text-xs">Narxi</p>
                    <p className="text-white font-black text-2xl">450,000 so'm</p>
                  </div>
                  <div className="h-10 px-6 rounded-xl bg-primary-600 text-white text-sm font-semibold flex items-center">
                    Xarid qilish
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 glass rounded-2xl px-4 py-3"
              >
                <p className="text-white font-bold text-sm">⭐ 4.9 reyting</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 glass rounded-2xl px-4 py-3"
              >
                <p className="text-white font-bold text-sm">✅ 2 yil kafolat</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-dark-300 text-xs">Pastga suring</p>
        <div className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-primary-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
