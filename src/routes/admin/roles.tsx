import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyRound, Users, Shield, Plus, Check, X } from "lucide-react";
import { adminRoles, permissionMatrix } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/roles")({ component: AdminRoles });

const roleColors: Record<string, string> = {
  "Super Admin": "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  "HR Admin": "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Manager: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Employee: "bg-muted text-muted-foreground",
  Auditor: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  "Finance Admin": "bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400",
};

function AdminRoles() {
  return (
    <PortalShell
      role="admin"
      title="Roles & Permissions"
      subtitle="Manage roles, permission matrix, and access control"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Role</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Roles" value={String(adminRoles.length)} icon={KeyRound} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Total Users" value={String(adminRoles.reduce((a, r) => a + r.users, 0).toLocaleString())} icon={Users} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Permission Modules" value={String(permissionMatrix.length)} icon={Shield} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
      </div>

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {adminRoles.map((r) => (
              <Card key={r.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={`text-xs ${roleColors[r.name] || "bg-muted text-muted-foreground"}`} variant="outline">{r.name}</Badge>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                  </div>
                  <CardDescription className="mt-2 text-xs">{r.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{r.users.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Permissions</span>
                    <Badge variant="secondary">{r.permissions}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Module</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Super Admin</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">HR Admin</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Manager</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Employee</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Auditor</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionMatrix.map((p) => (
                    <tr key={p.module} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{p.module}</td>
                      {[p.superAdmin, p.hrAdmin, p.manager, p.employee, p.auditor].map((val, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {val
                            ? <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                            : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                        </td>
                      ))}
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
