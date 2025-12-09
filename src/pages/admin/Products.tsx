import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Upload, Image, Loader2 } from "lucide-react";
import { useState as useFormState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    points: "",
    stock: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      toast.error("Name and price are required");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("products")
        .insert({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          points: Number(formData.points) || 0,
          stock: Number(formData.stock) || 0,
          image_url: formData.image_url,
          status: "active",
        });

      if (error) throw error;

      toast.success("Product added successfully!");
      setShowAddForm(false);
      setFormData({ name: "", description: "", price: "", points: "", stock: "", image_url: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
  const totalRevenue = products.reduce((sum, p) => sum + ((p.sold || 0) * Number(p.price)), 0);

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products Management</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {showAddForm && (
          <Card className="shadow-soft border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input 
                      id="productName" 
                      placeholder="Enter product name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₦) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="12500" 
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">PV (Point Value)</Label>
                    <Input 
                      id="points" 
                      type="number" 
                      placeholder="15" 
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input 
                      id="stock" 
                      type="number" 
                      placeholder="500" 
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    placeholder="https://example.com/image.jpg" 
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Product description..." 
                    rows={4} 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving} className="gradient-primary text-white">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Save Product
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
              <div className="text-3xl font-bold text-primary mb-2">{totalProducts}</div>
              <div className="text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">{totalStock.toLocaleString()}</div>
              <div className="text-muted-foreground">In Stock</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">{totalSold.toLocaleString()}</div>
              <div className="text-muted-foreground">Total Sold</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">₦{(totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-muted-foreground">Revenue</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No products yet. Add your first product above!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>PV</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Sold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="font-bold text-primary">₦{Number(product.price).toLocaleString()}</TableCell>
                      <TableCell>{product.points || 0} PV</TableCell>
                      <TableCell>{product.stock || 0}</TableCell>
                      <TableCell>{product.sold || 0}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.status === 'active' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Products;
