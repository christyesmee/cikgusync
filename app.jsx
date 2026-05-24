// CikguSync - Root App. Phone-shaped canvas centred on a neutral background
// (CIKGUSYNC_REDESIGN.md §2). A floating dock at the bottom-right toggles
// the demo panel (Scenarios / Requirements / Edge cases / Contributions /
// Intro) so the academic-demo material stays accessible without breaking the
// "phone-shaped canvas" rule of the spec.

// -----------------------------------------------------------------------------
// Scenarios + edge data + team + requirements - reused by the demo panel.
// -----------------------------------------------------------------------------
const SCENARIOS = [
  {
    id: 's1', persona: 'teacher',
    title: 'Cikgu Liana captures classroom evidence offline',
    duration: '2 min',
    role: 'Rural primary teacher (Persona 1, Assignment 2)',
    goal: 'Apply a low-bandwidth literacy routine in class and log it toward SGM 2.0 without internet.',
    decision: 'Liana confirms one teaching routine works in her actual classroom and earns SGM 2.0 credit that survives a transfer.',
    steps: [
      { tab: 'welcome', note: 'Liana opens CikguSync. She picks English, sees the offline-first hint, taps Start.' },
      { tab: 'home',    note: 'Home loads instantly even with the Offline pill showing.' },
      { tab: 'modules', note: 'Tap Modules. M-204 already downloaded.' },
      { tab: 'module',  note: 'Open module offline. Checklist + reflection notes + Save offline.' },
      { tab: 'add',     note: 'Tap Add evidence. Camera tile, privacy strip, four fields.' },
      { tab: 'add',     note: 'Pick a sample photo - tile flips to dark "Photo captured · faces blurred".' },
      { tab: 'sync',    note: 'Open Sync queue. Counter card, Synced / Retry 2 / Queued chips.' },
      { tab: 'record',  note: 'Open My record. SGM 2.0 progress bars + Data-use receipt.' },
    ],
  },
  {
    id: 's2', persona: 'leader',
    title: 'Guru Besar Jainal acts on the weekly digest',
    duration: '2 min',
    role: 'Headteacher of a 9-teacher school in Pitas (Persona 2)',
    goal: 'See which teachers need support this week without logging in to a new platform.',
    decision: 'Jainal schedules a check-in with the inactive teacher and recognises a streak using data, not anecdote.',
    steps: [
      { tab: 'school', note: 'School Summary opens. Navy Weekly Digest hero shows aggregate numerals.' },
      { tab: 'school', note: 'SGM 2.0 activity panel - per-domain item counts.' },
      { tab: 'school', note: '2x2 KPI: Active 5/9, Modules 7, Evidence 13 (green), Queued offline 5 (peach).' },
      { tab: 'school', note: 'Who may need support - 2 teachers chip + roster preview.' },
    ],
  },
  {
    id: 's3', persona: 'district',
    title: 'Pegawai Norhaida reviews the district',
    duration: '2 min',
    role: 'PPD district officer, DG44 (Persona 3)',
    goal: 'Spot offline schools and weak domains across all 64 schools in the interior.',
    decision: 'Norhaida plans the next round of NADI/PPD visits to the schools still offline.',
    steps: [
      { tab: 'district', note: '4 KPI tiles - Offline schools 17 (peach), Queued (district) 94 (peach).' },
      { tab: 'district', note: 'SGM 2.0 activity card - per-domain progress bars.' },
      { tab: 'district', note: 'D3 below 50% insight callout suggests pairing with #CikguJuara mentors.' },
      { tab: 'district', note: 'Schools needing connectivity support - planning input, not penalty list.' },
    ],
  },
  {
    id: 's4', persona: 'teacher',
    title: 'The four edge-case states (Figure 4)',
    duration: '1 min',
    role: 'Any teacher hitting a system limit',
    goal: 'Show how the prototype handles the four predictable failure modes without losing data or trust.',
    decision: 'Reviewer sees that each failure mode has a clear screen, a primary action, and a graceful fallback.',
    steps: [
      { tab: 'edge-blocked',    note: 'Download blocked - teacher tries to download while offline. Honest about the limit, points to NADI.' },
      { tab: 'edge-upload',     note: 'Upload failed - network dropped mid-upload. Evidence safe on phone, auto-retry queued (NFR9).' },
      { tab: 'edge-incomplete', note: 'Incomplete evidence - missing fields. Three specific issues, one Fix-now button.' },
      { tab: 'edge-storage',    note: 'Storage low - device near full. Sync now to free space, or Manage downloads.' },
    ],
  },
];

