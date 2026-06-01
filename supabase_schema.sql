-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Extends Supabase Auth users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    role VARCHAR(50) NOT NULL CHECK (role IN ('patient', 'professional')),
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 3. Confidential Dossiers Table (Dossiers Médicaux Codés)
CREATE TABLE public.confidential_dossiers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    professional_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
    clinical_notes TEXT, -- Encrypted/clinical text notes
    doctor_sharing_authorized BOOLEAN DEFAULT false NOT NULL,
    secure_key_hash TEXT, -- Verification key generated after payment
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.confidential_dossiers ENABLE ROW LEVEL SECURITY;

-- Dossiers Policies (Only the patient and the assigned professional can read/write)
CREATE POLICY "Access by patient or professional" ON public.confidential_dossiers
    FOR ALL USING (
        auth.uid() = patient_id OR auth.uid() = professional_id
    );

-- 4. Appointments Table (Rendez-vous)
CREATE TABLE public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modality VARCHAR(20) NOT NULL CHECK (modality IN ('video', 'audio', 'chat')),
    status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    secure_id_key VARCHAR(100), -- Key generated upon payment to access session
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Access by patient or professional for appointments" ON public.appointments
    FOR ALL USING (
        auth.uid() = patient_id OR auth.uid() = professional_id
    );

-- 5. Invoices & Payments Table (Facturation)
CREATE TABLE public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'paid', 'refunded')),
    secure_id_key VARCHAR(100) UNIQUE NOT NULL, -- Access code generated after payment
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Access by patient for invoices" ON public.invoices
    FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Access by professional for invoices" ON public.invoices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'professional'
        )
    );

-- 6. Psychometric Tests Table
CREATE TABLE public.psychometric_tests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    test_type VARCHAR(50) NOT NULL, -- e.g., 'character', 'trauma', 'stress'
    results JSONB NOT NULL, -- Answers and scored outcome metrics
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.psychometric_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Access by patient or professional for test results" ON public.psychometric_tests
    FOR ALL USING (
        auth.uid() = patient_id OR 
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'professional'
        )
    );

-- 7. Mood Journal (Journal Privé d'Humeur)
CREATE TABLE public.mood_journal (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    mood_score INT CHECK (mood_score BETWEEN 1 AND 5) NOT NULL,
    journal_entry TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.mood_journal ENABLE ROW LEVEL SECURITY;

-- Journal entries are private to the patient
CREATE POLICY "Access to own mood journal" ON public.mood_journal
    FOR ALL USING (auth.uid() = patient_id);

-- 8. Automatic Profile Creation Trigger (Runs when a new user signs up in Auth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', 'Utilisateur'),
        new.email,
        COALESCE(new.raw_user_meta_data->>'role', 'patient')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
