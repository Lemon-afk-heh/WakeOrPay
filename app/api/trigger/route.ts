import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import twilio from 'twilio'
import { getStripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const { data: alarms } = await supabaseAdmin
    .from('alarms')
    .select('*, profiles(email, stripe_customer_id)')
    .eq('is_active', true)

  if (!alarms) return NextResponse.json({ processed: 0 })

  const today = now.toISOString().split('T')[0]
  let triggered = 0

  for (const alarm of alarms) {
    const [wakeHours, wakeMinutes] = alarm.wake_time.split(':').map(Number)
    const wakeTime = new Date(now)
    wakeTime.setHours(wakeHours, wakeMinutes, 0, 0)
    const deadline = new Date(wakeTime.getTime() + alarm.checkin_window_minutes * 60 * 1000)

    const deadlineTime = `${String(deadline.getHours()).padStart(2, '0')}:${String(deadline.getMinutes()).padStart(2, '0')}`
    if (currentTime !== deadlineTime) continue

    const { data: checkin } = await supabaseAdmin
      .from('checkins')
      .select('id')
      .eq('user_id', alarm.user_id)
      .eq('date', today)
      .single()

    if (checkin) continue

    await supabaseAdmin.from('missed_alarms').insert({
      user_id: alarm.user_id,
      date: today,
      consequences_fired: alarm.consequences,
    })

    if (alarm.consequences?.includes('sms') && alarm.friend_phone) {
      try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
        await client.messages.create({
          body: `Hey ${alarm.friend_name || 'there'} — your friend failed to wake up at ${alarm.wake_time} today. They're probably still in bed. 😴 (via WakeOrPay)`,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: alarm.friend_phone,
        })
      } catch (err) {
        console.error('Twilio error:', err)
      }
    }

    if (alarm.consequences?.includes('charge') && alarm.profiles?.stripe_customer_id) {
      try {
        await getStripe().paymentIntents.create({
          amount: (alarm.charge_amount ?? 5) * 100,
          currency: 'usd',
          customer: alarm.profiles.stripe_customer_id,
          confirm: true,
          description: `WakeOrPay: missed alarm on ${today}`,
        })
      } catch (err) {
        console.error('Stripe error:', err)
      }
    }

    triggered++
  }

  return NextResponse.json({ triggered })
}
