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
const loadingText = document.getElementById('loadingText');
const loadingSubtext = document.getElementById('loadingSubtext');
const errorSection = document.getElementById('errorSection');
const resultSection = document.getElementById('resultSection');
const retryBtn = document.getElementById('retryBtn');
const errorRetryBtn = document.getElementById('errorRetryBtn');
const realAgeInput = document.getElementById('realAgeInput');
const checkBtn = document.getElementById('checkBtn');
const verdictCard = document.getElementById('verdictCard');

// 모델 로드 상태
let modelsLoaded = false;

// 분석 결과 저장
let estimatedAge = 0;

// 이벤트 리스너
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
removeBtn.addEventListener('click', handleRemove);
analyzeBtn.addEventListener('click', analyzeImage);
retryBtn.addEventListener('click', resetAnalysis);
errorRetryBtn.addEventListener('click', resetAnalysis);
checkBtn.addEventListener('click', checkVerdict);

// Enter 키로 실제 나이 확인
realAgeInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkVerdict();
  }
});

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

// 모델 로드
async function loadModels() {
  const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
  ]);

  modelsLoaded = true;
}

// 이미지 분석
async function analyzeImage() {
  uploadSection.hidden = true;
  loadingSection.hidden = false;
  errorSection.hidden = true;
  resultSection.hidden = true;

  try {
    // 모델 로드
    if (!modelsLoaded) {
      loadingText.textContent = 'AI 모델을 불러오는 중...';
      loadingSubtext.textContent = '처음 실행 시 잠시 시간이 걸릴 수 있어요';
      await loadModels();
    }

    loadingText.textContent = '얼굴 나이를 분석하는 중...';
    loadingSubtext.textContent = 'AI가 얼굴 특징을 읽고 있어요';

    // 얼굴 감지 및 나이/성별 추정
    const detection = await faceapi
      .detectSingleFace(previewImage, new faceapi.TinyFaceDetectorOptions())
      .withAgeAndGender();

    if (!detection) {
      showError('얼굴을 감지하지 못했어요');
      return;
    }

    // 결과 추출
    const age = Math.round(detection.age);
    const gender = detection.gender;
    const genderProbability = Math.round(detection.genderProbability * 100);

    // 결과 저장
    estimatedAge = age;

    // 결과 표시
    showResult(age, gender, genderProbability);

  } catch (error) {
    console.error('분석 중 오류:', error);
    showError('분석 중 오류가 발생했어요');
  }
}

// 에러 표시
function showError(message) {
  loadingSection.hidden = true;
  errorSection.hidden = false;
  document.getElementById('errorText').textContent = message;
}

// 결과 표시
function showResult(age, gender, genderProbability) {
  loadingSection.hidden = true;
  resultSection.hidden = false;

  // 나이 표시
  document.getElementById('ageNumber').textContent = age;

  // 성별 표시
  const genderText = gender === 'male' ? '남성' : '여성';
  document.getElementById('genderBadge').textContent = genderText + ' (' + genderProbability + '%)';

  // AI 코멘트 표시
  document.getElementById('ageComment').textContent = getAgeComment(age);

  // 판정 초기화
  verdictCard.hidden = true;
  verdictCard.className = 'verdict-card';
  realAgeInput.value = '';
  document.getElementById('realAgeSection').hidden = false;
}

// 랜덤 선택 헬퍼
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 나이대별 코멘트
function getAgeComment(age) {
  if (age <= 10) {
    return pickRandom([
      '아직 세상의 모든 것이 신기한 나이! 호기심 가득한 눈빛이 보이는 것 같아요.',
      '뛰어놀기 바쁜 나이네요! 에너지가 넘치는 얼굴이에요.',
      '동화 속 주인공 같은 얼굴이에요! 순수한 매력이 가득하네요.'
    ]);
  } else if (age <= 19) {
    return pickRandom([
      '질풍노도의 시기! 꿈과 열정이 가득한 얼굴이에요.',
      '세상을 향한 도전이 시작되는 나이네요. 앞날이 기대되는 얼굴이에요!',
      '청춘의 에너지가 얼굴에서 빛나고 있어요! 무한한 가능성의 나이입니다.'
    ]);
  } else if (age <= 29) {
    return pickRandom([
      '인생의 황금기! 도전과 성장이 가장 활발한 시기의 얼굴이에요.',
      '열정과 패기가 넘치는 20대의 얼굴! 뭐든 할 수 있는 나이입니다.',
      '자기만의 색깔을 찾아가는 중인 얼굴이에요. 20대의 빛이 나네요!'
    ]);
  } else if (age <= 39) {
    return pickRandom([
      '경험과 젊음이 공존하는 나이! 원숙함이 느껴지기 시작하는 얼굴이에요.',
      '일과 삶의 균형을 찾아가는 시기의 얼굴이네요. 내면의 깊이가 보여요.',
      '30대 특유의 자신감이 얼굴에서 느껴져요! 인생의 전성기를 즐기고 계시네요.'
    ]);
  } else if (age <= 49) {
    return pickRandom([
      '인생의 중반전! 깊은 연륜과 카리스마가 느껴지는 얼굴이에요.',
      '경험에서 우러나오는 여유로움이 보이는 얼굴이네요. 멋진 40대입니다!',
      '삶의 지혜가 얼굴에 담겨 있어요. 원숙한 매력이 돋보이는 나이입니다.'
    ]);
  } else if (age <= 59) {
    return pickRandom([
      '풍부한 인생 경험이 얼굴에 녹아있어요. 깊이 있는 매력이 느껴집니다.',
      '세월이 만들어낸 품격이 보이는 얼굴이에요. 멋지게 나이 들고 계시네요!',
      '인생의 노하우가 가득한 나이! 후배들이 존경하는 모습이 떠올라요.'
    ]);
  } else {
    return pickRandom([
      '세월의 지혜와 따뜻함이 얼굴 가득 담겨 있어요. 존경스러운 인상입니다.',
      '인생이라는 긴 여정을 걸어온 깊이가 느껴지는 얼굴이에요. 멋진 인생이네요!',
      '연륜에서 오는 편안함과 포근함이 느껴지는 얼굴이에요. 함께 있으면 마음이 따뜻해질 것 같아요.'
    ]);
  }
}

