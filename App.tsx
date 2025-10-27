
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ChatFAB from './components/ui/ChatFAB';
import { mksData } from './data/mksContent';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import PromotionsPage from './pages/PromotionsPage';
import ContactPage from './pages/ContactPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BrandPage from './pages/BrandPage';
import BrandsListPage from './pages/BrandsListPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ConceptsPage from './pages/ConceptsPage';
import ImageGalleryPage from './pages/ImageGalleryPage';
import WishlistPage from './pages/WishlistPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import InnovationPage from './pages/InnovationPage';
import FAQPage from './pages/FAQPage';
import GeminiPage from './pages/GeminiPage';
import CareersPage from './pages/CareersPage';
import MksSparesPage from './pages/MksSparesPage';

const ForceHomeOnReload: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This effect runs only once when the app first loads.
    // If the initial path is not the homepage, it navigates there.
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); // The empty dependency array ensures this runs only once.

  return null; // This component does not render anything.
};


const App: React.FC = () => {

  return (
    <CartProvider>
      <WishlistProvider>
        <ProductProvider>
          <HashRouter>
            <ForceHomeOnReload />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-mks-light-gray text-mks-dark">
              <Header 
                companyName={mksData.companyName} 
                navLinks={mksData.navigation}
                contactInfo={mksData.contactInfo}
              />
              <main className="flex-grow flex flex-col">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/mks-spares" element={<MksSparesPage />} />
                  <Route path="/brands" element={<BrandsListPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/brand/:brandId" element={<BrandPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/concepts" element={<ConceptsPage />} />
                  <Route path="/gallery" element={<ImageGalleryPage />} />
                  <Route path="/promotions" element={<PromotionsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/innovation" element={<InnovationPage />} />
                  <Route path="/track-order" element={<OrderTrackingPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/gemini" element={<GeminiPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer 
                companyName={mksData.companyName}
                logoUrl={mksData.logoUrl}
                contactInfo={mksData.contactInfo}
                socialMedia={mksData.socialMedia}
                companyLinks={mksData.companyLinks}
                navLinks={mksData.navigation}
              />
              <ChatFAB />
            </div>
          </HashRouter>
        </ProductProvider>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
