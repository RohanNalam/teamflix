'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function getSessions() {
  const { userId } = await auth()
  if (!userId) return []
  const { data } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function createSession(name: string, agent: string, repo: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('sessions').insert({ user_id: userId, name, agent, repo, status: 'idle' })
  await supabase.from('activity').insert({
    user_id: userId, type: 'run',
    message: `Session started: ${name}`, session: name, agent
  })
  revalidatePath('/dashboard/sessions')
  revalidatePath('/dashboard/activity')
}

export async function deleteSession(id: string, name: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('sessions').delete().eq('id', id).eq('user_id', userId)
  await supabase.from('activity').insert({
    user_id: userId, type: 'run',
    message: `Session deleted: ${name}`, session: name
  })
  revalidatePath('/dashboard/sessions')
  revalidatePath('/dashboard/activity')
}

export async function updateSessionStatus(id: string, status: string, name: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('sessions').update({ status }).eq('id', id).eq('user_id', userId)
  revalidatePath('/dashboard/sessions')
}
