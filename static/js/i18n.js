/* i18n.js — dictionnaire de traduction pour les textes fixes de l'interface */

const translations = {
  fr: {
    home_title: "Crée ton portfolio en une page",
    home_subtitle: "Un lien partageable, prêt en quelques minutes.",
    create_button: "Créer mon portfolio",
    form_full_name: "Nom complet",
    form_bio: "Bio",
    form_avatar: "Photo de profil",
    form_template: "Style visuel",
    form_theme: "Thème par défaut",
    theme_light: "Clair",
    theme_dark: "Sombre",
    form_submit: "Créer le portfolio",
    contact_title: "Me contacter",
    contact_name: "Votre nom",
    contact_email: "Votre email",
    contact_message: "Votre message",
    contact_send: "Envoyer",
    contact_success: "Message envoyé !",
    views_label: "vues",
    qr_title: "Scanner pour partager",
    not_found: "Portfolio introuvable.",
    lang_toggle: "EN",
    theme_toggle: "Mode sombre",
    theme_toggle_light: "Mode clair",
  },
  en: {
    home_title: "Create your one-page portfolio",
    home_subtitle: "A shareable link, ready in minutes.",
    create_button: "Create my portfolio",
    form_full_name: "Full name",
    form_bio: "Bio",
    form_avatar: "Profile picture",
    form_template: "Visual style",
    form_theme: "Default theme",
    theme_light: "Light",
    theme_dark: "Dark",
    form_submit: "Create portfolio",
    contact_title: "Contact me",
    contact_name: "Your name",
    contact_email: "Your email",
    contact_message: "Your message",
    contact_send: "Send",
    contact_success: "Message sent!",
    views_label: "views",
    qr_title: "Scan to share",
    not_found: "Portfolio not found.",
    lang_toggle: "FR",
    theme_toggle: "Dark mode",
    theme_toggle_light: "Light mode",
  },
};

function applyTranslations(lang) {
  const dict = translations[lang] || translations.fr;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });
  document.documentElement.lang = lang;
  localStorage.setItem("portfoliohub_lang", lang);
}

function initLanguage(defaultLang) {
  const saved = localStorage.getItem("portfoliohub_lang");
  const lang = saved || defaultLang || "fr";
  applyTranslations(lang);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = translations[lang].lang_toggle;
    toggleBtn.addEventListener("click", () => {
      const current = localStorage.getItem("portfoliohub_lang") || "fr";
      const next = current === "fr" ? "en" : "fr";
      applyTranslations(next);
      toggleBtn.textContent = translations[next].lang_toggle;
    });
  }
}
