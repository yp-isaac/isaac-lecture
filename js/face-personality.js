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
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const mouth = landmarks.getMouth();
  const jawOutline = landmarks.getJawOutline();
  const leftEyebrow = landmarks.getLeftEyeBrow();
  const rightEyebrow = landmarks.getRightEyeBrow();

  const leftEyeAngle = calculateEyeAngle(leftEye);
  const rightEyeAngle = calculateEyeAngle(rightEye);
  const avgEyeAngle = (leftEyeAngle + rightEyeAngle) / 2;
  const mouthCornerAngle = calculateMouthAngle(mouth);
  const faceRatio = calculateFaceRatio(jawOutline);
  const eyebrowAngle = calculateEyebrowAngle(leftEyebrow, rightEyebrow);
  const eyeSize = calculateEyeSize(leftEye, rightEye, jawOutline);

  return {
    eyeShape: classifyEyeShape(avgEyeAngle),
    mouthShape: classifyMouthShape(mouthCornerAngle),
    faceShape: classifyFaceShape(faceRatio),
    eyebrowShape: classifyEyebrowShape(eyebrowAngle),
    eyeSizeClass: classifyEyeSize(eyeSize)
  };
}

function calculateEyeAngle(eye) {
  const innerCorner = eye[0];
  const outerCorner = eye[3];
  const angle = Math.atan2(outerCorner.y - innerCorner.y, outerCorner.x - innerCorner.x);
  return angle * (180 / Math.PI);
}

function calculateMouthAngle(mouth) {
  const leftCorner = mouth[0];
  const rightCorner = mouth[6];
  const center = mouth[3];
  const leftAngle = Math.atan2(center.y - leftCorner.y, center.x - leftCorner.x);
  const rightAngle = Math.atan2(center.y - rightCorner.y, rightCorner.x - center.x);
  return (leftAngle + rightAngle) / 2 * (180 / Math.PI);
}

function calculateFaceRatio(jawOutline) {
  const leftMost = jawOutline[0];
  const rightMost = jawOutline[16];
  const bottom = jawOutline[8];
  const top = jawOutline[0];
  const width = Math.abs(rightMost.x - leftMost.x);
  const height = Math.abs(bottom.y - top.y);
  return width / height;
}

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

function calculateEyeSize(leftEye, rightEye, jawOutline) {
  const leftHeight = Math.abs(leftEye[1].y - leftEye[5].y);
  const rightHeight = Math.abs(rightEye[1].y - rightEye[5].y);
  const avgEyeHeight = (leftHeight + rightHeight) / 2;
  const faceHeight = Math.abs(jawOutline[8].y - jawOutline[0].y);
  return avgEyeHeight / faceHeight;
}

function classifyEyeShape(angle) {
  if (angle < -3) return 1;
  if (angle > 3) return -1;
  return angle / 3;
}

function classifyMouthShape(angle) {
  if (angle < -5) return -1;
  if (angle > 5) return 1;
  return angle / 5;
}

function classifyFaceShape(ratio) {
  if (ratio > 1.4) return -1;
  if (ratio < 1.1) return 1;
  return (1.25 - ratio) / 0.15;
}

function classifyEyebrowShape(angle) {
  if (angle > 15) return 1;
  if (angle < 5) return -1;
  return (angle - 10) / 5;
}

function classifyEyeSize(size) {
  if (size > 0.08) return 1;
  if (size < 0.05) return -1;
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

  const featureTags = document.getElementById('featureTags');
  featureTags.innerHTML = '';

  const tags = generateFeatureTags(features);
  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'feature-tag';
    tagEl.textContent = tag;
    featureTags.appendChild(tagEl);
  });

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

