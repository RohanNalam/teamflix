'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function getIntegrations() {
  const { userId } = await auth()
  if (!userId) return {}
  const { data } = await supabase
    .from('integrations')
    .select('name, connected')
    .eq('user_id', userId)
  const map: Record<string, boolean> = {}
  data?.forEach(i => { map[i.name] = i.connected })
  return map
}

export async function toggleIntegration(name: string, connected: boolean) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('integrations').upsert(
    { user_id: userId, name, connected, updated_at: new Date().toISOString() },
    { onConflict: 'user_id,name' }
  )
  revalidatePath('/dashboard/integrations')
}
