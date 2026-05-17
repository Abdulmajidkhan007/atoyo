import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Obuna bo\'ldingiz! Chegirmalar haqida xabar beramiz.')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="section-padding gradient-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="text-5xl mb-6">📬</div>
          <h2 className="text-4xl font-black text-white mb-4">
            Chegirmalardan xabardor bo'ling
          </h2>
          <p className="text-dark-200 mb-8 leading-relaxed">
            Yangi mahsulotlar, maxsus takliflar va chegirmalar haqida birinchi bo'lib
            xabardor bo'lish uchun obuna bo'ling
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email manzilingiz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dark-800 border-dark-600 text-white placeholder:text-dark-300 focus:border-primary-500"
            />
            <Button type="submit" loading={loading} variant="accent" size="md">
              Obuna
            </Button>
          </form>
          <p className="text-dark-400 text-xs mt-4">
            Spam yubormaymiz. Istalgan vaqt obunani bekor qilishingiz mumkin.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
