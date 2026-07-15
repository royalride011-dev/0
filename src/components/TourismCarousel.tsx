import React, { useState } from 'react';
import { Calendar, Info, CheckCircle, Clock, Shield, Compass } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { LazyImage } from './LazyImage';
import { 
  getStoredDestinations, 
  FALLBACK_DESTINATION, 
  DestinationNode,
  TOURIST_DESTINATIONS
} from '../data/touristDestinations';

export default function TourismCarousel() {
  const { language, isRtl } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'story' | 'highlights' | 'legacy'>('story');
  
  const [destinationsList] = useState<DestinationNode[]>(() => {
    const list = getStoredDestinations();
    // Use the first 9 destinations to mathematically map to the 9-button grid of the showcase
    return Array.isArray(list) && list.length > 0 ? list.slice(0, 9) : TOURIST_DESTINATIONS.slice(0, 9);
  });

  const activeDest = destinationsList[activeIndex] || destinationsList[0] || FALLBACK_DESTINATION;

  const nextDestination = () => {
    const nextIdx = (activeIndex + 1) % destinationsList.length;
    setActiveIndex(nextIdx);
    setActiveTab('story');
  };

  const selectSeoDestination = (idx: number) => {
    setActiveIndex(idx);
    setActiveTab('story');
  };

  const switchSeoTab = (tab: 'story' | 'highlights' | 'legacy') => {
    setActiveTab(tab);
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
        ? `We want to arrange an exclusive private tour to explore ${name}. Please organize our premium travel schedule and chauffeur service.`
        : `نرغب بترتيب جولة خاصة فاخرة لزيارة واستكشاف ${nameAr}. نرجو تنسيق مسار الرحلة وتوقيت السائق وتفاصيل النقل المميز.`;
      const event = new Event('input', { bubbles: true });
      remarksField.dispatchEvent(event);
    }

    const bookSection = document.getElementById('book');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Safe Fallbacks for description, season and historical context
  const getSeasonText = () => {
    if (language === 'en') {
      return activeDest.bestTime || 'Spring & Autumn';
    } else {
      return activeDest.bestTimeAr || 'فصلي الربيع والخريف';
    }
  };

  const getHistoricalText = () => {
    if (language === 'en') {
      return activeDest.historicalContext || 'Historically celebrated crossroad of trade and monumental Nabataean or Roman civilizations in the Levant.';
    } else {
      return activeDest.historicalContextAr || 'موقع تاريخي استراتيجي عريق لعب دوراً رئيسياً في التبادل التجاري والتمازج الحضاري عبر طريق الحرير الروماني والنبطي.';
    }
  };

  // Localized Option Number Generator
  const getOptionLabel = (idx: number) => {
    const num = idx + 1;
    return language === 'en' ? `OPTION 0${num}` : `الخيار 0${num}`;
  };

  // Specialized compact short-names matching the top-navigation button requirement
  const getShortName = (destId: string, name: string, nameAr: string) => {
    if (destId === 'petra') return language === 'en' ? 'PETRA CITY' : 'مدينة البتراء';
    if (destId === 'wadirum') return language === 'en' ? 'WADI RUM' : 'وادي رم';
    if (destId === 'deadsea') return language === 'en' ? 'DEAD SEA' : 'البحر الميت';
    if (destId === 'jerash') return language === 'en' ? 'JERASH' : 'مدينة جرش';
    if (destId === 'aqaba') return language === 'en' ? 'AQABA GULF' : 'خليج العقبة';
    if (destId === 'nebo') return language === 'en' ? 'MADABA' : 'مادبا ونبو';
    if (destId === 'ajloun') return language === 'en' ? 'AJLOUN' : 'عجلون';
    if (destId === 'amman') return language === 'en' ? 'CITADEL' : 'جبل القلعة';
    if (destId === 'almaghtas') return language === 'en' ? 'BAPTISM SITE' : 'موقع المغطس';
    return language === 'en' ? name.toUpperCase() : nameAr;
  };

  // Localized Top Left Badges matching premium style
  const getTourBadge = () => {
    if (activeDest.id === 'petra') {
      return language === 'en' ? 'UNESCO World Heritage' : 'موقع تراث عالمي لليونسكو';
    }
    if (activeDest.id === 'wadirum') {
      return language === 'en' ? 'Martian Desert Sanctuary' : 'محمية صحراوية فريدة';
    }
    if (activeDest.id === 'deadsea') {
      return language === 'en' ? 'Lowest Point on Earth' : 'أخفض بقعة على وجه الأرض';
    }
    if (activeDest.id === 'jerash') {
      return language === 'en' ? 'Decapolis Imperial Gem' : 'جوهرة حلف الديكابوليس';
    }
    if (activeDest.id === 'aqaba') {
      return language === 'en' ? 'Special Economic Zone' : 'منطقة اقتصادية خاصة';
    }
    if (activeDest.id === 'nebo') {
      return language === 'en' ? 'Sacred Pilgrimage Landmark' : 'معلم حج ديني تاريخي';
    }
    if (activeDest.id === 'ajloun') {
      return language === 'en' ? 'Ayyubid Military Stronghold' : 'معقل عسكري أيوبي';
    }
    if (activeDest.id === 'amman') {
      return language === 'en' ? 'Urban Archaeological Crest' : 'التاج الأثري لوسط عمان';
    }
    if (activeDest.id === 'almaghtas') {
      return language === 'en' ? 'UNESCO Sacred Heritage' : 'موقع معمودية مقدس لليونسكو';
    }
    return language === 'en' ? 'UNESCO Heritage' : 'موقع أثري وتاريخي عريق';
  };

  return (
    <section 
      id="tourism-section" 
      className="py-16 bg-black text-gray-100 border-t border-zinc-900 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Subtle Brand Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gold-500/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gold-500/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Dynamic Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start text-left">
          <div className="lg:col-span-5">
            <span className="text-gold-500 font-bold tracking-widest text-xs uppercase block mb-2">
              {language === 'en' ? 'Sovereign Expeditions' : 'الأسفار والجولات الملكية'}
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
              {language === 'en' ? 'Interactive Jordan Showcase' : 'مستكشف الأردن التفاعلي'}
            </h2>
            <div className="h-[2px] w-20 bg-gold-500 mt-4"></div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-zinc-400 text-xs leading-relaxed text-justify">
              {language === 'en' ? (
                <>
                  Discover Hashemite Kingdom's immortal wonders wrapped in ultimate prestige. <strong className="text-gold-500">Royal Ride Jordan</strong> specializes in bespoke executive travel, luxury private tour packages, and elite chauffeur services across Jordan's most iconic historic landmarks. Skip the standard tourist transport and experience seamless, climate-controlled private transfers driven by professional, multilingual security-vetted local chauffeurs tailored exactly to your premium travel schedule.
                </>
              ) : (
                <>
                  استكشف روائع المملكة الهاشمية الخالدة في مهد الرفاهية والأناقة المطلقة. تتخصص <strong className="text-gold-500">رويال رايد الأردن</strong> في خدمات النقل التنفيذي الفاخر، وحزم الجولات السياحية الخاصة الراقية، وخدمات السائق المهنية عبر المعالم التاريخية الأكثر شهرة في الأردن. تجنب وسائل النقل التقليدية واستمتع برحلة سلسة في مقصورات مكيفة ومجهزة بالكامل يقودها سائقون محليون محترفون وناطقون بلغات متعددة لملائمة جدول سفرك المميز.
                </>
              )}
            </p>
          </div>
        </div>

        {/* 1. TOP HORIZONTAL NAVIGATION TABS (Option 01 - Option 09) */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-8" id="fleet-style-tabs">
          {destinationsList.map((dest, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={dest.id}
                onClick={() => selectSeoDestination(idx)}
                className={`w-full text-center p-3 border rounded transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-gold-500 border-gold-500 shadow-md'
                    : 'bg-transparent text-zinc-500 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <span className="text-[8px] font-mono block tracking-widest uppercase mb-0.5">
                  {getOptionLabel(idx)}
                </span>
                <h4 className="text-[10px] font-bold uppercase truncate">
                  {getShortName(dest.id, dest.name, dest.nameAr)}
                </h4>
              </button>
            );
          })}
        </div>

        {/* MAIN DISPLAY: Left Image, Right Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl items-stretch">
          
          {/* LEFT COLUMN: 500x500 Premium Image Box */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden border border-gold-500/20 bg-zinc-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(197,168,92,0.05)] group transition-all duration-500 hover:border-gold-500/40">
              <div onClick={nextDestination} className="w-full h-full cursor-pointer">
                <LazyImage 
                  id="fleet-style-tour-img" 
                  src={activeDest.image} 
                  alt={language === 'en' ? activeDest.name : activeDest.nameAr} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                />
              </div>
              {/* Luxury gold gradient overlays & frames */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-gold-500/10 rounded-2xl pointer-events-none group-hover:border-gold-500/30 transition-colors duration-500" />
              
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-black/90 backdrop-blur-md border border-gold-500/30 px-3 py-1.5 rounded-lg z-10 shadow-lg">
                <span className="text-[10px] text-gold-500 font-extrabold uppercase tracking-widest" id="fleet-style-tour-badge">
                  {getTourBadge()}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content & SEO Tab Engine */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[450px] bg-zinc-900/20 border border-zinc-900/60 rounded-xl p-6 text-left">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span id="fleet-style-tour-serial" className="text-[10px] font-mono text-gold-500 font-bold tracking-widest">
                  {language === 'en' 
                    ? `WONDER 0${activeIndex + 1}` 
                    : `العجوبة 0${activeIndex + 1}`}
                </span>
                <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-500" />
                  <span>
                    {language === 'en' ? 'Best Time: ' : 'التوقيت المثالي: '}
                    <span id="fleet-style-tour-season" className="text-white font-semibold">
                      {getSeasonText()}
                    </span>
                  </span>
                </span>
              </div>
              
              <h3 id="fleet-style-tour-title" className="text-2xl font-black text-white uppercase tracking-wide">
                {language === 'en' ? activeDest.name : activeDest.nameAr}
              </h3>
              <p id="fleet-style-tour-subtitle" className="text-zinc-500 text-xs font-medium mb-5">
                {language === 'en' ? activeDest.subtitle : activeDest.subtitleAr}
              </p>
              
              {/* Inner Content Tabs for Maximum SEO Texts */}
              <div className="flex border-b border-zinc-900 gap-6 mb-4 text-[11px] font-bold uppercase tracking-wider">
                <button 
                  onClick={() => switchSeoTab('story')} 
                  id="ftab-btn-story" 
                  className={`pb-2 border-b-2 transition-all duration-200 cursor-pointer ${
                    activeTab === 'story' 
                      ? 'border-gold-500 text-gold-500' 
                      : 'border-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'The Journey' : 'تفاصيل الجولة'}
                </button>
                <button 
                  onClick={() => switchSeoTab('highlights')} 
                  id="ftab-btn-highlights" 
                  className={`pb-2 border-b-2 transition-all duration-200 cursor-pointer ${
                    activeTab === 'highlights' 
                      ? 'border-gold-500 text-gold-500' 
                      : 'border-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Highlights' : 'أبرز المزايا'}
                </button>
                <button 
                  onClick={() => switchSeoTab('legacy')} 
                  id="ftab-btn-legacy" 
                  className={`pb-2 border-b-2 transition-all duration-200 cursor-pointer ${
                    activeTab === 'legacy' 
                      ? 'border-gold-500 text-gold-500' 
                      : 'border-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Historical Legacy' : 'العمق التاريخي'}
                </button>
              </div>

              {/* Text Box Content Area */}
              <div id="fleet-style-tab-content" className="text-zinc-400 text-xs leading-relaxed text-justify h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {activeTab === 'story' && (
                  <p className="fade-in duration-300">
                    {language === 'en' ? activeDest.description : activeDest.descriptionAr}
                  </p>
                )}
                {activeTab === 'highlights' && (
                  <ul className="space-y-2.5 text-zinc-300 fade-in duration-300">
                    {(language === 'en' ? activeDest.highlights : activeDest.highlightsAr).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'legacy' && (
                  <p className="italic text-zinc-400 fade-in duration-300">
                    {getHistoricalText()}
                  </p>
                )}
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-4 border-t border-zinc-900 mt-4 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button 
                id="fleet-style-action-btn" 
                onClick={() => handleBookDestination(activeDest.name, activeDest.nameAr)}
                className="w-full sm:w-auto bg-transparent hover:bg-[#C5A85C]/5 border border-[#C5A85C]/30 hover:border-[#C5A85C] text-[#C5A85C] text-xs font-bold uppercase px-6 py-3 rounded tracking-widest transition-all duration-300 shrink-0 cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#C5A85C] shrink-0" />
                <span>{language === 'en' ? `Book ${getShortName(activeDest.id, activeDest.name, activeDest.nameAr)} Tour` : `حجز جولة ${getShortName(activeDest.id, activeDest.name, activeDest.nameAr)}`}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
