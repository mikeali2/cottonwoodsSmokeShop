-- Optional future ecommerce schema — run in Supabase SQL Editor if you add online orders later.
-- Extensions
create extension if not exists "pgcrypto";

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order int not null default 0
);

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories (id) on delete set null,
  slug text not null unique,
  name text not null,
  description text,
  price_cents int not null check (price_cents >= 0),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index products_category_idx on public.products (category_id);
create index products_active_idx on public.products (active) where active = true;

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Orders
create type public.order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete restrict,
  status public.order_status not null default 'pending',
  total_cents int not null check (total_cents >= 0),
  note text,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity int not null check (quantity > 0),
  unit_price_cents int not null check (unit_price_cents >= 0)
);

create index order_items_order_idx on public.order_items (order_id);

-- RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public read for catalog
create policy "categories_select_all" on public.categories
  for select using (true);

create policy "products_select_active" on public.products
  for select using (active = true);

-- Profiles: users read/update own
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Orders: own rows
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "order_items_select_own" on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

create policy "order_items_insert_own" on public.order_items
  for insert with check (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

-- Seed categories & products (edit prices/images as needed)
insert into public.categories (slug, name, sort_order) values
  ('vapes', 'Vapes & Disposables', 1),
  ('glass', 'Glass', 2),
  ('papers', 'Papers & Cones', 3),
  ('accessories', 'Accessories', 4);

insert into public.products (category_id, slug, name, description, price_cents, image_url, active)
select c.id, 'disposable-vape-starter', 'Disposable Vape — Starter Line', 'Compact disposable, ask staff for available flavors.', 1299, null, true
from public.categories c where c.slug = 'vapes'
union all
select c.id, 'pod-system-kit', 'Pod System Kit', 'Refillable pod device with USB charging.', 3499, null, true
from public.categories c where c.slug = 'vapes'
union all
select c.id, 'beaker-water-pipe', 'Beaker Water Pipe', 'Thick borosilicate glass beaker base.', 8999, null, true
from public.categories c where c.slug = 'glass'
union all
select c.id, 'hand-pipe-walnut', 'Walnut Hand Pipe', 'Wood and glass hybrid, compact travel size.', 2499, null, true
from public.categories c where c.slug = 'glass'
union all
select c.id, 'king-slim-papers', 'King Slim Papers', 'Natural gum, ultra-thin rice papers.', 249, null, true
from public.categories c where c.slug = 'papers'
union all
select c.id, 'pre-rolled-cones-6pk', 'Pre-Rolled Cones 6pk', 'Ready to fill, even burn.', 599, null, true
from public.categories c where c.slug = 'papers'
union all
select c.id, 'grinder-4pc', '4-Piece Grinder', 'Aluminum, magnetic lid, kief catcher.', 1999, null, true
from public.categories c where c.slug = 'accessories'
union all
select c.id, 'butane-refill', 'Premium Butane Refill', 'Near-zero impurities for torches and lighters.', 799, null, true
from public.categories c where c.slug = 'accessories';
