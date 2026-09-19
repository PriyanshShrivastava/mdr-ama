-- Run in a Supabase Postgres project after enabling Supabase Auth.
create table if not exists merchant_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) <= 80),
  created_at timestamptz not null default now()
);
create table if not exists payment_sessions (
  id uuid primary key,
  merchant_id uuid not null references auth.users(id) on delete cascade,
  payee_vpa text not null check (char_length(payee_vpa) <= 100),
  payee_name text not null check (char_length(payee_name) <= 80),
  total_paise bigint not null check (total_paise > 0),
  chunk_count smallint not null check (chunk_count between 1 and 25),
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
alter table merchant_profiles enable row level security;
alter table payment_sessions enable row level security;
create policy "merchants read only their profile" on merchant_profiles for select using (auth.uid() = id);
create policy "merchants manage only their sessions" on payment_sessions for all using (auth.uid() = merchant_id) with check (auth.uid() = merchant_id);
