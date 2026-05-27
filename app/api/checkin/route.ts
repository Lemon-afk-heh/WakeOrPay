import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { userId } = await request.json()
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  const supabase = await createClient()

  const today = new Date().toISOString().split('T')[0]

  await supabase.from('checkins').upsert({
    user_id: userId,
    date: today,
    checked_in_at: new Date().toISOString(),
  }, { onConflict: 'user_id,date' })

  return NextResponse.json({ ok: true })
}
