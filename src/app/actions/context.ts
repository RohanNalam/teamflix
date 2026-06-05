'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function getContextInstructions() {
  const { userId } = await auth()
  if (!userId) return ''
  const { data } = await supabase
    .from('context_instructions')
    .select('content')
    .eq('user_id', userId)
    .single()
  return data?.content ?? ''
}

export async function saveContextInstructions(content: string) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('context_instructions').upsert(
    { user_id: userId, content, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )
  revalidatePath('/dashboard/context')
}
