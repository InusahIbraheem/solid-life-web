import { useState, useEffect } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Orders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          products (name, image_url)
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);

      // Calculate stats
      const totalOrders = data?.length || 0;
      const pendingOrders = data?.filter(o => o.payment_status === "pending" || o.delivery_status === "processing").length || 0;
      const totalSpent = data?.reduce((sum, o) => sum + Number(o.amount), 0) || 0;

      setStats({ totalOrders, pendingOrders, totalSpent });
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your product purchases and deliveries</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalOrders}</div>
              <div className="text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning mb-2">{stats.pendingOrders}</div>
              <div className="text-muted-foreground">Pending Orders</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">₦{stats.totalSpent.toLocaleString()}</div>
              <div className="text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders yet. Start shopping to see your orders here!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium">{order.id.slice(0, 8).toUpperCase()}</TableCell>
                      <TableCell>{order.products?.name || "Unknown Product"}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="font-bold text-primary">₦{Number(order.amount).toLocaleString()}</TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.payment_status === 'verified' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {order.payment_status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.delivery_status === 'delivered' 
                            ? 'bg-success/10 text-success' 
                            : order.delivery_status === 'shipped'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {order.delivery_status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Orders;
