// crop-client.js
// Crop local images to 1920x1080 using a canvas and replace carousel images with data URLs.
(function () {
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function cropToCover(img, targetW, targetH) {
    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');

    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;
    const ratio = Math.max(targetW / srcW, targetH / srcH);
    const drawW = srcW * ratio;
    const drawH = srcH * ratio;
    const dx = (targetW - drawW) / 2;
    const dy = (targetH - drawH) / 2;

    ctx.drawImage(img, dx, dy, drawW, drawH);
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  async function replaceCarouselWithCropped(targetW = 2048, targetH = 1024) {
    try {
      const carousel = document.querySelector('.hero-carousel .carousel-track');
      if (!carousel) return;
      const slides = Array.from(carousel.querySelectorAll('img'));
      for (const imgEl of slides) {
        const src = imgEl.getAttribute('src') || imgEl.src;
        try {
          const img = await loadImage(src);
          const dataUrl = cropToCover(img, targetW, targetH);
          imgEl.src = dataUrl;
          imgEl.width = Math.min(targetW, imgEl.clientWidth || targetW);
          imgEl.removeAttribute('height');
        } catch (err) {
          // ignore individual failures
          console.warn('crop-client: failed to crop', src, err);
        }
      }
      console.log('crop-client: carousel images replaced with cropped versions');
    } catch (err) { console.error('crop-client error', err); }
  }

  // Run after DOM + images parsed
  window.addEventListener('load', function () {
    // small delay to ensure local images are accessible
    setTimeout(() => replaceCarouselWithCropped(2048, 1024), 300);
  });
})();
