import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleTheme, selectTheme } from '@/features/theme/themeSlice'
import { selectCartCount, openCart } from '@/features/cart/cartSlice'
import { selectWishlistItems } from '@/features/wishlist/wishlistSlice'
import { logout } from '@/firebase/auth'
import { clearAuth } from '@/features/auth/authSlice'
import toast from 'react-hot-toast'

const navLinks = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/shop', label: 'Do\'kon' },
  { to: '/categories', label: 'Kategoriyalar' },
  { to: '/about', label: 'Biz haqimizda' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Aloqa' },
]

export function Navbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useAppSelector(selectTheme)
  const cartCount = useAppSelector(selectCartCount)
  const wishlist = useAppSelector(selectWishlistItems)
  const user = useAppSelector((s) => s.auth.user)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = async () => {
    await logout()
    dispatch(clearAuth())
    toast.success('Tizimdan chiqildi')
    navigate('/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--navbar-bg)] backdrop-blur-xl shadow-lg border-b border-[var(--border-color)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <div>
              <span className="font-black text-xl text-[var(--text-primary)] tracking-tight">
                ATOYO
              </span>
              <p className="text-xs text-primary-500 -mt-0.5 hidden sm:block">
                Premium Santexnika
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-[var(--text-secondary)] hover:text-primary-600 hover:bg-primary-50/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="h-10 w-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-gray-100 transition-colors"
              title="Mavzu"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative h-10 w-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-gray-100 transition-colors"
            >
              ♥
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="relative h-10 w-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-gray-100 transition-colors"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center gap-2 h-10 px-3 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="h-7 w-7 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)] hidden md:block">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </button>
                <div className="absolute right-0 top-12 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      Admin panel
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Mening sahifam
                  </Link>
                  <Link
                    to="/dashboard/orders"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Buyurtmalarim
                  </Link>
                  <hr className="my-1 border-[var(--border-color)]" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex h-10 px-4 items-center gap-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                Kirish
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--navbar-bg)] backdrop-blur-xl border-t border-[var(--border-color)]"
          >
            <nav className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-[var(--text-secondary)] hover:bg-primary-50/50 hover:text-primary-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-[var(--border-color)] my-2" />
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Mening sahifam
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Chiqish
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold bg-primary-600 text-white text-center"
                >
                  Kirish / Ro'yxatdan o'tish
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
