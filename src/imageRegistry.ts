// Centralized Image Registry for Royal Ride Jordan
// This centralizes all local imports and static paths so they can be easily modified or added to in one place.

// Importing assets using ESM to ensure webpack/vite resolve them correctly
import crossBorderTransitImg from './assets/images/services_border_crossings.jpg';
import luxuryHotelDiningImg from './assets/images/services_luxury_hotel_dining.jpg';
import luxuryBookingsImg from './assets/images/services_bookings.png';
import vipSClassAmmanImg from './assets/images/services_vip_s_class.png';
import stariaVipAmmanImg from './assets/images/services_staria_vip_amman.jpg';
import luxuryCarImg from './assets/images/services_luxury_car.png';
import stariaHourlyDailyImg from './assets/images/services_staria_hourly_daily.jpg';
import airportTransitImg from './assets/images/services_airport_transit.jpg';
import limousineServiceImg from './assets/images/services_limousine.png';
const petraTourImg = 'https://images.unsplash.com/photo-1501232479008-56c59344e2e4?auto=format&fit=crop&w=800&q=75';
const ajlounCastleImg = 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=75';
import deadSeaRegeneratedImg from './assets/images/tourism_deadsea.png';
import ammanRegeneratedNewImg from './assets/images/tourism_amman.png';
import petraRegeneratedImg from './assets/images/tourism_petra.png';
import wadiRumRegeneratedImg from './assets/images/tourism_wadirum.png';
import aqabaRegeneratedImg from './assets/images/tourism_aqaba.png';
import jerashRegeneratedImg from './assets/images/tourism_jerash.png';
import beirutRegeneratedImg from './assets/images/tourism_beirut.png';
import ajlounRegeneratedNewImg from './assets/images/tourism_ajloun.png';
import damascusRegeneratedNewImg from './assets/images/tourism_damascus.png';
const wadirumRegeneratedImg = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=75';
import newToyotaHiaceImg from './assets/images/fleet_toyota_hiace.png';
import comfortClassImg from './assets/images/fleet_comfort_class.png';
import newStariaVipImg from './assets/images/fleet_staria_vip.png';
import luxuryGmcYukonImg from './assets/images/regenerated_image_1783812462362.png';
import toyotaCoasterImg from './assets/images/fleet_toyota_coaster.jpg';
import newBlogImg from './assets/images/blog_airport_vip_logistics.jpg';
import crossBorderBlogImg from './assets/images/blog_cross_border_syria_lebanon.jpg';
import newServiceImg from './assets/images/services_international_transit.png';

// Helper to allow live administrative image customization/addition from client-side overrides
const getOverride = (keyPath: string, defaultValue: string): string => {
  if (typeof window !== 'undefined') {
    const savedDefaultRef = localStorage.getItem(`rr_img_default_ref_${keyPath}`);
    
    // Clear custom overrides if the developer has updated the default image in the code
    if (savedDefaultRef && savedDefaultRef !== defaultValue) {
      localStorage.removeItem(`rr_img_override_${keyPath}`);
      localStorage.setItem(`rr_img_default_ref_${keyPath}`, defaultValue);
      return defaultValue;
    }
    
    // Store/update the current default image reference
    localStorage.setItem(`rr_img_default_ref_${keyPath}`, defaultValue);

    const saved = localStorage.getItem(`rr_img_override_${keyPath}`);
    if (saved && saved.trim() && !saved.includes('regenerated_image_1782325973899')) {
      // Clear stale override if code has a newer/different regenerated image
      if (saved.includes('regenerated_image_') && defaultValue.includes('regenerated_image_')) {
        const savedMatch = saved.match(/regenerated_image_(\d+)/);
        const defaultMatch = defaultValue.match(/regenerated_image_(\d+)/);
        if (savedMatch && defaultMatch && savedMatch[1] !== defaultMatch[1]) {
          localStorage.removeItem(`rr_img_override_${keyPath}`);
          return defaultValue;
        }
      }

      // Clear stale local override if the default has been updated to a web URL
      if (defaultValue.includes('http') && (saved.includes('regenerated_image_') || saved.includes('src/'))) {
        localStorage.removeItem(`rr_img_override_${keyPath}`);
        return defaultValue;
      }
      
      // Normalize backslashes to forward slashes
      let cleaned = saved.replace(/\\+/g, '/');
      
      // Ensure it starts with a single slash if it references src/
      if (cleaned.includes('src/') && !cleaned.startsWith('/')) {
        cleaned = '/' + cleaned;
      }

      // If it contains /src/, check if we are in production.
      if (cleaned.includes('/src/')) {
        // In production, raw /src/ paths will fail, so we return the compiled defaultValue
        const isProd = import.meta.env.PROD;
        if (isProd) {
          return defaultValue;
        }
      }
      return cleaned;
    }
  }
  return defaultValue;
};

