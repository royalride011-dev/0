import React, { useState, MouseEvent } from 'react';
import { useLanguage } from '../LanguageContext';
import { images } from '../imageRegistry';
import './ServicesShowcase.css';

interface ServicesShowcaseProps {
  onSelectServiceAndInquire: (serviceId: string) => void;
  preSelectedId?: string;
}

const SERVICE_DETAILS: Record<string, {
  longDesc: string;
  longDescAr: string;
  features: string[];
  featuresAr: string[];
}> = {
  'limousine-passenger': {
    longDesc: 'Prestige travel for executive patrons and VIP guests, carried in silence from the first mile to the last. Our highly experienced, bilingual, background-checked chauffeurs manage Jordan’s traffic flawlessly.',
    longDescAr: 'تنقل كبار الشخصيات والدبلوماسيين بخصوصية ووقار تام. يتولى طاقمنا المحترف والمؤهل أمنياً تيسير تحركاتكم بسيارات ليموزين فاخرة مجهزة بالكامل.',
    features: [
      'Background-checked professional chauffeurs',
      'Suited and multilingual (English & Arabic) crew',
      'Continuous coordinate planning and ceremonial layouts'
    ],
    featuresAr: [
      'سائقون محترفون خاضعون لمسح أمني شامل للسرية والخصوصية',
      'طاقم ذو هندام رسمي كامل ويتحدث الإنجليزية بطلاقة',
      'تنسيق فوري لكامل المسارات وبروتوكولات المناسبات الرسمية'
    ]
  },
  'airport-transit-jordan': {
    longDesc: 'Experience zero-stress airport transfers. Our team tracks your flights live via satellite schedules to adjust pick-up times for any delays automatically.',
    longDescAr: 'تخلص من عناء تتبع أوقات الرحلات وضغوطات اللحاق بالطائرة. نتبع لحظياً حركة الطيران لنضمن استقبالكم بمواعيد دقيقة دون تأخير.',
    features: [
      'Continuous computerized flight tracking system',
      'Complimentary airport terminal parking fees included',
      'Luggage assistance by suited personnel at arrivals'
    ],
    featuresAr: [
      'تتبع آلي محوسب لرحلات الطيران لمنع التأثر بتبديل المواعيد',
      'مواقف المطار مجانية بالكامل ومشمولة ضمن الخدمة',
      'مساعدة فورية في مناولة وحمل الأمتعة بكافة الأحجام'
    ]
  },
  'border-crossings-jordan': {
    longDesc: 'Seamless transit connections to bridges and West Bank borders. We schedule customized pickups and dropoffs perfectly timed to align with bridge operating hours, avoiding terminal confusion.',
    longDescAr: 'اجعل حركتك وتنقلاتك ميسرة تماماً عند عبورك للمعابر الحدودية والجسور التاريخية. ننسق مواعيدك لتتطابق بدقة فائقة مع ساعات العمل لتجنب أي تأخير.',
    features: [
      'Coverage for King Hussein & Sheikh Hussein Bridges',
      'Specially authorized border vehicles for quick drop-offs',
      'Coordination with VIP bridge shuttle protocols'
    ],
    featuresAr: [
      'تغطية كاملة لجسر الملك حسين وجسر الشيخ حسين ومعبر وادي عربة',
      'مركبات مرخصة للمنافذ لتسهيل الانتقال السريع وتخطي الزحام',
      'التنسيق التام مع بروتوكولات العبور والـ VIP المعتمدة'
    ]
  },
  'international-transit': {
    longDesc: 'Travel smoothly across borders with our highly specialized regional service. We handle cross-border documentation clearance, security inspections, and coordinate terminal pathways between Jordan, Syria, and Lebanon.',
    longDescAr: 'سافر براحة وطمأنينة متناهية عبر المعابر الإقليمية. يتولى كباتننا المتمرسون تيسير مستندات العبور وتراخيص الدخول بين الأردن وسوريا ولبنان.',
    features: [
      'Comprehensive cross-border permit clearances',
      'Highly veteran regional route-certified drivers',
      'Direct, continuous point-to-point interstate travel'
    ],
    featuresAr: [
      'حزمة شاملة لإجراءات وتصاريح المرور والمستندات الحدودية',
      'سائقون خبراء بمعابر وحالة الطرق البرية الدولية للشام ولبنان',
      'انتقال متصل مريح وآمن من الباب إلى الباب'
    ]
  },
  'airport-meet-greet': {
    longDesc: 'Transition seamlessly from flight to vehicle cabin. A suited Royal Ride concierge agent awaits you holding a digital placard with your name or brand, managing heavy luggage.',
    longDescAr: 'كن في طليعة الدلال. يستقبلك ممثلنا داخل مطار الملكة علياء بلافتة تحمل اسمك أو شعار شركتك ليتولى بالنيابة عنك تداول الحقائب وتيسير خروجك.',
    features: [
      'Instant unmistakable visual identification inside terminals',
      'Baggage porterage direct to the vehicle trunk',
      'Priority fast-track lanes guidance options'
    ],
    featuresAr: [
      'تمييز بصري فوري وسهل لاسم الضيف أو الشعار فور الهبوط بصالة المطار',
      'حمل ونقل كامل للحقائب والأمتعة الثقيلة إلى صندوق السيارة مباشرة',
      'خيارات دعم وتسهيل عبر المسارات السريعة لصالات المطار'
    ]
  },
  'car-van-rentals': {
    longDesc: 'Compare our pristine, meticulously maintained fleet. Select from luxury executive sedans, high-capacity VIP vans, or commanding ultimate SUVs, available with self-drive or certified chauffeurs.',
    longDescAr: 'امتلك حرية الاختيار بمستويات نظافة وتعقيم تامة. فانات عائلية واسعة وسيارات سيدان حديثة مجهزة للقيادة الذاتية أو بصحبة سائق متميز.',
    features: [
      'Flexible daily, weekly, or monthly self-drive contracts',
      'Latest premium models with active safety assist tech',
      'All-inclusive road hazard protections across Jordan'
    ],
    featuresAr: [
      'خيارات تأجير مرنة لليوم الواحد، الأسبوع أو الشهر للقيادة الذاتية',
      'أحدث الموديلات المزودة بأمان نشط وأنظمة مساعدة القيادة المتطورة',
      'تغطية تأمينية وأمان إلكتروني شامل على كافة الطرقات الأردنية'
    ]
  },
  'daily-hourly-rentals': {
    longDesc: 'Control your time in Amman. Charter a luxury vehicle and personal driver in blocks of hours for ultimate convenience. The driver remains on strict standby, synchronized with your meetings.',
    longDescAr: 'أنتم أسياد وقتكم ومواعيدكم. يظل سائقك والسيارة الفاخرة في حالة استعداد وتشغيل تام وتحت رهن إشارتكم ليتطابق بدقة مع جداول أعمالكم المتغيرة.',
    features: [
      'Flexible time blocks (4h, 8h, or full multi-day shifts)',
      'Infinite mileage limits within the city limits of Amman',
      'On-demand destination switches as your schedule changes'
    ],
    featuresAr: [
      'حجوزات مرنة باليوم أو بنظام الساعات (4 ساعات، 8 ساعات، إلخ)',
      'أميال تنقل مفتوحة وغير محدودة داخل حدود العاصمة عمان',
      'تعديل فوري ومباشر للوجهات والمسارات دون غرامات تأخير'
    ]
  },
  'corporate-transportation': {
    longDesc: 'Enable a mobile office experience for your guests and executives with flexible corporate arrangements, postpaid monthly billing systems, and absolute privacy safeguards.',
    longDescAr: 'وفر بيئة عمل متنقلة لشركتكم وزواركم الأجانب. نعد شريك اللوجستيات الأفضل في عمان من خلال تقديم تسهيلات الفوترة الشهرية والسرية التامة.',
    features: [
      'Custom postpaid corporate account billing options',
      'VIP express bookings priority during peak seasons',
      'Nondisclosure agreement (NDA) absolute privacy standards'
    ],
    featuresAr: [
      'خيارات فوترة مرنة بالدفع الآجل للشركات والسفارات والهيئات',
      'أولوية قصوى واختصار أوقات الحجوزات الفورية في مواسم الذروة',
      'التزام تام بالسرية المطلقة واتفاقيات عدم الإفصاح لرجال الأعمال'
    ]
  },
  'hotel-restaurant-bookings': {
    longDesc: 'Through our deep-rooted partnerships with Five-Star luxury hospitality brands in Amman, Petra, and Aqaba, we assist with preferential room bookings, suite upgrades, and priority table reservations.',
    longDescAr: 'نوفر لكم بفضل علاقاتنا الوطيدة مع الفنادق الرائدة والمطاعم الشهيرة حجزاً تفصيلياً مميزاً مع الاستقبال الخاص وترتيب أرقى مستويات الضيافة.',
    features: [
      'Direct coordination with 5-star VIP hotel concierge desks',
      'Priority bookings at fully-booked peak season restaurants',
      'Tailored hotel transfer pick-ups synced automatically'
    ],
    featuresAr: [
      'تنسيق مباشر مع مكاتب إدارة الحجوزات بالفنادق الشهيرة بموثوقية',
      'أولوية قصوى واختصار أوقات حجز الطاولات المزدحمة بالمطاعم الفاخرة',
      'مزامنة فورية لنقاط نقل وإقلال الركاب من عتبات الفندق ووصولاً للوجهة'
    ]
  }
};

