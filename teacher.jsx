// CikguSync - Teacher (Cikgu Liana) - Home, Modules, shared chrome
const { useState, useEffect, useRef } = React;

// -----------------------------------------------------------------------------
const btnPrimary = {
  background: T.navy, border: 'none', color: '#fff',
  fontSize: 14, padding: '12px 18px', borderRadius: 12,
  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  letterSpacing: 0.1,
};
const btnSecondary = {
  ...btnPrimary, background: T.card, color: T.navy,
  border: `1px solid ${T.borderS}`, fontWeight: 600,
};
const btnGhost = {
  background: 'transparent', border: `1px solid ${T.borderS}`,
  color: T.text2, fontSize: 11, padding: '6px 10px',
  borderRadius: 999, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
};

// -----------------------------------------------------------------------------
function Header({ title, back, right, subtitle }) {
  return (
    <div style={{
      padding: '14px 14px 12px', background: T.card,
      borderBottom: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      {back && (
        <button onClick={back} style={{
          width: 34, height: 34, border: 'none', background: T.surface2,
          borderRadius: 11, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: T.text, flexShrink: 0,
        }}><Icon name="chevL" size={18} /></button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, lineHeight: 1.2, letterSpacing: -0.1 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11.5, color: T.text2, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

// -----------------------------------------------------------------------------
function BottomNav({ tab, setTab, s }) {
  const items = [
    { id: 'home',    label: tx(s, 'home'),    icon: 'home' },
    { id: 'modules', label: tx(s, 'learn'),   icon: 'book' },
    { id: 'capture', label: tx(s, 'add'),     icon: 'camera' },
    { id: 'record',  label: tx(s, 'record'),  icon: 'record' },
    { id: 'profile', label: tx(s, 'profile'), icon: 'user' },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: `1px solid ${T.border}`,
      background: T.card,
    }}>
      {items.map(it => {
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} style={{
            flex: 1, border: 'none', background: 'transparent',
            padding: '10px 4px 12px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: active ? T.navy : T.text3,
            fontFamily: 'inherit', position: 'relative',
          }}>
            <Icon name={it.icon} size={20} stroke={active ? 2.2 : 1.7} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: 0.2 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Status pill - replaces the old banner
function StatusPill({ s, set }) {
  const queued = s.evidence.filter(e => !e.synced).length;
  const online = s.online;
  return (
    <button onClick={() => set(p => ({ ...p, online: !p.online }))} style={{
      border: `1px solid ${T.border}`, background: T.card,
      padding: '6px 11px 6px 9px', borderRadius: 999, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 7,
      fontFamily: 'inherit', boxShadow: T.shadow1,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: online ? T.success : T.queue,
        boxShadow: `0 0 0 3px ${online ? T.successS : T.queueS}`,
      }} />
      <span style={{ fontSize: 11.5, fontWeight: 600, color: T.text }}>
        {online ? tx(s, 'online') : tx(s, 'offline')}
      </span>
      {queued > 0 && (
        <>
          <span style={{ width: 2, height: 2, borderRadius: '50%', background: T.text3 }} />
          <span style={{ fontSize: 11, color: T.text2, fontFamily: 'JetBrains Mono, monospace' }}>{queued} {tx(s, 'queued')}</span>
        </>
      )}
    </button>
  );
}

// -----------------------------------------------------------------------------
function InfoPopover({ content, side = 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        style={{
          width: 22, height: 22, borderRadius: '50%',
          border: 'none', background: T.surface2, color: T.text2,
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>?</button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 20 }} />
          <div style={{
            position: 'absolute', top: 28,
            [side]: 0,
            width: 240, background: T.cardElev,
            border: `1px solid ${T.borderS}`, borderRadius: 12, padding: 12,
            boxShadow: T.shadow2,
            fontSize: 12, color: T.text2, lineHeight: 1.5, zIndex: 21,
          }}>{content}</div>
        </>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
function DomainTile({ code, count }) {
  const active = count > 0;
  return (
    <div style={{
      background: active ? `linear-gradient(135deg, ${T.navy}, ${T.tealDark})` : T.surface2,
      color: active ? '#fff' : T.text3,
      borderRadius: 12, padding: '12px 6px', textAlign: 'center',
      transition: 'transform 0.15s',
    }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, opacity: 0.85, letterSpacing: 0.3 }}>{code}</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, marginTop: 5, letterSpacing: -0.5 }}>{count}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
function MiniModuleRow({ mod, onOpen, s }) {
  const subtitle = mod.state === 'downloaded' ? tx(s, 'onPhoneReady')
                : mod.state === 'completed'   ? tx(s, 'completedReview')
                : mod.state === 'downloading' ? `${(mod.progress*100).toFixed(0)}%`
                : `${mod.sizeMB.toFixed(0)} MB - ${tx(s, 'tapToDownload')}`;
  return (
    <button onClick={onOpen} style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: 14, padding: 12, cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
      boxShadow: T.shadow1,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 11, flexShrink: 0,
        background: `linear-gradient(135deg, ${T.navy}, ${T.teal})`,
        color: '#fff', fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{mod.domain}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text, lineHeight: 1.3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{moduleTitle(mod, s)}</div>
        <div style={{ fontSize: 11.5, color: T.text2, marginTop: 3 }}>{subtitle}</div>
      </div>
      <Icon name="chevR" size={16} color={T.text3} />
    </button>
  );
}

// -----------------------------------------------------------------------------
function HomeScreen({ s, set, go }) {
  const queued = s.evidence.filter(e => !e.synced).length;
  const totalEv = s.evidence.length;
  const evidenceByDomain = SGM_DOMAINS.map(d => ({ ...d, n: s.evidence.filter(e => e.domain === d.id).length }));
  const continueModule = s.modules.find(m => m.state === 'downloaded');
  const incomplete = s.modules.filter(m => m.state !== 'completed' && m.state !== 'downloaded');

  return (
    <div style={{ padding: '20px 18px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Greeting + status pill */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: T.text2, fontWeight: 500 }}>{tx(s, 'goodMorning')}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: T.text, lineHeight: 1.1, marginTop: 4, letterSpacing: -0.5 }}>
            Cikgu Liana
          </div>
        </div>
        <StatusPill s={s} set={set} />
      </div>

      {/* Continue learning hero */}
      {continueModule && (
        <button onClick={() => { set(p => ({ ...p, openModule: continueModule.id })); go('module'); }}
          style={{
            background: `linear-gradient(135deg, ${T.navy} 0%, ${T.tealDark} 100%)`,
            color: '#fff', border: 'none', borderRadius: 18, padding: 20,
            textAlign: 'left', cursor: 'pointer', position: 'relative', overflow: 'hidden',
            fontFamily: 'inherit', boxShadow: T.shadow2,
          }}>
          <div style={{ position: 'absolute', right: -30, top: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', right: 40, bottom: -50, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.7, opacity: 0.85, textTransform: 'uppercase' }}>
              {tx(s, 'continue')} - {continueModule.id}
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, marginTop: 8, lineHeight: 1.3, maxWidth: '85%' }}>
              {moduleTitle(continueModule, s)}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 5 }}>
              {tx(s, 'chapter')} 3 {tx(s, 'of')} {continueModule.chapters} - ~{Math.max(3, continueModule.durationMin - 18)} {tx(s, 'minLeft')}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16,
              fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.18)',
              padding: '8px 14px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
              {tx(s, 'resume')} <Icon name="arrowR" size={14} stroke={2.4} />
            </div>
          </div>
        </button>
      )}

      {/* Primary CTA: Add evidence */}
      <button onClick={() => go('capture')} style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 16,
        padding: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 14, boxShadow: T.shadow1, width: '100%',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: T.navy, color: '#fff', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="camera" size={20} stroke={2} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{tx(s, 'addEvidence')}</div>
          <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>{tx(s, 'captureBlurTagReflect')}</div>
        </div>
        <Icon name="chevR" size={18} color={T.text3} />
      </button>

      {/* Sync queue card - only when there are queued items */}
      {queued > 0 && (
        <button onClick={() => go('sync')} style={{
          background: T.card, border: `1px solid ${T.border}`, borderRadius: 16,
          padding: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 14, boxShadow: T.shadow1, width: '100%',
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: 13,
            background: T.queueS, color: T.queue, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="sync" size={20} stroke={2} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{tx(s, 'syncQueueTitle')}</div>
            <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>
              {queued} {queued === 1 ? tx(s, 'itemWaitingToSync') : tx(s, 'itemsWaitingToSync')}
            </div>
          </div>
          <Icon name="chevR" size={18} color={T.text3} />
        </button>
      )}

      {/* CPD record summary */}
      <div style={{
        background: T.card, border: `1px solid ${T.border}`,
        borderRadius: 16, padding: 16, boxShadow: T.shadow1,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 0.6, textTransform: 'uppercase' }}>
              {tx(s, 'myRecord')}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: T.text, lineHeight: 1, letterSpacing: -0.8 }}>{totalEv}</span>
              <span style={{ fontSize: 12, color: T.text2 }}>{tx(s, 'thisCycle')}</span>
            </div>
          </div>
          <button onClick={() => go('record')} style={{
            background: 'transparent', border: 'none', color: T.navy,
            fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 4px',
          }}>{tx(s, 'viewRecord')} <Icon name="chevR" size={14} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {evidenceByDomain.map(d => <DomainTile key={d.id} code={d.code} count={d.n} />)}
        </div>
      </div>

      {/* Pinned for you (only if incomplete modules exist) */}
      {incomplete.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px 10px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{tx(s, 'pinnedForYou')}</div>
            <button onClick={() => go('modules')} style={{
              background: 'transparent', border: 'none', color: T.navy,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>{tx(s, 'seeAll')} <Icon name="chevR" size={12} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {incomplete.slice(0, 2).map(m => (
              <MiniModuleRow key={m.id} mod={m} s={s}
                onOpen={() => { set(p => ({ ...p, openModule: m.id })); go('module'); }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
function ModulesScreen({ s, set, go }) {
  const [filter, setFilter] = useState('all');
  const filtered = s.modules.filter(m => filter === 'all' ? true : m.state === filter);
  return (
    <div style={{ padding: '20px 18px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: T.text, letterSpacing: -0.5 }}>{tx(s, 'modules')}</div>
        <InfoPopover content={tx(s, 'moduleInfo')} />
      </div>
      <FilterChips value={filter} setValue={setFilter} options={[
        { id: 'all',        label: tx(s, 'all') },
        { id: 'available',  label: tx(s, 'available') },
        { id: 'downloaded', label: tx(s, 'onPhone') },
        { id: 'completed',  label: tx(s, 'done') },
      ]} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
        {filtered.map(m => (
          <ModuleRow key={m.id} mod={m}
            onOpen={() => { set(p => ({ ...p, openModule: m.id })); go('module'); }}
            onDownload={() => downloadModule(m.id, set, s)}
            s={s}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChips({ value, setValue, options }) {
  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
      {options.map(f => {
        const active = value === f.id;
        return (
          <button key={f.id} onClick={() => setValue(f.id)} style={{
            border: 'none',
            background: active ? T.navy : T.surface2,
            color: active ? '#fff' : T.text2,
            padding: '8px 14px', borderRadius: 999,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>{f.label}</button>
        );
      })}
    </div>
  );
}

function downloadModule(id, set, s) {
  if (!s.online) {
    set(p => ({ ...p, toast: tx(s, 'needConnection') }));
    setTimeout(() => set(p => ({ ...p, toast: null })), 2800);
    return;
  }
  set(p => ({ ...p, modules: p.modules.map(m => m.id === id ? { ...m, state: 'downloading', progress: 0 } : m) }));
  let prog = 0;
  const tick = setInterval(() => {
    prog += 0.18 + Math.random() * 0.12;
    if (prog >= 1) {
      clearInterval(tick);
      set(p => ({ ...p, modules: p.modules.map(m => m.id === id ? { ...m, state: 'downloaded', progress: 1 } : m), toast: tx(s, 'moduleDownloaded') }));
      setTimeout(() => set(p => ({ ...p, toast: null })), 2400);
    } else {
      set(p => ({ ...p, modules: p.modules.map(m => m.id === id ? { ...m, progress: prog } : m) }));
    }
  }, 280);
}

function ModuleRow({ mod, onOpen, onDownload, s }) {
  const stateChip = {
    available:   <Chip>{tx(s, 'get')}</Chip>,
    downloading: <Chip tone="teal" mono>{tx(s, 'downloading')}</Chip>,
    downloaded:  <Chip tone="navy" mono>{tx(s, 'onPhone')}</Chip>,
    completed:   <Chip tone="success" mono>{tx(s, 'done')}</Chip>,
  }[mod.state];
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: 16, padding: 14, boxShadow: T.shadow1,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: `linear-gradient(135deg, ${T.navy}, ${T.teal})`,
          color: '#fff', fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{mod.domain}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{moduleTitle(mod, s)}</div>
            {stateChip}
          </div>
          <div style={{ fontSize: 12, color: T.text2, marginTop: 6, lineHeight: 1.5 }}>{moduleSummary(mod, s)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 11, color: T.text3 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{mod.sizeMB.toFixed(1)} MB</span>
            <Dot color={T.text3} size={2} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{mod.durationMin} min</span>
            <Dot color={T.text3} size={2} />
            <span>{mod.lang.join(' - ')}</span>
            {s.language === 'KDZ' && mod.lang.includes('KDZ') && (
              <>
                <Dot color={T.teal} size={2} />
                <span>{tx(s, 'kdzPack')}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {mod.state === 'downloading' && (
        <div style={{ marginTop: 12, height: 4, background: T.surface2, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: T.teal, width: `${(mod.progress*100).toFixed(0)}%`, transition: 'width 0.25s' }} />
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        {mod.state === 'available' && (
          <button onClick={onDownload} style={{ ...btnPrimary, width: '100%', padding: '11px 14px', fontSize: 13 }}>
            <Icon name="download" size={14} stroke={2.2} /> {tx(s, 'download')}
          </button>
        )}
        {mod.state === 'downloaded' && (
          <button onClick={onOpen} style={{ ...btnPrimary, width: '100%', padding: '11px 14px', fontSize: 13 }}>
            {tx(s, 'openModule')} <Icon name="arrowR" size={14} />
          </button>
        )}
        {mod.state === 'completed' && (
          <button onClick={onOpen} style={{ ...btnSecondary, width: '100%', padding: '11px 14px', fontSize: 13 }}>
            {tx(s, 'reviewNotes')}
          </button>
        )}
        {mod.state === 'downloading' && (
          <button disabled style={{ ...btnSecondary, width: '100%', padding: '11px 14px', fontSize: 13, opacity: 0.6, cursor: 'wait' }}>
            {(mod.progress*100).toFixed(0)}%
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  Header, BottomNav, StatusPill, InfoPopover, DomainTile, MiniModuleRow,
  HomeScreen, ModulesScreen, ModuleRow, FilterChips,
  btnPrimary, btnSecondary, btnGhost,
});
