export const APP_NAME = 'ATOYO'
export const APP_TAGLINE = "Premium Santexnika Mahsulotlari"

export const ORDER_STATUSES = {
  active: { label: 'Faol', color: 'bg-blue-500' },
  accepted: { label: 'Qabul qilindi', color: 'bg-yellow-500' },
  sent: { label: 'Yuborildi', color: 'bg-purple-500' },
  delivered: { label: 'Yetkazildi', color: 'bg-green-500' },
  archived: { label: 'Arxivlandi', color: 'bg-gray-500' },
  cancelled: { label: 'Bekor qilindi', color: 'bg-red-500' },
} as const

export const PAYMENT_METHODS = {
  cash: 'Naqd pul (yetkazilganda)',
  online: 'Online to\'lov',
} as const

export const PRODUCT_CATEGORIES = [
  { id: 'faucets', nameUz: 'Kranlar', slug: 'kranlar' },
  { id: 'sinks', nameUz: 'Rakovina va lavabolar', slug: 'lavabolar' },
  { id: 'showers', nameUz: 'Dush tizimlari', slug: 'dush' },
  { id: 'toilets', nameUz: 'Unitazlar', slug: 'unitazlar' },
  { id: 'accessories', nameUz: 'Aksessuarlar', slug: 'aksessuarlar' },
  { id: 'tools', nameUz: 'O\'rnatish vositalari', slug: 'vositalar' },
  { id: 'water-systems', nameUz: 'Suv tizimlari', slug: 'suv-tizimlari' },
  { id: 'sanitary', nameUz: 'Sanitariya mahsulotlari', slug: 'sanitariya' },
] as const

export const SORT_OPTIONS = [
  { value: 'default', label: 'Standart' },
  { value: 'price-asc', label: 'Narx: Arzondan qimmatga' },
  { value: 'price-desc', label: 'Narx: Qimmatdan arzonga' },
  { value: 'rating', label: 'Reyting bo\'yicha' },
  { value: 'newest', label: 'Yangi mahsulotlar' },
] as const

export const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
export const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

export const ITEMS_PER_PAGE = 12

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  CATEGORIES: '/categories',
  PRODUCT: '/product/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  DELIVERY: '/delivery',
  WARRANTY: '/warranty',
  BLOG: '/blog',
  BLOG_POST: '/blog/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  OTP: '/verify-otp',
  DASHBOARD: '/dashboard',
  ORDERS: '/dashboard/orders',
  PROFILE: '/dashboard/profile',
  ADMIN: '/admin',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_MESSAGES: '/admin/messages',
  ADMIN_SETTINGS: '/admin/settings',
  NOT_FOUND: '*',
} as const
