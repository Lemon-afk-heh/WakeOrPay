import Link from 'next/link'
import {
  AlarmClock, ArrowRight, Bell, CreditCard,
  MessageSquare, X, Flame, Star, Zap, ChevronDown,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   3-D Animated SVG Clock
───────────────────────────────────────────── */
function ClockFace({ size = 340 }: { size?: number }) {
  // Generate minute tick marks (60 total)
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180)
    const isHour    = i % 5  === 0
    const isQuarter = i % 15 === 0
    const outerR = 86
    const innerR = isQuarter ? 72 : isHour ? 78 : 83
    return {
      x1: 100 + outerR * Math.cos(angle),
      y1: 100 + outerR * Math.sin(angle),
      x2: 100 + innerR * Math.cos(angle),
      y2: 100 + innerR * Math.sin(angle),
      isHour, isQuarter,
    }
  })

  return (
    <div
      className="rock-3d"
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 40px rgba(249,115,22,0.35)) drop-shadow(0 0 80px rgba(249,115,22,0.12))',
      }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer decorative rings */}
        <circle cx="100" cy="100" r="99"   stroke="rgba(249,115,22,0.06)" strokeWidth="1" />
        <circle cx="100" cy="100" r="95"   stroke="rgba(249,115,22,0.1)"  strokeWidth="0.5" />
        <circle cx="100" cy="100" r="92"   stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" />

        {/* Clock face glass */}
        <circle cx="100" cy="100" r="90"
          fill="rgba(9,9,11,0.88)"
          stroke="rgba(249,115,22,0.55)" strokeWidth="1.5"
        />

        {/* Subtle inner ring glow */}
        <circle cx="100" cy="100" r="86"
          fill="none"
          stroke="rgba(249,115,22,0.07)" strokeWidth="10"
        />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={
              t.isQuarter ? 'rgba(249,115,22,1)'
              : t.isHour  ? 'rgba(249,115,22,0.55)'
              :               'rgba(249,115,22,0.18)'
            }
            strokeWidth={t.isQuarter ? 2.5 : t.isHour ? 1.2 : 0.7}
            strokeLinecap="round"
          />
        ))}

        {/* Quarter-hour numerals */}
        <text x="100" y="20"  textAnchor="middle" dominantBaseline="middle"
          fill="rgba(249,115,22,0.85)" fontSize="11" fontWeight="bold" fontFamily="monospace">12</text>
        <text x="180" y="102" textAnchor="middle" dominantBaseline="middle"
          fill="rgba(249,115,22,0.85)" fontSize="11" fontWeight="bold" fontFamily="monospace">3</text>
        <text x="100" y="183" textAnchor="middle" dominantBaseline="middle"
          fill="rgba(249,115,22,0.85)" fontSize="11" fontWeight="bold" fontFamily="monospace">6</text>
        <text x="20"  y="102" textAnchor="middle" dominantBaseline="middle"
          fill="rgba(249,115,22,0.85)" fontSize="11" fontWeight="bold" fontFamily="monospace">9</text>

        {/* ── HOUR HAND  (rect bottom edge at y=100, centre x=100) ── */}
        <rect
          className="clock-hour"
          x="97" y="44" width="6" height="56" rx="3"
          fill="white"
        />

        {/* ── MINUTE HAND ── */}
        <rect
          className="clock-minute"
          x="98.5" y="22" width="3" height="78" rx="1.5"
          fill="rgba(255,255,255,0.88)"
        />

        {/* ── SECOND HAND ── */}
        <rect
          className="clock-second"
          x="99.3" y="24" width="1.4" height="76" rx="0.7"
          fill="rgb(249,115,22)"
        />

        {/* Pivot pin */}
        <circle cx="100" cy="100" r="7"   fill="rgb(249,115,22)" />
        <circle cx="100" cy="100" r="4.5" fill="rgb(9,9,11)" />
        <circle cx="100" cy="100" r="2"   fill="white" />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Small background clock (no animation, decorative)
