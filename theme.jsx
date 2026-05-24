// CikguSync - design tokens (CSS variables), brand assets, mock data, shared atoms.
// Two themes (light + dim) are defined as CSS variables on <body>. Components read
// `T.navy` etc which evaluates to `var(--cs-navy)`, so a single attribute flip on
// document.body restyles the entire app without any React re-render plumbing.

const T = {
  // Backgrounds & surfaces
  bg:        'var(--cs-bg)',
  surface:   'var(--cs-bg2)',
  surface2:  'var(--cs-bg3)',
  card:      'var(--cs-card)',
  cardElev:  'var(--cs-card-elev)',
  border:    'var(--cs-border)',
  borderS:   'var(--cs-border-strong)',
  // Text
  text:      'var(--cs-text)',
  text2:     'var(--cs-text-2)',
  text3:     'var(--cs-text-3)',
  // Brand
  navy:      'var(--cs-navy)',
  navyDark:  'var(--cs-navy-dark)',
  navyDeep:  'var(--cs-navy-deep)',
  teal:      'var(--cs-teal)',
  tealDark:  'var(--cs-teal-dark)',
  tealSoft:  'var(--cs-teal-soft)',
  // Semantic
  success:   'var(--cs-success)',
  successS:  'var(--cs-success-soft)',
  warn:      'var(--cs-warn)',
  warnS:     'var(--cs-warn-soft)',
  queue:     'var(--cs-queue)',
  queueS:    'var(--cs-queue-soft)',
  danger:    'var(--cs-danger)',
  dangerS:   'var(--cs-danger-soft)',
  // Elevation
  shadow1:   'var(--cs-shadow-1)',
  shadow2:   'var(--cs-shadow-2)',
  shadow3:   'var(--cs-shadow-3)',
};

const SGM_DOMAINS = [
  { id: 'D1', code: 'D1', name: 'Pengetahuan Profesional', en: 'Professional Knowledge', ictcft: 'KD-1.a' },
  { id: 'D2', code: 'D2', name: 'Amalan Pengajaran',       en: 'Instructional Practice', ictcft: 'KD-2.b' },
  { id: 'D3', code: 'D3', name: 'Penglibatan Komuniti',    en: 'Community Engagement',   ictcft: 'KD-5.a' },
  { id: 'D4', code: 'D4', name: 'Kualiti Peribadi',        en: 'Personal Quality',       ictcft: 'KD-6.c' },
];

const MODULES = [
  {
    id: 'M-204',
    title: 'Low-bandwidth literacy strategies',
    titleBM: 'Strategi literasi jalur lebar rendah',
    domain: 'D2',
    sizeMB: 18.4,
    durationMin: 25,
    chapters: 4,
    lang: ['BM','EN'],
    summary: 'Three classroom routines that move reading practice off-screen when the router drops.',
    summaryBM: 'Tiga rutin bilik darjah untuk latihan membaca apabila router terputus.',
    coAuthor: '#CikguJuaraDigital - Sabah',
    state: 'downloaded',
    progress: 1.0,
  },
  {
    id: 'M-187',
    title: 'Print-from-screen lesson kits',
    titleBM: 'Kit pelajaran cetak-dari-skrin',
    domain: 'D2',
    sizeMB: 11.2,
    durationMin: 18,
    chapters: 3,
    lang: ['BM','EN','KDZ'],
    summary: 'Hand out a printable when you only have one router morning.',
    summaryBM: 'Sediakan bahan cetak apabila sambungan hanya stabil pada waktu pagi.',
    coAuthor: 'BPG - IPG Kampus Keningau',
    state: 'available',
    progress: 0,
  },
  {
    id: 'M-156',
    title: 'Group reading without devices',
    titleBM: 'Bacaan berkumpulan tanpa peranti',
    domain: 'D1',
    sizeMB: 9.8,
    durationMin: 15,
    chapters: 3,
    lang: ['BM','EN','KDZ'],
    summary: 'Pair-and-share routines for a class of 30 with no tablets.',
    summaryBM: 'Rutin pasangan dan perkongsian untuk kelas 30 murid tanpa tablet.',
    coAuthor: 'UPPLB - UMS',
    state: 'completed',
    progress: 1.0,
  },
  {
    id: 'M-211',
    title: 'Parent summaries in Kadazandusun',
    titleBM: 'Ringkasan ibu bapa dalam Kadazandusun',
    domain: 'D3',
    sizeMB: 6.4,
    durationMin: 12,
    chapters: 2,
    lang: ['BM','KDZ'],
    summary: 'How to write a one-page weekly note parents can read aloud.',
    summaryBM: 'Cara menulis nota mingguan satu halaman yang boleh dibaca ibu bapa.',
    coAuthor: 'KDCA pilot',
    state: 'available',
    progress: 0,
  },
];

