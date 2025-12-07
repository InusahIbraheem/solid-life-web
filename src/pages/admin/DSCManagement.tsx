import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Search, TrendingUp, Calendar, DollarSign, Users, FileDown, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DSCManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const monthlyPerformance = {
    month: "December 2024",
    totalPayout: "₦8,750,000",
    vatDeductible: "₦656,250",
    totalRegistrations: 135,
    totalProductSales: "₦7,460,000",
    totalCreditLine: "₦530,000",
    status: "On Track",
  };

  const yearlyPerformance = {
    year: "2024",
    totalPayout: "₦98,500,000",
    totalSales: "₦89,520,000",
    totalVAT: "₦7,387,500",
    totalRegistrations: 1620,
    status: "Exceeding Target",
  };

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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
    },
    {
      id: "DSC-004",
      name: "Port Harcourt DSC",
      operator: "Chief Ada Okwu",
      address: "24 Aba Road, GRA Phase 2, Port Harcourt, Rivers State",
      phone: "+234 805 123 4567",
      email: "portharcourt@solidlife.ng",
      monthlyRegistrations: 28,
      productSales: "₦1,540,000",
      creditLine: "₦0",
      status: "Active",
    },
    {
      id: "DSC-005",
      name: "Kano North DSC",
      operator: "Alhaji Musa Ibrahim",
      address: "12 Zaria Road, Nassarawa GRA, Kano State",
      phone: "+234 802 345 6789",
      email: "kano.north@solidlife.ng",
      monthlyRegistrations: 22,
      productSales: "₦980,000",
      creditLine: "₦120,000",
      status: "Under Review",
    },
  ];

  const filteredDSCs = distributorServiceCentres.filter(
    (dsc) =>
      dsc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dsc.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dsc.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34);
    doc.text("SolidLife MLM Nigeria Ltd", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Distributor Service Centres Report", 105, 30, { align: "center" });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 38, { align: "center" });

    // Monthly Performance Summary
    doc.setFontSize(12);
    doc.setTextColor(34, 139, 34);
    doc.text(`Monthly Performance - ${monthlyPerformance.month}`, 14, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Payout: ${monthlyPerformance.totalPayout}`, 14, 58);
    doc.text(`VAT Deductible: ${monthlyPerformance.vatDeductible}`, 14, 64);
    doc.text(`Total Registrations: ${monthlyPerformance.totalRegistrations}`, 100, 58);
    doc.text(`Total Product Sales: ${monthlyPerformance.totalProductSales}`, 100, 64);

    // DSC Table
    autoTable(doc, {
      startY: 75,
      head: [["Centre No.", "Name / Operator", "Location", "Phone", "Registrations", "Sales", "Credit Line"]],
      body: distributorServiceCentres.map((dsc) => [
        dsc.id,
        `${dsc.name}\n${dsc.operator}`,
        dsc.address,
        dsc.phone,
        dsc.monthlyRegistrations.toString(),
        dsc.productSales,
        dsc.creditLine,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 139, 34] },
      columnStyles: {
        1: { cellWidth: 35 },
        2: { cellWidth: 40 },
      },
    });

    doc.save(`DSC_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("DSC Report exported as PDF");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">DSC Management</h1>
            <p className="text-muted-foreground">Manage Independent Distributor Service Centres</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              <FileDown className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add DSC
            </Button>
          </div>
        </div>

        {/* Performance Status Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly Performance */}
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Performance - {monthlyPerformance.month}
              </CardTitle>
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <CheckCircle className="h-4 w-4" />
                {monthlyPerformance.status}
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-primary">{monthlyPerformance.totalPayout}</div>
                  <div className="text-xs text-muted-foreground">Total Payout</div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-destructive">{monthlyPerformance.vatDeductible}</div>
                  <div className="text-xs text-muted-foreground">VAT Deductible</div>
                </div>
                <div className="p-3 bg-success/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-success">{monthlyPerformance.totalRegistrations}</div>
                  <div className="text-xs text-muted-foreground">Registrations</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg text-center col-span-2 md:col-span-2">
                  <div className="text-lg font-bold text-secondary">{monthlyPerformance.totalProductSales}</div>
                  <div className="text-xs text-muted-foreground">Product Sales</div>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-warning">{monthlyPerformance.totalCreditLine}</div>
                  <div className="text-xs text-muted-foreground">Credit Line</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yearly Performance */}
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Yearly Performance - {yearlyPerformance.year}
              </CardTitle>
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <CheckCircle className="h-4 w-4" />
                {yearlyPerformance.status}
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-primary">{yearlyPerformance.totalPayout}</div>
                  <div className="text-xs text-muted-foreground">Total Payout</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-secondary">{yearlyPerformance.totalSales}</div>
                  <div className="text-xs text-muted-foreground">Total Sales</div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg text-center">
                  <div className="text-lg font-bold text-destructive">{yearlyPerformance.totalVAT}</div>
                  <div className="text-xs text-muted-foreground">Total VAT</div>
                </div>
                <div className="p-3 bg-success/10 rounded-lg text-center col-span-2 md:col-span-3">
                  <div className="text-lg font-bold text-success">{yearlyPerformance.totalRegistrations}</div>
                  <div className="text-xs text-muted-foreground">Total Registrations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by DSC name, operator, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DSC Table */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Independent Distributor Service Centres ({filteredDSCs.length})
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDSCs.map((dsc) => (
                    <TableRow key={dsc.id}>
                      <TableCell className="font-medium">{dsc.id}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{dsc.name}</div>
                        <div className="text-sm text-muted-foreground">{dsc.operator}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{dsc.address}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          📞 {dsc.phone}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ✉️ {dsc.email}
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
                      <TableCell>
                        <span className={`flex items-center gap-1 text-sm ${
                          dsc.status === "Active" ? "text-success" : "text-warning"
                        }`}>
                          {dsc.status === "Active" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          {dsc.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DSCManagement;
