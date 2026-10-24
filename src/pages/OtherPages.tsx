import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ArrowRight, Package, Truck, Zap, Shield, Camera, Wrench, Box, Calculator, Phone, Mail, MapPin, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useStore } from '../store';

// ============ SERVICES PAGE ============
export function ServicesPage() {
  const { services } = useStore();
  const published = services.filter(s => s.status === 'published').sort((a, b) => a.order - b.order);
  const icons = [Wrench, Box, Truck, Camera, Zap];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Услуги производства и фулфилмента</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Полный цикл от производства до доставки товара покупателю. Выберите нужные услуги или комбинацию.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {published.map((service, i) => {
          const Icon = icons[i] || Package;
          return (
            <div key={service.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">{service.price}</p>
              <Link to="/contacts" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                Подробнее <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ SERVICE DETAIL PAGE ============
export function ServicePage() {
  const { slug } = useParams();
  const { services } = useStore();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Услуга не найдена</h1>
        <Link to="/services" className="text-blue-600">← Вернуться к услугам</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/services" className="text-blue-600 hover:text-blue-700 text-sm mb-6 inline-block">← Все услуги</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
      <p className="text-xl text-gray-600 mb-6">{service.shortDescription}</p>
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
        <p className="text-2xl font-bold text-blue-600 mt-4">{service.price}</p>
      </div>
      <Link to="/contacts" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
        Заказать услугу <ArrowRight size={18} className="ml-2" />
      </Link>
    </div>
  );
}

// ============ PRICING PAGE ============
export function PricingPage() {
  const { tariffs } = useStore();
  const published = tariffs.filter(t => t.status === 'published').sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Тарифы сотрудничества</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Выберите формат работы, который подходит вашим задачам. Все условия обсуждаемы.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {published.map(tariff => (
          <div key={tariff.id} className={`bg-white rounded-xl p-6 relative ${tariff.isRecommended ? 'ring-2 ring-blue-600 shadow-xl scale-105' : 'shadow-sm border border-gray-200'}`}>
            {tariff.isRecommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Рекомендуем</div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{tariff.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{tariff.shortDescription}</p>
            {tariff.price !== undefined && tariff.price > 0 ? (
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{tariff.price?.toLocaleString()} ₽</span>
                {tariff.period && <span className="text-gray-500 ml-1">/ {tariff.period}</span>}
              </div>
            ) : (
              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">Бесплатно</span>
                {tariff.period && <p className="text-sm text-gray-500">{tariff.period}</p>}
              </div>
            )}
            <ul className="space-y-2 mb-6">
              {tariff.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            {tariff.limitations?.map((l, i) => (
              <p key={i} className="text-xs text-gray-400 mb-1">• {l}</p>
            ))}
            <Link to="/contacts" className={`block text-center py-2.5 rounded-lg font-medium mt-4 transition-colors ${tariff.isRecommended ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {tariff.buttonText}
            </Link>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Сравнение тарифов</h2>
        <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Возможность</th>
              {published.map(t => <th key={t.id} className="px-4 py-3 font-semibold text-gray-700 text-center">{t.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {['Доступ к каталогу', 'Материалы для карточек', 'Оптовые цены', 'Помощь с регистрацией', 'Создание карточек', 'Настройка поставок', 'Производство на заказ', 'Фулфилмент', 'Персональный менеджер'].map((feature, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                <td className="px-4 py-3 text-gray-700">{feature}</td>
                {published.map(t => (
                  <td key={t.id} className="px-4 py-3 text-center">
                    {t.features.some(f => f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])) ? (
                      <Check size={18} className="text-green-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ HOW IT WORKS PAGE ============
export function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Как мы работаем</h1>
        <p className="text-lg text-gray-600">Простой и понятный процесс от первого обращения до получения товара</p>
      </div>
      <div className="space-y-8">
        {[
          { step: 1, title: 'Оставляете заявку', text: 'Заполняете форму на сайте или пишете в мессенджер. Мы обсуждаем ваши задачи и подбираем оптимальный формат сотрудничества.', icon: Send },
          { step: 2, title: 'Получаете каталог и условия', text: 'Отправляем актуальный каталог товаров с ценами, минимальными партиями и сроками производства. Обсуждаем индивидуальные условия.', icon: Package },
          { step: 3, title: 'Выбираете товары', text: 'Определяете позиции для продажи. Получаете фотографии, описания и характеристики для создания карточек.', icon: Check },
          { step: 4, title: 'Создаёте карточки', text: 'Размещаете товары на маркетплейсах. Мы помогаем с материалами или берём это на себя (по тарифу).', icon: Camera },
          { step: 5, title: 'Заказываете производство', text: 'Согласовываем партию, сроки и условия оплаты. Запускаем производство.', icon: Wrench },
          { step: 6, title: 'Получаете товар', text: 'Отгружаем готовую продукцию на склад маркетплейса или по вашему адресу. Доступен фулфилмент.', icon: Truck },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-12">
        <Link to="/contacts" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Начать сотрудничество <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

// ============ CALCULATOR PAGE ============
export function CalculatorPage() {
  const { calculatorDefaults } = useStore();
  const [form, setForm] = useState({
    purchasePrice: '', sellPrice: '', commission: String(calculatorDefaults.commissionPercent),
    logistics: String(calculatorDefaults.logisticsCost), packaging: String(calculatorDefaults.packagingCost),
    advertising: String(calculatorDefaults.advertisingCost), tax: String(calculatorDefaults.taxPercent),
    other: '0', quantity: '30', quantity2: '100', quantity3: '300',
  });

  const pp = parseFloat(form.purchasePrice) || 0;
  const sp = parseFloat(form.sellPrice) || 0;
  const commP = parseFloat(form.commission) || 0;
  const log = parseFloat(form.logistics) || 0;
  const pack = parseFloat(form.packaging) || 0;
  const adv = parseFloat(form.advertising) || 0;
  const taxP = parseFloat(form.tax) || 0;
  const other = parseFloat(form.other) || 0;

  const commissionAmount = sp * commP / 100;
  const taxAmount = sp * taxP / 100;
  const totalExpenses = pp + commissionAmount + log + pack + adv + taxAmount + other;
  const profit = sp - totalExpenses;
  const margin = sp > 0 ? (profit / sp * 100) : 0;
  const qty = parseInt(form.quantity) || 0;
  const qty2 = parseInt(form.quantity2) || 0;
  const qty3 = parseInt(form.quantity3) || 0;
  const hasValues = pp > 0 && sp > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Калькулятор экономики товара</h1>
        <p className="text-lg text-gray-600">Оцените предварительную прибыль от продажи товара на маркетплейсе</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Вводные данные</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Закупочная цена, ₽', key: 'purchasePrice', placeholder: '320' },
            { label: 'Цена продажи, ₽', key: 'sellPrice', placeholder: '890' },
            { label: 'Комиссия площадки, %', key: 'commission', placeholder: '15' },
            { label: 'Логистика, ₽', key: 'logistics', placeholder: '80' },
            { label: 'Упаковка, ₽', key: 'packaging', placeholder: '30' },
            { label: 'Реклама на продажу, ₽', key: 'advertising', placeholder: '50' },
            { label: 'Налог, %', key: 'tax', placeholder: '6' },
            { label: 'Прочие расходы, ₽', key: 'other', placeholder: '0' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input type="number" value={(form as any)[field.key]} onChange={e => setForm({...form, [field.key]: e.target.value})}
                placeholder={field.placeholder} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          ))}
        </div>

        {hasValues ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Результат расчёта</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Расходы на единицу</p>
                <p className="text-2xl font-bold text-red-600">{Math.round(totalExpenses)} ₽</p>
              </div>
              <div className={`rounded-xl p-4 text-center ${profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="text-sm text-gray-500">Прибыль с единицы</p>
                <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.round(profit)} ₽</p>
              </div>
              <div className={`rounded-xl p-4 text-center ${margin >= 20 ? 'bg-green-50' : margin >= 0 ? 'bg-yellow-50' : 'bg-red-50'}`}>
                <p className="text-sm text-gray-500">Маржинальность</p>
                <p className={`text-2xl font-bold ${margin >= 20 ? 'text-green-600' : margin >= 0 ? 'text-yellow-600' : 'text-red-600'}`}>{margin.toFixed(1)}%</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Выручка с единицы</p>
                <p className="text-2xl font-bold text-blue-600">{sp} ₽</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-3">Сценарии по объёму продаж</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: `${qty} шт/мес`, qty: qty },
                { label: `${qty2} шт/мес`, qty: qty2 },
                { label: `${qty3} шт/мес`, qty: qty3 },
              ].map((scenario, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">{scenario.label}</p>
                  <p className={`text-xl font-bold ${profit * scenario.qty >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.round(profit * scenario.qty).toLocaleString()} ₽
                  </p>
                  <p className="text-xs text-gray-400">прибыль в месяц</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Важно:</strong> Данный расчёт является предварительным. Фактические расходы могут отличаться в зависимости от категории товара, региона, сезона и других факторов. Это не является гарантией дохода.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
            <Calculator size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Заполните закупочную цену и цену продажи для расчёта</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ FOR SELLERS PAGE ============
export function ForSellersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Для действующих продавцов</h1>
        <p className="text-lg text-gray-600">Расширяйте ассортимент без вложений в собственное оборудование</p>
      </div>
      <div className="space-y-6">
        {[
          { title: 'Новые позиции для ассортимента', text: 'Добавляйте товары из нашего каталога без рисков и вложений в производство. Более 50 позиций с регулярным обновлением.' },
          { title: 'Небольшие партии', text: 'Начинайте с минимальных партий от 10 штук. Тестируйте спрос и масштабируйтесь по мере роста продаж.' },
          { title: 'Готовые материалы', text: 'Получайте фотографии, описания и характеристики для быстрого создания карточек на любой площадке.' },
          { title: 'Стабильное производство', text: 'Собственное производство обеспечивает стабильные сроки и качество. Вы не зависите от сторонних поставщиков.' },
          { title: 'Фулфилмент', text: 'Делегируйте хранение, упаковку и отгрузку нам. Сосредоточьтесь на развитии продаж и маркетинге.' },
          { title: 'Производство по вашим моделям', text: 'Есть идея для нового товара? Мы изготовим его по вашей 3D-модели или техническому заданию.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Check size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/catalog" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Смотреть каталог <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

// ============ FOR BEGINNERS PAGE ============
export function ForBeginnersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Для начинающих продавцов</h1>
        <p className="text-lg text-gray-600">Запустите продажи на маркетплейсах без покупки оборудования и организации производства</p>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Почему это работает для новичков?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            'Не нужно покупать 3D-принтер или другое оборудование',
            'Не нужно разбираться в производстве и материалах',
            'Можно начать с небольшого бюджета',
            'Получаете готовые материалы для карточек',
            'Тестируете спрос небольшими партиями',
            'Мы помогаем с запуском (по тарифу «Магазин под ключ»)',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">С чего начать?</h2>
      <div className="space-y-4">
        {[
          { step: 1, title: 'Изучите каталог', text: 'Посмотрите доступные товары, их характеристики и цены. Обратите внимание на рекомендуемую розничную цену.' },
          { step: 2, title: 'Рассчитайте экономику', text: 'Используйте калькулятор для оценки потенциальной прибыли. Учтите комиссию площадки, логистику и другие расходы.' },
          { step: 3, title: 'Оставьте заявку', text: 'Заполните форму — мы расскажем об условиях, поможем выбрать товары и ответим на вопросы.' },
          { step: 4, title: 'Начните продавать', text: 'Получите товары и материалы, создайте карточки и запустите продажи. Мы рядом на каждом этапе.' },
        ].map(item => (
          <div key={item.step} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">{item.step}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/calculator" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mr-4">
          Рассчитать прибыль
        </Link>
        <Link to="/contacts" className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
          Оставить заявку
        </Link>
      </div>
    </div>
  );
}

// ============ CUSTOM PRODUCTION PAGE ============
export function CustomProductionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Производство по индивидуальным заказам</h1>
        <p className="text-lg text-gray-600">Изготовление изделий по вашим моделям, чертежам и техническому заданию</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Wrench size={32} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-3">3D-печать</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• FDM-печать из PLA, ABS, PETG, TPU</li>
            <li>• Точность до 0.1 мм</li>
            <li>• Прототипы и мелкосерийное производство</li>
            <li>• Помощь с подготовкой модели</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Box size={32} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-3">Лазерная резка</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Фанера до 10 мм</li>
            <li>• Акрил до 8 мм</li>
            <li>• Картон, кожа, ткань</li>
            <li>• Гравировка логотипов</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-3">Как заказать?</h3>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>Отправьте нам 3D-модель (STL, STEP), чертёж или техническое задание</li>
          <li>Мы оценим стоимость и сроки производства</li>
          <li>Согласуем материал, цвет и другие параметры</li>
          <li>Изготовим образец для утверждения (при необходимости)</li>
          <li>Запустим серийное производство</li>
        </ol>
      </div>
      <div className="text-center">
        <Link to="/contacts" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Обсудить заказ <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

// ============ FAQ PAGE ============
export function FAQPage() {
  const { faq } = useStore();
  const [openId, setOpenId] = useState<string | null>(null);
  const sorted = [...faq].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Частые вопросы</h1>
        <p className="text-lg text-gray-600">Ответы на популярные вопросы о сотрудничестве</p>
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
      <div className="text-center mt-10">
        <p className="text-gray-600 mb-4">Не нашли ответ на свой вопрос?</p>
        <Link to="/contacts" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Связаться с нами
        </Link>
      </div>
    </div>
  );
}

// ============ CONTACTS PAGE ============
export function ContactsPage() {
  const { settings, addLead } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', sellerType: 'beginner', services: [] as string[], preferredContact: 'phone', comment: '' });
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !consent) return;
    addLead({
      id: `lead-${Date.now()}`, createdAt: new Date().toISOString(), name: form.name, phone: form.phone,
      email: form.email || undefined, status: 'new' as const, sellerType: form.sellerType,
      interestedServices: form.services, preferredContact: form.preferredContact, comment: form.comment, notes: [],
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Контакты</h1>
        <p className="text-lg text-gray-600">Свяжитесь с нами удобным способом</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Phone size={20} className="text-blue-600" /></div>
              <div><p className="text-sm text-gray-500">Телефон</p><a href={`tel:${settings.phone}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">{settings.phone}</a></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Mail size={20} className="text-blue-600" /></div>
              <div><p className="text-sm text-gray-500">E-mail</p><a href={`mailto:${settings.email}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">{settings.email}</a></div>
            </div>
            {settings.telegram && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><span className="text-blue-600 text-xl">💬</span></div>
                <div><p className="text-sm text-gray-500">Telegram</p><a href={`https://t.me/${settings.telegram.replace('@', '')}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">{settings.telegram}</a></div>
              </div>
            )}
            {settings.address && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><MapPin size={20} className="text-blue-600" /></div>
                <div><p className="text-sm text-gray-500">Адрес</p><p className="text-lg font-semibold text-gray-900">{settings.address}</p></div>
              </div>
            )}
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <Check size={48} className="mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
              <p className="text-gray-600">Мы свяжемся с вами в течение рабочего дня.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Оставить заявку</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                  <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                  <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={3} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Расскажите о ваших задачах..." />
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />
                  <span className="text-xs text-gray-500">Согласен на <Link to="/privacy-policy" className="text-blue-600 underline">обработку персональных данных</Link></span>
                </label>
                <button type="submit" disabled={!consent} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors">
                  Отправить заявку
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ LEGAL PAGES ============
export function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Политика конфиденциальности</h1>
      <div className="prose text-gray-600 space-y-4">
        <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">1. Общие положения</h2>
        <p>Мы обрабатываем персональные данные в соответствии с Федеральным законом №152-ФЗ «О персональных данных».</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">2. Какие данные мы собираем</h2>
        <p>Имя, телефон, электронная почта, информация о заявках и обращениях.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">3. Цели обработки</h2>
        <p>Обработка данных осуществляется для связи с пользователями, обработки заявок, предоставления услуг.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">4. Защита данных</h2>
        <p>Мы принимаем необходимые организационные и технические меры для защиты персональных данных.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">5. Контакты</h2>
        <p>По вопросам обработки персональных данных обращайтесь по электронной почте, указанной в разделе контактов.</p>
      </div>
    </div>
  );
}

export function PersonalDataConsentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Согласие на обработку персональных данных</h1>
      <div className="prose text-gray-600 space-y-4">
        <p>Я, пользователь сайта, оставляя заявку или регистрируясь на сайте, даю согласие на обработку моих персональных данных.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Перечень данных</h2>
        <p>Фамилия, имя, телефон, адрес электронной почты, информация о заявках.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Цели обработки</h2>
        <p>Обработка заявок, связь с пользователем, предоставление информации об услугах.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Срок действия согласия</h2>
        <p>Согласие действует до момента его отзыва путём направления письменного уведомления.</p>
      </div>
    </div>
  );
}
