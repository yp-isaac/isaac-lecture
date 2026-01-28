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

// 모델 로드 상태
let modelsLoaded = false;

// 이벤트 리스너
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
removeBtn.addEventListener('click', handleRemove);
analyzeBtn.addEventListener('click', analyzeImage);
retryBtn.addEventListener('click', resetAnalysis);
errorRetryBtn.addEventListener('click', resetAnalysis);

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
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
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

    loadingText.textContent = '얼굴을 분석하는 중...';
    loadingSubtext.textContent = 'AI가 얼굴 특징을 읽고 있어요';

    // 얼굴 감지 및 랜드마크 추출
    const detection = await faceapi
      .detectSingleFace(previewImage, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    if (!detection) {
      showError('얼굴을 감지하지 못했어요');
      return;
    }

    // 얼굴 특징 분석
    const features = analyzeFaceFeatures(detection.landmarks);

    // 결과 생성 및 표시
    showResult(features);

  } catch (error) {
    console.error('분석 중 오류:', error);
    showError('분석 중 오류가 발생했어요');
  }
}

// 얼굴 특징 분석
function analyzeFaceFeatures(landmarks) {
  // 주요 포인트 추출
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const mouth = landmarks.getMouth();
  const jawOutline = landmarks.getJawOutline();
  const leftEyebrow = landmarks.getLeftEyeBrow();
  const rightEyebrow = landmarks.getRightEyeBrow();

  // 1. 눈매 분석 (눈꼬리 각도)
  const leftEyeAngle = calculateEyeAngle(leftEye);
  const rightEyeAngle = calculateEyeAngle(rightEye);
  const avgEyeAngle = (leftEyeAngle + rightEyeAngle) / 2;

  // 2. 입꼬리 분석
  const mouthCornerAngle = calculateMouthAngle(mouth);

  // 3. 얼굴형 분석 (가로/세로 비율)
  const faceRatio = calculateFaceRatio(jawOutline);

  // 4. 눈썹 각도
  const eyebrowAngle = calculateEyebrowAngle(leftEyebrow, rightEyebrow);

  // 5. 눈 크기 (상대적)
  const eyeSize = calculateEyeSize(leftEye, rightEye, jawOutline);

  // 특징 분류
  const features = {
    // 눈매: 부드러움 vs 날카로움 (-1 ~ 1)
    eyeShape: classifyEyeShape(avgEyeAngle),

    // 입꼬리: 올라감 vs 내려감 (-1 ~ 1)
    mouthShape: classifyMouthShape(mouthCornerAngle),

    // 얼굴형: 둥근형 vs 각진형 (-1 ~ 1)
    faceShape: classifyFaceShape(faceRatio),

    // 눈썹: 부드러움 vs 강함 (-1 ~ 1)
    eyebrowShape: classifyEyebrowShape(eyebrowAngle),

    // 눈 크기: 작음 vs 큼 (-1 ~ 1)
    eyeSizeClass: classifyEyeSize(eyeSize)
  };

  return features;
}

// 눈꼬리 각도 계산
function calculateEyeAngle(eye) {
  const innerCorner = eye[0];
  const outerCorner = eye[3];
  const angle = Math.atan2(outerCorner.y - innerCorner.y, outerCorner.x - innerCorner.x);
  return angle * (180 / Math.PI);
}

// 입꼬리 각도 계산
function calculateMouthAngle(mouth) {
  const leftCorner = mouth[0];
  const rightCorner = mouth[6];
  const center = mouth[3];

  const leftAngle = Math.atan2(center.y - leftCorner.y, center.x - leftCorner.x);
  const rightAngle = Math.atan2(center.y - rightCorner.y, rightCorner.x - center.x);

  return (leftAngle + rightAngle) / 2 * (180 / Math.PI);
}

// 얼굴 비율 계산
function calculateFaceRatio(jawOutline) {
  const leftMost = jawOutline[0];
  const rightMost = jawOutline[16];
  const bottom = jawOutline[8];
  const top = jawOutline[0];

  const width = Math.abs(rightMost.x - leftMost.x);
  const height = Math.abs(bottom.y - top.y);

  return width / height;
}

// 눈썹 각도 계산
function calculateEyebrowAngle(leftBrow, rightBrow) {
  const leftAngle = Math.atan2(
    leftBrow[4].y - leftBrow[0].y,
    leftBrow[4].x - leftBrow[0].x
  ) * (180 / Math.PI);

  const rightAngle = Math.atan2(
    rightBrow[0].y - rightBrow[4].y,
    rightBrow[0].x - rightBrow[4].x
  ) * (180 / Math.PI);

  return (Math.abs(leftAngle) + Math.abs(rightAngle)) / 2;
}

