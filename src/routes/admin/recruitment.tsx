import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Briefcase, Users, CheckSquare, Plus, MoreHorizontal, Star } from "lucide-react";
import { candidates } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/recruitment")({ component: AdminRecruitment });

const stageColor: Record<string, string> = {
  Screening: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Assessment: "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Hired: "bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
};

function AdminRecruitment() {
  return (
    <PortalShell
      role="admin"
      title="Recruitment"
      subtitle="Manage job openings, candidates, and hiring pipeline"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Post Job</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Candidates" value={String(candidates.length)} icon={Users} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="In Pipeline" value={String(candidates.filter((c) => !["Hired", "Rejected"].includes(c.stage)).length)} icon={Briefcase} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Hired" value={String(candidates.filter((c) => c.stage === "Hired").length)} icon={CheckSquare} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Open Positions" value="12" icon={Briefcase} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Candidate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Stage</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Source</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Applied</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.role}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${stageColor[c.stage] || ""}`} variant="outline">{c.stage}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.source}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-medium">{c.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.applied}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Move Stage</DropdownMenuItem>
                        <DropdownMenuItem>Generate Offer</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">Reject</DropdownMenuItem>
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
