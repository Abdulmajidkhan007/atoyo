import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-md"
      >
        <div className="text-9xl font-black text-gradient">404</div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">
          Sahifa topilmadi
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Siz qidirgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/"><Button size="lg">Bosh sahifaga qaytish</Button></Link>
          <Link to="/shop"><Button size="lg" variant="outline">Do'konga o'tish</Button></Link>
        </div>
      </motion.div>
    </div>
  )
}
