-- User profiles for Supabase Auth users.
-- Run this once in the Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  preferred_language text not null default 'el',
  preferred_theme text not null default 'light',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_phone_format
    check (phone is null or phone ~ '^\+?[0-9 ]{10,20}$'),
  constraint profiles_preferred_language_allowed
    check (preferred_language in ('el', 'en')),
  constraint profiles_preferred_theme_allowed
    check (preferred_theme in ('light', 'dark'))
);

alter table public.profiles enable row level security;

grant select on public.profiles to authenticated;
grant insert (id, full_name, phone, avatar_url, preferred_language, preferred_theme, updated_at) on public.profiles to authenticated;
grant update (full_name, phone, avatar_url, preferred_language, preferred_theme, updated_at) on public.profiles to authenticated;
grant select, insert, update, delete on public.profiles to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = id)
with check ((select auth.uid()) is not null and (select auth.uid()) = id);

drop policy if exists "Users can read their own avatar objects" on storage.objects;
create policy "Users can read their own avatar objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users can upload their own avatar objects" on storage.objects;
create policy "Users can upload their own avatar objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users can update their own avatar objects" on storage.objects;
create policy "Users can update their own avatar objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users can delete their own avatar objects" on storage.objects;
create policy "Users can delete their own avatar objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create schema if not exists private;
revoke all on schema private from anon, authenticated;

do $$
begin
  create type public.app_role as enum ('user', 'admin');
exception
  when duplicate_object then null;
end
$$;

create table if not exists private.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table private.user_roles is
  'Authorization roles. Keep this table private and update it only from trusted server/admin code.';

revoke all on table private.user_roles from anon, authenticated;
grant select, insert, update, delete on private.user_roles to service_role;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function private.set_updated_at();

drop trigger if exists set_user_roles_updated_at on private.user_roles;
create trigger set_user_roles_updated_at
before update on private.user_roles
for each row
execute function private.set_updated_at();

create or replace function private.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (
      select user_roles.role
      from private.user_roles
      where user_roles.user_id = (select auth.uid())
    ),
    'user'::public.app_role
  );
$$;

create or replace function private.has_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select private.current_user_role()) = required_role;
$$;

create or replace function private.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, preferred_language, preferred_theme)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(nullif(new.raw_user_meta_data ->> 'preferred_language', ''), 'el'),
    coalesce(nullif(new.raw_user_meta_data ->> 'preferred_theme', ''), 'light')
  )
  on conflict (id) do nothing;

  insert into private.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
after insert on auth.users
for each row
execute function private.handle_new_user_profile();

-- Backfill profiles for users created before this SQL was installed.
insert into public.profiles (id, full_name, phone, preferred_language, preferred_theme)
select
  users.id,
  nullif(users.raw_user_meta_data ->> 'full_name', ''),
  nullif(users.raw_user_meta_data ->> 'phone', ''),
  coalesce(nullif(users.raw_user_meta_data ->> 'preferred_language', ''), 'el'),
  coalesce(nullif(users.raw_user_meta_data ->> 'preferred_theme', ''), 'light')
from auth.users as users
left join public.profiles as profiles on profiles.id = users.id
where profiles.id is null
on conflict (id) do nothing;

-- Backfill default roles for users created before this SQL was installed.
insert into private.user_roles (user_id, role)
select users.id, 'user'
from auth.users as users
left join private.user_roles as user_roles on user_roles.user_id = users.id
where user_roles.user_id is null
on conflict (user_id) do nothing;

-- Promote a user from trusted SQL/admin context, replacing the email value:
-- update private.user_roles
-- set role = 'admin'
-- where user_id = (
--   select id from auth.users where email = 'admin@example.com'
-- );

-- Example policy for another table:
-- create policy "Admins can manage rows"
-- on public.some_table
-- for all
-- to authenticated
-- using ((select private.has_role('admin')))
-- with check ((select private.has_role('admin')));
