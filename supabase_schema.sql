-- Create internships table
create table public.internships (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  role text not null,
  stipend numeric(10, 2),
  location text,
  return_offer boolean default false,
  rating numeric(3, 2) check (rating >= 1.00 and rating <= 5.00),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.internships enable row level security;

-- Read policy (accessible by everyone)
create policy "Allow public read access" on public.internships
  for select using (true);

-- Indexes for performance on live queries
create index idx_internships_company_name on public.internships (company_name);
create index idx_internships_role on public.internships (role);
