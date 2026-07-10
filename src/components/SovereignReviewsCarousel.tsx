import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface ReviewNode {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  text: string;
  date: string;
  dateAr: string;
}

const ALL_VIP_REVIEWS: ReviewNode[] = [
  {
    id: 'rev-1',
    name: 'J E',
    avatar: 'J',
    avatarColor: 'bg-[#103a5c]',
    rating: 5,
    text: "Used them for airport pickup, very happy with their quick response. Booked everything me at the last minute, highly recommend Royal Ride!",
    date: '10 months ago',
    dateAr: 'قبل ١٠ أشهر'
  },
  {
    id: 'rev-2',
    name: 'Mohammad nasir',
    avatar: 'M',
    avatarColor: 'bg-[#a34c1b]',
    rating: 5,
    text: "Used them for an airport run and everything was spot on. The limo showed up right on time, the driver was friendly and professional.",
    date: '10 months ago',
    dateAr: 'قبل ١٠ أشهر'
  },
  {
    id: 'rev-3',
    name: 'Evan Hawse',
    avatar: 'E',
    avatarColor: 'bg-[#1d6fa5]',
    rating: 5,
    text: "Could not have had a better experience with Royal Ride Limousine! They were prompt and took care of all of our transportation needs perfectly.",
    date: '10 months ago',
    dateAr: 'قبل ١٠ أشهر'
  },
  {
    id: 'rev-4',
    name: 'Sarah Jenkins',
    avatar: 'S',
    avatarColor: 'bg-[#0d9488]',
    rating: 5,
    text: "The chauffeur was impeccable. Arrived early at Queen Alia Airport and made the transfer to our hotel in Amman completely effortless. Truly professional service.",
    date: '10 months ago',
    dateAr: 'قبل ١٠ أشهر'
  },
  {
    id: 'rev-5',
    name: 'عبدالله العمري',
    avatar: 'ع',
    avatarColor: 'bg-[#15803d]',
    rating: 5,
    text: "خدمة راقية جداً. السائق كان دقيقاً في الموعد والسيارة كانت فخمة ونظيفة. التعامل كان بمنتهى الاحترافية واللباقة. شكراً رويال رايد.",
    date: '10 months ago',
    dateAr: 'قبل ١٠ أشهر'
  },
  {
    id: 'rev-6',
    name: 'Alessandro Rossi',
    avatar: 'A',
    avatarColor: 'bg-[#b91c1c]',
    rating: 5,
    text: "Servizio eccellente! Il tour di Petra è stato fantastico grazie al nostro autista che conosceva ogni dettaglio storico. Il comfort dell'auto era di un altro livello.",
    date: '10 months ago',
    dateAr: 'قبل ١٠ أشهر'
  }
];

