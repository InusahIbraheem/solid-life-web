import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { PaymentProofUpload } from "@/components/PaymentProofUpload";
import logo from "@/assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    // Physical Address
    country: "",
    state: "",
    localGovernment: "",
    city: "",
    streetNo: "",
    // Referral Info
    uplineName: "",
    uplineId: "",
    sponsorName: "",
    sponsorId: "",
    // Bank Details
    bankName: "",
    accountNumber: "",
    accountName: "",
    // Tax/ID
    tinNo: "",
    bvnNo: "",
  });

  useEffect(() => {
    if (!loading && user) {
      // Pre-fill email if user is logged in
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user, loading]);

  // Mock data for select options
  const countries = ["Nigeria", "Ghana", "Kenya", "South Africa"];
  const nigeriaStates = ["Lagos", "Abuja", "Rivers", "Imo", "Kano", "Oyo", "Delta", "Enugu", "Kaduna", "Anambra"];
  const localGovernments = {
    "Lagos": ["Ikeja", "Victoria Island", "Lekki", "Surulere", "Yaba", "Ikoyi"],
    "Abuja": ["Garki", "Wuse", "Maitama", "Asokoro", "Gwarinpa"],
    "Imo": ["Owerri Municipal", "Owerri West", "Owerri North", "Isiala Mbano", "Orlu"],
    "Rivers": ["Port Harcourt", "Obio-Akpor", "Eleme", "Okrika"],
  };
  const banks = ["Access Bank", "First Bank", "GTBank", "UBA", "Zenith Bank", "Union Bank", "Sterling Bank", "Fidelity Bank", "Polaris Bank", "Wema Bank"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.bvnNo) {
      toast.error("BVN Number is required");
      return;
    }

    if (!formData.country || !formData.state || !formData.city) {
      toast.error("Please complete your address details");
      return;
    }

    if (!paymentProofUrl) {
      toast.error("Please upload proof of payment");
      return;
    }

    if (!user) {
      toast.error("Please sign in first");
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    try {
      const nameParts = formData.fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: formData.phone,
          country: formData.country,
          state: formData.state,
          local_government: formData.localGovernment,
          city: formData.city,
          street_no: formData.streetNo,
          upline_name: formData.uplineName,
          upline_id: formData.uplineId,
          sponsor_name: formData.sponsorName,
          sponsor_id: formData.sponsorId,
          bank_name: formData.bankName,
          account_number: formData.accountNumber,
          account_name: formData.accountName,
          tin_no: formData.tinNo,
          bvn_no: formData.bvnNo,
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // Create registration with payment proof
      const { error: regError } = await supabase
        .from("registrations")
        .insert({
          user_id: user.id,
          payment_proof_url: paymentProofUrl,
          payment_status: "pending",
        });

      if (regError) throw regError;

      toast.success("Registration submitted! Awaiting payment verification.");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const currentLGs = formData.state ? (localGovernments[formData.state as keyof typeof localGovernments] || []) : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjQsMTc5LDY2LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <Card className="w-full max-w-2xl shadow-elevated relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Solid Life" className="h-20 w-20" />
          </div>
          <CardTitle className="text-3xl font-bold">Complete Your Registration</CardTitle>
          <CardDescription className="text-base">
            Registration Fee: ₦15,000 | Start your journey to financial freedom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!!user}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Physical Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Physical Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigeriaStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Local Government / County *</Label>
                  <Select value={formData.localGovernment} onValueChange={(value) => handleSelectChange("localGovernment", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Local Government" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentLGs.map((lg) => (
                        <SelectItem key={lg} value={lg}>{lg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="streetNo">Street No. / Address</Label>
                  <Input
                    id="streetNo"
                    type="text"
                    placeholder="123 Main Street"
                    value={formData.streetNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Referral Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Referral Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="uplineName">Upline Name</Label>
                  <Input
                    id="uplineName"
                    type="text"
                    placeholder="Enter Upline Name"
                    value={formData.uplineName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uplineId">Upline ID No.</Label>
                  <Input
                    id="uplineId"
                    type="text"
                    placeholder="Enter Upline ID"
                    value={formData.uplineId}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorName">Sponsor Name</Label>
                  <Input
                    id="sponsorName"
                    type="text"
                    placeholder="Enter Sponsor Name"
                    value={formData.sponsorName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorId">Sponsor ID No.</Label>
                  <Input
                    id="sponsorId"
                    type="text"
                    placeholder="Enter Sponsor ID"
                    value={formData.sponsorId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Bank Account Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bank Name *</Label>
                  <Select value={formData.bankName} onValueChange={(value) => handleSelectChange("bankName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="0123456789"
                    value={formData.accountNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="accountName">Account Name *</Label>
                  <Input
                    id="accountName"
                    type="text"
                    placeholder="Account Holder Name"
                    value={formData.accountName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Tax & Identification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Tax & Identification</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tinNo">TIN No. (Optional)</Label>
                  <Input
                    id="tinNo"
                    type="text"
                    placeholder="Tax Identification Number"
                    value={formData.tinNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bvnNo">BVN No. *</Label>
                  <Input
                    id="bvnNo"
                    type="text"
                    placeholder="Bank Verification Number"
                    value={formData.bvnNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Proof Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Registration Payment (₦15,000)</h3>
              <div className="p-4 bg-muted/50 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Please transfer ₦15,000 to the company account and upload proof of payment below.
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
            </div>

            <Button type="submit" className="w-full gradient-primary text-white" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already registered? </span>
            <Link to="/auth" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
