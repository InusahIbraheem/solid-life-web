import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  DollarSign,
  Users,
  ShoppingBag,
  Award,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "commission",
      title: "Commission Earned",
      message: "You earned ₦12,500 commission from Alice Johnson's purchase",
      time: "2 hours ago",
      read: false,
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 2,
      type: "referral",
      title: "New Referral",
      message: "Bob Smith joined using your referral link",
      time: "5 hours ago",
      read: false,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 3,
      type: "order",
      title: "Order Delivered",
      message: "Your order ORD-001 has been delivered successfully",
      time: "1 day ago",
      read: true,
      icon: ShoppingBag,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: 4,
      type: "level",
      title: "Level Upgrade!",
      message: "Congratulations! You've been upgraded to Gold Level",
      time: "2 days ago",
      read: true,
      icon: Award,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      id: 5,
      type: "system",
      title: "KYC Approved",
      message: "Your KYC verification has been approved",
      time: "3 days ago",
      read: true,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 6,
      type: "alert",
      title: "Withdrawal Processed",
      message: "Your withdrawal request of ₦50,000 has been processed",
      time: "4 days ago",
      read: true,
      icon: AlertCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: 7,
      type: "commission",
      title: "Commission Earned",
      message: "You earned ₦5,000 referral bonus from Level 2",
      time: "5 days ago",
      read: true,
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    // Mock function
    console.log("Marking all as read");
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your account activities
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-2xl font-bold">{unreadCount}</div>
              </div>
              <div className="text-muted-foreground">Unread</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <div className="text-muted-foreground">Commission Alerts</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
              <div className="text-muted-foreground">Referral Alerts</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-warning" />
                </div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <div className="text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`shadow-soft hover:shadow-elevated transition-all cursor-pointer ${
                !notification.read ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${notification.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <notification.icon className={`w-6 h-6 ${notification.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-bold">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Badge className="bg-primary text-primary-foreground">New</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-soft bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Enable notifications to get real-time updates on your earnings, referrals, and more
            </p>
            <Button className="gradient-primary text-white">
              Enable Push Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Notifications;
