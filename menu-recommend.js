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
    { name: '김치찌개', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=440&h=300&fit=crop', desc: '얼큰하고 든든한 한국의 대표 찌개' },
    { name: '비빔밥', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=440&h=300&fit=crop', desc: '신선한 야채와 고추장의 조화' },
    { name: '돈까스', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=440&h=300&fit=crop', desc: '바삭한 튀김옷과 부드러운 돼지고기' },
    { name: '냉면', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=440&h=300&fit=crop', desc: '시원하고 쫄깃한 면 요리' },
    { name: '떡볶이', image: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=440&h=300&fit=crop', desc: '달콤매콤한 분식의 왕' },
    { name: '김밥', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=440&h=300&fit=crop', desc: '간편하고 영양가 있는 한 끼' },
    { name: '제육볶음', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=440&h=300&fit=crop', desc: '매콤달콤한 돼지고기 볶음' },
    { name: '순두부찌개', image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=440&h=300&fit=crop', desc: '부드럽고 얼큰한 두부 찌개' },
    { name: '우동', image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=440&h=300&fit=crop', desc: '따뜻한 국물과 쫄깃한 면' },
    { name: '샐러드', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=440&h=300&fit=crop', desc: '신선하고 가벼운 건강식' },
    { name: '볶음밥', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=440&h=300&fit=crop', desc: '고소하고 든든한 한 그릇' },
    { name: '라멘', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=440&h=300&fit=crop', desc: '진한 국물의 일본 면 요리' }
  ],
  dinner: [
    { name: '삼겹살', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=440&h=300&fit=crop', desc: '구워 먹는 한국식 바베큐' },
    { name: '치킨', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=440&h=300&fit=crop', desc: '바삭하고 맛있는 프라이드 치킨' },
    { name: '피자', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=440&h=300&fit=crop', desc: '치즈가 듬뿍 올라간 이탈리안' },
    { name: '스테이크', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=440&h=300&fit=crop', desc: '육즙 가득한 고급 요리' },
    { name: '초밥', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=440&h=300&fit=crop', desc: '신선한 생선과 밥의 조화' },
    { name: '갈비찜', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=440&h=300&fit=crop', desc: '부드럽게 익힌 한국식 찜' },
    { name: '파스타', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=440&h=300&fit=crop', desc: '크림 또는 토마토 소스의 면 요리' },
    { name: '햄버거', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=440&h=300&fit=crop', desc: '육즙 가득한 패티와 신선한 야채' },
    { name: '샤브샤브', image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=440&h=300&fit=crop', desc: '따뜻한 육수에 담가 먹는 요리' },
    { name: '족발', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=440&h=300&fit=crop', desc: '쫄깃하고 담백한 야식' },
    { name: '곱창', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=440&h=300&fit=crop', desc: '구워 먹는 고소한 내장 요리' },
    { name: '회', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=440&h=300&fit=crop', desc: '신선한 생선회와 쌈' }
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
}
