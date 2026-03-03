document.addEventListener("DOMContentLoaded", function () {
  // ✅ Swiper를 "swiper" 변수에 담기 (이게 핵심)
  const swiper = new Swiper(".projectSwiper", {
    slidesPerView: 1,
    loop: false,
    pagination: {
      el: ".project-section .swiper-pagination",
      clickable: true,
    },
  });


  // Swiper 자동스크롤
  const SPEED = 5;
  let rafId = null;
  let direction = 0;

  function getActiveScreens() {
    const slide = swiper.slides[swiper.activeIndex];
    if (!slide) return [];
    return Array.from(
      slide.querySelectorAll(".device-screen--monitor, .device-screen--phone")
    );
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

  document.addEventListener("mouseenter", (e) => {
    if (e.target.closest(".device-screen--monitor, .device-screen--phone")) {
      startScroll(1);
    }
  }, true);

  document.addEventListener("mouseleave", (e) => {
    if (e.target.closest(".device-screen--monitor, .device-screen--phone")) {
      startScroll(-1);
    }
  }, true);

  swiper.on("slideChangeTransitionStart", () => {
    stopScroll();
  });

});