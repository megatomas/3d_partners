import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Package, Grid, List, ChevronRight, ArrowLeft, ShoppingCart, Copy, Download } from 'lucide-react';
import { useStore } from '../store';

export function CatalogPage() {
  const { products, categories } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const publishedProducts = products.filter(p => p.status === 'published');
  const publishedCategories = categories.filter(c => c.status === 'published').sort((a, b) => a.order - b.order);

  const filtered = useMemo(() => {
    let result = publishedProducts;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categoryId === selectedCategory);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s));
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.wholesalePrice - b.wholesalePrice); break;
      case 'price-desc': result.sort((a, b) => b.wholesalePrice - a.wholesalePrice); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [publishedProducts, selectedCategory, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог товаров</h1>
        <p className="text-gray-600">Готовые товары для продажи на маркетплейсах. Оптом от производителя.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Filter size={16} /> Фильтры</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="all">Все категории</option>
                {publishedCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Сортировка</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="name">По названию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
              </select>
            </div>

            <div className="text-sm text-gray-500">
              Найдено: {filtered.length} товаров
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Search */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию или артикулу..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
                <Grid size={18} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Товары не найдены. Попробуйте изменить фильтры.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(product => (
                <Link key={product.id} to={`/catalog/${product.slug}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-gray-100">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400"><Package size={48} /></div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">{product.sku}</p>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{product.wholesalePrice} ₽</p>
                        <p className="text-xs text-gray-500">от {product.minOrder} шт.</p>
                      </div>
                      {product.retailPrice && (
                        <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">РРЦ {product.retailPrice} ₽</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(product => (
                <Link key={product.id} to={`/catalog/${product.slug}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex gap-4 border border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.images?.[0] ? (
                      <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400"><Package size={24} /></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-blue-600 font-medium">{product.sku}</p>
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.shortDescription}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-gray-900">{product.wholesalePrice} ₽</p>
                    <p className="text-xs text-gray-500">от {product.minOrder} шт.</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const { products, categories, addLead } = useStore();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Товар не найден</h1>
        <p className="text-gray-600 mb-6">Возможно, товар был удалён или перемещён.</p>
        <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-medium">← Вернуться в каталог</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight size={14} />
        <Link to="/catalog" className="hover:text-blue-600">Каталог</Link>
        <ChevronRight size={14} />
        {category && <><Link to="/catalog" className="hover:text-blue-600">{category.name}</Link><ChevronRight size={14} /></>}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
            {product.images?.[selectedImage] ? (
              <img src={product.images[selectedImage].url} alt={product.images[selectedImage].alt} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400"><Package size={64} /></div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={img.id} onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${i === selectedImage ? 'border-blue-600' : 'border-transparent'}`}>
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-blue-600 font-medium mb-1">Артикул: {product.sku}</p>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.shortDescription}</p>

          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Оптовая цена</p>
                <p className="text-3xl font-bold text-gray-900">{product.wholesalePrice} ₽</p>
              </div>
              {product.retailPrice && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Рекомендуемая розничная</p>
                  <p className="text-xl font-semibold text-green-600">{product.retailPrice} ₽</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Мин. партия:</span> <span className="font-medium">{product.minOrder} шт.</span></div>
              <div><span className="text-gray-500">Срок производства:</span> <span className="font-medium">{product.productionTime} {product.productionTimeUnit}</span></div>
              {product.material && <div><span className="text-gray-500">Материал:</span> <span className="font-medium">{product.material}</span></div>}
              {product.weight && <div><span className="text-gray-500">Вес:</span> <span className="font-medium">{product.weight} г</span></div>}
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/contacts" className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> Запросить условия
            </Link>
            <button onClick={() => setShowOrderForm(!showOrderForm)} className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Подробнее
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6 overflow-x-auto">
          {[
            { id: 'description', label: 'Описание' },
            { id: 'characteristics', label: 'Характеристики' },
            { id: 'variants', label: `Варианты (${product.variants?.length || 0})` },
            { id: 'materials', label: 'Материалы для продажи' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        {activeTab === 'description' && (
          <div className="prose max-w-none text-gray-600">
            <p>{product.fullDescription}</p>
          </div>
        )}

        {activeTab === 'characteristics' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Артикул', product.sku],
                  ['EAN/GTIN', product.ean],
                  ['Бренд', product.brand],
                  ['Модель', product.model],
                  ['ТН ВЭД', product.tnved],
                  ['ОКПД-2', product.okpd2],
                  ['Материал', product.material],
                  ['Цвет', product.color],
                  ['Вес изделия', product.weight ? `${product.weight} г` : null],
                  ['Вес упаковки', product.packageWeight ? `${product.packageWeight} г` : null],
                  ['Размеры (Д×Ш×В)', product.length ? `${product.length}×${product.width}×${product.height} мм` : null],
                  ['Размеры упаковки', product.packageLength ? `${product.packageLength}×${product.packageWidth}×${product.packageHeight} мм` : null],
                  ['Комплектация', product.kit],
                  ['Единиц в наборе', product.unitsInSet],
                  ['Страна производства', product.country],
                  ['Срок изготовления', product.productionTime ? `${product.productionTime} ${product.productionTimeUnit}` : null],
                  ...Object.entries(product.attributes || {}).map(([k, v]) => [k, v] as [string, any]),
                ].filter(([, v]) => v).map(([label, value], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 text-gray-500 w-1/3">{label}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'variants' && product.variants && product.variants.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.variants.map(variant => (
              <div key={variant.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{variant.name}</h4>
                {variant.sku && <p className="text-xs text-gray-500 mb-1">Артикул: {variant.sku}</p>}
                {variant.price && <p className="text-lg font-bold text-gray-900">{variant.price} ₽</p>}
                {variant.stock !== undefined && <p className="text-xs text-gray-500">В наличии: {variant.stock} шт.</p>}
                {Object.entries(variant.attributes).map(([k, v]) => (
                  <p key={k} className="text-xs text-gray-500 mt-1">{k}: {v}</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Материалы для карточек</h3>
              <p className="text-sm text-gray-600 mb-4">Используйте готовые материалы для создания карточек на маркетплейсах.</p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Описание товара</p>
                    <p className="text-xs text-gray-500">Готовый текст для карточки</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"><Copy size={14} /> Копировать</button>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Характеристики</p>
                    <p className="text-xs text-gray-500">Для копирования в карточку</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"><Copy size={14} /> Копировать</button>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Фотографии для маркетплейса</p>
                    <p className="text-xs text-gray-500">Набор изображений</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"><Download size={14} /> Скачать</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link to="/catalog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
          <ArrowLeft size={16} className="mr-2" /> Вернуться в каталог
        </Link>
      </div>
    </div>
  );
}
