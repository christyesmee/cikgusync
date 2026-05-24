// CikguSync - School leader (Guru Besar Jainal) view
// Per A3 1.2: Jainal receives a weekly digest by Telegram bot, taps to open a school summary.
// Not a parallel platform; he doesn't log in daily (NFR10).

function LeaderApp({ s, view, setView }) {
  const [localView, setLocalView] = useState('chat');
  const activeView = view || localView;
  const changeView = setView || setLocalView;
  if (activeView === 'chat') return <LeaderTelegram s={s} onOpen={() => changeView('digest')} />;
  return <LeaderDigest s={s} back={() => changeView('chat')} />;
}

// Telegram-style chat with the @CikguSyncBot
function LeaderTelegram({ s, onOpen }) {
  return (
    <div style={{ background: '#17212B', height: '100%', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Telegram-like top bar */}
      <div style={{
        background: '#1F2C3A', padding: '12px 14px',
        borderBottom: '1px solid #233544',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Icon name="chevL" size={20} color="#5AABE9" />
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: '#fff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)', flexShrink: 0,
        }}>
          <img src={(window.__resources && window.__resources.logo) || 'assets/logo.png'} alt="CikguSync" draggable="false"
            style={{ width: '88%', height: 'auto' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>CikguSync Bot</div>
          <div style={{ fontSize: 11, color: '#8497A7' }}>bot - weekly digest</div>
        </div>
      </div>

      {/* Date stamp */}
      <div style={{ textAlign: 'center', padding: '14px 0 4px' }}>
        <span style={{ background: '#22303C', color: '#A7BAC9', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>
          Monday, 11 May 2026
        </span>
      </div>

      <div style={{ flex: 1, padding: '8px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Bot message: digest */}
        <ChatBubble incoming>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
            Weekly summary - SK Sungai Pitas
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
                }}>{k} - {n}</span>
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
            <b>Cikgu Liana</b> submitted 3 evidence items this week
            (M-156 reading routines - D1, D2). Last sync from NADI Nabawan,
            10 May 16:42.
          </div>
          <div style={{ fontSize: 10, color: '#7C8E9F', marginTop: 4, textAlign: 'right' }}>09:02</div>
        </ChatBubble>

        <ChatBubble incoming>
          <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
            <b>Cikgu Rosli</b> has no logged activity for 14 days.
            Suggest a check-in.
          </div>
          <div style={{ fontSize: 10, color: '#7C8E9F', marginTop: 4, textAlign: 'right' }}>09:02</div>
        </ChatBubble>

        {/* Jainal's reply */}
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
        <div style={{ height: '100%', width: `${pct*100}%`, background: pct > 0.7 ? '#3FA88A' : '#5AABE9' }} />
      </div>
    </div>
  );
}

// School-summary "tap-through" view (still mobile)
function LeaderDigest({ s, back }) {
  const teachers = [
    { name: 'Liana Anak Gunsalam', items: 8, last: '4h',  status: 'active',  d: 'D1-D2' },
    { name: 'Faridah binti Yusof', items: 5, last: '1d',  status: 'active',  d: 'D2-D3' },
    { name: 'Azlan bin Karim',     items: 3, last: '3d',  status: 'active',  d: 'D1' },
    { name: 'Rosli bin Othman',    items: 0, last: '14d', status: 'inactive',d: 'none' },
    { name: 'Nurul binti Hashim',  items: 2, last: '6d',  status: 'low',     d: 'D4' },
    { name: 'Marcus Anak Jugah',   items: 0, last: '21d', status: 'transferred', d: 'none' },
  ];
  return (
    <div style={{ background: T.surface, minHeight: '100%' }}>
      <Header
        title="SK Sungai Pitas"
        subtitle="Weekly summary - Guru Besar view"
        back={back}
        right={<Chip tone="navy" mono>Wk 19</Chip>}
      />
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { label: 'Evidence', v: 18, sub: 'this week' },
              { label: 'Active', v: '7 / 9', sub: 'teachers' },
              { label: 'Mentor', v: 3, sub: 'check-ins' },
            ].map((m, i) => (
              <div key={i} style={{ background: T.surface, padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, lineHeight: 1.1 }}>{m.v}</div>
                <div style={{ fontSize: 10.5, color: T.text2, marginTop: 2 }}>{m.label}</div>
                <div style={{ fontSize: 9.5, color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHead title="By teacher" right={<Chip mono>{teachers.length} staff</Chip>} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {teachers.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0', borderTop: i === 0 ? 'none' : `1px dashed ${T.border}`,
              }}>
                <Dot color={
                  t.status === 'active' ? T.success :
                  t.status === 'low' ? T.warn :
                  t.status === 'inactive' ? T.queue :
                  T.text3
                } size={10} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: T.text2, fontFamily: 'JetBrains Mono, monospace' }}>
                    last {t.last} - {t.d}
                  </div>
                </div>
                <Chip tone={t.items >= 5 ? 'success' : t.items > 0 ? 'navy' : 'queue'} mono>{t.items} ev</Chip>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHead title="Suggested actions" />
          <ActionRow color={T.warn} text="Check in with Rosli, 14 days inactive" />
          <ActionRow color={T.success} text="Recognise Liana for D1+D2 streak (3 weeks)" />
          <ActionRow color={T.navy} text="Schedule cluster meet at PKG Pitas, 2 ready to share" />
        </Card>
      </div>
    </div>
  );
}

function ActionRow({ color, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0' }}>
      <Dot color={color} size={8} style={{ marginTop: 6 }} />
      <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.4 }}>{text}</div>
    </div>
  );
}

Object.assign(window, { LeaderApp });
