// ==================== TYPES ====================

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  ean?: string;
  brand?: string;
  model?: string;
  tnved?: string;
  okpd2?: string;
  categoryId: string;
  material?: string;
  color?: string;
  weight?: number;
  packageWeight?: number;
  length?: number;
  width?: number;
  height?: number;
  packageLength?: number;
  packageWidth?: number;
  packageHeight?: number;
  kit?: string;
  unitsInSet?: number;
  country?: string;
  productionTime?: number;
  productionTimeUnit?: string;
  minOrder?: number;
  stock?: number;
  retailPrice?: number;
  wholesalePrice: number;
  currency: string;
  shortDescription: string;
  fullDescription: string;
  images: ProductImage[];
  variants: ProductVariant[];
  attributes: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price?: number;
  weight?: number;
  stock?: number;
  images: string[];
  attributes: Record<string, string>;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  status: 'published' | 'draft';
}

export interface Tariff {
  id: string;
  name: string;
  shortDescription: string;
  price?: number;
  period?: string;
  features: string[];
  limitations?: string[];
  additionalOptions?: string[];
  conditions?: string;
  buttonText: string;
  isRecommended: boolean;
  order: number;
  status: 'published' | 'draft';
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price?: string;
  image?: string;
  order: number;
  status: 'published' | 'draft';
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  status: 'new' | 'contact' | 'negotiation' | 'sent' | 'started' | 'rejected' | 'postponed';
  sellerType?: string;
  interestedServices?: string[];
  preferredContact?: string;
  comment?: string;
  tariff?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  notes: LeadNote[];
  assignedTo?: string;
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  title?: string;
  subtitle?: string;
  text?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  background?: string;
  order: number;
  visible: boolean;
  data?: Record<string, any>;
}

export type BlockType = 
  | 'hero'
  | 'text'
  | 'image-text'
  | 'gallery'
  | 'advantages'
  | 'products'
  | 'featured-products'
  | 'categories'
  | 'tariffs'
  | 'tariff-comparison'
  | 'calculator'
  | 'steps'
  | 'stats'
  | 'reviews'
  | 'faq'
  | 'form'
  | 'cta-button'
  | 'video'
  | 'contacts'
  | 'custom-text';

export interface SiteSettings {
  siteName: string;
  logo?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  address?: string;
  headerText?: string;
  footerText?: string;
  socialLinks?: Record<string, string>;
  analyticsId?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface CalculatorDefaults {
  commissionPercent: number;
  logisticsCost: number;
  packagingCost: number;
  advertisingCost: number;
  taxPercent: number;
}
