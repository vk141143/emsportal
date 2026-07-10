import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Lock, Smartphone, Monitor, AlertTriangle } from "lucide-react";
import { loginHistory } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/security")({ component: AdminSecurity });

function AdminSecurity() {
  const failed = loginHistory.filter((l) => l.status !== "Success").length;

  return (
    <PortalShell
      role="admin"
      title="Security"
      subtitle="Password policies, 2FA, sessions, and access controls"
      actions={<Button>Save Policy</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Active Sessions" value="42" icon={Monitor} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="2FA Enabled" value="186" tone="up" icon={Smartphone} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Failed Logins (24h)" value={String(failed)} tone="down" icon={AlertTriangle} color="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
        <StatCard label="Security Score" value="84/100" tone="up" icon={ShieldCheck} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
      </div>

      <Tabs defaultValue="policy">
        <TabsList>
          <TabsTrigger value="policy">Password Policy</TabsTrigger>
          <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="logins">Login History</TabsTrigger>
        </TabsList>

        <TabsContent value="policy">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Password Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2"><Label>Minimum Length</Label><Input type="number" defaultValue="8" /></div>
                <div className="grid gap-2"><Label>Password Expiry (days)</Label><Input type="number" defaultValue="90" /></div>
                <div className="grid gap-2"><Label>Max Login Attempts</Label><Input type="number" defaultValue="5" /></div>
                <div className="grid gap-2"><Label>Lockout Duration (minutes)</Label><Input type="number" defaultValue="30" /></div>
                {[
                  ["Require uppercase letters", true],
                  ["Require numbers", true],
                  ["Require special characters", true],
                  ["Prevent password reuse (last 5)", true],
                  ["Force reset on first login", true],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm">{label}</span>
                    <Switch defaultChecked={val as boolean} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Access Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["IP Allowlist for Admin", false],
                  ["Device Management", false],
                  ["Session Timeout (30 min)", true],
                  ["Concurrent Session Limit", true],
                  ["Audit All Admin Actions", true],
                  ["Auto-logout on Inactivity", true],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm">{label}</span>
                    <Switch defaultChecked={val as boolean} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="2fa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Two-Factor Authentication</CardTitle>
              <CardDescription>Enforce 2FA for specific roles or all users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Enforce 2FA for Super Admin", true],
                ["Enforce 2FA for HR Admin", true],
                ["Enforce 2FA for Managers", false],
                ["Allow 2FA for all employees", false],
                ["TOTP Authenticator App", true],
                ["SMS OTP fallback", false],
              ].map(([label, val]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">{label}</span>
                  <Switch defaultChecked={val as boolean} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Active Sessions</CardTitle>
                <Button variant="outline" size="sm" className="text-rose-600 border-rose-200">Revoke All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Device</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Active</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.filter((l) => l.status === "Success").map((l, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-xs">{l.user}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{l.device}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{l.location}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{l.time}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-rose-600">Revoke</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logins">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">IP</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Device</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((l, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-xs">{l.user}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.ip}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{l.location}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{l.device}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{l.time}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${l.status === "Success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : l.status === "Failed" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"}`}
                        >{l.status}</Badge>
                      </td>
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
