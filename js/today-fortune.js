// =====================
// DOM 요소
// =====================
const birthYear = document.getElementById('birthYear');
const birthMonth = document.getElementById('birthMonth');
const birthDay = document.getElementById('birthDay');
const analyzeBtn = document.getElementById('analyzeBtn');
const inputSection = document.getElementById('inputSection');
const loadingSection = document.getElementById('loadingSection');
const resultSection = document.getElementById('resultSection');
const retryBtn = document.getElementById('retryBtn');

// =====================
// 날짜 입력 로직
// =====================
function getDaysInMonth(year, month) {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

function updateDayOptions() {
  const y = parseInt(birthYear.value);
  const m = parseInt(birthMonth.value);
  const maxDays = getDaysInMonth(y, m);
  const currentDay = parseInt(birthDay.value);

  birthDay.innerHTML = '<option value="" disabled selected>' + t('tf_select_default') + '</option>';
  for (let d = 1; d <= maxDays; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d + t('common_day_suffix');
    if (d === currentDay) opt.selected = true;
    birthDay.appendChild(opt);
  }

  validateInputs();
}

function validateInputs() {
  const y = parseInt(birthYear.value);
  const m = birthMonth.value;
  const d = birthDay.value;
  analyzeBtn.disabled = !(y >= 1920 && y <= 2025 && m && d);
}

birthYear.addEventListener('input', () => {
  updateDayOptions();
  validateInputs();
});
birthMonth.addEventListener('change', () => {
  updateDayOptions();
  validateInputs();
});
birthDay.addEventListener('change', validateInputs);

// =====================
// 별자리 계산
// =====================
function getZodiacSign(month, day) {
  var lang = getLang();
  var signs;
  if (lang === 'en') {
    signs = [
      { name: 'Capricorn', emoji: '♑', start: [1, 1], end: [1, 19] },
      { name: 'Aquarius', emoji: '♒', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', emoji: '♓', start: [2, 19], end: [3, 20] },
      { name: 'Aries', emoji: '♈', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', emoji: '♉', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', emoji: '♊', start: [5, 21], end: [6, 21] },
      { name: 'Cancer', emoji: '♋', start: [6, 22], end: [7, 22] },
      { name: 'Leo', emoji: '♌', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', emoji: '♍', start: [8, 23], end: [9, 22] },
      { name: 'Libra', emoji: '♎', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', emoji: '♏', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', emoji: '♐', start: [11, 22], end: [12, 21] },
      { name: 'Capricorn', emoji: '♑', start: [12, 22], end: [12, 31] }
    ];
  } else {
    signs = [
      { name: '염소자리', emoji: '♑', start: [1, 1], end: [1, 19] },
      { name: '물병자리', emoji: '♒', start: [1, 20], end: [2, 18] },
      { name: '물고기자리', emoji: '♓', start: [2, 19], end: [3, 20] },
      { name: '양자리', emoji: '♈', start: [3, 21], end: [4, 19] },
      { name: '황소자리', emoji: '♉', start: [4, 20], end: [5, 20] },
      { name: '쌍둥이자리', emoji: '♊', start: [5, 21], end: [6, 21] },
      { name: '게자리', emoji: '♋', start: [6, 22], end: [7, 22] },
      { name: '사자자리', emoji: '♌', start: [7, 23], end: [8, 22] },
      { name: '처녀자리', emoji: '♍', start: [8, 23], end: [9, 22] },
      { name: '천칭자리', emoji: '♎', start: [9, 23], end: [10, 22] },
      { name: '전갈자리', emoji: '♏', start: [10, 23], end: [11, 21] },
      { name: '사수자리', emoji: '♐', start: [11, 22], end: [12, 21] },
      { name: '염소자리', emoji: '♑', start: [12, 22], end: [12, 31] }
    ];
  }

  for (const sign of signs) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return sign;
    }
  }
  return signs[0];
}

// =====================
// 띠 계산
// =====================
function getChineseZodiac(year) {
  var lang = getLang();
  var animals;
  if (lang === 'en') {
    animals = [
      { name: 'Monkey', emoji: '🐵' },
      { name: 'Rooster', emoji: '🐔' },
      { name: 'Dog', emoji: '🐶' },
      { name: 'Pig', emoji: '🐷' },
      { name: 'Rat', emoji: '🐭' },
      { name: 'Ox', emoji: '🐮' },
      { name: 'Tiger', emoji: '🐯' },
      { name: 'Rabbit', emoji: '🐰' },
      { name: 'Dragon', emoji: '🐲' },
      { name: 'Snake', emoji: '🐍' },
      { name: 'Horse', emoji: '🐴' },
      { name: 'Sheep', emoji: '🐑' }
    ];
  } else {
    animals = [
      { name: '원숭이', emoji: '🐵' },
      { name: '닭', emoji: '🐔' },
      { name: '개', emoji: '🐶' },
      { name: '돼지', emoji: '🐷' },
      { name: '쥐', emoji: '🐭' },
      { name: '소', emoji: '🐮' },
      { name: '호랑이', emoji: '🐯' },
      { name: '토끼', emoji: '🐰' },
      { name: '용', emoji: '🐲' },
      { name: '뱀', emoji: '🐍' },
      { name: '말', emoji: '🐴' },
      { name: '양', emoji: '🐑' }
    ];
  }
  return animals[year % 12];
}

// =====================
// 시드 기반 난수 생성기
// =====================
function createSeededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return (s >>> 0) / 0x7fffffff;
  };
}

