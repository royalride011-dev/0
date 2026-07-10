import { useState, useEffect } from 'react';
import { Star, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface GoogleReviewItem {
  id: number;
  name: string;
  nameAr: string;
  avatar: string;
  avatarColor: string;
  text: string;
  textAr: string;
  date: string;
  rating: number;
}

const GOOGLE_REVIEWS_LIST: GoogleReviewItem[] = [
  {
    id: 1,
    name: "Youssef Al-Fayez",
    nameAr: "يوسف الفايز",
    avatar: "Y",
    avatarColor: "bg-[#4285F4]", // Google Blue
    text: "Absolute VIP experience in Amman. The car was spotless, chauffeur arrived 15 mins early. 10/10 recommendation!",
    textAr: "خدمة كبار شخصيات حقيقية وممتازة في عمان. السيارة كانت في غاية النظافة والترتيب، والسائق وصل قبل الموعد بـ 15 دقيقة. أنصح بهم بشدة!",
    date: "A week ago",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. Catherine Howard",
    nameAr: "د. كاثرين هاوارد",
    avatar: "C",
    avatarColor: "bg-[#EA4335]", // Google Red
    text: "Excellent service from Queen Alia Airport to Dead Sea. The Mercedes van was premium with fast Wi-Fi.",
    textAr: "خدمة ممتازة ومريحة من مطار الملكة علياء الدولي إلى منتجعات البحر الميت. سيارة المرسيدس فان كانت قمة في الفخامة مع إنترنت سريع جداً.",
    date: "2 weeks ago",
    rating: 5
  },
  {
    id: 3,
    name: "Majed Al-Shammari",
    nameAr: "ماجد الشمري",
    avatar: "M",
    avatarColor: "bg-[#FBBC05]", // Google Yellow
    text: "Used Royal Ride for cross-border trip to Lebanon. Smooth customs assistance and highly safe driving.",
    textAr: "تعاملت مع رويال رايد لرحلة دولية إلى لبنان. المساعدة عند الحدود كانت سريعة جداً وتسهيلات مذهلة، والقيادة آمنة ومريحة للغاية.",
    date: "3 weeks ago",
    rating: 5
  },
  {
    id: 4,
    name: "Karim Masri",
    nameAr: "كريم المصري",
    avatar: "K",
    avatarColor: "bg-[#34A853]", // Google Green
    text: "The definitive best chauffeur agency in Jordan! Friendly English speaking crew and immaculate hospitality.",
    textAr: "بلا شك أفضل مكتب لتأجير السيارات الفاخرة مع سائق في الأردن! طاقم عمل ودود يتحدث الإنجليزية وبشاشة مميزة وضيافة راقية جداً.",
    date: "1 month ago",
    rating: 5
  },
  {
    id: 5,
    name: "Sophia Lindqvist",
    nameAr: "صوفيا ليندكفيست",
    avatar: "S",
    avatarColor: "bg-[#4285F4]", // Google Blue
    text: "Fabulous customized Petra trip. Our driver was extremely polite and acted as our trusted local concierge.",
    textAr: "رحلة رائعة ومخصصة بالكامل إلى البتراء الساحرة. كان سائقنا مهذباً للغاية وقام بدور المستشار والدليل السياحي الموثوق لنا طوال الوقت.",
    date: "Just recently",
    rating: 5
  }
];

export default function GoogleReviews3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Manual transition only as requested
  useEffect(() => {
    // Left empty to prevent auto rotation, carousel is now fully manual
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % GOOGLE_REVIEWS_LIST.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + GOOGLE_REVIEWS_LIST.length) % GOOGLE_REVIEWS_LIST.length);
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-royal-navy-950 via-royal-navy-900 to-royal-navy-950 overflow-hidden border-b border-champagne-gold-500/10">
      
      {/* Visual Google Grid pattern & colored lights */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#4285F4]/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#34A853]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Google Heading Brand Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-[#4285F4] font-bold text-xl font-sans">G</span>
            <span className="text-[#EA4335] font-bold text-xl font-sans">o</span>
            <span className="text-[#FBBC05] font-bold text-xl font-sans">o</span>
            <span className="text-[#4285F4] font-bold text-xl font-sans">g</span>
            <span className="text-[#34A853] font-bold text-xl font-sans">l</span>
            <span className="text-[#EA4335] font-bold text-xl font-sans">e</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-champagne-gold-400 ml-3">
              ★ Verified Golden Rating
            </span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-gradient">
            آراء وتقييمات عملائنا الكرام على قوقل
          </h2>
          <p className="font-sans text-xs text-champagne-gold-100/60 mt-2 max-w-xl mx-auto leading-relaxed">
            شهادات حيّة وتجارب صممت بعناية لضيوفنا النخبة المسافرين عبر الأردن والشرق الأوسط.
          </p>
        </div>

        {/* 3D Visual Carousel Presentation Arena */}
        <div 
          className="relative h-[320px] sm:h-[350px] flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-[480px] h-[220px] sm:h-[240px] transform-style-3d">
            {GOOGLE_REVIEWS_LIST.map((review, idx) => {
              // Calculate spatial displacement to construct true 3D look
              const length = GOOGLE_REVIEWS_LIST.length;
              const offset = (idx - currentIndex + length) % length;
              
              // Define positioning values based on circular distance
              let zIndex = 10 - Math.abs(offset);
              let active = offset === 0;
              let scale = active ? 1 : 0.82;
              let opacity = active ? 1 : 0.45;
              
              // Left / Right / hidden logic
              let rotateY = 0;
              let translateX = 0;
              let translateZ = 0;

              if (offset === 0) {
                rotateY = 0;
                translateX = 0;
                translateZ = 120; // Bring card forward
              } else if (offset === 1 || offset === -4) {
                // First card to the right
                rotateY = -28;
                translateX = window.innerWidth < 640 ? 110 : 220;
                translateZ = 20;
              } else if (offset === length - 1 || offset === -1) {
                // First card to the left
                rotateY = 28;
                translateX = window.innerWidth < 640 ? -110 : -220;
                translateZ = 20;
              } else {
                // Background cards hidden or extremely small
                opacity = 0.08;
                scale = 0.6;
                translateZ = -150;
                if (offset === 2) {
                  translateX = 340;
                } else {
                  translateX = -340;
                }
              }

              return (
                <div
                  key={review.id}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex: zIndex,
                    opacity: opacity,
                    transition: 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className={`absolute left-0 right-0 mx-auto top-0 bottom-0 text-left p-6 sm:p-7 rounded border bg-royal-navy-950 font-sans flex flex-col justify-between cursor-pointer select-none card-shadow max-w-[320px] sm:max-w-full gold-tactile ${
                    active 
                      ? 'border-champagne-gold-500/50 shadow-2xl shadow-champagne-gold-500/10' 
                      : 'border-royal-navy-800'
                  }`}
                  onClick={() => {
                    if (!active) {
                      setCurrentIndex(idx);
                    }
                  }}
                >
                  {/* Top Quote Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      
                      {/* Avatar Circle with initials */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-serif font-bold text-sm uppercase shadow`}>
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="font-serif text-xs font-bold text-champagne-gold-100 flex items-center space-x-1">
                            <span>{review.name}</span>
                          </h4>
                          <span className="text-[10px] text-champagne-gold-400 font-serif font-light block leading-none mt-0.5">
                            {review.date}
                          </span>
                        </div>
                      </div>

                      {/* Luxurious Google Maps label Badge instead of standard robotic text */}
                      <div className="flex items-center space-x-1 text-[9px] font-serif uppercase tracking-wider text-champagne-gold-400 bg-royal-navy-900 px-2 py-0.5 rounded border border-champagne-gold-500/20">
                        <span className="text-white hover:text-champagne-gold-300 transition-colors">مراجعة معتمدة</span>
                      </div>
                    </div>

                    {/* Highly aesthetic golden stars with delicate glows */}
                    <div className="flex space-x-1 text-[#FBBC05] my-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current filter drop-shadow-[0_0_2px_rgba(251,188,5,0.6)]" />
                      ))}
                    </div>

                    {/* Both English & Arabic text blocks carefully presented for international audience */}
                    <div className="space-y-2">
                      <p className="text-[11px] sm:text-xs text-champagne-gold-100/90 leading-relaxed font-light block">
                        "{review.text}"
                      </p>
                      <div className="champagne-border-accent opacity-30 my-1" />
                      <p className="text-[11px] sm:text-xs text-champagne-gold-300 font-serif italic direction-rtl text-right leading-relaxed block">
                        "{review.textAr}"
                      </p>
                    </div>
                  </div>

                  {/* High society signature status line and verified marker */}
                  <div className="pt-2 border-t border-royal-navy-900/60 flex items-center justify-between text-[8px] font-serif tracking-widest text-champagne-gold-500 uppercase">
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-champagne-gold-400" />
                      Royal VIP Experience Guest
                    </span>
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5 fill-current text-royal-navy-950" />
                      تميز معتمد
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Carousel Navigation slide bullet indicators */}
        <div className="flex justify-center space-x-1.5 mt-2">
          {GOOGLE_REVIEWS_LIST.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-6 bg-gradient-to-r from-champagne-gold-400 to-champagne-gold-600 shadow-sm shadow-champagne-gold-500/50' 
                  : 'w-2 bg-royal-navy-800 hover:bg-champagne-gold-500/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
