import { useState, useEffect } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    local_government: "",
    street_no: "",
    bank_name: "",
    account_number: "",
    account_name: "",
    tin_no: "",
    bvn_no: "",
    kyc_verified: false,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          state: data.state || "",
          city: data.city || "",
          local_government: data.local_government || "",
          street_no: data.street_no || "",
          bank_name: data.bank_name || "",
          account_number: data.account_number || "",
          account_name: data.account_name || "",
          tin_no: data.tin_no || "",
          bvn_no: data.bvn_no || "",
          kyc_verified: data.kyc_verified || false,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          country: profile.country,
          state: profile.state,
          city: profile.city,
          local_government: profile.local_government,
          street_no: profile.street_no,
        })
        .eq("user_id", user?.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBankDetails = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          bank_name: profile.bank_name,
          account_number: profile.account_number,
          account_name: profile.account_name,
        })
        .eq("user_id", user?.id);

      if (error) throw error;
      toast.success("Bank details updated successfully!");
    } catch (error) {
      console.error("Error updating bank details:", error);
      toast.error("Failed to update bank details");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = () => {
    toast.info("KYC verification will be reviewed by admin");
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile & KYC</h1>
          <p className="text-muted-foreground">Manage your personal information and verification</p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>KYC Verification Status</CardTitle>
              {profile.kyc_verified ? (
                <Badge className="bg-success/10 text-success border-success">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Pending Verification
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>TIN Number</Label>
                  <Input 
                    value={profile.tin_no} 
                    onChange={(e) => setProfile({ ...profile, tin_no: e.target.value })}
                    placeholder="Tax Identification Number (Optional)" 
                  />
                </div>
                <div>
                  <Label>BVN Number</Label>
                  <Input 
                    value={profile.bvn_no}
                    onChange={(e) => setProfile({ ...profile, bvn_no: e.target.value })}
                    placeholder="Bank Verification Number (Required)" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Upload ID Document</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Click to upload or drag and drop</div>
                    <div className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</div>
                  </div>
                </div>
                <Button onClick={handleUpload} className="w-full">
                  Submit for Verification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={profile.last_name}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    value={profile.country}
                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="localGov">Local Government</Label>
                  <Input 
                    id="localGov" 
                    value={profile.local_government}
                    onChange={(e) => setProfile({ ...profile, local_government: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input 
                  id="street" 
                  value={profile.street_no}
                  onChange={(e) => setProfile({ ...profile, street_no: e.target.value })}
                />
              </div>
              <Button type="submit" disabled={saving} className="gradient-primary text-white">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Bank Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveBankDetails(); }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input 
                    id="bankName" 
                    value={profile.bank_name}
                    onChange={(e) => setProfile({ ...profile, bank_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input 
                    id="accountNumber" 
                    value={profile.account_number}
                    onChange={(e) => setProfile({ ...profile, account_number: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input 
                  id="accountName" 
                  value={profile.account_name}
                  onChange={(e) => setProfile({ ...profile, account_name: e.target.value })}
                />
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Bank Details
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Profile;
