// =====================
// 전생 테스트 데이터
// =====================
function getPAST_LIVES() {
  var lang = getLang();
  if (lang === 'en') {
    return [
      {
        era: 'Ancient Egypt',
        period: 'Around 1500 BC',
        emoji: '🏛️',
        job: 'Temple Scribe',
        story: 'You were a scribe who recorded sacred texts in a grand temple along the Nile River. Carving hieroglyphs onto papyrus, you passed down the achievements of pharaohs and tales of the gods to future generations. You were renowned among your peers for keeping the most accurate records, and even the high priests trusted your work. Watching the stars at sunset and recording the secrets of the universe was your humble dream.',
        connection: 'Your passion for records and documents in your past life carries over to this life, where you may find quiet satisfaction in meticulously recording or organizing things. Your keen eye for detail and pursuit of accuracy may stem from your days as a scribe.',
        lucky: 'Lucky Item: Fountain Pen / Lucky Color: Gold / Lucky Number: 7'
      },
      {
        era: 'Ancient Greece',
        period: 'Around 400 BC',
        emoji: '🏺',
        job: "Philosopher's Disciple",
        story: 'You were a young philosophy student learning under a great master beneath the olive trees of Athens. You endlessly asked "Why?" in pursuit of truth and often persuaded others with your sharp logic in debates. You dreamed of a better society while conversing with citizens in the Agora. Sometimes you got so lost in deep thought that you literally lost your way.',
        connection: 'Your philosophical nature from your past life carries on—you love thinking deeply and frequently ask "Why?" Your tendency to dig into the essence of conversations and those moments when you ponder the meaning of life are traces of that time.',
        lucky: 'Lucky Item: Book / Lucky Color: Olive Green / Lucky Number: 3'
      },
      {
        era: 'Roman Empire',
        period: 'Around 100 AD',
        emoji: '⚔️',
        job: 'Gladiator',
        story: 'You were a brave gladiator who walked the sands of the Colosseum. You fought amidst the roaring cheers of tens of thousands, but what you truly desired was freedom. With exceptional combat instincts and mental fortitude, you survived countless matches. After finally winning your freedom, you returned to your homeland to live out your days peacefully as a farmer.',
        connection: 'Having overcome extreme situations in your past life, you display remarkable focus and tenacity in difficult circumstances in this life. You shine in competitive environments and have the ability to turn crises into opportunities.',
        lucky: 'Lucky Item: Leather Bracelet / Lucky Color: Crimson Red / Lucky Number: 1'
      },
      {
        era: 'Viking Age',
        period: 'Around 900 AD',
        emoji: '⚓',
        job: 'Navigator',
        story: 'You were a Viking navigator who sailed the fierce seas of Northern Europe. Reading the constellations and understanding the currents, you led your crew to unknown lands. Your soul still remembers the overwhelming emotion of discovering the coast of a new continent beyond the glaciers of Iceland. The smell of sea wind made your blood run hot.',
        connection: 'Your adventurous spirit from your past life lives on, drawing you strongly to exploring new places and seeking unknown experiences. Your love of travel or enjoyment of new challenges in daily life is a legacy from your Viking days.',
        lucky: 'Lucky Item: Compass / Lucky Color: Navy Blue / Lucky Number: 9'
      },
      {
        era: 'Medieval Europe',
        period: 'Around 1200 AD',
        emoji: '🌿',
        job: 'Monastery Herbalist',
        story: 'You were a healer who studied herbs in a secluded medieval European monastery. You carefully tended lavender, rosemary, and sage in your garden while caring for the sick. The villagers called you "Healing Hands," and people came from far away seeking your help. At night, you would write secret notes about herbal remedies by candlelight.',
        connection: 'Having devoted yourself to healing and care in your past life, you naturally look after those around you with a warm heart in this life. Your attraction to plants and nature, and your instinct to help others, are traces of that time.',
        lucky: 'Lucky Item: Herbal Candle / Lucky Color: Forest Green / Lucky Number: 5'
      },
      {
        era: 'Tang Dynasty',
        period: 'Around 750 AD',
        emoji: '🎋',
        job: 'Court Poet',
        story: 'You were a court poet composing verses in the splendid Tang Dynasty palace. On moonlit nights, you would climb the pavilion and recite beautiful poems over a cup of wine, even impressing the emperor. You were famous for your talent of delicately weaving the beauty of nature with human emotions. Spring plum blossoms and autumn chrysanthemums all gained new life within your poetry.',
        connection: 'Your artistic sensibility from your past life still shows—you are moved by beautiful things and tend to be honest in expressing emotions. You may discover unexpected talent in writing or artistic activities, and your rich emotional nature has its roots here.',
        lucky: 'Lucky Item: Notebook / Lucky Color: Purple / Lucky Number: 4'
      },
      {
        era: 'Goryeo Dynasty',
        period: 'Around 1100 AD',
        emoji: '🫖',
        job: 'Porcelain Artisan',
        story: "You were an exceptional porcelain artisan who crafted Goryeo's famous jade-green celadon. Kneading clay to create perfect forms was your life's joy, and your heart raced every time a jade-colored piece emerged from the kiln. Even while producing the finest celadon for the royal court, you never lost your humility. Some of the pieces you created may still be displayed in museums a thousand years later.",
        connection: 'Having known the joy of creating things by hand in your past life, you enjoy making or decorating things yourself in this life. Your obsession with details, your pursuit of perfection, and your patience to see things through are legacies of your artisan days.',
        lucky: 'Lucky Item: Ceramic Teacup / Lucky Color: Jade Green / Lucky Number: 8'
      },
      {
        era: 'Renaissance Europe',
        period: 'Around 1490 AD',
        emoji: '🎨',
        job: "Painter's Apprentice",
        story: "You were a passionate apprentice learning to paint under a great master in Florence. While grinding pigments and preparing canvases, you absorbed the master's techniques through observation. One day, a portrait you secretly painted while your master was away caught a patron's eye, earning you a chance to go independent. Your talent blossomed alongside the fervor of an era where art and science flourished.",
        connection: 'The creative energy you gained in your past life carries over, giving you exceptional abilities in creating things or generating ideas. Your outstanding aesthetic sense and strong passion for learning are also influences from your Renaissance days.',
        lucky: 'Lucky Item: Sketchbook / Lucky Color: Carmine Red / Lucky Number: 6'
      },
      {
        era: 'Early Joseon Dynasty',
        period: 'Around 1450 AD',
        emoji: '🎵',
        job: 'Court Musician',
        story: "You were a court musician who played the gayageum at Gyeongbok Palace. When performing at the king's banquets, you created melodies that moved everyone's hearts, and your happiest moments were practicing alone at dawn. You believed your mission was to soothe people's hearts through music. One of your compositions was passed down through generations and used in court ceremonies.",
        connection: 'Having spent your past life with music, you are deeply moved by music in this life. If you have a good sense of rhythm or find yourself inexplicably tearing up at certain music, it is the emotional resonance left by your past life as a musician.',
        lucky: 'Lucky Item: Earphones / Lucky Color: Navy / Lucky Number: 2'
      },
      {
        era: 'Age of Exploration',
        period: 'Around 1520 AD',
        emoji: '🚢',
        job: 'Explorer',
        story: 'You were a brave explorer of the Age of Exploration who set sail toward unknown continents. The thrill of discovering an island no one had ever visited, after months of sailing through storms, was beyond compare. You documented new flora and fauna and interacted with indigenous peoples, experiencing the vastness of the world firsthand. The courage to press forward despite danger was your greatest weapon.',
        connection: "Your pioneering spirit from your past life manifests as boldness in tackling new fields or choosing paths others haven't taken. Your strong curiosity about the unknown and your values of prioritizing growth and experience over stability are legacies of your explorer days.",
        lucky: 'Lucky Item: World Map / Lucky Color: Ocean Blue / Lucky Number: 11'
      },
      {
        era: 'Edo Period Japan',
        period: 'Around 1600 AD',
        emoji: '🥷',
        job: 'Ninja',
        story: 'You were a ninja operating in the shadows during the Edo period. With remarkable physical abilities and cunning, you carried out seemingly impossible missions and had a special ability to find your way even in darkness. On the surface, you lived as an ordinary farmer while secretly carrying out covert missions—a double life. The values you held most dear were flawless execution of your missions and loyalty to your comrades.',
        connection: 'As a ninja in your past life, you are quick to read situations and highly adaptable in this life. You tend to quietly observe before acting at the decisive moment, and you show deep loyalty to a trusted few.',
        lucky: 'Lucky Item: Black Mask / Lucky Color: Midnight Black / Lucky Number: 13'
      },
      {
        era: 'Late Joseon Dynasty',
        period: 'Around 1780 AD',
        emoji: '📚',
        job: 'Village Schoolmaster',
        story: "You were a schoolmaster who taught children at a village school in the late Joseon Dynasty. From the Thousand Character Classic to the Four Books and Three Classics, the fulfillment you felt when children grasped the true meaning of texts was greater than anything else. Though poor, you were respected as a learned scholar, and several of your students went on to pass the civil service examinations, bringing honor to your name. Your lifelong motto was \"Learning has no end.\"",
        connection: 'Having found fulfillment through teaching in your past life, you naturally excel at explaining and teaching others in this life. Your strong thirst for knowledge and your tendency to enjoy learning itself are influences from your schoolmaster days.',
        lucky: 'Lucky Item: Ballpoint Pen / Lucky Color: Ink Black / Lucky Number: 3'
      },
      {
        era: 'French Revolution',
        period: 'Around 1789 AD',
        emoji: '🥖',
        job: 'Bakery Owner',
        story: 'You were a bakery owner running a small shop in a back alley of Paris. Even amid the whirlwind of revolution, you kneaded dough every dawn and provided warm bread to your neighbors. You were a person of integrity who secretly shared bread with hungry citizens, and your bakery also served as a secret meeting place for revolutionaries. In those turbulent times, your single loaf of bread was hope for someone.',
        connection: 'Having practiced sharing in your past life, you find joy in feeding and caring for people in this life. Your strong sense of justice, outstanding empathy for the vulnerable, and the special happiness you feel in food-related activities are traces of your bakery owner days.',
        lucky: 'Lucky Item: Bread-shaped Trinket / Lucky Color: Wheat (Warm Beige) / Lucky Number: 14'
      },
      {
        era: 'Victorian Era',
        period: 'Around 1870 AD',
        emoji: '⚙️',
        job: 'Inventor',
        story: 'You were an inventor who spent nights drawing blueprints in your London attic workshop. Dreaming of building more efficient machines in the age of steam engines, you finally earned a patent after dozens of failures. You quietly devoted yourself to research even when the world took no notice, and one of your inventions significantly boosted factory productivity. Yours was a life that proved "failure is the mother of success" with your entire being.',
        connection: "Your inventor's spirit from your past life translates into problem-solving abilities and creative thinking in this life. Your tendency to seek original solutions to any problem and your resilience in the face of failure are your great strengths.",
        lucky: 'Lucky Item: Gear Ornament / Lucky Color: Copper / Lucky Number: 10'
      },
      {
        era: 'American Wild West',
        period: 'Around 1860 AD',
        emoji: '🤠',
        job: 'Cowboy',
        story: 'You were a cowboy who rode across the vast plains of the American West. Driving hundreds of cattle on long journeys was your daily life, and your happiest nights were spent playing guitar and singing by the campfire under a sky full of stars. You loved freedom and always kept your promises, earning deep trust from your companions. Your soul remembers that unbridled freedom of galloping under the wide open sky.',
        connection: 'Having lived a free life in your past life, you dislike being constrained and perform at your best in free environments in this life. Your attraction to wide spaces or outdoor activities, and your character of valuing promises and loyalty, are legacies of your cowboy days.',
        lucky: 'Lucky Item: Leather Belt / Lucky Color: Sand Brown / Lucky Number: 15'
      },
      {
        era: 'Late Joseon Period',
        period: 'Around 1900 AD',
        emoji: '🗡️',
        job: 'Righteous Army Leader',
        story: 'You were a brave righteous army leader who rose up to protect your nation. Though originally an ordinary scholar, you set down your brush and picked up a sword when your country faced crisis. Training with comrades in the mountains, you dreamed of the day of independence and always led from the front in dangerous operations. Your courage and spirit of sacrifice became a great source of hope for the villagers, and that spirit was passed down to the next generation.',
        connection: 'Having fought for a just cause in your past life, you have a righteous character that cannot stand by when witnessing injustice in this life. Your leadership, your decisiveness in making difficult decisions, and your willingness to sacrifice for the community originate from the soul of your righteous army days.',
        lucky: 'Lucky Item: Taegeukgi Badge / Lucky Color: Mugunghwa Pink / Lucky Number: 17'
      },
      {
        era: '1920s America',
        period: 'Around 1925 AD',
        emoji: '🎷',
        job: 'Jazz Musician',
        story: 'You were a musician who played saxophone in the smoky jazz clubs of New Orleans. A master of improvisation, you captivated audiences with different melodies at every performance. During the Prohibition era, you played in speakeasies and breathed vitality into people\'s lives. With the belief that music transcends race and class, you created stages open to everyone.',
        connection: "Your free artistic soul from your past life lives on—you dislike being boxed in and pursue your own unique style. Your spontaneous yet charming personality, and your energy that brings people together, are legacies of your jazz musician days.",
        lucky: 'Lucky Item: Vinyl Record / Lucky Color: Midnight Purple / Lucky Number: 22'
      },
      {
        era: 'Ancient Maya',
        period: 'Around 300 BC',
        emoji: '🌟',
        job: 'Astronomer',
        story: 'You were an astronomer who observed the stars from atop an ancient Mayan pyramid. You created sophisticated calendars to determine farming seasons and festival dates, and you amazed people by predicting solar and lunar eclipses. You named each star in the night sky as you sought to understand the order of the universe. Your astronomical records astounded later scholars with their remarkable accuracy.',
        connection: 'Having explored the universe in your past life, you are particularly drawn to the night sky and stories about space in this life. Your excellent ability to discover patterns and identify regularities, and your vision for seeing the big picture, are influences from your astronomer days.',
        lucky: 'Lucky Item: Star-shaped Accessory / Lucky Color: Indigo Blue / Lucky Number: 12'
      },
      {
        era: 'Mongol Empire',
        period: 'Around 1230 AD',
        emoji: '🏇',
        job: 'Mounted Courier',
        story: "You were a mounted courier who traversed Genghis Khan's vast empire. Cutting through the winds of the Mongolian steppe, you galloped thousands of miles to deliver important messages. Riding as one with your horse, you could cross any terrain. You never failed a mission where speed and accuracy were paramount, and from the eastern to western edges of the empire, your name was a symbol of trust.",
        connection: 'Having moved swiftly and precisely in your past life, you have outstanding execution ability and quick decision-making in this life. Your drive to take the shortest path once you set a goal, and your sense of responsibility in completing whatever you take on, are legacies of your courier days.',
        lucky: 'Lucky Item: Horse Keychain / Lucky Color: Sky Blue / Lucky Number: 19'
      },
      {
        era: 'Mughal Empire',
        period: 'Around 1600 AD',
        emoji: '🧂',
        job: 'Spice Merchant',
        story: 'You were a merchant who traded precious spices along the Silk Road. You could identify the origin of spices like saffron, cinnamon, and cardamom just by their scent. With excellent negotiation skills, you built friendships with merchants from both East and West, and you built your reputation through honest dealings. Your key to success was your attitude of understanding and respecting diverse cultures.',
        connection: 'Having encountered diverse cultures in your past life, you have a strong curiosity about different cultures and new cuisines in this life. Your outstanding social skills, your ability to negotiate and persuade, and your character of valuing relationships are legacies of your merchant days.',
        lucky: 'Lucky Item: Perfume / Lucky Color: Saffron Yellow / Lucky Number: 16'
      },
      {
        era: 'Aztec Civilization',
        period: 'Around 1400 AD',
        emoji: '🌺',
        job: 'Poet of Flowers',
        story: 'You were a poet who carried on the tradition of "flower and song" in the Aztec Empire. Drawing inspiration from the floating gardens of Tenochtitlan, you sang of the beauty and transience of life. Even warriors shed tears before your poetry, and your recitations were the highlight of every festival. Your philosophy of life was that "Beautiful moments are all the more precious because they do not last forever, like flowers."',
        connection: 'Having understood the value of beauty in your past life, you appreciate the preciousness of each moment and are rich in emotion in this life. Your ability to enjoy the present, your capacity to be deeply moved by beautiful things, and your expressiveness are influences from your days as a poet of flowers.',
        lucky: 'Lucky Item: A Single Flower / Lucky Color: Coral Pink / Lucky Number: 20'
      },
      {
        era: 'Three Kingdoms Korea',
        period: 'Around 500 AD',
        emoji: '🔨',
        job: 'Blacksmith',
        story: "You were an outstanding blacksmith of Silla during the Three Kingdoms period, forging the finest weapons and farming tools in the flames. Your skill in handling molten metal was unrivaled, and the swords you made were famous for never breaking in battle. You even received special commissions to forge swords for the Hwarang warriors, and you took immense pride in your craftsmanship. Your instinct for timing the quenching perfectly was a gift from birth.",
        connection: 'Having forged strength through fire and iron in your past life, you possess outstanding endurance and focus in this life. Your tenacity to stick with anything until completion, and your high standards for quality, are legacies of your blacksmith days.',
        lucky: 'Lucky Item: Metal Ring / Lucky Color: Flame Orange / Lucky Number: 21'
      },
      {
        era: 'Ottoman Empire',
        period: 'Around 1550 AD',
        emoji: '🛁',
        job: 'Bathhouse Keeper',
        story: 'You were the keeper of a magnificent hamam (bathhouse) in Istanbul. The marble-decorated bathhouse was a social space visited by everyone from the sultan to commoners. You provided the ultimate relaxation for guests by preparing water at the perfect temperature and fragrant soaps. While hearing all the rumors and stories that flowed through the hamam, you were a person of honor who never revealed secrets.',
        connection: "Having been responsible for people's rest and comfort in your past life, you have a knack for making the atmosphere around you relaxed and comfortable in this life. Your trustworthy character that keeps secrets well, and the way people naturally open up to you about their worries, are legacies of your bathhouse keeper days.",
        lucky: 'Lucky Item: Aroma Oil / Lucky Color: Turkish Blue / Lucky Number: 18'
      },
      {
        era: 'Inca Empire',
        period: 'Around 1450 AD',
        emoji: '🧶',
        job: 'Textile Artisan',
        story: "You were an Inca artisan who wove textiles with mysterious patterns high in the Andes Mountains. Your colorful textiles, made from alpaca wool, were eagerly sought by the empire's nobles, and each pattern contained stories of the universe and nature. You imbued meaning into every colored thread, recording the empire's history in your textiles. Starting each day watching the sunrise from the high mountains was your greatest source of inspiration.",
        connection: 'Having worked with patterns and colors in your past life, you are sensitive to visual beauty and have an excellent sense of design in this life. Your tendency to plan meticulously and execute step by step, and your desire to weave your own story into your creations, are legacies of your textile artisan days.',
        lucky: 'Lucky Item: Patterned Scarf / Lucky Color: Sunset Orange / Lucky Number: 24'
      },
      {
        era: 'Ancient Mesopotamia',
        period: 'Around 2000 BC',
        emoji: '📋',
        job: 'Clay Tablet Scribe',
        story: "You were a scribe in Sumer, one of humanity's earliest civilizations, who carved cuneiform script into clay tablets. From grain trade records to heroic epics, human knowledge took shape at your fingertips. You sometimes stayed up all night, absorbed in the tale of Gilgamesh as you recorded it. You never imagined the clay tablets would be excavated thousands of years later, but thanks to your records, humanity was able to recover its oldest stories.",
        connection: 'Having understood the power of documentation in your past life, you excel at systematically organizing and preserving information in this life. Your habit of recording and archiving, and your interest in stories and data, stem from your days as a clay tablet scribe.',
        lucky: 'Lucky Item: Diary / Lucky Color: Terracotta / Lucky Number: 25'
      }
    ];
  }
  return [
    {
      era: '고대 이집트',
      period: '기원전 1500년경',
      emoji: '🏛️',
      job: '신전의 서기관',
      story: '당신은 나일강 유역의 거대한 신전에서 신성한 문자를 기록하던 서기관이었습니다. 파피루스 위에 히에로글리프를 새기며 파라오의 업적과 신들의 이야기를 후세에 전했죠. 동료들 사이에서 가장 정확한 기록을 남기는 것으로 유명했으며, 신관들도 당신의 기록을 신뢰했습니다. 해가 지면 별을 바라보며 우주의 비밀을 기록하는 것이 당신의 소박한 꿈이었습니다.',
      connection: '전생에서 기록과 문서에 대한 열정을 가졌던 당신은, 현생에서도 무언가를 꼼꼼히 기록하거나 정리하는 것에 은근한 만족감을 느낄 수 있습니다. 세밀한 관찰력과 정확성을 추구하는 성향이 전생의 서기관 시절에서 비롯된 것일지도 모릅니다.',
      lucky: '행운의 아이템: 만년필 / 행운의 색: 골드 / 행운의 숫자: 7'
    },
    {
      era: '고대 그리스',
      period: '기원전 400년경',
      emoji: '🏺',
      job: '철학자의 제자',
      story: '당신은 아테네의 올리브 나무 아래에서 위대한 스승의 가르침을 받던 젊은 철학도였습니다. "왜?"라는 질문을 끊임없이 던지며 진리를 탐구했고, 토론에서 날카로운 논리로 상대를 설득하곤 했죠. 아고라 광장에서 시민들과 대화하며 더 나은 사회를 꿈꿨습니다. 가끔은 너무 깊은 사색에 빠져 길을 잃기도 했답니다.',
      connection: '전생의 철학적 기질이 현생에서도 이어져, 당신은 깊이 생각하는 것을 좋아하고 "왜?"라는 질문을 자주 합니다. 대화에서 본질을 파고드는 성향과, 삶의 의미를 고민하는 순간들이 그 흔적입니다.',
      lucky: '행운의 아이템: 책 / 행운의 색: 올리브 그린 / 행운의 숫자: 3'
    },
    {
      era: '로마 제국',
      period: '서기 100년경',
      emoji: '⚔️',
      job: '검투사',
      story: '당신은 콜로세움의 모래 위를 걸었던 용맹한 검투사였습니다. 수만 관중의 환호 속에서 싸웠지만, 진정으로 원했던 것은 자유였죠. 뛰어난 전투 감각과 강인한 정신력으로 수많은 시합에서 살아남았습니다. 결국 자유를 얻은 뒤에는 고향으로 돌아가 조용히 농사를 지으며 평화로운 여생을 보냈습니다.',
      connection: '전생에서 극한의 상황을 이겨냈던 당신은, 현생에서도 어려운 상황에서 놀라운 집중력과 끈기를 발휘합니다. 경쟁적인 환경에서 오히려 빛을 발하며, 위기를 기회로 바꾸는 능력이 있습니다.',
      lucky: '행운의 아이템: 가죽 팔찌 / 행운의 색: 크림슨 레드 / 행운의 숫자: 1'
    },
    {
      era: '바이킹 시대',
      period: '서기 900년경',
      emoji: '⚓',
      job: '항해사',
      story: '당신은 북유럽의 거센 바다를 누비던 바이킹 항해사였습니다. 별자리를 읽고 파도의 흐름을 파악하여 동료들을 미지의 땅으로 이끌었죠. 아이슬란드의 빙하를 지나 새로운 대륙의 해안을 발견했을 때의 벅찬 감동을 아직도 영혼이 기억합니다. 바닷바람 냄새가 당신의 피를 뜨겁게 만들었습니다.',
      connection: '전생의 모험 정신이 현생에도 살아 있어, 새로운 곳을 탐험하거나 미지의 경험을 하는 것에 강한 끌림을 느낍니다. 여행을 좋아하거나, 일상에서 새로운 도전을 즐기는 성향이 바이킹 시절의 유산입니다.',
      lucky: '행운의 아이템: 나침반 / 행운의 색: 네이비 블루 / 행운의 숫자: 9'
    },
    {
      era: '중세 유럽',
      period: '서기 1200년경',
      emoji: '🌿',
      job: '수도원의 약초사',
      story: '당신은 중세 유럽의 한적한 수도원에서 약초를 연구하던 치유사였습니다. 정원에서 라벤더, 로즈마리, 세이지를 정성껏 가꾸며 아픈 이들을 돌봤죠. 마을 사람들은 당신을 "치유의 손"이라 불렀고, 먼 곳에서도 도움을 구하러 찾아왔습니다. 밤이면 촛불 아래서 약초의 효능을 기록한 비밀 노트를 작성했습니다.',
      connection: '전생에서 치유와 돌봄에 헌신했던 당신은, 현생에서도 주변 사람들을 자연스럽게 챙기는 따뜻한 마음을 가지고 있습니다. 식물이나 자연에 끌리는 이유, 그리고 남을 돕고 싶은 본능이 바로 그 흔적입니다.',
      lucky: '행운의 아이템: 허브 향초 / 행운의 색: 포레스트 그린 / 행운의 숫자: 5'
    },
    {
      era: '당나라',
      period: '서기 750년경',
      emoji: '🎋',
      job: '궁중 시인',
      story: '당신은 화려한 당나라 궁궐에서 시를 짓던 궁중 시인이었습니다. 달밤이면 정자에 올라 술 한 잔과 함께 아름다운 시를 읊었고, 황제도 당신의 시에 감탄하곤 했죠. 자연의 아름다움과 인간의 감정을 섬세하게 엮어내는 재능으로 이름을 떨쳤습니다. 봄의 매화, 가을의 국화 모두 당신의 시 속에서 새로운 생명을 얻었습니다.',
      connection: '전생의 예술적 감수성이 현생에서도 드러나, 아름다운 것에 마음이 움직이고 감정 표현에 솔직한 편입니다. 글쓰기나 예술적 활동에서 예상치 못한 재능을 발견할 수 있으며, 감성이 풍부한 성격의 뿌리가 여기에 있습니다.',
      lucky: '행운의 아이템: 수첩 / 행운의 색: 자주색 / 행운의 숫자: 4'
    },
    {
      era: '고려시대',
      period: '서기 1100년경',
      emoji: '🫖',
      job: '도자기 장인',
      story: '당신은 고려의 비색 청자를 빚던 뛰어난 도자기 장인이었습니다. 흙을 주무르며 완벽한 형태를 만들어내는 것이 인생의 기쁨이었고, 가마에서 나온 비취색 도자기를 볼 때마다 가슴이 뛰었습니다. 왕실에 납품하는 최고급 청자를 만들면서도 항상 겸손을 잃지 않았죠. 당신이 만든 도자기 중 일부는 천 년이 지난 지금도 박물관에 전시되어 있을지 모릅니다.',
      connection: '전생에서 손으로 무언가를 만드는 기쁨을 알았던 당신은, 현생에서도 직접 만들거나 꾸미는 것을 즐깁니다. 디테일에 대한 집착과 완성도를 추구하는 성향, 그리고 목표한 바를 끝까지 해내는 인내심이 장인 시절의 유산입니다.',
      lucky: '행운의 아이템: 도자기 찻잔 / 행운의 색: 비취색 / 행운의 숫자: 8'
    },
    {
      era: '르네상스 유럽',
      period: '서기 1490년경',
      emoji: '🎨',
      job: '화가의 조수',
      story: '당신은 피렌체의 한 위대한 화가 밑에서 그림을 배우던 열정 넘치는 조수였습니다. 물감을 갈고 캔버스를 준비하면서 거장의 기법을 눈으로 익혔죠. 어느 날 스승이 잠시 자리를 비운 사이 몰래 그린 초상화가 후원자의 눈에 띄어 독립할 기회를 얻었습니다. 예술과 과학이 꽃피던 시대의 열기 속에서 당신의 재능도 함께 피어났습니다.',
      connection: '전생에서 체득한 창의적 에너지가 현생에도 이어져, 무언가를 창작하거나 아이디어를 내는 일에서 남다른 역량을 발휘합니다. 미적 감각이 뛰어나고, 배움에 대한 열정이 강한 것도 르네상스 시절의 영향입니다.',
      lucky: '행운의 아이템: 스케치북 / 행운의 색: 카민 레드 / 행운의 숫자: 6'
    },
    {
      era: '조선 전기',
      period: '서기 1450년경',
      emoji: '🎵',
      job: '궁중 악사',
      story: '당신은 경복궁에서 가야금을 연주하던 궁중 악사였습니다. 왕의 잔치에서 연주할 때면 모든 이의 마음을 울리는 선율을 만들어냈고, 새벽녘 홀로 연습할 때가 가장 행복했습니다. 음악으로 사람들의 마음을 어루만지는 것이 사명이라 믿었죠. 당신이 작곡한 곡 하나는 여러 세대에 걸쳐 전해져 궁중 의례에 사용되었습니다.',
      connection: '전생에서 음악과 함께했던 영혼이라 현생에서도 음악에 깊이 감동하는 편입니다. 리듬감이 좋거나 특정 음악에 이유 없이 눈물이 나는 경험이 있다면, 그것은 전생의 악사가 남긴 감성의 울림입니다.',
      lucky: '행운의 아이템: 이어폰 / 행운의 색: 곤색 / 행운의 숫자: 2'
    },
    {
      era: '대항해시대',
      period: '서기 1520년경',
      emoji: '🚢',
      job: '탐험가',
      story: '당신은 대항해시대의 용감한 탐험가로, 미지의 대륙을 향해 돛을 올렸습니다. 폭풍우를 뚫고 수개월간 항해한 끝에 아무도 가보지 못한 섬을 발견했을 때의 전율은 그 무엇과도 비할 수 없었죠. 새로운 동식물을 기록하고 원주민들과 교류하며 세계의 넓이를 몸소 체험했습니다. 위험을 무릅쓰고 나아가는 용기가 당신의 가장 큰 무기였습니다.',
      connection: '전생의 개척 정신이 현생에서 새로운 분야에 도전하거나 남들이 가지 않은 길을 선택하는 대담함으로 나타납니다. 미지에 대한 호기심이 강하고, 안정보다는 성장과 경험을 중시하는 가치관이 탐험가 시절의 유산입니다.',
      lucky: '행운의 아이템: 세계 지도 / 행운의 색: 오션 블루 / 행운의 숫자: 11'
    },
    {
      era: '에도시대 일본',
      period: '서기 1600년경',
      emoji: '🥷',
      job: '닌자',
      story: '당신은 에도시대 그림자 속에서 활동하던 닌자였습니다. 놀라운 신체 능력과 지략으로 불가능해 보이는 임무를 수행했고, 어둠 속에서도 길을 찾는 특별한 능력이 있었죠. 표면적으로는 평범한 농부로 살면서 비밀 임무를 수행하는 이중생활을 했습니다. 가장 중요하게 여긴 가치는 주어진 임무에 대한 완벽한 수행과 동료에 대한 의리였습니다.',
      connection: '전생에서 닌자였던 당신은 현생에서도 상황 파악이 빠르고 적응력이 뛰어납니다. 조용히 관찰하다가 결정적 순간에 행동하는 스타일이며, 신뢰할 수 있는 소수의 사람에게 깊은 의리를 보여줍니다.',
      lucky: '행운의 아이템: 검은색 마스크 / 행운의 색: 미드나잇 블랙 / 행운의 숫자: 13'
    },
    {
      era: '조선 후기',
      period: '서기 1780년경',
      emoji: '📚',
      job: '서당 훈장',
      story: '당신은 조선 후기 마을 서당에서 아이들을 가르치던 훈장이었습니다. 천자문부터 사서삼경까지, 아이들이 글의 참뜻을 이해할 때 느끼는 보람이 세상 그 무엇보다 컸죠. 가난하지만 학식 높은 선비로 존경받았고, 제자들 중 여럿이 과거에 급제하여 당신의 이름을 빛냈습니다. 늘 "배움에는 끝이 없다"는 말을 좌우명으로 삼았습니다.',
      connection: '전생에서 가르침을 통해 보람을 느꼈던 당신은, 현생에서도 누군가에게 설명하거나 알려주는 것을 자연스럽게 잘합니다. 지식에 대한 갈증이 강하고, 배우는 것 자체를 즐기는 성향이 서당 훈장 시절의 영향입니다.',
      lucky: '행운의 아이템: 볼펜 / 행운의 색: 먹색 / 행운의 숫자: 3'
    },
    {
      era: '프랑스 혁명기',
      period: '서기 1789년경',
      emoji: '🥖',
      job: '빵집 주인',
      story: '당신은 파리 뒷골목에서 작은 빵집을 운영하던 주인이었습니다. 혁명의 소용돌이 속에서도 매일 새벽 반죽을 치대며 이웃에게 따뜻한 빵을 제공했죠. 배고픈 시민들에게 몰래 빵을 나눠주는 의리 있는 사람이었고, 빵집은 혁명가들의 비밀 모임 장소이기도 했습니다. 격동의 시대에 당신의 빵 한 조각이 누군가에게는 희망이었습니다.',
      connection: '전생에서 나눔을 실천했던 당신은, 현생에서도 사람들을 먹이고 돌보는 것에서 기쁨을 느낍니다. 정의감이 강하고 약자에 대한 공감 능력이 뛰어나며, 음식과 관련된 활동에서 특별한 행복을 느끼는 것이 빵집 주인 시절의 흔적입니다.',
      lucky: '행운의 아이템: 빵 모양 소품 / 행운의 색: 밀색(웜 베이지) / 행운의 숫자: 14'
    },
    {
      era: '빅토리아 시대',
      period: '서기 1870년경',
      emoji: '⚙️',
      job: '발명가',
      story: '당신은 런던 다락방 작업실에서 밤새 설계도를 그리던 발명가였습니다. 증기기관의 시대에 더 효율적인 기계를 만들겠다는 꿈을 품고, 수십 번의 실패 끝에 마침내 특허를 따냈죠. 세상이 알아주지 않아도 묵묵히 연구에 몰두했고, 당신의 발명품 하나가 공장의 생산성을 크게 높였습니다. "실패는 성공의 어머니"를 온몸으로 증명한 삶이었습니다.',
      connection: '전생의 발명가 기질이 현생에서 문제 해결 능력과 창의적 사고로 이어졌습니다. 어떤 문제든 독창적인 해결책을 찾으려 하고, 실패에 좌절하지 않는 회복력이 당신의 큰 강점입니다.',
      lucky: '행운의 아이템: 톱니바퀴 장식 / 행운의 색: 코퍼(구리색) / 행운의 숫자: 10'
    },
    {
      era: '서부 개척시대',
      period: '서기 1860년경',
      emoji: '🤠',
      job: '카우보이',
      story: '당신은 미국 서부의 광활한 대평원을 말을 타고 달리던 카우보이였습니다. 수백 마리의 소떼를 몰고 긴 여정을 떠나는 것이 일상이었고, 별 가득한 하늘 아래 모닥불 옆에서 기타를 치며 노래 부르는 밤이 가장 행복했죠. 자유를 사랑하고 약속은 반드시 지키는 사람으로, 동료들의 깊은 신뢰를 받았습니다. 넓은 하늘 아래 거침없이 달리던 그 자유로움을 영혼이 기억합니다.',
      connection: '전생에서 자유로운 삶을 살았던 당신은, 현생에서도 속박을 싫어하고 자유로운 환경에서 최고의 능력을 발휘합니다. 넓은 공간이나 야외 활동에 끌리며, 약속과 의리를 중시하는 성격이 카우보이 시절의 유산입니다.',
      lucky: '행운의 아이템: 가죽 벨트 / 행운의 색: 샌드 브라운 / 행운의 숫자: 15'
    },
    {
      era: '조선말',
      period: '서기 1900년경',
      emoji: '🗡️',
      job: '의병장',
      story: '당신은 나라를 지키기 위해 일어선 용감한 의병장이었습니다. 평범한 서생이었지만 나라가 위기에 처하자 붓을 내려놓고 칼을 들었죠. 산속에서 동지들과 함께 훈련하며 독립의 그날을 꿈꿨고, 위험한 작전에도 항상 앞장섰습니다. 당신의 용기와 희생정신은 마을 사람들에게 큰 희망이 되었고, 그 정신은 다음 세대로 이어졌습니다.',
      connection: '전생에서 대의를 위해 싸웠던 당신은, 현생에서도 불의를 보면 참지 못하는 정의로운 성격입니다. 리더십이 있고 어려운 결정을 내리는 데 주저하지 않으며, 공동체를 위해 기꺼이 희생하는 마음이 의병장 시절의 영혼에서 비롯됩니다.',
      lucky: '행운의 아이템: 태극기 배지 / 행운의 색: 무궁화 핑크 / 행운의 숫자: 17'
    },
    {
      era: '1920년대 미국',
      period: '서기 1925년경',
      emoji: '🎷',
      job: '재즈 뮤지션',
      story: '당신은 뉴올리언스의 연기 자욱한 재즈 클럽에서 색소폰을 불던 뮤지션이었습니다. 즉흥 연주의 달인으로, 매 공연마다 다른 멜로디로 관객을 매료시켰죠. 금주법 시대에 비밀 술집에서 연주하며 사람들에게 삶의 활력을 불어넣었습니다. 음악은 인종과 계급을 초월한다는 신념으로 누구에게나 열린 무대를 만들었던 당신이었습니다.',
      connection: '전생의 자유로운 예술혼이 현생에서도 살아 있어, 틀에 박힌 것을 싫어하고 자신만의 방식을 추구합니다. 즉흥적이면서도 매력적인 성격, 그리고 사람들을 하나로 모으는 에너지가 재즈 뮤지션 시절의 유산입니다.',
      lucky: '행운의 아이템: 레코드판 / 행운의 색: 미드나잇 퍼플 / 행운의 숫자: 22'
    },
    {
      era: '고대 마야 문명',
      period: '기원전 300년경',
      emoji: '🌟',
      job: '천문학자',
      story: '당신은 고대 마야의 피라미드 꼭대기에서 별을 관측하던 천문학자였습니다. 정교한 달력을 만들어 농사 시기와 축제일을 정했고, 일식과 월식을 예측하여 사람들에게 경이로움을 선사했죠. 밤하늘의 별 하나하나에 이름을 붙이며 우주의 질서를 이해하려 했습니다. 당신이 만든 천문 기록은 놀라운 정확도로 후대 학자들을 감탄하게 만들었습니다.',
      connection: '전생에서 우주를 탐구했던 당신은, 현생에서도 밤하늘이나 우주에 관한 이야기에 특별히 끌립니다. 패턴을 발견하고 규칙성을 파악하는 능력이 뛰어나며, 큰 그림을 보는 시야가 천문학자 시절의 영향입니다.',
      lucky: '행운의 아이템: 별 모양 액세서리 / 행운의 색: 인디고 블루 / 행운의 숫자: 12'
    },
    {
      era: '몽골 제국',
      period: '서기 1230년경',
      emoji: '🏇',
      job: '기마 전령',
      story: '당신은 칭기즈칸의 광대한 제국을 누비던 기마 전령이었습니다. 몽골 초원의 바람을 가르며 수천 리를 달려 중요한 소식을 전했고, 말과 혼연일체가 되어 어떤 지형도 넘을 수 있었죠. 속도와 정확성이 생명인 임무에서 한 번도 실패한 적이 없었으며, 제국의 동쪽 끝에서 서쪽 끝까지 당신의 이름은 신뢰의 상징이었습니다.',
      connection: '전생에서 빠르고 정확하게 움직였던 당신은, 현생에서도 실행력이 뛰어나고 결단이 빠릅니다. 목표를 정하면 최단 경로로 달려가는 추진력과, 책임감 있게 맡은 일을 완수하는 성향이 기마 전령 시절의 유산입니다.',
      lucky: '행운의 아이템: 말 모양 키링 / 행운의 색: 스카이 블루 / 행운의 숫자: 19'
    },
    {
      era: '무굴 제국',
      period: '서기 1600년경',
      emoji: '🧂',
      job: '향신료 상인',
      story: '당신은 실크로드를 오가며 귀한 향신료를 거래하던 상인이었습니다. 사프란, 계피, 카다몬 같은 향신료의 향기를 맡는 것만으로 산지를 구별할 수 있었죠. 뛰어난 협상 능력으로 동서양의 상인들과 두루 친분을 쌓았고, 정직한 거래로 명성을 쌓았습니다. 다양한 문화를 이해하고 존중하는 태도가 성공의 비결이었습니다.',
      connection: '전생에서 다양한 문화를 접했던 당신은, 현생에서도 다른 문화나 새로운 음식에 대한 호기심이 강합니다. 사교성이 뛰어나고 협상이나 설득에 능하며, 사람 사이의 관계를 중요시하는 성격이 상인 시절의 유산입니다.',
      lucky: '행운의 아이템: 향수 / 행운의 색: 사프란 옐로우 / 행운의 숫자: 16'
    },
    {
      era: '아즈텍 문명',
      period: '서기 1400년경',
      emoji: '🌺',
      job: '꽃의 시인',
      story: '당신은 아즈텍 제국에서 "꽃과 노래(flower and song)"의 전통을 이어가던 시인이었습니다. 테노치티틀란의 수상 정원에서 영감을 받아 삶의 아름다움과 덧없음을 노래했죠. 전사들조차 당신의 시 앞에서 눈물을 흘렸고, 축제 때 당신의 낭송은 하이라이트였습니다. "꽃처럼 아름다운 순간은 영원하지 않기에 더욱 소중하다"는 것이 당신의 인생관이었습니다.',
      connection: '전생에서 아름다움의 가치를 알았던 당신은, 현생에서도 순간의 소중함을 잘 알고 감성이 풍부합니다. 현재를 즐기는 능력과 아름다운 것에 깊이 감동하는 마음, 그리고 표현력이 꽃의 시인 시절의 영향입니다.',
      lucky: '행운의 아이템: 꽃 한 송이 / 행운의 색: 코랄 핑크 / 행운의 숫자: 20'
    },
    {
      era: '삼국시대 한반도',
      period: '서기 500년경',
      emoji: '🔨',
      job: '대장장이',
      story: '당신은 삼국시대 신라의 뛰어난 대장장이로, 불꽃 속에서 최고의 무기와 농기구를 만들었습니다. 뜨거운 쇳물을 다루는 기술이 타의 추종을 불허했고, 당신이 만든 검은 전장에서 부러지지 않는 것으로 유명했죠. 화랑도의 검을 만들어 달라는 특별 의뢰도 받았으며, 장인 정신에 대한 자부심이 대단했습니다. 담금질의 타이밍을 완벽하게 맞추는 감각은 천부적인 재능이었습니다.',
      connection: '전생에서 불과 철을 다루며 강인함을 기른 당신은, 현생에서도 인내력과 집중력이 뛰어납니다. 어떤 일이든 끝까지 매달려 완성하는 근성과, 품질에 대한 높은 기준을 가진 성격이 대장장이 시절의 유산입니다.',
      lucky: '행운의 아이템: 금속 반지 / 행운의 색: 불꽃 오렌지 / 행운의 숫자: 21'
    },
    {
      era: '오스만 제국',
      period: '서기 1550년경',
      emoji: '🛁',
      job: '하맘(목욕탕) 관리인',
      story: '당신은 이스탄불의 장엄한 하맘을 관리하던 관리인이었습니다. 대리석으로 장식된 목욕탕은 술탄부터 서민까지 모두가 찾는 소통의 공간이었죠. 완벽한 온도의 물과 향기로운 비누를 준비하며 손님들에게 최고의 휴식을 제공했습니다. 하맘에서 오가는 소문과 이야기를 들으며 도시의 모든 소식을 알고 있었지만, 비밀은 절대 누설하지 않는 신의의 사람이었습니다.',
      connection: '전생에서 사람들의 휴식과 편안함을 책임졌던 당신은, 현생에서도 주변 분위기를 편안하게 만드는 재주가 있습니다. 비밀을 잘 지키고 신뢰감을 주는 성격이며, 사람들이 자연스럽게 고민을 털어놓는 존재가 되는 것이 하맘 관리인 시절의 유산입니다.',
      lucky: '행운의 아이템: 아로마 오일 / 행운의 색: 터키 블루 / 행운의 숫자: 18'
    },
    {
      era: '잉카 제국',
      period: '서기 1450년경',
      emoji: '🧶',
      job: '직물 장인',
      story: '당신은 안데스 산맥 높은 곳에서 신비로운 패턴의 직물을 짜던 잉카의 장인이었습니다. 알파카 털로 만든 화려한 직물은 제국의 귀족들이 앞다투어 찾았고, 각 무늬에는 우주와 자연의 이야기가 담겨 있었죠. 색실 하나하나에 의미를 부여하며 직물에 제국의 역사를 기록했습니다. 높은 산에서 바라보는 일출과 함께 시작하는 하루가 당신에게는 최고의 영감이었습니다.',
      connection: '전생에서 패턴과 색채를 다루었던 당신은, 현생에서도 시각적인 아름다움에 민감하고 디자인 감각이 뛰어납니다. 꼼꼼하게 계획을 세우고 하나하나 실행하는 성격과, 결과물에 자신만의 이야기를 담으려는 성향이 직물 장인 시절의 유산입니다.',
      lucky: '행운의 아이템: 패턴 스카프 / 행운의 색: 선셋 오렌지 / 행운의 숫자: 24'
    },
    {
      era: '고대 메소포타미아',
      period: '기원전 2000년경',
      emoji: '📋',
      job: '점토판 기록관',
      story: '당신은 인류 최초의 문명 수메르에서 쐐기문자를 점토판에 새기던 기록관이었습니다. 곡물 거래 기록부터 영웅 서사시까지, 당신의 손끝에서 인류의 지식이 형태를 갖추었죠. 길가메시의 모험담을 기록할 때는 밤을 새우며 이야기에 빠져들기도 했습니다. 수천 년 후 발굴될 점토판을 상상하지 못했겠지만, 당신의 기록 덕분에 인류는 가장 오래된 이야기를 되찾을 수 있었습니다.',
      connection: '전생에서 기록의 힘을 알았던 당신은, 현생에서도 정보를 체계적으로 정리하고 보관하는 데 탁월합니다. 기록하고 아카이빙하는 습관과, 이야기나 데이터에 대한 관심이 점토판 기록관 시절에서 비롯된 것입니다.',
      lucky: '행운의 아이템: 다이어리 / 행운의 색: 테라코타 / 행운의 숫자: 25'
    }
  ];
}

