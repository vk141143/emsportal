import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Palette } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/profile")({ component: AdminProfile });

function AdminProfile() {
  const { user } = useAuth();

  return (
    <PortalShell
      role="admin"
      title="Profile"
      subtitle="Manage your account, preferences, and security"
    >
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Profile Info</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
                    {user?.name.split(" ").map((s) => s[0]).join("") || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-lg">{user?.name || "Admin User"}</div>
                  <div className="text-sm text-muted-foreground">{user?.email || "admin@acme.com"}</div>
                  <Badge className="mt-2 bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400" variant="outline">Super Admin</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">Change Photo</Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-4 w-4" /> Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2"><Label>First Name</Label><Input defaultValue="Sam" /></div>
                  <div className="grid gap-2"><Label>Last Name</Label><Input defaultValue="Rivera" /></div>
                </div>
                <div className="grid gap-2"><Label>Email</Label><Input defaultValue={user?.email || "sam.rivera@acme.com"} /></div>
                <div className="grid gap-2"><Label>Phone</Label><Input defaultValue="+1 415 555 0100" /></div>
                <div className="grid gap-2"><Label>Department</Label><Input defaultValue="Platform" disabled /></div>
                <div className="grid gap-2"><Label>Designation</Label><Input defaultValue="Super Admin" disabled /></div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <Card className="max-w-md">
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2"><Label>Current Password</Label><Input type="password" /></div>
              <div className="grid gap-2"><Label>New Password</Label><Input type="password" /></div>
              <div className="grid gap-2"><Label>Confirm New Password</Label><Input type="password" /></div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-4 w-4" /> Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2"><Label>Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label>Date Format</Label>
                  <Select defaultValue="dmy">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="max-w-lg">
            <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Email — Leave requests", true],
                ["Email — Payroll alerts", true],
                ["Email — Document expiry", true],
                ["Push — New announcements", true],
                ["Push — Attendance alerts", false],
                ["Push — System alerts", true],
              ].map(([label, val]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">{label}</span>
                  <Switch defaultChecked={val as boolean} />
                </div>
              ))}
              <Button className="mt-2">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
