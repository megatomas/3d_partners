import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, ChevronUp, Calculator, Package, Truck, Zap, Shield, Users, Star, Phone, Mail, Send, Camera } from 'lucide-react';
import { useStore } from '../store';

export function HomePage() {
  const { products, categories, tariffs, blocks, faq, settings, calculatorDefaults, addLead } = useStore();
  const visibleBlocks = blocks.filter(b => b.visible).sort((a, b) => a.order - b.order);
  const featuredProducts = products.filter(p => p.isFeatured && p.status === 'published');
  const publishedTariffs = tariffs.filter(t => t.status === 'published').sort((a, b) => a.order - b.order);

  return (
    <div>
      {visibleBlocks.map(block => {
        switch (block.type) {
          case 'hero': return <HeroBlock key={block.id} block={block} />;
          case 'steps': return <StepsBlock key={block.id} block={block} />;
          case 'advantages': return <AdvantagesBlock key={block.id} block={block} />;
          case 'featured-products': return <FeaturedProductsBlock key={block.id} block={block} products={featuredProducts} />;
          case 'calculator': return <CalculatorBlock key={block.id} block={block} defaults={calculatorDefaults} />;
          case 'tariffs': return <TariffsBlock key={block.id} block={block} tariffs={publishedTariffs} />;
          case 'faq': return <FAQBlock key={block.id} block={block} faq={faq} />;
          case 'form': return <FormBlock key={block.id} block={block} onSubmit={addLead} />;
          default: return <TextBlock key={block.id} block={block} />;
        }
      })}
    </div>
  );
}

