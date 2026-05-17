import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  COLLECTIONS,
  where,
  orderBy,
  limit,
} from '@/firebase/firestore'
import type { Product } from '@/types'

export const ProductsService = {
  async getAll(): Promise<Product[]> {
    return getDocuments<Product>(COLLECTIONS.PRODUCTS, [orderBy('createdAt', 'desc')])
  },

  async getById(id: string): Promise<Product | null> {
    return getDocument<Product>(COLLECTIONS.PRODUCTS, id)
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    return getDocuments<Product>(COLLECTIONS.PRODUCTS, [
      where('categoryId', '==', categoryId),
      orderBy('createdAt', 'desc'),
    ])
  },

  async getFeatured(): Promise<Product[]> {
    return getDocuments<Product>(COLLECTIONS.PRODUCTS, [
      where('isFeatured', '==', true),
      limit(8),
    ])
  },

  async getBestSellers(): Promise<Product[]> {
    return getDocuments<Product>(COLLECTIONS.PRODUCTS, [
      where('isBestSeller', '==', true),
      limit(8),
    ])
  },

  async getNewArrivals(): Promise<Product[]> {
    return getDocuments<Product>(COLLECTIONS.PRODUCTS, [
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limit(8),
    ])
  },

  async create(data: Omit<Product, 'id'>): Promise<string> {
    return createDocument(COLLECTIONS.PRODUCTS, data)
  },

  async update(id: string, data: Partial<Product>): Promise<void> {
    return updateDocument(COLLECTIONS.PRODUCTS, id, data)
  },

  async delete(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.PRODUCTS, id)
  },

  async decreaseStock(id: string, quantity: number): Promise<void> {
    const product = await getDocument<Product>(COLLECTIONS.PRODUCTS, id)
    if (product) {
      await updateDocument(COLLECTIONS.PRODUCTS, id, {
        stock: Math.max(0, product.stock - quantity),
      })
    }
  },
}
