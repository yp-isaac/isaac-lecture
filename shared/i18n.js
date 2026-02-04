// =====================
// i18n 엔진
// =====================
const SUPPORTED_LANGS = ['ko', 'en'];
const DEFAULT_LANG = 'ko';

const LANG_LABELS = {
  ko: { short: 'KO', full: '한국어' },
  en: { short: 'EN', full: 'English' }
};

function getLang() {
  const saved = localStorage.getItem('lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  return DEFAULT_LANG;
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

function t(key) {
  var lang = getLang();
  var dict = (typeof TRANSLATIONS !== 'undefined') ? TRANSLATIONS[lang] : null;
  if (dict && dict[key] !== undefined) return dict[key];
  // Fallback to Korean
  var fallback = (typeof TRANSLATIONS !== 'undefined') ? TRANSLATIONS['ko'] : null;
  if (fallback && fallback[key] !== undefined) return fallback[key];
  return key;
}

function applyTranslations(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
  const dict = (typeof TRANSLATIONS !== 'undefined') ? TRANSLATIONS[lang] : null;
  if (!dict) return;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] === undefined) return;

    // Handle placeholder attribute
    if (el.hasAttribute('data-i18n-attr')) {
      const attr = el.getAttribute('data-i18n-attr');
      el.setAttribute(attr, dict[key]);
    } else {
      el.innerHTML = dict[key];
    }
  });

  // Update document lang attribute
  document.documentElement.setAttribute('lang', lang === 'ko' ? 'ko' : 'en');

  // Update og:locale
  var ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'ko_KR');
  }

  // Update JSON-LD structured data
  var jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (jsonLdScript) {
    try {
      var jsonLdData = JSON.parse(jsonLdScript.textContent);
      var nameKey = jsonLdScript.getAttribute('data-i18n-name');
      var descKey = jsonLdScript.getAttribute('data-i18n-desc');
      if (nameKey && dict[nameKey] !== undefined) jsonLdData.name = dict[nameKey];
      if (descKey && dict[descKey] !== undefined) jsonLdData.description = dict[descKey];
      if (jsonLdData.inLanguage !== undefined) jsonLdData.inLanguage = lang;
      jsonLdScript.textContent = JSON.stringify(jsonLdData, null, 2);
    } catch(e) {}
  }

  // Update language selector button text
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    langBtn.textContent = LANG_LABELS[lang].short;
  }

  // Mark active option in dropdown
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });
}