const COPY = {
  EN: {
    home: 'Home',
    learn: 'Learn',
    add: 'Add',
    record: 'Record',
    profile: 'Profile',
    goodMorning: 'Good morning,',
    continue: 'Continue',
    resume: 'Resume',
    chapter: 'Chapter',
    minLeft: 'min left',
    addEvidence: 'Add classroom evidence',
    captureBlurTagReflect: 'Capture, blur, tag, reflect',
    myRecord: 'My SGM 2.0 record',
    thisCycle: 'this cycle',
    viewRecord: 'View record',
    pinnedForYou: 'Pinned for you',
    seeAll: 'See all',
    modules: 'Modules',
    all: 'All',
    available: 'Available',
    onPhone: 'On phone',
    done: 'Done',
    online: 'Online',
    offline: 'Offline',
    queued: 'queued',
    synced: 'synced',
    item: 'item',
    items: 'items',
    of: 'of',
    get: 'Get',
    download: 'Download',
    downloading: 'downloading...',
    openModule: 'Open module',
    reviewNotes: 'Review notes',
    needConnection: 'Need a connection. Try the morning 4G window or a NADI centre.',
    moduleDownloaded: 'Module downloaded. Works offline now.',
    onPhoneReady: 'On phone, ready',
    completedReview: 'Completed, review notes',
    tapToDownload: 'tap to download',
    moduleInfo: 'Each bundle is capped at 25 MB. Download during a connection window, then complete offline. Co-authored with #CikguJuaraDigital Champion Teachers.',
    kdzPack: 'KDZ pack',
    worksOffline: 'On this phone. Works offline.',
    chapters: 'Chapters',
    tryInClass: 'Try it in class',
    tryInClassBody: 'Take one photo of the seating layout you used and tag it to D2, Instructional Practice.',
    chapterBody: 'When the router cuts out mid-lesson, change the reading session format. Pair pupils by reading level, hand each pair one printable card, and rotate after four minutes. The teacher walks one row of pairs at a time.',
    prev: 'Prev',
    nextChapter: 'Next chapter',
    markComplete: 'Mark complete',
    moduleComplete: 'Module complete. Counts toward SGM 2.0 PPB.',
    addEvidenceForModule: 'Add evidence for this module',
    addEvidenceTitle: 'Add evidence',
    photo: 'Photo',
    tapCamera: 'Tap to use camera',
    sample: 'sample',
    pickSample: 'or pick a sample',
    faceBlur: 'Face blur',
    faceBlurInfo: 'Pupil faces blur on the device before the image leaves your phone. PDPA (Amendment) Act 2024.',
    retake: 'Retake',
    tagDomain: 'Tag SGM 2.0 domain',
    linkModule: 'Link to a module',
    optional: 'optional',
    noModule: 'No module',
    reflection: 'Reflection',
    reflectionPlaceholder: 'What did you try? What worked, what would you change?',
    avoidPupilNames: 'Avoid pupil names. Stored on this phone first.',
    whoCanSee: 'Who can see this?',
    capturePhotoFirst: 'Capture a photo first.',
    tagDomainError: 'Tag an SGM 2.0 domain so this counts.',
    reflectionError: 'Add at least one sentence of reflection.',
    submittedSyncing: 'Submitted. Syncing',
    savedSyncLater: 'Saved on this phone.',
    willSync: 'will sync when online',
    submitSyncNow: 'Submit, sync now',
    saveSyncLater: 'Save, sync later',
    myCpdRecord: 'My CPD record',
    evidenceThisCycle: 'Evidence, this cycle',
    mapped: 'SGM 2.0, mapped to UNESCO ICT-CFT v3',
    auditPortability: 'Audit and portability',
    auditBody: 'Every item is timestamped, attributable, and exportable in a format that replaces the audit function previously handled by SPLKPM. Your record survives a school transfer.',
    portableInfo: 'Portable record. Follows you when you transfer schools. Replaces the audit function previously handled by SPLKPM, shut down in 2026.',
    appearance: 'Appearance',
    language: 'Language',
    syncData: 'Sync and data',
    about: 'About',
    light: 'Light',
    dim: 'Dim',
    fullInterface: 'Full interface',
    selectedModules: 'Selected modules',
    comingCoAuthor: 'Coming, co-author needed',
    languageInfo: 'Bahasa Malaysia and English are full interface languages. Kadazandusun is available for selected module summaries.',
    languagePackNotice: 'Kadazandusun is selected. The app shell stays in Bahasa Malaysia; modules tagged KDZ show the available language pack.',
    syncMobileData: 'Sync over mobile data',
    autoDownload: 'Auto-download next module',
    faceBlurCapture: 'Face blur on capture',
    bundleCap: 'Bundle size cap',
    dataBudget: 'Monthly data budget',
    dataBudgetValue: '200 MB per month',
    hostedBy: 'Hosted by',
    dataOwnership: 'Data ownership',
    pdpaCompliance: 'PDPA compliance',
  },
  BM: {
    home: 'Utama',
    learn: 'Belajar',
    add: 'Tambah',
    record: 'Rekod',
    profile: 'Profil',
    goodMorning: 'Selamat pagi,',
    continue: 'Sambung',
    resume: 'Sambung',
    chapter: 'Bab',
    minLeft: 'min lagi',
    addEvidence: 'Tambah bukti bilik darjah',
    captureBlurTagReflect: 'Ambil, kabur wajah, tag, refleksi',
    myRecord: 'Rekod SGM 2.0 saya',
    thisCycle: 'kitaran ini',
    viewRecord: 'Lihat rekod',
    pinnedForYou: 'Disyorkan untuk anda',
    seeAll: 'Lihat semua',
    modules: 'Modul',
    all: 'Semua',
    available: 'Tersedia',
    onPhone: 'Dalam telefon',
    done: 'Selesai',
    online: 'Online',
    offline: 'Luar talian',
    queued: 'menunggu',
    synced: 'sync selesai',
    item: 'item',
    items: 'item',
    of: 'daripada',
    get: 'Ambil',
    download: 'Muat turun',
    downloading: 'sedang muat turun...',
    openModule: 'Buka modul',
    reviewNotes: 'Semak nota',
    needConnection: 'Perlu sambungan. Cuba waktu 4G pagi atau pusat NADI.',
    moduleDownloaded: 'Modul dimuat turun. Boleh digunakan luar talian.',
    onPhoneReady: 'Dalam telefon, sedia',
    completedReview: 'Selesai, semak nota',
    tapToDownload: 'ketik untuk muat turun',
    moduleInfo: 'Setiap bundle dihadkan kepada 25 MB. Muat turun semasa ada sambungan, kemudian lengkapkan luar talian. Dibangunkan bersama Guru Juara Digital.',
    kdzPack: 'Pek KDZ',
    worksOffline: 'Dalam telefon ini. Boleh digunakan luar talian.',
    chapters: 'Bab',
    tryInClass: 'Cuba di kelas',
    tryInClassBody: 'Ambil satu foto susunan tempat duduk dan tag kepada D2, Amalan Pengajaran.',
    chapterBody: 'Apabila router terputus semasa kelas, ubah format sesi membaca. Pasangkan murid mengikut tahap bacaan, beri setiap pasangan satu kad cetak, dan tukar selepas empat minit. Guru bergerak dari satu baris pasangan ke baris seterusnya.',
    prev: 'Sebelum',
    nextChapter: 'Bab seterusnya',
    markComplete: 'Tanda selesai',
    moduleComplete: 'Modul selesai. Dikira untuk PPB SGM 2.0.',
    addEvidenceForModule: 'Tambah bukti untuk modul ini',
    addEvidenceTitle: 'Tambah bukti',
    photo: 'Foto',
    tapCamera: 'Ketik untuk kamera',
    sample: 'contoh',
    pickSample: 'atau pilih contoh',
    faceBlur: 'Kabur wajah',
    faceBlurInfo: 'Wajah murid dikaburkan dalam telefon sebelum imej keluar daripada peranti. Akta PDPA (Pindaan) 2024.',
    retake: 'Ambil semula',
    tagDomain: 'Tag domain SGM 2.0',
    linkModule: 'Pautkan kepada modul',
    optional: 'pilihan',
    noModule: 'Tiada modul',
    reflection: 'Refleksi',
    reflectionPlaceholder: 'Apa yang cikgu cuba? Apa yang berjaya, apa yang perlu diubah?',
    avoidPupilNames: 'Elakkan nama murid. Disimpan dalam telefon dahulu.',
    whoCanSee: 'Siapa boleh lihat?',
    capturePhotoFirst: 'Ambil foto dahulu.',
    tagDomainError: 'Tag domain SGM 2.0 supaya bukti ini dikira.',
    reflectionError: 'Tambah sekurang-kurangnya satu ayat refleksi.',
    submittedSyncing: 'Dihantar. Sedang sync',
    savedSyncLater: 'Disimpan dalam telefon.',
    willSync: 'akan sync apabila online',
    submitSyncNow: 'Hantar, sync sekarang',
    saveSyncLater: 'Simpan, sync nanti',
    myCpdRecord: 'Rekod CPD saya',
    evidenceThisCycle: 'Bukti, kitaran ini',
    mapped: 'SGM 2.0, dipadankan kepada UNESCO ICT-CFT v3',
    auditPortability: 'Audit dan mudah alih',
    auditBody: 'Setiap item mempunyai masa, pemilik, dan boleh dieksport dalam format yang menggantikan fungsi audit SPLKPM. Rekod cikgu kekal apabila berpindah sekolah.',
    portableInfo: 'Rekod mudah alih. Mengikut cikgu apabila berpindah sekolah. Menggantikan fungsi audit SPLKPM yang ditutup pada 2026.',
    appearance: 'Paparan',
    language: 'Bahasa',
    syncData: 'Sync dan data',
    about: 'Tentang',
    light: 'Cerah',
    dim: 'Malap',
    fullInterface: 'Antara muka penuh',
    selectedModules: 'Modul terpilih',
    comingCoAuthor: 'Akan datang, perlu penulis bersama',
    languageInfo: 'Bahasa Malaysia dan English ialah bahasa antara muka penuh. Kadazandusun tersedia untuk ringkasan modul terpilih.',
    languagePackNotice: 'Kadazandusun dipilih. Antara muka kekal dalam Bahasa Malaysia; modul bertanda KDZ menunjukkan pek bahasa yang tersedia.',
    syncMobileData: 'Sync melalui data mudah alih',
    autoDownload: 'Muat turun modul seterusnya automatik',
    faceBlurCapture: 'Kabur wajah semasa tangkap foto',
    bundleCap: 'Had saiz bundle',
    dataBudget: 'Bajet data bulanan',
    dataBudgetValue: '200 MB sebulan',
    hostedBy: 'Dihoskan oleh',
    dataOwnership: 'Pemilikan data',
    pdpaCompliance: 'Pematuhan PDPA',
  },
};

