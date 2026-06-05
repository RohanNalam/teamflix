export function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server'
  let id = localStorage.getItem('teamflix_device_id')
  if (!id) {
    id = 'device_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('teamflix_device_id', id)
  }
  return id
}
