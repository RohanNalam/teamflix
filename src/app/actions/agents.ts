'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function getAgents() {
  const { userId } = await auth()
  if (!userId) return []
  const { data } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function connectAgent(name: string, provider: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('agents').upsert(
    { user_id: userId, name, provider, status: 'connected', sessions: 0 },
    { onConflict: 'user_id,name' }
  )
  await supabase.from('activity').insert({
    user_id: userId, type: 'run',
    message: `Agent connected: ${name}`, agent: name
  })
  revalidatePath('/dashboard/agents')
}

export async function disconnectAgent(id: string, name: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('agents').update({ status: 'disconnected' }).eq('id', id).eq('user_id', userId)
  await supabase.from('activity').insert({
    user_id: userId, type: 'run',
    message: `Agent disconnected: ${name}`, agent: name
  })
  revalidatePath('/dashboard/agents')
}
