import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ecommerce/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/SkeletonLoader'
import { Pagination } from '@/components/ui/Pagination'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ProductsService } from '@/services/products.service'
import type { Product } from '@/types'
import { ITEMS_PER_PAGE, SORT_OPTIONS } from '@/constants'

const CATEGORIES = [
  { id: '', label: 'Barchasi' },
  { id: 'faucets', label: 'Kranlar' },
  { id: 'sinks', label: 'Lavabolar' },
  { id: 'showers', label: 'Dush tizimlari' },
  { id: 'toilets', label: 'Unitazlar' },
  { id: 'accessories', label: 'Aksessuarlar' },
  { id: 'tools', label: 'Vositalar' },
  { id: 'water-systems', label: 'Suv tizimlari' },
  { id: 'sanitary', label: 'Sanitariya' },
]

const MOCK_PRODUCTS: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `mock-${i + 1}`,
  name: `Product ${i + 1}`,
  nameUz: `Mahsulot ${i + 1}`,
  description: 'Premium product',
  descriptionUz: 'Premium mahsulot',
  price: (i + 1) * 150000 + 100000,
  originalPrice: (i + 1) * 150000 + 200000,
  images: [`https://placehold.co/400x300/${['1a7a8a', '0f5869', '268b9b', '052d3d'][i % 4]}/white?text=Mahsulot+${i + 1}`],
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1].label,
  categoryId: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1].id,
  stock: Math.floor(Math.random() * 30) + 5,
  rating: 4 + Math.random() * 0.9,
  reviewCount: Math.floor(Math.random() * 200) + 10,
  tags: [],
  features: [],
  isNew: i < 4,
  isBestSeller: i >= 4 && i < 8,
  isFeatured: i >= 8 && i < 12,
}))

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('default')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await ProductsService.getAll()
        setProducts(data.length > 0 ? data : MOCK_PRODUCTS)
      } catch {
        setProducts(MOCK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.nameUz.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (category) {
      result = result.filter((p) => p.categoryId === category)
    }

    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin))
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax))
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew))
        break
    }

    return result
  }, [products, search, category, sortBy, priceMin, priceMax])

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
    const params = new URLSearchParams(searchParams)
    if (val) params.set('q', val)
    else params.delete('q')
    setSearchParams(params)
  }

  const handleCategory = (cat: string) => {
    setCategory(cat)
    setPage(1)
  }

  const resetFilters = () => {
    setSearch('')
    setCategory('')
    setSortBy('default')
    setPriceMin('')
    setPriceMax('')
    setPage(1)
    setSearchParams({})
  }

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-black text-[var(--text-primary)]">Do'kon</h1>
            <p className="text-[var(--text-secondary)] mt-1">
              {filtered.length} ta mahsulot topildi
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Filtrlarni yopish' : 'Filtrlar'}
            </Button>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 shrink-0 space-y-6 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Search */}
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-3">Qidirish</h3>
              <Input
                placeholder="Mahsulot nomi..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-3">Kategoriya</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      category === cat.id
                        ? 'bg-primary-600 text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-3">Narx (so'm)</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Dan"
                  type="number"
                  value={priceMin}
                  onChange={(e) => { setPriceMin(e.target.value); setPage(1) }}
                />
                <Input
                  placeholder="Gacha"
                  type="number"
                  value={priceMax}
                  onChange={(e) => { setPriceMax(e.target.value); setPage(1) }}
                />
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={resetFilters} fullWidth>
              Filtrlarni tozalash
            </Button>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">{filtered.length}</span> mahsulot
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-transparent text-[var(--text-primary)] outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Mahsulot topilmadi</h3>
                <p className="text-[var(--text-muted)]">Qidiruv yoki filtrlash shartlarini o'zgartiring</p>
                <Button variant="outline" onClick={resetFilters}>Filtrlarni tozalash</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  total={filtered.length}
                  perPage={ITEMS_PER_PAGE}
                  onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
