(() => {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  const btnLight = document.getElementById("btnLight");
  const btnDark = document.getElementById("btnDark");

  // 1) 저장된 값 먼저 적용 (페이지 들어오자마자)
  const saved = localStorage.getItem(STORAGE_KEY);
  const theme = saved === "dark" ? "dark" : "light";
  root.classList.toggle("is-dark", theme === "dark");

  // 2) 버튼이 있는 페이지에서만 active 처리 + 이벤트 연결
  if (btnLight && btnDark) {
    const liLight = btnLight.closest("li");
    const liDark = btnDark.closest("li");

    const applyActive = (t) => {
      liLight?.classList.toggle("mode_active", t === "light");
      liDark?.classList.toggle("mode_active", t === "dark");
    };

    applyActive(theme);

    btnLight.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      root.classList.remove("is-dark");
      applyActive("light");
    });

    btnDark.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      root.classList.add("is-dark");
      applyActive("dark");
    });
  }
})();