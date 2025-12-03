import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import productCocoa from "@/assets/product-cocoa-1.jpg";
import productPhyto from "@/assets/product-phyto.jpg";
import productGreenTea from "@/assets/product-green-tea.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Cocoa Power Juggernaut",
      description: "Premium cocoa blend with theobromine and phytoestrogens for enhanced vitality and wellness. Contains 12 cups per sachet.",
      price: 15000,
      points: 150,
      image: productCocoa,
      benefits: ["Enhanced sexual performance", "Boost immune system", "Improved cardiovascular health"]
    },
    {
      id: 2,
      name: "Organic Anti-Ageing Product",
      description: "100% natural phytochemicals for healthy immune system support and cellular rejuvenation. Packaged exclusively in sachets.",
      price: 18000,
      points: 180,
      image: productPhyto,
      benefits: ["Fight infections", "Antioxidant effect", "Boost immunity", "Promote healthy aging"]
    },
    {
      id: 3,
      name: "Pure Organic Green Tea Extra",
      description: "100% natural organic green tea for detoxification, weight management and overall wellness. High in antioxidants.",
      price: 12000,
      points: 120,
      image: productGreenTea,
      benefits: ["Detoxification", "Weight management", "High antioxidants", "Boost metabolism", "Improve brain function"]
    },
  ];

  const addToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Browse and purchase our wellness products</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="shadow-soft hover:shadow-elevated transition-all overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {product.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{product.points} points</div>
                  </div>
                  <Button onClick={() => addToCart(product.name)} className="gradient-primary text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Products;
