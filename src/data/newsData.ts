export interface Comment {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
  likes: number;
}

export interface LiveUpdate {
  id: string;
  time: string;
  title: string;
  content: string;
  reporter: string;
}

export interface Article {
  id: string;
  title: string;
  deck: string;
  category: 'World' | 'US Politics' | 'Business' | 'Tech' | 'Climate' | 'Entertainment' | 'Sports' | 'Opinion';
  isBreaking?: boolean;
  isLive?: boolean;
  isOpinion?: boolean;
  imageUrl: string;
  imageCaption: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: string;
  keyTakeaways: string[];
  paragraphs: string[];
  pullQuote?: {
    text: string;
    attribution: string;
  };
  comments: Comment[];
  videoDuration?: string;
}

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'diplomatic-summit-geneva-accord',
    title: 'Historic multilateral summit in Geneva seals landmark green industrial agreement',
    deck: 'Over 40 nations sign onto a unified clean tech supply chain pact after a marathon 36-hour negotiation session.',
    category: 'World',
    isBreaking: true,
    isLive: true,
    imageUrl: '/src/assets/images/cnn_lead_diplomacy_1792739459927.jpg',
    imageCaption: 'Delegates and heads of state convene in Geneva for the final plenary voting session on clean industrial trade standards.',
    author: 'Clarissa Ward',
    authorRole: 'Chief International Correspondent',
    publishedAt: 'Updated 14 mins ago',
    readTime: '6 min read',
    keyTakeaways: [
      'Forty-two member nations agreed to establish zero-tariff corridors for certified low-carbon heavy materials.',
      'The accord settles three years of contentious negotiations between North American and European trade blocs.',
      'A $120 billion multilateral transition fund will deploy over the next four fiscal quarters to emerging industrial corridors.'
    ],
    paragraphs: [
      'GENEVA — Following thirty-six hours of non-stop backchannel negotiations, international envoys assembled on Thursday morning to formalize what observers are calling the most sweeping multilateral trade realignment in two decades.',
      'The comprehensive accord, signed by representatives from 42 nations, establishes unified carbon accounting mechanisms, shared critical mineral stockpiles, and reciprocal clean energy manufacturing standards. The breakthrough comes after months of friction over competing domestic subsidy programs.',
      '"What we achieved this morning is not merely diplomatic compromise; it is an economic architecture designed to outlast short-term market cycles," declared lead coordinator Elena Vance during the joint press briefing.',
      'Under the agreed framework, participating economies will harmonize customs verification for green steel, advanced battery cells, and semiconductor supply chains. The pact also outlines joint risk-mitigation measures against supply choke points in maritime transit routes.',
      'Reaction across global financial capitals was swift and positive. Benchmark equity indices rallied in afternoon trading, led by capital goods and clean infrastructure suppliers who had long cautioned against fragmented regional regulations.',
      'Independent trade analysts emphasized that while the legal ratification hurdles remain across twelve sovereign parliaments, the executive signatories have already established interim administrative working groups to enforce primary guidelines beginning next month.'
    ],
    pullQuote: {
      text: 'This agreement proves multilateralism remains the indispensable vehicle for planetary economic transformation.',
      attribution: 'Elena Vance, European Trade Commissioner'
    },
    comments: [
      {
        id: 'c-1',
        author: 'Marcus Sterling',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        timestamp: '18 mins ago',
        text: 'A rare display of decisive international cooperation. The critical mineral reserves clause alone could prevent massive bottlenecks over the next five years.',
        likes: 34
      },
      {
        id: 'c-2',
        author: 'David Chen, CFA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        timestamp: '32 mins ago',
        text: 'The key question will be parliamentary ratification in countries facing elections this year. If tariffs are reduced smoothly, this is a massive win for market predictability.',
        likes: 19
      }
    ]
  },
  {
    id: 'next-gen-space-mission-launch',
    title: 'Aerospace consortium reaches critical countdown phase for deep lunar payload system',
    deck: 'Engineers confirm final telemetry sign-offs as the heavy-lift vehicle prepares for historic deep space flight window.',
    category: 'Tech',
    isBreaking: false,
    isLive: false,
    imageUrl: '/src/assets/images/cnn_tech_space_1792739461994.jpg',
    imageCaption: 'Flight directors and orbital telemetry specialists monitor console matrices inside the Nova Mission Command Center.',
    author: 'Rachel Crane',
    authorRole: 'Space & Defense Analyst',
    publishedAt: 'Updated 45 mins ago',
    readTime: '4 min read',
    keyTakeaways: [
      'The multi-stage launch vehicle incorporates next-generation closed-cycle methane propulsion.',
      'Mission objectives focus on deploying automated lunar soil spectrometry modules to the South Pole-Aitken basin.',
      'Atmospheric trajectory conditions remain 95% favorable for the designated morning launch window.'
    ],
    paragraphs: [
      'CAPE CANAVERAL, Fla. — Inside the cavernous mission control hub, flight directors reviewed the final readiness matrices on Thursday as countdown clocks ticked toward the scheduled morning orbital insertion.',
      'The flight represents the culmination of a six-year, public-private aerospace initiative dedicated to establishing sustained robotic surveying capabilities in permanently shadowed lunar craters.',
      'Chief Flight Director Alan Mercer told reporters that all primary cryo-fluidic pressure readings were nominal following overnight fueling tests. "Every telemetry stream is tracking within our tightest performance margins," Mercer noted during a pre-launch briefing.',
      'The spacecraft carries eight autonomous science packages, including synthetic aperture radar arrays designed to create sub-surface composition maps with millimeter-level fidelity.',
      'If successful, the mission will mark the earliest commercial delivery of deep-drilling geotechnical instruments to the lunar south pole, paving the way for international crewed exploratory bases later in the decade.'
    ],
    pullQuote: {
      text: 'We are moving from exploratory flybys to persistent infrastructure development beyond low Earth orbit.',
      attribution: 'Dr. Sandra Liu, Planetary Sciences Lead'
    },
    comments: [
      {
        id: 'c-3',
        author: 'Gene Kranz Fan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        timestamp: '50 mins ago',
        text: 'The telemetry consoles look incredible. Incredible to see private consortiums working side-by-side with national agencies on deep space science.',
        likes: 42
      }
    ],
    videoDuration: '03:15'
  },
  {
    id: 'global-markets-rally-tech-energy',
    title: 'Global markets surge as corporate earnings and lower yield curve spark broad rally',
    deck: 'Wall Street and European bourses hit fresh highs after central banks signal orderly macro stabilization.',
    category: 'Business',
    isBreaking: false,
    isLive: true,
    imageUrl: '/src/assets/images/cnn_markets_trading_1792739461362.jpg',
    imageCaption: 'Traders track surging equity and commodity contracts on the main exchange floor as trading volume reaches peak velocity.',
    author: 'Julia Chatterley',
    authorRole: 'Chief Business Anchor',
    publishedAt: 'Updated 1 hour ago',
    readTime: '5 min read',
    keyTakeaways: [
      'The S&P 500 crossed key technical resistance, lifted by cloud computing and semiconductor equipment makers.',
      'Benchmark 10-year Treasury yields settled lower as inflation projections came in softer than expected.',
      'Energy futures moderated following reports of expanded supply agreements in the North Sea.'
    ],
    paragraphs: [
      'NEW YORK — Equity bourses surged across the globe Thursday as institutional investors responded enthusiastically to a synchronised wave of solid enterprise earnings and calming interest rate signals.',
      'The Dow Jones Industrial Average surged more than 380 points within the first two hours of the trading session, accompanied by aggressive volume in technology, industrial automation, and renewable infrastructure shares.',
      'Market strategists pointed to a dual catalyst: unexpectedly strong capital expenditure projections from major enterprise software providers, paired with central bank commentary suggesting monetary tightening has firmly concluded.',
      '"Investors are rotating capital back into productive manufacturing and high-margin software platforms that demonstrate tangible cash conversion," explained chief equity strategist Sarah Jenkins.',
      'Currency markets reflected similar confidence, with the US Dollar Index easing marginally while European and Asian export-heavy currencies found renewed support against commodity-backed pairs.'
    ],
    pullQuote: {
      text: 'The market is shifting its focus from inflation angst to durable productivity gains driven by automation.',
      attribution: 'Sarah Jenkins, Senior Portfolio Director'
    },
    comments: [
      {
        id: 'c-4',
        author: 'Arthur Vance',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
        timestamp: '1 hour ago',
        text: 'Yields dropping back down makes capital planning viable for industrial firms again. Very reassuring macro tone today.',
        likes: 12
      }
    ],
    videoDuration: '04:20'
  },
  {
    id: 'offshore-clean-energy-milestone',
    title: 'North Sea mega-cluster sets world record for contiguous marine clean power generation',
    deck: 'Interconnected deep-water wind arrays and floating solar parks generate unprecedented 24-gigawatt peak capacity.',
    category: 'Climate',
    isBreaking: false,
    isLive: false,
    imageUrl: '/src/assets/images/cnn_climate_energy_1792739461750.jpg',
    imageCaption: 'Research vessels inspect massive 18-megawatt offshore turbines spinning in brisk North Sea waters at sunrise.',
    author: 'Bill Weir',
    authorRole: 'Chief Climate Correspondent',
    publishedAt: 'Updated 2 hours ago',
    readTime: '5 min read',
    keyTakeaways: [
      'The North Sea offshore grid supplied electricity to 19 million homes continuously over the 72-hour trial.',
      'Subsea high-voltage direct current (HVDC) lines minimized transmission losses over 450 nautical miles.',
      'Marine conservationists confirm artificial reef foundations are fostering localized biodiversity resurgence.'
    ],
    paragraphs: [
      'OSLO, Norway — Off the coast of western Norway, a coordinated cluster of deep-water wind platforms and floating solar arrays generated a record-shattering 24 gigawatts of clean electricity this week, setting a new global benchmark for marine energy output.',
      'The milestone, verified by the European Marine Grid Authority, demonstrates that deep-water floating foundations can reliably withstand extreme wave action while delivering steady base-load electricity to mainland consumers.',
      'Engineers utilized new composite rotor blades with adaptive pitch control, allowing the turbines to continue spinning safely even during Force 9 gale conditions.',
      '"Ten years ago, skeptics argued that floating offshore wind was too expensive and too fragile for open ocean deployment," said project director Henrik Lindqvist. "Today, this cluster is generating energy at lower marginal cost than conventional thermal generation."',
      'Environmental monitoring teams also shared promising ecological data: the subsea concrete gravity bases have developed dense ecosystems of cold-water coral and shellfish, creating unintentional marine sanctuaries where commercial trawling is prohibited.'
    ],
    pullQuote: {
      text: 'Marine wind has graduated from an experimental alternative to the undisputed powerhouse of coastal decarbonization.',
      attribution: 'Henrik Lindqvist, Grid Integration Director'
    },
    comments: [
      {
        id: 'c-5',
        author: 'Freja Nygård',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        timestamp: '2 hours ago',
        text: 'The ecological co-benefits are fascinating. Having artificial reef structures protected from trawlers could revitalize marine habitats while keeping the lights on.',
        likes: 27
      }
    ]
  },
  {
    id: 'us-congress-infrastructure-appropriation',
    title: 'Bipartisan committee clears $85 billion package for bridge and rail modernization',
    deck: 'Lawmakers push through crucial funding bill ahead of fiscal deadline with broad bipartisan consensus.',
    category: 'US Politics',
    isBreaking: false,
    isLive: false,
    imageUrl: '/src/assets/images/cnn_lead_diplomacy_1792739459927.jpg',
    imageCaption: 'Committee chairs address members of Congress during the markup session in the Rayburn House Office Building.',
    author: 'Manu Raju',
    authorRole: 'Chief Congressional Correspondent',
    publishedAt: 'Updated 3 hours ago',
    readTime: '4 min read',
    keyTakeaways: [
      'The appropriations bill targets over 1,400 structurally deficient bridges across 38 states.',
      'High-speed passenger rail corridors in the Midwest and Pacific Northwest receive major capital grants.',
      'Vote passed 342-88 in the House, sending the legislation to the Senate floor for expedited concurrence.'
    ],
    paragraphs: [
      'WASHINGTON — In a significant demonstration of cross-aisle cooperation, the House Committee on Transportation and Infrastructure on Thursday morning overwhelmingly advanced an $85 billion infrastructure package.',
      'The measure directs emergency repair funds to long-backlogged river crossings, seaport freight connectors, and regional passenger rail networks facing critical renewal dates.',
      'Committee leaders praised the pragmatic negotiations that stripped out extraneous policy riders in favor of formula grants distributed directly to state departments of transportation.',
      'Senate leadership signaled they would take up the measure without amendment next Tuesday, virtually ensuring its enactment before the upcoming recess.'
    ],
    comments: []
  },
  {
    id: 'ai-chips-architecture-breakthrough',
    title: 'Silicon pioneers unveil 3D optical interconnect that slashes data center energy draw by 60%',
    deck: 'New optical photonic layers replace copper pathways, overcoming the thermal wall in dense AI clusters.',
    category: 'Tech',
    isBreaking: false,
    isLive: false,
    imageUrl: '/src/assets/images/cnn_tech_space_1792739461994.jpg',
    imageCaption: 'A researcher inspects an optical photonic wafer under monochromatic laser inspection inside an advanced fabrication clean room.',
    author: 'Donie O’Sullivan',
    authorRole: 'Senior Technology Correspondent',
    publishedAt: 'Updated 4 hours ago',
    readTime: '5 min read',
    keyTakeaways: [
      'Photonic interconnects transmit data packets using micro-lasers rather than electrical copper traces.',
      'The reduction in heat generation eliminates the need for chilled water cooling systems in edge installations.',
      'Commercial volume production is slated to commence in semiconductor fabs by late 2027.'
    ],
    paragraphs: [
      'SAN FRANCISCO — The semiconductor industry took a monumental stride away from traditional copper interconnects Thursday, as researchers demonstrated a commercially viable optical interconnect wafer capable of moving petabytes of training data with negligible resistive heat.',
      'By integrating microscopic silicon lasers directly into the packaging layer, the new architecture bypasses the physical bottlenecks that have constrained large-scale distributed computing facilities.',
      '"We have reached the fundamental thermodynamic limits of copper wiring in nanoscale packages," explained Dr. Kenji Sato, who spearheaded the five-year development team. "Optics unlocks orders of magnitude greater throughput per watt."',
      'Leading hyperscalers have already committed early engineering evaluation slots, heralding an era where computing clusters can run dramatically cooler and with significantly reduced municipal power strain.'
    ],
    comments: [],
    videoDuration: '02:40'
  },
  {
    id: 'hollywood-film-festival-previews',
    title: 'Acclaimed historical drama leads festival contenders as awards season momentum builds',
    deck: 'Independent studios shine with emotionally resonant narratives and groundbreaking practical cinematography.',
    category: 'Entertainment',
    isBreaking: false,
    isLive: false,
    imageUrl: '/src/assets/images/cnn_markets_trading_1792739461362.jpg',
    imageCaption: 'Filmmakers and cast assemble at the premiere screening during the opening weekend festivities.',
    author: 'Chloe Melas',
    authorRole: 'Entertainment Reporter',
    publishedAt: 'Updated 5 hours ago',
    readTime: '3 min read',
    keyTakeaways: [
      'Standing ovations greeted the three-hour historical epic depicting 19th-century telegraph innovators.',
      'Critics universally lauded the lead performance and reliance on large-format 70mm analog film stock.',
      'Streaming platforms engaged in intense overnight bidding wars for international distribution rights.'
    ],
    paragraphs: [
      'VENICE, Italy — The autumn cinematic calendar gained its definitive frontrunner on Thursday evening with the world premiere of "The Wire Horizon," a meticulously crafted period drama chronicling the transatlantic telegraph cable expedition.',
      'The audience inside the Sala Grande rose for a nine-minute standing ovation as the final credits rolled, with critics singled out the breathtaking natural-light cinematography and authentic period recreation.'
    ],
    comments: []
  },
  {
    id: 'champions-league-showdown-preview',
    title: 'Tactical preview: Continental giants clash in decisive European football quarterfinal',
    deck: 'Intense midfield pressing and lightning counter-attacks set the stage for an electrifying second-leg showdown.',
    category: 'Sports',
    isBreaking: false,
    isLive: false,
    imageUrl: '/src/assets/images/cnn_lead_diplomacy_1792739459927.jpg',
    imageCaption: 'Players complete final tactical run-throughs on the training pitch ahead of tonight’s sold-out clash.',
    author: 'Patrick Snell',
    authorRole: 'World Sport Anchor',
    publishedAt: 'Updated 6 hours ago',
    readTime: '4 min read',
    keyTakeaways: [
      'First leg finished 2-2, leaving the tie on a knife-edge with away goals abolished.',
      'Key midfield maestro returns from a four-week hamstring layoff to bolster the central pivot.',
      'Over 75,000 supporters are expected in attendance, with millions tuning in across 180 countries.'
    ],
    paragraphs: [
      'MADRID — European football anticipates its most anticipated contest of the spring tonight as two titans of continental football meet for the return leg of their Champions League quarterfinal clash.',
      'With both managers known for high-octane positional play and rapid offensive transitions, tactical analysts expect an aggressive opening twenty minutes that could determine the tempo of the entire encounter.'
    ],
    comments: []
  },
  {
    id: 'opinion-democracy-and-civil-discourse',
    title: 'Why the revitalization of public libraries is our secret weapon against digital polarization',
    deck: 'Physical civic spaces remain the most effective antidote to algorithmic outrage and social fragmentation.',
    category: 'Opinion',
    isBreaking: false,
    isLive: false,
    isOpinion: true,
    imageUrl: '/src/assets/images/cnn_climate_energy_1792739461750.jpg',
    imageCaption: 'Patrons gather in a sunlit public reading pavilion for community education and open dialogue.',
    author: 'Fareed Zakaria',
    authorRole: 'Host, Fareed Zakaria GPS & Opinion Columnist',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    publishedAt: 'Updated 7 hours ago',
    readTime: '6 min read',
    keyTakeaways: [
      'Physical third spaces encourage serendipitous cross-generational interactions that online feeds systematically suppress.',
      'Communities investing in modernized library hubs report measurable improvements in local civic engagement.',
      'Reclaiming shared civic architecture is essential for nurturing collective resilience.'
    ],
    paragraphs: [
      'In an era where every societal interaction seems funneled through friction-maximized digital conduits, the humblest institution of the American experiment continues to execute quiet miracles: the free public library.',
      'Unlike curated online feeds optimized for engagement through indignation, the physical library makes no demands upon your attention span, extracts no personal telemetry, and charges no toll for entry. It is perhaps the last remaining sanctuary of democratic equality in civic life.',
      'When citizens from disparate socioeconomic backgrounds sit at the same oak tables, read the same periodicals, and participate in community workshops, the artificial caricatures cultivated online begin to dissolve.',
      'If we wish to renew the fabric of our republics, we should stop obsessing solely over algorithmic reforms and start investing enthusiastically in the bricks, mortar, and quiet halls that teach us how to inhabit shared reality together.'
    ],
    pullQuote: {
      text: 'The library is the only place left where you do not have to buy anything just to exist.',
      attribution: 'Fareed Zakaria'
    },
    comments: [
      {
        id: 'c-6',
        author: 'Eleanor Vance',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        timestamp: '6 hours ago',
        text: 'Zakaria nails it. Our local library recently added a tool library and seed exchange. It has genuinely changed how neighbors talk to each other.',
        likes: 56
      }
    ]
  }
];

