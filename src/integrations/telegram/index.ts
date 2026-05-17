import axios from 'axios'
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '@/constants'
import type { Order, BlogPost, ContactMessage } from '@/types'

const telegramApi = axios.create({
  baseURL: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`,
})

async function sendMessage(text: string, parseMode: 'HTML' | 'Markdown' = 'HTML') {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
  await telegramApi.post('/sendMessage', {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: parseMode,
  })
}

async function sendPhoto(photoUrl: string, caption: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
  await telegramApi.post('/sendPhoto', {
    chat_id: TELEGRAM_CHAT_ID,
    photo: photoUrl,
    caption,
    parse_mode: 'HTML',
  })
}

export async function sendOrderToTelegram(order: Order): Promise<void> {
  const itemsList = order.items
    .map((i) => `  • ${i.productName} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
    .join('\n')

  const text = `
🛒 <b>YANGI BUYURTMA #${order.id.slice(-6).toUpperCase()}</b>

👤 <b>Mijoz:</b> ${order.customerName}
📱 <b>Telefon:</b> ${order.customerPhone}
📧 <b>Email:</b> ${order.customerEmail}

📦 <b>Mahsulotlar:</b>
${itemsList}

💰 <b>Jami:</b> ${formatPrice(order.totalPrice)}
💳 <b>To'lov:</b> ${order.paymentMethod === 'cash' ? 'Naqd pul' : 'Online to\'lov'}
📍 <b>Manzil:</b> ${order.deliveryAddress}
${order.notes ? `📝 <b>Izoh:</b> ${order.notes}` : ''}
⏰ <b>Vaqt:</b> ${new Date(order.createdAt).toLocaleString('uz-UZ')}
  `.trim()

  await sendMessage(text)
}

export async function sendPostToTelegram(post: BlogPost): Promise<void> {
  const caption = `
📰 <b>${post.title}</b>

${post.content.slice(0, 800)}${post.content.length > 800 ? '...' : ''}
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
📱 <b>Telefon:</b> ${msg.phone}
${msg.email ? `📧 <b>Email:</b> ${msg.email}` : ''}
${msg.subject ? `📌 <b>Mavzu:</b> ${msg.subject}` : ''}

💬 <b>Xabar:</b>
${msg.message}
  `.trim()

  await sendMessage(text)
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' }).format(price)
}
