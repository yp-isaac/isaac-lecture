// =====================
// 인간관계 유형 테스트
// =====================

(function () {
  'use strict';

  // =====================
  // 질문 데이터 - bilingual
  // =====================
  function getQUESTIONS() {
    var lang = getLang();
    if (lang === 'en') {
      return [
        { text: 'What\'s your role in a group?', options: [
          { text: 'Naturally lead and gather opinions', scores: { leader: 3, harmony: 1 } },
          { text: 'Mediate different opinions and smooth the atmosphere', scores: { harmony: 3, leader: 1 } },
          { text: 'Step back, observe the situation, and provide needed info', scores: { analysis: 3, freedom: 1 } },
          { text: 'Participate only when needed and spend the rest freely', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'When a friend shares their worries, you...', options: [
          { text: 'Offer specific solutions and actively help', scores: { leader: 3, analysis: 1 } },
          { text: 'Empathize, listen to the end, and comfort them', scores: { harmony: 3, leader: 1 } },
          { text: 'Analyze the situation from an objective perspective', scores: { analysis: 3, harmony: 1 } },
          { text: 'Listen but wait for them to find their own answer', scores: { freedom: 3, harmony: 1 } }
        ]},
        { text: 'In a group project, you...', options: [
          { text: 'Assign roles and manage the overall schedule', scores: { leader: 3, analysis: 1 } },
          { text: 'Unite team members\' opinions and resolve conflicts', scores: { harmony: 3, leader: 1 } },
          { text: 'Research data and establish a logical framework', scores: { analysis: 3, leader: 1 } },
          { text: 'Complete your assigned part independently', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'When you meet someone new?', options: [
          { text: 'Initiate conversation and take the lead', scores: { leader: 3, harmony: 1 } },
          { text: 'Find common interests and chat comfortably', scores: { harmony: 3, freedom: 1 } },
          { text: 'Quietly observe and assess them', scores: { analysis: 3, freedom: 1 } },
          { text: 'Don\'t go out of your way to approach; let things flow naturally', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'When there\'s conflict among friends?', options: [
          { text: 'Step in directly to sort out and resolve the issue', scores: { leader: 3, harmony: 1 } },
          { text: 'Listen to both sides and try to mediate', scores: { harmony: 3, analysis: 1 } },
          { text: 'Analyze the cause and suggest a rational solution', scores: { analysis: 3, leader: 1 } },
          { text: 'Let the parties involved handle it and maintain distance', scores: { freedom: 3, harmony: 1 } }
        ]},
        { text: 'What do you most want to do on weekends?', options: [
          { text: 'Plan and lead a gathering with friends', scores: { leader: 3, harmony: 1 } },
          { text: 'Spend relaxed time with close people', scores: { harmony: 3, freedom: 1 } },
          { text: 'Read alone or study something new', scores: { analysis: 3, freedom: 1 } },
          { text: 'Spend the day however you feel, with no plans', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'Your social media style?', options: [
          { text: 'Actively communicate and organize meetups via social media', scores: { leader: 3, harmony: 1 } },
          { text: 'Consistently like and comment on friends\' posts', scores: { harmony: 3, leader: 1 } },
          { text: 'Follow for information and quietly read', scores: { analysis: 3, freedom: 1 } },
          { text: 'Rarely use social media or only check occasionally', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'When making plans, you...', options: [
          { text: 'Decide the place, time, and members yourself', scores: { leader: 3, analysis: 1 } },
          { text: 'Check everyone\'s schedule and find a time that works for all', scores: { harmony: 3, leader: 1 } },
          { text: 'Analyze and suggest the most efficient place and time', scores: { analysis: 3, harmony: 1 } },
          { text: 'Go along with whatever others decide', scores: { freedom: 3, harmony: 1 } }
        ]},
        { text: 'Your image at work or school?', options: [
          { text: 'A trustworthy leader, someone others rely on', scores: { leader: 3, harmony: 1 } },
          { text: 'A social person who gets along with everyone', scores: { harmony: 3, leader: 1 } },
          { text: 'A meticulous and logical person', scores: { analysis: 3, freedom: 1 } },
          { text: 'An independent person with their own world', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'When you receive an unwanted request?', options: [
          { text: 'Speak your mind honestly, even if it\'s uncomfortable', scores: { leader: 3, freedom: 1 } },
          { text: 'Hard to refuse, so you tend to accept', scores: { harmony: 3, analysis: 1 } },
          { text: 'Weigh the situation and decline with a rational reason', scores: { analysis: 3, leader: 1 } },
          { text: 'Make an excuse and slip away naturally', scores: { freedom: 3, harmony: 1 } }
        ]},
        { text: 'Your friendship style?', options: [
          { text: 'Take the lead in looking after friends', scores: { leader: 3, harmony: 1 } },
          { text: 'Keep in touch evenly with all friends', scores: { harmony: 3, leader: 1 } },
          { text: 'Prefer a few friends for deep conversations', scores: { analysis: 3, freedom: 1 } },
          { text: 'Prefer comfortable friendships that don\'t change even without contact', scores: { freedom: 3, analysis: 1 } }
        ]},
        { text: 'Your energy around people?', options: [
          { text: 'The more people around, the more energized I feel', scores: { leader: 3, harmony: 1 } },
          { text: 'I feel good around comfortable people', scores: { harmony: 3, freedom: 1 } },
          { text: 'After some socializing, I need alone time', scores: { analysis: 3, freedom: 1 } },
          { text: 'I feel most at ease and recharged when alone', scores: { freedom: 3, analysis: 1 } }
        ]}
      ];
    }
    return [
      { text: '모임에서 나의 역할은?', options: [
        { text: '자연스럽게 분위기를 이끌고 의견을 모은다', scores: { leader: 3, harmony: 1 } },
        { text: '서로 다른 의견을 조율하며 분위기를 부드럽게 만든다', scores: { harmony: 3, leader: 1 } },
        { text: '한발 물러서서 상황을 관찰하고 필요한 정보를 제공한다', scores: { analysis: 3, freedom: 1 } },
        { text: '필요할 때만 참여하고 나머지는 자유롭게 보낸다', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '친구가 고민을 이야기할 때 나는?', options: [
        { text: '구체적인 해결책을 제시하며 적극적으로 돕는다', scores: { leader: 3, analysis: 1 } },
        { text: '공감하며 끝까지 들어주고 위로한다', scores: { harmony: 3, leader: 1 } },
        { text: '객관적인 시각에서 상황을 분석해준다', scores: { analysis: 3, harmony: 1 } },
        { text: '들어주되, 스스로 답을 찾을 수 있도록 기다려준다', scores: { freedom: 3, harmony: 1 } }
      ]},
      { text: '그룹 프로젝트에서 나는?', options: [
        { text: '역할을 분배하고 전체 일정을 관리한다', scores: { leader: 3, analysis: 1 } },
        { text: '팀원들의 의견을 하나로 모으고 갈등을 해결한다', scores: { harmony: 3, leader: 1 } },
        { text: '자료를 조사하고 논리적인 틀을 잡는다', scores: { analysis: 3, leader: 1 } },
        { text: '내 담당 부분을 독립적으로 완성한다', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '새로운 사람을 만났을 때?', options: [
        { text: '먼저 말을 걸고 대화를 주도한다', scores: { leader: 3, harmony: 1 } },
        { text: '공통 관심사를 찾으며 편하게 대화한다', scores: { harmony: 3, freedom: 1 } },
        { text: '상대방을 조용히 관찰하며 파악한다', scores: { analysis: 3, freedom: 1 } },
        { text: '굳이 먼저 다가가지 않고 자연스러운 흐름에 맡긴다', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '친구들 사이에 갈등이 생기면?', options: [
        { text: '직접 나서서 문제를 정리하고 해결한다', scores: { leader: 3, harmony: 1 } },
        { text: '양쪽 이야기를 듣고 중재하려 노력한다', scores: { harmony: 3, analysis: 1 } },
        { text: '원인을 분석하고 합리적인 해결 방향을 제안한다', scores: { analysis: 3, leader: 1 } },
        { text: '당사자끼리 해결하도록 두고 거리를 유지한다', scores: { freedom: 3, harmony: 1 } }
      ]},
      { text: '주말에 가장 하고 싶은 것은?', options: [
        { text: '친구들과 모임을 계획하고 주도한다', scores: { leader: 3, harmony: 1 } },
        { text: '가까운 사람들과 편하게 시간을 보낸다', scores: { harmony: 3, freedom: 1 } },
        { text: '혼자 책을 읽거나 새로운 것을 공부한다', scores: { analysis: 3, freedom: 1 } },
        { text: '아무 계획 없이 하고 싶은 대로 보낸다', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '나의 SNS 스타일은?', options: [
        { text: '적극적으로 소통하고 모임도 SNS로 만든다', scores: { leader: 3, harmony: 1 } },
        { text: '친구들 게시물에 좋아요와 댓글을 꼬박꼬박 남긴다', scores: { harmony: 3, leader: 1 } },
        { text: '정보 위주로 팔로우하고 조용히 읽는 편이다', scores: { analysis: 3, freedom: 1 } },
        { text: 'SNS를 잘 안 하거나 가끔씩만 들여다본다', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '약속을 잡을 때 나는?', options: [
        { text: '장소, 시간, 멤버까지 내가 직접 정한다', scores: { leader: 3, analysis: 1 } },
        { text: '모두의 일정을 확인하고 다 맞는 시간을 찾는다', scores: { harmony: 3, leader: 1 } },
        { text: '효율적인 장소와 시간을 분석해서 제안한다', scores: { analysis: 3, harmony: 1 } },
        { text: '다른 사람이 정해주면 맞춰서 간다', scores: { freedom: 3, harmony: 1 } }
      ]},
      { text: '직장이나 학교에서 나의 이미지는?', options: [
        { text: '신뢰할 수 있는 리더, 의지가 되는 존재', scores: { leader: 3, harmony: 1 } },
        { text: '누구와도 잘 어울리는 사교적인 사람', scores: { harmony: 3, leader: 1 } },
        { text: '꼼꼼하고 논리적인 사람', scores: { analysis: 3, freedom: 1 } },
        { text: '독립적이고 자기만의 세계가 있는 사람', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '싫은 부탁을 받았을 때?', options: [
        { text: '부담스러워도 솔직하게 의견을 말한다', scores: { leader: 3, freedom: 1 } },
        { text: '거절하기 어려워서 일단 들어주는 편이다', scores: { harmony: 3, analysis: 1 } },
        { text: '상황을 따져보고 합리적인 이유를 들어 거절한다', scores: { analysis: 3, leader: 1 } },
        { text: '적당히 핑계를 대고 자연스럽게 빠진다', scores: { freedom: 3, harmony: 1 } }
      ]},
      { text: '나의 우정 스타일은?', options: [
        { text: '리더십을 발휘해 친구들을 챙기고 이끈다', scores: { leader: 3, harmony: 1 } },
        { text: '모든 친구에게 골고루 연락하며 관계를 유지한다', scores: { harmony: 3, leader: 1 } },
        { text: '깊이 있는 대화가 가능한 소수 친구를 선호한다', scores: { analysis: 3, freedom: 1 } },
        { text: '서로 편하게 연락 없이도 변하지 않는 관계가 좋다', scores: { freedom: 3, analysis: 1 } }
      ]},
      { text: '사람들과 함께 있을 때 에너지는?', options: [
        { text: '사람들과 함께할수록 에너지가 넘친다', scores: { leader: 3, harmony: 1 } },
        { text: '편한 사람들과 있으면 기분이 좋아진다', scores: { harmony: 3, freedom: 1 } },
        { text: '적당한 교류 후에는 혼자만의 시간이 필요하다', scores: { analysis: 3, freedom: 1 } },
        { text: '혼자 있는 시간이 가장 편하고 충전된다', scores: { freedom: 3, analysis: 1 } }
      ]}
    ];
  }

  // =====================
  // 결과 유형 데이터 - bilingual
  // =====================
  function getRESULT_TYPES() {
    var lang = getLang();
    if (lang === 'en') {
      return {
        'leader_harmony': { emoji: '👑', name: 'Charismatic Coordinator', subtitle: 'Charismatic Coordinator',
          tendency: 'You naturally lead while respecting everyone\'s opinions. Standing at the center of a group, you set direction while valuing the journey together. People rely on and follow you because of your balanced ability to lead and care for others.',
          strength: 'You excel at leading an organization while paying close attention to each member\'s emotions. Even in conflict, you mediate fairly and draw conclusions, making you a key figure in any group. You\'re outstanding at bringing people together.',
          weakness: 'Trying to please everyone can exhaust you. Sometimes the tension between making leadership decisions and caring for everyone can cause stress, so take time to check in with your own emotions.',
          match: 'You pair well with the "Independent Observer" (Analysis+Freedom) type. While you lead and coordinate, their objective perspective provides balance.' },
        'leader_analysis': { emoji: '🎯', name: 'Strategic Commander', subtitle: 'Strategic Commander',
          tendency: 'You possess both logical thinking and strong drive. You quickly analyze situations, set the optimal direction, and lead with execution. You prioritize rational judgment over emotions and move systematically toward goals.',
          strength: 'You shine in complex situations. With sharp analytical skills and decisiveness, you quickly present solutions and efficiently lead the team. Your planned, systematic approach earns trust.',
          weakness: 'Prioritizing efficiency may cause you to miss others\' emotions. Relying solely on logic can make relationships rigid, so some emotional communication is needed. Your perfectionist tendency may set high standards for both yourself and others.',
          match: 'You pair well with the "Peaceful Free Spirit" (Harmony+Freedom) type. They can gently soften your strategic edge.' },
        'leader_freedom': { emoji: '🚀', name: 'Pioneering Explorer', subtitle: 'Pioneering Explorer',
          tendency: 'You combine leadership with a free spirit. Rather than conventional methods, you blaze new trails and lead people in your own way. Your adventurous, challenging personality energizes those around you.',
          strength: 'You\'re unafraid of new attempts and inspire courage in others. Your free thinking generates creative ideas, and your drive turns them into reality. Your charismatic charm naturally draws people to you.',
          weakness: 'Valuing freedom can sometimes conflict with responsibility. When you suddenly need alone time while in a leadership role, it may confuse those around you. Patience is needed for relationships that require consistency.',
          match: 'You pair well with the "Wise Mediator" (Harmony+Analysis) type. A stable yet logical partner can solidly support your adventures.' },
        'harmony_analysis': { emoji: '⚖️', name: 'Wise Mediator', subtitle: 'Wise Mediator',
          tendency: 'You combine warm empathy with sharp analytical skills. You read people\'s emotions well while maintaining objectivity, making you the best mediator in conflict situations. You excel at finding solutions everyone can accept.',
          strength: 'Your excellent balance of emotion and reason leads to wise decisions in any situation. Your ability to logically understand and organize people\'s emotions makes you a trusted advisor. Your fair and thoughtful attitude builds deep relationships.',
          weakness: 'Trying to analyze every situation may prevent you from diving deep emotionally. Getting too accustomed to the mediator role may cause you to put your own feelings aside, so practice expressing your genuine emotions sometimes.',
          match: 'You pair well with the "Pioneering Explorer" (Leader+Freedom) type. Your balanced perspective adds stability to their adventures.' },
        'harmony_freedom': { emoji: '🕊️', name: 'Peaceful Free Spirit', subtitle: 'Peaceful Free Spirit',
          tendency: 'You maintain gentle relationships while treasuring your personal space. You dislike imposing on or being imposed upon, pursuing relationships that respect mutual freedom. You have a gift for creating comfortable, natural atmospheres.',
          strength: 'You create a peaceful, comfortable atmosphere in any situation. Your warm treatment without burdening others earns widespread fondness. Since you accept people as they are, people often say you\'re the most comfortable person to be around.',
          weakness: 'You may tend to avoid conflict situations. You might set aside your own opinions for the sake of relationships, or neglect important relationships for freedom. Finding the right balance is key. Practicing assertive communication can also help.',
          match: 'You pair well with the "Strategic Commander" (Leader+Analysis) type. Your flexibility gently softens the commander\'s systematic nature.' },
        'analysis_freedom': { emoji: '🔭', name: 'Independent Observer', subtitle: 'Independent Observer',
          tendency: 'You enjoy observing the world from a step back. You maintain independence among people, grasping essentials through deep thinking and analysis. You prefer narrow but deep relationships and recharge during time alone.',
          strength: 'Your objective, insightful perspective catches what others miss. Your careful, deep judgment provides sincere advice. Being independent, you don\'t burden relationship partners, and the time spent together features high-quality conversation.',
          weakness: 'Reduced social interaction can lead to isolation. Your analytical attitude may sometimes seem cold, so actively expressing emotions is needed. Be aware that starting new relationships may take longer for you.',
          match: 'You pair well with the "Charismatic Coordinator" (Leader+Harmony) type. They respect your independent perspective while creating social connections for you.' },
        'leader_dominant': { emoji: '🦁', name: 'Born Leader', subtitle: 'Born Leader',
          tendency: 'You\'re a born leader who naturally becomes the center wherever you go. You instinctively lead people, make decisions, and set direction. Your strong sense of responsibility and drive earn the trust of those around you. Taking initiative is your nature.',
          strength: 'Your outstanding decisiveness and execution allow you to systematically lead any group. You stand firm without wavering even in crisis, providing direction and stability. Your responsible attitude earns respect from those around you.',
          weakness: 'An excessive need to take charge may cause you to dismiss others\' opinions. Trying to handle everything alone can lead to burnout, so sometimes delegate and take breaks. Practicing active listening will improve relationship quality.',
          match: 'You pair well with the "Atmosphere Maker" (Harmony dominant) type. They add gentle warmth to your leadership.' },
        'harmony_dominant': { emoji: '🌻', name: 'Atmosphere Maker', subtitle: 'Atmosphere Maker',
          tendency: 'You\'re a warm type who makes everyone feel comfortable wherever you go. You read others\' emotions well and create an atmosphere where everyone can enjoy themselves. You cherish relationships and prioritize bonding with those around you. Being near you puts anyone at ease.',
          strength: 'Your exceptional empathy naturally helps people open up. You have the ability to gently ease tension even in conflicts, and you maintain good relationships with all types of people. Your mere presence makes any gathering warm and friendly.',
          weakness: 'You may suppress your own emotions for too long while trying to accommodate others. Difficulty with refusal may lead to agreeing to unreasonable requests, so practice honestly communicating your feelings and limits. Maintaining too many relationships at once can be exhausting.',
          match: 'You pair well with the "Born Leader" (Leader dominant) type. When your gentle mediation meets the leader\'s drive, you make the perfect team.' },
        'analysis_dominant': { emoji: '🧠', name: 'Cool Analyst', subtitle: 'Cool Analyst',
          tendency: 'You view every situation logically and systematically. You make rational judgments rather than being swayed by emotions, and you value quality in relationships. You prefer deep conversations and genuine connections over surface-level interactions. Your careful, meticulous nature ensures you deliver results.',
          strength: 'Your excellent analytical skills accurately identify the essence of situations. Your fact-based rather than emotion-based advice provides practical help. Your reliable, consistent attitude makes you the most trustworthy person for those closest to you.',
          weakness: 'Emphasizing logic may make you seem lacking in emotional empathy. Evaluating relationships by efficiency can hurt others, so sometimes spend emotional time together even if it feels inefficient. Opening up takes time for you.',
          match: 'You pair well with the "Free Soul" (Freedom dominant) type. You can respect each other\'s independence while engaging in deep, meaningful exchanges.' },
        'freedom_dominant': { emoji: '🦅', name: 'Free Soul', subtitle: 'Free Soul',
          tendency: 'You treasure freedom and independence above all. You pursue a life unconstrained by anyone, and in relationships too, you consider respecting each other\'s space paramount. Your rich inner world and unique charm draw people\'s attention.',
          strength: 'Your independent, free-thinking approach provides creative ideas and perspectives. You don\'t burden others, and you offer sincere help when truly needed. By connecting through autonomy rather than obligation, time spent together feels extra special.',
          weakness: 'Pursuing freedom excessively may cause you to miss important relationships. Infrequent contact may upset people around you, so express consistent interest in relationships that matter. Sometimes courage to let go of a bit of freedom is needed for deeper connections.',
          match: 'You pair well with the "Cool Analyst" (Analysis dominant) type. You can understand each other\'s independence while engaging in intellectually stimulating exchanges.' }
      };
    }
    return {
      'leader_harmony': { emoji: '👑', name: '카리스마 조율자', subtitle: 'Charismatic Coordinator',
        tendency: '당신은 사람들 사이에서 자연스러운 리더십을 발휘하면서도 모두의 의견을 존중하는 유형입니다. 그룹의 중심에 서서 방향을 제시하되, 함께 가는 것을 중요하게 생각합니다. 주변 사람들이 당신을 의지하고 따르는 이유는 이끌면서도 배려할 줄 아는 균형 감각 덕분입니다.',
        strength: '조직을 이끌면서도 구성원 한 명 한 명의 감정을 세심하게 살피는 능력이 뛰어납니다. 갈등 상황에서도 공정하게 중재하면서 결론을 이끌어낼 수 있어, 어떤 모임에서든 핵심 인물이 됩니다. 사람들을 하나로 묶는 데 탁월합니다.',
        weakness: '모든 사람을 만족시키려다 본인이 지칠 수 있습니다. 때로는 리더로서의 판단과 모두를 배려하려는 마음이 충돌할 때 스트레스를 받을 수 있으니, 자신의 감정도 돌아보는 시간이 필요합니다.',
        match: '독립적 관찰자(분석+자유) 유형과 잘 맞습니다. 당신이 이끌고 조율하는 동안, 관찰자의 객관적 시각이 균형을 잡아줍니다.' },
      'leader_analysis': { emoji: '🎯', name: '전략적 지휘관', subtitle: 'Strategic Commander',
        tendency: '당신은 논리적인 사고와 강한 추진력을 동시에 갖춘 유형입니다. 상황을 빠르게 분석하고 최적의 방향을 설정한 뒤, 실행력 있게 이끌어갑니다. 감정보다는 이성적 판단을 우선시하며, 목표 달성을 위해 체계적으로 움직입니다.',
        strength: '복잡한 문제 상황에서 빛을 발합니다. 냉철한 분석력과 결단력으로 빠르게 해결책을 제시하고, 팀을 효율적으로 이끌어갈 수 있습니다. 계획적이고 체계적인 접근 방식으로 신뢰를 얻습니다.',
        weakness: '효율성을 중시하다 보면 상대방의 감정을 놓칠 수 있습니다. 모든 것을 논리로 해결하려 하면 관계가 딱딱해질 수 있으니, 가끔은 감성적인 소통도 필요합니다. 완벽주의 성향이 강해 스스로와 타인에게 높은 기준을 적용할 수 있습니다.',
        match: '평화로운 자유인(조화+자유) 유형과 잘 맞습니다. 당신의 전략적 면모를 부드럽게 감싸줄 수 있는 상대입니다.' },
      'leader_freedom': { emoji: '🚀', name: '선구적 개척자', subtitle: 'Pioneering Explorer',
        tendency: '당신은 리더십과 자유로운 영혼을 함께 가진 유형입니다. 틀에 박힌 방식보다는 새로운 길을 개척하며, 자신만의 방식으로 사람들을 이끕니다. 모험적이고 도전적인 성격으로 주변에 활력을 불어넣습니다.',
        strength: '새로운 시도를 두려워하지 않고, 다른 사람들에게도 도전의 용기를 줍니다. 자유로운 발상으로 창의적인 아이디어를 내놓으며, 추진력으로 이를 현실로 만드는 능력이 있습니다. 매력적인 카리스마로 사람들이 자연스럽게 모여듭니다.',
        weakness: '자유를 중요시하다 보면 책임감과 충돌할 때가 있습니다. 이끄는 위치에서 갑자기 혼자만의 시간이 필요해지면 주변 사람들이 당황할 수 있습니다. 꾸준함이 필요한 관계에서는 인내심을 키울 필요가 있습니다.',
        match: '현명한 중재자(조화+분석) 유형과 잘 맞습니다. 안정적이면서도 논리적인 상대가 당신의 모험을 든든히 뒷받침해줍니다.' },
      'harmony_analysis': { emoji: '⚖️', name: '현명한 중재자', subtitle: 'Wise Mediator',
        tendency: '당신은 따뜻한 공감 능력과 냉철한 분석력을 겸비한 유형입니다. 사람들의 감정을 잘 읽으면서도 객관적인 시각을 유지할 수 있어, 갈등 상황에서 최고의 중재자 역할을 합니다. 모두가 납득할 수 있는 해결책을 찾아내는 데 능합니다.',
        strength: '감성과 이성의 균형이 뛰어나 어떤 상황에서도 현명한 판단을 내립니다. 사람들의 감정을 논리적으로 이해하고 정리해줄 수 있어, 주변에서 조언자로 신뢰받습니다. 공정하고 사려 깊은 태도로 깊은 인간관계를 형성합니다.',
        weakness: '모든 상황을 분석하려다 감정적으로 깊이 빠져들지 못할 때가 있습니다. 중재자 역할에 너무 익숙해지면 자신의 진짜 감정은 뒤로 미루게 될 수 있으니, 가끔은 자신의 마음도 솔직하게 표현하는 연습이 필요합니다.',
        match: '선구적 개척자(리더+자유) 유형과 잘 맞습니다. 당신의 균형 잡힌 시각이 개척자의 모험에 안정감을 더해줍니다.' },
      'harmony_freedom': { emoji: '🕊️', name: '평화로운 자유인', subtitle: 'Peaceful Free Spirit',
        tendency: '당신은 사람들과 부드러운 관계를 유지하면서도 자신만의 공간을 소중히 여기는 유형입니다. 강요하거나 강요받는 것을 싫어하며, 서로의 자유를 존중하는 관계를 추구합니다. 편안하고 자연스러운 분위기를 만들어내는 능력이 있습니다.',
        strength: '어떤 상황에서도 평화롭고 편안한 분위기를 조성합니다. 사람들에게 부담을 주지 않으면서도 따뜻하게 대하는 태도로 많은 이들의 호감을 받습니다. 상대방의 개성을 있는 그대로 존중하기 때문에 함께 있으면 편한 사람이라는 평가를 듣습니다.',
        weakness: '갈등 상황에서 회피하는 경향이 있을 수 있습니다. 관계를 위해 자신의 의견을 내려놓거나, 자유를 위해 중요한 관계를 소홀히 할 수 있으니, 적절한 균형을 찾는 것이 중요합니다. 때로는 적극적으로 의사표현을 하는 연습도 도움이 됩니다.',
        match: '전략적 지휘관(리더+분석) 유형과 잘 맞습니다. 당신의 유연함이 지휘관의 체계적인 면을 부드럽게 만들어줍니다.' },
      'analysis_freedom': { emoji: '🔭', name: '독립적 관찰자', subtitle: 'Independent Observer',
        tendency: '당신은 한 발 떨어진 곳에서 세상을 관찰하는 것을 즐기는 유형입니다. 사람들 사이에서 독립성을 유지하며, 깊이 있는 사고와 분석으로 본질을 파악합니다. 넓지는 않지만 깊은 관계를 선호하고, 혼자만의 시간에서 에너지를 충전합니다.',
        strength: '객관적이고 통찰력 있는 시각으로 다른 사람들이 놓치는 부분을 잘 발견합니다. 신중하고 깊이 있는 판단으로 진정성 있는 조언을 해줄 수 있습니다. 독립적이어서 관계에서 상대방에게 부담을 주지 않으며, 같이 있을 때 질 높은 대화를 나눌 수 있는 사람입니다.',
        weakness: '사람들과의 교류가 적어지면 고립될 수 있습니다. 분석적인 태도가 때로는 차가워 보일 수 있으니, 감정을 적극적으로 표현하는 노력이 필요합니다. 새로운 관계를 시작하는 데 시간이 오래 걸릴 수 있다는 점도 인식해두면 좋습니다.',
        match: '카리스마 조율자(리더+조화) 유형과 잘 맞습니다. 당신의 독립적 관점을 존중하면서 사회적 연결 고리를 만들어주는 상대입니다.' },
      'leader_dominant': { emoji: '🦁', name: '타고난 리더', subtitle: 'Born Leader',
        tendency: '당신은 어디에서든 중심이 되는 타고난 리더형입니다. 자연스럽게 사람들을 이끌며 결정을 내리고 방향을 제시합니다. 책임감이 강하고 추진력이 넘쳐 주변 사람들의 신뢰를 얻습니다. 어떤 상황에서든 주도적으로 행동하는 것이 당신의 본능입니다.',
        strength: '결단력과 실행력이 뛰어나 어떤 모임이든 체계적으로 이끌 수 있습니다. 위기 상황에서도 흔들리지 않고 앞장서며, 사람들에게 방향성과 안정감을 제공합니다. 책임감 있는 태도로 주변의 존경을 받습니다.',
        weakness: '모든 것을 주도하려는 성향이 지나치면 다른 사람들의 의견을 무시할 수 있습니다. 혼자서 모든 것을 해결하려 하다 보면 번아웃이 올 수 있으니, 가끔은 다른 사람에게 맡기고 쉬어가는 여유도 필요합니다. 경청하는 연습이 관계의 질을 높여줄 것입니다.',
        match: '분위기 메이커(조화 우세) 유형과 잘 맞습니다. 당신의 리더십에 부드러운 감성을 더해주는 상대입니다.' },
      'harmony_dominant': { emoji: '🌻', name: '분위기 메이커', subtitle: 'Atmosphere Maker',
        tendency: '당신은 어디서든 사람들을 편하게 만드는 따뜻한 유형입니다. 주변의 감정을 잘 읽고, 모두가 즐거울 수 있도록 분위기를 이끕니다. 관계를 소중히 여기며 주변 사람들과의 유대감을 가장 중요하게 생각합니다. 당신 곁에 있으면 누구나 마음이 편해집니다.',
        strength: '공감 능력이 탁월해서 사람들이 자연스럽게 마음을 열게 됩니다. 갈등 상황에서도 부드럽게 분위기를 풀어가는 능력이 있으며, 다양한 사람들과 두루두루 좋은 관계를 유지합니다. 모임에서 당신의 존재만으로도 분위기가 화기애애해집니다.',
        weakness: '다른 사람의 기분을 맞추느라 자신의 감정을 너무 오래 억누를 수 있습니다. 거절을 잘 못해서 무리한 부탁도 들어주게 되는 경우가 있으니, 자신의 감정과 한계도 솔직하게 전달하는 연습이 필요합니다. 너무 많은 관계를 유지하려다 지칠 수 있습니다.',
        match: '타고난 리더(리더 우세) 유형과 잘 맞습니다. 당신의 부드러운 조율 능력이 리더의 추진력과 만나면 최고의 팀이 됩니다.' },
      'analysis_dominant': { emoji: '🧠', name: '냉철한 분석가', subtitle: 'Cool Analyst',
        tendency: '당신은 모든 상황을 논리적이고 체계적으로 바라보는 유형입니다. 감정에 휘둘리기보다 이성적으로 판단하며, 관계에서도 질을 중시합니다. 표면적인 교류보다는 깊이 있는 대화와 진정성 있는 관계를 선호합니다. 신중하고 꼼꼼한 성격으로 맡은 일은 확실히 해냅니다.',
        strength: '뛰어난 분석력으로 상황의 본질을 정확히 파악합니다. 감정이 아닌 사실에 기반한 조언으로 주변 사람들에게 실질적인 도움을 줍니다. 신뢰할 수 있고 일관된 태도로, 가까운 사람들에게는 가장 믿음직한 존재가 됩니다.',
        weakness: '논리를 중시하다 보면 감정적인 공감이 부족해 보일 수 있습니다. 관계에서 효율성을 따지면 상대방이 서운해할 수 있으니, 때로는 비효율적이더라도 감성적인 시간을 보내는 것이 관계에 도움이 됩니다. 마음을 여는 데 시간이 필요한 편입니다.',
        match: '자유로운 영혼(자유 우세) 유형과 잘 맞습니다. 서로의 독립성을 존중하면서도 깊이 있는 교류가 가능한 상대입니다.' },
      'freedom_dominant': { emoji: '🦅', name: '자유로운 영혼', subtitle: 'Free Soul',
        tendency: '당신은 자유와 독립을 가장 소중히 여기는 유형입니다. 누구에게도 구속받지 않는 자유로운 삶을 추구하며, 관계에서도 서로의 공간을 존중하는 것을 중요하게 생각합니다. 자기만의 세계가 풍부하고 독특한 매력으로 사람들의 관심을 끕니다.',
        strength: '독립적이고 자유로운 사고방식으로 창의적인 아이디어와 관점을 제공합니다. 상대방에게 부담을 주지 않으며, 필요한 순간에 진심 어린 도움을 주는 진정성이 있습니다. 결속이 아닌 자율로 연결된 관계를 만들어, 함께하는 시간이 더 특별하게 느껴집니다.',
        weakness: '자유를 지나치게 추구하면 중요한 관계를 놓칠 수 있습니다. 연락이 뜸해져 주변 사람들이 서운해할 수 있으니, 소중한 관계에는 꾸준히 관심을 표현하는 것이 필요합니다. 깊이 있는 관계를 위해서는 때로 자유의 일부를 내려놓는 용기도 필요합니다.',
        match: '냉철한 분석가(분석 우세) 유형과 잘 맞습니다. 서로의 독립성을 이해하면서도 지적인 교류가 가능한 관계입니다.' }
    };
  }

  // =====================
  // 상태 관리
  // =====================
  let currentQuestion = 0;
  const scores = { leader: 0, harmony: 0, analysis: 0, freedom: 0 };

  // =====================
  // DOM 요소
  // =====================
  const startSection = document.getElementById('startSection');
  const startBtn = document.getElementById('startBtn');
  const quizSection = document.getElementById('quizSection');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
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
    scores.leader = 0;
    scores.harmony = 0;
    scores.analysis = 0;
    scores.freedom = 0;
    showQuestion();
  }

  // =====================
  // 질문 표시
  // =====================
  function showQuestion() {
    var questions = getQUESTIONS();
    var q = questions[currentQuestion];
    var num = currentQuestion + 1;

    progressFill.style.width = ((num / questions.length) * 100) + '%';
    progressText.textContent = num + ' / ' + questions.length;
    questionText.textContent = 'Q' + num + '. ' + q.text;

    optionsContainer.innerHTML = '';
    q.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', function () { selectOption(idx); });
      optionsContainer.appendChild(btn);
    });

    // 질문 전환 애니메이션
    var card = document.getElementById('questionCard');
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = 'fadeInUp 0.4s ease forwards';
  }

  // =====================
  // 선택지 클릭
  // =====================
  function selectOption(idx) {
    var questions = getQUESTIONS();
    var q = questions[currentQuestion];
    var opt = q.options[idx];

    var buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(function (btn) {
      btn.classList.remove('selected');
      btn.style.pointerEvents = 'none';
    });
    buttons[idx].classList.add('selected');

    var optScores = opt.scores;
    for (var key in optScores) {
      if (optScores.hasOwnProperty(key)) {
        scores[key] += optScores[key];
      }
    }

    setTimeout(function () {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 300);
  }

  // =====================
  // 결과 계산 & 표시
  // =====================
  function showResult() {
    quizSection.hidden = true;
    resultSection.hidden = false;

    var typeKey = calculateType();
    var typeData = getRESULT_TYPES()[typeKey];

    resultEmoji.textContent = typeData.emoji;
    resultTypeName.textContent = typeData.name;
    resultTypeSubtitle.textContent = typeData.subtitle;
    resultTendency.textContent = typeData.tendency;
    resultStrength.textContent = typeData.strength;
    resultWeakness.textContent = typeData.weakness;
    resultMatch.textContent = typeData.match;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =====================
  // 유형 판정
  // =====================
  function calculateType() {
    var dims = [
      { key: 'leader', score: scores.leader },
      { key: 'harmony', score: scores.harmony },
      { key: 'analysis', score: scores.analysis },
      { key: 'freedom', score: scores.freedom }
    ];

    dims.sort(function (a, b) { return b.score - a.score; });

    var first = dims[0];
    var second = dims[1];

    if (first.score - second.score >= 5) {
      return first.key + '_dominant';
    }

    var pair = [first.key, second.key];
    var order = ['leader', 'harmony', 'analysis', 'freedom'];
    pair.sort(function (a, b) {
      return order.indexOf(a) - order.indexOf(b);
    });

    return pair[0] + '_' + pair[1];
  }

  // =====================
  // 다시 테스트
  // =====================
  function resetQuiz() {
    resultSection.hidden = true;
    startSection.hidden = false;
    currentQuestion = 0;
    scores.leader = 0;
    scores.harmony = 0;
    scores.analysis = 0;
    scores.freedom = 0;
    progressFill.style.width = '0%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
})();
