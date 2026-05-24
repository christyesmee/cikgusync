// CikguSync - design tokens + data + i18n strings.
//
// All visual tokens follow CIKGUSYNC_REDESIGN.md §1.
//   - Single light theme (no dim variant)
//   - No gradients anywhere
//   - No box-shadow except the bottom-nav top hairline
//   - 4 px spacing grid (4, 8, 12, 16, 20, 24, 32)
//   - Cards 16 px radius, hero 20 px, buttons 12 px, pills 999 px
//   - Inter font family
//
// T.* are the colour aliases, TYPE.* the type-scale presets, SPACE.* the
// spacing scale, and R.* the radius scale. Components read these so a token
// change cascades app-wide.

const T = {
  // Brand
  navy:      'var(--navy-900)',
  navyDark:  'var(--navy-800)',
  navyMid:   'var(--navy-700)',
  // Ink (text)
  ink:       'var(--ink-900)',
  ink2:      'var(--ink-700)',
  ink3:      'var(--ink-500)',
  ink4:      'var(--ink-300)',
  // Surfaces
  surface:   'var(--surface-0)',
  bg:        'var(--surface-50)',
  surface2:  'var(--surface-100)',
  line:      'var(--line-200)',
  // Semantic
  green:     'var(--green-600)',
  greenSoft: 'var(--green-100)',
  peach:     'var(--peach-500)',
  peachSoft: 'var(--peach-200)',
  peachPale: 'var(--peach-50)',
  red:       'var(--red-500)',
  redSoft:   'var(--red-100)',

  // Legacy aliases used by older code (mapped to spec colours via index.html
  // CSS vars). Kept here so untouched components keep working visually while
  // we migrate; new code should use the names above.
  navyDeep:    'var(--navy-900)',
  navySoft:    '#EAF0F8',
  teal:        'var(--navy-700)',
  tealDark:    'var(--navy-800)',
  tealSoft:    'var(--surface-100)',
  card:        'var(--surface-0)',
  cardElev:    'var(--surface-0)',
  border:      'var(--line-200)',
  borderS:     'var(--ink-300)',
  text:        'var(--ink-900)',
  text2:       'var(--ink-700)',
  text3:       'var(--ink-500)',
  success:     'var(--green-600)',
  successS:    'var(--green-100)',
  warn:        'var(--peach-500)',
  warnS:       'var(--peach-200)',
  queue:       'var(--peach-500)',
  queueS:      'var(--peach-200)',
  danger:      'var(--red-500)',
  dangerS:     'var(--red-100)',
  shadow1:     'none',
  shadow2:     'none',
  shadow3:     'none',
};

// Spec §1.2 type scale. Use these inline objects with `style={{ ...TYPE.xxx }}`.
const TYPE = {
  pageTitle:   { fontSize: 26, lineHeight: '32px', fontWeight: 700, color: T.ink, letterSpacing: -0.4 },
  pageSub:     { fontSize: 14, lineHeight: '20px', fontWeight: 400, color: T.ink3 },
  cardTitle:   { fontSize: 16, lineHeight: '22px', fontWeight: 600, color: T.ink },
  cardBody:    { fontSize: 13, lineHeight: '18px', fontWeight: 400, color: T.ink3 },
  statLabel:   { fontSize: 13, lineHeight: '16px', fontWeight: 500, color: T.ink2 },
  statValue:   { fontSize: 28, lineHeight: '32px', fontWeight: 700, color: T.ink, letterSpacing: -0.5 },
  sectionHead: { fontSize: 15, lineHeight: '20px', fontWeight: 600, color: T.ink },
  heroTitle:   { fontSize: 16, lineHeight: '22px', fontWeight: 700, color: '#fff' },
  heroBody:    { fontSize: 14, lineHeight: '22px', fontWeight: 400, color: '#fff' },
  heroCap:     { fontSize: 12, lineHeight: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.7)' },
  btnLabel:    { fontSize: 15, lineHeight: '20px', fontWeight: 600 },
  pill:        { fontSize: 12, lineHeight: '16px', fontWeight: 600 },
  statusBar:   { fontSize: 14, lineHeight: '18px', fontWeight: 600, color: T.ink },
  navLabel:    { fontSize: 11, lineHeight: '14px', fontWeight: 500 },
  eyebrow:     { fontSize: 11, lineHeight: '14px', fontWeight: 600, color: T.ink3, letterSpacing: '0.08em', textTransform: 'uppercase' },
};

