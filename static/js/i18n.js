/* i18n.js — Dictionnaire de traduction complet et gestion de la langue */

const translations = {
  fr: {
    // Navigation / Brand
    brand_name: "PortfolioHub",
    lang_toggle: "EN",
    theme_toggle_dark: "Sombre",
    theme_toggle_light: "Clair",
    back_home: "← Retour à l'accueil",

    // Page d'accueil (Hero & Corkboard)
    hero_eyebrow: "Pour les artistes & créatifs",
    home_title_a: "Ton travail mérite mieux",
    home_title_b: "qu'un dossier caché dans ton téléphone.",
    home_subtitle: "Un lien unique, prêt à partager, conçu en quelques minutes.",
    create_button: "Créer mon portfolio",
    feature_theme_title: "Clair ou sombre",
    feature_theme_desc: "Le portfolio s'adapte à ton univers visuel avec fluidité.",
    feature_lang_title: "FR / EN au choix",
    feature_lang_desc: "Touche un public local ou international en un clic.",
    feature_qr_title: "QR code inclus",
    feature_qr_desc: "Partage ton lien instantanément en vernissage, expo ou carte de visite.",
    feature_contact_title: "Contact direct",
    feature_contact_desc: "Reçois des opportunités et des messages directement sur ta page.",
    published_portfolios: "Portfolios récents",
    no_portfolios: "Aucun portfolio publié pour le moment. Sois le premier !",

    // Formulaire de création
    create_header: "Créer mon portfolio",
    create_subtitle: "Remplis les détails de ton profil et personnalise ton style.",
    section_identity: "1. Identité & Profil",
    section_style: "2. Style & Apparence",
    section_social: "3. Réseaux Sociaux",
    section_works: "4. Réalisations & Galerie",
    form_full_name: "Nom complet",
    form_full_name_ph: "ex: Claire de Lune",
    form_bio: "Biographie",
    form_bio_ph: "Artiste visuelle, designer & directrice artistique...",
    form_avatar: "Photo de profil",
    form_avatar_hint: "Glisse une image ou clique pour parcourir (JPG, PNG, WEBP — max 10 Mo)",
    form_template: "Style visuel",
    form_theme: "Thème par défaut",
    form_language: "Langue par défaut",
    theme_light: "Clair",
    theme_dark: "Sombre",
    template_minimal: "Minimaliste",
    template_colorful: "Coloré & Audacieux",
    template_dark_elegant: "Sombre Élégant",
    lang_fr: "Français",
    lang_en: "English",

    // Sections dynamiques (Réseaux sociaux & Réalisations)
    social_links: "Réseaux sociaux",
    add_social: "Ajouter un lien",
    social_platform_ph: "Plateforme (ex: Instagram, GitHub)",
    social_url_ph: "https://...",
    works: "Réalisations & Projets",
    add_work: "Ajouter une réalisation",
    work_title_ph: "Titre de l'œuvre ou du projet",
    work_desc_ph: "Description courte du projet...",
    work_media_label: "Fichier média (image ou vidéo MP4)",
    work_link_ph: "Lien externe (ex: https://behance.net/...)",
    remove_item: "Supprimer",

    // Validation & Soumission
    form_submit: "Générer mon portfolio ✨",
    form_submitting: "Création en cours...",
    error_full_name: "Le nom complet est obligatoire.",
    error_generic: "Une erreur est survenue lors de la création.",

    // Panneau de résultat
    result_created: "🎉 Félicitations ! Ton portfolio est prêt :",
    result_view_btn: "Visiter mon portfolio →",
    copy_link: "Copier le lien",
    copied: "Copié !",
    qr_title: "Scanner pour partager",

    // Portfolio public
    views_label: "vues",
    contact_title: "Me contacter",
    contact_name: "Votre nom",
    contact_email: "Votre adresse email",
    contact_message: "Votre message...",
    contact_send: "Envoyer le message",
    contact_sending: "Envoi en cours...",
    contact_success: "✨ Message envoyé avec succès !",
    contact_error: "Erreur lors de l'envoi. Veuillez réessayer.",
    not_found: "Portfolio introuvable.",
    not_found_desc: "Ce portfolio n'existe pas ou a été déplacé.",
  },
  en: {
    // Navigation / Brand
    brand_name: "PortfolioHub",
    lang_toggle: "FR",
    theme_toggle_dark: "Dark",
    theme_toggle_light: "Light",
    back_home: "← Back to home",

    // Home Page (Hero & Corkboard)
    hero_eyebrow: "For artists & creatives",
    home_title_a: "Your work deserves better",
    home_title_b: "than a hidden folder on your phone.",
    home_subtitle: "A unique, shareable link designed in minutes.",
    create_button: "Create my portfolio",
    feature_theme_title: "Light or dark",
    feature_theme_desc: "The portfolio adapts effortlessly to your visual universe.",
    feature_lang_title: "FR / EN choice",
    feature_lang_desc: "Reach local and international audiences in one click.",
    feature_qr_title: "QR code included",
    feature_qr_desc: "Share your link instantly at exhibitions, shows, or on business cards.",
    feature_contact_title: "Direct contact",
    feature_contact_desc: "Receive client inquiries and messages straight from your page.",
    published_portfolios: "Recent portfolios",
    no_portfolios: "No portfolios published yet. Be the first to create one!",

    // Creation Form
    create_header: "Create my portfolio",
    create_subtitle: "Fill in your profile details and customize your personal style.",
    section_identity: "1. Identity & Profile",
    section_style: "2. Style & Appearance",
    section_social: "3. Social Links",
    section_works: "4. Works & Projects",
    form_full_name: "Full Name",
    form_full_name_ph: "e.g. Claire de Lune",
    form_bio: "Biography",
    form_bio_ph: "Visual artist, designer & art director...",
    form_avatar: "Profile Picture",
    form_avatar_hint: "Drag an image or click to browse (JPG, PNG, WEBP — max 10MB)",
    form_template: "Visual Style",
    form_theme: "Default Theme",
    form_language: "Default Language",
    theme_light: "Light",
    theme_dark: "Dark",
    template_minimal: "Minimalist",
    template_colorful: "Colorful & Bold",
    template_dark_elegant: "Dark Elegant",
    lang_fr: "French",
    lang_en: "English",

    // Dynamic Sections (Social & Works)
    social_links: "Social Links",
    add_social: "Add social link",
    social_platform_ph: "Platform (e.g. Instagram, GitHub)",
    social_url_ph: "https://...",
    works: "Works & Projects",
    add_work: "Add a project",
    work_title_ph: "Project or artwork title",
    work_desc_ph: "Short description of the project...",
    work_media_label: "Media file (image or MP4 video)",
    work_link_ph: "External link (e.g. https://behance.net/...)",
    remove_item: "Remove",

    // Validation & Submission
    form_submit: "Generate my portfolio ✨",
    form_submitting: "Creating your portfolio...",
    error_full_name: "Full name is required.",
    error_generic: "An error occurred while creating the portfolio.",

    // Result Panel
    result_created: "🎉 Congratulations! Your portfolio is ready:",
    result_view_btn: "Visit my portfolio →",
    copy_link: "Copy link",
    copied: "Copied!",
    qr_title: "Scan to share",

    // Public Portfolio
    views_label: "views",
    contact_title: "Get in touch",
    contact_name: "Your name",
    contact_email: "Your email address",
    contact_message: "Your message...",
    contact_send: "Send message",
    contact_sending: "Sending...",
    contact_success: "✨ Message sent successfully!",
    contact_error: "Failed to send message. Please try again.",
    not_found: "Portfolio not found.",
    not_found_desc: "This portfolio does not exist or has been moved.",
  },
};

function getCurrentLanguage() {
  return localStorage.getItem("portfoliohub_lang") || "fr";
}

function t(key, lang) {
  const activeLang = lang || getCurrentLanguage();
  const dict = translations[activeLang] || translations.fr;
  return dict[key] || key;
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations.fr;

  // Text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Select Options
  document.querySelectorAll("[data-i18n-option]").forEach((el) => {
    const key = el.getAttribute("data-i18n-option");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("portfoliohub_lang", lang);

  // Update language toggle button label
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn && dict.lang_toggle) {
    toggleBtn.textContent = dict.lang_toggle;
  }

  // Update theme toggle label if active
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle && typeof updateThemeButtonLabel === "function") {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    updateThemeButtonLabel(themeToggle, currentTheme);
  }

  // Dispatch custom event for dynamic components
  window.dispatchEvent(new CustomEvent("portfoliohub:languageChanged", { detail: { lang, dict } }));
}

function initLanguage(defaultLang) {
  const saved = localStorage.getItem("portfoliohub_lang");
  const lang = saved || defaultLang || "fr";
  applyTranslations(lang);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = getCurrentLanguage();
      const next = current === "fr" ? "en" : "fr";
      applyTranslations(next);
    });
  }
}
