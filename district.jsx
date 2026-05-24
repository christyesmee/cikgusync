// CikguSync - District officer (Pegawai Norhaida) dashboard
// Per A2 persona 3 + A3 1.2: desktop view, combines online + offline schools, SGM 2.0 aggregation, exports.

function DistrictApp({ s }) {
  const [district, setDistrict] = useState('all');
  const [showOnly, setShowOnly] = useState('all'); // all | offline | low
  const [exportOpen, setExportOpen] = useState(false);

  const schools = RURAL_SCHOOLS.filter(sc => district === 'all' || sc.district === district)
    .filter(sc => showOnly === 'all' ? true : showOnly === 'offline' ? !sc.connected : sc.status === 'low');

  const totals = {
    schools: schools.length,
    teachers: schools.reduce((a, b) => a + b.teachers, 0),
    evidence: schools.reduce((a, b) => a + b.evidence30d, 0),
    offlineSchools: schools.filter(sc => !sc.connected).length,
  };

  const domainTotals = [
    { id: 'D1', name: 'Professional Knowledge', v: 38, pct: 68 },
    { id: 'D2', name: 'Instructional Practice', v: 67, pct: 74 },
    { id: 'D3', name: 'Community Engagement',   v: 22, pct: 41 },
    { id: 'D4', name: 'Personal Quality',       v: 14, pct: 56 },
  ];
  const maxD = Math.max(...domainTotals.map(d => d.v));
  // District-wide totals (mockup numbers in Figure 3 right panel)
  const districtTotals = { active: 412, synced: 1047, offline: 17, queued: 94 };

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: T.surface, color: T.text,
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        background: T.card, borderBottom: `1px solid ${T.border}`,
        padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={36} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>CikguSync - District</div>
            <div style={{ fontSize: 10.5, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>
              PPD Keningau - JPN Sabah
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <select value={district} onChange={e => setDistrict(e.target.value)} style={selectStyle}>
          <option value="all">All Interior districts</option>
          {['Nabawan','Pitas','Keningau','Tenom','Tambunan','Sipitang'].map(d => <option key={d}>{d}</option>)}
        </select>
        <button style={{
          ...btnSecondary, fontSize: 12, padding: '8px 12px',
        }} onClick={() => setExportOpen(true)}>
          <Icon name="export" size={14} /> Export
        </button>
        <div style={{ width: 1, height: 24, background: T.border }} />
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: T.tealSoft, color: T.tealDark,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>NH</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Pegawai Norhaida</div>
          <div style={{ fontSize: 10, color: T.text3 }}>DG44 - Pengurusan Akademik</div>
        </div>
      </div>

      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Title */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text2, letterSpacing: 0.6, textTransform: 'uppercase' }}>
            Rural CPD dashboard - SGM 2.0
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            Sabah Interior - 30-day view
          </div>
          <div style={{ fontSize: 12, color: T.text2, marginTop: 4 }}>
            Combined online + offline schools - last refreshed 14 May 2026, 09:30
          </div>
        </div>

        {/* KPI row - mirrors Figure 3 right-panel KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <Kpi label="Active teachers"  v={districtTotals.active}  sub="+38 this month" accent={T.navy} />
          <Kpi label="Evidence synced"  v={districtTotals.synced.toLocaleString()} sub="+22% MoM" accent={T.success} />
          <Kpi label="Offline schools"  v={districtTotals.offline} sub="~26% of district" accent={T.queue} />
          <Kpi label="Queued (district)" v={districtTotals.queued} sub="awaiting sync" accent={T.warn} />
        </div>

        {/* Two column: domain chart + school list */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 14 }}>
          {/* Domain breakdown */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text2, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                  Evidence by SGM 2.0 domain
                </div>
                <div style={{ fontSize: 13, color: T.text2, marginTop: 4 }}>
                  Mapped to UNESCO ICT-CFT v3
                </div>
              </div>
              <Chip tone="navy" mono>last 30d</Chip>
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {domainTotals.map(d => (
                <div key={d.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: T.navy }}>{d.id}</span>
                      <span style={{ color: T.text, marginLeft: 8 }}>{d.name}</span>
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.text2 }}>{d.v} · {d.pct}%</span>
                  </div>
                  <div style={{ height: 8, background: T.surface2, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${d.pct}%`,
                      background: d.pct < 50
                        ? `linear-gradient(90deg, ${T.warn}, ${T.queue})`
                        : `linear-gradient(90deg, ${T.navy}, ${T.teal})`,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Alert callout - matches mockup D3 below 50% notice */}
            <div style={{
              marginTop: 14, padding: '10px 12px', borderRadius: 10,
              background: T.warnS, color: T.warn,
              display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11.5, lineHeight: 1.5,
            }}>
              <Icon name="warn" size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>
                <b>D3 below 50% target.</b> Suggest pairing with #CikguJuara mentors next term.
              </span>
            </div>

            {/* Partner sources */}
            <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px dashed ${T.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text2, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                Partner programmes (API-ready)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {[
                  { name: 'DELIMa 2.0', state: 'export-ready', tone: 'success' },
                  { name: 'Program Duta Guru', state: 'export-ready', tone: 'success' },
                  { name: '#CikguJuaraDigital', state: 'API agreement pending', tone: 'warn' },
                  { name: 'UNICEF FS4A', state: 'API agreement pending', tone: 'warn' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12 }}>{p.name}</span>
                    <Chip tone={p.tone} mono>{p.state}</Chip>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schools table */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text2, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                Schools - 30-day activity
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'offline', label: 'Offline schools' },
                  { id: 'low', label: 'Low activity' },
                ].map(f => (
                  <button key={f.id} onClick={() => setShowOnly(f.id)} style={{
                    border: 'none', background: showOnly === f.id ? T.navy : T.surface2,
                    color: showOnly === f.id ? '#fff' : T.text2,
                    padding: '6px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>{f.label}</button>
                ))}
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                    {['School','District','Rural','Teachers','Net','Evidence 30d','Last sync',''].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '8px 8px', color: T.text3,
                        fontWeight: 700, fontSize: 10.5, letterSpacing: 0.4, textTransform: 'uppercase',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schools.map(sc => (
                    <tr key={sc.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: T.text }}>{sc.name}</div>
                        <div style={{ fontSize: 10, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>{sc.id}</div>
                      </td>
                      <td style={tdStyle}>{sc.district}</td>
                      <td style={tdStyle}><Chip mono>{sc.rural}</Chip></td>
                      <td style={tdStyle}>{sc.teachers}</td>
                      <td style={tdStyle}>
                        {sc.connected
                          ? <Chip tone="success" mono><Dot color={T.success} /> online</Chip>
                          : <Chip tone="queue" mono><Dot color={T.queue} /> offline</Chip>}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          color: sc.evidence30d >= 15 ? T.success : sc.evidence30d >= 8 ? T.text2 : T.queue,
                          fontWeight: 600,
                        }}>{sc.evidence30d}</span>
                      </td>
                      <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: T.text2 }}>{sc.last}</td>
                      <td style={tdStyle}>
                        <button style={{ ...btnGhost, fontSize: 10.5, padding: '4px 8px' }}>open</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 11, color: T.text3 }}>
              <Icon name="warn" size={13} color={T.queue} />
              <span>Offline schools are <b>counted</b> in this dashboard, even when they are invisible in DELIMa 2.0 analytics.</span>
            </div>
          </div>
        </div>

        {/* Recognition + map row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: 14 }}>
          {/* Recent recognition events */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16 }}>
            <SectionHead title="Recent recognition events - audit log" right={<Chip mono>idempotent - SHA-256</Chip>} />
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['EV-0094','Liana Anak Gunsalam',  'SK Nabawan Utara', 'D2', '11 May 07:31', 'synced'],
                  ['EV-0091','Liana Anak Gunsalam',  'SK Nabawan Utara', 'D1', '09 May 07:12', 'synced'],
                  ['EV-0087','Faridah binti Yusof',  'SK Sungai Pitas',  'D3', '08 May 18:04', 'synced'],
                  ['EV-0082','Azlan bin Karim',      'SK Sungai Pitas',  'D1', '07 May 09:55', 'synced'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: i ? `1px dashed ${T.border}` : 'none' }}>
                    <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: T.text3 }}>{r[0]}</td>
                    <td style={tdStyle}>{r[1]}</td>
                    <td style={{ ...tdStyle, color: T.text2 }}>{r[2]}</td>
                    <td style={tdStyle}><Chip tone="navy" mono>{r[3]}</Chip></td>
                    <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: T.text2 }}>{r[4]}</td>
                    <td style={tdStyle}><Chip tone="success" mono>{r[5]}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Outstanding queue / NADI map */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16 }}>
            <SectionHead title="Offline schools - plan a visit" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {schools.filter(s => !s.connected).slice(0, 4).map(sc => (
                <div key={sc.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 10, background: T.surface,
                }}>
                  <Icon name="pin" size={16} color={T.queue} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{sc.name}</div>
                    <div style={{ fontSize: 10.5, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>{sc.district} - {sc.rural} - last {sc.last}</div>
                  </div>
                  <button style={{ ...btnGhost, fontSize: 10.5 }}>schedule</button>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 12, padding: 10, borderRadius: 8,
              background: T.surface2, fontSize: 11, color: T.text2, lineHeight: 1.5,
            }}>
              Pair PPD visits with the nearest <b>NADI centre</b> so teachers can sync queued evidence
              on the same day (MCMC NADI Ambassador Sabah, 2025).
            </div>
          </div>
        </div>
      </div>

      {exportOpen && <ExportModal close={() => setExportOpen(false)} />}
    </div>
  );
}

const tdStyle = { padding: '8px 8px', verticalAlign: 'middle' };
const selectStyle = {
  fontSize: 12, padding: '8px 12px', borderRadius: 8,
  border: `1px solid ${T.borderS}`, background: T.card, color: T.text,
  fontFamily: 'inherit', cursor: 'pointer',
};

function Kpi({ label, v, sub, accent = T.text }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text2, letterSpacing: 0.6, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: accent, marginTop: 6, lineHeight: 1 }}>{v}</div>
      <div style={{ fontSize: 11, color: T.text3, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function ExportModal({ close }) {
  const [format, setFormat] = useState('csv');
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(15, 42, 61, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
    }}>
      <div style={{
        background: T.card, borderRadius: 14, padding: 22, width: 460,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Export for BPG reporting</div>
            <div style={{ fontSize: 12, color: T.text2, marginTop: 4 }}>
              Replaces the audit handoff previously done through SPLKPM.
            </div>
          </div>
          <button onClick={close} style={{ ...btnGhost, padding: 6 }}><Icon name="close" size={14} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
          {['csv','json','xlsx'].map(f => (
            <button key={f} onClick={() => setFormat(f)} style={{
              border: `1.5px solid ${format === f ? T.navy : T.border}`,
              background: format === f ? 'var(--cs-navy-soft)' : T.card,
              padding: '12px 8px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700,
              color: format === f ? T.navy : T.text,
            }}>.{f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {[
            'Aggregated by SGM 2.0 domain',
            'Per-teacher evidence (idempotent IDs)',
            'Include offline schools',
            'UNESCO ICT-CFT v3 mapping',
            'Last-30-day window',
          ].map((opt, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: T.navy }} />
              {opt}
            </label>
          ))}
        </div>
        <button style={{ ...btnPrimary, width: '100%', marginTop: 18, padding: 12 }} onClick={close}>
          <Icon name="download" size={15} stroke={2.2} /> Download for DPD 2023-2030 reporting
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { DistrictApp });
