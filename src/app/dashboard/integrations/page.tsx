import { getIntegrations } from '@/app/actions/integrations'
import IntegrationsClient from './IntegrationsClient'

export default async function IntegrationsPage() {
  const saved = await getIntegrations()
  return <IntegrationsClient savedIntegrations={saved} />
}
