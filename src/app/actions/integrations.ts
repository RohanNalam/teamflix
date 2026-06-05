'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

export async function getIntegrations() {
  const { data } = await supabase.from('integrations').select('name, connected').eq('user_id', DEMO_USER_ID)
  const map: Record<string, boolean> = {}
  data?.forEach(i => { map[i.name] = i.connected })
  return map
}

export async function toggleIntegration(name: string, connected: boolean) {
  await supabase.from('integrations').upsert(
    { user_id: DEMO_USER_ID, name, connected, updated_at: new Date().toISOString() },
    { onConflict: 'user_id,name' }
  )
  revalidatePath('/dashboard/integrations')
}
