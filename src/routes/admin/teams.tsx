import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Layers, Users, Plus } from "lucide-react";
import { employees, departments } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/teams")({ component: AdminTeams });

const teams = departments.map((d) => ({
  id: d.id,
  name: `${d.name} Team`,
  lead: d.head,
  members: employees.filter((e) => e.department === d.name).slice(0, 4),
  count: d.employees,
}));

function AdminTeams() {
  return (
    <PortalShell
      role="admin"
      title="Teams"
      subtitle="Manage teams, leads, and member assignments"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Team</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Teams" value={String(teams.length)} icon={Layers} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Total Members" value={String(employees.length)} icon={Users} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Team Leads" value={String(teams.length)} icon={Layers} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{t.name}</CardTitle>
                <Badge variant="secondary">{t.count} members</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Lead: <span className="font-medium text-foreground">{t.lead}</span></div>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-2 mb-3">
                {t.members.map((m) => (
                  <Avatar key={m.id} className="h-7 w-7 border-2 border-background">
                    <AvatarFallback className="text-[10px]">{m.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                  </Avatar>
                ))}
                {t.count > 4 && (
                  <div className="h-7 w-7 rounded-full border-2 border-background bg-muted grid place-items-center text-[10px] font-medium">
                    +{t.count - 4}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">View Team</Button>
                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
