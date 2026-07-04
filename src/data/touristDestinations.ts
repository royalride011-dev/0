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
  image: 'https://images.unsplash.com/photo-1548138014-ab744ad53b43?auto=format&fit=crop&w=1200&q=80',
  highlights: ['Elite customized route planning', 'First-class travel comfort'],
  highlightsAr: ['تخطيط مسار مخصص للنخبة', 'أقصى درجات الراحة والرفاهية أثناء السفر'],
  bestTime: 'Spring & Autumn',
  bestTimeAr: 'فصلي الربيع والخريف',
  description: 'Experience elite luxury transportation to Jordan’s majestic landmarks. Our specialized services guarantee comfort, safety, and cultural guidance for an unparalleled journey.',
  descriptionAr: 'استمتع بخدمات النقل الفاخرة المتميزة إلى معالم الأردن المهيبة. تضمن خدماتنا المتخصصة الراحة والأمان والإرشاد الثقافي لرحلة لا تُنسى.',
};

export const TOURIST_DESTINATIONS: DestinationNode[] = [
  {
    id: 'amman',
    name: 'Amman City',
    nameAr: 'العاصمة عمّان',
    subtitle: 'The Citadel, Amphitheater & Urban Heritage',
    subtitleAr: 'جبل القلعة والمدرج الروماني وعبق العاصمة الحضرية',
    image: images.tourism.amman,
    highlights: [
      'Amman Citadel with Temple of Hercules ruins',
      'Symmetric Roman Amphitheater in historic downtown',
      'Rainbow Street art shops, coffee spots, and galleries',
      'Contrast of modern Abdali Boulevard corporate high-rises'
    ],
    highlightsAr: [
      'جبل القلعة الأثري الشاهد على الحضارات ومعبد هرقل الروماني',
      'المدرج الروماني الأثري في قلب وسط البلد التقليدي العريق',
      'شارع الرينبو الفني بمقاهيه ومحلاته ومعارضه الثقافية الراقية',
      'التباين المعماري الفخم في بوليفارد العبدلي والأبراج التجارية'
    ],
    bestTime: 'Pleasant year-round, especially sunset hours',
    bestTimeAr: 'رائعة ومناسبة طوال العام خاصة في أوقات الغروب والليالي النابضة',
    description: 'Amman is a spectacular white-stone metropolis perched gracefully across historic hills. Under sunset skies, near the nostalgic calls of mosques, its ruins capture the glow of millenniums past, while down below, the modern Boulevard shines in glittering luxury. Navigating these steep winding hills becomes an elegant glide with our professional local chauffeurs managing all the keys to the city.',
    descriptionAr: 'تتربع عاصمتنا عمان الفاتنة بحجرها الأبيض المصقول بشموخٍ وأناقة على تلال تاريخية عريقة. ومع غروب الشمس الدافئ، تكتسي جدران قلعتها الأثرية برداء ذهبي مهيب ينبض بعبق الحضارات المتعاقبة، في حين يتلألأ بوليفارد العبدلي المعاصر كمنارة للرفاهية والحياة العصرية الفخمة. نضمن لك عبر أسطولنا الفاخر وسائقينا المحترفين أعلى درجات السلاسة والراحة الفائقة للانتقال بين تلال المدينة بكل يسر وهيبة.',
    historicalContext: 'Amman\'s history spans over 9,000 years, seeing Ammonite, Greek, Roman, Byzantine and Islamic civilizations. The Citadel, towering above the city, holds relics like the Temple of Hercules and Umayyad Palace. At its foot lies the Roman Theater, a 6,000-seat masterpiece from when the city was known as Philadelphia. Other highlights include King Hussein Mosque, Rainbow Street, and the Jordan Museum. "Historically known as Philadelphia, built across seven hills with a web of steep climbs and modern boulevards offering juxtaposition. Sunset hours the optimal visiting time." - Local Guide Tip',
    historicalContextAr: 'تمتد تاريخ عمان لأكثر من ٩٠٠٠ عام، وشهدت حضارات العمونيين، اليونانيين، الرومان، البيزنطيين، والمسلمين. تضم القلعة الشاهقة آثاراً مثل معبد هرقل والقصر الأموي. وفي أسفلها يقع المدرج الروماني، تحفة فنية من ٦٠٠٠ مقعد من العصر الذي كانت تعرف فيه المدينة باسم فيلادلفيا. تشمل المعالم الأخرى مسجد الملك حسين، شارع الرينبو، ومتحف الأردن. "عرفت تاريخياً باسم فيلادلفيا، بنيت عبر سبع تلال مع شبكة من المرتفعات الشاهقة والشوارع الحديثة التي توفر تباينًا. ساعات الغروب هي الوقت الأمثل للزيارة." - نصيحة مرشد سياحي',
  },
  {
    id: 'petra',
    name: 'Petra',
    nameAr: 'البتراء الورديّة',
    subtitle: 'The Rose Red City & Wonder of the World',
    subtitleAr: 'المدينة الوردية المنحوتة بالصخر وإحدى عجائب الدنيا',
    image: images.tourism.petra,
    highlights: [
      'Al-Khazneh (The Treasury) view',
      'The ancient Siq narrow gorge walk',
      'Ad Deir (The Monastery) trek',
      'Spectacular Petra By Night candlelit shows'
    ],
    highlightsAr: [
      'رؤية مبنى الخزنة المهيب مباشرة',
      'ممر السيق الصخري الضيق والساحر',
      'صعود الدير الأثري الشامخ',
      'عروض البتراء المضيئة ليلاً بالشموع'
    ],
    bestTime: 'Spring (March - May) & Autumn (September - November)',
    bestTimeAr: 'الربيع (مارس - مايو) والخريف (سبتمبر - نوفمبر)',
    description: 'Feel the breathless whisper of ancient history as you step through the cool, shadowed Siq, sudden shafts of golden sunlight illuminating the monumental rose-red sandstone of Al-Khazneh. Petra is not merely viewed; it is felt. Carved into the living rock with timeless Arab Nabataean precision, it evokes profound awe. Our private carriage delivers you rested, pampered, and prepared to experience this glorious world wonder in supreme peace and quiet.',
    descriptionAr: 'اشعر بوقع التاريخ الخالد وانسجام حواسك وأنت تخطو عبر أسرار ممر السيق البارد لتنعم عيناك بمشهد الخزنة المهيب وهو يشرق تحت أشعة الشمس الذهبية الدافئة. البتراء ليست مجرد معالم تزورها، بل تجربة حسية فريدة تعيد رسم شغفك بالحضارة والجمال. يضمن لك أسطولنا الملوكي الخاص الانتقال بهدوء لا يُعكَّر صفوُه، لتصل بكامل نشاطك الذهني والبدني مستمتعاً بنسمات العبقرية النبطية دون أدنى إرهاق.',
    historicalContext: 'Capital of the Nabataean Kingdom, a bustling commercial trade hub connecting Arab silk routes, Egypt, and India.',
    historicalContextAr: 'كانت عاصمة الإمبراطورية النبطية المهيبة، ومركزًا تجاريًا يربط طرق الحرير والتبادل التجاري بين شبه الجزيرة العربية ومصر والهند.'
  },
  {
    id: 'wadirum',
    name: 'Wadi Rum',
    nameAr: 'وادي رم (وادي القمر)',
    subtitle: 'The Valley of the Moon & Cinematic Oasis',
    subtitleAr: 'صحراء وادي القمر المهيبة والطبيعة الخالدة',
    image: images.tourism.wadirum,
    highlights: [
      'Red desert sand dunes and dramatic sandstone key arches',
      'Authentic Bedouin camp culinary experiences',
      'Staggering cosmos stargazing in pitch black sky',
      'Cinematic Mars landscapes (famous filming spots)'
    ],
    highlightsAr: [
      'الكثبان الرملية الحمراء والأقواس الصخرية الشامخة',
      'تجربة الضيافة البدوية العريقة وعشاء الزرب الشهير',
      'تأمل النجوم والمجرة الساحرة في سماء صافية وحالكة',
      'مشاهدة مواقع تصوير أشهر الأفلام السينمائية العالمية'
    ],
    bestTime: 'Spring (March - May) & Winter nights for astronomy',
    bestTimeAr: 'الربيع وأوقات الخريف، وليالي الشتاء لهواة الفلك والأرصاد',
    description: 'Immerse your senses in a silent crimson ocean of timeless desert sands, where colossal mountains of pure sandstone rise out of the dunes to script a Martian masterpiece. At night, feel the cool desert breeze and touch the infinite cosmos under a dome of brilliant, whispering stars. Traveling in our climate-isolated 4x4 SUVs transforms this rugged epic journey into a cradle of seamless, peaceful rest.',
    descriptionAr: 'انغمس بكل حواسك في محيط قرمزي صامت وبديع من الرمال الذهبية اللامتناهية، حيث ترتفع الجبال الصخرية الشامخة لتكتب لوحة مريخية تأسر الوجدان والذهن. وفي المساء، تنفس نسمات الصحراء العليلة وتواصل مع النجوم البراقة الهامسة في سماء صافية. محركاتنا ذات الدفع الرباعي الفاخرة تحول الرحلة الشاقة إلى واحة غامرة بالدلال والاسترخاء التام.',
    historicalContext: 'Home to ancient Thamudic rock inscriptions, nomadic Bedouin routes, and the historic base of Lawrence of Arabia.',
    historicalContextAr: 'موطن النقوش الثمودية القديمة، ومسارات البدو الرحل، والمقر التاريخي للورنس العرب خلال الثورة العربية الكبرى.'
  },
  {
    id: 'deadsea',
    name: 'The Dead Sea',
    nameAr: 'البحر الميت',
    subtitle: 'The Lowest Point on Earth & Premier Wellness Haven',
    subtitleAr: 'أخفض بقعة على سطح الأرض وملاذ الاسترخاء الاستشفائي الأول',
    image: images.tourism.deadsea,
    highlights: [
      'Effortless floating in hyper-saline waters',
      'Rich mineral healing black mud treatments',
      'Ultra-oxygenated air and tranquil seaside view',
      'Five-star international spas and luxury resorts'
    ],
    highlightsAr: [
      'تجربة الطفو الممتعة فوق مياه شديدة الملوحة بدون أي مجهود',
      'العلاج بالطين الأسود الغني بالمعادن الطبيعية النادرة والمغنيسيوم',
      'الهواء النقي الغني بالأكسجين الطبيعي والأجواء الدافئة المهدئة',
      'أفخم المنتجعات العلاجية العالمية والفنادق من فئة الخمس نجوم'
    ],
    bestTime: 'Autumn & Winter (October - April) for temperate heat',
    bestTimeAr: 'الخريف والشتاء (أكتوبر - أبريل) حيث المناخ المعتدل والدافئ',
    description: 'Float weightlessly in warm, hyper-saline waters, cocooned by the super-oxygenated air of earth’s lowest sanctuary. Feel your skin instantly rejuvenate with the silky embrace of ancient mineral-rich black therapeutic mud, while watching the sun paint the salt-caked shores in soft liquid gold. Our continuous standby chauffeur ensures you flow gently from spa relaxation directly to home retreat without touching the worries of navigation.',
    descriptionAr: 'تنعم بطفو مبهج بلا مجهود فوق مياه بحيرة دافئة غنية بالأملاح النادرة، تحتضنك نسمات هواء مشبع بعنصر الأكسجين النقي في أخفض واحة علاجية على وجه البسيطة. اشعر بجلدك يستعيد نضارته وشبابه بلمسات الطين الأسود الغني مع تأمل غروب ملتهب كذهب سائل ينعكس على السطح المالح. يضمن سائقنا الخاص انتقالك بنعومة تامة من الفندق إلى بيتك بمطلق الهدوء.',
    historicalContext: 'A key sanctuary since biblical times, famous for housing King Herod’s historic thermal baths.',
    historicalContextAr: 'شكل ملاذًا علاجيًا فريدًا منذ العصور القديمة، واحتضن الحمامات الساخنة الأثرية للملك هيرودس والعديد من الأباطرة.'
  },
  {
    id: 'aqaba',
    name: 'Aqaba',
    nameAr: 'العقبة',
    subtitle: 'Jordan\'s Red Sea Resort City',
    subtitleAr: 'مدينة العقبة الساحلية ومنتجع الأردن الأول على البحر الأحمر',
    image: images.tourism.aqaba,
    highlights: [
      'Red Sea Beaches',
      'Snorkeling and Scuba Diving',
      'Aqaba Marine Park',
      'Ayla Archaeological Site',
      'Aqaba Fort'
    ],
    highlightsAr: [
      'شواطئ البحر الأحمر',
      'الغوص والغطس',
      'منتزه العقبة البحري',
      'موقع آيلة الأثري',
      'قلعة العقبة'
    ],
    bestTime: 'Late fall through early spring for warm, sunny days',
    bestTimeAr: 'من أواخر الخريف حتى أوائل الربيع لأيام دافئة ومشمسة',
    description: 'Aqaba, Jordan\'s only coastal city, is a vibrant beach resort and bustling seaport on the Red Sea. With its warm, clear waters and thriving coral reefs, Aqaba is a paradise for snorkelers, divers, and beach lovers. The city also boasts a rich history, with the ruins of the ancient Islamic city of Ayla and the imposing Aqaba Fort testifying to its strategic importance over the centuries. Today, modern Aqaba offers a relaxed atmosphere, seaside cafes, and a range of water sports, making it a perfect spot for a Red Sea holiday.',
    descriptionAr: 'العقبة، مدينة الأردن الساحلية الوحيدة، هي منتجع شاطئي نابض بالحياة وميناء صاخب على البحر الأحمر. بفضل مياهها الدافئة والصافية وشعابها المرجانية المزدهرة، تُعد العقبة جنة لمحبي الغطس والغوص وعشاق الشاطئ. كما تتمتع المدينة بتاريخ غني، حيث تشهد أطلال مدينة آيلة الإسلامية القديمة وقلعة العقبة الشاهقة على أهميتها الاستراتيجية عبر القرون. اليوم، توفر العقبة الحديثة أجواء مريحة ومقاهي ساحلية ومجموعة من الرياضات المائية، مما يجعلها مكاناً مثالياً لقضاء عطلة على البحر الأحمر.',
    historicalContext: 'Aqaba\'s history is marked by its strategic location. Ancient Ayla was a major Islamic port city, and the Aqaba Fort stands as a testament to its long defense history. Insider Tip: "For a unique diving experience, don\'t miss the underwater military museum, where decommissioned tanks, troop carriers, and a helicopter have been sunk to create an artificial reef. On land, catch a breathtaking sunset over the Gulf of Aqaba from the top of Jabal Umm Nusayla."',
    historicalContextAr: 'تميز تاريخ العقبة بموقعها الاستراتيجي. كانت آيلة القديمة مدينة ساحلية إسلامية رئيسية، وتقف قلعة العقبة شاهداً على تاريخها الدفاعي الطويل. نصيحة من السكان: "لتجربة غوص فريدة، لا تفوت زيارة المتحف العسكري تحت الماء، حيث تم إغراق دبابات وناقلات جنود وطائرة هليكوبتر قديمة لإنشاء شعاب مرجانية اصطناعية. وعلى الأرض، استمتع بغروب الشمس الخلاب فوق خليج العقبة من قمة جبل أم نصيلة."'
  },
  {
    id: 'jerash',
    name: 'Jerash',
    nameAr: 'جرش الأثرية',
    subtitle: 'The Pompeii of the East',
    subtitleAr: 'بومبي الشرق والروعة الرومانية',
    image: images.tourism.jerash,
    highlights: [
      "Hadrian's Arch",
      "Oval Plaza",
      "Cardo Maximus (Colonnaded Street)",
      "Temple of Artemis",
      "South Theater",
      "Nymphaeum Public Fountain",
      "Hippodrome"
    ],
    highlightsAr: [
      "قوس هادريان",
      "الساحة البيضاوية",
      "شارع الأعمدة (الكاردو)",
      "معبد أرتميس",
      "المسرح الجنوبي",
      "سبيل الحوريات",
      "ميدان السباق (الهيبودروم)"
    ],
    bestTime: 'Spring and Fall for mild weather and lush vegetation',
    bestTimeAr: 'الربيع والخريف لاعتدال الطقس وجمال الطبيعة',
    description: 'Jerash, historically known as Gerasa, is one of the best-preserved Roman cities outside of Italy. Located just 50 kilometers north of Amman, this ancient wonder showcases the grandeur and ingenuity of Roman urban planning. From the monumental Hadrian\'s Arch to the iconic Oval Plaza, colonnaded streets, hilltop temples, and the imposing Hippodrome, Jerash transports visitors back to the height of the Roman Empire. Its extraordinary state of preservation has earned it the nickname "Pompeii of the East."',
    descriptionAr: 'جرش، المعروفة تاريخياً باسم جراسا، هي واحدة من أفضل المدن الرومانية المحفوظة خارج إيطاليا. تقع على بعد 50 كيلومتراً فقط شمال عمان، وتجسد هذه الأعجوبة القديمة عظمة وبراعة التخطيط العمراني الروماني. من قوس هادريان التذكاري إلى الساحة البيضاوية الأيقونية، وشوارع الأعمدة، والمعابد الواقعة على التلال، والميدان المهيب (الهيبودروم)، تأخذ جرش الزوار في رحلة إلى ذروة الإمبراطورية الرومانية. وقد أكسبها وضعها الاستثنائي للحفاظ عليها لقب "بومبي الشرق".',
    historicalContext: 'Founded by Alexander the Great in the 4th century BC, Jerash reached its zenith as a thriving trade center under Roman rule in the 1st century AD. The city was a member of the Decapolis, a prosperous group of ten Greco-Roman cities. Many of its architectural marvels, such as the Temple of Artemis and the South Theater, were constructed during this golden age. Despite facing earthquakes and invasions over the centuries, much of the original city remains intact, offering a rare window into ancient Roman life. Archaeology Enthusiast Tip: Don\'t miss the daily reenactments of Roman legion drills and chariot races at the Hippodrome. The South Theater also hosts enchanting musical performances that showcase the incredible acoustics of ancient Roman design.',
    historicalContextAr: 'تأسست على يد الإسكندر الأكبر في القرن الرابع قبل الميلاد، ووصلت جرش إلى ذروتها كمركز تجاري مزدهر تحت الحكم الروماني في القرن الأول الميلادي. كانت المدينة عضواً في الديكابوليس، وهي مجموعة مزدهرة من عشر مدن يونانية-رومانية. تم بناء العديد من عجائبها المعمارية، مثل معبد أرتميس والمسرح الجنوبي، خلال هذا العصر الذهبي. وعلى الرغم من تعرضها للزلازل والغزوات على مر القرون، لا يزال جزء كبير من المدينة الأصلية سليماً، مما يوفر نافذة نادرة على الحياة الرومانية القديمة. نصيحة لعشاق الآثار: لا تفوتوا إعادة تمثيل التدريبات العسكرية الرومانية وسباقات العربات اليومية في الهيبودروم. كما يستضيف المسرح الجنوبي عروضاً موسيقية ساحرة تبرز الصوتيات المذهلة للتصميم الروماني القديم.'
  },
  {
    id: 'damascus',
    name: 'Damascus, Syria',
    nameAr: 'دمشق، سوريا',
    subtitle: 'The Eternal Umayyad City & Jasmine Oasis',
    subtitleAr: 'الشام أقدم مدينة مأهولة بالتاريخ وواحة الياسمين',
    image: images.tourism.damascus,
    highlights: [
      'Historic Souq al-Hamidiyya and spice stalls',
      'Umayyad Mosque gold-leaf mosaics and shrine',
      'Ancient City of Damascus medieval architecture',
      'Authentic Damascene fine dining and sweet treats'
    ],
    highlightsAr: [
      'سوق الحميدية التاريخي الشامخ ومحلات التوابل العطرية',
      'الجامع الأموي الكبير بفسيفسائه الذهبية الخلابة وضريحه التاريخي',
      'حارات دمشق القديمة وهندستها المعمارية العريقة والجميلة',
      'المطاعم الدمشقية العريقة وتناول البوظة الشامية التقليدية بالدق'
    ],
    bestTime: 'Autumn (September - November) & Spring for gentle weather',
    bestTimeAr: 'الخريف والربيع لاعتدال الطقس وجمال الأجواء الشامية الفاتنة',
    description: 'Travel with complete border protocol and seamless transit assistance into the beating heart of Damascus, the oldest continuously inhabited capital in history. Breathe the delicate fragrance of Damascus jasmine blending with historic spices of Souq al-Hamidiyya, leading to the breathtaking gold-leaf mosaics of the Grand Umayyad Mosque. Our specialized handlers secure all permits, ensuring your land transit is as peaceful as a royal procession.',
    descriptionAr: 'سافر بدعم بروتوكولي وتسهيلات حدودية كاملة لاستكشاف قلب دمشق النابض، أقدم عاصمة مأهولة في التاريخ. تنشق رائحة ياسمين الشام الزكية الممتزجة بالتوابل العريقة في سوق الحميدية الذي يفضي بك للجامع الأموي الكبير بفسيفسائه الذهبية الخلابة. ينسق سائقنا الخاص جميع تصاريح المرور والمعابر لتستريح بسلام.',
    historicalContext: 'A legendary Silk Road trade capital, and key center of the Umayyad caliphate ruling across historical dynasties.',
    historicalContextAr: 'شكلت عاصمة الخلافة الأموية الأم ومركزاً استراتيجياً متأصلاً على طريق الحرير تجارياً وثقافياً طوال آلاف السنين.'
  },
  {
    id: 'beirut',
    name: 'Beirut, Lebanon',
    nameAr: 'بيروت، لبنان',
    subtitle: 'The Paris of the Middle East',
    subtitleAr: 'باريس الشرق وأيقونة الجمال والثقافة الساحلية',
    image: images.tourism.beirut,
    highlights: [
      'National Museum of Beirut',
      'Sursock Museum',
      'Pigeon Rocks (Raouché)',
      'Beirut Souks',
      'Mohammad Al-Amin Mosque',
      'Martyrs\' Square',
      'Beit Beirut Museum'
    ],
    highlightsAr: [
      'المتحف الوطني في بيروت',
      'متحف سرسق',
      'صخرة الروشة',
      'أسواق بيروت',
      'جامع محمد الأمين',
      'ساحة الشهداء',
      'متحف بيت بيروت'
    ],
    bestTime: 'Late fall through early spring for warm, sunny days',
    bestTimeAr: 'من أواخر الخريف حتى أوائل الربيع لأيام دافئة ومشمسة',
    description: 'Beirut, the vibrant capital of Lebanon, is a city where ancient history meets modern sophistication. Known as the "Paris of the Middle East," Beirut is famous for its stunning Mediterranean coastline, world-class cuisine, and nightlife. From the historic Downtown district to the trendy neighborhoods of Gemmayzeh and Mar Mikhael, Beirut offers a captivating blend of old and new. Despite its turbulent past, the city remains a cultural and intellectual hub, with a thriving arts scene and a cosmopolitan atmosphere.',
    descriptionAr: 'بيروت، عاصمة لبنان النابضة بالحياة، هي مدينة يلتقي فيها التاريخ القديم بالرقي الحديث. تُعرف بيروت بـ "باريس الشرق"، وتشتهر بساحلها المذهل على البحر المتوسط، ومأكولاتها ذات المستوى العالمي، والحياة الليلية. من منطقة وسط المدينة التاريخية إلى أحياء الجميزة ومار مخايل العصرية، تقدم بيروت مزيجاً آسراً من القديم والجديد. على الرغم من ماضيها المضطرب، تظل المدينة مركزاً ثقافياً وفكرياً، مع مشهد فني مزدهر وأجواء عالمية.',
    historicalContext: 'Beirut has a long history of resilience, having rebuilt itself many times after conflicts. The city\'s Downtown area, once devastated by civil war, has been beautifully restored and now features elegant Ottoman and French-mandate era buildings housing chic cafes, galleries, and boutiques. The city\'s cultural life has also undergone a remarkable revival, with numerous festivals, exhibitions, and performances taking place throughout the year.',
    historicalContextAr: 'تتمتع بيروت بتاريخ طويل من الصمود، حيث أعادت بناء نفسها مرات عديدة بعد الصراعات. وقد تم ترميم منطقة وسط المدينة بشكل جميل، وهي الآن تضم مباني أنيقة تعود إلى العهد العثماني والانتداب الفرنسي، وتضم مقاهٍ ومعارض ومتاجر عصرية. كما شهدت الحياة الثقافية في المدينة نهضة ملحوظة، مع إقامة العديد من المهرجانات والمعارض والعروض على مدار العام.'
  },
  {
    id: 'ajloun',
    name: 'Ajloun',
    nameAr: 'عجلون',
    subtitle: 'Highlands of History and Nature',
    subtitleAr: 'مرتفعات التاريخ والطبيعة',
    image: images.tourism.ajloun,
    highlights: [
      'Ajloun Castle',
      'Ajloun Forest Reserve',
      'Mar Elias Church',
      'Orjan Village',
      'Tell Mar Elias Archaeological Site',
      'Zubia Lookout Point'
    ],
    highlightsAr: [
      'قلعة عجلون',
      'محمية غابات عجلون',
      'كنيسة مار إلياس',
      'قرية عرجان',
      'موقع تل مار إلياس الأثري',
      'نقطة إطلالة زوبيا'
    ],
    bestTime: 'Spring for wildflowers and Fall for mild temperatures',
    bestTimeAr: 'الربيع للأزهار البرية والخريف لاعتدال درجات الحرارة',
    description: 'Nestled in the highlands of northern Jordan, Ajloun is a scenic region known for its lush forests, rolling hills, and historic castles. The area offers a refreshing escape from the heat of the lowlands, with opportunities for hiking, picnicking, and exploring ancient ruins. Ajloun\'s star attraction is the 12th-century Ajloun Castle, a stunning example of medieval Arab-Islamic military architecture. The region is also home to the Ajloun Forest Reserve, a protected area of Mediterranean evergreen oak forests and a haven for hikers and nature lovers.',
    descriptionAr: 'تقع عجلون في مرتفعات شمال الأردن، وهي منطقة خلابة تشتهر بغاباتها الوارفة وتلالها المتموجة وقلاعها التاريخية. توفر المنطقة ملاذاً منعشاً من حرارة الأراضي المنخفضة، مع فرص للمشي لمسافات طويلة، والنزهات، واستكشاف الآثار القديمة. منطقة الجذب الرئيسية في عجلون هي قلعة عجلون التي يعود تاريخها إلى القرن الثاني عشر، وهي مثال مذهل على العمارة العسكرية العربية الإسلامية في العصور الوسطى. كما تضم المنطقة محمية غابات عجلون، وهي منطقة محمية من غابات البلوط دائمة الخضرة المتوسطية وملاذ للمتنزهين ومحبي الطبيعة.',
    historicalContext: 'Perched atop Jabal Auf, the Ajloun Castle was built in 1184 AD by Izz al-Din Usama, a general of Saladin, to protect the region from Crusader attacks. The castle offers a fascinating blend of Arab, Byzantine, and Crusader architectural styles. Visitors can explore its towers, chambers, and galleries, and enjoy breathtaking views of the Jordan Valley and the Sea of Galilee from its hilltop position. Insider Tip: "For a taste of local hospitality, visit the nearby Orjan Village, where you can enjoy traditional Arabic food and learn about the production of olive oil and soap, crafts that Ajloun is famous for."',
    historicalContextAr: 'تقع قلعة عجلون فوق جبل عوف، وقد بُنيت عام 1184م على يد عز الدين أسامة، أحد قادة صلاح الدين الأيوبي، لحماية المنطقة من هجمات الصليبيين. تقدم القلعة مزيجاً رائعاً من الأساليب المعمارية العربية والبيزنطية والصليبية. يمكن للزوار استكشاف أبراجها وغرفها ومعارضها، والاستمتاع بإطلالات خلابة على غور الأردن وبحيرة طبريا من موقعها فوق التلة. نصيحة من السكان: "لتذوق كرم الضيافة المحلية، قم بزيارة قرية عرجان القريبة، حيث يمكنك الاستمتاع بالطعام العربي التقليدي والتعرف على إنتاج زيت الزيتون والصابون، وهي الحرف التي تشتهر بها عجلون."'
  }
];

export const getStoredDestinations = (): DestinationNode[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('rr_custom_tourist_destinations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Sync stale images with TOURIST_DESTINATIONS if defaults have newer/different regenerated images
          let modified = false;
          const updated = parsed.map(dest => {
            let currentImg = dest.image;
            const def = TOURIST_DESTINATIONS.find(d => d.id === dest.id);
            if (def) {
              if (!currentImg || currentImg.includes('.png') || currentImg.includes('/src/') || (currentImg.includes('regenerated_image_') && def.image !== currentImg)) {
                currentImg = def.image;
                modified = true;
              }
            }
            return { ...dest, image: currentImg };
          });
          if (modified) {
            localStorage.setItem('rr_custom_tourist_destinations', JSON.stringify(updated));
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
    localStorage.setItem('rr_custom_tourist_destinations', JSON.stringify(destinations));
  }
};

export const resetStoredDestinations = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rr_custom_tourist_destinations');
  }
};
