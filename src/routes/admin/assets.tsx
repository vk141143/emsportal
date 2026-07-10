import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Package, CheckSquare, AlertCircle, Plus, MoreHorizontal } from "lucide-react";
import { assets } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/assets")({ component: AdminAssets });

const statusColor: Record<string, string> = {
  "In Use": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Available: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
};

function AdminAssets() {
  return (
    <PortalShell
      role="admin"
      title="Asset Management"
      subtitle="Track, assign, and manage company assets"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add Asset</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Assets" value={String(assets.length)} icon={Package} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Assigned" value={String(assets.filter((a) => a.status === "In Use").length)} icon={CheckSquare} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Available" value={String(assets.filter((a) => a.status === "Available").length)} icon={Package} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Maintenance" value="2" icon={AlertCircle} tone="down" color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Asset</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Serial No.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Assigned To</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Assigned Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{a.type}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.serial}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.assignedTo}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{a.assigned}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${statusColor[a.status] || ""}`} variant="outline">{a.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                        <DropdownMenuItem>Return</DropdownMenuItem>
                        <DropdownMenuItem>Maintenance</DropdownMenuItem>
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
