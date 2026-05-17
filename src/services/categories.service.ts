import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  COLLECTIONS,
  orderBy,
} from '@/firebase/firestore'
import type { Category } from '@/types'

export const CategoriesService = {
  async getAll(): Promise<Category[]> {
    return getDocuments<Category>(COLLECTIONS.CATEGORIES, [orderBy('order', 'asc')])
  },

  async create(data: Omit<Category, 'id'>): Promise<string> {
    return createDocument(COLLECTIONS.CATEGORIES, data)
  },

  async update(id: string, data: Partial<Category>): Promise<void> {
    return updateDocument(COLLECTIONS.CATEGORIES, id, data)
  },

  async delete(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.CATEGORIES, id)
  },
}