const R = { card: 16, hero: 20, button: 12, pill: 999, chip: 8 };
const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 20, xxl: 24, h: 32 };

// Domain definitions used across record + dashboards.
const SGM_DOMAINS = [
  { id: 'D1', code: 'D1', name: 'Pengetahuan Profesional', en: 'Professional Knowledge', ictcft: 'KD-1.a' },
  { id: 'D2', code: 'D2', name: 'Amalan Pengajaran',       en: 'Instructional Practice', ictcft: 'KD-2.b' },
  { id: 'D3', code: 'D3', name: 'Penglibatan Komuniti',    en: 'Community Engagement',   ictcft: 'KD-5.a' },
  { id: 'D4', code: 'D4', name: 'Kualiti Peribadi',        en: 'Personal Quality',       ictcft: 'KD-6.c' },
];

const MODULES = [
  {
    id: 'M-204', title: 'Active learning in rural classrooms',
    titleBM: 'Pembelajaran aktif di bilik darjah luar bandar',
    domain: 'D2', sizeMB: 12, durationMin: 25, chapters: 4, lang: ['BM','EN'],
    summary: 'Practical strategies to engage learners in low-resource settings.',
    summaryBM: 'Strategi praktikal untuk melibatkan murid di persekitaran kurang sumber.',
    coAuthor: '#CikguJuaraDigital - Sabah', state: 'downloaded', progress: 0.6, icon: 'bookOpen',
  },
  {
    id: 'M-187', title: 'Inclusive teaching basics',
    titleBM: 'Asas pengajaran inklusif',
    domain: 'D1', sizeMB: 18, durationMin: 30, chapters: 4, lang: ['BM','EN'],
    summary: 'Create supportive and inclusive classrooms for all learners.',
    summaryBM: 'Bina bilik darjah yang menyokong dan inklusif untuk semua murid.',
    coAuthor: 'BPG - IPG Kampus Keningau', state: 'downloaded', progress: 0.35, icon: 'heart',
  },
  {
    id: 'M-156', title: 'Digital worksheet ideas',
    titleBM: 'Idea lembaran kerja digital',
    domain: 'D2', sizeMB: 9, durationMin: 18, chapters: 3, lang: ['BM','EN'],
    summary: 'Save time with creative, ready-to-use digital worksheets.',
    summaryBM: 'Jimat masa dengan lembaran kerja digital yang kreatif dan sedia digunakan.',
    coAuthor: 'UPPLB - UMS', state: 'available', progress: 0, icon: 'fileText',
  },
  {
    id: 'M-211', title: 'Reflective teaching practice',
    titleBM: 'Amalan pengajaran reflektif',
    domain: 'D4', sizeMB: 11, durationMin: 22, chapters: 3, lang: ['BM','EN'],
    summary: 'Build your practice through reflection and continuous improvement.',
    summaryBM: 'Bina amalan anda melalui refleksi dan penambahbaikan berterusan.',
    coAuthor: 'KDCA pilot', state: 'available', progress: 0, icon: 'edit3',
  },
];

