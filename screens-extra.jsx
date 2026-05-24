// CikguSync - Sync Queue (Figure 2 panel 3) + Edge case template (Figure 4).

// -----------------------------------------------------------------------------
// 5.3 Sync Queue
// -----------------------------------------------------------------------------
function SyncQueueScreen({ s, set, go }) {
  const queued = s.evidence.filter(e => !e.synced);
  // Build list: unsynced first, then a couple of synced rows for context.
  const list = [
    ...s.evidence,
  ];

  const syncAll = () => {
    if (!s.online && queued.length > 0) { go('edge-upload'); return; }
    if (queued.length === 0) return;
    queued.forEach((e, i) => setTimeout(() => {
      set(p => ({
        ...p,
        evidence: p.evidence.map(x => x.id === e.id ? { ...x, synced: true, syncedAt: '14 May 09:31' } : x),
      }));
    }, 300 + i * 250));
  };

  const retryOne = (id) => {
    if (!s.online) { go('edge-upload'); return; }
    set(p => ({
      ...p,
      evidence: p.evidence.map(x => x.id === id ? { ...x, synced: true, syncedAt: '14 May 09:31', retry: 0 } : x),
    }));
  };

  const count = queued.length;
  return (
    <>
      <AppHeader back title={tx(s, 'syncQueueTitle')} onBack={() => go('home')} />
      <ScreenBody>
        {/* Compact white hero with Sync now button */}
        <CompactHero
          icon="refreshCw"
          title={count === 0
            ? tx(s, 'allSchoolsSynced')
            : `${count} ${count === 1 ? tx(s, 'itemWaitingToSync') : tx(s, 'itemsWaitingToSync')}`}
          sub={count === 0 ? '' : tx(s, 'tapSyncNow')}
          button={<PrimaryButton onClick={syncAll} disabled={count === 0} icon="refreshCw">
            {tx(s, 'syncNow')}
          </PrimaryButton>}
        />

        <div style={{ ...TYPE.eyebrow }}>{tx(s, 'queueLabel')}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {list.map(ev => <QueueItem key={ev.id} ev={ev} s={s} onRetry={() => retryOne(ev.id)} />)}
        </div>

        {/* Who can see this? disclosure */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="info" size={16} color={T.ink2} />
            <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{tx(s, 'whoCanSeeThis')}</div>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              tx(s, 'youFullEvidence'),
              tx(s, 'guruBesarCounts'),
              tx(s, 'ppdAggregated'),
            ].map((t, i) => (
              <li key={i} style={{ fontSize: 12, lineHeight: '18px', color: T.ink3 }}>· {t}</li>
            ))}
          </ul>
        </div>
      </ScreenBody>
    </>
  );
}

// -----------------------------------------------------------------------------
// 7. Edge case template (Figure 4)
// -----------------------------------------------------------------------------
const EDGE_DEFS = {
  blocked: {
    iconTone: 'peach', icon: 'cloudOff',
    titleK: 'edgeBlockedTitle',     bodyK: 'edgeBlockedBody',
    primaryK: 'edgeBlockedPrimary', secondaryK: 'edgeBlockedSecondary',
    primaryGo: 'home', secondaryGo: 'modules',
  },
  uploadFailed: {
    iconTone: 'red', icon: 'alertTriangle',
    titleK: 'edgeUploadTitle',     bodyK: 'edgeUploadBody',
    primaryK: 'edgeUploadPrimary', secondaryK: 'edgeUploadSecondary',
    primaryGo: 'sync', secondaryGo: 'sync',
    detailK: 'edgeUploadDetail', detailMono: true,
  },
  incomplete: {
    iconTone: 'peach', icon: 'alertTriangle',
    titleK: 'edgeIncompleteTitle', bodyK: 'edgeIncompleteBody',
    primaryK: 'edgeIncompletePrimary', secondaryK: 'edgeIncompleteSecondary',
    primaryGo: 'add', secondaryGo: 'home',
    issues: ['edgeIncompleteItem1', 'edgeIncompleteItem2', 'edgeIncompleteItem3'],
  },
  storage: {
    iconTone: 'peach', icon: 'smartphone',
    titleK: 'edgeStorageTitle',     bodyK: 'edgeStorageBody',
    primaryK: 'edgeStoragePrimary', secondaryK: 'edgeStorageSecondary',
    primaryGo: 'sync', secondaryGo: 'modules',
  },
};

function EdgeCaseScreen({ kind, s, set, go }) {
  const d = EDGE_DEFS[kind] || EDGE_DEFS.blocked;
  const dynamicIssues = kind === 'incomplete' && s.edgeIssues && s.edgeIssues.length > 0
    ? s.edgeIssues
    : null;
  const goAndClear = (target) => {
    if (kind === 'incomplete') set(p => ({ ...p, edgeIssues: null }));
    go(target);
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 20px 24px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', maxWidth: 320, margin: '48px auto 0' }}>
        <IconCircle icon={d.icon} tone={d.iconTone} />
        <div style={{ fontSize: 20, lineHeight: '28px', fontWeight: 700, color: T.ink, marginTop: 8 }}>
          {tx(s, d.titleK)}
        </div>
        <div style={{ fontSize: 14, lineHeight: '20px', fontWeight: 400, color: T.ink3 }}>
          {tx(s, d.bodyK)}
        </div>

        {/* Detail panel - mono (Upload failed) */}
        {d.detailK && (
          <div style={{
            marginTop: 8, width: '100%',
            background: T.surface2, borderRadius: 8, padding: '10px 12px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
            color: T.ink2,
          }}>{tx(s, d.detailK)}</div>
        )}

        {/* Detail panel - bulleted issues (Incomplete) */}
        {(d.issues || dynamicIssues) && (
          <div style={{
            marginTop: 8, width: '100%',
            background: T.peachPale, border: `1px solid #F4D6B8`,
            borderRadius: 12, padding: '12px 14px', textAlign: 'left',
          }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(dynamicIssues || d.issues.map(k => tx(s, k))).map((text, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, lineHeight: '20px', color: T.ink }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.peach, marginTop: 8, flexShrink: 0 }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
        <PrimaryButton onClick={() => goAndClear(d.primaryGo)}>{tx(s, d.primaryK)}</PrimaryButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextLink onClick={() => goAndClear(d.secondaryGo)}>{tx(s, d.secondaryK)}</TextLink>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SyncQueueScreen, EdgeCaseScreen, EDGE_DEFS });
