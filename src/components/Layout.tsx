import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { useStore } from '../store';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useStore();
  const location = useLocation();

  const navItems = [
    { label: 'Каталог', href: '/catalog' },
    { label: 'Услуги', href: '/services' },
    { label: 'Тарифы', href: '/pricing' },
    { label: 'Калькулятор', href: '/calculator' },
    { label: 'Как работаем', href: '/how-it-works' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Контакты', href: '/contacts' },
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">П</span>
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">{settings.siteName}</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => (
              <Link key={item.href} to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href) ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a href={`tel:${settings.phone}`} className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
              <Phone size={14} /> {settings.phone}
            </a>
            <Link to="/contacts" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Оставить заявку
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.href) ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t mt-3 space-y-2">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 px-3 py-2 text-gray-600">
                <Phone size={16} /> {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 px-3 py-2 text-gray-600">
                <Mail size={16} /> {settings.email}
              </a>
              <Link to="/contacts" onClick={() => setMobileOpen(false)}
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">П</span>
              </div>
              <span className="font-bold text-white">{settings.siteName}</span>
            </div>
            <p className="text-sm text-gray-400">{settings.headerText}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог товаров</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Услуги</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Тарифы</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition-colors">Калькулятор</Link></li>
              <li><Link to="/for-beginners" className="hover:text-white transition-colors">Для начинающих</Link></li>
              <li><Link to="/for-sellers" className="hover:text-white transition-colors">Для продавцов</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Как мы работаем</Link></li>
              <li><Link to="/custom-production" className="hover:text-white transition-colors">Производство на заказ</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Частые вопросы</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a></li>
              <li className="flex items-center gap-2"><Mail size={14} /> <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a></li>
              {settings.telegram && <li className="flex items-center gap-2">💬 <a href={`https://t.me/${settings.telegram.replace('@', '')}`} className="hover:text-white">Telegram</a></li>}
              {settings.whatsapp && <li className="flex items-center gap-2">📱 <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} className="hover:text-white">WhatsApp</a></li>}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>{settings.footerText}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-gray-300">Политика конфиденциальности</Link>
            <Link to="/personal-data-consent" className="hover:text-gray-300">Согласие на обработку данных</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
