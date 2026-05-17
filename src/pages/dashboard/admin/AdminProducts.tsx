import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ProductsService } from '@/services/products.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

const schema = z.object({
  nameUz: z.string().min(2, 'Majburiy'),
  name: z.string().min(2, 'Majburiy'),
  descriptionUz: z.string().min(10, 'Majburiy'),
  price: z.string().min(1),
  originalPrice: z.string().optional(),
  categoryId: z.string().min(1, 'Majburiy'),
  category: z.string().min(1, 'Majburiy'),
  stock: z.string().min(1),
  rating: z.string().min(1),
  brand: z.string().optional(),
  material: z.string().optional(),
  weight: z.string().optional(),
  imagesRaw: z.string().optional(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => { loadProducts() }, [])

  const loadProducts = async () => {
    setLoading(true)
    try { setProducts(await ProductsService.getAll()) }
    catch { toast.error('Mahsulotlarni yuklashda xatolik') }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditing(null)
    reset({ stock: '0', rating: '4.5' } as unknown as FormData)
    setModalOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    reset({ ...p, imagesRaw: p.images.join('\n') } as unknown as FormData)
    setModalOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const images = (data.imagesRaw || '').split('\n').map((s) => s.trim()).filter(Boolean)
      const payload = {
        ...data,
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
        stock: Number(data.stock),
        rating: Number(data.rating),
        images: images.length > 0 ? images : ['https://placehold.co/400x300/1a7a8a/white?text=Mahsulot'],
        tags: [], features: [], description: data.name, reviewCount: editing?.reviewCount || 0,
      }
      if (editing) { await ProductsService.update(editing.id, payload); toast.success('Yangilandi') }
      else { await ProductsService.create(payload as Omit<Product, 'id'>); toast.success('Qo\'shildi') }
      setModalOpen(false); loadProducts()
    } catch { toast.error('Saqlashda xatolik') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) return
    try { await ProductsService.delete(id); setProducts((prev) => prev.filter((p) => p.id !== id)); toast.success('O\'chirildi') }
    catch { toast.error('O\'chirishda xatolik') }
  }

  const formatPrice = (p: number) => new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m'
  const filtered = search ? products.filter((p) => p.nameUz.toLowerCase().includes(search.toLowerCase())) : products

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-[var(--text-primary)]">Mahsulotlar</h2>
        <Button onClick={openCreate} size="sm">+ Yangi mahsulot</Button>
      </div>
      <Input placeholder="Mahsulot nomi bo'yicha qidirish..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
              <tr>
                {['Rasm', 'Nomi', 'Kategoriya', 'Narxi', 'Qoldi', 'Reyting', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {loading ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 7 }).map((__, j) => (
                  <td key={j} className="px-4 py-3"><div className="animate-pulse bg-gray-200 h-4 rounded" /></td>
                ))}</tr>
              )) : filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-4 py-3"><img src={p.images[0]} alt={p.nameUz} className="w-12 h-12 object-cover rounded-xl" /></td>
                  <td className="px-4 py-3"><p className="font-semibold text-[var(--text-primary)]">{p.nameUz}</p></td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{p.category}</td>
                  <td className="px-4 py-3 font-bold text-primary-600">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3"><span className={`font-semibold ${p.stock < 5 ? 'text-red-500' : 'text-green-500'}`}>{p.stock}</span></td>
                  <td className="px-4 py-3">⭐ {p.rating}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-primary-600 hover:underline text-xs font-semibold">Tahrirlash</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline text-xs font-semibold">O'chirish</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && <div className="p-8 text-center text-[var(--text-muted)]">Mahsulotlar yo'q</div>}
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nomi (O'zbek)" error={errors.nameUz?.message} {...register('nameUz')} />
            <Input label="Name (English)" error={errors.name?.message} {...register('name')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Tavsif</label>
            <textarea rows={3} {...register('descriptionUz')} className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm p-3 outline-none focus:border-primary-500 resize-none" />
            {errors.descriptionUz && <p className="text-xs text-red-500 mt-1">{errors.descriptionUz.message}</p>}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="Narxi (so'm)" type="number" error={errors.price?.message} {...register('price')} />
            <Input label="Eski narxi" type="number" {...register('originalPrice')} />
            <Input label="Qoldi (dona)" type="number" error={errors.stock?.message} {...register('stock')} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Kategoriya ID" error={errors.categoryId?.message} {...register('categoryId')} />
            <Input label="Kategoriya nomi" error={errors.category?.message} {...register('category')} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="Reyting (0-5)" type="number" step="0.1" {...register('rating')} />
            <Input label="Brend" {...register('brand')} />
            <Input label="Material" {...register('material')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Rasm URL lari (har biri yangi qatorda)</label>
            <textarea rows={3} {...register('imagesRaw')} placeholder="https://..." className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm p-3 outline-none focus:border-primary-500 resize-none" />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('isNew')} /> Yangi</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('isFeatured')} /> Tanlangan</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('isBestSeller')} /> Top sotuvchi</label>
          </div>
          <Button type="submit" fullWidth loading={saving}>{editing ? 'Saqlash' : 'Qo\'shish'}</Button>
        </form>
      </Modal>
    </div>
  )
}
