import axios from 'axios'
import type { Order, BlogPost, ContactMessage } from '@/types'

const BOT_TOKEN = '8765574307:AAGEz0YwkVO50pO7xrqFvuzds_wXOW0KCPA'
const CHAT_ID = '-1003699602407'

const telegramApi = axios.create({
  baseURL: `https://api.telegram.org/bot${BOT_TOKEN}`,
})

async function sendMessage(text: string) {
  if (!BOT_TOKEN || !CHAT_ID) return
  try {
    await telegramApi.post('/sendMessage', {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
    })
  } catch (err) {
    console.error('Telegram xato:', err)
  }
}

async function sendPhoto(photoUrl: string, caption: string) {
  if (!BOT_TOKEN || !CHAT_ID) return
  try {
    await telegramApi.post('/sendPhoto', {
      chat_id: CHAT_ID,
      photo: photoUrl,
      caption,
      parse_mode: 'HTML',
    })
  } catch {
    await sendMessage(caption)
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

export async function sendOrderToTelegram(order: Order): Promise<void> {
  const itemsList = order.items
    .map((i) => `  • ${i.productName} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
    .join('\n')

  const text = `
🛒 <b>YANGI BUYURTMA #${order.id.slice(-6).toUpperCase()}</b>

👤 <b>Mijoz:</b> ${order.customerName}
📱 <b>Telefon:</b> <a href="tel:${order.customerPhone}">${order.customerPhone}</a>
📧 <b>Email:</b> ${order.customerEmail || '—'}

📦 <b>Mahsulotlar:</b>
${itemsList}

💰 <b>Jami:</b> ${formatPrice(order.totalPrice)}
💳 <b>To'lov:</b> ${order.paymentMethod === 'cash' ? 'Naqd pul (yetkazilganda)' : 'Online to\'lov'}
📍 <b>Manzil:</b> ${order.deliveryAddress}
${order.notes ? `📝 <b>Izoh:</b> ${order.notes}` : ''}
⏰ <b>Vaqt:</b> ${new Date(order.createdAt).toLocaleString('uz-UZ')}
  `.trim()

  await sendMessage(text)
}

export async function sendPostToTelegram(post: BlogPost): Promise<void> {
  const caption = `
📰 <b>${post.title}</b>

${post.content.slice(0, 900)}${post.content.length > 900 ? '...' : ''}
  `.trim()

  if (post.image) {
    await sendPhoto(post.image, caption)
  } else {
    await sendMessage(caption)
  }
}

export async function sendContactToTelegram(msg: ContactMessage): Promise<void> {
  const text = `
📬 <b>YANGI XABAR</b>

👤 <b>Ism:</b> ${msg.name}
📱 <b>Telefon:</b> <a href="tel:${msg.phone}">${msg.phone}</a>
${msg.email ? `📧 <b>Email:</b> ${msg.email}` : ''}
${msg.subject ? `📌 <b>Mavzu:</b> ${msg.subject}` : ''}

💬 <b>Xabar:</b>
${msg.message}

⏰ <b>Vaqt:</b> ${new Date(msg.createdAt).toLocaleString('uz-UZ')}
  `.trim()

  await sendMessage(text)
}
