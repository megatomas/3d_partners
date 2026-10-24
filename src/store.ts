import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category, Tariff, Service, Lead, ContentBlock, SiteSettings, FAQItem, CalculatorDefaults } from './types';
import { defaultProducts, defaultCategories, defaultTariffs, defaultServices, defaultLeads, defaultBlocks, defaultSettings, defaultFAQ, defaultCalculatorDefaults } from './data';

interface AppState {
  // Data
  products: Product[];
  categories: Category[];
  tariffs: Tariff[];
  services: Service[];
  leads: Lead[];
  blocks: ContentBlock[];
  settings: SiteSettings;
  faq: FAQItem[];
  calculatorDefaults: CalculatorDefaults;
  
  // Auth
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Products
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Categories
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Tariffs
  addTariff: (tariff: Tariff) => void;
  updateTariff: (id: string, tariff: Partial<Tariff>) => void;
  deleteTariff: (id: string) => void;

  // Services
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Leads
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  addLeadNote: (leadId: string, note: { text: string; author: string }) => void;

  // Blocks
  updateBlocks: (blocks: ContentBlock[]) => void;
  addBlock: (block: ContentBlock) => void;
  updateBlock: (id: string, block: Partial<ContentBlock>) => void;
  deleteBlock: (id: string) => void;

  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;

  // FAQ
  addFAQ: (item: FAQItem) => void;
  updateFAQ: (id: string, item: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Calculator
  updateCalculatorDefaults: (defaults: Partial<CalculatorDefaults>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      products: defaultProducts,
      categories: defaultCategories,
      tariffs: defaultTariffs,
      services: defaultServices,
      leads: defaultLeads,
      blocks: defaultBlocks,
      settings: defaultSettings,
      faq: defaultFAQ,
      calculatorDefaults: defaultCalculatorDefaults,
      isAdmin: false,

      adminLogin: (password: string) => {
        if (password === 'admin123') {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      adminLogout: () => set({ isAdmin: false }),

      addProduct: (product) => set((s) => ({ products: [...s.products, product] })),
      updateProduct: (id, data) => set((s) => ({
        products: s.products.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString().split('T')[0] } : p)
      })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter(p => p.id !== id) })),

      addCategory: (category) => set((s) => ({ categories: [...s.categories, category] })),
      updateCategory: (id, data) => set((s) => ({
        categories: s.categories.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      deleteCategory: (id) => set((s) => ({ categories: s.categories.filter(c => c.id !== id) })),

      addTariff: (tariff) => set((s) => ({ tariffs: [...s.tariffs, tariff] })),
      updateTariff: (id, data) => set((s) => ({
        tariffs: s.tariffs.map(t => t.id === id ? { ...t, ...data } : t)
      })),
      deleteTariff: (id) => set((s) => ({ tariffs: s.tariffs.filter(t => t.id !== id) })),

      addService: (service) => set((s) => ({ services: [...s.services, service] })),
      updateService: (id, data) => set((s) => ({
        services: s.services.map(sv => sv.id === id ? { ...sv, ...data } : sv)
      })),
      deleteService: (id) => set((s) => ({ services: s.services.filter(sv => sv.id !== id) })),

      addLead: (lead) => set((s) => ({ leads: [lead, ...s.leads] })),
      updateLead: (id, data) => set((s) => ({
        leads: s.leads.map(l => l.id === id ? { ...l, ...data } : l)
      })),
      addLeadNote: (leadId, note) => set((s) => ({
        leads: s.leads.map(l => l.id === leadId ? {
          ...l,
          notes: [...l.notes, { ...note, id: `n-${Date.now()}`, createdAt: new Date().toISOString() }]
        } : l)
      })),

      updateBlocks: (blocks) => set({ blocks }),
      addBlock: (block) => set((s) => ({ blocks: [...s.blocks, block] })),
      updateBlock: (id, data) => set((s) => ({
        blocks: s.blocks.map(b => b.id === id ? { ...b, ...data } : b)
      })),
      deleteBlock: (id) => set((s) => ({ blocks: s.blocks.filter(b => b.id !== id) })),

      updateSettings: (data) => set((s) => ({ settings: { ...s.settings, ...data } })),

      addFAQ: (item) => set((s) => ({ faq: [...s.faq, item] })),
      updateFAQ: (id, data) => set((s) => ({
        faq: s.faq.map(f => f.id === id ? { ...f, ...data } : f)
      })),
      deleteFAQ: (id) => set((s) => ({ faq: s.faq.filter(f => f.id !== id) })),

      updateCalculatorDefaults: (data) => set((s) => ({ calculatorDefaults: { ...s.calculatorDefaults, ...data } })),
    }),
    { name: 'production-platform-store' }
  )
);
