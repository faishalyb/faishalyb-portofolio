/**
 * Portfolio content for Faishal Yusuf Baqir.
 *
 * Every page reads from this file. Metrics come from benchmarks and
 * measurements recorded during the projects; keep them in sync with the CV.
 */

export const template = {
  name: 'LatentFolio',
  edition: 'Free',
  creator: 'Dharani Eswaramurthi',
  creatorUrl: 'https://github.com/Dharani-Eswaramurthi',
};

export const profile = {
  name: 'Faishal Yusuf Baqir',
  shortName: 'Faishal',
  initials: 'FB',
  role: 'Flutter Mobile Developer',
  title: 'Software Developer Project Officer',
  company: 'PT Lentera Kreasi Teknologi',
  location: 'Jakarta, Indonesia',
  availability: 'Open to mobile engineering opportunities',
  email: 'faishalyusuf@gmail.com',
  bio: 'Flutter developer building offline-first plantation apps with on-device face recognition, NFC, Bluetooth printing and SQLite sync.',
  resume: '/faishal-yusuf-baqir-cv.pdf',
  portfolioPdf: '/faishal-yusuf-baqir-portfolio.pdf',
};

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/faishalyb', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/faishalyb/', icon: 'linkedin' },
];

export const pageCopy = {
  seoTitle: `${profile.name} — ${profile.role}`,
  seoDescription: `${profile.role} in Jakarta. Offline-first Flutter apps for palm oil plantations: on-device face recognition, NFC, Bluetooth thermal printing and SQLite sync.`,
  heroEyebrow: profile.role,
  heroLocation: `${profile.location} · ${profile.title} at Lentera Kreasi Teknologi`,
  heroLead: 'I build apps that work',
  heroMiddle: 'where the signal',
  heroAccent: 'doesn’t.',
  heroSummary: 'Offline-first Flutter apps for palm oil plantations — on-device face recognition, NFC tags, printed tickets and local sync — used every day by harvesters, supervisors and field assistants.',
  workIntro: 'Each project is told through the problem in the field, the engineering decisions, how it was measured, and what changed.',
  expertiseIntro: 'Most of my work runs on low-end Android phones, far from a stable connection. That shapes every decision: what runs on the device, what is stored locally, and what can wait for sync.',
  journeyIntro: 'From researching software-defined networks in a university lab to leading the mobile side of a plantation system used across three palm oil groups.',
  writingKicker: '04 / Publications',
  writingIntro: 'Research from my final capstone and community service, published and registered.',
  contactKicker: 'Building something for the field?',
  contactTitle: 'Let’s make it work offline.',
  contactBody: `I’m ${profile.availability.toLowerCase()}, especially teams shipping mobile apps that have to work in hard conditions.`,
};

export const proofPoints = [
  { value: '99.1%', label: 'face verification TAR @ FAR 1e-4', detail: 'LFW benchmark' },
  { value: '6.9 MB', label: 'face model, down from 47 MB', detail: 'ArcFace MobileFaceNet' },
  { value: '3', label: 'palm oil groups on one app', detail: 'DO! IAM' },
  { value: '0.83', label: 'mAP50 on-device PPE detection', detail: 'YOLO, 6 classes' },
  { value: '~0.5 s', label: 'to load 10,000 inspections', detail: 'SQL aggregates' },
];

export type CaseTable = {
  caption: string;
  head: string[];
  rows: string[][];
  note?: string;
  highlightLast?: boolean;
};

