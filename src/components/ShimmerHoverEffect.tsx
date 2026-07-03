import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ShimmerHoverEffect() {
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shimmerRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    // Ensure parent has the safety layout styling classes
    parent.classList.add('relative', 'overflow-hidden');

    const triggerShimmer = () => {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { x: '-120%' },
        { x: '220%', duration: 1.0, ease: 'power2.out' }
      );
    };

    parent.addEventListener('mouseenter', triggerShimmer);
    return () => {
      parent.removeEventListener('mouseenter', triggerShimmer);
    };
  }, []);

  return (
    <div
      ref={shimmerRef}
      className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-transparent via-champagne-gold-300/20 via-champagne-gold-100/40 via-champagne-gold-300/20 to-transparent -skew-x-[24deg] pointer-events-none mix-blend-screen"
      style={{ transform: 'translateX(-120%)' }}
    />
  );
}