export const LIVE_UPDATES: LiveUpdate[] = [
  {
    id: 'lu-1',
    time: '12:04 PM',
    title: 'Joint communiqué finalized: All 42 delegates complete digital protocol ratification',
    content: 'The official treaty depository confirmed receipt of all 42 digital signatures. The first working group will convene in Brussels on November 15.',
    reporter: 'Clarissa Ward, Geneva'
  },
  {
    id: 'lu-2',
    time: '11:45 AM',
    title: 'Global trade ministers issue joint statement on maritime logistics safety',
    content: 'Signatories established a shared corridor monitoring group to provide naval coordination and satellite tracking along high-traffic sea routes.',
    reporter: 'Nic Robertson, London'
  },
  {
    id: 'lu-3',
    time: '11:15 AM',
    title: 'Market indices register sudden uptick as tariff relief triggers industrial buying',
    content: 'European auto manufacturers and industrial equipment producers posted sharp morning gains, rising 3.2% within 20 minutes of treaty release.',
    reporter: 'Anna Stewart, Frankfurt'
  },
  {
    id: 'lu-4',
    time: '10:30 AM',
    title: 'Delegates emerge from overnight executive session for closing photos',
    content: 'After 36 hours of round-the-clock redlining, chief negotiators emerged looking exhausted but smiling for the official family portrait in Hall 3.',
    reporter: 'Clarissa Ward, Geneva'
  }
];

