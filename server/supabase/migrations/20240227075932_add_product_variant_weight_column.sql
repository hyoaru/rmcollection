ALTER TABLE IF EXISTS public.product_variants
ADD COLUMN IF NOT EXISTS weight TEXT DEFAULT NULL;