export const rawImages = {
  fleet: {
    comfortClass: comfortClassImg,
    stariaVip: newStariaVipImg,
    toyotaHiace: newToyotaHiaceImg,
    toyotaCoaster: toyotaCoasterImg,
    luxuryGmcYukon: luxuryGmcYukonImg,
  }
};

export const images = {
  // Hero Section
  hero: {
    bg: getOverride('hero_bg', '/images/royal_ride_hero_ultimate_v2_1781855232538.jpg'),
  },

  // Fleet / Vehicles (FleetCarousel and data.ts)
  fleet: {
    comfortClass: getOverride('fleet_comfortClass', comfortClassImg),
    stariaVip: getOverride('fleet_stariaVip', newStariaVipImg),
    toyotaHiace: getOverride('fleet_toyotaHiace', newToyotaHiaceImg),
    toyotaCoaster: getOverride('fleet_toyotaCoaster', toyotaCoasterImg),
    luxuryGmcYukon: getOverride('fleet_luxuryGmcYukon', luxuryGmcYukonImg),
  },

  // Services Page & Home Services lists
  services: {
    limousinePassenger: getOverride('services_limousinePassenger', limousineServiceImg),
    hotelRestaurantBookings: getOverride('services_hotelRestaurantBookings', luxuryBookingsImg),
    borderCrossingsJordan: getOverride('services_borderCrossingsJordan', crossBorderTransitImg),
    internationalTransit: getOverride('services_internationalTransit', newServiceImg),
    airportTransitJordan: getOverride('services_airportTransitJordan', airportTransitImg),
    corporateTransportation: getOverride('services_corporateTransportation', '/images/corporate_vip_cabin_1782298274501.jpg'),
    carVanRentals: getOverride('services_carVanRentals', luxuryCarImg),
    airportMeetGreet: getOverride('services_airportMeetGreet', '/images/airport_meet_greet_1782298298272.jpg'),
    // Fallbacks or legacy service items
    luxuryHotelDining: getOverride('services_luxuryHotelDining', luxuryHotelDiningImg),
    vipSClassAmman: getOverride('services_vipSClassAmman', vipSClassAmmanImg),
    stariaHourlyDaily: getOverride('services_stariaHourlyDaily', stariaHourlyDailyImg),
  },

  // Tourist Destinations (TourismCarousel)
  tourism: {
    amman: getOverride('tourism_amman', ammanRegeneratedNewImg),
    petra: getOverride('tourism_petra', petraRegeneratedImg),
    wadirum: getOverride('tourism_wadirum', wadiRumRegeneratedImg),
    deadsea: getOverride('tourism_deadsea', deadSeaRegeneratedImg),
    aqaba: getOverride('tourism_aqaba', aqabaRegeneratedImg),
    jerash: getOverride('tourism_jerash', jerashRegeneratedImg),
    madaba: getOverride('tourism_madaba', 'https://images.unsplash.com/photo-1608958416806-039cfffa68b9?auto=format&fit=crop&w=800&q=75'),
    damascus: getOverride('tourism_damascus', damascusRegeneratedNewImg),
    beirut: getOverride('tourism_beirut', beirutRegeneratedImg),
    ajloun: getOverride('tourism_ajloun', ajlounRegeneratedNewImg),
  },

  // About Page
  about: {
    ministryPartner: getOverride('about_ministryPartner', petraTourImg),
    cabinComfort: getOverride('about_cabinComfort', '/images/luxury_car_interior_1782219795811.jpg'),
  },

  // Blog Page
  blog: {
    airportVipLogistics: getOverride('blog_airportVipLogistics', newBlogImg),
    jordanPetraItinerary: getOverride('blog_jordanPetraItinerary', petraTourImg),
    crossBorderSyriaLebanon: getOverride('blog_crossBorderSyriaLebanon', crossBorderBlogImg),
  },

  // Testimonials Avatars
  avatars: {
    richardHarrington: getOverride('avatars_richardHarrington', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=70'),
    elenaRostova: getOverride('avatars_elenaRostova', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=70'),
    tariqAlSaeed: getOverride('avatars_tariqAlSaeed', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=70'),
    marcusSophiaVance: getOverride('avatars_marcusSophiaVance', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&h=80&q=70'),
  }
};
