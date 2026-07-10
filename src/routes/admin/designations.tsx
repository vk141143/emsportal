import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Star, Plus, MoreHorizontal } from "lucide-react";
import { designations } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/designations")({ component: AdminDesignations });

function AdminDesignations() {
  return (
    <PortalShell
      role="admin"
      title="Designations"
      subtitle="Manage job titles, levels, and salary grades"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Designation</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Designations" value={String(designations.length)} icon={Star} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Departments Covered" value={String(new Set(designations.map((d) => d.department)).size)} icon={Star} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Total Employees" value={String(designations.reduce((a, d) => a + d.employees, 0))} icon={Star} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Level</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Employees</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {designations.map((d) => (
                <tr key={d.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{d.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.department}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="font-mono text-xs">{d.level}</Badge></td>
                  <td className="px-4 py-3"><Badge variant="secondary">{d.employees}</Badge></td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Assign Salary Grade</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
