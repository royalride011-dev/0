import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Navigation, MapPin, X, Minus, Sparkles, ChevronRight, ChevronLeft, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function JordanClock() {
  const { language, isRtl } = useLanguage();
  const [jordanTime, setJordanTime] = useState<Date>(new Date());
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [weatherTemp, setWeatherTemp] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number>(0);

  // High Precision Timezone calculation: Amman, Jordan is always UTC+3
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      // Jordan is UTC + 3 hours
      const ammanTime = new Date(utcTime + 3600000 * 3);
      setJordanTime(ammanTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch real-time weather for Amman, Jordan
  useEffect(() => {
    async function getAmmanWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=31.95&longitude=35.91&current_weather=true'
        );
        if (res.ok) {
          const data = await res.json();
          setWeatherTemp(Math.round(data.current_weather.temperature));
          setWeatherCode(data.current_weather.weathercode);
        }
      } catch (e) {
        // Safe luxury seasonal fallback
        const isDayTime = new Date().getHours() >= 6 && new Date().getHours() <= 19;
        setWeatherTemp(isDayTime ? 31 : 21);
        setWeatherCode(0);
      }
    }
    getAmmanWeather();
    const weatherInterval = setInterval(getAmmanWeather, 600000); // 10 min
    return () => clearInterval(weatherInterval);
  }, []);

  const hours = jordanTime.getHours();
  const minutes = jordanTime.getMinutes();
  const seconds = jordanTime.getSeconds();

  // Hand Rotation Angles
  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  // Digital formatting
  const formattedDigital = jordanTime.toLocaleTimeString(language === 'ar' ? 'ar-JO' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // Clock hour tick markers (12 ticks, 30deg each)
  const ticks = Array.from({ length: 12 }).map((_, i) => i * 30);

  // Weather condition mapping
  const resolveWeather = () => {
    let icon = <Sun className="w-4 h-4 text-[#C5A85C] animate-spin-slow-icon" />;
    let text = language === 'ar' ? 'صافي ومعتدل' : 'Sunny & Clear';
    if (weatherCode >= 1 && weatherCode <= 3) {
      icon = <Cloud className="w-4 h-4 text-[#C5A85C]/70 animate-pulse" />;
      text = language === 'ar' ? 'غائم جزئياً' : 'Partly Cloudy';
    } else if (weatherCode >= 51 && weatherCode <= 67) {
      icon = <CloudRain className="w-4 h-4 text-[#C5A85C]" />;
      text = language === 'ar' ? 'أمطار خفيفة' : 'Light Rain';
    } else if (weatherCode > 67) {
      icon = <CloudLightning className="w-4 h-4 text-[#C5A85C] animate-bounce" />;
      text = language === 'ar' ? 'أمطار رعدية' : 'Thunderstorm';
    }
    return { icon, text };
  };

  const weatherInfo = resolveWeather();

  return (
    <div 
      id="jordan-clock-container" 
      className="fixed top-24 right-4 md:right-6 lg:right-8 z-40 font-sans pointer-events-none select-none"
    >
      <AnimatePresence mode="wait">
        {!isMinimized ? (
          <motion.div
            id="jordan-clock-expanded"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="pointer-events-auto w-[190px] bg-[#111111]/95 backdrop-blur-xl border-2 border-[#C5A85C] rounded-3xl p-4 shadow-[0_0_25px_rgba(197,168,92,0.4),0_15px_40px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.1)] relative group overflow-hidden"
          >
            {/* Subtle gold frosted-glass diagonal reflection wave */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C5A85C]/5 to-transparent pointer-events-none group-hover:translate-x-full duration-1000 transition-transform" />
            
            {/* Ambient luxury rotating gold halo in background on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A85C]/10 via-transparent to-[#C5A85C]/5 opacity-70 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
            
            {/* Minimizer action header controls */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#C5A85C]/25">
              <span className="flex items-center gap-1 text-[9px] font-serif text-[#C5A85C] uppercase tracking-wider font-bold">
                <Sparkles className="w-2.5 h-2.5 text-[#C5A85C] animate-pulse" />
                {language === 'ar' ? 'توقيت عمان' : 'Amman Live'}
              </span>
              <button
                id="jordan-clock-minimize-btn"
                onClick={() => setIsMinimized(true)}
                className="text-[#C5A85C]/70 hover:text-[#C5A85C] transition-colors cursor-pointer p-0.5 rounded hover:bg-stone-900"
                title={language === 'ar' ? 'تصغير' : 'Minimize'}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Swiss-Precision Analog Clock Area */}
            <div className="relative w-[130px] h-[130px] mx-auto mb-3 flex items-center justify-center">
              <svg 
                id="jordan-clock-svg" 
                viewBox="0 0 150 150" 
                className="w-full h-full transform rotate-0"
              >
                {/* Clock gold Outer-Bezel Drop Shadow */}
                <defs>
                  <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="#111111" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C5A85C" stopOpacity="0.25" />
                  </radialGradient>
                </defs>

                {/* Main Clock Dial Face Background */}
                <circle 
                  cx="75" 
                  cy="75" 
                  r="70" 
                  className="fill-stone-950 stroke-[#C5A85C]" 
                  strokeWidth="2.5" 
                  id="clock-outer-bezel"
                />
                
                {/* Subtle Dial Inner Radial Grid */}
                <circle 
                  cx="75" 
                  cy="75" 
                  r="62" 
                  fill="url(#goldGlow)" 
                  className="stroke-[#C5A85C]/20" 
                  strokeWidth="1.5"
                />

                {/* Precise Hour Tick Markers around the perimeter */}
                {ticks.map((deg, idx) => {
                  const isCardinal = idx % 3 === 0;
                  return (
                    <line
                      key={deg}
                      x1="75"
                      y1={isCardinal ? "10" : "13"}
                      x2="75"
                      y2="17"
                      className={`${isCardinal ? 'stroke-[#C5A85C]' : 'stroke-[#C5A85C]/45'}`}
                      strokeWidth={isCardinal ? "2.5" : "1"}
                      transform={`rotate(${deg}, 75, 75)`}
                    />
                  );
                })}

                {/* Core Brand Monogram inside clock center - Mirrored */}
                <text 
                  x="65" 
                  y="52" 
                  className="fill-[#C5A85C] font-serif text-[12px] font-bold pointer-events-none select-none"
                  textAnchor="middle"
                  id="clock-brand-mark-left"
                >
                  R
                </text>
                <text 
                  x="-85" 
                  y="52" 
                  className="fill-[#C5A85C] font-serif text-[12px] font-bold pointer-events-none select-none"
                  textAnchor="middle"
                  transform="scale(-1, 1)"
                  id="clock-brand-mark-right"
                >
                  R
                </text>
                
                {/* Secondary Watermark for GMT Offsets */}
                <text 
                  x="75" 
                  y="108" 
                  className="fill-[#C5A85C]/50 font-mono text-[7px] tracking-widest uppercase font-bold"
                  textAnchor="middle"
                >
                  GMT +3
                </text>

                {/* Elegant Hour Hand */}
                <line 
                  x1="75" 
                  y1="75" 
                  x2="75" 
                  y2="42" 
                  className="stroke-[#C5A85C]"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform={`rotate(${hourAngle}, 75, 75)`}
                  id="clock-hour-hand"
                />

                {/* Elegant Minute Hand */}
                <line 
                  x1="75" 
                  y1="75" 
                  x2="75" 
                  y2="28" 
                  className="stroke-[#FAF6ED]"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  transform={`rotate(${minuteAngle}, 75, 75)`}
                  id="clock-minute-hand"
                />

                {/* Premium Golden-Red Second Hand */}
                <line 
                  x1="75" 
                  y1="82" 
                  x2="75" 
                  y2="22" 
                  className="stroke-[#C5A85C]"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  transform={`rotate(${secondAngle}, 75, 75)`}
                  id="clock-second-hand"
                />

                {/* Center Pin & Brass Cover */}
                <circle cx="75" cy="75" r="4.5" className="fill-[#C5A85C] stroke-[#111111]" strokeWidth="1.5" />
                <circle cx="75" cy="75" r="1.5" className="fill-stone-900" />
              </svg>
            </div>

            {/* Localized labels & digital clock readouts */}
            <div className="text-center space-y-1">
              <div 
                id="clock-digital-readout"
                className="font-mono text-xs font-bold text-[#C5A85C] tracking-wider bg-stone-950/90 py-0.5 px-2 rounded-md inline-block border border-[#C5A85C]/30 shadow-[0_0_8px_rgba(197,168,92,0.15)]"
              >
                {formattedDigital}
              </div>
              <div 
                id="clock-label-text" 
                className="text-[9px] font-semibold text-stone-200/95 flex items-center justify-center gap-1"
              >
                <MapPin className="w-2.5 h-2.5 text-[#C5A85C] inline shrink-0" />
                <span>
                  {language === 'ar' ? 'توقيت عمّان الهاشمي' : 'Amman, Jordan Time'}
                </span>
              </div>
            </div>

            {/* Merged Weather & Climate indicator in the same gold frame */}
            <div className="mt-3.5 pt-2 pb-0.5 border-t border-[#C5A85C]/25 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-full bg-stone-950 border border-[#C5A85C]/30 shadow-[0_0_4px_rgba(197,168,92,0.1)]">
                  {weatherInfo.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[11px] font-extrabold text-[#C5A85C]">
                    {weatherTemp !== null ? `${weatherTemp}°C` : '28°C'}
                  </span>
                  <span className="font-mono text-[7px] text-stone-400">
                    {weatherTemp !== null ? `${Math.round((weatherTemp * 9) / 5 + 32)}°F` : '82°F'}
                  </span>
                </div>
              </div>
              <div className="text-right flex flex-col justify-center">
                <span className="text-[8.5px] font-sans font-bold text-white leading-none whitespace-nowrap">
                  {weatherInfo.text}
                </span>
                <span className="text-[7.5px] font-mono text-[#C5A85C] tracking-wider uppercase">
                  {language === 'ar' ? 'عمّان، الأردن' : 'Amman, JOR'}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            id="jordan-clock-minimized-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.15 }}
            onClick={() => setIsMinimized(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-[#111111]/90 backdrop-blur-lg border-2 border-[#C5A85C] shadow-[0_0_15px_rgba(197,168,92,0.5),inset_0_1px_2px_rgba(255,255,255,0.15)] cursor-pointer group relative overflow-hidden"
            title={language === 'ar' ? 'عرض ساعة الأردن' : 'Show Jordan Time'}
          >
            {/* Spinning decorative golden light halo */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_40%,rgba(197,168,92,0.25)_80%,transparent_100%)] animate-spin-slow-icon" />
            
            <Clock className="w-5 h-5 text-[#C5A85C] group-hover:text-white transition-colors z-10 animate-pulse" />
            
            {/* Hover Expansion Indicator tooltip label */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-14 top-1.5 px-2.5 py-1 rounded bg-[#111111] border-2 border-[#C5A85C] shadow-[0_0_10px_rgba(197,168,92,0.4)] text-[9px] text-[#FAF6ED] whitespace-nowrap font-mono"
                >
                  <span className="text-[#C5A85C] mr-1">AMMAN:</span>
                  {jordanTime.toLocaleTimeString(language === 'ar' ? 'ar-JO' : 'en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                  {weatherTemp !== null && <span className="ml-1 text-stone-300">| {weatherTemp}°C</span>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
