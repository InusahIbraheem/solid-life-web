
-- Add package column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS package text DEFAULT 'member';

-- Create cart_items table
CREATE TABLE public.cart_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Create bonus_transactions table for tracking all bonus payouts
CREATE TABLE public.bonus_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  order_id uuid REFERENCES public.orders(id),
  bonus_type text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  pv_value integer DEFAULT 0,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.bonus_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bonuses" ON public.bonus_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage bonuses" ON public.bonus_transactions FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to auto-calculate bonuses when an order payment is verified
CREATE OR REPLACE FUNCTION public.calculate_order_bonuses(p_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_order RECORD;
  v_buyer_profile RECORD;
  v_referral RECORD;
  v_upline_profile RECORD;
  v_personal_bonus numeric;
  v_level_bonus numeric;
  v_level_pct numeric;
BEGIN
  -- Get the order
  SELECT * INTO v_order FROM orders WHERE id = p_order_id;
  IF NOT FOUND THEN RETURN; END IF;

  -- Get buyer profile
  SELECT * INTO v_buyer_profile FROM profiles WHERE user_id = v_order.user_id;
  IF NOT FOUND THEN RETURN; END IF;

  -- Personal Purchase Bonus (10%)
  v_personal_bonus := v_order.amount * 0.10;
  INSERT INTO bonus_transactions (user_id, order_id, bonus_type, amount, pv_value, description)
  VALUES (v_order.user_id, p_order_id, 'personal_purchase', v_personal_bonus, v_order.points_earned, 'Personal Purchase Bonus (10%)');

  -- Update buyer wallet
  UPDATE profiles SET wallet_balance = COALESCE(wallet_balance, 0) + v_personal_bonus, 
    total_earnings = COALESCE(total_earnings, 0) + v_personal_bonus,
    points = COALESCE(points, 0) + COALESCE(v_order.points_earned, 0)
  WHERE user_id = v_order.user_id;

  -- Insert wallet transaction for buyer
  INSERT INTO wallet_transactions (user_id, amount, type, description, status)
  VALUES (v_order.user_id, v_personal_bonus, 'bonus', 'Personal Purchase Bonus (10%)', 'completed');

  -- Level bonuses through referral chain
  FOR v_referral IN 
    SELECT r.referrer_id, r.level FROM referrals r 
    WHERE r.referred_id = v_order.user_id AND r.status = 'active'
    ORDER BY r.level ASC LIMIT 3
  LOOP
    -- Determine level percentage
    IF v_referral.level = 1 THEN v_level_pct := 0.07;
    ELSIF v_referral.level = 2 THEN v_level_pct := 0.05;
    ELSIF v_referral.level = 3 THEN v_level_pct := 0.03;
    ELSE v_level_pct := 0;
    END IF;

    IF v_level_pct > 0 THEN
      v_level_bonus := v_order.amount * v_level_pct;

      INSERT INTO bonus_transactions (user_id, order_id, bonus_type, amount, pv_value, description)
      VALUES (v_referral.referrer_id, p_order_id, 'level_' || v_referral.level, v_level_bonus, 0, 
        'Level ' || v_referral.level || ' Bonus (' || (v_level_pct * 100) || '%)');

      UPDATE profiles SET wallet_balance = COALESCE(wallet_balance, 0) + v_level_bonus,
        total_earnings = COALESCE(total_earnings, 0) + v_level_bonus
      WHERE user_id = v_referral.referrer_id;

      INSERT INTO wallet_transactions (user_id, amount, type, description, status)
      VALUES (v_referral.referrer_id, v_level_bonus, 'bonus', 'Level ' || v_referral.level || ' Bonus', 'completed');
    END IF;
  END LOOP;
END;
$$;
