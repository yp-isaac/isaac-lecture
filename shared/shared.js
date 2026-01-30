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
  setGiscusTheme(newTheme);
}

function setGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      'https://giscus.app'
    );
  }
}

// giscus 로드 완료 시 사이트 테마와 동기화
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://giscus.app') return;
  if (!(typeof e.data === 'object' && e.data.giscus)) return;
  const siteTheme = document.documentElement.getAttribute('data-theme') || 'light';
  setGiscusTheme(siteTheme);
});

initTheme();

// =====================
// 내비게이션
// =====================
const NAV_ITEMS = [
  { href: '/index.html', label: '홈', id: 'home' },
  { href: '/face-personality.html', label: '얼굴 성격', id: 'face-personality' },
  { href: '/face-age.html', label: '얼굴 나이', id: 'face-age' },
  { href: '/personal-color.html', label: '퍼스널 칼라', id: 'personal-color' },
  { href: '/quiz-love-type.html', label: '연애 유형', id: 'quiz-love-type' },
  { href: '/quiz-relationship.html', label: '인간관계', id: 'quiz-relationship' },
  { href: '/past-life.html', label: '전생', id: 'past-life' },
  { href: '/today-fortune.html', label: '오늘의 운세', id: 'today-fortune' }
];

function injectNav() {
  const currentPage = document.body.getAttribute('data-page') || '';
  const placeholder = document.getElementById('site-nav');
  if (!placeholder) return;

  const linksHtml = NAV_ITEMS.map(item => {
    const active = item.id === currentPage ? ' active' : '';
    return `<a href="${item.href}" class="nav-link${active}">${item.label}</a>`;
  }).join('');

  const mobileLinksHtml = NAV_ITEMS.map(item => {
    const active = item.id === currentPage ? ' active' : '';
    return `<a href="${item.href}" class="nav-link${active}">${item.label}</a>`;
  }).join('');

  placeholder.innerHTML = `
    <nav class="site-nav">
      <div class="nav-inner">
        <a href="/index.html" class="nav-logo">아이작</a>
        <div class="nav-links">${linksHtml}</div>
        <div class="nav-right">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="테마 전환"></button>
          <button class="hamburger" onclick="toggleMobileMenu()" aria-label="메뉴">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">${mobileLinksHtml}</div>
  `;
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// 모바일 메뉴 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  if (!menu || !menu.classList.contains('open')) return;
  if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
    menu.classList.remove('open');
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
        <li><a href="/index.html">홈</a></li>
        <li><a href="/about.html">사이트 소개</a></li>
        <li><a href="/privacy.html">개인정보처리방침</a></li>
      </ul>
      <p class="footer-copy">&copy; ${new Date().getFullYear()} 아이작. All rights reserved.</p>
    </footer>
  `;
}

// =====================
// 초기화
// =====================
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
});