const EDGE_CASES = [
  { title: 'Incomplete or invalid evidence submission',
    body: 'The client rejects submission with a plain error message; ghost entries never enter the queue. Server-side face-detection re-pass reruns blur if the on-device pass missed anything.' },
  { title: 'Conflicting or duplicate sync after a long offline stretch',
    body: 'Idempotent sync (NFR9): re-uploading the same evidenceId never creates a duplicate. After 10 failed retries an item is marked "tap to retry" rather than silently dropped.' },
  { title: 'Low participation in a small rural school',
    body: 'A 5-teacher school will not produce big numbers. The Guru Besar digest is built around exceptions (who is inactive, who is on a streak), not ranking. Small N is context, not failure.' },
  { title: 'Misuse: photographing pupils or fabricating evidence',
    body: 'Face blurring is on by default. Every evidence item is signed and timestamped. PPD quarterly audit logs flag mass exports and unusual access patterns. Data ombudsperson at PPD level receives complaints.' },
];

const TEAM = [
  { name: 'Abdullah Ismael',  id: '2666924', role: 'Sabah rural context, BPG stakeholder fit, strategic goal.' },
  { name: 'Ali Al-Kaabi',     id: '2794809', role: 'Teacher mobile flow, offline queue, evidence capture.' },
  { name: 'Daniil Soroka',    id: '2854697', role: 'System architecture, idempotent sync, export structure.' },
  { name: 'Esmee Mulder',     id: '2753754', role: 'Personas, human aspects, accessibility, language choices.' },
  { name: 'Julia Bartelds',   id: '2714351', role: 'Privacy, auditability, district dashboard, edge cases.' },
];

