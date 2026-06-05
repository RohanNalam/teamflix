import { getSessions } from '@/app/actions/sessions'
import SessionsClient from './SessionsClient'

export default async function SessionsPage() {
  const sessions = await getSessions()
  return <SessionsClient initialSessions={sessions} />
}
