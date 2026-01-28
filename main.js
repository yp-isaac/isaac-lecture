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

// 성격 유형 데이터
const personalityTypes = [
  {
    emoji: '👑',
    type: '숨겨진 리더',
    description: '당신은 타고난 리더십을 가지고 있습니다. 평소에는 조용히 관찰하지만, 중요한 순간에 핵심을 짚어내는 능력이 뛰어납니다. 사람들은 자연스럽게 당신의 의견을 따르게 되고, 당신은 그 신뢰에 책임감을 느끼는 타입입니다.',
    strengths: ['뛰어난 판단력', '책임감이 강함', '위기 상황에 침착함'],
    weaknesses: ['완벽주의 성향', '때로 고집이 셈', '휴식을 잘 취하지 못함'],
    job: 'CEO, 프로젝트 매니저, 컨설턴트',
    match: '감성 예술가'
  },
  {
    emoji: '🎨',
    type: '감성 예술가',
    description: '당신의 눈에는 세상이 하나의 캔버스로 보입니다. 일상에서도 아름다움을 발견하고, 그것을 표현하고 싶어하는 욕구가 강합니다. 감수성이 풍부하여 다른 사람의 감정을 잘 이해하고 공감할 수 있습니다.',
    strengths: ['창의력이 뛰어남', '공감 능력이 높음', '독특한 시각을 가짐'],
    weaknesses: ['현실적인 문제에 약함', '감정 기복이 있음', '결정을 미루는 경향'],
    job: '디자이너, 작가, 음악가',
    match: '논리적 분석가'
  },
  {
    emoji: '🔬',
    type: '논리적 분석가',
    description: '당신은 모든 것을 분석하고 이해하려는 지적 호기심이 넘칩니다. 복잡한 문제도 체계적으로 분해하여 해결책을 찾아내는 능력이 탁월합니다. 데이터와 논리를 기반으로 한 판단을 선호합니다.',
    strengths: ['분석력이 뛰어남', '객관적인 판단', '문제 해결 능력'],
    weaknesses: ['감정 표현이 서툴러요', '융통성이 부족할 때가 있어요', '너무 신중해서 기회를 놓칠 때가 있어요'],
    job: '개발자, 데이터 분석가, 연구원',
    match: '열정적 행동파'
  },
  {
    emoji: '🚀',
    type: '열정적 행동파',
    description: '당신은 생각보다 행동이 앞서는 타입입니다. 에너지가 넘치고 새로운 도전을 두려워하지 않습니다. 주변 사람들에게 활력을 주고, 분위기 메이커 역할을 자연스럽게 합니다.',
    strengths: ['실행력이 뛰어남', '긍정적인 에너지', '모험을 즐김'],
    weaknesses: ['조급할 때가 있어요', '장기적인 계획이 부족할 때가 있어요', '참을성이 부족할 때가 있어요'],
    job: '기업가, 영업, 이벤트 기획자',
    match: '논리적 분석가'
  },
  {
    emoji: '🌸',
    type: '평화주의자',
    description: '당신은 조화와 균형을 중요시합니다. 갈등을 싫어하고 주변 사람들이 모두 행복하기를 바랍니다. 경청을 잘하고 중재 역할을 맡을 때 빛을 발합니다. 안정적인 환경에서 최고의 능력을 발휘합니다.',
    strengths: ['경청을 잘함', '중재 능력이 뛰어남', '안정감을 줌'],
    weaknesses: ['자기주장이 약할 때가 있어요', '갈등 회피 성향', '변화를 두려워할 때가 있어요'],
    job: '상담사, HR 전문가, 사회복지사',
    match: '숨겨진 리더'
  },
  {
    emoji: '🎭',
    type: '매력적인 연예인',
    description: '당신은 무대 체질입니다. 사람들 앞에 설 때 에너지가 넘치고, 자연스럽게 주목받습니다. 유머 감각이 뛰어나고 대화를 이끌어가는 능력이 탁월합니다. 어디서든 분위기를 밝게 만듭니다.',
    strengths: ['사교성이 뛰어남', '표현력이 좋음', '유머 감각'],
    weaknesses: ['혼자 있는 시간이 힘들어요', '깊은 관계를 맺기 어려울 때가 있어요', '인정받고 싶어해요'],
    job: '연예인, 유튜버, 마케터',
    match: '평화주의자'
  },
  {
    emoji: '📚',
    type: '지혜로운 학자',
    description: '당신은 지식에 대한 갈증이 있습니다. 새로운 것을 배우는 것을 즐기고, 깊이 있는 대화를 선호합니다. 혼자만의 시간을 통해 에너지를 충전하며, 사색하는 것을 좋아합니다.',
    strengths: ['깊은 사고력', '전문성을 키워감', '신중한 결정'],
    weaknesses: ['사교 활동이 부담스러울 때가 있어요', '행동보다 생각이 앞서요', '완벽주의 성향'],
    job: '교수, 연구원, 철학자',
    match: '열정적 행동파'
  },
  {
    emoji: '🦁',
    type: '야심찬 정복자',
    description: '당신은 목표를 향해 돌진하는 타입입니다. 경쟁을 즐기고 승리했을 때 가장 큰 만족을 느낍니다. 강한 의지력으로 어려운 상황도 돌파해 나가며, 높은 기준을 가지고 있습니다.',
    strengths: ['강한 추진력', '목표 지향적', '자신감'],
    weaknesses: ['때로 공격적으로 보일 수 있어요', '패배를 인정하기 어려워해요', '다른 사람 배려가 부족할 때가 있어요'],
    job: '변호사, 운동선수, 투자자',
    match: '감성 예술가'
  },
  {
    emoji: '🌻',
    type: '따뜻한 돌봄이',
    description: '당신은 주변 사람들을 챙기는 것을 자연스럽게 합니다. 다른 사람의 필요를 먼저 알아채고, 도움의 손길을 내밉니다. 당신 곁에 있으면 편안함을 느끼게 되고, 많은 사람들이 당신에게 의지합니다.',
    strengths: ['배려심이 깊음', '신뢰를 줌', '헌신적'],
    weaknesses: ['자기 희생이 과할 때가 있어요', '거절을 잘 못해요', '자신을 돌보는 것을 잊어요'],
    job: '간호사, 교사, 요리사',
    match: '야심찬 정복자'
  },
  {
    emoji: '🔮',
    type: '신비로운 몽상가',
    description: '당신은 현실과 상상의 경계를 자유롭게 넘나듭니다. 직관력이 뛰어나 다른 사람들이 보지 못하는 것을 감지합니다. 독특한 생각과 아이디어로 주변을 놀라게 하며, 신비로운 매력이 있습니다.',
    strengths: ['뛰어난 직관력', '창의적 상상력', '통찰력'],
    weaknesses: ['현실 감각이 부족할 때가 있어요', '집중력이 흐트러질 때가 있어요', '실용적인 부분을 놓칠 때가 있어요'],
    job: '점술가, 소설가, 심리학자',
    match: '지혜로운 학자'
  }
];

