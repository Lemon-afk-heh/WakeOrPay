import Link from 'next/link'
import { AlarmClock, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-[family-name:var(--font-geist)]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <AlarmClock className="text-orange-500" size={20} />
          <span className="font-bold tracking-tight">WakeOrPay</span>
        </div>
        <Link href="/auth" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-20 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-6">
          Accountability alarm
        </span>

        <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-[0.95] mb-6">
          Wake up.<br />
          <span className="text-orange-500">Or pay up.</span>
        </h1>

        <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md">
          Miss your alarm and your friend gets a shame text — or your card gets charged. Your future lazy self has no way out.
        </p>

        <Link
          href="/auth"
          className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold text-base px-7 py-3.5 rounded-xl transition-colors"
        >
          Get started free
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <p className="text-zinc-600 text-xs mt-3">No credit card required</p>
      </section>

      {/* App preview mockup */}
      <section className="max-w-xs mx-auto px-6 pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          {/* Mock status bar */}
          <div className="bg-zinc-950 px-4 pt-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <AlarmClock size={12} className="text-orange-500" />
              <span className="text-xs font-bold text-white">WakeOrPay</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>

          {/* Mock home screen */}
          <div className="px-4 py-5 text-center">
            <p className="text-zinc-500 text-xs mb-1">Next alarm in</p>
            <p className="text-4xl font-black text-white mb-0.5">6h 42m</p>
            <p className="text-zinc-600 text-xs mb-5">07:00 AM · 10 min window</p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {[['🔥', '12', 'Streak'], ['✅', '47', 'Check-ins'], ['💸', '$5', 'At stake']].map(([emoji, val, label]) => (
                <div key={label} className="bg-zinc-800 rounded-xl py-3">
                  <div className="text-lg">{emoji}</div>
                  <div className="text-sm font-bold text-white">{val}</div>
                  <div className="text-zinc-500 text-xs">{label}</div>
                </div>
              ))}
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl py-2 px-3">
              <p className="text-orange-400 text-xs font-medium">Alarm armed · consequences active</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { n: '01', title: 'Set your alarm', body: 'Pick your wake time and how long you have to check in.' },
            { n: '02', title: 'Pick consequences', body: 'A shame text to a friend. A charge to your card. You choose.' },
            { n: '03', title: 'Wake up or else', body: 'Open the app and press the button. Miss it — consequences fire.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <span className="text-zinc-600 text-xs font-mono font-bold">{n}</span>
              <h3 className="font-bold mt-2 mb-1">{title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-10">
          <h2 className="text-3xl font-black mb-3">Ready to actually wake up?</h2>
          <p className="text-zinc-500 mb-6 text-sm">Takes 2 minutes. Start for free.</p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Get started <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-900 px-6 py-6 text-center text-zinc-700 text-xs">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <AlarmClock size={12} className="text-zinc-600" />
          <span className="font-semibold text-zinc-600">WakeOrPay</span>
        </div>
        Wake up. Or pay up.
      </footer>
    </div>
  )
}
