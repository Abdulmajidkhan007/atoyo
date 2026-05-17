import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectCartItems, selectCartTotal, clearCart } from '@/features/cart/cartSlice'
import { OrdersService } from '@/services/orders.service'
import { ProductsService } from '@/services/products.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LocationPicker } from '@/integrations/maps/LocationPicker'
import toast from 'react-hot-toast'

const schema = z.object({
  customerName: z.string().min(2, 'Ism majburiy'),
  customerPhone: z.string().min(9, 'Telefon raqam majburiy'),
  customerEmail: z.string().email('Email noto\'g\'ri').optional().or(z.literal('')),
  paymentMethod: z.enum(['cash', 'online']),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Location {
  lat: number
  lng: number
  address?: string
}

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)
  const [step, setStep] = useState<'form' | 'map' | 'success'>('form')
  const [orderId, setOrderId] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: user?.displayName || '',
      customerEmail: user?.email || '',
      paymentMethod: 'cash',
    },
  })

  const paymentMethod = watch('paymentMethod')
  const formatPrice = (p: number) => new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m'

  const onSubmit = async (data: FormData) => {
    if (!location) {
      toast.error('Yetkazish manzilini xaritadan tanlang')
      setStep('map')
      return
    }
    if (items.length === 0) {
      toast.error('Savatcha bo\'sh')
      return
    }

    setLoading(true)
    try {
      const orderItems = items.map((i) => ({
        productId: i.product.id,
        productName: i.product.nameUz,
        productImage: i.product.images[0] || '',
        price: i.product.price,
        quantity: i.quantity,
      }))

      const id = await OrdersService.create({
        userId: user?.uid || '',
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || user?.email || '',
        items: orderItems,
        totalPrice: total,
        deliveryAddress: location.address || `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`,
        deliveryLocation: { lat: location.lat, lng: location.lng },
        paymentMethod: data.paymentMethod,
        paymentStatus: 'pending',
        status: 'active',
        notes: data.notes,
        createdAt: new Date().toISOString(),
      })

      // Stock decrease
      await Promise.all(
        items.map((i) => ProductsService.decreaseStock(i.product.id, i.quantity))
      )

      dispatch(clearCart())
      setOrderId(id)
      setStep('success')
    } catch {
      toast.error('Buyurtma berishda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-10 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] mb-3">
            Buyurtma qabul qilindi!
          </h2>
          <p className="text-[var(--text-secondary)] mb-2">
            Buyurtma raqami: <span className="font-bold text-primary-600">#{orderId.slice(-6).toUpperCase()}</span>
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Tez orada operatorimiz siz bilan bog'lanadi.
            Buyurtma holatini shaxsiy kabinetingizdan kuzating.
          </p>
          <div className="space-y-3">
            <Button fullWidth onClick={() => navigate('/dashboard/orders')}>
              Buyurtmalarni ko'rish
            </Button>
            <Button fullWidth variant="outline" onClick={() => navigate('/shop')}>
              Xarid qilishni davom ettirish
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-8">
        <h1 className="text-3xl font-black text-[var(--text-primary)] mb-8">Buyurtma berish</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6">
              <h2 className="font-bold text-lg text-[var(--text-primary)] mb-5">
                Mijoz ma'lumotlari
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="To'liq ism *"
                    placeholder="Ism Familiya"
                    error={errors.customerName?.message}
                    {...register('customerName')}
                  />
                  <Input
                    label="Telefon raqam *"
                    placeholder="+998 90 000 00 00"
                    error={errors.customerPhone?.message}
                    {...register('customerPhone')}
                  />
                </div>
                <Input
                  label="Email (ixtiyoriy)"
                  type="email"
                  placeholder="email@example.com"
                  {...register('customerEmail')}
                />

                {/* Payment */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    To'lov usuli *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { val: 'cash', label: 'Naqd pul', desc: 'Yetkazilganda to\'lanadi', icon: '💵' },
                      { val: 'online', label: 'Online to\'lov', desc: 'Karta orqali', icon: '💳' },
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === opt.val
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-[var(--border-color)] hover:border-primary-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={opt.val}
                          {...register('paymentMethod')}
                          className="sr-only"
                        />
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-[var(--text-primary)]">{opt.label}</p>
                          <p className="text-xs text-[var(--text-muted)]">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                    Izoh (ixtiyoriy)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder="Qo'shimcha ma'lumot..."
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm p-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6">
              <h2 className="font-bold text-lg text-[var(--text-primary)] mb-2">
                Yetkazish manzili *
              </h2>
              {location && (
                <div className="mb-3 p-3 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    ✅ Manzil tanlandi
                  </p>
                  {location.address && (
                    <p className="text-xs text-green-600 mt-1">{location.address}</p>
                  )}
                </div>
              )}
              <LocationPicker value={location || undefined} onChange={setLocation} />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 sticky top-24">
              <h2 className="font-bold text-lg text-[var(--text-primary)] mb-5">
                Buyurtma
              </h2>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.nameUz}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2">
                        {item.product.nameUz}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{item.quantity} × {formatPrice(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Mahsulotlar ({items.length})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Yetkazib berish</span>
                  <span className="text-green-500">Bepul</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-[var(--border-color)] pt-3">
                  <span>Jami</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                fullWidth
                size="lg"
                className="mt-5"
                loading={loading}
                disabled={items.length === 0}
              >
                Buyurtma berish
              </Button>

              {!location && (
                <p className="text-xs text-amber-600 mt-3 text-center">
                  ⚠️ Xaritadan manzil tanlang
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
