import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, Briefcase, CheckSquare, Sparkles, AlertCircle, Crown, Scale, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../LanguageContext';
import { images } from '../imageRegistry';
import { LazyImage } from './LazyImage';

gsap.registerPlugin(ScrollTrigger);

interface FleetCarouselProps {
  onSelectVehicleAndInquire: (vehicleId: string) => void;
}

export default function FleetCarousel({ onSelectVehicleAndInquire }: FleetCarouselProps) {
  const { language, t, isRtl } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
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

  // Preload image to speed up appearance
  useEffect(() => {
    const img = new Image();
    img.src = currentVehicle.image;
  }, [currentVehicle.image]);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Visual Media & Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col space-y-5 animate-gpu"
          >
            
            {/* Main Visual Slider Frame with elegant gold decorative borders & artistic ornaments */}
            <div className="relative rounded-xl overflow-hidden w-[490px] h-[500px] mx-auto bg-royal-navy-950/95 border border-[#C5A85C]/30 group p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#C5A85C]/60 flex items-center justify-center">
              
              {/* Elegant Golden Double Corner Ornaments */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#C5A85C]/60 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#C5A85C]/60 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#C5A85C]/60 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#C5A85C]/60 pointer-events-none" />

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
                  <LazyImage
                    src={currentVehicle.image}
                    srcSet={
                      currentVehicle.image.includes('.jpg') 
                        ? `${currentVehicle.image.replace('.jpg', '-480w.jpg')} 480w,
                           ${currentVehicle.image.replace('.jpg', '-960w.jpg')} 960w,
                           ${currentVehicle.image.replace('.jpg', '-1920w.jpg')} 1920w`
                        : undefined
                    }
                    sizes="(max-width: 600px) 480px,
                           (max-width: 1200px) 960px,
                           1920px"
                    alt={`Luxury ${currentVehicle.name} vehicle from Royal Ride Jordan fleet`}
                    width={490}
                    height={500}
                    className={`w-[490px] h-[500px] object-cover filter brightness-[0.9] saturate-[1.1] contrast-[1.05]`}
                  />
              </AnimatePresence>

              {/* Gradient Shading Underlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-navy-950/85 via-transparent to-transparent pointer-events-none" />

              {/* Vehicle Title Tag on Media Frame */}
              <div className="absolute top-6 left-6 bg-royal-navy-950/95 border border-[#C5A85C]/35 px-4 py-2.5 rounded backdrop-blur-md z-20 shadow-md">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A85C] uppercase block mb-0.5">
                  {language === 'en' ? 'CATEGORY STYLE' : 'نوع فئة الأسطول'}
                </span>
                <span className="font-serif text-sm font-bold text-champagne-gold-200">
                  {currentVehicle.type}
                </span>
              </div>

              {/* Slide Navigation Triggers inside Frame */}
              <button
                onClick={prevVehicle}
                className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded border border-[#C5A85C]/30 bg-royal-navy-950/90 hover:bg-[#C5A85C] text-[#C5A85C] hover:text-royal-navy-950 transition-all duration-300 z-20 cursor-pointer shadow-lg"
                aria-label="Previous fleet car"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextVehicle}
                className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded border border-[#C5A85C]/30 bg-royal-navy-950/90 hover:bg-[#C5A85C] text-[#C5A85C] hover:text-royal-navy-950 transition-all duration-300 z-20 cursor-pointer shadow-lg"
                aria-label="Next fleet car"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Capacity overlay tags */}
              <div className={`absolute bottom-6 flex space-x-3 z-20 ${isRtl ? 'right-6 space-x-reverse' : 'left-6'}`}>
                <div className="flex items-center space-x-2 bg-royal-navy-950/95 border border-[#C5A85C]/20 px-3 py-1.5 rounded text-xs text-champagne-gold-100 backdrop-blur shadow">
                  <Users className="w-3.5 h-3.5 text-[#C5A85C]" />
                  <span>{currentVehicle.capacityPassengers} {t('fleet.capacity')}</span>
                </div>
                <div className="flex items-center space-x-2 bg-royal-navy-950/95 border border-[#C5A85C]/20 px-3 py-1.5 rounded text-xs text-champagne-gold-100 backdrop-blur shadow">
                  <Briefcase className="w-3.5 h-3.5 text-[#C5A85C]" />
                  <span>{currentVehicle.capacityLuggage} {t('fleet.luggage')}</span>
                </div>
              </div>

            </div>

            {/* Thumbnail Pickers for high end UI (5 columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pb-2">
              {VEHICLES_LOCALIZED.map((veh, idx) => (
                <button
                  key={veh.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative cursor-pointer py-3.5 px-3 rounded-md border text-center transition-all duration-300 flex flex-col justify-center ${
                    activeIndex === idx
                      ? 'border-[#C5A85C] bg-[#C5A85C]/15 shadow-[0_5px_15px_rgba(197,168,92,0.15)] ring-1 ring-[#C5A85C]/40'
                      : 'border-[#C5A85C]/20 bg-royal-navy-900/40 hover:border-[#C5A85C]/50 hover:bg-royal-navy-900/90'
                  }`}
                >
                  <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 ${
                    activeIndex === idx ? 'text-[#C5A85C] font-bold' : 'text-slate-400'
                  }`}>
                    {language === 'en' ? `Option 0${idx + 1}` : `الخيار 0${idx + 1}`}
                  </span>
                  <span className={`font-serif text-[11px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${
                    activeIndex === idx ? 'text-champagne-gold-100 font-bold' : 'text-slate-400'
                  }`}>
                    {veh.name}
                  </span>
                </button>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Fleet Specs & Estimator (Wrapped in Royal Decorated Golden Frame Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 animate-gpu bg-royal-navy-950/95 p-6 sm:p-8 rounded-xl border border-[#C5A85C]/30 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#C5A85C]/60 transition-all duration-500 group"
          >
            {/* Majestic Radial Golden Glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C5A85C]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C5A85C]/12 transition-all duration-700" />
            
            {/* Elegant Golden Double Corner Ornaments / Drawings (Handcrafted Line Art) */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#C5A85C]/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#C5A85C]/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#C5A85C]/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#C5A85C]/60 pointer-events-none" />
            
            <div className="absolute top-3.5 left-3.5 w-2 h-2 border-t border-l border-[#C5A85C]/30 pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-2 h-2 border-t border-r border-[#C5A85C]/30 pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-2 h-2 border-b border-l border-[#C5A85C]/30 pointer-events-none" />
            <div className="absolute bottom-3.5 right-3.5 w-2 h-2 border-b border-r border-[#C5A85C]/30 pointer-events-none" />

            <div className="absolute inset-1.5 border border-[#C5A85C]/15 pointer-events-none rounded" />
            <div className="absolute inset-2.5 border border-dashed border-[#C5A85C]/5 pointer-events-none rounded" />

            {/* Little Royal Insignia at Card Top */}
            <div className="absolute top-3.5 right-3.5 opacity-25 group-hover:opacity-60 transition-opacity duration-500 text-[#C5A85C] scale-75 pointer-events-none">
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 7L21 4L18 10H6L3 4L9 7L12 2Z" fill="currentColor" />
              </svg>
            </div>

            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center space-x-1 bg-[#C5A85C]/10 border border-[#C5A85C]/35 px-2.5 py-1 rounded">
                <Sparkles className="w-3 h-3 text-[#C5A85C] animate-pulse mr-1" />
                <span className="text-[9px] font-mono text-champagne-gold-200 uppercase tracking-widest">{language === 'en' ? 'VIP SPEC SHEET' : 'مواصفات الـ VIP الخاصة'}</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-champagne-gold-300 mt-2 uppercase tracking-tight">
                {currentVehicle.name}
              </h3>
              <p className="font-sans text-xs text-[#FAF6ED]/75 leading-relaxed mt-1">
                {currentVehicle.description}
              </p>
            </div>

            {/* Vehicle Features Checklist */}
            <div className="relative z-10 pt-1 border-t border-royal-navy-850">
              <span className="text-[10px] font-mono text-[#C5A85C] uppercase tracking-wider block mb-3.5">
                {t('fleet.features')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentVehicle.features.map((feature) => (
                  <div key={feature} className={`flex items-start text-xs text-champagne-gold-100/85 ${isRtl ? 'space-x-reverse' : ''}`}>
                    <CheckSquare className="w-3.5 h-3.5 text-[#C5A85C] mr-2.5 ml-2.5 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Architecture Box */}
            <div className="p-5 rounded bg-royal-navy-900 border border-[#C5A85C]/20 space-y-3.5 relative z-10 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs text-champagne-gold-200">{language === 'en' ? 'Base Activation Rate' : 'تعرفة فتح العداد وحجز المركبة'}</span>
                <span className="font-serif text-xs text-[#C5A85C] font-bold">
                  {language === 'en' ? 'Custom Quote' : 'تسعير مخصص عند التواصل'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-royal-navy-800 pt-3">
                <span className="text-xs text-champagne-gold-200">{language === 'en' ? 'Interstate Route Rate' : 'تعرفة المسافات الطويلة والمدن'}</span>
                <span className="font-serif text-xs text-[#C5A85C] font-bold">
                  {language === 'en' ? 'Tailored per Route' : 'أسعار مخصصة حسب الطلب'}
                </span>
              </div>
              <div className={`flex items-start space-x-2 pt-1 border-t border-royal-navy-800 text-[10px] text-champagne-gold-100/50 ${isRtl ? 'space-x-reverse' : ''}`}>
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 mr-1 ml-1 text-[#C5A85C]" />
                <p>{language === 'en' ? 'Tax, border permits, bottled mineral water, and luxury chauffeur charges are fully included in all tailored plans.' : 'الضرائب، أذونات المرور الحدودية، المياه المعدنية المبردة، وتكاليف السائق المحترف مشمولة بالكامل عند تأكيد طلب الحجز.'}</p>
              </div>
            </div>

            {/* Chauffeur actions with rich gold button */}
            <div className="pt-3 relative z-10">
              <button
                onClick={() => onSelectVehicleAndInquire(currentVehicle.id)}
                tabIndex={0}
                className="w-full text-center btn-metallic-gold text-royal-navy-950 font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-6 rounded cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,168,92,0.4)] transform hover:-translate-y-0.5"
              >
                {language === 'en' ? `Book ${currentVehicle.name} Now` : `احجز ${currentVehicle.name} الآن`}
              </button>
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
