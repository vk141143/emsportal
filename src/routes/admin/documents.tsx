import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FolderOpen, FileCheck, AlertCircle, Download, MoreHorizontal, Plus } from "lucide-react";
import { hrDocuments } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/documents")({ component: AdminDocuments });

const statusColor: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Draft: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Expired: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
};

function AdminDocuments() {
  return (
    <PortalShell
      role="admin"
      title="Documents"
      subtitle="Employee documents, verification, and templates"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Bulk Download</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Upload Document</Button>
        </div>
      }
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Documents" value={String(hrDocuments.length)} icon={FolderOpen} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Verified" value={String(hrDocuments.filter((d) => d.status === "Active").length)} icon={FileCheck} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Pending Verification" value="18" icon={AlertCircle} tone="down" color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Expired" value={String(hrDocuments.filter((d) => d.status === "Expired").length)} icon={AlertCircle} tone="down" color="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Document</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Expiry</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {hrDocuments.map((d) => (
                <tr key={d.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{d.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.employee}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{d.type}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{d.expiry}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${statusColor[d.status]}`} variant="outline">{d.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Verify</DropdownMenuItem>
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