export type CaseStudy = {
  slug: string;
  index: string;
  label: string;
  title: string;
  seoTitle: string;
  summary: string;
  outcome: string;
  period: string;
  role: string;
  challenge: string;
  approach: string[];
  result: string;
  metrics: { value: string; label: string }[];
  tables?: CaseTable[];
  stack: string[];
  visual: 'face' | 'field' | 'harvest' | 'screens';
  accent: 'violet' | 'orange' | 'teal';
  /** A photo gallery from src/data/photos.ts shown on the case study page. */
  gallery?: 'defense';
  external?: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'do-iam-face-recognition',
    index: '01',
    label: 'On-device ML · Face recognition',
    title: 'Face attendance that tells similar workers apart, fully offline.',
    seoTitle: `On-device Face Recognition for Plantation Attendance — ${profile.name}`,
    summary: 'DO! IAM checks in plantation workers by face on low-end Android phones with no signal. I replaced the face model, added alignment and liveness, and recalibrated every threshold.',
    outcome: '99.1% TAR @ FAR 1e-4 · 47 MB → 6.9 MB',
    period: '2026 · Phase 2',
    role: 'Lead mobile developer',
    challenge: 'Field users reported three failures: "face already registered" warnings for different people, wrong names at daily check-in, and other people passing the verifier face login. The FaceNet-512 model (~47 MB) was large for low-RAM phones and separated similar faces poorly at strict thresholds.',
    approach: [
      'Benchmarked three embedding models on LFW at strict false-accept rates instead of plain accuracy, which is saturated and hides the difference.',
      'Converted an ArcFace-based MobileFaceNet (w600k_mbf) from ONNX to TFLite, splitting its grouped convolution so it runs on older TFLite runtimes; output matches ONNX at cosine 0.99999.',
      'Aligned each face to the ArcFace 112 px template using ML Kit eye, nose and mouth landmarks, and recalibrated thresholds per mode: check-in, face login and duplicate detection.',
      'Kept passive liveness (MiniFASNet) on every camera path and added a Laplacian sharpness check so blurry faces are never enrolled.',
      'Fixed a TFLite native leak of about 60 MB per scan by loading models once from disk, and limited ML Kit to one frame at a time.',
    ],
    result: 'Verification at FAR 1e-4 rose from 84.6% to 99.1% on LFW with a model 85% smaller. Duplicate-face detection at registration now catches about 92% of same-person pairs, up from about 65%. Field thresholds are tuned from on-device similarity logs.',
    metrics: [
      { value: '99.1%', label: 'TAR @ FAR 1e-4' },
      { value: '6.9 MB', label: 'model size' },
      { value: '~92%', label: 'duplicates caught' },
    ],
    tables: [
      {
        caption: 'Face models compared on LFW (true accept rate at a fixed false accept rate)',
        head: ['Model', 'Size', 'FAR 1e-3', 'FAR 1e-4', 'FAR 1e-5'],
        rows: [
          ['FaceNet-512 (Phase 1)', '~47 MB', '95.7%', '84.6%', '64.8%'],
          ['MobileFaceNet, 192-d', '—', '98.3%', '95.6%', '88.9%'],
          ['ArcFace MobileFaceNet, w600k_mbf (Phase 2)', '6.9 MB', '99.4%', '99.1%', '98.0%'],
        ],
        note: 'Measured on the LFW benchmark, not on field data.',
        highlightLast: true,
      },
    ],
    stack: ['Flutter', 'TensorFlow Lite', 'Google ML Kit', 'MiniFASNet', 'Python', 'onnx2tf'],
    visual: 'face',
    accent: 'violet',
  },
  {
    slug: 'do-iam-field-operations',
    index: '02',
    label: 'Offline-first · Field hardware',
    title: 'One plantation system, two phases: NFC tags, then printed tickets.',
    seoTitle: `DO! IAM Offline Plantation App — ${profile.name}`,
    summary: 'DO! IAM is a new plantation information management system built from scratch for three palm oil groups. It replaces paper for attendance, harvest, transport, inspection and nursery work.',
    outcome: '3 palm oil groups · 2 delivery phases',
    period: 'Nov 2025 – Present',
    role: 'Software Developer Project Officer · team of 3 developers',
    challenge: 'Estates have little or no signal, phones are low-end, and the same app must serve harvesters, supervisors, field assistants and verifiers across three groups (FR, FAP, KAS). Data must never be lost between the field and the server.',
    approach: [
      'Phase 1 wrote harvest and transport data to NFC tags; Phase 2 replaced them with Bluetooth thermal printers for harvest tickets, reprints, recaps and SPB.',
      'Stored everything in SQLite (Drift) with master sync, transaction upload, backup and restore, and remote auto-destroy of local data.',
      'Built inspection modules (harvest, maintenance, APD, nursery, fruit quality, shoots) with a verification flow, due dates and bulk delete.',
      'Rewrote the inspection loader with SQL aggregates so 10,000 records load in about 0.5 s; 400 records previously took 6.6 s.',
      'Prototyped an offline aerial map (PMTiles) with route recording, findings tickets and Dijkstra routing on the estate road shapefile, plus on-device PPE detection (YOLO, mAP50 0.83).',
    ],
    result: 'The app runs daily in the field without a connection, and the move from NFC to printed tickets gave workers a paper record they can hand over and keep.',
    metrics: [
      { value: '3', label: 'palm oil groups' },
      { value: '~0.5 s', label: '10,000 inspections' },
      { value: '~55%', label: 'of team commits' },
    ],
    tables: [
      {
        caption: 'What changed between the two phases',
        head: ['', 'Phase 1', 'Phase 2'],
        rows: [
          ['Period', 'Nov 2025 – Oct 2026', 'Jun 2026 – Present'],
          ['Field data', 'NFC tags', 'Bluetooth thermal printer tickets'],
          ['Face model', 'FaceNet-512 + liveness', 'ArcFace MobileFaceNet + alignment + liveness + Hikvision sync'],
          ['New modules', 'Attendance, harvest, SPB, mill, 6 inspections', 'Harvest estimation, weighing, sorting, nursery, vehicle monitoring, audit trail, 6 inspections with verification'],
        ],
      },
    ],
    stack: ['Flutter', 'GetX', 'Drift / SQLite', 'NFC', 'Bluetooth printer', 'Geolocator'],
    visual: 'field',
    accent: 'orange',
  },
  {
    slug: 'anj-epms-etis',
    index: '03',
    label: 'Plantation apps · Play Store',
    title: 'Harvest, inspection and external orders for ANJ estates.',
    seoTitle: `ePMS and eTis Plantation Apps — ${profile.name}`,
    summary: 'At PT Austindo Nusantara Jaya I developed and maintained two Flutter apps: ePMS for estate planning, harvest and inspection, and eTis for plasma and external growers selling fruit to ANJ.',
    outcome: '2 apps maintained and released on the Play Store',
    period: 'Dec 2024 – Aug 2025',
    role: 'Mobile Apps Developer Staff',
    challenge: 'Estate users needed planning, harvest and inspection on site, and external growers needed their own app to create harvest order tickets. Slow sync between the server and the local database held users up in the field.',
    approach: [
      'Built and maintained ePMS features for planning, harvest and end-to-end inspection assignments until each task is closed.',
      'Maintained eTis (E-Trace), which external growers install to create harvest order tickets with ANJ.',
      'Refactored data sync and local database fetching to cut sync time.',
      'Handled releases and Firebase push notifications for both apps.',
    ],
    result: 'Both apps stayed in production use, with eTis available publicly on the Play Store.',
    metrics: [
      { value: '2', label: 'apps released' },
      { value: 'NFC', label: 'field data capture' },
      { value: 'FCM', label: 'push notifications' },
    ],
    stack: ['Flutter', 'NFC', 'Firebase Cloud Messaging', 'AWS CodeCommit', 'Postman'],
    visual: 'harvest',
    accent: 'teal',
    external: [{ label: 'eTrace on Google Play', href: 'https://play.google.com/store/apps/details?id=com.anj.e_trace_app' }],
  },
  {
    slug: 'wasteapp',
    index: '04',
    label: 'Computer vision · Final capstone',
    title: 'A waste bank app that recognises trash from a photo.',
    seoTitle: `WasteApp, a Flutter Waste Detection App — ${profile.name}`,
    summary: 'WasteApp is the Flutter app I built for a waste bank in Bandung as my final capstone at Telkom University. Point the camera at a pile of waste and a YOLOv8 service names each item, then the app tracks the stock.',
    outcome: 'IEEE paper · registered IP (HKI) · on Google Play',
    period: 'Nov 2023 – Aug 2024',
    role: 'Mobile developer · capstone team with backend and ML roles',
    challenge: 'A waste bank runs on knowing what comes in: which kinds of waste, how much, and who deposited it. The goal was to run that day-to-day logic in a mobile app and let the phone recognise the waste itself, instead of staff typing the type in by hand.',
    approach: [
      'Built the Flutter app with Firebase Authentication, Firestore and Storage: a home dashboard with recycling articles, a waste-stock chart, and tabs for deposits and customers.',
      'Added the scan flow: take or upload a photo, send it to the machine learning API, and draw the returned boxes with a confidence score for every item, for example a water gallon, a plastic bottle and a plastic bag.',
      'Worked with the backend and machine learning teammates on Google Cloud: they owned the Node.js service and the YOLOv8 model, and I consumed their REST API from the app.',
      'Built the waste-bank screens: stock by waste type in kilograms with a bar chart, a history view, a sell or deposit action, and a processing recommendation after each detection.',
      'Compared YOLOv8 with MobileNetV2 SSD for the paper, then released the app on the Play Store.',
    ],
    result: 'The app shipped on Google Play and was presented at the capstone defense in 2024. The detection work was published at IEEE and the app was registered as intellectual property (HKI).',
    metrics: [
      { value: 'YOLOv8', label: 'waste detection' },
      { value: 'IEEE', label: 'paper, 2024' },
      { value: 'HKI', label: 'registered IP' },
    ],
    stack: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'YOLOv8', 'Google Cloud'],
    visual: 'screens',
    accent: 'violet',
    gallery: 'defense',
    external: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.faishalyb.wasteapp' },
      { label: 'IEEE paper', href: 'https://ieeexplore.ieee.org/document/10914827' },
      { label: 'GitHub', href: 'https://github.com/faishalyb/waste_app' },
    ],
  },
];

