// CikguSync - component library per CIKGUSYNC_REDESIGN.md §3.
// Each component is built once and reused on every screen.

// -----------------------------------------------------------------------------
// PhoneShell + StatusBar + AppHeader + BottomNav (per spec §2.1)
// -----------------------------------------------------------------------------

// PhoneShell - fixed-width mobile column centred on --surface-50, even on
// desktop. The web build is a phone-shaped canvas (spec hard rule).
function PhoneShell({ children }) {
  return (
    <div style={{
      width: '100%', maxWidth: 420, minHeight: '100vh',
      margin: '0 auto', background: T.bg,
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      {children}
    </div>
  );
}

// Decorative status bar (9:41 + signal/battery glyphs). Not real time.
function StatusBar() {
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', ...TYPE.statusBar,
    }}>
      <span>9:41</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="1" width="22" height="10" rx="2.5"/><rect x="24" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" stroke="none"/><rect x="3" y="3" width="18" height="6" rx="1" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// AppHeader - two variants.
//   Default: icon-tile + title left, optional 'more' right. Used on the four
//   primary teacher/leader/district screens that have a bottom nav.
//   Back:    chevron-left + centred title. Used on secondary screens.
function AppHeader({ title, icon = 'bookOpen', iconBg, iconColor, back, onBack, right, center }) {
  if (back) {
    return (
      <div style={{
        height: 56, display: 'flex', alignItems: 'center',
        padding: '0 16px', borderBottom: `1px solid ${T.line}`, background: T.surface,
        position: 'relative',
      }}>
        <button onClick={onBack} aria-label="Back" style={{
          width: 32, height: 32, border: 'none', background: 'transparent',
          color: T.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="chevronLeft" size={24} stroke={1.8} />
        </button>
        <div style={{ ...TYPE.cardTitle, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>{title}</div>
        <div style={{ flex: 1 }} />
        {right || <button aria-label="More" style={{
          width: 32, height: 32, border: 'none', background: 'transparent',
          color: T.ink2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="moreHorizontal" size={20} /></button>}
      </div>
    );
  }
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', gap: 10,
      padding: '0 16px', borderBottom: `1px solid ${T.line}`, background: T.surface,
    }}>
      {icon && (
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: iconBg || T.surface2, color: iconColor || T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name={icon} size={16} />
        </div>
      )}
      <div style={{ ...TYPE.cardTitle, flex: 1, minWidth: 0 }}>{title}</div>
      {center}
      {right || <button aria-label="More" style={{
        width: 32, height: 32, border: 'none', background: 'transparent',
        color: T.ink2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name="moreHorizontal" size={20} /></button>}
    </div>
  );
}

// Bottom nav - 4 items only: Modules · Add evidence · Sync queue · My record.
// Spec §2.1: top hairline only, no shadow. Active = navy, inactive = ink-500.
function BottomNav({ active, onNavigate, s }) {
  const items = [
    { id: 'modules', label: tx(s, 'modulesNav'),     icon: 'bookOpen' },
    { id: 'add',     label: tx(s, 'addEvidenceNav'), icon: 'camera' },
    { id: 'sync',    label: tx(s, 'syncQueueNav'),   icon: 'refreshCw' },
    { id: 'record',  label: tx(s, 'myRecordNav'),    icon: 'fileText' },
  ];
  return (
    <div style={{
      height: 64, display: 'flex',
      background: T.surface, boxShadow: '0 -1px 0 var(--line-200)',
      position: 'sticky', bottom: 0,
    }}>
      {items.map(it => {
        const on = active === it.id;
        return (
          <button key={it.id} onClick={() => onNavigate(it.id)} style={{
            flex: 1, border: 'none', background: 'transparent',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
            color: on ? T.navy : T.ink3, cursor: 'pointer', fontFamily: 'inherit',
            paddingTop: 8, paddingBottom: 12,
          }}>
            <Icon name={it.icon} size={20} stroke={on ? 2 : 1.6} />
            <span style={{ ...TYPE.navLabel }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Online/Offline pill (spec §2.2)
// -----------------------------------------------------------------------------
function OnlinePill({ online }) {
  const bg = online ? T.greenSoft : T.peachSoft;
  const fg = online ? T.green    : T.peach;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: bg, color: fg, padding: '6px 10px', borderRadius: R.pill,
      ...TYPE.pill,
    }}>
      {online && <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green }} />}
      {online ? 'Online' : 'Offline'}
    </span>
  );
}

// -----------------------------------------------------------------------------
// StatCard (§3.1). Attention variant uses --peach colours when stat counts
// queued/offline things.
// -----------------------------------------------------------------------------
function StatCard({ icon, label, value, valueColor, attention, sub, subColor }) {
  const bg = attention ? T.peachPale : T.surface;
  const iconCol = attention ? T.peach : T.ink3;
  return (
    <div style={{
      background: bg, border: `1px solid ${T.line}`, borderRadius: R.card,
      padding: 16, minHeight: 110, display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <Icon name={icon} size={18} color={iconCol} />
      <div style={{ ...TYPE.statLabel }}>{label}</div>
      <div style={{ ...TYPE.statValue, color: valueColor || T.ink, marginTop: 'auto' }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 12, lineHeight: '16px', fontWeight: 500, color: subColor || T.ink3 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// HeroCard - dark navy (§3.2). Used for Weekly Digest on School Summary and
// the white/compact variant on Sync Queue (see CompactHero below).
// -----------------------------------------------------------------------------
function HeroCard({ icon = 'fileText', title, caption, children }) {
  return (
    <div style={{
      background: T.navy, color: '#fff', borderRadius: R.hero, padding: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: T.navyMid, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name={icon} size={16} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...TYPE.heroTitle }}>{title}</div>
          {caption && <div style={{ ...TYPE.heroCap, marginTop: 2 }}>{caption}</div>}
        </div>
      </div>
      {children && <div style={{ marginTop: 14 }}>{children}</div>}
    </div>
  );
}

// HeroInner - nested panel inside a HeroCard (e.g. SGM 2.0 activity block).
function HeroInner({ children }) {
  return (
    <div style={{
      background: T.navyMid, borderRadius: 12, padding: 12, color: '#fff',
    }}>{children}</div>
  );
}

// CompactHero - the WHITE-not-navy hero on Sync Queue per spec §5.3.
function CompactHero({ icon, title, sub, button }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: T.navy, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name={icon} size={18} stroke={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...TYPE.cardTitle }}>{title}</div>
          <div style={{ ...TYPE.cardBody, marginTop: 2 }}>{sub}</div>
        </div>
      </div>
      {button}
    </div>
  );
}

// -----------------------------------------------------------------------------
// ModuleCard (§3.3). Two pill variants: Open offline (downloaded, outlined
// green) and Download (filled navy).
// -----------------------------------------------------------------------------
function ModuleCard({ mod, onClick, onDownload, s, progress, downloaded }) {
  return (
    <button onClick={onClick} style={{
      background: T.surface, border: `1px solid ${T.line}`, borderRadius: R.card, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer',
      fontFamily: 'inherit', textAlign: 'left', width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: T.surface2, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name={mod.icon || 'bookOpen'} size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...TYPE.cardTitle }}>{moduleTitle(mod, s)}</div>
          <div style={{ ...TYPE.cardBody, marginTop: 4 }}>{moduleSummary(mod, s)}</div>
        </div>
      </div>
      {typeof progress === 'number' ? (
        <ProgressBarRow value={progress} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: T.ink3 }}>
            {mod.sizeMB} MB · SGM {mod.domain}
          </span>
          {downloaded
            ? <PillButton tone="open"><Icon name="check" size={14} stroke={2.2} /> {tx(s, 'openOffline')}</PillButton>
            : <PillButton tone="download" onClick={(e) => { e.stopPropagation(); onDownload && onDownload(); }}><Icon name="download" size={14} stroke={2.2} /> {tx(s, 'download')}</PillButton>}
        </div>
      )}
    </button>
  );
}

function PillButton({ tone, children, onClick }) {
  const isOpen = tone === 'open';
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 12px', borderRadius: 12,
      ...TYPE.pill,
      background: isOpen ? T.surface : T.navy,
      color:      isOpen ? T.green   : '#fff',
      border:     isOpen ? `1px solid ${T.green}` : '1px solid transparent',
      cursor: 'pointer', fontWeight: 600,
    }}>{children}</span>
  );
}

function ProgressBarRow({ value }) {
  const pct = Math.round(value * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 4, background: T.line, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: T.navy }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.ink2 }}>{pct}%</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Buttons (§3.4 + §3.5)
// -----------------------------------------------------------------------------
function PrimaryButton({ children, onClick, disabled, icon, full = true, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      width: full ? '100%' : 'auto', height: 52, borderRadius: 12,
      background: disabled ? T.surface2 : T.navy,
      color:      disabled ? T.ink3 : '#fff',
      border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'inherit', ...TYPE.btnLabel,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {icon && <Icon name={icon} size={18} stroke={2} />}
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, icon, full = true }) {
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto', height: 52, borderRadius: 12,
      background: T.surface, color: T.navy,
      border: `1px solid ${T.navy}`, cursor: 'pointer',
      fontFamily: 'inherit', ...TYPE.btnLabel,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {icon && <Icon name={icon} size={18} stroke={2} />}
      {children}
    </button>
  );
}

function TextLink({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 'none', color: T.ink2,
      fontSize: 14, lineHeight: '20px', fontWeight: 500,
      cursor: 'pointer', fontFamily: 'inherit', padding: 12,
      textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1,
    }}>{children}</button>
  );
}

// -----------------------------------------------------------------------------
// SegmentedLanguagePicker (§3.6)
// -----------------------------------------------------------------------------
function SegmentedLanguagePicker({ value, onChange }) {
  const opts = [
    { id: 'BM', label: 'Bahasa Malaysia' },
    { id: 'EN', label: 'English' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {opts.map(o => {
        const on = value === o.id;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            background: on ? '#F0F4FB' : T.surface,
            border: on ? `1.5px solid ${T.navy}` : `1px solid ${T.line}`,
            borderRadius: R.card,
            padding: '14px 16px',
            cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 15, lineHeight: '20px', fontWeight: 600, color: T.ink,
            textAlign: 'center',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Form fields (§3.7)
// -----------------------------------------------------------------------------
function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 500, color: T.ink2 }}>{label}</label>}
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', leftIcon }) {
  return (
    <div style={{ position: 'relative' }}>
      {leftIcon && (
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.ink3 }}>
          <Icon name={leftIcon} size={18} />
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', height: 48, borderRadius: 12,
          border: `1px solid ${T.line}`, background: T.surface,
          padding: leftIcon ? '0 12px 0 40px' : '0 12px',
          fontSize: 14, fontWeight: 400, color: T.ink,
          fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function TextArea({ value, onChange, placeholder, max = 300, minHeight = 96 }) {
  const len = (value || '').length;
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={max}
        style={{
          width: '100%', minHeight, borderRadius: 12,
          border: `1px solid ${T.line}`, background: T.surface,
          padding: '12px 12px 24px',
          fontSize: 14, lineHeight: '20px', fontWeight: 400, color: T.ink,
          fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
        }}
      />
      <span style={{
        position: 'absolute', right: 12, bottom: 8,
        fontSize: 12, fontWeight: 400, color: T.ink3,
      }}>{len}/{max}</span>
    </div>
  );
}

function Select({ value, onChange, placeholder, options }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
        style={{
          width: '100%', height: 48, borderRadius: 12,
          border: `1px solid ${T.line}`, background: T.surface,
          padding: '0 36px 0 12px',
          fontSize: 14, fontWeight: 400, color: value ? T.ink : T.ink3,
          fontFamily: 'inherit', outline: 'none', appearance: 'none', boxSizing: 'border-box',
        }}>
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.ink3 }}>
        <Icon name="chevronDown" size={16} />
      </span>
    </div>
  );
}

function DateInput({ value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="date"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        style={{
          width: '100%', height: 48, borderRadius: 12,
          border: `1px solid ${T.line}`, background: T.surface,
          padding: '0 40px 0 12px',
          fontSize: 14, fontWeight: 400, color: T.ink,
          fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
        }}
      />
      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.ink3 }}>
        <Icon name="calendar" size={18} />
      </span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Badge / status pill (§3.8)
// -----------------------------------------------------------------------------
function Badge({ tone = 'neutral', children }) {
  const tones = {
    success: { bg: T.greenSoft, fg: T.green },
    warning: { bg: T.peachSoft, fg: T.peach },
    neutral: { bg: T.surface2, fg: T.ink2 },
    error:   { bg: T.redSoft,   fg: T.red },
  };
  const c = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: c.bg, color: c.fg, padding: '4px 10px',
      borderRadius: R.pill, ...TYPE.pill,
    }}>{children}</span>
  );
}

