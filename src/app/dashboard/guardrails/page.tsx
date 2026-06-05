import { getGuardrails } from '@/app/actions/guardrails'
import GuardrailsClient from './GuardrailsClient'

export default async function GuardrailsPage() {
  const saved = await getGuardrails()
  return <GuardrailsClient savedStates={saved} />
}
