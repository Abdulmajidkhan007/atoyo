import { Link } from 'react-router-dom'

const links = {
  catalog: [
    { to: '/shop', label: 'Barcha mahsulotlar' },
    { to: '/categories', label: 'Kategoriyalar' },
    { to: '/shop?filter=new', label: 'Yangi kelganlar' },
    { to: '/shop?filter=bestseller', label: 'Eng ommaboplar' },
  ],
  company: [
    { to: '/about', label: 'Biz haqimizda' },
    { to: '/blog', label: 'Blog va yangiliklar' },
    { to: '/contact', label: 'Biz bilan bog\'laning' },
    { to: '/faq', label: 'Savollar va javoblar' },
  ],
  support: [
    { to: '/delivery', label: 'Yetkazib berish' },
    { to: '/warranty', label: 'Kafolat' },
    { to: '/faq', label: 'Ko\'p so\'raladigan savollar' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-dark-900 text-white mt-auto">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <div>
                <span className="font-black text-xl tracking-tight">ATOYO</span>
                <p className="text-xs text-primary-300 -mt-0.5">Premium Santexnika</p>
              </div>
            </div>
            <p className="text-sm text-dark-200 leading-relaxed">
              O'zbekistondagi eng sifatli santexnika mahsulotlari.
              Premium brendlar, ishonchli xizmat.
            </p>
            <div className="flex gap-3">
              {['t.me/atoyo_uz', 'instagram.com/atoyo_uz'].map((s) => (
                <a
                  key={s}
                  href={`https://${s}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-dark-700 hover:bg-primary-600 flex items-center justify-center text-sm transition-colors"
                >
                  {s.startsWith('t.me') ? '✈' : '📷'}
                </a>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white">Katalog</h4>
            <ul className="space-y-2.5">
              {links.catalog.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-dark-200 hover:text-primary-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white">Kompaniya</h4>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-dark-200 hover:text-primary-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white">Aloqa</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-dark-200">
                <span>📍</span>
                <span>Toshkent, O'zbekiston</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-dark-200">
                <span>📱</span>
                <a href="tel:+998901234567" className="hover:text-primary-300 transition-colors">
                  +998 90 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-dark-200">
                <span>📧</span>
                <a href="mailto:info@atoyo.uz" className="hover:text-primary-300 transition-colors">
                  info@atoyo.uz
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-dark-200">
                <span>🕐</span>
                <span>Du-Shan: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-700">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-dark-300">
            © {new Date().getFullYear()} ATOYO. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-4">
            <Link to="/faq" className="text-xs text-dark-300 hover:text-primary-300 transition-colors">
              Maxfiylik siyosati
            </Link>
            <Link to="/delivery" className="text-xs text-dark-300 hover:text-primary-300 transition-colors">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
