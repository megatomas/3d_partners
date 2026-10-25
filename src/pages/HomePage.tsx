// ==================== ГЛАВНАЯ СТРАНИЦА ====================
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Truck, ShieldCheck, Sparkles, BadgePercent, MapPin, Star, Quote } from 'lucide-react';
import { useStore } from '../store';
import { Button, SectionTitle, Reveal, Stars, LeadForm, FaqAccordion, fmtPrice } from '../components/ui';

const HERO_IMG = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80&auto=format&fit=crop';

export function HomePage() {
  const cats = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const services = useStore((s) => s.services);
  const reviews = useStore((s) => s.reviews);
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-forest-950">
        <img src={HERO_IMG} alt="Питомник растений Крокус" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/70 to-forest-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-crocus-600/25 border border-crocus-400/40 text-crocus-300 px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              <Sprout size={14} /> Питомник растений · Краснодар
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.08]">
              Сажаем сады,<br />которые живут <em className="not-italic text-gold-400">десятилетиями</em>
            </h1>
            <p className="mt-6 text-lg text-forest-100/85 leading-relaxed">
              Около 2000 видов деревьев, кустарников и цветов в собственном питомнике.
              Выращиваем, адаптируем под южный климат и создаём сад «под ключ» — от проекта до автополива.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/catalog" size="lg" variant="gold">Открыть каталог <ArrowRight size={18} /></Button>
              <Button to="/contacts" size="lg" variant="outline" className="!border-forest-300/50 !text-white hover:!bg-white/10 hover:!text-white">Бесплатная консультация</Button>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
              {[['99,9%', 'приживаемость'], ['20–30%', 'выгоднее рынка'], ['~2000', 'видов растений'], ['5.0 ★', 'на Яндекс Картах']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold-400">{n}</div>
                  <div className="text-xs text-forest-100/70 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== КАТЕГОРИИ ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <SectionTitle kicker="Каталог" title="Каталог растений" subtitle="Хвойные и лиственные культуры, плодовые, рассада, топиарные формы и всё для ухода за садом" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link to={`/catalog?cat=${c.slug}`}
                className="group relative rounded-3xl overflow-hidden h-64 block shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-white">{c.name}</h3>
                  <p className="text-sm text-forest-100/80 mt-1 line-clamp-2">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-bold mt-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Смотреть товары <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== ПРЕИМУЩЕСТВА ===== */}
      <section className="bg-forest-900 text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-crocus-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-forest-500/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <SectionTitle light kicker="Почему мы" title="Мы не просто продаём растения — мы создаём сады"
            subtitle="Название «Крокус» символизирует пробуждение природы и новую жизнь — именно это мы дарим каждому участку" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BadgePercent, title: 'Импорт любых растений', text: 'Прямые поставки из европейских питомников — привезём любое растение на 20–30% выгоднее рынка' },
              { icon: ShieldCheck, title: 'Приживаемость 99,9%', text: 'Всё выращено и акклиматизировано под климат Краснодара и края. Даём гарантию на посадочный материал' },
              { icon: Sprout, title: '«Под ключ»', text: 'Проект, поставка, посадка, рулонный газон, автополив и обслуживание — одной командой по одному договору' },
              { icon: Sparkles, title: 'Редкие сорта и топиари', text: 'Спирали, конусы, помпоны и коллекционные культуры, которых нет у других. Уникальность — наша специализация' },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="h-full rounded-3xl bg-forest-800/60 border border-forest-700 p-7 hover:border-crocus-400/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-crocus-600/30 text-crocus-300 flex items-center justify-center mb-5">
                    <a.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                  <p className="text-sm text-forest-100/70 mt-2 leading-relaxed">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ХИТЫ ПРОДАЖ ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-crocus-600 mb-2">Хиты сезона</div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest-900">Популярные растения</h2>
          </div>
          <Button to="/catalog" variant="ghost">Весь каталог <ArrowRight size={16} /></Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <Link to={`/catalog/${p.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-forest-100 hover:border-forest-300 hover:shadow-lg transition-all duration-300">
                <div className="aspect-square overflow-hidden bg-forest-50 relative">
                  <img src={p.images[0]?.url} alt={p.name} loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1463320726-f1f964a7ef3a?w=600&q=80'; }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {p.variants.length > 1 && (
                    <span className="absolute top-3 left-3 rounded-full bg-forest-900/80 text-white text-[10px] font-bold px-2.5 py-1">
                      {p.variants.length} размера
                    </span>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-semibold text-forest-900 text-sm md:text-base leading-snug line-clamp-2 min-h-[2.6em]">{p.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display font-bold text-forest-800">от {fmtPrice(p.retailPrice)}</span>
                    <span className="text-crocus-600 opacity-0 group-hover:opacity-100 transition"><ArrowRight size={18} /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== УСЛУГИ ===== */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle kicker="Услуги" title="Услуги садового центра" subtitle="Полный цикл благоустройства — проектирование, поставка, посадка и обслуживание" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((sv, i) => (
              <Reveal key={sv.id} delay={i * 60}>
                <Link to={`/services/${sv.slug}`} className="group h-full flex flex-col rounded-3xl border border-forest-100 bg-cream p-7 hover:border-forest-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-forest-900">{sv.name}</h3>
                    <ArrowRight size={18} className="shrink-0 mt-1 text-crocus-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <p className="text-sm text-forest-700/80 mt-3 leading-relaxed flex-1">{sv.shortDescription}</p>
                  <span className="mt-5 inline-block self-start rounded-full bg-forest-100 text-forest-700 text-xs font-bold px-3 py-1.5">{sv.price}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ОТЗЫВЫ ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <SectionTitle kicker="Отзывы" title="Нам доверяют сады" subtitle="Средняя оценка 5.0 на Яндекс Картах — отзывы реальных клиентов" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((r, i) => (
            <Reveal key={r.id} delay={i * 60}>
              <figure className="h-full bg-white rounded-3xl border border-forest-100 p-7 flex flex-col shadow-sm">
                <Quote size={22} className="text-crocus-400 mb-4" />
                <blockquote className="text-sm text-forest-800 leading-relaxed flex-1">«{r.text}»</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-forest-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-forest-900 text-sm">{r.author}</div>
                    <div className="text-xs text-forest-500">{r.source}</div>
                  </div>
                  <Stars n={r.rating} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button to="/reviews" variant="outline">Все отзывы · 5.0 на Яндекс Картах</Button>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle kicker="FAQ" title="Частые вопросы" subtitle="Ответы агрономов о посадке, уходе и покупке растений на юге" />
          <FaqAccordion />
        </div>
      </section>

      {/* ===== CTA + ФОРМА ===== */}
      <section className="relative bg-forest-950 text-white py-20 md:py-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80&auto=format&fit=crop" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-crocus-300 mb-3">Первый шаг к саду</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">Получите консультацию агронома бесплатно</h2>
            <p className="mt-5 text-forest-100/80 text-lg leading-relaxed">
              Расскажите об участке — подберём растения под солнце, ветер и бюджет, рассчитаем стоимость посадки «под ключ».
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Truck, t: 'Доставка по Краснодару и краю — от 1 500 ₽, от 30 000 ₽ бесплатно' },
                { icon: ShieldCheck, t: 'Гарантия приживаемости и письменные рекомендации по уходу' },
                { icon: MapPin, t: 'Приезжайте посмотреть растения живьём: Ростовское ш., 30/1, ежедневно 9:00–18:00' },
              ].map((x) => (
                <li key={x.t} className="flex gap-3 items-start">
                  <span className="w-9 h-9 shrink-0 rounded-xl bg-forest-800 text-crocus-300 flex items-center justify-center"><x.icon size={17} /></span>
                  <span className="text-sm text-forest-100/85 pt-1.5">{x.t}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-7 md:p-9">
              <h3 className="font-display text-xl font-semibold mb-1 flex items-center gap-2"><Star size={18} className="text-gold-400" /> Заявка на консультацию</h3>
              <p className="text-sm text-forest-100/60 mb-6">Перезвоним в течение 15 минут в рабочее время</p>
              <LeadForm dark source="Главная — CTA" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