// -----------------------------------------------------------------------------
// CalloutCard (§3.9) - soft banner.
// -----------------------------------------------------------------------------
function CalloutCard({ tone = 'green', icon, title, body }) {
  const palette = {
    green: { bg: T.greenSoft, border: '#BFE5CE', fg: T.green },
    peach: { bg: T.peachPale, border: '#F4D6B8', fg: T.peach },
  }[tone];
  return (
    <div style={{
      background: palette.bg, border: `1px solid ${palette.border}`,
      borderRadius: 12, padding: 12,
      display: 'flex', gap: 10, alignItems: 'flex-start',
    }}>
      {icon && <Icon name={icon} size={20} color={palette.fg} style={{ flexShrink: 0, marginTop: 1 }} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 13, fontWeight: 600, color: palette.fg }}>{title}</div>}
        {body && <div style={{ fontSize: 12, lineHeight: '18px', fontWeight: 400, color: T.ink2, marginTop: 2 }}>{body}</div>}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// IconCircle (§3.10) - 64 px circle for edge-case heroes.
// -----------------------------------------------------------------------------
function IconCircle({ icon, tone = 'peach' }) {
  const palette = {
    peach: { bg: T.peachSoft, fg: T.peach },
    red:   { bg: T.redSoft,   fg: T.red },
  }[tone];
  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%',
      background: palette.bg, color: palette.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name={icon} size={28} stroke={1.8} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// DataReceipt (§3.11). Spec §5.4 lists the four labelled lines on CPD record.
// -----------------------------------------------------------------------------
function DataReceipt({ s }) {
  const lines = [
    { key: tx(s, 'duWhat'),  val: tx(s, 'duWhatBody') },
    { key: tx(s, 'duWhen'),  val: tx(s, 'duWhenBody') },
    { key: tx(s, 'duWhich'), val: tx(s, 'duWhichBody') },
    { key: tx(s, 'duWho'),   val: tx(s, 'duWhoBody') },
  ];
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon name="shield" size={16} color={T.ink2} />
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{tx(s, 'dataUseReceipt')}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 12, lineHeight: '18px', color: T.ink2 }}>
            <span style={{ fontWeight: 600 }}>{l.key}</span>{' '}
            <span style={{ fontWeight: 400 }}>{l.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ProgressRow (§3.12) - label / % above a horizontal bar.
// -----------------------------------------------------------------------------
function ProgressRow({ code, label, pct }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: T.ink2 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: T.ink }}>{code}</span> · {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: T.line, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: T.navy }} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// QueueItem (§3.13) - Sync queue row.
// -----------------------------------------------------------------------------
function QueueItem({ ev, s, onRetry }) {
  const status = ev.synced ? 'synced' : (ev.retry && ev.retry >= 2 ? 'retry' : 'queued');
  const badge = status === 'synced' ? <Badge tone="success">{tx(s, 'synced')}</Badge>
              : status === 'retry'  ? <Badge tone="warning">{tx(s, 'retry')} {ev.retry || 2}</Badge>
              :                       <Badge tone="warning">{tx(s, 'queued')}</Badge>;
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14,
      display: 'flex', alignItems: 'flex-start', gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: T.surface2, color: T.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="fileText" size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, lineHeight: '20px' }}>{ev.title}</div>
        <div style={{ fontSize: 12, fontWeight: 400, color: T.ink3, marginTop: 4 }}>{ev.meta}</div>
        {status === 'retry' && (
          <button onClick={onRetry} style={{
            background: 'transparent', border: 'none', color: T.peach,
            fontSize: 12, fontWeight: 600, padding: '4px 0 0', cursor: 'pointer', fontFamily: 'inherit',
          }}>{tx(s, 'tapToRetry')}</button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        {badge}
        <button aria-label="More" style={{
          background: 'transparent', border: 'none', color: T.ink3, cursor: 'pointer',
          padding: 0, display: 'inline-flex',
        }}><Icon name="moreHorizontal" size={16} /></button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ScreenBody - common vertical-stack wrapper. 20 px horizontal padding,
// 12 px gap between stacked sections, 24 px bottom for breathing room.
// -----------------------------------------------------------------------------
function ScreenBody({ children, padTop = 16 }) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto',
      padding: `${padTop}px 20px 24px`,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>{children}</div>
  );
}

Object.assign(window, {
  PhoneShell, StatusBar, AppHeader, BottomNav,
  OnlinePill, StatCard, HeroCard, HeroInner, CompactHero,
  ModuleCard, PillButton, ProgressBarRow,
  PrimaryButton, OutlineButton, TextLink,
  SegmentedLanguagePicker,
  Field, TextInput, TextArea, Select, DateInput,
  Badge, CalloutCard, IconCircle, DataReceipt, ProgressRow, QueueItem,
  ScreenBody,
});
