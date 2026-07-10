import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, Briefcase, CheckSquare, Sparkles, AlertCircle, Crown, Scale, X, Camera, Upload, Link, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../LanguageContext';
import { images } from '../imageRegistry';
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

const VEHICLE_PACKAGES: Record<string, { titleEn: string; titleAr: string; price: string; descEn: string; descAr: string }[]> = {
  'comfort-class': [
    {
      titleEn: 'Airport Protocol',
      titleAr: 'بروتوكول المطار',
      price: '25 JOD / $35',
      descEn: 'One-way Amman Airport transfer with baggage assistance and flight tracking.',
      descAr: 'توصيل اتجاه واحد من/إلى مطار الملكة علياء مع مساعدة الحقائب وتتبع الرحلة.'
    },
    {
      titleEn: 'Amman Day Standby',
      titleAr: 'اليومي المفتوح داخل عمان',
      price: '60 JOD / $85',
      descEn: '8 Hours continuous service in West Amman with elite local chauffeur.',
      descAr: 'خدمة مستمرة لمدة ٨ ساعات داخل عمان مع سائق محلي خبير بالمسارات.'
    },
    {
      titleEn: 'Dead Sea Escape',
      titleAr: 'رحلة البحر الميت',
      price: '40 JOD / $56',
      descEn: 'Round-trip private transfer to spa resorts with flexible pickup timings.',
      descAr: 'توصيل ذهاب وإياب لمنتجعات البحر الميت مع مرونة كاملة في أوقات الانتظار.'
    }
  ],
  'staria': [
    {
      titleEn: 'Airport Lounge Transfer',
      titleAr: 'توصيل المطار العائلي VIP',
      price: '45 JOD / $63',
      descEn: 'Prestige 7-passenger van transfer with extra large luggage holding capacity.',
      descAr: 'توصيل عائلي فاخر لـ ٧ ركاب مع سعة حقائب هائلة وتكييف منعش.'
    },
    {
      titleEn: 'Diplomatic Daily Standby',
      titleAr: 'اليومي المفتوح للمجموعات',
      price: '110 JOD / $155',
      descEn: '8 Hours continuous group standby in Amman, complimentary Wi-Fi and chilled water.',
      descAr: 'خدمة مستمرة لمدة ٨ ساعات للمجموعات مع إنترنت لاسلكي ومياه باردة مجانية.'
    },
    {
      titleEn: 'Petra & South Jordan Tour',
      titleAr: 'رحلة البتراء وجنوب الأردن',
      price: '150 JOD / $212',
      descEn: 'Full-day tour to historic Petra with safe mountain route driving experts.',
      descAr: 'رحلة يوم كامل لمعالم البتراء الوردية مع سائق خبير بالمسارات الجبلية والوعرة.'
    }
  ],
  'toyota-hiace': [
    {
      titleEn: 'Group Airport Shuttling',
      titleAr: 'توصيل وفود المطار الجماعي',
      price: '55 JOD / $77',
      descEn: 'Accommodating up to 14 delegates and 13 bags with meet and greet protocol.',
      descAr: 'يتسع لـ ١٤ راكباً و١٣ حقيبة مع استقبال رسمي بلا أي عناء من المطار.'
    },
    {
      titleEn: 'Corporate Daily Standby',
      titleAr: 'اليومي المفتوح للشركات والوفود',
      price: '130 JOD / $183',
      descEn: '8 Hours standby within Jordanian cities, perfect for team site inspections.',
      descAr: 'خدمة مستمرة ٨ ساعات لوفود الشركات والمنظمات داخل المدن الأردنية.'
    },
    {
      titleEn: 'Intercity Tourist Route',
      titleAr: 'الرحلات السياحية للمحافظات',
      price: '160 JOD / $225',
      descEn: 'Full day multi-destination tour covering Jerash, Ajloun, or Baptism site.',
      descAr: 'رحلة يوم كامل تغطي المواقع الأثرية في جرش وعجلون أو المغطس.'
    }
  ],
  'toyota-coaster': [
    {
      titleEn: 'Prestige Delegation Airport',
      titleAr: 'باص الوفود والمؤتمرات المطار',
      price: '85 JOD / $120',
      descEn: 'Heavyweight mass delegation shuttle, 18 passengers and 15 bags capability.',
      descAr: 'نقل جماعي فخم للمؤتمرات والوفود الكبيرة من وإلى المطار بقمة الكفاءة.'
    },
    {
      titleEn: 'Sovereign Full-Day Coach',
      titleAr: 'اليومي المفتوح للأفواج الكبيرة',
      price: '180 JOD / $254',
      descEn: '8 Hours mass transit across Amman or Northern Jordan, deep baggage storage.',
      descAr: 'خدمة مستمرة ٨ ساعات للأفواج والوفود السياحية الكبرى شاملة تكييف ومستودع أمتعة.'
    },
    {
      titleEn: 'Wadi Rum & Aqaba Route',
      titleAr: 'رحلة وادي رم وثغر العقبة الباسم',
      price: '220 JOD / $310',
      descEn: 'Golden luxury transit to southern camps and Red Sea coastal resorts.',
      descAr: 'توصيل الوفود والأفواج السياحية الكبيرة لصحراء رم ومخيماتها ومنتجعات العقبة.'
    }
  ],
  'luxury-cars': [
    {
      titleEn: 'Sovereign Airport Protocol',
      titleAr: 'الاستقبال الملكي والدبلوماسي المطار',
      price: '120 JOD / $169',
      descEn: 'Five-star S-Class or GMC Yukon VIP meet & greet protocol directly at airport tarmac.',
      descAr: 'استقبال فخم بمرسيدس S-Class أو يوكون VIP من أرض المطار وتقديم الضيافة الراقية.'
    },
    {
      titleEn: 'Diplomatic 8-Hour Standby',
      titleAr: 'اليومي الدبلوماسي والرئاسي الخاص',
      price: '250 JOD / $352',
      descEn: 'Continuous state-executive vehicle standby, suited polite driver, absolute privacy.',
      descAr: 'مركبة رئاسية تحت الطلب المستمر ٨ ساعات مع سائق رسمي بزي رسمي لرجال الأعمال والوفود.'
    },
    {
      titleEn: 'VIP Wedding / Special Event',
      titleAr: 'باقة الأعراس والمناسبات الكبرى',
      price: '300 JOD / $423',
      descEn: 'Bespoke custom livery carriage styling, red carpet assistance, and premium features.',
      descAr: 'تنسيق مخصص للمركبة الفارهة مع تزيين وزفة ملكية مجهزة بالكامل للمناسبات والأفراح.'
    }
  ]
};

