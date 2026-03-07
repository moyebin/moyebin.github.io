document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     helpers
  ========================================================= */
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  /* =========================================================
     1) Button (Ripple)
  ========================================================= */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".demo_btn.is-ripple"); // ✅ 점(.) 사이 띄어쓰기 X
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });

  /* =========================================================
     2) Dark Mode (toggleTheme)
  ========================================================= */
  const uiToggle = $("#uiDarkToggle");
  const uiWrap = $("#uiShowcase"); // ✅ UI 영역만

  const savedUiTheme = localStorage.getItem("ui_theme");
  if (savedUiTheme === "dark") {
    uiWrap?.classList.add("is-dark");
    if (uiToggle) uiToggle.checked = true;
  }

  if (uiToggle && uiWrap) {
    uiToggle.addEventListener("change", () => {
      const isDark = uiToggle.checked;
      uiWrap.classList.toggle("is-dark", isDark);
      localStorage.setItem("ui_theme", isDark ? "dark" : "light");
    });
  }

  /* =========================================================
     3) Modal (uiModal)
     - open: .js-open-modal
     - close: .modal_close, .modal_close_btn, overlay click, ESC
  ========================================================= */
  const modal = $("#uiModal");
  const openBtns = $$(".js-open-modal");
  const closeBtns = modal ? $$(".modal_close, .modal_close_btn", modal) : [];

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  };

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(); // overlay 바깥 클릭 닫기
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* =========================================================
     4) Animation (Motion)
     - 지금 구조는 CSS 애니메이션만으로 동작 (JS 필요 없음)
     - 만약 "클릭하면 애니메이션 시작/정지" 같은게 필요하면 여기서 추가
  ========================================================= */

  const detailBtns = $$(".js-detail");

  detailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".ui_window");
      if (!card) return;

      const detail = $(".ui_detail", card);
      if (!detail) return;

      const isOpen = !detail.hasAttribute("hidden");

      if (isOpen) {
        detail.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "View Detail →";
      } else {
        detail.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "Close Detail ↑";
      }
    });
  });
});