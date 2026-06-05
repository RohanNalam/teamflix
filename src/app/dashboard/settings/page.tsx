import { currentUser } from '@clerk/nextjs/server'
import { getUserSettings } from '@/app/actions/settings'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const [user, settings] = await Promise.all([currentUser(), getUserSettings()])
  return <SettingsClient user={{ displayName: user?.fullName ?? '', email: user?.emailAddresses?.[0]?.emailAddress ?? '', imageUrl: user?.imageUrl ?? '' }} settings={settings} />
}
