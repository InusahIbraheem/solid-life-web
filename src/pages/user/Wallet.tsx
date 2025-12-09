import { useState, useEffect } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Wallet = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      // Fetch profile for wallet balance
      const { data: profile } = await supabase
        .from("profiles")
        .select("wallet_balance")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (profile) {
        setWalletBalance(Number(profile.wallet_balance) || 0);
      }

      // Fetch transactions
      const { data: txns, error } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTransactions(txns || []);

      // Calculate totals
      const withdrawn = txns?.filter(t => t.type === "withdrawal" && t.status === "completed")
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const pending = txns?.filter(t => t.status === "pending")
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

      setTotalWithdrawn(withdrawn);
      setPendingBalance(pending);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      toast.error("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);
    if (amount < 10000) {
      toast.error("Minimum withdrawal is ₦10,000");
      return;
    }
    if (amount > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }

    setWithdrawing(true);
    try {
      const { error } = await supabase
        .from("wallet_transactions")
        .insert({
          user_id: user?.id,
          type: "withdrawal",
          amount: amount,
          description: "Withdrawal request",
          status: "pending",
        });

      if (error) throw error;

      toast.success("Withdrawal request submitted!");
      setWithdrawAmount("");
      fetchWalletData();
    } catch (error) {
      console.error("Error submitting withdrawal:", error);
      toast.error("Failed to submit withdrawal request");
    } finally {
      setWithdrawing(false);
    }
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
              <div className="text-4xl font-bold text-primary">₦{walletBalance.toLocaleString()}</div>
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
              <div className="text-4xl font-bold text-warning">₦{pendingBalance.toLocaleString()}</div>
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
              <div className="text-4xl font-bold text-success">₦{totalWithdrawn.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Request Withdrawal</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleWithdraw(); }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="Enter amount" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">Payment Method</Label>
                  <Input id="method" placeholder="Bank Transfer" readOnly />
                </div>
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
              <Button type="submit" disabled={withdrawing} className="gradient-primary text-white">
                {withdrawing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet
              </div>
            ) : (
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
                        {transaction.type === 'commission' || transaction.type === 'bonus' ? (
                          <ArrowDownRight className="w-5 h-5 text-success" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className={`font-bold ${
                        transaction.type === 'commission' || transaction.type === 'bonus' 
                          ? 'text-success' 
                          : 'text-foreground'
                      }`}>
                        {transaction.type === 'commission' || transaction.type === 'bonus' ? '+' : '-'}
                        ₦{Number(transaction.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'completed' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Wallet;
