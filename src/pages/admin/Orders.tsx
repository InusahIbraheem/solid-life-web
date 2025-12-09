import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    delivered: 0,
    processing: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          products (name),
          profiles:user_id (first_name, last_name, email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch customer profiles
      const ordersWithProfiles = await Promise.all(
        (data || []).map(async (order) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name, email")
            .eq("user_id", order.user_id)
            .maybeSingle();
          
          return {
            ...order,
            customer: profile,
          };
        })
      );

      setOrders(ordersWithProfiles);

      // Calculate stats
      const total = ordersWithProfiles.length;
      const delivered = ordersWithProfiles.filter(o => o.delivery_status === "delivered").length;
      const processing = ordersWithProfiles.filter(o => o.delivery_status === "processing").length;
      const revenue = ordersWithProfiles.reduce((sum, o) => sum + Number(o.amount), 0);

      setStats({
        totalOrders: total,
        delivered,
        processing,
        totalRevenue: revenue,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ payment_status: "verified" })
        .eq("id", orderId);

      if (error) throw error;

      toast.success("Payment verified!");
      fetchOrders();
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Failed to verify payment");
    }
  };

  const handleUpdateDelivery = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ delivery_status: status })
        .eq("id", orderId);

      if (error) throw error;

      toast.success(`Order marked as ${status}!`);
      fetchOrders();
    } catch (error) {
      console.error("Error updating delivery:", error);
      toast.error("Failed to update delivery status");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
          <p className="text-muted-foreground">Monitor and manage all customer orders</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalOrders}</div>
              <div className="text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">{stats.delivered}</div>
              <div className="text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning mb-2">{stats.processing}</div>
              <div className="text-muted-foreground">Processing</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                ₦{stats.totalRevenue >= 1000000 
                  ? `${(stats.totalRevenue / 1000000).toFixed(1)}M` 
                  : stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
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
                      <TableCell className="font-mono font-medium">
                        {order.id.slice(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {order.customer?.first_name || "N/A"} {order.customer?.last_name || ""}
                      </TableCell>
                      <TableCell>{order.products?.name || "Unknown"}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="font-bold text-primary">
                        ₦{Number(order.amount).toLocaleString()}
                      </TableCell>
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
                        <div className="flex gap-1">
                          {order.payment_status === "pending" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleVerifyPayment(order.id)}
                              title="Verify Payment"
                            >
                              <CheckCircle className="w-4 h-4 text-success" />
                            </Button>
                          )}
                          {order.delivery_status === "processing" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateDelivery(order.id, "shipped")}
                            >
                              Ship
                            </Button>
                          )}
                          {order.delivery_status === "shipped" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateDelivery(order.id, "delivered")}
                            >
                              Deliver
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orders;