const REQUIREMENTS = {
  functional: [
    { id: 'FR1', moscow: 'M', screens: ['Modules', 'Module detail'], title: 'Small CPD modules that work offline', body: 'Downloadable smartphone-sized modules for offline use. Bundles fit the morning 4G window.' },
    { id: 'FR2', moscow: 'M', screens: ['Add evidence', 'Sync queue'], title: 'Image-first evidence capture', body: 'Image-based uploads tagged to SGM 2.0 domains; optimised for low bandwidth.' },
    { id: 'FR3', moscow: 'M', screens: ['Sync queue', 'Upload failed'], title: 'Smart submission queue', body: 'Queued on device; uploads automatically when a steady connection is detected.' },
    { id: 'FR4', moscow: 'S', screens: ['School summary'], title: 'Mentoring dashboard for Guru Besar', body: 'Mentor / mentee check-ins and shared lessons, per teacher folder.' },
    { id: 'FR5', moscow: 'M', screens: ['CPD record', 'School summary'], title: 'CPD log of shared lessons + check-ins', body: 'Log shared lessons, peer observations, mentoring check-ins - feeds SGM 2.0 PPB.' },
    { id: 'FR6', moscow: 'S', screens: ['Telegram digest'], title: 'Weekly school summary, no login', body: 'Weekly summary via WhatsApp/Telegram without opening a new platform.' },
    { id: 'FR7', moscow: 'S', screens: ['District dashboard'], title: 'District dashboard for PPD / JPN Sabah', body: 'Self-assessments, recognition events and programme participation for district officers.' },
    { id: 'FR8', moscow: 'M', screens: ['Welcome', 'Profile · Language'], title: 'Multi-language interface', body: 'User picks language once at install. BM + EN at launch; KDZ + IBN as packs.' },
    { id: 'FR9', moscow: 'M', screens: ['CPD record'], title: 'Replace SPLKPM CPD log', body: 'Replaces the audit function previously handled by SPLKPM.' },
  ],
  nonFunctional: [
    { id: 'NFR1',  moscow: 'M', screens: ['Status pill', 'Sync queue'], title: 'Connectivity - 14 days fully offline', body: '≥14 days fully offline. Bundles ≤ 25 MB to fit the morning 4G window.' },
    { id: 'NFR2',  moscow: 'M', screens: ['—'], title: 'Device compatibility', body: 'Android 11+, ≤ 2 GB RAM, ≤ 200 MB installed.' },
    { id: 'NFR3',  moscow: 'M', screens: ['All screens'], title: 'Performance - 3 s page load', body: 'Any screen loads in < 3 s on Redmi Note 12-class device, online or off.' },
    { id: 'NFR4',  moscow: 'M', screens: ['Profile · Sync & data'], title: 'Data cost - ≤ 200 MB / month', body: 'A typical month (4 modules + evidence) stays under 200 MB of mobile data.' },
    { id: 'NFR5',  moscow: 'M', screens: ['Welcome', 'Profile · Language'], title: 'Localisation BM + EN at launch', body: 'BM + EN at launch. KDZ + IBN strings addable without code changes.' },
    { id: 'NFR6',  moscow: 'S', screens: ['All screens'], title: 'Accessibility - WCAG 2.1 AA', body: 'Colour contrast and tap target size meet WCAG 2.1 AA.' },
    { id: 'NFR7',  moscow: 'M', screens: ['Add evidence', 'Data-use receipt'], title: 'PDPA + on-device face blur', body: 'PDPA 2010 (Amended 2024). Pupil faces blur on-device before upload.' },
    { id: 'NFR8',  moscow: 'S', screens: ['District dashboard · Export'], title: 'Interoperability - REST + SGM 2.0 + ICT-CFT', body: 'REST APIs aligned to SGM 2.0 + UNESCO ICT-CFT v3.' },
    { id: 'NFR9',  moscow: 'M', screens: ['Sync queue', 'CPD record'], title: 'Idempotent sync - no duplicates', body: 'Re-uploading a queued evidence item never creates a duplicate.' },
    { id: 'NFR10', moscow: 'S', screens: ['School summary'], title: 'No school-side admin role', body: 'All admin sits at PPD level or above.' },
    { id: 'NFR11', moscow: 'S', screens: ['Profile · About'], title: 'Sustainability - federal cloud', body: 'Hosted on MyGovCloud or equivalent.' },
    { id: 'NFR12', moscow: 'M', screens: ['CPD record', 'District dashboard · Audit log'], title: 'Auditability - replaces SPLKPM', body: 'Every SGM 2.0 recognition event is timestamped, attributable, and exportable.' },
  ],
};
const MOSCOW_TONE = { M: 'warning', S: 'success', C: 'neutral' };
const MOSCOW_LABEL = { M: 'Must', S: 'Should', C: 'Could' };

