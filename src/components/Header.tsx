import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown, Sparkles, Instagram, Home, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShimmerHoverEffect from './ShimmerHoverEffect';
import { useLanguage } from '../LanguageContext';
import AmmanWeatherWidget from './AmmanWeatherWidget';
import WhatsAppIcon from './WhatsAppIcon';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { language, setLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: language === 'en' ? 'Home' : 'الصفحة الرئيسية', href: '#/', ariaLabel: language === 'en' ? 'Go to Home' : 'الذهاب إلى الصفحة الرئيسية' },
    { name: language === 'en' ? 'About Us' : 'معلومات عنا', href: '#/about', ariaLabel: language === 'en' ? 'About Us' : 'من نحن' },
    { name: language === 'en' ? 'Services' : 'الخدمات', href: '#/services', hasDropdown: true, ariaLabel: language === 'en' ? 'Explore Our Services' : 'استكشف خدماتنا' },
    { name: language === 'en' ? 'Contact Us' : 'اتصل بنا', href: '#/contact', ariaLabel: language === 'en' ? 'Contact Us' : 'اتصل بنا' },
  ];

  const subServices = [
    { name: language === 'en' ? 'Airport VIP & Borders' : 'استقبال وفود المطارات والمعابر', id: 'airport-transfer' },
    { name: language === 'en' ? 'Car with Driver' : 'سيارة عائلية وباص فخم مع سائق', id: 'car-rental-driver' },
    { name: language === 'en' ? 'VIP Executive Vans' : 'فان سياحي ورجال أعمال مع سائق', id: 'van-rental-driver' },
    { name: language === 'en' ? 'Corporate Solutions' : 'تأجير سيارات وحلول الشركات', id: 'business-travel' },
    { name: language === 'en' ? 'Hourly / Daily Standby' : 'حجز بالساعات ويومي مرن', id: 'hourly-daily-standby' },
  ];
  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-royal-navy-950/95 border-b border-champagne-gold-500/20 py-3 shadow-xl backdrop-blur-md'
          : 'bg-gradient-to-b from-royal-navy-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Elegant Logo resembling the Golden Monogram */}
          <a href="#/" className={`flex items-center space-x-2.5 sm:space-x-3 ${isRtl ? 'space-x-reverse' : ''} group outline-none`} id="header-logo">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 overflow-hidden group-hover:scale-105 transition-all duration-300" id="logo-monogram">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gold-grad-header" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF6ED" />
                    <stop offset="50%" stopColor="#D8BD7E" />
                    <stop offset="100%" stopColor="#C5A85C" />
                  </linearGradient>
                </defs>
                <text 
                  x="32" 
                  y="65" 
                  fontFamily="'Cinzel', 'Playfair Display', 'Cormorant Garamond', serif" 
                  fontSize="52" 
                  fontWeight="700" 
                  fill="url(#gold-grad-header)" 
                  textAnchor="middle"
                  className="select-none"
                >
                  R
                </text>
                <text 
                  x="-68" 
                  y="65" 
                  fontFamily="'Cinzel', 'Playfair Display', 'Cormorant Garamond', serif" 
                  fontSize="52" 
                  fontWeight="700" 
                  fill="url(#gold-grad-header)" 
                  textAnchor="middle"
                  transform="scale(-1, 1)"
                  className="select-none"
                >
                  R
                </text>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold text-luxury-gradient tracking-widest uppercase leading-none">
                Royal Ride
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-champagne-gold-300 uppercase leading-normal mt-0.5">
                {language === 'en' ? 'Jordan • VIP' : 'الأردن • في آي بي'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className={`hidden xl:flex items-center ${isRtl ? 'space-x-reverse' : ''}`} id="desktop-nav">
            <ul className={`flex items-center ${isRtl ? 'space-x-reverse' : ''} space-x-6`}>
              <li>
                <a href="#/" aria-label="Home" className="text-champagne-gold-100 hover:text-champagne-gold-400 transition-colors duration-300">
                  <Home className="w-4 h-4" />
                </a>
              </li>
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setServicesDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setServicesDropdownOpen(false)}
                >
                  {item.hasDropdown ? (
                    <button
                      onClick={() => {
                        window.location.hash = item.href;
                        setServicesDropdownOpen(!servicesDropdownOpen);
                      }}
                      aria-label={item.ariaLabel}
                      className="relative pb-1 flex items-center font-sans text-[11px] uppercase tracking-wider text-champagne-gold-100 hover:text-champagne-gold-400 transition-colors duration-300 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-champagne-gold-400 after:to-champagne-gold-600 after:transition-all after:duration-300"
                    >
                      {item.name}
                      <ChevronDown className={`w-3 h-3 ${isRtl ? 'mr-1' : 'ml-1'} transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      className="relative pb-1 flex items-center font-sans text-[11px] uppercase tracking-wider text-champagne-gold-100 hover:text-champagne-gold-400 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-champagne-gold-400 after:to-champagne-gold-600 after:transition-all after:duration-300"
                    >
                      {item.name}
                    </a>
                  )}
                  {/* Submenu Dropdown with beautiful golden frames */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.98 }}
                          transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                          className={`absolute mt-3 w-72 bg-royal-navy-950 border border-champagne-gold-500/30 rounded-md shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_15px_rgba(197,168,92,0.1)] p-2.5 z-50 backdrop-blur-xl ${isRtl ? 'right-0' : 'left-0'}`}
                        >
                          {subServices.map((sub) => (
                            <a
                              key={sub.id}
                              href={`#/services?id=${sub.id}`}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="block px-4 py-3 rounded text-[11px] text-champagne-gold-200 hover:text-[#000000] hover:bg-gradient-to-r hover:from-champagne-gold-400 hover:to-champagne-gold-500 hover:shadow-[0_0_10px_rgba(197,168,92,0.3)] transition-all duration-300 border-b border-royal-navy-800/60 last:border-b-0 font-medium font-sans"
                            >
                              {isRtl ? '◀ ' : '➔ '} &nbsp; {sub.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Actions & Translation switch */}
          <div className={`hidden lg:flex items-center ${isRtl ? 'space-x-reverse' : ''} space-x-6`} id="desktop-actions">
            
            <div className={`flex items-center ${isRtl ? 'space-x-reverse' : ''} space-x-5`}>
              <AmmanWeatherWidget compact={true} />
              <LanguageSwitcher />
              <a
                href="tel:+962775328853"
                className="text-champagne-gold-300 hover:text-champagne-gold-100 transition-colors"
                aria-label="Call Us"
              >
                <Phone className="w-5 h-5" />
              </a>
              
              <a
                href="https://www.instagram.com/royalridejo?igsh=cTFuM2VwdDd1N28x"
                target="_blank"
                rel="noreferrer"
                className="text-champagne-gold-300 hover:text-champagne-gold-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              
              <a
                href="https://wa.me/962775328853"
                target="_blank"
                rel="noreferrer"
                className="text-champagne-gold-300 hover:text-champagne-gold-100 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              
              <a
                href="#/contact"
                className="inline-flex items-center btn-metallic-gold text-royal-navy-950 font-sans text-[10px] uppercase tracking-widest font-extrabold px-6 py-3 rounded hover:shadow-[0_0_20px_rgba(197,168,92,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer relative overflow-hidden"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-royal-navy-950" />
                {t('nav.bookNow')}
                <ShimmerHoverEffect />
              </a>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            
            <a
              href="https://wa.me/962775328853"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-champagne-gold-500/30 rounded text-champagne-gold-400 bg-royal-navy-900"
              aria-label="WhatsApp Us"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            
            <a
              href="https://www.instagram.com/royalridejo?igsh=cTFuM2VwdDd1N28x"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-champagne-gold-500/30 rounded text-champagne-gold-400 bg-royal-navy-900"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 border border-champagne-gold-500/30 rounded text-champagne-gold-100 hover:text-champagne-gold-400 transition-colors menu-toggle`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            role="navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`xl:hidden bg-royal-navy-950 border-b border-champagne-gold-500/20 menu ${mobileMenuOpen ? 'active' : ''}`}
            id="mobile-nav-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <a href="#/" className="flex items-center space-x-2 text-champagne-gold-100 hover:text-champagne-gold-400 transition-colors py-2 border-b border-royal-navy-800/40" onClick={() => setMobileMenuOpen(false)}>
                <Home className="w-4 h-4" />
                <span>{language === 'en' ? 'Home' : 'الرئيسية'}</span>
              </a>
              {navItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <a
                    href={item.href}
                    aria-label={item.ariaLabel}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-serif text-base text-champagne-gold-100 hover:text-champagne-gold-400 transition-colors py-2 border-b border-royal-navy-800/40"
                  >
                    {item.name}
                  </a>
                  {item.hasDropdown && (
                    <div className={`${isRtl ? 'pr-4' : 'pl-4'} space-y-1 py-1`}>
                      {subServices.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#/services?id=${sub.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-champagne-gold-100/70 hover:text-champagne-gold-400 py-1.5"
                        >
                          ↳ {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <LanguageSwitcher className="pt-4" />
                <a
                  href="tel:+962775328853"
                  className="flex items-center text-sm text-champagne-gold-300 font-mono"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +962 77 532 8853
                </a>
                <a
                  href="https://www.instagram.com/royalridejo?igsh=cTFuM2VwdDd1N28x"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-sm text-champagne-gold-300 font-mono"
                >
                  <Instagram className="w-4 h-4 mr-2 text-champagne-gold-500" />
                  Instagram: @royalridejo
                </a>
                <a
                  href="https://wa.me/962775328853"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-[#FAF6ED] font-sans text-xs uppercase tracking-widest font-semibold py-3 rounded transition-all duration-300 relative overflow-hidden"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'WhatsApp Support' : 'الدعم الفني عبر واتساب'}
                  <ShimmerHoverEffect />
                </a>
                <a
                  href="#/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center bg-champagne-gold-500 hover:bg-champagne-gold-400 text-royal-navy-950 font-sans text-xs uppercase tracking-widest font-bold py-3 rounded transition-all duration-300 relative overflow-hidden"
                >
                  {language === 'en' ? 'Book VIP Carriage' : 'طلب حجز رحلة جديدة'}
                  <ShimmerHoverEffect />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
