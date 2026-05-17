import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProtectedRoute } from './ProtectedRoute'

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full" />
  </div>
)

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/home/HomePage'))
const ShopPage = lazy(() => import('@/pages/shop/ShopPage'))
const CategoriesPage = lazy(() => import('@/pages/categories/CategoriesPage'))
const ProductPage = lazy(() => import('@/pages/product/ProductPage'))
const CartPage = lazy(() => import('@/pages/cart/CartPage'))
const WishlistPage = lazy(() => import('@/pages/wishlist/WishlistPage'))
const CheckoutPage = lazy(() => import('@/pages/checkout/CheckoutPage'))
const AboutPage = lazy(() => import('@/pages/about/AboutPage'))
const ContactPage = lazy(() => import('@/pages/contact/ContactPage'))
const FaqPage = lazy(() => import('@/pages/faq/FaqPage'))
const DeliveryPage = lazy(() => import('@/pages/delivery/DeliveryPage'))
const WarrantyPage = lazy(() => import('@/pages/warranty/WarrantyPage'))
const BlogPage = lazy(() => import('@/pages/blog/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/blog/BlogPostPage'))
const LoginPage = lazy(() => import('@/pages/auth/login/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/register/RegisterPage'))
const OtpPage = lazy(() => import('@/pages/auth/otp/OtpPage'))
const UserDashboard = lazy(() => import('@/pages/dashboard/user/UserDashboard'))
const UserOrders = lazy(() => import('@/pages/dashboard/user/UserOrders'))
const UserProfile = lazy(() => import('@/pages/dashboard/user/UserProfile'))
const AdminDashboard = lazy(() => import('@/pages/dashboard/admin/AdminDashboard'))
const AdminOrders = lazy(() => import('@/pages/dashboard/admin/AdminOrders'))
const AdminProducts = lazy(() => import('@/pages/dashboard/admin/AdminProducts'))
const AdminCategories = lazy(() => import('@/pages/dashboard/admin/AdminCategories'))
const AdminBlog = lazy(() => import('@/pages/dashboard/admin/AdminBlog'))
const AdminMessages = lazy(() => import('@/pages/dashboard/admin/AdminMessages'))
const AdminSettings = lazy(() => import('@/pages/dashboard/admin/AdminSettings'))
const NotFoundPage = lazy(() => import('@/pages/notfound/NotFoundPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="warranty" element={<WarrantyPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-otp" element={<OtpPage />} />

          {/* Cart & Wishlist (public view, add-to-cart requires auth) */}
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />

          {/* Protected Client Routes */}
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
