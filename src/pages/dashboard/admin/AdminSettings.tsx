import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

interface SettingsForm {
  heroTitle: string
  heroSubtitle: string
  heroCTA: string
  telegramBotToken: string
  telegramChatId: string
  googleMapsKey: string
}

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit } = useForm<SettingsForm>({
    defaultValues: {
      heroTitle: 'Zamonaviy Vannaxona Yechimlari',
      heroSubtitle: 'Premium santexnika mahsulotlari',
      heroCTA: 'Mahsulotlarni ko\'rish',
    }
  })

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true)
    await new Promise(r=>setTimeout(r,800))
    console.log('Settings:', data)
    toast.success('Sozlamalar saqlandi')
    setSaving(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-black text-[var(--text-primary)]">Sozlamalar</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 space-y-4">
          <h3 className="font-bold text-[var(--text-primary)]">Hero bo'lim</h3>
          <Input label="Sarlavha" {...register('heroTitle')} />
          <Input label="Tavsif" {...register('heroSubtitle')} />
          <Input label="CTA tugma matni" {...register('heroCTA')} />
        </div>
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 space-y-4">
          <h3 className="font-bold text-[var(--text-primary)]">Telegram integratsiyasi</h3>
          <Input label="Bot Token" type="password" {...register('telegramBotToken')} placeholder="VITE_TELEGRAM_BOT_TOKEN env o'zgaruvchisidan foydalaning" />
          <Input label="Chat ID" {...register('telegramChatId')} placeholder="VITE_TELEGRAM_CHAT_ID env o'zgaruvchisidan foydalaning" />
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-700">⚠️ Xavfsizlik uchun bu ma'lumotlarni .env faylida saqlang, bu yerda ko'rsatilganlar faqat demo.</p>
          </div>
        </div>
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 space-y-4">
          <h3 className="font-bold text-[var(--text-primary)]">Google Maps</h3>
          <Input label="API Kalit" type="password" {...register('googleMapsKey')} placeholder="VITE_GOOGLE_MAPS_API_KEY env o'zgaruvchisidan foydalaning" />
        </div>
        <Button type="submit" loading={saving} size="lg">Sozlamalarni saqlash</Button>
      </form>
    </div>
  )
}
