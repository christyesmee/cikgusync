// CikguSync - Root App + persona switcher + scenario walkthrough panel
// Frame: Android phone (Liana, Jainal) + desktop browser (Norhaida)

const SCENARIOS = [
  {
    id: 's1',
    persona: 'teacher',
    title: 'Scenario 1 - Cikgu Liana captures classroom evidence offline',
    duration: '2 min',
    role: 'Rural primary teacher (Persona 1, Assignment 2)',
    goal: 'Apply a low-bandwidth literacy routine in class and log it toward SGM 2.0 without internet.',
    decision: 'Liana confirms one teaching routine works in her actual classroom and earns SGM 2.0 credit that survives a transfer.',
    steps: [
      { tab: 'home',    note: 'Liana opens the app at school. The compact status pill shows "Offline".' },
      { tab: 'modules', note: 'She downloaded M-156 last week during the morning 4G window. Tap Modules.' },
      { tab: 'module',  note: 'Open the module offline. Complete chapters and tap "Mark complete".' },
      { tab: 'capture', note: 'Tap "Add evidence". Pick a sample classroom photo. Faces blur on device (NFR7).' },
      { tab: 'capture', note: 'Tag the photo to SGM 2.0 domain D2 (Instructional Practice). Add a one-line reflection.' },
      { tab: 'capture', note: 'Tap "Save on this phone". The item enters the local sync queue.' },
      { tab: 'home',    note: 'Toggle "Online" after arriving at NADI Nabawan. Queue syncs idempotently.' },
      { tab: 'record',  note: 'Open Record. The new evidence is credited under D2 and counts toward PPB.' },
    ],
  },
  {
    id: 's2',
    persona: 'leader',
    title: 'Scenario 2 - Guru Besar Jainal acts on the weekly digest',
    duration: '2 min',
    role: 'Headteacher of a 9-teacher school in Pitas (Persona 2, Assignment 2)',
    goal: 'See which teachers need support this week without logging in to a new platform.',
    decision: 'Jainal schedules a check-in with the one inactive teacher and recognises a streak using data, not anecdote.',
    steps: [
      { tab: 'chat',   note: 'Telegram delivers the weekly digest from @CikguSyncBot every Monday 09:00.' },
      { tab: 'chat',   note: 'Three short messages: aggregate KPIs, per-teacher highlights, exceptions.' },
      { tab: 'chat',   note: 'One teacher (Rosli) is flagged: 14 days inactive. One teacher (Liana) on a streak.' },
      { tab: 'digest', note: 'Tap "Open school summary". A read-only mobile dashboard opens with no login.' },
      { tab: 'digest', note: 'Jainal replies in Telegram in Bahasa Malaysia. No new admin role. No new password.' },
    ],
  },
  {
    id: 's3',
    persona: 'district',
    title: 'Scenario 3 - Pegawai Norhaida prepares the BPG export',
    duration: '2 min',
    role: 'PPD district officer, DG44, Sektor Pengurusan Akademik (Persona 3, Assignment 2)',
    goal: 'Produce a 30-day cross-district SGM 2.0 summary including offline schools, ready for BPG/DPD 2023-2030 reporting.',
    decision: 'Norhaida plans the next round of NADI/PPD visits to the schools that still appear offline, and exports an idempotent audit-grade roll-up that replaces SPLKPM.',
    steps: [
      { tab: 'dist',  note: 'Open dashboard. Four KPIs cover all schools, including those without internet.' },
      { tab: 'dist',  note: 'SGM 2.0 domains chart shows where activity is heavy (D2) vs light (D4).' },
      { tab: 'dist',  note: 'Filter the school table to "Offline schools". They are still counted, with last-sync timestamps.' },
      { tab: 'dist',  note: 'Use the "Plan a visit" panel to pair each offline school with the nearest NADI centre.' },
      { tab: 'dist',  note: 'Tap "Export" for CSV with SGM 2.0 + ICT-CFT mapping. Idempotent IDs prevent double-count.' },
    ],
  },
];

