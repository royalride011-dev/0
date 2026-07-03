import { ShieldCheck, Sparkles, HeartHandshake, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { GoldCorners } from './GoldOrnament';
import { images } from '../imageRegistry';

export default function About() {
  const { language, isRtl } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      title: language === 'en' ? 'Excellence' : 'التميز',
      text: language === 'en'
        ? 'We strive for excellence in every aspect of our work'
        : 'نحن نسعى للتميز في كل جانب من جوانب عملنا',
    },
    {
      icon: Sparkles,
      title: language === 'en' ? 'Safety' : 'السلامة',
      text: language === 'en'
        ? 'We give top priority to the safety of our guests and employees'
        : 'نحن نضع السلامة كأولوية قصوى لضيوفنا وموظفينا',
    },
    {
      icon: HeartHandshake,
      title: language === 'en' ? 'Integrity' : 'النزاهة',
      text: language === 'en'
        ? 'We act with honesty and ethics in all our dealings'
        : 'نحن نتصرف بأمانة وأخلاق في جميع تعاملاتنا',
    },
    {
      icon: Award,
      title: language === 'en' ? 'Respect' : 'الاحترام',
      text: language === 'en'
        ? 'We treat everyone with dignity, kindness, and consideration'
        : 'نحن نعامل الجميع بكرامة ولطف ومراعاة',
    },
    {
      icon: Sparkles,
      title: language === 'en' ? 'Innovation' : 'الابتكار',
      text: language === 'en'
        ? 'We continually challenge ourselves to improve and evolve'
        : 'نحن نتحدى أنفسنا باستمرار للتحسين والتطور',
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-royal-navy-950 overflow-hidden text-champagne-gold-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-champagne-gold-300">
            {language === 'en' ? 'About Us' : 'من نحن'}
          </h1>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-champagne-gold-200">
              {language === 'en' ? 'Our Story' : 'قصتنا'}
            </h2>
            <p className="font-sans leading-relaxed text-champagne-gold-100/80">
              {language === 'en' 
                ? 'Royal Ride was founded in 2010 with a clear vision: to provide luxury transportation services of unparalleled quality in Jordan and the region.'
                : 'تأسست رويال رايد في عام 2010 برؤية واضحة: تقديم خدمات نقل فاخرة بجودة لا تضاهى في الأردن والمنطقة.'}
            </p>
            <p className="font-sans leading-relaxed text-champagne-gold-100/80">
              {language === 'en'
                ? 'Starting as a small car rental company with driver services in Amman, Royal Ride has since grown to become the leading and trusted name in the luxury transportation sector.'
                : 'بدأت كشركة تأجير سيارات صغيرة مع خدمات سائق في عمان، ومنذ ذلك الحين نمت رويال رايد لتصبح الاسم الرائد والموثوق في قطاع النقل الفاخر.'}
            </p>
            <p className="font-sans leading-relaxed text-champagne-gold-100/80">
              {language === 'en'
                ? 'Over the years, we have expanded our services to include limousine rentals, van rentals, corporate transportation, and travel arrangements. Our mission is to be your reliable transportation partner, delivering a travel experience unlike any other, with the highest standards of quality and reliability.'
                : 'على مر السنين، قمنا بتوسيع خدماتنا لتشمل تأجير الليموزين، وتأجير الفانات، والنقل للشركات، وترتيبات السفر. مهمتنا هي أن نكون شريك النقل الموثوق بك، لنقدم تجربة سفر لا مثيل لها، بأعلى معايير الجودة والموثوقية.'}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-champagne-gold-200">
              {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
            </h2>
            <p className="font-sans leading-relaxed text-champagne-gold-100/80">
              {language === 'en'
                ? 'To be the most innovative and trusted transportation company in the region, by providing comprehensive transportation solutions and unmatched customer service. We aim to transform the way people travel, making every journey a memorable and valuable experience.'
                : 'أن نكون شركة النقل الأكثر ابتكاراً وموثوقية في المنطقة، من خلال تقديم حلول نقل شاملة وخدمة عملاء لا تضاهى. نهدف إلى تغيير الطريقة التي يسافر بها الناس، مما يجعل كل رحلة تجربة لا تنسى وقيمة.'}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-champagne-gold-200">
              {language === 'en' ? 'Our Mission' : 'مهمتنا'}
            </h2>
            <p className="font-sans leading-relaxed text-champagne-gold-100/80">
              {language === 'en'
                ? 'To consistently exceed our clients\' expectations by combining genuine hospitality, exceptional service, and continuous innovation. We strive to empower and inspire our team to be the best at everything they do, and to leave a lasting positive impact on our community.'
                : 'أن نتجاوز توقعات عملائنا باستمرار من خلال الجمع بين الضيافة الحقيقية والخدمة الاستثنائية والابتكار المستمر. نحن نسعى لتمكين وإلهام فريقنا ليكون الأفضل في كل ما يقومون به، وترك أثر إيجابي دائم في مجتمعنا.'}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-champagne-gold-200">
              {language === 'en' ? 'Our Values' : 'قيمنا'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} className="p-4 bg-royal-navy-900 border border-champagne-gold-500/15 rounded-lg flex items-start space-x-4">
                  <v.icon className="w-6 h-6 text-champagne-gold-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-champagne-gold-100">{v.title}</h3>
                    <p className="text-sm text-champagne-gold-100/70">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
