import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { UserCog, ShieldCheck, KeyRound, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

const users = [
  { name: "Sam Rivera", email: "sam.rivera@acme.com", role: "Super Admin", tenant: "Acme Corp", mfa: true, last: "2m ago" },
  { name: "Jordan Blake", email: "jordan.blake@acme.com", role: "HR Admin", tenant: "Acme Corp", mfa: true, last: "12m ago" },
  { name: "Priya Nair", email: "priya.nair@acme.com", role: "Manager", tenant: "Acme Corp", mfa: true, last: "1h ago" },
  { name: "Alex Morgan", email: "alex.morgan@acme.com", role: "Employee", tenant: "Acme Corp", mfa: false, last: "4h ago" },
  { name: "Elena Volkova", email: "elena.v@globex.com", role: "HR Admin", tenant: "Globex Ltd", mfa: true, last: "Yesterday" },
  { name: "Tom Larsen", email: "tom@hooli.com", role: "Super Admin", tenant: "Hooli", mfa: true, last: "3h ago" },
];

const roles = [
  { role: "Super Admin", users: 8, perms: 42 },
  { role: "HR Admin", users: 34, perms: 28 },
  { role: "Manager", users: 210, perms: 12 },
  { role: "Employee", users: 12440, perms: 6 },
  { role: "Auditor (read-only)", users: 4, perms: 18 },
];

function AdminUsers() {
  return (
    <PortalShell role="admin" title="Users & roles" subtitle="Identity, roles and access governance"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> Invite user</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total users" value="12,696" icon={UserCog} />
        <StatCard label="MFA enabled" value="98.2%" tone="up" icon={ShieldCheck} />
        <StatCard label="SSO enforced" value="6 tenants" icon={KeyRound} />
        <StatCard label="Inactive 90d+" value="42" tone="down" icon={UserCog} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Recent users</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Tenant</TableHead>
                <TableHead>MFA</TableHead><TableHead>Last active</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback>{u.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                        <div><div className="font-medium text-sm">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant={u.role === "Super Admin" ? "default" : "outline"}>{u.role}</Badge></TableCell>
                    <TableCell className="text-sm">{u.tenant}</TableCell>
                    <TableCell><Switch checked={u.mfa} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.last}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Roles</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {roles.map((r) => (
              <div key={r.role} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{r.role}</div>
                  <Badge variant="secondary">{r.users.toLocaleString()}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{r.perms} permissions</div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">Manage roles</Button>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
