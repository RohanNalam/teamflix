'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

export async function getUserSettings() {
  const { data } = await supabase.from('user_settings').select('workspace_name, default_agent').eq('user_id', DEMO_USER_ID).single()
  return data ?? { workspace_name: 'Personal', default_agent: 'Claude Code' }
}

export async function saveUserSettings(workspaceName: string, defaultAgent: string) {
  await supabase.from('user_settings').upsert(
    { user_id: DEMO_USER_ID, workspace_name: workspaceName, default_agent: defaultAgent, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )
  revalidatePath('/dashboard/settings')
}
