'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

export async function getAgents() {
  const { data } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', DEMO_USER_ID)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function connectAgent(name: string, provider: string) {
  await supabase.from('agents').upsert(
    { user_id: DEMO_USER_ID, name, provider, status: 'connected', sessions: 0 },
    { onConflict: 'user_id,name' }
  )
  await supabase.from('activity').insert({
    user_id: DEMO_USER_ID, type: 'run',
    message: `Agent connected: ${name}`, agent: name
  })
  revalidatePath('/dashboard/agents')
}

export async function disconnectAgent(id: string, name: string) {
  await supabase.from('agents').update({ status: 'disconnected' }).eq('id', id).eq('user_id', DEMO_USER_ID)
  await supabase.from('activity').insert({
    user_id: DEMO_USER_ID, type: 'run',
    message: `Agent disconnected: ${name}`, agent: name
  })
  revalidatePath('/dashboard/agents')
}
