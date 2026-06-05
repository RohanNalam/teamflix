import { getAgents } from '@/app/actions/agents'
import AgentsClient from './AgentsClient'

export default async function AgentsPage() {
  const agents = await getAgents()
  return <AgentsClient initialAgents={agents} />
}
