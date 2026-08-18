/* theme.js — gestion du thème clair/sombre */

function initTheme(defaultTheme) {
  const saved = localStorage.getItem("portfoliohub_theme");
  const theme = saved || defaultTheme || "light";
  document.documentElement.setAttribute("data-theme", theme);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    updateThemeButtonLabel(toggleBtn, theme);
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfoliohub_theme", next);
      updateThemeButtonLabel(toggleBtn, next);
    });
  }
}

function updateThemeButtonLabel(btn, theme) {
  const lang = localStorage.getItem("portfoliohub_lang") || "fr";
  const dict = typeof translations !== "undefined" ? translations[lang] : null;
  if (!dict) {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    return;
  }
  btn.textContent = theme === "dark" ? dict.theme_toggle_light : dict.theme_toggle;
}
  
