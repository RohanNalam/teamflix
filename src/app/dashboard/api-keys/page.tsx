import { getApiKeys } from '@/app/actions/api-keys'
import ApiKeysClient from './ApiKeysClient'

export default async function ApiKeysPage() {
  const keys = await getApiKeys()
  return <ApiKeysClient initialKeys={keys} />
}
