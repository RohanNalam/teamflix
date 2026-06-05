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
  revalidatePath('/dashboard/sessions')
}

export async function deleteSession(id: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('sessions').delete().eq('id', id).eq('user_id', userId)
  revalidatePath('/dashboard/sessions')
}

export async function updateSessionStatus(id: string, status: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('sessions').update({ status }).eq('id', id).eq('user_id', userId)
  revalidatePath('/dashboard/sessions')
}
