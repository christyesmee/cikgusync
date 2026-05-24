// CikguSync - District Dashboard (Figure 3 right).

function DistrictDashboardScreen({ s, set, go }) {
  const sgmRows = [
    { id: 'D1', name: 'Professional Knowledge', pct: 68 },
    { id: 'D2', name: 'Instructional Practice', pct: 74 },
    { id: 'D3', name: 'Community Engagement',   pct: 41 },
    { id: 'D4', name: 'Personal Quality',       pct: 56 },
  ];
  const offlineSchools = RURAL_SCHOOLS.filter(sc => !sc.connected && sc.status !== 'active').slice(0, 3);
  return (
    <>
      <AppHeader title={tx(s, 'districtDashboardTitle')} icon="map" iconBg={T.surface2} />
      <ScreenBody>
        <div>
          <div style={{ ...TYPE.pageTitle }}>{tx(s, 'pegawaiNorhaida')}</div>
          <div style={{ ...TYPE.pageSub, marginTop: 4 }}>{tx(s, 'ppdKeningau')}</div>
        </div>

        {/* 2x2 KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatCard icon="user"        label={tx(s, 'activeTeachers')} value="412"
            sub={tx(s, 'plusThisMonth')} subColor={T.green} />
          <StatCard icon="checkCircle2" label={tx(s, 'evidenceSynced')} value="1,047"
            sub={tx(s, 'plusMoM')} subColor={T.green} />
          <StatCard icon="cloudOff"    label={tx(s, 'offlineSchools')} value="17"
            attention valueColor={T.peach}
            sub={tx(s, 'pctOfDistrict')} subColor={T.peach} />
          <StatCard icon="cloudUpload" label={tx(s, 'queuedDistrict')} value="94"
            attention valueColor={T.peach}
            sub={tx(s, 'awaitingSync')} subColor={T.ink3} />
        </div>

        {/* SGM 2.0 activity */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ ...TYPE.sectionHead }}>{tx(s, 'sgm2Activity')}</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3 }}>{tx(s, 'keningauDistrict')}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sgmRows.map(r => <ProgressRow key={r.id} code={r.id} label={r.name} pct={r.pct} />)}
          </div>
          <div style={{ marginTop: 14 }}>
            <CalloutCard tone="peach" icon="alertTriangle"
              title={<><b>{tx(s, 'd3InsightLead')}</b> {tx(s, 'd3InsightBody')}</>}
            />
          </div>
        </div>

        {/* Schools needing connectivity support */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
        }}>
          <div style={{ ...TYPE.sectionHead }}>{tx(s, 'schoolsNeedingConnectivity')}</div>
          <div style={{ fontSize: 12, lineHeight: '18px', fontWeight: 400, color: T.ink3, marginTop: 4 }}>
            {tx(s, 'schoolsNeedingSub')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {offlineSchools.length === 0 ? (
              <div style={{ fontSize: 13, color: T.ink2 }}>{tx(s, 'allSchoolsSynced')}</div>
            ) : offlineSchools.map(sc => (
              <div key={sc.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderTop: `1px solid ${T.line}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: T.peachPale, color: T.peach,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="cloudOff" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{sc.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3, marginTop: 2 }}>
                    last sync {sc.last} · {sc.district}
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

Object.assign(window, { DistrictDashboardScreen });
