import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Gift, Plus, MoreHorizontal } from "lucide-react";
import { holidays } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/holidays")({ component: AdminHolidays });

const typeColor: Record<string, string> = {
  National: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Festival: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
};

function AdminHolidays() {
  return (
    <PortalShell
      role="admin"
      title="Holiday Calendar"
      subtitle="Manage national holidays, festivals, and optional holidays"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add Holiday</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Holidays" value={String(holidays.length)} icon={Gift} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="National" value={String(holidays.filter((h) => h.type === "National").length)} icon={Gift} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Festivals" value={String(holidays.filter((h) => h.type === "Festival").length)} icon={Gift} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Holiday</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Applicable</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {holidays.map((h) => (
                <tr key={h.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{h.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${typeColor[h.type] || ""}`} variant="outline">{h.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{h.applicable}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
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
