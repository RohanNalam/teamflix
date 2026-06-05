'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function getUserSettings() {
  const { userId } = await auth()
  if (!userId) return { workspace_name: 'Personal', default_agent: 'Claude Code' }
  const { data } = await supabase
    .from('user_settings')
    .select('workspace_name, default_agent')
    .eq('user_id', userId)
    .single()
  return data ?? { workspace_name: 'Personal', default_agent: 'Claude Code' }
}

export async function saveUserSettings(workspaceName: string, defaultAgent: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('user_settings').upsert(
    { user_id: userId, workspace_name: workspaceName, default_agent: defaultAgent, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )
  revalidatePath('/dashboard/settings')
}
