import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BlogService } from '@/services/blog.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import type { BlogPost } from '@/types'
import toast from 'react-hot-toast'

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [saving, setSaving] = useState(false)
  const [sendToTelegram, setSendToTelegram] = useState(false)

  const { register, handleSubmit, reset } = useForm<Omit<BlogPost,'id'|'createdAt'>>()

  useEffect(() => { load() }, [])
  const load = async () => {
    setLoading(true)
    try { setPosts(await BlogService.getAll()) }
    catch { toast.error('Yuklanmadi') }
    finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); reset({ type:'blog' }); setSendToTelegram(false); setModalOpen(true) }
  const openEdit = (p: BlogPost) => { setEditing(p); reset(p); setModalOpen(true) }

  const onSubmit = async (data: Omit<BlogPost,'id'|'createdAt'>) => {
    setSaving(true)
    try {
      const payload = { ...data, createdAt: new Date().toISOString() }
      if (editing) { await BlogService.update(editing.id, payload); toast.success('Yangilandi') }
      else { await BlogService.create(payload, sendToTelegram); toast.success(sendToTelegram ? 'Post yaratildi va Telegramga yuborildi' : 'Post yaratildi') }
      setModalOpen(false); load()
    } catch { toast.error('Xatolik') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) return
    try { await BlogService.delete(id); setPosts(prev=>prev.filter(p=>p.id!==id)); toast.success('O\'chirildi') }
    catch { toast.error('Xatolik') }
  }

  const typeVariant: Record<string,'primary'|'accent'|'info'|'success'> = {
    blog:'primary', news:'info', announcement:'accent', product:'success'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[var(--text-primary)]">Blog postlari</h2>
        <Button onClick={openCreate} size="sm">+ Yangi post</Button>
      </div>
      <div className="space-y-3">
        {loading ? Array.from({length:4}).map((_,i)=>(<div key={i} className="animate-pulse bg-gray-200 h-20 rounded-2xl" />))
        : posts.map(post=>(
          <div key={post.id} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            {post.image && <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={typeVariant[post.type]||'gray'}>{post.type}</Badge>
                {post.publishedToTelegram && <Badge variant="success">✈ Telegram</Badge>}
              </div>
              <p className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">{post.title}</p>
              <p className="text-xs text-[var(--text-muted)]">{new Date(post.createdAt).toLocaleDateString('uz-UZ')}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={()=>openEdit(post)} className="text-xs text-primary-600 hover:underline">Tahrirlash</button>
              <button onClick={()=>handleDelete(post.id)} className="text-xs text-red-500 hover:underline">O'chirish</button>
            </div>
          </div>
        ))}
        {!loading && posts.length===0 && <div className="text-center py-8 text-[var(--text-muted)]">Postlar yo'q</div>}
      </div>
      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={editing?'Postni tahrirlash':'Yangi post'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Sarlavha" {...register('title',{required:true})} />
          <Input label="Rasm URL (ixtiyoriy)" {...register('image')} />
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Post turi</label>
            <select {...register('type')} className="w-full h-11 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm px-3 outline-none focus:border-primary-500">
              <option value="blog">Blog maqola</option>
              <option value="news">Yangilik</option>
              <option value="announcement">E'lon</option>
              <option value="product">Mahsulot haqida</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Kontent</label>
            <textarea rows={6} {...register('content',{required:true})} className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm p-3 outline-none focus:border-primary-500 resize-none" />
          </div>
          {!editing && (
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-color)] cursor-pointer hover:border-primary-500 transition-colors">
              <input type="checkbox" checked={sendToTelegram} onChange={e=>setSendToTelegram(e.target.checked)} />
              <div>
                <p className="font-semibold text-sm text-[var(--text-primary)]">Telegram kanalga yuborish</p>
                <p className="text-xs text-[var(--text-muted)]">Post saqlangandan so'ng Telegram kanalga ham yuboriladi</p>
              </div>
            </label>
          )}
          <Button type="submit" fullWidth loading={saving}>{editing?'Saqlash':'Yaratish'}</Button>
        </form>
      </Modal>
    </div>
  )
}
