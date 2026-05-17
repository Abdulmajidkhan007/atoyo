export interface Product {
  id: string
  name: string
  nameUz: string
  description: string
  descriptionUz: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  categoryId: string
  stock: number
  rating: number
  reviewCount: number
  tags: string[]
  features: string[]
  isNew?: boolean
  isFeatured?: boolean
  isBestSeller?: boolean
  brand?: string
  sku?: string
  weight?: string
  dimensions?: string
  material?: string
  color?: string
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  nameUz: string
  description?: string
  image: string
  slug: string
  productCount?: number
  order?: number
}

export interface User {
  uid: string
  email: string
  displayName: string
  role: 'user' | 'admin'
  phone?: string
  address?: string
  photoURL?: string
  emailVerified: boolean
  createdAt?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  userId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: OrderItem[]
  totalPrice: number
  deliveryAddress: string
  deliveryLocation?: { lat: number; lng: number }
  paymentMethod: 'cash' | 'online'
  paymentStatus: 'pending' | 'paid' | 'failed'
  status: 'active' | 'accepted' | 'sent' | 'delivered' | 'archived' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt?: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  image?: string
  type: 'news' | 'announcement' | 'blog' | 'product'
  linkedProductId?: string
  ctaLabel?: string
  publishedToTelegram?: boolean
  createdAt: string
  updatedAt?: string
}

export interface ContactMessage {
  id: string
  name: string
  phone: string
  email?: string
  subject?: string
  message: string
  sentToTelegram?: boolean
  read?: boolean
  createdAt: string
}

export interface SiteSettings {
  heroTitle: string
  heroSubtitle: string
  heroCTA: string
  heroImage?: string
  announcementBanner?: string
  bannerActive?: boolean
}

export type ThemeMode = 'light' | 'dark'

export interface OTPData {
  email: string
  code: string
  expiresAt: number
  displayName: string
  password: string
}
