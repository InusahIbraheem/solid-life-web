import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const Referrals = () => {
  const referralLink = "https://solidlife.com/ref/JOHN123";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const shareWhatsApp = () => {
    const message = `Join Solid Life MLM and start earning! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const referrals = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", date: "2024-01-15", level: 1, status: "Active", earned: "₦45,000" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", date: "2024-01-20", level: 1, status: "Active", earned: "₦32,500" },
    { id: 3, name: "Carol White", email: "carol@example.com", date: "2024-02-05", level: 1, status: "Pending", earned: "₦0" },
    { id: 4, name: "David Brown", email: "david@example.com", date: "2024-02-10", level: 2, status: "Active", earned: "₦18,000" },
    { id: 5, name: "Eve Davis", email: "eve@example.com", date: "2024-02-15", level: 2, status: "Active", earned: "₦25,000" },
  ];

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
              <Input value={referralLink} readOnly className="font-mono" />
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
              <div className="text-3xl font-bold text-primary mb-2">23</div>
              <div className="text-muted-foreground">Direct Referrals</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">156</div>
              <div className="text-muted-foreground">Total Network</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">₦120,500</div>
              <div className="text-muted-foreground">Referral Earnings</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Direct Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Earned From</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.name}</TableCell>
                    <TableCell>{referral.email}</TableCell>
                    <TableCell>{referral.date}</TableCell>
                    <TableCell>Level {referral.level}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'Active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {referral.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-primary">{referral.earned}</TableCell>
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

export default Referrals;
