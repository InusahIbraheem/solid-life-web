import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Upload, Image } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import productCocoa from "@/assets/product-cocoa-1.jpg";
import productPhyto from "@/assets/product-phyto.jpg";
import productGreenTea from "@/assets/product-green-tea.jpg";
import productImmuneBooster from "@/assets/product-immune-booster.jpg";

const Products = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const products = [
    { 
      id: 1, 
      name: "Cocoa Power Juggernaut", 
      price: 15000, 
      points: 150, 
      stock: 450,
      sold: 2345,
      status: "Active",
      image: productCocoa
    },
    { 
      id: 2, 
      name: "Organic Anti-Ageing Product", 
      price: 18000, 
      points: 180, 
      stock: 320,
      sold: 1876,
      status: "Active",
      image: productPhyto
    },
    { 
      id: 3, 
      name: "Pure Organic Green Tea", 
      price: 12000, 
      points: 120, 
      stock: 280,
      sold: 1543,
      status: "Active",
      image: productGreenTea
    },
    { 
      id: 4, 
      name: "Immune Booster", 
      price: 14000, 
      points: 140, 
      stock: 200,
      sold: 890,
      status: "Active",
      image: productImmuneBooster
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleSave = () => {
    toast.success("Product saved successfully!");
    setShowAddForm(false);
  };

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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50 overflow-hidden">
                      {selectedImage ? (
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden"
                        id="product-image"
                      />
                      <Label htmlFor="product-image" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors w-fit">
                          <Upload className="w-4 h-4" />
                          Upload Image
                        </div>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₦)</Label>
                    <Input id="price" type="number" placeholder="15000" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" placeholder="150" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" placeholder="500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Product description..." rows={4} />
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={handleSave} className="gradient-primary text-white">
                    Save Product
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowAddForm(false); setSelectedImage(null); }}>
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
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-success mb-2">770</div>
              <div className="text-muted-foreground">In Stock</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">4,221</div>
              <div className="text-muted-foreground">Total Sold</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">₦69M</div>
              <div className="text-muted-foreground">Revenue</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Points</TableHead>
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
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-bold text-primary">₦{product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.points} pts</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Products;
