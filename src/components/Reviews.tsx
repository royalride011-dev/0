import { Star, MessageSquare, Award, CheckCircle2, MapPin, ExternalLink, User } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { useLanguage } from '../LanguageContext';

export default function Reviews() {
  const { language, isRtl, t } = useLanguage();

  return (
    <section id="reviews" className="relative py-24 bg-royal-navy-900 overflow-hidden">
      
      {/* Decorative Glow elements */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-royal-navy-950/90 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] bg-champagne-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-champagne-gold-400">
            {language === 'ar' ? 'آراء وشهادات الضيوف' : 'Client Testimonials'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-champagne-gold-100 via-champagne-gold-300 to-champagne-gold-500 mt-3 mb-6">
            {language === 'ar' ? 'تجارب ملهمة' : 'Inspiring Experiences'}
          </h2>
          <div className="w-16 h-[1.5px] bg-champagne-gold-500 mx-auto mb-6" />
          <p className="font-sans text-sm text-champagne-gold-100/70">
            {language === 'ar' 
              ? 'التجربة تتحدث عن نفسها'
              : 'Experience speaks for itself'}
          </p>
        </div>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {TESTIMONIALS.map((tItem, idx) => {
            const displayName = language === 'ar' && tItem.nameAr ? tItem.nameAr : tItem.name;
            const displayRole = language === 'ar' && tItem.roleAr ? tItem.roleAr : tItem.role;
            const displayText = language === 'ar' && tItem.textAr ? tItem.textAr : tItem.text;

            return (
              <motion.div
                key={tItem.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded bg-royal-navy-950 border border-champagne-gold-500/10 hover:border-champagne-gold-500/25 transition-all duration-300 flex flex-col justify-between shadow"
              >
                <div>
                  
                  {/* Gold Stars */}
                  <div className={`flex ${isRtl ? 'space-x-reverse' : ''} space-x-1.5 mb-4 text-[#D8BD7E]`}>
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="font-sans text-xs text-champagne-gold-100/75 leading-relaxed italic mb-6">
                    "{displayText}"
                  </p>

                </div>

                <div className="border-t border-royal-navy-850 pt-4 flex items-center space-x-3">
                  {tItem.avatar ? (
                    <img 
                      src={tItem.avatar} 
                      alt={language === 'ar' 
                        ? `صورة العميل: ${displayName} من Royal Ride Jordan` 
                        : `Client image: ${displayName} from Royal Ride Jordan`}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-champagne-gold-500/20 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-royal-navy-900 border border-champagne-gold-500/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-champagne-gold-400" />
                    </div>
                  )}
                  
                  <div className={`overflow-hidden ${isRtl ? 'pr-3 pl-0' : 'pl-3 pr-0'} flex-grow`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-serif text-xs font-bold text-champagne-gold-200 truncate">
                        {displayName}
                      </span>
                    </div>
                    <div className="flex flex-col text-[10px] text-champagne-gold-500">
                      <span className="truncate">{displayRole}</span>
                      <span className="font-mono text-[8px] bg-royal-navy-900 border border-champagne-gold-500/10 px-1 py-0.5 rounded text-champagne-gold-400 self-start mt-1">
                        {tItem.source}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Integrated Styled Google Reviews Badge & Location Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Block - Google Reviews rating badge */}
          <div className="lg:col-span-4 p-8 rounded bg-royal-navy-950 border border-champagne-gold-500/15 card-shadow flex flex-col justify-between text-center lg:text-left">
            <div className="space-y-4">
              
              {/* Google Monic */}
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                </div>
                <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                  <span className="font-sans font-bold text-[#FAF6ED] block text-sm">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span> Map Reviews
                  </span>
                  <span className="text-[10px] font-mono text-champagne-gold-500">Amman Business Listing</span>
                </div>
              </div>

              <div className="py-4">
                <span className="font-serif text-5xl font-extrabold text-gold-gradient block mb-1">
                  5.0
                </span>
                
                {/* Gold Stars and review sum */}
                <div className="flex justify-center lg:justify-start space-x-1.5 text-champagne-gold-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-champagne-gold-500 animate-pulse" />
                  ))}
                </div>
                <span className="text-xs text-champagne-gold-100/60 font-sans">
                  Based on 148+ verified 5-star reviews on Google Maps Jordan listings.
                </span>
              </div>

            </div>

            <div className="pt-6 border-t border-royal-navy-850">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center inline-flex items-center justify-center bg-royal-navy-900 hover:bg-royal-navy-800 border border-champagne-gold-500/30 text-champagne-gold-300 hover:text-champagne-gold-100 font-sans text-xs uppercase tracking-widest font-semibold py-3.5 px-4 rounded transition-all"
              >
                <span>Write A Google Review</span>
                <ExternalLink className="w-3.5 h-3.5 ml-2 text-champagne-gold-400" />
              </a>
            </div>

          </div>

          {/* Right Block - Map of Operation / Hub in Amman (Styled iframe container & metadata) */}
          <div className="lg:col-span-8 rounded bg-royal-navy-950 border border-champagne-gold-500/10 overflow-hidden card-shadow relative min-h-[300px] flex flex-col justify-between">
            
            {/* Embedded maps location */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108253.94823861214!2d35.845012558203105!3d31.954737299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b14e4f5533e5f%3A0x2a9b6e5e8e89569b!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1718500000000!5m2!1sen!2sus"
              width="100%"
              height="240"
              style={{ border: 0, filter: 'grayscale(0.6) invert(0.9) contrast(1.1) brightness(0.85)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amman Location"
            />

            {/* Operating Regions Details */}
            <div className="p-6 bg-royal-navy-900/95 border-t border-champagne-gold-500/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-champagne-gold-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-champagne-gold-200">Corporate Amman Office</h4>
                  <p className="text-[11px] text-champagne-gold-100/60 leading-relaxed mt-0.5">
                    Central Amman, close to Abdali Boulevard and elite hotels.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-champagne-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-champagne-gold-200">Regional Gateway Service</h4>
                  <p className="text-[11px] text-champagne-gold-100/60 leading-relaxed mt-0.5">
                    Direct VIP pick-up gates at Queen Alia Airport, Petra, Dead Sea, and Syria border Clearances.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