// =====================
// 수비학 알고리즘
// =====================
function calculatePastLifeIndex(year, month, day) {
  // YYYYMMDD 문자열의 모든 숫자를 한 자릿수가 될 때까지 합산
  var dateStr = String(year) + String(month).padStart(2, '0') + String(day).padStart(2, '0');
  var sum = 0;
  for (var i = 0; i < dateStr.length; i++) {
    sum += parseInt(dateStr[i], 10);
  }
  while (sum >= 10) {
    var newSum = 0;
    var s = String(sum);
    for (var j = 0; j < s.length; j++) {
      newSum += parseInt(s[j], 10);
    }
    sum = newSum;
  }
  // sum: 1~9, month: 1~12
  var singleDigit = sum; // 1-9
  var monthMod = month % 3; // 0, 1, 2
  var index = (singleDigit - 1) * 3 + monthMod; // 0~26
  if (index > 24) {
    index = 24;
  }
  return index;
}

// =====================
// 날짜 입력 로직
// =====================
var birthYearInput = document.getElementById('birthYear');
var birthMonthSelect = document.getElementById('birthMonth');
var birthDaySelect = document.getElementById('birthDay');
var analyzeBtn = document.getElementById('analyzeBtn');

function getDaysInMonth(month, year) {
  if (!month) return 31;
  var y = year || 2000;
  return new Date(y, month, 0).getDate();
}

