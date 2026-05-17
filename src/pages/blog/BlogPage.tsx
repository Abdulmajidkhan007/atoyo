import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlogService } from '@/services/blog.service'
import { Badge } from '@/components/ui/Badge'
import type { BlogPost } from '@/types'

const MOCK_POSTS: BlogPost[] = [
  { id:'1', title:'2024-yil vannaxona dizayn trendlari', content:'Zamonaviy vannaxona dizaynida minimal estetika...', image:'https://placehold.co/600x400/1a7a8a/white?text=Blog+1', type:'blog', createdAt:new Date().toISOString(), publishedToTelegram:false },
  { id:'2', title:'Kran tanlashda nimalarga e\'tibor berish kerak?', content:'Kran tanlashda quyidagi omillarni...', image:'https://placehold.co/600x400/0f5869/white?text=Blog+2', type:'news', createdAt:new Date().toISOString(), publishedToTelegram:true },
  { id:'3', title:'Yangi mahsulotlar keldi!', content:'GROHE va Hansgrohe brendlaridan yangi kolleksiya...', image:'https://placehold.co/600x400/268b9b/white?text=Blog+3', type:'announcement', createdAt:new Date().toISOString(), publishedToTelegram:true },
]

const typeVariant: Record<string, 'primary'|'info'|'accent'|'success'> = {
  blog:'primary', news:'info', announcement:'accent', product:'success'
}
const typeLabel: Record<string, string> = {
  blog:'Blog', news:'Yangilik', announcement:'E\'lon', product:'Mahsulot'
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    BlogService.getAll().then(data=>{
      setPosts(data.length>0?data:MOCK_POSTS)
    }).catch(()=>setPosts(MOCK_POSTS)).finally(()=>setLoading(false))
  },[])

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-3">Blog va yangiliklar</h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Santexnika, dizayn va yangi mahsulotlar haqida foydali ma'lumotlar
          </p>
        </motion.div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-[var(--border-color)]">
                <div className="bg-gray-200 h-48" />
                <div className="p-5 space-y-3">
                  <div className="bg-gray-200 h-4 rounded w-3/4" />
                  <div className="bg-gray-200 h-3 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={`/blog/${post.id}`} className="group block rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-48 gradient-primary flex items-center justify-center text-5xl">📰</div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={typeVariant[post.type] || 'gray'}>{typeLabel[post.type]}</Badge>
                      {post.publishedToTelegram && <Badge variant="success">Telegram</Badge>}
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{post.content}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {new Date(post.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
