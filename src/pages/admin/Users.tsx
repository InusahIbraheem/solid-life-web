import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Ban, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingKyc: 0,
    suspended: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setUsers(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const pendingKyc = data?.filter(u => !u.kyc_verified).length || 0;

      setStats({
        totalUsers: total,
        activeUsers: total - pendingKyc,
        pendingKyc,
        suspended: 0,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveKyc = async (userId: string, userName: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ kyc_verified: true })
        .eq("user_id", userId);

      if (error) throw error;

      toast.success(`${userName}'s KYC approved!`);
      fetchUsers();
    } catch (error) {
      console.error("Error approving KYC:", error);
      toast.error("Failed to approve KYC");
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Count referrals for each user
  const getUserReferralCount = async (userId: string) => {
    const { count } = await supabase
      .from("referrals")
      .select("*", { count: "exact", head: true })
      .eq("referrer_id", userId);
    return count || 0;
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
          <h1 className="text-3xl font-bold mb-2">Users Management</h1>
          <p className="text-muted-foreground">Manage all registered users and their KYC status</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalUsers}</div>
              <div className="text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">{stats.activeUsers}</div>
              <div className="text-muted-foreground">KYC Verified</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning mb-2">{stats.pendingKyc}</div>
              <div className="text-muted-foreground">Pending KYC</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-2">{stats.suspended}</div>
              <div className="text-muted-foreground">Suspended</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search users..." 
                  className="w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.first_name || "N/A"} {user.last_name || ""}
                      </TableCell>
                      <TableCell>{user.email || "N/A"}</TableCell>
                      <TableCell>{user.phone || "N/A"}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.kyc_verified 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {user.kyc_verified ? "Verified" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>{user.level || "Junior"}</TableCell>
                      <TableCell className="font-bold text-primary">
                        ₦{Number(user.total_earnings || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {!user.kyc_verified && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleApproveKyc(user.user_id, `${user.first_name} ${user.last_name}`)}
                            >
                              <CheckCircle className="w-4 h-4 text-success" />
                            </Button>
                          )}
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

export default Users;
