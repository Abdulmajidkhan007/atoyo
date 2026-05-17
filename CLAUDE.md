# ATOYO — Premium Santexnika Platformasi

## Loyiha haqida

ATOYO — O'zbekistondagi premium santexnika mahsulotlari uchun to'liq e-commerce va korporativ veb-sayt. Uzbek tilidagi interfeys, Firebase backend, real autentifikatsiya va admin panel bilan jihozlangan.

## Tech Stack

| Texnologiya | Versiya | Maqsad |
|---|---|---|
| React + TypeScript | 19 + 5 | UI framework |
| Vite | 6 | Build tool |
| TailwindCSS | v4 | Styling |
| Redux Toolkit | latest | Global state |
| React Router DOM | 7 | Routing |
| Framer Motion | latest | Animatsiyalar |
| Firebase | latest | Backend (Auth, Firestore, Storage) |
| React Hook Form + Zod | latest | Form validation |
| Swiper | latest | Mahsulot slider |
| @react-google-maps/api | latest | Xarita va geolokatsiya |
| react-hot-toast | latest | Notifications |
| Axios | latest | HTTP client |

## Papka tuzilishi

```
src/
├── app/                    # App-level konfiguratsiya
├── routes/                 # Route guards (ProtectedRoute)
│   └── index.tsx           # Barcha route definitsiyalari (lazy loaded)
├── layouts/                # Layout komponentlari
│   ├── MainLayout.tsx      # Asosiy layout (Navbar + Footer + CartDrawer)
│   ├── AdminLayout.tsx     # Admin panel layout (sidebar)
│   └── DashboardLayout.tsx # Foydalanuvchi dashboard layout
├── pages/                  # Sahifalar (lazy loaded)
│   ├── home/               # Bosh sahifa + sections/
│   ├── shop/               # Do'kon sahifasi (filter + pagination)
│   ├── product/            # Mahsulot detail (Swiper gallery)
│   ├── cart/               # Savatcha
│   ├── wishlist/           # Sevimlilar
│   ├── checkout/           # Buyurtma berish (Google Maps)
│   ├── about/              # Biz haqimizda
│   ├── contact/            # Aloqa (Telegram integration)
│   ├── faq/                # FAQ accordion
│   ├── delivery/           # Yetkazib berish
│   ├── warranty/           # Kafolat
│   ├── blog/               # Blog va yangiliklar
│   ├── auth/               # Login / Register / OTP
│   ├── dashboard/user/     # Foydalanuvchi dashboard
│   ├── dashboard/admin/    # Admin dashboard
│   └── notfound/           # 404 sahifa
├── features/               # Redux slices
│   ├── auth/authSlice.ts
│   ├── cart/cartSlice.ts
│   ├── wishlist/wishlistSlice.ts
│   ├── theme/themeSlice.ts
│   ├── notifications/notificationSlice.ts
│   └── products/productsSlice.ts
├── components/
│   ├── ui/                 # Button, Input, Badge, Modal, Accordion, Pagination, RatingStars, SkeletonLoader
│   ├── layout/             # Navbar, Footer
│   └── ecommerce/          # ProductCard, CartDrawer
├── services/               # Firebase API abstraction
│   ├── products.service.ts
│   ├── orders.service.ts
│   ├── categories.service.ts
│   ├── blog.service.ts
│   └── contact.service.ts
├── firebase/               # Firebase config va utility
│   ├── config.ts           # Firebase initialization
│   ├── auth.ts             # Auth functions
│   └── firestore.ts        # CRUD helpers + COLLECTIONS
├── integrations/
│   ├── telegram/index.ts   # Telegram bot API (buyurtmalar, postlar, xabarlar)
│   └── maps/LocationPicker.tsx  # Google Maps location picker
├── store/index.ts          # Redux store + typed hooks
├── providers/              # AuthProvider, ThemeProvider
├── types/index.ts          # Barcha TypeScript tiplar
└── constants/index.ts      # Route nomlari, tartiblar, konstantalar
```

## Muhit o'zgaruvchilari

`.env` fayl yarating (`.env.example` dan nusxa oling):

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_TELEGRAM_BOT_TOKEN=...     # Telegram bot token
VITE_TELEGRAM_CHAT_ID=...       # Telegram guruh/kanal ID

