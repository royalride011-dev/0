import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Image as ImageIcon, Save, RotateCcw, Check, Sparkles, HelpCircle, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import ShimmerHoverEffect from './ShimmerHoverEffect';
import { images } from '../imageRegistry';

// Interface for customizable items
interface CustomizableImage {
  key: string;
  nameEn: string;
  nameAr: string;
  section: 'hero' | 'fleet' | 'tourism' | 'services' | 'about' | 'blog';
  defaultVal: string;
}

const CUSTOMIZABLE_IMAGES: CustomizableImage[] = [
  // Hero
  { key: 'hero_bg', nameEn: 'Hero Landing Background', nameAr: 'خلفية الواجهة الرئيسية', section: 'hero', defaultVal: '/images/royal_ride_hero_ultimate_v2_1781855232538.jpg' },
  
  // Fleet
  { key: 'fleet_comfortClass', nameEn: 'Comfort Class Sedan', nameAr: 'مركبات الفئة المريحة (سيدان)', section: 'fleet', defaultVal: '/images/comfort_class_fleet_1782258340226.jpg' },
  { key: 'fleet_stariaVip', nameEn: 'Hyundai Staria VIP Cabin', nameAr: 'هيونداي ستاريا كابينة كبار الشخصيات', section: 'fleet', defaultVal: '/images/staria_vip_amman_1782232781113.jpg' },
  { key: 'fleet_toyotaHiace', nameEn: 'Toyota Hiace Luxury Van', nameAr: 'تويوتا هايس باص النخبة الفاخر', section: 'fleet', defaultVal: '/images/royal_ride_hero_1781696285755.jpg' },
  { key: 'fleet_toyotaCoaster', nameEn: 'Toyota Coaster Sovereign Mini-Bus', nameAr: 'تويوتا كوستر حافلة النخبة', section: 'fleet', defaultVal: '/images/luxury_tour_jordan_1782232796504.jpg' },
  { key: 'fleet_luxuryGmcYukon', nameEn: 'GMC Yukon Luxury SUV', nameAr: 'جي إم سي يوكون الدفع الرباعي الفاخر', section: 'fleet', defaultVal: '/images/regenerated_image_1782325973899.png' },

  // Tourism
  { key: 'tourism_amman', nameEn: 'Amman City Destination', nameAr: 'وجهة عمان الدافئة', section: 'tourism', defaultVal: '/src/assets/images/regenerated_image_1782523407133.png' },
  { key: 'tourism_petra', nameEn: 'Petra Rose City Tour', nameAr: 'جولة البتراء الوردية الأثرية', section: 'tourism', defaultVal: '/src/assets/images/regenerated_image_1782516369460.png' },
  { key: 'tourism_wadirum', nameEn: 'Wadi Rum Desert', nameAr: 'صحراء وادي رم الساحرة', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80' },
  { key: 'tourism_deadsea', nameEn: 'Dead Sea Wellness', nameAr: 'البحر الميت وملاذ الاسترخاء', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f9c?auto=format&fit=crop&w=1200&q=80' },
  { key: 'tourism_aqaba', nameEn: 'Aqaba Coastal Gateway', nameAr: 'العقبة الدافئة ومنفذ البحر الأحمر', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1627896157734-4d7d4388f24b?auto=format&fit=crop&w=1200&q=80' },
  { key: 'tourism_jerash', nameEn: 'Jerash Roman Ruins', nameAr: 'جرش الأثرية وبوابات التاريخ', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80' },
  { key: 'tourism_beirut', nameEn: 'Beirut Pearl of Levant', nameAr: 'بيروت عاصمة الثقافة والجمال', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1547886596-43b1a1329175?auto=format&fit=crop&w=1200&q=80' },
  { key: 'tourism_damascus', nameEn: 'Damascus Historic Pearl', nameAr: 'دمشق العاصمة التاريخية العريقة', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80' },
  { key: 'tourism_ajloun', nameEn: 'Ajloun Castle & Forest', nameAr: 'عجلون وجبالها الخضراء', section: 'tourism', defaultVal: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1200&q=80' },

  // Services
  { key: 'services_limousinePassenger', nameEn: 'VIP Limousine Service', nameAr: 'خدمات الليموزين النخبوية الفاخرة', section: 'services', defaultVal: '/images/comfort_class_fleet_1782258340226.jpg' },
  { key: 'services_hotelRestaurantBookings', nameEn: 'Exclusive Hotel & Dining Bookings', nameAr: 'حجوزات الفنادق والمطاعم الفاخرة', section: 'services', defaultVal: '/images/luxury_hotel_dining_1782297400933.jpg' },
  { key: 'services_borderCrossingsJordan', nameEn: 'Cross-Border Fast Track VIP', nameAr: 'تسهيل المعابر والحدود الدولية والمعاملات', section: 'services', defaultVal: '/images/cross_border_transit_1782298169892.jpg' },
  { key: 'services_airportTransitJordan', nameEn: 'VIP Airport Meet & Greet', nameAr: 'استقبال وتوديع المطارات الفخم', section: 'services', defaultVal: '/images/airport_meet_greet_1782298298272.jpg' },

  // About & Blog
  { key: 'about_cabinComfort', nameEn: 'Cabin Interior & Comfort', nameAr: 'تفاصيل الراحة والرفاهية داخل المقصورة', section: 'about', defaultVal: '/images/luxury_car_interior_1782219795811.jpg' },
  { key: 'blog_airportVipLogistics', nameEn: 'VIP Flight Logistics Post', nameAr: 'مقال لوجستيات المطار والطائرات الخاصة', section: 'blog', defaultVal: '/images/royal_ride_hero_1781696285755.jpg' },
];

import { 
  getStoredDestinations, 
  saveStoredDestinations, 
  resetStoredDestinations, 
  DestinationNode 
} from '../data/touristDestinations';

export default function CustomizerPanel() {
  const { language, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'hero' | 'fleet' | 'tourism' | 'services' | 'about_blog'>('all');
  const [panelTab, setPanelTab] = useState<'images' | 'destinations'>('images');
  
  // Local state to store current inputs
  const [imageUrls, setImageUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    CUSTOMIZABLE_IMAGES.forEach(item => {
      initial[item.key] = localStorage.getItem(`rr_img_override_${item.key}`) || '';
    });
    return initial;
  });

  const [destinations, setDestinations] = useState<DestinationNode[]>(() => getStoredDestinations());
  const [editingDest, setEditingDest] = useState<Partial<DestinationNode> | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleUrlChange = (key: string, value: string) => {
    setImageUrls(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    Object.entries(imageUrls).forEach(([key, val]) => {
      const stringVal = String(val).trim();
      if (stringVal) {
        localStorage.setItem(`rr_img_override_${key}`, stringVal);
      } else {
        localStorage.removeItem(`rr_img_override_${key}`);
      }
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      // Reload page to let the new images apply gracefully across components
      window.location.reload();
    }, 1500);
  };

  const handleReset = () => {
    CUSTOMIZABLE_IMAGES.forEach(item => {
      localStorage.removeItem(`rr_img_override_${item.key}`);
    });
    setImageUrls(() => {
      const reset: Record<string, string> = {};
      CUSTOMIZABLE_IMAGES.forEach(item => {
        reset[item.key] = '';
      });
      return reset;
    });
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      window.location.reload();
    }, 1500);
  };

  const handleSaveDest = () => {
    if (!editingDest) return;
    let updated: DestinationNode[];
    if (isAddingNew) {
      const newId = editingDest.id || `custom_tour_${Date.now()}`;
      const newDest: DestinationNode = {
        id: newId,
        name: editingDest.name || 'New Destination',
        nameAr: editingDest.nameAr || 'وجهة جديدة',
        subtitle: editingDest.subtitle || '',
        subtitleAr: editingDest.subtitleAr || '',
        image: editingDest.image || 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80',
        highlights: editingDest.highlights || ['Premium VIP Experience'],
        highlightsAr: editingDest.highlightsAr || ['تجربة فريدة ومتميزة'],
        bestTime: editingDest.bestTime || 'Year-round',
        bestTimeAr: editingDest.bestTimeAr || 'طوال العام',
        description: editingDest.description || '',
        descriptionAr: editingDest.descriptionAr || '',
        historicalContext: editingDest.historicalContext || '',
        historicalContextAr: editingDest.historicalContextAr || ''
      };
      updated = [...destinations, newDest];
    } else {
      updated = destinations.map(d => d.id === editingDest.id ? (editingDest as DestinationNode) : d);
    }
    setDestinations(updated);
    saveStoredDestinations(updated);
    setEditingDest(null);
    setIsAddingNew(false);
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      window.location.reload();
    }, 1200);
  };

  const handleDeleteDest = (id: string) => {
    const updated = destinations.filter(d => d.id !== id);
    setDestinations(updated);
    saveStoredDestinations(updated);
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      window.location.reload();
    }, 1200);
  };

  const handleResetDest = () => {
    resetStoredDestinations();
    const original = getStoredDestinations();
    setDestinations(original);
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      window.location.reload();
    }, 1200);
  };

  const filteredItems = CUSTOMIZABLE_IMAGES.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'about_blog') return item.section === 'about' || item.section === 'blog';
    return item.section === activeTab;
  });

  const inputClass = "w-full bg-royal-navy-900 border border-champagne-gold-500/20 rounded px-2.5 py-1.5 text-[11px] text-champagne-gold-100 placeholder-champagne-gold-400/30 focus:border-champagne-gold-400 outline-none font-sans";
  const labelClass = "block text-[8px] uppercase tracking-wider text-champagne-gold-400 font-mono mt-2 mb-1 text-left";

  return (
    <>

      {/* Main Drawer/Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-royal-navy-950/80 backdrop-blur-md z-50 flex justify-end" id="customizer-modal-overlay">
            {/* Click outside dismisser */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Customizer Panel Drawer */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-lg h-full bg-gradient-to-b from-royal-navy-950 to-[#0c1322] border-l border-champagne-gold-500/20 shadow-2xl flex flex-col justify-between z-10 ${isRtl ? 'left-0 right-auto border-r border-l-0' : 'right-0'}`}
              id="customizer-drawer"
            >
              {/* Header */}
              <div className="p-6 border-b border-champagne-gold-500/15 flex items-center justify-between bg-royal-navy-950/90 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-champagne-gold-500/10 border border-champagne-gold-500/30 rounded text-champagne-gold-400">
                    <Sparkles className="w-5 h-5 animate-pulse text-champagne-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-md font-bold text-luxury-gradient">
                      {language === 'en' ? 'Luxury Studio Customizer' : 'مستودع تخصيص وتعديل الصور'}
                    </h3>
                    <p className="text-[10px] text-champagne-gold-300/60 font-mono">
                      {language === 'en' ? 'Persists directly to your browser' : 'حفظ فوري ومستمر في متصفحك الخاص'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded hover:bg-royal-navy-900 border border-champagne-gold-500/10 text-champagne-gold-400 hover:text-champagne-gold-200 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Tabs (Global Images vs Tourist Destinations List) */}
              <div className="px-6 py-2 border-b border-champagne-gold-500/10 flex gap-2 bg-royal-navy-950/80 shrink-0">
                <button
                  onClick={() => { setPanelTab('images'); setEditingDest(null); }}
                  className={`flex-1 py-1.5 text-center text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                    panelTab === 'images'
                      ? 'bg-gradient-to-r from-[#C5A85C] to-[#806c3a] text-black font-extrabold shadow-md'
                      : 'bg-royal-navy-900/40 text-champagne-gold-400 border border-champagne-gold-500/10 hover:bg-royal-navy-900/80'
                  }`}
                >
                  {language === 'en' ? 'Global Images' : 'تخصيص الصور العام'}
                </button>
                <button
                  onClick={() => { setPanelTab('destinations'); setEditingDest(null); }}
                  className={`flex-1 py-1.5 text-center text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                    panelTab === 'destinations'
                      ? 'bg-gradient-to-r from-[#C5A85C] to-[#806c3a] text-black font-extrabold shadow-md'
                      : 'bg-royal-navy-900/40 text-champagne-gold-400 border border-champagne-gold-500/10 hover:bg-royal-navy-900/80'
                  }`}
                >
                  {language === 'en' ? 'Manage Destinations' : 'إدارة المعالم السياحية'}
                </button>
              </div>

              {/* Content Panel Area */}
              {editingDest ? (
                /* Dynamic Form to Add/Edit Destination */
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  <div className="flex justify-between items-center pb-3 border-b border-champagne-gold-500/10">
                    <h4 className="text-xs font-serif font-bold text-champagne-gold-100">
                      {isAddingNew 
                        ? (language === 'en' ? 'Add New Tourist Landmark' : 'إضافة معلم سياحي جديد')
                        : (language === 'en' ? `Edit Landmark: ${editingDest.name}` : `تعديل المعلم: ${editingDest.nameAr}`)}
                    </h4>
                    <button
                      onClick={() => { setEditingDest(null); setIsAddingNew(false); }}
                      className="text-[9px] font-mono text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded hover:bg-rose-950/20 cursor-pointer"
                    >
                      {language === 'en' ? 'Back' : 'رجوع'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'English Title' : 'الاسم بالإنجليزية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={editingDest.name || ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Jerash Ruins"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'Arabic Title' : 'الاسم بالعربية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={editingDest.nameAr || ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, nameAr: e.target.value }))}
                          placeholder="مثال: آثار جرش"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'English Subtitle' : 'العنوان الفرعي بالإنجليزية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={editingDest.subtitle || ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, subtitle: e.target.value }))}
                          placeholder="e.g. Historical Roman Gates"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'Arabic Subtitle' : 'العنوان الفرعي بالعربية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={editingDest.subtitleAr || ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, subtitleAr: e.target.value }))}
                          placeholder="مثال: البوابات الرومانية التاريخية"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{language === 'en' ? 'Image URL or Path' : 'رابط أو مسار الصورة'}</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={editingDest.image || ''}
                        onChange={e => setEditingDest(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://images.unsplash.com/... or /images/..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'Best Season En' : 'أفضل موسم بالإنجليزية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={editingDest.bestTime || ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, bestTime: e.target.value }))}
                          placeholder="e.g. Spring & Autumn"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'Best Season Ar' : 'أفضل موسم بالعربية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={editingDest.bestTimeAr || ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, bestTimeAr: e.target.value }))}
                          placeholder="مثال: فصلي الربيع والخريف"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{language === 'en' ? 'English Detailed Description' : 'الوصف التفصيلي بالإنجليزية'}</label>
                      <textarea
                        className={`${inputClass} h-16 resize-none`}
                        value={editingDest.description || ''}
                        onChange={e => setEditingDest(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Write dynamic narrative..."
                      />
                    </div>

                    <div>
                      <label className={labelClass}>{language === 'en' ? 'Arabic Detailed Description' : 'الوصف التفصيلي بالعربية'}</label>
                      <textarea
                        className={`${inputClass} h-16 resize-none`}
                        value={editingDest.descriptionAr || ''}
                        onChange={e => setEditingDest(prev => ({ ...prev, descriptionAr: e.target.value }))}
                        placeholder="اكتب سرد تفصيلي للمعلم السياحي..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'Highlights (comma split)' : 'أبرز معالم الجذب (مفصولة بفاصلة)'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={Array.isArray(editingDest.highlights) ? editingDest.highlights.join(', ') : ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                          placeholder="Highlight 1, Highlight 2"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{language === 'en' ? 'Arabic Highlights' : 'أبرز المعالم بالعربية'}</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={Array.isArray(editingDest.highlightsAr) ? editingDest.highlightsAr.join(', ') : ''}
                          onChange={e => setEditingDest(prev => ({ ...prev, highlightsAr: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                          placeholder="نقطة جذب ١, نقطة جذب ٢"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions footer */}
                  <div className="pt-4 border-t border-champagne-gold-500/10 flex gap-3">
                    <button
                      onClick={() => { setEditingDest(null); setIsAddingNew(false); }}
                      className="flex-1 py-2 text-xs font-semibold rounded border border-rose-500/30 text-rose-400 hover:bg-rose-950/10 cursor-pointer"
                    >
                      {language === 'en' ? 'Cancel' : 'إلغاء'}
                    </button>
                    <button
                      onClick={handleSaveDest}
                      className="flex-1 py-2 text-xs font-bold rounded bg-gradient-to-r from-[#C5A85C] to-[#806c3a] text-black hover:shadow-lg hover:shadow-[#C5A85C]/20 cursor-pointer"
                    >
                      {language === 'en' ? 'Save Destination' : 'حفظ الوجهة السياحية'}
                    </button>
                  </div>
                </div>
              ) : panelTab === 'destinations' ? (
                /* Dynamic Tourist Destinations Manager */
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    <div className="flex justify-between items-center pb-2 border-b border-champagne-gold-500/10">
                      <h4 className="text-xs font-semibold text-champagne-gold-100">
                        {language === 'en' ? `Landmarks List (${destinations.length})` : `قائمة المعالم الحالية (${destinations.length})`}
                      </h4>
                      <button
                        onClick={() => {
                          setIsAddingNew(true);
                          setEditingDest({
                            id: `custom_tour_${Date.now()}`,
                            name: '',
                            nameAr: '',
                            subtitle: '',
                            subtitleAr: '',
                            image: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80',
                            durationFromAmman: '2h',
                            durationFromAmmanAr: 'ساعتين',
                            distanceFromAmman: '150 km',
                            distanceFromAmmanAr: '١٥٠ كم',
                            highlights: [],
                            highlightsAr: [],
                            bestTime: 'Spring & Autumn',
                            bestTimeAr: 'الربيع والخريف',
                            description: '',
                            descriptionAr: ''
                          });
                        }}
                        className="text-[10px] font-bold text-black bg-gradient-to-r from-[#C5A85C] to-[#806c3a] px-3 py-1 rounded hover:opacity-90 cursor-pointer transition-opacity"
                      >
                        {language === 'en' ? '+ Add Destination' : '+ إضافة معلم جديد'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {destinations.map(dest => (
                        <div key={dest.id} className="p-3 rounded-lg border border-champagne-gold-500/10 bg-royal-navy-900/20 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={dest.image}
                              alt={`وجهة سياحية: ${dest.name} من Royal Ride Jordan`}
                              className="w-10 h-10 object-cover rounded border border-champagne-gold-500/20 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=120&h=120&q=70';
                              }}
                            />
                            <div className="min-w-0 text-left">
                              <h5 className="text-xs font-bold text-white truncate">
                                {language === 'en' ? dest.name : dest.nameAr}
                              </h5>
                              <p className="text-[9px] font-mono text-champagne-gold-400 truncate">
                                {dest.id}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => {
                                setEditingDest(dest);
                                setIsAddingNew(false);
                              }}
                              className="text-[9px] px-2 py-0.5 rounded border border-champagne-gold-500/30 text-champagne-gold-300 hover:text-white hover:bg-champagne-gold-500/10 cursor-pointer"
                            >
                              {language === 'en' ? 'Edit' : 'تعديل'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(language === 'en' ? `Are you sure you want to delete ${dest.name}?` : `هل أنت متأكد من حذف ${dest.nameAr}؟`)) {
                                  handleDeleteDest(dest.id);
                                }
                              }}
                              className="text-[9px] px-2 py-0.5 rounded border border-rose-500/30 text-rose-400 hover:text-white hover:bg-rose-500/10 cursor-pointer"
                            >
                              {language === 'en' ? 'Delete' : 'حذف'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reset all destinations sticky footer */}
                  <div className="p-6 border-t border-champagne-gold-500/15 bg-royal-navy-950/95 text-center">
                    <button
                      onClick={handleResetDest}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Reset Destinations to Original Factory Defaults' : 'إعادة تعيين كافة المعالم لقائمة المصنع الأصلية'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Global Images Mode */
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  {/* Instructions and Tips */}
                  <div className="px-6 py-4 bg-royal-navy-900/40 border-b border-champagne-gold-500/10 shrink-0">
                    <div className="flex gap-2.5 text-xs text-champagne-gold-200/90 leading-relaxed">
                      <HelpCircle className="w-4 h-4 text-champagne-gold-500 shrink-0 mt-0.5" />
                      <div className="text-left">
                        <span className="font-semibold block text-champagne-gold-100 mb-1">
                          {language === 'en' ? 'How to Add or Edit Images:' : 'كيفية إضافة أو استبدال الصور:'}
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-[10px] text-champagne-gold-300/80">
                          {language === 'en' ? (
                            <>
                              <li>Paste any direct link to an image (ending in <code>.jpg</code>, <code>.png</code>, or Unsplash/Imgur links).</li>
                              <li>You can upload files in the <strong>Sovereign VIP Portal</strong> to get dynamic link addresses!</li>
                              <li>Leave an input empty to fall back to our premium pre-configured default image.</li>
                            </>
                          ) : (
                            <>
                              <li>ألصق أي رابط مباشر لصورة من الإنترنت (ينتهي بـ <code>.jpg</code> أو <code>.png</code> أو روابط Unsplash).</li>
                              <li>يمكنك رفع الصور وملفاتك في <strong>بوابة النخبة (Sovereign VIP Portal)</strong> للحصول على روابط مباشرة!</li>
                              <li>اترك الحقل فارغاً لاستعادة الصورة الافتراضية عالية الجودة المرفقة مسبقاً.</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Section Tabs */}
                  <div className="px-6 py-3 border-b border-champagne-gold-500/10 flex gap-1 overflow-x-auto scrollbar-none sticky top-[85px] bg-royal-navy-950/95 z-10 shrink-0">
                    {[
                      { id: 'all', label: language === 'en' ? 'All' : 'الكل' },
                      { id: 'hero', label: language === 'en' ? 'Hero' : 'الواجهة' },
                      { id: 'fleet', label: language === 'en' ? 'Fleet' : 'الأسطول' },
                      { id: 'services', label: language === 'en' ? 'Services' : 'الخدمات' },
                      { id: 'tourism', label: language === 'en' ? 'Tourism' : 'الوجهات' },
                      { id: 'about_blog', label: language === 'en' ? 'Others' : 'أخرى' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-champagne-gold-500 text-royal-navy-950 font-bold shadow-[0_0_8px_rgba(197,168,92,0.3)]'
                            : 'border border-champagne-gold-500/10 text-champagne-gold-300 hover:bg-royal-navy-900/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                    {filteredItems.map(item => {
                      const currentValue = imageUrls[item.key];
                      const [sectionName, ...subKeyParts] = item.key.split('_');
                      const subKey = subKeyParts.join('_');
                      const resolvedSrc = (currentValue || (images as any)[sectionName]?.[subKey] || item.defaultVal).replace(/\\+/g, '/');

                      return (
                        <div key={item.key} className="p-4 rounded-lg border border-champagne-gold-500/10 bg-royal-navy-900/20 space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <div className="text-left">
                              <span className="inline-block text-[9px] font-mono text-champagne-gold-400 uppercase tracking-widest px-1.5 py-0.5 rounded border border-champagne-gold-500/20 bg-royal-navy-950/40 mb-1">
                                {item.section}
                              </span>
                              <h4 className="text-xs font-semibold text-champagne-gold-100">
                                {language === 'en' ? item.nameEn : item.nameAr}
                              </h4>
                            </div>
                            {currentValue && (
                              <span className="text-[8px] font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded">
                                {language === 'en' ? 'Customized' : 'مُعدل'}
                              </span>
                            )}
                          </div>

                          {/* Preview & Input Row */}
                          <div className="flex gap-3">
                            {/* Elegant mini preview */}
                            <div className="w-16 h-16 rounded border border-champagne-gold-500/20 bg-royal-navy-950 overflow-hidden shrink-0 relative group">
                              <img
                                src={resolvedSrc}
                                alt="معاينة الصورة من Royal Ride Jordan"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 referrerPolicy='no-referrer'"
                                onError={(e) => {
                                  // Handle broken user links gracefully
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=70';
                                }}
                              />
                            </div>

                            {/* Input block */}
                            <div className="flex-1 space-y-1 text-left">
                              <label className="block text-[8px] uppercase tracking-wider text-champagne-gold-400 font-mono">
                                {language === 'en' ? 'Image Source URL' : 'رابط أو مسار الصورة'}
                              </label>
                              <input
                                type="text"
                                value={currentValue}
                                onChange={e => handleUrlChange(item.key, e.target.value)}
                                placeholder={language === 'en' ? 'Paste https://... or local public path' : 'ألصق الرابط المباشر للصورة هنا'}
                                className="w-full bg-royal-navy-900 border border-champagne-gold-500/20 rounded px-2.5 py-1.5 text-[11px] text-champagne-gold-100 placeholder-champagne-gold-400/30 focus:border-champagne-gold-400 outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions sticky footer */}
                  <div className="p-6 border-t border-champagne-gold-500/15 bg-royal-navy-950/95 sticky bottom-0 z-10 flex gap-3">
                    <button
                      onClick={handleReset}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:text-rose-300 font-sans text-xs font-semibold cursor-pointer transition-all hover:bg-rose-950/10"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{language === 'en' ? 'Reset Defaults' : 'إعادة الافتراضي'}</span>
                    </button>

                    <button
                      onClick={handleSave}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 btn-metallic-gold text-royal-navy-950 font-sans text-xs font-extrabold py-2.5 px-4 rounded hover:shadow-[0_0_15px_rgba(197,168,92,0.4)] transition-all cursor-pointer relative overflow-hidden"
                    >
                      <Save className="w-4 h-4 text-royal-navy-950" />
                      <span>{language === 'en' ? 'Save Changes' : 'حفظ الصورة الجديدة'}</span>
                      <ShimmerHoverEffect />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Success Overlays */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-royal-navy-950/90 backdrop-blur-md flex flex-col items-center justify-center z-[60]"
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-champagne-gold-100">
                    {language === 'en' ? 'Changes Saved Successfully!' : 'تم حفظ وتطبيق التعديلات بنجاح!'}
                  </h4>
                  <p className="text-xs text-champagne-gold-300/80 mt-1 animate-pulse">
                    {language === 'en' ? 'Refreshing live layout...' : 'جاري تحديث واجهة العرض فوراً...'}
                  </p>
                </motion.div>
              )}

              {resetSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-royal-navy-950/90 backdrop-blur-md flex flex-col items-center justify-center z-[60]"
                >
                  <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-3 animate-spin" style={{ animationDuration: '1s' }}>
                    <RotateCcw className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-champagne-gold-100">
                    {language === 'en' ? 'Restoring Premium Defaults...' : 'جاري استعادة النسخة الأصلية للصور...'}
                  </h4>
                  <p className="text-xs text-champagne-gold-300/80 mt-1 animate-pulse">
                    {language === 'en' ? 'Refreshing live layout...' : 'جاري إعادة تحميل الواجهة فوراً...'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