function computeSeed(birthY, birthM, birthD) {
  const today = new Date();
  const todayNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const birthNum = birthY * 10000 + birthM * 100 + birthD;
  // 간단한 해시: 두 숫자 조합
  let hash = todayNum ^ (birthNum * 2654435761);
  hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
  hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
  hash = (hash >>> 16) ^ hash;
  return Math.abs(hash);
}

// =====================
// 운세 텍스트 풀
// =====================
function getFORTUNE_TEXTS() {
  var lang = getLang();
  if (lang === 'en') {
    return {
      love: {
        1: [
          'Your love fortune is a bit sluggish today. It might be best to spend some time alone.',
          'Misunderstandings may arise in romantic relationships. Be careful with your words and actions.',
          'Your heart may feel complicated today. Don\'t try to force your feelings into order.'
        ],
        2: [
          'Minor disagreements with your partner are possible. Try to talk things through calmly.',
          'You may not get the response you hoped for. Try to be a little more patient.',
          'If you have a crush, it\'s wise to step back and observe the situation today.'
        ],
        3: [
          'A calm love fortune today. No major changes, but it will be a stable day.',
          'A good day to enjoy small everyday moments with your partner. Try having a meal together.',
          'Try starting a light conversation with someone you\'re interested in. Good vibes are flowing.'
        ],
        4: [
          'Great love fortune today! Your relationship could deepen.',
          'You might have an opportunity for a new encounter. Look around carefully.',
          'Expressing your true feelings today may get a great response.'
        ],
        5: [
          'Today is full of romance! Take courage and approach the one you like.',
          'A day to create special memories with your partner. Plan a date!',
          'Love energy is at its peak. It\'s the perfect day for confessions or proposals.'
        ]
      },
      work: {
        1: [
          'Watch out for mistakes at work. Double-check and then check again.',
          'Workplace conflicts may arise. Keep your emotions in check.',
          'Things may not go as planned. Don\'t push too hard; stick to the basics today.'
        ],
        2: [
          'Work progress may be slow. Don\'t rush; take it step by step.',
          'Miscommunication with colleagues is possible. Clear communication is key.',
          'Better to wrap up existing tasks than start new projects today.'
        ],
        3: [
          'An ordinary but stable work day. Keep up the steady effort and good results will follow.',
          'A good day for brainstorming. Jot down those new ideas.',
          'Collaboration with colleagues can yield great results today.'
        ],
        4: [
          'A day for good results at work! Take on challenges with confidence.',
          'Recognition from superiors or clients may come your way.',
          'Projects started today have a high chance of succeeding. Be proactive.'
        ],
        5: [
          'Career fortune at its best! Promotions or good news may be coming.',
          'Your abilities will truly shine today. Stand out in important presentations or meetings.',
          'With support and cooperation from colleagues, you can achieve great results today.'
        ]
      },
      health: {
        1: [
          'Watch out for overwork. Some light stretching to loosen up would be good.',
          'Fatigue can easily accumulate today. Make sure to get enough sleep.',
          'Your digestive system may be sensitive. Avoid spicy or heavy foods.'
        ],
        2: [
          'You might feel a slight headache or fatigue. Take a break with some warm tea.',
          'Avoid intense exercise; a light walk would be just right today.',
          'Your immunity might be slightly down. Pay attention to vitamin intake.'
        ],
        3: [
          'A reasonably healthy day. Maintain a regular lifestyle rhythm.',
          'Light exercise is good for maintaining your condition today. A walk is recommended.',
          'Don\'t skip meals and maintain a balanced diet. It\'s the foundation of health.'
        ],
        4: [
          'A day full of vitality! Enjoy exercise or outdoor activities.',
          'You\'re in great condition to start a new exercise routine.',
          'Mind and body are at peace, so your focus will be higher than usual today.'
        ],
        5: [
          'Health fortune at its peak! You\'re overflowing with energy to take on anything.',
          'Use today\'s vitality to catch up on exercise or health management. Effects will be doubled.',
          'Both body and mind feel light on this optimal day. Enjoy your activities.'
        ]
      },
      money: {
        1: [
          'Unexpected expenses may pop up. Avoid impulse purchases.',
          'Be cautious of financial losses today. Hold off on investments or big spending.',
          'Someone might ask to borrow money. Make your decision carefully.'
        ],
        2: [
          'Your wallet might feel lighter today. Plan to spend only on necessities.',
          'No major financial changes, but it\'s a day to practice saving.',
          'Don\'t be tempted by discounts or sales. Ask yourself if you really need it.'
        ],
        3: [
          'Average financial fortune today. Maintain stable financial management.',
          'Small income may come your way. Be grateful for the little joys.',
          'If you spend as planned, it will be a smooth day.'
        ],
        4: [
          'Good financial fortune. Income may come from unexpected places.',
          'Look into investments or financial planning. You might get good information today.',
          'A day when your saving efforts pay off. Treat yourself to a small gift.'
        ],
        5: [
          'Financial fortune at its peak! Unexpected windfalls or good financial news may come.',
          'Investments or business started today have a high chance of good results.',
          'Money attracts money today. Don\'t miss opportunities; act proactively.'
        ]
      }
    };
  }
  return {
    love: {
      1: [
        '연애운이 다소 부진한 하루입니다. 오늘은 혼자만의 시간을 보내는 것이 좋겠어요.',
        '이성 관계에서 오해가 생길 수 있어요. 말을 아끼고 신중하게 행동하세요.',
        '마음이 복잡해질 수 있는 날이에요. 감정을 억지로 정리하려 하지 마세요.'
      ],
      2: [
        '연인과 사소한 의견 차이가 있을 수 있어요. 차분하게 대화해보세요.',
        '기대한 만큼의 반응을 얻지 못할 수 있어요. 조금만 인내심을 가져보세요.',
        '짝사랑 중이라면 오늘은 한 발 물러서서 상황을 지켜보는 것이 현명해요.'
      ],
      3: [
        '평온한 연애운입니다. 큰 변화는 없지만 안정적인 하루가 될 거예요.',
        '연인과 함께 소소한 일상을 즐기기 좋은 날이에요. 함께 식사해보세요.',
        '관심 있는 사람과 가벼운 대화를 나눠보세요. 좋은 기운이 흐르고 있어요.'
      ],
      4: [
        '연애운이 좋은 하루예요! 연인과의 관계가 한층 더 깊어질 수 있어요.',
        '새로운 만남의 기회가 있을 수 있어요. 주변을 잘 살펴보세요.',
        '상대방에게 진심을 전하면 좋은 반응을 얻을 수 있는 날이에요.'
      ],
      5: [
        '오늘은 로맨스가 가득한 하루! 좋아하는 사람에게 용기를 내보세요.',
        '연인과 특별한 추억을 만들 수 있는 날이에요. 데이트를 계획해보세요.',
        '사랑의 기운이 최고조입니다. 고백이나 프로포즈에 최적의 날이에요.'
      ]
    },
    work: {
      1: [
        '업무에서 실수가 발생할 수 있어요. 꼼꼼하게 확인하고 또 확인하세요.',
        '직장 내 인간관계에서 갈등이 생길 수 있어요. 감정을 다스리세요.',
        '일이 뜻대로 풀리지 않을 수 있어요. 오늘은 무리하지 말고 기본에 충실하세요.'
      ],
      2: [
        '업무 진행이 더딜 수 있어요. 조급해하지 말고 차근차근 진행하세요.',
        '동료와의 소통에서 혼선이 있을 수 있어요. 명확하게 전달하는 것이 중요해요.',
        '새로운 프로젝트 시작보다는 기존 업무를 마무리하는 데 집중하세요.'
      ],
      3: [
        '평범하지만 안정적인 업무 환경이 유지됩니다. 꾸준히 노력하면 좋은 결과가 있을 거예요.',
        '오늘은 새로운 아이디어를 구상하기 좋은 날이에요. 메모해두세요.',
        '동료들과 협력하면 좋은 성과를 낼 수 있는 하루입니다.'
      ],
      4: [
        '업무에서 좋은 성과를 거둘 수 있는 날이에요. 자신감을 가지고 도전하세요.',
        '상사나 거래처로부터 인정받을 수 있는 기회가 찾아올 수 있어요.',
        '오늘 시작하는 일은 좋은 결과로 이어질 확률이 높아요. 적극적으로 나서보세요.'
      ],
      5: [
        '직장운이 최고인 날! 승진이나 좋은 소식이 있을 수 있어요.',
        '당신의 능력이 빛을 발하는 하루입니다. 중요한 발표나 회의에서 빛나세요.',
        '주변 동료들의 지지와 협력으로 큰 성과를 이룰 수 있는 날이에요.'
      ]
    },
    health: {
      1: [
        '과로에 주의하세요. 가벼운 스트레칭으로 몸을 풀어주는 것이 좋겠습니다.',
        '피로가 누적되기 쉬운 날이에요. 충분한 수면을 취하도록 하세요.',
        '소화기 계통이 약해질 수 있어요. 자극적인 음식은 피하세요.'
      ],
      2: [
        '가벼운 두통이나 피로감을 느낄 수 있어요. 따뜻한 차를 마시며 쉬어가세요.',
        '무리한 운동은 피하고, 가벼운 산책 정도가 적당한 날이에요.',
        '면역력이 다소 떨어질 수 있어요. 비타민 섭취에 신경 쓰세요.'
      ],
      3: [
        '건강 상태가 무난한 하루입니다. 규칙적인 생활 리듬을 유지하세요.',
        '가벼운 운동으로 컨디션을 유지하기 좋은 날이에요. 산책을 추천합니다.',
        '식사를 거르지 말고 영양 균형을 맞춰 드세요. 건강의 기본이에요.'
      ],
      4: [
        '활력이 넘치는 하루입니다! 운동이나 야외 활동을 즐겨보세요.',
        '컨디션이 좋아 새로운 운동을 시작하기에 적합한 날이에요.',
        '심신이 안정되어 있어 평소보다 집중력이 높아지는 하루입니다.'
      ],
      5: [
        '건강운이 최고! 에너지가 넘쳐 무엇이든 해낼 수 있는 컨디션이에요.',
        '오늘의 활력을 활용해 밀린 운동이나 건강 관리를 해보세요. 효과가 배가 됩니다.',
        '몸도 마음도 가벼운 최상의 하루입니다. 즐겁게 활동하세요.'
      ]
    },
    money: {
      1: [
        '예상치 못한 지출이 발생할 수 있어요. 충동구매를 자제하세요.',
        '금전적인 손실에 주의가 필요한 날이에요. 투자나 큰 지출은 미루세요.',
        '돈을 빌려달라는 부탁이 올 수 있어요. 신중하게 판단하세요.'
      ],
      2: [
        '지갑이 가벼워질 수 있는 날이에요. 필요한 지출만 하도록 계획을 세우세요.',
        '금전적으로 큰 변동은 없지만, 아끼는 습관이 필요한 하루예요.',
        '할인이나 세일에 현혹되지 마세요. 꼭 필요한 것인지 다시 생각해보세요.'
      ],
      3: [
        '금전운이 보통인 날입니다. 안정적인 재정 관리를 유지하세요.',
        '소소한 수입이 있을 수 있어요. 작은 기쁨에 감사하는 하루가 되세요.',
        '계획한 대로 지출하면 무리 없는 하루가 될 거예요.'
      ],
      4: [
        '금전운이 좋은 편이에요. 기대하지 않았던 곳에서 수입이 생길 수 있어요.',
        '투자나 재테크에 관심을 가져보세요. 좋은 정보를 얻을 수 있는 날이에요.',
        '그동안 아꼈던 보람이 느껴지는 하루입니다. 자신에게 작은 선물을 해보세요.'
      ],
      5: [
        '금전운이 최고조! 뜻밖의 횡재나 좋은 금전 소식이 있을 수 있어요.',
        '오늘 시작하는 투자나 사업은 좋은 결과로 이어질 가능성이 높아요.',
        '돈이 돈을 부르는 날이에요. 기회를 놓치지 말고 적극적으로 행동하세요.'
      ]
    }
  };
}

