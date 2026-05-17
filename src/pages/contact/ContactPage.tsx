import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ContactService } from '@/services/contact.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Ism majburiy'),
  phone: z.string().min(9, 'Telefon raqam majburiy'),
  email: z.string().email().optional().or(z.literal('')),
  subject: z.string().optional(),
  message: z.string().min(10, 'Xabar majburiy'),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await ContactService.send({ ...data, email: data.email || '' })
      toast.success('Xabaringiz yuborildi! Tez orada javob beramiz.')
      reset()
    } catch {
      toast.error('Xabar yuborishda xatolik. Qayta urinib ko\'ring.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-3">Biz bilan bog'laning</h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Savolingiz bormi? Biz doim yordam berishga tayor
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: '📍', title: 'Manzil', value: 'Toshkent, Chilonzor tumani, Bunyodkor ko\'chasi 1' },
              { icon: '📱', title: 'Telefon', value: '+998 90 123 45 67', href: 'tel:+998901234567' },
              { icon: '📧', title: 'Email', value: 'info@atoyo.uz', href: 'mailto:info@atoyo.uz' },
              { icon: '🕐', title: 'Ish vaqti', value: 'Du-Shan: 9:00 - 18:00' },
              { icon: '✈️', title: 'Telegram', value: '@atoyo_uz', href: 'https://t.me/atoyo_uz' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-primary-600 hover:underline text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-[var(--text-primary)] text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-8">
            <h2 className="font-bold text-xl text-[var(--text-primary)] mb-6">Xabar yuborish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Ism *" placeholder="Ism Familiya" error={errors.name?.message} {...register('name')} />
                <Input label="Telefon *" placeholder="+998 90 000 00 00" error={errors.phone?.message} {...register('phone')} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Email (ixtiyoriy)" type="email" placeholder="email@example.com" {...register('email')} />
                <Input label="Mavzu (ixtiyoriy)" placeholder="Xabar mavzusi" {...register('subject')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Xabar *</label>
                <textarea
                  rows={6}
                  placeholder="Xabaringizni yozing..."
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm p-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
                  {...register('message')}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" size="lg" loading={loading}>
                Xabar yuborish
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
