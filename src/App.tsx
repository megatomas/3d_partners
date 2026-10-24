import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage, ProductPage } from './pages/CatalogPage';
import { ServicesPage, ServicePage, PricingPage, HowItWorksPage, CalculatorPage, ForSellersPage, ForBeginnersPage, CustomProductionPage, FAQPage, ContactsPage, PrivacyPolicyPage, PersonalDataConsentPage } from './pages/OtherPages';
import { AdminLayout, AdminDashboard, AdminProducts, AdminCategories, AdminTariffs, AdminLeads, AdminBlocks, AdminFAQ, AdminServices, AdminSettings } from './pages/AdminPages';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Страница не найдена</p>
        <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">← Вернуться на главную</a>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="tariffs" element={<AdminTariffs />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="blocks" element={<AdminBlocks />} />
        <Route path="faq" element={<AdminFAQ />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public routes */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/catalog" element={<PublicLayout><CatalogPage /></PublicLayout>} />
      <Route path="/catalog/:slug" element={<PublicLayout><ProductPage /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
      <Route path="/services/:slug" element={<PublicLayout><ServicePage /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
      <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
      <Route path="/calculator" element={<PublicLayout><CalculatorPage /></PublicLayout>} />
      <Route path="/for-sellers" element={<PublicLayout><ForSellersPage /></PublicLayout>} />
      <Route path="/for-beginners" element={<PublicLayout><ForBeginnersPage /></PublicLayout>} />
      <Route path="/custom-production" element={<PublicLayout><CustomProductionPage /></PublicLayout>} />
      <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
      <Route path="/contacts" element={<PublicLayout><ContactsPage /></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
      <Route path="/personal-data-consent" element={<PublicLayout><PersonalDataConsentPage /></PublicLayout>} />
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
