-- Run this entire file in Supabase → SQL Editor → New query

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  agent text not null,
  repo text,
  status text not null default 'idle',
  created_at timestamptz default now()
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  provider text not null,
  status text not null default 'disconnected',
  sessions int default 0,
  created_at timestamptz default now(),
  unique(user_id, name)
);

create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  key text not null unique,
  type text not null default 'test',
  created_at timestamptz default now()
);

create table if not exists activity (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  type text not null,
  message text not null,
  session text,
  agent text,
  created_at timestamptz default now()
);

-- Enable Row Level Security on all tables
alter table sessions  enable row level security;
alter table agents    enable row level security;
alter table api_keys  enable row level security;
alter table activity  enable row level security;

-- Policies: users can only see and edit their own data
create policy "sessions: own data"  on sessions  for all using (user_id = requesting_user_id());
create policy "agents: own data"    on agents    for all using (user_id = requesting_user_id());
create policy "api_keys: own data"  on api_keys  for all using (user_id = requesting_user_id());
create policy "activity: own data"  on activity  for all using (user_id = requesting_user_id());

-- Helper function for RLS (uses anon key approach - simpler for this setup)
-- Since we use Clerk user IDs passed from the server, use service role or this open policy:
-- If RLS blocks you, temporarily use these open policies instead:
-- create policy "open" on sessions for all using (true);
-- create policy "open" on agents   for all using (true);
-- create policy "open" on api_keys for all using (true);
-- create policy "open" on activity for all using (true);
