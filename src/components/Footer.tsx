import { useState } from 'react';
import { ArrowUp, Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { language, t, isRtl, isAdmin, loginAdmin, logoutAdmin } = useLanguage();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-royal-navy-950 border-t border-champagne-gold-500/15 py-16 relative">
      
      {/* Scroll to Top Trigger */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-champagne-gold-500/15 bg-royal-navy-900 text-champagne-gold-400 hover:text-royal-navy-950 hover:bg-champagne-gold-500 hover:border-champagne-gold-500 cursor-pointer shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-xs">
          
          {/* Logo & Company Description */}
          <div className={`md:col-span-5 space-y-5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <a href="#" className={`flex items-center space-x-2.5 sm:space-x-3 outline-none ${isRtl ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className="flex items-center justify-center w-9 h-9 overflow-hidden hover:scale-105 transition-all duration-300" id="footer-logo-monogram">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gold-grad-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FAF6ED" />
                      <stop offset="50%" stopColor="#D8BD7E" />
                      <stop offset="100%" stopColor="#C5A85C" />
                    </linearGradient>
                  </defs>
                  {/* Classic Luxury Roman Serif Monogram Letters - Mirrored and Borderless */}
                  <text 
                    x="32" 
                    y="65" 
                    fontFamily="'Cinzel', 'Playfair Display', 'Cormorant Garamond', serif" 
                    fontSize="52" 
                    fontWeight="700" 
                    fill="url(#gold-grad-footer)" 
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
                    fill="url(#gold-grad-footer)" 
                    textAnchor="middle"
                    transform="scale(-1, 1)"
                    className="select-none"
                  >
                    R
                  </text>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-luxury-gradient tracking-widest uppercase leading-none">
                  Royal Ride
                </span>
                <span className="text-[8px] font-mono tracking-[0.2em] text-champagne-gold-500 uppercase leading-normal mt-0.5">
                  {language === 'en' ? 'Jordan • VIP transport' : 'الأردن • كبار الشخصيات'}
                </span>
              </div>
            </a>
            <p className="font-sans text-champagne-gold-100/60 leading-relaxed max-w-sm font-light">
              {t('footer.desc')}
            </p>

          </div>

          {/* Quick links to sections */}
          <div className={`md:col-span-3 space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className="font-serif text-sm font-bold text-champagne-gold-300">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="text-champagne-gold-100/60 hover:text-[#FAF6ED] transition-colors inline-block">
                  {isRtl ? '◀ ' : '➔ '} &nbsp; {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#fleet" className="text-champagne-gold-100/60 hover:text-[#FAF6ED] transition-colors inline-block">
                  {isRtl ? '◀ ' : '➔ '} &nbsp; {t('nav.fleet')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-champagne-gold-100/60 hover:text-[#FAF6ED] transition-colors inline-block">
                  {isRtl ? '◀ ' : '➔ '} &nbsp; {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#partners" className="text-champagne-gold-100/60 hover:text-[#FAF6ED] transition-colors inline-block">
                  {isRtl ? '◀ ' : '➔ '} &nbsp; {t('nav.partners')}
                </a>
              </li>
              <li>
                <a href="#/contact" className="text-champagne-gold-100/60 hover:text-[#FAF6ED] transition-colors inline-block">
                  {isRtl ? '◀ ' : '➔ '} &nbsp; {t('contact.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div className={`md:col-span-4 space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className="font-serif text-sm font-bold text-champagne-gold-300">
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </h4>
            <ul className="space-y-3 font-normal text-champagne-gold-100/70">
              <li className={`flex items-start ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <MapPin className={`w-4 h-4 text-champagne-gold-500 flex-shrink-0 mt-0.5 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                <span>{language === 'en' ? 'Near Abdali Boulevard, Amman, Jordan' : 'بالقرب من بوليفارد العبدلي، عمان، الأردن'}</span>
              </li>
              <li className={`flex items-center ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Phone className={`w-4 h-4 text-champagne-gold-500 flex-shrink-0 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                <a href="tel:+962775328853" className="hover:text-champagne-gold-200">+962 77 532 8853</a>
              </li>
              <li className={`flex items-center ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Mail className={`w-4 h-4 text-champagne-gold-500 flex-shrink-0 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                <a href="mailto:royalride011@gmail.com" className="hover:text-champagne-gold-200">royalride011@gmail.com</a>
              </li>
              <li className={`flex items-center ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Instagram className={`w-4 h-4 text-champagne-gold-500 flex-shrink-0 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                <a href="https://www.instagram.com/royalridejo?igsh=cTFuM2VwdDd1N28x" target="_blank" rel="noreferrer" className="hover:text-champagne-gold-200">@royalridejo</a>
              </li>
              <li className={`flex items-center ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Facebook className={`w-4 h-4 text-champagne-gold-500 flex-shrink-0 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                <a href="https://www.facebook.com/RoyalRideJordan" target="_blank" rel="noreferrer" className="hover:text-champagne-gold-200">Royal Ride Jordan</a>
              </li>
              <li className={`flex items-center ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Twitter className={`w-4 h-4 text-champagne-gold-500 flex-shrink-0 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                <a href="https://www.twitter.com/RoyalRideJordan" target="_blank" rel="noreferrer" className="hover:text-champagne-gold-200">@RoyalRideJordan</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Legal Bar with Dynamic Year */}
        <div className={`border-t border-royal-navy-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-champagne-gold-400/50 uppercase font-mono tracking-wider ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <p>© {new Date().getFullYear()} Royal Ride Jordan. {language === 'en' ? 'All Sovereign Rights Reserved.' : 'جميع حقوق النقل الفاخر محفوظة.'}</p>
          <div className={`flex space-x-6 mt-4 md:mt-0 items-center ${isRtl ? 'space-x-reverse' : ''}`}>
            <a href="#" className="hover:text-champagne-gold-200">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </a>
            <span className="text-royal-navy-800">|</span>
            <a href="#" className="hover:text-champagne-gold-200">
              {language === 'en' ? 'Terms of Chauffeur Dispatch' : 'أحكام تسيير الرحلات والسائقين'}
            </a>
            <span className="text-royal-navy-800">|</span>
            {isAdmin ? (
              <button 
                onClick={logoutAdmin} 
                className="hover:text-red-400 transition-colors cursor-pointer text-red-500/70 font-bold"
              >
                {language === 'en' ? 'Admin Logout' : 'خروج المشرف'}
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)} 
                className="hover:text-champagne-gold-200 transition-colors cursor-pointer font-bold text-[#C5A85C]"
              >
                {language === 'en' ? 'Admin' : 'لوحة التحكم'}
              </button>
            )}
          </div>
        </div>

        {/* Premium Admin Login Modal */}
        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[999] flex items-center justify-center p-4">
            <div className="bg-royal-navy-950 border border-[#C5A85C]/35 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
              <button 
                onClick={() => {
                  setIsLoginOpen(false);
                  setError('');
                }}
                className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer text-sm"
              >
                ✕
              </button>
              <h3 className="font-serif text-lg font-bold text-[#C5A85C] mb-1 text-center">
                {language === 'en' ? 'Administrative Access' : 'بوابة المشرف'}
              </h3>
              <p className="text-[10px] font-mono text-champagne-gold-400/55 tracking-wider text-center uppercase mb-6">
                {language === 'en' ? 'Royal Ride Control Room' : 'غرفة التحكم رويال رايد'}
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const success = loginAdmin(email, password);
                  if (success) {
                    setIsLoginOpen(false);
                    setError('');
                    setEmail('');
                    setPassword('');
                  } else {
                    setError(language === 'en' ? 'Invalid credentials or unauthorized' : 'بيانات الدخول غير صحيحة أو غير مصرح بها');
                  }
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1.5 font-mono text-left">
                    {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                  </label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="royalride011@gmail.com"
                    required
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A85C]/60 text-left"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1.5 font-mono text-left">
                    {language === 'en' ? 'Access Password' : 'كلمة المرور'}
                  </label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A85C]/60 text-left"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-[10px] font-sans text-center font-semibold bg-red-950/20 py-1.5 rounded-lg border border-red-500/20">
                    {error}
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full bg-[#C5A85C] text-black text-xs font-bold py-3 rounded-xl hover:bg-white transition-colors cursor-pointer active:scale-95 shadow-lg shadow-[#C5A85C]/15"
                >
                  {language === 'en' ? 'Authenticate Access' : 'تأكيد الهوية والدخول'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </footer>
  );
}