// 랜덤 선택 헬퍼
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 첫인상 생성
function generateFirstImpression(features) {
  let impression = '';

  if (features.eyeShape > 0.3) {
    impression += pickRandom([
      '처음 만났을 때 카리스마 있고 자신감이 느껴지는 인상을 주는 경향이 있어요.',
      '말수가 적어 보여도 속으로는 많은 판단을 하고 있는 타입입니다.',
      '조용해 보이지만 상황을 잘 읽는 관찰자형 인상입니다.',
      '감정을 크게 드러내기보다는 속으로 정리하는 편으로 보입니다.',
      '첫 만남에서 쉽게 무시할 수 없는 존재감을 가지고 있어요.',
      '눈빛에서 자기 확신이 느껴지는 타입입니다.',
      '가만히 있어도 어딘가 날카로운 분위기가 느껴지는 인상이에요.',
      '처음엔 다가가기 어려워 보이지만, 알고 보면 의외로 따뜻한 면이 있는 타입입니다.'
    ]);
  } else if (features.eyeShape < -0.3) {
    impression += pickRandom([
      '처음 만났을 때 다정하고 친근한 느낌을 주는 편이에요. 사람들이 편하게 다가오는 경우가 많아요.',
      '부드러운 분위기 속에 자기만의 기준이 느껴지는 얼굴입니다.',
      '친절해 보이면서도 선은 분명히 지키는 얼굴입니다.',
      '안정적인 분위기 때문에 주변에서 의지하는 사람이 많을 수 있습니다.',
      '처음 만나도 오래 알고 지낸 것 같은 편안함을 주는 인상이에요.',
      '웃지 않아도 어딘가 따뜻한 기운이 느껴지는 얼굴입니다.',
      '사람들이 고민을 털어놓고 싶어지는 분위기를 가지고 있어요.',
      '첫인상이 순하고 온화해서, 경계심 없이 다가갈 수 있는 타입입니다.'
    ]);
  } else {
    impression += pickRandom([
      '처음 만났을 때 신뢰감 있고 안정적인 인상을 주는 편이에요.',
      '처음엔 차분해 보이지만, 가까워질수록 생각이 깊다는 인상을 줍니다.',
      '편안한 인상이지만, 아무에게나 쉽게 마음을 열지는 않습니다.',
      '처음엔 무난하지만, 알수록 개성이 드러나는 타입입니다.',
      '신뢰를 주는 인상이지만, 본인은 쉽게 기대지 않는 편입니다.',
      '특별히 튀지 않지만, 은근히 기억에 남는 인상을 가지고 있어요.',
      '첫인상만으로는 성격을 쉽게 파악하기 어려운, 미스터리한 매력이 있습니다.',
      '호감과 신뢰 사이의 적절한 균형을 가진 인상이에요.'
    ]);
  }
  impression += ' ';

  if (features.mouthShape > 0.3) {
    impression += pickRandom([
      '밝고 긍정적인 에너지가 느껴져서, 주변 분위기를 환하게 만드는 경향이 있어요.',
      '자연스럽게 분위기를 부드럽게 만드는 힘이 있는 인상이에요.',
      '함께 있으면 기분이 좋아지는, 긍정적인 에너지를 가진 타입입니다.',
      '웃는 모습이 인상적이라 한번 보면 잊기 어려운 얼굴이에요.'
    ]);
  } else if (features.mouthShape < -0.3) {
    impression += pickRandom([
      '진중하고 신중한 느낌을 주어, 믿음직스러운 인상을 주는 경우가 많아요.',
      '가벼워 보이지 않아서 오히려 깊은 신뢰를 주는 인상이에요.',
      '과묵한 분위기가 오히려 궁금증을 자아내는 타입입니다.',
      '말보다 행동으로 진심을 보여주는 사람처럼 느껴지는 인상입니다.'
    ]);
  } else {
    impression += pickRandom([
      '적당히 친근하면서도 진지한 느낌의 균형 잡힌 인상을 주는 편이에요.',
      '편하게 대할 수 있으면서도 가볍지 않은 분위기를 가지고 있어요.',
      '무리 속에서 자연스럽게 어울리면서도 자기 자리를 지키는 인상입니다.',
      '상황에 따라 밝기도 하고 진지하기도 한, 다면적인 매력을 가진 인상이에요.'
    ]);
  }
  return impression;
}