const EDGE_CASES = [
  {
    title: 'Incomplete or invalid evidence submission',
    body: 'A teacher tries to submit a photo with no SGM domain or a blank reflection. The client rejects the submission with a plain error message and the item never enters the queue, so dashboards do not display ghost entries. Photos taken in low light still upload, but a server-side face-detection second pass reruns blur if the on-device pass missed anything.',
  },
  {
    title: 'Conflicting or duplicate sync after a long offline stretch',
    body: 'Idempotent sync (NFR9) means re-uploading the same evidenceId never creates a duplicate. After 10 failed retries over 14 days an item is marked "tap to retry" rather than silently dropped, so a teacher who sat offline at a Rural 3 school never loses work even if her connection broke mid-upload.',
  },
  {
    title: 'Low participation in a small rural school',
    body: 'A 5-teacher school will not produce big numbers. The Guru Besar digest is built around exceptions ("who is inactive", "who is on a streak") rather than ranking, so small N is read as context, not as failure. Aggregated dashboards never expose single-teacher cells.',
  },
  {
    title: 'Misuse: photographing pupils or fabricating evidence',
    body: 'Face blurring is on by default and reflections discourage pupil names. Every evidence item is signed and timestamped. PPD quarterly audit logs flag mass exports and unusual access patterns. A serving-teacher data ombudsperson at PPD level receives complaints, matching A3 privacy governance.',
  },
];

const TEAM = [
  { name: 'Abdullah Ismael',  id: '2666924', role: 'Demo focus: Sabah rural context, BPG stakeholder fit, and strategic goal.' },
  { name: 'Ali Al-Kaabi',     id: '2794809', role: 'Demo focus: teacher mobile flow, offline queue, and evidence capture.' },
  { name: 'Daniil Soroka',    id: '2854697', role: 'Demo focus: system architecture, idempotent sync, and export structure.' },
  { name: 'Esmee Mulder',     id: '2753754', role: 'Demo focus: personas, human aspects, accessibility, and language choices.' },
  { name: 'Julia Bartelds',   id: '2714351', role: 'Demo focus: privacy, auditability, district dashboard, and edge cases.' },
];

// -----------------------------------------------------------------------------
function App() {
  const [s, set] = useState(() => {
    let theme = 'light';
    let language = 'BM';
    try { theme = localStorage.getItem('cs-theme') || 'light'; } catch (e) {}
    try { language = localStorage.getItem('cs-language') || 'BM'; } catch (e) {}
    return {
      online: false,
      language,
      modules: MODULES.map(m => ({ ...m })),
      evidence: SEED_EVIDENCE.map(e => ({ ...e })),
      openModule: null,
      captureFromModule: null,
      toast: null,
      theme,
    };
  });
  const [persona, setPersona] = useState('teacher');
  const [tab, setTab] = useState('home');
  const [leaderView, setLeaderView] = useState('chat');
  const [activeScenario, setActiveScenario] = useState('s1');
  const [stepIdx, setStepIdx] = useState(0);
  const [panel, setPanel] = useState('scenarios');

  // Reflect theme to <body data-theme="..."> for the CSS-variable cascade.
  useEffect(() => {
    document.body.dataset.theme = s.theme || 'light';
  }, [s.theme]);

  useEffect(() => {
    document.documentElement.lang = s.language === 'EN' ? 'en' : 'ms';
    try { localStorage.setItem('cs-language', s.language || 'BM'); } catch (e) {}
  }, [s.language]);

  // When online flips true, sync the queue
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
    const map = {
      home: () => { setPersona('teacher'); setTab('home'); },
      modules: () => { setPersona('teacher'); setTab('modules'); },
      module: () => { setPersona('teacher'); setTab('module'); },
      capture: () => { setPersona('teacher'); setTab('capture'); },
      record: () => { setPersona('teacher'); setTab('record'); },
      profile: () => { setPersona('teacher'); setTab('profile'); },
      chat: () => { setPersona('leader'); setLeaderView('chat'); },
      digest: () => { setPersona('leader'); setLeaderView('digest'); },
      dist: () => { setPersona('district'); },
    };
    (map[target] || (() => {}))();
  };

  const runStep = (sc, i) => {
    setActiveScenario(sc.id);
    setStepIdx(i);
    const step = sc.steps[i];
    if (sc.persona === 'teacher') {
      setPersona('teacher');
      if (['home','modules','module','capture','record','profile'].includes(step.tab)) setTab(step.tab);
    } else if (sc.persona === 'leader') {
      setPersona('leader');
      setLeaderView(step.tab === 'digest' ? 'digest' : 'chat');
    } else if (sc.persona === 'district') {
      setPersona('district');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: T.bg,
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      color: T.text, display: 'flex', flexDirection: 'column',
    }}>
      <TopBar persona={persona} setPersona={setPersona} s={s} set={set} />
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: 'minmax(360px, 1fr) 420px',
        gap: 0, alignItems: 'stretch',
        height: 'calc(100vh - 73px)', minHeight: 0, overflow: 'hidden',
      }}>
        <Stage persona={persona} tab={tab} setTab={setTab} s={s} set={set} go={go} leaderView={leaderView} setLeaderView={setLeaderView} />
        <DemoPanel
          panel={panel} setPanel={setPanel}
          activeScenario={activeScenario} setActiveScenario={setActiveScenario}
          stepIdx={stepIdx} setStepIdx={setStepIdx}
          runStep={runStep}
          s={s} set={set}
        />
      </div>
      {s.toast && <Toast text={s.toast} />}
    </div>
  );
}

