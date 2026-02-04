// =====================
// 퍼스널 칼라 진단
// =====================

(function () {
  'use strict';

  // DOM 요소
  var uploadArea = document.getElementById('uploadArea');
  var fileInput = document.getElementById('fileInput');
  var uploadPlaceholder = document.getElementById('uploadPlaceholder');
  var previewContainer = document.getElementById('previewContainer');
  var previewImage = document.getElementById('previewImage');
  var removeBtn = document.getElementById('removeBtn');
  var analyzeBtn = document.getElementById('analyzeBtn');
  var uploadSection = document.getElementById('uploadSection');
  var loadingSection = document.getElementById('loadingSection');
  var loadingText = document.getElementById('loadingText');
  var loadingSubtext = document.getElementById('loadingSubtext');
  var errorSection = document.getElementById('errorSection');
  var resultSection = document.getElementById('resultSection');
  var retryBtn = document.getElementById('retryBtn');
  var errorRetryBtn = document.getElementById('errorRetryBtn');
  var hiddenCanvas = document.getElementById('hiddenCanvas');

  var modelsLoaded = false;

  // =====================
  // 시즌 데이터 (bilingual)
  // =====================
  function getSEASONS() {
    var lang = getLang();
    if (lang === 'en') {
      return {
        'spring-warm': {
          emoji: '🌸',
          name: 'Spring Warm',
          subtitle: 'Bright and lively colors suit you best',
          cssClass: 'spring-warm',
          characteristic: 'You have a warm skin tone with yellow or peachy undertones. You have a bright, radiant vibe, and clear, vivid colors look great on you. Gold accessories tend to suit you better than silver.',
          recommended: [
            { name: 'Coral', hex: '#FF7F7F' },
            { name: 'Peach', hex: '#FFCBA4' },
            { name: 'Ivory', hex: '#FFFFF0' },
            { name: 'Apricot', hex: '#FBCEB1' },
            { name: 'Light Orange', hex: '#FFA07A' },
            { name: 'Light Khaki', hex: '#C3B091' }
          ],
          avoid: [
            { name: 'Cool Gray', hex: '#808080' },
            { name: 'All Black', hex: '#000000' },
            { name: 'Burgundy', hex: '#800020' },
            { name: 'Navy', hex: '#000080' }
          ],
          recommendText: 'Warm, bright colors make your skin look more radiant. Spring flower-inspired colors like coral and peach add vitality to your complexion.',
          avoidText: 'Cool, dark colors can make your face look dull. Try brighter alternatives instead of all-black or deep navy.',
          makeup: 'Coral pink and peach lip colors suit you best. For eyeshadow, try coral, apricot, and light brown tones. Peach or soft orange blush creates a natural flush. Brown eyeliner gives a softer impression than black.',
          celebrity: 'Song Hye-kyo, Suzy, and IU are known as Spring Warm types. Bright, radiant makeup looks best on them.'
        },
        'summer-cool': {
          emoji: '🌊',
          name: 'Summer Cool',
          subtitle: 'Soft and elegant pastel tones suit you best',
          cssClass: 'summer-cool',
          characteristic: 'You have a cool skin tone with pink or blue undertones. You have a soft, elegant vibe, and muted pastel colors look great on you. Silver accessories tend to suit you better than gold.',
          recommended: [
            { name: 'Lavender', hex: '#B57EDC' },
            { name: 'Rose Pink', hex: '#FF66B2' },
            { name: 'Sky Blue', hex: '#87CEEB' },
            { name: 'Mint', hex: '#98FF98' },
            { name: 'Baby Pink', hex: '#F4C2C2' },
            { name: 'Lilac', hex: '#C8A2C8' }
          ],
          avoid: [
            { name: 'Orange', hex: '#FF8C00' },
            { name: 'Mustard', hex: '#FFDB58' },
            { name: 'Khaki', hex: '#8B7355' },
            { name: 'Brown', hex: '#8B4513' }
          ],
          recommendText: 'Soft, cool pastel colors make your skin look clear and fresh. Summer sky-inspired colors like lavender and rose pink blend naturally with your complexion.',
          avoidText: 'Warm, muddy colors can make your skin look yellowish. It\'s best to avoid strong warm-tone colors like orange and mustard.',
          makeup: 'Rose pink and berry lip colors suit you best. For eyeshadow, try lavender, soft purple, and cool pink tones. Pink or rose blush creates a natural flush. Soft black or gray eyeliner gives a refined look.',
          celebrity: 'Kim Tae-hee, Yoona, and BLACKPINK\'s Jennie are known as Summer Cool types. Soft, elegant pastel makeup looks best on them.'
        },
        'autumn-warm': {
          emoji: '🍂',
          name: 'Autumn Warm',
          subtitle: 'Deep and natural earth tones suit you best',
          cssClass: 'autumn-warm',
          characteristic: 'You have a deep, warm skin tone with golden undertones. You have a calm, mature vibe, and low-saturation earth tone colors with depth look great on you. Gold and antique gold accessories suit you particularly well.',
          recommended: [
            { name: 'Burgundy', hex: '#800020' },
            { name: 'Mustard', hex: '#FFDB58' },
            { name: 'Khaki', hex: '#8B7355' },
            { name: 'Terracotta', hex: '#E2725B' },
            { name: 'Olive', hex: '#808000' },
            { name: 'Camel', hex: '#C19A6B' }
          ],
          avoid: [
            { name: 'Pastel Pink', hex: '#FFD1DC' },
            { name: 'Lavender', hex: '#B57EDC' },
            { name: 'Sky Blue', hex: '#87CEEB' },
            { name: 'Pure White', hex: '#FFFFFF' }
          ],
          recommendText: 'Deep, rich earth tone colors make your skin look healthy and warm. Autumn leaf-inspired colors like burgundy, mustard, and terracotta create a luxurious atmosphere.',
          avoidText: 'Bright pastels or cool colors can clash with your skin tone. Choose ivory or cream instead of pure white.',
          makeup: 'Brick red, terracotta, and brown-red lip colors suit you best. For eyeshadow, try brown, khaki, and gold tones. Coral brown or terracotta blush adds depth. Dark brown eyeliner looks most natural.',
          celebrity: 'Jessica, Han So-hee, and Jun Ji-hyun are known as Autumn Warm types. Deep-toned makeup and earth-tone fashion look best on them.'
        },
        'winter-cool': {
          emoji: '❄️',
          name: 'Winter Cool',
          subtitle: 'Bold and high-contrast vivid colors suit you best',
          cssClass: 'winter-cool',
          characteristic: 'You have a clear skin tone with blue undertones. You have a chic, modern vibe, and high-saturation, high-contrast vivid colors look great on you. Silver and platinum accessories suit you particularly well.',
          recommended: [
            { name: 'Royal Blue', hex: '#4169E1' },
            { name: 'Wine', hex: '#722F37' },
            { name: 'Pure White', hex: '#FFFFFF' },
            { name: 'Black', hex: '#000000' },
            { name: 'Emerald', hex: '#50C878' },
            { name: 'Hot Pink', hex: '#FF69B4' }
          ],
          avoid: [
            { name: 'Apricot', hex: '#FBCEB1' },
            { name: 'Light Beige', hex: '#F5DEB3' },
            { name: 'Khaki', hex: '#8B7355' },
            { name: 'Light Brown', hex: '#C4A882' }
          ],
          recommendText: 'Bold, vivid colors make your skin look porcelain-clear. Strong black & white contrast and jewel tones like royal blue and emerald maximize your chic appeal.',
          avoidText: 'Muted, mid-tone colors can make your skin look dull. Choose vivid colors instead of light beige or khaki.',
          makeup: 'Bold lip colors like red, wine, and hot pink suit you best. For eyeshadow, try silver, charcoal, and purple tones. Cool pink or berry blush creates a vivid flush. Black eyeliner suits you best and gives a striking impression.',
          celebrity: 'Kim Yuna, Song Ji-hyo, and BLACKPINK\'s Jisoo are known as Winter Cool types. Vivid colors and chic makeup look best on them.'
        }
      };
    }
    // Korean (default)
    return {
      'spring-warm': {
        emoji: '🌸',
        name: '봄 웜톤',
        subtitle: '화사하고 생기 넘치는 컬러가 어울려요',
        cssClass: 'spring-warm',
        characteristic: '피부에 노란빛 또는 복숭아빛이 감도는 따뜻한 톤입니다. 밝고 화사한 분위기를 가지고 있으며, 맑고 선명한 컬러가 잘 어울립니다. 골드 계열 액세서리가 실버보다 더 잘 어울리는 편이에요.',
        recommended: [
          { name: '코랄', hex: '#FF7F7F' },
          { name: '피치', hex: '#FFCBA4' },
          { name: '아이보리', hex: '#FFFFF0' },
          { name: '살구색', hex: '#FBCEB1' },
          { name: '라이트오렌지', hex: '#FFA07A' },
          { name: '밝은카키', hex: '#C3B091' }
        ],
        avoid: [
          { name: '차가운회색', hex: '#808080' },
          { name: '올블랙', hex: '#000000' },
          { name: '버건디', hex: '#800020' },
          { name: '네이비', hex: '#000080' }
        ],
        recommendText: '따뜻하고 밝은 톤의 컬러가 피부를 더 화사하게 보이게 합니다. 코랄, 피치 등 봄꽃을 연상시키는 생동감 있는 색상이 얼굴에 생기를 더해줍니다.',
        avoidText: '차갑고 어두운 톤의 컬러는 얼굴을 칙칙하게 보이게 할 수 있어요. 올블랙이나 진한 네이비보다는 밝은 톤의 대안을 찾아보세요.',
        makeup: '립은 코랄 핑크, 피치 컬러가 가장 잘 어울리며, 아이섀도는 코랄, 살구, 라이트 브라운 계열을 추천합니다. 블러셔는 피치나 연한 오렌지가 자연스러운 혈색을 만들어줘요. 아이라이너는 블랙보다 브라운이 부드러운 인상을 줍니다.',
        celebrity: '송혜교, 수지, 아이유 등이 봄 웜톤으로 알려져 있어요. 밝고 화사한 메이크업이 잘 어울리는 것이 특징입니다.'
      },
      'summer-cool': {
        emoji: '🌊',
        name: '여름 쿨톤',
        subtitle: '부드럽고 우아한 파스텔 톤이 어울려요',
        cssClass: 'summer-cool',
        characteristic: '피부에 핑크빛 또는 푸른빛이 감도는 차가운 톤입니다. 부드럽고 우아한 분위기를 가지고 있으며, 채도가 낮은 파스텔 컬러가 잘 어울립니다. 실버 계열 액세서리가 골드보다 더 잘 어울리는 편이에요.',
        recommended: [
          { name: '라벤더', hex: '#B57EDC' },
          { name: '로즈핑크', hex: '#FF66B2' },
          { name: '스카이블루', hex: '#87CEEB' },
          { name: '민트', hex: '#98FF98' },
          { name: '베이비핑크', hex: '#F4C2C2' },
          { name: '라일락', hex: '#C8A2C8' }
        ],
        avoid: [
          { name: '오렌지', hex: '#FF8C00' },
          { name: '머스타드', hex: '#FFDB58' },
          { name: '카키', hex: '#8B7355' },
          { name: '브라운', hex: '#8B4513' }
        ],
        recommendText: '부드럽고 시원한 톤의 파스텔 컬러가 피부를 맑고 깨끗하게 보이게 합니다. 라벤더, 로즈핑크 등 여름 하늘과 꽃을 닮은 색상이 자연스럽게 어울립니다.',
        avoidText: '따뜻하고 탁한 톤의 컬러는 피부를 누렇게 보이게 할 수 있어요. 오렌지나 머스타드 같은 강한 웜톤 컬러는 피하는 것이 좋습니다.',
        makeup: '립은 로즈핑크, 베리 컬러가 가장 잘 어울리며, 아이섀도는 라벤더, 연보라, 쿨핑크 계열을 추천합니다. 블러셔는 핑크나 로즈 컬러가 자연스러운 혈색을 만들어줘요. 아이라이너는 소프트 블랙이나 그레이가 세련된 느낌을 줍니다.',
        celebrity: '김태희, 윤아, 블랙핑크 제니 등이 여름 쿨톤으로 알려져 있어요. 부드럽고 우아한 파스텔 메이크업이 잘 어울리는 것이 특징입니다.'
      },
      'autumn-warm': {
        emoji: '🍂',
        name: '가을 웜톤',
        subtitle: '깊고 자연스러운 어스톤이 어울려요',
        cssClass: 'autumn-warm',
        characteristic: '피부에 황금빛이 감도는 깊은 톤입니다. 차분하고 성숙한 분위기를 가지고 있으며, 채도가 낮고 깊이감 있는 어스톤 컬러가 잘 어울립니다. 골드, 앤틱골드 계열 액세서리가 특히 잘 어울리는 편이에요.',
        recommended: [
          { name: '버건디', hex: '#800020' },
          { name: '머스타드', hex: '#FFDB58' },
          { name: '카키', hex: '#8B7355' },
          { name: '테라코타', hex: '#E2725B' },
          { name: '올리브', hex: '#808000' },
          { name: '캐멀', hex: '#C19A6B' }
        ],
        avoid: [
          { name: '파스텔핑크', hex: '#FFD1DC' },
          { name: '라벤더', hex: '#B57EDC' },
          { name: '스카이블루', hex: '#87CEEB' },
          { name: '순백', hex: '#FFFFFF' }
        ],
        recommendText: '깊고 풍부한 어스톤 컬러가 피부를 건강하고 따뜻하게 보이게 합니다. 가을 낙엽을 연상시키는 버건디, 머스타드, 테라코타 등이 고급스러운 분위기를 연출합니다.',
        avoidText: '밝고 선명한 파스텔 톤이나 차가운 컬러는 피부와 대비되어 부조화를 만들 수 있어요. 순백보다는 아이보리나 크림색을 선택하는 것이 좋습니다.',
        makeup: '립은 브릭레드, 테라코타, 브라운레드 컬러가 가장 잘 어울리며, 아이섀도는 브라운, 카키, 골드 계열을 추천합니다. 블러셔는 코랄 브라운이나 테라코타가 깊이 있는 분위기를 만들어줘요. 아이라이너는 다크브라운이 자연스럽습니다.',
        celebrity: '제시카, 한소희, 전지현 등이 가을 웜톤으로 알려져 있어요. 깊이감 있는 메이크업과 어스톤 패션이 잘 어울리는 것이 특징입니다.'
      },
      'winter-cool': {
        emoji: '❄️',
        name: '겨울 쿨톤',
        subtitle: '선명하고 대비가 강한 비비드 컬러가 어울려요',
        cssClass: 'winter-cool',
        characteristic: '피부에 푸른빛이 감도는 선명한 톤입니다. 시크하고 모던한 분위기를 가지고 있으며, 채도가 높고 대비가 강한 비비드 컬러가 잘 어울립니다. 실버, 플래티넘 계열 액세서리가 특히 잘 어울리는 편이에요.',
        recommended: [
          { name: '로얄블루', hex: '#4169E1' },
          { name: '와인', hex: '#722F37' },
          { name: '퓨어화이트', hex: '#FFFFFF' },
          { name: '블랙', hex: '#000000' },
          { name: '에메랄드', hex: '#50C878' },
          { name: '핫핑크', hex: '#FF69B4' }
        ],
        avoid: [
          { name: '살구색', hex: '#FBCEB1' },
          { name: '연한베이지', hex: '#F5DEB3' },
          { name: '카키', hex: '#8B7355' },
          { name: '연한브라운', hex: '#C4A882' }
        ],
        recommendText: '선명하고 강렬한 컬러가 피부를 더욱 도자기처럼 깨끗하게 보이게 합니다. 블랙&화이트의 강한 대비, 로얄블루나 에메랄드 같은 보석톤이 시크한 매력을 극대화합니다.',
        avoidText: '탁하고 중간톤의 컬러는 피부를 칙칙하게 보이게 할 수 있어요. 연한 베이지나 카키보다는 선명한 컬러를 선택하는 것이 좋습니다.',
        makeup: '립은 레드, 와인, 핫핑크 같은 선명한 컬러가 가장 잘 어울리며, 아이섀도는 실버, 차콜, 보라 계열을 추천합니다. 블러셔는 쿨핑크나 베리 컬러가 선명한 혈색을 만들어줘요. 아이라이너는 블랙이 가장 잘 어울리고 강렬한 인상을 줍니다.',
        celebrity: '김연아, 송지효, 블랙핑크 지수 등이 겨울 쿨톤으로 알려져 있어요. 선명한 컬러와 시크한 메이크업이 잘 어울리는 것이 특징입니다.'
      }
    };
  }

  // =====================
  // 이벤트 리스너
  // =====================
  uploadArea.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', handleFileSelect);
  removeBtn.addEventListener('click', handleRemove);
  analyzeBtn.addEventListener('click', analyzeImage);
  retryBtn.addEventListener('click', resetAnalysis);
  errorRetryBtn.addEventListener('click', resetAnalysis);

  // 드래그 앤 드롭
  uploadArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });

  uploadArea.addEventListener('dragleave', function () {
    uploadArea.classList.remove('drag-over');
  });

  uploadArea.addEventListener('drop', function (e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    var files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFile(files[0]);
    }
  });

  // =====================
  // 파일 처리
  // =====================
  function handleFileSelect(e) {
    var file = e.target.files[0];
    if (file) handleFile(file);
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      alert(t('common_alert_image_only'));
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      uploadPlaceholder.hidden = true;
      previewContainer.hidden = false;
      analyzeBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }

  function handleRemove(e) {
    e.stopPropagation();
    fileInput.value = '';
    previewImage.src = '';
    uploadPlaceholder.hidden = false;
    previewContainer.hidden = true;
    analyzeBtn.disabled = true;
  }

  // =====================
  // 모델 로드
  // =====================
  async function loadModels() {
    var MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    ]);
    modelsLoaded = true;
  }

  // =====================
  // 이미지 분석
  // =====================
  async function analyzeImage() {
    uploadSection.hidden = true;
    loadingSection.hidden = false;
    errorSection.hidden = true;
    resultSection.hidden = true;

    try {
      if (!modelsLoaded) {
        loadingText.textContent = t('pc_loading_text');
        loadingSubtext.textContent = t('pc_loading_subtext');
        await loadModels();
      }

      loadingText.textContent = t('pc_loading_analyzing');
      loadingSubtext.textContent = t('pc_loading_analyzing_sub');

      // 얼굴 감지 및 랜드마크
      var detection = await faceapi
        .detectSingleFace(previewImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!detection) {
        showError(t('common_error_no_face'));
        return;
      }

      // 캔버스에 이미지 그리기
      var canvas = hiddenCanvas;
      var ctx = canvas.getContext('2d');
      canvas.width = previewImage.naturalWidth;
      canvas.height = previewImage.naturalHeight;
      ctx.drawImage(previewImage, 0, 0);

      // 피부색 추출
      var skinColor = sampleSkinColor(ctx, detection.landmarks, canvas.width, canvas.height);

      // HSL 변환 및 계절 분류
      var hsl = rgbToHsl(skinColor.r, skinColor.g, skinColor.b);
      var seasonKey = classifySeason(hsl);

      // 결과 표시
      showResult(seasonKey, skinColor);

    } catch (error) {
      console.error('분석 중 오류:', error);
      showError(t('common_error_analysis_failed'));
    }
  }

  // =====================
  // 피부색 샘플링
  // =====================
  function sampleSkinColor(ctx, landmarks, canvasWidth, canvasHeight) {
    var jaw = landmarks.getJawOutline();
    var nose = landmarks.getNose();
    var leftEye = landmarks.getLeftEye();
    var rightEye = landmarks.getRightEye();
    var leftBrow = landmarks.getLeftEyeBrow();
    var rightBrow = landmarks.getRightEyeBrow();

    // 샘플링 포인트 정의
    var points = [
      // 이마 (양 눈썹 사이 위)
      {
        x: (leftBrow[4].x + rightBrow[0].x) / 2,
        y: leftBrow[2].y - (leftEye[1].y - leftBrow[2].y)
      },
      // 왼쪽 볼
      {
        x: (jaw[2].x + nose[0].x) / 2,
        y: (leftEye[5].y + jaw[4].y) / 2
      },
      // 오른쪽 볼
      {
        x: (jaw[14].x + nose[0].x) / 2,
        y: (rightEye[5].y + jaw[12].y) / 2
      },
      // 코 아래 / 입 위
      {
        x: nose[6].x,
        y: (nose[6].y + jaw[8].y) * 0.5
      }
    ];

    var totalR = 0, totalG = 0, totalB = 0, count = 0;
    var sampleSize = 4;

    points.forEach(function (point) {
      var px = Math.round(point.x);
      var py = Math.round(point.y);

      for (var dx = -sampleSize; dx <= sampleSize; dx++) {
        for (var dy = -sampleSize; dy <= sampleSize; dy++) {
          var sx = px + dx;
          var sy = py + dy;
          if (sx < 0 || sy < 0 || sx >= canvasWidth || sy >= canvasHeight) continue;

          var data = ctx.getImageData(sx, sy, 1, 1).data;
          totalR += data[0];
          totalG += data[1];
          totalB += data[2];
          count++;
        }
      }
    });

    return {
      r: Math.round(totalR / count),
      g: Math.round(totalG / count),
      b: Math.round(totalB / count)
    };
  }

  // =====================
  // RGB → HSL 변환
  // =====================
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  // =====================
  // 계절 분류
  // =====================
  function classifySeason(hsl) {
    var h = hsl.h;
    var s = hsl.s;
    var l = hsl.l;

    // 따뜻한 톤 판별 (색상환에서 노란-주황-빨강 범위)
    var isWarm = (h >= 10 && h <= 50) || (h >= 350 && h <= 360) || (h >= 0 && h < 10);

    if (isWarm) {
      // 웜톤: 밝기/채도로 봄/가을 구분
      if (l > 58 || s > 30) {
        return 'spring-warm';
      } else {
        return 'autumn-warm';
      }
    } else {
      // 쿨톤: 밝기로 여름/겨울 구분
      if (l > 55) {
        return 'summer-cool';
      } else {
        return 'winter-cool';
      }
    }
  }

  // =====================
  // 에러 표시
  // =====================
  function showError(message) {
    loadingSection.hidden = true;
    errorSection.hidden = false;
    document.getElementById('errorText').textContent = message;
  }

  // =====================
  // 결과 표시
  // =====================
  function showResult(seasonKey, skinColor) {
    loadingSection.hidden = true;
    resultSection.hidden = false;

    var season = getSEASONS()[seasonKey];

    // 시즌 카드
    var seasonCard = document.getElementById('seasonCard');
    seasonCard.className = 'season-card ' + season.cssClass;
    document.getElementById('seasonEmoji').textContent = season.emoji;
    document.getElementById('seasonName').textContent = season.name;
    document.getElementById('seasonSubtitle').textContent = season.subtitle;

    // 피부톤 스와치
    var swatch = document.getElementById('skinToneSwatch');
    swatch.style.backgroundColor = 'rgb(' + skinColor.r + ',' + skinColor.g + ',' + skinColor.b + ')';

    // 텍스트 내용
    document.getElementById('resultCharacteristic').textContent = season.characteristic;
    document.getElementById('resultRecommend').textContent = season.recommendText;
    document.getElementById('resultAvoid').textContent = season.avoidText;
    document.getElementById('resultMakeup').textContent = season.makeup;
    document.getElementById('resultCelebrity').textContent = season.celebrity;

    // 추천 컬러 팔레트
    renderPalette('recommendedColors', season.recommended);

    // 피할 컬러 팔레트
    renderPalette('avoidColors', season.avoid);

    // 결과로 스크롤
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // =====================
  // 컬러 팔레트 렌더링
  // =====================
  function renderPalette(containerId, colors) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';
    colors.forEach(function (color) {
      var swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color.hex;

      var name = document.createElement('span');
      name.className = 'color-name';
      name.textContent = color.name;

      swatch.appendChild(name);
      container.appendChild(swatch);
    });
  }

  // =====================
  // 분석 초기화
  // =====================
  function resetAnalysis() {
    resultSection.hidden = true;
    errorSection.hidden = true;
    uploadSection.hidden = false;

    fileInput.value = '';
    previewImage.src = '';
    uploadPlaceholder.hidden = false;
    previewContainer.hidden = true;
    analyzeBtn.disabled = true;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

})();
