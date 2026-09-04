/**
 * Bharat Quest - States & Traditional Games Cultural Dataset
 * Structured data separating UI from Game Lore and Rules.
 */

export const STATES_DATA = {
  "maharashtra": {
    id: "maharashtra",
    name: "Maharashtra",
    slug: "maharashtra",
    capital: "Mumbai",
    tagline: "Land of Forts, Saints, and Grand Maratha Traditions",
    description: "Maharashtra boasts a storied martial and royal heritage. From the tactical battle-strategy indoor boards cherished in the Peshwa courts to the high-agility outdoor displays at regional fairs and Akhadas, games here cultivate both razor-sharp intellect and formidable physical stamina.",
    culturalHighlight: "Chhatrapati Shivaji Maharaj and subsequent Maratha rulers patronized indigenous sports, integrating games like Mallakhamb and tactical boards into martial training.",
    indoorGames: [
      {
        id: "chaupar",
        name: "Chaupar",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 100,
        starsReward: 10,
        coinReward: 25,
        tagline: "The Ancient Cross-and-Circle Board of Kings",
        shortDescription: "A game of destiny and tactical calculation where players maneuver pawns around a cross board using cowrie shell throws.",
        origin: "Ancient India (c. 6th century BCE), celebrated in the Mahabharata and classical Sanskrit texts.",
        history: "Chaupar (also known as Chausar) is an indigenous race board game that flourished across Indian royal courts for millennia. In Maharashtra, royal households in Pune and Kolhapur kept embroidered velvet Chaupar boards with lacquered wooden pawns.",
        culturalSignificance: "Symbolizes the interplay between fate (the natural throw of cowrie shells) and conscious human strategy (pawn navigation). It was considered a royal pastime embodying statecraft, patience, and valor.",
        players: "2 to 4 Players (or 1 Player vs Ancient Sage AI)",
        ageGroup: "8+ Years",
        equipment: ["Cross-shaped cloth/felt board (4 arms with 3 columns of 8 squares)", "6 Natural Cowrie Shells (Kaudis)", "16 Wooden Pawns (4 per color: Red, Yellow, Green, Black)"],
        rules: [
          "Six cowrie shells serve as dice. Their orientations (mouth-up vs mouth-down) determine the movement value.",
          "Scoring: 2 mouth-up = 2 steps; 3 mouth-up = 3; 4 mouth-up = 4; 5 mouth-up = 25 (Pachis); 6 mouth-up = 35; 1 mouth-up = 10; all mouth-down = 6 steps.",
          "Pawns enter the outer track and move counter-clockwise around the arms.",
          "Squares marked with a cross (X) are sanctuaries ('Charkoni' safe havens) where pieces cannot be captured.",
          "Landing on an unprotected opposing pawn captures it and sends it back to the starting camp!",
          "To complete the quest, all pawns must navigate into their home central channel and land exactly in the central sanctuary (Charkoni)."
        ],
        howToPlay: "1. Click 'Roll Cowries' to throw the six natural shells.\n2. Observe the resulting movement value.\n3. Click on one of your active pawns to advance it along the path.\n4. Take tactical refuge on cross safe squares or aggressively capture computer pieces.\n5. Guide all 4 pawns into the central Charkoni to claim victory and earn Points, Stars, and Coins!"
      },
      {
        id: "saripat",
        name: "Saripat",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 150,
        starsReward: 15,
        coinReward: 30,
        tagline: "The Maratha Board of Royal Strategy",
        shortDescription: "A strategic race and capture board game documented in medieval Marathi literature and court archives.",
        origin: "Deccan Plateau, Maharashtra (Medieval era).",
        history: "Saripat held a revered place in medieval Maharashtrian culture. It is referenced in the Bhavartha Deepika (Dnyaneshwari) by Sant Dnyaneshwar (1290 CE) as a metaphor for worldly life and destiny. The Peshwa archives in Pune document handcrafted Saripat game cloths presented as royal honors.",
        culturalSignificance: "Unlike games of pure luck, Saripat emphasizes defensive blockades, geometric positioning, and risk calculation, reflecting the guerilla strategies (Ganimi Kawa) favored in the Deccan.",
        players: "2 Players (or Player vs Peshwa AI)",
        ageGroup: "10+ Years",
        equipment: ["Checkered game cloth with central winning haven", "Cowrie shell throwers", "Hand-carved Maratha style wooden soldiers"],
        rules: [
          "Pieces start in defensive flank camps.",
          "Cowrie roll values allow pieces to enter the inner corridor.",
          "Forming a 'Jodi' (pair of pawns on the same square) protects pieces from single attacks.",
          "Pieces can capture solitary opponent pieces to delay their march.",
          "The first player to successfully maneuver all pieces into the central sanctuary wins."
        ],
        howToPlay: "1. Roll the cowries to initiate your turn.\n2. Move your vanguard pawns from base into the playing track.\n3. Pair your pieces for defensive immunity.\n4. Capture lone opponent pieces whenever tactical openings appear.\n5. March into the central court to complete the match!"
      },
      {
        id: "satkoli",
        name: "Satkoli",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "indoor",
        playable: true,
        unlockCost: 200, // Locked! Unlocked using 200 earned Coins!
        pointsReward: 200,
        starsReward: 20,
        coinReward: 50,
        tagline: "The Sacred Seven-Concentric Race of Champions",
        shortDescription: "An advanced multi-track race game played with 7 cowrie shells, unlocked with 200 Coins.",
        origin: "Western India & Maharashtra rural heartlands.",
        history: "Satkoli is an ancient game played on a 7x7 concentric square grid using seven cowries. Traditionally drawn on stone temple floors, rural courtyards, or embroidered onto heirloom cotton mats.",
        culturalSignificance: "Often played during post-harvest celebrations and the monsoon month of Shravan, Satkoli represents the soul's journey through seven astral planes toward enlightenment.",
        players: "2 Players (Player vs Grandmaster AI)",
        ageGroup: "10+ Years",
        equipment: ["7x7 concentric square board with cross checkpoints", "7 Natural Cowrie Shells", "4 Distinctive Marker Pawns per player"],
        rules: [
          "Locked by default: Requires 200 Coins earned from indoor gameplay to unlock.",
          "Rolled with 7 cowrie shells. Mouth-up shells determine movement (from 1 to 7 steps, or special bonus moves).",
          "Pawns start on the outer perimeter, spiral counter-clockwise, and transition to the inner circle only after executing at least one capture.",
          "The innermost central square is the sacred citadel of triumph."
        ],
        howToPlay: "1. Unlock this game using your accumulated 200 Coins.\n2. Roll all 7 cowrie shells.\n3. Navigate outer concentric tracks.\n4. Secure an opponent capture to open the inner gateway.\n5. Reach the central sanctum to claim the highest honor!"
      }
    ],
    outdoorGames: [
      {
        id: "langdi",
        name: "Langdi",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "outdoor",
        playable: false,
        tagline: "The Traditional One-Legged Agility Sport",
        shortDescription: "A high-intensity outdoor team sport where an attacker hops on one foot to tag and dismiss defenders.",
        origin: "Maharashtra rural heartland, organized in the early 20th century.",
        history: "Langdi evolved as a popular folk athletic pursuit in Maharashtra schools and gymnasiums. In 1935, the Hanuman Vyayam Prasarak Mandal (HVPM) of Amravati codified standardized rules, which later led to the establishment of the Langdi Federation of India.",
        culturalSignificance: "Promotes cardiovascular endurance, core balance, unilateral muscular strength, and swift dodging reflexes among rural and urban youth alike.",
        players: "Two teams of 12 players each (9 players on court per inning)",
        ageGroup: "All ages (Popular in schools and colleges)",
        equipment: ["Marked clay or turf field (10m x 10m to 12m x 12m)", "Boundary lines marked with limestone/chalk", "Stopwatch & Whistle"],
        rules: [
          "Match consists of four quarters of 9 minutes each, with breaks between turns.",
          "The chasing team sends one 'chaser' who must continuously hop on one foot throughout their attack turn.",
          "If the chaser touches the ground with their raised foot, they are immediately disqualified from that turn.",
          "Defenders dodge within the boundary; stepping outside counts as an out.",
          "The team that tags the highest number of defenders across the innings wins."
        ],
        howTraditionallyPlayed: "In villages and school playgrounds, a square is sketched in dry mud with sticks. Children choose 'heads or tails' with a pebble, divide into teams, and take turns hopping and dodging amidst energetic cheering.",
        facts: [
          "Langdi was demonstrated at national sports carnivals as an indigenous fitness paradigm.",
          "It builds exceptional calf, ankle, and quadricep endurance.",
          "Officially recognized by the Indian Olympic Association (IOA) affiliate state units."
        ]
      },
      {
        id: "mallakhamb",
        name: "Mallakhamb",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "outdoor",
        playable: false,
        tagline: "The Ancient Pole Acrobatics & Martial Discipline",
        shortDescription: "A breathtaking gymnastics tradition on a vertical polished teak pole smeared with castor oil.",
        origin: "Maharashtra (Earliest references in 12th-century Manasollasa; revived in 19th-century Pune).",
        history: "Balambhatta Dada Deodhar, the legendary fitness guru of Peshwa Baji Rao II, revived Mallakhamb in Pune to prepare Maratha warriors against colonial forces. Deodhar modeled movements on monkey acrobatics to cultivate supreme upper-body power.",
        culturalSignificance: "Mallakhamb is revered as the mother of ancient Indian physical culture, integrating yoga postures (asanas), wrestling grips, and aerial balance into one fluid art.",
        players: "Individual acrobats or synchronized squads",
        ageGroup: "8 Years to Adults",
        equipment: ["Polished Sheesham or Teak wood pole (2.6 meters high)", "Pure Castor Oil (applied to reduce skin friction and blistering)", "Hanging rope variant (Rope Mallakhamb)"],
        rules: [
          "Performers execute complex inversions, twists, and static holds within 90-120 seconds.",
          "Judged on landing precision, posture alignment, speed of transition, and artistic balance.",
          "Must perform designated mounts (Udi), holds (Aasan), and dismounts (Utrane)."
        ],
        howTraditionallyPlayed: "Erected in the center of traditional Akhadas (mud wrestling arenas), young wrestlers climb, twist, and hang upside down at dawn to warm up before wrestling bouts.",
        facts: [
          "Declared the State Sport of Madhya Pradesh and widely recognized across international gymnastics circuits.",
          "The word Mallakhamb derives from 'Malla' (gymnast/wrestler) and 'Khamb' (pole).",
          "A World Mallakhamb Championship is now held with participants from over 15 nations."
        ]
      },
      {
        id: "lezim",
        name: "Lezim",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "outdoor",
        playable: false,
        tagline: "The Rhythmic Martial Dance & Folk Aerobics",
        shortDescription: "A dynamic group fitness and folk rhythm tradition utilizing small wooden staffs with jingling metal discs.",
        origin: "Maharashtra rural villages and Maratha regiments.",
        history: "Lezim originated as a rhythmic drill for Maratha soldiers to maintain synchronized cadence, flexibility, and group cohesion. It evolved into a major highlight of public festivals like Ganesh Utsav.",
        culturalSignificance: "Unites music, martial fitness, and community spirit. It is an enduring emblem of Maharashtrian cultural celebrations.",
        players: "Groups of 20 to 100+ dancers in symmetrical lines or circles",
        ageGroup: "All ages",
        equipment: ["Lezim prop (wooden handle, iron chain, and brass jingles/cymbals)", "Dhol (traditional bass drum)", "Tasha (snare kettle drum)"],
        rules: [
          "Performers move in synchronized patterns: four-count (Chaar Awaaz), eight-count (Aath Awaaz), and hopping steps.",
          "Requires deep knee bends, side lunges, and overhead staff stretches executed in exact harmony with drum tempos."
        ],
        howTraditionallyPlayed: "Processions winding through towns on Shiv Jayanti and Ganesh Visarjan are led by colorful Lezim troupes clad in traditional dhoti-kurta and pheta (turbans), moving in thunderous rhythmic waves.",
        facts: [
          "Lezim movements mimic sword parries and shield blocks from ancient Maratha warfare.",
          "It provides an intense full-body aerobic and core workout."
        ]
      },
      {
        id: "lagori",
        name: "Lagori (Pitthu / Seven Stones)",
        state: "Maharashtra",
        stateSlug: "maharashtra",
        category: "outdoor",
        playable: false,
        tagline: "The Thrilling Game of Seven Stones & Team Precision",
        shortDescription: "A beloved game of precision throwing and quick rebuilding of a seven-stone tower under friendly fire.",
        origin: "Ancient India (dating back over 5,000 years, noted in the Bhagavata Purana).",
        history: "Played across India for millennia, Lagori is known as Pitthu in the north and Lingorcha in rural Maharashtra. Ancient texts describe Lord Krishna playing a version of Lagori with his cowherd friends in Gokul.",
        culturalSignificance: "Celebrates spontaneous neighbourhood camaraderie, teamwork under pressure, and lightning-quick agility with minimal equipment.",
        players: "Two teams of 6 to 10 players each (Seekers vs Hitters)",
        ageGroup: "All ages",
        equipment: ["7 Flat stones or smooth wooden discs stacked in decreasing order", "A soft rubber or tennis ball"],
        rules: [
          "A player from Team A throws the ball to topple the stone pyramid from a distance.",
          "If the tower collapses, Team A players must rebuild the 7-stone stack while Team B fields the ball and tries to hit ('tag') Team A players below the knees.",
          "If Team A successfully restores the pyramid and shouts 'Lagori!', they score 1 point.",
          "If Team B tags all Team A players with the ball before the tower is built, the turn ends."
        ],
        howTraditionallyPlayed: "Children gather in open lanes or playgrounds at sunset. Seven flat slate stones from nearby riverbeds or construction sites are stacked, and laughter rings out as players scramble to rebuild the stack while dodging bouncing tennis balls.",
        facts: [
          "Lagori has inspired national and international leagues with standardized safety balls and marked courts.",
          "It sharpens 360-degree spatial awareness and hand-eye coordination."
        ]
      }
    ]
  },
  "rajasthan": {
    id: "rajasthan",
    name: "Rajasthan",
    slug: "rajasthan",
    capital: "Jaipur",
    tagline: "Royal Palaces, Desert Valour, and Timeless Pastimes",
    description: "In the royal courts of Jaipur, Udaipur, and Jodhpur, games were an art of aristocracy and strategy, while energetic village pastimes thrived in the desert sands.",
    culturalHighlight: "The Maharajas of Rajasthan preserved illuminated game boards made of silk and semi-precious stone pieces.",
    indoorGames: [
      {
        id: "changa",
        name: "Changa (Changa Po)",
        state: "Rajasthan",
        stateSlug: "rajasthan",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 120,
        starsReward: 12,
        coinReward: 25,
        tagline: "The Traditional Royal Desert Race Game",
        shortDescription: "A traditional board game played with 4 cowrie shells on a checkered grid.",
        origin: "Rajasthan royal courtyards.",
        history: "Changa has been played across the desert communities of Marwar and Mewar for centuries during family gatherings.",
        culturalSignificance: "Tests probability calculation and patience among players of all generations.",
        players: "2 to 4 Players",
        ageGroup: "8+ Years",
        equipment: ["Square grid board", "4 Cowrie shells", "4 Colored tokens"],
        rules: ["Players roll 4 cowries and race tokens around the perimeter into the central sanctuary."],
        howToPlay: "Roll cowries, advance tokens, and capture opponent pawns to reach the home square."
      }
    ],
    outdoorGames: [
      {
        id: "gilli-danda",
        name: "Gilli Danda",
        state: "Rajasthan",
        stateSlug: "rajasthan",
        category: "outdoor",
        playable: false,
        tagline: "The Ancient Forefather of Cricket and Baseball",
        shortDescription: "A timeless game of striking a small tapered wooden peg with a longer stick.",
        origin: "Ancient India (c. 2500 BCE).",
        history: "Played across Indian villages for thousands of years, Gilli Danda requires striking a wooden peg into the air and driving it as far as possible.",
        culturalSignificance: "A quintessential symbol of Indian rural childhood.",
        players: "Individual or Team format",
        ageGroup: "8+ Years",
        equipment: ["Danda (long wooden stick)", "Gilli (short wooden peg tapered at both ends)"],
        rules: ["Flick the gilli into the air and strike it hard before it hits the ground; catchers attempt to catch it in mid-air."],
        howTraditionallyPlayed: "Played on dry open grounds and village pastures.",
        facts: ["Believed by historians to be an ancient precursor to cricket."]
      },
      {
        id: "kabaddi",
        name: "Kabaddi",
        state: "Rajasthan",
        stateSlug: "rajasthan",
        category: "outdoor",
        playable: false,
        tagline: "The Ancient Indian Sport of Power and Breath Control",
        shortDescription: "An intense contact sport of raiding the opponent half while continuously chanting 'Kabaddi'.",
        origin: "Ancient India (Vedic era).",
        history: "Mentioned in Indian epics as a discipline to train warriors in single-handed evasion and coordinated team defense.",
        culturalSignificance: "Today India's premier indigenous professional sport, celebrated globally.",
        players: "Two teams of 7 players each",
        ageGroup: "All ages",
        equipment: ["Soft mat or mud court (13m x 10m)"],
        rules: ["A raider crosses into opponent territory on a single breath, tags defenders, and returns safely."],
        howTraditionallyPlayed: "Played in village Akhadas and national indoor stadiums.",
        facts: ["India has won every Kabaddi World Cup title."]
      }
    ]
  },
  "gujarat": {
    id: "gujarat",
    name: "Gujarat",
    slug: "gujarat",
    capital: "Gandhinagar",
    tagline: "Land of Heritage Crafts, Merchant Wisdom, and Vibrant Festivities",
    description: "Gujarat's trading heritage inspired complex mathematical games, while lively community festivals like Navratri feature traditional movement and agility games.",
    culturalHighlight: "Gujarati merchants historically played Chopat to sharpen their calculation skills for commerce.",
    indoorGames: [
      {
        id: "chopat",
        name: "Chopat",
        state: "Gujarat",
        stateSlug: "gujarat",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 110,
        starsReward: 11,
        coinReward: 25,
        tagline: "The Traditional Embroidered Board of Kathiawar",
        shortDescription: "An elaborate version of Chaupar featuring rich Gujarati patchwork and brass dice.",
        origin: "Gujarat & Saurashtra.",
        history: "Chopat was famously woven into matrimonial trousseaus as a symbol of domestic harmony.",
        culturalSignificance: "Emphasizes cooperative calculation and strategic foresight.",
        players: "2 to 4 Players",
        ageGroup: "8+ Years",
        equipment: ["Embroidered cloth board", "6 Cowrie shells or wooden dice", "16 Lacquered pawns"],
        rules: ["Advance pawns along the arms and reach the central house (Ghar)."],
        howToPlay: "Roll dice and guide all pawns through the outer ring into the central haven."
      }
    ],
    outdoorGames: [
      {
        id: "kho-kho",
        name: "Kho-Kho",
        state: "Gujarat",
        stateSlug: "gujarat",
        category: "outdoor",
        playable: false,
        tagline: "The High-Speed Game of Chase and Tag",
        shortDescription: "A thrilling tag sport where seated players jump up to chase dodging defenders.",
        origin: "Maharashtra & Gujarat.",
        history: "Codified in the early 20th century by the Deccan Gymkhana and Gujarat sports societies.",
        culturalSignificance: "Develops rapid acceleration, sudden direction changes, and team communication.",
        players: "Two teams of 12 (9 on court)",
        ageGroup: "All ages",
        equipment: ["Rectangular court with two wooden poles"],
        rules: ["Chasers sit in a line facing alternate directions; defenders run between them."],
        howTraditionallyPlayed: "Played on packed clay grounds with chalk markings.",
        facts: ["Now played in international championships across Asia and Africa."]
      }
    ]
  },
  "karnataka": {
    id: "karnataka",
    name: "Karnataka",
    slug: "karnataka",
    capital: "Bengaluru",
    tagline: "Kingdom of Hoysalas, Mysore Royalty, and Coastal Traditions",
    description: "From the mathematical mancala boards of ancient Deccan to the roaring buffalo sprints of the coastal paddy fields.",
    culturalHighlight: "Wooden Ali Guli Mane boards crafted from rosewood are traditional heirlooms in Karnataka households.",
    indoorGames: [
      {
        id: "ali-guli-mane",
        name: "Ali Guli Mane",
        state: "Karnataka",
        stateSlug: "karnataka",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 130,
        starsReward: 13,
        coinReward: 28,
        tagline: "The Ancient Indian Mancala Board of Sowing and Harvesting",
        shortDescription: "A traditional two-row pit-and-pebble counting game that hones mental arithmetic.",
        origin: "Karnataka and Deccan plateau.",
        history: "Carved into stone steps of ancient temples across Belur, Halebidu, and Hampi.",
        culturalSignificance: "Cultivates mathematical probability, resource management, and fine motor skills.",
        players: "2 Players",
        ageGroup: "6+ Years",
        equipment: ["Wooden board with 14 pits (two rows of 7)", "Tamarind seeds or cowrie shells"],
        rules: ["Players distribute seeds counter-clockwise; capture pits upon matching empty cups."],
        howToPlay: "Pick seeds from a pit, sow one into each subsequent pit, and claim captured reserves."
      }
    ],
    outdoorGames: [
      {
        id: "kambala",
        name: "Kambala",
        state: "Karnataka",
        stateSlug: "karnataka",
        category: "outdoor",
        playable: false,
        tagline: "The Coastal Buffalo Race in Paddy Fields",
        shortDescription: "A traditional annual buffalo race held in wet muddy paddy fields in coastal Karnataka.",
        origin: "Dakshina Kannada and Udupi coastal districts.",
        history: "Originated over a thousand years ago among farming communities as a harvest thanksgiving to the gods for bountiful crops.",
        culturalSignificance: "Celebrates the deep bond between farmers and their livestock with electrifying athletic displays.",
        players: "Buffalo jockey and pair of trained buffaloes",
        ageGroup: "Traditional athletic event",
        equipment: ["Paddy mud track (120-160 meters)", "Special wooden yoke"],
        rules: ["Jockeys sprint behind buffalo pairs; fastest timed run without leaving the track wins."],
        howTraditionallyPlayed: "Held between November and March on weekends across coastal villages.",
        facts: ["Modern laser timers are now used to measure speeds down to milliseconds."]
      }
    ]
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    capital: "Chennai",
    tagline: "Cradle of Dravidian Culture, Sangam Literature, and Martial Mastery",
    description: "Tamil Nadu preserves some of India's oldest recorded games, documented in Sangam literature dating back over 2,000 years.",
    culturalHighlight: "The Chola and Pandya kings fostered Pallanguzhi in palaces and Silambam in warrior garrisons.",
    indoorGames: [
      {
        id: "pallanguzhi",
        name: "Pallanguzhi",
        state: "Tamil Nadu",
        stateSlug: "tamil-nadu",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 130,
        starsReward: 13,
        coinReward: 28,
        tagline: "The Classical Sangam Counting Board",
        shortDescription: "A traditional 14-cup board game testing mental math, resource conservation, and foresight.",
        origin: "Tamil country (Sangam era, 300 BCE).",
        history: "Mentioned in Tamil classical literature as an emblem of patient calculation and family leisure.",
        culturalSignificance: "Fosters rapid addition, subtraction, and strategic planning.",
        players: "2 Players",
        ageGroup: "6+ Years",
        equipment: ["Hand-carved wooden board with 14 cups", "Cowrie shells or Manjadikuru red seeds"],
        rules: ["Distribute seeds; when reaching an empty cup, capture the seeds in the cup directly following."],
        howToPlay: "Sow seeds into pits and strategically clear cups to gather the largest hoard."
      }
    ],
    outdoorGames: [
      {
        id: "silambam",
        name: "Silambam",
        state: "Tamil Nadu",
        stateSlug: "tamil-nadu",
        category: "outdoor",
        playable: false,
        tagline: "The Ancient Martial Art of the Bamboo Staff",
        shortDescription: "An ancient weapon-based martial art utilizing a flexible bamboo staff.",
        origin: "Tamil Nadu (Sangam literature mentions Silambam weapons c. 2nd century BCE).",
        history: "King Veerapandiya Kattabomman's army used Silambam fighters against British troops.",
        culturalSignificance: "Celebrates warrior discipline, swift footwork, and personal defense.",
        players: "Individual demonstration or 1-on-1 sparring",
        ageGroup: "10+ Years",
        equipment: ["Cured bamboo staff (approx. 1.6m)", "Protective padding"],
        rules: ["Points awarded for clean touches on designated target zones while maintaining fluid defensive footwork."],
        howTraditionallyPlayed: "Practiced in traditional Gurukulam and martial schools across Tamil Nadu.",
        facts: ["Silambam staff spins reach speeds over 100 km/h in expert hands."]
      }
    ]
  },
  "punjab": {
    id: "punjab",
    name: "Punjab",
    slug: "punjab",
    capital: "Chandigarh",
    tagline: "Land of Five Rivers, Golden Fields, and Warrior Courage",
    description: "Punjab's culture is steeped in courage, physical vigor, and joyous harvest celebrations like Baisakhi.",
    culturalHighlight: "Traditional Akhadas across rural Punjab have produced world-renowned Pehlwans (wrestlers) for centuries.",
    indoorGames: [],
    outdoorGames: [
      {
        id: "kushti",
        name: "Kushti (Mud Wrestling)",
        state: "Punjab",
        stateSlug: "punjab",
        category: "outdoor",
        playable: false,
        tagline: "The Ancient Indian Mud Wrestling Tradition",
        shortDescription: "A revered martial discipline conducted in an earthen ring enriched with ghee, turmeric, and rosewater.",
        origin: "Ancient India (Malla-yuddha documented in the Mahabharata).",
        history: "Practiced by kings and peasants alike, Kushti wrestlers follow a strict ascetic regimen under their Ustad.",
        culturalSignificance: "Instills moral purity, physical strength, and reverence for traditional mentors.",
        players: "Two Pehlwans",
        ageGroup: "Teens to Adults",
        equipment: ["Clay wrestling pit (Akhada)", "Langot (cotton loincloth)"],
        rules: ["Victory achieved by pinning opponent's shoulders flat to the clay (Dhaobi Pachhad)."],
        howTraditionallyPlayed: "Early mornings in rural Akhadas after vigorous exercise with Gada (maces) and Dand-Baithak.",
        facts: ["India's Olympic wrestling champions trace their roots to traditional Kushti Akhadas."]
      }
    ]
  },
  "west-bengal": {
    id: "west-bengal",
    name: "West Bengal",
    slug: "west-bengal",
    capital: "Kolkata",
    tagline: "Land of Literature, Art, and Intellectual Pastimes",
    description: "Bengal combines intense intellectual pastimes in neighborhood 'Addas' with energetic outdoor games like Kabaddi (Ha-Du-Du).",
    culturalHighlight: "Neighborhood clubs (Parar Club) in Kolkata have maintained carrom boards and chess tables for over a century.",
    indoorGames: [
      {
        id: "carrom",
        name: "Carrom",
        state: "West Bengal",
        stateSlug: "west-bengal",
        category: "indoor",
        playable: true,
        unlockCost: 0,
        pointsReward: 120,
        starsReward: 12,
        coinReward: 25,
        tagline: "The Beloved Strike-and-Pocket Tabletop Board",
        shortDescription: "An iconic tabletop game of flicking wooden carrom men into corner pockets using a striker.",
        origin: "Indian subcontinent (19th century).",
        history: "A centerpiece of Kolkata's intellectual Adda culture and family evenings across India.",
        culturalSignificance: "Tests geometric rebound precision, touch sensitivity, and calm focus.",
        players: "2 or 4 Players",
        ageGroup: "6+ Years",
        equipment: ["Polished wooden board with 4 corner pockets", "Striker", "19 Carrom men (9 white, 9 black, 1 red Queen)"],
        rules: ["Pocket carrom men; covering the red Queen requires immediately pocketing another piece."],
        howToPlay: "Flick the striker from the baseline to pocket carrom men into corner pockets."
      }
    ],
    outdoorGames: [
      {
        id: "ha-du-du",
        name: "Ha-Du-Du (Bengal Kabaddi)",
        state: "West Bengal",
        stateSlug: "west-bengal",
        category: "outdoor",
        playable: false,
        tagline: "The Traditional Rural Tag Sport of Bengal",
        shortDescription: "The ancestral Bengali predecessor to modern Kabaddi.",
        origin: "Rural Bengal.",
        history: "Played during post-harvest fairs and regional village tournaments for generations.",
        culturalSignificance: "Celebrates cooperative speed and breath stamina.",
        players: "Two teams of 7 to 9 players",
        ageGroup: "All ages",
        equipment: ["Open clay field with marked line"],
        rules: ["Raiders chant without pausing for breath while tagging opponents."],
        howTraditionallyPlayed: "Played on riverbanks and village commons.",
        facts: ["Ha-Du-Du formed the foundational rules for international Kabaddi."]
      }
    ]
  },
  "kerala": {
    id: "kerala",
    name: "Kerala",
    slug: "kerala",
    capital: "Thiruvananthapuram",
    tagline: "God's Own Country, Backwater Glories, and Martial Heritage",
    description: "Kerala's lush backwaters and palm groves are home to ancient martial disciplines and massive boat pageants.",
    culturalHighlight: "The traditional snake boat races on Lake Punnamada during Onam draw thousands of singing rowers.",
    indoorGames: [],
    outdoorGames: [
      {
        id: "kalaripayattu",
        name: "Kalaripayattu",
        state: "Kerala",
        stateSlug: "kerala",
        category: "outdoor",
        playable: false,
        tagline: "The Mother of All Asian Martial Arts",
        shortDescription: "A 3,000-year-old martial discipline blending acrobatic animal postures and weaponry.",
        origin: "Ancient Kerala (attributed to sage Parashurama).",
        history: "One of the oldest surviving fighting systems in the world, influencing East Asian martial arts like Kung Fu.",
        culturalSignificance: "Develops mental poise, spiritual grounding, flexibility, and medicinal healing.",
        players: "Practitioners (Gurukkal and disciples)",
        ageGroup: "7 Years to Adults",
        equipment: ["Traditional Kalari pit", "Wooden sticks, Urumi flexible swords, Daggers, Shields"],
        rules: ["Masters progress through four stages: Meipayattu (body conditioning), Kolthari (wooden weapons), Angathari (metal weapons), and Verumkai (bare hand combat)."],
        howTraditionallyPlayed: "Taught inside a consecrated earthen arena dug 4 feet into the soil.",
        facts: ["Legendary Buddhist monk Bodhidharma took Kalari techniques from South India to Shaolin temple in China."]
      },
      {
        id: "vallam-kali",
        name: "Vallam Kali (Snake Boat Race)",
        state: "Kerala",
        stateSlug: "kerala",
        category: "outdoor",
        playable: false,
        tagline: "The Symphony of 100 Oars on Kerala's Backwaters",
        shortDescription: "Majestic canoe boat races featuring over 100 synchronized rowers chanting Vanchipattu boat songs.",
        origin: "Alappuzha and Kottayam water kingdoms (c. 14th century).",
        history: "Originally built as swift naval warships for royal conflicts between Kayamkulam and Chembakassery kings.",
        culturalSignificance: "The crowning glory of the Onam festival, representing community solidarity across all religions.",
        players: "100 to 120 rowers per Chundan Vallam (Snake Boat)",
        ageGroup: "Adult athletes",
        equipment: ["Carved Chundan Vallam canoe (over 100 feet long)", "Teak wood paddles"],
        rules: ["Boats race over a 1.4 km straight water course; fastest boat across the finish wins the Nehru Trophy."],
        howTraditionallyPlayed: "Rowers propel their canoes to rhythmic drumming and choral songs of the Vanchipattu.",
        facts: ["The Nehru Trophy Boat Race in Alappuzha is one of India's most famous sporting spectacles."]
      }
    ]
  },
  "odisha": {
    id: "odisha",
    name: "Odisha",
    slug: "odisha",
    capital: "Bhubaneswar",
    tagline: "Land of Jagannath, Sun Temples, and Ancient Maritime Glory",
    description: "Odisha's heritage spans maritime merchants who sailed to Southeast Asia and temple courtyards where board games were carved into stone.",
    culturalHighlight: "Stone board game carvings are preserved in the 13th-century Konark Sun Temple and Mukteshwar Temple complexes.",
    indoorGames: [],
    outdoorGames: [
      {
        id: "badi-khela",
        name: "Badi Khela (Stick Fighting of Paikas)",
        state: "Odisha",
        stateSlug: "odisha",
        category: "outdoor",
        playable: false,
        tagline: "The Martial Staff Art of the Paika Warriors",
        shortDescription: "A martial agility exercise practiced by the legendary Paika warrior militia of Odisha.",
        origin: "Kalinga & Khurda kingdom.",
        history: "The Paikas of Odisha, renowned for the 1817 Paika Rebellion, practiced stick combat to defend their borders.",
        culturalSignificance: "Celebrated during Dussehra festivals with martial drumming.",
        players: "2 combatants or group displays",
        ageGroup: "Teens and Adults",
        equipment: ["Polished cane staffs"],
        rules: ["Combatants strike and defend while balancing on marked circular rings."],
        howTraditionallyPlayed: "In open village squares during festival gatherings.",
        facts: ["Paika Akhadas are being preserved by Odisha cultural academies."]
      }
    ]
  }
};

export const ALL_STATES_LIST = [
  { id: "maharashtra", name: "Maharashtra", gamesCount: 7, indoorCount: 3, outdoorCount: 4, active: true },
  { id: "rajasthan", name: "Rajasthan", gamesCount: 3, indoorCount: 1, outdoorCount: 2, active: true },
  { id: "gujarat", name: "Gujarat", gamesCount: 2, indoorCount: 1, outdoorCount: 1, active: true },
  { id: "karnataka", name: "Karnataka", gamesCount: 2, indoorCount: 1, outdoorCount: 1, active: true },
  { id: "tamil-nadu", name: "Tamil Nadu", gamesCount: 2, indoorCount: 1, outdoorCount: 1, active: true },
  { id: "punjab", name: "Punjab", gamesCount: 1, indoorCount: 0, outdoorCount: 1, active: true },
  { id: "west-bengal", name: "West Bengal", gamesCount: 2, indoorCount: 1, outdoorCount: 1, active: true },
  { id: "kerala", name: "Kerala", gamesCount: 2, indoorCount: 0, outdoorCount: 2, active: true },
  { id: "odisha", name: "Odisha", gamesCount: 1, indoorCount: 0, outdoorCount: 1, active: true }
];
