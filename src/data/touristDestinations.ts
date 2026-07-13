import { images } from '../imageRegistry';

export interface DestinationNode {
  id: string;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  image: string;
  highlights: string[];
  highlightsAr: string[];
  bestTime: string;
  bestTimeAr: string;
  description: string;
  descriptionAr: string;
  historicalContext?: string;
  historicalContextAr?: string;
}

export const FALLBACK_DESTINATION: DestinationNode = {
  id: 'fallback-wonder',
  name: 'Majestic Wonder',
  nameAr: 'المعلم المهيب',
  subtitle: 'Exclusive guided route',
  subtitleAr: 'مسار جولات مخصصة لكبار الشخصيات',
  image: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=800&q=75',
  highlights: ['Elite customized route planning', 'First-class travel comfort'],
  highlightsAr: ['تخطيط مسار مخصص للنخبة', 'أقصى درجات الراحة والرفاهية أثناء السفر'],
  bestTime: 'Spring & Autumn',
  bestTimeAr: 'فصلي الربيع والخريف',
  description: 'Experience elite luxury transportation to Jordan’s majestic landmarks. Our specialized services guarantee comfort, safety, and cultural guidance for an unparalleled journey.',
  descriptionAr: 'استمتع بخدمات النقل الفاخرة المتميزة إلى معالم الأردن العريقة مع رويال رايد لخدمات السائق الخاص.'
};

