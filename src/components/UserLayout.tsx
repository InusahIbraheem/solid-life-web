import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  User,
  Users,
  ShoppingBag,
  Wallet,
  ShoppingCart,
  TrendingUp,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const userMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Profile & KYC", url: "/profile", icon: User },
  { title: "My Referrals", url: "/referrals", icon: Users },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "My Orders", url: "/orders", icon: ShoppingCart },
  { title: "Earnings", url: "/earnings", icon: TrendingUp },
];

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar className="border-r">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Solid Life" className="h-10 w-10" />
              <div>
                <div className="font-bold text-primary">Solid Life</div>
                <div className="text-xs text-muted-foreground">Member Portal</div>
              </div>
            </div>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className="flex items-center gap-3 hover:bg-sidebar-accent rounded-md transition-colors"
                          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <div className="mt-auto p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background flex items-center px-6 sticky top-0 z-40 shadow-sm">
            <SidebarTrigger />
            <div className="ml-auto">
              <div className="text-sm text-muted-foreground">Welcome back, <span className="font-semibold text-foreground">Member</span></div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
