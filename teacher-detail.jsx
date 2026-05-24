// CikguSync - Teacher detail screens (Module Detail, Capture, Record, Profile)

// -----------------------------------------------------------------------------
function Section({ number, title, info, optional, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '0 2px' }}>
        <span style={{
          width: 22, height: 22, borderRadius: '50%',
          background: T.surface2, color: T.text2,
          fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{number}</span>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{title}</span>
        {optional && <span style={{ fontSize: 11, color: T.text3 }}>- optional</span>}
        {info && <InfoPopover content={info} />}
      </div>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
function Collapsible({ title, defaultOpen = false, subtle, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: subtle ? 'transparent' : T.card,
      borderRadius: 12,
      border: subtle ? 'none' : `1px solid ${T.border}`,
      overflow: 'hidden',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'transparent', border: 'none',
        padding: subtle ? '8px 2px' : '12px 14px',
        cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: T.text,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>{title}</span>
        <Icon name="chevD" size={16} color={T.text3}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }} />
      </button>
      {open && (
        <div style={{ padding: subtle ? '2px 2px 8px' : '0 14px 14px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
function ToggleSwitch({ on, setOn, small }) {
  const w = small ? 36 : 42, h = small ? 20 : 24, knob = small ? 16 : 20;
  return (
    <button onClick={() => setOn(!on)} style={{
      width: w, height: h, borderRadius: 999,
      background: on ? T.navy : T.borderS,
      border: 'none', position: 'relative', cursor: 'pointer',
      transition: 'background 0.18s', padding: 0,
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? w - knob - 2 : 2,
        width: knob, height: knob, borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'left 0.18s',
      }} />
    </button>
  );
}

// -----------------------------------------------------------------------------
function ModuleDetailScreen({ s, set, go }) {
  const mod = s.modules.find(m => m.id === s.openModule) || s.modules[0];
  const domain = SGM_DOMAINS.find(d => d.id === mod.domain);
  const [chapter, setChapter] = useState(0);
  const chapters = (langKey(s) === 'BM' ? [
    { title: 'Mengapa dan bila guna aktiviti luar talian', mins: 4 },
    { title: 'Rutin 1 - bacaan gema berpasangan', mins: 8 },
    { title: 'Rutin 2 - kad cetak dan edar', mins: 7 },
    { title: 'Rutin 3 - giliran bacaan kuat',  mins: 6 },
  ] : [
    { title: 'Why and when to go off-screen', mins: 4 },
    { title: 'Routine 1 - Paired echo reading', mins: 8 },
    { title: 'Routine 2 - Print-and-pass cards', mins: 7 },
    { title: 'Routine 3 - Read-aloud rotation',  mins: 6 },
  ]).slice(0, mod.chapters);

  const markCompleted = () => {
    set(p => ({
      ...p,
      modules: p.modules.map(m => m.id === mod.id ? { ...m, state: 'completed', progress: 1 } : m),
      toast: tx(s, 'moduleComplete'),
    }));
    setTimeout(() => set(p => ({ ...p, toast: null })), 2400);
  };

  return (
    <div>
      <Header title={mod.id} subtitle={`${domain.code} - ${langKey(s) === 'BM' ? domain.name : domain.en}`} back={() => go('modules')} />
      <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Hero */}
        <div style={{
          background: `linear-gradient(135deg, ${T.navy} 0%, ${T.tealDark} 100%)`,
          color: '#fff', borderRadius: 18, padding: 20,
          position: 'relative', overflow: 'hidden', boxShadow: T.shadow2,
        }}>
          <div style={{ position: 'absolute', right: -40, top: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', right: -20, bottom: -30, opacity: 0.35 }}>
            <Linangkit size={200} opacity={0.18} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.7, opacity: 0.85, textTransform: 'uppercase' }}>
              {tx(s, 'worksOffline')}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8, lineHeight: 1.25, maxWidth: '88%' }}>
              {moduleTitle(mod, s)}
            </div>
            <div style={{ fontSize: 12.5, marginTop: 5, opacity: 0.85, fontStyle: 'italic' }}>
              {langKey(s) === 'BM' ? mod.title : mod.titleBM}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, fontSize: 11, opacity: 0.85, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{mod.sizeMB.toFixed(1)} MB</span>
              <span>-</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{mod.durationMin} min</span>
              <span>-</span>
              <span>{mod.lang.join(' - ')}</span>
              <span>-</span>
              <span style={{ opacity: 0.85 }}>{mod.coAuthor}</span>
            </div>
          </div>
        </div>

        {/* Chapter list */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase', padding: '0 2px 8px' }}>
            {tx(s, 'chapters')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {chapters.map((c, i) => {
              const active = i === chapter;
              return (
                <button key={i} onClick={() => setChapter(i)} style={{
                  width: '100%', border: 'none',
                  background: active ? T.card : 'transparent',
                  display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px',
                  borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  boxShadow: active ? T.shadow1 : 'none',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: active ? T.navy : T.surface2,
                    color: active ? '#fff' : T.text2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
                    flexShrink: 0,
                  }}>{i+1}</div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: active ? 700 : 500, color: T.text }}>
                    {c.title}
                  </div>
                  <span style={{ fontSize: 11, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>{c.mins}m</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter content */}
        <div style={{ background: T.card, borderRadius: 16, padding: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>
            {chapters[chapter].title}
          </div>
          <div style={{ fontSize: 13.5, color: T.text2, marginTop: 10, lineHeight: 1.65 }}>
            {tx(s, 'chapterBody')}
          </div>
          <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: T.tealSoft }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.tealDark, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              {tx(s, 'tryInClass')}
            </div>
            <div style={{ fontSize: 12.5, color: T.text, marginTop: 6, lineHeight: 1.5 }}>
              {tx(s, 'tryInClassBody')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {chapter > 0 && (
            <button onClick={() => setChapter(chapter-1)} style={{ ...btnSecondary, flex: 1, padding: '12px', fontSize: 13 }}>
              <Icon name="chevL" size={14} /> {tx(s, 'prev')}
            </button>
          )}
          {chapter < chapters.length - 1 ? (
            <button onClick={() => setChapter(chapter+1)} style={{ ...btnPrimary, flex: 2, padding: '12px', fontSize: 13 }}>
              {tx(s, 'nextChapter')} <Icon name="arrowR" size={14} />
            </button>
          ) : (
            <button onClick={markCompleted} style={{ ...btnPrimary, flex: 2, padding: '12px', fontSize: 13, background: T.success }}>
              <Icon name="check" size={14} stroke={2.4} /> {tx(s, 'markComplete')}
            </button>
          )}
        </div>

        <button onClick={() => { set(p => ({ ...p, captureFromModule: mod.id })); go('capture'); }}
          style={{ ...btnSecondary, width: '100%', padding: '12px', fontSize: 13 }}>
          <Icon name="camera" size={15} /> {tx(s, 'addEvidenceForModule')}
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
const VISIBILITY_OPTIONS = [
  { id: 'me',            label: 'Only me',                sub: 'Saved on phone, not synced' },
  { id: 'school-leader', label: 'My Guru Besar',          sub: 'In the weekly school digest' },
  { id: 'district',      label: 'PPD officer - Keningau', sub: 'In SGM 2.0 dashboard' },
  { id: 'aggregated',    label: 'Aggregated for BPG',     sub: 'No name attached to roll-up' },
];

function CaptureScreen({ s, set, go }) {
  const [photo, setPhoto]       = useState(null);
  const [blur, setBlur]         = useState(true);
  const [domain, setDomain]     = useState(null);
  const [moduleId, setModuleId] = useState(s.captureFromModule || null);
  const [note, setNote]         = useState('');
  const [visibility, setVisibility] = useState('school-leader');
  const [error, setError]       = useState(null);

  const visibilityOptions = langKey(s) === 'BM' ? [
    { id: 'me',            label: 'Saya sahaja',             sub: 'Disimpan dalam telefon, belum sync' },
    { id: 'school-leader', label: 'Guru Besar saya',         sub: 'Dalam ringkasan mingguan sekolah' },
    { id: 'district',      label: 'Pegawai PPD - Keningau',  sub: 'Dalam dashboard SGM 2.0' },
    { id: 'aggregated',    label: 'Agregat untuk BPG',       sub: 'Nama tidak disertakan dalam laporan' },
  ] : VISIBILITY_OPTIONS;

  const submit = () => {
    if (!photo)                    { setError(tx(s, 'capturePhotoFirst')); return; }
    if (!domain)                   { setError(tx(s, 'tagDomainError')); return; }
    if (note.trim().length < 8)    { setError(tx(s, 'reflectionError')); return; }
    setError(null);
    const newEv = {
      id: 'EV-' + Math.floor(1000 + Math.random()*9000),
      moduleId, domain,
      date: '2026-05-14',
      synced: false, note: note.trim(),
      photoTone: photo.tone, visibility, retry: 0,
    };
    set(p => ({
      ...p,
      evidence: [newEv, ...p.evidence],
      captureFromModule: null,
      toast: p.online
        ? `${tx(s, 'submittedSyncing')} ${newEv.id}`
        : `${tx(s, 'savedSyncLater')} ${newEv.id} ${tx(s, 'willSync')}`,
    }));
    setTimeout(() => set(p => ({ ...p, toast: null })), 2800);
    go('home');
  };

  return (
    <div>
      <Header title={tx(s, 'addEvidenceTitle')} back={() => go('home')} />
      <div style={{ padding: '18px 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* 1. Photo */}
        <Section number={1} title={tx(s, 'photo')}>
          {photo ? (
            <>
              <ClassroomPlaceholder tone={photo.tone} blurFaces={blur} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ToggleSwitch on={blur} setOn={setBlur} small />
                  <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{tx(s, 'faceBlur')}</span>
                  <InfoPopover content={tx(s, 'faceBlurInfo')} />
                </div>
                <button onClick={() => setPhoto(null)} style={{ ...btnGhost, fontSize: 11 }}>{tx(s, 'retake')}</button>
              </div>
            </>
          ) : (
            <>
              <div style={{
                width: '100%', aspectRatio: '4 / 3', background: T.surface2,
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 8, color: T.text3,
                border: `1px dashed ${T.borderS}`,
              }}>
                <Icon name="camera" size={30} stroke={1.5} />
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{tx(s, 'tapCamera')}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, color: T.text3, marginBottom: 6, fontFamily: 'JetBrains Mono, monospace' }}>
                  {tx(s, 'pickSample')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['#cfd8d8','#d5d2c4','#cdd6c0'].map(t => (
                    <button key={t} onClick={() => setPhoto({ tone: t })} style={{
                      border: 'none', background: t, height: 52, borderRadius: 10, cursor: 'pointer',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(0,0,0,0.45)',
                      backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 6px, transparent 6px 14px)`,
                    }}>{tx(s, 'sample')}</button>
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>

        {/* 2. Domain */}
        <Section number={2} title={tx(s, 'tagDomain')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SGM_DOMAINS.map(d => {
              const active = domain === d.id;
              return (
                <button key={d.id} onClick={() => setDomain(d.id)} style={{
                  border: `1.5px solid ${active ? T.navy : T.border}`,
                  background: active ? T.tealSoft : T.card,
                  borderRadius: 12, padding: 12, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, color: active ? T.navy : T.text3 }}>{d.code}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, marginTop: 4, lineHeight: 1.3 }}>{langKey(s) === 'BM' ? d.name : d.en}</div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* 3. Module link */}
        <Section number={3} title={tx(s, 'linkModule')} optional>
          <select value={moduleId || ''} onChange={e => setModuleId(e.target.value || null)} style={{
            width: '100%', padding: '11px 12px', borderRadius: 10, fontSize: 13,
            border: `1px solid ${T.borderS}`, background: T.card, color: T.text,
            fontFamily: 'inherit', appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2356697A' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
          }}>
            <option value="">{tx(s, 'noModule')}</option>
            {s.modules.filter(m => m.state === 'downloaded' || m.state === 'completed').map(m => (
              <option key={m.id} value={m.id}>{m.id} - {moduleTitle(m, s)}</option>
            ))}
          </select>
        </Section>

        {/* 4. Reflection */}
        <Section number={4} title={tx(s, 'reflection')}>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder={tx(s, 'reflectionPlaceholder')}
            rows={3}
            style={{
              width: '100%', padding: 12, borderRadius: 12, fontSize: 13,
              border: `1px solid ${T.borderS}`, background: T.surface, color: T.text,
              fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
              lineHeight: 1.5, outline: 'none',
            }}
          />
          <div style={{ fontSize: 10.5, color: T.text3, marginTop: 6 }}>
            {tx(s, 'avoidPupilNames')}
          </div>
        </Section>

        {/* Transparency - collapsible */}
        <Collapsible title={tx(s, 'whoCanSee')} defaultOpen={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
            {visibilityOptions.map(v => (
              <label key={v.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px',
                cursor: 'pointer', borderRadius: 10,
                background: visibility === v.id ? T.surface2 : 'transparent',
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  border: `2px solid ${visibility === v.id ? T.navy : T.borderS}`,
                  background: visibility === v.id ? T.navy : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {visibility === v.id && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                </div>
                <input type="radio" checked={visibility === v.id}
                  onChange={() => setVisibility(v.id)} style={{ display: 'none' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{v.label}</div>
                  <div style={{ fontSize: 11, color: T.text2, marginTop: 1 }}>{v.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </Collapsible>

        {error && (
          <div style={{
            background: T.dangerS, color: T.danger,
            padding: '11px 14px', borderRadius: 12,
            fontSize: 12.5, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Icon name="warn" size={16} /> {error}
          </div>
        )}

        <button onClick={submit} style={{ ...btnPrimary, padding: '15px', fontSize: 14.5 }}>
          <Icon name="check" size={16} stroke={2.4} />
          {s.online ? tx(s, 'submitSyncNow') : tx(s, 'saveSyncLater')}
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
function RecordScreen({ s, set, go }) {
  const byDomain = SGM_DOMAINS.map(d => ({ ...d, items: s.evidence.filter(e => e.domain === d.id) }));
  return (
    <div>
      <Header title={tx(s, 'myCpdRecord')} right={<InfoPopover content={tx(s, 'portableInfo')} />} />
      <div style={{ padding: '18px 16px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Hero stat */}
        <div style={{
          background: `linear-gradient(135deg, ${T.navy} 0%, ${T.tealDark} 100%)`,
          color: '#fff', borderRadius: 20, padding: 22,
          position: 'relative', overflow: 'hidden', boxShadow: T.shadow2,
        }}>
          <div style={{ position: 'absolute', right: -40, bottom: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.7, opacity: 0.85, textTransform: 'uppercase' }}>
              {tx(s, 'evidenceThisCycle')}
            </div>
            <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, marginTop: 8, letterSpacing: -1.2 }}>
              {s.evidence.length}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 10 }}>
              {tx(s, 'mapped')}
            </div>
          </div>
        </div>

        {/* Domain breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {byDomain.map(d => <DomainTile key={d.id} code={d.code} count={d.items.length} />)}
        </div>

        {/* Per-domain groups */}
        {byDomain.filter(d => d.items.length > 0).map(d => (
          <div key={d.id}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 2px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, color: T.navy }}>{d.code}</span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{langKey(s) === 'BM' ? d.name : d.en}</span>
              </div>
              <span style={{ fontSize: 11.5, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>
                {d.items.length} {tx(s, d.items.length > 1 ? 'items' : 'item')}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.items.map(e => <EvidenceCard key={e.id} ev={e} s={s} />)}
            </div>
          </div>
        ))}

        {/* Data-use receipt - Figure 2 panel 4. Tells the teacher explicitly
            what was uploaded, when, to which domain, and who can see what. */}
        <DataUseReceipt s={s} />

        {/* Audit info collapsible (subtle, no card) */}
        <Collapsible title={tx(s, 'auditPortability')} subtle>
          <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.6 }}>
            {tx(s, 'auditBody')}
          </div>
        </Collapsible>
      </div>
    </div>
  );
}

function EvidenceCard({ ev, s }) {
  const mod = MODULES.find(m => m.id === ev.moduleId);
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
      padding: 12, display: 'flex', gap: 12, boxShadow: T.shadow1,
    }}>
      <div style={{ width: 64, flexShrink: 0 }}>
        <ClassroomPlaceholder tone={ev.photoTone} blurFaces label="ev" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: T.text3, fontWeight: 600 }}>{ev.id}</span>
          {ev.synced ? <Chip tone="success" mono>{tx(s, 'synced')}</Chip> : <Chip tone="queue" mono>{tx(s, 'queued')}</Chip>}
        </div>
        <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.4 }}>{ev.note}</div>
        <div style={{ fontSize: 10.5, color: T.text3, marginTop: 5, fontFamily: 'JetBrains Mono, monospace' }}>
          {ev.date}{ev.syncedAt ? ` - ${tx(s, 'synced')} ${ev.syncedAt}` : ''}{mod ? ` - ${mod.id}` : ''}
        </div>
      </div>
    </div>
  );
}

// Profile - with Light / Dim theme toggle
function ProfileScreen({ s, set, go }) {
  return (
    <div>
      <Header title={tx(s, 'profile')} />
      <div style={{ padding: '18px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* User card */}
        <div style={{
          background: T.card, borderRadius: 16, padding: 16,
          border: `1px solid ${T.border}`, boxShadow: T.shadow1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `linear-gradient(135deg, ${T.navy}, ${T.teal})`,
              color: '#fff', fontSize: 20, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>LG</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Liana Anak Gunsalam</div>
              <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>SK Nabawan Utara - Nabawan</div>
              <div style={{ fontSize: 10.5, color: T.text3, marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>DG41 - Rural 2</div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <SettingCard title={tx(s, 'appearance')}>
          <ThemeToggle s={s} set={set} />
        </SettingCard>

        {/* Language */}
        <SettingCard title={tx(s, 'language')} info={tx(s, 'languageInfo')}>
          <LangPicker s={s} set={set} />
          {s.language === 'KDZ' && (
            <div style={{ marginTop: 10, fontSize: 11.5, color: T.text2, lineHeight: 1.5, background: T.surface2, borderRadius: 10, padding: 10 }}>
              {tx(s, 'languagePackNotice')}
            </div>
          )}
        </SettingCard>

        {/* Sync & data */}
        <SettingCard title={tx(s, 'syncData')}>
          <ToggleRow label={tx(s, 'syncMobileData')} defaultOn={true} />
          <ToggleRow label={tx(s, 'autoDownload')} defaultOn={false} />
          <ToggleRow label={tx(s, 'faceBlurCapture')} defaultOn={true} />
          <ValueRow label={tx(s, 'bundleCap')} value="25 MB" mono />
          <ValueRow label={tx(s, 'dataBudget')} value={tx(s, 'dataBudgetValue')} mono />
        </SettingCard>

        {/* About */}
        <SettingCard title={tx(s, 'about')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 0 10px' }}>
            <Logo size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>CikguSync</div>
              <div style={{ fontSize: 11, color: T.text3, fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>v0.4.2 - build 2026.05</div>
            </div>
          </div>
          <ValueRow label={tx(s, 'hostedBy')}         value="MyGovCloud - BPG" />
          <ValueRow label={tx(s, 'dataOwnership')}    value="MOE / BPG" />
          <ValueRow label={tx(s, 'pdpaCompliance')}   value={<Chip tone="success" mono>PDPA-2024</Chip>} />
        </SettingCard>
      </div>
    </div>
  );
}

function SettingCard({ title, info, children }) {
  return (
    <div style={{
      background: T.card, borderRadius: 16, padding: 16,
      border: `1px solid ${T.border}`, boxShadow: T.shadow1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>{title}</div>
        {info && <InfoPopover content={info} />}
      </div>
      {children}
    </div>
  );
}

function ThemeToggle({ s, set }) {
  const setTheme = (theme) => {
    set(p => ({ ...p, theme }));
    document.body.dataset.theme = theme;
    try { localStorage.setItem('cs-theme', theme); } catch(e) {}
  };
  const current = s.theme || 'light';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
      background: T.surface2, padding: 4, borderRadius: 12,
    }}>
      {[
        { id: 'light', label: tx(s, 'light'), icon: 'sun' },
        { id: 'dim',   label: tx(s, 'dim'),   icon: 'moon' },
      ].map(t => {
        const active = current === t.id;
        return (
          <button key={t.id} onClick={() => setTheme(t.id)} style={{
            background: active ? T.card : 'transparent',
            color: active ? T.text : T.text2,
            border: 'none', padding: '10px 12px', borderRadius: 9,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: active ? T.shadow1 : 'none',
          }}>
            <Icon name={t.icon} size={16} stroke={1.8} color={active ? T.navy : T.text3} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function LangPicker({ s, set }) {
  const active = s.language || 'BM';
  const setLanguage = (language) => {
    set(p => ({ ...p, language }));
    try { localStorage.setItem('cs-language', language); } catch(e) {}
  };
  const langs = [
    { id: 'BM',  label: 'Bahasa Malaysia',   status: tx(s, 'fullInterface') },
    { id: 'EN',  label: 'English',           status: tx(s, 'fullInterface') },
    { id: 'KDZ', label: 'Kadazandusun',      status: tx(s, 'selectedModules') },
    { id: 'IBN', label: 'Iban',              status: tx(s, 'comingCoAuthor'), disabled: true },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {langs.map(l => (
        <button key={l.id}
          onClick={() => !l.disabled && setLanguage(l.id)}
          disabled={l.disabled}
          style={{
            background: active === l.id ? T.tealSoft : 'transparent',
            border: 'none', padding: '10px 12px', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: l.disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', textAlign: 'left',
            opacity: l.disabled ? 0.5 : 1,
          }}>
          <div style={{
            width: 16, height: 16, borderRadius: '50%',
            border: `2px solid ${active === l.id ? T.navy : T.borderS}`,
            background: active === l.id ? T.navy : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {active === l.id && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{l.label}</div>
            <div style={{ fontSize: 11, color: T.text3, marginTop: 1 }}>{l.status}</div>
          </div>
          <span style={{ fontSize: 10.5, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>{l.id}</span>
        </button>
      ))}
    </div>
  );
}

function ToggleRow({ label, defaultOn }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0', borderTop: `1px dashed ${T.border}`,
    }}>
      <span style={{ fontSize: 13, color: T.text }}>{label}</span>
      <ToggleSwitch on={on} setOn={setOn} small />
    </div>
  );
}

function ValueRow({ label, value, mono }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0', borderTop: `1px dashed ${T.border}`,
    }}>
      <span style={{ fontSize: 13, color: T.text }}>{label}</span>
      <span style={{
        fontSize: 12.5, color: T.text2,
        fontFamily: mono ? 'JetBrains Mono, monospace' : 'inherit',
      }}>{value}</span>
    </div>
  );
}

Object.assign(window, {
  Section, Collapsible, ToggleSwitch,
  ModuleDetailScreen, CaptureScreen, RecordScreen, ProfileScreen,
  EvidenceCard, SettingCard, ThemeToggle, LangPicker, ToggleRow, ValueRow,
});