function getOVERALL_COMMENTS() {
  var lang = getLang();
  if (lang === 'en') {
    return {
      1: [
        'Today is a day to rest your body and mind. Tomorrow will be better.',
        'It may be a tough day, but these days happen too. Be gentle with yourself.',
        'Don\'t push too hard and spend the day quietly. You need time to recharge.'
      ],
      2: [
        'Focus on small tasks rather than big ones for a better day. Take it step by step.',
        'There may be minor challenges, but handle them calmly and you\'ll get through just fine.',
        'Lower your expectations a bit and approach things realistically for a satisfying day.'
      ],
      3: [
        'A peaceful, stable day is expected. Appreciate the value of everyday moments.',
        'Nothing special, but nothing bad either\u2014a smooth day. Spend it with a grateful heart.',
        'Today is a day to prepare for tomorrow. Make plans and execute them calmly.'
      ],
      4: [
        'Good energy surrounds you today! Act proactively for great results.',
        'A day where you can positively influence those around you. Share your bright energy.',
        'Great timing to put plans into action. Take courage and go for it.'
      ],
      5: [
        'It\'s going to be the best day! Whatever you start will lead to great results.',
        'Fortune is with you today. Make important decisions or try new challenges.',
        'Everything will go smoothly today. Go through the day with confidence and joy.'
      ]
    };
  }
  return {
    1: [
      '오늘은 몸과 마음을 쉬어가는 날로 삼아보세요. 내일은 더 나아질 거예요.',
      '다소 힘든 하루가 될 수 있지만, 이런 날도 있는 법이에요. 자신을 다독여주세요.',
      '무리하지 말고 조용히 하루를 보내는 것이 좋겠어요. 충전의 시간이 필요해요.'
    ],
    2: [
      '큰 일보다는 작은 일에 집중하면 좋은 하루가 될 수 있어요. 차근차근 해나가세요.',
      '약간의 어려움이 있을 수 있지만, 침착하게 대처하면 잘 넘길 수 있어요.',
      '기대를 조금 낮추고 현실적으로 접근하면 만족스러운 하루가 될 거예요.'
    ],
    3: [
      '평온하고 안정적인 하루가 예상됩니다. 일상의 소중함을 느껴보세요.',
      '특별한 일은 없지만 나쁠 것도 없는 무난한 하루예요. 감사한 마음으로 보내세요.',
      '오늘은 내일을 위한 준비의 날이에요. 계획을 세우고 차분히 실행해보세요.'
    ],
    4: [
      '좋은 기운이 감도는 하루입니다! 적극적으로 행동하면 좋은 결과를 얻을 수 있어요.',
      '주변 사람들에게 좋은 영향을 줄 수 있는 날이에요. 밝은 에너지를 나눠주세요.',
      '하고 싶었던 일을 실행에 옮기기 좋은 타이밍이에요. 용기를 내보세요.'
    ],
    5: [
      '최고의 하루가 될 거예요! 무엇이든 시작하면 좋은 결과를 기대할 수 있어요.',
      '행운이 함께하는 날입니다. 중요한 결정이나 새로운 도전을 해보세요.',
      '모든 일이 순조롭게 풀리는 날이에요. 자신감을 가지고 즐겁게 보내세요.'
    ]
  };
}

