-- Age gate acknowledgments (run in Supabase SQL Editor if you use Supabase logging)
-- Stores client-reported IP (from browser) + user agent when visitor clicks "I am 21 or older".

create table if not exists public.age_gate_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip text,
  user_agent text
);

create index if not exists age_gate_logs_created_at_idx on public.age_gate_logs (created_at desc);

alter table public.age_gate_logs enable row level security;

-- Allow anonymous inserts from your public site only (no public reads)
create policy "age_gate_logs_insert_anon"
  on public.age_gate_logs
  for insert
  to anon
  with check (true);