// 성격 경향 생성
function generatePersonalityTendency(features) {
  let personality = '';

  if (features.faceShape > 0.3) {
    personality += pickRandom([
      '자기 기준이 명확하고, 한 번 결정한 것은 끝까지 밀고 나가는 성향을 보이는 경우가 많아요.',
      '책임감이 강해 맡은 일은 끝까지 가려는 경향이 있습니다.',
      '스스로 기준이 명확해 타협을 잘 하지 않는 부분이 있습니다.',
      '한번 마음을 정하면 쉽게 바꾸지 않는 성향입니다.',
      '자신만의 원칙이 있어 쉽게 흔들리지 않는 편입니다.',
      '주변 평가보다 자기 내면의 기준을 더 중요하게 여기는 성향이에요.',
      '결단력이 있어 중요한 순간에 망설이지 않는 편입니다.',
      '목표가 생기면 끈기 있게 밀고 나가는 집중력을 가지고 있어요.'
    ]);
  } else if (features.faceShape < -0.3) {
    personality += pickRandom([
      '유연하고 포용력이 있으며, 다양한 의견을 수용하는 열린 마음을 가진 경향이 있어요.',
      '감정 표현은 절제되어 있지만, 공감 능력은 높은 편입니다.',
      '싫은 걸 싫다고 말하기까지 시간이 걸릴 수 있습니다.',
      '주변 분위기에 민감하지만 쉽게 휘둘리지는 않습니다.',
      '사람 사이의 분위기를 잘 읽고 갈등을 부드럽게 풀어가는 재주가 있어요.',
      '다양한 관점을 받아들이는 열린 사고방식을 가진 편입니다.',
      '상대의 입장에서 먼저 생각해보는 배려심이 있는 성격이에요.',
      '강하게 주장하기보다 자연스럽게 설득하는 방식을 선호해요.'
    ]);
  } else {
    personality += pickRandom([
      '상황에 따라 유연하게 대처하면서도, 중요한 순간에는 자신의 기준을 지키는 편이에요.',
      '혼자만의 시간이 있어야 에너지가 회복되는 성향입니다.',
      '결정하기 전까지는 충분히 고민하는 편입니다.',
      '급하게 움직이기보다는 흐름을 보며 판단하는 스타일입니다.',
      '감정보다 이성적인 선택을 하려는 편입니다.',
      '겉으로는 여유로워 보이지만 내면에서는 많은 생각을 하고 있는 편이에요.',
      '변화를 두려워하지 않으면서도 안정감을 중요하게 여기는 성격입니다.',
      '감정에 쉽게 휩쓸리지 않으면서도, 중요한 사람에게는 진심을 다하는 편이에요.'
    ]);
  }
  personality += ' ';

  if (features.eyeShape > 0.3) {
    personality += pickRandom([
      '목표 지향적이고 분석적인 사고를 하는 편이며, ',
      '논리적으로 상황을 정리하는 능력이 뛰어난 편이며, ',
      '문제의 핵심을 빠르게 파악하는 직관이 있는 편이며, '
    ]);
  } else if (features.eyeShape < -0.3) {
    personality += pickRandom([
      '공감 능력이 높고 다른 사람의 감정을 잘 이해하는 편이며, ',
      '상대의 미세한 감정 변화도 잘 캐치하는 편이며, ',
      '따뜻한 말 한마디로 사람을 위로하는 능력이 있는 편이며, '
    ]);
  } else {
    personality += pickRandom([
      '이성과 감성의 균형을 잘 맞추는 편이며, ',
      '상황에 따라 이성적이거나 감성적으로 유연하게 전환하는 편이며, ',
      '냉정해 보일 때도 있지만 속으로는 따뜻한 면이 있는 편이며, '
    ]);
  }

  if (features.eyebrowShape > 0.3) {
    personality += pickRandom([
      '의지가 강하고 추진력이 있는 성격일 가능성이 높아요.',
      '한 번 시작하면 끝을 보는 끈기가 있는 성격일 가능성이 높아요.',
      '어려운 상황에서도 쉽게 포기하지 않는 강인함이 있는 성격일 가능성이 높아요.'
    ]);
  } else if (features.eyebrowShape < -0.3) {
    personality += pickRandom([
      '섬세하고 배려심이 깊은 성격일 가능성이 높아요.',
      '작은 것에서도 의미를 찾고 감동받을 수 있는 성격일 가능성이 높아요.',
      '상대방의 기분을 먼저 살피는 세심한 성격일 가능성이 높아요.'
    ]);
  } else {
    personality += pickRandom([
      '차분하면서도 필요할 때 결단력을 보이는 성격일 가능성이 높아요.',
      '평소에는 온화하지만 자신의 영역을 침범당하면 단호해지는 성격일 가능성이 높아요.',
      '부드러운 겉모습 안에 단단한 중심을 가진 성격일 가능성이 높아요.'
    ]);
  }
  return personality;
}

