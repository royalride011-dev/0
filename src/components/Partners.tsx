import { motion } from 'motion/react';
import { ShieldCheck, Award, Building2, Quote, Star, Users } from 'lucide-react';
import { CLIENT_LOGOS, TESTIMONIALS } from '../data';
import ShimmerHoverEffect from './ShimmerHoverEffect';
import { useLanguage } from '../LanguageContext';

interface PartnersProps {
  onInquire?: () => void;
}

export default function Partners({ onInquire }: PartnersProps) {
  const { language, t, isRtl } = useLanguage();

  return (
    <div id="partners" className="relative min-h-screen bg-royal-navy-950 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Graphic Accents */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-champagne-gold-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-champagne-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-royal-navy-900 border border-champagne-gold-500/20 px-3 py-1.5 rounded-full mb-2">
            <Award className="w-3.5 h-3.5 text-champagne-gold-400 mr-2" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-champagne-gold-300">
              {t('partners.badge')}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-luxury-gradient tracking-tight">
            {t('partners.title')}
          </h2>
          <p className="font-sans text-sm text-champagne-gold-100/70 max-w-2xl mx-auto leading-relaxed">
            {t('partners.desc')}
          </p>
        </div>

        {/* Dynamic Grid: Hospitality Partners */}
        <div className="bg-royal-navy-900/40 border border-champagne-gold-500/10 rounded p-8 backdrop-blur-md">
          <h3 className="font-serif text-xl font-bold text-champagne-gold-300 text-center mb-8 border-b border-royal-navy-800 pb-4">
            {language === 'en' ? 'Official Hospitality Partnerships' : 'شركاء الضيافة والفنادق الفاخرة المعتمدين'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {CLIENT_LOGOS.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center justify-center p-6 bg-royal-navy-950/80 border border-champagne-gold-500/5 rounded hover:border-champagne-gold-500/30 transition-all duration-300 text-center min-h-[140px]"
              >
                <Building2 className="w-8 h-8 text-champagne-gold-500/40 group-hover:text-champagne-gold-400 group-hover:scale-110 transition-all duration-300 mb-3" />
                <h4 className="font-serif text-sm font-bold text-[#FAF6ED] mb-1">
                  {partner.name}
                </h4>
                <span className="text-[10px] font-sans text-champagne-gold-100/50">
                  {partner.industry}
                </span>
                
                {/* Subtle gold shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-champagne-gold-500/0 via-champagne-gold-500/5 to-champagne-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Trust Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className={`p-6 bg-royal-navy-900 border border-champagne-gold-500/5 hover:border-champagne-gold-500/15 rounded transition-all duration-300 ${isRtl ? 'text-right' : 'text-left'}`}>
            <ShieldCheck className={`w-10 h-10 text-champagne-gold-400 mb-4 ${isRtl ? 'ml-auto' : ''}`} />
            <h4 className="font-serif text-lg font-bold text-champagne-gold-100 mb-2">
              {language === 'en' ? 'Embassy & Protocol Ready' : 'بروتوكول سفارات كامل ورسمي'}
            </h4>
            <p className="text-xs text-champagne-gold-100/60 leading-relaxed">
              {language === 'en'
                ? 'We provide high-security logistical coordination, VIP diplomatic transport, and custom embassy routes handled by background-checked chauffeurs.'
                : 'نوفر سائقين مؤهلين أمنياً وحاصلين على تدريبات متقدمة للبروتوكول الرسمي. ندير حركة البعثات الدبلوماسية وسفارات النخبة وعمان الغربية بأمان تام.'}
            </p>
          </div>

          <div className={`p-6 bg-royal-navy-900 border border-champagne-gold-500/5 hover:border-champagne-gold-500/15 rounded transition-all duration-300 ${isRtl ? 'text-right' : 'text-left'}`}>
            <Users className={`w-10 h-10 text-champagne-gold-400 mb-4 ${isRtl ? 'ml-auto' : ''}`} />
            <h4 className="font-serif text-lg font-bold text-champagne-gold-100 mb-2">
              {language === 'en' ? 'Corporate Account Privileges' : 'امتيازات وتسهيلات حسابات الشركات'}
            </h4>
            <p className="text-xs text-champagne-gold-100/60 leading-relaxed">
              {language === 'en'
                ? 'Direct executive dashboard booking, deferred monthly postpaid billing, priority fleet assignment, and dedicated coordinates account managers.'
                : 'طلب فتح حساب شركات معتمد للاستفادة من أنظمة الأمان واللوحة التفاعلية، خيارات دفع آجل وفواتير شهرية، وأولوية قصوى لتوفير أسطول السيارات.'}
            </p>
          </div>

          <div className={`p-6 bg-royal-navy-900 border border-champagne-gold-500/5 hover:border-champagne-gold-500/15 rounded transition-all duration-300 ${isRtl ? 'text-right' : 'text-left'}`}>
            <Award className={`w-10 h-10 text-champagne-gold-400 mb-4 ${isRtl ? 'ml-auto' : ''}`} />
            <h4 className="font-serif text-lg font-bold text-champagne-gold-100 mb-2">
              {language === 'en' ? 'Luxury Concierge Coordination' : 'تسهيل وخدمات كونسيرج كبار الضيوف'}
            </h4>
            <p className="text-xs text-champagne-gold-100/60 leading-relaxed">
              {language === 'en'
                ? 'Partnering directly with leading premium luxury concierge houses to manage five-star hotel guests and international delegates smoothly.'
                : 'نعمل بتكامل ومستوى جودة وثيق مع كونسيرج فنادق الخمس نجوم عمان لتسهيل استقبال واستضافة النزلاء الأجانب ونقلهم بيسر وأمان.'}
            </p>
          </div>
        </div>

        {/* Live Client Testimonials Grid */}
        <div className="space-y-8 pt-8">
          <div className="text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-champagne-gold-200">
              {t('reviews.title')}
            </h3>
            <p className="text-xs text-champagne-gold-100/50 mt-2 font-mono uppercase tracking-widest">
              {language === 'en' ? 'WHAT OUR CO-OPERATORS & VIP PATRONS SAY' : 'ماذا يقول كبار ضيوفنا وممثلو الأعمال عن خدماتنا'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded bg-royal-navy-900 border border-champagne-gold-500/5 hover:border-champagne-gold-500/15 transition-all flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className={`absolute top-4 text-champagne-gold-500/10 ${isRtl ? 'left-6' : 'right-6'}`}>
                  <Quote className="w-16 h-16 transform scale-x-[-1]" />
                </div>
                
                <div>
                  <div className={`flex items-center space-x-1 text-champagne-gold-400 mb-4 ${isRtl ? 'space-x-reverse justify-start' : ''}`}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-sm text-champagne-gold-100/80 leading-relaxed italic mb-6">
                    "{language === 'en' ? t.text : (t.textAr || t.text)}"
                  </p>
                </div>

                <div className={`flex justify-between items-end border-t border-royal-navy-800/60 pt-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h4 className="font-serif text-sm font-bold text-champagne-gold-300">
                      {language === 'en' ? t.name : (t.nameAr || t.name)}
                    </h4>
                    <p className="text-[10px] text-champagne-gold-100/50 font-sans">
                      {language === 'en' ? t.role : (t.roleAr || t.role)}
                    </p>
                  </div>
                  
                  <div className={isRtl ? 'text-left' : 'text-right'}>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono text-emerald-400 bg-emerald-900/20 border border-emerald-500/15">
                      {t.source}
                    </span>
                    <p className="text-[9px] text-champagne-gold-100/30 mt-1 font-mono">{t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        {onInquire && (
          <div className="p-10 rounded text-center bg-gradient-to-r from-royal-navy-900 via-royal-navy-900/90 to-royal-navy-900 border border-champagne-gold-500/20 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-champagne-gold-500/5 mix-blend-color-dodge pointer-events-none" />
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#FAF6ED] mb-3">
              {language === 'en' ? 'Establish a Corporate Transport Agreement' : 'تأسيس شراكة نقل وتطوير حساب أعمال دائم'}
            </h3>
            <p className="text-xs text-champagne-gold-100/70 max-w-xl mx-auto mb-6 leading-relaxed">
              {t('partners.ctaText')}
            </p>
            <button
              onClick={onInquire}
              className="px-8 py-3.5 bg-champagne-gold-500 hover:bg-champagne-gold-400 text-royal-navy-950 font-serif font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-champagne-gold-500/20 cursor-pointer relative overflow-hidden inline-flex items-center"
            >
              <span>{t('partners.ctaBtn')}</span>
              <ShimmerHoverEffect />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
