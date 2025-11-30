import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Support = () => {
  const [showNewTicket, setShowNewTicket] = useState(false);

  const tickets = [
    {
      id: "TKT-001",
      subject: "Product delivery issue",
      status: "Open",
      priority: "High",
      created: "2024-02-20",
      lastUpdate: "2024-02-20",
      messages: 3,
    },
    {
      id: "TKT-002",
      subject: "Commission not reflecting",
      status: "In Progress",
      priority: "Medium",
      created: "2024-02-18",
      lastUpdate: "2024-02-19",
      messages: 5,
    },
    {
      id: "TKT-003",
      subject: "How to withdraw earnings",
      status: "Resolved",
      priority: "Low",
      created: "2024-02-15",
      lastUpdate: "2024-02-16",
      messages: 2,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket created successfully!");
    setShowNewTicket(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-destructive/10 text-destructive";
      case "In Progress":
        return "bg-warning/10 text-warning";
      case "Resolved":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive border-destructive";
      case "Medium":
        return "bg-warning/10 text-warning border-warning";
      case "Low":
        return "bg-primary/10 text-primary border-primary";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Support Center</h1>
            <p className="text-muted-foreground">Get help with your account and issues</p>
          </div>
          <Button onClick={() => setShowNewTicket(!showNewTicket)} className="gradient-primary text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {showNewTicket && (
          <Card className="shadow-soft border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Create New Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="Brief description of your issue" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    rows={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="gradient-primary text-white">
                    Submit Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewTicket(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-2xl font-bold">2</div>
              </div>
              <div className="text-muted-foreground">Open Tickets</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div className="text-2xl font-bold">1</div>
              </div>
              <div className="text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
              <div className="text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="shadow-soft hover:shadow-elevated transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 ${getStatusColor(ticket.status)} rounded-lg flex items-center justify-center`}>
                      {getStatusIcon(ticket.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{ticket.subject}</h3>
                        <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-mono">{ticket.id}</span>
                        <span>•</span>
                        <span>Created: {ticket.created}</span>
                        <span>•</span>
                        <span>Last update: {ticket.lastUpdate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {ticket.messages} messages
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">How to withdraw earnings?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn about the withdrawal process and requirements.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Read Guide →
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Understanding commissions</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how the 10-level commission structure works.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Read Guide →
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">KYC verification steps</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete your KYC verification process.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Read Guide →
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Growing your network</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Tips for building a successful downline.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Read Guide →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Support;