// 연애 스타일 생성
function generateLoveStyle(features) {
  let love = '';

  if (features.eyeSizeClass > 0.3) {
    love += pickRandom([
      '감정 표현이 풍부하고, 연인에게 애정을 적극적으로 표현하는 편일 수 있어요.',
      '좋아하는 감정을 숨기지 못하고, 눈빛만으로도 마음이 읽히는 편일 수 있어요.',
      '연인에게 서프라이즈나 특별한 이벤트를 즐기는 로맨틱한 성향이 있을 수 있어요.',
      '사랑에 빠지면 온 세상이 그 사람 중심으로 돌아가는 올인형일 수 있어요.'
    ]);
  } else if (features.eyeSizeClass < -0.3) {
    love += pickRandom([
      '감정을 깊이 느끼지만 표현은 은근하게 하는 편일 수 있어요. 진심이 담긴 행동으로 마음을 전하는 경향이 있어요.',
      '겉으로는 담담해 보여도, 마음속으로는 깊은 애정을 품고 있는 편일 수 있어요.',
      '말보다는 함께하는 시간이나 작은 행동으로 사랑을 표현하는 타입일 수 있어요.',
      '쉽게 마음을 주지 않지만, 한번 마음을 정하면 오래 가는 편일 수 있어요.',
      '표현이 적어 오해를 받을 수 있지만, 행동으로 보여주는 스타일입니다.',
      '혼자 감정을 정리한 뒤 대화하려는 타입입니다.'
    ]);
  } else {
    love += pickRandom([
      '상황에 맞게 감정을 표현하며, 자연스럽게 애정을 전달하는 편이에요.',
      '필요할 때는 다정하고, 때로는 자기만의 공간도 중요시하는 균형잡힌 연애를 하는 편이에요.',
      '감정을 억지로 꾸미기보다 있는 그대로 솔직하게 표현하는 편이에요.',
      '연인과의 관계에서 편안함과 설렘 사이의 균형을 잘 맞추는 편이에요.',
      '연애 초반에는 거리 조절을 중요하게 생각하는 타입입니다.',
      '가까운 사람에게는 은근히 챙김이 많은 스타일입니다.'
    ]);
  }
  love += ' ';

  if (features.mouthShape > 0.3) {
    love += pickRandom([
      '밝고 유쾌한 분위기를 만들어, 함께 있으면 즐거운 연인 유형일 가능성이 있어요.',
      '유머와 대화로 관계를 이끌어가며, 연인과 함께 웃는 시간을 소중히 여기는 타입일 가능성이 있어요.',
      '긍정적인 에너지로 연인에게 힘이 되어주는 타입일 가능성이 있어요.'
    ]);
  } else if (features.mouthShape < -0.3) {
    love += pickRandom([
      '깊고 진지한 대화를 선호하며, 신뢰를 중요시하는 연인 유형일 가능성이 있어요.',
      '가볍게 만나기보다는 깊은 유대감을 가진 관계를 원하는 타입일 가능성이 있어요.',
      '연인에게 믿음직한 존재가 되려고 노력하며, 약속을 중요시하는 타입일 가능성이 있어요.',
      '다툼을 피하려다 속마음을 숨길 수 있습니다.'
    ]);
  } else {
    love += pickRandom([
      '안정적인 관계를 선호하며 감정 기복은 크지 않은 편입니다.',
      '마음을 열기까지 시간이 걸리지만, 열리면 오래 가는 편입니다.',
      '사람을 고를 때 신중한 편이라 관계의 수는 많지 않을 수 있습니다.'
    ]);
  }
  love += ' ';

  if (features.faceShape > 0.3) {
    love += pickRandom([
      '연애에서도 자신의 가치관을 중요시하며, 서로 성장하는 관계를 추구하는 경향이 있어요.',
      '연애에서도 독립적인 공간을 존중하며, 서로의 개성을 인정하는 관계를 선호하는 경향이 있어요.',
      '사랑하는 사람에게도 솔직하게 의견을 말하는 편이며, 건강한 소통을 추구하는 경향이 있어요.',
      '상대에게 지나치게 의존하지 않으려는 경향이 있습니다.'
    ]);
  } else {
    love += pickRandom([
      '상대방의 의견을 존중하고, 함께 맞춰가는 관계를 선호하는 경향이 있어요.',
      '연인의 작은 변화에도 민감하게 반응하며, 세심하게 챙기는 편이에요.',
      '함께 추억을 만드는 것을 좋아하고, 소소한 일상을 함께 나누는 연애를 선호하는 경향이 있어요.',
      '관계에서 \'편안함\'을 가장 중요하게 여길 가능성이 큽니다.'
    ]);
  }
  return love;
}