// -----------------------------------------------------------------------------
// App root
// -----------------------------------------------------------------------------
function App() {
  const [s, set] = useState(() => {
    let language = 'EN';
    try { language = localStorage.getItem('cs-language') || 'EN'; } catch (e) {}
    return {
      online: false,
      language,
      modules: MODULES.map(m => ({ ...m })),
      evidence: SEED_EVIDENCE.map(e => ({ ...e })),
      openModule: null,
      captureFromModule: null,
      edgeIssues: null,
    };
  });
  const [persona, setPersona] = useState('teacher');
  const [tab, setTab] = useState('welcome');
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = 'light';
    document.documentElement.lang = s.language === 'BM' ? 'ms' : 'en';
    try { localStorage.setItem('cs-language', s.language); } catch (e) {}
  }, [s.language]);

  // Online -> auto-sync the queue (small delay per item).
  useEffect(() => {
    if (!s.online) return;
    const pending = s.evidence.filter(e => !e.synced);
    if (pending.length === 0) return;
    const timers = pending.map((e, i) => setTimeout(() => {
      set(p => ({
        ...p,
        evidence: p.evidence.map(x => x.id === e.id ? { ...x, synced: true, syncedAt: '14 May 09:30' } : x),
      }));
    }, 700 + i * 350));
    return () => timers.forEach(clearTimeout);
  }, [s.online]);

  const go = (target) => {
    // 'home', 'modules', 'module', 'add', 'sync', 'record', 'profile',
    // 'edge-blocked', 'edge-upload', 'edge-incomplete', 'edge-storage',
    // 'school', 'district', 'welcome'
    const teacherTabs = ['welcome','home','modules','module','add','sync','record','profile',
                         'edge-blocked','edge-upload','edge-incomplete','edge-storage'];
    if (teacherTabs.includes(target)) { setPersona('teacher'); setTab(target); return; }
    if (target === 'school')   { setPersona('leader'); setTab('school'); return; }
    if (target === 'district') { setPersona('district'); setTab('district'); return; }
  };

  // Bottom-nav target -> screen mapping. Spec §2.1: nav shows only on these
  // four screens, and only when the persona is teacher.
  const navActive = ({
    modules: 'modules', add: 'add', sync: 'sync', record: 'record',
  })[tab];
  const showNav = persona === 'teacher' && navActive !== undefined;

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>
      <PhoneShell>
        <StatusBar />

        {persona === 'teacher' && tab === 'welcome'         && <WelcomeScreen        s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'home'            && <HomeScreen           s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'modules'         && <ModulesScreen        s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'module'          && <ModuleDetailScreen   s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'add'             && <CaptureScreen        s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'sync'            && <SyncQueueScreen      s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'record'          && <RecordScreen         s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'profile'         && <ProfileScreen        s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'edge-blocked'    && <EdgeCaseScreen kind="blocked"      s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'edge-upload'     && <EdgeCaseScreen kind="uploadFailed" s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'edge-incomplete' && <EdgeCaseScreen kind="incomplete"   s={s} set={set} go={go} />}
        {persona === 'teacher' && tab === 'edge-storage'    && <EdgeCaseScreen kind="storage"      s={s} set={set} go={go} />}

        {persona === 'leader'   && <SchoolSummaryScreen     s={s} set={set} go={go} />}
        {persona === 'district' && <DistrictDashboardScreen s={s} set={set} go={go} />}

        {showNav && <BottomNav active={navActive} onNavigate={go} s={s} />}
      </PhoneShell>

      <DemoDock persona={persona} setPersona={(p) => { setPersona(p); setTab(p === 'teacher' ? 'home' : p === 'leader' ? 'school' : 'district'); }}
        online={s.online} toggleOnline={() => set(p => ({ ...p, online: !p.online }))}
        onOpenPanel={() => setDemoOpen(true)} />

      {demoOpen && <DemoPanelOverlay s={s} set={set} go={go} close={() => setDemoOpen(false)} />}
    </div>
  );
}

