import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, CheckSquare, Clock, TrendingUp, ExternalLink, Users } from "lucide-react";

export const Route = createFileRoute("/employee/projects")({ component: EmployeeProjects });

const projects = [
  {
    id: "P-01", name: "Auth v2 — OAuth Refactor", status: "In Progress", progress: 72,
    due: "2026-08-15", role: "Lead Engineer", team: ["AM", "AR", "KT"],
    tasks: { total: 18, done: 13 }, priority: "High",
    desc: "Migrate legacy session auth to OAuth 2.0 with PKCE flow.",
  },
  {
    id: "P-02", name: "API Documentation Portal", status: "In Progress", progress: 45,
    due: "2026-09-01", role: "Contributor", team: ["AM", "NP"],
    tasks: { total: 12, done: 5 }, priority: "Medium",
    desc: "Build developer-facing docs site using Docusaurus.",
  },
  {
    id: "P-03", name: "CI/CD Pipeline Upgrade", status: "Review", progress: 90,
    due: "2026-07-20", role: "Lead Engineer", team: ["AM", "AR"],
    tasks: { total: 8, done: 7 }, priority: "High",
    desc: "Upgrade GitHub Actions to support matrix builds and caching.",
  },
  {
    id: "P-04", name: "Mobile App — iOS Release", status: "Planning", progress: 15,
    due: "2026-10-30", role: "Reviewer", team: ["KT", "NP", "MW"],
    tasks: { total: 30, done: 4 }, priority: "Low",
    desc: "First public iOS release of the Acme mobile app.",
  },
];

const statusColor: Record<string, string> = {
  "In Progress": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  "Review": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Planning": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  "Done": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function EmployeeProjects() {
  return (
    <PortalShell role="employee" title="Projects" subtitle="Assigned projects, tasks and progress">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active projects" value="3" delta="1 in review" icon={Briefcase} tone="up" />
        <StatCard label="Total tasks" value="68" delta="29 completed" icon={CheckSquare} />
        <StatCard label="Due this week" value="2" delta="CI/CD + Auth v2" icon={Clock} tone="down" />
        <StatCard label="Avg. progress" value="56%" delta="+8% vs last month" icon={TrendingUp} tone="up" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
                    <Badge variant={p.priority === "High" ? "destructive" : p.priority === "Medium" ? "secondary" : "outline"} className="text-[10px]">
                      {p.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-1">{p.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${statusColor[p.status]}`}>{p.status}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">My Role</div>
                  <div className="font-medium">{p.role}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Tasks</div>
                  <div className="font-medium">{p.tasks.done}/{p.tasks.total}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Due</div>
                  <div className="font-medium">{p.due}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {p.team.map((t) => (
                      <Avatar key={t} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-[9px] bg-primary/10 text-primary">{t}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
