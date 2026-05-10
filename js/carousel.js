document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  let index = 0;
  let intervalId = null;

  function update() {
    const offset = -index * carousel.clientWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  function next() { index = (index + 1) % slides.length; update(); }

  function startInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(next, 2000); // advance every 2s
  }

  // pause on hover/touch to improve UX
  carousel.addEventListener('mouseenter', () => { clearInterval(intervalId); });
  carousel.addEventListener('mouseleave', () => { startInterval(); });
  carousel.addEventListener('touchstart', () => { clearInterval(intervalId); });
  carousel.addEventListener('touchend', () => { startInterval(); });

  // set widths for track and slides based on carousel pixel width
  function setSizes(){
    const w = carousel.clientWidth;
    track.style.width = `${w * slides.length}px`;
    slides.forEach(slide => { slide.style.width = `${w}px`; });
  }

  setSizes();
  window.addEventListener('resize', () => { setSizes(); update(); });

  update();
  startInterval();
});
