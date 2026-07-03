import { useState, useEffect, useRef } from 'react';
import { Plane, Globe, Briefcase, Compass, Clock, ArrowRight, ShieldCheck, Check, Car, UserCheck, Sparkles, X, Calendar, Landmark, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../LanguageContext';
import { GoldCorners, GoldDivider } from './GoldOrnament';
import crossBorderTransitImg from '../assets/images/regenerated_image_1782494533296.png';
import luxuryHotelDiningImg from '../assets/images/images/luxury_hotel_dining_1782297400933.jpg';
import luxuryBookingsImg from '../assets/images/regenerated_image_1782494179013.png';
import vipSClassAmmanImg from '../assets/images/images/vip_s_class_amman_1782232812410.jpg';
import stariaVipAmmanImg from '../assets/images/images/staria_vip_amman_1782232781113.jpg';
import stariaHourlyDailyImg from '../assets/images/images/staria_hourly_daily_1782296563411.jpg';
import airportTransitImg from '../assets/images/regenerated_image_1782490599935.jpg';
import limousineServiceImg from '../assets/images/regenerated_image_1782493917504.png';
import newServiceImg from '../assets/images/regenerated_image_1783092504466.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onSelectServiceAndInquire: (serviceId: string) => void;
  preSelectedId?: string;
}

interface ServiceNode {
  id: string;
  title: string;
  titleAr: string;
  caption: string;
  captionAr: string;
  shortDesc: string;
  shortDescAr: string;
  longDesc: string;
  longDescAr: string;
  icon: string;
  image: string;
  features: string[];
  featuresAr: string[];
}

const iconMap: { [key: string]: any } = {
  Plane: Plane,
  Globe: Globe,
  Briefcase: Briefcase,
  Compass: Compass,
  Clock: Clock,
  Car: Car,
  UserCheck: UserCheck,
  Landmark: Landmark,
  Sparkles: Sparkles
};

