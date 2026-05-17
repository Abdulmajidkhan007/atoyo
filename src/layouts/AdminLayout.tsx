import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/firebase/auth'
import { clearAuth } from '@/features/auth/authSlice'
import toast from 'react-hot-toast'

const adminLinks = [
  { to: '/admin', label: 'Boshqaruv paneli', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Buyurtmalar', icon: '🛒' },
  { to: '/admin/products', label: 'Mahsulotlar', icon: '📦' },
  { to: '/admin/categories', label: 'Kategoriyalar', icon: '🏷️' },
  { to: '/admin/blog', label: 'Blog', icon: '📝' },
  { to: '/admin/messages', label: 'Xabarlar', icon: '💬' },
  { to: '/admin/settings', label: 'Sozlamalar', icon: '⚙️' },
]

export function AdminLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    dispatch(clearAuth())
    toast.success('Tizimdan chiqildi')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-dark-900 text-white
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-dark-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-black">A</span>
            </div>
            <div>
              <p className="font-black text-lg tracking-tight">ATOYO</p>
              <p className="text-xs text-primary-300 -mt-0.5">Admin panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-200 hover:bg-dark-700 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-dark-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-xl bg-primary-600 flex items-center justify-center text-sm font-bold">
              {user?.displayName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.displayName}</p>
              <p className="text-xs text-dark-300">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-dark-700 hover:text-red-300 transition-colors"
          >
            Chiqish
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between px-5 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            ☰
          </button>
          <h1 className="font-bold text-[var(--text-primary)]">Boshqaruv paneli</h1>
          <Link
            to="/"
            className="text-sm text-primary-600 hover:underline"
          >
            ← Saytga qaytish
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
