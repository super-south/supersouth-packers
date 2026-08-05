import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CostEstimator from './components/CostEstimator';
import ShipmentTracker from './components/ShipmentTracker';
import Services from './components/Services';
import CoverageNetwork from './components/CoverageNetwork';
import Reviews from './components/Reviews';
import FAQSection from './components/FAQSection';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';
import LocationPage from './pages/LocationPage';
import MobileFloatingBar from './components/MobileFloatingBar';
import { useTheme } from './context/ThemeContext';

// Helper component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalData, setQuoteModalData] = useState(null);
  const [estimatorPrefill, setEstimatorPrefill] = useState(null);

  const handleOpenQuoteModal = (data = null) => {
    setQuoteModalData(data);
    setIsQuoteModalOpen(true);
  };

  const handleStartEstimate = (data) => {
    setEstimatorPrefill(data);
    const calculatorElem = document.getElementById('calculator');
    if (calculatorElem) {
      calculatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookWithQuote = (quoteData) => {
    handleOpenQuoteModal(quoteData);
  };

  const handleSelectService = (service) => {
    handleOpenQuoteModal({
      moveType: service.title,
      specialNotes: `Inquiry for ${service.title} (${service.subtitle})`
    });
  };

  const handleSelectRoute = (route) => {
    handleOpenQuoteModal({
      fromCity: route.from,
      toCity: route.to,
      estimatedPriceRange: `Starting ${route.startPrice}`,
      specialNotes: `Inquiry for Express Route: ${route.from} to ${route.to} (${route.distance}, Est. ${route.duration})`
    });
  };

  const handleOpenTracker = () => {
    const trackingElem = document.getElementById('tracking');
    if (trackingElem) {
      trackingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-body transition-colors duration-300">
      <ScrollToTop />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenQuoteModal={() => handleOpenQuoteModal(null)}
        onOpenTracker={handleOpenTracker}
      />

      <main className="flex-1">
        <Routes>
          {/* Main Homepage */}
          <Route
            path="/"
            element={
              <>
                <Hero onStartEstimate={handleStartEstimate} />
                <CostEstimator
                  prefillData={estimatorPrefill}
                  onBookWithQuote={handleBookWithQuote}
                />
                <ShipmentTracker />
                <Services onSelectService={handleSelectService} />
                <CoverageNetwork onSelectRoute={handleSelectRoute} />
                <Reviews />
                <FAQSection />
              </>
            }
          />

          {/* Dynamic Location Pages (Programmatic SEO Engine) */}
          <Route
            path="/packers-and-movers-in-:slug"
            element={
              <LocationPage onOpenQuoteModal={handleOpenQuoteModal} />
            }
          />
          <Route
            path="/location/:slug"
            element={
              <LocationPage onOpenQuoteModal={handleOpenQuoteModal} />
            }
          />
        </Routes>
      </main>

      <Footer
        onOpenQuoteModal={() => handleOpenQuoteModal(null)}
        onOpenTracker={handleOpenTracker}
      />

      <MobileFloatingBar onOpenQuoteModal={() => handleOpenQuoteModal(null)} />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialData={quoteModalData}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
