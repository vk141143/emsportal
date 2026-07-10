import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Bell, Shield, Smartphone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/manager/settings")({ component: ManagerSettings });

const notificationSettings = [
  { id: "leave_approval", label: "Leave approvals", desc: "When a team member's leave is approved or rejected", email: true, push: true },
  { id: "task_assigned", label: "Task assigned", desc: "When a new task is assigned to your team", email: false, push: true },
  { id: "announcements", label: "Company announcements", desc: "New company-wide announcements", email: true, push: false },
  { id: "performance", label: "Performance reviews due", desc: "Reminders for upcoming review deadlines", email: true, push: true },
  { id: "ticket_update", label: "Support ticket updates", desc: "When your ticket status changes", email: true, push: true },
];

function ManagerSettings() {
  const [notifications, setNotifications] = useState(notificationSettings);

  const toggle = (id: string, channel: "email" | "push") => {
    setNotifications(notifications.map((n) => n.id === id ? { ...n, [channel]: !n[channel] } : n));
  };

  return (
    <PortalShell role="manager" title="Settings" subtitle="Password, notifications and security">
      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password" className="gap-1"><Lock className="h-3.5 w-3.5" /> Password</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1"><Bell className="h-3.5 w-3.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-1"><Shield className="h-3.5 w-3.5" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle></CardHeader>
            <CardContent className="max-w-md space-y-4">
              <div className="space-y-2"><Label>Current password</Label><Input type="password" placeholder="Enter current password" /></div>
              <div className="space-y-2"><Label>New password</Label><Input type="password" placeholder="Min 8 characters" /></div>
              <div className="space-y-2"><Label>Confirm new password</Label><Input type="password" placeholder="Repeat new password" /></div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notification Preferences</CardTitle>
              <p className="text-sm text-muted-foreground">Choose how you want to be notified for each event.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                <div className="col-span-2">Event</div>
                <div className="text-center">Email</div>
                <div className="text-center">Push</div>
              </div>
              <div className="space-y-1">
                {notifications.map((n, i) => (
                  <div key={n.id}>
                    {i > 0 && <Separator className="my-3" />}
                    <div className="grid grid-cols-4 gap-4 items-center px-1">
                      <div className="col-span-2">
                        <div className="text-sm font-medium">{n.label}</div>
                        <div className="text-xs text-muted-foreground">{n.desc}</div>
                      </div>
                      <div className="flex justify-center"><Switch checked={n.email} onCheckedChange={() => toggle(n.id, "email")} /></div>
                      <div className="flex justify-center"><Switch checked={n.push} onCheckedChange={() => toggle(n.id, "push")} /></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6"><Button>Save Preferences</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Two-Factor Authentication</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="font-medium text-sm">Authenticator App</div>
                    <div className="text-xs text-muted-foreground">Google Authenticator or Authy</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="font-medium text-sm">SMS OTP</div>
                    <div className="text-xs text-muted-foreground">+91 98765 ••••10</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Active Sessions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: "MacBook Pro — Chrome", location: "Bengaluru, IN", time: "Now", current: true },
                  { device: "iPhone 15 Pro — Safari", location: "Bengaluru, IN", time: "2h ago", current: false },
                ].map((s) => (
                  <div key={s.device} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="text-sm font-medium">{s.device}</div>
                      <div className="text-xs text-muted-foreground">{s.location} · {s.time}</div>
                    </div>
                    {s.current
                      ? <span className="text-xs text-emerald-600 font-medium">Current</span>
                      : <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">Revoke</Button>}
                  </div>
                ))}
                <Button variant="outline" className="w-full text-rose-600 hover:text-rose-700">Sign out all other sessions</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
