import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.destinations': { en: 'Destinations', ar: 'الوجهات السياحية' },
  'nav.fleet': { en: 'Our Fleet', ar: 'الأسطول' },
  'nav.about': { en: 'About Us', ar: 'من نحن' },
  'nav.partners': { en: 'Partners', ar: 'الشركاء' },
  'nav.blog': { en: 'Blog', ar: 'المدونة' },
  'nav.portal': { en: 'VIP Portal', ar: 'بوابة النخبة' },
  'nav.contact': { en: 'Contact Us', ar: 'تواصل معنا' },
  'nav.bookNow': { en: 'Book Now', ar: 'احجز الآن' },
  'nav.switchLang': { en: 'عربي', ar: 'English' },

  // Hero
  'hero.badge': { en: 'The Epitome of Luxury Transport in Amman', ar: 'قمة الفخامة والراحة للنقل الفاخر في عمان والأردن' },
  'hero.title1': { en: 'Redefining VIP', ar: 'إعادة تعريف النقل' },
  'hero.title2': { en: 'Travel in Jordan', ar: 'الفاخر والـ VIP في الأردن' },
  'hero.desc': {
    en: 'Welcome to Royal Ride Jordan. We provide bespoke private transfers, seamless cross-border transits to Syria/Lebanon, and local guided tours executed with absolute safety, prompt punctuality, and English-fluent chauffeurs.',
    ar: 'مرحباً بكم في رويال رايد الأردن. نقدم خدمات النقل الخاص الفاخر المصممة حسب الطلب، والتنقل السلس عبر الحدود إلى سوريا ولبنان، والجولات السياحية المحلية الموجهة التي تتميز بالأمان التام، والدقة المتناهية، مع سائقين محترفين يتحدثون الإنجليزية بطلاقة.'
  },
  'hero.btnSecure': { en: 'Secure Your Ride', ar: 'احجز رحلتك الآن' },
  'hero.btnFleet': { en: 'Explore Fleet Showcase', ar: 'استكشف أسطولنا الفاخر' },
  'hero.partnerTitle': { en: 'Trusted Partner for Guest & VIP Concierge Services', ar: 'الشريك الموثوق لخدمات وفود كبار الشخصيات والكونسيرج' },
  'hero.scrollDown': { en: 'Scroll Down', ar: 'انزل لأسفل' },

  // Services
  'services.badge': { en: 'The Sovereign Offerings', ar: 'خدماتنا الفاخرة' },
  'services.title': { en: 'Tailored Luxury Carriage', ar: 'حلول نقل متكاملة تليق بتطلعاتكم' },
  'services.desc': {
    en: 'Select from our array of certified elite services tailored for corporate delegates, diplomats, global tourists, and local dignitaries.',
    ar: 'اختر من بين مجموعتنا الواسعة من الخدمات النخبوية المعتمدة المصممة لرجال الأعمال، الدبلوماسيين، السياح، وكبار الشخصيات بالمملكة.'
  },
  'services.explore': { en: 'Explore Details', ar: 'استكشف التفاصيل' },
  'services.back': { en: 'Back to All Services', ar: 'العودة إلى كل الخدمات' },
  'services.bookThis': { en: 'Inquire & Book This Service', ar: 'الاستفسار وحجز هذه الخدمة' },

  // Fleet
  'fleet.badge': { en: 'The Sovereign Fleet', ar: 'الأسطول الملكي' },
  'fleet.title': { en: 'The Fleet Showcase', ar: 'معرض الأسطول الفخم' },
  'fleet.desc': {
    en: "At Royal Ride, we take pride in our modern and diverse fleet of vehicles that cater to our clients' varying needs, with a premium focus on comfort, luxury, and absolute reliability. All our vehicles are equipped with complimentary Wi-Fi, central climate systems, and 24/7 dedicated support.",
    ar: 'في Royal Ride، نفخر بأسطول مركباتنا الحديث والمتنوع الذي يلبي احتياجات عملائنا المختلفة، مع التركيز على الراحة والفخامة والموثوقية. جميع مركباتنا مجهزة بواي فاي مجاني، وتكييف مركزي، وخدمة دعم على مدار الساعة طوال أيام الأسبوع.'
  },
  'fleet.capacity': { en: 'Passengers', ar: 'ركاب' },
  'fleet.luggage': { en: 'Big Bags', ar: 'حقائب ذكية' },
  'fleet.features': { en: 'Key Luxury Amenities', ar: 'مزايا الفخامة والراحة' },
  'fleet.estimator': { en: 'Interactive Fare Estimator', ar: 'مستشار حساب التكلفة التقديرية' },
  'fleet.selectDest': { en: 'Select Destination from Amman / AMM', ar: 'اختر الوجهة من عمان أو مطار الملكة علياء' },
  'fleet.estPrice': { en: 'Estimated Fare', ar: 'التكلفة التقديرية للرحلة' },
  'fleet.disclaimer': { en: 'Includes fuel, flight tracking standby, and specialized toll fees. Authentic billing issued on contact confirmation.', ar: 'تشمل تكلفة الوقود، والانتظار والتعقب للمطار، ورسوم الطرق. يتم إصدار الفاتورة الرسمية عند تأكيد الحجز.' },
  'fleet.bookThis': { en: 'Select & Inquire This Vehicle', ar: 'اختر واستفسر عن هذه المركبة' },
  'fleet.allSpecs': { en: 'Show All Specifications', ar: 'عرض جميع الميزات الفنية' },

  // About
  'about.badge': { en: 'The Royal Legacy', ar: 'الإرث والريادة الملكية' },
  'about.title': { en: 'Our Story & Purpose', ar: 'نبذة عنا ورؤيتنا' },
  'about.p1': {
    en: 'At Royal Ride, we are committed to providing premium transit services to our valued guests. With a modern fleet of prestigious vehicles and professional chauffeurs, we guarantee group safety and seamless travel.',
    ar: 'في Royal Ride، نلتزم بتوفير خدمات نقل ممتازة لعملائنا الكرام. مع أسطول حديث من المركبات الفاخرة وسائقين محترفين، نضمن تجربة سفر مريحة وآمنة.'
  },
  'about.p2': {
    en: 'Whether traveling for corporate meetings or curated leisure, our team is standing ready to satisfy all your travel requests with zero compromise on comfort, luxury, and security.',
    ar: 'سواء كنت مسافرًا من أجل العمل أو الترفيه، فإن فريقنا على استعداد لتلبية جميع احتياجات النقل الخاصة بك مع تقديم رعاية متناهية بالتفاصيل الدقيقة والخصوصية.'
  },
  'about.values': { en: 'Our Sovereign Pillars', ar: 'ركائزنا النبيلة' },
  'about.v1.title': { en: 'Punctuality First', ar: 'الالتزام التام بالمواعيد' },
  'about.v1.desc': { en: 'We arrive 15 minutes before pickup, always. Advanced flight delay monitoring integrated.', ar: 'نصل دائماً قبل موعدكم بـ 15 دقيقة على الأقل، مع تتبع ذكي ولحظي لمواعيد هبوط وإقلاع الطائرات.' },
  'about.v2.title': { en: 'Pristine Shielding', ar: 'النظافة والتعقيم الفائق' },
  'about.v2.desc': { en: 'Every car is detailed and sanitized prior to every dispatch. Complimentary refreshments.', ar: 'يتم تعقيم وغسيل كل مركبة تفصيلياً قبل كل انطلاق، مع توفير المياه المعدنية والمناديل المعطرة مجاناً.' },
  'about.v3.title': { en: 'Absolute Protocol', ar: 'السرية والبروتوكول الدبلوماسي' },
  'about.v3.desc': { en: 'Discreet, background-checked English speaking drivers bound to severe NDA trust.', ar: 'سائقون مهذبون يتحدثون الإنجليزية بطلاقة ويلتزمون بأعلى معايير السرية التامة وحفظ الخصوصية.' },
  'about.team': { en: 'Meet Our Command leadership', ar: 'تعرف على قادة فريق العمل والتشغيل' },
  'about.driverTitle': { en: 'Elite Chauffeur Captains', ar: 'قادة الأسطول من السائقين المحترفين' },

  // Partners
  'partners.badge': { en: 'Sovereign Alliances', ar: 'شراكات النخبة والمصداقية' },
  'partners.title': { en: 'Trusted Partners & Affiliates', ar: 'شركاؤنا وعملاؤنا في قطاع الفنادق الفاخرة' },
  'partners.desc': {
    en: 'We are proud to serve as the preferred hospitality fleet for VIP concierge desks at many five-star luxury chains in Amman.',
    ar: 'نفخر بكوننا مزود النقل المعتمد لكونسيرج كبار الشخصيات والنزلاء في أرقى السلاسل الفندقية ذات الخمس نجوم في عمان.'
  },
  'partners.ctaText': {
    en: 'Are you looking for corporate account facilitation? We provide tailored monthly invoice solutions for embassies and large establishments.',
    ar: 'هل تبحث عن تسهيلات لحسابات دائم للشركات؟ نوفر حلول فوترة شهرية مخصصة للسفارات والمؤسسات الكبرى.'
  },
  'partners.ctaBtn': { en: 'Request Corporate Account • طلب حساب شركات', ar: 'طلب فتح حساب شركات ومؤسسات' },

  // Reviews
  'reviews.title': { en: 'Patron Endorsements', ar: 'آراء وشهادات عملائنا الكرام' },
  'reviews.subtitle': { en: 'Verifiable luxury reviews from esteemed travelers', ar: 'تقييمات وشهادات حقيقية وموثقة من كبار عملائنا وسوار الأردن' },

  // Contact
  'contact.title': { en: 'VIP Inquiry & Booking Command', ar: 'نموذج الحجز والاستفسار المباشر' },
  'contact.badge': { en: 'Secure Carriage', ar: 'حجز آمن وفوري' },
  'contact.step1': { en: 'Select Service & Vehicle Type', ar: 'اختر نوع الخدمة والمركبة المفضلة' },
  'contact.step2': { en: 'Chauffeur Schedule & Route Information', ar: 'جدول مواعيد الرحلة ومعلومات الطريق' },
  'contact.step3': { en: 'Passenger Coordinates & Inquiry Complete', ar: 'بيانات الركاب وتأكيد إرسال الطلب' },
  'contact.pickupLocation': { en: 'Pickup Location', ar: 'موقع الركوب والبدء' },
  'contact.dropoffLocation': { en: 'Destination Location', ar: 'موقع النزول والوصول' },
  'contact.pickupDate': { en: 'Pickup Date', ar: 'تاريخ الرحلة والركوب' },
  'contact.pickupTime': { en: 'Pickup Time (24h Local)', ar: 'وقت الركوب التقديري' },
  'contact.flightNumber': { en: 'Flight Number (Optional for Airport AMM)', ar: 'رقم الرحلة الجوية (يفضل لمنفذ المطار)' },
  'contact.borderNotes': { en: 'Border crossing preferences or transit notes', ar: 'ملاحظات المعابر الحدودية أو تفاصيل الترانزيت' },
  'contact.notes': { en: 'Special Requests (e.g., Baby Seat, Cold Champagne Beverage, Security Escort)', ar: 'طلبات خاصة (مثل: مقعد طفل، مياه مبردة إضافية، مرافق أمني)' },
  'contact.name': { en: 'Passenger Full Name', ar: 'الاسم الكامل للراكب الرئيسي' },
  'contact.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'contact.phone': { en: 'WhatsApp Mobile Number', ar: 'رقم الهاتف المتصل بالواتساب' },
  'contact.submitBtn': { en: 'Confirm & Generate Invoice Inquiry', ar: 'تأكيد الحجز وتوليد الفاتورة التقديرية' },
  'contact.history': { en: 'My Local Bookings History', ar: 'سجل حجوزاتي السابقة على هذا الجهاز' },
  'contact.noHistory': { en: 'No bookings found on this browser.', ar: 'لا توجد طلبات سابقة مسجلة في هذا المتصفح حالياً.' },

  // Blog
  'blog.badge': { en: 'Levant Dispatch', ar: 'مدونة السفر والنقل بالأردن' },
  'blog.title': { en: 'Levant Travel & Chauffeur Journal', ar: 'دليل ورائد السفر في الأردن والمنطقة' },
  'blog.desc': {
    en: 'Expert coordinate planning, historical route context, and optimization advice for discerning travelers navigating the Hashemite Kingdom of Jordan.',
    ar: 'تخطيط السفر من قبل خبراء الحركة والنقل، لمحات تاريخية عن الطرق، ونصائح هامة للمسافرين المهتمين بأعلى مستويات الجودة في الأردن.'
  },
  'blog.readMore': { en: 'Read Full Post', ar: 'اقرأ المقال كاملاً' },
  'blog.back': { en: 'Back to Journal', ar: 'العودة إلى المدونة' },

  // Footer
  'footer.desc': {
    en: 'Royal Ride Jordan is the Hashemite Kingdom’s elite boutique private transfer and chauffeur logistics registry. Established in Amman since 2010.',
    ar: 'رويال رايد الأردن هي الشركة النخبوية الأبرز لخدمات النقل الخاص والخدمات اللوجستية للسائق المحترف في المملكة الأردنية الهاشمية. تأسست عام 2010.'
  },
  'footer.quickLinks': { en: 'Sovereign Navigation', ar: 'روابط هامة وسريعة' },
  'footer.fleetShowcase': { en: 'Fleet Showcase', ar: 'معرض الأسطول الفخم' },
  'footer.contacts': { en: 'Contact Desk', ar: 'مكتب التواصل المباشر' },
  'footer.rights': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },

  // New keys
  'header.home': { en: 'Home', ar: 'الصفحة الرئيسية' },
  'header.about': { en: 'About', ar: 'من نحن' },
  'header.services': { en: 'Services', ar: 'خدماتنا' },
  'header.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'tours.title': { en: 'Explore Jordan with Royal Ride\'s Luxury Tours', ar: 'استكشف الأردن مع رحلات رويال رايد الفاخرة' },
  'tours.subtitle': { en: 'Customized Daily Trips to Petra, Wadi Rum, and the Dead Sea', ar: 'رحلات يومية مخصصة إلى البتراء، وادي رم، والبحر الميت' },
  'tours.desc': {
    en: 'Experience the best of Jordan with <strong>luxury transportation</strong> from Royal Ride Jordan. Our tailored <strong>daily tours</strong> take you on an unforgettable adventure to the country\'s most famous attractions, including the rose-red city of <strong>Petra</strong>, the stunning desert landscapes of <strong>Wadi Rum</strong>, and the therapeutic mineral waters of the <strong>Dead Sea</strong>.',
    ar: 'اختبر أفضل ما في الأردن مع خدمة النقل الفاخرة من رويال رايد الأردن. تأخذك رحلاتنا اليومية المصممة خصيصاً في مغامرة لا تُنسى إلى أشهر معالم البلاد، بما في ذلك مدينة <strong>البتراء</strong> الوردية، ومناظر <strong>وادي رم</strong> الصحراوية الخلابة، والمياه المعدنية العلاجية في <strong>البحر الميت</strong>.'
  },
  'amman.title': { en: 'Top 5 Experiences You Must Have in Amman', ar: 'أفضل 5 تجارب سياحية لا بد لك من تجربتها في عمان' },
  'amman.desc': { en: "Jordan's capital city Amman is a vibrant metropolis that combines ancient charm with modern sophistication. Here are the top 5 experiences you must enjoy during your visit:", ar: 'مدينة عمان، عاصمة الأردن، هي مدينة نابضة بالحياة تجمع بين السحر القديم والرقي الحديث. إليك أفضل 5 تجارب يجب أن تستمتع بها خلال زيارتك:' },
  'amman.item1': { en: 'Explore the ancient Amman Citadel', ar: 'استكشف قلعة عمان التاريخية' },
  'amman.item2': { en: 'Savor Middle Eastern flavors in downtown', ar: 'تذوق النكهات الشرقية في وسط المدينة' },
  'amman.item3': { en: 'Shop for handcrafted souvenirs and rugs at Jara Market', ar: 'تسوق للهدايا التذكارية اليدوية والسجاد في سوق جارا' },
  'amman.item4': { en: 'Watch a stunning sunset from Jabal Al Qala\'a', ar: 'شاهد غروب الشمس المذهل من جبل القلعة' },
  'amman.item5': { en: 'Relax in a traditional Eastern hammam', ar: 'استرخ في حمام شرقي تقليدي' }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('royalride_lang');
    if (saved === 'ar' || saved === 'en') return saved;
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'ar') ? 'ar' : 'en';
  });

  const isRtl = language === 'ar';

  useEffect(() => {
    localStorage.setItem('royalride_lang', language);
    // Apply lang attribute but keep direction as LTR to prevent layout shifts
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    if (isRtl) {
      document.body.classList.add('font-arabic-adjust');
      document.title = 'رويال رايد - خدمات النقل الفاخرة في الأردن';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'رويال رايد - نقدم خدمات نقل فاخرة ومميزة في جميع أنحاء الأردن، ليموزين، فانات VIP، وحجوزات حصرية.');
      }
    } else {
      document.body.classList.remove('font-arabic-adjust');
      document.title = 'Royal Ride - Luxury Transportation Services in Jordan';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Experience luxury transportation services in Jordan with Royal Ride. We offer a modern fleet of vehicles, elite limousine services, and exclusive hotel and dining reservations.');
      }
    }
  }, [language, isRtl]);

  const t = React.useCallback((key: string): string => {
    const record = translations[key];
    if (!record) return key;
    return record[language] || key;
  }, [language]);

  const value = React.useMemo(() => ({ language, setLanguage, t, isRtl }), [language, setLanguage, t, isRtl]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
