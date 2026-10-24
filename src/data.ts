import { Product, Category, Tariff, Service, Lead, ContentBlock, SiteSettings, FAQItem, CalculatorDefaults } from './types';

export const defaultCategories: Category[] = [
  { id: 'cat-1', slug: 'home-3d', name: '3D-печатные товары для дома', description: 'Функциональные и декоративные изделия для интерьера', order: 1, status: 'published' },
  { id: 'cat-2', slug: 'organizers', name: 'Органайзеры и держатели', description: 'Системы хранения и организации пространства', order: 2, status: 'published' },
  { id: 'cat-3', slug: 'kitchen', name: 'Кухонные аксессуары', description: 'Полезные мелочи для кухни', order: 3, status: 'published' },
  { id: 'cat-4', slug: 'auto', name: 'Товары для автомобиля', description: 'Аксессуары для авто', order: 4, status: 'published' },
  { id: 'cat-5', slug: 'craft', name: 'Аксессуары для творчества', description: 'Инструменты и заготовки', order: 5, status: 'published' },
  { id: 'cat-6', slug: 'plywood', name: 'Фанерные заготовки', description: 'Изделия из лазерной резки', order: 6, status: 'published' },
];

export const defaultProducts: Product[] = [
  {
    id: 'prod-1', slug: 'organizer-desk', name: 'Настольный органайзер «Модуль»', sku: 'ORG-DSK-001',
    categoryId: 'cat-2', material: 'PLA пластик', color: 'Белый', weight: 180, length: 150, width: 100, height: 80,
    packageLength: 170, packageWidth: 120, packageHeight: 100, packageWeight: 30,
    country: 'Россия', productionTime: 2, productionTimeUnit: 'дня', minOrder: 10, stock: 150,
    retailPrice: 890, wholesalePrice: 320, currency: 'RUB',
    shortDescription: 'Модульный настольный органайзер для канцелярии и мелочей. Собирается в любую конфигурацию.',
    fullDescription: 'Универсальный настольный органайзер из прочного PLA-пластика. Модульная конструкция позволяет собирать комбинации под ваши задачи: для ручек, карандашей, скрепок, телефона и других мелочей. Идеально подходит для продажи на маркетплейсах как товар для дома и офиса.',
    images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1586075010923-2dd4564e0b53?w=600&h=400&fit=crop', alt: 'Настольный органайзер', isMain: true, order: 1 }],
    variants: [
      { id: 'v-1', name: 'Белый', sku: 'ORG-DSK-001-W', price: 320, stock: 80, images: [], attributes: { color: 'Белый' } },
      { id: 'v-2', name: 'Чёрный', sku: 'ORG-DSK-001-B', price: 320, stock: 50, images: [], attributes: { color: 'Чёрный' } },
      { id: 'v-3', name: 'Серый', sku: 'ORG-DSK-001-G', price: 340, stock: 20, images: [], attributes: { color: 'Серый' } },
    ],
    attributes: { 'Тип': 'Модульный', 'Способ крепления': 'Без крепления', 'Количество отсеков': '4-8' },
    seoTitle: 'Настольный органайзер модульный — купить оптом', seoDescription: 'Модульный настольный органайзер из PLA-пластика. Оптом от 10 шт. Производство в России.',
    status: 'published', isFeatured: true, createdAt: '2024-01-15', updatedAt: '2024-03-01'
  },
  {
    id: 'prod-2', slug: 'phone-holder', name: 'Держатель для телефона «Угол»', sku: 'PH-HLD-002',
    categoryId: 'cat-2', material: 'PLA пластик', color: 'Чёрный', weight: 95, length: 80, width: 70, height: 120,
    packageLength: 100, packageWidth: 90, packageHeight: 140, packageWeight: 20,
    country: 'Россия', productionTime: 1, productionTimeUnit: 'день', minOrder: 20, stock: 300,
    retailPrice: 490, wholesalePrice: 150, currency: 'RUB',
    shortDescription: 'Эргономичный держатель для смартфона с регулировкой угла наклона.',
    fullDescription: 'Компактный настольный держатель для смартфонов от 4 до 7 дюймов. Регулируемый угол наклона, прорезиненные ножки против скольжения. Подходит для видеозвонков, просмотра видео и навигации. Отличный товар для маркетплейсов с высокой маржинальностью.',
    images: [{ id: 'img-2', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop', alt: 'Держатель для телефона', isMain: true, order: 1 }],
    variants: [
      { id: 'v-4', name: 'Чёрный', sku: 'PH-HLD-002-B', price: 150, stock: 200, images: [], attributes: { color: 'Чёрный' } },
      { id: 'v-5', name: 'Белый', sku: 'PH-HLD-002-W', price: 150, stock: 100, images: [], attributes: { color: 'Белый' } },
    ],
    attributes: { 'Совместимость': '4-7 дюймов', 'Регулировка угла': 'Да', 'Антискольжение': 'Да' },
    status: 'published', isFeatured: true, createdAt: '2024-01-20', updatedAt: '2024-02-15'
  },
  {
    id: 'prod-3', slug: 'cable-organizer', name: 'Органайзер для кабелей «Порядок»', sku: 'CBL-ORG-003',
    categoryId: 'cat-1', material: 'PLA пластик', color: 'Белый', weight: 60, length: 120, width: 40, height: 30,
    packageLength: 140, packageWidth: 60, packageHeight: 40, packageWeight: 15,
    country: 'Россия', productionTime: 1, productionTimeUnit: 'день', minOrder: 30, stock: 500,
    retailPrice: 350, wholesalePrice: 95, currency: 'RUB',
    shortDescription: 'Компактный органайзер для зарядных кабелей и проводов. 5 слотов.',
    fullDescription: 'Аккуратный органайзер для кабелей с 5 отделениями разного размера. Крепится к столу на двусторонний скотч. Подходит для зарядных устройств, USB-кабелей, наушников. Высокий спрос на маркетплейсах, низкая себестоимость.',
    images: [{ id: 'img-3', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', alt: 'Органайзер для кабелей', isMain: true, order: 1 }],
    variants: [],
    attributes: { 'Количество слотов': '5', 'Крепление': 'Двусторонний скотч' },
    status: 'published', isFeatured: true, createdAt: '2024-02-01', updatedAt: '2024-02-28'
  },
  {
    id: 'prod-4', slug: 'car-phone-mount', name: 'Автомобильный держатель «Клип»', sku: 'CAR-MNT-004',
    categoryId: 'cat-4', material: 'ABS пластик', color: 'Чёрный', weight: 120, length: 90, width: 70, height: 110,
    packageLength: 110, packageWidth: 90, packageHeight: 130, packageWeight: 25,
    country: 'Россия', productionTime: 2, productionTimeUnit: 'дня', minOrder: 15, stock: 80,
    retailPrice: 690, wholesalePrice: 250, currency: 'RUB',
    shortDescription: 'Универсальный автомобильный держатель для телефона на вентиляционную решётку.',
    fullDescription: 'Надёжный автомобильный держатель с креплением на вентиляционную решётку. Поворот на 360°, одна рука для установки телефона. Совместим со смартфонами 4.7-6.8 дюймов. Магнитное или механическое крепление на выбор.',
    images: [{ id: 'img-4', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop', alt: 'Автомобильный держатель', isMain: true, order: 1 }],
    variants: [
      { id: 'v-6', name: 'Механический', sku: 'CAR-MNT-004-M', price: 250, stock: 50, images: [], attributes: { type: 'Механический' } },
      { id: 'v-7', name: 'Магнитный', sku: 'CAR-MNT-004-MG', price: 280, stock: 30, images: [], attributes: { type: 'Магнитный' } },
    ],
    attributes: { 'Поворот': '360°', 'Совместимость': '4.7-6.8"' },
    status: 'published', isFeatured: false, createdAt: '2024-02-10', updatedAt: '2024-03-05'
  },
  {
    id: 'prod-5', slug: 'cookie-cutters-set', name: 'Набор формочек для печенья «Праздник»', sku: 'CKI-SET-005',
    categoryId: 'cat-3', material: 'PETG пластик', color: 'Разноцветный', weight: 150, length: 200, width: 150, height: 30,
    packageLength: 220, packageWidth: 170, packageHeight: 40, packageWeight: 20,
    country: 'Россия', productionTime: 3, productionTimeUnit: 'дня', minOrder: 10, stock: 60,
    retailPrice: 590, wholesalePrice: 180, currency: 'RUB',
    shortDescription: 'Набор из 6 фигурных формочек для печенья. Безопасный пищевой пластик.',
    fullDescription: 'Набор из 6 формочек для печенья: ёлочка, звезда, сердечко, круг, домик, снежинка. Изготовлены из пищевого PETG-пластика, безопасны при контакте с пищевыми продуктами. Яркая подарочная упаковка в комплекте.',
    images: [{ id: 'img-5', url: 'https://images.unsplash.com/photo-1558303009-46a38d85c86f?w=600&h=400&fit=crop', alt: 'Формочки для печенья', isMain: true, order: 1 }],
    variants: [],
    attributes: { 'Количество в наборе': '6', 'Пищевой пластик': 'Да', 'Упаковка': 'Подарочная коробка' },
    status: 'published', isFeatured: true, createdAt: '2024-02-15', updatedAt: '2024-03-01'
  },
  {
    id: 'prod-6', slug: 'plywood-box-decor', name: 'Фанерная шкатулка «Узор» для декорирования', sku: 'PLY-BOX-006',
    categoryId: 'cat-6', material: 'Фанера 3мм', color: 'Натуральный', weight: 200, length: 150, width: 100, height: 60,
    packageLength: 170, packageWidth: 120, packageHeight: 80, packageWeight: 30,
    country: 'Россия', productionTime: 1, productionTimeUnit: 'день', minOrder: 20, stock: 200,
    retailPrice: 450, wholesalePrice: 120, currency: 'RUB',
    shortDescription: 'Разборная фанерная шкатулка с ажурными узорами для декорирования.',
    fullDescription: 'Шкатулка из берёзовой фанеры 3мм с лазерной резкой. Поставляется в разобранном виде — идеально для творческих мастерских, хобби-маркетплейсов. Можно декорировать красками, декупажем, выжиганием.',
    images: [{ id: 'img-6', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop', alt: 'Фанерная шкатулка', isMain: true, order: 1 }],
    variants: [
      { id: 'v-8', name: 'Малая', sku: 'PLY-BOX-006-S', price: 120, stock: 120, images: [], attributes: { size: '15×10×6 см' } },
      { id: 'v-9', name: 'Большая', sku: 'PLY-BOX-006-L', price: 180, stock: 80, images: [], attributes: { size: '20×15×8 см' } },
    ],
    attributes: { 'Материал': 'Берёзовая фанера 3мм', 'Сборка': 'Без клея, паз-шип' },
    status: 'published', isFeatured: false, createdAt: '2024-02-20', updatedAt: '2024-03-02'
  },
];

export const defaultTariffs: Tariff[] = [
  {
    id: 'tar-1', name: 'Самостоятельный старт', shortDescription: 'Для тех, кто хочет начать самостоятельно',
    price: 0, period: '', 
    features: ['Доступ к полному каталогу товаров', 'Материалы для карточек (фото, описания)', 'Оптовые цены от производителя', 'Базовые консультации', 'Минимальная партия от 10 шт.'],
    limitations: ['Без помощи с оформлением карточек', 'Самостоятельное управление магазином'],
    buttonText: 'Начать сотрудничество', isRecommended: false, order: 1, status: 'published'
  },
  {
    id: 'tar-2', name: 'Магазин под ключ', shortDescription: 'Полное сопровождение запуска продаж',
    price: 15000, period: 'единоразово',
    features: ['Всё из тарифа «Старт»', 'Помощь с регистрацией на маркетплейсе', 'Создание карточек товаров', 'Настройка поставок', 'Консультации по продвижению', 'Приоритетная поддержка'],
    limitations: ['Сопровождение на этапе запуска'],
    buttonText: 'Запустить магазин', isRecommended: true, order: 2, status: 'published'
  },
  {
    id: 'tar-3', name: 'Производственный партнёр', shortDescription: 'Для масштабных продавцов',
    price: 0, period: 'индивидуальные условия',
    features: ['Всё из тарифа «Магазин под ключ»', 'Изготовление по вашим моделям', 'Производство под ваши заказы', 'Условия хранения на складе', 'Услуги фулфилмента', 'Персональный менеджер', 'Отсрочка оплаты'],
    limitations: ['Обсуждаются индивидуально'],
    buttonText: 'Обсудить условия', isRecommended: false, order: 3, status: 'published'
  },
];

export const defaultServices: Service[] = [
  { id: 'srv-1', slug: '3d-printing', name: '3D-печать изделий', shortDescription: 'Печать пластиковых изделий на заказ по вашим моделям', fullDescription: 'Производство изделий методом FDM 3D-печати. Работаем с PLA, ABS, PETG, TPU. Точность до 0.1мм. Подходит для мелкосерийного производства и прототипирования.', price: 'от 50 ₽/шт', order: 1, status: 'published' },
  { id: 'srv-2', slug: 'laser-cutting', name: 'Лазерная резка', shortDescription: 'Резка и гравировка фанеры, акрила, кожи', fullDescription: 'Лазерная резка листовых материалов: фанера до 10мм, акрил до 8мм, картон, кожа. Высокая точность, чистый рез. Гравировка логотипов и текстов.', price: 'от 30 ₽/деталь', order: 2, status: 'published' },
  { id: 'srv-3', slug: 'fulfillment', name: 'Фулфилмент', shortDescription: 'Хранение, упаковка и отгрузка товаров на маркетплейсы', fullDescription: 'Полный цикл фулфилмента: приёмка товара, хранение на складе, комплектация заказов, маркировка, упаковка по требованиям маркетплейсов, отгрузка на склады WB, Ozon, Яндекс Маркет.', price: 'от 35 ₽/отправка', order: 3, status: 'published' },
  { id: 'srv-4', slug: 'card-creation', name: 'Создание карточек', shortDescription: 'Профессиональные фото и описания для маркетплейсов', fullDescription: 'Создание продающих карточек товаров: предметная фотосъёмка, инфографика, SEO-оптимизированные описания, подбор ключевых слов. Увеличиваем конверсию карточек.', price: 'от 3000 ₽/карточка', order: 4, status: 'published' },
  { id: 'srv-5', slug: 'custom-production', name: 'Производство по вашим чертежам', shortDescription: 'Изготовление изделий по вашим 3D-моделям и ТЗ', fullDescription: 'Производство изделий по вашим 3D-моделям, чертежам или техническому заданию. Поможем с доработкой модели, подбором материала и оптимизацией для производства.', price: 'по согласованию', order: 5, status: 'published' },
];

export const defaultFAQ: FAQItem[] = [
  { id: 'faq-1', question: 'Нужно ли покупать оборудование?', answer: 'Нет. Мы производим товары на собственном оборудовании. Вы получаете готовые изделия для продажи — не нужно покупать 3D-принтеры, лазерные станки или другое оборудование.', order: 1 },
  { id: 'faq-2', question: 'Как получить фотографии товаров?', answer: 'Для каждого товара из каталога мы предоставляем набор фотографий, описаний и характеристик, которые можно использовать для создания карточек на маркетплейсах. Материалы доступны после регистрации.', order: 2 },
  { id: 'faq-3', question: 'Можно ли продавать на нескольких площадках?', answer: 'Да, вы можете продавать наши товары на Wildberries, Ozon, Яндекс Маркете, Авито и любых других площадках одновременно.', order: 3 },
  { id: 'faq-4', question: 'Есть ли минимальная партия?', answer: 'Минимальная партия зависит от товара и обычно составляет от 10 до 30 штук. Точные условия указаны в карточке каждого товара.', order: 4 },
  { id: 'faq-5', question: 'Можно ли заказать производство собственного изделия?', answer: 'Да. Мы принимаем заказы на изготовление по вашим 3D-моделям, чертежам или техническому заданию. Свяжитесь с нами для обсуждения.', order: 5 },
  { id: 'faq-6', question: 'Как рассчитывается стоимость фулфилмента?', answer: 'Стоимость зависит от объёма, веса, габаритов и набора услуг. Базовая стоимость — от 35 ₽ за отправку. Точный расчёт предоставим по запросу.', order: 6 },
  { id: 'faq-7', question: 'Кто отвечает за создание карточек?', answer: 'Вы можете создать карточки самостоятельно, используя наши материалы. Либо заказать услугу «Создание карточек» — мы подготовим профессиональные фото и описания.', order: 7 },
  { id: 'faq-8', question: 'Можно ли работать только с производством?', answer: 'Да. Если у вас уже есть налаженные продажи, вы можете заказывать у нас только производство товаров. Мы не навязываем дополнительные услуги.', order: 8 },
  { id: 'faq-9', question: 'Как рассчитать потенциальную прибыль?', answer: 'Используйте наш калькулятор экономики — введите закупочную цену, цену продажи, комиссию площадки и другие расходы. Калькулятор покажет предварительную маржинальность.', order: 9 },
];

export const defaultBlocks: ContentBlock[] = [
  { id: 'blk-1', type: 'hero', title: 'Запустите продажи на маркетплейсах без собственного производства', subtitle: 'Готовые товары, материалы для карточек, производство под заказ и фулфилмент. Вы развиваете продажи — мы помогаем с изготовлением и логистикой.', buttonText: 'Выбрать товары', buttonLink: '/catalog', order: 1, visible: true, data: { buttonText2: 'Условия сотрудничества', buttonLink2: '/pricing' } },
  { id: 'blk-2', type: 'steps', title: 'Как это работает', subtitle: 'Четыре простых шага до первых продаж', order: 2, visible: true, data: { steps: [
    { title: 'Выберите товары', text: 'Изучите каталог и выберите позиции для продажи' },
    { title: 'Получите материалы', text: 'Фотографии, описания и характеристики для карточек' },
    { title: 'Создайте карточки', text: 'Разместите товары на выбранных маркетплейсах' },
    { title: 'Закажите производство', text: 'Мы изготовим и доставим товары по согласованным условиям' },
  ] } },
  { id: 'blk-3', type: 'advantages', title: 'Почему это удобно', subtitle: 'Преимущества работы с нами', order: 3, visible: true, data: { items: [
    { title: 'Без оборудования', text: 'Не нужно покупать 3D-принтер или лазерный станок' },
    { title: 'Без организации производства', text: 'Мы берём изготовление на себя' },
    { title: 'Готовый каталог', text: 'Выбирайте из проверенных товаров' },
    { title: 'Тестирование спроса', text: 'Небольшие партии для проверки гипотез' },
    { title: 'Материалы для карточек', text: 'Фото и описания для маркетплейсов' },
    { title: 'Фулфилмент', text: 'Хранение, упаковка и отгрузка' },
  ] } },
  { id: 'blk-4', type: 'featured-products', title: 'Популярные товары', subtitle: 'Товары, которые хорошо продаются на маркетплейсах', order: 4, visible: true },
  { id: 'blk-5', type: 'calculator', title: 'Калькулятор экономики', subtitle: 'Оцените потенциальную прибыль до начала продаж', order: 5, visible: true },
  { id: 'blk-6', type: 'tariffs', title: 'Тарифы сотрудничества', subtitle: 'Выберите подходящий формат работы', order: 6, visible: true },
  { id: 'blk-7', type: 'faq', title: 'Частые вопросы', subtitle: 'Ответы на популярные вопросы о сотрудничестве', order: 7, visible: true },
  { id: 'blk-8', type: 'form', title: 'Получите каталог товаров и условия сотрудничества', subtitle: 'Оставьте заявку — мы свяжемся с вами в течение рабочего дня', order: 8, visible: true },
];

export const defaultSettings: SiteSettings = {
  siteName: 'Производство для продавцов',
  phone: '+7 (900) 123-45-67',
  email: 'partner@example.com',
  telegram: '@production_partner',
  whatsapp: '+79001234567',
  address: 'Россия, г. Москва',
  headerText: 'Производство и фулфилмент для продавцов маркетплейсов',
  footerText: '© 2024 Производство для продавцов маркетплейсов. Все права защищены.',
};

export const defaultCalculatorDefaults: CalculatorDefaults = {
  commissionPercent: 15,
  logisticsCost: 80,
  packagingCost: 30,
  advertisingCost: 50,
  taxPercent: 6,
};

export const defaultLeads: Lead[] = [
  {
    id: 'lead-1', createdAt: '2024-03-01T10:30:00', name: 'Алексей Петров', phone: '+7 (911) 222-33-44', email: 'alexey@mail.ru',
    status: 'new', sellerType: 'beginner', interestedServices: ['catalog', 'fulfillment'], preferredContact: 'telegram',
    comment: 'Хочу начать продавать на Wildberries. Интересуют органайзеры и держатели.',
    utmSource: 'telegram', utmCampaign: 'spring_sale', notes: [],
  },
  {
    id: 'lead-2', createdAt: '2024-03-02T14:15:00', name: 'Мария Иванова', phone: '+7 (922) 333-44-55', email: 'maria@shop.ru',
    status: 'contact', sellerType: 'existing', interestedServices: ['custom', 'fulfillment'], preferredContact: 'phone',
    comment: 'Уже продаю на Ozon. Нужны новые позиции и фулфилмент.',
    notes: [{ id: 'n-1', text: 'Перезвонить во вторник', createdAt: '2024-03-02T16:00:00', author: 'admin' }],
  },
];
