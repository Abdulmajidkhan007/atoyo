import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { loginWithEmail, loginWithGoogle } from '@/firebase/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email("To'g'ri email kiriting"),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/'
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await loginWithEmail(data.email, data.password)
      toast.success('Xush kelibsiz!')
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const error = err as { code?: string }
      if (error.code === 'auth/invalid-credential') {
        toast.error('Email yoki parol noto\'g\'ri')
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
      toast.success('Google orqali kirildi!')
      navigate(from, { replace: true })
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-color)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
              A
            </div>
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Tizimga kirish
            </h1>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              ATOYO hisobingizga kiring
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-gray-100 transition-colors font-medium text-[var(--text-primary)] text-sm mb-6 disabled:opacity-60"
          >
            {googleLoading ? (
              <span className="animate-spin">⟳</span>
            ) : (
              <span className="text-xl">G</span>
            )}
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

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Kirish
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
