import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";

const Wallet = () => {
  const handleWithdraw = () => {
    toast.success("Withdrawal request submitted!");
  };

  const transactions = [
    { id: 1, type: "credit", description: "Commission from Level 1", amount: 12500, date: "2024-02-20", status: "Completed" },
    { id: 2, type: "debit", description: "Product purchase", amount: -15000, date: "2024-02-19", status: "Completed" },
    { id: 3, type: "credit", description: "Referral bonus", amount: 5000, date: "2024-02-18", status: "Completed" },
    { id: 4, type: "debit", description: "Withdrawal", amount: -50000, date: "2024-02-15", status: "Completed" },
    { id: 5, type: "credit", description: "Level upgrade bonus", amount: 25000, date: "2024-02-14", status: "Completed" },
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wallet</h1>
          <p className="text-muted-foreground">Manage your earnings and withdrawals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-soft border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Available Balance</div>
              </div>
              <div className="text-4xl font-bold text-primary">₦85,500</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-warning" />
                </div>
                <div className="text-sm text-muted-foreground">Pending Balance</div>
              </div>
              <div className="text-4xl font-bold text-warning">₦32,000</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-success" />
                </div>
                <div className="text-sm text-muted-foreground">Total Withdrawn</div>
              </div>
              <div className="text-4xl font-bold text-success">₦250,000</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Request Withdrawal</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">Payment Method</Label>
                  <Input id="method" placeholder="Bank Transfer" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account</Label>
                <Input id="bankAccount" placeholder="Select bank account" />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum withdrawal:</span>
                    <span className="font-semibold">₦10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing fee:</span>
                    <span className="font-semibold">₦100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing time:</span>
                    <span className="font-semibold">1-3 business days</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleWithdraw} className="gradient-primary text-white">
                Request Withdrawal
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {transaction.type === 'credit' ? (
                        <ArrowDownRight className="w-5 h-5 text-success" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className={`font-bold ${transaction.type === 'credit' ? 'text-success' : 'text-foreground'}`}>
                      {transaction.type === 'credit' ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Wallet;
