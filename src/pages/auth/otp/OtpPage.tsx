import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { registerWithEmail } from '@/firebase/auth'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function OtpPage() {
  const navigate = useNavigate()
  const otpEmail = useAppSelector((s) => s.auth.otpEmail)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [expired, setExpired] = useState(false)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!otpEmail) {
      navigate('/register')
      return
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval)
          setExpired(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [otpEmail, navigate])

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const newOtp = [...otp]
    newOtp[i] = val
    setOtp(newOtp)
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      toast.error('6 xonali kodni kiriting')
      return
    }
    if (expired) {
      toast.error('OTP kodi muddati o\'tdi. Qayta urinib ko\'ring')
      return
    }

    const pending = JSON.parse(sessionStorage.getItem('otp_pending') || '{}')
    if (!pending.code) {
      toast.error('Ro\'yxatdan o\'tish ma\'lumotlari topilmadi')
      navigate('/register')
      return
    }

    if (Date.now() > pending.expiresAt) {
      toast.error('OTP kodi muddati o\'tdi')
      setExpired(true)
      return
    }

    if (code !== pending.code) {
      toast.error('OTP kod noto\'g\'ri')
      return
    }

    setLoading(true)
    try {
      await registerWithEmail(pending.email, pending.password, pending.displayName)
      sessionStorage.removeItem('otp_pending')
      toast.success('Muvaffaqiyatli ro\'yxatdan o\'tildi!')
      navigate('/')
    } catch (err: unknown) {
      const error = err as { code?: string }
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Bu email allaqachon ro\'yxatdan o\'tgan')
      } else {
        toast.error('Xatolik yuz berdi')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = () => {
    const pending = JSON.parse(sessionStorage.getItem('otp_pending') || '{}')
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    const updated = { ...pending, code: newCode, expiresAt: Date.now() + 60000 }
    sessionStorage.setItem('otp_pending', JSON.stringify(updated))
    setOtp(['', '', '', '', '', ''])
    setTimeLeft(60)
    setExpired(false)
    toast.success(`Yangi OTP kod yuborildi (demo: ${newCode})`)
    console.info('Demo OTP kod:', newCode)
    refs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-color)] p-8 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] mb-2">
            Email tasdiqlash
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            <span className="font-medium text-[var(--text-primary)]">{otpEmail}</span>{' '}
            manziliga 6 xonali kod yuborildi
          </p>

          {/* OTP inputs */}
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((val, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
                  bg-[var(--bg-secondary)] text-[var(--text-primary)]
                  ${val ? 'border-primary-500 bg-primary-50' : 'border-[var(--border-color)]'}
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100`}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="mb-6">
            {expired ? (
              <p className="text-red-500 text-sm">Kod muddati tugadi</p>
            ) : (
              <p className="text-[var(--text-muted)] text-sm">
                Kod {timeLeft} soniyada bekor bo'ladi
              </p>
            )}
          </div>

          <Button fullWidth size="lg" onClick={handleVerify} loading={loading} disabled={expired}>
            Tasdiqlash
          </Button>

          {expired && (
            <button
              onClick={handleResend}
              className="mt-4 text-primary-600 text-sm font-semibold hover:underline"
            >
              Yangi kod yuborish
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
