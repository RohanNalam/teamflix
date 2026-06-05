import { getUserSettings } from '@/app/actions/settings'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const settings = await getUserSettings()
  return (
    <SettingsClient
      user={{ displayName: 'Rohan Nalam', email: 'rohannalam1@gmail.com', imageUrl: '' }}
      settings={settings}
    />
  )
}
