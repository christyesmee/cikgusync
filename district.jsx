// CikguSync - District officer (Pegawai Norhaida).
//
// Per Assignment 2 persona 3: Norhaida sits at PPD Keningau and works at a
// desktop. Her dashboard is *not* a phone app; the prototype renders it inside
// a BrowserFrame so the demo audience immediately understands the surface
// difference between teacher/leader (phone) and district officer (desktop).
//
// Layout:
//   top bar: brand mark + district selector + Export + officer chip
//   intro:   title + last-refreshed
//   row 1:   4 KPI cards (Active teachers, Evidence synced, Offline schools,
//                         Queued (district))
//   row 2:   SGM 2.0 chart (with D3-below-target callout + partner programmes)
//            | Schools table (All / Offline schools / Low activity filters)
//   row 3:   Recent recognition events (audit log)
//            | Offline schools - plan a visit (NADI pairing)
//   modal:   Export for BPG reporting (csv / json / xlsx + options)

function DistrictApp({ s }) {
  const [district, setDistrict] = useState('all');
  const [showOnly, setShowOnly] = useState('all'); // all | offline | low
  const [exportOpen, setExportOpen] = useState(false);

  const schools = RURAL_SCHOOLS
    .filter(sc => district === 'all' || sc.district === district)
    .filter(sc => showOnly === 'all' ? true : showOnly === 'offline' ? !sc.connected : sc.status === 'low');

  const domainTotals = [
    { id: 'D1', name: 'Professional Knowledge', v: 38, pct: 68 },
    { id: 'D2', name: 'Instructional Practice', v: 67, pct: 74 },
    { id: 'D3', name: 'Community Engagement',   v: 22, pct: 41 },
    { id: 'D4', name: 'Personal Quality',       v: 14, pct: 56 },
  ];

  const districtTotals = { active: 412, synced: 1047, offline: 17, queued: 94 };

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto', background: T.bg, color: T.ink,
      fontFamily: "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif",
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.line}`,
        padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={36} brand />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>CikguSync · District</div>
            <div style={{ fontSize: 10.5, color: T.ink3, fontFamily: 'JetBrains Mono, monospace' }}>
              PPD Keningau · JPN Sabah
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <select value={district} onChange={e => setDistrict(e.target.value)} style={selectStyle}>
          <option value="all">All Interior districts</option>
          {['Nabawan','Pitas','Keningau','Tenom','Tambunan','Sipitang'].map(d => <option key={d}>{d}</option>)}
        </select>
        <button onClick={() => setExportOpen(true)} style={{
          background: T.surface, color: T.navy, border: `1px solid ${T.line}`,
          padding: '8px 14px', borderRadius: 8,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="export" size={14} /> Export
        </button>
        <div style={{ width: 1, height: 24, background: T.line }} />
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: T.surface2, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>NH</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Pegawai Norhaida</div>
          <div style={{ fontSize: 10, color: T.ink3 }}>DG44 · Pengurusan Akademik</div>
        </div>
      </div>

      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Title */}
        <div>
          <div style={{ ...TYPE.eyebrow }}>Rural CPD dashboard · SGM 2.0</div>
          <div style={{ fontSize: 24, lineHeight: '30px', fontWeight: 700, color: T.ink, marginTop: 4 }}>
            Sabah Interior — 30-day view
          </div>
          <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>
            Combined online + offline schools · last refreshed 14 May 2026, 09:30
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <Kpi icon="user"        label="Active teachers"   v={districtTotals.active}                    sub="+38 this month"  subColor={T.green} />
          <Kpi icon="checkCircle2" label="Evidence synced"  v={districtTotals.synced.toLocaleString()}   sub="+22% MoM"        subColor={T.green} />
          <Kpi icon="cloudOff"    label="Offline schools"   v={districtTotals.offline}                   sub="~26% of district" subColor={T.peach} valueColor={T.peach} />
          <Kpi icon="cloudUpload" label="Queued (district)" v={districtTotals.queued}                    sub="awaiting sync"   subColor={T.ink3}  valueColor={T.peach} />
        </div>

        {/* Two-column: domain chart + schools table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 14 }}>
          <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ ...TYPE.eyebrow }}>Evidence by SGM 2.0 domain</div>
                <div style={{ fontSize: 13, color: T.ink3, marginTop: 4 }}>Mapped to UNESCO ICT-CFT v3</div>
              </div>
              <Badge tone="neutral">last 30d</Badge>
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {domainTotals.map(d => (
                <div key={d.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                    <span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: T.navy }}>{d.id}</span>
                      <span style={{ color: T.ink, marginLeft: 8 }}>{d.name}</span>
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', color: T.ink2 }}>{d.v} · {d.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: T.line, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${d.pct}%`,
                      background: d.pct < 50 ? T.peach : T.navy,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* D3 callout */}
            <div style={{ marginTop: 14 }}>
              <CalloutCard tone="peach" icon="alertTriangle"
                title={<><b>{tx(s, 'd3InsightLead')}</b> {tx(s, 'd3InsightBody')}</>}
              />
            </div>

            {/* Partner programmes */}
            <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px dashed ${T.line}` }}>
              <div style={{ ...TYPE.eyebrow }}>Partner programmes (API-ready)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {[
                  { name: 'DELIMa 2.0',          state: 'export-ready',         tone: 'success' },
                  { name: 'Program Duta Guru',   state: 'export-ready',         tone: 'success' },
                  { name: '#CikguJuaraDigital',  state: 'API agreement pending', tone: 'warning' },
                  { name: 'UNICEF FS4A',         state: 'API agreement pending', tone: 'warning' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12 }}>{p.name}</span>
                    <Badge tone={p.tone}>{p.state}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ ...TYPE.eyebrow }}>Schools — 30-day activity</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { id: 'all',     label: 'All' },
                  { id: 'offline', label: 'Offline schools' },
                  { id: 'low',     label: 'Low activity' },
                ].map(f => {
                  const on = showOnly === f.id;
                  return (
                    <button key={f.id} onClick={() => setShowOnly(f.id)} style={{
                      border: on ? 'none' : `1px solid ${T.line}`,
                      background: on ? T.navy : T.surface,
                      color: on ? '#fff' : T.ink2,
                      padding: '6px 12px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>{f.label}</button>
                  );
                })}
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.line}` }}>
                    {['School','District','Rural','Teachers','Net','Evidence 30d','Last sync',''].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '8px 8px', color: T.ink3,
                        fontWeight: 700, fontSize: 10.5, letterSpacing: 0.4, textTransform: 'uppercase',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schools.map(sc => (
                    <tr key={sc.id} style={{ borderBottom: `1px solid ${T.line}` }}>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: T.ink }}>{sc.name}</div>
                        <div style={{ fontSize: 10, color: T.ink3, fontFamily: 'JetBrains Mono, monospace' }}>{sc.id}</div>
                      </td>
                      <td style={tdStyle}>{sc.district}</td>
                      <td style={tdStyle}><Badge tone="neutral">{sc.rural}</Badge></td>
                      <td style={tdStyle}>{sc.teachers}</td>
                      <td style={tdStyle}>
                        {sc.connected
                          ? <Badge tone="success">online</Badge>
                          : <Badge tone="warning">offline</Badge>}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
                          color: sc.evidence30d >= 15 ? T.green : sc.evidence30d >= 8 ? T.ink2 : T.peach,
                        }}>{sc.evidence30d}</span>
                      </td>
                      <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: T.ink2 }}>{sc.last}</td>
                      <td style={tdStyle}>
                        <button style={{
                          background: 'transparent', border: `1px solid ${T.line}`,
                          color: T.ink2, fontSize: 10.5, padding: '4px 8px',
                          borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
                        }}>open</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 11.5, color: T.ink3 }}>
              <Icon name="alertTriangle" size={13} color={T.peach} />
              <span>Offline schools are <b>counted</b> in this dashboard, even when invisible in DELIMa 2.0 analytics.</span>
            </div>
          </div>
        </div>

        {/* Audit log + NADI plan */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: 14 }}>
          <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ ...TYPE.eyebrow }}>Recent recognition events — audit log</div>
              <Badge tone="neutral">idempotent · SHA-256</Badge>
            </div>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['EV-0094','Liana Anak Gunsalam',  'SK Nabawan Utara', 'D2', '11 May 07:31', 'synced'],
                  ['EV-0091','Liana Anak Gunsalam',  'SK Nabawan Utara', 'D1', '09 May 07:12', 'synced'],
                  ['EV-0087','Faridah binti Yusof',  'SK Sungai Pitas',  'D3', '08 May 18:04', 'synced'],
                  ['EV-0082','Azlan bin Karim',      'SK Sungai Pitas',  'D1', '07 May 09:55', 'synced'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: i ? `1px dashed ${T.line}` : 'none' }}>
                    <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: T.ink3 }}>{r[0]}</td>
                    <td style={tdStyle}>{r[1]}</td>
                    <td style={{ ...tdStyle, color: T.ink2 }}>{r[2]}</td>
                    <td style={tdStyle}><Badge tone="neutral">{r[3]}</Badge></td>
                    <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: T.ink2 }}>{r[4]}</td>
                    <td style={tdStyle}><Badge tone="success">{r[5]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 16 }}>
            <div style={{ ...TYPE.eyebrow, marginBottom: 12 }}>Offline schools — plan a visit</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {schools.filter(s => !s.connected).slice(0, 4).map(sc => (
                <div key={sc.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 10, background: T.bg,
                }}>
                  <Icon name="pin" size={16} color={T.peach} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{sc.name}</div>
                    <div style={{ fontSize: 10.5, color: T.ink3, fontFamily: 'JetBrains Mono, monospace' }}>
                      {sc.district} · {sc.rural} · last {sc.last}
                    </div>
                  </div>
                  <button style={{
                    background: 'transparent', border: `1px solid ${T.line}`,
                    color: T.ink2, fontSize: 10.5, padding: '4px 8px',
                    borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
                  }}>schedule</button>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 12, padding: 10, borderRadius: 8,
              background: T.surface2, fontSize: 11.5, color: T.ink2, lineHeight: 1.55,
            }}>
              Pair PPD visits with the nearest <b>NADI centre</b> so teachers can sync queued evidence on the same day (MCMC NADI Ambassador Sabah, 2025).
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
  fontSize: 13, padding: '8px 12px', borderRadius: 8,
  border: `1px solid ${T.line}`, background: T.surface, color: T.ink,
  fontFamily: 'inherit', cursor: 'pointer',
};

