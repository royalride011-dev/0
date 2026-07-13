/**
 * Royal Ride Jordan - Performance Prefetch Engine
 * Handles dynamic preloading of lazy routes on idle or hover
 */

export const prefetchMap = {
  about: () => import('../components/About'),
  services: () => import('../components/ServicesShowcase'),
  contact: () => import('../components/ContactForm'),
  partners: () => import('../components/Partners'),
  blog: () => import('../components/Blog'),
  fleet: () => import('../components/FleetCarousel'),
  tourism: () => import('../components/TourismCarousel'),
  reviews: () => import('../components/Reviews'),
  sovereignReviews: () => import('../components/SovereignReviewsCarousel'),
};

const prefetched = new Set<string>();

export function prefetch(key: keyof typeof prefetchMap) {
  if (prefetched.has(key)) return;
  prefetched.add(key);
  prefetchMap[key]().catch((err) => {
    console.warn(`Failed to prefetch chunk for: ${key}`, err);
    prefetched.delete(key);
  });
}

export function prefetchIdle() {
  const idleCallback = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 150));
  idleCallback(() => {
    // Stagger imports so the browser doesn't block critical asset delivery
    Object.keys(prefetchMap).forEach((key, index) => {
      setTimeout(() => {
        prefetch(key as keyof typeof prefetchMap);
      }, 500 + index * 150);
    });
  });
}
