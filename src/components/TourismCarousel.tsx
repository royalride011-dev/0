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
  DestinationNode 
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

export default function TourismCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language, isRtl } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [activeTab, setActiveTab] = useState<'story' | 'highlights' | 'fleet'>('story');
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
    setActiveIndex((prev) => (prev >= destinationsList.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
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

  // Helper to recommend high-end vehicles based on destination characteristics
  const getRecommendedFleet = (destId: string) => {
    const lowerId = destId.toLowerCase();
    if (lowerId.includes('amman')) {
      return {
        nameEn: 'Mercedes-Benz S-Class (W223)',
        nameAr: 'مرسيدس بنز الفئة S ملوكية',
        image: '/images/regenerated_image_1782325973899.png', // Fallback, or dynamic
        reasonEn: 'Perfect for urban prestige, supreme acoustic isolation, and gliding smoothly through capital hills.',
        reasonAr: 'خيار مثالي لتنقلات العاصمة، عزل صوتي مطلق وانسيابية مذهلة تناسب تلال عمان الملوكية.',
        luxuryRank: 'Elite Class VIP',
        luxuryRankAr: 'نخبة كبار الشخصيات VIP'
      };
    } else if (lowerId.includes('petra') || lowerId.includes('rum') || lowerId.includes('aqaba') || lowerId.includes('kerak')) {
      return {
        nameEn: 'Cadillac Escalade ESV Presidential',
        nameAr: 'كاديلاك إسكاليد الرئاسية الفخمة',
        image: '/images/regenerated_image_1782325973899.png',
        reasonEn: 'Maximum rear legroom, high-speed Wi-Fi, and heavy road-presence designed for long cross-country highways.',
        reasonAr: 'أقصى درجات الراحة للمسافات الطويلة، إنترنت سريع ومساحة وافرة تليق بالرحلات الطويلة للجنوب.',
        luxuryRank: 'Presidential Sovereign',
        luxuryRankAr: 'الدرجة الرئاسية السيادية'
      };
    } else if (lowerId.includes('dead') || lowerId.includes('nebo')) {
      return {
        nameEn: 'Range Rover Autobiography LWB',
        nameAr: 'رينج روفر أوتوبيوجرافي VIP',
        image: '/images/regenerated_image_1782325973899.png',
        reasonEn: 'Superior air suspension to smooth out elevation drop (-430m) and executive reclining wellness massage chairs.',
        reasonAr: 'نظام تعليق هوائي متطور يتكيف مع الانخفاض الجغرافي للبحر الميت، ومقاعد مساج مريحة للاستجمام.',
        luxuryRank: 'Wellness Executive LWB',
        luxuryRankAr: 'الدرجة التنفيذية الفاخرة'
      };
    } else {
      // Jerash, Ajloun
      return {
        nameEn: 'GMC Yukon Denali Ultimate',
        nameAr: 'جي إم سي يوكون دينالي برستيج',
        image: '/images/regenerated_image_1782325973899.png',
        reasonEn: 'Commanding high-elevation control, all-wheel drive, and generous panoramic roof for scenic mountain views.',
        reasonAr: 'أداء قوي في المرتفعات الجبلية العالية لجرش وعجلون، ونظام دفع رباعي آمن مع سقف بانورامي ساحر.',
        luxuryRank: 'Royal SUV Expedition',
        luxuryRankAr: 'الدفع الرباعي الملوكي'
      };
    }
  };

  const activeDest = destinationsList[activeIndex] || FALLBACK_DESTINATION;
  const currentImage = failedImages[activeDest.id]
    ? (fallbackImages[activeDest.id] || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80')
    : activeDest.image;

  const fleetRec = getRecommendedFleet(activeDest.id);

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
          <div className="flex flex-col gap-8">
              
              {/* Top: Visual Media & Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col space-y-5 animate-gpu"
              >
                  <AnimatePresence mode="wait">
                    {!showMap ? (
                      // Background Ken Burns Effect Image
                      <motion.div
                        key="photo-stage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full z-0 overflow-hidden rounded-3xl"
                      >
                        <motion.img
                          src={currentImage}
                          alt={`وجهة سياحية: ${activeDest.name} من Royal Ride Jordan`}
                          className="w-full object-cover opacity-85"
                          style={{ height: '500px' }}
                          initial={{ scale: 1.03 }}
                          animate={{ scale: 1.08 }}
                          transition={{ duration: 12, ease: "linear" }}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={() => {
                            setFailedImages(prev => ({ ...prev, [activeDest.id]: true }));
                          }}
                        />
                      </motion.div>
                    ) : (
                      // Interactive Map Container (Simplified Placeholder)
                      <motion.div
                        key="map-stage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full z-0 overflow-hidden rounded-3xl h-[500px] bg-stone-950 flex items-center justify-center border border-[#C5A85C]/20"
                      >
                        <p className="text-champagne-gold-500/50 font-sans uppercase tracking-widest text-xs">
                          {language === 'en' ? 'Interactive Map' : 'الخريطة التفاعلية'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Right Column: Premium Sovereign Experience Ledger Card */}
                <div className="flex flex-col justify-between h-full bg-black border-2 border-[#C5A85C] shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(197,168,92,0.1)] rounded-3xl p-6 sm:p-8 relative overflow-hidden w-full self-stretch">
                  {/* Elegant gold filigree corner accents */}
                  <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[#C5A85C]/40" />
                  <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[#C5A85C]/40" />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[#C5A85C]/40" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[#C5A85C]/40" />

                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-[#C5A85C] font-serif text-3xl md:text-4xl tracking-tight">
                      {language === 'en' ? activeDest.name : activeDest.nameAr}
                    </h3>
                    <p className="text-gray-400 font-sans text-sm tracking-wide">
                      {language === 'en' ? activeDest.subtitle : activeDest.subtitleAr}
                    </p>
                  </div>

                  {/* Main Content */}
                  <div className="py-8 border-y border-[#C5A85C]/20 my-6">
                    <p className="text-stone-300 font-sans leading-relaxed">
                      {language === 'en' ? activeDest.description : activeDest.descriptionAr}
                    </p>
                  </div>

                  {/* Footer/Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#C5A85C] font-mono text-sm">
                      {activeDest.duration}
                    </span>
                    <button className="bg-[#C5A85C] text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors">
                      {language === 'en' ? 'Book Now' : 'احجز الآن'}
                    </button>
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
                  <img 
                    src={destImage} 
                    alt={`وجهة سياحية: ${dest.name} من Royal Ride Jordan`} 
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                      setFailedImages(prev => ({ ...prev, [dest.id]: true }));
                    }}
                  />
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
