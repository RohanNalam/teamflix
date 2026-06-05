import { getSessions } from '@/app/actions/sessions'
import { getAgents } from '@/app/actions/agents'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const [sessions, agents] = await Promise.all([getSessions(), getAgents()])
  return (
    <DashboardClient
      firstName="Rohan"
      sessionCount={sessions.length}
      agentCount={agents.filter((a: any) => a.status === 'connected').length}
    />
  )
}
