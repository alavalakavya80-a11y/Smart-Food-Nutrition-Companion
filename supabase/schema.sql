-- Run this entire file in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.food_items (
  id uuid primary key default gen_random_uuid(),
  fdc_id text unique,
  name text not null,
  category text,
  data_type text,
  source text not null default 'USDA FoodData Central',
  nutrients_per_100g jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.meal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  food_fdc_id text,
  food_name text not null,
  quantity_grams numeric not null check (quantity_grams > 0),
  meal_type text not null check (meal_type in ('Breakfast','Morning snack','Lunch','Evening snack','Dinner')),
  consumed_on date not null default current_date,
  calories numeric,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  fibre_g numeric,
  sugar_g numeric,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.custom_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  instructions text,
  created_at timestamptz not null default now()
);
create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.custom_recipes(id) on delete cascade,
  ingredient_name text not null,
  quantity_grams numeric not null check(quantity_grams > 0)
);

alter table public.user_profiles enable row level security;
alter table public.meal_entries enable row level security;
alter table public.custom_recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.food_items enable row level security;

create policy "profile owner read" on public.user_profiles for select using (auth.uid()=id);
create policy "profile owner insert" on public.user_profiles for insert with check (auth.uid()=id);
create policy "profile owner update" on public.user_profiles for update using (auth.uid()=id);
create policy "diary owner all" on public.meal_entries for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "recipe owner all" on public.custom_recipes for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "recipe ingredients owner access" on public.recipe_ingredients for all
using (exists(select 1 from public.custom_recipes r where r.id=recipe_id and r.user_id=auth.uid()))
with check (exists(select 1 from public.custom_recipes r where r.id=recipe_id and r.user_id=auth.uid()));
create policy "food items readable by signed in users" on public.food_items for select to authenticated using (true);
