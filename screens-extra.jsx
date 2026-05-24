// CikguSync - Extra screens covered by Figures 1, 2 and 4 of the mockups
// that did not exist as navigable views in the original prototype:
//   - WelcomeScreen        (Figure 1, panel 1)
//   - SyncQueueScreen      (Figure 2, panel 3)
//   - EdgeCaseScreen        (Figure 4, four states)
//   - DataUseReceipt        (Figure 2, panel 4 - block at bottom of CPD record)
//
// All visuals use the existing T tokens + Plus Jakarta Sans + JetBrains Mono
// so they sit naturally next to HomeScreen / ModulesScreen / etc.

// -----------------------------------------------------------------------------
// Welcome - first screen the teacher sees. Logo, tagline, language picker,
// online-state hint, big Start button, "How it works" secondary link.
// -----------------------------------------------------------------------------
function WelcomeScreen({ s, set, go }) {
  const setLanguage = (language) => {
    set(p => ({ ...p, language }));
    try { localStorage.setItem('cs-language', language); } catch (e) {}
  };
  const lang = s.language || 'BM';
  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      padding: '32px 22px 24px', background: T.surface,
    }}>
      {/* Brand block */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 12 }}>
        <Logo size={88} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: T.text, letterSpacing: -0.7, lineHeight: 1 }}>
            CikguSync
          </div>
          <div style={{ fontSize: 12.5, color: T.text2, marginTop: 8 }}>
            {tx(s, 'welcomeTagline')}
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 999,
          background: T.tealSoft, color: T.tealDark,
          fontSize: 12, fontWeight: 600,
          marginTop: 4,
        }}>
          <Icon name="spark" size={14} stroke={2} />
          {tx(s, 'welcomeSub')}
        </div>
      </div>

      {/* Language picker - inline, two languages with "+more" hint via help icon */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.text3, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 8 }}>
          {tx(s, 'chooseLanguage')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { id: 'BM', label: 'Bahasa Malaysia' },
            { id: 'EN', label: 'English' },
          ].map(l => {
            const active = lang === l.id;
            return (
              <button key={l.id} onClick={() => setLanguage(l.id)} style={{
                border: `1.5px solid ${active ? T.navy : T.border}`,
                background: active ? 'var(--cs-navy-soft)' : T.card,
                color: active ? T.navy : T.text,
                padding: '12px 10px', borderRadius: 12,
                fontSize: 13, fontWeight: active ? 700 : 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{l.label}</button>
            );
          })}
        </div>
      </div>

      {/* Online status hint card */}
      <div style={{
        marginTop: 12, padding: '10px 12px', borderRadius: 12,
        background: T.card, border: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: T.shadow1,
      }}>
        <Icon name={s.online ? 'cloud' : 'off'} size={18} color={s.online ? T.success : T.queue} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text }}>
            {s.online ? tx(s, 'youreOnline') : tx(s, 'youreOffline')}
          </div>
          <div style={{ fontSize: 11, color: T.text2, marginTop: 1 }}>
            {s.online ? tx(s, 'goodTimeToDownload') : tx(s, 'waitingForConnection')}
          </div>
        </div>
      </div>

      {/* Start CTA */}
      <button onClick={() => go('home')} style={{
        ...btnPrimary, marginTop: 14, padding: '15px', fontSize: 15,
        background: T.navyDeep,
      }}>
        {tx(s, 'start')}
      </button>
      <button onClick={() => set(p => ({ ...p, toast: tx(s, 'welcomeSub') })) || setTimeout(() => set(p => ({ ...p, toast: null })), 2400)}
        style={{
          background: 'transparent', border: 'none', color: T.navy,
          padding: '10px', fontSize: 12.5, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
          textDecoration: 'underline', textDecorationStyle: 'dotted',
          textUnderlineOffset: 4, marginTop: 4,
        }}>
        {tx(s, 'howItWorks')}
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Sync Queue - dedicated screen, lists every unsynced (queued / retrying) and
// the most recent synced items. Mirrors the mockup "Sync Queue" exactly:
// header pill with counter, big "Sync now" button, per-item rows with status chip.
// -----------------------------------------------------------------------------
function SyncQueueScreen({ s, set, go }) {
  const queued = s.evidence.filter(e => !e.synced);
  const recent = s.evidence.filter(e => e.synced).slice(0, 4);
  const all = [
    ...queued.map(e => ({ ...e, _status: e.retry && e.retry >= 2 ? 'retry' : 'queued' })),
    ...recent.map(e => ({ ...e, _status: 'synced' })),
  ];

  const syncAll = () => {
    if (!s.online) {
      set(p => ({ ...p, toast: tx(s, 'needConnection') }));
      setTimeout(() => set(p => ({ ...p, toast: null })), 2400);
      return;
    }
    // animate queued items to synced
    queued.forEach((e, i) => setTimeout(() => {
      set(p => ({
        ...p,
        evidence: p.evidence.map(x => x.id === e.id ? { ...x, synced: true, syncedAt: '14 May 09:31' } : x),
      }));
    }, 350 + i * 300));
    set(p => ({ ...p, toast: tx(s, 'syncing') }));
    setTimeout(() => set(p => ({ ...p, toast: null })), 2200);
  };

  const retryOne = (id) => {
    set(p => ({
      ...p,
      evidence: p.evidence.map(x => x.id === id
        ? (s.online
            ? { ...x, synced: true, syncedAt: '14 May 09:31', retry: 0 }
            : { ...x, retry: (x.retry || 0) + 1 })
        : x),
      toast: s.online ? tx(s, 'syncing') : tx(s, 'needConnection'),
    }));
    setTimeout(() => set(p => ({ ...p, toast: null })), 2200);
  };

  return (
    <div>
      <Header title={tx(s, 'syncQueueTitle')} back={() => go('home')} />
      <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Counter card */}
        <div style={{
          background: T.card, border: `1px solid ${T.border}`,
          borderRadius: 16, padding: 16, boxShadow: T.shadow1,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: queued.length > 0 ? T.queueS : T.successS,
            color: queued.length > 0 ? T.queue : T.success,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name="sync" size={20} stroke={2} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
              {queued.length > 0
                ? `${queued.length} ${queued.length === 1 ? tx(s, 'itemWaitingToSync') : tx(s, 'itemsWaitingToSync')}`
                : tx(s, 'nothingWaiting')}
            </div>
            {queued.length > 0 && (
              <div style={{ fontSize: 11.5, color: T.text2, marginTop: 2 }}>
                {tx(s, 'tapSyncNow')}
              </div>
            )}
          </div>
        </div>

        {/* Sync now CTA */}
        <button onClick={syncAll} disabled={queued.length === 0} style={{
          ...btnPrimary, padding: '14px', fontSize: 14,
          background: queued.length === 0 ? T.surface2 : T.navyDeep,
          color: queued.length === 0 ? T.text3 : '#fff',
          cursor: queued.length === 0 ? 'not-allowed' : 'pointer',
        }}>
          <Icon name="sync" size={16} stroke={2.2} /> {tx(s, 'syncNow')}
        </button>

        {/* Queue list */}
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: T.text3, letterSpacing: 0.7, textTransform: 'uppercase', padding: '0 2px 8px' }}>
            {tx(s, 'queueLabel')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {all.length === 0 && (
              <div style={{
                padding: 16, borderRadius: 12, background: T.surface,
                fontSize: 12.5, color: T.text2, textAlign: 'center',
              }}>{tx(s, 'queueEmpty')}</div>
            )}
            {all.map(e => <QueueRow key={e.id} ev={e} s={s} onRetry={() => retryOne(e.id)} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueRow({ ev, s, onRetry }) {
  const mod = MODULES.find(m => m.id === ev.moduleId);
  const chip = ev._status === 'synced'
    ? <Chip tone="success" mono>{tx(s, 'synced')}</Chip>
    : ev._status === 'retry'
      ? <Chip tone="warn" mono>{tx(s, 'retryCount')} {ev.retry || 2}</Chip>
      : <Chip tone="queue" mono>{tx(s, 'queued')}</Chip>;
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`, borderRadius: 12,
      padding: 12, display: 'flex', alignItems: 'flex-start', gap: 12,
      boxShadow: T.shadow1,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
        background: T.surface2, color: T.text2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={ev.note ? 'record' : 'camera'} size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {mod ? moduleTitle(mod, s) : (ev.note || 'Evidence')}
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: T.text3, marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
          {ev.id} · {ev.date} · SGM {ev.domain}
        </div>
        {ev._status === 'retry' && (
          <button onClick={onRetry} style={{
            background: 'transparent', border: 'none', color: T.warn,
            padding: '4px 0 0', fontSize: 11.5, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>{tx(s, 'queueTapToRetry')}</button>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{chip}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Edge-case screens (Figure 4): full-screen states with centered icon, title,
// body, primary action, secondary link. A single EdgeCaseScreen reads a `kind`
// prop and renders the matching content from COPY.
// -----------------------------------------------------------------------------
const EDGE_DEFS = {
  blocked: {
    icon: 'off', tone: T.queue, soft: T.queueS,
    titleK: 'edgeBlockedTitle', bodyK: 'edgeBlockedBody',
    primaryK: 'edgeBlockedPrimary', secondaryK: 'edgeBlockedSecondary',
    primaryGo: 'home', secondaryGo: 'modules',
  },
  uploadFailed: {
    icon: 'warn', tone: T.danger, soft: T.dangerS,
    titleK: 'edgeUploadTitle', bodyK: 'edgeUploadBody',
    primaryK: 'edgeUploadPrimary', secondaryK: 'edgeUploadSecondary',
    primaryGo: 'sync', secondaryGo: 'sync',
    extra: () => ({ retryCountText: 'Item: Evidence — Active learning · Retry count: 2 of 5' }),
  },
  incomplete: {
    icon: 'warn', tone: T.warn, soft: T.warnS,
    titleK: 'edgeIncompleteTitle', bodyK: 'edgeIncompleteBody',
    primaryK: 'edgeIncompletePrimary', secondaryK: 'edgeIncompleteSecondary',
    primaryGo: 'capture', secondaryGo: 'home',
    issues: ['edgeIncompleteItem1', 'edgeIncompleteItem2', 'edgeIncompleteItem3'],
  },
  storage: {
    icon: 'queue', tone: T.warn, soft: T.warnS,
    titleK: 'edgeStorageTitle', bodyK: 'edgeStorageBody',
    primaryK: 'edgeStoragePrimary', secondaryK: 'edgeStorageSecondary',
    primaryGo: 'sync', secondaryGo: 'modules',
  },
};

function EdgeCaseScreen({ kind, s, set, go }) {
  const def = EDGE_DEFS[kind] || EDGE_DEFS.blocked;
  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      padding: '20px 20px 24px', background: T.surface,
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, textAlign: 'center', maxWidth: 320, margin: '0 auto' }}>
        <div style={{
          width: 74, height: 74, borderRadius: '50%',
          background: def.soft, color: def.tone,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={def.icon} size={32} stroke={2} />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>
            {tx(s, def.titleK)}
          </div>
          <div style={{ fontSize: 13, color: T.text2, marginTop: 10, lineHeight: 1.55 }}>
            {tx(s, def.bodyK)}
          </div>
        </div>

        {def.issues && (
          <div style={{
            width: '100%', background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: '12px 14px', textAlign: 'left',
            boxShadow: T.shadow1,
          }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {def.issues.map(k => (
                <li key={k} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: T.text, lineHeight: 1.5 }}>
                  <Dot color={def.tone} size={6} style={{ marginTop: 7, flexShrink: 0 }} />
                  <span>{tx(s, k)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {def.extra && (
          <div style={{
            width: '100%', background: T.surface2, borderRadius: 8,
            padding: '8px 10px', fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10.5, color: T.text2, textAlign: 'center',
          }}>{def.extra().retryCountText}</div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
        <button onClick={() => go(def.primaryGo)} style={{
          ...btnPrimary, padding: '14px', fontSize: 14,
          background: T.navyDeep,
        }}>{tx(s, def.primaryK)}</button>
        <button onClick={() => go(def.secondaryGo)} style={{
          background: 'transparent', border: 'none', color: T.navy,
          padding: '10px', fontSize: 12.5, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>{tx(s, def.secondaryK)}</button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Data-use receipt - block surfaced on the CPD record screen. Mirrors Fig. 2
// panel 4: explicit list of what was uploaded, when, which domain, who can see.
// -----------------------------------------------------------------------------
function DataUseReceipt({ s }) {
  const lastSync = s.evidence.find(e => e.syncedAt)?.syncedAt || '14 May 09:31';
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
      padding: 14, boxShadow: T.shadow1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon name="info" size={16} color={T.navy} />
        <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{tx(s, 'dataUseReceipt')}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ReceiptRow label={tx(s, 'whatWasUploaded')} value={tx(s, 'whatWasUploadedBody')} />
        <ReceiptRow label={tx(s, 'when')} value={`${tx(s, 'whenBody')} · ${lastSync}`} mono />
        <ReceiptRow label={tx(s, 'whichDomain')} value="SGM 2.0 D2 · Instructional Practice" />
        <ReceiptRow label={tx(s, 'whoCanAccess')} value={tx(s, 'whoCanAccessBody')} />
      </div>
    </div>
  );
}

function ReceiptRow({ label, value, mono }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: T.text3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{
        fontSize: 12, color: T.text2, marginTop: 3, lineHeight: 1.5,
        fontFamily: mono ? 'JetBrains Mono, monospace' : 'inherit',
      }}>{value}</div>
    </div>
  );
}

Object.assign(window, {
  WelcomeScreen, SyncQueueScreen, QueueRow,
  EdgeCaseScreen, EDGE_DEFS,
  DataUseReceipt,
});