const COPY = {
  EN: {
    home: 'Home', learn: 'Modules', add: 'Add evidence', sync: 'Sync queue', record: 'My record',
    welcomeTagline: 'Offline-first CPD companion',
    welcomeSub: 'Learn anytime. Sync when online.',
    chooseLanguage: 'Choose your language',
    youreOnline: "You're online",
    youreOffline: "You're offline",
    goodTimeToDownload: 'Good time to download new modules.',
    waitingForConnection: 'Your work stays on this phone until you reconnect. Try a NADI or PKG Pitas centre.',
    start: 'Start',
    howItWorks: 'How it works',
    hi: 'Hi,',
    online: 'Online', offline: 'Offline',
    savedOnThisPhone: 'Saved on this phone',
    readyToSync: 'Ready to sync',
    downloadedModules: 'Downloaded modules',
    completedThisWeek: 'Completed this week',
    items: 'items', modules: 'modules',
    continueLearning: 'Continue learning',
    quickActions: 'Quick actions',
    modulesNav: 'Modules', addEvidenceNav: 'Add evidence', syncQueueNav: 'Sync queue', myRecordNav: 'My record',
    searchModule: 'Search module',
    goodTimeToDownloadTitle: 'Good time to download',
    goodTimeToDownloadBody: 'Modules will be ready offline anywhere.',
    openOffline: 'Use offline',
    download: 'Download',
    sectionTryInClass: 'Section 2: Try it in class',
    sectionTryInClassBody: 'Put these ideas into practice with your students. Choose one activity that fits your context and give it a try this week.',
    yourChecklist: 'Your checklist',
    readTheIdea: 'Read the idea',
    tryOneActivity: 'Try one activity',
    writeReflection: 'Write reflection',
    reflectionNotes: 'Reflection notes',
    writeYourNotes: 'Write your notes here…',
    saveOffline: 'Save offline',
    savedOnPhonePill: 'Saved on this phone',
    addEvidenceTitle: 'Add Evidence',
    takeClassroomPhoto: 'Take classroom photo',
    tapToOpenCamera: 'Tap to open camera',
    facesWillBeBlurred: 'Pupil faces will be blurred before upload.',
    photoCaptured: 'Photo captured · faces blurred',
    shortReflection: 'Short reflection',
    shareReflection: 'Share a short reflection on how you implemented this module…',
    moduleField: 'Module', chooseModule: 'Choose module',
    sgmDomainField: 'SGM 2.0 domain', chooseDomain: 'Choose domain',
    evidenceDate: 'Evidence date',
    saveOnThisPhone: 'Save on this phone',
    syncQueueTitle: 'Sync Queue',
    itemsWaitingToSync: 'items waiting to sync',
    itemWaitingToSync: 'item waiting to sync',
    tapSyncNow: 'Tap Sync now to upload.',
    syncNow: 'Sync now',
    queueLabel: 'QUEUE',
    synced: 'Synced', queued: 'Queued', retry: 'Retry',
    tapToRetry: 'Tap to retry',
    whoCanSeeThis: 'Who can see this?',
    youFullEvidence: 'You — full evidence and reflection',
    guruBesarCounts: 'Guru Besar — counts in weekly summary only',
    ppdAggregated: 'PPD officer — aggregated district counts',
    myCpdRecord: 'My CPD Record',
    sgm2Progress: 'SGM 2.0 progress',
    term2_2026: 'Term 2, 2026',
    recentSubmissions: 'Recent submissions',
    reflectionLessonPlanning: 'Reflection — Lesson planning',
    dataUseReceipt: 'Data-use receipt',
    duWhat: 'What was uploaded:', duWhatBody: 'photo (faces blurred), reflection, module link, SGM domain, date.',
    duWhen: 'When:', duWhenBody: '17/05/2026 · last sync.',
    duWhich: 'Which domain:', duWhichBody: 'SGM 2.0 D2 · Instructional Practice.',
    duWho: 'Who can access:', duWhoBody: 'you (full), school leader (counts), PPD (aggregated). Not used for punishment.',
    duRetention: 'Retention:', duRetentionBody: 'kept for 3 SGM cycles, then auto-archived to BPG. You can request earlier deletion.',
    duOmbudsperson: 'Report misuse:', duOmbudspersonBody: 'PPD Keningau data ombudsperson · ombudsperson@ppd.keningau.my',
    schoolSummaryTitle: 'School Summary',
    weeklyDigestTitle: 'Weekly Digest · Wk 19, 2026',
    weeklyDigestCaption: 'Sent automatically · no login needed',
    skPitasThisWeek: 'SK Pitas — this week',
    sgm2Activity: 'SGM 2.0 activity',
    activeTeachers: 'Active teachers',
    modulesCompleted: 'Modules completed',
    evidenceSubmitted: 'Evidence submitted',
    queuedOffline: 'Queued offline',
    whoMayNeedSupport: 'Who may need support',
    teachersCount: 'teachers',
    districtDashboardTitle: 'District Dashboard',
    pegawaiNorhaida: 'Pegawai Norhaida',
    ppdKeningau: 'PPD Keningau · 64 schools (Interior)',
    evidenceSynced: 'Evidence synced',
    offlineSchools: 'Offline schools',
    queuedDistrict: 'Queued (district)',
    plusThisMonth: '+38 this month',
    plusMoM: '+22% MoM',
    pctOfDistrict: '~26% of district',
    awaitingSync: 'awaiting sync',
    keningauDistrict: 'Keningau district',
    d3InsightLead: 'D3 below 50% target.',
    d3InsightBody: 'Suggest pairing with #CikguJuara mentors next term.',
    schoolsNeedingConnectivity: 'Schools needing connectivity support',
    schoolsNeedingSub: 'Last sync > 30 days · supports support-visit decisions, not penalties.',
    allSchoolsSynced: 'All schools synced this week.',
    // Edge cases
    edgeBlockedTitle: 'Cannot download while offline',
    edgeBlockedBody: 'You need a connection to download new modules. Try again when you reach a NADI centre or have mobile data.',
    edgeBlockedPrimary: 'Got it', edgeBlockedSecondary: 'Show downloaded modules',
    edgeUploadTitle: 'Upload failed',
    edgeUploadBody: 'Network dropped during upload. Your evidence is safe on this phone. It will retry automatically when the connection is stable.',
    edgeUploadPrimary: 'Tap to retry', edgeUploadSecondary: 'Keep in queue',
    edgeUploadDetail: 'Item: Evidence — Active learning · Retry count: 2 of 5',
    edgeIncompleteTitle: 'Something needs your attention',
    edgeIncompleteBody: 'Before we save this evidence, please fix:',
    edgeIncompleteItem1: 'SGM 2.0 domain is missing — every evidence needs one.',
    edgeIncompleteItem2: 'Reflection is shorter than 10 characters.',
    edgeIncompleteItem3: 'We could not detect pupil faces clearly. Confirm the photo is safe to upload.',
    edgeIncompletePrimary: 'Fix now', edgeIncompleteSecondary: 'Save as draft',
    edgeStorageTitle: 'Local phone storage is low',
    edgeStorageBody: 'CikguSync is using 412 MB on this phone. Sync soon to free space, or delete older downloaded modules.',
    edgeStoragePrimary: 'Sync now', edgeStorageSecondary: 'Manage downloads',
  },
  BM: {
    home: 'Utama', learn: 'Modul', add: 'Tambah bukti', sync: 'Baris gilir', record: 'Rekod saya',
    welcomeTagline: 'Rakan CPD luar talian dahulu',
    welcomeSub: 'Belajar bila-bila. Sync apabila ada talian.',
    chooseLanguage: 'Pilih bahasa anda',
    youreOnline: 'Anda dalam talian',
    youreOffline: 'Anda luar talian',
    goodTimeToDownload: 'Masa yang baik untuk muat turun modul baharu.',
    waitingForConnection: 'Kerja anda kekal dalam telefon sehingga anda sambung semula. Cuba pusat NADI atau PKG Pitas.',
    start: 'Mula',
    howItWorks: 'Cara ia berfungsi',
    hi: 'Hai,',
    online: 'Online', offline: 'Luar talian',
    savedOnThisPhone: 'Disimpan dalam telefon',
    readyToSync: 'Sedia untuk sync',
    downloadedModules: 'Modul dimuat turun',
    completedThisWeek: 'Selesai minggu ini',
    items: 'item', modules: 'modul',
    continueLearning: 'Sambung belajar',
    quickActions: 'Tindakan pantas',
    modulesNav: 'Modul', addEvidenceNav: 'Tambah bukti', syncQueueNav: 'Baris gilir', myRecordNav: 'Rekod saya',
    searchModule: 'Cari modul',
    goodTimeToDownloadTitle: 'Masa baik untuk muat turun',
    goodTimeToDownloadBody: 'Modul akan sedia luar talian di mana sahaja.',
    openOffline: 'Guna luar talian',
    download: 'Muat turun',
    sectionTryInClass: 'Bahagian 2: Cuba di kelas',
    sectionTryInClassBody: 'Cuba idea ini bersama murid anda. Pilih satu aktiviti yang sesuai dengan konteks anda dan cuba minggu ini.',
    yourChecklist: 'Senarai semak anda',
    readTheIdea: 'Baca idea',
    tryOneActivity: 'Cuba satu aktiviti',
    writeReflection: 'Tulis refleksi',
    reflectionNotes: 'Nota refleksi',
    writeYourNotes: 'Tulis nota anda di sini…',
    saveOffline: 'Simpan luar talian',
    savedOnPhonePill: 'Disimpan dalam telefon',
    addEvidenceTitle: 'Tambah Bukti',
    takeClassroomPhoto: 'Ambil foto bilik darjah',
    tapToOpenCamera: 'Ketik untuk buka kamera',
    facesWillBeBlurred: 'Wajah murid akan dikaburkan sebelum dimuat naik.',
    photoCaptured: 'Foto diambil · wajah dikaburkan',
    shortReflection: 'Refleksi ringkas',
    shareReflection: 'Kongsi refleksi ringkas tentang cara anda melaksanakan modul ini…',
    moduleField: 'Modul', chooseModule: 'Pilih modul',
    sgmDomainField: 'Domain SGM 2.0', chooseDomain: 'Pilih domain',
    evidenceDate: 'Tarikh bukti',
    saveOnThisPhone: 'Simpan dalam telefon',
    syncQueueTitle: 'Baris Gilir Sync',
    itemsWaitingToSync: 'item sedang menunggu sync',
    itemWaitingToSync: 'item sedang menunggu sync',
    tapSyncNow: 'Ketik Sync sekarang untuk muat naik.',
    syncNow: 'Sync sekarang',
    queueLabel: 'BARIS GILIR',
    synced: 'Selesai', queued: 'Menunggu', retry: 'Cuba',
    tapToRetry: 'Ketik untuk cuba lagi',
    whoCanSeeThis: 'Siapa boleh lihat ini?',
    youFullEvidence: 'Anda — bukti dan refleksi penuh',
    guruBesarCounts: 'Guru Besar — kiraan dalam ringkasan mingguan',
    ppdAggregated: 'Pegawai PPD — kiraan daerah agregat',
    myCpdRecord: 'Rekod CPD Saya',
    sgm2Progress: 'Kemajuan SGM 2.0',
    term2_2026: 'Penggal 2, 2026',
    recentSubmissions: 'Penghantaran terkini',
    reflectionLessonPlanning: 'Refleksi — Perancangan pelajaran',
    dataUseReceipt: 'Resit penggunaan data',
    duWhat: 'Apa yang dimuat naik:', duWhatBody: 'foto (wajah dikaburkan), refleksi, pautan modul, domain SGM, tarikh.',
    duWhen: 'Bila:', duWhenBody: '17/05/2026 · sync terakhir.',
    duWhich: 'Domain mana:', duWhichBody: 'SGM 2.0 D2 · Amalan Pengajaran.',
    duWho: 'Siapa boleh akses:', duWhoBody: 'anda (penuh), guru besar (kiraan), PPD (agregat). Tidak digunakan untuk hukuman.',
    duRetention: 'Pengekalan:', duRetentionBody: 'disimpan untuk 3 kitaran SGM, kemudian diarkibkan ke BPG. Anda boleh minta padam lebih awal.',
    duOmbudsperson: 'Laporkan salah guna:', duOmbudspersonBody: 'Pegawai pengadu data PPD Keningau · ombudsperson@ppd.keningau.my',
    schoolSummaryTitle: 'Ringkasan Sekolah',
    weeklyDigestTitle: 'Ringkasan Mingguan · Mgg 19, 2026',
    weeklyDigestCaption: 'Dihantar automatik · tiada log masuk',
    skPitasThisWeek: 'SK Pitas — minggu ini',
    sgm2Activity: 'Aktiviti SGM 2.0',
    activeTeachers: 'Guru aktif',
    modulesCompleted: 'Modul selesai',
    evidenceSubmitted: 'Bukti dihantar',
    queuedOffline: 'Menunggu luar talian',
    whoMayNeedSupport: 'Siapa mungkin perlukan bantuan',
    teachersCount: 'guru',
    districtDashboardTitle: 'Papan Pemuka Daerah',
    pegawaiNorhaida: 'Pegawai Norhaida',
    ppdKeningau: 'PPD Keningau · 64 sekolah (Pedalaman)',
    evidenceSynced: 'Bukti sync',
    offlineSchools: 'Sekolah luar talian',
    queuedDistrict: 'Menunggu (daerah)',
    plusThisMonth: '+38 bulan ini',
    plusMoM: '+22% berbanding bulan lalu',
    pctOfDistrict: '~26% daerah',
    awaitingSync: 'menunggu sync',
    keningauDistrict: 'Daerah Keningau',
    d3InsightLead: 'D3 di bawah sasaran 50%.',
    d3InsightBody: 'Cadangkan padanan dengan mentor #CikguJuara penggal hadapan.',
    schoolsNeedingConnectivity: 'Sekolah perlukan bantuan ketersambungan',
    schoolsNeedingSub: 'Sync terakhir > 30 hari · menyokong keputusan lawatan bantuan, bukan denda.',
    allSchoolsSynced: 'Semua sekolah sync minggu ini.',
    edgeBlockedTitle: 'Tidak boleh muat turun luar talian',
    edgeBlockedBody: 'Anda perlukan sambungan untuk memuat turun modul baharu. Cuba lagi apabila tiba di pusat NADI atau ada data mudah alih.',
    edgeBlockedPrimary: 'Faham', edgeBlockedSecondary: 'Tunjukkan modul dimuat turun',
    edgeUploadTitle: 'Muat naik gagal',
    edgeUploadBody: 'Talian terputus semasa muat naik. Bukti anda selamat dalam telefon. Ia akan cuba semula apabila sambungan stabil.',
    edgeUploadPrimary: 'Ketik untuk cuba lagi', edgeUploadSecondary: 'Kekal dalam baris gilir',
    edgeUploadDetail: 'Item: Bukti — Pembelajaran aktif · Kiraan cuba: 2 daripada 5',
    edgeIncompleteTitle: 'Ada perkara perlu perhatian anda',
    edgeIncompleteBody: 'Sebelum kami simpan bukti ini, sila betulkan:',
    edgeIncompleteItem1: 'Domain SGM 2.0 tiada — setiap bukti perlukan satu.',
    edgeIncompleteItem2: 'Refleksi lebih pendek daripada 10 aksara.',
    edgeIncompleteItem3: 'Wajah murid tidak dapat dikesan dengan jelas. Sahkan foto selamat untuk dimuat naik.',
    edgeIncompletePrimary: 'Betulkan sekarang', edgeIncompleteSecondary: 'Simpan sebagai draf',
    edgeStorageTitle: 'Storan telefon hampir penuh',
    edgeStorageBody: 'CikguSync menggunakan 412 MB dalam telefon ini. Sync sekarang untuk lapangkan ruang, atau padam modul lama.',
    edgeStoragePrimary: 'Sync sekarang', edgeStorageSecondary: 'Urus muat turun',
  },
};

