'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AlarmClock, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Status = 'loading' | 'active' | 'checked-in' | 'missed' | 'early'

export default function AlarmPage() {
  const router = useRouter()

  const [status, setStatus] = useState<Status>('loading')
  const [timeLeft, setTimeLeft] = useState(0)
  const [checking, setChecking] = useState(false)

  const checkIn = useCallback(async () => {
    setChecking(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    })

    setStatus('checked-in')
    setChecking(false)
  }, [router])

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      const { data: alarm } = await supabase
        .from('alarms')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!alarm || !alarm.is_active) {
        router.push('/dashboard')
        return
      }

      const now = new Date()
      const [hours, minutes] = alarm.wake_time.split(':').map(Number)
      const wakeTime = new Date()
      wakeTime.setHours(hours, minutes, 0, 0)
      const deadline = new Date(wakeTime.getTime() + alarm.checkin_window_minutes * 60 * 1000)

      if (now < wakeTime) {
        setStatus('early')
        return
      }

      if (now > deadline) {
        setStatus('missed')
        return
      }

      setStatus('active')
      const remaining = Math.ceil((deadline.getTime() - now.getTime()) / 1000)
      setTimeLeft(remaining)
    }

    init()
  }, [router])

  useEffect(() => {
    if (status !== 'active' || timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('missed')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [status, timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={28} />
      </div>
    )
  }

  if (status === 'checked-in') {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-4xl font-black text-white mb-3">You&apos;re up!</h1>
        <p className="text-zinc-400 text-lg mb-8">Check-in recorded. No consequences today.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Go to dashboard
        </button>
      </div>
    )
  }

  if (status === 'missed') {
    return (
      <div className="min-h-screen bg-red-950 flex flex-col items-center justify-center text-center px-6">
        <div className="text-7xl mb-6">😬</div>
        <h1 className="text-4xl font-black text-white mb-3">You missed it.</h1>
        <p className="text-red-300 text-lg mb-2">Your consequences are firing now.</p>
        <p className="text-red-400/60 text-sm mb-10">Your friend is getting a text. Your card may be charged.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  if (status === 'early') {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
        <AlarmClock className="text-orange-500 mb-6" size={48} />
        <h1 className="text-3xl font-black text-white mb-3">Alarm hasn&apos;t fired yet</h1>
        <p className="text-zinc-400 mb-8">Come back at your alarm time to check in.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  // Active — show the big check-in button
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
      {/* Pulsing ring */}
      <div className="relative mb-10">
        <div className="absolute inset-0 rounded-full bg-orange-500/20 pulse-ring" />
        <div className="relative bg-orange-500/10 border-2 border-orange-500 rounded-full p-8">
          <AlarmClock className="text-orange-500" size={48} />
        </div>
      </div>

      <h1 className="text-5xl font-black text-white mb-2">Wake up!</h1>
      <p className="text-zinc-400 text-lg mb-2">Press the button to check in.</p>

      <p className="text-orange-400 font-mono text-3xl font-bold mb-10">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>

      <p className="text-zinc-600 text-sm mb-8">
        Consequences fire when the timer hits 0:00
      </p>

      <button
        onClick={checkIn}
        disabled={checking}
        className="bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-black font-black text-2xl px-16 py-6 rounded-2xl transition-colors flex items-center gap-3 shadow-lg shadow-orange-500/20"
      >
        {checking && <Loader2 size={24} className="animate-spin" />}
        I&apos;M AWAKE
      </button>

      <p className="text-zinc-700 text-xs mt-6">
        Don&apos;t close this tab until you&apos;ve checked in.
      </p>
    </div>
  )
}
