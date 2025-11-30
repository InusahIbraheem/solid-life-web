import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Earnings = () => {
  const levelEarnings = [
    { level: 1, members: 23, commission: "30%", earned: 115000 },
    { level: 2, members: 89, commission: "20%", earned: 89000 },
    { level: 3, members: 234, commission: "15%", earned: 140400 },
    { level: 4, members: 456, commission: "10%", earned: 91200 },
    { level: 5, members: 678, commission: "8%", earned: 86400 },
  ];

  const recentCommissions = [
    { id: 1, from: "Alice Johnson", level: 1, product: "Cocoa Power", commission: "30%", amount: 4500, date: "2024-02-20" },
    { id: 2, from: "Bob Smith", level: 1, product: "Anti-Ageing", commission: "30%", amount: 5400, date: "2024-02-19" },
    { id: 3, from: "Carol White", level: 2, product: "Cocoa Power", commission: "20%", amount: 3000, date: "2024-02-18" },
    { id: 4, from: "David Brown", level: 2, product: "Anti-Ageing", commission: "20%", amount: 3600, date: "2024-02-17" },
  ];

  const totalEarned = levelEarnings.reduce((sum, level) => sum + level.earned, 0);

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
              <div className="text-3xl font-bold text-secondary mb-2">₦52,000</div>
              <div className="text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">₦12,500</div>
              <div className="text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">₦3,200</div>
              <div className="text-muted-foreground">Today</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Earnings by Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Total Earned</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {levelEarnings.map((level) => (
                  <TableRow key={level.level}>
                    <TableCell className="font-bold">Level {level.level}</TableCell>
                    <TableCell>{level.members} members</TableCell>
                    <TableCell className="font-semibold text-primary">{level.commission}</TableCell>
                    <TableCell className="font-bold text-primary">₦{level.earned.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${(level.earned / totalEarned) * 100}%` }}
                        ></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCommissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell className="font-medium">{commission.from}</TableCell>
                    <TableCell>Level {commission.level}</TableCell>
                    <TableCell>{commission.product}</TableCell>
                    <TableCell className="font-semibold text-primary">{commission.commission}</TableCell>
                    <TableCell className="font-bold text-success">+₦{commission.amount.toLocaleString()}</TableCell>
                    <TableCell>{commission.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Earnings;