// 눈 크기 계산
function calculateEyeSize(leftEye, rightEye, jawOutline) {
  const leftHeight = Math.abs(leftEye[1].y - leftEye[5].y);
  const rightHeight = Math.abs(rightEye[1].y - rightEye[5].y);
  const avgEyeHeight = (leftHeight + rightHeight) / 2;

  const faceHeight = Math.abs(jawOutline[8].y - jawOutline[0].y);

  return avgEyeHeight / faceHeight;
}

// 분류 함수들
function classifyEyeShape(angle) {
  // 눈꼬리가 올라갈수록 양수, 내려갈수록 음수
  if (angle < -3) return 1;      // 날카로운 눈매
  if (angle > 3) return -1;      // 부드러운 눈매
  return angle / 3;              // 중간
}

function classifyMouthShape(angle) {
  // 입꼬리가 올라갈수록 양수
  if (angle < -5) return -1;     // 내려간 입꼬리
  if (angle > 5) return 1;       // 올라간 입꼬리
  return angle / 5;
}

function classifyFaceShape(ratio) {
  // 비율이 높을수록 넓은(둥근) 얼굴
  if (ratio > 1.4) return -1;    // 둥근형
  if (ratio < 1.1) return 1;     // 각진형
  return (1.25 - ratio) / 0.15;
}

function classifyEyebrowShape(angle) {
  // 각도가 클수록 강한 눈썹
  if (angle > 15) return 1;      // 강한 눈썹
  if (angle < 5) return -1;      // 부드러운 눈썹
  return (angle - 10) / 5;
}

function classifyEyeSize(size) {
  if (size > 0.08) return 1;     // 큰 눈
  if (size < 0.05) return -1;    // 작은 눈
  return (size - 0.065) / 0.015;
}

// 에러 표시
function showError(message) {
  loadingSection.hidden = true;
  errorSection.hidden = false;
  document.getElementById('errorText').textContent = message;
}

// 결과 표시
function showResult(features) {
  loadingSection.hidden = true;
  resultSection.hidden = false;

  // 특징 태그 생성
  const featureTags = document.getElementById('featureTags');
  featureTags.innerHTML = '';

  const tags = generateFeatureTags(features);
  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'feature-tag';
    tagEl.textContent = tag;
    featureTags.appendChild(tagEl);
  });

  // 각 섹션 내용 생성
  document.getElementById('firstImpression').textContent = generateFirstImpression(features);
  document.getElementById('personalityTendency').textContent = generatePersonalityTendency(features);
  document.getElementById('loveStyle').textContent = generateLoveStyle(features);
  document.getElementById('workStyle').textContent = generateWorkStyle(features);
}

// 특징 태그 생성
function generateFeatureTags(features) {
  const tags = [];

  if (features.eyeShape > 0.3) tags.push('날카로운 눈매');
  else if (features.eyeShape < -0.3) tags.push('부드러운 눈매');
  else tags.push('온화한 눈매');

  if (features.mouthShape > 0.3) tags.push('밝은 인상');
  else if (features.mouthShape < -0.3) tags.push('차분한 인상');
  else tags.push('편안한 인상');

  if (features.faceShape > 0.3) tags.push('또렷한 윤곽');
  else if (features.faceShape < -0.3) tags.push('부드러운 윤곽');
  else tags.push('균형잡힌 윤곽');

  if (features.eyeSizeClass > 0.3) tags.push('큰 눈');
  else if (features.eyeSizeClass < -0.3) tags.push('깊은 눈');

  return tags;
}

// 첫인상 생성
function generateFirstImpression(features) {
  let impression = '';

  // 눈매 기반
  if (features.eyeShape > 0.3) {
    impression += '처음 만났을 때 카리스마 있고 자신감이 느껴지는 인상을 주는 경향이 있어요. ';
  } else if (features.eyeShape < -0.3) {
    impression += '처음 만났을 때 다정하고 친근한 느낌을 주는 편이에요. 사람들이 편하게 다가오는 경우가 많아요. ';
  } else {
    impression += '처음 만났을 때 신뢰감 있고 안정적인 인상을 주는 편이에요. ';
  }

  // 입꼬리 기반
  if (features.mouthShape > 0.3) {
    impression += '밝고 긍정적인 에너지가 느껴져서, 주변 분위기를 환하게 만드는 경향이 있어요.';
  } else if (features.mouthShape < -0.3) {
    impression += '진중하고 신중한 느낌을 주어, 믿음직스러운 인상을 주는 경우가 많아요.';
  } else {
    impression += '적당히 친근하면서도 진지한 느낌의 균형 잡힌 인상을 주는 편이에요.';
  }

  return impression;
}

