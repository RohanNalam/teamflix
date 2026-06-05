'use server'

import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function getGuardrails() {
  const { userId } = await auth()
  if (!userId) return {}
  const { data } = await supabase
    .from('guardrails')
    .select('rule_id, enabled')
    .eq('user_id', userId)
  const map: Record<string, boolean> = {}
  data?.forEach(r => { map[r.rule_id] = r.enabled })
  return map
}

export async function toggleGuardrail(ruleId: string, enabled: boolean) {
  const { userId } = await auth()
  if (!userId) return
  await supabase.from('guardrails').upsert(
    { user_id: userId, rule_id: ruleId, enabled },
    { onConflict: 'user_id,rule_id' }
  )
  revalidatePath('/dashboard/guardrails')
}