export const TOURIST_DESTINATIONS: DestinationNode[] = [
  {
    id: 'petra',
        name: 'Petra Heritage Site',
    nameAr: 'البتراء (المدينة الوردية)',
    subtitle: 'The Legendary Nabataean Rose Red City',
    subtitleAr: 'عجيبة من عجائب الدنيا السبع والشاهد الخالد',
    image: images.tourism.petra,
    highlights: [
      'Private luxury round-trip chauffeur service',
      'Flexible departure timings tailored to VIP needs',
      'Full desert highway permit and toll coverage',
      'Complimentary premium tracking & refreshments onboard'
    ],
    highlightsAr: [
      'خدمة سائق خاص ذهاباً وإياباً بمركبات فارهة',
      'مواعيد انطلاق مرنة بالكامل لتلبية احتياجات النخبة',
      'تغطية كاملة لرسوم الطرق وتصاريح المرور السريعة',
      'متابعة حية للمسار وتقديم مرطبات وخدمات راقية على المتن'
    ],
    bestTime: 'Spring & Autumn',
    bestTimeAr: 'الربيع والخريف (أفضل الأوقات لالتقاط الصور)',
    description: 'Embark on an exclusive luxury private tour to Petra, one of the New Seven Wonders of the World. Your personal chauffeur ensures a seamless transfer from Amman across the Desert Highway. Experience the breathtaking Siq, Al-Khazneh (The Treasury), and royal tombs wrapped in profound history, with customized elite transport configurations.',
    descriptionAr: 'انطلق في جولة خاصة فاخرة ومخصصة إلى البتراء، إحدى عجائب الدنيا السبع الجديدة. يضمن لك سائقك الشخصي المحترف انتقالاً سلساً عبر الطريق الصحراوي السريع. استمتع بمشاهدة السيق العظيم، والخزنة والقبور الملكية المذهلة.',
    historicalContext: 'Capital of the Nabataean Kingdom, a bustling commercial trade hub connecting Arab silk routes, Egypt, and India.',
    historicalContextAr: 'كانت عاصمة الإمبراطورية النبطية المهيبة، ومركزًا تجاريًا يربط طرق الحرير والتبادل التجاري بين شبه الجزيرة العربية ومصر والهند.'
  },
  {
    id: 'wadirum',
    name: 'Wadi Rum Protected Area',
    nameAr: 'صحراء وادي رم',
    subtitle: 'The Majestic Martian Desert Experience',
    subtitleAr: 'وادي القمر المهيب وتجربة الكوكب الأحمر',
    image: images.tourism.wadirum,
    highlights: [
      'Elite SUV premium direct transfers',
      'Coordinated drop-offs at luxury desert domes',
      'Acoustic noise-insulated highway cruising',
      'Bespoke stargazing and private safari adjustments'
    ],
    highlightsAr: [
      'انتقال مباشر بسيارات SUV مجهزة وفخمة بالكامل',
      'تنسيق دقيق ومريح لتسجيل الدخول في المنتجعات الفاخرة',
      'مقصورات هادئة وعزل صوتي متفوق على الطرق السريعة',
      'تعديل وتخطيط خاص لجولات الرصد الفلكي والرحلات الصحراوية'
    ],
    bestTime: 'September to May',
    bestTimeAr: 'من سبتمبر إلى مايو (ليالي النجوم الصافية)',
    description: 'Discover the cinematic red sands of Wadi Rum in absolute comfort. Royal Ride delivers top-tier executive transportation to the valley of the moon. Perfect for luxury stargazing camp transfers, private desert eco-tours, and high-profile wilderness expeditions with professional logistical support.',
    descriptionAr: 'اكتشف الرمال الحمراء الساحرة لوادي رم في أجواء مفعمة بالرفاهية الفائقة. توفر رويال رايد نقلاً تنفيذياً راقياً إلى وادي القمر. الخيار الأمثل للانتقال إلى المخيمات المقببة الفاخرة ورصد النجوم والرحلات الصحراوية.',
    historicalContext: 'Home to ancient Thamudic rock inscriptions, nomadic Bedouin routes, and the historic base of Lawrence of Arabia.',
    historicalContextAr: 'موطن النقوش الثمودية القديمة، ومسارات البدو الرحل، والمقر التاريخي للورنس العرب خلال الثورة العربية الكبرى.'
  },
  {
    id: 'deadsea',
    name: 'The Dead Sea Coastline',
    nameAr: 'البحر الميت',
    subtitle: 'Lowest Point on Earth & Luxury Wellness',
    subtitleAr: 'المنتجع الطبيعي الأخفض والرفاهية العلاجية',
    image: images.tourism.deadsea,
    highlights: [
      'Direct express wellness resort transfers',
      'Spacious baggage holds for multi-day luggage',
      'VIP wait-and-return day tour arrangements',
      'Chilled environment featuring individual zone controls'
    ],
    highlightsAr: [
      'نقل سريع ومباشر لمنتجعات وسبا البحر الميت العالمية',
      'حقائب ومساحات تخزين واسعة ومؤمنة لجميع الأمتعة',
      'باقات جولات اليوم الواحد لانتظار كبار الشخصيات والعودة بها',
      'تحكم مستقل في درجات الحرارة والمناخ داخل مقصورة السيارة'
    ],
    bestTime: 'Year-Round Utility',
    bestTimeAr: 'طوال العام (مياه دافئة وخدمات مستمرة)',
    description: "Rejuvenate your senses at the world's lowest elevation natural spa resorts. Our premium fleet provides tranquil, stress-free transfers to five-star international beach properties. Escape the hustle of the capital with private climate-controlled rides and reliable luggage security.",
    descriptionAr: 'جدد طاقتك وحيويتك في أرقى منتجعات البحر الميت في أخفض بقعة على وجه الأرض. يوفر أسطولنا الفاخر رحلات هادئة ومريحة وخالية من الإجهاد إلى فنادق الخمس نجوم. استمتع برحلة عائلية مبردة مع تولي كامل تفاصيل الحركة بأمان.',
    historicalContext: 'A key sanctuary since biblical times, famous for housing King Herod’s historic thermal baths.',
    historicalContextAr: 'شكل ملاذًا علاجيًا فريدًا منذ العصور القديمة، واحتضن الحمامات الساخنة الأثرية للملك هيرودس والعديد من الأباطرة.'
  },
  {
    id: 'jerash',
    name: 'Jerash Greco-Roman Ruins',
    nameAr: 'جرش الأثرية',
    subtitle: 'The Most Intact Decapolis Roman City',
    subtitleAr: 'بوابة الشرق الروماني وعظمة شارع الأعمدة',
    image: images.tourism.jerash,
    highlights: [
      'Scenic northern ridge private route mapping',
      'Perfect synchronization with local expert guides',
      'Ideal historic family or business delegation escape',
      'Seamless city-to-ruins local travel logistics'
    ],
    highlightsAr: [
      'مسارات قيادة مخصصة عبر تلال الشمال الخضراء الخلابة',
      'تنسيق مثالي مع نخبة من المرشدين السياحيين المحليين',
      'مثالية للرحلات العائلية أو وفود رجال الأعمال رفيعة المستوى',
      'خدمات دعم لوجستي متكاملة لتسهيل التجوال والدخول السلس'
    ],
    bestTime: 'March to June',
    bestTimeAr: 'من مارس إلى يونيو (أجواء ربيعية ساحرة)',
    description: 'Walk through the monumental colonnaded streets, theaters, and grand arches of ancient Gerasa. Located just north of Amman, Jerash represents a phenomenal historic tour seamlessly connected via our reliable luxury chauffeur infrastructure.',
    descriptionAr: 'تجول في شوارع جرش التاريخية ذات الأعمدة المهيبة، وتأمل المدرجات العريقة وقوس النصر الشامخ. تقع جرش شمال العاصمة عمان وتوفر رحلة تاريخية ساحرة مع أحدث تقنيات الراحة والسلامة التي توفرها رويال رايد.',
    historicalContext: 'Founded by Alexander the Great in the 4th century BC, Jerash reached its zenith as a thriving trade center under Roman rule in the 1st century AD.',
    historicalContextAr: 'تأسست على يد الإسكندر الأكبر في القرن الرابع قبل الميلاد، ووصلت جرش إلى ذروتها كمركز تجاري مزدهر تحت الحكم الروماني في القرن الأول الميلادي.'
  },
  {
    id: 'aqaba',
    name: 'Aqaba Luxury Gateway',
    nameAr: 'خليج العقبة الساحلي',
    subtitle: "Jordan's Premier Tropical Marine Escape",
    subtitleAr: 'بوابة البحر الأحمر الفاخرة لليخوت والاستجمام',
    image: images.tourism.aqaba,
    highlights: [
      'Long-distance luxury cruising optimized vehicles',
      'Ayla Oasis and Tala Bay luxury drop-off options',
      'Continuous tracking and roadside security alignment',
      'Extensive multi-stop regional custom travel schedules'
    ],
    highlightsAr: [
      'سيارات فاخرة مجهزة ومحسنة للمسافات الطويلة والخط السريع',
      'توصيل حصرى وخاص إلى منتجعات واحة أيلة وتالا بيه الفخمة',
      'متابعة حية مستمرة وضمان تواصل كامل على امتداد الطريق',
      'تخطيط وتنسيق مرن لزيارات متكررة أو جولات متعددة المحطات'
    ],
    bestTime: 'October to April',
    bestTimeAr: 'من أكتوبر إلى أبريل (الشتاء المعتدل الدافئ)',
    description: "Travel directly to Jordan's exquisite coastal window on the Red Sea. Whether visiting mega-yacht marinas or private luxury beach compounds, Royal Ride handles the long-haul journey south with absolute premium performance and smooth lane mechanics.",
    descriptionAr: 'انطلق مباشرة إلى نافذة الأردن الساحلية الساحرة على مياه البحر الأحمر الفيروزية. سواء كنت تزور مراسي اليخوت في أيلة أو المنتجعات الخاصة في تالا بيه، تضمن رويال رايد قطع المسافة الطويلة بأعلى درجات الرفاهية والأمان وثبات مقصورة القيادة.',
    historicalContext: 'Aqaba\'s history is marked by its strategic location. Ancient Ayla was a major Islamic port city.',
    historicalContextAr: 'تميز تاريخ العقبة بموقعها الاستراتيجي عبر العصور، حيث كانت آيلة القديمة بمثابة أول ميناء إسلامي متكامل خارج الجزيرة العربية.'
  },
  {
    id: 'nebo',
    name: 'Mount Nebo & Holy Sites',
    nameAr: 'جبل نيبو ومادبا',
    subtitle: 'Panoramic Historic Vistas & Ancient Mosaics',
    subtitleAr: 'المطل التاريخي المقدس وفن الفسيفساء الخالد',
    image: images.tourism.madaba,
    highlights: [
      'Bespoke religious and historic tour sequences',
      'Smooth handling across mountainous winding roads',
      'Comprehensive proximity parking privileges close to gates',
      'Tailored lunch and landmark hop-off flexibility'
    ],
    highlightsAr: [
      'باقات زيارات خاصة للمواقع الأثرية والدينية والتاريخية',
      'انتقال آمن وناعم بالكامل عبر الطرق والمنعطفات الجبلية',
      'مواقف سيارات خاصة وقريبة جداً من البوابات لتجنب المشي الطويل',
      'مرونة تامة للغداء في أفخم المنتجعات الجبلية على الطريق'
    ],
    bestTime: 'Spring & Autumn',
    bestTimeAr: 'فصلي الربيع والخريف (أجواء مشمسة ووضوح رؤية)',
    description: "Delve deep into sacred heritage by exploring Madaba's iconic 6th-century mosaic maps and the sweeping panoramic valley views from Mount Nebo. An absolute necessity for cultural enthusiasts traveling in private premium luxury.",
    descriptionAr: 'تأمل التاريخ القديم وعمق الحضارات من خلال لوحات الفسيفساء البيزنطية الأثرية في مادبا، واستمتع بالإطلالة البانورامية الشاملة لوادي الأردن والقدس الشريف من قمة جبل نيبو الشاهقة، برعاية وراحة فائقتين.',
    historicalContext: 'Famed pilgrimage site where Moses looked upon the Promised Land, rich with Byzantine basilica mosaics.',
    historicalContextAr: 'موقع حج تاريخي شهير يقصده الزوار من شتى أصقاع الأرض، يضم بازيليكا بيزنطية تزخر بأرقى نقوش الفسيفساء.'
  },
  {
    id: 'ajloun',
    name: 'Ajloun Fortress Highlands',
    nameAr: 'مرتفعات عجلون',
    subtitle: 'Medieval Castles & Lush Mediterranean Ecosystems',
    subtitleAr: 'قلعة عجلون الحربية وغابات الشمال الوارفة',
    image: images.tourism.ajloun,
    highlights: [
      'High-torque premium SUVs optimized for steep terrains',
      'Breathtaking forest-canopy route guidance mapping',
      'Excellent combination tour alongside Jerash tracks',
      'Fully automated cabin pressure and cooling stability'
    ],
    highlightsAr: [
      'مركبات دفع رباعي قوية ومريحة مخصصة للطرق الجبلية الصعبة',
      'مسارات قيادة خلابة وممتعة بين أحضان الطبيعة الشمالية الخضراء',
      'إمكانية الدمج الفاخر بين رحلتي جرش وعجلون في يوم واحد',
      'أنظمة تكييف متطورة لضمان استقرار حرارة ورطوبة المقصورة'
    ],
    bestTime: 'Summer Season Comfort',
    bestTimeAr: 'صيفاً (للاستمتاع بنسمات الجو الباردة الخضراء)',
    description: "Climb up to the historic Ajloun Castle built by Saladin's commanders. Surrounded by spectacular pine forests and ancient olive groves, this high-altitude destination provides a cool, refreshing summer microclimate.",
    descriptionAr: 'اصعد إلى مرتفعات عجلون واستكشف قلعتها الأثرية التي بناها قادة صلاح الدين الأيوبي. توفر المرتفعات المكسوة بغابات الصنوبر والسنديان وبساتين الزيتون مناخاً معتدلاً منعشاً ومثالياً للهرب من حرارة الصيف.',
    historicalContext: 'Built in 1184 AD by General Izz al-Din Usama to secure trade routes and control iron mines in the northern hills.',
    historicalContextAr: 'بُنيت عام ١١٨٤ م على يد القائد عز الدين أسامة، أحد جنرالات صلاح الدين الأيوبي، لحماية طرق التجارة ومراقبة مناجم الحديد في تلال الشمال.'
  },
  {
    id: 'amman',
    name: 'The Historic Amman Citadel',
    nameAr: 'جبل القلعة في عمان',
    subtitle: "Layers of Civilization in the Capital's Heart",
    subtitleAr: 'تاج فيلادلفيا الأثري وتاريخ الحضارات المتراكمة',
    image: images.tourism.amman,
    highlights: [
      'Premium city-center navigation bypass logistics',
      'Spectacular panoramic evening photography coordination',
      'Seamless luxury hotel-to-citadel transfer loops',
      'Ideal quick business-break premium sightseeing asset'
    ],
    highlightsAr: [
      'تنقل مريح وسريع متجاوزاً ازدحامات وسط المدينة المعتادة',
      'تنسيق مخصص لالتقاط صور الغروب الساحر فوق تلال العاصمة',
      'جولات تنقل دائرية متصلة بين فنادق عمان وجبل القلعة',
      'خيار رائع وسريع لرجال الأعمال وضيوف المؤتمرات لزيارة معالم عمان'
    ],
    bestTime: 'Year-Round Utility',
    bestTimeAr: 'طوال العام (موقع ممتاز في قلب العاصمة)',
    description: "Overlook the entire sprawling city of Amman from its highest historic crest. The Citadel showcases the Temple of Hercules and Umayyad Palace, standing as a premium urban destination easily accessible via our local chauffeured service.",
    descriptionAr: 'أشرف على العاصمة الساحرة عمان من أعلى تلالها التاريخية السبعة في جبل القلعة. يتصدر الموقع معبد هرقل الشاهق والقصر الأموي المهيب، ليمثل وجهة حضرية استثنائية يسهل الوصول إليها بخدمات النقل الحصرية من رويال رايد.',
    historicalContext: 'Continuously inhabited since the Neolithic period, representing ancient Ammonite, Roman, and Islamic heritage.',
    historicalContextAr: 'مدينة مأهولة باستمرار منذ العصر الحجري الحديث، وتمثل موقعاً نادراً يدمج التراث العموني والروماني والإسلامي في مشهد حضري واحد.'
  },
  {
    id: 'almaghtas',
    name: 'Bethany Beyond the Jordan',
    nameAr: 'المغطس (موقع المعمودية)',
    subtitle: 'UNESCO World Heritage Holy Baptism Sanctuary',
    subtitleAr: 'موقع معمودية السيد المسيح وجوهرة التراث العالمي لليونسكو',
    image: images.tourism.almaghtas,
    highlights: [
      'VIP diplomatic protocol-trained chauffeur standard',
      'Quiet, smooth valley-floor highway transit handling',
      'Direct liaison and efficient site-gate parking drop',
      'Integrated climate filtration for optimal passenger comfort'
    ],
    highlightsAr: [
      'سائقون مدربون على البروتوكولات الدبلوماسية وخدمة كبار الشخصيات',
      'قيادة ناعمة ومريحة للغاية لضمان استرخاء الركاب طوال الطريق',
      'تنسيق وتسهيل الدخول والاصطفاف بالقرب من بوابات الموقع',
      'أنظمة تنقية هواء متطورة داخل مقصورة القيادة لراحة فائقة'
    ],
    bestTime: 'Autumn & Winter',
    bestTimeAr: 'الخريف والشتاء (درجات حرارة معتدلة في الغور)',
    description: 'Experience profound tranquility at the official UNESCO-designated baptism location along the Jordan River. Royal Ride offers discreet, secure, and highly respectful executive transport arrangements for international pilgrims and delegations.',
    descriptionAr: 'استشعر السكينة والسلام الروحي العميق في موقع معمودية السيد المسيح الرسمي المسجل لدى اليونسكو على ضفاف نهر الأردن. تقدم رويال رايد خدمات نقل سرية وآمنة ومحترفة للوفود والشخصيات الدبلوماسية المرموقة والزوار.',
    historicalContext: 'Official UNESCO World Heritage site representing the Baptism of Jesus, visited by global pilgrims and popes.',
    historicalContextAr: 'موقع رسمي مسجل على لائحة التراث العالمي لليونسكو يمثل مكان معمودية يسوع المسيح، يزوره الحجاج والباباوات من مختلف أرجاء العالم.'
  },
  {
    id: 'amman-old',
    name: 'Old Amman & The Citadel',
    nameAr: 'وسط البلد وقلعة عمان',
    subtitle: 'The Heart of the Capital & Ancient Ruins',
    subtitleAr: 'قلب العاصمة التاريخي وتراث جبل القلعة العتيق',
    image: images.tourism.amman,
    highlights: [
      'Walk among the iconic pillars of the Temple of Hercules and the Umayyad Palace',
      'Step into the historic 6,000-seat Roman Theater in downtown Amman',
      'Exclusive private luxury driving tour through the high-end streets of Jabal Amman',
      'Delight in legendary traditional Arabic sweets and gourmet cardamom coffee'
    ],
    highlightsAr: [
      'التقاط صور مذهلة بجانب أعمدة معبد هرقل الشاهقة والقصر الأموي بقلعة الجبل',
      'زيارة المدرج الروماني الأثري الضخم في قلب العاصمة واستشعار هيبة التاريخ القديم',
      'تذوق الكنافة التقليدية الفاخرة والقهوة العربية المهيلة في وسط البلد العتيق الأنيق',
      'جولة سيارات VIP مريحة وفخمة عبر شوارع جبل عمان التاريخية ومقاهيه الفنية الراقية'
    ],
    bestTime: 'Half Day (3 to 5 Hours) Cultural Immersion',
    bestTimeAr: 'نصف يوم (3-5 ساعات) لجولات المدينة والحضارة',
    description: 'The Citadel stands majestically on the highest hill of Amman, housing the ruins of the Temple of Hercules and the Umayyad Palace. Below lies the historic Roman Theater and vibrant souks of downtown. Royal Ride coordinates a seamless urban odyssey. Our premium S-Class or spacious VIP vans maneuver Amman’s famous seven steep hills with graceful ease, ensuring your historical exploration is combined with cooling air-conditioning, onboard Wi-Fi, and elite personal attention.',
    descriptionAr: 'تجمع قلعة عمان الأثرية بين معبد هرقل الروماني العظيم والقصر الأموي المهيب على أعلى تلال عمان، مطلة على المدرج الروماني وأسواق البلد. تضمن سيارات رويال رايد وسائقوها الخبراء تحويل جولتك الحضرية وسط تلال عمان السبعة إلى تجربة مريحة وسلسة تتجنب صعوبة حركة المرور ومشاكل المواقف لتستمتع بكل دقيقة.',
    historicalContext: 'Continuously inhabited since the Neolithic period, representing ancient Ammonite, Roman, and Islamic heritage.',
    historicalContextAr: 'مدينة مأهولة باستمرار منذ العصر الحجري الحديث، وتمثل موقعاً نادراً يدمج التراث العموني والروماني والإسلامي في مشهد حضري واحد.'
  },
  {
    id: 'mujib',
    name: 'Wadi Mujib Gorge',
    nameAr: 'وادي الموجب (المغامرة المائية)',
    subtitle: 'The Deepest Water Canyon Adventure',
    subtitleAr: 'أعمق محمية طبيعية ومغامرة السيق المائي المشوقة',
    image: images.tourism.mujib,
    highlights: [
      'Thrilling canyoning expedition through the deep sandstone water Siq',
      'Swim and slide down beautiful natural waterscapes and refreshing waterfalls',
      'Complete professional-grade safety gear and expert canyon guide accompaniment',
      'Premium VIP lounge recovery package post-climb for refreshments and clean changing'
    ],
    highlightsAr: [
      'مسار السيق المائي الممتع والمشوق مع توفير معدات أمان واحترازات حماية كاملة',
      'السباحة والانزلاق الطبيعي الآمن عبر شلالات المحمية ومياهها المتدفقة المنعشة الباردة',
      'مرافقة مرشد مغامرات متخصص ومؤهل لضمان أعلى درجات السلامة والتوجيه الميداني',
      'حزمة نقل خاصة كبار الشخصيات مع توفير مساحة لتبديل الملابس وتقديم مرطبات ومنشفة باردة'
    ],
    bestTime: 'Full Day High-Adventure Wet Trail',
    bestTimeAr: 'يوم كامل للمغامرة الاستثنائية المائية والتشويق العالي',
    description: 'Wadi Mujib is a magnificent, deep canyon where dramatic sandstone cliffs plunge into water-filled gorges, creating an exhilarating canyoning trail that leads to high waterfalls. It is the lowest nature reserve on earth. Royal Ride provides the perfect premium setup: after an exciting day conquering the water trails, step back into a meticulously prepared, pre-cooled luxury vehicle with dry luxury towels, warm premium robes, hot tea or espresso, and complete relaxation on your journey back.',
    descriptionAr: 'مغامرة مائية ممتعة ونشطة داخل وادي السيق الضيق المؤدي للبحر الميت، حيث الشلالات المذهلة تتدفق بين جدران صخرية شاهقة. تضمن لك رويال رايد أرقى خدمات الدعم اللوجستي: فبعد الانتهاء من مغامرتك المشوقة، ستجد سيارتك الفاخرة مبردة ومجهزة بمناشف نظيفة ودافئة مع تقديم مشروبات ساخنة لتنعم برحلة عودة مريحة للغاية.',
    historicalContext: 'The Arnon River gorge of antiquity, dynamic water canyons framing spectacular geological strata.',
    historicalContextAr: 'عرف تاريخياً باسم نهر أرنون العتيق، وهو عبارة عن خوانق مائية معلقة ترسم طبقات جيولوجية بديعة تعود لملايين السنين.'
  }
];

