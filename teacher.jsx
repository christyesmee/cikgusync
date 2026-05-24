// CikguSync - Teacher screens (Figure 1 + Figure 2 panels).
//
// Each screen renders inside the PhoneShell + optional BottomNav. Spec §4.

// -----------------------------------------------------------------------------
// 4.1 Welcome screen
// -----------------------------------------------------------------------------
function WelcomeScreen({ s, set, go }) {
  const setLanguage = (lang) => {
    set(p => ({ ...p, language: lang }));
    try { localStorage.setItem('cs-language', lang); } catch (e) {}
  };
  const lang = s.language || 'EN';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 20px', overflowY: 'auto' }}>
      {/* 1. Logo block - tightened for the smaller phone frame */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <Logo size={72} brand />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, color: T.ink, letterSpacing: -0.3 }}>
            CikguSync
          </div>
          <div style={{ fontSize: 13, fontWeight: 400, color: T.ink3, marginTop: 4 }}>
            {tx(s, 'welcomeTagline')}
          </div>
        </div>
      </div>

      {/* 2. Heart tagline row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
        <Icon name="heart" size={14} color={T.ink2} />
        <span style={{ fontSize: 13, fontWeight: 500, color: T.ink2 }}>{tx(s, 'welcomeSub')}</span>
      </div>

      {/* 3. CHOOSE YOUR LANGUAGE label + 4. picker (3 options now: BM, EN, KDZ) */}
      <div style={{ marginTop: 20 }}>
        <div style={{ ...TYPE.eyebrow, marginBottom: 10 }}>
          {tx(s, 'chooseLanguage')}
        </div>
        <SegmentedLanguagePicker value={lang} onChange={setLanguage} compact />
      </div>

      {/* 5. Status callout */}
      <div style={{ marginTop: 14 }}>
        <CalloutCard
          tone={s.online ? 'green' : 'peach'}
          icon={s.online ? 'cloud' : 'cloudOff'}
          title={s.online ? tx(s, 'youreOnline') : tx(s, 'youreOffline')}
          body={s.online ? tx(s, 'goodTimeToDownload') : tx(s, 'waitingForConnection')}
        />
      </div>

      <div style={{ flex: 1, minHeight: 12 }} />

      {/* 6. Primary CTA */}
      <PrimaryButton onClick={() => go('home')}>{tx(s, 'start')}</PrimaryButton>

      {/* 7. Text link */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <TextLink onClick={() => {}}>{tx(s, 'howItWorks')}</TextLink>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 4.2 Home
// -----------------------------------------------------------------------------
function HomeScreen({ s, set, go }) {
  const queued = s.evidence.filter(e => !e.synced).length;
  const downloaded = s.modules.filter(m => m.state === 'downloaded' || m.state === 'completed').length;
  const completed = 0; // demo seed - none completed this week
  const cont = s.modules.filter(m => m.state === 'downloaded');

  return (
    <>
      {/* Special header: 28px navy tile + two-line text + online pill right */}
      <div style={{
        height: 64, display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 20px', borderBottom: `1px solid ${T.line}`, background: T.surface,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: T.navy, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name="bookOpen" size={16} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, lineHeight: '18px' }}>CikguSync</div>
          <div style={{ fontSize: 11, fontWeight: 400, color: T.ink3, lineHeight: '14px' }}>{tx(s, 'welcomeTagline')}</div>
        </div>
        <OnlinePill online={s.online} />
      </div>

      <ScreenBody>
        {/* Greeting */}
        <div>
          <div style={{ ...TYPE.pageTitle }}>{tx(s, 'hi')} Cikgu Liana</div>
          <div style={{ ...TYPE.pageSub, marginTop: 4 }}>SK Nabawan · Year 4 Bahasa Inggeris</div>
        </div>

        {/* 2x2 StatCard grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatCard icon="smartphone"  label={tx(s, 'savedOnThisPhone')}    value={`24 ${tx(s, 'items')}`} />
          <StatCard icon="cloudUpload" label={tx(s, 'readyToSync')}         value={`${queued} ${tx(s, 'items')}`} attention valueColor={T.peach} />
          <StatCard icon="download"    label={tx(s, 'downloadedModules')}   value={`${downloaded} ${tx(s, 'modules')}`} />
          <StatCard icon="checkCircle2" label={tx(s, 'completedThisWeek')}  value={`${completed} ${tx(s, 'modules')}`} />
        </div>

        {/* Continue learning */}
        <div>
          <div style={{ ...TYPE.sectionHead, marginBottom: 12 }}>{tx(s, 'continueLearning')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cont.map(m => (
              <ModuleCard key={m.id} mod={m} s={s} progress={m.progress}
                onClick={() => { set(p => ({ ...p, openModule: m.id })); go('module'); }}
              />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <div style={{ ...TYPE.sectionHead, marginBottom: 12 }}>{tx(s, 'quickActions')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { id: 'modules', icon: 'bookOpen',   label: tx(s, 'modulesNav') },
              { id: 'add',     icon: 'camera',     label: tx(s, 'addEvidenceNav') },
              { id: 'sync',    icon: 'refreshCw',  label: tx(s, 'syncQueueNav') },
              { id: 'record',  icon: 'fileText',   label: tx(s, 'myRecordNav') },
            ].map(it => (
              <button key={it.id} onClick={() => go(it.id)} style={{
                background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12,
                height: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Icon name={it.icon} size={20} color={T.ink} />
                <span style={{ ...TYPE.navLabel, color: T.ink2 }}>{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      </ScreenBody>
    </>
  );
}

// -----------------------------------------------------------------------------
// 4.3 Modules list
// -----------------------------------------------------------------------------
function ModulesScreen({ s, set, go }) {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const filtered = s.modules.filter(m => {
    if (filter !== 'all' && m.domain !== filter) return false;
    if (q && !moduleTitle(m, s).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const chips = [
    { id: 'all', label: 'All' },
    { id: 'D1',  label: 'SGM D1' },
    { id: 'D2',  label: 'SGM D2' },
    { id: 'D3',  label: 'SGM D3' },
    { id: 'D4',  label: 'SGM D4' },
  ];
  return (
    <>
      <AppHeader back title="CPD Modules" onBack={() => go('home')}
        right={<button aria-label="Filter" style={{
          width: 32, height: 32, border: 'none', background: 'transparent', color: T.ink2,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="filter" size={20} /></button>}
      />
      <ScreenBody>
        <TextInput value={q} onChange={setQ} placeholder={tx(s, 'searchModule')} leftIcon="search" />

        <CalloutCard tone="green" icon="cloudUpload"
          title={tx(s, 'goodTimeToDownloadTitle')}
          body={tx(s, 'goodTimeToDownloadBody')}
        />

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {chips.map(c => {
            const on = filter === c.id;
            return (
              <button key={c.id} onClick={() => setFilter(c.id)} style={{
                flexShrink: 0,
                background: on ? T.navy : T.surface,
                color:      on ? '#fff'  : T.ink2,
                border:     on ? 'none' : `1px solid ${T.line}`,
                padding: '8px 14px', borderRadius: R.pill,
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>{c.label}</button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(m => (
            <ModuleCard key={m.id} mod={m} s={s}
              downloaded={m.state === 'downloaded' || m.state === 'completed'}
              onClick={() => { set(p => ({ ...p, openModule: m.id })); go('module'); }}
              onDownload={() => downloadModule(m.id, set, s, go)}
            />
          ))}
        </div>
      </ScreenBody>
    </>
  );
}

// Download handler (kept from previous prototype, adapted to new spec).
// Triggers edge screens on real failure paths.
function downloadModule(id, set, s, go) {
  if (!s.online) { if (go) go('edge-blocked'); return; }
  const downloadedCount = s.modules.filter(m => m.state === 'downloaded' || m.state === 'completed').length;
  if (downloadedCount >= 3) { if (go) go('edge-storage'); return; }
  set(p => ({ ...p, modules: p.modules.map(m => m.id === id ? { ...m, state: 'downloaded', progress: 1 } : m) }));
}

// -----------------------------------------------------------------------------
// 4.4 Module detail
// -----------------------------------------------------------------------------
function ModuleDetailScreen({ s, set, go }) {
  const mod = s.modules.find(m => m.id === s.openModule) || s.modules[0];
  const [checks, setChecks] = useState({ read: true, tried: true, written: false });
  const [notes, setNotes] = useState('');
  return (
    <>
      <AppHeader back title="Module" onBack={() => go('modules')} />
      <ScreenBody>
        {/* Top card: module title + saved-on-phone pill + 60% progress */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: T.surface2, color: T.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="bookOpen" size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...TYPE.cardTitle }}>{moduleTitle(mod, s)}</div>
              <div style={{ marginTop: 6 }}>
                <Badge tone="success">
                  <Icon name="check" size={12} stroke={2.4} style={{ marginRight: 4 }} />
                  {tx(s, 'savedOnPhonePill')}
                </Badge>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2 }}>{Math.round(mod.progress * 100)}%</div>
          </div>
          <ProgressBarRow value={mod.progress} />
          <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3 }}>3 of {mod.chapters} sections</div>
        </div>

        {/* Section heading */}
        <div>
          <div style={{ fontSize: 17, lineHeight: '24px', fontWeight: 700, color: T.ink }}>{tx(s, 'sectionTryInClass')}</div>
          <div style={{ fontSize: 14, lineHeight: '22px', color: T.ink2, marginTop: 8 }}>{tx(s, 'sectionTryInClassBody')}</div>
        </div>

        {/* Checklist */}
        <div>
          <div style={{ ...TYPE.sectionHead, marginBottom: 12 }}>{tx(s, 'yourChecklist')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { id: 'read',    label: tx(s, 'readTheIdea') },
              { id: 'tried',   label: tx(s, 'tryOneActivity') },
              { id: 'written', label: tx(s, 'writeReflection') },
            ].map(it => {
              const on = !!checks[it.id];
              return (
                <button key={it.id} onClick={() => setChecks(c => ({ ...c, [it.id]: !c[it.id] }))} style={{
                  background: 'transparent', border: 'none', padding: 0,
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: on ? T.navy : 'transparent',
                    border: on ? 'none' : `1.5px solid ${T.line}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {on && <Icon name="check" size={14} color="#fff" stroke={2.4} />}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.ink }}>{it.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Field label={tx(s, 'reflectionNotes')}>
          <TextArea value={notes} onChange={setNotes} placeholder={tx(s, 'writeYourNotes')} max={300} />
        </Field>

        <OutlineButton icon="download" onClick={() => go('modules')}>
          {tx(s, 'saveOffline')}
        </OutlineButton>
      </ScreenBody>
    </>
  );
}

Object.assign(window, {
  WelcomeScreen, HomeScreen, ModulesScreen, ModuleDetailScreen, downloadModule,
});
