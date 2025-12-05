import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import productCocoa from "@/assets/product-cocoa-1.jpg";
import productPhyto from "@/assets/product-phyto.jpg";
import productGreenTea from "@/assets/product-green-tea.jpg";
import productLemonPlus from "@/assets/product-lemon-plus.jpg";
import productDateSyrup from "@/assets/product-date-syrup.jpg";
import productCocoaDate from "@/assets/product-cocoa-date.jpg";
import productCoffeeMomentum from "@/assets/product-coffee-momentum.jpg";
import productNaturesFiber from "@/assets/product-natures-fiber.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Phyto Power (42 Sachets)",
      description: "100% natural phytochemicals for healthy immune system support and cellular rejuvenation. 42 sachets per pack.",
      price: 12500,
      points: 15,
      image: productPhyto,
      benefits: ["Fight infections", "Antioxidant effect", "Boost immunity", "Promote healthy aging"]
    },
    {
      id: 2,
      name: "Green Tea (42 Sachets)",
      description: "100% natural organic green tea for detoxification, weight management and overall wellness. 42 sachets per pack.",
      price: 12500,
      points: 15,
      image: productGreenTea,
      benefits: ["Detoxification", "Weight management", "High antioxidants", "Boost metabolism"]
    },
    {
      id: 3,
      name: "Lemon Plus (42 Sachets)",
      description: "Natural lemon-based wellness drink for immune support and detoxification. 42 sachets per pack.",
      price: 12500,
      points: 15,
      image: productLemonPlus,
      benefits: ["Immune support", "Detoxification", "Vitamin C boost", "Refreshing taste"]
    },
    {
      id: 4,
      name: "Date Syrup (500ml)",
      description: "Premium natural date syrup - a healthy sweetener alternative packed with nutrients. 500ml bottle.",
      price: 8250,
      points: 10,
      image: productDateSyrup,
      benefits: ["Natural sweetener", "Rich in minerals", "Energy boost", "Digestive health"]
    },
    {
      id: 5,
      name: "Date Syrup (250ml)",
      description: "Premium natural date syrup - a healthy sweetener alternative packed with nutrients. 250ml bottle.",
      price: 4125,
      points: 5,
      image: productDateSyrup,
      benefits: ["Natural sweetener", "Rich in minerals", "Energy boost", "Digestive health"]
    },
    {
      id: 6,
      name: "Cocoa Date (10 Sachets)",
      description: "Delicious cocoa and date blend for energy and wellness. 10 sachets per pack.",
      price: 5500,
      points: 5,
      image: productCocoaDate,
      benefits: ["Natural energy", "Rich in antioxidants", "Heart health", "Mood enhancer"]
    },
    {
      id: 7,
      name: "Cocoa Power Juggernaut (10 Sachets)",
      description: "Premium cocoa blend with theobromine for enhanced vitality and wellness. 10 sachets per pack.",
      price: 5500,
      points: 5,
      image: productCocoa,
      benefits: ["Enhanced vitality", "Boost immune system", "Cardiovascular health", "Natural energy"]
    },
    {
      id: 8,
      name: "Coffee Momentum (10 Sachets)",
      description: "Premium wellness coffee blend for energy and focus. 10 sachets per pack.",
      price: 5500,
      points: 5,
      image: productCoffeeMomentum,
      benefits: ["Mental clarity", "Natural energy", "Metabolism boost", "Antioxidant rich"]
    },
    {
      id: 9,
      name: "Nature's Fiber (1kg)",
      description: "Natural dietary fiber supplement for digestive health and wellness. 1kg pack.",
      price: 6000,
      points: 5,
      image: productNaturesFiber,
      benefits: ["Digestive health", "Weight management", "Blood sugar support", "Colon cleanse"]
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
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
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
                    <div className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{product.points} PV</div>
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
