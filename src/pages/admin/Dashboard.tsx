import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, ShoppingBag, DollarSign, TrendingUp, Search, FileText, FileDown, Building2, Calendar, CheckCircle, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  const [distributorSearch, setDistributorSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    productsSold: 0,
    activeMembers: 0,
  });
  const [profiles, setProfiles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [dscCenters, setDscCenters] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch profiles
      const { data: profilesData, count: profilesCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact" });
      
      if (profilesData) setProfiles(profilesData);

      // Fetch orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (ordersData) setOrders(ordersData);

      // Fetch DSC centers
      const { data: dscData } = await supabase
        .from("dsc_centers")
        .select("*");
      
      if (dscData) setDscCenters(dscData);

      // Fetch registrations
      const { data: regData } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (regData) setRegistrations(regData);

      // Calculate stats
      const totalSales = ordersData?.reduce((sum, order) => sum + Number(order.amount || 0), 0) || 0;
      const productsSold = ordersData?.reduce((sum, order) => sum + (order.quantity || 0), 0) || 0;
      const activeMembers = profilesData?.filter(p => p.kyc_verified)?.length || 0;

      setStats({
        totalUsers: profilesCount || 0,
        totalSales,
        productsSold,
        activeMembers,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Monthly performance calculations
  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const monthlyOrders = orders.filter(o => {
    const orderDate = new Date(o.created_at);
    const now = new Date();
    return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
  });
  const monthlyRegistrations = registrations.filter(r => {
    const regDate = new Date(r.created_at);
    const now = new Date();
    return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
  });

  const monthlyPerformance = {
    month: currentMonth,
    totalPayout: monthlyOrders.reduce((sum, o) => sum + Number(o.amount || 0) * 0.33, 0),
    vatDeductible: monthlyOrders.reduce((sum, o) => sum + Number(o.amount || 0) * 0.075, 0),
    newRegistrations: monthlyRegistrations.length,
    productSales: monthlyOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0),
    activeDistributors: profiles.filter(p => p.kyc_verified).length,
    status: monthlyOrders.length > 10 ? "On Track" : "Needs Attention",
  };

  const yearlyPerformance = {
    year: new Date().getFullYear().toString(),
    totalPayout: orders.reduce((sum, o) => sum + Number(o.amount || 0) * 0.33, 0),
    totalSales: orders.reduce((sum, o) => sum + Number(o.amount || 0), 0),
    totalVAT: orders.reduce((sum, o) => sum + Number(o.amount || 0) * 0.075, 0),
    newRegistrations: registrations.length,
    averageMonthlyGrowth: "8.5%",
    status: registrations.length > 50 ? "Exceeding Target" : "On Track",
  };

  const handleSearch = async () => {
    if (!distributorSearch.trim()) {
      toast.error("Please enter a name or ID to search");
      return;
    }
    
    const results = profiles.filter(p => 
      p.first_name?.toLowerCase().includes(distributorSearch.toLowerCase()) ||
      p.last_name?.toLowerCase().includes(distributorSearch.toLowerCase()) ||
      p.id?.includes(distributorSearch)
    );
    
    if (results.length > 0) {
      toast.success(`Found ${results.length} distributor(s)`);
    } else {
      toast.info("No distributors found");
    }
  };

  const handleGenerateReport = (memberId?: string) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const reportMonth = monthlyPerformance.month;

    const membersToReport = memberId 
      ? profiles.filter(m => m.id?.includes(memberId) || 
          `${m.first_name} ${m.last_name}`.toLowerCase().includes(memberId.toLowerCase()))
      : profiles;

    if (membersToReport.length === 0) {
      toast.error("No member found with that ID or name");
      return;
    }

    // Header
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34);
    doc.text("SolidLife MLM Nigeria Ltd", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Monthly Business Report", 105, 30, { align: "center" });
    doc.text(`Report Period: ${reportMonth}`, 105, 38, { align: "center" });
    doc.text(`Generated: ${currentDate}`, 105, 46, { align: "center" });

    let yPosition = 60;

    membersToReport.forEach((member, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(34, 139, 34);
      doc.text(`Member: ${member.first_name || ''} ${member.last_name || ''} (${member.id?.slice(0, 8) || 'N/A'})`, 14, yPosition);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Rank: ${member.level || 'Junior'}`, 14, yPosition + 7);
      doc.text(`Points: ${member.points || 0} PV`, 14, yPosition + 14);
      doc.text(`Total Earnings: ₦${Number(member.total_earnings || 0).toLocaleString()}`, 14, yPosition + 21);

      yPosition += 35;

      if (index < membersToReport.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(14, yPosition - 5, 196, yPosition - 5);
      }
    });

    doc.save(`Business_Report_${reportMonth.replace(" ", "_")}.pdf`);
    toast.success("Monthly business report exported as PDF");
  };

  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "up",
    },
    {
      title: "Total Sales",
      value: `₦${stats.totalSales.toLocaleString()}`,
      change: "+8.2%",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "up",
    },
    {
      title: "Products Sold",
      value: stats.productsSold.toLocaleString(),
      change: "+15.3%",
      icon: ShoppingBag,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      trend: "up",
    },
    {
      title: "Active Members",
      value: stats.activeMembers.toLocaleString(),
      change: "+5.7%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "up",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your MLM platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="shadow-soft hover:shadow-elevated transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {stat.change}
                  </span>
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
            <span className={`flex items-center gap-1 text-sm font-medium ${monthlyPerformance.status === 'On Track' ? 'text-success' : 'text-warning'}`}>
              {monthlyPerformance.status === 'On Track' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {monthlyPerformance.status}
            </span>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">₦{monthlyPerformance.totalPayout.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Payout</div>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-destructive">₦{monthlyPerformance.vatDeductible.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">VAT Deductible</div>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">₦{monthlyPerformance.productSales.toLocaleString()}</div>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Yearly Performance Overview - {yearlyPerformance.year}
            </CardTitle>
            <span className="flex items-center gap-1 text-sm font-medium text-success">
              <CheckCircle className="h-4 w-4" />
              {yearlyPerformance.status}
            </span>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">₦{yearlyPerformance.totalPayout.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Payout</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">₦{yearlyPerformance.totalSales.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Sales</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xl font-bold">₦{yearlyPerformance.totalVAT.toLocaleString()}</div>
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
            <div className="flex gap-2">
              <Input
                placeholder="Member ID or Name (optional)"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-48"
              />
              <Button onClick={() => handleGenerateReport(selectedMember || undefined)}>
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
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
                  <TableHead>Points (PV)</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.slice(0, 10).map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.id?.slice(0, 8) || 'N/A'}</TableCell>
                    <TableCell>{profile.first_name || ''} {profile.last_name || ''}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {profile.level || 'Junior'}
                      </span>
                    </TableCell>
                    <TableCell>{profile.points || 0} PV</TableCell>
                    <TableCell>₦{Number(profile.total_earnings || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${profile.kyc_verified ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {profile.kyc_verified ? 'Verified' : 'Pending'}
                      </span>
                    </TableCell>
                  </TableRow>
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
            {dscCenters.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Centre No.</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Credit Line</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dscCenters.map((dsc) => (
                      <TableRow key={dsc.id}>
                        <TableCell className="font-medium">{dsc.center_number}</TableCell>
                        <TableCell>{dsc.operator_name}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm">{dsc.address}</div>
                          <div className="text-xs text-muted-foreground">{dsc.city}, {dsc.state}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{dsc.phone}</div>
                          <div className="text-xs text-muted-foreground">{dsc.email}</div>
                        </TableCell>
                        <TableCell>{dsc.registrations || 0}</TableCell>
                        <TableCell>₦{Number(dsc.product_sales || 0).toLocaleString()}</TableCell>
                        <TableCell className={Number(dsc.credit_line || 0) > 0 ? 'text-destructive' : ''}>
                          ₦{Number(dsc.credit_line || 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No DSC centres registered yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
