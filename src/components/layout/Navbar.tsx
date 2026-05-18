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
  { to: '/', label: 'Bosh sahifa', icon: '🏠' },
  { to: '/shop', label: "Do'kon", icon: '🛍️' },
  { to: '/categories', label: 'Kategoriyalar', icon: '📦' },
  { to: '/about', label: 'Biz haqimizda', icon: '🏢' },
  { to: '/blog', label: 'Blog', icon: '📰' },
  { to: '/contact', label: 'Aloqa', icon: '📞' },
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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLogout = async () => {
    await logout()
    dispatch(clearAuth())
    toast.success('Tizimdan chiqildi')
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[var(--navbar-bg)] backdrop-blur-xl shadow-lg border-b border-[var(--border-color)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
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
                    `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
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
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="h-10 w-10 rounded-xl flex items-center justify-center text-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                title="Mavzu"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative h-10 w-10 rounded-xl flex items-center justify-center text-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                ♥
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold leading-none">
                    {wishlist.length > 9 ? '9+' : wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => { dispatch(openCart()); setMenuOpen(false) }}
                className="relative h-10 w-10 rounded-xl flex items-center justify-center text-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center font-bold leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Desktop Auth */}
              {user ? (
                <div className="relative group hidden sm:block">
                  <button className="flex items-center gap-2 h-10 px-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-bold">
                      {user.displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)] hidden md:block max-w-[80px] truncate">
                      {user.displayName?.split(' ')[0]}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] hidden md:block">▾</span>
                  </button>
                  <div className="absolute right-0 top-12 w-52 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 overflow-hidden">
                    <div className="px-4 py-2 mb-1 border-b border-[var(--border-color)]">
                      <p className="text-xs text-[var(--text-muted)]">Salom,</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user.displayName}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors">
                        <span>⚙️</span> Admin panel
                      </Link>
                    )}
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      <span>👤</span> Mening sahifam
                    </Link>
                    <Link to="/dashboard/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      <span>📋</span> Buyurtmalarim
                    </Link>
                    <hr className="my-1 border-[var(--border-color)]" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <span>🚪</span> Chiqish
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex h-10 px-5 items-center gap-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
                >
                  Kirish
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors ml-1"
                aria-label="Menyu"
              >
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="text-xl leading-none"
                >
                  {menuOpen ? '✕' : '☰'}
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[280px] bg-[var(--bg-card)] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <span className="text-white font-black text-sm">A</span>
                  </div>
                  <span className="font-black text-lg text-[var(--text-primary)]">ATOYO</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* User info (if logged in) */}
              {user && (
                <div className="px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                      {user.displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-semibold text-sm text-[var(--text-primary)] truncate">{user.displayName}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                      }`
                    }
                  >
                    <span className="text-base w-6 text-center">{link.icon}</span>
                    {link.label}
                  </NavLink>
                ))}

                <div className="border-t border-[var(--border-color)] my-2 pt-2">
                  {user ? (
                    <>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <span className="text-base w-6 text-center">⚙️</span>
                          Admin panel
                        </Link>
                      )}
                      <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <span className="text-base w-6 text-center">👤</span>
                        Mening sahifam
                      </Link>
                      <Link
                        to="/dashboard/orders"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <span className="text-base w-6 text-center">📋</span>
                        Buyurtmalarim
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <span className="text-base w-6 text-center">👤</span>
                      Dashboard
                    </Link>
                  )}
                </div>
              </nav>

              {/* Bottom actions */}
              <div className="px-4 py-4 border-t border-[var(--border-color)] space-y-2">
                {/* Theme toggle */}
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <span className="text-base w-6 text-center">{theme === 'dark' ? '☀️' : '🌙'}</span>
                  {theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
                </button>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <span className="text-base w-6 text-center">🚪</span>
                    Chiqish
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md"
                  >
                    Kirish / Ro'yxatdan o'tish
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
