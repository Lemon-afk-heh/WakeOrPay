'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlarmClock, Settings, Flame, CheckCircle, CheckCircle2, XCircle, Loader2, Bell, BellOff, MessageSquare, CreditCard } from 'lucide-react'

type IconType = React.ComponentType<{ size?: number | string; className?: string; strokeWidth?: number }>
import { createClient } from '@/lib/supabase/client'

type Stats = {
  streak: number
  totalCheckins: number
  totalMissed: number
  chargeAmount: number
}

type AlarmInfo = {
  wake_time: string
  checkin_window_minutes: number
  is_active: boolean
  consequences: string[]
}

export default function HomePage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [alarm, setAlarm] = useState<AlarmInfo | null>(null)
  const [stats, setStats] = useState<Stats>({ streak: 0, totalCheckins: 0, totalMissed: 0, chargeAmount: 0 })
  const [countdown, setCountdown] = useState('')
  const [alarmState, setAlarmState] = useState<'upcoming' | 'active' | 'off'>('off')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      setUserName(user.email?.split('@')[0] ?? 'there')

      // Load alarm settings
      const { data: alarmData } = await supabase
        .from('alarms').select('*').eq('user_id', user.id).single()

      if (alarmData) setAlarm(alarmData)

      // Load stats
      const { data: checkins } = await supabase
        .from('checkins').select('date').eq('user_id', user.id).order('date', { ascending: false })

      const { data: missed } = await supabase
        .from('missed_alarms').select('date').eq('user_id', user.id)

      // Calculate streak
      let streak = 0
      if (checkins && checkins.length > 0) {
        const today = new Date().toISOString().split('T')[0]
        let checkDate = new Date()
        for (const c of checkins) {
          const d = new Date(c.date).toISOString().split('T')[0]
          const expected = checkDate.toISOString().split('T')[0]
          if (d === expected || (streak === 0 && d === today)) {
            streak++
            checkDate.setDate(checkDate.getDate() - 1)
          } else break
        }
      }

      setStats({
        streak,
        totalCheckins: checkins?.length ?? 0,
        totalMissed: missed?.length ?? 0,
        chargeAmount: alarmData?.charge_amount ?? 5,
      })

      setLoading(false)
    }
    load()
  }, [router])

  // Update countdown every second
  useEffect(() => {
    if (!alarm?.is_active || !alarm?.wake_time) {
      setAlarmState('off')
      return
    }

    function tick() {
      const now = new Date()
      const [h, m] = alarm!.wake_time.split(':').map(Number)
      const wake = new Date()
      wake.setHours(h, m, 0, 0)

      // If wake time passed today, set to tomorrow
      if (wake <= now) wake.setDate(wake.getDate() + 1)

      const deadline = new Date(wake.getTime() + alarm!.checkin_window_minutes * 60 * 1000)

      if (now >= wake && now < deadline) {
        setAlarmState('active')
        const secsLeft = Math.ceil((deadline.getTime() - now.getTime()) / 1000)
        const mm = Math.floor(secsLeft / 60).toString().padStart(2, '0')
        const ss = (secsLeft % 60).toString().padStart(2, '0')
        setCountdown(`${mm}:${ss}`)
      } else {
        setAlarmState('upcoming')
        const diff = wake.getTime() - now.getTime()
        const totalMins = Math.floor(diff / 60000)
        const hrs = Math.floor(totalMins / 60)
        const mins = totalMins % 60
        setCountdown(hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`)
      }
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [alarm])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={28} />
      </div>
    )
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-[family-name:var(--font-geist)] pb-24">

      {/* Header */}
      <div className="px-5 pt-10 pb-6 max-w-md mx-auto">
        <p className="text-zinc-500 text-sm">{greeting},</p>
        <h1 className="text-2xl font-black capitalize">{userName}</h1>
      </div>

      <div className="px-5 max-w-md mx-auto space-y-4">

        {/* Main countdown card */}
        <div className={`rounded-2xl p-6 text-center border ${
          alarmState === 'active'
            ? 'bg-orange-500/10 border-orange-500/30'
            : alarmState === 'upcoming'
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-zinc-900 border-zinc-800'
        }`}>
          {alarmState === 'off' ? (
            <>
              <BellOff className="text-zinc-600 mx-auto mb-3" size={32} />
              <p className="text-zinc-500 font-medium">Alarm is off</p>
              <p className="text-zinc-600 text-sm mt-1">Head to settings to arm it</p>
            </>
          ) : alarmState === 'active' ? (
            <>
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 rounded-full bg-orange-500/30 pulse-ring" />
                <Bell className="relative text-orange-500" size={36} />
              </div>
              <p className="text-orange-400 text-sm font-semibold mb-1">Alarm is ringing!</p>
              <p className="text-5xl font-black text-white mb-1">{countdown}</p>
              <p className="text-zinc-500 text-sm mb-5">left to check in</p>
              <Link
                href="/alarm"
                className="block bg-orange-500 hover:bg-orange-400 text-black font-black text-lg py-4 rounded-xl transition-colors"
              >
                I&apos;M AWAKE
              </Link>
            </>
          ) : (
            <>
              <Bell className="text-zinc-500 mx-auto mb-3" size={28} />
              <p className="text-zinc-500 text-sm mb-1">Next alarm in</p>
              <p className="text-5xl font-black text-white mb-1">{countdown}</p>
              <p className="text-zinc-600 text-sm">
                {alarm?.wake_time} · {alarm?.checkin_window_minutes} min window
              </p>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard Icon={Flame}        value={stats.streak}         label="Day streak" tone="orange" highlight={stats.streak > 0} />
          <StatCard Icon={CheckCircle2} value={stats.totalCheckins}  label="Check-ins"  tone="emerald" />
          <StatCard Icon={XCircle}      value={stats.totalMissed}    label="Missed"     tone="red" />
        </div>

        {/* Consequences active */}
        {alarm?.is_active && alarm.consequences?.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-3">Active consequences</p>
            <div className="space-y-2">
              {alarm.consequences.includes('sms') && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <MessageSquare size={14} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Shame text</p>
                    <p className="text-xs text-zinc-500">Friend gets a text if you miss</p>
                  </div>
                </div>
              )}
              {alarm.consequences.includes('charge') && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <CreditCard size={14} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">${stats.chargeAmount} charge</p>
                    <p className="text-xs text-zinc-500">Card charged if you miss</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent history */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-3">This week</p>
          <WeekView totalCheckins={stats.totalCheckins} totalMissed={stats.totalMissed} />
        </div>

      </div>

      {/* Bottom nav */}
      <BottomNav active="home" />
    </div>
  )
}

function StatCard({
  Icon, value, label, tone, highlight,
}: {
  Icon: IconType
  value: number
  label: string
  tone: 'orange' | 'emerald' | 'red'
  highlight?: boolean
}) {
  const toneClasses = {
    orange:  { bg: 'bg-orange-500/15',  text: 'text-orange-400',  border: 'border-orange-500/20' },
    emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    red:     { bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/20' },
  }[tone]

  return (
    <div className={`rounded-xl p-4 text-center border ${highlight ? 'bg-orange-500/10 border-orange-500/20' : 'bg-zinc-900 border-zinc-800'}`}>
      <div className={`mx-auto w-8 h-8 rounded-lg flex items-center justify-center mb-2 border ${toneClasses.bg} ${toneClasses.border}`}>
        <Icon size={15} className={toneClasses.text} strokeWidth={2.4} />
      </div>
      <div className={`text-2xl font-black ${highlight ? 'text-orange-400' : 'text-white'}`}>{value}</div>
      <div className="text-zinc-500 text-xs mt-0.5">{label}</div>
    </div>
  )
}

function WeekView({ totalCheckins, totalMissed }: { totalCheckins: number; totalMissed: number }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const today = new Date().getDay()
  // Simple placeholder — in a real app you'd map actual checkin dates
  const states = days.map((_, i) => {
    const dayIndex = (i + 1) % 7
    if (dayIndex === today) return 'today'
    if (dayIndex < today && totalCheckins > 0) return Math.random() > 0.2 ? 'hit' : 'miss'
    return 'future'
  })

  return (
    <div className="flex justify-between">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <span className="text-xs text-zinc-600">{d}</span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            states[i] === 'today' ? 'bg-zinc-800 border border-zinc-600' :
            states[i] === 'hit' ? 'bg-green-500/20' :
            states[i] === 'miss' ? 'bg-red-500/20' :
            'bg-zinc-800/50'
          }`}>
            {states[i] === 'hit' && <CheckCircle size={14} className="text-green-500" />}
            {states[i] === 'miss' && <XCircle size={14} className="text-red-500" />}
            {states[i] === 'today' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
          </div>
        </div>
      ))}
    </div>
  )
}

function BottomNav({ active }: { active: 'home' | 'settings' }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur border-t border-zinc-800 px-6 py-3 flex justify-around max-w-md mx-auto">
      <Link href="/home" className={`flex flex-col items-center gap-1 ${active === 'home' ? 'text-orange-500' : 'text-zinc-500'}`}>
        <AlarmClock size={22} />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link href="/dashboard" className={`flex flex-col items-center gap-1 ${active === 'settings' ? 'text-orange-500' : 'text-zinc-500'}`}>
        <Settings size={22} />
        <span className="text-xs font-medium">Settings</span>
      </Link>
    </div>
  )
}