// DOM 요소
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const uploadSection = document.getElementById('uploadSection');
const loadingSection = document.getElementById('loadingSection');
const resultSection = document.getElementById('resultSection');
const retryBtn = document.getElementById('retryBtn');

// 이벤트 리스너
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
removeBtn.addEventListener('click', handleRemove);
analyzeBtn.addEventListener('click', analyzeImage);
retryBtn.addEventListener('click', resetAnalysis);

// 드래그 앤 드롭
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');

  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    handleFile(files[0]);
  }
});

// 파일 선택 처리
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

// 파일 처리
function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드할 수 있습니다.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    uploadPlaceholder.hidden = true;
    previewContainer.hidden = false;
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

// 이미지 제거
function handleRemove(e) {
  e.stopPropagation();
  fileInput.value = '';
  previewImage.src = '';
  uploadPlaceholder.hidden = false;
  previewContainer.hidden = true;
  analyzeBtn.disabled = true;
}

// 이미지 분석
function analyzeImage() {
  uploadSection.hidden = true;
  loadingSection.hidden = false;
  resultSection.hidden = true;

  // 2~3초 후 결과 표시 (분석하는 듯한 효과)
  const delay = 2000 + Math.random() * 1000;

  setTimeout(() => {
    showResult();
  }, delay);
}

// 결과 표시
function showResult() {
  loadingSection.hidden = true;
  resultSection.hidden = false;

  // 랜덤 성격 유형 선택
  const randomIndex = Math.floor(Math.random() * personalityTypes.length);
  const personality = personalityTypes[randomIndex];

  // 결과 업데이트
  document.getElementById('resultEmoji').textContent = personality.emoji;
  document.getElementById('resultType').textContent = personality.type;
  document.getElementById('resultDescription').textContent = personality.description;

  // 강점 리스트
  const strengthList = document.getElementById('strengthList');
  strengthList.innerHTML = '';
  personality.strengths.forEach(strength => {
    const li = document.createElement('li');
    li.textContent = strength;
    strengthList.appendChild(li);
  });

  // 약점 리스트
  const weaknessList = document.getElementById('weaknessList');
  weaknessList.innerHTML = '';
  personality.weaknesses.forEach(weakness => {
    const li = document.createElement('li');
    li.textContent = weakness;
    weaknessList.appendChild(li);
  });

  // 추가 정보
  document.getElementById('jobMatch').textContent = personality.job;
  document.getElementById('typeMatch').textContent = personality.match;
}

// 분석 초기화
function resetAnalysis() {
  resultSection.hidden = true;
  uploadSection.hidden = false;

  // 이미지 초기화
  fileInput.value = '';
  previewImage.src = '';
  uploadPlaceholder.hidden = false;
  previewContainer.hidden = true;
  analyzeBtn.disabled = true;
}
