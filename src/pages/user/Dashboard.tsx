import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Wallet, Award } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Earnings",
      value: "₦450,000",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Direct Referrals",
      value: "23",
      change: "+3 this week",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Wallet Balance",
      value: "₦85,500",
      change: "Available",
      icon: Wallet,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Current Level",
      value: "Gold",
      change: "Level 5",
      icon: Award,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const recentActivity = [
    { action: "Commission earned", amount: "+₦12,500", time: "2 hours ago", type: "positive" },
    { action: "Product purchase", amount: "-₦15,000", time: "5 hours ago", type: "negative" },
    { action: "Referral bonus", amount: "+₦5,000", time: "1 day ago", type: "positive" },
    { action: "Level upgrade bonus", amount: "+₦25,000", time: "2 days ago", type: "positive" },
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your Solid Life member portal</p>
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
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                    <div className={`font-bold ${activity.type === 'positive' ? 'text-success' : 'text-muted-foreground'}`}>
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Network Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { level: "Level 1", count: 23, earnings: "₦115,000" },
                  { level: "Level 2", count: 89, earnings: "₦89,000" },
                  { level: "Level 3", count: 234, earnings: "₦140,400" },
                  { level: "Level 4", count: 456, earnings: "₦91,200" },
                ].map((level) => (
                  <div key={level.level} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{level.level}</div>
                      <div className="text-sm text-muted-foreground">{level.count} members</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{level.earnings}</div>
                      <div className="text-xs text-muted-foreground">Total earned</div>
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
