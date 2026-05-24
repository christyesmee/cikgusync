// CikguSync - Add Evidence + CPD Record (Figure 2 panels 1-2 and panel 4).

// -----------------------------------------------------------------------------
// 5.1 / 5.2 Add Evidence (empty + filled in same component, by state)
// -----------------------------------------------------------------------------
function CaptureScreen({ s, set, go }) {
  const [photo, setPhoto]       = useState(s.captureFromModule ? { tone: '#dde1d5' } : null);
  const [note, setNote]         = useState('');
  const [moduleId, setModuleId] = useState(s.captureFromModule || '');
  const [domain, setDomain]     = useState('');
  const [date, setDate]         = useState('2026-05-14');

  const submit = () => {
    const issues = [];
    if (!photo)                  issues.push(tx(s, 'edgeIncompleteItem3'));
    if (!domain)                 issues.push(tx(s, 'edgeIncompleteItem1'));
    if (note.trim().length < 10) issues.push(tx(s, 'edgeIncompleteItem2'));
    if (issues.length > 0) {
      set(p => ({ ...p, edgeIssues: issues }));
      go('edge-incomplete');
      return;
    }
    const newEv = {
      id: 'EV-' + Math.floor(1000 + Math.random() * 9000),
      moduleId, domain, date,
      title: `Evidence — ${moduleTitle(s.modules.find(m => m.id === moduleId) || s.modules[0], s)}`,
      meta: `Saved today · SGM ${domain}`,
      synced: false, retry: 0,
    };
    set(p => ({ ...p, evidence: [newEv, ...p.evidence], captureFromModule: null }));
    go('sync');
  };

  return (
    <>
      <AppHeader back title={tx(s, 'addEvidenceTitle')} onBack={() => go('home')} />
      <ScreenBody>
        {/* 1. Camera tile - empty OR "Photo captured" (filled, dark navy) */}
        {photo ? (
          <div style={{
            background: T.navy, color: '#fff', borderRadius: R.card, padding: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 88, height: 88, borderRadius: 12,
              background: T.navyMid, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="user" size={36} color="rgba(255,255,255,0.6)" stroke={1.4} />
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: R.pill,
              background: T.greenSoft, color: T.green,
              fontSize: 12, fontWeight: 600,
            }}>
              <Icon name="check" size={12} stroke={2.4} />
              {tx(s, 'photoCaptured')}
            </div>
            <div style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>
              classroom_evidence.jpg · 84 KB
            </div>
          </div>
        ) : (
          <button onClick={() => setPhoto({ tone: '#dde1d5' })} style={{
            background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card,
            padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            cursor: 'pointer', fontFamily: 'inherit', minHeight: 132,
          }}>
            <Icon name="camera" size={28} color={T.ink2} stroke={1.8} />
            <div style={{ fontSize: 15, fontWeight: 600, color: T.ink }}>{tx(s, 'takeClassroomPhoto')}</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3 }}>{tx(s, 'tapToOpenCamera')}</div>
          </button>
        )}

        {/* 2. Privacy strip */}
        <div style={{
          background: T.surface2, border: `1px solid ${T.line}`, borderRadius: 12,
          padding: 12, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon name="shield" size={16} color={T.ink2} />
          <span style={{ fontSize: 13, fontWeight: 500, color: T.ink2 }}>{tx(s, 'facesWillBeBlurred')}</span>
        </div>

        {/* 3. Reflection textarea */}
        <Field label={tx(s, 'shortReflection')}>
          <TextArea value={note} onChange={setNote} placeholder={tx(s, 'shareReflection')} max={300} />
        </Field>

        {/* 4. Module select */}
        <Field label={tx(s, 'moduleField')}>
          <Select value={moduleId} onChange={setModuleId} placeholder={tx(s, 'chooseModule')}
            options={s.modules.map(m => ({ value: m.id, label: `${m.id} · ${moduleTitle(m, s)}` }))}
          />
        </Field>

        {/* 5. SGM domain select */}
        <Field label={tx(s, 'sgmDomainField')}>
          <Select value={domain} onChange={setDomain} placeholder={tx(s, 'chooseDomain')}
            options={SGM_DOMAINS.map(d => ({ value: d.id, label: `${d.code} · ${d.en}` }))}
          />
        </Field>

        {/* 6. Date */}
        <Field label={tx(s, 'evidenceDate')}>
          <DateInput value={date} onChange={setDate} />
        </Field>

        {/* Primary action - OUTLINED per spec (real upload happens on Queue) */}
        <div style={{ marginTop: 8 }}>
          <OutlineButton icon="download" onClick={submit}>{tx(s, 'saveOnThisPhone')}</OutlineButton>
        </div>
      </ScreenBody>
    </>
  );
}

// -----------------------------------------------------------------------------
// 5.4 My CPD Record
// -----------------------------------------------------------------------------
function RecordScreen({ s, set, go }) {
  return (
    <>
      <AppHeader back title={tx(s, 'myCpdRecord')} onBack={() => go('home')} />
      <ScreenBody>
        {/* Identity card */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: T.surface2, color: T.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="user" size={20} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.ink }}>Cikgu Liana</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3, marginTop: 2 }}>SK Nabawan · Year 4 Bahasa Inggeris</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.ink3, marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>DG41 · Tier Rural 2</div>
          </div>
        </div>

        {/* SGM 2.0 progress card */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ ...TYPE.sectionHead }}>{tx(s, 'sgm2Progress')}</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3 }}>{tx(s, 'term2_2026')}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            <ProgressRow code="D1" label="Professional Knowledge" pct={45} />
            <ProgressRow code="D2" label="Instructional Practice" pct={62} />
            <ProgressRow code="D3" label="Community Engagement"   pct={20} />
            <ProgressRow code="D4" label="Personal Quality"       pct={55} />
          </div>
        </div>

        {/* Recent submissions */}
        <div>
          <div style={{ ...TYPE.sectionHead, marginBottom: 12 }}>{tx(s, 'recentSubmissions')}</div>
          <div style={{
            background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Icon name="checkCircle2" size={20} color={T.green} stroke={1.8} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{tx(s, 'reflectionLessonPlanning')}</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3, marginTop: 2 }}>SGM D4 · 12/05/2026</div>
            </div>
          </div>
        </div>

        {/* Data-use receipt */}
        <DataReceipt s={s} />

        {/* Data governance footer - retention rules + PPD ombudsperson */}
        <DataGovernanceFooter s={s} />
      </ScreenBody>
    </>
  );
}

// Profile is kept lightweight as it's not in the redesign spec - users can
// reach the language picker from Welcome on first run. Profile remains a
// secondary screen for theme + language management.
function ProfileScreen({ s, set, go }) {
  const setLanguage = (lang) => {
    set(p => ({ ...p, language: lang }));
    try { localStorage.setItem('cs-language', lang); } catch (e) {}
  };
  return (
    <>
      <AppHeader back title="Profile" onBack={() => go('home')} />
      <ScreenBody>
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: T.surface2, color: T.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            fontSize: 18, fontWeight: 700,
          }}>LH</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.ink }}>Cikgu Liana</div>
            <div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>SK Nabawan · Year 4 Bahasa Inggeris</div>
            <div style={{ fontSize: 11, color: T.ink3, marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>DG41 · Tier Rural 2</div>
          </div>
        </div>
        <Field label={tx(s, 'chooseLanguage')}>
          <SegmentedLanguagePicker value={s.language || 'EN'} onChange={setLanguage} />
        </Field>
      </ScreenBody>
    </>
  );
}

Object.assign(window, { CaptureScreen, RecordScreen, ProfileScreen });