function HeroBlock({ block }: { block: any }) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {block.title}
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              {block.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={block.buttonLink || '/catalog'}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                {block.buttonText || 'Выбрать товары'} <ArrowRight size={18} className="ml-2" />
              </Link>
              {block.data?.buttonText2 && (
                <Link to={block.data.buttonLink2 || '/pricing'}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                  {block.data.buttonText2}
                </Link>
              )}
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-1"><Check size={16} className="text-green-400" /> Без оборудования</span>
              <span className="flex items-center gap-1"><Check size={16} className="text-green-400" /> От 10 штук</span>
              <span className="flex items-center gap-1"><Check size={16} className="text-green-400" /> Фулфилмент</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Package size={32} className="mx-auto text-blue-300 mb-2" />
                    <p className="text-white font-semibold">50+ товаров</p>
                    <p className="text-blue-200 text-sm">в каталоге</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Truck size={32} className="mx-auto text-blue-300 mb-2" />
                    <p className="text-white font-semibold">Фулфилмент</p>
                    <p className="text-blue-200 text-sm">под ключ</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Zap size={32} className="mx-auto text-blue-300 mb-2" />
                    <p className="text-white font-semibold">1-3 дня</p>
                    <p className="text-blue-200 text-sm">производство</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Shield size={32} className="mx-auto text-blue-300 mb-2" />
                    <p className="text-white font-semibold">Гарантия</p>
                    <p className="text-blue-200 text-sm">качества</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepsBlock({ block }: { block: any }) {
  const steps = block.data?.steps || [];
  const icons = [Package, Star, Zap, Truck];
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
          <p className="text-lg text-gray-600">{block.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step: any, i: number) => {
            const Icon = icons[i] || Package;
            return (
              <div key={i} className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdvantagesBlock({ block }: { block: any }) {
  const items = block.data?.items || [];
  const icons = [Shield, Zap, Package, Star, Camera, Truck];
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
          <p className="text-lg text-gray-600">{block.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, i: number) => {
            const Icon = icons[i] || Check;
            return (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsBlock({ block, products }: { block: any; products: any[] }) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
          <p className="text-lg text-gray-600">{block.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/catalog" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Смотреть весь каталог <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Link to={`/catalog/${product.slug}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Package size={48} />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-blue-600 font-medium mb-1">{product.sku}</p>
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-gray-900">{product.wholesalePrice} ₽</p>
            <p className="text-xs text-gray-500">опт от {product.minOrder} шт.</p>
          </div>
          {product.retailPrice && (
            <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">РРЦ {product.retailPrice} ₽</p>
          )}
        </div>
      </div>
    </Link>
  );
}

function CalculatorBlock({ block, defaults }: { block: any; defaults: any }) {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [commission, setCommission] = useState(String(defaults.commissionPercent));
  const [logistics, setLogistics] = useState(String(defaults.logisticsCost));
  const [packaging, setPackaging] = useState(String(defaults.packagingCost));
  const [advertising, setAdvertising] = useState(String(defaults.advertisingCost));
  const [tax, setTax] = useState(String(defaults.taxPercent));
  const [quantity, setQuantity] = useState('30');

  const pp = parseFloat(purchasePrice) || 0;
  const sp = parseFloat(sellPrice) || 0;
  const commP = parseFloat(commission) || 0;
  const log = parseFloat(logistics) || 0;
  const pack = parseFloat(packaging) || 0;
  const adv = parseFloat(advertising) || 0;
  const taxP = parseFloat(tax) || 0;
  const qty = parseInt(quantity) || 0;

  const commissionAmount = sp * commP / 100;
  const taxAmount = sp * taxP / 100;
  const totalExpenses = pp + commissionAmount + log + pack + adv + taxAmount;
  const profit = sp - totalExpenses;
  const margin = sp > 0 ? (profit / sp * 100) : 0;
  const totalProfit = profit * qty;

  const hasValues = pp > 0 && sp > 0;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
          <p className="text-lg text-gray-600">{block.subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <InputField label="Закупочная цена, ₽" value={purchasePrice} onChange={setPurchasePrice} placeholder="320" />
            <InputField label="Цена продажи, ₽" value={sellPrice} onChange={setSellPrice} placeholder="890" />
            <InputField label={`Комиссия площадки, %`} value={commission} onChange={setCommission} placeholder="15" />
            <InputField label="Логистика, ₽" value={logistics} onChange={setLogistics} placeholder="80" />
            <InputField label="Упаковка, ₽" value={packaging} onChange={setPackaging} placeholder="30" />
            <InputField label="Реклама на продажу, ₽" value={advertising} onChange={setAdvertising} placeholder="50" />
            <InputField label={`Налог, %`} value={tax} onChange={setTax} placeholder="6" />
            <InputField label="Объём продаж, шт/мес" value={quantity} onChange={setQuantity} placeholder="30" />
          </div>

          {hasValues ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Предварительный расчёт</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Расходы на ед.</p>
                  <p className="text-xl font-bold text-gray-900">{Math.round(totalExpenses)} ₽</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Прибыль с ед.</p>
                  <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.round(profit)} ₽</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Маржинальность</p>
                  <p className={`text-xl font-bold ${margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>{margin.toFixed(1)}%</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Прибыль / мес ({qty} шт)</p>
                  <p className={`text-xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.round(totalProfit).toLocaleString()} ₽</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">* Расчёт является предварительным и не является гарантией дохода. Фактические расходы могут отличаться.</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
              Заполните закупочную цену и цену продажи для расчёта
            </div>
          )}
        </div>
        <div className="text-center mt-6">
          <Link to="/calculator" className="text-blue-600 hover:text-blue-700 font-medium">
            Полная версия калькулятора →
          </Link>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
    </div>
  );
}

function TariffsBlock({ block, tariffs }: { block: any; tariffs: any[] }) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
          <p className="text-lg text-gray-600">{block.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tariffs.map(tariff => (
            <div key={tariff.id} className={`bg-white rounded-xl p-6 shadow-sm relative ${tariff.isRecommended ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}>
              {tariff.isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Рекомендуем
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tariff.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{tariff.shortDescription}</p>
              {tariff.price !== undefined && tariff.price > 0 && (
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{tariff.price.toLocaleString()} ₽</span>
                  {tariff.period && <span className="text-sm text-gray-500 ml-1">/ {tariff.period}</span>}
                </div>
              )}
              <ul className="space-y-2 mb-6">
                {tariff.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contacts" className={`block text-center py-2.5 rounded-lg font-medium transition-colors ${tariff.isRecommended ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {tariff.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQBlock({ block, faq }: { block: any; faq: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const sorted = [...faq].sort((a, b) => a.order - b.order);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
          <p className="text-lg text-gray-600">{block.subtitle}</p>
        </div>
        <div className="space-y-3">
          {sorted.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                {openId === item.id ? <ChevronUp size={20} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
              </button>
              {openId === item.id && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormBlock({ block, onSubmit }: { block: any; onSubmit: (lead: any) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', sellerType: 'beginner', services: [] as string[], preferredContact: 'phone', comment: '' });
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !consent) return;
    onSubmit({
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      status: 'new' as const,
      sellerType: form.sellerType,
      interestedServices: form.services,
      preferredContact: form.preferredContact,
      comment: form.comment,
      notes: [],
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
            <p className="text-gray-600">Мы свяжемся с вами в течение рабочего дня. Спасибо за интерес к сотрудничеству!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">{block.title}</h2>
          <p className="text-lg text-blue-100">{block.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ваше имя" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон / мессенджер *</label>
              <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="+7 (___) ___-__-__" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ваш статус</label>
              <select value={form.sellerType} onChange={e => setForm({...form, sellerType: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="beginner">Начинающий продавец</option>
                <option value="existing">Действующий продавец</option>
                <option value="brand">Собственный бренд</option>
                <option value="other">Другое</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Интересующие услуги</label>
            <div className="flex flex-wrap gap-2">
              {['Товары из каталога', 'Производство на заказ', 'Фулфилмент', 'Создание карточек', 'Запуск магазина'].map(s => (
                <label key={s} className={`px-3 py-1.5 rounded-full text-sm cursor-pointer border transition-colors ${form.services.includes(s) ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                  <input type="checkbox" className="hidden" checked={form.services.includes(s)} onChange={() => setForm({...form, services: form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s]})} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
            <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Расскажите о ваших задачах..." />
          </div>
          <div className="mb-6">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />
              <span className="text-xs text-gray-500">Я согласен на обработку персональных данных в соответствии с <Link to="/privacy-policy" className="text-blue-600 underline">политикой конфиденциальности</Link></span>
            </label>
          </div>
          <button type="submit" disabled={!consent}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            <Send size={18} /> Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
}

function TextBlock({ block }: { block: any }) {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {block.title && <h2 className="text-2xl font-bold text-gray-900 mb-4">{block.title}</h2>}
        {block.text && <div className="prose text-gray-600" dangerouslySetInnerHTML={{ __html: block.text }} />}
      </div>
    </section>
  );
}
