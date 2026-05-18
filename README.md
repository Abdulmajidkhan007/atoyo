# ATOYO — Premium Santexnika Platformasi

O'zbekistondagi premium santexnika mahsulotlari uchun to'liq e-commerce veb-sayt. Firebase backend, real autentifikatsiya, admin panel va Telegram integratsiyasi bilan jihozlangan.

## Tech Stack

| Texnologiya | Maqsad |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 6 | Build tool |
| TailwindCSS v4 | Styling |
| Redux Toolkit | Global state |
| React Router DOM v7 | Routing |
| Framer Motion | Animatsiyalar |
| Firebase (Auth, Firestore, Storage) | Backend |
| React Hook Form + Zod | Forma validatsiya |
| Swiper | Mahsulot gallery |
| @react-google-maps/api | Yetkazib berish xaritasi |
| Axios | HTTP client |

## Sahifalar

- Bosh sahifa, Do'kon, Mahsulot detail
- Savatcha, Sevimlilar, Buyurtma berish (Google Maps)
- Blog, Biz haqimizda, Aloqa, FAQ, Yetkazib berish, Kafolat
- Login, Ro'yxatdan o'tish
- Foydalanuvchi dashboard (profil, buyurtmalar)
- Admin panel (mahsulotlar, buyurtmalar, kategoriyalar, blog, xabarlar)

## Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build
```

## Muhit o'zgaruvchilari

`.env` faylini yarating:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_TELEGRAM_BOT_TOKEN=...
VITE_TELEGRAM_CHAT_ID=...

VITE_GOOGLE_MAPS_API_KEY=...
```

## Netlify Deploy

Build sozlamalari:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Branch:** `claude/add-claude-documentation-cp7B1`

Firebase Authentication'da quyidagilarni yoqing:
- Email/Password
- Google

Firebase Console → Authentication → Settings → Authorized domains ga Netlify domeningizni qo'shing.

## Autentifikatsiya

- Email/parol ro'yxatdan o'tish va kirish
- Google OAuth
- Role-based access: `user` va `admin`
- Admin huquqi: Firestore'da `users/{uid}.role = 'admin'`

## Buyurtma oqimi

```
Cart → Checkout (Google Maps) → Firestore'ga saqlash
→ Telegram guruhga xabar → Cart tozalanadi
```

## Telegram integratsiya

Yangi buyurtma, blog post va aloqa xabarlari avtomatik Telegram guruhga yuboriladi.

## Telegram integratsiya

| Funksiya | Tavsif |
|---|---|
| `sendOrderToTelegram` | Yangi buyurtma bildirishnomasi |
| `sendPostToTelegram` | Blog post (rasm bilan) |
| `sendContactToTelegram` | Aloqa xabari |
