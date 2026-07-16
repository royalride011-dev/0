import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export default function LazySection({ 
  children, 
  fallback, 
  rootMargin = '300px', 
  minHeight = '250px' 
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div 
      ref={ref} 
      style={{ minHeight: isInView ? 'auto' : minHeight }} 
      className="w-full relative"
    >
      {isInView ? children : fallback || null}
    </div>
  );
}