function TopBar({ persona, setPersona, s, set }) {
  return (
    <div style={{
      background: T.card, borderBottom: `1px solid ${T.border}`,
      padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: T.shadow1,
    }}>
      <Logo size={42} />
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1, letterSpacing: -0.2 }}>CikguSync</div>
        <div style={{ fontSize: 10.5, color: T.text3, letterSpacing: 0.3, fontFamily: 'JetBrains Mono, monospace', marginTop: 3 }}>
          A4a - ICT for the Global South - Group 3
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        display: 'flex', gap: 4, background: T.surface,
        padding: 4, borderRadius: 999, border: `1px solid ${T.border}`,
      }}>
        {[
          { id: 'teacher',  label: 'Cikgu Liana',  sub: 'Teacher' },
          { id: 'leader',   label: 'Guru Besar',   sub: 'Jainal' },
          { id: 'district', label: 'PPD officer',  sub: 'Norhaida' },
        ].map(p => {
          const active = persona === p.id;
          return (
            <button key={p.id} onClick={() => setPersona(p.id)} style={{
              border: 'none', background: active ? T.navy : 'transparent',
              color: active ? '#fff' : T.text2,
              padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0,
              lineHeight: 1.1,
            }}>
              <span>{p.label}</span>
              <span style={{ fontSize: 9.5, opacity: 0.7, marginTop: 1 }}>{p.sub}</span>
            </button>
          );
        })}
      </div>
      {persona === 'teacher' && (
        <button onClick={() => set(p => ({ ...p, online: !p.online }))} style={{
          border: `1px solid ${T.borderS}`,
          background: T.card,
          color: T.text,
          padding: '7px 12px 7px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 7, boxShadow: T.shadow1,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: s.online ? T.success : T.queue,
            boxShadow: `0 0 0 3px ${s.online ? T.successS : T.queueS}`,
          }} />
          {s.online ? tx(s, 'online') : tx(s, 'offline')}
        </button>
      )}
    </div>
  );
}

function Stage({ persona, tab, setTab, s, set, go, leaderView, setLeaderView }) {
  return (
    <div style={{
      padding: '14px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      background: T.surface2,
      backgroundImage: `radial-gradient(circle at 1px 1px, ${T.border} 1px, transparent 0)`,
      backgroundSize: '24px 24px',
      overflow: 'hidden',
    }}>
      {persona === 'teacher' && (
        <AndroidDevice width={360} height={620} dark={s.theme === 'dim'}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.surface }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {tab === 'home'     && <HomeScreen s={s} set={set} go={(t) => setTab(t)} />}
              {tab === 'modules'  && <ModulesScreen s={s} set={set} go={(t) => setTab(t)} />}
              {tab === 'module'   && <ModuleDetailScreen s={s} set={set} go={(t) => setTab(t)} />}
              {tab === 'capture'  && <CaptureScreen s={s} set={set} go={(t) => setTab(t)} />}
              {tab === 'record'   && <RecordScreen s={s} set={set} go={(t) => setTab(t)} />}
              {tab === 'profile'  && <ProfileScreen s={s} set={set} go={(t) => setTab(t)} />}
            </div>
            <BottomNav tab={tab === 'module' ? 'modules' : tab} setTab={setTab} s={s} />
          </div>
        </AndroidDevice>
      )}
      {persona === 'leader' && (
        <AndroidDevice width={360} height={620} dark>
          <div style={{ height: '100%' }}>
            <LeaderApp s={s} view={leaderView} setView={setLeaderView} />
          </div>
        </AndroidDevice>
      )}
      {persona === 'district' && (
        <BrowserFrame>
          <DistrictApp s={s} />
        </BrowserFrame>
      )}
    </div>
  );
}

