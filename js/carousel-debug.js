// carousel-debug.js
// Detect failing carousel images, replace with visible SVG placeholder and log details.
(function () {
  function makePlaceholder(text, w = 2048, h = 1024) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><rect width='100%' height='100%' fill='#0f1a2f'/><text x='50%' y='50%' fill='#8ab4ff' font-size='48' font-family='Segoe UI, Roboto, Arial' text-anchor='middle' dominant-baseline='middle'>${text}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function checkCarouselImages() {
    const imgs = document.querySelectorAll('.hero-carousel .carousel-track img');
    if (!imgs || imgs.length === 0) {
      console.warn('carousel-debug: no images found in carousel');
      return;
    }
    imgs.forEach((img, i) => {
      // Attach onerror fallback
      img.onerror = function (ev) {
        console.error(`carousel-debug: image failed to load: ${img.getAttribute('src')}`);
        img.src = makePlaceholder('Imagen no disponible', 800, 400);
      };

      // If already attempted to load but failed
      if (img.complete) {
        if (img.naturalWidth === 0) {
          console.error(`carousel-debug: image appears broken (naturalWidth=0): ${img.getAttribute('src')}`);
          img.src = makePlaceholder('Imagen no disponible', 800, 400);
        } else {
          console.log(`carousel-debug: image loaded OK: ${img.getAttribute('src')} (${img.naturalWidth}x${img.naturalHeight})`);
        }
      } else {
        // Not complete yet: set a load listener
        img.addEventListener('load', () => {
          console.log(`carousel-debug: image loaded: ${img.getAttribute('src')} (${img.naturalWidth}x${img.naturalHeight})`);
        });
        img.addEventListener('error', () => {
          console.error(`carousel-debug: image load error for: ${img.getAttribute('src')}`);
          img.src = makePlaceholder('Imagen no disponible', 800, 400);
        });
      }
    });
  }

  window.addEventListener('load', function () {
    setTimeout(checkCarouselImages, 200);
  });
})();
