'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

export async function getContextInstructions() {
  const { data } = await supabase.from('context_instructions').select('content').eq('user_id', DEMO_USER_ID).single()
  return data?.content ?? ''
}

export async function saveContextInstructions(content: string) {
  await supabase.from('context_instructions').upsert(
    { user_id: DEMO_USER_ID, content, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )
  revalidatePath('/dashboard/context')
}
