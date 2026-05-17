import { createDocument, getDocuments, updateDocument, COLLECTIONS, orderBy } from '@/firebase/firestore'
import type { ContactMessage } from '@/types'
import { sendContactToTelegram } from '@/integrations/telegram'

export const ContactService = {
  async send(data: Omit<ContactMessage, 'id' | 'createdAt' | 'sentToTelegram' | 'read'>): Promise<string> {
    const id = await createDocument(COLLECTIONS.CONTACT_MESSAGES, {
      ...data,
      read: false,
      sentToTelegram: false,
    })
    try {
      await sendContactToTelegram({ ...data, id, createdAt: new Date().toISOString() })
      await updateDocument(COLLECTIONS.CONTACT_MESSAGES, id, { sentToTelegram: true })
    } catch {
      // Telegram xatosi xabarni bloklamaydi
    }
    return id
  },

  async getAll(): Promise<ContactMessage[]> {
    return getDocuments<ContactMessage>(COLLECTIONS.CONTACT_MESSAGES, [
      orderBy('createdAt', 'desc'),
    ])
  },

  async markRead(id: string): Promise<void> {
    return updateDocument(COLLECTIONS.CONTACT_MESSAGES, id, { read: true })
  },
}