interface FleetCarouselProps {
  onSelectVehicleAndInquire: (vehicleId: string) => void;
}

export default function FleetCarousel({ onSelectVehicleAndInquire }: FleetCarouselProps) {
  const { language, t, isRtl, isAdmin } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'packages' | 'specs' | 'features' | 'photos'>('packages');
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
      type: language === 'en' ? 'Elite Family Lounge Van' : 'ڤان فاخر وواسع للمجموعات المتوسطة',
      description: language === 'en'
        ? 'A striking statement of contemporary passenger volume. Tailored for family groups and executive tours across Jordan. Features massive ambient ergonomics and luggage spaces.'
        : 'ڤان فاخر وواسع يلبي متطلبات الرفاهية للمجموعات المتوسطة والعائلات. يتسع براحة كبيرة لـ 7 ركاب و10 حقائب في آن واحد مع مقاعد جلدية وراقية.',
      basePrice: '35',
      estimatedPricePerKm: '0.80',
      capacityPassengers: '7',
      capacityLuggage: '10',
      image: images.fleet.stariaVip,
      features: language === 'en'
        ? [
            'Luxurious and spacious multi-passenger lounge',
            'Stunning interior design with premium leather chairs',
            'Outstandingly suited for long routes & tours',
            'Equipped with free Wi-Fi and 24/7 client care'
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
      type: language === 'en' ? 'Elite Passenger Coach' : 'باص فخم متكامل للأفواج الكبيرة والرحلات',
      description: language === 'en'
        ? 'The gold standard for mass group transport. Premium comfort chassis, extensive space, luxury leather seating option, and superb intercity travel capabilities.'
        : 'باص فخم متسع مخصص للأفواج الكبيرة والرحلات الطويلة بين المحافظات. يحتوي على مقاعد وثيرة ومريحة مع تكييف متطور، ومستودع أمتعة سفلي كبير يستوعب الكثير من الحقائب.',
      basePrice: '65',
      estimatedPricePerKm: '1.40',
      capacityPassengers: '18',
      capacityLuggage: '15',
      image: images.fleet.toyotaCoaster,
      features: language === 'en'
        ? [
            'Spacious luxury seating holding up to 18 delegates',
            'Rich leather craftsmanship with grand legroom option',
            'Designed for country-wide sightseeing & group transit',
            'Continuous real-time dispatch monitoring & support'
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
      type: language === 'en' ? 'Sovereign Diplomatic Edition' : 'أفخم وأرقى خدمات الليموزين والنخبة',
      description: language === 'en'
        ? 'Bespoke legendary flagship sedans and elite SUVs like GMC Yukon VIP. Reserved upon inquiry for sovereign events, diplomatic transfers, and weddings requiring highest standards.'
        : 'أفخم فئاتنا على الإطلاق من سيارات صالون فاخرة وسيارات جي إم سي يوكون الدبل VIP، المحفوظة للمناسبات الرسمية الكبرى واستقبال كبار الوفود الدبلوماسية ورجال الأعمال.',
      basePrice: '80',
      estimatedPricePerKm: '1.80',
      capacityPassengers: '4',
      capacityLuggage: '4',
      image: images.fleet.luxuryGmcYukon,
      features: language === 'en'
        ? [
            'Unmatched luxury reserved for VIP status & weddings',
            'Select premium flagships (GMC Yukon VIP & Mercedes S-Class)',
            'Five-star custom livery chauffeur services',
            'Tailored elite packages that exceed expectation'
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
      Object.entries(vehicleKeys).forEach(([id, key]) => {
        const saved = localStorage.getItem(`rr_img_override_${key}`);
        if (saved) {
          overrides[id] = saved;
        }
      });
      setCustomOverrides(overrides);
    }
  }, []);

  // Autoplay is disabled to ensure a stable ("ثابت") and stationary carousel experience,
  // allowing visitors to read the VIP packages, specs, and details without sudden slides rotation.
  useEffect(() => {
    // Static carousel mode: slide changes only occur via manual interaction for maximum stability.
  }, []);

  const handleUpdateImage = async (vehicleId: string, newImage: string) => {
    try {
      const compressedImage = await compressImageSource(newImage, 1000, 1000, 0.75);
      
      const vehicleKeys: Record<string, string> = {
        'comfort-class': 'fleet_comfortClass',
        'staria': 'fleet_stariaVip',
        'toyota-hiace': 'fleet_toyotaHiace',
        'toyota-coaster': 'fleet_toyotaCoaster',
        'luxury-cars': 'fleet_luxuryGmcYukon'
      };
      
      const key = vehicleKeys[vehicleId];
      if (key) {
        localStorage.setItem(`rr_img_override_${key}`, compressedImage);
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

  const getVehicleImage = (vehicle: typeof currentVehicle) => {
    if (imageErrors[vehicle.id]) {
      switch (vehicle.id) {
        case 'comfort-class':
          return 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
        case 'staria':
          return 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop';
        case 'toyota-hiace':
          return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop';
        case 'toyota-coaster':
          return 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop';
        case 'luxury-cars':
          return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';
        default:
          return 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
      }
    }
    if (customOverrides[vehicle.id]) {
      return customOverrides[vehicle.id];
    }
    return vehicle.image || 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop';
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
    <section id="fleet-showcase" ref={sectionRef} className="relative py-24 bg-black overflow-hidden text-left text-[#FAF6ED]">
      
      {/* Legacy target anchor for #fleet scroll links */}
      <div id="fleet" className="absolute top-0 left-0 w-full h-0 pointer-events-none" />
      
      {/* Decorative Blur BG */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-champagne-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-[#C5A85C]/5 blur-[130px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Framer Motion scroll-trigger */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A85C]">
              {t('fleet.badge')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-champagne-gold-100 mt-3">
              <a href="https://royalridejordan.com/fleet" target="_blank" rel="noopener noreferrer">Our Fleet</a>
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C5A85C] mt-5" />
          </div>
          <p className="font-sans text-sm text-champagne-gold-100/75 max-w-xl leading-relaxed">
            {t('fleet.desc')}
          </p>
        </motion.div>

        {/* Media Carousel Showcase */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-12 max-w-[1100px] mx-auto mb-12">
          
          {/* Left Card: Symmetrical 500x500 Visual Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-[500px] aspect-square mx-auto flex flex-col justify-between animate-gpu relative rounded-3xl overflow-hidden bg-royal-navy-950/95 border border-[#C5A85C]/35 group shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#C5A85C]/60 transition-all duration-500 ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => {
              if (isAdmin && customizingVehicleId !== currentVehicle.id) {
                setCustomizingVehicleId(currentVehicle.id);
                setCustomUrl(getVehicleImage(currentVehicle).startsWith('data:') ? '' : getVehicleImage(currentVehicle));
              }
            }}
          >
            
            {/* Elegant Golden Double Corner Ornaments */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#C5A85C]/60 pointer-events-none z-20" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#C5A85C]/60 pointer-events-none z-20" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#C5A85C]/60 pointer-events-none z-20" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#C5A85C]/60 pointer-events-none z-20" />

            {/* Dotted Accent Lights inside Corners */}
            <div className="absolute top-[18px] left-[18px] w-1 h-1 bg-[#C5A85C] rounded-full pointer-events-none z-20" />
            <div className="absolute top-[18px] right-[18px] w-1 h-1 bg-[#C5A85C] rounded-full pointer-events-none z-20" />
            <div className="absolute bottom-[18px] left-[18px] w-1 h-1 bg-[#C5A85C] rounded-full pointer-events-none z-20" />
            <div className="absolute bottom-[18px] right-[18px] w-1 h-1 bg-[#C5A85C] rounded-full pointer-events-none z-20" />

            {/* Exquisite Top-Centered Royal Crown Insignia Drawing */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 opacity-35 group-hover:opacity-85 transition-opacity duration-500 text-[#C5A85C] scale-75 pointer-events-none z-20">
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 7L21 4L18 10H6L3 4L9 7L12 2Z" fill="currentColor" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentVehicle.id}
                src={getVehicleImage(currentVehicle)}
                alt={`Luxury ${currentVehicle.name} vehicle from Royal Ride Jordan fleet`}
                className={`w-full h-full object-cover absolute inset-0 transition-transform duration-700 ${isAdmin && customizingVehicleId === currentVehicle.id ? 'blur-sm brightness-50' : 'group-hover:scale-105'}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                referrerPolicy="no-referrer"
                onError={() => {
                  console.warn(`Failed to load image for ${currentVehicle.id}. Healing state and falling back.`);
                  if (customOverrides[currentVehicle.id]) {
                    handleResetImage(currentVehicle.id);
                  }
                  setImageErrors((prev) => ({ ...prev, [currentVehicle.id]: true }));
                }}
              />
            </AnimatePresence>

            {/* Elegant always-visible Glassmorphic badge for flexible customization */}
            {isAdmin && customizingVehicleId !== currentVehicle.id && (
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomizingVehicleId(currentVehicle.id);
                    setCustomUrl(getVehicleImage(currentVehicle).startsWith('data:') ? '' : getVehicleImage(currentVehicle));
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[#C5A85C]/35 bg-black/85 text-[#C5A85C] hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] text-xs font-sans font-extrabold flex items-center gap-1.5 shadow-lg backdrop-blur-[6px] transition-all duration-300 cursor-pointer active:scale-95 animate-fadeIn"
                >
                  <Camera className="w-3.5 h-3.5 animate-pulse" />
                  <span>{language === 'en' ? 'Change Photo' : 'تغيير الصورة'}</span>
                </button>
              </div>
            )}

            {/* Absolute embedded uploader panel */}
            {isAdmin && customizingVehicleId === currentVehicle.id && (
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md p-6 flex flex-col justify-between z-30 animate-fadeIn border border-[#C5A85C]/45 rounded-3xl text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#C5A85C]/25 pb-2">
                    <span className="text-xs font-mono font-bold text-[#C5A85C] uppercase tracking-wider">
                      {language === 'en' ? 'Configure Vehicle Image' : 'تعديل صورة المركبة'}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomizingVehicleId(null);
                      }}
                      className="text-stone-400 hover:text-white transition-colors cursor-pointer text-sm font-bold animate-pulse"
                    >
                      ✕
                    </button>
                  </div>

                  {/* URL Paste */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-stone-400 font-sans block">
                      {language === 'en' ? 'Option 1: Paste Image Web Address' : 'الخيار 1: لصق رابط الصورة'}
                    </label>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <Link className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                        <input 
                          type="text" 
                          value={customUrl}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A85C]/60"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (customUrl.trim()) {
                            handleUpdateImage(currentVehicle.id, customUrl.trim());
                            setCustomizingVehicleId(null);
                          }
                        }}
                        className="bg-[#C5A85C] text-black text-xs px-4 py-2 rounded-xl font-bold hover:bg-white transition-colors cursor-pointer shrink-0"
                      >
                        {language === 'en' ? 'Apply' : 'تطبيق'}
                      </button>
                    </div>
                  </div>

                  {/* File upload */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-stone-400 font-sans block">
                      {language === 'en' ? 'Option 2: Drag & Drop or Upload Local File' : 'الخيار 2: سحب أو تحميل ملف صورة'}
                    </label>
                    <div className="relative border border-dashed border-[#C5A85C]/35 rounded-xl p-4 hover:border-[#C5A85C] transition-all bg-stone-900/60 flex flex-col items-center justify-center space-y-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(currentVehicle.id, file);
                            setCustomizingVehicleId(null);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-6 h-6 text-[#C5A85C]" />
                      <span className="text-xs font-semibold text-stone-300">
                        {language === 'en' ? 'Upload Local Photo' : 'تحميل صورة من جهازك'}
                      </span>
                      <span className="text-[9px] text-stone-500 font-sans">
                        Supports JPG, PNG, WebP (instant local cache)
                      </span>
                    </div>
                  </div>

                  {/* Curated Presets */}
                  <div className="space-y-1.5 pt-1 text-left">
                    <span className="text-[10px] font-mono text-[#C5A85C]/75 block uppercase tracking-wider">
                      {language === 'en' ? 'Option 3: Select a Premium Preset' : 'الخيار 3: اختر من الباقة الفاخرة'}
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESETS_BY_VEHICLE[currentVehicle.id]?.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateImage(currentVehicle.id, preset.url);
                            setCustomizingVehicleId(null);
                          }}
                          className="group/preset relative aspect-video rounded-xl overflow-hidden border border-stone-850 hover:border-[#C5A85C] transition-all bg-stone-950 cursor-pointer"
                          title={language === 'en' ? preset.labelEn : preset.labelAr}
                        >
                          <img 
                            src={preset.url} 
                            alt={preset.labelEn}
                            className="w-full h-full object-cover group-hover/preset:scale-110 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover/preset:bg-black/10 transition-colors" />
                          <span className="absolute bottom-1 left-1.5 right-1.5 text-[8px] text-white/95 font-sans font-medium line-clamp-1 bg-black/65 px-1 rounded backdrop-blur-[2px]">
                            {language === 'en' ? preset.labelEn : preset.labelAr}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end border-t border-stone-900 pt-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetImage(currentVehicle.id);
                      setCustomizingVehicleId(null);
                    }}
                    className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-800/40 hover:border-red-600 rounded-lg text-[10px] font-mono text-red-200 transition-all cursor-pointer"
                  >
                    {language === 'en' ? 'Reset to Default' : 'إعادة ضبط'}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomizingVehicleId(null);
                    }}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg text-[10px] font-mono text-stone-300 transition-all cursor-pointer"
                  >
                    {language === 'en' ? 'Close' : 'إغلاق'}
                  </button>
                </div>
              </div>
            )}

            {/* Gradient Shading Underlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-royal-navy-950/90 via-transparent to-black/35 pointer-events-none z-10" />

            {/* Vehicle Title Tag on Media Frame */}
            <div className="absolute top-6 left-6 bg-royal-navy-950/95 border border-[#C5A85C]/35 px-4 py-2.5 rounded-xl backdrop-blur-md z-20 shadow-md">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#C5A85C] uppercase block mb-0.5">
                {language === 'en' ? 'CATEGORY STYLE' : 'نوع فئة الأسطول'}
              </span>
              <span className="font-serif text-xs font-bold text-champagne-gold-200">
                {currentVehicle.type}
              </span>
            </div>

            {/* Slide Navigation Triggers inside Frame */}
            <button
              onClick={(e) => { e.stopPropagation(); prevVehicle(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border border-[#C5A85C]/30 bg-royal-navy-950/90 hover:bg-[#C5A85C] text-[#C5A85C] hover:text-royal-navy-950 transition-all duration-300 z-20 cursor-pointer shadow-lg"
              aria-label="Previous fleet car"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextVehicle(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border border-[#C5A85C]/30 bg-royal-navy-950/90 hover:bg-[#C5A85C] text-[#C5A85C] hover:text-royal-navy-950 transition-all duration-300 z-20 cursor-pointer shadow-lg"
              aria-label="Next fleet car"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Capacity overlay tags */}
            <div className={`absolute bottom-6 flex space-x-3 z-20 ${isRtl ? 'right-6 space-x-reverse' : 'left-6'}`}>
              <div className="flex items-center space-x-2 bg-royal-navy-950/95 border border-[#C5A85C]/20 px-3 py-1.5 rounded-lg text-xs text-champagne-gold-100 backdrop-blur shadow">
                <Users className="w-3.5 h-3.5 text-[#C5A85C]" />
                <span>{currentVehicle.capacityPassengers} {t('fleet.capacity')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-royal-navy-950/95 border border-[#C5A85C]/20 px-3 py-1.5 rounded-lg text-xs text-champagne-gold-100 backdrop-blur shadow">
                <Briefcase className="w-3.5 h-3.5 text-[#C5A85C]" />
                <span>{currentVehicle.capacityLuggage} {t('fleet.luggage')}</span>
              </div>
            </div>

          </motion.div>

          {/* Right Card: Symmetrical 500x500 Information & Packages Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[500px] aspect-square mx-auto flex flex-col justify-between animate-gpu bg-royal-navy-950/95 p-6 md:p-8 rounded-3xl border border-[#C5A85C]/35 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#C5A85C]/60 transition-all duration-500 group"
          >
            {/* Majestic Radial Golden Glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C5A85C]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C5A85C]/12 transition-all duration-700" />
            
            {/* Elegant Golden Double Corner Ornaments / Drawings */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#C5A85C]/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#C5A85C]/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#C5A85C]/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#C5A85C]/60 pointer-events-none" />
            
            <div className="absolute top-3.5 left-3.5 w-2 h-2 border-t border-l border-[#C5A85C]/30 pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-2 h-2 border-t border-r border-[#C5A85C]/30 pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-2 h-2 border-b border-l border-[#C5A85C]/30 pointer-events-none" />
            <div className="absolute bottom-3.5 right-3.5 w-2 h-2 border-b border-r border-[#C5A85C]/30 pointer-events-none" />

            <div className="absolute inset-1.5 border border-[#C5A85C]/15 pointer-events-none rounded-3xl" />

            {/* Top Navigation Tabs */}
            <div className="flex border-b border-[#C5A85C]/20 pb-3 relative z-10 gap-2 overflow-x-auto justify-between select-none">
              <button
                onClick={() => setActiveTab('packages')}
                className={`relative px-3 py-1.5 rounded-lg text-[11px] font-sans font-extrabold tracking-wide uppercase cursor-pointer transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'packages'
                    ? 'text-[#C5A85C] bg-[#C5A85C]/10 border border-[#C5A85C]/35'
                    : 'text-champagne-gold-100/50 hover:text-champagne-gold-100'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'VIP Packages' : 'باقات الـ VIP'}</span>
                {activeTab === 'packages' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C5A85C] rounded-full animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`relative px-3 py-1.5 rounded-lg text-[11px] font-sans font-extrabold tracking-wide uppercase cursor-pointer transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'specs'
                    ? 'text-[#C5A85C] bg-[#C5A85C]/10 border border-[#C5A85C]/35'
                    : 'text-champagne-gold-100/50 hover:text-champagne-gold-100'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Specifications' : 'المواصفات'}</span>
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`relative px-3 py-1.5 rounded-lg text-[11px] font-sans font-extrabold tracking-wide uppercase cursor-pointer transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'features'
                    ? 'text-[#C5A85C] bg-[#C5A85C]/10 border border-[#C5A85C]/35'
                    : 'text-champagne-gold-100/50 hover:text-champagne-gold-100'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Features' : 'الميزات'}</span>
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto pr-1 my-4 relative z-10 text-left gold-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'packages' && (
                  <motion.div
                    key="packages-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <span className="text-[10px] font-mono text-[#C5A85C] tracking-widest block uppercase mb-1">
                      {language === 'en' ? 'EXCLUSIVE TRANSPORTATION OPTIONS' : 'خيارات التوصيل والباقات الحصرية'}
                    </span>
                    {(VEHICLE_PACKAGES[currentVehicle.id] || []).map((pkg, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-royal-navy-900/60 border border-[#C5A85C]/20 hover:border-[#C5A85C]/45 transition-all duration-300 flex items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <span className="font-serif text-xs font-bold text-champagne-gold-200 block">
                            {language === 'en' ? pkg.titleEn : pkg.titleAr}
                          </span>
                          <span className="text-[10px] text-champagne-gold-100/70 block leading-relaxed">
                            {language === 'en' ? pkg.descEn : pkg.descAr}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start text-[10px] text-champagne-gold-100/40 mt-3 pt-2 border-t border-royal-navy-900">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#C5A85C] mr-1.5 ml-1.5 mt-0.5" />
                      <p>{language === 'en' ? 'Taxes, toll permits, chilled bottled mineral water, and professional chauffeur services are fully included with our bookings.' : 'الضرائب، ورسوم بوابات العبور والوقود والسائق بزي بروتوكول رسمي مشمولة بالكامل في كافة حجوزاتنا.'}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specs' && (
                  <motion.div
                    key="specs-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-serif text-lg font-bold text-champagne-gold-300">
                        {currentVehicle.name}
                      </h3>
                      <p className="font-sans text-xs text-[#FAF6ED]/75 leading-relaxed mt-1.5">
                        {currentVehicle.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#C5A85C]/15">
                      <div className="p-3 bg-royal-navy-900/50 rounded-xl border border-royal-navy-800 flex items-center gap-3">
                        <Users className="w-4 h-4 text-[#C5A85C]" />
                        <div>
                          <span className="text-[9px] text-stone-400 font-mono block uppercase">
                            {language === 'en' ? 'Capacity' : 'سعة الأفراد'}
                          </span>
                          <span className="text-xs font-bold text-white">{currentVehicle.capacityPassengers} Guests</span>
                        </div>
                      </div>

                      <div className="p-3 bg-royal-navy-900/50 rounded-xl border border-royal-navy-800 flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-[#C5A85C]" />
                        <div>
                          <span className="text-[9px] text-stone-400 font-mono block uppercase">
                            {language === 'en' ? 'Luggage' : 'الحقائب'}
                          </span>
                          <span className="text-xs font-bold text-white">{currentVehicle.capacityLuggage} Large Bags</span>
                        </div>
                      </div>

                      <div className="p-3 bg-royal-navy-900/50 rounded-xl border border-royal-navy-800 flex items-center gap-3">
                        <Crown className="w-4 h-4 text-[#C5A85C]" />
                        <div>
                          <span className="text-[9px] text-stone-400 font-mono block uppercase">
                            {language === 'en' ? 'Chauffeur' : 'السائق الخاص'}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {language === 'en' ? 'Professional Chauffeur' : 'سائق محترف ومؤهل'}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-royal-navy-900/50 rounded-xl border border-royal-navy-800 flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#C5A85C]" />
                        <div>
                          <span className="text-[9px] text-stone-400 font-mono block uppercase">
                            {language === 'en' ? 'Services' : 'الخدمات الإضافية'}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {language === 'en' ? 'Complimentary Wi-Fi & Water' : 'إنترنت ومياه باردة مجاناً'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    key="features-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-mono text-[#C5A85C] uppercase tracking-wider block">
                      {language === 'en' ? 'PRESTIGE CABIN HIGHLIGHTS' : 'أبرز مميزات مقصورة الهيبة والرفاهية'}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {currentVehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-xs text-champagne-gold-100/85">
                          <CheckSquare className="w-4 h-4 text-[#C5A85C] mr-2 ml-2 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'photos' && (
                  <motion.div
                    key="photos-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center pb-1">
                      <span className="text-[10px] font-mono text-[#C5A85C] uppercase tracking-wider block">
                        {language === 'en' ? 'VEHICLE GALLERY & CUSTOMIZER' : 'معرض صور السيارة وخيارات التخصيص'}
                      </span>
                      {customOverrides[currentVehicle.id] && (
                        <button
                          onClick={() => handleResetImage(currentVehicle.id)}
                          className="text-[10px] text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer bg-red-500/10 px-2 py-0.5 rounded border border-red-500/25"
                        >
                          <X className="w-3 h-3" />
                          <span>{language === 'en' ? 'Reset' : 'إعادة تعيين'}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1 select-none gold-scrollbar">
                      {/* Original Base Image */}
                      <button
                        onClick={() => handleResetImage(currentVehicle.id)}
                        className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 group/item cursor-pointer ${
                          !customOverrides[currentVehicle.id]
                            ? 'border-[#C5A85C] ring-2 ring-[#C5A85C]/30'
                            : 'border-[#C5A85C]/20 hover:border-[#C5A85C]/50'
                        }`}
                      >
                        <img 
                          src={currentVehicle.image} 
                          alt="Original" 
                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 flex items-center justify-center">
                          <span className="text-[9px] font-sans font-bold text-white truncate text-center leading-none">
                            {language === 'en' ? 'Official / الأصلي' : 'الرسمية / الأصلي'}
                          </span>
                        </div>
                      </button>

                      {/* Presets */}
                      {(PRESETS_BY_VEHICLE[currentVehicle.id] || []).map((preset, idx) => {
                        const isSelected = customOverrides[currentVehicle.id] === preset.url;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleUpdateImage(currentVehicle.id, preset.url)}
                            className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 group/item cursor-pointer ${
                              isSelected
                                ? 'border-[#C5A85C] ring-2 ring-[#C5A85C]/30'
                                : 'border-[#C5A85C]/20 hover:border-[#C5A85C]/50'
                            }`}
                          >
                            <img 
                              src={preset.url} 
                              alt={preset.labelEn} 
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 flex items-center justify-center">
                              <span className="text-[9px] font-sans font-bold text-white truncate text-center leading-none">
                                {language === 'en' ? preset.labelEn : preset.labelAr}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Uploader triggers inside the carousel right card */}
                    <div className="pt-2.5 border-t border-[#C5A85C]/15 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#C5A85C]" />
                        <span className="text-[10px] text-champagne-gold-200/90 font-bold">
                          {language === 'en' ? 'WANT TO SEE YOUR OWN VEHICLE?' : 'هل تريد معاينة سيارتك الخاصة؟'}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-champagne-gold-100/50 leading-relaxed font-sans">
                        {language === 'en' 
                          ? 'Upload an image or drag & drop to dynamically visualize the vehicle customization in real-time!' 
                          : 'قم برفع ملف صورة من جهازك لمعاينتها فوراً وتخصيص مظهر المركبة في نفس اللحظة!'}
                      </p>
                      
                      <button
                        onClick={() => setCustomizingVehicleId(currentVehicle.id)}
                        className="w-full py-2 px-3 rounded-xl bg-royal-navy-900/90 border border-[#C5A85C]/25 text-champagne-gold-200 hover:bg-[#C5A85C]/10 transition-all text-[10px] font-extrabold tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#C5A85C]/60"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#C5A85C]" />
                        <span>{language === 'en' ? 'Upload Custom Photo' : 'تحميل صورة مخصصة'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chauffeur actions with rich gold button & Compare toggle */}
            <div className="pt-3 border-t border-[#C5A85C]/15 relative z-10">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onSelectVehicleAndInquire(currentVehicle.id)}
                  className="flex-1 text-center btn-metallic-gold text-royal-navy-950 font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,168,92,0.35)] transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {language === 'en' ? `Book Now` : `احجز الآن`}
                </button>
                <button
                  onClick={() => {
                    if (compareList.includes(currentVehicle.id)) {
                      setCompareList(prev => prev.filter(id => id !== currentVehicle.id));
                    } else {
                      setCompareList(prev => [...prev, currentVehicle.id]);
                    }
                  }}
                  className={`px-4 py-3 rounded-xl border text-[10px] font-mono tracking-widest uppercase font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    compareList.includes(currentVehicle.id)
                      ? 'border-[#C5A85C] bg-[#C5A85C]/20 text-champagne-gold-100 hover:bg-[#C5A85C]/30'
                      : 'border-[#C5A85C]/30 hover:border-[#C5A85C] hover:bg-white/5 text-[#C5A85C]'
                  }`}
                  title={language === 'en' ? 'Add or remove model from specs comparison matrix' : 'إضافة أو إزالة هذا الموديل من جدول مقارنة المواصفات'}
                >
                  <Scale className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {compareList.includes(currentVehicle.id)
                      ? (language === 'en' ? 'Compared' : 'مضاف')
                      : (language === 'en' ? 'Compare' : 'مقارنة')}
                  </span>
                </button>
              </div>
            </div>

          </motion.div>

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
                          src={v.image}
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
                              src={veh.image}
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
