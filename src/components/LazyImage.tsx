import { useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function LazyImage({ src, srcSet, sizes, placeholder, alt, className, width, height }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          lazyImage.src = src;
          if (srcSet) lazyImage.srcset = srcSet;
          if (sizes) lazyImage.sizes = sizes;
          observer.unobserve(lazyImage);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src, srcSet, sizes]);

  return (
    <img
      ref={imgRef}
      src={placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
      data-src={src}
      data-srcset={srcSet}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}