export type Experience = {
  company: string;
  location: string;
  marker: string;
  /** Logo from src/data/photos.ts; the marker text is the fallback. */
  logo?: 'lkt' | 'anj' | 'adaptive-network' | 'bangkit';
  roles: { title: string; dates: string }[];
  note: string;
  /** A photo gallery from src/data/photos.ts shown under the entry. */
  gallery?: 'research';
  link?: { label: string; href: string };
};

export const experience: Experience[] = [
  {
    company: 'PT Lentera Kreasi Teknologi',
    location: 'Jakarta · First Resources Ltd',
    marker: 'LK',
    logo: 'lkt',
    roles: [
      { title: 'Software Developer Project Officer', dates: 'Nov 2025 — Present' },
      { title: 'Programmer Enterprise System 1', dates: 'Sep 2025 — Nov 2025' },
    ],
    note: 'Joined after the ANJ–First Resources acquisition. Now lead the mobile side of DO! IAM for three palm oil groups, from face recognition to printed field tickets.',
  },
  {
    company: 'PT Austindo Nusantara Jaya Tbk',
    location: 'South Jakarta',
    marker: 'AJ',
    logo: 'anj',
    roles: [{ title: 'Mobile Apps Developer Staff', dates: 'Dec 2024 — Aug 2025' }],
    note: 'Developed and released ePMS and eTis on the Play Store, and cut sync time by refactoring local data fetching.',
  },
  {
    company: 'Adaptive Network Laboratory, Telkom University',
    location: 'Bandung',
    marker: 'AN',
    logo: 'adaptive-network',
    roles: [{ title: 'Research Assistant', dates: 'Jun 2022 — Sep 2024' }],
    note: 'One of about 20 assistants picked from 100 candidates. Researched P4 and next-generation SDN and ran lab instances on OpenStack. Also in the People Development division: ran the monthly NetClass tech talks and NetNongkrong team events.',
    gallery: 'research',
    link: { label: 'Lab profile video', href: 'https://www.youtube.com/watch?v=xbQWlYBBHWQ' },
  },
  {
    company: 'Bangkit Academy 2023',
    location: 'Google, GoTo, Traveloka',
    marker: 'BA',
    logo: 'bangkit',
    roles: [{ title: 'Cloud Computing Cohort', dates: 'Feb 2023 — Jul 2023' }],
    note: 'Built and deployed the Cycle-Me capstone backend on Google Cloud (App Engine, Cloud Run, Cloud SQL).',
  },
];