function langKey(s) {
  return s?.language === 'EN' ? 'EN' : 'BM';
}

function tx(s, key) {
  const lang = langKey(s);
  return COPY[lang][key] || COPY.EN[key] || key;
}

function moduleTitle(mod, s) {
  return langKey(s) === 'BM' ? (mod.titleBM || mod.title) : mod.title;
}

function moduleSummary(mod, s) {
  return langKey(s) === 'BM' ? (mod.summaryBM || mod.summary) : mod.summary;
}

const SEED_EVIDENCE = [
  { id: 'EV-0091', moduleId: 'M-156', domain: 'D1', date: '2026-05-09', synced: true, syncedAt: '09 May 07:12', note: 'Pair reading with Year 3, used printable from M-156.',         photoTone: '#cfd8d8' },
  { id: 'EV-0094', moduleId: 'M-156', domain: 'D2', date: '2026-05-11', synced: true, syncedAt: '11 May 07:31', note: 'Read-aloud rotation, 5 groups of 6. Worked without router.',   photoTone: '#d5d2c4' },
];

const RURAL_SCHOOLS = [
  { id: 'SK-NAB-04', name: 'SK Nabawan Utara',  district: 'Nabawan',  rural: 'R2', teachers: 7,  connected: false, evidence30d: 12, last: '5d',  status: 'active' },
  { id: 'SK-PIT-12', name: 'SK Sungai Pitas',   district: 'Pitas',    rural: 'R2', teachers: 9,  connected: false, evidence30d: 18, last: '2d',  status: 'active' },
  { id: 'SK-KEN-22', name: 'SK Bingkor',        district: 'Keningau', rural: 'R1', teachers: 14, connected: true,  evidence30d: 31, last: '1h',  status: 'active' },
  { id: 'SK-TEN-08', name: 'SK Kemabong',       district: 'Tenom',    rural: 'R2', teachers: 8,  connected: true,  evidence30d: 9,  last: '6d',  status: 'low'    },
  { id: 'SK-NAB-11', name: 'SK Sapulut',        district: 'Nabawan',  rural: 'R3', teachers: 5,  connected: false, evidence30d: 4,  last: '12d', status: 'low'    },
  { id: 'SK-TAM-03', name: 'SK Kaingaran',      district: 'Tambunan', rural: 'R1', teachers: 11, connected: true,  evidence30d: 22, last: '3h',  status: 'active' },
  { id: 'SK-SIP-07', name: 'SK Mendulong',      district: 'Sipitang', rural: 'R2', teachers: 6,  connected: false, evidence30d: 7,  last: '8d',  status: 'low'    },
  { id: 'SK-KEN-31', name: 'SK Apin-Apin',      district: 'Keningau', rural: 'R1', teachers: 12, connected: true,  evidence30d: 28, last: '4h',  status: 'active' },
];

