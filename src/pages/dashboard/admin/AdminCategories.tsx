import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CategoriesService } from '@/services/categories.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import type { Category } from '@/types'
import toast from 'react-hot-toast'

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, reset } = useForm<Omit<Category, 'id'>>()

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    try { setCategories(await CategoriesService.getAll()) }
    catch { toast.error('Yuklanmadi') }
    finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); reset({ order: categories.length + 1 }); setModalOpen(true) }
  const openEdit = (c: Category) => { setEditing(c); reset(c); setModalOpen(true) }

  const onSubmit = async (data: Omit<Category, 'id'>) => {
    setSaving(true)
    try {
      if (editing) { await CategoriesService.update(editing.id, data); toast.success('Yangilandi') }
      else { await CategoriesService.create(data); toast.success('Qo\'shildi') }
      setModalOpen(false); load()
    } catch { toast.error('Xatolik') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) return
    try { await CategoriesService.delete(id); setCategories(prev => prev.filter(c => c.id !== id)); toast.success('O\'chirildi') }
    catch { toast.error('Xatolik') }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[var(--text-primary)]">Kategoriyalar</h2>
        <Button onClick={openCreate} size="sm">+ Yangi</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array.from({length:6}).map((_,i)=>(
          <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-2xl" />
        )) : categories.map(cat=>(
          <div key={cat.id} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            <img src={cat.image||'https://placehold.co/60/1a7a8a/white?text=K'} alt={cat.nameUz} className="w-14 h-14 object-cover rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-[var(--text-primary)] truncate">{cat.nameUz}</p>
              <p className="text-xs text-[var(--text-muted)]">{cat.slug}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={()=>openEdit(cat)} className="text-xs text-primary-600 hover:underline">Tahrirlash</button>
              <button onClick={()=>handleDelete(cat.id)} className="text-xs text-red-500 hover:underline">O'chirish</button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={editing?'Tahrirlash':'Yangi kategoriya'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nomi (O'zbek)" {...register('nameUz', {required:true})} />
          <Input label="Nomi (EN)" {...register('name', {required:true})} />
          <Input label="Slug" {...register('slug', {required:true})} />
          <Input label="Rasm URL" {...register('image')} />
          <Input label="Tartib raqami" type="number" {...register('order')} />
          <Button type="submit" fullWidth loading={saving}>{editing?'Saqlash':'Qo\'shish'}</Button>
        </form>
      </Modal>
    </div>
  )
}
