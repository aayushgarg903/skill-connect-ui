-- Create enum types for better data integrity
CREATE TYPE public.user_role AS ENUM ('customer', 'worker', 'admin');
CREATE TYPE public.experience_level AS ENUM ('beginner', 'intermediate', 'expert');
CREATE TYPE public.urgency_level AS ENUM ('same_day', 'within_week', 'flexible');
CREATE TYPE public.job_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.application_status AS ENUM ('pending', 'accepted', 'rejected');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Worker profiles table
CREATE TABLE public.worker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  bio TEXT,
  hourly_rate NUMERIC(10, 2),
  experience_years INTEGER,
  location TEXT NOT NULL,
  service_area TEXT[],
  is_available BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  portfolio_images TEXT[],
  skills TEXT[],
  rating NUMERIC(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Worker services junction table
CREATE TABLE public.worker_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  experience_level experience_level NOT NULL DEFAULT 'beginner',
  UNIQUE(worker_id, service_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES public.worker_profiles(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES public.services(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  preferred_date DATE,
  urgency_level urgency_level NOT NULL DEFAULT 'flexible',
  status job_status NOT NULL DEFAULT 'pending',
  agreed_price NUMERIC(10, 2),
  estimated_duration INTEGER,
  job_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Job applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  message TEXT,
  proposed_price NUMERIC(10, 2),
  estimated_duration INTEGER,
  status application_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, worker_id)
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE UNIQUE,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for worker_profiles table
CREATE POLICY "Anyone can view worker profiles" ON public.worker_profiles
  FOR SELECT USING (true);

CREATE POLICY "Workers can create their own profile" ON public.worker_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Workers can update their own profile" ON public.worker_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for services table
CREATE POLICY "Anyone can view services" ON public.services
  FOR SELECT USING (true);

-- RLS Policies for worker_services table
CREATE POLICY "Anyone can view worker services" ON public.worker_services
  FOR SELECT USING (true);

CREATE POLICY "Workers can manage their own services" ON public.worker_services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.worker_profiles 
      WHERE id = worker_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for jobs table
CREATE POLICY "Anyone can view jobs" ON public.jobs
  FOR SELECT USING (true);

CREATE POLICY "Customers can create jobs" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Job participants can update jobs" ON public.jobs
  FOR UPDATE USING (
    auth.uid() = customer_id OR 
    EXISTS (
      SELECT 1 FROM public.worker_profiles 
      WHERE id = worker_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for job_applications table
CREATE POLICY "Job participants can view applications" ON public.job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs j 
      WHERE j.id = job_id AND j.customer_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.worker_profiles wp 
      WHERE wp.id = worker_id AND wp.user_id = auth.uid()
    )
  );

CREATE POLICY "Workers can create applications" ON public.job_applications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.worker_profiles 
      WHERE id = worker_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Workers can update their applications" ON public.job_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.worker_profiles 
      WHERE id = worker_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Job participants can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_worker_profiles_updated_at
  BEFORE UPDATE ON public.worker_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update worker rating when new review is added
CREATE OR REPLACE FUNCTION public.update_worker_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.worker_profiles
  SET rating = (
    SELECT ROUND(AVG(r.rating)::numeric, 2)
    FROM public.reviews r
    JOIN public.jobs j ON r.job_id = j.id
    WHERE j.worker_id = (
      SELECT j2.worker_id FROM public.jobs j2 WHERE j2.id = NEW.job_id
    )
  )
  WHERE id = (
    SELECT j.worker_id FROM public.jobs j WHERE j.id = NEW.job_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update worker rating on new review
CREATE TRIGGER update_worker_rating_on_review
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_worker_rating();

-- Insert default services
INSERT INTO public.services (name, description, category, icon_url) VALUES
('Carpenter', 'Wood working, furniture repair, cabinet installation', 'Construction & Repair', '/icons/carpenter.svg'),
('Painter', 'Interior and exterior painting, wall preparation', 'Home Improvement', '/icons/painter.svg'),
('Plumber', 'Pipe repair, fixture installation, drainage issues', 'Maintenance', '/icons/plumber.svg'),
('Electrician', 'Electrical repair, wiring, fixture installation', 'Maintenance', '/icons/electrician.svg'),
('Mason', 'Brick work, concrete, stone construction', 'Construction & Repair', '/icons/mason.svg'),
('Cleaner', 'House cleaning, office cleaning, deep cleaning', 'Cleaning', '/icons/cleaner.svg'),
('Gardener', 'Lawn care, landscaping, plant maintenance', 'Outdoor', '/icons/gardener.svg'),
('Cook', 'Meal preparation, catering, personal chef services', 'Personal Services', '/icons/cook.svg'),
('Driver', 'Personal driver, delivery, transportation services', 'Transportation', '/icons/driver.svg'),
('Tutor', 'Academic tutoring, skill training, language teaching', 'Education', '/icons/tutor.svg');

-- Create indexes for better performance
CREATE INDEX idx_worker_profiles_user_id ON public.worker_profiles(user_id);
CREATE INDEX idx_worker_profiles_location ON public.worker_profiles(location);
CREATE INDEX idx_worker_profiles_rating ON public.worker_profiles(rating);
CREATE INDEX idx_worker_profiles_is_available ON public.worker_profiles(is_available);
CREATE INDEX idx_jobs_customer_id ON public.jobs(customer_id);
CREATE INDEX idx_jobs_worker_id ON public.jobs(worker_id);
CREATE INDEX idx_jobs_service_id ON public.jobs(service_id);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_worker_id ON public.job_applications(worker_id);
CREATE INDEX idx_reviews_job_id ON public.reviews(job_id);
CREATE INDEX idx_worker_services_worker_id ON public.worker_services(worker_id);
CREATE INDEX idx_worker_services_service_id ON public.worker_services(service_id);