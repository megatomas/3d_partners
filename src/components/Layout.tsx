// ==================== ЛЕЙАУТ: ШАПКА / ПОДВАЛ / МЕССЕНДЖЕРЫ ====================
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Leaf, Instagram } from 'lucide-react';
import { useStore } from '../store';
import { CrocusLogo, ContactStrip, Button } from './ui';

const NAV = [
  { to: '/', label: 'Главная', end: true },
  { to: '/catalog', label: 'Каталог' },
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'О питомнике' },
  { to: '/blog', label: 'Блог' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/partners', label: 'Партнёрам' },
  { to: '/contacts', label: 'Контакты' },
];

function Header() {
  const st = useStore((s) => s.settings);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
      isActive ? 'bg-forest-100 text-forest-800' : 'text-forest-700 hover:text-forest-900 hover:bg-forest-50'}`;

  return (
    <header className="sticky top-0 z-40">
      <ContactStrip />
      <div className={`bg-white/90 backdrop-blur border-b transition-shadow ${scrolled ? 'border-forest-200 shadow-md shadow-forest-900/5' : 'border-forest-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <CrocusLogo className="w-10 h-10" />
            <span className="leading-tight">
              <span className="block font-display text-xl font-bold text-forest-900">Крокус</span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-crocus-600 font-bold">садовый центр</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={linkCls}>{n.label}</NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${st.phone?.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 font-extrabold text-forest-900 hover:text-crocus-600 transition">
              <Phone size={16} className="text-forest-500" /> {st.phone}
            </a>
            <Button to="/contacts" size="md">Заказать звонок</Button>
          </div>

          <button className="lg:hidden p-2 text-forest-800" onClick={() => setOpen(!open)} aria-label="Меню">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Мобильное меню */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[560px] border-t border-forest-100' : 'max-h-0'}`}>
          <nav className="px-4 py-4 grid gap-1 bg-white">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}
                className={({ isActive }) => `px-4 py-3 rounded-xl font-semibold ${isActive ? 'bg-forest-100 text-forest-800' : 'text-forest-700 hover:bg-forest-50'}`}>
                {n.label}
              </NavLink>
            ))}
            <a href={`tel:${st.phone?.replace(/[^\d+]/g, '')}`} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-forest-600 text-white font-bold py-3">
              <Phone size={16} /> {st.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const st = useStore((s) => s.settings);
  const cats = useStore((s) => s.categories);
  return (
    <footer className="bg-forest-950 text-forest-100/80 mt-0">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <CrocusLogo className="w-10 h-10" />
            <span>
              <span className="block font-display text-xl font-bold text-white">Крокус</span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-crocus-300 font-bold">садовый центр · Краснодар</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed opacity-80">
            Питомник растений и ландшафтная студия. Около 2000 видов деревьев, кустарников и цветов — от саженца до сада «под ключ».
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Каталог</h4>
          <ul className="space-y-2 text-sm">
            {cats.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to={`/catalog?cat=${c.slug}`} className="hover:text-gold-400 transition">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Компания</h4>
          <ul className="space-y-2 text-sm">
            {[['/about', 'О питомнике'], ['/services', 'Услуги'], ['/partners', 'Партнёрам'], ['/blog', 'Блог и советы агрономов'], ['/reviews', 'Отзывы'], ['/faq', 'Вопросы и ответы'], ['/contacts', 'Контакты']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-gold-400 transition">{label}</Link></li>
            ))}
            <li><Link to="/privacy-policy" className="hover:text-gold-400 transition">Политика конфиденциальности</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Контакты</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Phone size={16} className="shrink-0 mt-0.5 text-crocus-300" />
              <a href={`tel:${st.phone?.replace(/[^\d+]/g, '')}`} className="font-bold text-white hover:text-gold-400">{st.phone}</a></li>
            <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-crocus-300" />
              <a href={st.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-gold-400">{st.address}</a></li>
            <li className="flex gap-2"><Clock size={16} className="shrink-0 mt-0.5 text-crocus-300" /> {st.workHours}</li>
            <li className="flex gap-2"><Instagram size={16} className="shrink-0 mt-0.5 text-crocus-300" /> Telegram: {st.telegram}</li>
          </ul>
          <div className="mt-5">
            <Button to="/contacts" variant="gold">Бесплатная консультация</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-forest-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-70">
          <span className="flex items-center gap-2"><Leaf size={14} className="text-forest-400" /> {st.footerText}</span>
          <span>Редизайн-концепция сайта crocus-krd.ru</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  const st = useStore((s) => s.settings);
  const wa = `https://wa.me/${st.whatsapp ?? ''}`;
  const tg = `https://t.me/${(st.telegram ?? '').replace('@', '')}`;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="pulse-ring w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.38 4.63zm8.4-18.34A11.82 11.82 0 0 0 .17 12.03c0 2.1.55 4.15 1.6 5.96L0 24l6.16-1.61a11.8 11.8 0 0 0 5.89 1.5h.01a11.82 11.82 0 0 0 8.4-20.44z"/></svg>
      </a>
      <a href={tg} target="_blank" rel="noreferrer" aria-label="Telegram"
        className="w-14 h-14 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M11.94 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.64 6.8-1.53 7.26c-.11.5-.41.62-.83.39l-2.3-1.7-1.11 1.07c-.12.12-.23.23-.46.23l.16-2.37 4.3-3.89c.19-.16-.04-.26-.29-.1L8.9 13.27l-2.3-.72c-.5-.16-.51-.5.11-.74l8.99-3.47c.42-.16.78.1.64.93z"/></svg>
      </a>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [loc.pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