export const expertise = [
  {
    number: '01',
    title: 'Offline-first mobile',
    description: 'Flutter apps that keep working without a connection: local SQLite as the source of truth, careful sync, and screens built for gloves and sunlight.',
    tools: ['Flutter', 'Dart', 'GetX', 'Drift', 'SQLite', 'Dio'],
  },
  {
    number: '02',
    title: 'On-device ML',
    description: 'Face recognition, liveness and object detection that run on low-end phones — measured at strict thresholds and kept within memory limits.',
    tools: ['TensorFlow Lite', 'Google ML Kit', 'YOLO', 'MiniFASNet', 'Python'],
  },
  {
    number: '03',
    title: 'Field hardware & geo',
    description: 'NFC tags, Bluetooth thermal printers, GPS geofencing and offline maps, wired into the same offline data model.',
    tools: ['NFC', 'Bluetooth printer', 'GPS', 'PMTiles', 'GIS routing', 'Java'],
  },
];

export const articles = [
  {
    title: 'Advanced Waste Detection: MobileNetV2 SSD and YOLOv8 for Waste Bank Mobile Application',
    description: 'Compares MobileNetV2 SSD and YOLOv8 for detecting waste types in the WasteApp mobile app.',
    date: '2024',
    source: 'IEEE',
    category: 'Computer vision',
    visual: 'ads' as const,
    href: 'https://ieeexplore.ieee.org/document/10914827',
  },
  {
    title: 'Digitalisasi Pusat Informasi dan Administrasi Data pada Posyandu Alamanda Berbasis Web',
    description: 'Community-service report on building the Posyandu Alamanda website for mother and child services in Gedebage, Bandung.',
    date: '2022',
    source: 'Open Library Telkom University',
    category: 'Community service',
    visual: 'inquiry' as const,
    href: 'https://openlibrarypublications.telkomuniversity.ac.id/index.php/cosecant/article/view/18658',
  },
];

