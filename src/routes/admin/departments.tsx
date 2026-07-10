import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Building2, Users, Plus, MoreHorizontal } from "lucide-react";
import { departments } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/departments")({ component: AdminDepartments });

function AdminDepartments() {
  return (
    <PortalShell
      role="admin"
      title="Departments"
      subtitle="Manage company departments, heads, and budgets"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Department</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Departments" value={String(departments.length)} icon={Building2} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Total Employees" value={String(departments.reduce((a, d) => a + d.employees, 0))} icon={Users} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Total Budget" value={`₹${(departments.reduce((a, d) => a + d.budget, 0) / 100000).toFixed(1)}L`} icon={Building2} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <Card key={d.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 grid place-items-center text-violet-600 dark:text-violet-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Department</DropdownMenuItem>
                    <DropdownMenuItem>Assign Manager</DropdownMenuItem>
                    <DropdownMenuItem>View Employees</DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-base mt-2">{d.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Head</span>
                <span className="font-medium">{d.head}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employees</span>
                <Badge variant="secondary">{d.employees}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium">₹{(d.budget / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="text-muted-foreground">{d.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
