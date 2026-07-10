import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, Calendar, Clock, User, CheckCircle, RefreshCw, History, Trash2, Instagram, Mic, Square, Play, Pause, Volume2, AlertCircle, MapPin, Search, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShimmerHoverEffect from './ShimmerHoverEffect';
import { VEHICLES, SERVICES, JORDAN_LOCATIONS } from '../data';
import { BookingInquiry } from '../types';
import { useLanguage } from '../LanguageContext';
import AmmanWeatherWidget from './AmmanWeatherWidget';
import WhatsAppIcon from './WhatsAppIcon';
import { GoldCorners, GoldDivider } from './GoldOrnament';

interface ContactFormProps {
  selectedServiceId: string;
  selectedVehicleId: string;
  onClearSelections: () => void;
}

export default function ContactForm({ selectedServiceId, selectedVehicleId, onClearSelections }: ContactFormProps) {
  const { language, t, isRtl } = useLanguage();

  // Booking State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+962 ');
  
  const [pickup, setPickup] = useState(JORDAN_LOCATIONS[0].nameEn);
  const [dropoff, setDropoff] = useState(JORDAN_LOCATIONS[1].nameEn);
  const [service, setService] = useState(SERVICES[0].id);
  const [vehicle, setVehicle] = useState(VEHICLES[0].id);
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Advanced Location States
  const [locationMethod, setLocationMethod] = useState<'dropdown' | 'custom' | 'gps'>('dropdown');
  const [customPickup, setCustomPickup] = useState('');
  const [customDropoff, setCustomDropoff] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleGetGPSLocation = () => {
    if (!navigator.geolocation) {
      setFormError(language === 'en'
        ? "Geolocation is not supported by your browser environment."
        : "المتصفح أو النظام الحالي لا يدعم نظام تحديد المواقع الجغرافية GPS.");
      setLocationMethod('dropdown');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const gpsStr = `GPS Location: Latitude ${latitude.toFixed(5)}, Longitude ${longitude.toFixed(5)} (Direct Share)`;
        setPickup(gpsStr);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        let errorMsg = language === 'en' 
          ? "Failed to acquire location. Please grant permission or type your address manually." 
          : "لم نتمكن من الحصول على الإحداثيات المباشرة. يرجى تفعيل إذن الموقع بمتصفحك أو استخدام البحث اليدوي.";
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = language === 'en'
            ? "Location permission was denied. Please allow location access or switch to 'Search Address'."
            : "تم رفض إذن تحديد الموقع. يرجى تفعيل الصلاحية من إعدادات المتصفح أو الانتقال لعلامة 'البحث عن موقع'.";
        }
        
        setFormError(errorMsg);
        setLocationMethod('dropdown');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };
  
  // Interactive UI States
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<BookingInquiry | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Local storage inquiry logs
  const [pastInquiries, setPastInquiries] = useState<BookingInquiry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // VIP voice note recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceNoteBase64, setVoiceNoteBase64] = useState<string | undefined>(undefined);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const timerRef = React.useRef<any>(null);
  const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null);

  // Auto clean audio blobs to maintain pristine system memory footprint
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !window.MediaRecorder) {
        setFormError(language === 'en'
          ? "Your device environment does not support audio MediaRecorder features."
          : "لم يتم العثور على بروتوكول للتسجيل الصوتي في بيئة العرض الحالية.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setVoiceNoteBase64(base64data);
        };

        // Instantly shut down camera/mic hardware streams to clear status bars
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setFormError(language === 'en'
        ? "Microphone access blocked. Please enable permissions in your web browser settings."
        : "تم حظر الميكروفون. يرجى تعديل الصلاحيات في إعدادات متصفحك للسماح بالتسجيل.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const deleteVoiceNote = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(undefined);
    setVoiceNoteBase64(undefined);
    setIsPlaying(false);
    setRecordingDuration(0);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
  };

  const togglePlayPlayback = () => {
    if (!audioPlayerRef.current || !audioUrl) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Sync with prop triggers (when users click Explore Service / Book Vehicle buttons)
  useEffect(() => {
    if (selectedServiceId) {
      setService(selectedServiceId);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedVehicleId) {
      setVehicle(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  // Load Inquiries History from Local Storage 
  useEffect(() => {
    const saved = localStorage.getItem('royal_ride_inquiries_v1');
    if (saved) {
      try {
        setPastInquiries(JSON.parse(saved));
      } catch (err) {
        // Silently ignore corrupted storage
      }
    }
  }, []);

  // Live Cost Estimation Calculator
  useEffect(() => {
    const pLoc = JORDAN_LOCATIONS.find(l => l.nameEn === pickup || l.nameAr === pickup);
    const dLoc = JORDAN_LOCATIONS.find(l => l.nameEn === dropoff || l.nameAr === dropoff);
    const selectedVehObj = VEHICLES.find(v => v.id === vehicle);

    if (pLoc && dLoc && selectedVehObj) {
      // Calculate realistic distance difference in km (floor is 15km for city loops)
      const rawDistance = Math.abs(pLoc.baseDist - dLoc.baseDist);
      const computedDistance = rawDistance === 0 ? 25 : rawDistance;

      setEstimatedDistance(computedDistance);

      // Total Cost = base price + (distance * per_km rate)
      const cost = selectedVehObj.basePrice + (computedDistance * selectedVehObj.estimatedPricePerKm);
      setEstimatedCost(Math.round(cost));
    }
  }, [pickup, dropoff, vehicle]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !date || !time) {
      setFormError(language === 'en' ? 'Please fill out all required fields.' : 'يرجى ملء جميع الحقول المطلوبة لتقديم الطلب.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        service, 
        pickupDate: date, 
        name: customerName, 
        email: customerEmail, 
        phone: customerPhone 
      })
    })
    .then(async (response) => {
      if (!response.ok) throw new Error('Failed');

      const selectedSrv = SERVICES.find(s => s.id === service);
      const selectedVeh = VEHICLES.find(v => v.id === vehicle);

      const newInquiry: BookingInquiry = {
        id: 'RR-' + Math.floor(100000 + Math.random() * 900000),
        customerName,
        customerEmail,
        customerPhone,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        serviceType: selectedSrv?.title || service,
        vehicleId: selectedVeh?.name || vehicle,
        date,
        time,
        additionalNotes: notes,
        estimatedCost,
        status: 'Pending',
        createdAt: new Date().toLocaleDateString(),
        voiceNote: voiceNoteBase64
      };

      const updatedLogs = [newInquiry, ...pastInquiries];
      setPastInquiries(updatedLogs);
      localStorage.setItem('royal_ride_inquiries_v1', JSON.stringify(updatedLogs));

      setSubmittedInquiry(newInquiry);
      onClearSelections();
      setAudioUrl(undefined);
      setVoiceNoteBase64(undefined);
      setRecordingDuration(0);
      setIsPlaying(false);
    })
    .catch(() => {
      setFormError(language === 'en' ? 'Submission failed.' : 'فشل الإرسال.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const clearHistory = () => {
    if (window.confirm(language === 'en' ? 'Are you sure you want to clear booking history?' : 'هل تريد بالتأكيد تصفير سجل طلباتك؟')) {
      setPastInquiries([]);
      localStorage.removeItem('royal_ride_inquiries_v1');
    }
  };

  // Generate WhatsApp text parameters
  const getWhatsAppURL = (inq: BookingInquiry) => {
    let msg = '';
    if (language === 'en') {
      msg = `Hello Royal Ride Jordan! 👑
I would like to submit my VIP Transport Inquiry:

🏷️ *Inquiry ID:* ${inq.id}
👤 *Name:* ${inq.customerName}
📞 *Phone:* ${inq.customerPhone}
📍 *From:* ${inq.pickupLocation}
🏁 *To:* ${inq.dropoffLocation}
🚗 *Vehicle:* ${inq.vehicleId}
📅 *Date:* ${inq.date} at ${inq.time}
💰 *Rate:* Custom quotation on request
💬 *Requests:* ${inq.additionalNotes || 'None'}

Please confirm my reservation. Thank you!`;
    } else {
      msg = `مرحباً رويال رايد الأردن! 👑
أود إرسال طلب استفسار حجز نقل فاخر:

🏷️ *رمز الطلب:* ${inq.id}
👤 *الاسم:* ${inq.customerName}
📞 *الهاتف:* ${inq.customerPhone}
📍 *نقطة البدء:* ${inq.pickupLocation}
🏁 *وجهة التوصيل:* ${inq.dropoffLocation}
🚗 *المركبة المطلوبة:* ${inq.vehicleId}
📅 *تاريخ الحجز:* ${inq.date} في ${inq.time}
💰 *التعرفة:* تسعير مخصص عند التواصل
💬 *ملاحظات خاصة:* ${inq.additionalNotes || 'لا يوجد'}

يرجى تأكيد الحجز والتواصل معي في أقرب وقت. شكراً لكم!`;
    }
    
    return `https://wa.me/962775328853?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="book" className="relative py-24 bg-royal-navy-950 overflow-hidden">
      
      {/* Decorative Radial Backdrop */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[700px] h-[700px] bg-champagne-gold-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col gap-12">
          
          {/* Left Column: Premium Contact details and WhatsApp direct */}
          <div className="w-full space-y-8 order-2">
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-champagne-gold-400">
                {language === 'en' ? 'Direct Communication' : 'تواصل مباشر وفوري بخصوص الحجوزات'}
              </span>
              <h2 className="font-serif text-3.5xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-gradient mt-3 mb-6">
                {language === 'en' ? (
                  <>
                    Connect With Our <br />
                    <span className="text-gold-gradient italic">VIP Concierge</span>
                  </>
                ) : (
                  <>
                    تواصل فوراً مع <br />
                    <span className="text-gold-gradient italic">الكونسيرج والتشريفات</span>
                  </>
                )}
              </h2>
              <div className={`w-16 h-[1.5px] bg-champagne-gold-500 mb-6 ${isRtl ? 'ml-auto' : ''}`} />
              <p className="font-sans text-sm text-champagne-gold-100/70 leading-relaxed font-light">
                {language === 'en'
                  ? 'Our luxury transportation coordinators are available 24 hours a day, 7 days a week, including holidays, to assist with custom flight routing, regional border permissions, or multi-day tourism plans.'
                  : 'منسقو النقل الفاخر وخدمتكم متاحون على مدار ٢٤ ساعة طواف الأسبوع بأكمله، ومستعدون للمساعدة في تسيير المعاملات وتتبع رحلات المطارات والتنسيق عبر المعابر الحدودية للأردن بريادة تامة.'}
              </p>
            </div>

            {/* Quick Contacts List - Removed, using compact footer instead */}


            {/* Amman Luxury Weather Advisory */}
            <div className="mt-6">
              <AmmanWeatherWidget />
            </div>

            {/* Past Inquiries Trigger (if logs exist) */}
            {pastInquiries.length > 0 && (
              <div className={`pt-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-champagne-gold-400 hover:text-champagne-gold-100 transition-colors"
                >
                  <History className="w-4 h-4 mr-1.5" />
                  <span>
                    {showHistory 
                      ? (language === 'en' ? 'Hide My Inquiries' : 'إخفاء سجل الحجوزات السابقة') 
                      : (language === 'en' ? `Show My Inquiries (${pastInquiries.length})` : `معاينة سجل استفساراتي السابقة (${pastInquiries.length})`)}
                  </span>
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Dynamic Form / Success Card with gold crown boundaries */}
          <div className="contact-form w-full bg-royal-navy-900/90 rounded-2xl relative overflow-hidden shadow-2xl p-6 sm:p-8 order-1">
            <GoldCorners />
            
            <AnimatePresence mode="wait">
              
              {/* STATUS A: Submitted Succesfully Card with direct WhatsApp triggers */}
              {submittedInquiry ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne-gold-500/10 text-champagne-gold-400 border border-champagne-gold-500/30 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-champagne-gold-100">
                      {language === 'en' ? 'Estimate Inquiry Successfully Generated' : 'تم استلام وتوليد تقدير رحلتكم بنجاح'}
                    </h3>
                    <p className="font-serif text-sm text-champagne-gold-400">
                      {language === 'en' ? 'Concierge Reference ID:' : 'رمز تتبع الملف الخاص بكم:'} <strong className="text-white font-mono tracking-wide">{submittedInquiry.id}</strong>
                    </p>
                  </div>

                  <p className="font-sans text-xs text-champagne-gold-100/70 leading-relaxed max-w-lg mx-auto">
                    {language === 'en' 
                      ? `Dear esteemed guest ${submittedInquiry.customerName}, your custom transportation parameters have been registered. To instantly validate your reservation, secure the vehicle, and coordinate arrival protocol, please click the button below to send your itinerary request directly to our Amman dispatcher team via WhatsApp.`
                      : `عزيزنا الضيف المتميز ${customerName}، تم تسجيل مسار رحلتكم الفاخرة بدقة في سجلاتنا المحلية. لتثبيت الموعد فوراً وتأكيد حجز السائق والسيارة المطلوبة، يرجى النقر أدناه لإرسال تفاصيل المسار مباشرة إلى منسق الاستقبال الملكي الخاص بمكتب عمان عبر الواتساب.`}
                  </p>

                  {/* Summary of what they booked */}
                  <div className="border border-champagne-gold-500/15 rounded bg-royal-navy-950 p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-royal-navy-800 pb-1.5 text-[10px] uppercase font-mono tracking-wider text-champagne-gold-400">
                      <span>{language === 'en' ? 'Itinerary Summary' : 'بيانات استمارة تقدير الرحلة'}</span>
                      <span>{language === 'en' ? 'Estimated' : 'تقديري'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-champagne-gold-100">{language === 'en' ? 'Chauffeur Service:' : 'مستوى فئة الخدمة:'}</span>
                      <span className="text-champagne-gold-200">
                        {submittedInquiry.serviceType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-champagne-gold-100">{language === 'en' ? 'Luxury Fleet Choice:' : 'خيار الأسطول المختار:'}</span>
                      <span className="text-champagne-gold-200">{submittedInquiry.vehicleId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-champagne-gold-100">{language === 'en' ? 'Route Journey:' : 'مسار التنقل والعبور:'}</span>
                      <span className="text-champagne-gold-200 truncate max-w-[240px]">
                        {submittedInquiry.pickupLocation} ➔ {submittedInquiry.dropoffLocation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-champagne-gold-100">{language === 'en' ? 'Date & Time Location:' : 'تاريخ وتوقيت التحرك:'}</span>
                      <span className="text-champagne-gold-200">{submittedInquiry.date} {language === 'en' ? 'at' : 'في'} {submittedInquiry.time}</span>
                    </div>
                    <div className="flex justify-between border-t border-royal-navy-800 pt-2 font-semibold">
                      <span className="text-champagne-gold-200 font-serif">{language === 'en' ? 'Estimated Cost:' : 'تفاصيل تسعير التعرفة:'}</span>
                      <span className="text-[#FAF6ED] font-mono text-sm">{language === 'en' ? 'Quote on Request' : 'تحدد للتأكيد عند التواصل'}</span>
                    </div>
                    {submittedInquiry.voiceNote && (
                      <div className="border-t border-royal-navy-800 pt-2.5 flex items-center justify-between">
                        <span className="text-champagne-gold-100 flex items-center gap-1.5 font-sans">
                          <Mic className="w-3.5 h-3.5 text-champagne-gold-400" />
                          <span>{language === 'en' ? 'Voice Request:' : 'الرسالة الصوتية:'}</span>
                        </span>
                        <audio 
                          src={submittedInquiry.voiceNote} 
                          controls 
                          className="h-7 w-40 max-w-[170px] bg-transparent text-[#FAF6ED] scale-90 origin-right" 
                        />
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                    <a
                      href={getWhatsAppURL(submittedInquiry)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded shadow transition-transform hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <WhatsAppIcon className="w-4 h-4 mr-2 fill-current" />
                      {language === 'en' ? 'Send via WhatsApp' : 'إرسال الملف وتأكيد عبر الواتساب'}
                      <ShimmerHoverEffect />
                    </a>
                    
                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="inline-flex items-center justify-center border border-champagne-gold-500/20 hover:border-champagne-gold-500/50 text-champagne-gold-300 font-sans text-xs uppercase tracking-widest py-3 px-6 rounded transition-colors relative overflow-hidden"
                    >
                      {language === 'en' ? 'Create New Inquiry' : 'إنشاء نموذج استفسار ثانٍ'}
                      <ShimmerHoverEffect />
                    </button>
                  </div>

                </motion.div>
              ) : showHistory ? (
                
                /* STATUS B: Inquiries Logs List */
                <motion.div
                  key="history-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className={`flex items-center justify-between border-b border-royal-navy-800 pb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-serif text-lg font-bold text-champagne-gold-200 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <History className={`w-5 h-5 text-champagne-gold-500 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                      <span>{language === 'en' ? 'Your Saved Booking Estimates' : 'تقديرات رحلاتك المحفوظة محلياً'}</span>
                    </h3>
                    <button
                      onClick={clearHistory}
                      className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center space-x-1"
                      title="Clear records"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Clear All' : 'مسح السجل'}</span>
                    </button>
                  </div>

                  <div className="max-h-[380px] overflow-y-auto gold-scrollbar space-y-4 pr-1">
                    {pastInquiries.map((inq) => (
                      <div key={inq.id} className={`p-4 rounded border border-royal-navy-8 w-full bg-royal-navy-950/80 space-y-3 relative text-xs ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="font-mono text-[10px] text-champagne-gold-300 font-bold">{inq.id}</span>
                          <span className="text-[10px] bg-royal-navy-900 text-champagne-gold-400 px-2 py-0.5 rounded border border-champagne-gold-500/10">
                            {inq.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-champagne-gold-100/70 border-b border-royal-navy-850 pb-2">
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <span className="text-champagne-gold-400 block text-[9px] font-mono uppercase">{language === 'en' ? 'Vehicle' : 'المركبة'}</span>
                            {inq.vehicleId}
                          </div>
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <span className="text-champagne-gold-400 block text-[9px] font-mono uppercase">{language === 'en' ? 'Service' : 'الخدمة'}</span>
                            {inq.serviceType.split(' • ')[isRtl ? 1 : 0] || inq.serviceType}
                          </div>
                          <div className={`col-span-2 pt-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                            <span className="text-champagne-gold-400 block text-[9px] font-mono uppercase">{language === 'en' ? 'Journey Route' : 'مسار وتفاصيل المسافة'}</span>
                            {inq.pickupLocation} ➔ {inq.dropoffLocation}
                          </div>
                        </div>

                        {inq.voiceNote && (
                          <div className={`p-2 bg-royal-navy-900 border border-champagne-gold-500/10 rounded flex items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <span className="text-[10px] text-champagne-gold-300 flex items-center gap-1 font-sans">
                              <Mic className="w-3 h-3 text-champagne-gold-400" />
                              <span>{language === 'en' ? 'Voice Request:' : 'طلب الصوتي:'}</span>
                            </span>
                            <audio 
                              src={inq.voiceNote} 
                              controls 
                              className="h-6 w-36 bg-transparent text-[#FAF6ED] scale-90 opacity-90 origin-right" 
                            />
                          </div>
                        )}

                        <div className={`flex items-center justify-between text-xs font-semibold pt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="text-champagne-gold-300">
                            {language === 'en' ? 'Price: Custom Quote on Request' : 'الأسعار: تحدد للتأكيد عند التواصل'}
                          </span>
                          <a
                            href={getWhatsAppURL(inq)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-[10px] uppercase font-mono tracking-wider text-[#25D366] hover:text-[#20ba59]"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                            {language === 'en' ? 'Send to Dispatch' : 'إرسال للمكتب التنسيقي'}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowHistory(false)}
                      className="w-full text-center border border-royal-navy-800 text-champagne-gold-300 py-3 rounded text-xs uppercase font-mono tracking-widest hover:border-champagne-gold-500/25 transition-colors"
                    >
                      {language === 'en' ? 'Return to Reservation Form' : 'العودة لنموذج الحجز'}
                    </button>
                  </div>
                </motion.div>

              ) : (
                
                /* STATUS C: Standard Booking Form Inputs */
                <motion.form
                  id="bookingForm"
                  key="booking-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h3 className="font-serif text-xl font-bold text-champagne-gold-100 mb-2">
                      {language === 'en' ? 'Luxury Fare Estimator & Secure Booking' : 'حساب التكلفة التقديرية الحية وطلب الحجز'}
                    </h3>
                    <p className="text-xs text-champagne-gold-100/60 font-sans font-light">
                      {language === 'en'
                        ? 'Enter your precise itinerary inputs. Our logic dynamically calculates regional miles to provide optimal five-star pricing summaries and options.'
                        : 'الرجاء إدخال تفاصيل رحلتكم وسيقوم برمجية التقدير اللحظية باحتساب الأسعار وفق معلومات أسطول وعقود رويال رايد ومسافة العبور.'}
                    </p>
                  </div>

                  {/* Customer personal details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="name" className={`text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <User className={`w-3.5 h-3.5 text-champagne-gold-500 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                        <span>{language === 'en' ? 'Full Name *' : 'الاسم الكامل للضيف الكريم *'}</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Richard Harrington"
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-sm text-[#FAF6ED] outline-none transition-all duration-300 placeholder:text-royal-navy-700 font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      />
                    </div>

                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="email" className={`text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Mail className={`w-3.5 h-3.5 text-champagne-gold-500 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                        <span>{language === 'en' ? 'Email Address *' : 'البريد الإلكتروني المعتمد *'}</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. richard@harringtonglobal.com"
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-sm text-[#FAF6ED] outline-none transition-all duration-300 placeholder:text-royal-navy-700 font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      />
                    </div>

                    <div className={`space-y-2 md:col-span-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="phoneNumber" className={`text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Phone className={`w-3.5 h-3.5 text-champagne-gold-500 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                        <span>{language === 'en' ? 'Phone & WhatsApp Number *' : 'رقم الهاتف والواتساب الفعال *'}</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +962 7 9011 0110"
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-sm text-[#FAF6ED] outline-none transition-all duration-300 placeholder:text-royal-navy-700 font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      />
                    </div>
                  </div>

                  {/* Route location pickups - Advanced with Search and Live GPS */}
                  <div className="pt-3 border-t border-royal-navy-850 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-champagne-gold-400">
                        {language === 'en' ? 'Location Selector Option' : 'خيار تحديد موقع ومسار الرحلة'}
                      </span>
                      
                      {/* Advanced Selector Toggles */}
                      <div className="inline-flex rounded p-0.5 bg-royal-navy-950/80 border border-champagne-gold-500/10">
                        <button
                          type="button"
                          onClick={() => {
                            setLocationMethod('dropdown');
                          }}
                          className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider rounded transition-all duration-300 cursor-pointer ${
                            locationMethod === 'dropdown'
                              ? 'bg-[#C5A85C] text-black font-semibold shadow'
                              : 'text-champagne-gold-300 hover:text-white'
                          }`}
                        >
                          {language === 'en' ? 'Preset Cities' : 'الوجهات القياسية'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLocationMethod('custom');
                            if (!customPickup) {
                              setCustomPickup(pickup);
                            }
                            if (!customDropoff) {
                              setCustomDropoff(dropoff);
                            }
                          }}
                          className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider rounded transition-all duration-300 cursor-pointer ${
                            locationMethod === 'custom'
                              ? 'bg-[#C5A85C] text-black font-semibold shadow'
                              : 'text-champagne-gold-300 hover:text-white'
                          }`}
                        >
                          {language === 'en' ? 'Search Address' : 'البحث عن موقع'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLocationMethod('gps');
                            handleGetGPSLocation();
                          }}
                          className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider rounded transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                            locationMethod === 'gps'
                              ? 'bg-[#C5A85C] text-black font-semibold shadow'
                              : 'text-champagne-gold-300 hover:text-white'
                          }`}
                        >
                          <Navigation className="w-2.5 h-2.5" />
                          {language === 'en' ? 'Live GPS' : 'بث مباشر (GPS)'}
                        </button>
                      </div>
                    </div>

                    {/* Geolocation Loading State */}
                    {isLocating && (
                      <div className="p-3 rounded border border-champagne-gold-500/20 bg-royal-navy-950 flex items-center gap-3 text-xs text-champagne-gold-200">
                        <RefreshCw className="w-4 h-4 text-champagne-gold-400 animate-spin" />
                        <span>{language === 'en' ? 'Connecting to GPS satellites...' : 'جاري استقبال وقراءة إشارات الموقع الجغرافي من الأقمار الصناعية...'}</span>
                      </div>
                    )}

                    {/* RENDER METHOD A: PRESET DROP DOWNS */}
                    {locationMethod === 'dropdown' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label htmlFor="pickupSelect" className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 block">
                            {language === 'en' ? 'Pickup Location Coordinates *' : 'موقع وتنسيق إقلاع الركوب *'}
                          </label>
                          <select
                            id="pickupSelect"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                          >
                            {JORDAN_LOCATIONS.map((loc) => (
                              <option key={loc.nameEn} value={language === 'en' ? loc.nameEn : loc.nameAr} className="bg-royal-navy-950 text-xs">
                                {language === 'en' ? loc.nameEn : loc.nameAr}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label htmlFor="dropoffSelect" className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 block">
                            {language === 'en' ? 'Dropoff Destination *' : 'وجهة ونقطة التوصيل النهائية *'}
                          </label>
                          <select
                            id="dropoffSelect"
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                            className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                          >
                            {JORDAN_LOCATIONS.map((loc) => (
                              <option key={loc.nameEn} value={language === 'en' ? loc.nameEn : loc.nameAr} className="bg-royal-navy-950 text-xs">
                                {language === 'en' ? loc.nameEn : loc.nameAr}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* RENDER METHOD B: CUSTOM ADDRESS SEARCH INPUTS */}
                    {locationMethod === 'custom' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={`space-y-2 relative ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label htmlFor="customPickupInput" className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 flex items-center gap-1.5 justify-start">
                            <Search className="w-3.5 h-3.5 text-champagne-gold-400" />
                            <span>{language === 'en' ? 'Search / Type Pickup Place *' : 'ابحث أو اكتب موقع الإقلاع المخصص *'}</span>
                          </label>
                          <input
                            id="customPickupInput"
                            type="text"
                            required
                            value={customPickup}
                            onChange={(e) => {
                              setCustomPickup(e.target.value);
                              setPickup(e.target.value);
                            }}
                            placeholder={language === 'en' ? 'e.g. Ritz-Carlton Amman, Abdali Blvd, Street Name...' : 'مثال: فندق ريتز كارلتون، بوليفارد العبدلي، اسم الشارع...'}
                            className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                          />
                          
                          {/* Search Auto-Suggestions dropdown filtered from JORDAN_LOCATIONS */}
                          {customPickup.length > 0 && JORDAN_LOCATIONS.filter(l => 
                            l.nameEn.toLowerCase().includes(customPickup.toLowerCase()) || 
                            l.nameAr.includes(customPickup)
                          ).length > 0 && (
                            <div className="absolute left-0 right-0 mt-1 bg-royal-navy-950 border border-champagne-gold-500/20 rounded shadow-2xl z-30 max-h-[150px] overflow-y-auto gold-scrollbar text-xs">
                              {JORDAN_LOCATIONS.filter(l => 
                                l.nameEn.toLowerCase().includes(customPickup.toLowerCase()) || 
                                l.nameAr.includes(customPickup)
                              ).map((loc) => {
                                const displayName = language === 'en' ? loc.nameEn : loc.nameAr;
                                return (
                                  <button
                                    key={loc.nameEn}
                                    type="button"
                                    onClick={() => {
                                      setCustomPickup(displayName);
                                      setPickup(displayName);
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-royal-navy-900 text-champagne-gold-200 hover:text-white transition-colors border-b border-royal-navy-900/40 block"
                                  >
                                    {displayName}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        <div className={`space-y-2 relative ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label htmlFor="customDropoffInput" className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 flex items-center gap-1.5 justify-start">
                            <Search className="w-3.5 h-3.5 text-champagne-gold-400" />
                            <span>{language === 'en' ? 'Search / Type Dropoff Place *' : 'ابحث أو اكتب وجهة التوصيل المخصصة *'}</span>
                          </label>
                          <input
                            id="customDropoffInput"
                            type="text"
                            required
                            value={customDropoff}
                            onChange={(e) => {
                              setCustomDropoff(e.target.value);
                              setDropoff(e.target.value);
                            }}
                            placeholder={language === 'en' ? 'e.g. Petra Guest House, Dead Sea Spa, Airport...' : 'مثال: بيت ضيافة البتراء، فندق كراون بلازا البحر الميت...'}
                            className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                          />

                          {/* Search Auto-Suggestions dropdown filtered from JORDAN_LOCATIONS */}
                          {customDropoff.length > 0 && JORDAN_LOCATIONS.filter(l => 
                            l.nameEn.toLowerCase().includes(customDropoff.toLowerCase()) || 
                            l.nameAr.includes(customDropoff)
                          ).length > 0 && (
                            <div className="absolute left-0 right-0 mt-1 bg-royal-navy-950 border border-champagne-gold-500/20 rounded shadow-2xl z-30 max-h-[150px] overflow-y-auto gold-scrollbar text-xs">
                              {JORDAN_LOCATIONS.filter(l => 
                                l.nameEn.toLowerCase().includes(customDropoff.toLowerCase()) || 
                                l.nameAr.includes(customDropoff)
                              ).map((loc) => {
                                const displayName = language === 'en' ? loc.nameEn : loc.nameAr;
                                return (
                                  <button
                                    key={loc.nameEn}
                                    type="button"
                                    onClick={() => {
                                      setCustomDropoff(displayName);
                                      setDropoff(displayName);
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-royal-navy-900 text-champagne-gold-200 hover:text-white transition-colors border-b border-royal-navy-900/40 block"
                                  >
                                    {displayName}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* RENDER METHOD C: GEOLOCATION / GPS DIRECT LOCATION */}
                    {locationMethod === 'gps' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 flex items-center gap-1.5 justify-start">
                            <MapPin className="w-3.5 h-3.5 text-red-500 animate-pulse animate-duration-1000" />
                            <span>{language === 'en' ? 'Direct GPS Coordinates *' : 'الإرسال المباشر للموقع الجغرافي (GPS) *'}</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              readOnly
                              value={pickup}
                              className="w-full px-4 py-3 bg-royal-navy-950/80 border border-emerald-500/40 focus:border-emerald-400 rounded text-xs text-emerald-400 font-mono outline-none cursor-not-allowed"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
                              <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-500 font-bold">{language === 'en' ? 'Live GPS' : 'بث مباشر'}</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-champagne-gold-100/50 block leading-normal mt-1">
                            {language === 'en' 
                              ? 'Your exact browser latitude and longitude were captured securely. This is transmitted directly to our VIP dispatch desk.'
                              : 'تم استلام خطوط العرض والطول الدقيقة لمتصفحك بنجاح. سيتم إرسال هذا الرابط الجغرافي تلقائياً إلى خريطة السائق لتوصيلك.'}
                          </span>
                        </div>

                        {/* Dropoff in GPS mode (remains standard select or custom typed input for flexibility) */}
                        <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <label htmlFor="gpsDropoffSelect" className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 block">
                            {language === 'en' ? 'Dropoff Destination *' : 'وجهة ونقطة التوصيل النهائية *'}
                          </label>
                          <select
                            id="gpsDropoffSelect"
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                            className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                          >
                            {JORDAN_LOCATIONS.map((loc) => (
                              <option key={loc.nameEn} value={language === 'en' ? loc.nameEn : loc.nameAr} className="bg-royal-navy-950 text-xs">
                                {language === 'en' ? loc.nameEn : loc.nameAr}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Choices: Service & Vehicle selectors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-royal-navy-850">
                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="serviceSelect" className="text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 block">
                        {language === 'en' ? 'Service Class Category *' : 'فئة نوع الخدمة الأساسية *'}
                      </label>
                      <select
                        id="serviceSelect"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      >
                        {SERVICES.map((serv) => (
                          <option key={serv.id} value={serv.id} className="bg-royal-navy-950 text-xs text-right">
                            {language === 'en' ? serv.title.split(' • ')[0] : serv.title.split(' • ')[1]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="vehicleSelect" className="text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 block">
                        {language === 'en' ? 'Desired Fleet Vehicle *' : 'نوع فئة سيارة الأسطول المفضلة *'}
                      </label>
                      <select
                        id="vehicleSelect"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      >
                        {VEHICLES.map((v) => {
                          const translatedType = language === 'en' 
                            ? v.type 
                            : v.id === 'comfort-class' 
                              ? 'سيدان مريحة فاخرة'
                              : v.id === 'staria' 
                                ? 'ڤان عائلي ستاريا كبار الشخصيات'
                                : v.id === 'luxury-cars' 
                                  ? 'ليموزين النخبة الملكية'
                                  : v.id === 'toyota-hiace' 
                                    ? 'ڤان هايس للمجموعات الكبيرة'
                                    : v.id === 'toyota-coaster'
                                      ? 'باص كوستر سياحي فاخر'
                                      : v.type;
                          return (
                            <option key={v.id} value={v.id} className="bg-royal-navy-950 text-xs">
                              {language === 'en' 
                                ? v.name 
                                : v.id === 'comfort-class'
                                  ? 'الفئة المريحة (سيدان)'
                                  : v.id === 'staria'
                                    ? 'هيونداي ستاريا VIP'
                                    : v.id === 'luxury-cars'
                                      ? 'السيارات الفاخرة والفارهة'
                                      : v.id === 'toyota-hiace'
                                        ? 'تويوتا هايس السياحية'
                                        : 'باص تويوتا كوستر الفاخر'
                              } ({translatedType})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Date and locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-royal-navy-850">
                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="travelDate" className={`text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Calendar className={`w-3.5 h-3.5 text-champagne-gold-500 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                        <span>{language === 'en' ? 'Travel Date *' : 'تاريخ تحرك الرحلة *'}</span>
                      </label>
                      <input
                        id="travelDate"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      />
                    </div>

                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <label htmlFor="pickupTime" className={`text-[10px] font-serif uppercase tracking-wider text-champagne-gold-300 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Clock className={`w-3.5 h-3.5 text-champagne-gold-500 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                        <span>{language === 'en' ? 'Pickup Time (Local) *' : 'توقيت ركوب وتحرك الضيف *'}</span>
                      </label>
                      <input
                        id="pickupTime"
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 cursor-pointer font-sans focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                      />
                    </div>
                  </div>

                  {/* Special remarks */}
                  <div className={`space-y-2 pt-3 border-t border-royal-navy-850 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <label htmlFor="remarks" className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 block">
                      {language === 'en' ? 'Special requests, Flight tags or Chauffeur instructions' : 'ملاحظات وتفاصيل الطيران وتوجيهات خاصة بالسائق'}
                    </label>
                    <textarea
                      id="remarks"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'en' ? 'e.g., flight RJ-502, infant child seat requested, quiet cabin ride...' : 'على سبيل المثال: رحلة الملكية رقم RJ-502، مقعد طفل رضيع، بيئة هادئة خلال التوصيل...'}
                      className="w-full px-4 py-3 bg-royal-navy-950 border border-champagne-gold-500/25 hover:border-champagne-gold-500/60 focus:border-champagne-gold-400 focus:scale-[1.01] rounded text-xs text-[#FAF6ED] outline-none transition-all duration-300 font-sans resize-none focus:shadow-[0_0_12px_rgba(197,168,92,0.22)]"
                    />
                  </div>

                  {/* VIP Voice Note Recorder */}
                  <div className={`space-y-2 pt-2 pb-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-champagne-gold-300 block">
                      {language === 'en' ? 'Voice Request Concierge (Optional)' : 'التسجيل الصوتي لمتطلبات الخدمة الفاخرة (اختياري)'}
                    </span>
                    <p className="text-[10px] text-champagne-gold-200/60 leading-normal mb-2 font-sans font-light">
                      {language === 'en' 
                        ? 'Record a quick voice message outlining your bespoke service coordinates (e.g. VIP protocol preference, baggage load, beverage preferences).'
                        : 'سجل رسالة صوتية سريعة لإملاء تفاصيل ومواصفات رحلتك الخاصة (مثل تفضيلات البروتوكول الفردي، ونوع المشروبات، وحزم الأمتعة).'}
                    </p>

                    <div className="p-4 rounded-xl border border-champagne-gold-500/15 bg-royal-navy-950/80 flex items-center justify-between gap-4 font-sans text-[#FAF6ED]">
                      {/* Left: Button */}
                      <div className="flex items-center gap-3">
                        {!audioUrl ? (
                          <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isRecording 
                                ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-2 ring-red-400' 
                                : 'bg-[#C5A85C] hover:bg-[#E5C47C] text-black hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(197,168,92,0.2)]'
                            } cursor-pointer`}
                            title={isRecording ? (language === 'en' ? 'Stop Recording' : 'إيقاف التسجيل') : (language === 'en' ? 'Record Voice Note' : 'بدء تسجيل الرسالة الصوتية')}
                          >
                            {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            {/* Playback Control Button */}
                            <button
                              type="button"
                              onClick={togglePlayPlayback}
                              className="p-3 rounded-full bg-[#C5A85C] hover:bg-[#E5C47C] text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow transition-all duration-300"
                              title={isPlaying ? (language === 'en' ? 'Pause' : 'إيقاف مؤقت') : (language === 'en' ? 'Play' : 'تشغيل الاستماع')}
                            >
                              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={deleteVoiceNote}
                              className="p-2 sm:p-2.5 rounded border border-red-500/30 hover:border-red-500 bg-red-950/20 hover:bg-red-950/45 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              title={language === 'en' ? 'Delete Note' : 'حذف التسجيل الحالي'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Status Label / Wave indicator */}
                        <div className={isRtl ? 'text-right' : 'text-left'}>
                          {isRecording ? (
                            <div>
                              <span className="text-xs text-red-500 font-bold tracking-wide flex items-center gap-1.5 animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                {language === 'en' ? 'Recording Live...' : 'جاري التسجيل الآن...'}
                              </span>
                              <span className="text-[10px] text-champagne-gold-300 font-mono">
                                {formatDuration(recordingDuration)}
                              </span>
                            </div>
                          ) : audioUrl ? (
                            <div>
                              <span className="text-xs text-[#FAF6ED] font-semibold tracking-wide flex items-center gap-1">
                                <Volume2 className="w-3.5 h-3.5 text-champagne-gold-400" />
                                {language === 'en' ? 'Voice Request Ready' : 'طلبك الصوتي جاهز للإرسال'}
                              </span>
                              <span className="text-[10px] text-[#C5A85C] font-mono">
                                {language === 'en' ? 'Audio Note Generated' : 'تم تهيئة الملخص الصوتي'}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-xs text-champagne-gold-100 font-medium tracking-wide">
                                {language === 'en' ? 'VIP Audio Concierge' : 'مساعد الإملاء الصوتي لكبار الشخصيات'}
                              </span>
                              <span className="text-[10px] text-champagne-gold-100/50 block leading-none mt-0.5">
                                {language === 'en' ? 'Click to command mic' : 'انقر على الميكروفون للبدء'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Waveform animation */}
                      <div className="flex items-center gap-0.5 h-6">
                        {isRecording ? (
                          // Active pulsing bars
                          [...Array(8)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-[3px] bg-red-500 rounded-full animate-pulse" 
                              style={{ 
                                height: `${Math.floor(Math.random() * 20) + 6}px`,
                                animationDelay: `${i * 120}ms`,
                                animationDuration: '600ms'
                              }} 
                            />
                          ))
                        ) : isPlaying ? (
                          // Playing pulsing gold bars
                          [...Array(8)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-[3px] bg-[#C5A85C] rounded-full animate-pulse" 
                              style={{ 
                                height: `${Math.floor(Math.random() * 20) + 6}px`,
                                animationDelay: `${i * 100}ms`,
                                animationDuration: '500ms'
                              }} 
                            />
                          ))
                        ) : audioUrl ? (
                          // Static waveform preview
                          [...Array(8)].map((_, i) => {
                            const staticHeights = [8, 16, 12, 18, 14, 22, 10, 6];
                            return (
                              <div 
                                key={i} 
                                className="w-[3px] bg-champagne-gold-300/40 rounded-full" 
                                style={{ height: `${staticHeights[i]}px` }} 
                              />
                            );
                          })
                        ) : (
                          // Empty standard pattern
                          [...Array(8)].map((_, i) => (
                            <div key={i} className="w-[3px] h-[3px] bg-champagne-gold-500/15 rounded-full" />
                          ))
                        )}
                      </div>
                    </div>

                    {/* Technical hidden audio player */}
                    {audioUrl && (
                      <audio
                        ref={audioPlayerRef}
                        src={audioUrl}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    )}
                  </div>


                  {formError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded border border-red-500/30 bg-red-950/20 text-red-300 text-xs flex items-start gap-2.5 relative"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        {formError}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setFormError(null)}
                        className="text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                        aria-label="Dismiss alert"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}

                  {/* Form Submission Button upgraded to metallic gold */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-center inline-flex items-center justify-center btn-metallic-gold text-royal-navy-950 font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-6 rounded cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,168,92,0.65)] transform hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          <span>{language === 'en' ? 'Calibrating Ride Plan...' : 'جاري احتساب وإعداد المسار الـ VIP...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-2" />
                          <span>{language === 'en' ? 'Generate & Finish Reservation' : 'تأكيد وإرسال طلب الحجز'}</span>
                        </>
                      )}
                      <ShimmerHoverEffect />
                    </button>
                  </div>

                </motion.form>
              )}
              
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
