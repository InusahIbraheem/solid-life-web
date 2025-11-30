import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Support = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const tickets = [
    {
      id: "TKT-001",
      user: "John Doe",
      email: "john@example.com",
      subject: "Product delivery issue",
      status: "Open",
      priority: "High",
      created: "2024-02-20",
      lastUpdate: "2024-02-20",
      messages: 3,
    },
    {
      id: "TKT-002",
      user: "Jane Smith",
      email: "jane@example.com",
      subject: "Commission not reflecting",
      status: "In Progress",
      priority: "Medium",
      created: "2024-02-18",
      lastUpdate: "2024-02-19",
      messages: 5,
    },
    {
      id: "TKT-003",
      user: "Bob Wilson",
      email: "bob@example.com",
      subject: "How to withdraw earnings",
      status: "Open",
      priority: "Low",
      created: "2024-02-15",
      lastUpdate: "2024-02-16",
      messages: 2,
    },
  ];

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

  const handleResolve = (ticketId: string) => {
    toast.success(`Ticket ${ticketId} marked as resolved!`);
  };

  const handleReply = () => {
    toast.success("Reply sent successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Support Tickets</h1>
          <p className="text-muted-foreground">Manage and respond to user support requests</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-2xl font-bold">15</div>
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
                <div className="text-2xl font-bold">8</div>
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
                <div className="text-2xl font-bold">142</div>
              </div>
              <div className="text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">165</div>
              </div>
              <div className="text-muted-foreground">Total Tickets</div>
            </CardContent>
          </Card>
        </div>

        {selectedTicket && (
          <Card className="shadow-soft border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reply to Ticket</CardTitle>
                <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Reply</label>
                <Textarea placeholder="Type your response here..." rows={6} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleReply} className="gradient-primary text-white">
                  Send Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleResolve(selectedTicket)}
                >
                  Mark as Resolved
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Tickets</CardTitle>
              <div className="flex gap-2">
                <Input placeholder="Search tickets..." className="w-64" />
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ticket.user}</div>
                        <div className="text-sm text-muted-foreground">{ticket.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {ticket.messages}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        Reply
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Support;