export const MARKET_INDICES = [
  { symbol: 'S&P 500', value: '5,864.20', change: '+38.40', percent: '+0.66%', isPositive: true },
  { symbol: 'DOW 30', value: '43,210.15', change: '+240.50', percent: '+0.56%', isPositive: true },
  { symbol: 'NASDAQ', value: '18,612.80', change: '+142.10', percent: '+0.77%', isPositive: true },
  { symbol: '10-YR YIELD', value: '4.18%', change: '-0.04', percent: '-0.95%', isPositive: true },
  { symbol: 'BRENT CRUDE', value: '$74.12', change: '-0.85', percent: '-1.13%', isPositive: false }
];

export const CITIES_WEATHER = [
  { city: 'Washington, DC', temp: '68°F', condition: 'Partly Cloudy', icon: 'cloud-sun' },
  { city: 'New York', temp: '64°F', condition: 'Clear', icon: 'sun' },
  { city: 'London', temp: '57°F', condition: 'Light Rain', icon: 'cloud-rain' },
  { city: 'Tokyo', temp: '72°F', condition: 'Sunny', icon: 'sun' },
  { city: 'Paris', temp: '61°F', condition: 'Overcast', icon: 'cloud' }
];

export const CATEGORIES = [
  'All',
  'World',
  'US Politics',
  'Business',
  'Tech',
  'Climate',
  'Entertainment',
  'Sports',
  'Opinion'
] as const;

export type CategoryType = typeof CATEGORIES[number];
