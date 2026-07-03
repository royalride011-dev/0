import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function AmmanExperiences() {
  const { t, language } = useLanguage();
  return (
    <section className="py-20 px-4 bg-royal-navy-950">
      <div className="max-w-4xl mx-auto">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-royal-navy-900/50 p-8 md:p-12 rounded-2xl border border-champagne-gold-500/10 shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-champagne-gold-500 mb-6 text-center">
            {t('amman.title')}
          </h2>
          <p className="text-lg text-champagne-gold-100/80 leading-relaxed mb-8">
            {t('amman.desc')}
          </p>
          <img 
            src="/images/staria_vip_amman_1782232781113.jpg" 
            alt={language === 'ar' ? "تجربة عمان من Royal Ride Jordan" : "Amman City experience from Royal Ride Jordan"}
            className="w-full h-auto rounded-xl mb-8 border border-champagne-gold-500/20" 
          />
          <ol className="space-y-4 text-champagne-gold-100 font-serif text-lg list-decimal list-inside">
            <li>{t('amman.item1')}</li>
            <li>{t('amman.item2')}</li>
            <li>{t('amman.item3')}</li>
            <li>{t('amman.item4')}</li>
            <li>{t('amman.item5')}</li>
          </ol>
        </motion.article>
      </div>
    </section>
  );
}
