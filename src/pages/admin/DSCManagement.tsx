import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Search, TrendingUp, Calendar, FileDown, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/integrations/supabase/client";

const DSCManagement = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dscCenters, setDscCenters] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    center_number: "",
    operator_name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchDSCCenters();
  }, []);

  const fetchDSCCenters = async () => {
    try {
      const { data, error } = await supabase
        .from("dsc_centers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDscCenters(data || []);
    } catch (error) {
      console.error("Error fetching DSC centers:", error);
      toast.error("Failed to load DSC centers");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDSC = async () => {
    if (!formData.center_number || !formData.operator_name) {
      toast.error("Center number and operator name are required");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("dsc_centers")
        .insert({
          center_number: formData.center_number,
          operator_name: formData.operator_name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          phone: formData.phone,
          email: formData.email,
          status: "active",
        });

      if (error) throw error;

      toast.success("DSC Center added successfully!");
      setShowAddForm(false);
      setFormData({ center_number: "", operator_name: "", address: "", city: "", state: "", phone: "", email: "" });
      fetchDSCCenters();
    } catch (error) {
      console.error("Error adding DSC:", error);
      toast.error("Failed to add DSC center");
    } finally {
      setSaving(false);
    }
  };

  const filteredDSCs = dscCenters.filter(
    (dsc) =>
      dsc.operator_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dsc.center_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalRegistrations = dscCenters.reduce((sum, d) => sum + (d.registrations || 0), 0);
  const totalSales = dscCenters.reduce((sum, d) => sum + Number(d.product_sales || 0), 0);
  const totalCreditLine = dscCenters.reduce((sum, d) => sum + Number(d.credit_line || 0), 0);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34);
    doc.text("SolidLife MLM Nigeria Ltd", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Distributor Service Centres Report", 105, 30, { align: "center" });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 38, { align: "center" });

    autoTable(doc, {
      startY: 50,
      head: [["Centre No.", "Operator", "Location", "Phone", "Registrations", "Sales", "Credit Line"]],
      body: dscCenters.map((dsc) => [
        dsc.center_number,
        dsc.operator_name,
        `${dsc.address || ""}, ${dsc.city || ""}, ${dsc.state || ""}`,
        dsc.phone || "",
        (dsc.registrations || 0).toString(),
        `₦${Number(dsc.product_sales || 0).toLocaleString()}`,
        `₦${Number(dsc.credit_line || 0).toLocaleString()}`,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 139, 34] },
    });

    doc.save(`DSC_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("DSC Report exported as PDF");
  };

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
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add DSC
            </Button>
          </div>
        </div>

        {showAddForm && (
          <Card className="shadow-soft border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Add New DSC Center</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddDSC(); }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Center Number *</Label>
                    <Input 
                      placeholder="DSC-001" 
                      value={formData.center_number}
                      onChange={(e) => setFormData({ ...formData, center_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Operator Name *</Label>
                    <Input 
                      placeholder="John Doe" 
                      value={formData.operator_name}
                      onChange={(e) => setFormData({ ...formData, operator_name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input 
                    placeholder="Full address" 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input 
                      placeholder="City" 
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input 
                      placeholder="State" 
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      placeholder="+234 xxx xxx xxxx" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      placeholder="email@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Add DSC Center
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{dscCenters.length}</div>
                  <div className="text-muted-foreground text-sm">Total DSCs</div>
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
                  <div className="text-3xl font-bold">{totalRegistrations}</div>
                  <div className="text-muted-foreground text-sm">Registrations</div>
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
                  <div className="text-3xl font-bold">₦{(totalSales / 1000000).toFixed(1)}M</div>
                  <div className="text-muted-foreground text-sm">Product Sales</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <div className="text-3xl font-bold">₦{totalCreditLine.toLocaleString()}</div>
                  <div className="text-muted-foreground text-sm">Credit Line</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Distributor Service Centres ({filteredDSCs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredDSCs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No DSC centers found. Add your first center above!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Centre No.</TableHead>
                      <TableHead>Name / Operator</TableHead>
                      <TableHead>Location & Contact</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Product Sales</TableHead>
                      <TableHead>Credit Line</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDSCs.map((dsc) => (
                      <TableRow key={dsc.id}>
                        <TableCell className="font-medium">{dsc.center_number}</TableCell>
                        <TableCell>
                          <div className="font-semibold">{dsc.operator_name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{dsc.address}, {dsc.city}, {dsc.state}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            📞 {dsc.phone || "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ✉️ {dsc.email || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-success">{dsc.registrations || 0}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-primary">₦{Number(dsc.product_sales || 0).toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className={Number(dsc.credit_line || 0) === 0 ? "text-success" : "text-warning font-semibold"}>
                            ₦{Number(dsc.credit_line || 0).toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`flex items-center gap-1 text-sm ${
                            dsc.status === "active" ? "text-success" : "text-warning"
                          }`}>
                            {dsc.status === "active" ? (
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DSCManagement;
