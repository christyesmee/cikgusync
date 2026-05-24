// CikguSync - School leader (Guru Besar Jainal).
//
// Jainal receives the weekly digest via Telegram. He doesn't log in daily to a
// new platform (Assignment 2 NFR10). The CikguSyncBot DM is his entry point;
// tapping 'Open school summary' on the bot's first message deep-links him into
// the read-only School Summary view inside the same app shell.
//
// LeaderApp toggles between the two views and is rendered inside the phone
// frame from app.jsx.

function LeaderApp({ s, view, setView, go }) {
  const [localView, setLocalView] = useState('chat');
  const active = view || localView;
  const change = setView || setLocalView;
  if (active === 'chat')   return <LeaderTelegram s={s} onOpen={() => change('digest')} />;
  return <SchoolSummaryScreen s={s} go={go} onBack={() => change('chat')} />;
}

// -----------------------------------------------------------------------------
// Telegram-style chat with @CikguSyncBot. Dark Telegram theme kept on purpose
// so the demo audience instantly recognises this is *not* the CikguSync app
// itself - it's the messenger Jainal already uses.
// -----------------------------------------------------------------------------
function LeaderTelegram({ s, onOpen }) {
  return (
    <div style={{ background: '#17212B', height: '100%', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        background: '#1F2C3A', padding: '12px 14px',
        borderBottom: '1px solid #233544',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Icon name="chevronLeft" size={20} color="#5AABE9" />
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: '#fff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Logo size={32} brand />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>CikguSync Bot</div>
          <div style={{ fontSize: 11, color: '#8497A7' }}>bot · weekly digest</div>
        </div>
      </div>

      {/* Date stamp */}
      <div style={{ textAlign: 'center', padding: '14px 0 4px' }}>
        <span style={{ background: '#22303C', color: '#A7BAC9', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>
          Monday, 11 May 2026
        </span>
      </div>

      <div style={{ flex: 1, padding: '8px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Bot - weekly digest with deep link */}
        <ChatBubble incoming>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
            Weekly summary — SK Sungai Pitas
          </div>
          <div style={{ fontSize: 12, color: '#A7BAC9', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>
            04 May - 10 May 2026
          </div>
          <DigestBar label="Evidence submitted" v={18} cap={20} />
          <DigestBar label="Teachers active" v={7} cap={9} />
          <DigestBar label="Mentor check-ins" v={3} cap={5} />
          <div style={{ borderTop: '1px solid #2B3B49', margin: '8px 0', paddingTop: 8 }}>
            <div style={{ fontSize: 11, color: '#8497A7', marginBottom: 6 }}>By SGM 2.0 domain</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[['D1', 4], ['D2', 9], ['D3', 3], ['D4', 2]].map(([k, n]) => (
                <span key={k} style={{
                  background: '#22303C', color: '#cde', fontSize: 11, padding: '3px 8px',
                  borderRadius: 999, fontFamily: 'JetBrains Mono, monospace',
                }}>{k} · {n}</span>
              ))}
            </div>
          </div>
          <button onClick={onOpen} style={{
            width: '100%', background: '#2B5278', border: 'none', color: '#fff',
            padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 600,
            marginTop: 8, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Open school summary
          </button>
          <div style={{ fontSize: 10, color: '#7C8E9F', marginTop: 6, textAlign: 'right' }}>09:02</div>
        </ChatBubble>

        <ChatBubble incoming>
          <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
            <b>Cikgu Liana</b> submitted 3 evidence items this week (M-156 reading routines — D1, D2). Last sync from NADI Nabawan, 10 May 16:42.
          </div>
          <div style={{ fontSize: 10, color: '#7C8E9F', marginTop: 4, textAlign: 'right' }}>09:02</div>
        </ChatBubble>

        <ChatBubble incoming>
          <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
            <b>Cikgu Rosli</b> has no logged activity for 14 days. Suggest a check-in.
          </div>
          <div style={{ fontSize: 10, color: '#7C8E9F', marginTop: 4, textAlign: 'right' }}>09:02</div>
        </ChatBubble>

        {/* Jainal replies */}
        <ChatBubble>
          <div style={{ fontSize: 12.5 }}>Terima kasih. Saya akan jumpa Rosli esok pagi.</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 4, textAlign: 'right' }}>09:14 read</div>
        </ChatBubble>

        <div style={{ flex: 1 }} />
      </div>

      {/* Input bar (decorative) */}
      <div style={{
        background: '#17212B', borderTop: '1px solid #233544',
        padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Icon name="plus" size={20} color="#6F7E8C" />
        <div style={{ flex: 1, background: '#242F3D', borderRadius: 999, padding: '8px 14px', fontSize: 12, color: '#7C8E9F' }}>
          Message
        </div>
        <Icon name="camera" size={20} color="#6F7E8C" />
      </div>
    </div>
  );
}

function ChatBubble({ children, incoming }) {
  return (
    <div style={{
      maxWidth: '86%',
      alignSelf: incoming ? 'flex-start' : 'flex-end',
      background: incoming ? '#22303C' : '#2B5278',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 12,
      borderBottomLeftRadius: incoming ? 4 : 12,
      borderBottomRightRadius: incoming ? 12 : 4,
    }}>{children}</div>
  );
}

function DigestBar({ label, v, cap }) {
  const pct = Math.min(1, v / cap);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 3 }}>
        <span style={{ color: '#cfd8e3' }}>{label}</span>
        <span style={{ color: '#A7BAC9', fontFamily: 'JetBrains Mono, monospace' }}>{v} / {cap}</span>
      </div>
      <div style={{ height: 4, background: '#0F1A24', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: pct > 0.7 ? '#3FA88A' : '#5AABE9' }} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// School Summary - tap-through view from the Telegram digest. Spec §6.1.
// -----------------------------------------------------------------------------
function SchoolSummaryScreen({ s, set, go, onBack }) {
  // Note: 'Cikgu Liana' is the same teacher who appears on the teacher-side
  // identity card. Using the same display label everywhere keeps the demo
  // story coherent across personas (Liana on the phone == Liana in Jainal's
  // roster == Liana in Norhaida's audit log).
  const teachers = [
    { name: 'Cikgu Liana',         items: 8, last: '4h',  status: 'active' },
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
      <AppHeader
        back
        title={tx(s, 'schoolSummaryTitle')}
        onBack={onBack}
        right={<Badge tone="neutral">Wk 19</Badge>}
      />
      <ScreenBody>
        <div>
          <div style={{ ...TYPE.pageTitle }}>Guru Besar Jainal</div>
          <div style={{ ...TYPE.pageSub, marginTop: 4 }}>SK Pitas · Rural 2 · 9 teachers</div>
        </div>

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatCard icon="user"        label={tx(s, 'activeTeachers')}    value="5 / 9" />
          <StatCard icon="bookOpen"    label={tx(s, 'modulesCompleted')}  value="7" />
          <StatCard icon="fileText"    label={tx(s, 'evidenceSubmitted')} value="13"  valueColor={T.green} />
          <StatCard icon="cloudUpload" label={tx(s, 'queuedOffline')}     value="5"   attention valueColor={T.peach} />
        </div>

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

function Num({ children }) {
  return <span style={{ fontWeight: 700, color: 'var(--green-100)' }}>{children}</span>;
}

Object.assign(window, { LeaderApp, LeaderTelegram, ChatBubble, DigestBar, SchoolSummaryScreen });