VITE_GOOGLE_MAPS_API_KEY=...    # Google Maps API key
```

## Dastur ishga tushirish

```bash
npm install
npm run dev       # development server (http://localhost:5173)
npm run build     # production build
npm run preview   # production preview
```

## Autentifikatsiya arxitekturasi

### Firebase Auth + Redux

1. `AuthProvider` app start bo'lganda `onAuthStateChanged` listens
2. Firebase user topilsa → Firestore'dan user profili olish
3. Redux `auth` slice'ga `setUser()` chaqiriladi
4. `ProtectedRoute` `initialized` va `user` holatini tekshiradi

### Role-based access

- `user` — standart foydalanuvchi (cart, orders, profile)
- `admin` — admin panel (`/admin/*` routelari)

Firestore'da `users/{uid}.role` maydoni orqali boshqariladi.

### OTP verifikatsiya oqimi

1. Foydalanuvchi register formni to'ldiradi
2. Ma'lumotlar `sessionStorage`'da saqlanadi + 6 raqamli OTP generatsiya qilinadi
3. `/verify-otp` sahifasiga o'tiladi (demo: OTP konsolga chiqariladi)
4. Haqiqiy loyihada — Firebase Cloud Functions orqali email yuboriladi
5. OTP to'g'ri bo'lsa → `registerWithEmail()` chaqiriladi

## Firebase Firestore kolleksiyalari

```
products        → mahsulotlar
categories      → kategoriyalar
orders          → buyurtmalar (userId, items, status, deliveryLocation)
users           → foydalanuvchilar (uid, role, phone, address)
reviews         → mahsulot sharhlari
blog_posts      → blog maqolalari (publishedToTelegram flag)
contact_messages → aloqa xabarlari (sentToTelegram flag)
banners         → reklama bannerlari
site_settings   → sayt sozlamalari
```

## Buyurtma oqimi

```
Foydalanuvchi cart'ga qo'shadi
  → Checkout sahifasiga o'tadi
  → Forma to'ldiradi (ism, telefon, to'lov usuli)
  → Google Maps'dan manzil tanlaydi
  → "Buyurtma berish" bosiladi
  → OrdersService.create() → Firestore'ga saqlaydi
  → ProductsService.decreaseStock() → stock kamayadi
  → sendOrderToTelegram() → Telegram guruhga xabar yuboriladi
  → Cart tozalanadi
  → Success sahifa ko'rsatiladi
```

## Buyurtma statuslari

| Status | Ma'no |
|---|---|
| active | Yangi tushdi |
| accepted | Admin qabul qildi |
| sent | Yetkazuvchiga berildi |
| delivered | Yetkazildi |
| archived | Arxivlandi |
| cancelled | Bekor qilindi |

## Tema tizimi

CSS o'zgaruvchilari `data-theme` atributi orqali o'zgartiriladi:

```css
[data-theme='dark'] { --bg-primary: #061522; ... }
:root { --bg-primary: #ffffff; ... }
```

`ThemeProvider` va `themeSlice` boshqaradi. `localStorage`'da saqlanadi.

## Telegram integratsiyasi

`src/integrations/telegram/index.ts` da uchta funksiya:

- `sendOrderToTelegram(order)` — yangi buyurtmani yuboradi
- `sendPostToTelegram(post)` — blog postini yuboradi (rasm bilan)
- `sendContactToTelegram(message)` — aloqa xabarini yuboradi

`VITE_TELEGRAM_BOT_TOKEN` va `VITE_TELEGRAM_CHAT_ID` env o'zgaruvchilari kerak.

## Google Maps integratsiyasi

`src/integrations/maps/LocationPicker.tsx` komponentida:

- Xaritada bosib joylashuv tanlash
- Geolokatsiya ("Joriy joylashuvimni ishlatish")
- Reverse geocoding (koordinata → manzil)
- Checkout sahifasida ishlatiladi

`VITE_GOOGLE_MAPS_API_KEY` kerak.

## Mock ma'lumotlar

Firebase bo'sh bo'lsa, komponentlar avtomatik mock ma'lumotlarga o'tadi:

- `ShopPage` → `MOCK_PRODUCTS` array (16 ta mahsulot)
- `FeaturedProducts` → `MOCK_PRODUCTS` (4 ta)
- `BlogPage` → `MOCK_POSTS` (3 ta)

Bu development rejimida Firebase ulangan bo'lmasdan ham sayt ishlashini ta'minlaydi.

## Admin panel qo'llanmasi

### Mahsulot qo'shish
`/admin/products` → "+ Yangi mahsulot" → formni to'ldiring → Saqlash

### Buyurtmani boshqarish
`/admin/orders` → Buyurtmani bosing → Status o'zgartiring

### Blog post yaratish
`/admin/blog` → "+ Yangi post" → "Telegram kanalga yuborish" checkboxni belgilang

### Admin foydalanuvchi yaratish
Firestore'da `users/{uid}.role = 'admin'` qiling.

## Kengaytirish ko'rsatmalari

### Yangi sahifa qo'shish
1. `src/pages/` da yangi papka yarating
2. Komponentni `src/routes/index.tsx` ga lazy import qiling
3. Route qo'shing

### Yangi Firebase kolleksiya
1. `src/firebase/firestore.ts` da `COLLECTIONS` ga qo'shing
2. `src/types/index.ts` da tip qo'shing
3. `src/services/` da yangi service yarating

### Yangi Redux slice
1. `src/features/` da slice yarating
2. `src/store/index.ts` da reducer qo'shing

## Kod konvensiyalari

- TypeScript strict mode (to'liq tiplanish)
- Barcha komponentlar `default export`
- Service funksiyalari async/await
- Uzbek tili: `nameUz`, `descriptionUz` maydonlari
- `formatPrice()` — `Intl.NumberFormat('uz-UZ')` ishlatadi
- Barcha xatolar `toast.error()` orqali ko'rsatiladi
- `loading` state har bir async operatsiyada boshqariladi
