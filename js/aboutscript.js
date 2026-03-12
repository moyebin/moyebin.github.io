document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".about_toggle");
  const aboutBox = document.querySelector(".about_pro_box");

  if (toggleBtn && aboutBox) {
    toggleBtn.addEventListener("click", function () {
      aboutBox.classList.toggle("active");
    });
  }
});