import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function JordanToursSection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-20 px-4 border-y border-champagne-gold-500/10 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/petra_tour_1781696357565.jpg')" }} />
      <div className="absolute inset-0 z-0 bg-royal-navy-950/85" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-champagne-gold-500 mb-6"
          id="jordan-tours-title"
        >
          {t('tours.title')}
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-serif text-champagne-gold-200 mb-8"
          id="jordan-tours-subtitle"
        >
          {t('tours.subtitle')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-champagne-gold-100/80 leading-relaxed"
          id="jordan-tours-description"
          dangerouslySetInnerHTML={{ __html: t('tours.desc') }}
        />
      </div>
    </section>
  );
}