// 성격 경향 생성
function generatePersonalityTendency(features) {
  let personality = '';

  // 얼굴형 기반
  if (features.faceShape > 0.3) {
    personality += '자기 기준이 명확하고, 한 번 결정한 것은 끝까지 밀고 나가는 성향을 보이는 경우가 많아요. ';
  } else if (features.faceShape < -0.3) {
    personality += '유연하고 포용력이 있으며, 다양한 의견을 수용하는 열린 마음을 가진 경향이 있어요. ';
  } else {
    personality += '상황에 따라 유연하게 대처하면서도, 중요한 순간에는 자신의 기준을 지키는 편이에요. ';
  }

  // 눈매 기반
  if (features.eyeShape > 0.3) {
    personality += '목표 지향적이고 분석적인 사고를 하는 편이며, ';
  } else if (features.eyeShape < -0.3) {
    personality += '공감 능력이 높고 다른 사람의 감정을 잘 이해하는 편이며, ';
  } else {
    personality += '이성과 감성의 균형을 잘 맞추는 편이며, ';
  }

  // 눈썹 기반
  if (features.eyebrowShape > 0.3) {
    personality += '의지가 강하고 추진력이 있는 성격일 가능성이 높아요.';
  } else if (features.eyebrowShape < -0.3) {
    personality += '섬세하고 배려심이 깊은 성격일 가능성이 높아요.';
  } else {
    personality += '차분하면서도 필요할 때 결단력을 보이는 성격일 가능성이 높아요.';
  }

  return personality;
}

// 연애 스타일 생성
function generateLoveStyle(features) {
  let love = '';

  // 눈 크기와 눈매 기반
  if (features.eyeSizeClass > 0.3) {
    love += '감정 표현이 풍부하고, 연인에게 애정을 적극적으로 표현하는 편일 수 있어요. ';
  } else if (features.eyeSizeClass < -0.3) {
    love += '감정을 깊이 느끼지만 표현은 은근하게 하는 편일 수 있어요. 진심이 담긴 행동으로 마음을 전하는 경향이 있어요. ';
  } else {
    love += '상황에 맞게 감정을 표현하며, 자연스럽게 애정을 전달하는 편이에요. ';
  }

  // 입꼬리 기반
  if (features.mouthShape > 0.3) {
    love += '밝고 유쾌한 분위기를 만들어, 함께 있으면 즐거운 연인 유형일 가능성이 있어요. ';
  } else if (features.mouthShape < -0.3) {
    love += '깊고 진지한 대화를 선호하며, 신뢰를 중요시하는 연인 유형일 가능성이 있어요. ';
  }

  // 얼굴형 기반
  if (features.faceShape > 0.3) {
    love += '연애에서도 자신의 가치관을 중요시하며, 서로 성장하는 관계를 추구하는 경향이 있어요.';
  } else {
    love += '상대방의 의견을 존중하고, 함께 맞춰가는 관계를 선호하는 경향이 있어요.';
  }

  return love;
}

// 사회/직장 스타일 생성
function generateWorkStyle(features) {
  let work = '';

  // 눈매와 눈썹 기반
  if (features.eyeShape > 0.3 && features.eyebrowShape > 0.3) {
    work += '리더십을 발휘하는 위치에서 빛을 발하는 경우가 많아요. 팀을 이끌거나 프로젝트를 주도하는 역할이 잘 맞을 수 있어요. ';
  } else if (features.eyeShape < -0.3) {
    work += '팀원들과의 협업에서 강점을 보이며, 분위기를 조율하고 갈등을 중재하는 역할을 잘 해내는 경향이 있어요. ';
  } else {
    work += '상황에 따라 리더와 팔로워 역할 모두 유연하게 수행할 수 있는 편이에요. ';
  }

  // 입꼬리 기반
  if (features.mouthShape > 0.3) {
    work += '사람들과의 네트워킹에 능하고, 대외적인 업무에서 좋은 성과를 내는 경우가 많아요. ';
  } else if (features.mouthShape < -0.3) {
    work += '깊이 있는 분석과 신중한 의사결정이 필요한 업무에서 강점을 보이는 경향이 있어요. ';
  }

  // 얼굴형 기반
  if (features.faceShape > 0.3) {
    work += '명확한 목표를 세우고 체계적으로 일을 처리하는 스타일일 가능성이 높아요.';
  } else {
    work += '창의적인 접근과 유연한 문제 해결 능력을 가진 스타일일 가능성이 높아요.';
  }

  return work;
}

// 분석 초기화
function resetAnalysis() {
  resultSection.hidden = true;
  errorSection.hidden = true;
  uploadSection.hidden = false;

  // 이미지 초기화
  fileInput.value = '';
  previewImage.src = '';
  uploadPlaceholder.hidden = false;
  previewContainer.hidden = true;
  analyzeBtn.disabled = true;
}
