import { useState, useEffect } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Referrals = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [stats, setStats] = useState({
    directReferrals: 0,
    totalNetwork: 0,
    totalEarnings: 0,
  });

  const referralLink = `${window.location.origin}/signup?ref=${user?.id?.slice(0, 8)}`;

  useEffect(() => {
    if (user) {
      fetchReferrals();
    }
  }, [user]);

  const fetchReferrals = async () => {
    try {
      // Fetch referrals where current user is the referrer
      const { data, error } = await supabase
        .from("referrals")
        .select(`
          *,
          referred:profiles!referrals_referred_id_fkey (
            first_name,
            last_name,
            email,
            created_at
          )
        `)
        .eq("referrer_id", user?.id);

      if (error) throw error;

      // Get profile info for each referred user
      const referralsWithProfiles = await Promise.all(
        (data || []).map(async (ref) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name, email, created_at")
            .eq("user_id", ref.referred_id)
            .maybeSingle();
          
          return {
            ...ref,
            referredProfile: profile,
          };
        })
      );

      setReferrals(referralsWithProfiles);

      // Calculate stats
      const directReferrals = referralsWithProfiles.filter(r => r.level === 1).length;
      const totalNetwork = referralsWithProfiles.length;
      const totalEarnings = referralsWithProfiles.reduce((sum, r) => sum + Number(r.commission || 0), 0);

      setStats({ directReferrals, totalNetwork, totalEarnings });
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast.error("Failed to load referrals");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const shareWhatsApp = () => {
    const message = `Join Solid Life MLM and start earning! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
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
          <h1 className="text-3xl font-bold mb-2">My Referrals</h1>
          <p className="text-muted-foreground">Grow your network and earn commissions</p>
        </div>

        <Card className="shadow-soft border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={referralLink} readOnly className="font-mono text-sm" />
              <Button onClick={copyLink} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={shareWhatsApp} className="gradient-primary text-white flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share on WhatsApp
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share via Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{stats.directReferrals}</div>
              <div className="text-muted-foreground">Direct Referrals</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">{stats.totalNetwork}</div>
              <div className="text-muted-foreground">Total Network</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">₦{stats.totalEarnings.toLocaleString()}</div>
              <div className="text-muted-foreground">Referral Earnings</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Direct Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            {referrals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No referrals yet. Share your link to start earning!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">
                        {referral.referredProfile?.first_name || "N/A"} {referral.referredProfile?.last_name || ""}
                      </TableCell>
                      <TableCell>{referral.referredProfile?.email || "N/A"}</TableCell>
                      <TableCell>
                        {referral.referredProfile?.created_at 
                          ? new Date(referral.referredProfile.created_at).toLocaleDateString() 
                          : "N/A"}
                      </TableCell>
                      <TableCell>Level {referral.level || 1}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          referral.status === 'active' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {referral.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        ₦{Number(referral.commission || 0).toLocaleString()}
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

export default Referrals;
