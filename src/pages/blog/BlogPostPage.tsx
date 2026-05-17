import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlogService } from '@/services/blog.service'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { BlogPost } from '@/types'

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    BlogService.getById(id).then(setPost).catch(()=>{}).finally(()=>setLoading(false))
  }, [id])

  if (loading) return <div className="pt-20 min-h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full"/></div>

  if (!post) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center"><p className="text-xl font-bold text-[var(--text-primary)] mb-4">Post topilmadi</p><Link to="/blog"><Button variant="outline">Blogga qaytish</Button></Link></div>
    </div>
  )

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-secondary)]">
      <div className="container py-12 max-w-3xl">
        <Link to="/blog" className="text-sm text-primary-600 hover:underline mb-6 block">← Blogga qaytish</Link>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {post.image && <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-6" />}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="primary">{post.type}</Badge>
            <span className="text-xs text-[var(--text-muted)]">{new Date(post.createdAt).toLocaleDateString('uz-UZ')}</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] mb-6">{post.title}</h1>
          <div className="prose text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{post.content}</div>
          {post.linkedProductId && (
            <div className="mt-8 p-5 rounded-2xl border border-primary-200 bg-primary-50">
              <p className="text-primary-800 font-semibold mb-3">Mahsulotni ko'rish</p>
              <Link to={`/product/${post.linkedProductId}`}>
                <Button size="sm">{post.ctaLabel || 'Mahsulotga o\'tish'}</Button>
              </Link>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  )
}
