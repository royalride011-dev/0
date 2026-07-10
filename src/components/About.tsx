import { ShieldCheck, Sparkles, HeartHandshake, Award, Target, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { GoldCorners } from './GoldOrnament';

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
    <section id="about" className="relative py-24 bg-black overflow-hidden text-white">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900/30 via-black to-black pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`space-y-16 ${isRtl ? 'text-right' : 'text-left'}`}
        >
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-[#C5A85C]">
              {language === 'en' ? 'About Us' : 'من نحن'}
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto" />
            <p className="text-stone-400 font-sans text-xs tracking-widest uppercase">
              {language === 'en' ? 'Royal Ride Luxury Services' : 'خدمات رويال رايد الفاخرة'}
            </p>
          </div>

          {/* Our Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Story Text */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 bg-stone-950/40 p-8 md:p-10 rounded-2xl border border-stone-800/40 relative overflow-hidden">
              <GoldCorners />
              <h2 className="font-serif text-3xl font-bold text-[#C5A85C]">
                {language === 'en' ? 'Our Story' : 'قصتنا'}
              </h2>
              <div className="space-y-4 text-stone-300 leading-relaxed font-sans text-[15px]">
                <p>
                  {language === 'en' 
                    ? 'Royal Ride was founded in 2010 with a clear vision: to provide luxury transportation services of unparalleled quality in Jordan and the region.'
                    : 'تأسست رويال رايد في عام 2010 برؤية واضحة: تقديم خدمات نقل فاخرة بجودة لا تضاهى في الأردن والمنطقة.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'Starting as a small car rental company with driver services in Amman, Royal Ride has since grown to become the leading and trusted name in the luxury transportation sector.'
                    : 'بدأت كشركة تأجير سيارات صغيرة مع خدمات سائق في عمان، ومنذ ذلك الحين نمت رويال رايد لتصبح الاسم الرائد والموثوق في قطاع النقل الفاخر.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'Over the years, we have expanded our services to include limousine rentals, van rentals, corporate transportation, and travel arrangements. Our mission is to be your reliable transportation partner, delivering a travel experience unlike any other, with the highest standards of quality and reliability.'
                    : 'على مر السنين، قمنا بتوسيع خدماتنا لتشمل تأجير الليموزين، وتأجير الفانات، والنقل للشركات، وترتيبات السفر. مهمتنا هي أن نكون شريك النقل الموثوق بك، لنقدم تجربة سفر لا مثيل لها، بأعلى معايير الجودة والموثوقية.'}
                </p>
              </div>
            </div>

            {/* Premium Stat Callout Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-stone-950 to-black p-8 rounded-2xl border border-[#C5A85C]/30 relative overflow-hidden group hover:border-[#C5A85C]/60 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A85C]/5 rounded-full blur-3xl group-hover:bg-[#C5A85C]/10 transition-colors pointer-events-none" />
              
              <div className="space-y-4">
                <span className="text-[#C5A85C] uppercase text-xs tracking-widest font-bold">
                  {language === 'en' ? 'ESTABLISHED' : 'تأسست عام'}
                </span>
                <h3 className="font-serif text-7xl md:text-8xl font-black text-[#C5A85C] tracking-tight">
                  2010
                </h3>
              </div>

              <div className="mt-8 space-y-6">
                <div className="h-px bg-gradient-to-r from-[#C5A85C]/45 to-transparent" />
                <p className="text-stone-300 font-sans leading-relaxed text-[15px]">
                  {language === 'en'
                    ? 'Fourteen years of crafting pristine moments on the road. We are the premier choice for discerning travelers, royal guests, and state delegates.'
                    : 'أربعة عشر عاماً من صياغة اللحظات النقية على الطرقات. نحن الخيار الأول للمسافرين المميزين والضيوف الملكيين ووفود الدول.'}
                </p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[#C5A85C] text-2xl font-serif font-bold">14+</p>
                    <p className="text-stone-400 text-xs uppercase tracking-wider">{language === 'en' ? 'Years Exp' : 'سنوات خبرة'}</p>
                  </div>
                  <div className="w-px h-8 bg-stone-800" />
                  <div>
                    <p className="text-[#C5A85C] text-2xl font-serif font-bold">100%</p>
                    <p className="text-stone-400 text-xs uppercase tracking-wider">{language === 'en' ? 'Elite Fleet' : 'أسطول نخبة'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-stone-950/50 p-8 rounded-2xl border border-stone-800/60 hover:border-[#C5A85C]/40 transition-colors duration-300 relative group overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#C5A85C]/10 rounded-xl text-[#C5A85C]">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#C5A85C]">
                  {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
                </h2>
              </div>
              <p className="font-sans leading-relaxed text-stone-300 text-sm md:text-[14px]">
                {language === 'en'
                  ? 'To be the most innovative and trusted transportation company in the region, by providing comprehensive transportation solutions and unmatched customer service. We aim to transform the way people travel, making every journey a memorable and valuable experience.'
                  : 'أن نكون شركة النقل الأكثر ابتكاراً وموثوقية في المنطقة، من خلال تقديم حلول نقل شاملة وخدمة عملاء لا تضاهى. نهدف إلى تغيير الطريقة التي يسافر بها الناس، مما يجعل كل رحلة تجربة لا تنسى وقيمة.'}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-stone-950/50 p-8 rounded-2xl border border-stone-800/60 hover:border-[#C5A85C]/40 transition-colors duration-300 relative group overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#C5A85C]/10 rounded-xl text-[#C5A85C]">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#C5A85C]">
                  {language === 'en' ? 'Our Mission' : 'مهمتنا'}
                </h2>
              </div>
              <p className="font-sans leading-relaxed text-stone-300 text-sm md:text-[14px]">
                {language === 'en'
                  ? 'To consistently exceed our clients\' expectations by combining genuine hospitality, exceptional service, and continuous innovation. We strive to empower and inspire our team to be the best at everything they do, and to leave a lasting positive impact on our community.'
                  : 'أن نتجاوز توقعات عملائنا باستمرار من خلال الجمع بين الضيافة الحقيقية والخدمة الاستثنائية والابتكار المستمر. نحن نسعى لتمكين وإلهام فريقنا ليكون الأفضل في كل ما يقومون به، وترك أثر إيجابي دائم في مجتمعنا.'}
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#C5A85C]">
                {language === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
              </h2>
              <p className="text-stone-400 font-sans text-xs uppercase tracking-widest">
                {language === 'en' ? 'Principles That Guide Our Success' : 'المبادئ التي توجه نجاحنا'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {values.map((v) => (
                <div 
                  key={v.title} 
                  className="p-5 bg-gradient-to-b from-stone-950 to-black border border-stone-800/60 rounded-xl flex flex-col items-center text-center gap-4 hover:border-[#C5A85C]/30 transition-all duration-300 group"
                >
                  <div className="p-3 bg-[#C5A85C]/5 rounded-xl text-[#C5A85C] group-hover:scale-110 group-hover:bg-[#C5A85C]/10 transition-all duration-300">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#C5A85C] mb-2">{v.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{v.text}</p>
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
