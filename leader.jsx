// CikguSync - School Summary (Figure 3 left).

function SchoolSummaryScreen({ s, set, go }) {
  // Six teachers - render the first as the example in "Who may need support".
  const teachers = [
    { name: 'Liana Anak Gunsalam', items: 8, last: '4h',  status: 'active' },
    { name: 'Faridah binti Yusof', items: 5, last: '1d',  status: 'active' },
    { name: 'Azlan bin Karim',     items: 3, last: '3d',  status: 'active' },
    { name: 'Rosli bin Othman',    items: 0, last: '14d', status: 'inactive' },
    { name: 'Nurul binti Hashim',  items: 2, last: '6d',  status: 'low' },
    { name: 'Marcus Anak Jugah',   items: 0, last: '21d', status: 'transferred' },
  ];
  const needSupport = teachers.filter(t => t.status === 'inactive' || t.status === 'low');
  const sgmActivity = [
    { id: 'D1', name: 'Professional Knowledge', items: 4 },
    { id: 'D2', name: 'Instructional Practice', items: 5 },
    { id: 'D3', name: 'Community Engagement',   items: 2 },
    { id: 'D4', name: 'Personal Quality',       items: 1 },
  ];
  return (
    <>
      <AppHeader title={tx(s, 'schoolSummaryTitle')} icon="bookOpen" iconBg={T.surface2} />
      <ScreenBody>
        <div>
          <div style={{ ...TYPE.pageTitle }}>Guru Besar Jainal</div>
          <div style={{ ...TYPE.pageSub, marginTop: 4 }}>SK Pitas · Rural 2 · 9 teachers</div>
        </div>

        {/* Weekly Digest hero */}
        <HeroCard
          icon="fileText"
          title={tx(s, 'weeklyDigestTitle')}
          caption={tx(s, 'weeklyDigestCaption')}
        >
          <div style={{ fontSize: 14, lineHeight: '22px', fontWeight: 600, color: '#fff' }}>
            {tx(s, 'skPitasThisWeek')}
          </div>
          <div style={{ fontSize: 14, lineHeight: '22px', color: '#fff', marginTop: 6 }}>
            <Num>5 of 9</Num> teachers active · <Num>7</Num> modules completed · <Num>13</Num> evidence items submitted, <Num>5</Num> queued offline.
          </div>
          <div style={{ marginTop: 14 }}>
            <HeroInner>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{tx(s, 'sgm2Activity')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sgmActivity.map(d => (
                  <div key={d.id} style={{ fontSize: 13, lineHeight: '20px', color: '#fff' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, opacity: 0.95 }}>{d.id}</span>
                    {' '}{d.name} — {d.items} items
                  </div>
                ))}
              </div>
            </HeroInner>
          </div>
        </HeroCard>

        {/* 2x2 stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatCard icon="user"        label={tx(s, 'activeTeachers')}    value="5 / 9" />
          <StatCard icon="bookOpen"    label={tx(s, 'modulesCompleted')}  value="7" />
          <StatCard icon="fileText"    label={tx(s, 'evidenceSubmitted')} value="13"  valueColor={T.green} />
          <StatCard icon="cloudUpload" label={tx(s, 'queuedOffline')}     value="5"   attention valueColor={T.peach} />
        </div>

        {/* Who may need support */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ ...TYPE.sectionHead }}>{tx(s, 'whoMayNeedSupport')}</div>
            <Badge tone="warning">{needSupport.length} {tx(s, 'teachersCount')}</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {needSupport.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${T.line}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: T.surface2, color: T.ink,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}><Icon name="user" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{t.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3, marginTop: 2 }}>
                    last active {t.last}
                  </div>
                </div>
                <Icon name="chevronRight" size={16} color={T.ink3} />
              </div>
            ))}
          </div>
        </div>
      </ScreenBody>
    </>
  );
}

// Small helper: green-tinted bold number inline in the digest body.
function Num({ children }) {
  return <span style={{ fontWeight: 700, color: 'var(--green-100)' }}>{children}</span>;
}

Object.assign(window, { SchoolSummaryScreen });
