'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'

export async function getActivity() {
  const { userId } = await auth()
  if (!userId) return []
  const { data } = await supabase
    .from('activity')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)
  return data ?? []
}

export async function getActivityStats() {
  const { userId } = await auth()
  if (!userId) return { activeSessions: 0, commitsToday: 0, errorsToday: 0, agentHours: 0 }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [sessions, commits, errors] = await Promise.all([
    supabase.from('sessions').select('id', { count: 'exact' }).eq('user_id', userId).eq('status', 'active'),
    supabase.from('activity').select('id', { count: 'exact' }).eq('user_id', userId).eq('type', 'commit').gte('created_at', today.toISOString()),
    supabase.from('activity').select('id', { count: 'exact' }).eq('user_id', userId).eq('type', 'error').gte('created_at', today.toISOString()),
  ])

  return {
    activeSessions: sessions.count ?? 0,
    commitsToday: commits.count ?? 0,
    errorsToday: errors.count ?? 0,
    agentHours: 0,
  }
}