function Kpi({ icon, label, v, sub, valueColor, subColor }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name={icon} size={18} color={T.ink3} />
        <div style={{ ...TYPE.eyebrow }}>{label}</div>
      </div>
      <div style={{ fontSize: 30, lineHeight: '32px', fontWeight: 700, color: valueColor || T.ink, marginTop: 8, letterSpacing: -0.6 }}>{v}</div>
      <div style={{ fontSize: 12, color: subColor || T.ink3, marginTop: 4, fontWeight: 500 }}>{sub}</div>
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
        background: T.surface, borderRadius: 14, padding: 22, width: 460,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.ink }}>Export for BPG reporting</div>
            <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>
              Replaces the audit handoff previously done through SPLKPM.
            </div>
          </div>
          <button onClick={close} style={{
            background: 'transparent', border: 'none', color: T.ink2,
            cursor: 'pointer', padding: 6, display: 'inline-flex',
          }}><Icon name="close" size={16} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
          {['csv','json','xlsx'].map(f => (
            <button key={f} onClick={() => setFormat(f)} style={{
              border: `1.5px solid ${format === f ? T.navy : T.line}`,
              background: format === f ? '#EAF0F8' : T.surface,
              padding: '12px 8px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700,
              color: format === f ? T.navy : T.ink,
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
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: T.ink2 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: T.navy, width: 16, height: 16 }} />
              {opt}
            </label>
          ))}
        </div>
        <button onClick={close} style={{
          width: '100%', marginTop: 18, padding: 14, borderRadius: 12,
          background: T.navy, color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon name="download" size={16} stroke={2.2} /> Download for DPD 2023-2030 reporting
        </button>
      </div>
    </div>
  );
}

// The new spec's mobile-style DistrictDashboardScreen is still exported for
// reference, in case a phone view of the district data is needed. App.jsx
// renders DistrictApp (desktop) for the district persona by default.
function DistrictDashboardScreen({ s }) {
  return <DistrictApp s={s} />;
}

Object.assign(window, { DistrictApp, DistrictDashboardScreen, Kpi, ExportModal });
