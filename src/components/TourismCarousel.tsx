import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send, 
  Landmark, 
  Calendar, 
  Grid, 
  Wifi, 
  Coffee, 
  Languages, 
  ShieldCheck, 
  Eye, 
  Map, 
  Car, 
  Info, 
  Award, 
  History,
  TrendingUp,
  LayoutGrid,
  Upload,
  Link,
  Edit2,
  Camera,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { images } from '../imageRegistry';
import { 
  getStoredDestinations, 
  FALLBACK_DESTINATION, 
  DestinationNode,
  TOURIST_DESTINATIONS,
  resetStoredDestinations,
  saveStoredDestinations
} from '../data/touristDestinations';
import { compressImageSource } from '../utils/imageCompressor';

// Coordinates for our handcrafted interactive vector route map
interface MapCoordinate {
  id: string;
  name: string;
  nameAr: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

const JORDAN_MAP_NODES: MapCoordinate[] = [
  { id: 'amman', name: 'Amman (Hub)', nameAr: 'عمان (المركز)', x: 55, y: 32 },
  { id: 'jerash', name: 'Jerash', nameAr: 'جرش', x: 55, y: 22 },
  { id: 'ajloun', name: 'Ajloun', nameAr: 'عجلون', x: 48, y: 18 },
  { id: 'deadsea', name: 'Dead Sea', nameAr: 'البحر الميت', x: 38, y: 45 },
  { id: 'mountnebo', name: 'Mount Nebo', nameAr: 'جبل نيبو', x: 48, y: 40 },
  { id: 'kerak', name: 'Kerak Castle', nameAr: 'قلعة الكرك', x: 42, y: 58 },
  { id: 'petra', name: 'Petra', nameAr: 'البتراء', x: 38, y: 78 },
  { id: 'wadirum', name: 'Wadi Rum', nameAr: 'وادي رم', x: 42, y: 90 },
  { id: 'aqaba', name: 'Aqaba', nameAr: 'العقبة', x: 30, y: 95 },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : dir > 0 ? '-100%' : 0,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  })
};

