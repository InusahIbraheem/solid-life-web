import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, ShoppingBag, DollarSign, TrendingUp, Search, FileText, Printer, Building2, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [distributorSearch, setDistributorSearch] = useState("");

  const stats = [
    {
      title: "Total Users",
      value: "5,234",
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Sales",
      value: "₦12.5M",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Products Sold",
      value: "8,456",
      change: "+15.3%",
      icon: ShoppingBag,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Active Members",
      value: "4,891",
      change: "+5.7%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const monthlyPerformance = {
    month: "December 2024",
    totalPayout: "₦8,750,000",
    vatDeductible: "₦656,250",
    newRegistrations: 234,
    productSales: "₦15,250,000",
    activeDistributors: 1892,
  };

  const yearlyPerformance = {
    year: "2024",
    totalPayout: "₦98,500,000",
    totalSales: "₦185,750,000",
    totalVAT: "₦7,387,500",
    newRegistrations: 2845,
    averageMonthlyGrowth: "8.5%",
  };

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-02-20", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-02-19", status: "Pending KYC" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", joined: "2024-02-18", status: "Active" },
  ];

  const topSellers = [
    { name: "Cocoa Power Juggernaut", sold: 2345, revenue: "₦35.2M" },
    { name: "Phyto Power", sold: 1876, revenue: "₦33.8M" },
  ];

  // Mock DSC data
  const distributorServiceCentres = [
    {
      id: "DSC-001",
      name: "Lagos Central DSC",
      operator: "Chief Emmanuel Okafor",
      address: "15 Broad Street, Lagos Island, Lagos State",
      phone: "+234 803 456 7890",
      email: "lagos.central@solidlife.ng",
      monthlyRegistrations: 45,
      productSales: "₦2,450,000",
      creditLine: "₦350,000",
    },
    {
      id: "DSC-002",
      name: "Abuja Main DSC",
      operator: "Mrs. Amina Bello",
      address: "Plot 234 Wuse Zone 5, Abuja FCT",
      phone: "+234 806 789 0123",
      email: "abuja.main@solidlife.ng",
      monthlyRegistrations: 38,
      productSales: "₦1,890,000",
      creditLine: "₦180,000",
    },
    {
      id: "DSC-003",
      name: "Owerri Hub DSC",
      operator: "Dr. Chukwu Eze",
      address: "Umuozu Ezumoha, Isiala Mbano LGA, Imo State",
      phone: "+234 809 012 3456",
      email: "owerri.hub@solidlife.ng",
      monthlyRegistrations: 52,
      productSales: "₦3,120,000",
      creditLine: "₦0",
    },
  ];

  // Mock member report data
  const memberReports = [
    {
      id: "SL-00001",
      name: "Emmanuel Okafor",
      rank: "Diamond 1",
      personalVolume: { currency: "₦125,000", points: "150 PV" },
      teamVolume: { currency: "₦1,250,000", points: "1,500 PV" },
      directReferrals: 12,
      downlines: [
        { id: "SL-00015", name: "Ada Johnson", rank: "Gold", volume: { currency: "₦85,000", points: "100 PV" }, referrals: 5 },
        { id: "SL-00023", name: "Chidi Nwachukwu", rank: "Emerald", volume: { currency: "₦62,000", points: "75 PV" }, referrals: 3 },
      ],
    },
  ];

  const handleSearch = () => {
    if (!distributorSearch.trim()) {
      toast.error("Please enter a name or ID to search");
      return;
    }
    toast.info(`Searching for distributor: ${distributorSearch}`);
  };

  const handleGenerateReport = () => {
    toast.success("Generating printable monthly report...");
    // In production, this would generate a PDF report
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your MLM platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-soft hover:shadow-elevated transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-success">{stat.change}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Performance Overview */}
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Monthly Performance Overview - {monthlyPerformance.month}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{monthlyPerformance.totalPayout}</div>
                <div className="text-sm text-muted-foreground">Total Payout</div>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-destructive">{monthlyPerformance.vatDeductible}</div>
                <div className="text-sm text-muted-foreground">VAT Deductible</div>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">{monthlyPerformance.productSales}</div>
                <div className="text-sm text-muted-foreground">Product Sales</div>
              </div>
              <div className="p-4 bg-success/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-success">{monthlyPerformance.newRegistrations}</div>
                <div className="text-sm text-muted-foreground">New Registrations</div>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent">{monthlyPerformance.activeDistributors}</div>
                <div className="text-sm text-muted-foreground">Active Distributors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Performance Overview */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Yearly Performance Overview - {yearlyPerformance.year}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">{yearlyPerformance.totalPayout}</div>
                <div className="text-xs text-muted-foreground">Total Payout</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">{yearlyPerformance.totalSales}</div>
                <div className="text-xs text-muted-foreground">Total Sales</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">{yearlyPerformance.totalVAT}</div>
                <div className="text-xs text-muted-foreground">Total VAT</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">{yearlyPerformance.newRegistrations}</div>
                <div className="text-xs text-muted-foreground">Registrations</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center col-span-2">
                <div className="text-xl font-bold text-success">{yearlyPerformance.averageMonthlyGrowth}</div>
                <div className="text-xs text-muted-foreground">Avg Monthly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distributor Search */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Distributor Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Search by Name or ID No..."
                value={distributorSearch}
                onChange={(e) => setDistributorSearch(e.target.value)}
                className="max-w-md"
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Business Report Generator */}
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Monthly Business Reports
            </CardTitle>
            <Button onClick={handleGenerateReport}>
              <Printer className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Generate printable monthly business reports showing member performance, referrals, and business volumes.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Ranking</TableHead>
                  <TableHead>Personal Volume (₦/PV)</TableHead>
                  <TableHead>Team Volume (₦/PV)</TableHead>
                  <TableHead>Referrals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberReports.map((member) => (
                  <>
                    <TableRow key={member.id} className="bg-primary/5">
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell className="font-semibold">{member.name}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {member.rank}
                        </span>
                      </TableCell>
                      <TableCell>{member.personalVolume.currency} / {member.personalVolume.points}</TableCell>
                      <TableCell>{member.teamVolume.currency} / {member.teamVolume.points}</TableCell>
                      <TableCell>{member.directReferrals}</TableCell>
                    </TableRow>
                    {member.downlines.map((downline) => (
                      <TableRow key={downline.id} className="text-sm">
                        <TableCell className="pl-8 text-muted-foreground">↳ {downline.id}</TableCell>
                        <TableCell>{downline.name}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                            {downline.rank}
                          </span>
                        </TableCell>
                        <TableCell>{downline.volume.currency} / {downline.volume.points}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>{downline.referrals}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Distributor Service Centres */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Independent Distributor Service Centres (DSC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Centre No.</TableHead>
                    <TableHead>Name / Operator</TableHead>
                    <TableHead>Location & Contact</TableHead>
                    <TableHead>Monthly Registrations</TableHead>
                    <TableHead>Product Sales</TableHead>
                    <TableHead>Credit Line</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distributorServiceCentres.map((dsc) => (
                    <TableRow key={dsc.id}>
                      <TableCell className="font-medium">{dsc.id}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{dsc.name}</div>
                        <div className="text-sm text-muted-foreground">{dsc.operator}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{dsc.address}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          📞 {dsc.phone} | ✉️ {dsc.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-success">{dsc.monthlyRegistrations}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-primary">{dsc.productSales}</span>
                      </TableCell>
                      <TableCell>
                        <span className={dsc.creditLine === "₦0" ? "text-success" : "text-warning font-semibold"}>
                          {dsc.creditLine}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Users & Top Sellers */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-xs text-muted-foreground">Joined: {user.joined}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellers.map((product, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.sold} units sold</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{product.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
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

export default Dashboard;
