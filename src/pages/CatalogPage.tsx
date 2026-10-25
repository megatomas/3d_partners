// ==================== КАТАЛОГ И СТРАНИЦА ТОВАРА ====================
import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Truck, ShieldCheck, Sprout, Ruler, Sun, Check, ChevronRight, Leaf } from 'lucide-react';
import { useStore } from '../store';
import { Button, SectionTitle, Reveal, LeadForm, fmtPrice } from '../components/ui';
import { Product } from '../types';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1463320726-f1f964a7ef3a?w=600&q=80';

export function PlantImg({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  return (
    <img
      src={src || FALLBACK_IMG}
      alt={alt}
      loading="lazy"
      onError={(e) => { const t = e.target as HTMLImageElement; if (t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG; }}
      className={className}
    />
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <Link to={`/catalog/${p.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-forest-100 hover:border-forest-300 hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-forest-50 relative">
        <PlantImg src={p.images[0]?.url} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.variants.length > 1 && (
          <span className="absolute top-3 left-3 rounded-full bg-forest-900/80 text-white text-[10px] font-bold px-2.5 py-1">{p.variants.length} размера</span>
        )}
        {p.isFeatured && <span className="absolute top-3 right-3 rounded-full bg-gold-400 text-forest-950 text-[10px] font-extrabold px-2.5 py-1 uppercase">Хит</span>}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-forest-900 text-sm md:text-base leading-snug line-clamp-2 min-h-[2.6em]">{p.name}</h3>
        <p className="text-xs text-forest-500 mt-1 line-clamp-2">{p.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display font-bold text-forest-800">от {fmtPrice(p.retailPrice)}</span>
          <span className="text-crocus-600 opacity-0 group-hover:opacity-100 transition"><ArrowRight size={18} /></span>
        </div>
      </div>
    </Link>
  );
}

export function CatalogPage() {
  const cats = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('cat') ?? 'all';
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default');

  const list = useMemo(() => {
    let l = products.filter((p) => p.status === 'published');
    if (activeCat !== 'all') l = l.filter((p) => cats.find((c) => c.slug === activeCat)?.id === p.categoryId);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((p) => (p.name + ' ' + p.shortDescription + ' ' + p.fullDescription).toLowerCase().includes(s));
    }
    if (sort === 'asc') l = [...l].sort((a, b) => (a.retailPrice ?? 0) - (b.retailPrice ?? 0));
    if (sort === 'desc') l = [...l].sort((a, b) => (b.retailPrice ?? 0) - (a.retailPrice ?? 0));
    return l;
  }, [products, cats, activeCat, q, sort]);

  const activeCatObj = cats.find((c) => c.slug === activeCat);

  return (
    <div>
      {/* Шапка каталога */}
      <section className="bg-forest-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-2 text-xs text-forest-200 mb-4">
            <Link to="/" className="hover:text-gold-400">Главная</Link><ChevronRight size={12} />
            <span className="text-white">{activeCatObj ? activeCatObj.name : 'Каталог растений'}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-semibold">
            {activeCatObj ? activeCatObj.name : 'Каталог растений'}
          </h1>
          <p className="mt-3 max-w-2xl text-forest-100/75">
            {activeCatObj?.description ?? 'Около 2000 видов деревьев, кустарников и цветов из собственного питомника — с доставкой и посадкой в Краснодаре и крае.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Фильтр по категориям */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 mb-6 [&::-webkit-scrollbar]:hidden">
          <button onClick={() => setParams({})}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${activeCat === 'all' ? 'bg-forest-600 text-white' : 'bg-white border border-forest-200 text-forest-700 hover:border-forest-400'}`}>
            Все растения
          </button>
          {cats.map((c) => (
            <button key={c.id} onClick={() => setParams({ cat: c.slug })}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${activeCat === c.slug ? 'bg-forest-600 text-white' : 'bg-white border border-forest-200 text-forest-700 hover:border-forest-400'}`}>
              {c.name}
            </button>
          ))}
        </div>

        {/* Поиск + сортировка */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <label className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск: туя, кипарис, газон…"
              className="w-full rounded-full bg-white border border-forest-200 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-crocus-400" />
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)}
            className="rounded-full bg-white border border-forest-200 px-5 py-3 text-sm font-semibold text-forest-700 outline-none cursor-pointer">
            <option value="default">Сортировка: по умолчанию</option>
            <option value="asc">Сначала дешевле</option>
            <option value="desc">Сначала дороже</option>
          </select>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-24">
            <Leaf size={40} className="mx-auto text-forest-300 mb-4" />
            <p className="text-forest-700 font-semibold text-lg">Ничего не нашлось</p>
            <p className="text-forest-500 mt-2 mb-6">Позвоните нам — привезём любое растение под заказ из Европы за 2 недели.</p>
            <Button to="/contacts">Оставить заявку</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {list.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 50}><ProductCard p={p} /></Reveal>)}
          </div>
        )}

        <div className="mt-16 rounded-3xl bg-forest-50 border border-forest-200 p-8 md:p-10 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-forest-900">Не нашли нужное растение?</h3>
            <p className="mt-2 text-forest-700/80">Привезём любой сорт из европейских питомников на 20–30% выгоднее рынка. Срок поставки — от 2 недель, берём на себя фитосанитарное оформление и адаптацию.</p>
          </div>
          <div className="md:justify-self-end"><Button to="/contacts" size="lg">Заказать импорт</Button></div>
        </div>
      </section>
    </div>
  );
}

// ==================== СТРАНИЦА ТОВАРА ====================
export function ProductPage() {
  const { slug } = useParams();
  const products = useStore((s) => s.products);
  const cats = useStore((s) => s.categories);
  const product = products.find((p) => p.slug === slug);
  const [variantIdx, setVariantIdx] = useState(0);

  if (!product)
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
        <p className="text-forest-700 text-xl font-semibold">Растение не найдено</p>
        <Button to="/catalog">Вернуться в каталог</Button>
      </div>
    );

  const cat = cats.find((c) => c.id === product.categoryId);
  const variant = product.variants[variantIdx];
  const price = variant?.price ?? product.retailPrice;
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const attrs = Object.entries(product.attributes ?? {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      <nav className="flex items-center gap-2 text-xs text-forest-500 mb-8 flex-wrap">
        <Link to="/" className="hover:text-crocus-600">Главная</Link><ChevronRight size={12} />
        <Link to="/catalog" className="hover:text-crocus-600">Каталог</Link><ChevronRight size={12} />
        {cat && (<><Link to={`/catalog?cat=${cat.slug}`} className="hover:text-crocus-600">{cat.name}</Link><ChevronRight size={12} /></>)}
        <span className="text-forest-800 font-semibold">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Фото */}
        <div className="rounded-3xl overflow-hidden bg-white border border-forest-100 shadow-sm sticky top-32 self-start">
          <PlantImg src={product.images[0]?.url} alt={product.name} className="w-full aspect-square object-cover" />
        </div>

        {/* инфо */}
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-3">
            {product.isFeatured && <span className="rounded-full bg-gold-400 text-forest-950 text-[11px] font-extrabold px-3 py-1 uppercase">Хит сезона</span>}
            <span className="rounded-full bg-forest-100 text-forest-700 text-[11px] font-bold px-3 py-1">В наличии: {product.stock} шт.</span>
            <span className="text-xs text-forest-500">арт. {product.sku}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-forest-900 leading-tight">{product.name}</h1>
          {product.material && <p className="mt-2 text-forest-500 text-sm flex items-center gap-1.5"><Sprout size={14} className="text-forest-400" /> {product.country}</p>}

          {/* Вариации */}
          {product.variants.length > 0 && (
            <div className="mt-7">
              <div className="text-xs font-bold uppercase tracking-wider text-forest-500 mb-3 flex items-center gap-1.5"><Ruler size={14} /> Размер / объём контейнера</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button key={v.id} onClick={() => setVariantIdx(i)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      i === variantIdx ? 'border-crocus-500 bg-crocus-50 text-crocus-700 ring-2 ring-crocus-200' : 'border-forest-200 bg-white text-forest-700 hover:border-forest-400'}`}>
                    {v.name}
                    <span className="block text-xs mt-0.5 opacity-70">{fmtPrice(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-end gap-4">
            <div>
              <div className="text-xs text-forest-500 font-semibold uppercase">Цена</div>
              <div className="font-display text-4xl font-bold text-forest-900">{fmtPrice(price)}</div>
            </div>
            {product.minOrder && product.minOrder > 1 && (
              <div className="text-sm text-forest-600 pb-1.5">мин. заказ — {product.minOrder} шт.</div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`tel:${useStore.getState().settings.phone?.replace(/[^\d+]/g, '')}`} size="lg">
              📞 Купить со скидкой
            </Button>
            <Button to="/contacts" variant="outline" size="lg">Заказать доставку и посадку</Button>
          </div>

          {/* Гарантии */}
          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Truck, t: 'Доставка от 1 500 ₽', d: 'по городу; бесплатно от 30 000 ₽' },
              { icon: ShieldCheck, t: 'Гарантия 99,9%', d: 'приживаемость и замена саженца' },
              { icon: Sprout, t: 'Адаптировано', d: 'выращено в климате Кубани' },
            ].map((g) => (
              <div key={g.t} className="rounded-2xl bg-forest-50 border border-forest-100 p-4">
                <g.icon size={18} className="text-forest-600 mb-2" />
                <div className="text-sm font-bold text-forest-900">{g.t}</div>
                <div className="text-xs text-forest-500 mt-0.5">{g.d}</div>
              </div>
            ))}
          </div>

          {/* Описание */}
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-forest-900 mb-3">Описание</h2>
            <p className="text-forest-700/90 leading-relaxed">{product.fullDescription}</p>
          </div>

          {/* Атрибуты */}
          {attrs.length > 0 && (
            <div className="mt-8 rounded-3xl border border-forest-100 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-forest-100 font-bold text-forest-900 flex items-center gap-2">
                <Sun size={17} className="text-gold-500" /> Характеристики и уход
              </div>
              <dl className="divide-y divide-forest-50">
                {attrs.map(([k, v]) => (
                  <div key={k} className="flex justify-between px-6 py-3 text-sm">
                    <dt className="text-forest-500">{k}</dt>
                    <dd className="font-semibold text-forest-800 text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Похожие */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-900 mb-8">Похожие растения</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* Заявка по товару */}
      <section className="mt-20 rounded-3xl bg-forest-900 text-white p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold">Заказать «{product.name}» с посадкой</h3>
          <p className="mt-3 text-forest-100/75">Оставьте заявку — подтвердим наличие, рассчитаем доставку и предложим дату посадки бригадой питомника.</p>
          <ul className="mt-5 space-y-2 text-sm text-forest-100/85">
            {['Подготовка ямы, грунт и дренаж', 'Мульчирование и влагозарядковый полив', 'Рекомендации по уходу в подарок'].map((x) => (
              <li key={x} className="flex gap-2"><Check size={16} className="text-gold-400 shrink-0 mt-0.5" /> {x}</li>
            ))}
          </ul>
        </div>
        <LeadForm source={`Товар — ${product.name}`} dark />
      </section>
    </div>
  );
}
