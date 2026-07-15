import { useEffect, useState, useRef } from 'react';

interface LazyImageProps {
  id?: string;
  src: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function LazyImage({ id, src, srcSet, sizes, placeholder, alt, className, width, height }: LazyImageProps) {
  const [currentSrc, setCurrentSrc] = useState(placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Set up observer with 200px margin so images start loading before entering the viewport
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tempImg = new Image();
          tempImg.src = src;
          if (srcSet) tempImg.srcset = srcSet;
          if (sizes) tempImg.sizes = sizes;
          
          tempImg.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
          };
          
          tempImg.onerror = () => {
            // Set high-definition luxury gold-accented fallback
            setCurrentSrc('https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800');
            setIsLoaded(true);
          };

          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src, srcSet, sizes]);

  return (
    <img
      ref={imgRef}
      id={id}
      src={currentSrc}
      srcSet={currentSrc !== placeholder ? srcSet : undefined}
      sizes={currentSrc !== placeholder ? sizes : undefined}
      alt={alt}
      className={`${className} transition-all duration-500 ease-out will-change-[opacity,transform,filter] ${
        isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-40 scale-[0.98] blur-[2px]'
      }`}
      width={width}
      height={height}
      decoding="async"
    />
  );
}

