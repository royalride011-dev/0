import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, ClipboardCheck } from 'lucide-react';
import { LazyImage } from './LazyImage';
import ShimmerHoverEffect from './ShimmerHoverEffect';
import { useLanguage } from '../LanguageContext';
import { images } from '../imageRegistry';

interface Article {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  contentEn: string[];
  contentAr: string[];
  tags: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'vip-airport-protocol',
    titleEn: 'The Ultimate VIP Executive Protocol Guide: Queen Alia Airport (AMM) Arrival & Baggage Logistics',
    titleAr: 'دليل بروتوكولات الاستقبال الفاخر بمطار الملكة علياء الدولي للأمراء ورجال الأعمال',
    excerptEn: 'Navigating airport arrival protocols can be daunting, especially for VIP executives. At Royal Ride Jordan, we ensure a seamless experience from touchdown to departure.',
    excerptAr: 'تخطى إجراءات المطار المعقدة مع خدمات الاستقبال والترحيب الفاخرة من رويال رايد.',
    category: 'Airport Protocols',
    author: 'Mariam Kawar (Guest Relations)',
    date: 'June 30, 2026',
    readTime: '6 min read',
    image: images.blog.airportVipLogistics,
    tags: ['AMM Airport', 'VIP Meet', 'Executive Travel', 'Amman'],
    contentEn: [
      'Navigating airport arrival protocols can be daunting, especially for VIP executives. At Royal Ride Jordan, we ensure a seamless experience from touchdown to departure.',
      'Our expert guides meet you at the gate, fast-track you through customs, and handle all baggage logistics. Sit back, relax, and let us take care of the details.'
    ],
    contentAr: [
      'تخطى إجراءات المطار المعقدة مع خدمات الاستقبال والترحيب الفاخرة من رويال رايد.',
      'موظفونا المحترفون يستقبلونك عند البوابة، يسهلون إجراءات الجمارك، ويهتمون بكافة تفاصيل أمتعتك. استرخِ ودعنا نعتني بالتفاصيل.'
    ]
  },
  {
    id: 'jordan-luxury-itinerary',
    titleEn: 'Conquering the Wonders of Jordan: A Bespoke Itinerary to Petra, Wadi Rum, and the Dead Sea',
    titleAr: 'رحلة الأحلام الفاخرة عبر الأردن: دليل زيارة البتراء، وادي رم، والبحر الميت براحة مطلقة',
    excerptEn: 'Jordan is a land of breathtaking beauty and ancient wonders. Our bespoke luxury tours take you on an unforgettable journey.',
    excerptAr: 'اكتشف روعة المدن الأثرية القديمة ورمال الصحراء وصحراء وادي رم الحمراء مع سائق خاص خبير.',
    category: 'Travel Guides',
    author: 'Faris Haddad (Lead Chauffeur)',
    date: 'June 30, 2026',
    readTime: '8 min read',
    image: images.blog.jordanPetraItinerary,
    tags: ['Petra Guide', 'Dead Sea Luxury', 'Desert Tours', 'Wadi Rum'],
    contentEn: [
      'Jordan is a land of breathtaking beauty and ancient wonders.',
      'Our bespoke luxury tours take you on an unforgettable journey to the rose-red city of Petra, the stunning desert landscapes of Wadi Rum, and the healing waters of the Dead Sea. With Royal Ride Jordan, you\'ll experience these treasures in unparalleled comfort and style.'
    ],
    contentAr: [
      'الأردن أرض الجمال الخلاب والعجائب القديمة.',
      'جولاتنا الفاخرة والمصممة خصيصاً تأخذك في رحلة لا تُنسى إلى البتراء، ومناظر وادي رم الصحراوية المذهلة، ومياه البحر الميت العلاجية. مع رويال رايد، ستختبر هذه الكنوز براحة وأناقة لا مثيل لهما.'
    ]
  },
  {
    id: 'cross-border-transportation',
    titleEn: 'Smooth Cross-Border Chauffeur Operations: Navigating Routes from Jordan to Syria and Lebanon',
    titleAr: 'بروتوكولات النقل عبر الحدود: كيفية السفر البري من الأردن لبيروت ودمشق بسيارات مع سائق',
    excerptEn: 'Regional travel can be complex, but not with Royal Ride Jordan. Our experienced chauffeurs and operations team ensure smooth, safe passage.',
    excerptAr: 'دليل تيسير العبور البري والحدودي الفاخر ورجال الأعمال لضمان السلامة المطلقة.',
    category: 'Cross-Border',
    author: 'Tareq Al-Azam (MD / Founder)',
    date: 'June 30, 2026',
    readTime: '10 min read',
    image: images.blog.crossBorderSyriaLebanon,
    tags: ['Cross-Border', 'Syria Route', 'Beirut VIP', 'Security Travel'],
    contentEn: [
      'Regional travel can be complex, but not with Royal Ride Jordan.',
      'Our experienced chauffeurs and operations team ensure smooth, safe passage from Jordan to key destinations in Syria and Lebanon. We handle all border formalities, transportation logistics, and route planning so you can focus on your journey.'
    ],
    contentAr: [
      'السفر الإقليمي قد يكون معقداً، لكن ليس مع رويال رايد.',
      'سائقونا وفريق عملياتنا يضمنون عبوراً آمناً وسلساً من الأردن إلى وجهات رئيسية في سوريا ولبنان. نحن نتولى كافة الإجراءات الحدودية، لوجستيات النقل، وتخطيط المسارات لتتمكن من التركيز على رحلتك.'
    ]
  },
  {
    id: 'amman-hidden-gems',
    titleEn: 'Amman\'s Hidden Gems: 10 Unique Experiences in Jordan\'s Capital',
    titleAr: 'جواهر عمان الخفية: 10 تجارب فريدة في عاصمة الأردن',
    excerptEn: 'Amman, Jordan\'s vibrant capital, is a city of contrasts - where ancient history meets modern luxury.',
    excerptAr: 'عمان، عاصمة الأردن النابضة بالحياة، مدينة التناقضات - حيث يلتقي التاريخ القديم بالفخامة الحديثة.',
    category: 'City Guides',
    author: 'Mariam Kawar (Guest Relations)',
    date: 'June 30, 2026',
    readTime: '5 min read',
    image: images.blog.airportVipLogistics,
    tags: ['Amman', 'Culture', 'Local Experience'],
    contentEn: [
      'Amman, Jordan\'s vibrant capital, is a city of contrasts - where ancient history meets modern luxury.',
      'Discover 10 hidden gems, from traditional souks to contemporary art galleries, that showcase the best of Amman\'s rich culture and hospitality.'
    ],
    contentAr: [
      'عمان، عاصمة الأردن النابضة بالحياة، مدينة التناقضات - حيث يلتقي التاريخ القديم بالفخامة الحديثة.',
      'اكتشف 10 جواهر خفية، من الأسواق التقليدية إلى معارض الفن المعاصر، التي تعرض أفضل ما في ثقافة عمان الغنية وكرم ضيافتها.'
    ]
  },
  {
    id: 'luxury-fleet',
    titleEn: 'The Royal Ride Jordan Fleet: Luxury Vehicles for Every Occasion',
    titleAr: 'أسطول رويال رايد الأردن: مركبات فاخرة لكل مناسبة',
    excerptEn: 'At Royal Ride Jordan, we pride ourselves on our state-of-the-art fleet of luxury vehicles, meticulously maintained.',
    excerptAr: 'في رويال رايد، نفخر بأسطولنا المتطور من المركبات الفاخرة، التي تتم صيانتها بدقة.',
    category: 'Fleet',
    author: 'Tareq Al-Azam (MD / Founder)',
    date: 'June 30, 2026',
    readTime: '4 min read',
    image: images.blog.crossBorderSyriaLebanon,
    tags: ['Fleet', 'Luxury Cars', 'Transportation'],
    contentEn: [
      'At Royal Ride Jordan, we pride ourselves on our state-of-the-art fleet of luxury vehicles, meticulously maintained to ensure your comfort and safety.',
      'From sleek sedans to spacious SUVs, we have the perfect vehicle for every occasion, whether you\'re attending a business meeting or exploring Jordan\'s iconic sites.'
    ],
    contentAr: [
      'في رويال رايد، نفخر بأسطولنا المتطور من المركبات الفاخرة، التي تتم صيانتها بدقة لضمان راحتك وسلامتك.',
      'من سيارات السيدان الأنيقة إلى سيارات الدفع الرباعي الواسعة، لدينا المركبة المثالية لكل مناسبة، سواء كنت تحضر اجتماع عمل أو تستكشف مواقع الأردن الشهيرة.'
    ]
  }
];