// Logo - the brand mark used everywhere
function Logo({ size = 40, withWordmark = false }) {
  const logoSrc = (window.__resources && window.__resources.logo) || 'assets/logo.png';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: size, height: size, borderRadius: Math.max(9, size * 0.22),
        background: '#fff', boxShadow: 'var(--cs-logo-shadow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <img src={logoSrc} alt="CikguSync" draggable="false"
          style={{ width: '88%', height: 'auto', objectFit: 'contain', display: 'block', userSelect: 'none' }} />
      </div>
      {withWordmark && (
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1, letterSpacing: -0.2 }}>CikguSync</div>
          <div style={{ fontSize: 10, color: T.text3, marginTop: 3, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.3 }}>
            offline-first CPD - Sabah
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 14,
      boxShadow: T.shadow1,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHead({ title, right }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 12,
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: T.text2,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
      }}>
        {title}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

// Chip - tiny status pills
const Chip = ({ children, tone = 'default', mono, style }) => {
  const tones = {
    default: { bg: T.surface2,  fg: T.text2 },
    teal:    { bg: T.tealSoft,  fg: T.tealDark },
    success: { bg: T.successS,  fg: T.success },
    warn:    { bg: T.warnS,     fg: T.warn },
    queue:   { bg: T.queueS,    fg: T.queue },
    danger:  { bg: T.dangerS,   fg: T.danger },
    navy:    { bg: 'var(--cs-navy-soft)', fg: T.navy },
    ghost:   { bg: 'transparent', fg: T.text3 },
  };
  const c = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: c.bg, color: c.fg,
      fontSize: 10.5, lineHeight: 1, padding: '5px 9px',
      borderRadius: 999, fontWeight: 600, letterSpacing: 0.2,
      fontFamily: mono ? 'JetBrains Mono, monospace' : 'inherit',
      whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
};

