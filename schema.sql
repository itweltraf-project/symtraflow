-- ============================================================
-- SYMTRAFLOW - SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLE: orders (Daftar Order Produksi Trafo)
CREATE TABLE IF NOT EXISTS public.orders (
    id VARCHAR(50) PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    kapasitas VARCHAR(50) NOT NULL,
    tegangan VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'TANK MAKING',
    current_stage_index INT NOT NULL DEFAULT 0,
    progress INT NOT NULL DEFAULT 0,
    mulai TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deadline DATE NOT NULL,
    operator VARCHAR(100) NOT NULL,
    operator_avatar TEXT,
    timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREATE TABLE: projects (Proyek Asosiasi Unit Trafo)
CREATE TABLE IF NOT EXISTS public.projects (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    total_units INT DEFAULT 0,
    finished_units INT DEFAULT 0,
    process_units INT DEFAULT 0,
    waiting_units INT DEFAULT 0,
    avg_progress INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CREATE TABLE: activity_logs (Feed Log Aktivitas Realtime)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    icon VARCHAR(20) DEFAULT 'blue',
    icon_class VARCHAR(100) DEFAULT 'fa-solid fa-gears',
    bold_text TEXT NOT NULL,
    sub_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ENABLE REALTIME ON TABLES
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- 6. ENABLE ROW LEVEL SECURITY (RLS) & POLICIES
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update orders" ON public.orders FOR UPDATE USING (true);

CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert projects" ON public.projects FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read activity_logs" ON public.activity_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert activity_logs" ON public.activity_logs FOR INSERT WITH CHECK (true);

-- 7. INSERT INITIAL SAMPLE DATA
INSERT INTO public.orders (id, nama, kapasitas, tegangan, status, current_stage_index, progress, deadline, operator, operator_avatar, timeline)
VALUES 
(
  'TRF-240522-001', 
  'Trafo Distribusi', 
  '500 kVA', 
  '20 kV / 400 V', 
  'ASSEMBLY', 
  3, 
  60, 
  '2024-05-25', 
  'Ahmad Fauzi', 
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  '[
    {"stage": "TANK MAKING", "status": "finished", "time": "22/05 08:15", "operator": "Budi Santoso"},
    {"stage": "CORE MAKING", "status": "finished", "time": "22/05 08:45", "operator": "Joko Susilo"},
    {"stage": "COIL MAKING", "status": "finished", "time": "22/05 09:30", "operator": "Rudi Hartono"},
    {"stage": "ASSEMBLY", "status": "process", "time": "Mulai: 22/05 10:10", "operator": "Ahmad Fauzi"},
    {"stage": "CONNECTION", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "FINAL ASSEMBLY", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "INTERNAL TEST", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "FINISHING", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "FAT", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "PUNCHLIST", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "DELIVERY", "status": "waiting", "time": "-", "operator": "-"}
  ]'::jsonb
),
(
  'TRF-240522-002', 
  'Trafo Distribusi', 
  '1000 kVA', 
  '20 kV / 400 V', 
  'ASSEMBLY', 
  3, 
  55, 
  '2024-05-26', 
  'Rudi Hartono', 
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  '[
    {"stage": "TANK MAKING", "status": "finished", "time": "22/05 08:30", "operator": "Budi Santoso"},
    {"stage": "CORE MAKING", "status": "finished", "time": "22/05 09:00", "operator": "Joko Susilo"},
    {"stage": "COIL MAKING", "status": "finished", "time": "22/05 09:45", "operator": "Rudi Hartono"},
    {"stage": "ASSEMBLY", "status": "process", "time": "Mulai: 22/05 10:20", "operator": "Rudi Hartono"},
    {"stage": "CONNECTION", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "FINAL ASSEMBLY", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "INTERNAL TEST", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "FINISHING", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "FAT", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "PUNCHLIST", "status": "waiting", "time": "-", "operator": "-"},
    {"stage": "DELIVERY", "status": "waiting", "time": "-", "operator": "-"}
  ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 8. CREATE TABLE: app_users (Manajemen Akun Login Super Admin & Admin)
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Admin',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS & Realtime on app_users
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all app_users" ON public.app_users FOR ALL USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_users;

-- Insert default accounts if not exists
INSERT INTO public.app_users (username, password, full_name, role)
VALUES 
('SuperAdmin', 'super123', 'Super Administrator', 'Super Admin'),
('Admin', 'admin123', 'Administrator Produksi', 'Admin')
ON CONFLICT (username) DO NOTHING;

