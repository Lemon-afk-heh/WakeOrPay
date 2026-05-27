import Link from 'next/link'
import {
  AlarmClock, ArrowRight, Bell, CreditCard,
  MessageSquare, X, Flame, Star, Zap, ChevronDown,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-[family-name:var(--font-geist)] overflow-x-hidden">

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-pulse absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-orange-600/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-3xl" />
      </div>

      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
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

      {/* ─── Hero ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-8 text-center">

        {/* Badge */}
        <div className="fade-up inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-orange-400 tracking-widest uppercase">The accountability alarm</span>
        </div>

        {/* Headline */}
        <h1 className="fade-up-1 text-6xl sm:text-7xl lg:text-[90px] font-black tracking-tight leading-[0.9] mb-6">
          Wake up.
          <br />
          <span className="text-orange-500">Or pay up.</span>
        </h1>

        <p className="fade-up-2 text-zinc-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          Miss your morning alarm and your card gets charged — or your friend gets a text.
          The only alarm with <span className="text-white font-medium">real consequences.</span>
        </p>

        {/* CTAs */}
        <div className="fade-up-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
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

        {/* Floating app mockup */}
        <div className="fade-up-4 relative max-w-[320px] mx-auto">
          {/* Soft glow behind the card */}
          <div className="absolute inset-x-8 -bottom-6 h-full bg-orange-500/20 rounded-3xl blur-2xl" />

          <div className="float relative bg-zinc-900 border border-zinc-700/60 rounded-[28px] overflow-hidden shadow-2xl shadow-black/60">

            {/* Top bar */}
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

            {/* Alarm ringing state */}
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
              <div className="bg-orange-500 text-black font-black text-base py-3.5 rounded-2xl shadow-lg shadow-orange-500/30 cursor-pointer select-none">
                I&apos;M AWAKE
              </div>
            </div>

            {/* Stats */}
            <div className="px-4 py-4 grid grid-cols-3 gap-2">
              {[['🔥', '14', 'Streak'], ['✅', '32', 'Check-ins'], ['😬', '2', 'Missed']].map(([emoji, val, label]) => (
                <div key={label} className="bg-zinc-800/60 rounded-xl py-3 text-center">
                  <div>{emoji}</div>
                  <div className="text-sm font-black text-white">{val}</div>
                  <div className="text-zinc-500 text-[10px]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem ─── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">Sound familiar?</p>
        <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
          You&apos;ve tried everything.
        </h2>
        <p className="text-zinc-500 text-lg mb-12">None of it stuck. Here&apos;s why.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-10">
          {[
            { title: 'Setting 5 alarms', desc: 'You snooze all of them. Every. Single. Day.' },
            { title: 'Moving your phone', desc: 'You walk to it, turn it off, walk back to bed.' },
            { title: 'Sleep schedules', desc: 'You lasted 3 days before the weekend killed it.' },
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

      {/* ─── How it works ─── */}
      <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Simple by design</p>
          <h2 className="text-3xl sm:text-5xl font-black">Three steps. No excuses.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              n: '01',
              icon: <Bell className="text-orange-500" size={20} />,
              title: 'Set your alarm',
              body: "Pick a wake time and a check-in window. You have 5–30 minutes to prove you're up.",
            },
            {
              n: '02',
              icon: <CreditCard className="text-orange-500" size={20} />,
              title: 'Pick your consequences',
              body: 'A shame text to a friend. A charge to your card. Stack both for maximum pain.',
            },
            {
              n: '03',
              icon: <AlarmClock className="text-orange-500" size={20} />,
              title: 'Wake up — or else',
              body: 'Open the app, tap the button. Miss the window and consequences fire automatically.',
            },
          ].map(({ n, icon, title, body }) => (
            <div
              key={n}
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

      {/* ─── Consequences deep dive ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Real stakes</p>
          <h2 className="text-3xl sm:text-5xl font-black">Consequences that actually sting.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Shame text card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
            <div className="w-11 h-11 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-orange-500" size={20} />
            </div>
            <h3 className="font-black text-xl mb-2">The shame text 💬</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Your friend gets an automatic text the moment you miss your window.
              Public accountability is powerful — nobody wants to be that person.
            </p>
            {/* Fake SMS preview */}
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

          {/* Card charge card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
            <div className="w-11 h-11 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="text-orange-500" size={20} />
            </div>
            <h3 className="font-black text-xl mb-2">The card charge 💳</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Miss the check-in window and your card gets charged instantly through Stripe.
              $1, $5, $25 — you pick the amount that actually scares you.
            </p>
            {/* Fake charge preview */}
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
                {['$1', '$5', '$10', '$25'].map((amt) => (
                  <div
                    key={amt}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${amt === '$5' ? 'bg-orange-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}
                  >
                    {amt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Early users</p>
          <h2 className="text-3xl sm:text-5xl font-black">People who finally wake up.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              name: 'Jordan M.',
              handle: '@jordanwakes',
              avatar: 'J',
              text: "I haven't snoozed once in 3 weeks. The $10 charge scared me straight on day 2. Genuinely changed my mornings.",
            },
            {
              name: 'Priya K.',
              handle: '@priya_dev',
              avatar: 'P',
              text: "My friend getting that text on day 1 was enough. Pure embarrassment. Haven't missed since.",
            },
            {
              name: 'Tom B.',
              handle: '@tombuildsstuff',
              avatar: 'T',
              text: "Best $25 I've \"spent\" — except I haven't actually paid it because I wake up now. That's the whole point.",
            },
          ].map(({ name, handle, avatar, text }) => (
            <div key={name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-orange-500 fill-orange-500" />
                ))}
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

      {/* ─── Final CTA ─── */}
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
            <p className="text-zinc-500 mb-8 text-sm">
              Takes 2 minutes to set up. Start free — no card required.
            </p>
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

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-zinc-900 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
              <AlarmClock size={12} className="text-black" />
            </div>
            <span className="font-black text-zinc-400">WakeOrPay</span>
          </div>
          <p className="text-zinc-700 text-xs">Wake up. Or pay up. © 2025</p>
          <Link href="/auth" className="text-zinc-600 hover:text-white text-xs transition-colors">
            Sign in →
          </Link>
        </div>
      </footer>

    </div>
  )
}
