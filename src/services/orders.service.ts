import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  COLLECTIONS,
  where,
  orderBy,
} from '@/firebase/firestore'
import type { Order } from '@/types'
import { sendOrderToTelegram } from '@/integrations/telegram'

export const OrdersService = {
  async getAll(): Promise<Order[]> {
    return getDocuments<Order>(COLLECTIONS.ORDERS, [orderBy('createdAt', 'desc')])
  },

  async getByUser(userId: string): Promise<Order[]> {
    return getDocuments<Order>(COLLECTIONS.ORDERS, [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    ])
  },

  async getById(id: string): Promise<Order | null> {
    return getDocument<Order>(COLLECTIONS.ORDERS, id)
  },

  async create(order: Omit<Order, 'id'>): Promise<string> {
    const id = await createDocument(COLLECTIONS.ORDERS, order)
    try {
      await sendOrderToTelegram({ ...order, id })
    } catch {
      // Telegram xatosi buyurtmani bloklamaydi
    }
    return id
  },

  async updateStatus(id: string, status: Order['status']): Promise<void> {
    return updateDocument(COLLECTIONS.ORDERS, id, { status })
  },

  async update(id: string, data: Partial<Order>): Promise<void> {
    return updateDocument(COLLECTIONS.ORDERS, id, data)
  },
}
