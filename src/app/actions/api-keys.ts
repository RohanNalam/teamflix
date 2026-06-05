'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

function generateKey(type: 'live' | 'test') {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const rand = Array.from({ length: 24 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `tf_${type}_${rand}`
}

export async function getApiKeys() {
  const { data } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', DEMO_USER_ID)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function createApiKey(name: string, type: 'live' | 'test' = 'test') {
  const key = generateKey(type)
  await supabase.from('api_keys').insert({ user_id: DEMO_USER_ID, name, key, type })
  revalidatePath('/dashboard/api-keys')
}

export async function deleteApiKey(id: string) {
  await supabase.from('api_keys').delete().eq('id', id).eq('user_id', DEMO_USER_ID)
  revalidatePath('/dashboard/api-keys')
}
