import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product?: {
    name: string;
    price: number;
    points: number;
    image_url: string | null;
  };
  // For local products (not from DB)
  local_product?: {
    name: string;
    price: number;
    points: number;
    image: string;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (product: any) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalPV: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`cart_${user?.id || "guest"}`);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, [user]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(`cart_${user?.id || "guest"}`, JSON.stringify(items));
  }, [items, user]);

  const addToCart = (product: any) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => (item.product_id === product.id?.toString()) || 
                  (item.local_product?.name === product.name)
      );
      if (existing) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          product_id: product.id?.toString() || crypto.randomUUID(),
          quantity: 1,
          local_product: {
            name: product.name,
            price: product.price,
            points: product.points || 0,
            image: product.image,
          },
        },
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.local_product?.price || 0) * item.quantity,
    0
  );

  const totalPV = items.reduce(
    (sum, item) => sum + (item.local_product?.points || 0) * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalPV,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
