// =====================
// 연애 유형 테스트
// =====================

(function () {
  'use strict';

  // =====================
  // 질문 데이터 (12문항)
  // =====================
  // 각 선택지: text, primary(3점), secondary(1점)
  const QUESTIONS = [
    {
      text: '좋아하는 사람이 생겼을 때, 나는?',
      options: [
        { text: '마음을 솔직하게 표현하고 적극적으로 다가간다', primary: 'expression', secondary: 'communication' },
        { text: '상대의 반응을 살피며 천천히 신뢰를 쌓아간다', primary: 'stability', secondary: 'communication' },
        { text: '내 생활 패턴을 유지하면서 자연스럽게 만남을 이어간다', primary: 'independence', secondary: 'stability' },
        { text: '대화를 통해 서로의 가치관을 먼저 확인하고 싶다', primary: 'communication', secondary: 'expression' }
      ]
    },
    {
      text: '연인과 갈등이 생겼을 때, 나의 대처 방식은?',
      options: [
        { text: '감정을 숨기지 않고 바로 이야기한다', primary: 'expression', secondary: 'communication' },
        { text: '감정이 가라앉을 때까지 기다린 후 차분히 대화한다', primary: 'stability', secondary: 'communication' },
        { text: '혼자만의 시간을 갖고 정리한 뒤 만난다', primary: 'independence', secondary: 'stability' },
        { text: '상대의 입장을 먼저 들어본 후 내 생각을 전달한다', primary: 'communication', secondary: 'stability' }
      ]
    },
    {
      text: '이상적인 데이트 스타일은?',
      options: [
        { text: '깜짝 이벤트, 로맨틱한 분위기의 특별한 데이트', primary: 'expression', secondary: 'stability' },
        { text: '익숙하고 편안한 장소에서 함께 시간 보내기', primary: 'stability', secondary: 'expression' },
        { text: '각자 하고 싶은 것을 하다가 자연스럽게 합류하기', primary: 'independence', secondary: 'communication' },
        { text: '카페에서 깊은 대화를 나누는 조용한 데이트', primary: 'communication', secondary: 'independence' }
      ]
    },
    {
      text: '연인에게 가장 바라는 것은?',
      options: [
        { text: '사랑한다는 말과 애정 표현을 자주 해주는 것', primary: 'expression', secondary: 'communication' },
        { text: '변치 않는 믿음과 한결같은 태도', primary: 'stability', secondary: 'independence' },
        { text: '서로의 취미와 개인 시간을 존중해주는 것', primary: 'independence', secondary: 'stability' },
        { text: '내 이야기에 귀 기울이고 공감해주는 것', primary: 'communication', secondary: 'expression' }
      ]
    },
    {
      text: '연인이 다른 이성 친구와 친하게 지낼 때, 나는?',
      options: [
        { text: '솔직하게 질투 나는 마음을 표현한다', primary: 'expression', secondary: 'stability' },
        { text: '불안하지만 연인을 믿고 기다린다', primary: 'stability', secondary: 'communication' },
        { text: '나도 내 인간관계가 있으니 크게 신경 쓰지 않는다', primary: 'independence', secondary: 'expression' },
        { text: '편하게 대화로 서로의 경계선을 이야기한다', primary: 'communication', secondary: 'stability' }
      ]
    },
    {
      text: '기념일에 대한 나의 생각은?',
      options: [
        { text: '기념일은 꼭 챙겨야 한다! 서프라이즈도 준비한다', primary: 'expression', secondary: 'stability' },
        { text: '매년 꾸준히 챙기는 것 자체가 중요하다', primary: 'stability', secondary: 'expression' },
        { text: '날짜보다 함께하는 순간순간이 더 소중하다', primary: 'independence', secondary: 'communication' },
        { text: '기념일에 서로의 마음을 확인하는 대화가 좋다', primary: 'communication', secondary: 'expression' }
      ]
    },
    {
      text: '연인과의 연락 스타일은?',
      options: [
        { text: '하루 종일 수시로 연락하며 일상을 공유한다', primary: 'expression', secondary: 'communication' },
        { text: '정해진 시간에 규칙적으로 연락하는 편이다', primary: 'stability', secondary: 'independence' },
        { text: '각자 바쁠 때는 연락이 뜸해도 괜찮다', primary: 'independence', secondary: 'stability' },
        { text: '짧더라도 의미 있는 대화를 나누는 것을 선호한다', primary: 'communication', secondary: 'independence' }
      ]
    },
    {
      text: '연인이 힘들어할 때, 나는?',
      options: [
        { text: '따뜻하게 안아주며 위로의 말을 건넨다', primary: 'expression', secondary: 'communication' },
        { text: '묵묵히 곁에서 함께 있어준다', primary: 'stability', secondary: 'expression' },
        { text: '실질적인 해결 방법을 함께 찾아본다', primary: 'independence', secondary: 'communication' },
        { text: '상대의 이야기를 끝까지 경청하고 공감해준다', primary: 'communication', secondary: 'stability' }
      ]
    },
    {
      text: '나의 사랑의 언어는?',
      options: [
        { text: '"사랑해", "보고 싶어" 같은 애정 표현의 말', primary: 'expression', secondary: 'communication' },
        { text: '함께하는 시간과 꾸준한 스킨십', primary: 'stability', secondary: 'expression' },
        { text: '서로의 성장을 응원하고 지지해주는 것', primary: 'independence', secondary: 'communication' },
        { text: '진심이 담긴 편지나 깊은 대화', primary: 'communication', secondary: 'expression' }
      ]
    },
    {
      text: '연애에서 가장 중요하다고 생각하는 것은?',
      options: [
        { text: '설렘과 열정, 두근거리는 감정', primary: 'expression', secondary: 'independence' },
        { text: '신뢰와 안정감, 오래 함께할 수 있는 관계', primary: 'stability', secondary: 'communication' },
        { text: '서로의 자유와 독립성을 유지하는 것', primary: 'independence', secondary: 'stability' },
        { text: '깊은 정서적 교감과 소통', primary: 'communication', secondary: 'expression' }
      ]
    },
    {
      text: '이별 후 나의 모습은?',
      options: [
        { text: '감정을 솔직하게 표출하며 주변에 이야기한다', primary: 'expression', secondary: 'communication' },
        { text: '힘들어도 담담하게 일상을 유지하려 노력한다', primary: 'stability', secondary: 'independence' },
        { text: '새로운 취미나 활동에 집중하며 극복한다', primary: 'independence', secondary: 'expression' },
        { text: '이별의 원인을 곰곰이 되짚어보고 성장의 계기로 삼는다', primary: 'communication', secondary: 'stability' }
      ]
    },
    {
      text: '연애할 때 나의 모습을 가장 잘 표현한 것은?',
      options: [
        { text: '사랑하는 사람에게 온 마음을 쏟는 열정적인 연인', primary: 'expression', secondary: 'stability' },
        { text: '묵묵히 곁을 지키는 든든한 연인', primary: 'stability', secondary: 'independence' },
        { text: '서로의 세계를 존중하는 성숙한 연인', primary: 'independence', secondary: 'communication' },
        { text: '마음을 나누고 함께 성장하는 깊이 있는 연인', primary: 'communication', secondary: 'expression' }
      ]
    }
  ];

  // =====================
  // 연애 유형 데이터 (10가지)
  // =====================
  const LOVE_TYPES = {
    'expression+stability': {
      emoji: '🌹',
      name: '다정한 로맨티스트',
      subtitle: '사랑을 아낌없이 표현하는 따뜻한 사람',
      tendency: '당신은 사랑하는 사람에게 애정을 아낌없이 표현하면서도 관계의 안정을 소중히 여기는 유형입니다. 감정 표현에 솔직하고 기념일이나 특별한 순간을 놓치지 않으며, 동시에 변함없는 사랑을 추구합니다. 로맨틱한 분위기를 만들면서도 일상 속 소소한 행복을 함께 나누는 것을 좋아합니다.',
      strength: '솔직한 감정 표현 덕분에 상대가 사랑받고 있다는 확신을 가질 수 있습니다. 안정적인 성향이 더해져 한결같은 애정을 보여주므로, 함께하는 사람에게 큰 안정감을 줍니다. 기념일 챙기기, 따뜻한 말 한마디 등 세심한 배려가 돋보입니다.',
      weakness: '때로는 상대에게 같은 수준의 표현을 기대하게 될 수 있습니다. 상대의 표현 방식이 다를 수 있다는 점을 이해하고, 기대치를 조절하는 것이 중요합니다. 과도한 기대는 서운함으로 이어질 수 있으니 주의하세요.',
      match: '"지적인 파트너" 유형과 잘 맞습니다. 당신의 따뜻한 애정 표현에 깊이 있는 대화로 응답해주는 상대와 함께하면 감성과 지성이 조화로운 관계를 만들 수 있습니다.'
    },
    'expression+independence': {
      emoji: '🔥',
      name: '자유로운 열정가',
      subtitle: '뜨거운 감정과 자유로운 영혼의 소유자',
      tendency: '당신은 사랑에 빠지면 열정적으로 감정을 표현하면서도 자신만의 세계를 소중히 여기는 유형입니다. 연애에서 설렘과 자유를 동시에 추구하며, 틀에 박힌 관계보다는 서로의 개성을 존중하는 역동적인 사랑을 원합니다. 감정에 솔직하고 에너지가 넘칩니다.',
      strength: '열정적인 애정 표현으로 상대에게 강렬한 인상을 남기며, 동시에 상대의 자유도 존중할 줄 압니다. 연애를 지루하지 않게 만드는 재능이 있고, 새로운 시도나 경험을 함께 나누는 것에 능숙합니다. 솔직하고 쿨한 매력이 돋보입니다.',
      weakness: '열정이 식으면 관계에 대한 흥미가 떨어질 수 있습니다. 자유를 중시하다 보니 상대가 불안함을 느낄 수 있으므로, 안정감을 주는 노력이 필요합니다. 감정의 기복을 조절하고 꾸준함을 유지하는 것이 과제입니다.',
      match: '"따뜻한 동반자" 유형과 잘 맞습니다. 당신의 열정을 안정적으로 받아주면서 깊은 소통을 나눌 수 있는 상대와 함께하면 서로에게 좋은 균형을 맞출 수 있습니다.'
    },
    'expression+communication': {
      emoji: '💎',
      name: '솔직한 소울메이트',
      subtitle: '마음과 마음을 잇는 진정한 소통의 달인',
      tendency: '당신은 감정 표현에 솔직하면서도 깊은 대화를 통해 마음을 나누는 것을 중시하는 유형입니다. 연인과 속마음을 숨김없이 나누고 싶어 하며, 표면적인 관계보다는 진정한 교감을 추구합니다. 사랑하는 사람의 마음을 이해하고 또 자신의 마음을 전하는 데 능숙합니다.',
      strength: '솔직한 표현과 깊은 소통 능력으로 연인과 오해 없는 관계를 만들어갑니다. 감정적으로 풍부하면서도 논리적으로 대화할 수 있어, 갈등 상황에서도 건설적인 해결이 가능합니다. 상대에게 진심을 전하는 능력이 탁월합니다.',
      weakness: '모든 것을 말로 해결하려는 성향 때문에 상대가 부담을 느낄 수 있습니다. 때로는 말보다 행동으로, 또는 침묵으로 전해지는 사랑도 있다는 것을 기억하세요. 상대의 소통 방식을 존중하는 것이 중요합니다.',
      match: '"듬직한 보호자" 유형과 잘 맞습니다. 행동으로 사랑을 보여주는 상대와 함께하면 말과 행동이 조화를 이루는 깊이 있는 관계를 만들 수 있습니다.'
    },
    'stability+independence': {
      emoji: '🛡️',
      name: '듬직한 보호자',
      subtitle: '말보다 행동으로 보여주는 믿음직한 사람',
      tendency: '당신은 관계에서 안정감을 중시하면서도 서로의 독립성을 존중하는 성숙한 유형입니다. 과도한 감정 표현보다는 꾸준한 행동으로 사랑을 증명하며, 연인의 개인적인 성장과 공간을 응원합니다. 묵묵히 곁을 지키는 든든한 존재입니다.',
      strength: '한결같고 믿음직한 태도로 연인에게 깊은 신뢰를 줍니다. 상대의 자유를 존중하면서도 필요할 때는 든든하게 곁에 있어주는 균형 감각이 뛰어납니다. 위기 상황에서 냉정하게 판단하고 대처하는 능력이 돋보입니다.',
      weakness: '감정 표현이 부족해 상대가 사랑받지 못한다고 느낄 수 있습니다. 가끔은 말이나 스킨십으로 애정을 직접적으로 표현하는 노력이 필요합니다. 모든 것을 혼자 감당하려 하지 말고 연인에게 의지하는 것도 관계를 깊게 합니다.',
      match: '"솔직한 소울메이트" 유형과 잘 맞습니다. 감정 표현에 솔직하고 대화를 중시하는 상대가 당신의 부족한 부분을 채워주면서 서로 성장하는 관계를 만들 수 있습니다.'
    },
    'stability+communication': {
      emoji: '☕',
      name: '따뜻한 동반자',
      subtitle: '함께 성장하며 깊은 유대를 쌓아가는 사람',
      tendency: '당신은 안정적인 관계 속에서 깊은 교감을 나누는 것을 가장 중요하게 여기는 유형입니다. 급격한 변화보다는 천천히 서로를 알아가며 신뢰를 쌓아가고, 진심 어린 대화를 통해 유대를 깊게 만듭니다. 오래도록 함께할 동반자를 원합니다.',
      strength: '안정적인 성향과 소통 능력이 결합되어, 연인이 가장 편안하게 속마음을 털어놓을 수 있는 존재입니다. 관계의 문제를 대화로 현명하게 풀어가며, 꾸준한 노력으로 관계를 발전시킵니다. 장기적인 관계에서 특히 빛나는 유형입니다.',
      weakness: '안정을 추구하다 보니 새로운 시도나 변화를 두려워할 수 있습니다. 때로는 계획에 없던 즉흥적인 데이트나 도전이 관계에 활력을 불어넣습니다. 상대의 변화 욕구를 제한하지 않도록 유연함을 유지하세요.',
      match: '"자유로운 열정가" 유형과 잘 맞습니다. 열정적이고 자유분방한 상대가 관계에 활기를 불어넣어주며, 당신의 안정감이 상대에게 편안한 안식처가 됩니다.'
    },
    'independence+communication': {
      emoji: '📚',
      name: '지적인 파트너',
      subtitle: '깊이 있는 대화와 상호 존중의 관계를 꿈꾸는 사람',
      tendency: '당신은 연애에서도 지적인 교감과 상호 독립성을 중시하는 유형입니다. 서로의 세계를 존중하면서도 깊이 있는 대화를 통해 정신적으로 연결되기를 원합니다. 외적인 조건보다 내면의 성숙함과 가치관의 일치를 더 중요하게 여깁니다.',
      strength: '성숙하고 이성적인 연애를 할 수 있어, 관계에서 불필요한 갈등이 적습니다. 서로의 성장을 응원하고 지적인 자극을 주고받는 관계를 만들어갑니다. 감정에 휩쓸리지 않고 현명한 판단을 내리는 능력이 뛰어납니다.',
      weakness: '이성적이고 독립적인 성향이 강하다 보니, 연인에게 감정적으로 냉담하게 느껴질 수 있습니다. 가끔은 논리를 내려놓고 감정으로 교감하는 시간을 가져보세요. 모든 것을 대화로 분석하려 하기보다 느끼는 것도 중요합니다.',
      match: '"다정한 로맨티스트" 유형과 잘 맞습니다. 따뜻한 애정 표현을 아끼지 않는 상대가 당신의 이성적인 면을 부드럽게 녹여주며, 감성과 지성이 균형 잡힌 관계를 이룰 수 있습니다.'
    },
    'expression_dominant': {
      emoji: '🎭',
      name: '감성 충만 연인',
      subtitle: '사랑 앞에서 누구보다 솔직하고 열정적인 사람',
      tendency: '당신은 연애에서 감정 표현이 가장 두드러지는 유형입니다. 좋아하는 마음을 숨기지 못하고, 사랑하는 사람에게 온 마음을 쏟습니다. 감정이 풍부하고 직관적이며, 연애를 인생에서 가장 중요한 영역 중 하나로 여깁니다.',
      strength: '진심 어린 애정 표현으로 상대에게 강한 사랑을 느끼게 해줍니다. 표현이 풍부해 연인과의 관계에서 감정의 온도가 항상 따뜻하며, 상대를 특별하게 만들어주는 능력이 있습니다. 사랑에 대한 열정이 관계를 풍요롭게 합니다.',
      weakness: '감정의 기복이 클 수 있어, 상대가 그 에너지를 감당하기 어려울 수 있습니다. 사랑에 몰입하다가 자기 자신을 잃어버리지 않도록 주의하세요. 상대에게 과도한 관심이 부담이 될 수 있으니 적절한 거리를 유지하는 것도 필요합니다.',
      match: '"듬직한 보호자" 유형과 잘 맞습니다. 당신의 넘치는 감정을 묵묵히 받아주고 안정감을 주는 상대와 함께하면 서로의 부족한 부분을 채울 수 있습니다.'
    },
    'stability_dominant': {
      emoji: '🏠',
      name: '헌신적인 수호자',
      subtitle: '한 사람만을 끝까지 지키는 변치 않는 사람',
      tendency: '당신은 연애에서 안정감과 헌신을 가장 중시하는 유형입니다. 한번 사랑하면 쉽게 마음이 변하지 않으며, 연인에게 한결같은 모습을 보여줍니다. 화려한 연애보다 소박하지만 깊이 있는 관계를 선호하며, 믿을 수 있는 동반자가 되고자 합니다.',
      strength: '흔들림 없는 한결같은 사랑으로 연인에게 가장 큰 안정감을 줍니다. 약속을 반드시 지키고 책임감이 강해, 함께하는 사람이 든든하게 느낍니다. 관계를 오래 유지하는 능력이 탁월하며, 위기 상황에서도 관계를 포기하지 않습니다.',
      weakness: '변화나 새로운 시도를 두려워할 수 있어 관계가 매너리즘에 빠질 위험이 있습니다. 때로는 상대를 위해 자신의 감정 표현을 늘리고, 새로운 경험을 함께 시도해보세요. 지나친 헌신은 오히려 상대에게 부담이 될 수 있으니 균형이 중요합니다.',
      match: '"자유로운 열정가" 유형과 잘 맞습니다. 열정적이고 자유로운 상대가 당신의 안정적인 일상에 새로운 활력과 즐거움을 더해줄 수 있습니다.'
    },
    'independence_dominant': {
      emoji: '🦋',
      name: '매력적인 자유인',
      subtitle: '자기 자신을 잃지 않는 매력적인 사람',
      tendency: '당신은 연애에서도 자기 자신을 가장 중요하게 여기는 유형입니다. 상대에게 의존하지 않고 독립적인 관계를 추구하며, 서로의 자유와 개인 시간을 존중합니다. 자신만의 매력과 세계를 유지하면서 연애하는 것을 이상적으로 생각합니다.',
      strength: '독립적이고 자기 관리가 뛰어나 상대에게 매력적으로 보입니다. 관계에서 지나치게 집착하지 않아 건강한 거리를 유지할 수 있으며, 상대의 자유도 존중해줍니다. 혼자서도 행복할 수 있는 능력이 오히려 관계를 더 건강하게 만듭니다.',
      weakness: '지나친 독립심은 연인에게 무관심이나 무심함으로 느껴질 수 있습니다. 때로는 자신의 경계를 허물고 연인에게 마음을 열어보세요. 혼자 잘 지내는 것도 중요하지만, 함께이기에 더 행복한 순간을 놓치지 않는 것도 필요합니다.',
      match: '"감성 충만 연인" 유형과 잘 맞습니다. 풍부한 감정 표현으로 당신의 마음을 열어주는 상대와 함께하면 감정적으로 성장하는 경험을 할 수 있습니다.'
    },
    'communication_dominant': {
      emoji: '🌊',
      name: '공감 능력자',
      subtitle: '상대의 마음을 깊이 읽어내는 섬세한 사람',
      tendency: '당신은 연애에서 소통과 교감을 가장 중요하게 여기는 유형입니다. 표면적인 대화보다 깊이 있는 교류를 원하며, 연인의 감정을 섬세하게 읽어냅니다. 진심이 담긴 대화를 통해 서로를 이해하고 유대를 깊게 만들어가는 것이 당신의 연애 방식입니다.',
      strength: '뛰어난 공감 능력으로 연인이 가장 편안하게 속마음을 털어놓을 수 있는 존재입니다. 상대의 미묘한 감정 변화도 빠르게 알아차리며, 적절한 반응으로 관계를 원활하게 이끌어갑니다. 갈등 상황에서도 대화로 해결하는 능력이 탁월합니다.',
      weakness: '상대의 감정에 지나치게 몰입해 자신의 감정을 소홀히 할 수 있습니다. 공감 피로가 쌓이지 않도록 자기 자신의 감정도 잘 돌보세요. 또한 모든 것을 대화로 해결하려 하기보다, 때로는 시간이 해결해주는 것도 있다는 점을 기억하세요.',
      match: '"헌신적인 수호자" 유형과 잘 맞습니다. 한결같은 안정감을 주는 상대와 함께하면 깊은 정서적 유대 위에 안정적인 관계를 쌓아갈 수 있습니다.'
    }
  };

  // =====================
  // 상태 관리
  // =====================
  let currentQuestion = 0;
  const scores = {
    expression: 0,
    stability: 0,
    independence: 0,
    communication: 0
  };

  // =====================
  // DOM 요소
  // =====================
  const startSection = document.getElementById('startSection');
  const startBtn = document.getElementById('startBtn');
  const quizSection = document.getElementById('quizSection');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const questionCard = document.getElementById('questionCard');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const resultSection = document.getElementById('resultSection');
  const resultEmoji = document.getElementById('resultEmoji');
  const resultTypeName = document.getElementById('resultTypeName');
  const resultTypeSubtitle = document.getElementById('resultTypeSubtitle');
  const resultTendency = document.getElementById('resultTendency');
  const resultStrength = document.getElementById('resultStrength');
  const resultWeakness = document.getElementById('resultWeakness');
  const resultMatch = document.getElementById('resultMatch');
  const retryBtn = document.getElementById('retryBtn');

  // =====================
  // 이벤트 바인딩
  // =====================
  startBtn.addEventListener('click', startQuiz);
  retryBtn.addEventListener('click', resetQuiz);

  // =====================
  // 퀴즈 시작
  // =====================
  function startQuiz() {
    startSection.hidden = true;
    quizSection.hidden = false;
    currentQuestion = 0;
    resetScores();
    showQuestion();
  }

  // =====================
  // 질문 표시
  // =====================
  function showQuestion() {
    const q = QUESTIONS[currentQuestion];
    const num = currentQuestion + 1;

    progressFill.style.width = ((num / QUESTIONS.length) * 100) + '%';
    progressText.textContent = num + ' / ' + QUESTIONS.length;
    questionText.textContent = 'Q' + num + '. ' + q.text;

    // 애니메이션을 위해 카드 재생성
    questionCard.style.animation = 'none';
    questionCard.offsetHeight; // reflow
    questionCard.style.animation = '';

    optionsContainer.innerHTML = '';
    q.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', function () {
        selectOption(idx);
      });
      optionsContainer.appendChild(btn);
    });
  }

  // =====================
  // 선택지 클릭
  // =====================
  function selectOption(idx) {
    var buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(function (btn) {
      btn.disabled = true;
    });
    buttons[idx].classList.add('selected');

    var opt = QUESTIONS[currentQuestion].options[idx];
    scores[opt.primary] += 3;
    scores[opt.secondary] += 1;

    setTimeout(function () {
      currentQuestion++;
      if (currentQuestion < QUESTIONS.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 400);
  }

  // =====================
  // 결과 계산 및 표시
  // =====================
  function showResult() {
    quizSection.hidden = true;
    resultSection.hidden = false;

    var type = calculateType();
    var data = LOVE_TYPES[type];

    resultEmoji.textContent = data.emoji;
    resultTypeName.textContent = data.name;
    resultTypeSubtitle.textContent = data.subtitle;
    resultTendency.textContent = data.tendency;
    resultStrength.textContent = data.strength;
    resultWeakness.textContent = data.weakness;
    resultMatch.textContent = data.match;

    // 결과 영역으로 스크롤
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // =====================
  // 유형 판별 로직
  // =====================
  function calculateType() {
    var dims = [
      { key: 'expression', score: scores.expression },
      { key: 'stability', score: scores.stability },
      { key: 'independence', score: scores.independence },
      { key: 'communication', score: scores.communication }
    ];

    // 점수 내림차순 정렬
    dims.sort(function (a, b) { return b.score - a.score; });

    var first = dims[0];
    var second = dims[1];

    // 1위가 2위보다 5점 이상 높으면 단독 우세 유형
    if (first.score - second.score >= 5) {
      return first.key + '_dominant';
    }

    // 조합 유형: 정렬된 두 키를 알파벳 순서로 결합
    var pair = [first.key, second.key].sort();

    // 정의된 조합 매핑
    var comboMap = {
      'expression+stability': 'expression+stability',
      'expression+independence': 'expression+independence',
      'communication+expression': 'expression+communication',
      'independence+stability': 'stability+independence',
      'communication+stability': 'stability+communication',
      'communication+independence': 'independence+communication'
    };

    var comboKey = pair[0] + '+' + pair[1];

    if (comboMap[comboKey]) {
      return comboMap[comboKey];
    }

    // 예외 처리: 매핑에 없는 경우 1위 단독 유형
    return first.key + '_dominant';
  }

  // =====================
  // 초기화
  // =====================
  function resetScores() {
    scores.expression = 0;
    scores.stability = 0;
    scores.independence = 0;
    scores.communication = 0;
  }

  function resetQuiz() {
    resultSection.hidden = true;
    startSection.hidden = false;
    quizSection.hidden = true;
    currentQuestion = 0;
    resetScores();
    progressFill.style.width = '0%';

    // 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

})();