───────────────────────────────────────────── */
function MiniClock({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      {/* Simple tick marks at 12,3,6,9 */}
      <line x1="24" y1="4"  x2="24" y2="8"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="44" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4"  y1="24" x2="8"  y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Hour hand ~7 o'clock */}
      <line x1="24" y1="24" x2="17" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Minute hand ~12 o'clock */}
      <line x1="24" y1="24" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-[family-name:var(--font-geist)] overflow-x-hidden">

      {/* ── Ambient glow ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-pulse absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-orange-600/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-3xl" />
      </div>

      {/* ── Floating background clocks ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="drift-a  absolute top-[8%]  left-[4%]   text-orange-500 opacity-[0.04]" style={{ animationDelay: '0s' }}>
          <MiniClock size={70} />
        </div>
        <div className="drift-b  absolute top-[18%] right-[6%]  text-orange-500 opacity-[0.055]" style={{ animationDelay: '-6s' }}>
          <MiniClock size={90} />
        </div>
        <div className="drift-c  absolute top-[42%] left-[2%]   text-orange-500 opacity-[0.035]" style={{ animationDelay: '-10s' }}>
          <MiniClock size={55} />
        </div>
        <div className="drift-ar absolute top-[58%] right-[4%]  text-orange-500 opacity-[0.04]" style={{ animationDelay: '-4s' }}>
          <MiniClock size={75} />
        </div>
        <div className="drift-br absolute top-[75%] left-[12%]  text-orange-500 opacity-[0.05]" style={{ animationDelay: '-15s' }}>
          <MiniClock size={65} />
        </div>
        <div className="drift-cr absolute top-[30%] right-[14%] text-orange-500 opacity-[0.03]" style={{ animationDelay: '-3s' }}>
          <MiniClock size={45} />
        </div>
        <div className="drift-a  absolute top-[85%] right-[10%] text-orange-500 opacity-[0.04]" style={{ animationDelay: '-9s' }}>
          <MiniClock size={60} />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <AlarmClock className="text-black" size={16} />
          </div>
          <span className="font-black tracking-tight text-lg">WakeOrPay</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#how" className="text-sm text-zinc-500 hover:text-white transition-colors hidden sm:block">
            How it works
          </a>
          <Link
            href="/auth"
            className="text-sm bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-xl transition-all"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── Hero — two-column on large screens ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-6">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="fade-up inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-orange-400 tracking-widest uppercase">The accountability alarm</span>
            </div>

            <h1 className="fade-up-1 text-6xl sm:text-7xl lg:text-[82px] font-black tracking-tight leading-[0.88] mb-6">
              Wake up.
              <br />
              <span className="text-orange-500">Or pay up.</span>
            </h1>

            <p className="fade-up-2 text-zinc-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Miss your morning alarm and your card gets charged — or your friend gets a text.
              The only alarm with{' '}
              <span className="text-white font-medium">real consequences.</span>
            </p>

            <div className="fade-up-3 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3">
              <Link
                href="/auth"
                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold text-base px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/25"
              >
                Start for free
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-sm px-4 py-3.5"
              >
                See how it works
                <ChevronDown size={14} />
              </a>
            </div>
          </div>

          {/* Right: 3-D animated clock */}
          <div className="fade-up-4 flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Pulsing glow behind the clock */}
              <div
                className="glow-pulse absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)', transform: 'scale(1.2)' }}
              />
              <ClockFace size={340} />
            </div>
          </div>
        </div>
      </section>

      {/* ── App mockup strip ── */}
      <section className="relative z-10 max-w-xs mx-auto px-6 pb-24">
        <div className="relative">
          <div className="absolute inset-x-8 -bottom-4 h-full bg-orange-500/15 rounded-3xl blur-2xl" />
          <div className="float relative bg-zinc-900 border border-zinc-700/60 rounded-[28px] overflow-hidden shadow-2xl shadow-black/60">

            <div className="bg-zinc-950 px-5 pt-4 pb-3 flex items-center justify-between border-b border-zinc-800/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                  <AlarmClock size={12} className="text-black" />
                </div>
                <span className="text-xs font-bold">WakeOrPay</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-zinc-500 text-xs">Armed</span>
              </div>
            </div>

            <div className="bg-orange-500/5 px-5 pt-6 pb-5 text-center border-b border-orange-500/10">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-14 h-14 rounded-full bg-orange-500/20 animate-ping" />
                <div className="relative w-14 h-14 bg-orange-500/15 rounded-full flex items-center justify-center border border-orange-500/30">
                  <Bell className="text-orange-500" size={24} />
                </div>
              </div>
              <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-1">Alarm is ringing!</p>
              <p className="text-5xl font-black text-white mb-0.5">04:23</p>
              <p className="text-zinc-500 text-xs mb-5">left to check in or get charged</p>
              <div className="bg-orange-500 text-black font-black text-base py-3.5 rounded-2xl shadow-lg shadow-orange-500/30">
                I&apos;M AWAKE
              </div>
            </div>

            <div className="px-4 py-4 grid grid-cols-3 gap-2">
              {[['🔥', '14', 'Streak'], ['✅', '32', 'Check-ins'], ['😬', '2', 'Missed']].map(([e, v, l]) => (
                <div key={l} className="bg-zinc-800/60 rounded-xl py-3 text-center">
                  <div>{e}</div>
                  <div className="text-sm font-black text-white">{v}</div>
                  <div className="text-zinc-500 text-[10px]">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-20 text-center">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">Sound familiar?</p>
        <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">You&apos;ve tried everything.</h2>
        <p className="text-zinc-500 text-lg mb-12">None of it stuck. Here&apos;s why.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-10">
          {[
            { title: 'Setting 5 alarms',  desc: 'You snooze all of them. Every. Single. Day.' },
            { title: 'Moving your phone', desc: 'You walk to it, turn it off, walk back to bed.' },
            { title: 'Sleep schedules',   desc: 'You lasted 3 days before the weekend killed it.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <X size={11} className="text-red-400" />
                </div>
                <p className="font-bold text-sm">{title}</p>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl px-6 py-4">
          <Zap className="text-orange-500 flex-shrink-0" size={18} />
          <p className="text-orange-300 font-semibold text-sm text-left">
            WakeOrPay works because the consequences are real — not just a buzzing rectangle you can ignore.
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Simple by design</p>
          <h2 className="text-3xl sm:text-5xl font-black">Three steps. No excuses.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              n: '01', icon: <Bell className="text-orange-500" size={20} />,
              title: 'Set your alarm',
              body: "Pick a wake time and a check-in window. You have 5–30 minutes to prove you're up.",
            },
            {
              n: '02', icon: <CreditCard className="text-orange-500" size={20} />,
              title: 'Pick your consequences',
              body: 'A shame text to a friend. A charge to your card. Stack both for maximum pain.',
            },
            {
              n: '03', icon: <AlarmClock className="text-orange-500" size={20} />,
              title: 'Wake up — or else',
              body: 'Open the app, tap the button. Miss the window and consequences fire automatically.',
            },
          ].map(({ n, icon, title, body }) => (
            <div key={n}
              className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 rounded-2xl p-6 transition-all hover:bg-zinc-900/80"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-zinc-800 group-hover:bg-orange-500/10 rounded-xl flex items-center justify-center transition-colors">
                  {icon}
                </div>
                <span className="text-zinc-700 text-xs font-mono font-bold">{n}</span>
              </div>
              <h3 className="font-black text-base mb-2">{title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Consequences ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Real stakes</p>
          <h2 className="text-3xl sm:text-5xl font-black">Consequences that actually sting.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
            <div className="w-11 h-11 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-orange-500" size={20} />
            </div>
            <h3 className="font-black text-xl mb-2">The shame text 💬</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Your friend gets an automatic text the moment you miss your window.
              Public accountability is powerful — nobody wants to be that person.
            </p>
            <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-zinc-600 flex items-center justify-center text-xs font-bold">A</div>
                <div>
                  <p className="text-xs font-medium text-white">Alex</p>
                  <p className="text-[10px] text-zinc-500">now</p>
                </div>
              </div>
              <div className="bg-zinc-700 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-zinc-200 leading-relaxed inline-block">
                Hey — Leroy failed to wake up on time this morning. Again 😬
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
            <div className="w-11 h-11 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="text-orange-500" size={20} />
            </div>
            <h3 className="font-black text-xl mb-2">The card charge 💳</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Miss the check-in window and your card gets charged instantly through Stripe.
              $1, $5, $25 — pick the amount that actually scares you.
            </p>
            <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Stripe charge</span>
                <span className="text-xs text-green-400 font-medium">● Processed</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">WakeOrPay — Missed alarm</p>
                  <p className="text-xs text-zinc-500 mt-0.5">•••• •••• •••• 4242</p>
                </div>
                <span className="text-white font-black text-lg">$5.00</span>
              </div>
              <div className="pt-2 border-t border-zinc-700 flex gap-2">
                {['$1', '$5', '$10', '$25'].map(a => (
                  <div key={a}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${a === '$5' ? 'bg-orange-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}
                  >{a}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Early users</p>
          <h2 className="text-3xl sm:text-5xl font-black">People who finally wake up.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { name: 'Jordan M.',  handle: '@jordanwakes',    avatar: 'J',
              text: "I haven't snoozed once in 3 weeks. The $10 charge scared me straight on day 2. Genuinely changed my mornings." },
            { name: 'Priya K.',   handle: '@priya_dev',      avatar: 'P',
              text: "My friend getting that text on day 1 was enough. Pure embarrassment. Haven't missed since." },
            { name: 'Tom B.',     handle: '@tombuildsstuff', avatar: 'T',
              text: "Best $25 I've \"spent\" — except I haven't actually paid it because I wake up now. That's the whole point." },
          ].map(({ name, handle, avatar, text }) => (
            <div key={name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-orange-500 fill-orange-500" />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-sm text-orange-400 font-black">
                  {avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{name}</p>
                  <p className="text-xs text-zinc-600">{handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/15 rounded-3xl blur-3xl scale-90 glow-pulse" />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl px-8 sm:px-14 py-14">
            <div className="w-16 h-16 bg-orange-500/15 border border-orange-500/25 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Flame className="text-orange-500" size={28} />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
              Your future self<br />is counting on you.
            </h2>
            <p className="text-zinc-500 mb-8 text-sm">Takes 2 minutes to set up. Start free — no card required.</p>
            <Link
              href="/auth"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-black px-9 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20 text-base"
            >
              Start waking up
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-zinc-800">
              {[['🔒', 'No card to start'], ['⚡', '2-min setup'], ['📱', 'Any device']].map(([icon, label]) => (
                <div key={label} className="text-center">
                  <div className="text-base mb-1">{icon}</div>
                  <div className="text-zinc-600 text-[11px]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-zinc-900 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
              <AlarmClock size={12} className="text-black" />
            </div>
            <span className="font-black text-zinc-400">WakeOrPay</span>
          </div>
          <p className="text-zinc-700 text-xs">Wake up. Or pay up. © 2025</p>
          <Link href="/auth" className="text-zinc-600 hover:text-white text-xs transition-colors">Sign in →</Link>
        </div>
      </footer>

    </div>
  )
}
