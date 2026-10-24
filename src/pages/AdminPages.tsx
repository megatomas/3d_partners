import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderOpen, CreditCard, FileText, Users, Settings, ChevronDown, LogOut, Menu, X, Plus, Edit, Trash2, Eye, EyeOff, ArrowUpDown, Search, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../store';
import { Product, Category, Tariff, Service, Lead, ContentBlock, FAQItem } from '../types';

export function AdminLayout() {
  const { isAdmin, adminLogout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdmin) {
    return <AdminLogin />;
  }

  const menuItems = [
    { label: 'Панель', icon: LayoutDashboard, href: '/admin' },
    { label: 'Товары', icon: Package, href: '/admin/products' },
    { label: 'Категории', icon: FolderOpen, href: '/admin/categories' },
    { label: 'Тарифы', icon: CreditCard, href: '/admin/tariffs' },
    { label: 'Услуги', icon: FileText, href: '/admin/services' },
    { label: 'Заявки', icon: Users, href: '/admin/leads' },
    { label: 'Блоки сайта', icon: ArrowUpDown, href: '/admin/blocks' },
    { label: 'FAQ', icon: FileText, href: '/admin/faq' },
    { label: 'Настройки', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <Link to="/" className="text-white font-bold">Админ-панель</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
            <Eye size={16} /> Перейти на сайт
          </Link>
          <button onClick={() => { adminLogout(); navigate('/'); }} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 w-full">
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm h-16 flex items-center px-4 lg:px-8 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-gray-600"><Menu size={24} /></button>
          <h1 className="text-lg font-semibold text-gray-900">
            {menuItems.find(m => m.href === location.pathname)?.label || 'Админ-панель'}
          </h1>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      navigate('/admin');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Вход в админ-панель</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Введите пароль" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Войти
          </button>
          <p className="text-xs text-gray-400 mt-4 text-center">Демо-пароль: admin123</p>
        </form>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
export function AdminDashboard() {
  const { products, categories, leads, tariffs } = useStore();
  const publishedProducts = products.filter(p => p.status === 'published').length;
  const draftProducts = products.filter(p => p.status === 'draft').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const activeLeads = leads.filter(l => ['contact', 'negotiation', 'sent'].includes(l.status)).length;

  const stats = [
    { label: 'Опубликовано товаров', value: publishedProducts, color: 'bg-green-100 text-green-700' },
    { label: 'Черновики', value: draftProducts, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Категорий', value: categories.length, color: 'bg-blue-100 text-blue-700' },
    { label: 'Новых заявок', value: newLeads, color: 'bg-red-100 text-red-700' },
    { label: 'В работе', value: activeLeads, color: 'bg-purple-100 text-purple-700' },
    { label: 'Тарифов', value: tariffs.filter(t => t.status === 'published').length, color: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold inline-block px-3 py-1 rounded-lg ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Последние заявки</h3>
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-sm text-gray-900">{lead.name}</p>
                <p className="text-xs text-gray-500">{lead.phone}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getLeadStatusColor(lead.status)}`}>
                {getLeadStatusLabel(lead.status)}
              </span>
            </div>
          ))}
          <Link to="/admin/leads" className="text-blue-600 text-sm font-medium mt-4 inline-block">Все заявки →</Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Быстрые действия</h3>
          <div className="space-y-2">
            <Link to="/admin/products?action=new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus size={18} className="text-blue-600" /> <span className="text-sm text-gray-700">Добавить товар</span>
            </Link>
            <Link to="/admin/categories?action=new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus size={18} className="text-blue-600" /> <span className="text-sm text-gray-700">Добавить категорию</span>
            </Link>
            <Link to="/admin/tariffs?action=new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus size={18} className="text-blue-600" /> <span className="text-sm text-gray-700">Добавить тариф</span>
            </Link>
            <Link to="/admin/blocks" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowUpDown size={18} className="text-blue-600" /> <span className="text-sm text-gray-700">Редактировать блоки сайта</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ PRODUCTS ADMIN ============
export function AdminProducts() {
  const { products, categories, deleteProduct, updateProduct } = useStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = products.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (editingProduct) {
    return <ProductEditor product={editingProduct} onClose={() => setEditingProduct(null)} />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию или артикулу..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="all">Все статусы</option>
          <option value="published">Опубликованные</option>
          <option value="draft">Черновики</option>
          <option value="archived">Архив</option>
        </select>
        <button onClick={() => setEditingProduct(createEmptyProduct())} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Добавить товар
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Товар</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Артикул</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Категория</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Цена</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && <img src={product.images[0].url} alt="" className="w-10 h-10 rounded object-cover" />}
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{product.sku}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{categories.find(c => c.id === product.categoryId)?.name || '—'}</td>
                  <td className="px-4 py-3 font-medium">{product.wholesalePrice} ₽</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'published' ? 'bg-green-100 text-green-700' : product.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                      {product.status === 'published' ? 'Опубликован' : product.status === 'draft' ? 'Черновик' : 'Архив'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditingProduct(product)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit size={16} /></button>
                      <button onClick={() => {
                        if (product.status === 'published') updateProduct(product.id, { status: 'draft' });
                        else updateProduct(product.id, { status: 'published' });
                      }} className="p-1.5 text-gray-400 hover:text-green-600 rounded">
                        {product.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button onClick={() => { if (confirm('Удалить товар?')) deleteProduct(product.id); }} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center py-8 text-gray-500">Товары не найдены</p>}
      </div>
    </div>
  );
}

function ProductEditor({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addProduct, updateProduct, categories, products } = useStore();
  const [form, setForm] = useState<Product>(product);
  const [activeTab, setActiveTab] = useState('main');
  const isNew = !products.find(p => p.id === product.id);

  const handleSave = () => {
    if (!form.name || !form.sku) { alert('Заполните обязательные поля: Название и Артикул'); return; }
    if (isNew) {
      addProduct({ ...form, id: `prod-${Date.now()}`, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] });
    } else {
      updateProduct(form.id, form);
    }
    onClose();
  };

  const tabs = [
    { id: 'main', label: 'Основное' },
    { id: 'characteristics', label: 'Характеристики' },
    { id: 'prices', label: 'Цены' },
    { id: 'seo', label: 'SEO' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{isNew ? 'Новый товар' : 'Редактирование товара'}</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Отмена</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Сохранить</button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'main' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Название *" value={form.name} onChange={v => setForm({...form, name: v})} />
              <Field label="Артикул (SKU) *" value={form.sku} onChange={v => setForm({...form, sku: v})} />
              <Field label="Slug (URL)" value={form.slug} onChange={v => setForm({...form, slug: v})} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
              <textarea value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Полное описание</label>
              <textarea value={form.fullDescription} onChange={e => setForm({...form, fullDescription: e.target.value})} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Материал" value={form.material || ''} onChange={v => setForm({...form, material: v})} />
              <Field label="Цвет" value={form.color || ''} onChange={v => setForm({...form, color: v})} />
              <Field label="Страна" value={form.country || ''} onChange={v => setForm({...form, country: v})} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликован</option>
                  <option value="archived">Архив</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} id="featured" />
                <label htmlFor="featured" className="text-sm text-gray-700">Рекомендуемый товар</label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'characteristics' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="EAN/GTIN" value={form.ean || ''} onChange={v => setForm({...form, ean: v})} />
            <Field label="Бренд" value={form.brand || ''} onChange={v => setForm({...form, brand: v})} />
            <Field label="Модель" value={form.model || ''} onChange={v => setForm({...form, model: v})} />
            <Field label="ТН ВЭД" value={form.tnved || ''} onChange={v => setForm({...form, tnved: v})} />
            <Field label="ОКПД-2" value={form.okpd2 || ''} onChange={v => setForm({...form, okpd2: v})} />
            <NumField label="Вес, г" value={form.weight} onChange={v => setForm({...form, weight: v})} />
            <NumField label="Вес упаковки, г" value={form.packageWeight} onChange={v => setForm({...form, packageWeight: v})} />
            <NumField label="Длина, мм" value={form.length} onChange={v => setForm({...form, length: v})} />
            <NumField label="Ширина, мм" value={form.width} onChange={v => setForm({...form, width: v})} />
            <NumField label="Высота, мм" value={form.height} onChange={v => setForm({...form, height: v})} />
            <NumField label="Длина упаковки, мм" value={form.packageLength} onChange={v => setForm({...form, packageLength: v})} />
            <NumField label="Ширина упаковки, мм" value={form.packageWidth} onChange={v => setForm({...form, packageWidth: v})} />
            <NumField label="Высота упаковки, мм" value={form.packageHeight} onChange={v => setForm({...form, packageHeight: v})} />
            <Field label="Комплектация" value={form.kit || ''} onChange={v => setForm({...form, kit: v})} />
            <NumField label="Единиц в наборе" value={form.unitsInSet} onChange={v => setForm({...form, unitsInSet: v})} />
            <NumField label="Срок производства" value={form.productionTime} onChange={v => setForm({...form, productionTime: v})} />
            <Field label="Единица времени" value={form.productionTimeUnit || ''} onChange={v => setForm({...form, productionTimeUnit: v})} />
            <NumField label="Мин. партия" value={form.minOrder} onChange={v => setForm({...form, minOrder: v})} />
            <NumField label="Остаток на складе" value={form.stock} onChange={v => setForm({...form, stock: v})} />
          </div>
        )}

        {activeTab === 'prices' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <NumField label="Оптовая цена, ₽ *" value={form.wholesalePrice} onChange={v => setForm({...form, wholesalePrice: v || 0})} />
            <NumField label="Рекомендуемая розничная, ₽" value={form.retailPrice} onChange={v => setForm({...form, retailPrice: v})} />
            <Field label="Валюта" value={form.currency} onChange={v => setForm({...form, currency: v})} />
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <Field label="SEO Title" value={form.seoTitle || ''} onChange={v => setForm({...form, seoTitle: v})} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
              <textarea value={form.seoDescription || ''} onChange={e => setForm({...form, seoDescription: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ CATEGORIES ADMIN ============
export function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [editing, setEditing] = useState<Category | null>(null);

  if (editing) {
    return <CategoryEditor category={editing} onClose={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{categories.length} категорий</p>
        <button onClick={() => setEditing({ id: '', slug: '', name: '', order: categories.length + 1, status: 'draft' })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Добавить
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Название</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.sort((a, b) => a.order - b.order).map(cat => (
              <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{cat.slug}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${cat.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {cat.status === 'published' ? 'Опубликована' : 'Черновик'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(cat)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                  <button onClick={() => { if (confirm('Удалить?')) deleteCategory(cat.id); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryEditor({ category, onClose }: { category: Category; onClose: () => void }) {
  const { addCategory, updateCategory } = useStore();
  const [form, setForm] = useState<Category>(category);
  const isNew = !category.id;

  const handleSave = () => {
    if (!form.name) { alert('Введите название'); return; }
    if (isNew) {
      addCategory({ ...form, id: `cat-${Date.now()}`, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') });
    } else {
      updateCategory(form.id, form);
    }
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{isNew ? 'Новая категория' : 'Редактирование категории'}</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Отмена</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Сохранить</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <Field label="Название *" value={form.name} onChange={v => setForm({...form, name: v})} />
        <Field label="Slug (URL)" value={form.slug} onChange={v => setForm({...form, slug: v})} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
          <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <NumField label="Порядок" value={form.order} onChange={v => setForm({...form, order: v || 0})} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="draft">Черновик</option>
              <option value="published">Опубликована</option>
            </select>
          </div>
        </div>
        <Field label="SEO Title" value={form.seoTitle || ''} onChange={v => setForm({...form, seoTitle: v})} />
        <Field label="SEO Description" value={form.seoDescription || ''} onChange={v => setForm({...form, seoDescription: v})} />
      </div>
    </div>
  );
}

// ============ TARIFFS ADMIN ============
export function AdminTariffs() {
  const { tariffs, addTariff, updateTariff, deleteTariff } = useStore();
  const [editing, setEditing] = useState<Tariff | null>(null);

  if (editing) {
    return <TariffEditor tariff={editing} onClose={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{tariffs.length} тарифов</p>
        <button onClick={() => setEditing({ id: '', name: '', shortDescription: '', features: [], buttonText: 'Выбрать', isRecommended: false, order: tariffs.length + 1, status: 'draft' })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Добавить
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tariffs.sort((a, b) => a.order - b.order).map(tariff => (
          <div key={tariff.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900">{tariff.name}</h3>
              {tariff.isRecommended && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Рекомендуемый</span>}
            </div>
            <p className="text-sm text-gray-600 mb-3">{tariff.shortDescription}</p>
            {tariff.price !== undefined && tariff.price > 0 && <p className="text-lg font-bold text-gray-900 mb-3">{tariff.price.toLocaleString()} ₽</p>}
            <p className="text-xs text-gray-500 mb-3">{tariff.features.length} включённых услуг</p>
            <div className="flex gap-2">
              <button onClick={() => setEditing(tariff)} className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Редактировать</button>
              <button onClick={() => { if (confirm('Удалить?')) deleteTariff(tariff.id); }} className="p-2 text-gray-400 hover:text-red-600 border border-gray-300 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TariffEditor({ tariff, onClose }: { tariff: Tariff; onClose: () => void }) {
  const { addTariff, updateTariff } = useStore();
  const [form, setForm] = useState<Tariff>(tariff);
  const [featureInput, setFeatureInput] = useState('');
  const isNew = !tariff.id;

  const handleSave = () => {
    if (!form.name) { alert('Введите название'); return; }
    if (isNew) addTariff({ ...form, id: `tar-${Date.now()}` });
    else updateTariff(form.id, form);
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{isNew ? 'Новый тариф' : 'Редактирование тарифа'}</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Отмена</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Сохранить</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <Field label="Название *" value={form.name} onChange={v => setForm({...form, name: v})} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
          <textarea value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <NumField label="Стоимость, ₽" value={form.price} onChange={v => setForm({...form, price: v})} />
          <Field label="Период оплаты" value={form.period || ''} onChange={v => setForm({...form, period: v})} />
        </div>
        <Field label="Текст кнопки" value={form.buttonText} onChange={v => setForm({...form, buttonText: v})} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Включённые услуги</label>
          <div className="space-y-2 mb-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded">{f}</span>
                <button onClick={() => setForm({...form, features: form.features.filter((_, j) => j !== i)})} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Добавить услугу..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" onKeyDown={e => { if (e.key === 'Enter' && featureInput) { setForm({...form, features: [...form.features, featureInput]}); setFeatureInput(''); } }} />
            <button onClick={() => { if (featureInput) { setForm({...form, features: [...form.features, featureInput]}); setFeatureInput(''); } }}
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">+</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <NumField label="Порядок" value={form.order} onChange={v => setForm({...form, order: v || 0})} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="draft">Черновик</option>
              <option value="published">Опубликован</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.isRecommended} onChange={e => setForm({...form, isRecommended: e.target.checked})} id="recommended" />
          <label htmlFor="recommended" className="text-sm text-gray-700">Рекомендуемый тариф</label>
        </div>
      </div>
    </div>
  );
}

// ============ LEADS ADMIN ============
export function AdminLeads() {
  const { leads, updateLead, addLeadNote } = useStore();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [noteText, setNoteText] = useState('');

  const filtered = leads.filter(l => filterStatus === 'all' || l.status === filterStatus);

  if (selectedLead) {
    const lead = leads.find(l => l.id === selectedLead.id) || selectedLead;
    return (
      <div>
        <button onClick={() => setSelectedLead(null)} className="text-blue-600 text-sm mb-4 inline-block">← Назад к списку</button>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{lead.name}</h2>
              <p className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleString('ru')}</p>
            </div>
            <select value={lead.status} onChange={e => { updateLead(lead.id, { status: e.target.value as any }); setSelectedLead({...lead, status: e.target.value as any}); }}
              className={`px-3 py-1.5 rounded-lg text-sm border ${getLeadStatusColor(lead.status)}`}>
              <option value="new">Новая</option>
              <option value="contact">Связаться</option>
              <option value="negotiation">В переговорах</option>
              <option value="sent">Условия отправлены</option>
              <option value="started">Сотрудничество начато</option>
              <option value="rejected">Отказ</option>
              <option value="postponed">Отложено</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div><p className="text-sm text-gray-500">Телефон</p><p className="font-medium">{lead.phone}</p></div>
            <div><p className="text-sm text-gray-500">E-mail</p><p className="font-medium">{lead.email || '—'}</p></div>
            <div><p className="text-sm text-gray-500">Тип</p><p className="font-medium">{getSellerTypeLabel(lead.sellerType)}</p></div>
            <div><p className="text-sm text-gray-500">Предпочт. связь</p><p className="font-medium">{lead.preferredContact || '—'}</p></div>
          </div>
          {lead.comment && <div className="mb-6"><p className="text-sm text-gray-500 mb-1">Комментарий</p><p className="text-gray-700 bg-gray-50 rounded-lg p-3">{lead.comment}</p></div>}
          {lead.interestedServices && lead.interestedServices.length > 0 && (
            <div className="mb-6"><p className="text-sm text-gray-500 mb-2">Интересующие услуги</p>
              <div className="flex flex-wrap gap-2">{lead.interestedServices.map(s => <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{s}</span>)}</div>
            </div>
          )}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Заметки</h3>
            <div className="space-y-2 mb-4">
              {lead.notes.map(note => (
                <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{note.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(note.createdAt).toLocaleString('ru')} — {note.author}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Добавить заметку..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              <button onClick={() => { if (noteText) { addLeadNote(lead.id, { text: noteText, author: 'admin' }); setNoteText(''); } }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Добавить</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="all">Все статусы</option>
          <option value="new">Новые</option>
          <option value="contact">Связаться</option>
          <option value="negotiation">В переговорах</option>
          <option value="sent">Условия отправлены</option>
          <option value="started">Сотрудничество</option>
          <option value="rejected">Отказ</option>
          <option value="postponed">Отложено</option>
        </select>
        <p className="text-sm text-gray-500 self-center">{filtered.length} заявок</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Имя</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Контакт</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Дата</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(lead => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{lead.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getLeadStatusColor(lead.status)}`}>{getLeadStatusLabel(lead.status)}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{new Date(lead.createdAt).toLocaleDateString('ru')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-gray-500">Заявок не найдено</p>}
      </div>
    </div>
  );
}

// ============ BLOCKS EDITOR ============
export function AdminBlocks() {
  const { blocks, updateBlocks, updateBlock, deleteBlock, addBlock } = useStore();
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const idx = sorted.findIndex(b => b.id === id);
    if (direction === 'up' && idx > 0) {
      const newBlocks = [...sorted];
      [newBlocks[idx], newBlocks[idx - 1]] = [newBlocks[idx - 1], newBlocks[idx]];
      newBlocks.forEach((b, i) => updateBlock(b.id, { order: i + 1 }));
    }
    if (direction === 'down' && idx < sorted.length - 1) {
      const newBlocks = [...sorted];
      [newBlocks[idx], newBlocks[idx + 1]] = [newBlocks[idx + 1], newBlocks[idx]];
      newBlocks.forEach((b, i) => updateBlock(b.id, { order: i + 1 }));
    }
  };

  const blockTypeLabels: Record<string, string> = {
    hero: 'Первый экран', text: 'Текст', 'image-text': 'Изображение + текст', gallery: 'Галерея',
    advantages: 'Преимущества', products: 'Каталог товаров', 'featured-products': 'Популярные товары',
    categories: 'Категории', tariffs: 'Тарифы', 'tariff-comparison': 'Сравнение тарифов',
    calculator: 'Калькулятор', steps: 'Этапы работы', stats: 'Цифры', reviews: 'Отзывы',
    faq: 'FAQ', form: 'Форма заявки', 'cta-button': 'Кнопка действия', video: 'Видео',
    contacts: 'Контакты', 'custom-text': 'Произвольный текст',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{blocks.length} блоков на главной странице</p>
        <button onClick={() => addBlock({ id: `blk-${Date.now()}`, type: 'text', title: 'Новый блок', order: blocks.length + 1, visible: true })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Добавить блок
        </button>
      </div>
      <div className="space-y-3">
        {sorted.map((block, idx) => (
          <div key={block.id} className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 ${!block.visible ? 'opacity-50' : ''}`}>
            <div className="flex flex-col gap-1">
              <button onClick={() => moveBlock(block.id, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs">▲</button>
              <button onClick={() => moveBlock(block.id, 'down')} disabled={idx === sorted.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs">▼</button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{block.title || blockTypeLabels[block.type] || block.type}</p>
              <p className="text-xs text-gray-500">{blockTypeLabels[block.type] || block.type}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateBlock(block.id, { visible: !block.visible })}
                className={`p-1.5 rounded ${block.visible ? 'text-green-600' : 'text-gray-400'}`}>
                {block.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => {
                const title = prompt('Новый заголовок:', block.title || '');
                if (title !== null) updateBlock(block.id, { title });
              }} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
              <button onClick={() => { if (confirm('Удалить блок?')) deleteBlock(block.id); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ FAQ ADMIN ============
export function AdminFAQ() {
  const { faq, addFAQ, updateFAQ, deleteFAQ } = useStore();
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const sorted = [...faq].sort((a, b) => a.order - b.order);

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(null)} className="text-blue-600 text-sm mb-4 inline-block">← Назад</button>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <Field label="Вопрос" value={editing.question} onChange={v => setEditing({...editing, question: v})} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ответ</label>
            <textarea value={editing.answer} onChange={e => setEditing({...editing, answer: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <button onClick={() => {
            if (!editing.id) addFAQ({ ...editing, id: `faq-${Date.now()}` });
            else updateFAQ(editing.id, editing);
            setEditing(null);
          }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Сохранить</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{faq.length} вопросов</p>
        <button onClick={() => setEditing({ id: '', question: '', answer: '', order: faq.length + 1 })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Добавить
        </button>
      </div>
      <div className="space-y-2">
        {sorted.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{item.question}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.answer}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(item)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
              <button onClick={() => { if (confirm('Удалить?')) deleteFAQ(item.id); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SERVICES ADMIN ============
export function AdminServices() {
  const { services, addService, updateService, deleteService } = useStore();
  const [editing, setEditing] = useState<Service | null>(null);

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(null)} className="text-blue-600 text-sm mb-4 inline-block">← Назад</button>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <Field label="Название" value={editing.name} onChange={v => setEditing({...editing, name: v})} />
          <Field label="Slug" value={editing.slug} onChange={v => setEditing({...editing, slug: v})} />
          <Field label="Краткое описание" value={editing.shortDescription} onChange={v => setEditing({...editing, shortDescription: v})} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Полное описание</label>
            <textarea value={editing.fullDescription} onChange={e => setEditing({...editing, fullDescription: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <Field label="Цена" value={editing.price || ''} onChange={v => setEditing({...editing, price: v})} />
          <button onClick={() => {
            if (!editing.id) addService({ ...editing, id: `srv-${Date.now()}` });
            else updateService(editing.id, editing);
            setEditing(null);
          }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Сохранить</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{services.length} услуг</p>
        <button onClick={() => setEditing({ id: '', slug: '', name: '', shortDescription: '', fullDescription: '', order: services.length + 1, status: 'draft' })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Добавить
        </button>
      </div>
      <div className="space-y-2">
        {services.sort((a, b) => a.order - b.order).map(srv => (
          <div key={srv.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{srv.name}</p>
              <p className="text-xs text-gray-500">{srv.price}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(srv)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
              <button onClick={() => { if (confirm('Удалить?')) deleteService(srv.id); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SETTINGS ADMIN ============
export function AdminSettings() {
  const { settings, updateSettings, calculatorDefaults, updateCalculatorDefaults } = useStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(settings);
    updateCalculatorDefaults(calculatorDefaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Общие настройки сайта</h3>
        <div className="space-y-4">
          <Field label="Название сайта" value={settings.siteName} onChange={v => updateSettings({ siteName: v })} />
          <Field label="Телефон" value={settings.phone || ''} onChange={v => updateSettings({ phone: v })} />
          <Field label="E-mail" value={settings.email || ''} onChange={v => updateSettings({ email: v })} />
          <Field label="Telegram" value={settings.telegram || ''} onChange={v => updateSettings({ telegram: v })} />
          <Field label="WhatsApp" value={settings.whatsapp || ''} onChange={v => updateSettings({ whatsapp: v })} />
          <Field label="Адрес" value={settings.address || ''} onChange={v => updateSettings({ address: v })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст в шапке</label>
            <textarea value={settings.headerText || ''} onChange={e => updateSettings({ headerText: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст в подвале</label>
            <textarea value={settings.footerText || ''} onChange={e => updateSettings({ footerText: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Калькулятор: значения по умолчанию</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumField label="Комиссия площадки, %" value={calculatorDefaults.commissionPercent} onChange={v => updateCalculatorDefaults({ commissionPercent: v || 0 })} />
          <NumField label="Логистика, ₽" value={calculatorDefaults.logisticsCost} onChange={v => updateCalculatorDefaults({ logisticsCost: v || 0 })} />
          <NumField label="Упаковка, ₽" value={calculatorDefaults.packagingCost} onChange={v => updateCalculatorDefaults({ packagingCost: v || 0 })} />
          <NumField label="Реклама, ₽" value={calculatorDefaults.advertisingCost} onChange={v => updateCalculatorDefaults({ advertisingCost: v || 0 })} />
          <NumField label="Налог, %" value={calculatorDefaults.taxPercent} onChange={v => updateCalculatorDefaults({ taxPercent: v || 0 })} />
        </div>
      </div>

      <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
        {saved ? <><Check size={16} /> Сохранено!</> : 'Сохранить настройки'}
      </button>
    </div>
  );
}

// ============ HELPERS ============
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
    </div>
  );
}

function NumField({ label, value, onChange }: { label: string; value?: number; onChange: (v?: number) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="number" value={value ?? ''} onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : undefined)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
    </div>
  );
}

function createEmptyProduct(): Product {
  return {
    id: '', slug: '', name: '', sku: '', categoryId: 'cat-1', wholesalePrice: 0, currency: 'RUB',
    shortDescription: '', fullDescription: '', images: [], variants: [], attributes: {},
    status: 'draft', isFeatured: false, createdAt: '', updatedAt: '',
  };
}

function getLeadStatusColor(status: string) {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700', contact: 'bg-yellow-100 text-yellow-700',
    negotiation: 'bg-purple-100 text-purple-700', sent: 'bg-indigo-100 text-indigo-700',
    started: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700',
    postponed: 'bg-gray-100 text-gray-600',
  };
  return colors[status] || 'bg-gray-100 text-gray-600';
}

function getLeadStatusLabel(status: string) {
  const labels: Record<string, string> = {
    new: 'Новая', contact: 'Связаться', negotiation: 'В переговорах', sent: 'Условия отправлены',
    started: 'Сотрудничество', rejected: 'Отказ', postponed: 'Отложено',
  };
  return labels[status] || status;
}

function getSellerTypeLabel(type?: string) {
  const labels: Record<string, string> = {
    beginner: 'Начинающий', existing: 'Действующий продавец', brand: 'Собственный бренд', other: 'Другое',
  };
  return labels[type || ''] || '—';
}
