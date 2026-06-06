-- Supabase Database Schema for ChildhoodWish

-- 1. Products Table
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  description TEXT NOT NULL,
  memory_hook TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  tags TEXT[] NOT NULL DEFAULT '{}',
  occasions TEXT[] NOT NULL DEFAULT '{}',
  is_gift_box BOOLEAN NOT NULL DEFAULT false,
  gift_box_contents TEXT[],
  featured BOOLEAN NOT NULL DEFAULT false,
  memory_wall_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Orders Table
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY, -- e.g., CW12345678
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB,
  personal_note TEXT,
  items JSONB NOT NULL, -- Array of CartItems
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Waitlist Table
CREATE TABLE public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  wish TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Quiz Results Table
CREATE TABLE public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  recommended_product_id TEXT REFERENCES public.products(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
-- Disable RLS for now if using Server-Side rendering with Service Role
-- Alternatively, enable RLS and set public read policies

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
-- Only service_role can INSERT/UPDATE/DELETE products (bypasses RLS)

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- No public policies. Only service_role can read/write.

-- 5. Memory Wall Table
CREATE TABLE public.memory_wall (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wish TEXT NOT NULL,
  decade TEXT NOT NULL,
  ip_address TEXT,
  status TEXT NOT NULL DEFAULT 'approved', -- pending, approved, rejected
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.memory_wall ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to memory_wall" ON public.memory_wall FOR SELECT USING (status = 'approved');
CREATE POLICY "Allow public insert to memory_wall" ON public.memory_wall FOR INSERT WITH CHECK (true);