const ALL_SERVICES_DATA: ServiceNode[] = [
  {
    id: 'limousine-passenger',
    title: 'Elite Limousine Passenger Transfer',
    titleAr: 'نقل الركاب بالليموزين الفاخر',
    caption: 'Prestige travel for executive patrons and VIP guests.',
    captionAr: 'تنقل نخبة كبار الشخصيات والدبلوماسيين بسيارات الليموزين الفخمة.',
    shortDesc: 'Sit back and enjoy the ultimate prestige carriage. Our highly trained, multilingual chauffeurs manage Jordan’s traffic grid flawlessly.',
    shortDescAr: 'استمتع بالوقار والراحة المطلقة في التنقل. يتولى طاقمنا المحترف قيادتكم عبر أنحاء المملكة بسيارات ليموزين فخمة تناسب شأنكم.',
    longDesc: 'Enter the realm of ultimate relaxation. Our highly experienced, bilingual, background-checked chauffeurs manage Jordan’s traffic grid flawlessly. Guided by strict confidentiality protocol, this service is ideal for visiting global experts, fast-paced corporate executives, and secure state missions.',
    longDescAr: 'ادخل عالم الاسترخاء والراحة والمظهر الدبلوماسي الرفيع. سيارات ليموزين مصاحبة لسائقين ذوي تدريب عالٍ وبدلات رسمية تتحدث لغات عدة تمنحك حضوراً ووقاراً وحفظاً كاملاً للسرية والخصوصية أثناء تنقلكم.',
    icon: 'Sparkles',
    image: limousineServiceImg,
    features: [
      'Background-checked professional chauffeurs',
      'Suited and multilingual (English & Arabic) crew',
      'Continuous coordinate planning and state ceremony layout'
    ],
    featuresAr: [
      'سائقون محترفون خاضعون لمسح أمني شامل',
      'مظهر رسمي بالبدلة الكاملة وتحدث بالإنجليزية بطلاقة',
      'تنسيق فوري للمسارات ومرافقة مخصصة في المناسبات الرسمية'
    ]
  },
  {
    id: 'hotel-restaurant-bookings',
    title: 'Luxury Hotel & Fine Dining Reservations',
    titleAr: 'حجوزات الفنادق والمطاعم الفاخرة',
    caption: 'Exclusive bookings at top-tier hotels and destinations.',
    captionAr: 'تنسيق متكامل لحجوزات الإقامة وخدمات الكونسيرج وبأرقى الأماكن.',
    shortDesc: 'Complete concierge assistance for five-star hotel stays and premium restaurant table routing across the Hashemite Kingdom.',
    shortDescAr: 'مكتب كونسيرج متكامل لترتيب وتأكيد حجوزاتكم في أفخم السلاسل الفندقية ذات الخمس نجوم والمطاعم ذات المذاق العالمي بالأردن.',
    longDesc: 'Simplify your itinerary with our integrated concierge service. Through our deep-rooted partnerships with Five-Star luxury hospitality brands in Amman, Petra, and Aqaba, we assist with preferential room bookings, suite upgrades, and priority table reservations at exclusive fine dining venues.',
    longDescAr: 'اجعل مسار رحلتك يسيراً وممتعاً مع كونسيرج رويال رايد المتكامل. نوفر لكم بفضل علاقاتنا الوطيدة مع الفنادق الرائدة والمطاعم الشهيرة حجزاً تفصيلياً مع إمكانية الترقية والاستقبال الخاص وترتيب الضيافة التي تليق بحضرتكم.',
    icon: 'Landmark',
    image: luxuryBookingsImg,
    features: [
      'Direct coordination with 5-star VIP hotel concierge desks',
      'Priority bookings at fully-booked peak season restaurants',
      'Tailored hotel transfer pick-ups synced automatically'
    ],
    featuresAr: [
      'تنسيق مباشر مع مكاتب إدارة الحجوزات بالفنادق الشهيرة بموثوقية',
      'أولوية قصوى واختصار أوقات حجز الطاولات المزدحمة',
      'مزامنة فورية لنقاط نقل وإقلال الركاب من عتبات الفندق ووصولاً للوجهة'
    ]
  },
  {
    id: 'international-transit',
    title: 'International Cross-Border (Amman - Damascus - Beirut)',
    titleAr: 'نقل دولي متميز: عمان - دمشق - بيروت',
    caption: 'Comfortable regional journeys bypassing airport queues.',
    captionAr: 'تنقل بري مريح وآمن عابر للحدود إلى دمشق وبيروت بسلاسة.',
    shortDesc: 'Eliminate aviation bottlenecks. Enjoy direct luxury overland travel from Amman to Syria and Lebanon managed by veteran drivers.',
    shortDescAr: 'اختصر عناء السفر بالجو والانتظار بالمطارات. وفرنا تنقلاً برياً فخماً ومتصلاً من عمان إلى الشام وبيروت بصحبة سائقين عارفين بالمعابر.',
    longDesc: 'Travel smoothly across borders with our highly specialized regional service. We handle cross-border documentation clearance guidelines, security inspections, and coordinate terminal pathways between Jordan, Syria, and Lebanon, carrying you in climate-controlled isolation.',
    longDescAr: 'سافر براحة وطمأنينة متناهية عبر المعابر الإقليمية. يتولى كباتننا المتمرسون إرشادكم وتيسير مستندات العبور وتراخيص الدخول بين الأردن وسوريا ولبنان، لتستمتع بمقصورة فاخرة هادئة ومعزولة تماماً تضمن وصولكم بالموعد المحدد.',
    icon: 'Globe',
    image: newServiceImg,
    features: [
      'Comprehensive cross-border permit clearances',
      'Highly veteran regional route-certified drivers',
      'Direct, continuous point-to-point interstate travel'
    ],
    featuresAr: [
      'حزمة شاملة لإجراءات تصاريح المرور مسبقة الصنع',
      'سائقون خبراء بمعابر دول الشام وحالة الطرق الدولية',
      'انتقال متصل ومريح من نقطة الانطلاق إلى عتبة بيتك في البلد المقابل'
    ]
  },
  {
    id: 'airport-transit-jordan',
    title: 'Jordan Airports Coverage (AMM & Aqaba)',
    titleAr: 'تغطية تنقلات المطارات الأردنية',
    caption: 'Reliable transits to Queen Alia & Aqaba Airports.',
    captionAr: 'تغطية شاملة ومواعيد دقيقة لمطار الملكة علياء ومطار العقبة.',
    shortDesc: 'Never miss a flight. We provide strict punctual airport pickups with complimentary mineral water and luggage assistance.',
    shortDescAr: 'موعد هبوطك وإقلاعك في مأمن تام. نوفر مواعيد انضباط حديدية من وإلى مطار الملكة علياء الدولي ومطار الملك حسين الدولي بالعقبة.',
    longDesc: 'Experience zero-stress airport transfers. Our team tracks your flights live via satellite schedules to adjust pick-up times for any delays automatically. Enjoy dual-zone climate-controlled executive interiors and professional baggage handlers at both departure and arrival gates.',
    longDescAr: 'تخلص من عناء تتبع أوقات الرحلات وضغوطات اللحاق بالطائرة. نتبع لحظياً حركات الطيران بشكل آلي لنصل قبل موعد طائرتك لتأمين صعود هادئ، مع توفير مقصورة مكيفة، مياه مبردة مع غسيل وتعقيم كامل للأيدي ترحيباً بكم.',
    icon: 'Plane',
    image: airportTransitImg,
    features: [
      'Continuous computerized flight tracking system',
      'Complimentary airport terminal parking fees included',
      'Luggage assistance by suited personnel'
    ],
    featuresAr: [
      'تتبع آلي محوسب لرحلات الطيران لمنع التأثر بتقديم الموعد أو تأخيره',
      'مواقف المطار مجانية بالكامل ومشمولة ضمن الخدمة',
      'مساعدة فورية في مناولة وحمل الحقائب الثقيلة بكافة الأحجام'
    ]
  },
  {
    id: 'border-crossings-jordan',
    title: 'Jordan Border & Bridge Crossings',
    titleAr: 'توصيل من وإلى المعابر الأردنية',
    caption: 'Easy transfers to King Hussein & Sheikh Hussein Bridges.',
    captionAr: 'تنقلات ميسرة وسلسة لنقاط جسر الملك حسين وجسر الشيخ حسين.',
    shortDesc: 'Seamless transit connections to bridges and West Bank borders. We provide safe, reliable pickups and Dropoffs.',
    shortDescAr: 'توصيل سريع وآمن لكافة المعابر التاريخية الحدودية بما فيها جسر الملك حسين وجسر الشيخ حسين (المعابر الغربية والشرقية للأردن).',
    longDesc: 'Make your travel between Jordan and the West Bank or neighboring crossings seamless. We schedule customized pickups and dropoffs perfectly timed to align with bridge operating hours, avoiding terminal confusion.',
    longDescAr: 'اجعل حركتك وتنقلاتك ميسرة وآمنة تماماً عند عبورك للمعابر الحدودية. ننسق مواعيد وإقلال الركاب ليتطابق بدقة فائقة مع ساعات العمل الرسمية للجسور (جسر الملك حسين، جسر الشيخ حسين) لضمان سفر بلا عقبات.',
    icon: 'Compass',
    image: vipSClassAmmanImg,
    features: [
      'Coverage for King Hussein & Sheikh Hussein Bridges',
      'Specially authorized border vehicles for quick drop-offs',
      'Coordination with VIP bridge shuttle protocols'
    ],
    featuresAr: [
      'تغطية شاملة لجسر الملك حسين، جسر الشيخ حسين ومعبر وادي عربة',
      'مركبات مرخصة للمنافذ ومواقف قريبة لتسهيل الانتقال السريع',
      'إمكانية التنسيق مع بروتوكولات كبار الشخصيات VIP بالجسور المعنية'
    ]
  },
  {
    id: 'corporate-transportation',
    title: 'Corporate & Business VIP Solutions',
    titleAr: 'خدمات الشركات ورجال الأعمال',
    caption: 'Advanced corporate logistics with monthly billing.',
    captionAr: 'إدارة متكاملة لرجال الأعمال مع خيارات الفوترة الشهرية للشركات.',
    shortDesc: 'Enable a mobile office experience for your guests and executives with flexible corporate arrangements and absolute privacy.',
    shortDescAr: 'وفر بيئة عمل متنقلة لموظفي شركتكم وزواركم الأجانب. نعد شريك اللوجستيات الأفضل في عمان من خلال تسهيلات الدفع الآجل والفوترة الشهرية.',
    longDesc: 'Enable seamless mobile-office logistics for your company. Our specialized corporate account infrastructure offers monthly postpaid billing systems, direct coordinate dispatcher hotlines, and total passenger privacy safeguards to keep your corporate travelers arriving on time.',
    longDescAr: 'وفر بيئة عمل متنقلة لموظفي شركتكم وزواركم الأجانب. نعد شريك اللوجستيات الأفضل في عمان من خلال تقديم تسهيلات الدفع الآجل وبموجب فواتير شهرية، وخط ساخن للطلبات العاجلة، مع الالتزام التام بحفظ السرية والأمان للأعمال.',
    icon: 'Briefcase',
    image: '/images/corporate_vip_cabin_1782298274501.jpg',
    features: [
      'Custom post-paid corporate account billing options',
      'VIP express bookings priority during high seasons',
      'Nondisclosure agreement (NDA) absolute privacy standards'
    ],
    featuresAr: [
      'خيارات فوترة مرنة بالدفع الآجل للشركات والمؤسسات الطبية والسفارات',
      'أولوية قصوى للحجوزات والتخصيص الفوري خلال مواسم الذروة',
      'التزام تام بالسرية المطلقة واتفاقيات عدم الإفصاح للمحامين ورجال الأعمال'
    ]
  },
  {
    id: 'car-van-rentals',
    title: 'Luxury Car & Van Rentals (With / Without Driver)',
    titleAr: 'حجز سيارات وفانات فاخرة (مع سائق أو بدون)',
    caption: 'Premium sedans and high-capacity vans for group travel.',
    captionAr: 'خيارات تملك مؤقت مرنة لسيارات رجال الأعمال وفانات عائلية ممشوقة.',
    shortDesc: 'Compare our pristine meticulously maintained vehicles. Select from luxury executive sedans, high-capacity VIP vans, or commanding ultimate SUVs.',
    shortDescAr: 'امتلك حرية الاختيار بمستويات نظافة تعقيم تامة. فانات عائلية واسعة وسيارات سيدان حديثة مجهزة للقيادة الذاتية أو بسائق.',
    longDesc: 'Dwell into modern convenience. Every vehicle is delivered to your designated airport terminal or residence in pristine, fully detailed condition with complete coverage options. Choose self-drive or relax with our certified chauffeurs.',
    longDescAr: 'تنقل بأرقى تشكيلة سيارات مجهزة لراحتكم. نوفر فانات مثل مرسيدس V-Class للوفود والعائلات الكبيرة وسيارات سيدان كاديلاك أو كامري تضمن لكم أعلى مستويات العملية والرفاهية والخدمة الفندقية الفاخرة.',
    icon: 'Car',
    image: stariaVipAmmanImg,
    features: [
      'Flexible daily, weekly, or monthly self-drive contracts',
      'Latest premium models with active driver assistance tech',
      'All-inclusive road hazard protections'
    ],
    featuresAr: [
      'خيارات تأجير مرنة لليوم الواحد، الأسبوع أو الشهر للقيادة الذاتية',
      'أحدث الموديلات المزودة بأمان نشط وأنظمة مساعدة القيادة',
      'تغطية تأمينية وأمان إلكتروني شامل على كافة الطرقات الأردنية'
    ]
  },
  {
    id: 'airport-meet-greet',
    title: 'Airport Hall VIP Meet & Greet with Name-board',
    titleAr: 'الاستقبال في قاعة المطار مع لافتة باسم الضيف',
    caption: 'Class-leading welcome inside terminal with a placard.',
    captionAr: 'ترحيب حار ومحترف باسمكم الكريم فور هبوطكم بالصالة الحضرية.',
    shortDesc: 'Experience royal reception. Our suited airport agent awaits you inside arrival borders with a personalized placard.',
    shortDescAr: 'كن في طليعة الدلال. يستقبلك ممثلنا داخل مطار الملكة علياء بلافتة تحمل اسمك أو شعار شركتك ليتولى بالنيابة عنك تداول الحقائب.',
    longDesc: 'Transition seamlessly from flight to vehicle cabin. Right past customs processing, a suited Royal Ride concierge agent will be waiting holding a modern digital placard with your name or brand. We handle heavy baggage transit direct to the trunk, ensuring an absolute luxury welcome.',
    longDescAr: 'تنقل بمنتهى السلاسة من بوابات الخروج لداخل مقصورة سيارتك. تجد كادر الاستقبال المحترف بانتظارك فور الخروج بلافتة رقمية أنيقة تحمل الاسم المتفق عليه، ويتولى نيابة عنك حمل حقائب السفر وتوجيه خطاك للسيارة المجهزة والمكيفة.',
    icon: 'UserCheck',
    image: '/images/airport_meet_greet_1782298298272.jpg',
    features: [
      'Instant, unmistakable visual identification at arrival boundaries',
      'Baggage porterage and custom coordinate dispatch to the curb',
      'Priority fast-track lanes guidance options'
    ],
    featuresAr: [
      'تمييز بصري فوري وسهل لاسم الضيف أو شعار المؤسسة فوراً',
      'حمل ونقل كامل للحقائب والأمتعة الثقيلة إلى صندوق السيارة مباشرة',
      'دعم وإرشاد من خلال المسارات السريعة وخدمة صالات المطار'
    ]
  },
  {
    id: 'daily-hourly-rentals',
    title: 'Daily & Hourly Executive Rentals',
    titleAr: 'حجوزات يومية وبالساعة',
    caption: 'Flexible chauffeured blocks for meetings or leisure.',
    captionAr: 'احجز سيارتك الفاخرة وسائقك الخاص لعدد من الساعات أو الأيام.',
    shortDesc: 'Control your time in Amman. Charter a luxury vehicle and personal driver in blocks of hours for ultimate convenience.',
    shortDescAr: 'أنتم أسياد وقتكم ومواعيدكم. نوفر إمكانية حجز أجنحة النقل بالساعة للتجول داخل عمان من اجتماع لآخر دون تضييع للوقت.',
    longDesc: 'Maximize executive efficiency. Charter a certified vehicle and elite chauffeur in discrete blocks of hours or days. The driver remains on strict standby, perfectly synchronized with your meetings, shopping tours, or scenic excursions.',
    longDescAr: 'ارتق بإنتاجيتك وراحتك في رحلات العمل والتسوق والزيارات الخاصة. يظل سائقك والسيارة في حالة استعداد وتشغيل تام وتحت رهن إشارتكم وبأجمل مستويات الهندام ليتطابق مع جداول أعمالكم المزدحمة.',
    icon: 'Clock',
    image: stariaHourlyDailyImg,
    features: [
      'Flexible time blocks (4h, 8h, or full multi-day shifts)',
      'Infinite mileage limits within the city limits of Amman',
      'On-demand destination switches as your schedule changes'
    ],
    featuresAr: [
      'حجوزات مرنة باليوم أو بنظام الساعات (4 ساعات، 8 ساعات، إلخ)',
      'أميال تنقل غير محدودة ومفتوحة داخل حدود العاصمة عمان',
      'تعديل فوري ومباشر للوجهات دون غرامات أو تعطيل للمسار'
    ]
  }
];

