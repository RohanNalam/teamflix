'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'

export async function getActivity() {
  const { data } = await supabase
    .from('activity')
    .select('*')
    .eq('user_id', DEMO_USER_ID)
    .order('created_at', { ascending: false })
    .limit(50)
  return data ?? []
}

export async function getActivityStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [sessions, commits, errors] = await Promise.all([
    supabase.from('sessions').select('id', { count: 'exact' }).eq('user_id', DEMO_USER_ID).eq('status', 'active'),
    supabase.from('activity').select('id', { count: 'exact' }).eq('user_id', DEMO_USER_ID).eq('type', 'commit').gte('created_at', today.toISOString()),
    supabase.from('activity').select('id', { count: 'exact' }).eq('user_id', DEMO_USER_ID).eq('type', 'error').gte('created_at', today.toISOString()),
  ])

  return {
    activeSessions: sessions.count ?? 0,
    commitsToday: commits.count ?? 0,
    errorsToday: errors.count ?? 0,
    agentHours: 0,
  }
}
