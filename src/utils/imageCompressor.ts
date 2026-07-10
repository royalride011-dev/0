/**
 * Utility to compress and resize images client-side before storing them in localStorage.
 * This prevents throwing QuotaExceededError when uploading large photos.
 */

export function compressImageSource(
  source: File | string,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const handleImageLoad = (imgSrc: string) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Avoid tainted canvas if CORS allows
      img.src = imgSrc;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(imgSrc);
            return;
          }

          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);
          
          // Export as compressed JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        } catch (e) {
          // If canvas is tainted or another error occurs, resolve with original
          resolve(imgSrc);
        }
      };
      img.onerror = () => {
        resolve(imgSrc); // Fallback to original
      };
    };

    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleImageLoad(event.target.result as string);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(source);
    } else if (typeof source === 'string') {
      // Only compress if it is a Base64 data URI
      if (source.startsWith('data:')) {
        handleImageLoad(source);
      } else {
        resolve(source); // It's a standard web URL, no need to compress
      }
    } else {
      reject(new Error('Unsupported image source type.'));
    }
  });
}