export default function Services({ onSelectServiceAndInquire, preSelectedId }: ServicesProps) {
  const { language, t, isRtl } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceNode | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sync pre-selected service from outside if provided
  useEffect(() => {
    if (preSelectedId) {
      const found = ALL_SERVICES_DATA.find(s => s.id === preSelectedId);
      if (found) {
        setSelectedService(found);
      }
    }
  }, [preSelectedId]);

  // No GSAP block needed here. Framer Motion handles scroll-triggered cinematic entries coordinates perfectly.
  useEffect(() => {
    // Left purposefully for modular maintenance
  }, []);

  const handleOpenDetails = (service: ServiceNode) => {
    setSelectedService(service);
  };

  const handleBookFromDetails = (service: ServiceNode) => {
    onSelectServiceAndInquire(service.id);
    setSelectedService(null);
    
    // Smooth scroll to the booking section
    const bookSection = document.getElementById('book');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative py-20 bg-[#000000] border-b border-[#C5A85C]/15 overflow-hidden"
    >
      {/* Delicate background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-[#C5A85C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[600px] h-[600px] bg-[#C5A85C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Polished Header Block with smooth Motion Lift */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#C5A85C]/15 rounded border border-[#C5A85C]/35 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A85C]" />
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#C5A85C] uppercase">
              {language === 'en' ? 'Bespoke Ground Logistics' : 'النقل الفاخر واللوجستيات المعتمدة'}
            </span>
          </div>
          
          <h2 className="font-serif text-3.5xl sm:text-4.5xl font-bold tracking-tight text-luxury-gradient text-center">
            {language === 'en' ? 'Tailored Luxury Carriage' : 'خدمات النقل الفاخرة المصممة حسب الطلب'}
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-champagne-gold-100/70 mt-4 leading-relaxed font-semibold max-w-2xl mx-auto">
            {language === 'en' 
               ? 'Select from our meticulously refined suite of professional concierge transfers engineered for embassies, multinational boards, and distinguished travelers.'
              : 'اختر من باقتنا الفاخرة المصممة بعناية وتنسيق بروتوكولي فريد، لخدمة سفارات الدول، وفود الأعمال الكبرى، والعطلات العائلية الدبلوماسية عبر الأردن.'}
          </p>
          <GoldDivider className="mx-auto" />
        </motion.div>

        {/* 6 Grid layout (2 Rows of 3 elements on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_SERVICES_DATA.map((service, index) => {
            const IconComp = iconMap[service.icon] || Globe;
            const isHovered = hoveredIndex === index;
            const sectionId = service.id === 'limousine-passenger' 
              ? 'limousine-service' 
              : service.id === 'hotel-restaurant-bookings' 
                ? 'luxury-bookings' 
                : undefined;
            const isSpecialSection = !!sectionId;

            return (
              <motion.section
                key={service.id}
                id={sectionId}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="tailored-service-card group relative rounded-3xl overflow-hidden border border-[#C5A85C]/20 hover:border-[#C5A85C]/60 bg-royal-navy-900 shadow-xl transition-all duration-500 hover:shadow-2xl flex flex-col justify-between animate-gpu"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <GoldCorners />
                
                {/* Image Frame with gold thin border */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#C5A85C]/20">
                  <img
                    src={service.image}
                    alt={`${language === 'en' ? service.title : service.titleAr} - Royal Ride luxury transportation service`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    style={
                      service.id === 'hotel-restaurant-bookings'
                        ? { height: '280px' }
                        : service.id === 'limousine-passenger'
                        ? { height: '280.9px', width: '448.6px' }
                        : service.id === 'border-crossings-jordan'
                        ? { height: '280px' }
                        : service.id === 'international-transit'
                        ? { height: '279.9px' }
                        : service.id === 'airport-transit-jordan'
                        ? { height: '281.938px', width: '451.8px' }
                        : service.id === 'corporate-transportation'
                        ? { height: '280.938px' }
                        : service.id === 'car-van-rentals'
                        ? { height: '280.15px' }
                        : service.id === 'airport-meet-greet'
                        ? { height: '280px' }
                        : service.id === 'daily-hourly-rentals'
                        ? { height: '280px' }
                        : undefined
                    }
                  />
                  {/* Subtle Elegant Dark Overlay on image to guarantee high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-opacity duration-500" />

                  {/* Icon Float tag */}
                  <div className="absolute top-4 right-4 left-auto w-10 h-10 rounded-xl bg-royal-navy-950/90 text-[#C5A85C] flex items-center justify-center shadow-lg border border-[#C5A85C]/20 z-10">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                {/* Info block under image */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {isSpecialSection ? (
                      <h2 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A85C] transition-colors leading-snug">
                        {language === 'en' ? service.title : service.titleAr}
                      </h2>
                    ) : (
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A85C] transition-colors leading-snug">
                        {language === 'en' ? service.title : service.titleAr}
                      </h3>
                    )}
                    <p className="font-sans text-xs text-champagne-gold-100/65 font-medium leading-relaxed">
                      {language === 'en' ? service.caption : service.captionAr}
                    </p>
                  </div>

                  {/* Tiny touch cue - "View Specs • تفاصيل" */}
                  <div className={`mt-4 pt-3 border-t border-champagne-gold-500/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-champagne-gold-100/40 group-hover:text-[#C5A85C] transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="flex items-center gap-1 font-bold">
                      <Info className="w-3.5 h-3.5" />
                      {language === 'en' ? 'Interactive Guide' : 'دليل تفاعلي'}
                    </span>
                    <span className="font-bold flex items-center gap-1">
                      {language === 'en' ? 'Hover to reveal' : 'حرك مؤشرك للتفاصيل'}
                      <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>

                {/* HOVER POPUP DESCRIPTION DRAWER OVERLAY */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-royal-navy-950/98 backdrop-blur-[4px] p-6 sm:p-8 flex flex-col justify-between z-20"
                    >
                      {/* Top micro brand tag */}
                      <div className={`flex items-center justify-between border-b border-champagne-gold-500/10 pb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[9px] font-mono text-[#C5A85C] font-semibold tracking-widest uppercase">
                          {language === 'en' ? 'VIP Charter Protocol' : 'بروتوكول الخدمة الملكية'}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      {/* Engaging short descriptions - 2 to 3 sentences layout */}
                      <div className={`space-y-3 my-auto py-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                          {language === 'en' ? service.title : service.titleAr}
                        </h4>
                        
                        <p className="font-sans text-xs sm:text-[13px] text-stone-250 leading-relaxed font-medium">
                          {language === 'en' ? service.shortDesc : service.shortDescAr}
                        </p>
                      </div>

                      {/* Explore Details Gold Bold Action Button */}
                      <div className="pt-3 border-t border-champagne-gold-500/10">
                        <button
                          onClick={() => handleOpenDetails(service)}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A85C] to-[#85652e] hover:from-[#e2c784] hover:to-[#a3803e] text-black font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#C5A85C]/15 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>{language === 'en' ? 'Explore Details' : 'استكشف التفاصيل'}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}
        </div>

        {/* Dynamic Trust bar underneath the services */}
        <div className="mt-16 p-6 rounded-2xl bg-royal-navy-900 border border-champagne-gold-500/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className={`flex items-center space-x-3.5 ${isRtl ? 'space-x-reverse text-right' : 'text-left'}`}>
            <div className="w-12 h-12 rounded-xl bg-[#C5A85C]/10 flex items-center justify-center text-[#C5A85C] border border-[#C5A85C]/25 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base font-extrabold text-[#FAF6ED]">
                {language === 'en' ? 'Strict Professional Discretion Guaranteed' : 'ضمان السرية والخصوصية والالتزام بالمواعيد'}
              </p>
              <p className="font-sans text-[11px] sm:text-xs text-champagne-gold-100/60 font-medium">
                {language === 'en' 
                  ? 'Every single chauffeur is vetted under severe background safety assessments and possesses official permits.'
                  : 'جميع السائقين يخضعون لفحص أمني شامل ومدرّبون على أرقى بروتوكولات الكونسيرج كبار الشخصيات.'}
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
            className="w-full md:w-auto bg-[#C5A85C] text-black hover:bg-[#A88640] px-6 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
          >
            {language === 'en' ? 'Open Custom Booking Panel' : 'افتح لوحة الحجز الفوري'}
          </button>
        </div>

      </div>

      {/* SPECTACULAR LIGHTBOX MODAL FOR DEDICATED SERVICE VIEW */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-royal-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-[#C5A85C]/35 max-h-[90vh] flex flex-col z-10"
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setSelectedService(null)}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 rounded-full bg-stone-950/80 hover:bg-stone-950 text-white hover:text-[#C5A85C] transition-all z-30 cursor-pointer border border-white/10`}
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto gold-scrollbar flex-grow">
                {/* Large aesthetic image header */}
                <div className="relative h-[240px] sm:h-[280px]">
                  <img
                    src={selectedService.image}
                    alt={language === 'en' 
                      ? `${selectedService.title} from Royal Ride Jordan` 
                      : `${selectedService.titleAr} من Royal Ride Jordan`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-navy-900 via-royal-navy-900/40 to-transparent" />
                  
                  {/* Floating category tag */}
                  <div className={`absolute bottom-6 ${isRtl ? 'right-6 text-right' : 'left-6'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#C5A85C]" />
                      <span className="text-[10px] font-mono font-bold text-[#C5A85C] uppercase tracking-widest bg-[#C5A85C]/10 px-2 py-0.5 rounded">
                        {language === 'en' ? 'Certified Quality VIP Transit' : 'خدمة معتمدة من وزارة السياحة'}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      {language === 'en' ? selectedService.title : selectedService.titleAr}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Long descriptive explanation space */}
                  <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] font-sans font-bold text-champagne-gold-400 uppercase tracking-widest block">
                      {language === 'en' ? 'Core Service Summary' : 'ملخص الخدمة والبروتوكول اللوجستي'}
                    </span>
                    <p className="text-xs sm:text-[13.5px] text-champagne-gold-100/85 leading-relaxed font-medium">
                      {language === 'en' ? selectedService.longDesc : selectedService.longDescAr}
                    </p>
                  </div>

                  {/* Bullet features specifications checkmarks */}
                  <div className={`p-5 rounded-2xl bg-[#0A0A0A] border border-[#C5A85C]/25 space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] font-sans font-semibold text-[#C5A85C] uppercase tracking-wider block">
                      {language === 'en' ? 'Gold Privilege Package Inclusions:' : 'امتيازات وتسهيلات باقة الخدمة الذهبية:'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {(language === 'en' ? selectedService.features : selectedService.featuresAr).map((feat, idx) => (
                        <div key={idx} className={`flex items-start text-xs text-champagne-gold-100/90 font-semibold gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <Check className="w-4 h-4 text-[#C5A85C] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Historical Landmark or Time context disclaimer */}
                  <div className={`flex items-start gap-3 p-4 rounded-xl bg-royal-navy-950 border border-champagne-gold-500/10 text-[11px] text-champagne-gold-100/60 leading-relaxed ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <Info className="w-5 h-5 text-champagne-gold-400 shrink-0 mt-0.5" />
                    <p>
                      {language === 'en'
                        ? 'All services include luxury vehicle models, climate state tracking, phone fast charging systems, clean leather upholstery, and bottled refreshing mineral water on-board.'
                        : 'تشتمل جميع الحجوزات على سيارات فارهة من الطرازات الأحدث بالكامل، تحكم تام للتكييف، شواحن هواتف متنقلة، مقاعد جلدية معقمة، ومياه معدنية مبردة مجانية طوال الطريق.'}
                    </p>
                  </div>

                </div>
              </div>

              {/* Sticky bottom CTA actions */}
              <div className={`p-4 sm:p-6 bg-[#0A0A0A] border-t border-champagne-gold-500/15 flex flex-col sm:flex-row items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => handleBookFromDetails(selectedService)}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#C5A85C] to-[#806c3a] hover:from-[#e0c583] hover:to-[#a1823d] text-black hover:shadow-lg hover:shadow-[#C5A85C]/20 px-6 py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer border border-[#C5A85C]/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {language === 'en' ? 'Book & Inquire This Service' : 'تأكيد وحجز هذه الخدمة الفاخرة'}
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto bg-transparent border border-champagne-gold-500/30 hover:border-champagne-gold-500 hover:bg-royal-navy-950 text-champagne-gold-100 px-5 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  {language === 'en' ? 'Dismiss' : 'إغلاق ومتابعة القراءة'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
