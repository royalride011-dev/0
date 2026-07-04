import { Vehicle, ServiceType, Testimonial } from './types';
import luxuryCarsImg from './assets/images/regenerated_image_1782434427794.jpg';
import luxuryTourJordanImg from './assets/images/images/luxury_tour_jordan_1782232796504.jpg';
import vipSClassAmmanImg from './assets/images/images/vip_s_class_amman_1782232812410.jpg';
import stariaHourlyDailyImg from './assets/images/images/staria_hourly_daily_1782296563411.jpg';

export interface LocalizedLocation {
  nameEn: string;
  nameAr: string;
  baseDist: number;
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'comfort-class',
    name: 'Comfort Class (Camry, Sonata, Accord...)',
    type: 'Comfort Executive Sedan',
    image: '/images/comfort_class_fleet_1782258340226.jpg',
    capacityPassengers: 4,
    capacityLuggage: 3,
    features: [
      'Ideal for small groups and families',
      'Plush, exceptionally clean and comfortable sedans',
      'Perfect for airport transfers, hotels and tourist sites',
      'Equipped with complementary Wi-Fi & quiet AC'
    ],
    description: 'Perfect for small groups and families. Pristine high-efficiency executive sedans like Toyota Camry, Hyundai Sonata, Honda Accord, and similar models. Outstanding choice for smooth airport transfers, hotel routes, and local tourism landmarks.',
    estimatedPricePerKm: 0.6,
    basePrice: 20
  },
  {
    id: 'staria',
    name: 'Hyundai Staria VIP',
    type: 'Elite Family Lounge Van',
    image: '/images/staria_vip_amman_1782232781113.jpg',
    capacityPassengers: 7,
    capacityLuggage: 10,
    features: [
      'Luxury & spacious family MPV van',
      'Spacious cabin & premium leather seats',
      'Superb for long trips & sightseeing',
      'Complimentary Wi-Fi with 24/7 client support'
    ],
    description: 'A futuristic expression of passenger prestige. Featuring relaxation-optimized leather seats, outstanding cabin space for up to 10 luggage pieces, and smooth driving comfort—making it the ultimate model for multi-day tourism routes.',
    estimatedPricePerKm: 0.8,
    basePrice: 35
  },
  {
    id: 'toyota-hiace',
    name: 'Toyota Hiace Tourer',
    type: 'Executive Passenger Van',
    image: '/images/royal_ride_hero_1781696285755.jpg',
    capacityPassengers: 14,
    capacityLuggage: 13,
    features: [
      'Highly spacious medium-sized passenger van',
      'Individual wide comfortable seats',
      'Suited for airport support and daily excursions',
      'Equipped with complementary high-speed Wi-Fi & AC'
    ],
    description: 'Sturdy, exceptionally spacious medium-sized touring van customized for group transfers, airport luggage convenience, and comprehensive day-tours across ancient landmarks of Jordan.',
    estimatedPricePerKm: 1.0,
    basePrice: 45
  },
  {
    id: 'toyota-coaster',
    name: 'TOYOTA COASTER LUXURY VIP',
    type: 'Sovereign Group Coach',
    image: luxuryTourJordanImg,
    capacityPassengers: 18,
    capacityLuggage: 15,
    features: [
      'Elite high-capacity luxury tour coach',
      'Plush, extra-wide leather seats with great legroom',
      'Ideal for long-distance group tours across Jordan',
      'High-capacity dual climate systems & 24/7 dispatcher'
    ],
    description: 'An outstanding luxury passenger coach designed for complete peace of mind on extensive state-wide excursions. Loaded with deep baggage storage and rich seating, crafted to elevate collective routes.',
    estimatedPricePerKm: 1.4,
    basePrice: 65
  },
  {
    id: 'luxury-cars',
    name: 'VIP LUXURY CARS',
    type: 'Elite Presidential Sovereign',
    image: luxuryCarsImg,
    capacityPassengers: 4,
    capacityLuggage: 4,
    features: [
      'For VIP transport and special premier events',
      'Pridely selected supreme luxury models (GMC Yukon VIP & S-Class)',
      'Exotic limousine service with professional chauffeur',
      'Bespoke state-wide luxury packages upon order'
    ],
    description: 'Exclusive premium class of luxurious state-cars and high-end SUVs like GMC Yukon VIP/DUAL, booked upon request for governmental delegations, weddings, and premium corporate leaders seeking unmatched prestige.',
    estimatedPricePerKm: 1.8,
    basePrice: 80
  }
];

