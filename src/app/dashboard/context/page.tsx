import { getContextInstructions } from '@/app/actions/context'
import ContextClient from './ContextClient'

export default async function ContextPage() {
  const instructions = await getContextInstructions()
  return <ContextClient savedInstructions={instructions} />
}
