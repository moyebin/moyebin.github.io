document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".projectSwiper", {
    slidesPerView: 1,
    loop: false,
    pagination: {
      el: ".project-section .swiper-pagination",
      clickable: true,
    },
  });

  const SPEED = 5;
  let rafId = null;
  let direction = 0;
  const screenSelector = ".device-screen--monitor, .device-screen--phone";

  function getActiveScreens() {
    const slide = swiper.slides[swiper.activeIndex];
    if (!slide) return [];
    return Array.from(slide.querySelectorAll(screenSelector));
  }

  function step() {
    const screens = getActiveScreens();

    screens.forEach((el) => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;

      el.scrollTop += SPEED * direction;

      if (el.scrollTop <= 0) el.scrollTop = 0;
      if (el.scrollTop >= max) el.scrollTop = max;
    });

    rafId = requestAnimationFrame(step);
  }

  function startScroll(dir) {
    direction = dir;
    if (!rafId) rafId = requestAnimationFrame(step);
  }

  function stopScroll() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function isScreenTarget(target) {
    return target instanceof Element && target.closest(screenSelector);
  }

  document.addEventListener("mouseenter", (e) => {
    if (isScreenTarget(e.target)) startScroll(1);
  }, true);

  document.addEventListener("mouseleave", (e) => {
    if (isScreenTarget(e.target)) startScroll(-1);
  }, true);

  swiper.on("slideChangeTransitionStart", stopScroll);
});