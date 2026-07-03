import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function PetraGuideSection() {
  const { language } = useLanguage();
  return (
    <section className="py-20 px-4 bg-royal-navy-900 border-y border-champagne-gold-500/10">
      <div className="max-w-4xl mx-auto">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6 text-champagne-gold-100 p-8 md:p-12 bg-royal-navy-950/50 rounded-2xl border border-champagne-gold-500/5"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-champagne-gold-500 mb-6" id="petra-guide-title">
            The Beginner's Guide to Visiting Petra
          </h2>
          <img 
            src="/images/petra_tour_1781696357565.jpg" 
            alt={language === 'ar' ? "دليل زيارة البتراء من Royal Ride Jordan" : "Petra Visitor Guide from Royal Ride Jordan"}
            className="w-full h-auto rounded-xl mb-8 border border-champagne-gold-500/20" 
          />
          <p className="text-lg text-champagne-gold-100/80 leading-relaxed">
            Petra, one of the new Seven Wonders of the World, is a must-visit destination for any traveler to Jordan. Here are some tips to make the most of your visit:
          </p>

          <h3 className="text-2xl font-serif text-champagne-gold-400 mt-8">Best Time to Visit</h3>
          <p className="text-lg text-champagne-gold-100/80 leading-relaxed">
            The best time to visit Petra is early morning or late afternoon to avoid the midday heat. The park is open daily from 6am to 6pm during summer and 6am to 4pm during winter.
          </p>

          <h3 className="text-2xl font-serif text-champagne-gold-400 mt-8">What to Wear</h3>
          <p className="text-lg text-champagne-gold-100/80 leading-relaxed">
            Wear comfortable walking shoes as most of the sights involve a significant hike. It's also best to wear loose, lightweight clothing that covers your arms and legs for protection from the sun.
          </p>

          <h3 className="text-2xl font-serif text-champagne-gold-400 mt-8">What to Bring</h3>
          <ul className="list-disc list-inside space-y-2 text-lg text-champagne-gold-100/80">
            <li>Hat and sunscreen</li>
            <li>Plenty of water</li>
            <li>Nutritious snacks</li>
            <li>Camera to capture the stunning moments</li>
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
