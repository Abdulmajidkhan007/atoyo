import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/SkeletonLoader'
import { Button } from '@/components/ui/Button'
import { ProductsService } from '@/services/products.service'
import type { Product } from '@/types'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'Modern Faucet Pro', nameUz: 'Zamonaviy kran Pro',
    description: 'Premium faucet', descriptionUz: 'Premium sifatli zamonaviy kran',
    price: 450000, originalPrice: 580000, images: ['https://placehold.co/400x300/1a7a8a/white?text=Kran'],
    category: 'Kranlar', categoryId: 'faucets', stock: 25, rating: 4.8, reviewCount: 124,
    tags: ['premium', 'zamonaviy'], features: ['Chrome qoplama', 'Ekologik toza'], isNew: true, isFeatured: true,
  },
  {
    id: '2', name: 'Shower System Elite', nameUz: 'Elite dush tizimi',
    description: 'Rain shower system', descriptionUz: 'Yomg\'irli dush tizimi',
    price: 1200000, images: ['https://placehold.co/400x300/0f5869/white?text=Dush'],
    category: 'Dush tizimlari', categoryId: 'showers', stock: 12, rating: 4.9, reviewCount: 89,
    tags: ['yomg\'ir'], features: ['LED yorug\'lik', 'Termostat'], isBestSeller: true, isFeatured: true,
  },
  {
    id: '3', name: 'Ceramic Sink Classic', nameUz: 'Klassik keramik lavabo',
    description: 'Ceramic sink', descriptionUz: 'Keramik lavabo klassik dizayn',
    price: 320000, images: ['https://placehold.co/400x300/268b9b/white?text=Lavabo'],
    category: 'Lavabolar', categoryId: 'sinks', stock: 30, rating: 4.7, reviewCount: 201,
    tags: ['keramik', 'klassik'], features: ['Sanitariya keramika'], isNew: false, isFeatured: true,
  },
  {
    id: '4', name: 'Smart Toilet Pro', nameUz: 'Aqlli unitaz Pro',
    description: 'Smart toilet', descriptionUz: 'Zamonaviy aqlli unitaz',
    price: 2800000, images: ['https://placehold.co/400x300/052d3d/white?text=Unitaz'],
    category: 'Unitazlar', categoryId: 'toilets', stock: 8, rating: 5.0, reviewCount: 45,
    tags: ['smart', 'premium'], features: ['Sensor boshqaruv', 'Isitish', 'Bidé'],
    isFeatured: true, isBestSeller: true,
  },
]

interface FeaturedProductsProps {
  title: string
  subtitle?: string
  type?: 'featured' | 'bestseller' | 'new'
}

export function FeaturedProducts({ title, subtitle, type = 'featured' }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        let data: Product[] = []
        if (type === 'featured') data = await ProductsService.getFeatured()
        else if (type === 'bestseller') data = await ProductsService.getBestSellers()
        else data = await ProductsService.getNewArrivals()

        setProducts(data.length > 0 ? data : MOCK_PRODUCTS)
      } catch {
        setProducts(MOCK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [type])

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">{title}</h2>
            {subtitle && (
              <p className="text-[var(--text-secondary)] mt-2">{subtitle}</p>
            )}
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm">
              Barchasini ko'rish →
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
