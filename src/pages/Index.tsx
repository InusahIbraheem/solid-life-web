import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, TrendingUp, Award, Shield, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-image.jpg";
import productCocoa from "@/assets/product-cocoa-1.jpg";
import productPhyto from "@/assets/product-phyto.jpg";
import productGreenTea from "@/assets/product-green-tea.jpg";
import productImmuneBooster from "@/assets/product-immune-booster.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Solid Life" className="h-12 w-12" />
            <span className="text-2xl font-bold text-primary">Solid Life</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#compensation" className="hover:text-primary transition-colors">Compensation</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="gradient-primary text-white">Join Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Build Your Financial Freedom with <span className="text-gradient">Solid Life</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Join Africa's fastest-growing wellness MLM network. Earn unlimited income while promoting natural health products that change lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-foreground text-lg px-8 h-14 shadow-elevated">
                    Get Started Now <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg h-14">
                  Watch Video
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-secondary">50K+</div>
                  <div className="text-white/80">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">₦2B+</div>
                  <div className="text-white/80">Paid Out</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">10</div>
                  <div className="text-white/80">Levels Deep</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img src={heroImage} alt="Success Story" className="relative rounded-2xl shadow-elevated w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Solid Life?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine premium wellness products with a proven compensation plan to help you achieve financial independence.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-primary transition-all shadow-soft hover:shadow-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Strong Network</h3>
                <p className="text-muted-foreground">Build a powerful downline with our proven system</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-all shadow-soft hover:shadow-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">High Earnings</h3>
                <p className="text-muted-foreground">Earn up to 30% commission on 10 levels</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-all shadow-soft hover:shadow-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-muted-foreground">100% natural wellness products that sell themselves</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-all shadow-soft hover:shadow-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trusted Platform</h3>
                <p className="text-muted-foreground">Licensed and regulated MLM company</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start earning in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-elevated">1</div>
              <h3 className="text-2xl font-bold mb-3">Sign Up</h3>
              <p className="text-muted-foreground">Create your free account and get your unique referral link</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-elevated">2</div>
              <h3 className="text-2xl font-bold mb-3">Share & Sell</h3>
              <p className="text-muted-foreground">Share products and invite others to join your network</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-elevated">3</div>
              <h3 className="text-2xl font-bold mb-3">Earn & Grow</h3>
              <p className="text-muted-foreground">Watch your earnings grow as your network expands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Premium Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              100% natural wellness products that deliver real results
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="overflow-hidden hover:shadow-elevated transition-all">
              <div className="aspect-square overflow-hidden">
                <img src={productCocoa} alt="Cocoa Power Juggernaut" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Cocoa Power Juggernaut</h3>
                <p className="text-muted-foreground mb-4 text-sm">Premium cocoa blend with phytoestrogens for enhanced vitality</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">₦15,000</span>
                  <Button size="sm">Learn More</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-elevated transition-all">
              <div className="aspect-square overflow-hidden">
                <img src={productPhyto} alt="Phytochemicals & Anti-Ageing" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Organic Anti-Ageing Product</h3>
                <p className="text-muted-foreground mb-4 text-sm">Natural phytochemicals for healthy immune system</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">₦18,000</span>
                  <Button size="sm">Learn More</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-elevated transition-all">
              <div className="aspect-square overflow-hidden">
                <img src={productGreenTea} alt="Pure Organic Green Tea" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Pure Organic Green Tea</h3>
                <p className="text-muted-foreground mb-4 text-sm">100% natural green tea for detox and weight management</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">₦12,000</span>
                  <Button size="sm">Learn More</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-elevated transition-all">
              <div className="aspect-square overflow-hidden">
                <img src={productImmuneBooster} alt="Immune Booster" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Immune Booster</h3>
                <p className="text-muted-foreground mb-4 text-sm">Natural immune system support for overall wellness</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">₦14,000</span>
                  <Button size="sm">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compensation Plan */}
      <section id="compensation" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SolidLife Marketing Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Business Reward Program for Builders - 8 Different Earnings in SolidLife
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 shadow-elevated">
              <div className="mb-6 p-4 bg-primary/10 rounded-lg text-center">
                <div className="text-lg font-semibold text-primary">Registration Fee</div>
                <div className="text-3xl font-bold text-secondary">₦15,000</div>
                <div className="text-sm text-muted-foreground">Benefits: Sample Products for taste</div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-primary mb-4">Main Bonuses</h4>
                  {[
                    { label: "Retail Profit", value: "20%" },
                    { label: "Sponsor Bonus", value: "33%" },
                    { label: "Personal Purchase Bonus", value: "10%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xl font-bold text-secondary">{item.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-primary mb-4">Level Bonuses</h4>
                  {[
                    { label: "1st Level Bonus", value: "7%" },
                    { label: "2nd Level Bonus", value: "5%" },
                    { label: "3rd Level Bonus", value: "3%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xl font-bold text-secondary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h4 className="font-bold text-lg mb-4">Achievement Bonuses</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Achievement Bonus", value: "5%" },
                    { label: "Emerald Rank Achievement", value: "5%" },
                    { label: "Gold Achievement Bonus", value: "4%" },
                    { label: "Diamond 1 Achievement", value: "3%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-lg font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Note: Rank Achievement Bonus is based on ₦420 per PV
                </p>
              </div>

              <div className="mt-6 grid md:grid-cols-4 gap-4">
                {[
                  { icon: Award, label: "Car Fund at Diamond Stage" },
                  { icon: TrendingUp, label: "Financial Freedom" },
                  { icon: Users, label: "SolidLife Experience" },
                  { icon: Shield, label: "Travel the World" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center p-4 bg-primary/5 rounded-lg text-center">
                    <item.icon className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real people achieving real financial freedom
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-soft">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial1} alt="Success Story" className="w-20 h-20 rounded-full object-cover border-4 border-primary" />
                  <div>
                    <h4 className="font-bold text-lg">Team Leader</h4>
                    <div className="text-muted-foreground">Lagos, Nigeria</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Solid Life changed my life! I started with zero network marketing experience, and now I earn more than my previous job. The products sell themselves!"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial2} alt="Success Story" className="w-20 h-20 rounded-full object-cover border-4 border-primary" />
                  <div>
                    <h4 className="font-bold text-lg">Regional Manager</h4>
                    <div className="text-muted-foreground">Abuja, Nigeria</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The compensation plan is the best I've seen. I earn from 10 levels, and my network keeps growing. Financial freedom is real with Solid Life!"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of successful entrepreneurs building wealth with Solid Life
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-foreground text-lg px-12 h-14 shadow-elevated">
              Join Now - It's Free! <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Solid Life" className="h-10 w-10" />
                <span className="text-xl font-bold text-primary">Solid Life</span>
              </div>
              <p className="text-muted-foreground">
                Building financial freedom through natural wellness products and proven MLM systems.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
                <li><a href="#compensation" className="hover:text-primary transition-colors">Compensation</a></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>info@solidlife.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>+234 816 608 4650</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Umuozu Ezumoha Autonomous Community, Isiala Mbano LGA, Imo State, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Solid Life MLM Nigeria Ltd. RC: 7329402. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
