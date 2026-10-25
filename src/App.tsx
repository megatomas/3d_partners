import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage, ProductPage } from './pages/CatalogPage';
import {
  ServicesPage, ServicePage, AboutPage, BlogPage, BlogPostPage, ReviewsPage,
  PartnersPage, FAQPage, ContactsPage, PrivacyPolicyPage, PersonalDataConsentPage, NotFoundSimple,
} from './pages/OtherPages';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/catalog" element={<PublicLayout><CatalogPage /></PublicLayout>} />
      <Route path="/catalog/:slug" element={<PublicLayout><ProductPage /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
      <Route path="/services/:slug" element={<PublicLayout><ServicePage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
      <Route path="/reviews" element={<PublicLayout><ReviewsPage /></PublicLayout>} />
      <Route path="/partners" element={<PublicLayout><PartnersPage /></PublicLayout>} />
      <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
      <Route path="/contacts" element={<PublicLayout><ContactsPage /></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
      <Route path="/personal-data-consent" element={<PublicLayout><PersonalDataConsentPage /></PublicLayout>} />
      <Route path="*" element={<PublicLayout><NotFoundSimple /></PublicLayout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
