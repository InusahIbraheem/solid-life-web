import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, Award, Search, Eye, Ban, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Referrals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const referrals = [
    {
      id: 1,
      referrer: "John Doe",
      referrerId: "SL001",
      referred: "Mary Johnson",
      referredId: "SL045",
      date: "2024-01-15",
      level: 1,
      commission: 4500,
      status: "Active"
    },
    {
      id: 2,
      referrer: "John Doe",
      referrerId: "SL001",
      referred: "Peter Smith",
      referredId: "SL046",
      date: "2024-01-18",
      level: 1,
      commission: 4500,
      status: "Active"
    },
    {
      id: 3,
      referrer: "Mary Johnson",
      referrerId: "SL045",
      referred: "Grace Obi",
      referredId: "SL078",
      date: "2024-01-20",
      level: 2,
      commission: 3000,
      status: "Active"
    },
    {
      id: 4,
      referrer: "Peter Smith",
      referrerId: "SL046",
      referred: "David Eze",
      referredId: "SL089",
      date: "2024-01-22",
      level: 2,
      commission: 3000,
      status: "Pending"
    },
    {
      id: 5,
      referrer: "Grace Obi",
      referrerId: "SL078",
      referred: "Sarah Adamu",
      referredId: "SL102",
      date: "2024-01-25",
      level: 3,
      commission: 2250,
      status: "Active"
    },
  ];

  const topReferrers = [
    { name: "John Doe", id: "SL001", referrals: 45, earnings: 250000 },
    { name: "Mary Johnson", id: "SL045", referrals: 32, earnings: 180000 },
    { name: "Peter Smith", id: "SL046", referrals: 28, earnings: 145000 },
    { name: "Grace Obi", id: "SL078", referrals: 22, earnings: 98000 },
  ];

  const filteredReferrals = referrals.filter(
    (r) =>
      r.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referred.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referrerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referredId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id: number) => {
    toast.success("Referral approved successfully!");
  };

  const handleSuspend = (id: number) => {
    toast.success("Referral suspended!");
  };

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
                  <div className="text-3xl font-bold">1,234</div>
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
                  <div className="text-3xl font-bold">1,180</div>
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
                  <div className="text-3xl font-bold">₦4.2M</div>
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
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-muted-foreground text-sm">Levels Deep</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-soft">
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
                          <div className="font-medium">{referral.referrer}</div>
                          <div className="text-xs text-muted-foreground">{referral.referrerId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{referral.referred}</div>
                          <div className="text-xs text-muted-foreground">{referral.referredId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Level {referral.level}
                        </span>
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        ₦{referral.commission.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{referral.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            referral.status === "Active"
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
                          {referral.status === "Pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(referral.id)}
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4 text-success" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuspend(referral.id)}
                            title="Suspend"
                          >
                            <Ban className="w-4 h-4 text-destructive" />
                          </Button>
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
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                Top Referrers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topReferrers.map((referrer, index) => (
                  <div
                    key={referrer.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0
                          ? "bg-secondary"
                          : index === 1
                          ? "bg-primary/80"
                          : index === 2
                          ? "bg-primary/60"
                          : "bg-primary/40"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{referrer.name}</div>
                      <div className="text-xs text-muted-foreground">{referrer.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{referrer.referrals}</div>
                      <div className="text-xs text-muted-foreground">
                        ₦{referrer.earnings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Referrals;
