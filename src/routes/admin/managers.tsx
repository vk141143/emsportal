import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCog, Users, Plus } from "lucide-react";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/managers")({ component: AdminManagers });

const managers = employees.filter((e) =>
  e.jobTitle.toLowerCase().includes("manager") ||
  e.jobTitle.toLowerCase().includes("director") ||
  e.jobTitle.toLowerCase().includes("lead") ||
  e.jobTitle.toLowerCase().includes("cto")
);

function AdminManagers() {
  return (
    <PortalShell
      role="admin"
      title="Managers"
      subtitle="Manage team leads, managers, and reporting structures"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Assign Manager</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Managers" value={String(managers.length)} icon={UserCog} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Departments" value={String(new Set(managers.map((m) => m.department)).size)} icon={Users} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Direct Reports" value={String(employees.length - managers.length)} icon={Users} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Manager</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Designation</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Reports To</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {managers.map((m) => (
                <tr key={m.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{m.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{m.jobTitle}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{m.department}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{m.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.manager}</td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
