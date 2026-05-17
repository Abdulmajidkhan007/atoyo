import { Outlet, NavLink, Link } from 'react-router-dom'

const dashboardLinks = [
  { to: '/dashboard', label: 'Asosiy', icon: '🏠', end: true },
  { to: '/dashboard/orders', label: 'Buyurtmalarim', icon: '🛒' },
  { to: '/dashboard/profile', label: 'Profil', icon: '👤' },
]

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] pt-20">
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-4 space-y-1">
              {dashboardLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600'
                    }`
                  }
                >
                  <span>{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-[var(--border-color)] my-2" />
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <span>←</span>
                Saytga qaytish
              </Link>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
