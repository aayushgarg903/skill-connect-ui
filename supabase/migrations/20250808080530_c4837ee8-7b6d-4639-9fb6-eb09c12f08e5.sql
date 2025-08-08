-- Fix function search path security issues by setting search_path explicitly
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = '';

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';