function BrowserFrame({ children }) {
  return (
    <div style={{
      width: 'min(100%, 1080px)', height: 740,
      background: T.card, border: `1px solid ${T.borderS}`, borderRadius: 14,
      overflow: 'hidden', boxShadow: T.shadow3,
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <div style={{
        background: T.surface2, padding: '9px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ED6A5E','#F5BF4F','#62C554'].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: T.card, borderRadius: 7,
          padding: '5px 12px', fontSize: 11, color: T.text3,
          fontFamily: 'JetBrains Mono, monospace',
          border: `1px solid ${T.border}`,
        }}>
          https://cikgusync.moe.gov.my/ppd/keningau
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>{children}</div>
    </div>
  );
}

function Toast({ text }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: T.navyDeep, color: '#fff', padding: '10px 16px',
      borderRadius: 999, fontSize: 12.5, fontWeight: 600,
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)', zIndex: 100,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <Dot color={T.teal} />
      {text}
    </div>
  );
}

// -----------------------------------------------------------------------------
function DemoPanel({ panel, setPanel, activeScenario, stepIdx, runStep, s, set }) {
  const sc = SCENARIOS.find(x => x.id === activeScenario) || SCENARIOS[0];
  return (
    <div style={{
      background: T.card, borderLeft: `1px solid ${T.border}`,
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}` }}>
        {[
          { id: 'scenarios', label: 'Scenarios' },
          { id: 'edges',     label: 'Edge cases' },
          { id: 'team',      label: 'Contributions' },
          { id: 'intro',     label: 'Intro' },
        ].map(t => {
          const active = panel === t.id;
          return (
            <button key={t.id} onClick={() => setPanel(t.id)} style={{
              flex: 1, border: 'none', background: 'transparent',
              padding: '12px 8px', fontSize: 12, fontWeight: 700,
              color: active ? T.navy : T.text3, cursor: 'pointer',
              fontFamily: 'inherit', position: 'relative',
              borderBottom: active ? `2px solid ${T.navy}` : '2px solid transparent',
              marginBottom: -1,
            }}>{t.label}</button>
          );
        })}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 16px 24px' }}>
        {panel === 'intro' &&     <IntroPanel />}
        {panel === 'scenarios' && <ScenariosPanel sc={sc} stepIdx={stepIdx} runStep={runStep} />}
        {panel === 'edges' &&     <EdgesPanel />}
        {panel === 'team' &&      <TeamPanel />}
      </div>
    </div>
  );
}

function IntroPanel() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        2 min - brief introduction
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6, lineHeight: 1.25 }}>
        An offline-first CPD companion for rural Sabah teachers.
      </div>
      <div style={{ fontSize: 12.5, color: T.text2, marginTop: 10, lineHeight: 1.6 }}>
        Built for the Interior Division of Sabah, where 300-400 schools still have no internet
        (The Star, Dec 2025) and where SPLKPM, the central CPD audit system, shuts down in 2026.
        CikguSync sits alongside DELIMa 2.0, PPGB 2.0, Program Duta Guru and #CikguJuaraDigital,
        and gives the rural teacher loop a way to <b>access training, capture evidence, and have it
        recognised against SGM 2.0</b> with or without a connection.
      </div>
      <div style={{
        marginTop: 14, padding: 12, background: T.surface, borderRadius: 10,
        fontSize: 12, color: T.text2, lineHeight: 1.55,
      }}>
        <div style={{ fontWeight: 700, color: T.text, marginBottom: 6 }}>Three views in this prototype</div>
        <Bullet><b>Teacher (Cikgu Liana)</b>: Android PWA, downloadable micro-modules, evidence capture, offline sync queue.</Bullet>
        <Bullet><b>School leader (Guru Besar Jainal)</b>: Telegram weekly digest with a tap-through summary. No new login.</Bullet>
        <Bullet><b>District officer (Pegawai Norhaida)</b>: desktop dashboard that includes offline schools and exports a BPG audit roll-up.</Bullet>
      </div>
      <div style={{
        marginTop: 14, padding: 12, background: T.tealSoft, borderRadius: 10,
        fontSize: 11.5, color: T.tealDark, lineHeight: 1.5,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>How to demo</div>
        Walk through the three scenarios in order using the panel below.
        Toggle the compact <b>Online / Offline</b> status pill to show queue-and-sync. Switch persona
        with the top tabs.
      </div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
      <Dot color={T.teal} style={{ marginTop: 8, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function ScenariosPanel({ sc, stepIdx, runStep }) {
  return (
    <div>
      {/* Tab strip per scenario */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {SCENARIOS.map(x => {
          const active = x.id === sc.id;
          return (
            <button key={x.id} onClick={() => runStep(x, 0)} style={{
              flex: 1, border: 'none',
              background: active ? T.navy : T.surface,
              color: active ? '#fff' : T.text2,
              padding: '10px 6px', borderRadius: 10, cursor: 'pointer',
              fontSize: 11, fontWeight: 700, fontFamily: 'inherit',
              lineHeight: 1.2, textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, opacity: 0.85 }}>
                {x.id.toUpperCase()}
              </div>
              <div style={{ marginTop: 3 }}>{x.persona === 'teacher' ? 'Liana' : x.persona === 'leader' ? 'Jainal' : 'Norhaida'}</div>
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        {sc.duration} - walkthrough
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>{sc.title}</div>

      <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 10px', fontSize: 12 }}>
        <div style={{ color: T.text3, fontWeight: 700 }}>User</div><div>{sc.role}</div>
        <div style={{ color: T.text3, fontWeight: 700 }}>Goal</div><div>{sc.goal}</div>
        <div style={{ color: T.text3, fontWeight: 700 }}>Decision</div><div>{sc.decision}</div>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        Steps
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sc.steps.map((st, i) => {
          const active = i === stepIdx;
          return (
            <button key={i} onClick={() => runStep(sc, i)} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              border: `1px solid ${active ? T.navy : T.border}`,
              background: active ? 'var(--cs-navy-soft)' : T.card,
              padding: '10px 12px', borderRadius: 10,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              width: '100%',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: active ? T.navy : T.surface2,
                color: active ? '#fff' : T.text2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0,
                fontFamily: 'JetBrains Mono, monospace',
              }}>{i+1}</div>
              <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.4 }}>{st.note}</div>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
        <button onClick={() => runStep(sc, Math.max(0, stepIdx-1))}
          disabled={stepIdx === 0}
          style={{ ...btnSecondary, flex: 1, padding: '8px 10px', fontSize: 12, opacity: stepIdx===0?0.5:1 }}>
          <Icon name="chevL" size={13} /> Prev step
        </button>
        <button onClick={() => runStep(sc, Math.min(sc.steps.length-1, stepIdx+1))}
          disabled={stepIdx >= sc.steps.length-1}
          style={{ ...btnPrimary, flex: 1, padding: '8px 10px', fontSize: 12, opacity: stepIdx>=sc.steps.length-1?0.5:1 }}>
          Next step <Icon name="chevR" size={13} />
        </button>
      </div>
    </div>
  );
}

function EdgesPanel() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        3 min - system limits
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>
        Edge cases & limitations
      </div>
      <div style={{ fontSize: 12, color: T.text2, marginTop: 6, lineHeight: 1.5 }}>
        Two main edge cases plus two adjacent ones, covering bad data, conflicts,
        low participation, and misuse.
      </div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {EDGE_CASES.map((e, i) => (
          <div key={i} style={{
            border: `1px solid ${T.border}`, borderRadius: 12, padding: 12,
            background: T.card,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: T.warnS, color: T.warn,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
              }}>{i+1}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{e.title}</div>
            </div>
            <div style={{ fontSize: 12, color: T.text2, marginTop: 8, lineHeight: 1.55 }}>
              {e.body}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 14, padding: 12, background: T.surface, borderRadius: 10,
        fontSize: 11.5, color: T.text2, lineHeight: 1.5,
      }}>
        <div style={{ fontWeight: 700, color: T.text, marginBottom: 4 }}>
          What we deliberately did <b>not</b> build (A2 6.3, A3 7.2)
        </div>
        Pupil-facing client, live video training, features requiring continuous school internet,
        full translation into all 30 Sabah languages, full external-system integration (postponed
        until institutional API agreements with DELIMa, FS4A, Duta Guru are in place).
      </div>
    </div>
  );
}

function TeamPanel() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        5 min - individual contributions
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>
        Group 3 - ICT for the Global South
      </div>
      <div style={{ fontSize: 12, color: T.text2, marginTop: 6, lineHeight: 1.5 }}>
        Each member speaks 1-1.5 minutes about their part: design, development, or analysis, and
        the main challenge they handled.
      </div>
      <div style={{
        marginTop: 12, padding: 10, background: T.tealSoft,
        borderRadius: 10, fontSize: 11.5, color: T.tealDark, lineHeight: 1.5,
      }}>
        Use these speaking focuses to keep the final five minutes balanced across design, analysis,
        implementation, privacy, and evaluation.
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TEAM.map(m => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            border: `1px solid ${T.border}`, borderRadius: 10, padding: '10px 12px',
            background: T.card,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: T.tealSoft, color: T.tealDark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>
              {m.name.split(' ').map(p => p[0]).join('').slice(0,2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{m.name}</div>
              <div style={{ fontSize: 10.5, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>{m.id}</div>
              <div style={{ fontSize: 11.5, color: T.text2, marginTop: 3 }}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
