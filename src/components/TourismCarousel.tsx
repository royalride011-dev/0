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
  LayoutGrid
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { images } from '../imageRegistry';
import { 
  getStoredDestinations, 
  FALLBACK_DESTINATION, 
  DestinationNode,
  TOURIST_DESTINATIONS,
  resetStoredDestinations
} from '../data/touristDestinations';

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

export default function TourismCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language, isRtl } = useLanguage();
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

  useEffect(() => {
    setFailedImages({});
  }, [destinationsList]);

  const fallbackImages: Record<string, string> = {
    amman: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80',
    petra: 'https://images.unsplash.com/photo-1501232479008-56c59344e2e4?auto=format&fit=crop&w=1200&q=80',
    wadirum: 'https://images.unsplash.com/photo-1581005118544-775e52c8bc52?auto=format&fit=crop&w=600&q=70',
    deadsea: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f9c?auto=format&fit=crop&w=600&q=70',
    jerash: 'https://images.unsplash.com/photo-1512100356135-cc58b20e9854?auto=format&fit=crop&w=1200&q=80',
    aqaba: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70',
    mountnebo: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=70',
    kerak: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80',
    ajloun: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1200&q=80'
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
      return {
        id: 'yukon',
        nameEn: 'Range Rover Autobiography LWB',
        nameAr: 'رينج روفر أوتوبيوجرافي VIP',
        image: images.fleet.luxuryGmcYukon || '/images/regenerated_image_1782434427794.jpg',
        reasonEn: 'Superior air suspension to smooth out elevation drop (-430m) and executive reclining wellness massage chairs.',
        reasonAr: 'نظام تعليق هوائي متطور يتكيف مع الانخفاض الجغرافي للبحر الميت، ومقاعد مساج مريحة للاستجمام.',
        luxuryRank: 'Wellness Executive LWB',
        luxuryRankAr: 'الدرجة التنفيذية الفاخرة'
      };
    } else {
      // Jerash, Ajloun
      return FLEET_ITEMS[1]; // GMC Yukon
    }
  };

  const activeDest = destinationsList[activeIndex] || FALLBACK_DESTINATION;
  const currentImage = failedImages[activeDest.id]
    ? (fallbackImages[activeDest.id] || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80')
    : activeDest.image;

  const fleetRec = getRecommendedFleet(activeDest.id);

  // Auto-reset customized vehicle selection when switching destinations
  useEffect(() => {
    setSelectedFleetId(null);
  }, [activeIndex]);

  // Self-healing image loader: reset failed flag for active destination when index, id, or image changes
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
  }, [activeIndex, activeDest?.image, activeDest?.id]);

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

              
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Visual Media & Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 w-full flex flex-col space-y-5 animate-gpu"
              >
                  <AnimatePresence mode="wait">
                    {!showMap ? (
                      // Interactive Sliding Image Carousel
                      <div className="relative w-full max-w-[500px] aspect-square mx-auto z-0 overflow-hidden rounded-3xl group border border-[#C5A85C]/20 shadow-2xl bg-[#080808] flex items-center justify-center">
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
                              className="w-full h-full object-cover"
                              initial={{ scale: 1.05 }}
                              animate={{ scale: 1.10 }}
                              transition={{ duration: 15, ease: "linear" }}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              onError={() => {
                                setFailedImages(prev => ({ ...prev, [activeDest.id]: true }));
                              }}
                            />
                            {/* Linear Gradient Overlay for beautiful premium depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45 pointer-events-none" />
                          </motion.div>
                        </AnimatePresence>

                        {/* Slide Indicator Overlay e.g. 03 / 10 */}
                        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 border border-[#C5A85C]/30 text-xs font-mono font-extrabold text-[#C5A85C] shadow-lg backdrop-blur-[6px]">
                          {String(activeIndex + 1).padStart(2, '0')} / {String(destinationsList.length).padStart(2, '0')}
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
                <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0a0a0a] border-2 border-[#C5A85C]/40 hover:border-[#C5A85C] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,168,92,0.05)] rounded-3xl p-6 sm:p-8 relative overflow-hidden w-full self-stretch min-h-[500px]">
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
                    <button
                      onClick={() => setActiveTab('fleet')}
                      className={`flex-1 pb-2.5 text-xs font-sans font-extrabold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                        activeTab === 'fleet'
                          ? 'border-[#C5A85C] text-[#C5A85C]'
                          : 'border-transparent text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {language === 'en' ? 'Luxury Fleet' : 'الأسطول الفاخر'}
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
        ) : (
          /* Luxury Grid Brochure Explorer Layout */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2"
          >
            {destinationsList.map((dest) => {
              const destImage = failedImages[dest.id]
                ? (fallbackImages[dest.id] || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80')
                : dest.image;

              return (
                <div 
                  key={dest.id}
                  className="rounded-lg overflow-hidden border border-[#C5A85C]/35 bg-stone-900 shadow-md hover:shadow-lg hover:border-[#C5A85C]/60 transition-all duration-300"
                >
                  <div className="overflow-hidden h-[250px]">
                    <img 
                      src={destImage} 
                      alt={`وجهة سياحية: ${dest.name} من Royal Ride Jordan`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={() => {
                        setFailedImages(prev => ({ ...prev, [dest.id]: true }));
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-champagne-gold-500 font-serif text-lg">
                      {language === 'en' ? dest.name : dest.nameAr}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                      {language === 'en' ? dest.subtitle : dest.subtitleAr}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
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