function langKey(s) { return s?.language === 'EN' ? 'EN' : 'BM'; }
function tx(s, k) { const L = langKey(s); return COPY[L][k] || COPY.EN[k] || k; }
function moduleTitle(m, s) { return langKey(s) === 'BM' ? (m.titleBM || m.title) : m.title; }
function moduleSummary(m, s) { return langKey(s) === 'BM' ? (m.summaryBM || m.summary) : m.summary; }

const SEED_EVIDENCE = [
  { id: 'EV-0091', moduleId: 'M-156', domain: 'D4', date: '2026-05-12', title: 'Reflection — Lesson planning', meta: 'Saved today 03:31 PM · SGM D4', synced: true,  syncedAt: '12 May 15:31' },
  { id: 'EV-0094', moduleId: 'M-187', domain: 'D1', date: '2026-05-14', title: 'Evidence — Inclusive teaching basics', meta: 'Saved today 12:31 PM · SGM D1', synced: false, retry: 2 },
  { id: 'EV-0099', moduleId: 'M-204', domain: 'D2', date: '2026-05-14', title: 'Evidence — Active learning in rural classrooms', meta: 'Saved today 01:31 PM · SGM D2', synced: false, retry: 0 },
];

const RURAL_SCHOOLS = [
  { id: 'SK-NAB-04', name: 'SK Nabawan Utara',  district: 'Nabawan',  rural: 'R2', teachers: 7,  connected: false, evidence30d: 12, last: '5d',  status: 'active' },
  { id: 'SK-PIT-12', name: 'SK Sungai Pitas',   district: 'Pitas',    rural: 'R2', teachers: 9,  connected: false, evidence30d: 18, last: '2d',  status: 'active' },
  { id: 'SK-KEN-22', name: 'SK Bingkor',        district: 'Keningau', rural: 'R1', teachers: 14, connected: true,  evidence30d: 31, last: '1h',  status: 'active' },
  { id: 'SK-TEN-08', name: 'SK Kemabong',       district: 'Tenom',    rural: 'R2', teachers: 8,  connected: true,  evidence30d: 9,  last: '6d',  status: 'low' },
  { id: 'SK-NAB-11', name: 'SK Sapulut',        district: 'Nabawan',  rural: 'R3', teachers: 5,  connected: false, evidence30d: 4,  last: '12d', status: 'low' },
  { id: 'SK-TAM-03', name: 'SK Kaingaran',      district: 'Tambunan', rural: 'R1', teachers: 11, connected: true,  evidence30d: 22, last: '3h',  status: 'active' },
  { id: 'SK-SIP-07', name: 'SK Mendulong',      district: 'Sipitang', rural: 'R2', teachers: 6,  connected: false, evidence30d: 7,  last: '8d',  status: 'low' },
  { id: 'SK-KEN-31', name: 'SK Apin-Apin',      district: 'Keningau', rural: 'R1', teachers: 12, connected: true,  evidence30d: 28, last: '4h',  status: 'active' },
];

