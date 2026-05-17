import { useEffect, useState } from 'react'
import { ContactService } from '@/services/contact.service'
import { Badge } from '@/components/ui/Badge'
import type { ContactMessage } from '@/types'
import toast from 'react-hot-toast'

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(()=>{load()},[])
  const load = async () => {
    setLoading(true)
    try { setMessages(await ContactService.getAll()) }
    catch { toast.error('Yuklanmadi') }
    finally { setLoading(false) }
  }

  const markRead = async (msg: ContactMessage) => {
    setSelected(msg)
    if (!msg.read) {
      try {
        await ContactService.markRead(msg.id)
        setMessages(prev=>prev.map(m=>m.id===msg.id?{...m,read:true}:m))
      } catch {}
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[var(--text-primary)]">Xabarlar</h2>
      <div className="grid lg:grid-cols-2 gap-6 min-h-96">
        <div className="space-y-3 overflow-y-auto max-h-[600px]">
          {loading ? Array.from({length:5}).map((_,i)=>(<div key={i} className="animate-pulse bg-gray-200 h-20 rounded-2xl" />))
          : messages.map(msg=>(
            <button key={msg.id} onClick={()=>markRead(msg)} className={`w-full text-left p-4 rounded-2xl border transition-all ${
              selected?.id===msg.id ? 'border-primary-500 bg-primary-50' :
              !msg.read ? 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-primary-300' :
              'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-primary-300'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm text-[var(--text-primary)]">{msg.name}</p>
                {!msg.read && <Badge variant="error">Yangi</Badge>}
                {msg.sentToTelegram && <Badge variant="success">Telegram</Badge>}
              </div>
              <p className="text-sm text-primary-600">{msg.phone}</p>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">{msg.message}</p>
              <p className="text-xs text-[var(--text-muted)] mt-2">{new Date(msg.createdAt).toLocaleString('uz-UZ')}</p>
            </button>
          ))}
          {!loading && messages.length===0 && <div className="text-center py-8 text-[var(--text-muted)]">Xabarlar yo'q</div>}
        </div>
        {selected ? (
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6 space-y-4">
            <h3 className="font-bold text-lg text-[var(--text-primary)]">{selected.name}</h3>
            <div className="space-y-2">
              <div><p className="text-xs text-[var(--text-muted)]">Telefon</p><a href={`tel:${selected.phone}`} className="text-primary-600 font-semibold">{selected.phone}</a></div>
              {selected.email && <div><p className="text-xs text-[var(--text-muted)]">Email</p><p className="font-semibold text-[var(--text-primary)]">{selected.email}</p></div>}
              {selected.subject && <div><p className="text-xs text-[var(--text-muted)]">Mavzu</p><p className="font-semibold text-[var(--text-primary)]">{selected.subject}</p></div>}
              <div><p className="text-xs text-[var(--text-muted)]">Vaqt</p><p className="text-sm text-[var(--text-primary)]">{new Date(selected.createdAt).toLocaleString('uz-UZ')}</p></div>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">{selected.message}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 rounded-2xl border border-dashed border-[var(--border-color)] text-[var(--text-muted)]">
            Xabarni ko'rish uchun tanlang
          </div>
        )}
      </div>
    </div>
  )
}