// 사회/직장 스타일 생성
function generateWorkStyle(features) {
  let work = '';

  if (features.eyeShape > 0.3 && features.eyebrowShape > 0.3) {
    work += pickRandom([
      '리더십을 발휘하는 위치에서 빛을 발하는 경우가 많아요. 팀을 이끌거나 프로젝트를 주도하는 역할이 잘 맞을 수 있어요.',
      '회의에서는 말이 많지 않지만, 핵심은 정확히 짚는 편입니다.',
      '무리한 경쟁보다는 안정적인 성과를 선호하는 경향이 있습니다.',
      '큰 그림을 보는 능력이 있어 전략적인 판단을 잘 내리는 편입니다.',
      '자기 분야에서 전문성을 쌓아가며, 그것을 바탕으로 인정받는 타입입니다.',
      '문제가 생겼을 때 앞장서서 해결책을 찾으려는 성향이 있습니다.'
    ]);
  } else if (features.eyeShape < -0.3) {
    work += pickRandom([
      '팀원들과의 협업에서 강점을 보이며, 분위기를 조율하고 갈등을 중재하는 역할을 잘 해내는 경향이 있어요.',
      '불필요한 갈등을 피하려고 상황을 한 번 더 살피는 경향이 있습니다.',
      '주변 분위기에 민감해 팀 내 변화에 빠르게 적응하는 편입니다.',
      '동료들의 이야기에 귀 기울이며, 팀 분위기를 안정시키는 역할을 자연스럽게 해내는 편입니다.',
      '혼자 성과를 독점하기보다 함께 나누려는 성향이 있어 동료들의 신뢰를 얻는 타입입니다.',
      '갈등 상황에서 중립적인 시각으로 양쪽의 입장을 조율하는 능력이 있는 편입니다.'
    ]);
  } else {
    work += pickRandom([
      '상황에 따라 리더와 팔로워 역할 모두 유연하게 수행할 수 있는 편이에요.',
      '조직 안에서는 눈에 띄기보다는 맡은 역할을 안정적으로 수행하는 편입니다.',
      '책임을 맡기면 묵묵히 해내지만, 스스로 나서는 타입은 아닐 수 있습니다.',
      '혼자 집중해서 일할 때 효율이 높은 타입으로 보입니다.',
      '시키는 일만 하기보다 자기만의 방식으로 효율을 찾는 편입니다.',
      '조용하지만 필요한 순간에는 확실하게 존재감을 드러내는 타입입니다.',
      '꾸준히 자기 페이스를 유지하며 안정적인 결과를 내는 스타일입니다.'
    ]);
  }
  work += ' ';

  if (features.mouthShape > 0.3) {
    work += pickRandom([
      '사람들과의 네트워킹에 능하고, 대외적인 업무에서 좋은 성과를 내는 경우가 많아요.',
      '지시보다는 충분한 설명이 있을 때 더 능력을 발휘하는 스타일입니다.',
      '팀 분위기를 밝게 만드는 에너지가 있어, 협업 시 활력을 불어넣는 타입입니다.',
      '새로운 사람과도 빠르게 친해지는 사교성이 있어 대외 업무에 강점이 있는 편입니다.'
    ]);
  } else if (features.mouthShape < -0.3) {
    work += pickRandom([
      '깊이 있는 분석과 신중한 의사결정이 필요한 업무에서 강점을 보이는 경향이 있어요.',
      '겉으로는 무난해 보여도, 기준이 어긋나면 속으로 스트레스를 받기 쉽습니다.',
      '꼼꼼한 검토와 철저한 준비가 필요한 업무에서 두각을 나타내는 편입니다.',
      '성급한 결정보다 충분한 자료를 바탕으로 판단하려는 신중한 스타일입니다.'
    ]);
  }
  work += ' ';

  if (features.faceShape > 0.3) {
    work += pickRandom([
      '명확한 목표를 세우고 체계적으로 일을 처리하는 스타일일 가능성이 높아요.',
      '상사나 동료에게 신뢰를 얻는 데는 시간이 걸리지만, 한번 신뢰를 얻으면 오래 유지하는 타입입니다.',
      '데드라인과 일정 관리에 철저하며, 계획적으로 업무를 진행하는 편입니다.',
      '자기 업무 영역에 대한 책임감이 강하고, 맡은 바를 확실히 마무리하는 타입입니다.'
    ]);
  } else {
    work += pickRandom([
      '창의적인 접근과 유연한 문제 해결 능력을 가진 스타일일 가능성이 높아요.',
      '상사나 동료에게 신뢰를 얻는 데는 시간이 걸리지만, 한번 신뢰를 얻으면 오래 유지하는 타입입니다.',
      '정해진 방식에 얽매이지 않고, 상황에 맞게 유연하게 대응하는 능력이 있어요.',
      '다양한 업무를 동시에 처리하는 멀티태스킹에 강점이 있는 편이에요.'
    ]);
  }
  return work;
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
}
