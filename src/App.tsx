import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import JordanClock from './components/JordanClock';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomizerPanel from './components/CustomizerPanel';

// Lazy load below-the-fold and sub-route components for lightning-fast loading (under 1 sec)
const SovereignReviewsCarousel = lazy(() => import('./components/SovereignReviewsCarousel'));
const Services = lazy(() => import('./components/ServicesShowcase'));
const TourismCarousel = lazy(() => import('./components/TourismCarousel'));
const FleetCarousel = lazy(() => import('./components/FleetCarousel'));
const FleetGallery = lazy(() => import('./components/FleetGallery'));
const About = lazy(() => import('./components/About'));
const Reviews = lazy(() => import('./components/Reviews'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Partners = lazy(() => import('./components/Partners'));
const Blog = lazy(() => import('./components/Blog'));


// Elegant luxury-themed loading state for Suspense boundaries
function LuxuryLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[350px]" id="luxury-loader">
      <div className="relative flex items-center justify-center w-12 h-12" id="loader-ring">
        <div className="absolute inset-0 rounded-full border-2 border-champagne-gold-500/10" />
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-champagne-gold-500 animate-spin" style={{ animationDuration: '0.8s' }} />
      </div>
      <p className="mt-4 font-serif text-xs tracking-[0.25em] uppercase text-champagne-gold-400/80 animate-pulse">
        Royal Ride Jordan
      </p>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [subServiceId, setSubServiceId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  // Settle clean hash-routing and dynamic SEO tags
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash || '';
      const cleanHash = rawHash.split('?')[0] || '';
      
      const params = new URLSearchParams(rawHash.split('?')[1] || '');
      const sId = params.get('id') || '';
      setSubServiceId(sId);

      let detectedRoute = 'home';
      if (cleanHash.startsWith('#/services')) {
        detectedRoute = 'services';
      } else if (cleanHash.startsWith('#/fleet')) {
        detectedRoute = 'fleet';
      } else if (cleanHash.startsWith('#/about')) {
        detectedRoute = 'about';
      } else if (cleanHash.startsWith('#/partners')) {
        detectedRoute = 'partners';
      } else if (cleanHash.startsWith('#/blog')) {
        detectedRoute = 'blog';
      } else if (cleanHash.startsWith('#/contact')) {
        detectedRoute = 'contact';
      }

      setRoute(detectedRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // SEO Title tags and descriptions
      let title = 'Royal Ride Jordan | Luxury Transportation Services in Amman, Jordan';
      let description = 'Experience the ultimate in luxury transportation with Royal Ride Jordan. Our fleet of premium vehicles and professional chauffeurs ensure you travel in style and comfort across Jordan and beyond.';

      if (detectedRoute === 'services') {
        title = 'Services & sub-services | Royal Ride VIP Jordan';
        description = 'Premium sedans and vans with or without chauffeurs. Airport meet-and-greets, corporate contracts, and full daily/hourly standby options.';
      } else if (detectedRoute === 'fleet') {
        title = 'Our Sovereign Fleet | Royal Ride Jordan';
        description = 'Explore specifications of our luxury fleet featuring the Mercedes-Benz V-Class, Hyundai Staria Lounge, and hybrid Camry executive.';
      } else if (detectedRoute === 'about') {
        title = 'About Us & Elite Chauffeurs | Royal Ride Jordan';
        description = 'A legacy of absolute safety, discretion, and diplomatic transport across Jordan. Meet the elite management and chauffeur captains.';
      } else if (detectedRoute === 'partners') {
        title = 'Our Partners & Reviews | Royal Ride Jordan';
        description = 'Trusted luxury carriage provider for prestigious hotels in Amman, including Ritz-Carlton, Four Seasons, and Sheraton.';
      } else if (detectedRoute === 'blog') {
        title = 'Jordan Luxury Travel & Protocol Journal | Royal Ride Jordan';
        description = 'Professional advice and historical desert route essays from our expert coordinators, designed to optimize your Levant travels.';
      } else if (detectedRoute === 'contact') {
        title = 'Book VIP Carriage | Royal Ride Jordan';
        description = 'Arrange customized transport in Amman. Calculate automatic fare estimates and submit inquiries to our continuous concierge dispatch.';
      }

      document.title = title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    window.location.hash = '#/contact';
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    window.location.hash = '#/contact';
  };

  const handleClearSelections = () => {
    setSelectedServiceId('');
    setSelectedVehicleId('');
  };

  return (
    <div className="bg-royal-navy-950 min-h-screen text-champagne-gold-100 selection:bg-champagne-gold-500 selection:text-royal-navy-950 gold-scrollbar relative overflow-hidden">
      {/* Golden Brand Progress/Shimmer Bar on Route Change */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={route}
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: ["0%", "40%", "85%", "100%"], opacity: [1, 1, 1, 0] }}
          transition={{
            width: { duration: 0.95, ease: "easeInOut", times: [0, 0.25, 0.7, 1] },
            opacity: { delay: 0.85, duration: 0.25 }
          }}
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#F4EAD4] via-[#C5A85C] to-[#A88640] z-[9999] shadow-[0_0_12px_#C5A85C] pointer-events-none"
        />
      </AnimatePresence>

      {/* Fixed top Header Navigation */}
      <Header />

      {/* Elegant Real-Time Jordan Clock (UTC+3) */}
      <JordanClock />

      {/* Main Routing Stage with smooth fade and upward slide */}
      <main className="min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<LuxuryLoader />}>
              {route === 'home' && (
                <>
                  <Hero
                    onExploreFleetClicked={() => { window.location.hash = '#/fleet'; }}
                    onBookNowClicked={() => { window.location.hash = '#/contact'; }}
                  />
                  <SovereignReviewsCarousel />
                  <Services onSelectServiceAndInquire={handleSelectService} />
                  <TourismCarousel />
                  <FleetCarousel onSelectVehicleAndInquire={handleSelectVehicle} />
                  <About />
                  <Reviews />
                </>
              )}

              {route === 'services' && (
                <div className="pt-12">
                  <Services
                    onSelectServiceAndInquire={handleSelectService}
                    preSelectedId={subServiceId}
                  />
                </div>
              )}

              {route === 'fleet' && (
                <div className="pt-24">
                  <FleetCarousel onSelectVehicleAndInquire={handleSelectVehicle} />
                  <FleetGallery />
                </div>
              )}

              {route === 'about' && (
                <div className="pt-12">
                  <About />
                </div>
              )}

              {route === 'partners' && (
                <Partners onInquire={() => { window.location.hash = '#/contact'; }} />
              )}

              {route === 'blog' && (
                <Blog onBookNowClicked={() => { window.location.hash = '#/contact'; }} />
              )}

              {route === 'contact' && (
                <div className="pt-24 pb-12">
                  <ContactForm
                    selectedServiceId={selectedServiceId}
                    selectedVehicleId={selectedVehicleId}
                    onClearSelections={handleClearSelections}
                  />
                </div>
              )}

            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Footer details */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Floating Image Customizer Panel */}
      <CustomizerPanel />
    </div>
  );
}