// =====================
// 행운 아이템 풀
// =====================
function getLUCKY_COLORS() {
  var lang = getLang();
  if (lang === 'en') {
    return [
      { name: 'Red', hex: '#e74c3c' },
      { name: 'Blue', hex: '#3498db' },
      { name: 'Green', hex: '#2ecc71' },
      { name: 'Yellow', hex: '#f1c40f' },
      { name: 'Purple', hex: '#9b59b6' },
      { name: 'Orange', hex: '#e67e22' },
      { name: 'Pink', hex: '#e91e63' },
      { name: 'Sky Blue', hex: '#00bcd4' },
      { name: 'Lime Green', hex: '#8bc34a' },
      { name: 'Gold', hex: '#ffd700' },
      { name: 'Silver', hex: '#bdc3c7' },
      { name: 'Dark Blue', hex: '#2c3e50' }
    ];
  }
  return [
    { name: '빨강', hex: '#e74c3c' },
    { name: '파랑', hex: '#3498db' },
    { name: '초록', hex: '#2ecc71' },
    { name: '노랑', hex: '#f1c40f' },
    { name: '보라', hex: '#9b59b6' },
    { name: '주황', hex: '#e67e22' },
    { name: '분홍', hex: '#e91e63' },
    { name: '하늘색', hex: '#00bcd4' },
    { name: '연두', hex: '#8bc34a' },
    { name: '금색', hex: '#ffd700' },
    { name: '은색', hex: '#bdc3c7' },
    { name: '남색', hex: '#2c3e50' }
  ];
}

