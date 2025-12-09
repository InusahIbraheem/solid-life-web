import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, Award, Search, Eye, Ban, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Referrals = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [referrals, setReferrals] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalCommissions: 0,
  });

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get profile info for referrers and referred
      const referralsWithProfiles = await Promise.all(
        (data || []).map(async (ref) => {
          const { data: referrerProfile } = await supabase
            .from("profiles")
            .select("first_name, last_name, email")
            .eq("user_id", ref.referrer_id)
            .maybeSingle();
          
          const { data: referredProfile } = await supabase
            .from("profiles")
            .select("first_name, last_name, email")
            .eq("user_id", ref.referred_id)
            .maybeSingle();

          return {
            ...ref,
            referrer: referrerProfile,
            referred: referredProfile,
          };
        })
      );

      setReferrals(referralsWithProfiles);

      // Calculate stats
      const total = referralsWithProfiles.length;
      const active = referralsWithProfiles.filter(r => r.status === "active").length;
      const commissions = referralsWithProfiles.reduce((sum, r) => sum + Number(r.commission || 0), 0);

      setStats({
        totalReferrals: total,
        activeReferrals: active,
        totalCommissions: commissions,
      });
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast.error("Failed to load referrals");
    } finally {
      setLoading(false);
    }
  };

  const filteredReferrals = referrals.filter((r) => {
    const referrerName = `${r.referrer?.first_name || ""} ${r.referrer?.last_name || ""}`.toLowerCase();
    const referredName = `${r.referred?.first_name || ""} ${r.referred?.last_name || ""}`.toLowerCase();
    return referrerName.includes(searchTerm.toLowerCase()) || 
           referredName.includes(searchTerm.toLowerCase());
  });

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
          <h1 className="text-3xl font-bold mb-2">Referral Manager</h1>
          <p className="text-muted-foreground">Monitor and manage all referral activities</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.totalReferrals}</div>
                  <div className="text-muted-foreground text-sm">Total Referrals</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.activeReferrals}</div>
                  <div className="text-muted-foreground text-sm">Active Referrals</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">₦{stats.totalCommissions.toLocaleString()}</div>
                  <div className="text-muted-foreground text-sm">Commissions Paid</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-muted-foreground text-sm">Levels Deep</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Referrals</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredReferrals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No referrals found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Referred</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {referral.referrer?.first_name || "N/A"} {referral.referrer?.last_name || ""}
                          </div>
                          <div className="text-xs text-muted-foreground">{referral.referrer?.email || ""}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {referral.referred?.first_name || "N/A"} {referral.referred?.last_name || ""}
                          </div>
                          <div className="text-xs text-muted-foreground">{referral.referred?.email || ""}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Level {referral.level || 1}
                        </span>
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        ₦{Number(referral.commission || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            referral.status === "active"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {referral.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" title="View Details">
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

export default Referrals;
