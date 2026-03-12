const workLogBtn = document.getElementById("workLogBtn");
const workLogOverlay = document.getElementById("workLogOverlay");
const workLogClose = document.getElementById("workLogClose");

if (workLogBtn && workLogOverlay) {
  workLogBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    workLogOverlay.classList.add("active");
    workLogBtn.setAttribute("aria-expanded", "true");
  });

  if (workLogClose) {
    workLogClose.addEventListener("click", () => {
      workLogOverlay.classList.remove("active");
      workLogBtn.setAttribute("aria-expanded", "false");
    });
  }

  workLogOverlay.addEventListener("click", (e) => {
    if (e.target === workLogOverlay) {
      workLogOverlay.classList.remove("active");
      workLogBtn.setAttribute("aria-expanded", "false");
    }
  });
}