export const SERVICES: ServiceType[] = [
  {
    id: 'airport-transfer',
    title: 'Airport & Border Protocols • الاستقبال من المطارات والمعابر',
    shortDescription: 'Seamless VIP reception at Queen Alia Airport (AMM) and border facilitation to/from Syria & Lebanon.',
    detailedDescription: 'تسهيل العبور والاستقبال الدبلوماسي الفاخر • Direct tracking of flight statuses and custom fast-track border facilitation. Meet and greet inside AMM arrival terminal with professional baggage handling, custom-clearest priorities, premium refreshments, and smooth transition to vehicle.',
    icon: 'Plane',
    features: ['Real-time Flight Coordinates Tracking', 'Inside Terminal Meet & Greet assistance', 'Fast-Track Border Support & Custom Clear'],
    image: '/images/royal_ride_hero_1781696285755.jpg'
  },
  {
    id: 'car-rental-driver',
    title: 'Luxury Sedan (With/Without Chauffeur) • سيارة فاخرة مع/بدون سائق',
    shortDescription: 'Rent supreme sedans (like VIP Camry Hybrid or S-Class) with professional driver, or self-drive hire.',
    detailedDescription: 'حجز سيارة فاخرة مع أو بدون سائق للرحلات وسياحة الأفراد • Select elite sedans for supreme Amman business dispatch. Choose a professional certified local chauffeur for safe, stress-free routes, or select a self-drive rental for your independent private journeys and long-term residency.',
    icon: 'Compass',
    features: ['With Driver: Certified Safe Navigation', 'Without Driver: Perfect Mechanical Condition', 'Comprehensive Insurance Coverages'],
    image: '/images/comfort_class_fleet_1782258340226.jpg'
  },
  {
    id: 'van-rental-driver',
    title: 'VIP Van (With/Without Chauffeur) • فان فاخر مع/بدون سائق',
    shortDescription: 'Premium multi-passenger vans (Mercedes V-Class or Staria VIP) for delegations and family tours.',
    detailedDescription: 'حجز فان فاخر مع أو بدون سائق للوفود والرحلات العائلية • Experience first-class travel together in spacious Mercedes V-Class or futuristic Hyundai Staria Lounge. Perfect with a suited executive driver managing coordinates, or as independent rental for high-privacy delegations.',
    icon: 'Globe',
    features: ['7-Seat Premium Captain Conference Configuration', 'Full climate isolation and interior Wi-Fi', 'Daily disinfection & absolute pristine cabin'],
    image: '/images/staria_vip_amman_1782232781113.jpg'
  },
  {
    id: 'business-travel',
    title: 'Corporate & Business Dispatch • حلول الشركات ورجال الأعمال',
    shortDescription: 'Elite accounts, trusted logistics, and diplomatic protocols for global companies and embassies.',
    detailedDescription: 'حلول ذكية وراقية لنقل الموظفين والوفود الدبلوماسية • Meticulous corporate logistics with post-paid monthly billing, priority bookings, dedicated dispatcher hotlines, multi-lingual drivers fluent in business diplomacy, and premium privacy and confidentiality guaranteed.',
    icon: 'Briefcase',
    features: ['Custom Corporate Account Billing Option', 'Polite, Suited (Suit & Tie) Executive Drivers', 'Absolute Privacy & Silent Mobile-Office cabins'],
    image: vipSClassAmmanImg
  },
  {
    id: 'hourly-daily-standby',
    title: 'Hourly & Daily Standby • حجز بنظام اليوم والساعات',
    shortDescription: 'Retain a private executive vehicle and driver on flexible standby for shopping, business or tourism.',
    detailedDescription: 'حجوزات مرنة بالساعات أو بنظام اليوم الكامل لمرافقتكم • Experience total schedule luxury. Your VIP driver remains on instant standby parked outside your appointments, moving on your command. Ideal for continuous meetings, shopping sprees, or highly unpredictable schedules inside Amman.',
    icon: 'Clock',
    features: ['Infinite Standby Outside Appointments', 'Unlimited Stops & Fluid routes change', 'Fully inclusive fuel and toll packages'],
    image: stariaHourlyDailyImg
  }
];

export interface ExtendedTestimonial extends Testimonial {
  nameAr?: string;
  roleAr?: string;
  textAr?: string;
}

