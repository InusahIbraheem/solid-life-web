import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import UserReferrals from "./pages/user/Referrals";
import UserProducts from "./pages/user/Products";
import UserWallet from "./pages/user/Wallet";
import UserOrders from "./pages/user/Orders";
import UserEarnings from "./pages/user/Earnings";
import UserSupport from "./pages/user/Support";
import UserNotifications from "./pages/user/Notifications";
import UserLevelProgress from "./pages/user/LevelProgress";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSupport from "./pages/admin/Support";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/referrals" element={<UserReferrals />} />
          <Route path="/products" element={<UserProducts />} />
          <Route path="/wallet" element={<UserWallet />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/earnings" element={<UserEarnings />} />
          <Route path="/support" element={<UserSupport />} />
          <Route path="/notifications" element={<UserNotifications />} />
          <Route path="/level-progress" element={<UserLevelProgress />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