interface PackageDetailsOverlayProps {
  title: string;
  desc: string;
  features: string[];
  onAction: () => void;
  onClose: (e: MouseEvent) => void;
  language: 'en' | 'ar';
}

function PackageDetailsOverlay({
  title,
  desc,
  features,
  onAction,
  onClose,
  language
}: PackageDetailsOverlayProps) {
  return (
    <div className="package-details-overlay">
      <div className="details-header">
        <span className="details-title">{title}</span>
        <button 
          className="close-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <p className="details-desc">{desc}</p>
      
      <div className="details-features">
        {features.map((feat, i) => (
          <div key={i} className="feature-item">
            <span className="feature-icon">◆</span>
            <span className="feature-text">{feat}</span>
          </div>
        ))}
      </div>
      
      <button 
        className="details-action"
        onClick={(e) => {
          e.stopPropagation();
          onAction();
        }}
      >
        {language === 'en' ? 'Reserve Package' : 'احجز هذه الباقة'}
      </button>
    </div>
  );
}

const LOCAL_STORAGE_KEY = 'royal_ride_services_images';

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop', name: 'S-Class Luxury Sedans' },
  { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop', name: 'VIP Porsche' },
  { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop', name: 'Luxury Jet Van' },
  { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop', name: 'Airport Runway Aviation' },
  { url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop', name: 'Executive Meeting' },
  { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop', name: 'Petra Jordan Heritage' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', name: 'Aqaba Luxury Sea Coast' },
  { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600&auto=format&fit=crop', name: 'Luxury Suburban Mansion' },
];

interface ImageCustomizeOverlayProps {
  serviceId: string;
  currentUrl: string;
  onSave: (url: string) => void;
  onReset: () => void;
  onClose: () => void;
  language: 'en' | 'ar';
}

function ImageCustomizeOverlay({
  serviceId,
  currentUrl,
  onSave,
  onReset,
  onClose,
  language
}: ImageCustomizeOverlayProps) {
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [dragActive, setDragActive] = useState(false);

  React.useEffect(() => {
    setInputUrl(currentUrl);
  }, [currentUrl]);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          onSave(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="image-customize-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="customize-header">
        <span className="customize-title">
          {language === 'en' ? 'Customize Card Image' : 'تخصيص صورة المربع'}
        </span>
        <button 
          className="close-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} 
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="customize-scrollable">
        <div className="section-label">
          {language === 'en' ? 'Select Preset Luxury Photo' : 'اختر صورة فاخرة جاهزة'}
        </div>
        <div className="presets-grid">
          {PRESET_IMAGES.map((preset, index) => (
            <button
              key={index}
              className={`preset-thumb ${currentUrl === preset.url ? 'active' : ''}`}
              style={{ backgroundImage: `url(${preset.url})` }}
              title={preset.name}
              onClick={(e) => {
                e.stopPropagation();
                onSave(preset.url);
              }}
            />
          ))}
        </div>

        <div className="section-label" style={{ marginTop: '12px' }}>
          {language === 'en' ? 'Upload Image File' : 'تحميل ملف صورة'}
        </div>
        <label 
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={(e) => e.stopPropagation()}
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <span className="dropzone-text">
            {language === 'en' ? 'Click or Drag photo here' : 'انقر أو اسحب الصورة هنا'}
          </span>
        </label>

        <div className="section-label" style={{ marginTop: '12px' }}>
          {language === 'en' ? 'Or Paste Image URL' : 'أو الصق رابط الصورة'}
        </div>
        <div className="url-input-row" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            className="url-textbox"
            placeholder={language === 'en' ? 'https://example.com/photo.jpg' : 'ضع رابط الصورة هنا...'}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button 
            className="apply-url-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (inputUrl.trim()) {
                onSave(inputUrl.trim());
              }
            }}
          >
            {language === 'en' ? 'Apply' : 'تطبيق'}
          </button>
        </div>
      </div>

      <div className="customize-footer" onClick={(e) => e.stopPropagation()}>
        <button 
          className="reset-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
        >
          {language === 'en' ? 'Reset to Default' : 'استعادة الأصلية'}
        </button>
      </div>
    </div>
  );
}

export default function ServicesShowcase({ onSelectServiceAndInquire, preSelectedId }: ServicesShowcaseProps) {
  const { language, isRtl, isAdmin } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(preSelectedId || null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  React.useEffect(() => {
    if (preSelectedId) {
      setActiveCardId(preSelectedId);
      setTimeout(() => {
        const el = document.getElementById(preSelectedId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [preSelectedId]);

  const [cardImages, setCardImages] = useState<Record<string, string>>(() => {
    const current: Record<string, string> = {};
    current['limousine-passenger'] = localStorage.getItem('rr_img_override_services_limousinePassenger') || images.services.limousinePassenger;
    current['airport-transit-jordan'] = localStorage.getItem('rr_img_override_services_airportTransitJordan') || images.services.airportTransitJordan;
    current['border-crossings-jordan'] = localStorage.getItem('rr_img_override_services_vipSClassAmman') || images.services.vipSClassAmman;
    current['international-transit'] = localStorage.getItem('rr_img_override_services_internationalTransit') || images.services.internationalTransit;
    current['airport-meet-greet'] = localStorage.getItem('rr_img_override_services_airportMeetGreet') || images.services.airportMeetGreet;
    current['car-van-rentals'] = localStorage.getItem('rr_img_override_services_carVanRentals') || images.services.carVanRentals;
    current['daily-hourly-rentals'] = localStorage.getItem('rr_img_override_services_stariaHourlyDaily') || images.services.stariaHourlyDaily;
    current['corporate-transportation'] = localStorage.getItem('rr_img_override_services_corporateTransportation') || images.services.corporateTransportation;
    current['hotel-restaurant-bookings'] = localStorage.getItem('rr_img_override_services_hotelRestaurantBookings') || images.services.hotelRestaurantBookings;
    return current;
  });

  // Preload all services card images for instant digital presentation
  React.useEffect(() => {
    if (typeof window !== 'undefined' && cardImages) {
      Object.values(cardImages).forEach((url) => {
        if (url) {
          const img = new Image();
          img.src = url as string;
        }
      });
    }
  }, [cardImages]);

  const updateCardImage = (serviceId: string, url: string) => {
    const SERVICE_OVERRIDE_KEYS: Record<string, string> = {
      'limousine-passenger': 'services_limousinePassenger',
      'airport-transit-jordan': 'services_airportTransitJordan',
      'border-crossings-jordan': 'services_vipSClassAmman',
      'international-transit': 'services_internationalTransit',
      'airport-meet-greet': 'services_airportMeetGreet',
      'car-van-rentals': 'services_carVanRentals',
      'daily-hourly-rentals': 'services_stariaHourlyDaily',
      'corporate-transportation': 'services_corporateTransportation',
      'hotel-restaurant-bookings': 'services_hotelRestaurantBookings',
    };
    
    const overrideKey = SERVICE_OVERRIDE_KEYS[serviceId];
    if (overrideKey) {
      localStorage.setItem(`rr_img_override_${overrideKey}`, url);
    }
    
    setCardImages(prev => ({ ...prev, [serviceId]: url }));
    setEditingImageId(null);
  };

  const resetCardImage = (serviceId: string) => {
    const SERVICE_OVERRIDE_KEYS: Record<string, string> = {
      'limousine-passenger': 'services_limousinePassenger',
      'airport-transit-jordan': 'services_airportTransitJordan',
      'border-crossings-jordan': 'services_vipSClassAmman',
      'international-transit': 'services_internationalTransit',
      'airport-meet-greet': 'services_airportMeetGreet',
      'car-van-rentals': 'services_carVanRentals',
      'daily-hourly-rentals': 'services_stariaHourlyDaily',
      'corporate-transportation': 'services_corporateTransportation',
      'hotel-restaurant-bookings': 'services_hotelRestaurantBookings',
    };
    
    const overrideKey = SERVICE_OVERRIDE_KEYS[serviceId];
    if (overrideKey) {
      localStorage.removeItem(`rr_img_override_${overrideKey}`);
    }
    
    const defaults: Record<string, string> = {
      'limousine-passenger': images.services.limousinePassenger,
      'airport-transit-jordan': images.services.airportTransitJordan,
      'border-crossings-jordan': images.services.vipSClassAmman,
      'international-transit': images.services.internationalTransit,
      'airport-meet-greet': images.services.airportMeetGreet,
      'car-van-rentals': images.services.carVanRentals,
      'daily-hourly-rentals': images.services.stariaHourlyDaily,
      'corporate-transportation': images.services.corporateTransportation,
      'hotel-restaurant-bookings': images.services.hotelRestaurantBookings,
    };
    
    setCardImages(prev => ({ ...prev, [serviceId]: defaults[serviceId] }));
    setEditingImageId(null);
  };

  const handleAction = (serviceId: string) => {
    onSelectServiceAndInquire(serviceId);
    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const bookSection = document.getElementById('book');
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleDetails = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveCardId(prev => prev === id ? null : id);
  };

  return (
    <section id="services" className="services-showcase-container" dir={isRtl ? 'rtl' : 'ltr'}>
      {!isAdmin && (
        <style dangerouslySetInnerHTML={{ __html: `
          .edit-image-trigger {
            display: none !important;
          }
        `}} />
      )}
      <div className="wrap">
        
        {/* Head Block */}
        <div className="head">
          <div className="orn">
            <span className="rule"></span>
            <span className="diamond"></span>
            <span className="rule r"></span>
          </div>
          <div className="eyebrow">
            {language === 'en' ? 'Bespoke ground solutions' : 'حلول نقل برية فاخرة مصممة خصيصاً'}
          </div>
          <h1>
            {language === 'en' ? 'Tailored Luxury Carriage' : 'خدمات النقل الفاخرة المصممة حسب الطلب'}
          </h1>
          <p>
            {language === 'en'
              ? 'Our suite of nine premier concierge transfers engineered for embassies, executive boards, and elite global travelers across the Hashemite Kingdom.'
              : 'مجموعة متكاملة من تسع خدمات نقل فاخرة مصممة خصيصاً للسفارات، مجالس الإدارة التنفيذية، ونخبة المسافرين عبر ربوع المملكة الأردنية الهاشمية.'}
          </p>
        </div>

        {/* Hero Showcase (Service 1) */}
        <section 
          id="limousine-service" 
          className={`hero ${activeCardId === 'limousine-passenger' ? 'active' : ''}`}
          onClick={(e) => toggleDetails(e, 'limousine-passenger')}
        >
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>
          <img 
            src={cardImages['limousine-passenger']} 
            alt="" 
            className="himg animate-slowzoom" 
            referrerPolicy="no-referrer"
          />
          <div className="vignette"></div>
          <div className="scrim"></div>

          <button
            className="edit-image-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setEditingImageId('limousine-passenger');
            }}
            title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>

          <div className="hbody">
            <div className="htag">
              {language === 'en' ? 'Signature service' : 'الخدمة المميزة'}
            </div>
            <h2>
              {language === 'en' ? 'Elite limousine passenger transfer' : 'نقل الركاب بالليموزين الفاخر'}
            </h2>
            <p>
              {language === 'en'
                ? 'Prestige travel for executive patrons and VIP guests, carried in silence from the first mile to the last.'
                : 'تنقل نخبة كبار الشخصيات والدبلوماسيين بسيارات الليموزين الفخمة، في هدوء تام وراحة مطلقة من الميل الأول للأخير.'}
            </p>
            <div className="flex gap-4 mt-6 flex-wrap">
              <div 
                className="cta" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction('limousine-passenger');
                }}
              >
                {language === 'en' ? 'Reserve now' : 'احجز الآن'}
              </div>
              <div 
                className="cta" 
                style={{ background: 'rgba(212,175,55,0.15)', borderColor: 'var(--gold-2)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(e, 'limousine-passenger');
                }}
              >
                {language === 'en' ? 'Package Details' : 'تفاصيل الباقة'}
              </div>
            </div>
          </div>

          <PackageDetailsOverlay
            title={language === 'en' ? 'Elite Limousine Package' : 'باقة الليموزين الفاخرة'}
            desc={language === 'en' ? SERVICE_DETAILS['limousine-passenger'].longDesc : SERVICE_DETAILS['limousine-passenger'].longDescAr}
            features={language === 'en' ? SERVICE_DETAILS['limousine-passenger'].features : SERVICE_DETAILS['limousine-passenger'].featuresAr}
            onAction={() => handleAction('limousine-passenger')}
            onClose={() => setActiveCardId(null)}
            language={language}
          />

          {editingImageId === 'limousine-passenger' && (
            <ImageCustomizeOverlay
              serviceId="limousine-passenger"
              currentUrl={cardImages['limousine-passenger']}
              onSave={(url) => updateCardImage('limousine-passenger', url)}
              onReset={() => resetCardImage('limousine-passenger')}
              onClose={() => setEditingImageId(null)}
              language={language}
            />
          )}
        </section>

        {/* Group 1: Transfers & Crossings */}
        <div className="group">
          <div className="glabel">
            <span className="gdot"></span>
            <span className="gtitle">
              {language === 'en' ? 'Transfers & crossings' : 'التنقلات والمعابر'}
            </span>
            <span className="grule"></span>
          </div>
          
          <div className="cards two">
            {/* Card 02: Jordan airports coverage */}
            <div 
              className={`card ${activeCardId === 'airport-transit-jordan' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'airport-transit-jordan')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['airport-transit-jordan']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('airport-transit-jordan');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">02</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Airports' : 'المطارات'}</span>
                <h3>{language === 'en' ? 'Jordan airports coverage' : 'تغطية المطارات الأردنية'}</h3>
                <p>{language === 'en' ? 'AMM & Aqaba, met at arrivals.' : 'مطار الملكة علياء والعقبة، استقبال دافئ عند الوصول.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Jordan Airports' : 'تغطية المطارات الأردنية'}
                desc={language === 'en' ? SERVICE_DETAILS['airport-transit-jordan'].longDesc : SERVICE_DETAILS['airport-transit-jordan'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['airport-transit-jordan'].features : SERVICE_DETAILS['airport-transit-jordan'].featuresAr}
                onAction={() => handleAction('airport-transit-jordan')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'airport-transit-jordan' && (
                <ImageCustomizeOverlay
                  serviceId="airport-transit-jordan"
                  currentUrl={cardImages['airport-transit-jordan']}
                  onSave={(url) => updateCardImage('airport-transit-jordan', url)}
                  onReset={() => resetCardImage('airport-transit-jordan')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>

            {/* Card 03: Border & bridge crossings */}
            <div 
              className={`card ${activeCardId === 'border-crossings-jordan' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'border-crossings-jordan')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['border-crossings-jordan']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('border-crossings-jordan');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">03</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Crossings' : 'المعابر'}</span>
                <h3>{language === 'en' ? 'Border & bridge crossings' : 'توصيل من وإلى المعابر الأردنية'}</h3>
                <p>{language === 'en' ? 'King Hussein & Sheikh Hussein bridges.' : 'جسر الملك حسين وجسر الشيخ حسين.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Border & Bridges' : 'توصيل من وإلى المعابر الأردنية'}
                desc={language === 'en' ? SERVICE_DETAILS['border-crossings-jordan'].longDesc : SERVICE_DETAILS['border-crossings-jordan'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['border-crossings-jordan'].features : SERVICE_DETAILS['border-crossings-jordan'].featuresAr}
                onAction={() => handleAction('border-crossings-jordan')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'border-crossings-jordan' && (
                <ImageCustomizeOverlay
                  serviceId="border-crossings-jordan"
                  currentUrl={cardImages['border-crossings-jordan']}
                  onSave={(url) => updateCardImage('border-crossings-jordan', url)}
                  onReset={() => resetCardImage('border-crossings-jordan')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>

            {/* Card 04: International cross-border */}
            <div 
              className={`card ${activeCardId === 'international-transit' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'international-transit')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['international-transit']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('international-transit');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">04</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Cross-border' : 'عابر للحدود'}</span>
                <h3>{language === 'en' ? 'International cross-border' : 'نقل دولي متميز عابر للحدود'}</h3>
                <p>{language === 'en' ? 'Amman – Damascus – Beirut.' : 'خطوط نقل بري مريحة: عمان – دمشق – بيروت.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Cross-Border' : 'نقل دولي متميز عابر للحدود'}
                desc={language === 'en' ? SERVICE_DETAILS['international-transit'].longDesc : SERVICE_DETAILS['international-transit'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['international-transit'].features : SERVICE_DETAILS['international-transit'].featuresAr}
                onAction={() => handleAction('international-transit')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'international-transit' && (
                <ImageCustomizeOverlay
                  serviceId="international-transit"
                  currentUrl={cardImages['international-transit']}
                  onSave={(url) => updateCardImage('international-transit', url)}
                  onReset={() => resetCardImage('international-transit')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>

            {/* Card 05: Airport hall VIP meet & greet */}
            <div 
              className={`card ${activeCardId === 'airport-meet-greet' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'airport-meet-greet')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['airport-meet-greet']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('airport-meet-greet');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">05</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Arrivals' : 'الاستقبال'}</span>
                <h3>{language === 'en' ? 'Airport hall VIP meet & greet' : 'استقبال كبار الشخصيات بقاعة المطار'}</h3>
                <p>{language === 'en' ? 'Name-board welcome, close pickup.' : 'لافتة ترحيب مخصصة باسم الضيف ومناولة الأمتعة للسيارة.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'VIP Meet & Greet' : 'استقبال كبار الشخصيات بقاعة المطار'}
                desc={language === 'en' ? SERVICE_DETAILS['airport-meet-greet'].longDesc : SERVICE_DETAILS['airport-meet-greet'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['airport-meet-greet'].features : SERVICE_DETAILS['airport-meet-greet'].featuresAr}
                onAction={() => handleAction('airport-meet-greet')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'airport-meet-greet' && (
                <ImageCustomizeOverlay
                  serviceId="airport-meet-greet"
                  currentUrl={cardImages['airport-meet-greet']}
                  onSave={(url) => updateCardImage('airport-meet-greet', url)}
                  onReset={() => resetCardImage('airport-meet-greet')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>
          </div>
        </div>

        {/* Group 2: Rentals */}
        <div className="group">
          <div className="glabel">
            <span className="gdot"></span>
            <span className="gtitle">
              {language === 'en' ? 'Rentals' : 'تأجير وحجوزات السيارات'}
            </span>
            <span className="grule"></span>
          </div>

          <div className="cards two">
            {/* Card 06: Luxury car & van rentals */}
            <div 
              className={`card ${activeCardId === 'car-van-rentals' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'car-van-rentals')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['car-van-rentals']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('car-van-rentals');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">06</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Fleet' : 'الأسطول'}</span>
                <h3>{language === 'en' ? 'Luxury car & van rentals' : 'حجز سيارات وفانات فاخرة'}</h3>
                <p>{language === 'en' ? 'With or without driver.' : 'سيارات سيدان فاخرة وفانات عائلية مع سائق أو بدون.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Car & Van Rentals' : 'حجز سيارات وفانات فاخرة'}
                desc={language === 'en' ? SERVICE_DETAILS['car-van-rentals'].longDesc : SERVICE_DETAILS['car-van-rentals'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['car-van-rentals'].features : SERVICE_DETAILS['car-van-rentals'].featuresAr}
                onAction={() => handleAction('car-van-rentals')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'car-van-rentals' && (
                <ImageCustomizeOverlay
                  serviceId="car-van-rentals"
                  currentUrl={cardImages['car-van-rentals']}
                  onSave={(url) => updateCardImage('car-van-rentals', url)}
                  onReset={() => resetCardImage('car-van-rentals')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>

            {/* Card 07: Daily & hourly executive rentals */}
            <div 
              className={`card ${activeCardId === 'daily-hourly-rentals' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'daily-hourly-rentals')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['daily-hourly-rentals']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('daily-hourly-rentals');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">07</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Flexible' : 'مرن'}</span>
                <h3>{language === 'en' ? 'Daily & hourly executive rentals' : 'حجوزات يومية وبالساعة لرجال الأعمال'}</h3>
                <p>{language === 'en' ? 'Short-term hire, on your schedule.' : 'استئجار مؤقت مرن تحت الطلب بالكامل.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Hourly & Daily Rentals' : 'حجوزات يومية وبالساعة لرجال الأعمال'}
                desc={language === 'en' ? SERVICE_DETAILS['daily-hourly-rentals'].longDesc : SERVICE_DETAILS['daily-hourly-rentals'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['daily-hourly-rentals'].features : SERVICE_DETAILS['daily-hourly-rentals'].featuresAr}
                onAction={() => handleAction('daily-hourly-rentals')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'daily-hourly-rentals' && (
                <ImageCustomizeOverlay
                  serviceId="daily-hourly-rentals"
                  currentUrl={cardImages['daily-hourly-rentals']}
                  onSave={(url) => updateCardImage('daily-hourly-rentals', url)}
                  onReset={() => resetCardImage('daily-hourly-rentals')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>
          </div>
        </div>

        {/* Group 3: Business & Lifestyle */}
        <div className="group">
          <div className="glabel">
            <span className="gdot"></span>
            <span className="gtitle">
              {language === 'en' ? 'Business & lifestyle' : 'الأعمال ونمط الحياة'}
            </span>
            <span className="grule"></span>
          </div>

          <div className="cards two">
            {/* Card 08: Corporate & business VIP solutions */}
            <div 
              className={`card ${activeCardId === 'corporate-transportation' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'corporate-transportation')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['corporate-transportation']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('corporate-transportation');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">08</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Corporate' : 'الشركات'}</span>
                <h3>{language === 'en' ? 'Corporate & business VIP solutions' : 'خدمات الشركات ورجال الأعمال'}</h3>
                <p>{language === 'en' ? 'Executive logistics, weekly billing.' : 'لوجستيات بروتوكولية لرجال الأعمال والوفود مع فوترة دورية.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Corporate Solutions' : 'خدمات الشركات ورجال الأعمال'}
                desc={language === 'en' ? SERVICE_DETAILS['corporate-transportation'].longDesc : SERVICE_DETAILS['corporate-transportation'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['corporate-transportation'].features : SERVICE_DETAILS['corporate-transportation'].featuresAr}
                onAction={() => handleAction('corporate-transportation')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'corporate-transportation' && (
                <ImageCustomizeOverlay
                  serviceId="corporate-transportation"
                  currentUrl={cardImages['corporate-transportation']}
                  onSave={(url) => updateCardImage('corporate-transportation', url)}
                  onReset={() => resetCardImage('corporate-transportation')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </div>

            {/* Card 09: Luxury hotel & fine dining */}
            <section 
              id="luxury-bookings" 
              className={`card ${activeCardId === 'hotel-restaurant-bookings' ? 'active' : ''}`}
              onClick={(e) => toggleDetails(e, 'hotel-restaurant-bookings')}
            >
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <img src={cardImages['hotel-restaurant-bookings']} alt="" className="cimg" referrerPolicy="no-referrer" />
              <div className="cscrim"></div>

              <button
                className="edit-image-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImageId('hotel-restaurant-bookings');
                }}
                title={language === 'en' ? 'Customize Card Image' : 'تغيير صورة المربع'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <span className="cidx">09</span>
              <div className="cbody">
                <span className="ctag">{language === 'en' ? 'Reservations' : 'الحجوزات'}</span>
                <h3>{language === 'en' ? 'Luxury hotel & fine dining' : 'حجوزات الفنادق والمطاعم الفاخرة'}</h3>
                <p>{language === 'en' ? 'Top hotels and destinations, arranged.' : 'تأكيد الحجوزات وخدمات كونسيرج متكاملة لضمان أقصى ترف.'}</p>
                <div className="cline"></div>
              </div>

              <PackageDetailsOverlay
                title={language === 'en' ? 'Concierge & Dining' : 'حجوزات الفنادق والمطاعم الفاخرة'}
                desc={language === 'en' ? SERVICE_DETAILS['hotel-restaurant-bookings'].longDesc : SERVICE_DETAILS['hotel-restaurant-bookings'].longDescAr}
                features={language === 'en' ? SERVICE_DETAILS['hotel-restaurant-bookings'].features : SERVICE_DETAILS['hotel-restaurant-bookings'].featuresAr}
                onAction={() => handleAction('hotel-restaurant-bookings')}
                onClose={() => setActiveCardId(null)}
                language={language}
              />

              {editingImageId === 'hotel-restaurant-bookings' && (
                <ImageCustomizeOverlay
                  serviceId="hotel-restaurant-bookings"
                  currentUrl={cardImages['hotel-restaurant-bookings']}
                  onSave={(url) => updateCardImage('hotel-restaurant-bookings', url)}
                  onReset={() => resetCardImage('hotel-restaurant-bookings')}
                  onClose={() => setEditingImageId(null)}
                  language={language}
                />
              )}
            </section>
          </div>
        </div>

        {/* Cinematic Design Note */}
        <div className="note">
          {language === 'en' ? (
            <>
              <b>What makes it read as cinematic:</b> A single deep contrast grade across every photo (so nine different source images feel shot for one campaign), a slow continuous zoom on the signature hero segment, hairline gold dividers, and a deliberate 1.1s easing curve on card hover.
            </>
          ) : (
            <>
              <b>ما يجعل التصميم سينمائيًا ومتميزًا:</b> درجات تباين وألوان موحدة ومتناسقة تمنح الصور التسعة هوية حملة دعائية واحدة متكاملة، حركة تقريب انسيابية متمهلة على الواجهة المميزة الرئيسية، حواف وزوايا ذهبية بروتوكولية دقيقة، ومنحنى تسارع ناعم مدته 1.1 ثانية عند تمرير مؤشر الفأرة.
            </>
          )}
        </div>

      </div>
    </section>
  );
}
