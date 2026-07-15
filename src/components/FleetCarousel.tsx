import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, Briefcase, CheckSquare, Sparkles, AlertCircle, Crown, Scale, X, Camera, Upload, Link, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../LanguageContext';
import { images, rawImages } from '../imageRegistry';
import { LazyImage } from './LazyImage';
import { compressImageSource } from '../utils/imageCompressor';

gsap.registerPlugin(ScrollTrigger);

const PRESETS_BY_VEHICLE: Record<string, { url: string; labelEn: string; labelAr: string }[]> = {
  'comfort-class': [
    { url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop', labelEn: 'Luxury White Camry', labelAr: 'كامري أبيض فاخر' },
    { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop', labelEn: 'Elite Sedan', labelAr: 'سيدان النخبة' },
    { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop', labelEn: 'Executive Porsche', labelAr: 'بورتشه التنفيذية' }
  ],
  'staria': [
    { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop', labelEn: 'Hyundai Staria Lounge', labelAr: 'هيونداي ستاريا لاونج' },
    { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop', labelEn: 'Luxury Coach', labelAr: 'حافلة فاخرة' },
    { url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop', labelEn: 'Lounge Concept', labelAr: 'مفهوم الصالون الفخم' }
  ],
  'toyota-hiace': [
    { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop', labelEn: 'Hiace Tourer Black', labelAr: 'هايس سياحية سوداء' },
    { url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop', labelEn: 'Group Transporter', labelAr: 'ناقلة المجموعات' }
  ],
  'toyota-coaster': [
    { url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop', labelEn: 'Toyota Coaster White', labelAr: 'تويوتا كوستر أبيض' },
    { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop', labelEn: 'City Shuttle Bus', labelAr: 'حافلة النقل الحضري' }
  ],
  'luxury-cars': [
    { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop', labelEn: 'GMC Yukon Denali', labelAr: 'جي إم سي يوكون دينالي' },
    { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop', labelEn: 'Sports Sovereign', labelAr: 'السيارة الرياضية الفارهة' }
  ]
};

interface FleetCarouselProps {
  onSelectVehicleAndInquire: (vehicleId: string) => void;
}

export default function FleetCarousel({ onSelectVehicleAndInquire }: FleetCarouselProps) {
  const { language, t, isRtl, isAdmin } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [customizingVehicleId, setCustomizingVehicleId] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [customOverrides, setCustomOverrides] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  // Meticulous translation arrays of our prestige vehicles in Jordan
  const VEHICLES_LOCALIZED = [
    {
      id: 'comfort-class',
      name: language === 'en' ? 'Comfort Class' : 'الفئة المريحة (سيدان)',
      type: language === 'en' ? 'Comfort Sedan' : 'سيدان عائلية فاخرة',
      description: language === 'en'
        ? 'Ideal for small groups and families. Featuring premium comfortable sedans like Toyota Camry, Hyundai Sonata, Honda Accord, and similar models. Outstanding choice for smooth airport transfers, hotel routes, and local tourism landmarks.'
        : 'مثالية للمجموعات الصغيرة والعائلات. تضم أسطولاً من السيارات الفاخرة والمريحة من طراز كامري، سوناتا، أكورد، كيا، وهونداي. الخيار الأفضل للانتقال من وإلى المطار والفنادق ومواقعنا السياحية بالأردن.',
      basePrice: '20',
      estimatedPricePerKm: '0.60',
      capacityPassengers: '4',
      capacityLuggage: '3',
      image: images.fleet.comfortClass,
      version: '1783944902635',
      features: language === 'en'
        ? [
            'Ideal for small groups and families',
            'Comfortable premium spacious sedans like Camry & Sonata',
            'Airport, hotel, & scenic sightseeing journeys',
            'Equipped with complementary Wi-Fi & quiet AC'
          ]
        : [
            'مثالية للمجموعات الصغيرة والعائلات للتنقل المريح',
            'سيارات سيدان فاخرة ممتازة وفائقة النظافة برونق ملكي',
            'خدمات التوصيل للمطارات والفنادق والمعالم الأثرية كافة',
            'تكييف متميز ثنائي المناطق مع إنترنت لاسلكي مجاني'
          ]
    },
    {
      id: 'staria',
      name: language === 'en' ? 'Hyundai Staria VIP' : 'هيونداي ستاريا VIP',
      type: language === 'en' ? 'Luxury Multi-Purpose (MPV)' : 'ڤان فاخر وواسع للمجموعات المتوسطة',
      description: language === 'en'
        ? 'Designed for premium executive group travel. Offering state-of-the-art futuristic design, VIP captain lounge seating, and elite business class convenience perfectly matching corporate or luxury family missions.'
        : 'ڤان فاخر وواسع يلبي متطلبات الرفاهية للمجموعات المتوسطة والعائلات. يتسع براحة كبيرة لـ 7 ركاب و10 حقائب في آن واحد مع مقاعد جلدية وراقية.',
      basePrice: '35',
      estimatedPricePerKm: '0.80',
      capacityPassengers: '7',
      capacityLuggage: '5',
      image: images.fleet.stariaVip,
      version: '1783503700776',
      features: language === 'en'
        ? [
            'Luxury Captain seats with electronic leg rests',
            'Spacious interior for high-profile business groups',
            'Dual-zone automatic climate controls',
            'Full privacy window shades and ambient lighting'
          ]
        : [
            'ڤان فاخر وواسع للمجموعات المتوسطة والعائلات',
            'يتسع لـ 7 ركاب و10 حقائب كبيرة بسلاسة فائقة',
            'أبهى تصميم داخلي فسيح مع مقاعد جلدية رئاسية وثيرة',
            'مثالية للغاية للرحلات البعيدة وجولات الأردن السياحية'
          ]
    },
    {
      id: 'toyota-hiace',
      name: language === 'en' ? 'Toyota Hiace Tourer' : 'تويوتا هايس السياحية',
      type: language === 'en' ? 'Group Mini-Van' : 'ڤان متوسط الحجم مثالي للمجموعات الكبيرة',
      description: language === 'en'
        ? 'Highly accommodating passenger mini-van perfect for medium and large groups seeking high volume transport, dual climate cooling, and extensive luggage space.'
        : 'ڤان متوسط الحجم وعملي كلياً، مصمم للمجموعات الكبيرة والوفود السياحية المشتركة. يمتاز بمقاعد مريحة ومنفصلة ومساحة رحبة لوضع الأمتعة والحقائب بأمان.',
      basePrice: '45',
      estimatedPricePerKm: '1.00',
      capacityPassengers: '14',
      capacityLuggage: '13',
      image: images.fleet.toyotaHiace,
      version: '1783789250595',
      features: language === 'en'
        ? [
            'Comfortable seating accommodating up to 14 guests',
            'Deep cabin layout with huge dedicated baggage hold',
            'Ideal for regional transfers & airport routes',
            'Equipped with powerful climate cooling & fast Wi-Fi'
          ]
        : [
            'ڤان متوسط الحجم فخم ومثالي للمجموعات الكبيرة بالأردن',
            'يتسع لـ 14 راكباً و13 حقيبة سفر بالكامل بأمان تام',
            'مقاعد واسعة ومريحة تضمن خصوصية الركوب أثناء الرحلة',
            'مناسبة جداً للنقل من وإلى المطار والرحلات اليومية والوفود'
          ]
    },
    {
      id: 'toyota-coaster',
      name: language === 'en' ? 'TOYOTA COASTER LUXURY VIP' : 'باص تويوتا كوستر لاكشري VIP',
      type: language === 'en' ? 'Luxury Mid-Bus / Coach' : 'باص فخم متكامل للأفواج الكبيرة والرحلات',
      description: language === 'en'
        ? 'The ultimate solution for delegations and large luxury group tours across Jordan. Upgraded VIP interior setup offering maximum space, robust reliability, and premium high-altitude climate control.'
        : 'باص فخم متسع مخصص للأفواج الكبيرة والرحلات الطويلة بين المحافظات. يحتوي على مقاعد وثيرة ومريحة مع تكييف متطور، ومستودع أمتعة سفلي كبير يستوعب الكثير من الحقائب.',
      basePrice: '65',
      estimatedPricePerKm: '1.40',
      capacityPassengers: '22',
      capacityLuggage: '20',
      image: images.fleet.toyotaCoaster,
      version: '1783791446538',
      features: language === 'en'
        ? [
            'Perfect for large tourist groups and official delegations',
            'Premium high-back reclinable seating configurations',
            'Ample under-seat and rear luggage optimization',
            'Advanced PA microphone audio system for tour guiding'
          ]
        : [
            'باص فاخر للمجموعات الكبيرة والرحلات الطويلة عبر مدن الأردن',
            'يتسع لـ 18 راكباً و15 حقيبة كبيرة بأريحية بالغة',
            'مقاعد جلدية فسيحة ومريحة مع مساحة رأسية هائلة للأمتعة والسفر',
            'مثالي كلياً للجولات السياحية والرحلات المشتركة بين مدن المملكة'
          ]
    },
    {
      id: 'luxury-cars',
      name: language === 'en' ? 'VIP LUXURY CARS' : 'جي إم سي يوكون VIP والسيارات الفارهة كبار الشخصيات',
      type: language === 'en' ? 'Elite SUV & Flagship Sedan' : 'أفخم وأرقى خدمات الليموزين والنخبة',
      description: language === 'en'
        ? 'Experience the pinnacle of presidential and royal transportation. Featuring flagship top-tier vehicles like the GMC Yukon Denali and Mercedes-Benz S-Class, meticulously customized for absolute security and diplomatic prestige.'
        : 'أفخم فئاتنا على الإطلاق من سيارات صالون فاخرة وسيارات جي إم سي يوكون الدبل VIP، المحفوظة للمناسبات الرسمية الكبرى واستقبل كبار الوفود الدبلوماسية ورجال الأعمال.',
      basePrice: '80',
      estimatedPricePerKm: '1.80',
      capacityPassengers: '4',
      capacityLuggage: '4',
      image: images.fleet.luxuryGmcYukon,
      version: '1783943957288',
      features: language === 'en'
        ? [
            'Flagship elite vehicles (GMC Yukon Denali / Mercedes S-Class)',
            'Chauffeurs highly trained in VIP and diplomatic protocol',
            'Ultimate acoustic soundproofing and executive prestige',
            'Complimentary premium refreshments and VIP amenities'
          ]
        : [
            'أفخم سياراتنا للمناسبات الخاصة ونقل كبار الشخصيات (جي إم سي يوكون ومرسيدس S-Class)',
            'مجموعة مختارة من الطرازات الفاخرة والفارهة عند الحجز',
            'خدمة الليموزين الملكية مع سائق خاص ذي خبرة وبروتوكول رسمي',
            'باقات مخصصة بالطلب لأبرز المعايير وفنادق الخمس نجوم'
          ]
    }
  ];

  const prevVehicle = () => {
    setActiveIndex((prev) => (prev === 0 ? VEHICLES_LOCALIZED.length - 1 : prev - 1));
  };

  const nextVehicle = () => {
    setActiveIndex((prev) => (prev === VEHICLES_LOCALIZED.length - 1 ? 0 : prev + 1));
  };

  const currentVehicle = VEHICLES_LOCALIZED[activeIndex];

  // Load custom overrides on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const overrides: Record<string, string> = {};
      const vehicleKeys = {
        'comfort-class': 'fleet_comfortClass',
        'staria': 'fleet_stariaVip',
        'toyota-hiace': 'fleet_toyotaHiace',
        'toyota-coaster': 'fleet_toyotaCoaster',
        'luxury-cars': 'fleet_luxuryGmcYukon'
      };
      const codeDefaultImages: Record<string, string> = {
        'comfort-class': rawImages.fleet.comfortClass,
        'staria': rawImages.fleet.stariaVip,
        'toyota-hiace': rawImages.fleet.toyotaHiace,
        'toyota-coaster': rawImages.fleet.toyotaCoaster,
        'luxury-cars': rawImages.fleet.luxuryGmcYukon
      };
      Object.entries(vehicleKeys).forEach(([id, key]) => {
        const rawDefault = codeDefaultImages[id] || '';
        const savedDefaultRef = localStorage.getItem(`rr_img_default_ref_${key}`);
        
        // If the code reference for the image has changed (e.g., regenerated by AI Studio), 
        // we must clear the old local storage override immediately to let the new code-defined image show!
        if (savedDefaultRef && savedDefaultRef !== rawDefault) {
          localStorage.removeItem(`rr_img_override_${key}`);
          localStorage.setItem(`rr_img_default_ref_${key}`, rawDefault);
          return;
        }
        
        localStorage.setItem(`rr_img_default_ref_${key}`, rawDefault);

        const saved = localStorage.getItem(`rr_img_override_${key}`);
        if (saved && saved.trim()) {
          if (saved.includes('regenerated_image_') && rawDefault.includes('regenerated_image_')) {
            const savedMatch = saved.match(/regenerated_image_(\d+)/);
            const defaultMatch = rawDefault.match(/regenerated_image_(\d+)/);
            if (savedMatch && defaultMatch && savedMatch[1] !== defaultMatch[1]) {
              localStorage.removeItem(`rr_img_override_${key}`);
              return;
            }
          }
          overrides[id] = saved;
        }
      });
      setCustomOverrides(overrides);
    }
  }, []);

  // Autoplay disabled as requested. The carousel is now fully manually controlled via Next/Prev buttons and options.
  useEffect(() => {
    // Autoplay interval removed to allow manual user-driven navigation
    // Reset image error state for the active vehicle so it gets a fresh try to load
    setImageErrors((prev) => {
      if (prev[currentVehicle.id]) {
        const copy = { ...prev };
        delete copy[currentVehicle.id];
        return copy;
      }
      return prev;
    });
  }, [customizingVehicleId, activeIndex, currentVehicle.id]);

  const handleUpdateImage = async (vehicleId: string, newImage: string) => {
    try {
      let compressedImage = await compressImageSource(newImage, 1000, 1000, 0.75);
      
      const vehicleKeys: Record<string, string> = {
        'comfort-class': 'fleet_comfortClass',
        'staria': 'fleet_stariaVip',
        'toyota-hiace': 'fleet_toyotaHiace',
        'toyota-coaster': 'fleet_toyotaCoaster',
        'luxury-cars': 'fleet_luxuryGmcYukon'
      };
      
      const key = vehicleKeys[vehicleId];
      if (key) {
        try {
          localStorage.setItem(`rr_img_override_${key}`, compressedImage);
        } catch (storageError) {
          console.warn('LocalStorage quota exceeded. Re-compressing to smaller dimensions...');
          // Re-compress much more aggressively (600x600, quality 0.5) to fit under storage limits
          compressedImage = await compressImageSource(newImage, 600, 600, 0.5);
          try {
            localStorage.setItem(`rr_img_override_${key}`, compressedImage);
          } catch (secondError) {
            console.error('Failed to save even with extreme compression:', secondError);
            alert(language === 'en' 
              ? 'Storage quota exceeded. Please clear some custom images or use web URLs instead of file uploads.' 
              : 'تم تجاوز المساحة التخزينية المتاحة بالمتصفح. يرجى استخدام رابط ويب للصورة بدلاً من الرفع المباشر.');
          }
        }
      }
      
      setCustomOverrides((prev) => ({ ...prev, [vehicleId]: compressedImage }));
      
      setImageErrors((prev) => {
        const copy = { ...prev };
        delete copy[vehicleId];
        return copy;
      });
    } catch (err) {
      console.error('Error compressing or updating vehicle image:', err);
    }
  };

  const handleFileUpload = async (vehicleId: string, file: File) => {
    if (!file) return;
    try {
      const compressedImage = await compressImageSource(file, 1000, 1000, 0.75);
      await handleUpdateImage(vehicleId, compressedImage);
    } catch (err) {
      console.error('Error uploading and compressing file:', err);
    }
  };

  const handleResetImage = (vehicleId: string) => {
    const vehicleKeys: Record<string, string> = {
      'comfort-class': 'fleet_comfortClass',
      'staria': 'fleet_stariaVip',
      'toyota-hiace': 'fleet_toyotaHiace',
      'toyota-coaster': 'fleet_toyotaCoaster',
      'luxury-cars': 'fleet_luxuryGmcYukon'
    };
    const key = vehicleKeys[vehicleId];
    if (key) {
      localStorage.removeItem(`rr_img_override_${key}`);
    }
    setCustomOverrides((prev) => {
      const copy = { ...prev };
      delete copy[vehicleId];
      return copy;
    });
    setImageErrors((prev) => {
      const copy = { ...prev };
      delete copy[vehicleId];
      return copy;
    });
  };

  const getVehicleImage = (vehicle: { id: string; image: string; version?: string }) => {
    let imgPath = 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
    if (customOverrides[vehicle.id]) {
      imgPath = customOverrides[vehicle.id];
    } else if (imageErrors[vehicle.id]) {
      switch (vehicle.id) {
        case 'comfort-class':
          imgPath = 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
          break;
        case 'staria':
          imgPath = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop';
          break;
        case 'toyota-hiace':
          imgPath = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop';
          break;
        case 'toyota-coaster':
          imgPath = 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop';
          break;
        case 'luxury-cars':
          imgPath = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';
          break;
        default:
          imgPath = 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
      }
    } else {
      const codeDefaults: Record<string, string> = {
        'comfort-class': rawImages.fleet.comfortClass,
        'staria': rawImages.fleet.stariaVip,
        'toyota-hiace': rawImages.fleet.toyotaHiace,
        'toyota-coaster': rawImages.fleet.toyotaCoaster,
        'luxury-cars': rawImages.fleet.luxuryGmcYukon
      };
      imgPath = codeDefaults[vehicle.id] || vehicle.image || 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
    }

    // Apply cache-busting version parameter automatically for non-base64 images
    if (imgPath && !imgPath.startsWith('data:')) {
      const v = vehicle.version || '1.0';
      // Clean up any existing v= parameter to avoid multiple/stale parameters
      let baseUrl = imgPath;
      if (imgPath.includes('v=')) {
        baseUrl = imgPath.replace(/([?&])v=[^&]*(&|$)/g, '$1').replace(/[?&]$/, '');
      }
      const joiner = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${joiner}v=${v}`;
    }
    return imgPath;
  };

  // Preload image to speed up appearance
  useEffect(() => {
    const img = new Image();
    img.src = getVehicleImage(currentVehicle);
  }, [currentVehicle.id, imageErrors, customOverrides]);

  // No GSAP scroll trigger block needed here. Framer Motion coordinates scroll-triggered cinematic entries beautifully.
  useEffect(() => {
    // Left purposefully for clean architecture sync
  }, []);

  return (
    <section id="fleet-section" ref={sectionRef} className="relative py-16 bg-black overflow-hidden text-left text-[#FAF6ED]">
      
      {/* Legacy target anchor for #fleet scroll links */}
      <div id="fleet" className="absolute top-0 left-0 w-full h-0 pointer-events-none" />
      
      {/* Decorative Blur BG */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-champagne-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-[#C5A85C]/5 blur-[130px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. الهيدر والوصف النصي المستخرج من التصميم */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-end">
          <div className="lg:col-span-5 text-left">
            <span className="text-[#C5A85C] font-semibold tracking-wider text-xs uppercase block mb-1">
              {t('fleet.badge')}
            </span>
            <h2 className="text-4xl font-bold text-white font-serif tracking-tight">
              <a href="https://royalridejordan.com/fleet" target="_blank" rel="noopener noreferrer">
                {language === 'en' ? 'Our Fleet' : 'أسطولنا الفاخر'}
              </a>
            </h2>
            <div className="h-[2px] w-16 bg-[#C5A85C] mt-3"></div>
          </div>
          <div className="lg:col-span-7 text-justify">
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('fleet.desc')}
            </p>
          </div>
        </div>

        {/* 2. أزرار تبويب الخيارات (Options 01 - 05) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {VEHICLES_LOCALIZED.map((veh, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={veh.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 min-w-[120px] text-center p-3 border rounded text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-[#C5A85C] border-[#C5A85C]'
                    : 'bg-transparent text-zinc-500 border-zinc-800 hover:text-white'
                }`}
              >
                {language === 'en' ? `OPTION 0${idx + 1}` : `الخيار 0${idx + 1}`}
                <br />
                <span className="text-[10px] font-normal block mt-0.5">{veh.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3. حاوية العرض الرئيسية (مربع الصورة ومربع المواصفات) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 justify-center max-w-6xl mx-auto">
          
          {/* المربع الأول: كاروسيل الصور الحديث المقفل بأبعاد 500x500 */}
          <div className="lg:col-span-6 flex justify-center">
            <div 
              onClick={() => {
                nextVehicle();
              }}
              className="w-full max-w-[500px] h-[350px] sm:h-[450px] md:h-[500px] md:w-[500px] relative rounded-xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950 flex items-center justify-center hover:border-[#C5A85C]/45 hover:shadow-[0_15px_40px_rgba(197,168,92,0.12)] transition-all duration-500 cursor-pointer group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentVehicle.id}
                  src={getVehicleImage(currentVehicle)}
                  alt={`Luxury ${currentVehicle.name} vehicle`}
                  className="w-full object-cover transition-all duration-700 hover:scale-105"
                  style={{ height: "400px" }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (customOverrides[currentVehicle.id]) {
                      handleResetImage(currentVehicle.id);
                    } else {
                      setImageErrors((prev) => ({ ...prev, [currentVehicle.id]: true }));
                    }
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              {/* شارة التصنيف (Category Style) */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-md text-left z-10 pointer-events-none">
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-semibold">
                  {language === 'en' ? 'Category Style' : 'نمط الفئة'}
                </span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {currentVehicle.type}
                </span>
              </div>

              {/* عدادات السعة والحقائب المباشرة على الصورة */}
              <div className={`absolute bottom-4 flex gap-2 z-15 pointer-events-none ${isRtl ? 'right-4' : 'left-4'}`}>
                <span className="bg-black/70 backdrop-blur-sm text-[11px] text-white px-3 py-2 rounded border border-zinc-800/80 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#C5A85C]" />
                  <span className="font-bold">{currentVehicle.capacityPassengers}</span> {language === 'en' ? 'Passengers' : 'ركاب'}
                </span>
                <span className="bg-black/70 backdrop-blur-sm text-[11px] text-white px-3 py-2 rounded border border-zinc-800/80 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#C5A85C]" />
                  <span className="font-bold">{currentVehicle.capacityLuggage}</span> {language === 'en' ? 'Big Bags' : 'حقائب كبيرة'}
                </span>
              </div>

              {/* أزرار التحكم اليدوية الجانبية */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevVehicle(); }} 
                className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center border border-zinc-800 opacity-0 group-hover:opacity-100 hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] transition-all duration-300 z-20 cursor-pointer ${
                  isRtl ? 'right-4' : 'left-4'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextVehicle(); }} 
                className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center border border-zinc-800 opacity-0 group-hover:opacity-100 hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] transition-all duration-300 z-20 cursor-pointer ${
                  isRtl ? 'left-4' : 'right-4'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mربع تفاصيل المواصفات الفنية المأخوذة من التصميم الحالي */}
          <div className="lg:col-span-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 min-h-[500px] flex flex-col justify-between relative text-left">
              <div>
                <div className="inline-block bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-[10px] font-semibold text-[#c5a880] tracking-wider mb-3">
                  <Crown className="inline-block mr-1 w-3.5 h-3.5" /> {language === 'en' ? 'VIP SPEC SHEET' : 'جدول المواصفات الفاخرة'}
                </div>
                
                <h2 className="text-2xl font-bold tracking-wide text-white uppercase mb-4">
                  {currentVehicle.name}
                </h2>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {currentVehicle.description}
                </p>

                <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase block mb-3">
                  {language === 'en' ? 'Key Luxury Amenities' : 'أبرز مزايا الفخامة والراحة'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-300">
                  {currentVehicle.features.map((feature, fIdx) => (
                    <div key={fIdx} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckSquare className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* قسم الأسعار والشروط الثابت من التصميم الفاخر */}
              <div className="mt-6 pt-4 border-t border-zinc-900 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">{language === 'en' ? 'Interstate Route Rate' : 'تعرفة المسافات الطويلة والمدن'}</span>
                  <span className="font-bold text-[#c5a880]">
                    {language === 'en' ? 'Tailored per Route' : 'أسعار مخصصة حسب الطلب'}
                  </span>
                </div>

                {/* أزرار الإجراءات الفاخرة */}
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => onSelectVehicleAndInquire(currentVehicle.id)}
                    className="flex-1 bg-transparent hover:bg-[#C5A85C]/5 border border-[#C5A85C]/30 hover:border-[#C5A85C] text-[#C5A85C] font-semibold text-xs py-3 rounded uppercase transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-[#C5A85C] shrink-0" />
                    <span>{language === 'en' ? `Book ${currentVehicle.name} Now` : `احجز ${currentVehicle.name} الآن`}</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (compareList.includes(currentVehicle.id)) {
                        setCompareList(prev => prev.filter(id => id !== currentVehicle.id));
                      } else {
                        setCompareList(prev => [...prev, currentVehicle.id]);
                      }
                    }}
                    className={`border text-xs font-semibold px-4 rounded uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      compareList.includes(currentVehicle.id)
                        ? 'border-[#C5A85C] bg-[#C5A85C]/20 text-white hover:bg-[#C5A85C]/30'
                        : 'border-zinc-700 hover:border-white text-white'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>
                      {compareList.includes(currentVehicle.id)
                        ? (language === 'en' ? 'Compared' : 'مضاف للمقارنة')
                        : (language === 'en' ? 'Compare Specs' : 'مقارنة المواصفات')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>



        {/* Intricate Royal Separator */}
        <div className="my-24 flex items-center justify-center relative">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A85C]/35 to-transparent absolute" />
          <div className="bg-black px-6 z-10 flex items-center justify-center">
            <div className="relative w-12 h-12 flex items-center justify-center select-none animate-pulse">
              {/* Soft Dimmed Glow behind RR */}
              <div className="absolute w-8 h-8 rounded-full bg-[#C5A85C]/15 blur-md" />
              
              <svg viewBox="0 0 100 100" className="w-10 h-10 relative z-10 drop-shadow-[0_0_8px_rgba(250,246,237,0.45)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gold-grad-separator" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF6ED" />
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
                  fill="url(#gold-grad-separator)" 
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
                  fill="url(#gold-grad-separator)" 
                  textAnchor="middle"
                  transform="scale(-1, 1)"
                  className="select-none"
                >
                  R
                </text>
              </svg>
            </div>
          </div>
        </div>



        {/* Temporary Compare Utility Floating Bar */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 rounded-full bg-[#0A0A0A]/95 border border-[#C5A85C] shadow-[0_15px_50px_rgba(0,0,0,0.95),_0_0_25px_rgba(197,168,92,0.25)] backdrop-blur-md max-w-[92vw] w-max text-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 rtl:space-x-reverse">
                  {compareList.map(id => {
                    const v = VEHICLES_LOCALIZED.find(item => item.id === id);
                    return v ? (
                      <div key={id}>
                        <LazyImage
                          src={getVehicleImage(v)}
                          alt={v.name}
                          className="w-8 h-8 rounded-full border border-[#C5A85C] object-cover ring-2 ring-[#0A0A0A]"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="text-xs font-sans text-champagne-gold-100 font-medium">
                  {language === 'en' 
                    ? `${compareList.length} model${compareList.length > 1 ? 's' : ''} selected` 
                    : `تم تحديد ${compareList.length} ${compareList.length === 1 ? 'موديل' : compareList.length === 2 ? 'موديلين' : 'موديلات'}`
                  }
                </div>
              </div>
              
              <div className="h-6 w-[1.5px] bg-[#C5A85C]/25" />

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  disabled={compareList.length < 2}
                  className={`px-5 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase font-extrabold transition-all duration-300 ${
                    compareList.length >= 2
                      ? 'bg-gradient-to-r from-[#C5A85C] to-[#E5C47C] text-royal-navy-950 hover:shadow-[0_0_20px_rgba(197,168,92,0.45)] cursor-pointer hover:scale-105'
                      : 'bg-white/10 text-champagne-gold-100/40 cursor-not-allowed'
                  }`}
                  title={compareList.length < 2 ? (language === 'en' ? 'Select at least 2 models' : 'اختر موديلين على الأقل') : ''}
                >
                  {language === 'en' ? 'Compare Specs' : 'مقارنة المواصفات'}
                </button>
                <button
                  onClick={() => setCompareList([])}
                  className="p-2 rounded-full hover:bg-white/10 text-champagne-gold-100/75 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                  title={language === 'en' ? 'Clear all selections' : 'مسح كل التحديد'}
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side-by-Side Specifications Comparison Modal */}
        <AnimatePresence>
          {isCompareModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Royal Design Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 35 }}
                transition={{ type: "spring", duration: 0.52 }}
                className="bg-[#0A0A0A] border border-[#C5A85C]/50 rounded-lg max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(197,168,92,0.15)] flex flex-col z-10 relative text-white"
              >
                {/* Filigree corner ornaments built inside the modal box to retain the design hierarchy */}
                <div className="filigree-corner tl" />
                <div className="filigree-corner tr" />
                <div className="filigree-corner bl" />
                <div className="filigree-corner br" />

                {/* Modal Head */}
                <div className="p-6 md:p-8 border-b border-[#C5A85C]/20 flex items-start justify-between relative bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
                  <div className="pr-8 pl-8">
                    <div className="flex items-center gap-2 text-[#C5A85C] mb-2">
                      <Scale className="w-5 h-5 stroke-[1.5]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
                        {language === 'en' ? 'ROYAL DELEGATION METRIC' : 'مقارنة مواصفات أسطول النخبة'}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-luxury-gradient">
                      {language === 'en' ? 'Compare Fleet Models' : 'مقارنة طرازات الأسطول'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCompareModalOpen(false)}
                    className="p-2 mr-2 ml-2 rounded-full border border-white/10 hover:border-[#C5A85C]/50 hover:bg-white/5 text-champagne-gold-100 transition-colors duration-300 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content - Side-by-Side Matrix */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-black/50">
                  <div className="min-w-[650px] overflow-x-auto">
                    <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(180px,1fr))] gap-4">
                      
                      {/* Row: Vehicle Models header */}
                      <div className="flex flex-col justify-end pb-4 border-b border-white/5 text-[10px] text-champagne-gold-100/50 uppercase font-mono tracking-widest font-bold">
                        {language === 'en' ? 'PRESTIGE MODEL' : 'طراز الهيبة والفخامة'}
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="relative pb-4 border-b border-white/5 text-center flex flex-col items-center">
                            <button
                              onClick={() => {
                                setCompareList(prev => prev.filter(x => x !== id));
                              }}
                              className="absolute top-0 right-0 p-1 bg-red-950/70 hover:bg-red-900 border border-red-500/30 text-red-200 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
                              title={language === 'en' ? 'Remove model' : 'إزالة الطراز'}
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <LazyImage
                              src={getVehicleImage(veh)}
                              alt={veh.name}
                              className="w-full h-24 object-cover rounded border border-[#C5A85C]/20 mb-3 grayscale-[0.1] hover:grayscale-0 transition-all duration-500"
                            />
                            <h4 className="font-serif text-sm font-bold text-[#C5A85C] line-clamp-1">
                              {veh.name}
                            </h4>
                            <span className="text-[10px] text-champagne-gold-100/60 font-mono mt-0.5">
                              {veh.type}
                            </span>
                          </div>
                        );
                      })}

                      {/* Row: Passengers capacity */}
                      <div className="py-4 border-b border-[#C5A85C]/15 flex items-center gap-2 text-xs font-mono text-champagne-gold-100/80">
                        <Users className="w-4 h-4 text-[#C5A85C] shrink-0" />
                        <span>{language === 'en' ? 'PASSENGERS' : 'سعة الأفراد'}</span>
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="py-4 border-b border-[#C5A85C]/15 text-center font-sans text-sm font-bold text-white">
                            {veh.capacityPassengers} {language === 'en' ? 'Passengers' : 'ركاب كبائن'}
                          </div>
                        );
                      })}

                      {/* Row: Luggage capacity */}
                      <div className="py-4 border-b border-[#C5A85C]/15 flex items-center gap-2 text-xs font-mono text-champagne-gold-100/80">
                        <Briefcase className="w-4 h-4 text-[#C5A85C] shrink-0" />
                        <span>{language === 'en' ? 'LUGGAGE HOLD' : 'السعة القصوى للحقائب'}</span>
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="py-4 border-b border-[#C5A85C]/15 text-center font-sans text-sm font-bold text-white">
                            {veh.capacityLuggage} {language === 'en' ? 'Bags' : 'حقائب سفر'}
                          </div>
                        );
                      })}

                      {/* Row: Base price */}
                      <div className="py-4 border-b border-[#C5A85C]/15 flex items-center gap-2 text-xs font-mono text-champagne-gold-100/80">
                        <Crown className="w-4 h-4 text-[#C5A85C] shrink-0" />
                        <span>{language === 'en' ? 'BASE PRICE' : 'التعرفة المبدئية للرحلة'}</span>
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="py-4 border-b border-[#C5A85C]/15 text-center font-serif text-[11px] text-[#C5A85C] font-bold">
                            {language === 'en' ? 'Custom Quote' : 'تسعير عند التواصل'}
                          </div>
                        );
                      })}

                      {/* Row: Per Km */}
                      <div className="py-4 border-b border-[#C5A85C]/15 flex items-center gap-2 text-xs font-mono text-champagne-gold-100/80">
                        <Sparkles className="w-4 h-4 text-[#C5A85C] shrink-0" />
                        <span>{language === 'en' ? 'ESTIMATED PER KM' : 'الكيلومتر المقدر'}</span>
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="py-4 border-b border-[#C5A85C]/15 text-center font-serif text-[11px] text-champagne-gold-100 font-bold">
                            {language === 'en' ? 'Custom Rate' : 'تعرفة حسب المسار'}
                          </div>
                        );
                      })}

                      {/* Row: Premium specifications */}
                      <div className="py-4 border-b border-white/5 text-xs font-mono text-champagne-gold-100/80">
                        {language === 'en' ? 'INCLUDED COMFORT' : 'مزايا الراحة الفاخرة'}
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="py-4 border-b border-white/5">
                            <ul className="space-y-2 text-left rtl:text-right">
                              {veh.features.map((feat, fidx) => (
                                <li key={fidx} className="text-[11px] text-champagne-gold-100/75 flex items-start gap-1">
                                  <span className="text-[#C5A85C] font-bold select-none">&bull;</span>
                                  <span className="leading-relaxed">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}

                      {/* Row: CTA action block */}
                      <div className="py-5 text-xs font-mono text-champagne-gold-100/50 uppercase">
                        {language === 'en' ? 'CONFIRM ORDER' : 'إتمام الحجز المباشر'}
                      </div>
                      {compareList.map(id => {
                        const veh = VEHICLES_LOCALIZED.find(v => v.id === id);
                        if (!veh) return null;
                        return (
                          <div key={id} className="py-5 text-center flex justify-center">
                            <button
                              onClick={() => {
                                setIsCompareModalOpen(false);
                                onSelectVehicleAndInquire(id);
                              }}
                              tabIndex={0}
                              className="w-full max-w-[180px] py-3 px-4 rounded bg-gradient-to-r from-[#C5A85C] to-[#E5C47C] hover:scale-105 active:scale-95 text-royal-navy-950 text-[10px] font-mono tracking-widest uppercase font-extrabold transition-all duration-300 shadow-[0_4px_15px_rgba(197,168,92,0.3)] hover:shadow-[0_4px_25px_rgba(197,168,92,0.5)] cursor-pointer"
                            >
                              {language === 'en' ? 'Book Now' : 'احجز الطراز'}
                            </button>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>

                {/* Modal Footer disclaimer */}
                <div className="p-4 bg-[#0A0A0A] border-t border-[#C5A85C]/20 text-center relative text-[9px] font-mono text-champagne-gold-100/40">
                  {language === 'en'
                    ? '* Fully customizable packages & corporate multi-car fleet dispatching available upon request.'
                    : '* تتوفر باقات مخصصة بالكامل وأسطول سيارات متعدد مخصص للشركات والهيئات الدبلوماسية عند الطلب.'}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