// -----------------------------------------------------------------------------
// DemoDock - small floating control in the bottom-right of the page (outside
// the phone column). Lets the demo operator switch persona, toggle online,
// and open the full demo panel. Not part of the spec - it's a meta-tool.
// -----------------------------------------------------------------------------
function DemoDock({ persona, setPersona, online, toggleOnline, onOpenPanel }) {
  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 50,
      display: 'flex', alignItems: 'center', gap: 8,
      background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.pill,
      padding: 6, boxShadow: '0 4px 16px rgba(15,42,61,0.10)',
      fontFamily: 'inherit',
    }}>
      {[
        { id: 'teacher',  label: 'Liana',    icon: 'user' },
        { id: 'leader',   label: 'Jainal',   icon: 'school' },
        { id: 'district', label: 'Norhaida', icon: 'map' },
      ].map(p => {
        const on = persona === p.id;
        return (
          <button key={p.id} onClick={() => setPersona(p.id)} style={{
            background: on ? T.navy : 'transparent', color: on ? '#fff' : T.ink2,
            border: 'none', padding: '6px 10px', borderRadius: R.pill,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <Icon name={p.icon} size={14} stroke={on ? 2 : 1.6} />
            {p.label}
          </button>
        );
      })}
      <div style={{ width: 1, height: 18, background: T.line }} />
      <button onClick={toggleOnline} style={{
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
      }}>
        <OnlinePill online={online} />
      </button>
      <button onClick={onOpenPanel} aria-label="Open demo panel" style={{
        background: 'transparent', border: 'none', color: T.ink2,
        padding: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="info" size={18} />
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// DemoPanelOverlay - overlay containing Scenarios, Edge cases, Requirements,
// Contributions, Intro. Opens when DemoDock 'info' is clicked.
// -----------------------------------------------------------------------------
function DemoPanelOverlay({ s, set, go, close }) {
  const [panel, setPanel] = useState('scenarios');
  const [activeScenario, setActiveScenario] = useState('s1');
  const [stepIdx, setStepIdx] = useState(0);
  const sc = SCENARIOS.find(x => x.id === activeScenario) || SCENARIOS[0];

  const runStep = (scen, i) => {
    setActiveScenario(scen.id);
    setStepIdx(i);
    const step = scen.steps[i];
    if (scen.persona === 'teacher')      go(step.tab);
    else if (scen.persona === 'leader')   go(step.tab); // 'school'
    else if (scen.persona === 'district') go(step.tab); // 'district'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(15,42,61,0.35)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={close}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 540, maxHeight: '90vh',
        background: T.surface, borderRadius: '20px 20px 0 0',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '12px 16px', borderBottom: `1px solid ${T.line}`,
        }}>
          <div style={{ ...TYPE.cardTitle, flex: 1 }}>Demo</div>
          <button onClick={close} aria-label="Close" style={{
            width: 32, height: 32, border: 'none', background: 'transparent', color: T.ink2,
            cursor: 'pointer',
          }}><Icon name="close" size={18} /></button>
        </div>
        <div style={{ display: 'flex', borderBottom: `1px solid ${T.line}`, overflowX: 'auto' }}>
          {[
            { id: 'scenarios',    label: 'Scenarios' },
            { id: 'edges',        label: 'Edge cases' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'team',         label: 'Contributions' },
            { id: 'intro',        label: 'Intro' },
          ].map(t => {
            const active = panel === t.id;
            return (
              <button key={t.id} onClick={() => setPanel(t.id)} style={{
                flex: '0 0 auto', border: 'none', background: 'transparent',
                padding: '12px 16px', fontSize: 13, fontWeight: 600,
                color: active ? T.navy : T.ink3, cursor: 'pointer',
                fontFamily: 'inherit',
                borderBottom: active ? `2px solid ${T.navy}` : '2px solid transparent',
              }}>{t.label}</button>
            );
          })}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {panel === 'scenarios'    && <ScenariosPanel sc={sc} stepIdx={stepIdx} runStep={runStep} />}
          {panel === 'edges'        && <EdgesPanel />}
          {panel === 'requirements' && <RequirementsPanel />}
          {panel === 'team'         && <TeamPanel />}
          {panel === 'intro'        && <IntroPanel />}
        </div>
      </div>
    </div>
  );
}

function IntroPanel() {
  return (
    <div>
      <div style={{ ...TYPE.eyebrow, marginBottom: 6 }}>2 min - brief introduction</div>
      <div style={{ ...TYPE.cardTitle, fontSize: 18 }}>An offline-first CPD companion for rural Sabah teachers.</div>
      <div style={{ ...TYPE.cardBody, marginTop: 10 }}>
        Built for the Interior Division of Sabah where 300-400 schools still have no internet
        and where SPLKPM, the central CPD audit system, shuts down in 2026. CikguSync sits
        alongside DELIMa 2.0, PPGB 2.0, Program Duta Guru and #CikguJuaraDigital, and gives the
        rural teacher loop a way to <b>access training, capture evidence, and have it recognised
        against SGM 2.0</b> with or without a connection.
      </div>
    </div>
  );
}

function ScenariosPanel({ sc, stepIdx, runStep }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {SCENARIOS.map(x => {
          const active = x.id === sc.id;
          const label = x.id === 's1' ? 'Liana'
                      : x.id === 's2' ? 'Jainal'
                      : x.id === 's3' ? 'Norhaida'
                      : 'Edges';
          return (
            <button key={x.id} onClick={() => runStep(x, 0)} style={{
              flex: 1, border: 'none',
              background: active ? T.navy : T.surface2,
              color:      active ? '#fff' : T.ink2,
              padding: '10px 4px', borderRadius: 10, cursor: 'pointer',
              fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
            }}>{label}</button>
          );
        })}
      </div>
      <div style={{ ...TYPE.eyebrow }}>{sc.duration} - walkthrough</div>
      <div style={{ ...TYPE.cardTitle, marginTop: 4 }}>{sc.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', marginTop: 12, fontSize: 13 }}>
        <span style={{ color: T.ink3, fontWeight: 600 }}>User</span>     <span>{sc.role}</span>
        <span style={{ color: T.ink3, fontWeight: 600 }}>Goal</span>     <span>{sc.goal}</span>
        <span style={{ color: T.ink3, fontWeight: 600 }}>Decision</span> <span>{sc.decision}</span>
      </div>
      <div style={{ ...TYPE.eyebrow, marginTop: 14, marginBottom: 8 }}>Steps</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sc.steps.map((st, i) => {
          const active = i === stepIdx;
          return (
            <button key={i} onClick={() => runStep(sc, i)} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left',
              border: `1px solid ${active ? T.navy : T.line}`,
              background: active ? '#F0F4FB' : T.surface,
              padding: '10px 12px', borderRadius: 10,
              cursor: 'pointer', fontFamily: 'inherit', width: '100%',
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: active ? T.navy : T.surface2,
                color: active ? '#fff' : T.ink2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
              }}>{i + 1}</span>
              <span style={{ fontSize: 13, lineHeight: '20px', color: T.ink }}>{st.note}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EdgesPanel() {
  return (
    <div>
      <div style={{ ...TYPE.eyebrow }}>3 min - system limits</div>
      <div style={{ ...TYPE.cardTitle, marginTop: 4 }}>Edge cases &amp; limitations</div>
      <div style={{ ...TYPE.cardBody, marginTop: 4 }}>
        Four predictable failure modes covered by the prototype. The first three are reachable as full screens.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
        {EDGE_CASES.map((e, i) => (
          <div key={i} style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: T.peachSoft, color: T.peach,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
              }}>{i + 1}</span>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{e.title}</div>
            </div>
            <div style={{ ...TYPE.cardBody, marginTop: 8 }}>{e.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequirementsPanel() {
  const [tab, setTab] = useState('fr');
  const items = tab === 'fr' ? REQUIREMENTS.functional : REQUIREMENTS.nonFunctional;
  return (
    <div>
      <div style={{ ...TYPE.eyebrow }}>Assignment 2 §6 - traceability</div>
      <div style={{ ...TYPE.cardTitle, marginTop: 4 }}>Requirements covered by this prototype</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        {[
          { id: 'fr',  label: `Functional · ${REQUIREMENTS.functional.length}` },
          { id: 'nfr', label: `Non-functional · ${REQUIREMENTS.nonFunctional.length}` },
        ].map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, border: 'none',
              background: active ? T.navy : T.surface2,
              color:      active ? '#fff' : T.ink2,
              padding: '9px 6px', borderRadius: 10, cursor: 'pointer',
              fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
            }}>{t.label}</button>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {items.map(r => (
          <div key={r.id} style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700,
                  color: T.navy, background: '#EAF0F8',
                  padding: '3px 7px', borderRadius: 6, flexShrink: 0,
                }}>{r.id}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{r.title}</span>
              </div>
              <Badge tone={MOSCOW_TONE[r.moscow]}>{MOSCOW_LABEL[r.moscow]}</Badge>
            </div>
            <div style={{ ...TYPE.cardBody, marginTop: 8 }}>{r.body}</div>
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {r.screens.map((sc, i) => (
                <span key={i} style={{
                  fontSize: 11, fontWeight: 600,
                  background: T.surface2, color: T.ink2,
                  padding: '3px 8px', borderRadius: 999,
                }}>{sc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel() {
  return (
    <div>
      <div style={{ ...TYPE.eyebrow }}>5 min - individual contributions</div>
      <div style={{ ...TYPE.cardTitle, marginTop: 4 }}>Group 3 - ICT for the Global South</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {TEAM.map(m => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            border: `1px solid ${T.line}`, borderRadius: 12, padding: '10px 12px',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: T.surface2, color: T.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{m.name.split(' ').map(p => p[0]).join('').slice(0, 2)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{m.name}</div>
              <div style={{ fontSize: 11, color: T.ink3, fontFamily: 'JetBrains Mono, monospace' }}>{m.id}</div>
              <div style={{ ...TYPE.cardBody, marginTop: 3 }}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
