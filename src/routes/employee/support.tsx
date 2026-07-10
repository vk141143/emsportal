import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TicketCheck, Plus, MessageCircle, Clock, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/employee/support")({ component: EmployeeSupport });

const tickets = [
  { id: "TKT-001", subject: "Payslip for May 2026 not generated", category: "Payroll", priority: "High", status: "Open", created: "2026-07-08", updated: "2026-07-09", assignee: "Jordan Blake" },
  { id: "TKT-002", subject: "Unable to access VPN from home", category: "IT", priority: "Medium", status: "In Progress", created: "2026-07-05", updated: "2026-07-07", assignee: "IT Support" },
  { id: "TKT-003", subject: "Leave balance discrepancy", category: "HR", priority: "Medium", status: "Resolved", created: "2026-06-20", updated: "2026-06-22", assignee: "Jordan Blake" },
  { id: "TKT-004", subject: "Request for experience letter", category: "HR", priority: "Low", status: "Resolved", created: "2026-06-10", updated: "2026-06-11", assignee: "Jordan Blake" },
];

const chatMessages = [
  { from: "hr", name: "Jordan Blake", text: "Hi Alex! How can I help you today?", time: "10:30 AM" },
  { from: "me", name: "You", text: "Hi Jordan, I had a question about my leave balance.", time: "10:31 AM" },
  { from: "hr", name: "Jordan Blake", text: "Sure! Your current casual leave balance is 8 days. Is there anything specific you'd like to know?", time: "10:32 AM" },
  { from: "me", name: "You", text: "I wanted to check if the 2 days from last month were credited.", time: "10:33 AM" },
  { from: "hr", name: "Jordan Blake", text: "Yes, those have been credited. Your balance was updated on July 1st. You should see 8 days now.", time: "10:35 AM" },
];

function EmployeeSupport() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "me", name: "You", text: message, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setMessage("");
  };

  return (
    <PortalShell
      role="employee"
      title="Support"
      subtitle="Raise tickets, track issues and chat with HR"
      actions={
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Raise Ticket</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Raise Support Ticket</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2"><Label>Subject</Label><Input placeholder="Brief description of the issue" /></div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                  {["HR", "Payroll", "IT", "Admin", "Benefits", "Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                  {["Low", "Medium", "High", "Critical"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea rows={4} placeholder="Describe your issue in detail…" /></div>
              <div className="space-y-2"><Label>Attachment (optional)</Label><Input type="file" /></div>
            </div>
            <DialogFooter><Button>Submit Ticket</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Open tickets" value="2" delta="1 high priority" icon={TicketCheck} tone="down" />
        <StatCard label="In progress" value="1" delta="IT Support" icon={Clock} />
        <StatCard label="Resolved" value="2" delta="This month" icon={CheckCircle2} tone="up" />
        <StatCard label="Avg. resolution" value="1.5 days" delta="Last 30 days" icon={Clock} tone="up" />
      </div>

      <Tabs defaultValue="tickets">
        <TabsList>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="chat" className="gap-1"><MessageCircle className="h-3.5 w-3.5" /> Chat with HR</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <div className="space-y-3">
            {tickets.map((t) => (
              <Card key={t.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                        <Badge variant="outline" className="text-[10px]">{t.category}</Badge>
                        <Badge variant={t.priority === "High" ? "destructive" : t.priority === "Medium" ? "secondary" : "outline"} className="text-[10px]">
                          {t.priority}
                        </Badge>
                      </div>
                      <div className="font-semibold text-sm">{t.subject}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Assigned to: {t.assignee} · Created: {t.created} · Updated: {t.updated}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={t.status === "Resolved" ? "default" : t.status === "In Progress" ? "secondary" : "outline"}>
                        {t.status}
                      </Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader className="border-b pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-fuchsia-100 text-fuchsia-600">JB</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Jordan Blake</CardTitle>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" /> Online · HR Business Partner
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.from === "me" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={`text-xs ${m.from === "hr" ? "bg-fuchsia-100 text-fuchsia-600" : "bg-sky-100 text-sky-600"}`}>
                        {m.from === "hr" ? "JB" : "AM"}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[70%] ${m.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                        {m.text}
                      </div>
                      <div className="text-[10px] text-muted-foreground px-1">{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4 flex gap-2">
                <Input
                  placeholder="Type a message…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={sendMessage}><Send className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