// 동안/노안 판정
function checkVerdict() {
  const realAge = parseInt(realAgeInput.value);

  if (!realAge || realAge < 1 || realAge > 120) {
    alert('1세에서 120세 사이의 나이를 입력해주세요.');
    return;
  }

  const diff = estimatedAge - realAge;
  const absDiff = Math.abs(diff);

  verdictCard.hidden = false;
  verdictCard.className = 'verdict-card';

  if (diff <= -5) {
    // 동안 (추정 나이가 실제보다 5살 이상 어림)
    verdictCard.classList.add('verdict-young');
    document.getElementById('verdictEmoji').textContent = '👶';
    document.getElementById('verdictTitle').textContent = '동안이시네요!';
    document.getElementById('verdictDesc').textContent = pickRandom([
      '실제 나이보다 ' + absDiff + '살이나 어려 보여요! 동안의 비결이 궁금합니다. 피부 관리를 열심히 하시나 봐요!',
      'AI가 무려 ' + absDiff + '살이나 어리게 봤어요! 주변에서 동안이라는 말 많이 듣지 않나요?',
      '실제보다 ' + absDiff + '살 젊어 보이시네요! 타고난 동안이신 것 같아요. 부러운 얼굴입니다!'
    ]);
  } else if (diff >= 5) {
    // 노안 (추정 나이가 실제보다 5살 이상 많음)
    verdictCard.classList.add('verdict-old');
    document.getElementById('verdictEmoji').textContent = '🧓';
    document.getElementById('verdictTitle').textContent = '나이보다 성숙해 보여요!';
    document.getElementById('verdictDesc').textContent = pickRandom([
      '실제 나이보다 ' + absDiff + '살 정도 성숙해 보여요. 그만큼 신뢰감 있는 인상을 가지고 계신 거예요!',
      'AI가 ' + absDiff + '살 더 많게 봤지만, 그만큼 카리스마와 깊이가 느껴지는 얼굴이라는 뜻이에요!',
      '실제보다 ' + absDiff + '살 성숙해 보이시네요. 조명이나 표정 때문일 수 있어요. 분위기 있는 얼굴이에요!'
    ]);
  } else {
    // 적중 (4살 이내 차이)
    verdictCard.classList.add('verdict-accurate');
    document.getElementById('verdictEmoji').textContent = '🎯';
    document.getElementById('verdictTitle').textContent = 'AI가 정확히 맞췄어요!';
    document.getElementById('verdictDesc').textContent = pickRandom([
      '추정 나이와 실제 나이의 차이가 ' + absDiff + '살밖에 안 나요! AI의 정확도가 놀랍네요.',
      '거의 정확하게 맞췄어요! ' + absDiff + '살 차이라니, AI가 꽤 잘 봤네요. 얼굴에서 나이가 잘 드러나는 편이에요.',
      '실제 나이와 거의 일치해요! AI가 ' + absDiff + '살 차이로 거의 정확하게 추정했네요. 대단한 정확도!'
    ]);
  }

  // 판정 카드로 스크롤
  verdictCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 분석 초기화
function resetAnalysis() {
  resultSection.hidden = true;
  errorSection.hidden = true;
  uploadSection.hidden = false;

  fileInput.value = '';
  previewImage.src = '';
  uploadPlaceholder.hidden = false;
  previewContainer.hidden = true;
  analyzeBtn.disabled = true;

  // 판정 초기화
  verdictCard.hidden = true;
  verdictCard.className = 'verdict-card';
  realAgeInput.value = '';
  estimatedAge = 0;
}
