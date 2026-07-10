import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/branches")({ component: AdminBranches });

const branches = [
  { id: "B-01", name: "Bengaluru HQ", city: "Bengaluru", country: "India", employees: 120, type: "Headquarters", status: "Active" },
  { id: "B-02", name: "Mumbai Office", city: "Mumbai", country: "India", employees: 45, type: "Branch", status: "Active" },
  { id: "B-03", name: "Delhi NCR", city: "Gurugram", country: "India", employees: 38, type: "Branch", status: "Active" },
  { id: "B-04", name: "London Office", city: "London", country: "UK", employees: 22, type: "Branch", status: "Active" },
  { id: "B-05", name: "New York Office", city: "New York", country: "USA", employees: 18, type: "Branch", status: "Active" },
  { id: "B-06", name: "Remote", city: "—", country: "Global", employees: 5, type: "Remote", status: "Active" },
];

function AdminBranches() {
  return (
    <PortalShell
      role="admin"
      title="Branches & Locations"
      subtitle="Manage office locations, branches, and regional settings"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add Branch</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Branches" value={String(branches.length)} icon={MapPin} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Countries" value={String(new Set(branches.map((b) => b.country)).size)} icon={MapPin} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Total Employees" value={String(branches.reduce((a, b) => a + b.employees, 0))} icon={MapPin} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => (
          <Card key={b.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 grid place-items-center text-violet-600 dark:text-violet-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <Badge variant={b.type === "Headquarters" ? "default" : "outline"} className="text-xs">{b.type}</Badge>
              </div>
              <CardTitle className="text-sm font-semibold mt-2">{b.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{b.city}, {b.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employees</span>
                <Badge variant="secondary">{b.employees}</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full h-7 text-xs mt-1">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
