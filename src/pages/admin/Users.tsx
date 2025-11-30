import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Ban, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Users = () => {
  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      phone: "+234 800 000 0001", 
      joined: "2024-01-15", 
      status: "Active",
      kyc: "Approved",
      referrals: 23,
      earnings: "₦450,000"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      phone: "+234 800 000 0002", 
      joined: "2024-01-20", 
      status: "Active",
      kyc: "Pending",
      referrals: 15,
      earnings: "₦285,000"
    },
    { 
      id: 3, 
      name: "Bob Wilson", 
      email: "bob@example.com", 
      phone: "+234 800 000 0003", 
      joined: "2024-02-05", 
      status: "Suspended",
      kyc: "Approved",
      referrals: 8,
      earnings: "₦120,000"
    },
  ];

  const handleApprove = (name: string) => {
    toast.success(`${name}'s KYC approved!`);
  };

  const handleSuspend = (name: string) => {
    toast.error(`${name} suspended!`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users Management</h1>
          <p className="text-muted-foreground">Manage all registered users and their KYC status</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">5,234</div>
              <div className="text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">4,891</div>
              <div className="text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning mb-2">156</div>
              <div className="text-muted-foreground">Pending KYC</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-2">187</div>
              <div className="text-muted-foreground">Suspended</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="flex gap-2">
                <Input placeholder="Search users..." className="w-64" />
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.kyc === 'Approved' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {user.kyc}
                      </span>
                    </TableCell>
                    <TableCell>{user.referrals}</TableCell>
                    <TableCell className="font-bold text-primary">{user.earnings}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.kyc === 'Pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApprove(user.name)}
                          >
                            <CheckCircle className="w-4 h-4 text-success" />
                          </Button>
                        )}
                        {user.status === 'Active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSuspend(user.name)}
                          >
                            <Ban className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
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

export default Users;
