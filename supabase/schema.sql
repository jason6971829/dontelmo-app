-- =============================================
-- Me Inspiras 17 - Supabase Schema
-- Ejecuta esto en el SQL Editor de tu proyecto Supabase
-- =============================================

-- 1. Categorías
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text default '',
  slug text unique not null,
  image text default '',
  sort_order int default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- 2. Productos
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category_id uuid references categories(id) on delete set null,
  price int not null default 0,
  old_price int,
  description text default '',
  images text[] default '{}',
  featured boolean default false,
  badge text default '',
  active boolean default true,
  created_at timestamptz default now()
);

-- 3. Pedidos
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  recipient_name text default '',
  recipient_phone text default '',
  address text not null,
  delivery_date text not null,
  delivery_time text default '',
  occasion text default '',
  message text default '',
  notes text default '',
  items jsonb not null default '[]',
  total int not null default 0,
  status text not null default 'pendiente',
  created_at timestamptz default now()
);

-- 4. Settings (key-value)
create table if not exists settings (
  id text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table settings enable row level security;

-- Public read for categories and products (anyone can see the store)
create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read settings" on settings for select using (true);

-- Only authenticated users (admin) can modify
create policy "Admin insert categories" on categories for insert to authenticated with check (true);
create policy "Admin update categories" on categories for update to authenticated using (true);
create policy "Admin delete categories" on categories for delete to authenticated using (true);

create policy "Admin insert products" on products for insert to authenticated with check (true);
create policy "Admin update products" on products for update to authenticated using (true);
create policy "Admin delete products" on products for delete to authenticated using (true);

-- Orders: anyone can create (checkout), only admin can read/update
create policy "Public insert orders" on orders for insert with check (true);
create policy "Admin read orders" on orders for select to authenticated using (true);
create policy "Admin update orders" on orders for update to authenticated using (true);

create policy "Admin insert settings" on settings for insert to authenticated with check (true);
create policy "Admin update settings" on settings for update to authenticated using (true);

-- =============================================
-- Seed Data: Categorías
-- =============================================

insert into categories (name, emoji, slug, image, sort_order) values
  ('Desayunos Sorpresa', '🥐', 'desayunos', 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400', 1),
  ('Arreglos Florales', '🌹', 'flores', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400', 2),
  ('Globos Personalizados', '🎈', 'globos', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', 3),
  ('Fresas con Chocolate', '🍓', 'fresas', 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400', 4),
  ('Peluches', '🧸', 'peluches', 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400', 5),
  ('Anchetas', '🎁', 'anchetas', 'https://images.unsplash.com/photo-1549465220-1a8b9238f060?w=400', 6),
  ('Tablas de Picada', '🧀', 'tablas', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400', 7),
  ('Detalles Personalizados', '✨', 'personalizados', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400', 8)
on conflict (slug) do nothing;

-- =============================================
-- Seed Data: Settings
-- =============================================

insert into settings (id, value) values
  ('store', '{"name": "Me Inspiras 17", "whatsapp": "573126634993", "instagram": "@meinspiras17", "address": "Bogotá, Colombia", "slogan": "Expertos en crear sonrisas"}'),
  ('delivery', '{"free_above": 0, "base_fee": 0, "hours": "24/7"}')
on conflict (id) do nothing;

-- =============================================
-- Storage: crear bucket para imagenes
-- Ve a Storage en Supabase Dashboard y crea un bucket llamado "product-images" con acceso público
-- =============================================
