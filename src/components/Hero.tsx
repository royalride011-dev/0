import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Crown } from 'lucide-react';
import gsap from 'gsap';
import { CLIENT_LOGOS } from '../data';
import ShimmerHoverEffect from './ShimmerHoverEffect';
import { useLanguage } from '../LanguageContext';
import { LazyImage } from './LazyImage';

interface HeroProps {
  onExploreFleetClicked: () => void;
  onBookNowClicked: () => void;
}

export default function Hero({ onExploreFleetClicked, onBookNowClicked }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, t, isRtl } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Majestic, premium staggered reveal timeline on load
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '+=0.15'
      );

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.6'
      );

      tl.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.75'
      );

      tl.fromTo(
        '.hero-btn',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
        '-=0.75'
      );

      tl.fromTo(
        '.hero-logo-item',
        { opacity: 0, y: 15 },
        { opacity: 0.75, y: 0, duration: 0.8, stagger: 0.08 },
        '-=0.5'
      );

      tl.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex flex-col justify-between bg-royal-navy-950 overflow-hidden pt-12">
      
      {/* Background Graphic Framework containing Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <LazyImage 
          src="/images/royal_ride_hero_ultimate_v2_1781855232538.jpg" 
          alt="Royal Ride luxury sedan with elegant personal chauffeur at entrance of premium hotel in Amman under golden light" 
          width={1200}
          height={800}
          className="w-full h-full object-cover object-center opacity-65 brightness-[1.25] contrast-[1.05] saturate-[1.05]"
        />
        
        {/* Cinematic Artificial Lighting Effect / Sunset Lens Flare representing premium gold rays */}
        <div className="absolute top-1/10 right-[5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#C5A85C]/15 via-amber-500/5 to-transparent filter blur-3xl opacity-75 pointer-events-none mix-blend-screen" />
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-radial from-amber-300/10 via-transparent to-transparent filter blur-2xl opacity-60 pointer-events-none" />

        {/* Brand Optimized Multi-Layer Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-royal-navy-950 via-royal-navy-950/70 to-royal-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-navy-950/80 via-royal-navy-950/40 to-transparent" />
      </div>

      {/* Main Content Body */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-4 flex-grow flex items-center ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="max-w-3xl">
          
          {/* Animated Gold Monogram Top Badge */}
          <div className="hero-badge opacity-0 inline-flex items-center space-x-2 bg-royal-navy-900/80 border border-champagne-gold-500/30 px-3 py-1.5 rounded-full mb-6 backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-champagne-gold-400 animate-pulse mr-1.5" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold-300">
              {t('hero.badge')}
            </span>
          </div>

          {/* Majestic Hero Headings */}
          <h1 className="hero-title opacity-0 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-luxury-gradient leading-tight mb-6">
            {language === 'en' ? (
              <>
                Luxury Transportation <br />
                <span className="text-gold-gradient font-serif italic">Services in Jordan</span>
              </>
            ) : (
              <>
                خدمات النقل الفاخرة <br />
                <span className="text-gold-gradient font-serif italic">في الأردن</span>
              </>
            )}
          </h1>

          {/* Slogan Text */}
          <p className="hero-description opacity-0 font-sans text-sm sm:text-base md:text-lg text-champagne-gold-100/90 leading-relaxed mb-8 max-w-2xl font-light">
            {t('hero.desc')}
          </p>

          {/* Responsive Call To Actions */}
          <div className={`flex flex-col sm:flex-row gap-4 ${isRtl ? 'justify-start' : ''}`}>
            <button
              onClick={onBookNowClicked}
              className="hero-btn opacity-0 group inline-flex items-center justify-center btn-metallic-gold text-royal-navy-950 font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded cursor-pointer hover:shadow-[0_0_22px_rgba(197,168,92,0.6)] transform hover:-translate-y-0.5 relative overflow-hidden transition-all duration-300"
            >
              {t('hero.btnSecure')}
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
              <ShimmerHoverEffect />
            </button>
            <button
              onClick={onExploreFleetClicked}
              className="hero-btn opacity-0 inline-flex items-center justify-center border border-champagne-gold-400/30 hover:border-champagne-gold-400 bg-royal-navy-900/60 hover:bg-royal-navy-900 text-champagne-gold-100 font-sans text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded cursor-pointer transition-all duration-300 gold-tactile relative overflow-hidden"
            >
              {t('hero.btnFleet')}
              <ShimmerHoverEffect />
            </button>
          </div>

        </div>
      </div>

      {/* Prestige Client logos in bottom footer banner with a luxurious and calm, deeply dimmed matte gold background */}
      <div className="relative z-10 w-full bg-gradient-to-r from-[#1C170D] via-[#352B18] to-[#18130B] border-t border-b border-[#4D3F22]/40 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D8BD7E]/30" />
            <p className="text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#D8BD7E]">
              {t('hero.partnerTitle')}
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D8BD7E]/30" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 items-center justify-items-center">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="hero-logo-item opacity-0 flex flex-col items-center group cursor-pointer border border-transparent hover:border-[#D8BD7E]/20 px-4 py-1 rounded transition-all duration-300"
              >
                <span className="font-serif text-[14.5px] font-extrabold text-[#D8BD7E] group-hover:text-white group-hover:scale-105 transition-all tracking-wide whitespace-nowrap">
                  {logo.name}
                </span>
                <span className="text-[8px] font-sans font-bold tracking-widest uppercase text-[#D8BD7E]/70">
                  {logo.industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator pointing down */}
      <div 
        onClick={onExploreFleetClicked}
        className="hero-scroll-indicator opacity-0 absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center cursor-pointer z-10 text-champagne-gold-400 hover:text-champagne-gold-100 transition-colors"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest mb-1.5">{t('hero.scrollDown')}</span>
        <div className="animate-bounce">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

    </section>
  );
}