export const TESTIMONIALS: ExtendedTestimonial[] = [
  {
    name: 'Lord Richard Harrington',
    nameAr: 'اللورد ريتشارد هارينغتون',
    role: 'Private Investor',
    roleAr: 'مستثمر خاص ورجل أعمال',
    rating: 5,
    text: 'Royal Ride Jordan sets an unbelievably high bar for private transfer services. The Mercedes V-Class we booked for our Petra tour was spotless, the Wi-Fi was fast, and our chauffeur, Faris, was the epitome of professionalism. He spoke perfect English and made our border trip feel completely effortless.',
    textAr: 'تضع رويال رايد الأردن معايير مذهلة في خدمات النقل الخاص الفاخر لكبار الشخصيات. حجزنا مرسيدس في-كلاس لرحلة البتراء وكانت قمة النظافة والراحة التامة والشبكة سريعة، وكان سائقنا فاريس قمة اللياقة، يتحدث الإنجليزية بطلاقة وتسهل معه كل خطوة.',
    date: 'June 12, 2026',
    source: 'Google Reviews',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    name: 'Elena Rostova',
    nameAr: 'إيلينا روستوفا',
    role: 'Corporate Event Lead, Tech Global',
    roleAr: 'مسؤولة الفعاليات، تك غلوبال العالمية',
    rating: 5,
    text: 'We hired Royal Ride for our executive team during a 3-day conference in Amman. Their punctuality was flawless—they arrived 15 minutes before the scheduled time for every single transfer. Having cold water and professional charging spots in the Hyundai Staria made our busy days so much easier.',
    textAr: 'تعاقدنا مع رويال رايد لنقل إدارتنا التنفيذية على مدار ٣ أيام في مؤتمر عمان. كان التزامهم فائق الدقة ومثالي، حيث وصلوا قبل الموعد المحدد بـ ١٥ دقيقة في كل رحلة. توفير مياه باردة ووسائط شحن ممتازة في فان ستاريا خفف جداً من ضغط أعمالنا.',
    date: 'May 28, 2026',
    source: 'Direct VIP Client',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    name: 'Dr. Tariq Al-Saeed',
    nameAr: 'د. طارق السعيد',
    role: 'Consultant cardiologist',
    roleAr: 'استشاري جراحة القلب والأوعية الدموية',
    rating: 5,
    text: 'Highly recommended for doctors, executives, and families looking for a genuine VIP experience at Queen Alia Airport. They picked me up directly at the arrival hall, helped with all my heavyweight luggage, and drove with smooth, absolute safety back to my home. A truly premium service!',
    textAr: 'أنصح بشدة بخدماتهم للأطباء، ومجتمعات الأعمال، والعائلات الباحثة عن تجربة ركوب راقية بلا أي عناء من مطار الملكة علياء. استقبلوني مباشرة في بهو الوصول وتولوا حمل ومناولة الأمتعة الثقيلة بكل كياسة لطف، قيادة هادئة وآمنة تماماً.',
    date: 'April 09, 2026',
    source: 'Google Reviews',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    name: 'Marcus & Sophia Vance',
    nameAr: 'ماركوس وصوفيا فانس',
    role: 'Luxury Travel Bloggers',
    roleAr: 'مدونون متخصصون في السياحة الفاخرة',
    rating: 5,
    text: 'We booked a multi-day private tour covering Jerash, the Dead Sea, and Wadi Rum. I cannot recommend this company enough. The vehicle felt modern, incredibly safe, and beautifully maintained. Our driver knew the best panoramic selfie spots and recommended the finest organic local food!',
    textAr: 'قمنا بحجز جولة برية لأيام غطت جرش الأثرية، البحر الميت، ووادي رم الساحر. لا يمكنني التعبير عن مدى جودة الخدمة وأمان السيارات وحداثتها. سائقنا كان يعرف أفضل الزوايا لالتقاط الصور ووجهنا لأجود المطاعم المحلية العضوية اللذيذة.',
    date: 'March 15, 2026',
    source: 'Google Reviews',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80'
  }
];

export const JORDAN_LOCATIONS: LocalizedLocation[] = [
  { nameEn: 'Queen Alia International Airport (AMM)', nameAr: 'مطار الملكة علياء الدولي (عمان)', baseDist: 0 },
  { nameEn: 'Amman City Center (Down/West Amman Hotels)', nameAr: 'وسط البلد وفنادق عمان الغربية وعمان', baseDist: 35 },
  { nameEn: 'Dead Sea Resorts & Spa Zone', nameAr: 'منطقة منتجعات وفنادق البحر الميت', baseDist: 60 },
  { nameEn: 'Petra (Wadi Musa Gateway)', nameAr: 'المدينة الوردية - البتراء (وادي موسى)', baseDist: 210 },
  { nameEn: 'Wadi Rum Luxury Camps', nameAr: 'صحراء ومخيمات وادي رم الفاخرة', baseDist: 290 },
  { nameEn: 'Aqaba Coastal Port & Resorts', nameAr: 'ثغر الأردن الباسم - العقبة وفنادقها', baseDist: 330 },
  { nameEn: 'Jerash Greco-Roman City Ruins', nameAr: 'آثار جرش الأثرية والحضارة الرومانية', baseDist: 75 },
  { nameEn: 'Damascus, Syria (VIP Border Service)', nameAr: 'دمشق، الجمهورية العربية السورية (نقل عبر الحدود)', baseDist: 200 },
  { nameEn: 'Beirut, Lebanon (Interstate VIP Route)', nameAr: 'بيروت، الجمهورية اللبنانية (سفر وتوصيل حدودي)', baseDist: 310 }
];

export const CLIENT_LOGOS = [
  { name: 'Amman Rotana', industry: 'Luxury Hotel' },
  { name: 'The Ritz-Carlton', industry: 'Five-Star Experience' },
  { name: 'Four Seasons Amman', industry: 'Ultra Luxury Stay' },
  { name: 'Sheraton Amman Al Nabil', industry: 'Executive Lodging' },
  { name: 'St. Regis Amman', industry: 'Prestigious Legacy' }
];
