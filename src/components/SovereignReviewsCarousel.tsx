import React, { useState, useEffect, useRef } from 'react';
import { Star, Award, ShieldCheck, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewNode {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google Review' | 'Direct VIP' | 'Sovereign Client';
}

const ALL_VIP_REVIEWS: ReviewNode[] = [
  {
    id: 'rev-1',
    name: 'Sarah Jenkins',
    role: 'London, UK',
    avatar: 'SJ',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "The chauffeur was impeccable. Arrived early at Queen Alia Airport and made the transfer to our hotel in Amman completely effortless. Truly professional service.",
    date: 'June 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-2',
    name: 'عبدالله العمري',
    role: 'الرياض، السعودية',
    avatar: 'AA',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "خدمة راقية جداً. السائق كان دقيقاً في الموعد والسيارة كانت فخمة ونظيفة. التعامل كان بمنتهى الاحترافية واللباقة. شكراً رويال رايد.",
    date: 'يونيو 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-3',
    name: 'Alessandro Rossi',
    role: 'Roma, Italia',
    avatar: 'AR',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "Servizio eccellente! Il tour di Petra è stato fantastico grazie al nostro autista che conosceva ogni dettaglio storico. Il comfort dell'auto era di un altro livello.",
    date: 'May 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-4',
    name: 'Elena Volkov',
    role: 'Moscow, Russia',
    avatar: 'EV',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "Очень профессиональный сервис. Водитель был пунктуален, а автомобиль был в идеальном состоянии. Поездка по Амману прошла очень комфортно.",
    date: 'May 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-5',
    name: 'Fatima Al-Hassan',
    role: 'Dubai, UAE',
    avatar: 'FH',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "Used them for a business trip. Everything was perfect—clean car, reliable driver, and very easy communication. Will definitely book again.",
    date: 'April 2026',
    source: 'Direct VIP'
  },
  {
    id: 'rev-6',
    name: 'Luca Bianchi',
    role: 'Milano, Italia',
    avatar: 'LB',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "Semplicemente fantastico. La cortesia e la puntualità dello staff sono ineguagliabili. Hanno reso il nostro viaggio in Giordania davvero speciale.",
    date: 'July 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-7',
    name: 'Dmitry Ivanov',
    role: 'Saint Petersburg, Russia',
    avatar: 'DI',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "Исключительный сервис. Водитель прекрасно говорит по-английски и знает лучшие места в Иордании. Остались очень довольны.",
    date: 'July 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-8',
    name: 'Emma Thompson',
    role: 'New York, USA',
    avatar: 'ET',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "We felt safe and comfortable throughout our trip. The chauffeur was incredibly polite and the car was immaculate. Highly recommend to any traveler.",
    date: 'June 2026',
    source: 'Google Review'
  },
  {
    id: 'rev-9',
    name: 'محمود الصالح',
    role: 'عمان، الأردن',
    avatar: 'MS',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "أفضل خدمة نقل في الأردن بدون منازع. السيارات حديثة والسائقون على مستوى عالٍ جداً من المهنية. شكراً لكم.",
    date: 'يونيو 2026',
    source: 'Direct VIP'
  },
  {
    id: 'rev-10',
    name: 'Giulia Moretti',
    role: 'Firenze, Italia',
    avatar: 'GM',
    avatarColor: 'from-[#C5A85C] to-[#EAD39E]',
    rating: 5,
    text: "Un'esperienza indimenticabile. La qualità del servizio e l'attenzione ai dettagli hanno superato le nostre aspettative.",
    date: 'May 2026',
    source: 'Google Review'
  }
];

export default function SovereignReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize listener to track the width of a single card
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && containerRef.current) {
        const firstCard = trackRef.current.firstElementChild as HTMLElement;
        if (firstCard) {
          setWidth(firstCard.offsetWidth);
        }
      }
    };
    
    // Run after paint
    const timeoutId = setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Determine responsive items count
  const [itemsToShow, setItemsToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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

  // Auto rotation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= actualMaxIndex ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, actualMaxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= actualMaxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? actualMaxIndex : prev - 1));
  };

  // Drag interaction with Framer Motion
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section 
      id="testimonials"
      className="relative py-24 overflow-hidden border-b border-[#C5A85C]/15 bg-royal-navy-950"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Microdots */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none" />
      
      {/* Subtle luxury geometric curves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#C5A85C]/5 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-[#C5A85C]/5 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic Royal Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#C5A85C]/10 rounded border border-[#C5A85C]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A85C]" />
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#C5A85C] uppercase">
              Sovereign Guest Ledger
            </span>
          </div>
          
          <h2 className="font-serif text-3.5xl sm:text-4.5xl font-bold tracking-tight leading-tight text-white">
            The Art of VIP Carriage in <span className="italic text-[#C5A85C]">Jordan</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-300 mt-4 leading-relaxed max-w-2xl mx-auto font-medium">
            Every journey tells a story of supreme reliability, strict confidentiality, and impeccable coordination. Read experiences written directly by our eminent guests.
          </p>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden pb-12 cursor-grab active:cursor-grabbing"
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
            className="flex w-full select-none"
            style={{ touchAction: 'pan-y' }}
          >
            {ALL_VIP_REVIEWS.map((review, index) => {
              // Highlight cards when active
              const isCardActive = index >= currentIndex && index < currentIndex + itemsToShow;
              
              return (
                <div 
                  key={review.id}
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-4 transition-opacity duration-300"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <motion.div 
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className={`p-8 rounded-3xl font-sans border flex flex-col justify-between h-[420px] transition-all duration-500 relative overflow-hidden text-left ${
                      isCardActive 
                        ? 'bg-white border-[#C5A85C]/20 shadow-[0_20px_40px_rgba(0,0,0,0.08)]' 
                        : 'bg-stone-100/50 border-stone-200/50 opacity-50'
                    }`}
                  >
                    {/* Google Color Accent Stripe */}
                    {review.source === 'Google Review' && (
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] z-10" />
                    )}

                    {/* Review content */}
                    <div>
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${review.avatarColor} text-white flex items-center justify-center font-sans font-bold text-base shadow-inner border border-white/20 shrink-0`}>
                            {review.avatar}
                          </div>
                          <div>
                            <h4 className="font-sans text-base font-bold text-stone-950 leading-tight">
                              <span>{review.name}</span>
                            </h4>
                            <span className="text-xs text-[#C5A85C] font-sans font-medium mt-1 block">
                              {review.role}
                            </span>
                          </div>
                        </div>

                        {/* Source stamp */}
                        {review.source === 'Google Review' ? (
                          <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-stone-50 border border-stone-200 shadow-sm shrink-0">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                              <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                            </svg>
                            <span className="font-sans font-bold text-[10px] tracking-tight text-stone-600">
                              Google
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#C5A85C]/5 border border-[#C5A85C]/10 shrink-0">
                            <span className="font-sans text-[10px] uppercase tracking-widest text-[#C5A85C] font-bold">
                              VIP
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Golden Stars */}
                      <div className="flex items-center gap-2 my-5">
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#C5A85C] text-[#C5A85C]" />
                          ))}
                        </div>
                        <span className="text-xs font-sans text-stone-400">
                          {review.date}
                        </span>
                      </div>

                      {/* Testimonial Quote Text */}
                      <div className="space-y-2 mt-2">
                        <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed font-sans font-normal line-clamp-5">
                          "{review.text}"
                        </p>
                      </div>
                    </div>

                    {/* Bottom Royal Verification */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] font-sans tracking-wide text-stone-400 uppercase mt-6">
                      <span className="flex items-center gap-2 font-medium text-stone-500">
                        <Award className="w-4 h-4 text-[#C5A85C]" />
                        Verified
                      </span>
                      <span className="text-emerald-600 flex items-center gap-2 font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Trusted
                      </span>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Actions below the Arena */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#C5A85C]/10 z-20 relative">
          
          {/* Quick Counter Info */}
          <div className="text-xs font-mono text-[#C5A85C] text-left">
            <span>
              Current Slide:{' '}
              <strong className="text-white font-sans text-sm">{currentIndex + 1}</strong>
              <span className="mx-1 opacity-40">/</span>
              <span className="text-stone-300">{actualMaxIndex + 1}</span>
            </span>
            <span className="hidden sm:inline-block mx-3 text-stone-700">|</span>
            <span className="hidden sm:inline-block text-[10px] text-stone-400">
              ✓ Auto-play active (hover/touch to pause)
            </span>
          </div>

          {/* Bullet Indexers */}
          <div className="flex items-center gap-2">
            {[...Array(actualMaxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-350 cursor-pointer ${
                  currentIndex === index 
                    ? 'w-6 bg-gradient-to-r from-[#C5A85C] to-[#85652e] shadow-sm shadow-[#C5A85C]/40' 
                    : 'w-2 bg-stone-800 hover:bg-[#C5A85C]/30'
                }`}
                aria-label={`Show testimonial page ${index + 1}`}
              />
            ))}
          </div>

          {/* Highly polished control arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded bg-royal-navy-900 border border-stone-800 text-stone-100 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]/50 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-stone-300" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded bg-royal-navy-900 border border-stone-800 text-stone-100 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]/50 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-stone-300" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
