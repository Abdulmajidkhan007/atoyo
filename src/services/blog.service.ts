import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  COLLECTIONS,
  orderBy,
} from '@/firebase/firestore'
import type { BlogPost } from '@/types'
import { sendPostToTelegram } from '@/integrations/telegram'

export const BlogService = {
  async getAll(): Promise<BlogPost[]> {
    return getDocuments<BlogPost>(COLLECTIONS.BLOG_POSTS, [orderBy('createdAt', 'desc')])
  },

  async getById(id: string): Promise<BlogPost | null> {
    return getDocument<BlogPost>(COLLECTIONS.BLOG_POSTS, id)
  },

  async create(data: Omit<BlogPost, 'id'>, publishToTelegram = false): Promise<string> {
    const id = await createDocument(COLLECTIONS.BLOG_POSTS, data)
    if (publishToTelegram) {
      try {
        await sendPostToTelegram({ ...data, id })
        await updateDocument(COLLECTIONS.BLOG_POSTS, id, { publishedToTelegram: true })
      } catch {
        // Telegram yuborishda xato bo'lsa ham davom etadi
      }
    }
    return id
  },

  async update(id: string, data: Partial<BlogPost>): Promise<void> {
    return updateDocument(COLLECTIONS.BLOG_POSTS, id, data)
  },

  async delete(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.BLOG_POSTS, id)
  },
}