const Dot = ({ color = T.text3, size = 8, style }) => (
  <span style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'inline-block', ...style }} />
);

// Mock classroom photo with face blur indicator
const ClassroomPlaceholder = ({ tone = '#cfd8d8', blurFaces = true, label = 'classroom evidence' }) => (
  <div style={{
    width: '100%', aspectRatio: '4 / 3', background: tone,
    backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 6px, transparent 6px 14px)`,
    position: 'relative', borderRadius: 12, overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8, padding: 14 }}>
      {[0,1,2].map(r => (
        <div key={r} style={{ display: 'flex', gap: 8 }}>
          {[0,1,2,3].map(c => (
            <div key={c} style={{ flex: 1, height: 16 + r*6, background: 'rgba(255,255,255,0.35)', borderRadius: 3 }} />
          ))}
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', top: '36%', left: '12%', display: 'flex', gap: 28 }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'rgba(255,255,255,0.55)',
          filter: blurFaces ? 'blur(6px)' : 'none',
        }} />
      ))}
    </div>
    <div style={{
      position: 'absolute', left: 10, bottom: 10,
      fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
      color: 'rgba(15,42,61,0.55)', letterSpacing: 0.4, textTransform: 'uppercase',
    }}>{label}</div>
    {blurFaces && (
      <div style={{
        position: 'absolute', right: 10, top: 10,
        background: 'rgba(15,42,61,0.85)', color: '#fff',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
        padding: '4px 7px', borderRadius: 4, letterSpacing: 0.4,
      }}>FACES BLURRED</div>
    )}
  </div>
);

// Linangkit motif - used very sparingly (module hero only)
const Linangkit = ({ size = 220, color = '#fff', opacity = 0.10, style }) => (
  <svg width={size} height={size * 0.45} viewBox="0 0 220 100" style={style} aria-hidden>
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <g key={i} transform={`translate(${i * 24 + 6} 0)`} opacity={opacity}>
        <path d="M12 14 L22 50 L12 86 L2 50 Z" fill={color} />
        <path d="M12 30 L18 50 L12 70 L6 50 Z" fill="none" stroke={color} strokeWidth="1" />
      </g>
    ))}
  </svg>
);

// Tiny SVG icon set
const Icon = ({ name, size = 18, color = 'currentColor', stroke = 1.7, style }) => {
  const paths = {
    home:    'M3 11l9-8 9 8M5 10v10h14V10',
    book:    'M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5zM18 3v18',
    camera:  'M4 7h3l2-2h6l2 2h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    record:  'M9 3h6l1 3h4v15H4V6h4zM12 11v6M9 14h6',
    user:    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 5-6 8-6s7 2 8 6',
    download:'M12 3v12m-5-5l5 5 5-5M5 21h14',
    check:   'M4 12l5 5L20 6',
    cloud:   'M7 17a4 4 0 1 1 0-8 5 5 0 0 1 9.5-1A4 4 0 1 1 17 17H7z',
    off:     'M3 3l18 18M8 8a5 5 0 0 1 8 1 4 4 0 0 1 3 7M5 12a4 4 0 0 0 2 7h10',
    sync:    'M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5',
    chevR:   'M9 6l6 6-6 6',
    chevL:   'M15 6l-9 6 9 6',
    chevD:   'M6 9l6 6 6-6',
    plus:    'M12 5v14M5 12h14',
    close:   'M6 6l12 12M6 18L18 6',
    queue:   'M4 6h16M4 12h16M4 18h10',
    search:  'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-6-6',
    bell:    'M6 19V11a6 6 0 1 1 12 0v8M4 19h16M10 22h4',
    eye:     'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    export:  'M12 3v12m5-5l-5 5-5-5M4 21h16',
    filter:  'M3 5h18l-7 9v6l-4-2v-4z',
    school:  'M3 21V10l9-5 9 5v11M9 21v-6h6v6M3 21h18',
    warn:    'M12 3l10 18H2zM12 10v5M12 18v.5',
    pin:     'M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    chat:    'M21 12a8 8 0 1 1-3.2-6.4L21 5l-1 4a8 8 0 0 1 1 3z',
    info:    'M12 8h.01M11 12h1v5h1M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    sun:     'M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
    moon:    'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    spark:   'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',
    dot:     'M12 12.5h.01',
    play:    'M6 4l14 8-14 8z',
    refresh: 'M21 12a9 9 0 1 1-3-6.7M21 3v6h-6',
    fingerprint: 'M7 16a8 8 0 0 0 10-8M5 12a7 7 0 0 1 13-3M12 22v-8',
    globe:   'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM2 12h20M12 2a16 16 0 0 1 0 20M12 2a16 16 0 0 0 0 20',
    arrowR:  'M5 12h14m-6-6 6 6-6 6',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || ''} />
    </svg>
  );
};

Object.assign(window, {
  T, SGM_DOMAINS, MODULES, SEED_EVIDENCE, RURAL_SCHOOLS,
  COPY, tx, langKey, moduleTitle, moduleSummary,
  Logo, Card, SectionHead, Chip, Dot, Linangkit, ClassroomPlaceholder, Icon,
});
