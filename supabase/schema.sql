-- Run this in your Supabase SQL editor to set up the database

create table if not exists alarms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  wake_time text not null default '07:00',
  checkin_window_minutes int not null default 10,
  friend_phone text,
  friend_name text,
  charge_amount int default 5,
  consequences text[] default array['sms'],
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  checked_in_at timestamptz not null,
  unique(user_id, date)
);

create table if not exists missed_alarms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  consequences_fired text[],
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stripe_customer_id text,
  updated_at timestamptz default now()
);

-- Row level security
alter table alarms enable row level security;
alter table checkins enable row level security;
alter table missed_alarms enable row level security;
alter table profiles enable row level security;

create policy "Users manage own alarm" on alarms
  for all using (auth.uid() = user_id);

create policy "Users manage own checkins" on checkins
  for all using (auth.uid() = user_id);

create policy "Users view own missed alarms" on missed_alarms
  for select using (auth.uid() = user_id);

create policy "Users manage own profile" on profiles
  for all using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
