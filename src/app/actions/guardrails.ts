'use server'

import { supabase } from '@/lib/supabase'
import { DEMO_USER_ID } from '@/lib/demo-user'
import { revalidatePath } from 'next/cache'

export async function getGuardrails() {
  const { data } = await supabase.from('guardrails').select('rule_id, enabled').eq('user_id', DEMO_USER_ID)
  const map: Record<string, boolean> = {}
  data?.forEach(r => { map[r.rule_id] = r.enabled })
  return map
}

export async function toggleGuardrail(ruleId: string, enabled: boolean) {
  await supabase.from('guardrails').upsert(
    { user_id: DEMO_USER_ID, rule_id: ruleId, enabled },
    { onConflict: 'user_id,rule_id' }
  )
  revalidatePath('/dashboard/guardrails')
}