const PRESETS_BY_DESTINATION: Record<string, { url: string; labelEn: string; labelAr: string }[]> = {
  amman: [
    { url: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80', labelEn: 'Amman Citadel', labelAr: 'قلعة عمان' },
    { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80', labelEn: 'Downtown Theater', labelAr: 'المدرج الروماني' },
    { url: 'https://images.unsplash.com/photo-1512100356135-cc58b20e9854?auto=format&fit=crop&w=1200&q=80', labelEn: 'Ancient Pillars', labelAr: 'الأعمدة الأثرية' }
  ],
  petra: [
    { url: 'https://images.unsplash.com/photo-1501232479008-56c59344e2e4?auto=format&fit=crop&w=1200&q=80', labelEn: 'The Treasury', labelAr: 'الخزنة الوردية' },
    { url: 'https://images.unsplash.com/photo-1580835153549-9d0473e1c66f?auto=format&fit=crop&w=1200&q=80', labelEn: 'Petra By Night', labelAr: 'البتراء مضاءة ليلاً' },
    { url: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80', labelEn: 'Monastery Gorge', labelAr: 'ممر الدير الصخري' }
  ],
  wadirum: [
    { url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', labelEn: 'Golden Dunes', labelAr: 'كثبان وادي رم' },
    { url: 'https://images.unsplash.com/photo-1581005118544-775e52c8bc52?auto=format&fit=crop&w=1200&q=80', labelEn: 'Bedouin Camp Fire', labelAr: 'شعلة المخيم البدوي' },
    { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80', labelEn: 'Starry Desert Night', labelAr: 'نجوم سماء وادي رم' }
  ],
  deadsea: [
    { url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f9c?auto=format&fit=crop&w=1200&q=80', labelEn: 'Turquoise Waters', labelAr: 'مياه البحر الميت' },
    { url: 'https://images.unsplash.com/photo-1473116763269-255ea7427be2?auto=format&fit=crop&w=1200&q=80', labelEn: 'Salt Shoreline', labelAr: 'شواطئ الملح البيضاء' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', labelEn: 'Sunset Floating', labelAr: 'الاسترخاء وقت الغروب' }
  ],
  aqaba: [
    { url: 'https://images.unsplash.com/photo-1627896157734-4d7d4388f24b?auto=format&fit=crop&w=1200&q=80', labelEn: 'Coastal Luxury', labelAr: 'ساحل العقبة الدافئ' },
    { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', labelEn: 'Red Sea Yachts', labelAr: 'يخوت البحر الأحمر' }
  ],
  jerash: [
    { url: 'https://images.unsplash.com/photo-1512100356135-cc58b20e9854?auto=format&fit=crop&w=1200&q=80', labelEn: 'Roman Colonnade', labelAr: 'شارع الأعمدة الأثري' }
  ],
  damascus: [
    { url: 'https://images.unsplash.com/photo-1547886596-43b1a1329175?auto=format&fit=crop&w=1200&q=80', labelEn: 'Damascus Old City', labelAr: 'حارات دمشق القديمة' }
  ],
  beirut: [
    { url: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80', labelEn: 'Beirut Raouche', labelAr: 'صخرة الروشة ببيروت' }
  ],
  ajloun: [
    { url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1200&q=80', labelEn: 'Ajloun Forest', labelAr: 'قلعة عجلون ومحميتها' }
  ]
};

const DEFAULT_PRESETS = [
  { url: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80', labelEn: 'Amman Citadel', labelAr: 'القلعة الأثرية' },
  { url: 'https://images.unsplash.com/photo-1501232479008-56c59344e2e4?auto=format&fit=crop&w=1200&q=80', labelEn: 'Petra Treasury', labelAr: 'خزنة البتراء' },
  { url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', labelEn: 'Wadi Rum Desert', labelAr: 'صحراء رم' },
  { url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f9c?auto=format&fit=crop&w=1200&q=80', labelEn: 'Dead Sea Wellness', labelAr: 'استجمام البحر الميت' }
];

const optimizeImage = (url: string, width = 800, height?: number, quality = 75) => {
  if (!url) return '';
  if (url.startsWith('data:')) return url;
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      urlObj.searchParams.set('w', String(width));
      if (height) {
        urlObj.searchParams.set('h', String(height));
      }
      urlObj.searchParams.set('q', String(quality));
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  }
  return url;
};

export default function TourismCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language, isRtl, isAdmin } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [activeTab, setActiveTab] = useState<'story' | 'highlights' | 'fleet'>('story');
  const [selectedFleetId, setSelectedFleetId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState<boolean>(false); // toggle photo vs route map inside showcase card
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [destinationsList, setDestinationsList] = useState<DestinationNode[]>(() => {
    const list = getStoredDestinations();
    return Array.isArray(list) && list.length > 0 ? list : [FALLBACK_DESTINATION];
  });

  const [customizingDestId, setCustomizingDestId] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleUpdateImage = async (destId: string, newImage: string) => {
    try {
      // Compress/resize the image before applying and storing it
      const compressedImage = await compressImageSource(newImage, 1000, 1000, 0.75);
      
      const updated = destinationsList.map((d) => {
        if (d.id === destId) {
          return { ...d, image: compressedImage };
        }
        return d;
      });
      setDestinationsList(updated);
      saveStoredDestinations(updated);
      
      // Clear failed and loaded state to trigger a fresh load of the new resource
      setFailedImages((prev) => {
        const copy = { ...prev };
        delete copy[destId];
        return copy;
      });
      setLoadedImages((prev) => ({
        ...prev,
        [destId]: false
      }));
    } catch (err) {
      console.error('Error compressing or updating image:', err);
    }
  };

  const handleFileUpload = async (destId: string, file: File) => {
    if (!file) return;
    try {
      const compressedImage = await compressImageSource(file, 1000, 1000, 0.75);
      await handleUpdateImage(destId, compressedImage);
    } catch (err) {
      console.error('Error uploading and compressing file:', err);
    }
  };

  const handleDeleteDestination = (destId: string) => {
    const updated = destinationsList.filter((d) => d.id !== destId);
    setDestinationsList(updated);
    saveStoredDestinations(updated);
  };

  const handleResetDestinations = () => {
    resetStoredDestinations();
    const list = getStoredDestinations();
    setDestinationsList(list);
  };

  const handleSelectAndShow = (destId: string) => {
    const idx = destinationsList.findIndex(d => d.id === destId);
    if (idx !== -1) {
      setActiveIndex(idx);
      setViewMode('split');
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Preload & Pre-decode all destination and fleet images in the background for ultra-high performance instant rendering
  useEffect(() => {
    if (typeof window !== 'undefined' && destinationsList) {
      destinationsList.forEach((dest) => {
        if (dest?.image) {
          const img = document.createElement('img') as HTMLImageElement;
          img.src = optimizeImage(dest.image, 800, 75);
          // Modern GPU pre-decoding to avoid frame drops on rendering
          const canDecode = typeof (img as any).decode === 'function';
          if (canDecode) {
            img.decode().then(() => {
              setLoadedImages(prev => ({ ...prev, [dest.id]: true }));
            }).catch(() => {
              // Graceful fallback to default browser onload
              img.onload = () => {
                setLoadedImages(prev => ({ ...prev, [dest.id]: true }));
              };
            });
          } else {
            img.onload = () => {
              setLoadedImages(prev => ({ ...prev, [dest.id]: true }));
            };
          }
        }
      });
      FLEET_ITEMS.forEach((item) => {
        if (item?.image) {
          const img = document.createElement('img') as HTMLImageElement;
          img.src = item.image;
        }
      });
    }
  }, [destinationsList]);

  const fallbackImages: Record<string, string> = {
    amman: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=800&q=75',
    petra: 'https://images.unsplash.com/photo-1501232479008-56c59344e2e4?auto=format&fit=crop&w=800&q=75',
    wadirum: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=75',
    deadsea: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f9c?auto=format&fit=crop&w=800&q=75',
    jerash: 'https://images.unsplash.com/photo-1512100356135-cc58b20e9854?auto=format&fit=crop&w=800&q=75',
    aqaba: 'https://images.unsplash.com/photo-1627896157734-4d7d4388f24b?auto=format&fit=crop&w=800&q=75',
    mountnebo: 'https://images.unsplash.com/photo-1608958416806-039cfffa68b9?auto=format&fit=crop&w=800&q=75',
    kerak: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=75',
    ajloun: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=75',
    damascus: 'https://images.unsplash.com/photo-1547886596-43b1a1329175?auto=format&fit=crop&w=800&q=75',
    beirut: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=75'
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev >= destinationsList.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev <= 0 ? destinationsList.length - 1 : prev - 1));
  };

  const handleBookDestination = (name: string, nameAr: string) => {
    const remarksField = document.getElementById('remarks') as HTMLTextAreaElement | null;
    const dropoffField = document.getElementById('dropoffSelect') as HTMLInputElement | null;
    
    if (dropoffField) {
      dropoffField.value = language === 'en' ? `Tour to ${name}` : `رحلة سياحية إلى ${nameAr}`;
      const event = new Event('input', { bubbles: true });
      dropoffField.dispatchEvent(event);
    }

    if (remarksField) {
      remarksField.value = language === 'en' 
        ? `We are interested in booking a premium tour to explore ${name}. Please arrange the details.`
        : `نرغب بحجز رحلة سياحية لزيارة واستكشاف ${nameAr}. نرجو تنسيق المواعيد والتفاصيل.`;
      const event = new Event('input', { bubbles: true });
      remarksField.dispatchEvent(event);
    }

    const bookSection = document.getElementById('book');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handcrafted premium fleet dataset for the interactive icons and recommender system
  const FLEET_ITEMS = [
    {
      id: 's-class',
      nameEn: 'Mercedes-Benz S-Class (W223)',
      nameAr: 'مرسيدس بنز الفئة S ملوكية',
      image: images.services.vipSClassAmman || '/images/vip_s_class_amman_1782232812410.jpg',
      reasonEn: 'Perfect for urban prestige, supreme acoustic isolation, and gliding smoothly through capital hills.',
      reasonAr: 'خيار مثالي لتنقلات العاصمة، عزل صوتي مطلق وانسيابية مذهلة تناسب تلال عمان الملوكية.',
      luxuryRank: 'Elite Class VIP',
      luxuryRankAr: 'نخبة كبار الشخصيات VIP'
    },
    {
      id: 'yukon',
      nameEn: 'GMC Yukon Denali Ultimate',
      nameAr: 'جي إم سي يوكون دينالي برستيج',
      image: images.fleet.luxuryGmcYukon || '/images/regenerated_image_1782434427794.jpg',
      reasonEn: 'Commanding high-elevation control, all-wheel drive, and generous panoramic roof for scenic mountain views.',
      reasonAr: 'أداء قوي في المرتفعات الجبلية العالية لجرش وعجلون، ونظام دفع رباعي آمن مع سقف بانورامي ساحر.',
      luxuryRank: 'Royal SUV Expedition',
      luxuryRankAr: 'الدفع الرباعي الملوكي'
    },
    {
      id: 'staria',
      nameEn: 'Hyundai Staria VIP',
      nameAr: 'هيونداي ستاريا VIP',
      image: images.fleet.stariaVip || '/images/staria_vip_amman_1782232781113.jpg',
      reasonEn: 'Elite multi-passenger space with leather captain seats and panoramic windows.',
      reasonAr: 'مساحة نخبوية مريحة لعدة ركاب مع مقاعد جلدية رئاسية ونوافذ بانورامية.',
      luxuryRank: 'Elite Family Lounge',
      luxuryRankAr: 'الدرجة العائلية الراقية'
    },
    {
      id: 'comfort',
      nameEn: 'Comfort Class (Sedan)',
      nameAr: 'الفئة المريحة (سيدان)',
      image: images.fleet.comfortClass || '/images/comfort_class_fleet_1782258340226.jpg',
      reasonEn: 'Premium smooth sedans like Toyota Camry, perfect for comfortable city trips and daily transfers.',
      reasonAr: 'سيارات سيدان راقية وعائلية مثل تويوتا كامري، ممتازة للتنقل المريح داخل المدن والتوصيل السريع.',
      luxuryRank: 'Executive Comfort',
      luxuryRankAr: 'الدرجة المريحة'
    },
    {
      id: 'hiace',
      nameEn: 'Toyota Hiace Tourer',
      nameAr: 'تويوتا هايس السياحية',
      image: images.fleet.toyotaHiace || '/images/royal_ride_hero_1781696285755.jpg',
      reasonEn: 'Highly spacious medium-sized van customized for group transfers, luggage convenience, and ancient landmark excursions.',
      reasonAr: 'ڤان متوسط الحجم فخم ومتسع، مخصص للمجموعات والرحلات السياحية وجولات الأردن الأثرية براحة وأمان.',
      luxuryRank: 'Executive Van',
      luxuryRankAr: 'الدرجة العائلية المتوسطة'
    },
    {
      id: 'coaster',
      nameEn: 'Toyota Coaster Luxury',
      nameAr: 'حافلة تويوتا كوستر الفاخرة',
      image: images.fleet.toyotaCoaster || '/images/regenerated_image_1782486245190.jpg',
      reasonEn: 'Spacious high-capacity luxury touring bus for larger delegations and group expeditions.',
      reasonAr: 'حافلة سياحية فاخرة واسعة ومريحة، مصممة للمجموعات الكبيرة والوفود المشتركة.',
      luxuryRank: 'Sovereign Coach',
      luxuryRankAr: 'الدرجة الجماعية الفاخرة'
    }
  ];

  // Helper to recommend high-end vehicles based on destination characteristics
  const getRecommendedFleet = (destId: string) => {
    const lowerId = destId.toLowerCase();
    if (lowerId.includes('amman')) {
      return FLEET_ITEMS[0]; // S-Class
    } else if (lowerId.includes('petra') || lowerId.includes('rum') || lowerId.includes('aqaba') || lowerId.includes('kerak')) {
      return FLEET_ITEMS[1]; // GMC Yukon
    } else if (lowerId.includes('dead') || lowerId.includes('nebo')) {
      return FLEET_ITEMS[0]; // S-Class
    } else {
      // Jerash, Ajloun
      return FLEET_ITEMS[1]; // GMC Yukon
    }
  };

  const activeDest = destinationsList[activeIndex] || FALLBACK_DESTINATION;
  const currentImage = optimizeImage(
    failedImages[activeDest.id]
      ? (fallbackImages[activeDest.id] || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=800&q=75')
      : activeDest.image,
    500,
    500,
    75
  );

  const fleetRec = getRecommendedFleet(activeDest.id);

  // Auto-reset customized vehicle selection when switching destinations
  useEffect(() => {
    setSelectedFleetId(null);
  }, [activeIndex]);

  // Self-healing image loader: reset failed flag for active destination only when its actual image property is modified
  useEffect(() => {
    if (activeDest?.id) {
      setFailedImages((prev) => {
        if (prev[activeDest.id]) {
          const next = { ...prev };
          delete next[activeDest.id];
          return next;
        }
        return prev;
      });
    }
  }, [activeDest?.image]);

  // Elegant Auto-scrolling (Autoplay) mechanism for the premium carousel
  useEffect(() => {
    // Only auto-advance in split mode, when map is hidden, and when uploader is not active
    if (viewMode !== 'split' || showMap || customizingDestId !== null) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds for a luxurious, leisurely reading speed

    return () => clearInterval(interval);
  }, [viewMode, showMap, customizingDestId, activeIndex, destinationsList.length]);

  return (
    <section id="tourism" ref={sectionRef} className="relative py-24 bg-black overflow-hidden text-left text-[#FAF6ED]">
      
      {/* Decorative Blur BG */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-champagne-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-[#C5A85C]/5 blur-[130px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A85C]">
              {language === 'en' ? 'Tourism Destinations' : 'الوجهات السياحية'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-champagne-gold-100 mt-3">
              Tourism Showcase
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C5A85C] mt-5" />
          </div>
          <p className="font-sans text-sm text-champagne-gold-100/75 max-w-xl leading-relaxed">
            {language === 'en' 
              ? 'Traverse the Hashemite kingdom with elite private chauffeurs and custom-tailored schedules. We provide seamless daily round-trips to all prime historic treasures.'
              : 'تنقل بين المعالم الحضارية والأثرية الخالدة للمملكة بأقصى درجات الفخامة والأمان. نوفر جولات مخصصة يومية وسائقين يتحدثون لغات عدة لتجربة غنية تليق بكم.'}
          </p>
        </motion.div>

        {/* Visual Presentation Mode Toggle */}
        <div className="flex justify-center mb-20 relative z-20">
          <div className="inline-flex p-1 rounded-2xl bg-[#111111]/90 border border-[#C5A85C]/35 shadow-[0_4px_20px_rgba(197,168,92,0.1)] backdrop-blur-md">
            <button
              onClick={() => setViewMode('split')}
              className={`px-5 py-2.5 rounded-xl text-xs font-sans font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-gradient-to-r from-[#C5A85C] to-[#806c3a] text-black shadow-md shadow-[#C5A85C]/25'
                  : 'text-champagne-gold-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              {language === 'en' ? 'Sovereign Board' : 'منصة العرض'}
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2.5 rounded-xl text-xs font-sans font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#C5A85C] to-[#806c3a] text-black shadow-md shadow-[#C5A85C]/25'
                  : 'text-champagne-gold-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {language === 'en' ? 'Brochure' : 'كتيب العروض'}
            </button>
          </div>
        </div>

        {viewMode === 'split' ? (
          <div className="space-y-8">
            {/* Elegant Selector Tabs with thumbnails of all images */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5A85C]">
                  {language === 'en' ? 'Select Destination / Explore Gallery' : 'اختر الوجهة / استكشف المعرض'}
                </span>
                <button
                  onClick={() => {
                    const tourismKeys = ['tourism_amman', 'tourism_petra', 'tourism_wadirum', 'tourism_deadsea', 'tourism_aqaba', 'tourism_jerash', 'tourism_madaba', 'tourism_damascus', 'tourism_beirut', 'tourism_ajloun'];
                    tourismKeys.forEach(key => {
                      localStorage.removeItem(`rr_img_override_${key}`);
                    });
                    resetStoredDestinations();
                    setDestinationsList(TOURIST_DESTINATIONS);
                    setFailedImages({});
                    setActiveIndex(0);
                    window.location.reload();
                  }}
                  className="flex items-center justify-center gap-1.5 text-xs font-sans font-bold text-[#C5A85C] hover:text-white transition-colors duration-200 cursor-pointer bg-[#111111]/85 px-4 py-2 rounded-xl border border-[#C5A85C]/30 hover:border-[#C5A85C] shadow-md shadow-black/40 self-start sm:self-auto"
                >
                  <History className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Restore Original Images' : 'استعادة الصور الأصلية'}
                </button>
              </div>
              {/* Horizontal Scrollable Destination Tabs */}
              <div className={`flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                {destinationsList.map((dest, idx) => {
                  const isCurrentlySelected = activeIndex === idx;
                  const destImage = optimizeImage(
                    failedImages[dest.id]
                      ? (fallbackImages[dest.id] || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=800&q=75')
                      : dest.image,
                    200,
                    70
                  );

                  return (
                    <button
                      key={dest.id}
                      onClick={() => {
                        setDirection(idx > activeIndex ? 1 : -1);
                        setActiveIndex(idx);
                      }}
                      className={`relative flex items-center gap-3 px-4 py-2 rounded-xl border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                        isCurrentlySelected
                          ? 'border-[#C5A85C] bg-[#C5A85C]/10 text-[#C5A85C] scale-[1.03] shadow-[0_4px_12px_rgba(197,168,92,0.15)]'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-[#C5A85C]/40 hover:text-stone-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A85C]/35 bg-black shrink-0">
                        <img
                          src={destImage}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={() => {
                            setFailedImages(prev => ({ ...prev, [dest.id]: true }));
                          }}
                        />
                      </div>
                      <span className="text-xs font-sans font-bold whitespace-nowrap">
                        {language === 'en' ? dest.name : dest.nameAr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Visual Media & Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 w-full flex flex-col items-center justify-center space-y-5 animate-gpu"
              >
                  <AnimatePresence mode="wait">
                    {!showMap ? (
                      // Interactive Sliding Image Carousel
                      <div 
                        onClick={() => {
                          if (customizingDestId !== activeDest.id) {
                            setCustomizingDestId(activeDest.id);
                            setCustomUrl(activeDest.image.startsWith('data:') ? '' : activeDest.image);
                          }
                        }}
                        className={`relative w-full aspect-square max-w-[500px] mx-auto z-0 overflow-hidden rounded-3xl group border border-[#C5A85C]/35 hover:border-[#C5A85C]/65 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#080808] flex items-center justify-center transition-all duration-500 ${customizingDestId !== activeDest.id ? 'cursor-pointer hover:shadow-[0_0_25px_rgba(197,168,92,0.15)]' : ''}`}
                      >
                        <AnimatePresence initial={false} custom={direction}>
                          <motion.div
                            key={activeDest.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                          >
                            <motion.img
                              src={currentImage}
                              alt={`وجهة سياحية: ${activeDest.name} من Royal Ride Jordan`}
                              className={`w-full h-full object-cover transition-transform duration-700 ${customizingDestId === activeDest.id ? 'blur-sm brightness-50' : 'group-hover:scale-105'}`}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              onError={() => {
                                setFailedImages(prev => ({ ...prev, [activeDest.id]: true }));
                              }}
                            />
                            {/* Fine Vignette Overlay instead of heavy black mask for beautiful crisp photo details */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                          </motion.div>
                        </AnimatePresence>

                        {/* Elegant always-visible Glassmorphic badge for flexible customization */}
                        {isAdmin && customizingDestId !== activeDest.id && (
                          <div className="absolute bottom-4 right-4 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCustomizingDestId(activeDest.id);
                                setCustomUrl(activeDest.image.startsWith('data:') ? '' : activeDest.image);
                              }}
                              className="px-4 py-2 rounded-xl border border-[#C5A85C]/35 bg-black/80 text-[#C5A85C] hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] text-xs font-sans font-extrabold flex items-center gap-1.5 shadow-lg backdrop-blur-[6px] transition-all duration-300 cursor-pointer active:scale-95 animate-fadeIn"
                            >
                              <Camera className="w-3.5 h-3.5 animate-pulse" />
                              <span>{language === 'en' ? 'Change Photo' : 'تغيير الصورة'}</span>
                            </button>
                          </div>
                        )}

                        {/* Absolute embedded uploader panel for Split mode */}
                        {isAdmin && customizingDestId === activeDest.id && (
                          <div className="absolute inset-0 bg-black/95 backdrop-blur-md p-6 flex flex-col justify-between z-20 animate-fadeIn border border-[#C5A85C]/45 rounded-3xl text-left">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-[#C5A85C]/25 pb-2">
                                <span className="text-xs font-mono font-bold text-[#C5A85C] uppercase tracking-wider">
                                  {language === 'en' ? 'Configure Destination Image' : 'تعديل صورة الوجهة'}
                                </span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCustomizingDestId(null);
                                  }}
                                  className="text-stone-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
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
                                      placeholder={language === 'en' ? 'Paste any high-res image URL...' : 'رابط صورة عالي الدقة...'}
                                      value={customUrl}
                                      onChange={(e) => setCustomUrl(e.target.value)}
                                      className="w-full bg-stone-900 text-white text-xs pl-9 pr-3 py-2 rounded-xl border border-[#C5A85C]/20 focus:border-[#C5A85C] outline-none font-sans"
                                    />
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (customUrl.trim()) {
                                        handleUpdateImage(activeDest.id, customUrl.trim());
                                        setCustomizingDestId(null);
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
                                        handleFileUpload(activeDest.id, file);
                                        setCustomizingDestId(null);
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
                                  {language === 'en' ? 'Option 3: Select an Elite Preset' : 'الخيار 3: اختر من الباقة الفاخرة'}
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                  {(PRESETS_BY_DESTINATION[activeDest.id] || DEFAULT_PRESETS).map((preset, idx) => (
                                    <button
                                      key={idx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateImage(activeDest.id, preset.url);
                                        setCustomizingDestId(null);
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
                                      <div className="absolute inset-0 bg-black/50 group-hover/preset:bg-transparent transition-all flex items-end p-1">
                                        <span className="text-[8px] text-white font-sans bg-black/80 px-1.5 py-0.5 rounded-lg w-full truncate text-center font-bold">
                                          {language === 'en' ? preset.labelEn : preset.labelAr}
                                        </span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-between border-t border-stone-800 pt-2 items-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const def = TOURIST_DESTINATIONS.find(d => d.id === activeDest.id);
                                  if (def) {
                                    handleUpdateImage(activeDest.id, def.image);
                                  }
                                  setCustomizingDestId(null);
                                }}
                                className="text-[10px] text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                              >
                                {language === 'en' ? 'Reset to Default Image' : 'استعادة الصورة الافتراضية'}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCustomizingDestId(null);
                                }}
                                className="text-[10px] text-stone-400 hover:text-white transition-colors cursor-pointer"
                              >
                                {language === 'en' ? 'Cancel' : 'إلغاء'}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Slide Indicator Overlay e.g. 03 / 10 */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                          <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-[#C5A85C]/30 text-xs font-mono font-extrabold text-[#C5A85C] shadow-lg backdrop-blur-[6px]">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(destinationsList.length).padStart(2, '0')}
                          </div>
                        </div>

                        {/* Navigation Arrows (Always visible on mobile, beautifully styled on hover on desktop) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 md:bg-black/40 border border-[#C5A85C]/40 text-[#C5A85C] hover:text-white hover:scale-105 transition-all flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 shadow-xl cursor-pointer"
                          aria-label="Previous Slide"
                        >
                          <ChevronLeft className="w-5.5 h-5.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 md:bg-black/40 border border-[#C5A85C]/40 text-[#C5A85C] hover:text-white hover:scale-105 transition-all flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 shadow-xl cursor-pointer"
                          aria-label="Next Slide"
                        >
                          <ChevronRight className="w-5.5 h-5.5" />
                        </button>

                        {/* Route Map Toggle Overlay */}
                        <button
                          onClick={() => setShowMap(true)}
                          className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/80 border border-[#C5A85C]/30 text-xs font-sans font-semibold tracking-wider text-[#C5A85C] hover:bg-[#C5A85C] hover:text-black transition-all flex items-center gap-1.5 shadow-md cursor-pointer backdrop-blur-[4px]"
                        >
                          <Map className="w-3.5 h-3.5" />
                          {language === 'en' ? 'Show Route' : 'عرض الخريطة'}
                        </button>

                        {/* Carousel Dots Pagination Indicators inside the card at the bottom */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 bg-black/70 px-4 py-2 rounded-full border border-stone-800/80 backdrop-blur-md shadow-2xl">
                          {destinationsList.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDirection(idx > activeIndex ? 1 : -1);
                                setActiveIndex(idx);
                              }}
                              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === activeIndex 
                                  ? 'w-7 bg-gradient-to-r from-[#C5A85C] to-[#ffe3a1] shadow-[0_0_8px_rgba(197,168,92,0.5)]' 
                                  : 'w-2 bg-stone-500/80 hover:bg-stone-300'
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>


                      </div>
                    ) : (
                      // Interactive Map Container
                      <motion.div
                        key="map-stage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full max-w-[500px] aspect-square mx-auto z-0 overflow-hidden rounded-3xl bg-[#0c0c0c] flex flex-col items-center justify-center border border-[#C5A85C]/30 group"
                      >
                        {/* Interactive Jordan Map Representation */}
                        <div className="absolute inset-0 bg-radial-gradient from-[#111] to-black opacity-45 pointer-events-none" />
                        
                        {/* Map Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C5A85C 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        
                        <div className="relative w-full h-full max-w-[400px] max-h-[460px] flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full text-[#C5A85C]/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="55" y1="22" x2="55" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="48" y1="18" x2="55" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="38" y1="45" x2="55" y2="32" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="48" y1="40" x2="55" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="42" y1="58" x2="38" y2="45" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="38" y1="78" x2="42" y2="58" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="42" y1="90" x2="38" y2="78" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="30" y1="95" x2="42" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                          </svg>

                          {JORDAN_MAP_NODES.map((node) => {
                            const isNodeActive = node.id === activeDest.id;
                            const isHovered = hoveredNode === node.id;
                            return (
                              <button
                                key={node.id}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => {
                                  const index = destinationsList.findIndex(d => d.id === node.id);
                                  if (index !== -1) {
                                    setActiveIndex(index);
                                  }
                                }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 flex flex-col items-center group cursor-pointer"
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                              >
                                <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                                  isNodeActive 
                                    ? 'bg-[#C5A85C] scale-125 shadow-[0_0_12px_#C5A85C]' 
                                    : isHovered 
                                      ? 'bg-white scale-110 shadow-md' 
                                      : 'bg-[#C5A85C]/40 border border-[#C5A85C]/60'
                                }`}>
                                  {isNodeActive && <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />}
                                </div>
                                <span className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-sans font-bold tracking-wide border transition-all duration-300 whitespace-nowrap ${
                                  isNodeActive
                                    ? 'bg-[#C5A85C] text-black border-[#C5A85C]'
                                    : 'bg-black/90 text-champagne-gold-300 border-[#C5A85C]/20 hover:border-[#C5A85C]/50'
                                }`}>
                                  {language === 'en' ? node.name : node.nameAr}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Back to Photo overlay */}
                        <button
                          onClick={() => setShowMap(false)}
                          className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/85 border border-[#C5A85C]/30 text-xs font-sans font-semibold tracking-wider text-[#C5A85C] hover:bg-[#C5A85C] hover:text-black transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {language === 'en' ? 'Show Gallery' : 'عرض المعرض'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Right Column: Premium Sovereign Experience Ledger Card */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#0a0a0a] border border-[#C5A85C]/35 hover:border-[#C5A85C] transition-all duration-500 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(197,168,92,0.07)] rounded-3xl p-6 sm:p-8 relative overflow-hidden w-full self-stretch min-h-[500px]">
                  {/* Elegant gold filigree corner accents */}
                  <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[#C5A85C]/40 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[#C5A85C]/40 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[#C5A85C]/40 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[#C5A85C]/40 pointer-events-none" />

                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-[#C5A85C] font-serif text-3xl md:text-4xl tracking-tight font-bold">
                      {language === 'en' ? activeDest.name : activeDest.nameAr}
                    </h3>
                    <p className="text-champagne-gold-400 font-sans text-xs tracking-wider uppercase">
                      {language === 'en' ? activeDest.subtitle : activeDest.subtitleAr}
                    </p>
                  </div>

                  {/* Elegant Internal Tabs */}
                  <div className="flex border-b border-[#C5A85C]/20 mt-6 mb-4">
                    <button
                      onClick={() => setActiveTab('story')}
                      className={`flex-1 pb-2.5 text-xs font-sans font-extrabold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                        activeTab === 'story'
                          ? 'border-[#C5A85C] text-[#C5A85C]'
                          : 'border-transparent text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {language === 'en' ? 'Story' : 'القصة'}
                    </button>
                    <button
                      onClick={() => setActiveTab('highlights')}
                      className={`flex-1 pb-2.5 text-xs font-sans font-extrabold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                        activeTab === 'highlights'
                          ? 'border-[#C5A85C] text-[#C5A85C]'
                          : 'border-transparent text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {language === 'en' ? 'Highlights' : 'أبرز المعالم'}
                    </button>
                  </div>

                  {/* Main Content */}
                  <div className="py-4 border-b border-[#C5A85C]/20 my-4 flex-grow flex items-center min-h-[160px]">
                    <AnimatePresence mode="wait">
                      {activeTab === 'story' && (
                        <motion.div
                          key="story-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="w-full"
                        >
                          <p className={`text-stone-300 font-sans text-sm leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                            {language === 'en' ? activeDest.description : activeDest.descriptionAr}
                          </p>
                        </motion.div>
                      )}

                      {activeTab === 'highlights' && (
                        <motion.div
                          key="highlights-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="w-full space-y-2.5"
                        >
                          {(language === 'en' ? activeDest.highlights : activeDest.highlightsAr).map((hl, i) => (
                            <div key={i} className={`flex items-start gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A85C] mt-1.5 shrink-0 animate-pulse" />
                              <span className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">{hl}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === 'fleet' && (() => {
                        const activeVehicle = selectedFleetId 
                          ? (FLEET_ITEMS.find(f => f.id === selectedFleetId) || fleetRec) 
                          : fleetRec;
                        return (
                          <motion.div
                            key="fleet-tab"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="w-full space-y-4"
                          >
                            {/* Horizontal Fleet Selector Icons */}
                            <div className={`flex flex-col space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                              <span className="text-[10px] font-sans font-extrabold text-[#C5A85C] uppercase tracking-wider">
                                {language === 'en' ? 'Sovereign Fleet Options' : 'خيارات أسطول السيارات الفاخرة'}
                              </span>
                              <div className={`flex gap-3 overflow-x-auto pb-1 scrollbar-none py-1 justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                                {FLEET_ITEMS.map((vehicle) => {
                                  const isRecommended = vehicle.id === fleetRec.id;
                                  const isCurrentlySelected = selectedFleetId === vehicle.id || (!selectedFleetId && isRecommended);
                                  return (
                                    <button
                                      key={vehicle.id}
                                      onClick={() => setSelectedFleetId(vehicle.id)}
                                      className={`relative flex items-center justify-center p-0.5 rounded-full border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                                        isCurrentlySelected
                                          ? 'border-[#C5A85C] scale-105 shadow-[0_0_8px_rgba(197,168,92,0.4)]'
                                          : 'border-stone-800 hover:border-stone-700 bg-stone-900/30'
                                      }`}
                                      title={language === 'en' ? vehicle.nameEn : vehicle.nameAr}
                                    >
                                      <div className="w-10 h-10 rounded-full overflow-hidden border border-black bg-black">
                                        <img
                                          src={vehicle.image}
                                          alt={vehicle.nameEn}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                      {isRecommended && (
                                        <span className="absolute -top-1 -right-1 bg-[#C5A85C] text-black text-[7px] font-sans font-bold px-1 rounded-full border border-black scale-90">
                                          {language === 'en' ? 'Rec' : 'موصى'}
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Active Fleet Vehicle Card with Image */}
                            <div className={`flex flex-col sm:flex-row gap-4 items-center bg-[#111111]/95 p-4 rounded-2xl border border-[#C5A85C]/20 shadow-lg ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                              <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-800 bg-black/50">
                                <img
                                  src={activeVehicle.image}
                                  alt={language === 'en' ? activeVehicle.nameEn : activeVehicle.nameAr}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className={`flex-grow w-full ${isRtl ? 'text-right' : 'text-left'}`}>
                                <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                                  <h4 className="text-[#C5A85C] font-sans text-xs sm:text-sm font-extrabold">
                                    {language === 'en' ? activeVehicle.nameEn : activeVehicle.nameAr}
                                  </h4>
                                  <span className="text-[9px] bg-[#C5A85C]/15 border border-[#C5A85C]/30 text-[#C5A85C] px-2 py-0.5 rounded-full font-mono font-bold">
                                    {language === 'en' ? activeVehicle.luxuryRank : activeVehicle.luxuryRankAr}
                                  </span>
                                </div>
                                <p className="text-stone-400 text-xs leading-relaxed">
                                  {language === 'en' ? activeVehicle.reasonEn : activeVehicle.reasonAr}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>

                  {/* Footer/Action */}
                  <div className={`flex items-center justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex flex-col ${isRtl ? 'items-end' : 'items-start'}`}>
                      <span className="text-stone-500 text-[10px] uppercase tracking-wider">
                        {language === 'en' ? 'Best Time' : 'أفضل وقت للزيارة'}
                      </span>
                      <span className="text-[#C5A85C] font-mono text-[11px] font-bold mt-0.5">
                        {language === 'en' ? activeDest.bestTime : activeDest.bestTimeAr}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleBookDestination(activeDest.name, activeDest.nameAr)}
                      className="bg-[#C5A85C] text-black px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-white transition-all cursor-pointer shadow-md shadow-[#C5A85C]/10"
                    >
                      {language === 'en' ? 'Book Now' : 'احجز الآن'}
                    </button>
                  </div>
                </div>
            </div>
          </div>
        ) : destinationsList.length === 0 ? (
          <div className="text-center py-20 bg-[#0a0a0a]/60 rounded-3xl border-2 border-dashed border-[#C5A85C]/20 max-w-lg mx-auto p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-fadeIn">
            <Sparkles className="w-12 h-12 text-[#C5A85C]/60 mx-auto mb-5 animate-pulse" />
            <h4 className="text-champagne-gold-400 font-serif text-lg font-bold mb-2">
              {language === 'en' ? 'No Destinations' : 'لا توجد وجهات معروضة'}
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm mx-auto">
              {language === 'en' 
                ? 'All custom destinations have been deleted. You can restore the premium default places easily.' 
                : 'تم حذف جميع الوجهات السياحية المخصصة. يمكنك استعادة الأماكن الافتراضية الفاخرة بسهولة.'}
            </p>
            <button
              onClick={handleResetDestinations}
              className="mt-8 px-6 py-3 rounded-xl bg-[#C5A85C] text-black text-xs font-bold hover:bg-white transition-all cursor-pointer shadow-lg hover:shadow-[#C5A85C]/20 active:scale-95"
            >
              {language === 'en' ? 'Restore Default Destinations' : 'استعادة الوجهات الافتراضية'}
            </button>
          </div>
        ) : (
          /* Luxury Grid Brochure Explorer Layout */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2"
          >
            {destinationsList.map((dest) => {
              const destImage = optimizeImage(
                failedImages[dest.id]
                  ? (fallbackImages[dest.id] || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=800&q=75')
                  : dest.image,
                600,
                75
              );

              return (
                <div 
                  key={dest.id}
                  className="rounded-3xl overflow-hidden border border-[#C5A85C]/30 hover:border-[#C5A85C]/75 bg-[#0a0a0a] shadow-xl hover:shadow-[0_20px_40px_rgba(197,168,92,0.08)] transition-all duration-500 animate-fadeIn flex flex-col justify-between h-full group/card"
                >
                  {/* Card Image Header with Customizer options */}
                  <div 
                    onClick={() => {
                      if (customizingDestId !== dest.id) {
                        setCustomizingDestId(dest.id);
                        setCustomUrl(dest.image.startsWith('data:') ? '' : dest.image);
                      }
                    }}
                    className={`overflow-hidden aspect-[16/10] w-full relative group/img bg-stone-950 flex items-center justify-center transition-all duration-300 ${customizingDestId !== dest.id ? 'cursor-pointer' : ''}`}
                  >
                    <img 
                      src={destImage} 
                      alt={`وجهة سياحية: ${dest.name} من Royal Ride Jordan`} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${customizingDestId === dest.id ? 'blur-sm brightness-50' : 'group-hover/img:scale-105'}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onLoad={() => {
                        setLoadedImages(prev => ({ ...prev, [dest.id]: true }));
                      }}
                      onError={() => {
                        setFailedImages(prev => ({ ...prev, [dest.id]: true }));
                        setLoadedImages(prev => ({ ...prev, [dest.id]: true }));
                      }}
                    />

                    {/* Shimmer skeleton loading spacer */}
                    {!loadedImages[dest.id] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 flex flex-col items-center justify-center space-y-3 z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A85C]/10 to-transparent -translate-x-full animate-shimmer" />
                        <div className="w-10 h-10 rounded-full border border-[#C5A85C]/30 flex items-center justify-center animate-pulse">
                          <Sparkles className="w-4 h-4 text-[#C5A85C]/85" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-[#C5A85C]/80 uppercase">
                          {language === 'en' ? 'Sovereign Load' : 'جاري التحميل'}
                        </span>
                      </div>
                    )}

                    {/* Premium embedded name & subtitle overlay */}
                    {customizingDestId !== dest.id && loadedImages[dest.id] && (
                      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-12 flex flex-col justify-end z-10 pointer-events-none ${isRtl ? 'text-right' : 'text-left'}`}>
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#C5A85C] mb-1">
                          {language === 'en' ? 'Exclusive Tour' : 'رحلة حصرية'}
                        </span>
                        <h4 className="text-champagne-gold-400 font-serif text-lg font-bold">
                          {language === 'en' ? dest.name : dest.nameAr}
                        </h4>
                      </div>
                    )}

                    {/* Always visible, highly premium Change Photo & Delete triggers */}
                    {isAdmin && customizingDestId !== dest.id && loadedImages[dest.id] && (
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomizingDestId(dest.id);
                            setCustomUrl(dest.image.startsWith('data:') ? '' : dest.image);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-[#C5A85C]/35 bg-black/80 text-[#C5A85C] hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] text-[10px] font-sans font-extrabold flex items-center gap-1.5 shadow-lg backdrop-blur-[6px] transition-all duration-300 cursor-pointer active:scale-95 animate-fadeIn"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Change Photo' : 'تغيير الصورة'}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDestination(dest.id);
                          }}
                          className="p-1.5 rounded-lg border border-red-500/30 bg-black/80 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 shadow-lg backdrop-blur-[6px] transition-all duration-300 cursor-pointer active:scale-95 animate-fadeIn"
                          title={language === 'en' ? 'Delete' : 'حذف'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Absolute embedded uploader panel */}
                    {isAdmin && customizingDestId === dest.id && (
                      <div className="absolute inset-0 bg-black/95 backdrop-blur-md p-4 flex flex-col justify-between z-20 animate-fadeIn border border-[#C5A85C]/45 rounded-lg text-left">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-[#C5A85C]/25 pb-1.5">
                            <span className="text-[10px] font-mono font-bold text-[#C5A85C] uppercase tracking-wider">
                              {language === 'en' ? 'Configure Image' : 'تعديل الصورة'}
                            </span>
                            <button 
                              onClick={() => setCustomizingDestId(null)}
                              className="text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
                            >
                              ✕
                            </button>
                          </div>

                          {/* URL Paste */}
                          <div className="flex gap-1.5 items-center">
                            <div className="relative flex-1">
                              <Link className="absolute left-2.5 top-2 w-3.5 h-3.5 text-stone-500" />
                              <input 
                                type="text"
                                placeholder={language === 'en' ? 'Paste image URL...' : 'رابط الصورة...'}
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                                className="w-full bg-stone-900 text-white text-[10px] pl-8 pr-2 py-1.5 rounded-lg border border-[#C5A85C]/20 focus:border-[#C5A85C] outline-none font-sans"
                              />
                            </div>
                            <button
                              onClick={() => {
                                if (customUrl.trim()) {
                                  handleUpdateImage(dest.id, customUrl.trim());
                                  setCustomizingDestId(null);
                                }
                              }}
                              className="bg-[#C5A85C] text-black text-[10px] px-2.5 py-1.5 rounded-lg font-bold hover:bg-white transition-colors cursor-pointer"
                            >
                              {language === 'en' ? 'Apply' : 'تطبيق'}
                            </button>
                          </div>

                          {/* File upload */}
                          <div className="relative border border-dashed border-[#C5A85C]/35 rounded-lg p-2 hover:border-[#C5A85C] transition-all bg-stone-900/60 flex items-center justify-center">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(dest.id, file);
                                  setCustomizingDestId(null);
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <div className="flex items-center gap-1.5 text-stone-300">
                              <Upload className="w-3.5 h-3.5 text-[#C5A85C]" />
                              <span className="text-[10px] font-medium">
                                {language === 'en' ? 'Upload Local Photo' : 'تحميل صورة من جهازك'}
                              </span>
                            </div>
                          </div>

                          {/* Curated Presets */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-[#C5A85C]/75 block uppercase">
                              {language === 'en' ? 'Premium Presets' : 'صور جاهزة فاخرة'}
                            </span>
                            <div className="grid grid-cols-3 gap-1">
                              {(PRESETS_BY_DESTINATION[dest.id] || DEFAULT_PRESETS).map((preset, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    handleUpdateImage(dest.id, preset.url);
                                    setCustomizingDestId(null);
                                  }}
                                  className="group/preset relative aspect-video rounded overflow-hidden border border-stone-850 hover:border-[#C5A85C] transition-all bg-stone-950 cursor-pointer"
                                  title={language === 'en' ? preset.labelEn : preset.labelAr}
                                >
                                  <img 
                                    src={preset.url} 
                                    alt={preset.labelEn}
                                    className="w-full h-full object-cover group-hover/preset:scale-110 transition-transform duration-300"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-black/50 group-hover/preset:bg-transparent transition-all flex items-end p-0.5">
                                    <span className="text-[7px] text-white font-sans bg-black/75 px-1 py-0.5 rounded w-full truncate text-center">
                                      {language === 'en' ? preset.labelEn : preset.labelAr}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-between border-t border-stone-800 pt-1.5 items-center">
                          <button
                            onClick={() => {
                              const def = TOURIST_DESTINATIONS.find(d => d.id === dest.id);
                              if (def) {
                                handleUpdateImage(dest.id, def.image);
                              }
                              setCustomizingDestId(null);
                            }}
                            className="text-[9px] text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                          >
                            {language === 'en' ? 'Reset to Default' : 'استعادة الافتراضي'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Redesigned Premium Info Package Body */}
                  <div className={`p-6 flex-grow flex flex-col justify-between space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="space-y-4">
                      {/* Name & Subtitle */}
                      <div>
                        <h4 className="text-[#C5A85C] font-serif text-xl font-bold tracking-tight">
                          {language === 'en' ? dest.name : dest.nameAr}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1 font-sans line-clamp-1">
                          {language === 'en' ? dest.subtitle : dest.subtitleAr}
                        </p>
                      </div>

                      {/* Brief description */}
                      <p className="text-stone-300 text-xs leading-relaxed line-clamp-3">
                        {language === 'en' ? dest.description : dest.descriptionAr}
                      </p>

                      <div className="border-t border-[#C5A85C]/15 pt-4 space-y-3">
                        {/* Highlights (Package Includes) */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#C5A85C]/75 block">
                            {language === 'en' ? 'Package Highlights:' : 'مزايا ومعالم الجولة:'}
                          </span>
                          <div className="space-y-1.5">
                            {(dest.highlights || []).slice(0, 2).map((hl, index) => {
                              const hlAr = dest.highlightsAr?.[index] || hl;
                              return (
                                <div key={index} className="flex items-start gap-2 text-xs text-stone-300">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A85C] flex-shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{language === 'en' ? hl : hlAr}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Best season & fleet */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800/50">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-stone-500 block uppercase">
                              {language === 'en' ? 'Best Season' : 'الموسم الأمثل'}
                            </span>
                            <div className="flex items-center gap-1.5 text-stone-300 text-[11px]">
                              <Calendar className="w-3.5 h-3.5 text-[#C5A85C]/70" />
                              <span className="truncate">{language === 'en' ? dest.bestTime : dest.bestTimeAr}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-stone-500 block uppercase">
                              {language === 'en' ? 'Fleet Transport' : 'السيارة المقترحة'}
                            </span>
                            <div className="flex items-center gap-1.5 text-stone-300 text-[11px]">
                              <Car className="w-3.5 h-3.5 text-[#C5A85C]/70" />
                              <span className="truncate">
                                {language === 'en' ? getRecommendedFleet(dest.id)?.nameEn : getRecommendedFleet(dest.id)?.nameAr}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Book & View interactive actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-stone-800/80">
                      <button
                        onClick={() => handleBookDestination(dest.name, dest.nameAr)}
                        className="flex-1 bg-[#C5A85C] text-black hover:bg-white hover:text-black transition-all duration-300 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-[#C5A85C]/10 text-center cursor-pointer active:scale-95"
                      >
                        {language === 'en' ? 'Book Package' : 'حجز الباقة'}
                      </button>
                      
                      <button
                        onClick={() => handleSelectAndShow(dest.id)}
                        className="p-2.5 rounded-xl border border-[#C5A85C]/30 hover:border-[#C5A85C] hover:bg-[#C5A85C]/10 text-[#C5A85C] transition-all duration-300 text-xs font-bold cursor-pointer active:scale-95 flex items-center justify-center"
                        title={language === 'en' ? 'View in Showcase' : 'عرض المعرض'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Restore defaults button if any items have been deleted */}
        {viewMode === 'grid' && destinationsList.length > 0 && destinationsList.length < TOURIST_DESTINATIONS.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleResetDestinations}
              className="px-4 py-2 rounded-xl border border-[#C5A85C]/30 bg-[#0a0a0a] text-[#C5A85C] hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] text-xs font-bold transition-all cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Restore Default Destinations' : 'استعادة كافة الوجهات الافتراضية'}</span>
            </button>
          </div>
        )}

        {/* Dynamic interactive VIP banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#111111] via-[#161616] to-stone-950 border border-[#C5A85C]/35 text-center flex flex-col md:flex-row items-center justify-between gap-5 backdrop-blur-md shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A85C]/5 rounded-full blur-xl pointer-events-none" />
          
          <div className={`flex items-center space-x-3.5 ${isRtl ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}>
            <div className="w-10 h-10 rounded-full bg-[#C5A85C]/10 border border-[#C5A85C]/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#C5A85C]" />
            </div>
            <div>
              <p className="text-xs text-champagne-gold-100 font-bold uppercase tracking-wider mb-0.5">
                {language === 'en' ? 'Bespoke Sovereign Grand Tours' : 'رحلات الاستكشاف السيادية المخصصة'}
              </p>
              <p className="text-[11px] text-stone-400 font-medium">
                {language === 'en'
                  ? 'Planning a multi-day itinerary across the Hashemite kingdom? Contact our concierge desk for full visa fast-track and luxury package creation.'
                  : 'هل ترغب برسم مسار سياحي متكامل لعدة أيام في المملكة؟ تواصل مع مكتب الاستقبال لتنسيق المرور السريع وباقات النخبة.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              const bookSection = document.getElementById('book');
              if (bookSection) {
                bookSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-xs font-bold text-[#C5A85C] hover:text-[#FAF6ED] bg-transparent border border-[#C5A85C]/40 hover:border-[#C5A85C] px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
          >
            {language === 'en' ? 'Consult Concierge • تواصل مع المكتب' : 'طلب تخطيط مخصص'}
          </button>
        </div>

      </div>
    </section>
  );
}
