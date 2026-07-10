import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cpu, Users, CheckCircle, Clock, Plus, MoreHorizontal } from "lucide-react";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/projects")({ component: AdminProjects });

const statusColor: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Planning: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Review: "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
};

const priorityColor: Record<string, string> = {
  High: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
};

function AdminProjects() {
  return (
    <PortalShell
      role="admin"
      title="Projects"
      subtitle="Manage company projects, milestones, and team assignments"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />New Project</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Projects" value={String(projects.length)} icon={Cpu} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="In Progress" value={String(projects.filter((p) => p.status === "In Progress").length)} icon={Clock} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Completed" value={String(projects.filter((p) => p.status === "Completed").length)} tone="up" icon={CheckCircle} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Team Members" value="12" icon={Users} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <Badge className={`text-xs ${statusColor[p.status]}`} variant="outline">{p.status}</Badge>
                  <Badge className={`text-xs ${priorityColor[p.priority]}`} variant="outline">{p.priority}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Assign Members</DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-600">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-base mt-2">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-1.5" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Due</span>
                <span className="font-medium text-xs">{p.due}</span>
              </div>
              <div className="flex items-center gap-1">
                {p.assignees.map((a) => (
                  <Avatar key={a} className="h-6 w-6 -ml-1 first:ml-0 ring-2 ring-background">
                    <AvatarFallback className="text-[9px]">{a.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                  </Avatar>
                ))}
                <span className="text-xs text-muted-foreground ml-2">{p.assignees.length} member{p.assignees.length !== 1 ? "s" : ""}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
