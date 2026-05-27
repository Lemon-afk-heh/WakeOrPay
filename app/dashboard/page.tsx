'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlarmClock, Phone, DollarSign, Loader2, LogOut, Check, Bell, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type AlarmSettings = {
  wake_time: string
  checkin_window_minutes: number
  friend_phone: string
  friend_name: string
  charge_amount: number
  consequences: ('sms' | 'charge')[]
  is_active: boolean
}

const defaultSettings: AlarmSettings = {
  wake_time: '07:00',
  checkin_window_minutes: 10,
  friend_phone: '',
  friend_name: '',
  charge_amount: 5,
  consequences: ['sms'],
  is_active: false,
}

export default function DashboardPage() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [settings, setSettings] = useState<AlarmSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUser(user)

      const { data } = await supabase
        .from('alarms')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setSettings({
          wake_time: data.wake_time,
          checkin_window_minutes: data.checkin_window_minutes,
          friend_phone: data.friend_phone ?? '',
          friend_name: data.friend_name ?? '',
          charge_amount: data.charge_amount ?? 5,
          consequences: data.consequences ?? ['sms'],
          is_active: data.is_active ?? false,
        })
      }
      setLoading(false)
    }
    load()
  }, [router])

  async function saveSettings() {
    if (!user) return
    setSaving(true)

    const supabase = createClient()
    await supabase.from('alarms').upsert({
      user_id: user.id,
      ...settings,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function signOut() {
    await createClient().auth.signOut()
    router.push('/')
  }

  function toggleConsequence(type: 'sms' | 'charge') {
    setSettings(prev => ({
      ...prev,
      consequences: prev.consequences.includes(type)
        ? prev.consequences.filter(c => c !== type)
        : [...prev.consequences, type],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={28} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-[family-name:var(--font-geist)] pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-6 max-w-md mx-auto flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Settings</p>
          <h1 className="text-2xl font-black">Your alarm</h1>
        </div>
        <button
          onClick={signOut}
          className="text-zinc-500 hover:text-white transition-colors p-2"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>

      <main className="max-w-md mx-auto px-5 space-y-4">
        {/* Active toggle */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Alarm status</h2>
            <p className="text-zinc-500 text-sm mt-0.5">
              {settings.is_active ? 'Your alarm is armed. No escape.' : 'Alarm is off — consequences won\'t fire.'}
            </p>
          </div>
          <button
            onClick={() => setSettings(p => ({ ...p, is_active: !p.is_active }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings.is_active ? 'bg-orange-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                settings.is_active ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Wake time */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-orange-500" size={18} />
            <h2 className="font-bold">Wake time</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Alarm time</label>
              <input
                type="time"
                value={settings.wake_time}
                onChange={e => setSettings(p => ({ ...p, wake_time: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">
                Check-in window
              </label>
              <select
                value={settings.checkin_window_minutes}
                onChange={e => setSettings(p => ({ ...p, checkin_window_minutes: Number(e.target.value) }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>

          <p className="text-zinc-600 text-xs mt-3">
            You&apos;ll get a text at {settings.wake_time}. You have {settings.checkin_window_minutes} min to check in before consequences fire.
          </p>
        </div>

        {/* Consequences */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="font-bold mb-4">Consequences</h2>
          <p className="text-zinc-500 text-sm mb-5">
            Pick what happens if you miss your check-in. More pain = more motivation.
          </p>

          {/* SMS */}
          <div
            onClick={() => toggleConsequence('sms')}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors mb-3 ${
              settings.consequences.includes('sms')
                ? 'border-orange-500/50 bg-orange-500/5'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              settings.consequences.includes('sms') ? 'bg-orange-500 border-orange-500' : 'border-zinc-600'
            }`}>
              {settings.consequences.includes('sms') && <Check size={12} className="text-black" />}
            </div>
            <div className="flex items-start gap-3 flex-1">
              <Phone className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-sm">Shame text to a friend</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  Your friend gets a text saying you failed to wake up. Embarrassing.
                </p>
              </div>
            </div>
          </div>

          {/* Friend info — only show if SMS selected */}
          {settings.consequences.includes('sms') && (
            <div className="grid grid-cols-2 gap-3 mb-3 pl-4 border-l-2 border-orange-500/30">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Friend&apos;s name</label>
                <input
                  type="text"
                  value={settings.friend_name}
                  onChange={e => setSettings(p => ({ ...p, friend_name: e.target.value }))}
                  placeholder="Alex"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Friend&apos;s phone</label>
                <input
                  type="tel"
                  value={settings.friend_phone}
                  onChange={e => setSettings(p => ({ ...p, friend_phone: e.target.value }))}
                  placeholder="+1 555 000 0000"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Charge */}
          <div
            onClick={() => toggleConsequence('charge')}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
              settings.consequences.includes('charge')
                ? 'border-orange-500/50 bg-orange-500/5'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              settings.consequences.includes('charge') ? 'bg-orange-500 border-orange-500' : 'border-zinc-600'
            }`}>
              {settings.consequences.includes('charge') && <Check size={12} className="text-black" />}
            </div>
            <div className="flex items-start gap-3 flex-1">
              <DollarSign className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-sm">Charge my card</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  Miss your alarm and get automatically charged. Money hurts.
                </p>
              </div>
            </div>
          </div>

          {/* Charge amount — only show if charge selected */}
          {settings.consequences.includes('charge') && (
            <div className="mt-3 pl-4 border-l-2 border-orange-500/30">
              <label className="block text-xs text-zinc-500 mb-1.5">Charge amount</label>
              <div className="flex gap-2">
                {[1, 5, 10, 25].map(amount => (
                  <button
                    key={amount}
                    onClick={e => { e.stopPropagation(); setSettings(p => ({ ...p, charge_amount: amount })) }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      settings.charge_amount === amount
                        ? 'bg-orange-500 text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <p className="text-zinc-600 text-xs mt-2">
                Add your card on the next step after saving.
              </p>
            </div>
          )}
        </div>

        {/* Save */}
        <button
          onClick={saveSettings}
          disabled={saving}
          className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saved ? (
            <>
              <Check size={16} />
              Saved!
            </>
          ) : (
            'Save alarm settings'
          )}
        </button>

        <p className="text-center text-zinc-600 text-xs">
          Once saved and active, your alarm fires every day at {settings.wake_time}.
        </p>
      </main>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  )
}

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur border-t border-zinc-800 px-6 py-3 flex justify-around max-w-md mx-auto">
      <Link href="/home" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
        <AlarmClock size={22} />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link href="/dashboard" className="flex flex-col items-center gap-1 text-orange-500">
        <Settings size={22} />
        <span className="text-xs font-medium">Settings</span>
      </Link>
    </div>
  )
}
