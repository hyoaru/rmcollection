ALTER TABLE IF EXISTS public.orders
ADD COLUMN IF NOT EXISTS order_group VARCHAR(36) NOT NULL;