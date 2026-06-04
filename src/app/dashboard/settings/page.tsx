import { currentUser } from '@clerk/nextjs/server'

export default async function SettingsPage() {
  const user = await currentUser()
  const displayName = user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? ''
  const email = user?.emailAddresses?.[0]?.emailAddress ?? ''
  const initials = user?.firstName?.[0] ?? email[0]?.toUpperCase() ?? '?'

  return (
    <div className="px-8 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Settings</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Manage your workspace and account preferences.</p>
      </div>

      {/* Profile */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold tracking-widest mb-4" style={{ color: 'var(--muted)' }}>PROFILE</h2>
        <div className="rounded-xl border p-6 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--orange)', color: '#000' }}>
                {initials}
              </div>
            )}
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{displayName}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{email}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Display Name</label>
            <input defaultValue={displayName} className="w-full rounded-lg border px-3 py-2 text-sm outline-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Email</label>
            <input defaultValue={email} disabled className="w-full rounded-lg border px-3 py-2 text-sm outline-none opacity-50 cursor-not-allowed" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
            <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>Email is managed by your sign-in provider.</p>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>Save Changes</button>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold tracking-widest mb-4" style={{ color: 'var(--muted)' }}>WORKSPACE</h2>
        <div className="rounded-xl border p-6 space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Workspace Name</label>
            <input defaultValue="Personal" className="w-full rounded-lg border px-3 py-2 text-sm outline-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Default Agent</label>
            <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              <option>Claude Code</option>
              <option>Cursor</option>
              <option>OpenAI Codex</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:opacity-90 transition-opacity" style={{ background: 'var(--orange)' }}>Save</button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest mb-4" style={{ color: '#ef4444' }}>DANGER ZONE</h2>
        <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: '#ef444430' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Delete Account</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Permanently delete all your sessions, agents, and data.</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-red-500 hover:text-white hover:border-red-500" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
