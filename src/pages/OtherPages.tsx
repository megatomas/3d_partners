// ==================== СТРАНИЦЫ: УСЛУГИ, О НАС, БЛОГ, ОТЗЫВЫ, ПАРТНЁРЫ, КОНТАКТЫ и др. ====================
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight, Check, ChevronRight, Clock, MapPin, Phone, Mail, Send,
  Sprout, ShieldCheck, Truck, Sparkles, Leaf, Quote, PenTool, Users, Award,
} from 'lucide-react';
import { useStore } from '../store';
import { Button, SectionTitle, Reveal, Stars, LeadForm, FaqAccordion, fmtPrice } from '../components/ui';
import { PlantImg } from './CatalogPage';

const PAGE_IMG = (id: string) => `https://images.unsplash.com/${id}?w=1400&q=80&auto=format&fit=crop`;

// ---------- Общий герой для внутренних страниц ----------
function PageHero({ title, subtitle, img, crumbs }: { title: string; subtitle?: string; img: string; crumbs?: [string, string][] }) {
  return (
    <section className="relative bg-forest-950 text-white overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 to-forest-900/50" />
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        {crumbs && (
          <nav className="flex items-center gap-2 text-xs text-forest-200 mb-4 flex-wrap">
            <Link to="/" className="hover:text-gold-400">Главная</Link>
            {crumbs.map(([label, to]) => (
              <span key={label} className="flex items-center gap-2"><ChevronRight size={12} />
                {to ? <Link to={to} className="hover:text-gold-400">{label}</Link> : <span className="text-white">{label}</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-forest-100/80">{subtitle}</p>}
      </div>
    </section>
  );
}

// ==================== УСЛУГИ ====================
export function ServicesPage() {
  const services = useStore((s) => s.services);
  return (
    <div>
      <PageHero
        title="Услуги садового центра «Крокус»"
        subtitle="Полный цикл: от ландшафтного проекта до автополива и ухода за готовым садом. Одна команда — один договор — один ответственный исполнитель."
        img={PAGE_IMG('photo-1416879595882-3373a0480b5b')}
        crumbs={[['Услуги', '']]}
      />
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-10">
        {services.map((sv, i) => (
          <Reveal key={sv.id} delay={i * 40}>
            <Link to={`/services/${sv.slug}`}
              className={`group grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center rounded-3xl border border-forest-100 bg-white p-7 md:p-10 hover:border-forest-300 hover:shadow-xl transition-all duration-300 ${i % 2 ? 'lg:grid-cols-[1fr_1.4fr]' : ''}`}>
              <div className={i % 2 ? 'lg:order-2' : ''}>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-crocus-600 mb-2">Услуга №{i + 1}</div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-900">{sv.name}</h2>
                <p className="mt-3 text-forest-700/85 leading-relaxed">{sv.shortDescription}. {sv.fullDescription.slice(0, 180)}…</p>
                <div className="mt-5 flex items-center gap-4 flex-wrap">
                  <span className="rounded-full bg-forest-100 text-forest-700 text-sm font-bold px-4 py-2">{sv.price}</span>
                  <span className="inline-flex items-center gap-1.5 text-crocus-600 font-bold text-sm group-hover:gap-3 transition-all">Подробнее <ArrowRight size={16} /></span>
                </div>
              </div>
              <div className={`rounded-2xl overflow-hidden aspect-[4/3] bg-forest-50 ${i % 2 ? 'lg:order-1' : ''}`}>
                <PlantImg src={sv.image || PAGE_IMG(['photo-1585320806297-9794b3e4eeae','photo-1523712999610-f77fbcfc14da','photo-1416879595882-3373a0480b5b','photo-1463320726-f1f964a7ef3a','photo-1597848212624-a19d1b3e6f0b','photo-1523348837708-15d4a09cfac2'][i % 6])}
                  alt={sv.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <section className="bg-forest-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">Не знаете, с чего начать?</h2>
            <p className="mt-3 text-forest-100/80 text-lg">Бесплатная консультация агронома: подскажем, что посадить на вашем участке, и честно оценим бюджет.</p>
          </div>
          <LeadForm dark source="Услуги" compact={false} />
        </div>
      </section>
    </div>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const services = useStore((s) => s.services);
  const sv = services.find((x) => x.slug === slug);
  if (!sv) return <NotFoundSimple label="Услуга не найдена" />;
  const idx = services.indexOf(sv);
  return (
    <div>
      <PageHero title={sv.name} subtitle={sv.shortDescription} img={sv.image || PAGE_IMG(['photo-1585320806297-9794b3e4eeae','photo-1523712999610-f77fbcfc14da','photo-1416879595882-3373a0480b5b','photo-1463320726-f1f964a7ef3a','photo-1597848212624-a19d1b3e6f0b','photo-1523348837708-15d4a09cfac2'][idx % 6])}
        crumbs={[['Услуги', '/services'], [sv.name, '']]} />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-lg text-forest-800/90 leading-relaxed">{sv.fullDescription}</p>
        <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-forest-50 border border-forest-200 px-6 py-4">
          <span className="text-sm text-forest-600 font-semibold">Стоимость:</span>
          <span className="font-display text-xl font-bold text-forest-900">{sv.price}</span>
        </div>
        <ul className="mt-10 space-y-3">
          {['Бесплатный выезд замерщика и консультация', 'Фиксированная смета — без скрытых работ', 'Гарантия на растения и выполненные работы', 'Один договор и персональный менеджер проекта'].map((t) => (
            <li key={t} className="flex gap-3 text-forest-800"><Check size={18} className="text-forest-500 shrink-0 mt-1" /> {t}</li>
          ))}
        </ul>
        <div className="mt-12 rounded-3xl border border-forest-100 bg-white p-7 md:p-9">
          <h3 className="font-display text-xl font-semibold text-forest-900 mb-1">Заказать услугу</h3>
          <p className="text-sm text-forest-600 mb-6">Оставьте заявку — перезвоним, ответим на вопросы и назначим визит специалиста.</p>
          <LeadForm source={`Услуга — ${sv.name}`} />
        </div>
        <div className="mt-8"><Button to="/catalog" variant="ghost">← Вернуться к услугам</Button></div>
      </section>
    </div>
  );
}

// ==================== О КОМПАНИИ ====================
export function AboutPage() {
  return (
    <div>
      <PageHero title="Питомник, который выращивает не растения, а сады"
        subtitle="Садовый центр «Крокус» — более 20 лет озеленяем Краснодар и край: собственные теплицы, поля рулонного газа и команда агрономов."
        img={PAGE_IMG('photo-1463320726-f1f964a7ef3a')} crumbs={[['О питомнике', '']]} />
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-5 text-forest-800/90 leading-relaxed">
          <p className="text-lg">Название «Крокус» символизирует пробуждение природы и новую жизнь — именно это мы дарим каждому участку. Наш путь начинается в собственном питомнике, где каждое растение проходит полный цикл: от черенка до адаптированного к южному климату экземпляра.</p>
          <p>Сегодня «Крокус» — это около 2000 видов деревьев, кустарников и цветов в наличии, топиарные мастерские, поля рулонного газа и ландшафтная студия. Мы одинаково хорошо делаем и одну гортензию для балкона, и парк вокруг резиденции.</p>
          <p>Прямые импортные поставки из Италии, Нидерландов, Польши и Бельгии позволяют привозить редкие сорта под заказ на 20–30% выгоднее рынка — с фитосанитарным оформлением и карантином «под ключ».</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
            {[['~2000', 'видов растений'], ['99,9%', 'приживаемость'], ['20+', 'лет вGreen-бизнесе'], ['5.0 ★', 'рейтинг на Яндекс Картах']].map(([n, l]) => (
              <div key={l}><div className="font-display text-3xl font-bold text-forest-700">{n}</div><div className="text-xs text-forest-500 mt-1">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PlantImg src={PAGE_IMG('photo-1597848212624-a19d1b3e6f0b')} alt="Хвойные питомника" className="rounded-3xl col-span-2 aspect-[16/10] w-full object-cover" />
          <PlantImg src={PAGE_IMG('photo-1523348837708-15d4a09cfac2')} alt="Топиарные формы" className="rounded-3xl aspect-square w-full object-cover" />
          <PlantImg src={PAGE_IMG('photo-1416879595882-3373a0480b5b')} alt="Цветущий сад" className="rounded-3xl aspect-square w-full object-cover" />
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle kicker="Ценности" title="Почему клиенты выбирают «Крокус»" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sprout, t: 'Своё производство', d: 'Растения выращены у нас — значит, точно приживутся в климате Кубани' },
              { icon: ShieldCheck, t: 'Честная гарантия', d: 'Заменяем растение, если оно не прижилось при соблюдении рекомендаций' },
              { icon: Truck, t: 'Доставка и посадка', d: 'Свой транспорт и бригада: привезём в сохранности и правильно высадим' },
              { icon: Sparkles, t: 'Эксклюзив', d: 'Топиари, крупномеры и коллекционные сорта, которых нет у конкурентов' },
            ].map((v) => (
              <div key={v.t} className="rounded-3xl bg-cream border border-forest-100 p-7 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-forest-100 text-forest-600 flex items-center justify-center mb-4"><v.icon size={22} /></div>
                <h3 className="font-bold text-forest-900">{v.t}</h3>
                <p className="text-sm text-forest-600 mt-2 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle kicker="Как это работает" title="Как рождается ваш сад" subtitle="Пять шагов от идеи до зелёного участка «под ключ»" />
        <div className="grid md:grid-cols-5 gap-4">
          {[
            ['Заявка', 'Консультация агронома: солнце, ветер, грунт, бюджет'],
            ['Проект', 'Дендроплан, визуализация и ведомость с ценами'],
            ['Посадка', 'Бригада привозит и высаживает растения с грунтом'],
            ['Газон и полив', 'Рулонный газон и автополив за один день'],
            ['Сопровождение', 'Стрижка, подкормки и защита сада весь сезон'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 70}>
              <div className="relative h-full rounded-3xl bg-white border border-forest-100 p-6">
                <div className="font-display text-4xl font-bold text-crocus-200">0{i + 1}</div>
                <h3 className="font-bold text-forest-900 mt-2">{t}</h3>
                <p className="text-xs text-forest-600 mt-2 leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12"><Button to="/contacts" size="lg">Обсудить мой проект</Button></div>
      </section>
    </div>
  );
}

// ==================== БЛОГ ====================
export function BlogPage() {
  const posts = useStore((s) => s.blogPosts);
  return (
    <div>
      <PageHero title="Блог агрономов «Крокуса»" subtitle="Практические советы по выбору, посадке и уходу за растениями в южном климате"
        img={PAGE_IMG('photo-1523712999610-f77fbcfc14da')} crumbs={[['Блог', '']]} />
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <Link to={`/blog/${p.slug}`} className="group block h-full bg-white rounded-3xl overflow-hidden border border-forest-100 hover:border-forest-300 hover:shadow-lg transition-all">
              <PlantImg src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-forest-500 mb-3">
                  <span className="rounded-full bg-crocus-100? bg-[#f3e8fa] text-crocus-700 font-bold px-3 py-1">{p.category}</span>
                  <span>{new Date(p.date).toLocaleDateString('ru-RU')}</span>
                </div>
                <h2 className="font-display text-lg font-semibold text-forest-900 leading-snug group-hover:text-crocus-700 transition">{p.title}</h2>
                <p className="text-sm text-forest-600 mt-2 line-clamp-3">{p.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-crocus-600 font-bold text-sm mt-4 group-hover:gap-3 transition-all">Читать статью <ArrowRight size={15} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const posts = useStore((s) => s.blogPosts);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFoundSimple label="Статья не найдена" />;
  const others = posts.filter((p) => p.id !== post.id).slice(0, 3);
  return (
    <div>
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-xs text-forest-500 mb-8 flex-wrap">
          <Link to="/" className="hover:text-crocus-600">Главная</Link><ChevronRight size={12} />
          <Link to="/blog" className="hover:text-crocus-600">Блог</Link><ChevronRight size={12} />
          <span className="text-forest-800 font-semibold line-clamp-1">{post.title}</span>
        </nav>
        <span className="rounded-full bg-[#f3e8fa] text-crocus-700 text-xs font-bold px-3 py-1">{post.category}</span>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-forest-900 leading-tight mt-4">{post.title}</h1>
        <p className="text-sm text-forest-500 mt-3">{new Date(post.date).toLocaleDateString('ru-RU')} · Садовый центр «Крокус»</p>
        <PlantImg src={post.image} alt={post.title} className="w-full aspect-video object-cover rounded-3xl my-8" />
        <p className="text-lg text-forest-800/90 leading-relaxed font-medium">{post.excerpt}</p>
        <p className="mt-5 text-forest-700/90 leading-relaxed whitespace-pre-line">{post.content}</p>
        <div className="mt-10 rounded-3xl bg-forest-50 border border-forest-200 p-7 flex flex-col sm:flex-row gap-5 items-center">
          <PenTool size={28} className="text-crocus-600 shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-forest-900">Остались вопросы по вашему участку?</div>
            <div className="text-sm text-forest-600 mt-1">Агроном бесплатно подскажет решения именно для ваших условий.</div>
          </div>
          <Button to="/contacts">Задать вопрос</Button>
        </div>
      </article>
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl font-semibold text-forest-900 mb-6">Другие статьи</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group bg-white rounded-3xl overflow-hidden border border-forest-100 hover:shadow-lg transition">
              <PlantImg src={p.image} alt={p.title} className="aspect-[16/9] w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5 font-semibold text-forest-900 leading-snug group-hover:text-crocus-700 transition">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==================== ОТЗЫВЫ ====================
export function ReviewsPage() {
  const reviews = useStore((s) => s.reviews);
  return (
    <div>
      <PageHero title="Отзывы наших клиентов" subtitle="Средняя оценка 5.0 на Яндекс Картах — мы гордимся каждым садом, который создали"
        img={PAGE_IMG('photo-1585320806297-9794b3e4eeae')} crumbs={[['Отзывы', '']]} />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="text-center">
            <div className="font-display text-6xl font-bold text-forest-900">5.0</div>
            <Stars n={5} size={20} />
          </div>
          <div className="h-16 w-px bg-forest-200" />
          <div className="text-sm text-forest-700 max-w-xs">
            На основе отзывов гостей садового центра на <br /><b>Яндекс Картах</b>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 60}>
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
        <div className="text-center mt-12">
          <Button href={useStore.getState().settings.mapsUrl} variant="outline" size="lg">Оставить отзыв на Яндекс Картах</Button>
        </div>
      </section>
    </div>
  );
}

// ==================== ПАРТНЁРАМ / ПРОГРАММЫ ====================
export function PartnersPage() {
  const tariffs = useStore((s) => s.tariffs);
  return (
    <div>
      <PageHero title="Программы сотрудничества" subtitle="Для частных владельцев, заказчиков комплексных проектов и коллег-ландшафтников"
        img={PAGE_IMG('photo-1523348837708-15d4a09cfac2')} crumbs={[['Партнёрам', '']]} />
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-6 items-stretch">
        {tariffs.map((t, i) => (
          <Reveal key={t.id} delay={i * 80} className="h-full">
            <div className={`relative h-full flex flex-col rounded-3xl p-8 border transition ${t.isRecommended ? 'bg-forest-900 text-white border-forest-700 shadow-2xl scale-[1.01]' : 'bg-white border-forest-100'}`}>
              {t.isRecommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 text-forest-950 text-[11px] font-extrabold px-4 py-1.5 uppercase">Выбор клиентов</span>}
              <h2 className={`font-display text-2xl font-semibold ${t.isRecommended ? 'text-white' : 'text-forest-900'}`}>{t.name}</h2>
              <p className={`text-sm mt-1 ${t.isRecommended ? 'text-forest-200' : 'text-forest-500'}`}>{t.shortDescription}</p>
              <div className={`mt-4 text-sm font-bold ${t.isRecommended ? 'text-gold-400' : 'text-crocus-600'}`}>{t.period}</div>
              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className={`flex gap-2.5 text-sm ${t.isRecommended ? 'text-forest-100/90' : 'text-forest-700'}`}>
                    <Check size={16} className={`shrink-0 mt-0.5 ${t.isRecommended ? 'text-gold-400' : 'text-forest-500'}`} /> {f}
                  </li>
                ))}
              </ul>
              {t.limitations?.length ? <p className={`text-xs mt-4 ${t.isRecommended ? 'text-forest-300' : 'text-forest-400'}`}>{t.limitations.join('. ')}</p> : null}
              <div className="mt-8">
                <Button to="/contacts" variant={t.isRecommended ? 'gold' : 'outline'} className="w-full justify-center">{t.buttonText}</Button>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Users, t: 'Ландшафтным дизайнерам', d: 'Прайс партнёра, резерв редких позиций, отсрочка платежа постоянным клиентам' },
            { icon: Award, t: 'Прорабам и стройфирмам', d: 'Озеленение объектов под ключ: от живых изгородей ЖК до парков у резиденций' },
            { icon: Leaf, t: 'Владельцам участков', d: 'Персональный агроном, скидка 10% на первую покупку и бесплатная доставка от 30 000 ₽' },
          ].map((x) => (
            <div key={x.t}>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-100 text-forest-600 flex items-center justify-center mb-4"><x.icon size={24} /></div>
              <h3 className="font-display text-lg font-semibold text-forest-900">{x.t}</h3>
              <p className="text-sm text-forest-600 mt-2 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==================== FAQ ====================
export function FAQPage() {
  return (
    <div>
      <PageHero title="Вопросы и ответы" subtitle="Собрали всё, о чём чаще всего спрашивают наши агрономы"
        img={PAGE_IMG('photo-1416879595882-3373a0480b5b')} crumbs={[['FAQ', '']]} />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <FaqAccordion />
        <div className="text-center mt-12">
          <p className="text-forest-600 mb-4">Не нашли ответ? Спросите лично — отвечаем быстро.</p>
          <Button to="/contacts" size="lg">Задать вопрос агроному</Button>
        </div>
      </section>
    </div>
  );
}

// ==================== КОНТАКТЫ ====================
export function ContactsPage() {
  const st = useStore((s) => s.settings);
  return (
    <div>
      <PageHero title="Контакты" subtitle="Приезжайте гулять по питомнику и выбирать растения вживую — мы всегда рады гостям"
        img={PAGE_IMG('photo-1463320726-f1f964a7ef3a')} crumbs={[['Контакты', '']]} />
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Phone, t: 'Телефон', v: st.phone, href: `tel:${st.phone?.replace(/[^\d+]/g, '')}` },
              { icon: Mail, t: 'Почта', v: st.email, href: `mailto:${st.email}` },
              { icon: MapPin, t: 'Адрес', v: st.address, href: st.mapsUrl },
              { icon: Clock, t: 'Режим работы', v: st.workHours },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl bg-white border border-forest-100 p-6">
                <c.icon size={20} className="text-crocus-600 mb-3" />
                <div className="text-xs uppercase tracking-wider text-forest-500 font-bold">{c.t}</div>
                {c.href ? <a href={c.href} target="_blank" rel="noreferrer" className="font-bold text-forest-900 hover:text-crocus-600 transition">{c.v}</a>
                     : <div className="font-bold text-forest-900">{c.v}</div>}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl overflow-hidden border border-forest-100 shadow-sm">
            <iframe
              title="Карта — садовый центр Крокус"
              src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent('Садовый центр Крокус Краснодар Ростовское шоссе 30/1')}&z=15`}
              className="w-full h-[380px] border-0" loading="lazy"
            />
          </div>
          <p className="text-sm text-forest-500 mt-3 flex items-center gap-2">
            <Send size={14} className="text-crocus-600" /> Ориентир: рядом «Метро» и Бауцентр, удобный подъезд и парковка.
          </p>
        </div>
        <div className="rounded-3xl bg-forest-900 text-white p-8 md:p-10 self-start">
          <h2 className="font-display text-2xl font-semibold">Оставить заявку</h2>
          <p className="text-sm text-forest-100/70 mt-2 mb-6">Подберём растения, рассчитаем доставку и посадку. Перезвоним в течение 15 минут в рабочее время.</p>
          <LeadForm dark source="Контакты" />
          <div className="mt-8 pt-6 border-t border-forest-700 flex flex-wrap gap-4 text-sm">
            <a className="font-bold text-gold-400 hover:underline" href={`tel:${st.phone?.replace(/[^\d+]/g, '')}`}>{st.phone}</a>
            <span className="opacity-70">Telegram: {st.telegram}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== ПОЛИТИКА ====================
export function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-forest-900 mb-6">Политика конфиденциальности</h1>
      <div className="space-y-4 text-forest-700/90 leading-relaxed text-[15px]">
        <p>Садовый центр «Крокус» (г. Краснодар, Ростовское ш., 30/1) обрабатывает персональные данные пользователей сайта исключительно для обработки заявок на консультацию, подбор растений, доставку и посадку.</p>
        <p>Мы собираем только имя и номер телефона (при необходимости — e-mail), которые вы оставляете добровольно через формы на сайте. Данные не передаются третьим лицам, кроме случаев, предусмотренных законодательством РФ.</p>
        <p>Вы можете отозвать согласие на обработку персональных данных в любой момент — позвонив нам или написав на {useStore.getState().settings.email}. Отзыв не влияет на уже выполненные заказы.</p>
        <p>Сайт может использовать обезличенные данные посещений (аналитика) для улучшения сервиса.</p>
        <div className="pt-4"><Button to="/personal-data-consent" variant="outline">Согласие на обработку данных</Button></div>
      </div>
    </div>
  );
}

export function PersonalDataConsentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-forest-900 mb-6">Согласие на обработку персональных данных</h1>
      <div className="space-y-4 text-forest-700/90 leading-relaxed text-[15px]">
        <p>Отправляя форму на сайте crocus-krd.ru, субъект персональных данных свободно, своей волей и в своём интересе даёт согласие на обработку персональных данных (имя, номер телефона, адрес электронной почты) оператором — садовым центром «Крокус».</p>
        <p>Цели обработки: обратный звонок, консультация агронома, оформление заказа растений, расчёт стоимости доставки и посадки, информирование об акциях.</p>
        <p>Перечень действий: сбор, запись, систематизация, накопление, уточнение, использование, передача уполномоченным сотрудникам оператора, хранение, уничтожение. Срок согласия — до отзыва путём направления письменного заявления оператору.</p>
      </div>
      <div className="mt-8"><Button to="/contacts">← Перейти к формам заявки</Button></div>
    </div>
  );
}

// ==================== 404 ====================
export function NotFoundSimple({ label = 'Страница не найдена' }: { label?: string }) {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-display text-7xl font-bold text-forest-200 mb-4">🌱</div>
      <h1 className="font-display text-3xl font-semibold text-forest-900">{label}</h1>
      <p className="text-forest-600 mt-3 mb-8">Похоже, здесь ещё ничего не посажено. Вернёмся в питомник?</p>
      <Button to="/" size="lg">На главную</Button>
    </div>
  );
}
