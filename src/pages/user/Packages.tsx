import { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Crown, Star, Award, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { PaymentProofUpload } from "@/components/PaymentProofUpload";
import { toast } from "sonner";

const packages = [
  {
    id: "member",
    name: "Member Package",
    price: 15000,
    icon: CheckCircle2,
    color: "text-primary",
    borderColor: "border-primary/20",
    bgColor: "bg-primary/5",
    features: [
      "SolidLife products worth ₦5,000",
      "No PV attached",
      "Lifetime membership",
      "Renewal: at least 50 PV yearly",
    ],
    pv: 0,
    cashBonus: 0,
    freeProducts: 0,
  },
  {
    id: "business",
    name: "Business Package",
    price: 190000,
    icon: Star,
    color: "text-secondary",
    borderColor: "border-secondary/20",
    bgColor: "bg-secondary/5",
    features: [
      "Selected products worth ₦190,000",
      "Additional free products worth 10% (₦19,000)",
      "200 PV",
      "10% Cash Bonus (₦19,000)",
    ],
    pv: 200,
    cashBonus: 19000,
    freeProducts: 19000,
  },
  {
    id: "vip1",
    name: "VIP 1 Package",
    price: 890000,
    icon: Crown,
    color: "text-warning",
    borderColor: "border-warning/20",
    bgColor: "bg-warning/5",
    features: [
      "Selected products worth ₦890,000",
      "10% additional free products (₦89,000)",
      "10% Cash Bonus (₦89,000)",
      "Personal Emerald Rank Achievement",
      "Achievement Bonus: 5% of total sales",
      "PV is cumulative",
      "2% of products sold within Local Government",
    ],
    pv: 0,
    cashBonus: 89000,
    freeProducts: 89000,
  },
  {
    id: "vip2",
    name: "VIP 2 - Zonal Office",
    price: 2275000,
    icon: Award,
    color: "text-accent",
    borderColor: "border-accent/20",
    bgColor: "bg-accent/5",
    features: [
      "Selected products worth ₦2,275,000",
      "Free products worth 10% (₦227,500)",
      "Cash Bonus: ₦246,000",
      "2% of members purchase from the zone",
      "Zonal Office privileges",
    ],
    pv: 0,
    cashBonus: 246000,
    freeProducts: 227500,
  },
];

const Packages = () => {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpgrade = async () => {
    if (!user || !selectedPackage) return;
    if (!paymentProofUrl) {
      toast.error("Please upload proof of payment");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create registration for package upgrade
      const { error: regError } = await supabase.from("registrations").insert({
        user_id: user.id,
        amount: selectedPackage.price,
        payment_proof_url: paymentProofUrl,
        payment_status: "pending",
      });
      if (regError) throw regError;

      toast.success(`${selectedPackage.name} upgrade request submitted! Awaiting verification.`);
      setSelectedPackage(null);
      setPaymentProofUrl("");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit upgrade");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Registration Packages</h1>
          <p className="text-muted-foreground">Choose a package to upgrade your membership</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`shadow-soft border-2 ${pkg.borderColor} hover:shadow-elevated transition-all`}>
              <CardHeader className={`${pkg.bgColor} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <pkg.icon className={`w-8 h-8 ${pkg.color}`} />
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  </div>
                  {pkg.id === "member" && <Badge variant="secondary">Default</Badge>}
                </div>
                <div className="text-3xl font-bold mt-2">₦{pkg.price.toLocaleString()}</div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {pkg.cashBonus > 0 && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20 mb-4">
                    <span className="text-sm font-semibold text-success">
                      💰 Cash Bonus: ₦{pkg.cashBonus.toLocaleString()}
                    </span>
                  </div>
                )}

                <Button
                  className="w-full gradient-primary text-white"
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setPaymentProofUrl("");
                  }}
                >
                  {pkg.id === "member" ? "Register" : "Upgrade to " + pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Incentives Info */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Bonus & Incentives Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg mb-1">Personal Purchase</div>
                <div className="text-2xl font-bold text-primary">10%</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg mb-1">1st Level Bonus</div>
                <div className="text-2xl font-bold text-primary">7%</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg mb-1">2nd Level Bonus</div>
                <div className="text-2xl font-bold text-primary">5%</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg mb-1">3rd Level Bonus</div>
                <div className="text-2xl font-bold text-primary">3%</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg mb-1">Achievement Bonus</div>
                <div className="text-2xl font-bold text-secondary">5%</div>
                <div className="text-xs text-muted-foreground">of group total sales</div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="font-bold text-lg mb-1">Rank Achievements</div>
                <div className="text-sm space-y-1">
                  <div>Silver: <span className="font-bold">5%</span></div>
                  <div>Gold: <span className="font-bold">4%</span></div>
                  <div>Diamond 1: <span className="font-bold">3%</span></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <h4 className="font-bold mb-2">Additional Incentives</h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div>🏆 Achievement Bonus</div>
                <div>🎖️ Rank Bonus</div>
                <div>✈️ Trip Qualifying</div>
                <div>🏕️ LTBC (Leadership Team Building Camp)</div>
                <div>🚗 Car Fund</div>
                <div>🍽️ Food Incentives</div>
                <div>🏠 House Fund</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Dialog */}
        <Dialog open={!!selectedPackage} onOpenChange={(open) => !open && setSelectedPackage(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedPackage?.name}</DialogTitle>
            </DialogHeader>
            {selectedPackage && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    ₦{selectedPackage.price.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Transfer ₦{selectedPackage.price.toLocaleString()} to:
                  </p>
                  <div className="text-sm space-y-1">
                    <p><strong>Bank:</strong> First Bank of Nigeria</p>
                    <p><strong>Account Name:</strong> SolidLife MLM Nigeria Ltd</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                  </div>
                </div>

                <PaymentProofUpload
                  label="Upload Proof of Payment *"
                  onUploadComplete={setPaymentProofUrl}
                />

                <Button
                  onClick={handleUpgrade}
                  className="w-full gradient-primary text-white"
                  disabled={isSubmitting || !paymentProofUrl}
                >
                  {isSubmitting ? "Processing..." : "Submit Upgrade Request"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </UserLayout>
  );
};

export default Packages;
