import { currentUser } from '@clerk/nextjs/server'
import { getSessions } from '@/app/actions/sessions'
import { getAgents } from '@/app/actions/agents'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const [user, sessions, agents] = await Promise.all([
    currentUser(),
    getSessions(),
    getAgents(),
  ])

  return (
    <DashboardClient
      firstName={user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'there'}
      sessionCount={sessions.length}
      agentCount={agents.filter(a => a.status === 'connected').length}
    />
  )
}
