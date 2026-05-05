document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  let index = 0;
  let intervalId = null;

  function update() {
    const percent = -index * 100;
    track.style.transform = `translateX(${percent}%)`;
  }

  function next() { index = (index + 1) % slides.length; update(); }

  function startInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(next, 2000);
  }

  // set widths for track and slides
  track.style.width = `${slides.length * 100}%`;
  slides.forEach(slide => { slide.style.width = `${100 / slides.length}%`; });

  update();
  startInterval();
});
