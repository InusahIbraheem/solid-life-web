import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Wallet, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileData) setProfile(profileData);

        // Fetch referrals
        const { data: referralsData } = await supabase
          .from("referrals")
          .select("*")
          .eq("referrer_id", user.id);

        if (referralsData) setReferrals(referralsData);

        // Fetch recent transactions
        const { data: transactionsData } = await supabase
          .from("wallet_transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (transactionsData) setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    {
      title: "Total Earnings",
      value: profile ? `₦${Number(profile.total_earnings || 0).toLocaleString()}` : "₦0",
      change: "+0%",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Direct Referrals",
      value: referrals.filter(r => r.level === 1).length.toString(),
      change: "Active",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Wallet Balance",
      value: profile ? `₦${Number(profile.wallet_balance || 0).toLocaleString()}` : "₦0",
      change: "Available",
      icon: Wallet,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Current Level",
      value: profile?.level || "Junior",
      change: `${profile?.points || 0} PV`,
      icon: Award,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const networkLevels = [
    { level: "Level 1", count: referrals.filter(r => r.level === 1).length, percentage: "7%" },
    { level: "Level 2", count: referrals.filter(r => r.level === 2).length, percentage: "5%" },
    { level: "Level 3", count: referrals.filter(r => r.level === 3).length, percentage: "3%" },
  ];

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome{profile?.first_name ? `, ${profile.first_name}` : ""} to your Solid Life member portal
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-soft hover:shadow-elevated transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{stat.change}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">{transaction.description || transaction.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className={`font-bold ${Number(transaction.amount) >= 0 ? 'text-success' : 'text-muted-foreground'}`}>
                        {Number(transaction.amount) >= 0 ? '+' : ''}₦{Math.abs(Number(transaction.amount)).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Network Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkLevels.map((level) => (
                  <div key={level.level} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{level.level}</div>
                      <div className="text-sm text-muted-foreground">{level.count} members</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{level.percentage}</div>
                      <div className="text-xs text-muted-foreground">Commission Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
