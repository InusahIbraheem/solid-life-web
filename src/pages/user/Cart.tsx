import { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { PaymentProofUpload } from "@/components/PaymentProofUpload";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalAmount, totalPV } = useCart();
  const { user } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      return;
    }
    if (!paymentProofUrl) {
      toast.error("Please upload proof of payment");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create orders for each item
      for (const item of items) {
        const { error } = await supabase.from("orders").insert({
          user_id: user.id,
          amount: (item.local_product?.price || 0) * item.quantity,
          quantity: item.quantity,
          points_earned: (item.local_product?.points || 0) * item.quantity,
          payment_proof_url: paymentProofUrl,
          payment_status: "pending",
          delivery_status: "processing",
        });
        if (error) throw error;
      }

      toast.success("Order placed successfully! Awaiting payment verification.");
      clearCart();
      setCheckoutOpen(false);
      setPaymentProofUrl("");
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your items and checkout</p>
        </div>

        {items.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-16 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Browse our products and add items to your cart</p>
              <Link to="/products">
                <Button className="gradient-primary text-white">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Cart Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>PV</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.local_product?.image && (
                              <img
                                src={item.local_product.image}
                                alt={item.local_product.name}
                                className="w-12 h-12 rounded object-cover"
                              />
                            )}
                            <span className="font-medium">{item.local_product?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>₦{(item.local_product?.price || 0).toLocaleString()}</TableCell>
                        <TableCell>{item.local_product?.points || 0}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-primary">
                          ₦{((item.local_product?.price || 0) * item.quantity).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row gap-6">
              <Card className="shadow-soft flex-1">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span className="font-bold">₦{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total PV:</span>
                    <span className="font-semibold">{totalPV} PV</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">₦{totalAmount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button
                  className="gradient-primary text-white px-8"
                  size="lg"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Proceed to Checkout
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Checkout Dialog */}
        <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Checkout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Items:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Total PV:</span>
                  <span className="font-semibold">{totalPV} PV</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Transfer ₦{totalAmount.toLocaleString()} to:
                </p>
                <div className="text-sm space-y-1">
                  <p><strong>Bank:</strong> First Bank of Nigeria</p>
                  <p><strong>Account Name:</strong> SolidLife MLM Nigeria Ltd</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                </div>
              </div>

              <PaymentProofUpload
                label="Upload Proof of Payment *"
                onUploadComplete={setPaymentProofUrl}
              />

              <Button
                onClick={handleCheckout}
                className="w-full gradient-primary text-white"
                disabled={isSubmitting || !paymentProofUrl}
              >
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </UserLayout>
  );
};

export default Cart;
