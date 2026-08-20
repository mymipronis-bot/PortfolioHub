/* theme.js — Gestion élégante du thème clair/sombre */

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
  const isDark = theme === "dark";
  const lang = localStorage.getItem("portfoliohub_lang") || "fr";
  const dict = typeof translations !== "undefined" ? (translations[lang] || translations.fr) : null;
  const labelText = dict ? (isDark ? dict.theme_toggle_light : dict.theme_toggle_dark) : (isDark ? "Light" : "Dark");
  const icon = isDark ? "☀️" : "🌙";
  
  btn.innerHTML = `<span class="theme-icon">${icon}</span> <span class="theme-label">${labelText}</span>`;
  btn.setAttribute("aria-label", labelText);
  btn.setAttribute("title", labelText);
}

  