function populateDays() {
  var month = parseInt(birthMonthSelect.value, 10);
  var year = parseInt(birthYearInput.value, 10) || 2000;
  var daysInMonth = getDaysInMonth(month, year);
  var currentDay = birthDaySelect.value;

  // 기존 옵션 제거 (첫 번째 '선택' 옵션 제외)
  while (birthDaySelect.options.length > 1) {
    birthDaySelect.remove(1);
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var option = document.createElement('option');
    option.value = d;
    option.textContent = d + t('common_day_suffix');
    birthDaySelect.appendChild(option);
  }

  // 이전 선택값 복원 (유효한 경우)
  if (currentDay && parseInt(currentDay, 10) <= daysInMonth) {
    birthDaySelect.value = currentDay;
  } else if (currentDay) {
    birthDaySelect.value = '';
  }

  validateInputs();
}

function validateInputs() {
  var year = birthYearInput.value.trim();
  var month = birthMonthSelect.value;
  var day = birthDaySelect.value;
  var yearNum = parseInt(year, 10);

  var isValid = year !== '' &&
                month !== '' &&
                day !== '' &&
                yearNum >= 1920 &&
                yearNum <= 2025;

  analyzeBtn.disabled = !isValid;
}

birthMonthSelect.addEventListener('change', function() {
  populateDays();
});

