import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { registerWithEmail, loginWithGoogle } from '@/firebase/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

const schema = z.object({
  displayName: z.string().min(2, 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak'),
  email: z.string().email("To'g'ri email kiriting"),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Parollar mos kelmadi',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await registerWithEmail(data.email, data.password, data.displayName)
      toast.success('Muvaffaqiyatli ro\'yxatdan o\'tildi!')
      navigate('/')
    } catch (err: unknown) {
      const error = err as { code?: string }
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Bu email allaqachon ro\'yxatdan o\'tgan')
      } else if (error.code === 'auth/weak-password') {
        toast.error('Parol juda oddiy, kuchliroq parol kiriting')
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Email manzil noto\'g\'ri')
      } else {
        toast.error('Xatolik yuz berdi. Qayta urinib ko\'ring')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
      toast.success('Muvaffaqiyatli ro\'yxatdan o\'tildi!')
      navigate('/')
    } catch (err: unknown) {
      const error = err as { code?: string }
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Oyna yopildi. Qayta urinib ko\'ring')
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup bloklandi. Brauzer sozlamalarini tekshiring')
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error('Domen ruxsat etilmagan. Firebase Console\'da domenni qo\'shing')
      } else {
        toast.error('Google orqali kirishda xatolik yuz berdi')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4 pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-color)] p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
              A
            </div>
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Ro'yxatdan o'tish
            </h1>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              ATOYO hisobi yarating
            </p>
          </div>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-gray-100 transition-colors font-medium text-[var(--text-primary)] text-sm mb-6 disabled:opacity-60"
          >
            {googleLoading ? <span className="animate-spin">⟳</span> : <span className="text-xl">G</span>}
            Google orqali kirish
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-color)]" />
            </div>
            <div className="relative flex justify-center text-xs text-[var(--text-muted)] bg-[var(--bg-card)] px-3">
              yoki email orqali
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="To'liq ism"
              placeholder="Ism Familiya"
              error={errors.displayName?.message}
              {...register('displayName')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="email@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Parol"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Parolni tasdiqlang"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Ro'yxatdan o'tish
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
