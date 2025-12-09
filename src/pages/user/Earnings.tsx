import { useState, useEffect } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Earnings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [commissions, setCommissions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchEarningsData();
    }
  }, [user]);

  const fetchEarningsData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch commission transactions
      const { data: txns } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("user_id", user?.id)
        .in("type", ["commission", "bonus", "referral"])
        .order("created_at", { ascending: false })
        .limit(20);

      setCommissions(txns || []);
    } catch (error) {
      console.error("Error fetching earnings:", error);
      toast.error("Failed to load earnings data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate level earnings from referrals
  const levelEarnings = [
    { level: 1, members: 0, commission: "7%", earned: 0 },
    { level: 2, members: 0, commission: "5%", earned: 0 },
    { level: 3, members: 0, commission: "3%", earned: 0 },
  ];

  const totalEarned = Number(profile?.total_earnings || 0);

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
          <h1 className="text-3xl font-bold mb-2">Earnings & Commissions</h1>
          <p className="text-muted-foreground">Track your income from all levels</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">₦{totalEarned.toLocaleString()}</div>
              <div className="text-muted-foreground">Total Earnings</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">₦{Number(profile?.wallet_balance || 0).toLocaleString()}</div>
              <div className="text-muted-foreground">Wallet Balance</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">{profile?.points || 0}</div>
              <div className="text-muted-foreground">Total PV</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">{profile?.level || "Junior"}</div>
              <div className="text-muted-foreground">Current Rank</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Commission Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
                <div className="font-bold text-primary text-lg">Retail Profit</div>
                <div className="text-2xl font-bold">20%</div>
                <div className="text-sm text-muted-foreground">On product sales</div>
              </div>
              <div className="p-4 rounded-lg border bg-secondary/5 border-secondary/20">
                <div className="font-bold text-secondary text-lg">Sponsor Bonus</div>
                <div className="text-2xl font-bold">33%</div>
                <div className="text-sm text-muted-foreground">For direct sponsorship</div>
              </div>
              <div className="p-4 rounded-lg border bg-success/5 border-success/20">
                <div className="font-bold text-success text-lg">Personal Purchase</div>
                <div className="text-2xl font-bold">10%</div>
                <div className="text-sm text-muted-foreground">On your own purchases</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg">1st Level</div>
                <div className="text-2xl font-bold text-primary">7%</div>
                <div className="text-sm text-muted-foreground">Commission</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg">2nd Level</div>
                <div className="text-2xl font-bold text-primary">5%</div>
                <div className="text-sm text-muted-foreground">Commission</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg">3rd Level</div>
                <div className="text-2xl font-bold text-primary">3%</div>
                <div className="text-sm text-muted-foreground">Commission</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            {commissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No commissions yet. Start referring and selling to earn!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.description}</TableCell>
                      <TableCell className="capitalize">{commission.type}</TableCell>
                      <TableCell className="font-bold text-success">+₦{Number(commission.amount).toLocaleString()}</TableCell>
                      <TableCell>{new Date(commission.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          commission.status === 'completed' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {commission.status}
                        </span>
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

export default Earnings;