interface BlogProps {
  onBookNowClicked?: () => void;
}

export default function Blog({ onBookNowClicked }: BlogProps) {
  const { language, t, isRtl } = useLanguage();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const selectedArticle = ARTICLES.find(a => a.id === selectedArticleId);

  const handleShare = () => {
    // Copy the simulated share address
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div id="blog" className="relative min-h-screen bg-royal-navy-950 py-24 px-4 sm:px-6 lg:px-8">
      {/* Absolute Graphics */}
      <div className="absolute top-[15%] right-[5%] w-[300px] h-[300px] bg-champagne-gold-500/5 blur-[90px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Blog Intro */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-royal-navy-900 border border-champagne-gold-500/20 px-3 py-1.5 rounded-full mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-champagne-gold-400 mr-1" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-champagne-gold-300">
                    {t('blog.badge')}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-luxury-gradient tracking-tight">
                  {t('blog.title')}
                </h2>
                <p className="font-sans text-sm text-champagne-gold-100/70 max-w-2xl mx-auto leading-relaxed">
                  {t('blog.desc')}
                </p>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {ARTICLES.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col bg-royal-navy-900 border border-champagne-gold-500/5 hover:border-champagne-gold-500/20 rounded overflow-hidden shadow-lg transition-all duration-300 group"
                  >
                    {/* Cover Photo with premium gold borders */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-champagne-gold-500/30 p-0.5 bg-royal-navy-950">
                      <LazyImage
                        src={article.image}
                        alt={`مقالة: ${article.titleEn} من Royal Ride Jordan`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                      />
                      <div className={`absolute top-4 bg-royal-navy-950/80 border border-champagne-gold-500/20 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-champagne-gold-300 uppercase tracking-widest ${isRtl ? 'right-4' : 'left-4'}`}>
                        {article.category}
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="p-6 pt-4 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Meta */}
                        <div className={`flex items-center space-x-3 text-[10px] text-champagne-gold-100/50 font-mono ${isRtl ? 'space-x-reverse justify-start' : ''}`}>
                          <span className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {article.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Heading */}
                        {isRtl ? (
                          <h3 className="font-serif text-lg font-bold text-champagne-gold-100 group-hover:text-champagne-gold-300 transition-colors line-clamp-2 text-right">
                            {article.titleAr}
                          </h3>
                        ) : (
                          <h3 className="font-serif text-lg font-bold text-champagne-gold-100 group-hover:text-champagne-gold-300 transition-colors line-clamp-2">
                            {article.titleEn}
                          </h3>
                        )}

                        <p className={`text-xs text-champagne-gold-100/60 line-clamp-3 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? article.excerptAr : article.excerptEn}
                        </p>
                      </div>

                      {/* Read CTA Button */}
                      <div className={`pt-4 border-t border-royal-navy-800 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[10px] font-sans text-champagne-gold-100/40 flex items-center">
                          <User className={`w-3 h-3 text-champagne-gold-500 ${isRtl ? 'ml-1' : 'mr-1'}`} />
                          {article.author.split(' (')[0]}
                        </span>
                        
                        <button
                          onClick={() => {
                            setSelectedArticleId(article.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center text-xs font-serif text-champagne-gold-300 group-hover:text-champagne-gold-400 font-bold tracking-widest uppercase cursor-pointer"
                        >
                          <span>{language === 'en' ? 'Read Guide' : 'اقرأ الدليل'}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'mr-1.5 rotate-180' : 'ml-1.5'} transition-transform group-hover:translate-x-1`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className={`space-y-8 max-w-4xl mx-auto bg-royal-navy-900 border border-champagne-gold-500/10 rounded-lg p-6 md:p-12 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedArticleId(null)}
                className={`inline-flex items-center text-xs font-serif text-champagne-gold-300 hover:text-white uppercase tracking-widest font-bold cursor-pointer transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
              >
                <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} />
                <span>{t('blog.back')}</span>
              </button>

              {/* Cover Banner with premium gold frame */}
              <div className="relative h-64 md:h-96 rounded overflow-hidden border border-champagne-gold-500/35 p-0.5 shadow-inner bg-royal-navy-950">
                <LazyImage
                  src={selectedArticle.image}
                  alt={`مقالة: ${selectedArticle.titleEn} من Royal Ride Jordan`}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover filter brightness-[0.7] scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-navy-900 via-transparent to-royal-navy-950/60" />
                <div className={`absolute bottom-6 ${isRtl ? 'right-6' : 'left-6'}`}>
                  <span className="inline-block bg-champagne-gold-500 text-royal-navy-950 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded mb-3">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              {/* Article Header Details */}
              <div className="space-y-4 border-b border-royal-navy-800 pb-6">
                <h1 className="font-serif text-2xl md:text-4xl font-bold text-luxury-gradient leading-tight">
                  {isRtl ? selectedArticle.titleAr : selectedArticle.titleEn}
                </h1>

                <div className={`flex flex-wrap items-center gap-4 text-xs font-mono text-champagne-gold-100/50 pt-2 ${isRtl ? 'justify-start space-x-reverse' : ''}`}>
                  <span className="flex items-center">
                    <User className={`w-3.5 h-3.5 text-champagne-gold-500 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                    {language === 'en' ? `By ${selectedArticle.author}` : `بقلم ${selectedArticle.author}`}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className={`w-3.5 h-3.5 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className={`w-3.5 h-3.5 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                    {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Dynamic Content Columns */}
              <div className="space-y-6 font-sans text-sm text-champagne-gold-100/85 leading-relaxed">
                <h3 className={`font-mono text-[10px] text-champagne-gold-400 uppercase tracking-[0.2em] border-champagne-gold-500 p-1 ${isRtl ? 'border-r-2 pr-2' : 'border-l-2 pl-2'}`}>
                  {language === 'en' ? 'Official Protocol Briefing' : 'الموجز والتغطية الفنية'}
                </h3>
                {isRtl ? (
                  selectedArticle.contentAr.map((para, i) => (
                    <p key={i} className="text-right leading-relaxed font-serif text-base">{para}</p>
                  ))
                ) : (
                  selectedArticle.contentEn.map((para, i) => (
                    <p key={i} className="text-left leading-relaxed">{para}</p>
                  ))
                )}
              </div>

              {/* Shared Tags & Actions */}
              <div className={`border-t border-royal-navy-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 ${isRtl ? 'space-x-reverse' : ''}`}>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] font-mono text-champagne-gold-300 bg-royal-navy-950 border border-champagne-gold-500/10 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center px-4 py-2 rounded bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500 text-xs text-champagne-gold-200 cursor-pointer transition-colors"
                  >
                    {shared ? (
                      <>
                        <ClipboardCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                        {language === 'en' ? 'URL Copied!' : 'تم نسخ الرابط!'}
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 mr-1.5 text-champagne-gold-400" />
                        {language === 'en' ? 'Share Article' : 'مشاركة المقال'}
                      </>
                    )}
                  </button>

                  {onBookNowClicked && (
                    <button
                      onClick={onBookNowClicked}
                      tabIndex={0}
                      className="inline-flex items-center px-5 py-2 rounded btn-metallic-gold text-royal-navy-950 font-extrabold text-xs uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(197,168,92,0.45)] cursor-pointer relative overflow-hidden"
                    >
                      {language === 'en' ? 'Inquire / Book Now' : 'حجز واستفسار فوري'}
                      <ShimmerHoverEffect />
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
