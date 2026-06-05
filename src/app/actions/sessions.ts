'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

export async function getSessions() {
  const { data } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', DEMO_USER_ID)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function createSession(name: string, agent: string, repo: string, prompt?: string) {
  const { data, error } = await supabase
    .from('sessions')
    .insert({ user_id: DEMO_USER_ID, name, agent, repo, status: 'active', prompt: prompt || name })
    .select()
    .single()

  await supabase.from('activity').insert({
    user_id: DEMO_USER_ID, type: 'run',
    message: `Session started: ${name}`, session: name, agent
  })

  revalidatePath('/dashboard/sessions')
  revalidatePath('/dashboard/activity')
  return data
}

export async function deleteSession(id: string, name: string) {
  await supabase.from('sessions').delete().eq('id', id).eq('user_id', DEMO_USER_ID)
  await supabase.from('activity').insert({
    user_id: DEMO_USER_ID, type: 'run',
    message: `Session deleted: ${name}`, session: name
  })
  revalidatePath('/dashboard/sessions')
  revalidatePath('/dashboard/activity')
}

export async function updateSessionStatus(id: string, status: string, name: string) {
  await supabase.from('sessions').update({ status }).eq('id', id).eq('user_id', DEMO_USER_ID)
  revalidatePath('/dashboard/sessions')
}
