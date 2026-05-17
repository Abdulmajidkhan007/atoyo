import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, Zoom } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useAppDispatch, useAppSelector } from '@/store'
import { addToCart, openCart } from '@/features/cart/cartSlice'
import { toggleWishlist, selectIsInWishlist } from '@/features/wishlist/wishlistSlice'
import { ProductsService } from '@/services/products.service'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RatingStars } from '@/components/ui/RatingStars'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

const MOCK: Product = {
  id: '1', name: 'Modern Faucet Pro', nameUz: 'Zamonaviy kran Pro',
  description: 'Premium faucet with chrome finish',
  descriptionUz: 'Chrome qoplamali premium kran. Skandinaviya dizayni, ekologik toza materiallar, 2 yil kafolat. Har qanday vannaxona dizayniga mos keladi.',
  price: 450000, originalPrice: 580000,
  images: [
    'https://placehold.co/600x500/1a7a8a/white?text=Kran+1',
    'https://placehold.co/600x500/0f5869/white?text=Kran+2',
    'https://placehold.co/600x500/268b9b/white?text=Kran+3',
  ],
  category: 'Kranlar', categoryId: 'faucets', stock: 25, rating: 4.8, reviewCount: 124,
  tags: ['premium', 'zamonaviy', 'chrome'],
  features: ['Chrome qoplama', 'Ekologik toza materiallar', '2 yil kafolat', 'Oson o\'rnatish', 'Suv tejamkor'],
  isNew: true, isFeatured: true, brand: 'GROHE', sku: 'GRH-001',
  weight: '1.2 kg', dimensions: '18 × 8 × 5 cm', material: 'Mis, Chrome', color: 'Chrome',
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const isInWishlist = useAppSelector(selectIsInWishlist(id || ''))
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'specs'>('description')
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await ProductsService.getById(id || '')
        setProduct(data || MOCK)
      } catch {
        setProduct(MOCK)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleAddToCart = () => {
    if (!user) { toast.error('Savatchaga qo\'shish uchun tizimga kiring'); return }
    if (!product) return
    dispatch(addToCart({ product, quantity }))
    dispatch(openCart())
    toast.success(`${product.nameUz} savatchaga qo'shildi`)
  }

  const handleWishlist = () => {
    if (!product) return
    dispatch(toggleWishlist(product))
    toast.success(isInWishlist ? 'Sevimlilardan olib tashlandi' : 'Sevimlilarga qo\'shildi')
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
        <div className="container py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-pulse bg-gray-200 rounded-3xl h-[500px]" />
            <div className="space-y-4">
              <div className="animate-pulse bg-gray-200 h-8 rounded-xl w-3/4" />
              <div className="animate-pulse bg-gray-200 h-6 rounded-xl w-1/2" />
              <div className="animate-pulse bg-gray-200 h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) return null

  const formatPrice = (p: number) => new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m'
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
      <div className="container py-8">
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
          <Link to="/" className="hover:text-primary-600">Bosh sahifa</Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-primary-600">Do'kon</Link>
          <span>›</span>
          <span className="text-[var(--text-primary)]">{product.nameUz}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Swiper
              modules={[Navigation, Thumbs, Zoom]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              zoom
              className="rounded-3xl overflow-hidden border border-[var(--border-color)]"
            >
              {product.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-zoom-container">
                    <img src={img} alt={`${product.nameUz} - ${i + 1}`} className="w-full h-[400px] object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {product.images.length > 1 && (
              <Swiper onSwiper={setThumbsSwiper} slidesPerView={4} spaceBetween={10} watchSlidesProgress modules={[Thumbs]}>
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} alt={`thumb-${i}`} className="w-full h-20 object-cover rounded-xl border-2 border-transparent cursor-pointer hover:border-primary-500 transition-colors" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isNew && <Badge variant="success">Yangi</Badge>}
                {product.isBestSeller && <Badge variant="accent">Top sotuvchi</Badge>}
                {discount > 0 && <Badge variant="error">-{discount}%</Badge>}
              </div>
              <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">{product.nameUz}</h1>
              <p className="text-[var(--text-muted)] text-sm">SKU: {product.sku || product.id}</p>
            </div>

            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} showCount count={product.reviewCount} />
              <span className="text-[var(--text-muted)] text-sm">·</span>
              <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} ta mavjud` : 'Tugagan'}
              </span>
            </div>

            <div className="flex items-end gap-4">
              <p className="text-4xl font-black text-primary-600">{formatPrice(product.price)}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-lg text-[var(--text-muted)] line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold text-sm text-[var(--text-primary)]">Miqdor:</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 rounded-xl border border-[var(--border-color)] flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors">−</button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock} className="h-10 w-10 rounded-xl border border-[var(--border-color)] flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors disabled:opacity-40">+</button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button fullWidth size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
                {product.stock === 0 ? 'Tugagan' : 'Savatchaga qo\'shish'}
              </Button>
              <button
                onClick={handleWishlist}
                className={`h-12 w-12 rounded-xl border-2 flex items-center justify-center text-xl transition-all ${isInWishlist ? 'border-red-500 bg-red-50 text-red-500' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-red-400 hover:text-red-400'}`}
              >
                ♥
              </button>
            </div>

            {(product.brand || product.material || product.weight) && (
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                {[['Brend', product.brand], ['Material', product.material], ['Og\'irligi', product.weight], ['O\'lchami', product.dimensions]].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}><p className="text-xs text-[var(--text-muted)]">{k}</p><p className="text-sm font-semibold text-[var(--text-primary)]">{v}</p></div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-16">
          <div className="flex gap-1 border-b border-[var(--border-color)] mb-8">
            {(['description', 'features', 'specs'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
                {tab === 'description' ? 'Tavsif' : tab === 'features' ? 'Xususiyatlar' : 'Texnik ma\'lumot'}
              </button>
            ))}
          </div>
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-3xl">{product.descriptionUz}</p>
            </motion.div>
          )}
          {activeTab === 'features' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ul className="space-y-3 max-w-xl">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <span className="text-green-500">✓</span>{f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {activeTab === 'specs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                {[['Material', product.material], ['Brend', product.brand], ['Og\'irlik', product.weight], ['O\'lcham', product.dimensions], ['Rang', product.color], ['SKU', product.sku || product.id]].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <span className="text-sm text-[var(--text-muted)]">{k}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
