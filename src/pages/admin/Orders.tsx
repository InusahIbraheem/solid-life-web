import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const Orders = () => {
  const orders = [
    { 
      id: "ORD-001", 
      customer: "John Doe",
      product: "Cocoa Power Juggernaut", 
      quantity: 2, 
      amount: 30000, 
      date: "2024-02-20", 
      status: "Delivered",
      payment: "Completed"
    },
    { 
      id: "ORD-002", 
      customer: "Jane Smith",
      product: "Organic Anti-Ageing Product", 
      quantity: 1, 
      amount: 18000, 
      date: "2024-02-19", 
      status: "Delivered",
      payment: "Completed"
    },
    { 
      id: "ORD-003", 
      customer: "Bob Wilson",
      product: "Cocoa Power Juggernaut", 
      quantity: 3, 
      amount: 45000, 
      date: "2024-02-18", 
      status: "In Transit",
      payment: "Completed"
    },
    { 
      id: "ORD-004", 
      customer: "Alice Brown",
      product: "Organic Anti-Ageing Product", 
      quantity: 2, 
      amount: 36000, 
      date: "2024-02-17", 
      status: "Processing",
      payment: "Pending"
    },
  ];

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
              <div className="text-3xl font-bold text-primary mb-2">1,234</div>
              <div className="text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">987</div>
              <div className="text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning mb-2">156</div>
              <div className="text-muted-foreground">Processing</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">₦45.2M</div>
              <div className="text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell className="font-bold text-primary">₦{order.amount.toLocaleString()}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.payment === 'Completed' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {order.payment}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' 
                          ? 'bg-success/10 text-success' 
                          : order.status === 'In Transit'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {order.status}
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orders;