export const getStoredDestinations = (): DestinationNode[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('rr_custom_tourist_destinations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Self-healing: if stored items have duplicate IDs, force reset to TOURIST_DESTINATIONS
          const ids = parsed.map(d => d.id);
          const hasDuplicates = ids.some((val, i) => ids.indexOf(val) !== i);
          if (hasDuplicates) {
            localStorage.removeItem('rr_custom_tourist_destinations');
            return TOURIST_DESTINATIONS;
          }
          // Always synchronize images with TOURIST_DESTINATIONS to ensure the latest compiled assets/overrides are loaded instantly
          let modified = false;
          const updated = parsed.map(dest => {
            let currentImg = dest.image;
            const def = TOURIST_DESTINATIONS.find(d => d.id === dest.id);
            if (def) {
              if (!currentImg || currentImg !== def.image) {
                currentImg = def.image;
                modified = true;
              }
            }
            return { ...dest, image: currentImg };
          });
          if (modified) {
            try {
              localStorage.setItem('rr_custom_tourist_destinations', JSON.stringify(updated));
            } catch (e) {
              console.warn('Failed to sync updated destinations in localStorage:', e);
            }
          }
          return updated;
        }
      } catch (e) {
        // Silently ignore parsing errors
      }
    }
  }
  return TOURIST_DESTINATIONS;
};

export const saveStoredDestinations = (destinations: DestinationNode[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('rr_custom_tourist_destinations', JSON.stringify(destinations));
    } catch (e) {
      console.error('Failed to save customized destinations to localStorage. Quota exceeded or in private mode:', e);
      // Dispatch a custom event to notify components that quota was exceeded
      window.dispatchEvent(new CustomEvent('rr_storage_quota_exceeded', { detail: { error: e } }));
    }
  }
};

export const resetStoredDestinations = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rr_custom_tourist_destinations');
  }
};