export default function SovereignReviewsCarousel() {
  const { language, isRtl } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine responsive items count
  const [itemsToShow, setItemsToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = ALL_VIP_REVIEWS.length - itemsToShow;
  const actualMaxIndex = maxIndex < 0 ? 0 : maxIndex;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= actualMaxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? actualMaxIndex : prev - 1));
  };

  // Automated calm scrolling interval (every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (isRtl) {
        handlePrev();
      } else {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, actualMaxIndex, itemsToShow, isRtl]);

  // Drag interaction with Framer Motion
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      if (isRtl) handlePrev(); else handleNext();
    } else if (info.offset.x > swipeThreshold) {
      if (isRtl) handleNext(); else handlePrev();
    }
  };

  return (
    <section 
      id="testimonials"
      className="relative py-20 overflow-hidden bg-[#FAF9F6] border-b border-[#C5A85C]/15"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Light elegant decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A85C]/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A85C]/15 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left is Google Stats, Right is Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Google Rating Display */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 pb-6 lg:pb-0">
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-wider text-stone-900 uppercase">
              {isRtl ? 'ممتاز' : 'EXCELLENT'}
            </h3>
            
            {/* Five solid Google gold stars */}
            <div className="flex gap-1 my-3 justify-center lg:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            
            <p className="font-sans font-bold text-sm sm:text-base text-stone-600 mb-5">
              {isRtl ? 'بناءً على 6 تقييمات' : 'Based on 6 reviews'}
            </p>
            
            {/* Beautiful, high-resolution digital display Google logo with premium styling */}
            <div className="flex items-center justify-center lg:justify-start">
              <span className="font-sans font-black tracking-tight text-4xl sm:text-5xl select-none" style={{ fontFamily: '"Cairo", "Inter", sans-serif' }}>
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </div>
          </div>

          {/* Right Column: Carousel of Reviews */}
          <div className="lg:col-span-9 relative flex items-center w-full">
            
            {/* Left navigation arrow floating beautifully */}
            <button
              onClick={isRtl ? handleNext : handlePrev}
              className="absolute left-[-12px] md:left-[-24px] z-20 p-2 rounded-full bg-white border border-stone-200/80 hover:bg-[#FAF9F6] transition-all hover:scale-115 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer text-[#C5A85C]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel Viewport Wrapper */}
            <div 
              ref={containerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="w-full overflow-hidden px-1 py-4 cursor-grab active:cursor-grabbing"
            >
              <motion.div 
                ref={trackRef}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{ 
                  x: -(currentIndex * (100 / itemsToShow)) + "%" 
                }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
                className="flex w-full select-none gap-0"
                style={{ touchAction: 'pan-y' }}
              >
                {ALL_VIP_REVIEWS.map((review, index) => {
                  const isCardActive = index >= currentIndex && index < currentIndex + itemsToShow;
                  
                  return (
                    <div 
                      key={review.id}
                      className="w-full md:w-1/2 xl:w-1/3 shrink-0 px-3 transition-opacity duration-300"
                      style={{ width: `${100 / itemsToShow}%` }}
                    >
                      <motion.div 
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className={`p-6 md:p-7 rounded-2xl border flex flex-col justify-between h-[360px] relative overflow-hidden transition-all duration-300 ${
                          isCardActive 
                            ? 'bg-[#f8f9fa] border-[#C5A85C]/45 shadow-[0_15px_35px_rgba(0,0,0,0.08)] opacity-100 z-10' 
                            : 'bg-[#f1f3f4] border-stone-300/60 shadow-[0_8px_20px_rgba(0,0,0,0.04)] opacity-70'
                        }`}
                      >
                        {/* Upper Header Container */}
                        <div>
                          <div className="flex items-start justify-between w-full">
                            <div className="flex items-center gap-3">
                              {/* Round Colored Letter Avatar */}
                              <div className={`w-11 h-11 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-sans font-bold text-base shadow-sm shrink-0`}>
                                {review.avatar}
                              </div>
                              
                              <div className="min-w-0">
                                <h4 className="font-sans text-sm md:text-base font-bold text-stone-900 truncate leading-tight">
                                  {review.name}
                                </h4>
                                <span className="text-[11px] text-stone-500 font-sans block mt-1 font-medium">
                                  {language === 'ar' ? review.dateAr : review.date}
                                </span>
                              </div>
                            </div>

                            {/* Small Colored G Logo on top right corner */}
                            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                              <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                            </svg>
                          </div>

                          {/* Star Ratings + Blue Circle Verified Badge */}
                          <div className="flex items-center gap-1.5 mt-4">
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                              ))}
                            </div>
                            
                            {/* Blue Verified Checkmark Badge */}
                            <svg viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-[#1c7ced] shrink-0 ml-1" xmlns="http://www.w3.org/2000/svg">
                              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C237.1 346.1 228.8 348 220 348s-17.14-1.875-23.75-8.5l-64-64C125.6 268.9 125.6 258 132.2 251.4S149.1 244.1 155.8 251.4L210.3 305.9l115.8-115.8C332.6 183.6 343.4 183.6 350.1 190.3S378.4 205.1 371.8 211.8z"/>
                            </svg>
                          </div>

                          {/* Testimonial text body */}
                          <p className="text-xs md:text-sm text-stone-900 leading-relaxed font-sans mt-4 font-normal line-clamp-6">
                            "{review.text}"
                          </p>
                        </div>

                        {/* Read More Link (Authentic Google Style) */}
                        <div className="pt-2">
                          <span className="text-xs font-sans font-bold text-[#1a73e8] hover:underline cursor-pointer">
                            {language === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                          </span>
                        </div>

                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right navigation arrow floating beautifully */}
            <button
              onClick={isRtl ? handlePrev : handleNext}
              className="absolute right-[-12px] md:right-[-24px] z-20 p-2 rounded-full bg-white border border-stone-200/80 hover:bg-[#FAF9F6] transition-all hover:scale-115 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer text-[#C5A85C]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* Dynamic Dot Indicators below */}
        <div className="flex justify-center items-center gap-1.5 pt-6 mt-4">
          {[...Array(actualMaxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index 
                  ? 'w-6 bg-[#C5A85C]' 
                  : 'w-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Show page ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
