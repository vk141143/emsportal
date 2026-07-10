import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, MessageSquare, Smartphone, Settings } from "lucide-react";

export const Route = createFileRoute("/admin/notifications")({ component: AdminNotifications });

const channels = [
  { id: "email", label: "Email Notifications", icon: Mail, desc: "Send notifications via SMTP email", enabled: true },
  { id: "sms", label: "SMS Notifications", icon: Smartphone, desc: "Send SMS via Twilio or MSG91", enabled: false },
  { id: "whatsapp", label: "WhatsApp Notifications", icon: MessageSquare, desc: "Send via WhatsApp Business API", enabled: false },
  { id: "push", label: "Push Notifications", icon: Bell, desc: "Browser and mobile push notifications", enabled: true },
];

const notificationEvents = [
  { event: "Leave Request Submitted", email: true, sms: false, push: true },
  { event: "Leave Approved / Rejected", email: true, sms: true, push: true },
  { event: "Attendance Regularization", email: true, sms: false, push: true },
  { event: "Payslip Generated", email: true, sms: false, push: true },
  { event: "Document Expiry Alert", email: true, sms: false, push: false },
  { event: "New Announcement", email: false, sms: false, push: true },
  { event: "Offer Letter Sent", email: true, sms: true, push: false },
  { event: "Birthday Reminder", email: true, sms: false, push: true },
  { event: "Work Anniversary", email: true, sms: false, push: true },
  { event: "Probation Review Due", email: true, sms: false, push: true },
];

function AdminNotifications() {
  return (
    <PortalShell
      role="admin"
      title="Notifications"
      subtitle="Configure notification channels and event triggers"
      actions={<Button>Save Settings</Button>}
    >
      <Tabs defaultValue="channels">
        <TabsList>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="events">Event Triggers</TabsTrigger>
        </TabsList>

        <TabsContent value="channels">
          <div className="grid gap-4 md:grid-cols-2">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <Card key={ch.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 grid place-items-center text-violet-600 dark:text-violet-400 shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{ch.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{ch.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Switch defaultChecked={ch.enabled} />
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Event</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Email</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">SMS</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Push</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationEvents.map((e) => (
                    <tr key={e.event} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{e.event}</td>
                      <td className="px-4 py-3 text-center"><Switch defaultChecked={e.email} /></td>
                      <td className="px-4 py-3 text-center"><Switch defaultChecked={e.sms} /></td>
                      <td className="px-4 py-3 text-center"><Switch defaultChecked={e.push} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
