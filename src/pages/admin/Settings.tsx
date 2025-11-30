import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage platform configuration</p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Commission Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Label htmlFor={`level${i + 1}`}>Level {i + 1} Commission (%)</Label>
                  <Input
                    id={`level${i + 1}`}
                    type="number"
                    defaultValue={[30, 20, 15, 10, 8, 6, 5, 4, 3, 2][i]}
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSave} className="gradient-primary text-white">
              Save Commission Structure
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">User Registration</div>
                <div className="text-sm text-muted-foreground">
                  Allow new users to register
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">KYC Verification Required</div>
                <div className="text-sm text-muted-foreground">
                  Require KYC before withdrawals
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Send email notifications to users
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Send SMS alerts for important updates
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Payment Gateway</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gateway">Payment Provider</Label>
              <select
                id="gateway"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option>Paystack</option>
                <option>Flutterwave</option>
                <option>Interswitch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicKey">Public Key</Label>
              <Input id="publicKey" type="text" placeholder="pk_live_xxxxxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input id="secretKey" type="password" placeholder="sk_live_xxxxxxxxxxxx" />
            </div>
            <Button onClick={handleSave}>Save Payment Settings</Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Withdrawal Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minWithdraw">Minimum Withdrawal (₦)</Label>
                <Input id="minWithdraw" type="number" defaultValue="10000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdrawFee">Withdrawal Fee (₦)</Label>
                <Input id="withdrawFee" type="number" defaultValue="100" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="processingTime">Processing Time (days)</Label>
              <Input id="processingTime" type="number" defaultValue="3" />
            </div>
            <Button onClick={handleSave}>Save Withdrawal Settings</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