export const writingArchiveUrl = 'https://github.com/faishalyb';

export const education = {
  degree: 'B.Eng., Telecommunication Engineering',
  institution: 'Telkom University, Bandung',
  dates: '2020 — 2024',
  score: 'GPA 3.54 / 4.00',
  certifications: [
    'Google Cloud Computing Foundations',
    'Associate Cloud Engineer Journey (Google Cloud)',
    'Flutter Basic (Dicoding)',
  ],
  certificationsUrl: 'https://www.cloudskillsboost.google/public_profiles/40f95e1a-c617-43b7-9a0a-1018dc4af35d',
};

export const spotlight = {
  label: 'Final capstone · IEEE 2024 · HKI',
  title: 'WasteApp: a waste bank app that recognises trash from a photo.',
  href: '/work/wasteapp',
  body: 'My final capstone at Telkom University: a Flutter app for a Bandung waste bank, backed by a YOLOv8 detection API. It shipped on the Play Store, was published in IEEE and registered as intellectual property (HKI).',
  links: [
    { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.faishalyb.wasteapp' },
    { label: 'GitHub', href: 'https://github.com/faishalyb/waste_app' },
    { label: 'HKI certificate', href: 'https://drive.google.com/file/d/1STwvDfrr76o5G5zDIjpr32wDP8PF8nPj/view' },
    { label: 'Team repos', href: 'https://github.com/orgs/wastebank-project/repositories' },
  ],
};

export const otherProjects = [
  { title: 'FlixID', year: '2024', body: 'Movie ticket app with the TMDB API, Firebase and Riverpod.', href: 'https://github.com/faishalyb/FlixID' },
  { title: 'My-WB', year: '2023', body: 'Waste detector with reuse, reduce and recycle video tips.', href: 'https://github.com/faishalyb/flutter_final_submission/' },
  { title: 'Cycle-Me', year: '2023', body: 'Bangkit capstone backend on Node.js and Google Cloud.', href: 'https://github.com/Cycle-Me/' },
  { title: 'Posyandu Alamanda', year: '2022', body: 'Health post website with service registration.', href: 'https://idaman.adaptivenetworklab.org/' },
];

export const wedding = {
  label: 'Before code · 2021 – 2023',
  title: 'Terang Wedding Organizer',
  headline: 'I ran weddings before I ran software rollouts.',
  body: 'Freelance wedding organizer around Brebes, Tegal and Slawi during online classes: decoration, catering and looking after the couple on the day.',
};