function getLUCKY_DIRECTIONS() {
  var lang = getLang();
  if (lang === 'en') {
    return ['East', 'West', 'South', 'North', 'Southeast', 'Northeast', 'Southwest', 'Northwest'];
  }
  return ['동', '서', '남', '북', '동남', '동북', '서남', '서북'];
}

// =====================
// 별 표시 생성
// =====================
function renderStars(score) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < score ? '★' : '☆';
  }
  return stars;
}

// =====================
// 오늘 날짜 포맷
// =====================
function getFormattedToday() {
  var lang = getLang();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  if (lang === 'en') {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = dayNames[today.getDay()];
    const monthName = monthNames[today.getMonth()];
    return 'Fortune for ' + dayName + ', ' + monthName + ' ' + date + ', ' + year;
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[today.getDay()];
  return year + '년 ' + month + '월 ' + date + '일 (' + dayName + ') 운세';
}

// =====================
// 운세 생성
// =====================
function generateFortune(year, month, day) {
  const seed = computeSeed(year, month, day);
  const rand = createSeededRandom(seed);

  // 점수 생성 (1~5)
  function rollScore() {
    return Math.floor(rand() * 5) + 1;
  }

  const scores = {
    overall: rollScore(),
    love: rollScore(),
    work: rollScore(),
    health: rollScore(),
    money: rollScore()
  };

  var fortuneTexts = getFORTUNE_TEXTS();
  var overallComments = getOVERALL_COMMENTS();

  // 텍스트 선택
  function pickText(pool, score) {
    const texts = pool[score];
    const idx = Math.floor(rand() * texts.length);
    return texts[idx];
  }

  const texts = {
    love: pickText(fortuneTexts.love, scores.love),
    work: pickText(fortuneTexts.work, scores.work),
    health: pickText(fortuneTexts.health, scores.health),
    money: pickText(fortuneTexts.money, scores.money),
    overall: pickText(overallComments, scores.overall)
  };

  // 행운 아이템
  var luckyColors = getLUCKY_COLORS();
  var luckyDirections = getLUCKY_DIRECTIONS();
  const luckyColor = luckyColors[Math.floor(rand() * luckyColors.length)];
  const luckyNumber = Math.floor(rand() * 99) + 1;
  const luckyDirection = luckyDirections[Math.floor(rand() * luckyDirections.length)];

  // 별자리 & 띠
  const zodiac = getZodiacSign(month, day);
  const animal = getChineseZodiac(year);

  return {
    scores,
    texts,
    luckyColor,
    luckyNumber,
    luckyDirection,
    zodiac,
    animal
  };
}

// =====================
// 결과 표시
// =====================
function showResult(fortune) {
  // 날짜
  document.getElementById('fortuneDate').textContent = getFormattedToday();

  // 뱃지
  document.getElementById('zodiacBadge').textContent = fortune.zodiac.emoji + ' ' + fortune.zodiac.name;
  document.getElementById('animalBadge').textContent = fortune.animal.emoji + ' ' + fortune.animal.name + t('tf_animal_suffix');

  // 종합운
  document.getElementById('overallStars').textContent = renderStars(fortune.scores.overall);
  document.getElementById('overallComment').textContent = fortune.texts.overall;

  // 연애운
  document.getElementById('loveStars').textContent = renderStars(fortune.scores.love);
  document.getElementById('loveText').textContent = fortune.texts.love;

  // 직장운
  document.getElementById('workStars').textContent = renderStars(fortune.scores.work);
  document.getElementById('workText').textContent = fortune.texts.work;

  // 건강운
  document.getElementById('healthStars').textContent = renderStars(fortune.scores.health);
  document.getElementById('healthText').textContent = fortune.texts.health;

  // 금전운
  document.getElementById('moneyStars').textContent = renderStars(fortune.scores.money);
  document.getElementById('moneyText').textContent = fortune.texts.money;

  // 행운 아이템
  const colorEl = document.getElementById('luckyColor');
  colorEl.textContent = fortune.luckyColor.name;
  colorEl.style.color = fortune.luckyColor.hex;

  document.getElementById('luckyNumber').textContent = fortune.luckyNumber;
  document.getElementById('luckyDirection').textContent = fortune.luckyDirection;

  // 화면 전환
  loadingSection.hidden = true;
  resultSection.hidden = false;
}

// =====================
// 이벤트 핸들러
// =====================
analyzeBtn.addEventListener('click', function () {
  const y = parseInt(birthYear.value);
  const m = parseInt(birthMonth.value);
  const d = parseInt(birthDay.value);

  // 화면 전환: 입력 → 로딩
  inputSection.hidden = true;
  loadingSection.hidden = false;
  resultSection.hidden = true;

  // 1.5초 후 결과 표시
  setTimeout(function () {
    const fortune = generateFortune(y, m, d);
    showResult(fortune);
  }, 1500);
});

retryBtn.addEventListener('click', function () {
  resultSection.hidden = true;
  loadingSection.hidden = true;
  inputSection.hidden = false;
});