// Logo - circular book-with-arrows brand mark. Per spec §1.5, reproduced
// inline as SVG; 88 px on the Welcome screen, smaller elsewhere.
function Logo({ size = 40, brand = false }) {
  return (
    <div style={{
      width: size, height: size,
      background: brand ? T.navy : '#fff',
      border: brand ? 'none' : `1px solid ${T.line}`,
      borderRadius: '50%',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none"
        stroke={brand ? '#fff' : T.navy} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h7a3 3 0 0 1 3 3v11" />
        <path d="M21 5h-7a3 3 0 0 0-3 3v11" />
        <path d="M5 18a16 16 0 0 1 4 1.5" />
        <path d="M19 18a16 16 0 0 0-4 1.5" />
      </svg>
    </div>
  );
}

// Lucide-style line icons. ~1.6 px stroke, rounded caps. Names match spec §1.5.
const Icon = ({ name, size = 20, color = 'currentColor', stroke = 1.6, style }) => {
  const paths = {
    // Navigation
    home: 'M3 11l9-8 9 8M5 10v10h14V10',
    bookOpen: 'M2 4h7a3 3 0 0 1 3 3v13M22 4h-7a3 3 0 0 0-3 3v13',
    book: 'M2 4h7a3 3 0 0 1 3 3v13M22 4h-7a3 3 0 0 0-3 3v13',
    camera: 'M4 7h3l2-2h6l2 2h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 5-6 8-6s7 2 8 6',
    // Sync / cloud
    cloudUpload: 'M7 19a4 4 0 1 1 0-8 5 5 0 0 1 9.5-1A4 4 0 1 1 17 19M12 12v8M9 15l3-3 3 3',
    cloudOff: 'M3 3l18 18M8 8a5 5 0 0 1 8 1 4 4 0 0 1 3 7M5 13a4 4 0 0 0 2 6h10',
    refreshCw: 'M21 12a9 9 0 1 1-3-6.7M21 3v6h-6',
    sync: 'M21 12a9 9 0 1 1-3-6.7M21 3v6h-6',
    // Status
    checkCircle2: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12l3 3 5-6',
    check: 'M4 12l5 5L20 6',
    alertTriangle: 'M12 3l10 18H2zM12 9v5M12 17.5v.5',
    warn: 'M12 3l10 18H2zM12 9v5M12 17.5v.5',
    info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 11v6M12 7.5v.5',
    // UI
    chevronLeft: 'M15 6l-9 6 9 6',
    chevronRight: 'M9 6l6 6-6 6',
    chevronDown: 'M6 9l6 6 6-6',
    chevL: 'M15 6l-9 6 9 6',
    chevR: 'M9 6l6 6-6 6',
    chevD: 'M6 9l6 6 6-6',
    moreHorizontal: 'M5 12h.01M12 12h.01M19 12h.01',
    search: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-6-6',
    filter: 'M3 5h18l-7 9v6l-4-2v-4z',
    // Content
    fileText: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6M8 9h2',
    shield: 'M12 22s8-3 8-12V5l-8-3-8 3v5c0 9 8 12 8 12z',
    calendar: 'M3 7h18v14H3zM3 7l1-3h16l1 3M8 3v4M16 3v4',
    download: 'M12 3v12m-5-5l5 5 5-5M5 21h14',
    smartphone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01',
    map: 'M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2zM9 3v16M15 5v16',
    heart: 'M12 21s-7-6-7-12a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6-7 12-7 12z',
    edit3: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    plus: 'M12 5v14M5 12h14',
    close: 'M6 6l12 12M6 18L18 6',
    spark: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    pin: 'M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    record: 'M9 3h6l1 3h4v15H4V6h4zM12 11v6M9 14h6',
    arrowR: 'M5 12h14m-6-6 6 6-6 6',
    bell: 'M6 19V11a6 6 0 1 1 12 0v8M4 19h16M10 22h4',
    chat: 'M21 12a8 8 0 1 1-3.2-6.4L21 5l-1 4a8 8 0 0 1 1 3z',
    school: 'M3 21V10l9-5 9 5v11M9 21v-6h6v6M3 21h18',
    sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    cloud: 'M7 17a4 4 0 1 1 0-8 5 5 0 0 1 9.5-1A4 4 0 1 1 17 17H7z',
    off: 'M3 3l18 18M8 8a5 5 0 0 1 8 1 4 4 0 0 1 3 7M5 12a4 4 0 0 0 2 7h10',
    dot: 'M12 12.5h.01',
    fingerprint: 'M7 16a8 8 0 0 0 10-8M5 12a7 7 0 0 1 13-3M12 22v-8',
    globe: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM2 12h20M12 2a16 16 0 0 1 0 20M12 2a16 16 0 0 0 0 20',
    play: 'M6 4l14 8-14 8z',
    queue: 'M4 6h16M4 12h16M4 18h10',
    export: 'M12 3v12m5-5l-5 5-5-5M4 21h16',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.dot} />
    </svg>
  );
};

// Tiny atoms still used by old code paths (kept until those paths are fully
// migrated to the spec components). Hairline borders only, no shadows.
function Card({ children, style }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.line}`,
      borderRadius: R.card, padding: SPACE.l, ...style,
    }}>{children}</div>
  );
}
function SectionHead({ title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: SPACE.s, marginBottom: SPACE.m }}>
      <div style={{ ...TYPE.sectionHead }}>{title}</div>
      {right}
    </div>
  );
}
const Dot = ({ color = T.ink3, size = 6, style }) => (
  <span style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'inline-block', ...style }} />
);

Object.assign(window, {
  T, TYPE, R, SPACE,
  SGM_DOMAINS, MODULES, COPY, tx, langKey, moduleTitle, moduleSummary,
  SEED_EVIDENCE, RURAL_SCHOOLS,
  Logo, Icon, Card, SectionHead, Dot,
});
