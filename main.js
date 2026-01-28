// 테마 토글 기능
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

// 페이지 로드 시 테마 초기화
initTheme();

// 음식 데이터
const foodData = {
  lunch: [
    { name: '김치찌개', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Korean_stew-Kimchi_jjigae-05.jpg/440px-Korean_stew-Kimchi_jjigae-05.jpg', desc: '얼큰하고 든든한 한국의 대표 찌개' },
    { name: '비빔밥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/440px-Dolsot-bibimbap.jpg', desc: '신선한 야채와 고추장의 조화' },
    { name: '돈까스', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Tonkatsu_by_ayustety_in_Tokyo.jpg/440px-Tonkatsu_by_ayustety_in_Tokyo.jpg', desc: '바삭한 튀김옷과 부드러운 돼지고기' },
    { name: '냉면', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mul_naengmyeon.jpg/440px-Mul_naengmyeon.jpg', desc: '시원하고 쫄깃한 면 요리' },
    { name: '떡볶이', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tteok-bokki.jpg/440px-Tteok-bokki.jpg', desc: '달콤매콤한 분식의 왕' },
    { name: '김밥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Gimbap_%28pixabay%29.jpg/440px-Gimbap_%28pixabay%29.jpg', desc: '간편하고 영양가 있는 한 끼' },
    { name: '제육볶음', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Jeyukbokkeum.jpg/440px-Jeyukbokkeum.jpg', desc: '매콤달콤한 돼지고기 볶음' },
    { name: '순두부찌개', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sundubu-jjigae_%282%29.jpg/440px-Sundubu-jjigae_%282%29.jpg', desc: '부드럽고 얼큰한 두부 찌개' },
    { name: '우동', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Udon_Noodles_In_Soup.jpg/440px-Udon_Noodles_In_Soup.jpg', desc: '따뜻한 국물과 쫄깃한 면' },
    { name: '샐러드', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad_garden.jpg/440px-Salad_garden.jpg', desc: '신선하고 가벼운 건강식' },
    { name: '볶음밥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kimchi_bokkeumbap.jpg/440px-Kimchi_bokkeumbap.jpg', desc: '고소하고 든든한 한 그릇' },
    { name: '라멘', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_Ramen.jpg/440px-Shoyu_Ramen.jpg', desc: '진한 국물의 일본 면 요리' }
  ],
  dinner: [
    { name: '삼겹살', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Korean_BBQ.jpg/440px-Korean_BBQ.jpg', desc: '구워 먹는 한국식 바베큐' },
    { name: '치킨', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Korean_fried_chicken_2_banban.jpg/440px-Korean_fried_chicken_2_banban.jpg', desc: '바삭하고 맛있는 프라이드 치킨' },
    { name: '피자', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/440px-Eq_it-na_pizza-margherita_sep2005_sml.jpg', desc: '치즈가 듬뿍 올라간 이탈리안' },
    { name: '스테이크', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Filet_mignon_steak.jpg/440px-Filet_mignon_steak.jpg', desc: '육즙 가득한 고급 요리' },
    { name: '초밥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/440px-Sushi_platter.jpg', desc: '신선한 생선과 밥의 조화' },
    { name: '갈비찜', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Galbijjim.jpg/440px-Galbijjim.jpg', desc: '부드럽게 익힌 한국식 찜' },
    { name: '파스타', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tagliatelle_al_rag%C3%B9_%28image_cropped%29.jpg/440px-Tagliatelle_al_rag%C3%B9_%28image_cropped%29.jpg', desc: '크림 또는 토마토 소스의 면 요리' },
    { name: '햄버거', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/440px-RedDot_Burger.jpg', desc: '육즙 가득한 패티와 신선한 야채' },
    { name: '샤브샤브', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Shabu-shabu.jpg/440px-Shabu-shabu.jpg', desc: '따뜻한 육수에 담가 먹는 요리' },
    { name: '족발', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Korean_cuisine-Jokbal-01.jpg/440px-Korean_cuisine-Jokbal-01.jpg', desc: '쫄깃하고 담백한 야식' },
    { name: '곱창', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Gopchang-gui.jpg/440px-Gopchang-gui.jpg', desc: '구워 먹는 고소한 내장 요리' },
    { name: '회', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Korean.food-Hoe-01.jpg/440px-Korean.food-Hoe-01.jpg', desc: '신선한 생선회와 쌈' }
  ]
};

let selectedMeal = null;

// 식사 선택
function selectMeal(meal) {
  selectedMeal = meal;

  // 버튼 활성화 상태 업데이트
  document.querySelectorAll('.meal-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-meal="${meal}"]`).classList.add('active');

  // 추천 버튼 활성화
  document.querySelector('.recommend-btn').disabled = false;

  // 기존 추천 결과 초기화
  document.getElementById('foodGrid').innerHTML = '';
  document.getElementById('refreshBtn').style.display = 'none';
}

// 음식 추천
function recommendFood() {
  if (!selectedMeal) return;

  const foods = foodData[selectedMeal];
  const shuffled = [...foods].sort(() => Math.random() - 0.5);
  const recommended = shuffled.slice(0, 3);

  const foodGrid = document.getElementById('foodGrid');
  foodGrid.innerHTML = '';

  recommended.forEach((food, index) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="food-image">
        <img src="${food.image}" alt="${food.name}" loading="lazy">
      </div>
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.desc}</p>
      </div>
    `;
    foodGrid.appendChild(card);
  });

  // 다시 추천 버튼 표시
  document.getElementById('refreshBtn').style.display = 'block';
}
