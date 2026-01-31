// =====================
// 테마 관리
// =====================
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

initTheme();

// =====================
// 내비게이션
// =====================
const NAV_ITEMS = [
  { href: '/index.html', label: '홈', id: 'home', i18nKey: 'nav_home' },
  { href: '/face-personality.html', label: '얼굴 성격', id: 'face-personality', i18nKey: 'nav_face_personality' },
  { href: '/face-age.html', label: '얼굴 나이', id: 'face-age', i18nKey: 'nav_face_age' },
  { href: '/personal-color.html', label: '퍼스널 칼라', id: 'personal-color', i18nKey: 'nav_personal_color' },
  { href: '/quiz-love-type.html', label: '연애 유형', id: 'quiz-love-type', i18nKey: 'nav_quiz_love_type' },
  { href: '/quiz-relationship.html', label: '인간관계', id: 'quiz-relationship', i18nKey: 'nav_quiz_relationship' },
  { href: '/past-life.html', label: '전생', id: 'past-life', i18nKey: 'nav_past_life' },
  { href: '/today-fortune.html', label: '오늘의 운세', id: 'today-fortune', i18nKey: 'nav_today_fortune' }
];

function buildLangSelector() {
  const currentLang = (typeof getLang === 'function') ? getLang() : 'ko';
  const currentLabel = (typeof LANG_LABELS !== 'undefined') ? LANG_LABELS[currentLang].short : 'KO';
  const langs = (typeof LANG_LABELS !== 'undefined') ? LANG_LABELS : { ko: { short: 'KO', full: '한국어' }, en: { short: 'EN', full: 'English' } };

  const options = Object.entries(langs).map(([code, info]) => {
    const active = code === currentLang ? ' active' : '';
    return `<button class="lang-option${active}" data-lang="${code}">${info.full}</button>`;
  }).join('');

  return `
    <div class="lang-selector">
      <button class="lang-btn" aria-label="언어 선택">${currentLabel}</button>
      <div class="lang-dropdown">${options}</div>
    </div>
  `;
}

function injectNav() {
  const currentPage = document.body.getAttribute('data-page') || '';
  const placeholder = document.getElementById('site-nav');
  if (!placeholder) return;

  const linksHtml = NAV_ITEMS.map(item => {
    const active = item.id === currentPage ? ' active' : '';
    return `<a href="${item.href}" class="nav-link${active}" data-i18n="${item.i18nKey}">${item.label}</a>`;
  }).join('');

  const mobileLinksHtml = NAV_ITEMS.map(item => {
    const active = item.id === currentPage ? ' active' : '';
    return `<a href="${item.href}" class="nav-link${active}" data-i18n="${item.i18nKey}">${item.label}</a>`;
  }).join('');

  placeholder.innerHTML = `
    <nav class="site-nav">
      <div class="nav-inner">
        <a href="/index.html" class="nav-logo" data-i18n="nav_logo">InnerMe</a>
        <div class="nav-links">${linksHtml}</div>
        <div class="nav-right">
          ${buildLangSelector()}
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="테마 전환"></button>
          <button class="hamburger" onclick="toggleMobileMenu()" aria-label="메뉴">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">${mobileLinksHtml}</div>
  `;

  // Language selector event listeners
  const langBtn = placeholder.querySelector('.lang-btn');
  const langDropdown = placeholder.querySelector('.lang-dropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });

    langDropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = opt.getAttribute('data-lang');
        if (typeof setLang === 'function') {
          setLang(lang);
        }
        langDropdown.classList.remove('open');
      });
    });
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// 모바일 메뉴 & 언어 드롭다운 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  if (menu && menu.classList.contains('open')) {
    if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
      menu.classList.remove('open');
    }
  }

  const langDropdown = document.querySelector('.lang-dropdown');
  if (langDropdown && langDropdown.classList.contains('open')) {
    if (!e.target.closest('.lang-selector')) {
      langDropdown.classList.remove('open');
    }
  }
});

// =====================
// 푸터
// =====================
function injectFooter() {
  const placeholder = document.getElementById('site-footer');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="site-footer">
      <ul class="footer-links">
        <li><a href="/index.html" data-i18n="footer_home">홈</a></li>
        <li><a href="/about.html" data-i18n="footer_about">사이트 소개</a></li>
        <li><a href="/privacy.html" data-i18n="footer_privacy">개인정보처리방침</a></li>
      </ul>
      <p class="footer-copy">&copy; ${new Date().getFullYear()} InnerMe. All rights reserved.</p>
    </footer>
  `;
}

// =====================
// 초기화
// =====================
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  if (typeof applyTranslations === 'function' && typeof getLang === 'function') {
    applyTranslations(getLang());
  }
});
