// images-fallback.js
// Try alternative filenames for images (replace spaces with '-' or '_')
(function () {
  function testSrc(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function tryAlternatives(imgEl) {
    const src = imgEl.getAttribute('src') || imgEl.src;
    if (!src) return;
    // only handle local relative paths
    if (src.startsWith('http') || src.startsWith('data:')) return;
    const parts = src.split('/');
    const filename = parts.pop();
    const dir = parts.join('/') + (parts.length ? '/' : '');
    const variants = [];
    const nameNoEnc = decodeURIComponent(filename);
    // generate variants
    variants.push(nameNoEnc.replace(/\s+/g, '-'));
    variants.push(nameNoEnc.replace(/\s+/g, '_'));
    variants.push(nameNoEnc.replace(/\s+/g, ''));
    // also lowercase
    variants.push(variants[0].toLowerCase());

    for (const v of variants) {
      const candidate = dir + v;
      if (candidate === src) continue;
      const ok = await testSrc(candidate);
      if (ok) {
        console.log('images-fallback: switching', src, '->', candidate);
        imgEl.src = candidate;
        return;
      }
    }
  }

  window.addEventListener('load', function () {
    const imgs = document.querySelectorAll('.hero-carousel .carousel-track img');
    imgs.forEach(img => { tryAlternatives(img).catch(() => {}); });
  });
})();