birthYearInput.addEventListener('input', function() {
  if (birthMonthSelect.value) {
    populateDays();
  }
  validateInputs();
});

birthDaySelect.addEventListener('change', function() {
  validateInputs();
});

// 초기 일 목록 (기본 31일)
populateDays();

// =====================
// 분석 실행
// =====================
var inputSection = document.getElementById('inputSection');
var loadingSection = document.getElementById('loadingSection');
var resultSection = document.getElementById('resultSection');
var retryBtn = document.getElementById('retryBtn');

analyzeBtn.addEventListener('click', function() {
  var year = parseInt(birthYearInput.value, 10);
  var month = parseInt(birthMonthSelect.value, 10);
  var day = parseInt(birthDaySelect.value, 10);

  // 입력 숨기고 로딩 표시
  inputSection.hidden = true;
  loadingSection.hidden = false;
  resultSection.hidden = true;

  // 1.5초 후 결과 표시
  setTimeout(function() {
    var index = calculatePastLifeIndex(year, month, day);
    var life = getPAST_LIVES()[index];

    document.getElementById('resultEra').textContent = life.era;
    document.getElementById('resultEmoji').textContent = life.emoji;
    document.getElementById('resultJob').textContent = life.job;
    document.getElementById('resultPeriod').textContent = life.period;
    document.getElementById('resultStory').textContent = life.story;
    document.getElementById('resultConnection').textContent = life.connection;
    document.getElementById('resultLucky').textContent = life.lucky;

    loadingSection.hidden = true;
    resultSection.hidden = false;
  }, 1500);
});

// =====================
// 다시 테스트
// =====================
retryBtn.addEventListener('click', function() {
  resultSection.hidden = true;
  inputSection.hidden = false;

  // 입력 초기화
  birthYearInput.value = '';
  birthMonthSelect.value = '';
  birthDaySelect.value = '';
  analyzeBtn.disabled = true;

  // 일 목록 리셋
  while (birthDaySelect.options.length > 1) {
    birthDaySelect.remove(1);
  }
  populateDays();

  // 페이지 맨 위로
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
