// ==================== UI-ПРИМИТИВЫ «КРОКУС» ====================
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, ChevronDown, Star, Send } from 'lucide-react';
import { useStore } from '../store';
import { v4 as uuid } from 'uuid';

export const fmtPrice = (p?: number) =>
  p === undefined ? 'по запросу' : p.toLocaleString('ru-RU') + ' ₽';

// Логотип — цветок крокус
export function CrocusLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g>
        <path d="M24 8c3 5 3 11 0 16-3-5-3-11 0-16z" fill="#9e52bd" />
        <path d="M12.5 14c4.5 3 7.5 8.5 8 14.5-5-2.5-8-8-8-14.5z" fill="#b97ad3" />
        <path d="M35.5 14c0 6.5-3 12-8 14.5.5-6 3.5-11.5 8-14.5z" fill="#b97ad3" />
        <path d="M24 26c0 6-2.5 11-2.5 14h5c0-3-2.5-8-2.5-14z" fill="#437e51" />
        <path d="M24 33c3.5-1.5 7-.5 8.5 2.5-3.5 1.5-7 .5-8.5-2.5z" fill="#649c6f" />
        <path d="M24 30c-3.5-1.5-7-.5-8.5 2.5 3.5 1.5 7 .5 8.5-2.5z" fill="#649c6f" />
      </g>
    </svg>
  );
}

// Появление секции при скролле
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ kicker, title, subtitle, light = false }: { kicker?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
      {kicker && (
        <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-3 ${light ? 'text-crocus-300' : 'text-crocus-600'}`}>
          <span className="w-8 h-px bg-current opacity-60" /> {kicker} <span className="w-8 h-px bg-current opacity-60" />
        </div>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-semibold leading-tight ${light ? 'text-white' : 'text-forest-900'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base md:text-lg ${light ? 'text-forest-100/80' : 'text-forest-700/80'}`}>{subtitle}</p>}
    </div>
  );
}

export function Button({ to, href, children, variant = 'primary', size = 'md', className = '', onClick, type }: {
  to?: string; href?: string; children: React.ReactNode; variant?: 'primary' | 'outline' | 'ghost' | 'gold';
  size?: 'md' | 'lg'; className?: string; onClick?: () => void; type?: 'submit' | 'button';
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 active:scale-[0.98] ${
    size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'}`;
  const styles = {
    primary: 'bg-forest-600 text-white hover:bg-forest-700 shadow-lg shadow-forest-600/25 hover:shadow-forest-700/30',
    outline: 'border-2 border-forest-600 text-forest-700 hover:bg-forest-600 hover:text-white',
    ghost: 'text-forest-700 hover:bg-forest-100',
    gold: 'bg-gold-400 text-forest-950 hover:bg-gold-500 shadow-lg shadow-gold-400/30',
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noreferrer" onClick={onClick}>{children}</a>;
  return <button type={type ?? 'button'} className={cls} onClick={onClick}>{children}</button>;
}

export function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-gold-400">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

// Форма заявки (лид)
export function LeadForm({ compact = false, dark = false, source = 'site' }: { compact?: boolean; dark?: boolean; source?: string }) {
  const addLead = useStore((s) => s.addLead);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) return;
    addLead({
      id: uuid(), createdAt: new Date().toISOString(), name: name.trim(), phone: phone.trim(),
      status: 'new', comment: comment.trim() || `Заявка с сайта (${source})`, notes: [], utmSource: source,
    });
    setSent(true);
  };

  if (sent)
    return (
      <div className={`rounded-3xl p-8 text-center ${dark ? 'bg-forest-800/60 border border-forest-600' : 'bg-forest-50 border border-forest-200'}`}>
        <div className="w-14 h-14 mx-auto rounded-full bg-forest-500 text-white flex items-center justify-center text-2xl mb-4">✓</div>
        <h3 className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-forest-900'}`}>Спасибо! Заявка отправлена</h3>
        <p className={`mt-2 ${dark ? 'text-forest-100/70' : 'text-forest-700/80'}`}>Агроном свяжется с вами в ближайшее время.</p>
      </div>
    );

  const inputCls = `w-full rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-crocus-400 ${
    dark ? 'bg-forest-800/60 border border-forest-600 text-white placeholder:text-forest-200/50' : 'bg-white border border-forest-200 text-forest-900 placeholder:text-forest-400'}`;

  return (
    <form onSubmit={submit} className={`grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}>
      <input className={inputCls} placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={inputCls} placeholder="+7 (___) ___-__-__" value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" />
      {!compact && (
        <textarea className={`${inputCls} sm:col-span-2`} rows={3} placeholder="Что хотите посадить? Площадь участка, сроки…" value={comment} onChange={(e) => setComment(e.target.value)} />
      )}
      <div className={compact ? 'sm:col-span-2' : 'sm:col-span-2'}>
        <Button type="submit" variant={dark ? 'gold' : 'primary'} className="w-full">
          <Send size={16} /> Получить консультацию агронома
        </Button>
        <p className={`text-xs mt-3 text-center ${dark ? 'text-forest-200/60' : 'text-forest-500/70'}`}>
          Нажимая кнопку, вы соглашаетесь с{' '}
          <Link to="/privacy-policy" className={`underline ${dark ? 'text-forest-100' : 'text-forest-600'}`}>обработкой персональных данных</Link>
        </p>
      </div>
    </form>
  );
}

// FAQ-аккордеон
export function FaqAccordion() {
  const faq = useStore((s) => s.faq);
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faq.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className={`rounded-2xl border overflow-hidden transition-colors ${isOpen ? 'border-forest-300 bg-white shadow-md' : 'border-forest-200 bg-white/60'}`}>
            <button className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left" onClick={() => setOpen(isOpen ? null : f.id)}>
              <span className="font-semibold text-forest-900">{f.question}</span>
              <ChevronDown size={20} className={`shrink-0 text-crocus-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-forest-700/90 leading-relaxed">{f.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Верхняя информационная строка + контакты
export function ContactStrip() {
  const st = useStore((s) => s.settings);
  return (
    <div className="bg-forest-900 text-forest-100 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-crocus-300" /> {st.address}</span>
        <span className="hidden sm:flex items-center gap-1.5"><Clock size={14} className="text-crocus-300" /> {st.workHours}</span>
        <a href={`tel:${st.phone?.replace(/[^\d+]/g, '')}`} className="flex items-center gap-1.5 font-bold hover:text-gold-400 transition">
          <Phone size={14} className="text-crocus-300" /> {st.phone}
        </a>
      </div>
    </div>
  );
}
